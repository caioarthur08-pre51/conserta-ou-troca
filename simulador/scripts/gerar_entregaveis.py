#!/usr/bin/env python3
"""Gera QR, guia atualizado e cartão de contingência do simulador."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import tempfile
import zipfile
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw
from reportlab.graphics import renderSVG
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A5
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


URL_SIMULADOR = "https://caioarthur08-pre51.github.io/conserta-ou-troca/simulador/"
URL_ANTIGA = "https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc"
VERSAO = "v1.1.0"
DATA = "2026-11-09"

AZUL_ESCURO = HexColor("#17324D")
AZUL_MEDIO = HexColor("#2E6F9E")
VERDE = HexColor("#2F7D5A")
LARANJA = HexColor("#C87523")
TEXTO = HexColor("#111827")


def substituir_exato(texto: str, antigo: str, novo: str, quantidade: int) -> str:
    encontrados = texto.count(antigo)
    if encontrados != quantidade:
        raise ValueError(
            f"Esperava {quantidade} ocorrência(s) de {antigo!r}, mas encontrei {encontrados}."
        )
    return texto.replace(antigo, novo)


def criar_qr(url: str, png: Path, svg: Path) -> None:
    codigo = QrCodeWidget(url, barLevel="H", barBorder=4)
    codigo.qr.make()
    borda = 4
    tamanho_modulo = 20
    quantidade = codigo.qr.moduleCount
    tamanho_imagem = (quantidade + 2 * borda) * tamanho_modulo
    imagem = Image.new("RGB", (tamanho_imagem, tamanho_imagem), "white")
    desenho_png = ImageDraw.Draw(imagem)
    for linha, modulos in enumerate(codigo.qr.modules):
        for coluna, escuro in enumerate(modulos):
            if escuro:
                x0 = (coluna + borda) * tamanho_modulo
                y0 = (linha + borda) * tamanho_modulo
                desenho_png.rectangle(
                    [x0, y0, x0 + tamanho_modulo - 1, y0 + tamanho_modulo - 1],
                    fill="black",
                )
    imagem.save(png, format="PNG", optimize=True)

    x1, y1, x2, y2 = codigo.getBounds()
    largura = x2 - x1
    altura = y2 - y1
    tamanho = 288
    escala = min(tamanho / largura, tamanho / altura)
    desenho = Drawing(tamanho, tamanho, transform=[escala, 0, 0, escala, 0, 0])
    desenho.add(codigo)
    renderSVG.drawToFile(desenho, str(svg))


def criar_odp_atualizado(origem: Path, destino: Path, qr_png: Path) -> None:
    imagem_qr = "Pictures/1000000000000390000003904C998FD8.png"
    with zipfile.ZipFile(origem, "r") as entrada:
        nomes = entrada.namelist()
        if imagem_qr not in nomes:
            raise ValueError("A imagem QR esperada não existe no ODP de origem.")

        conteudo = entrada.read("content.xml").decode("utf-8")
        conteudo = substituir_exato(conteudo, URL_ANTIGA, URL_SIMULADOR, 1)
        conteudo = substituir_exato(
            conteudo,
            "https://datastudio.google.com/reporting/",
            "https://caioarthur08-pre51.github.io/",
            1,
        )
        conteudo = substituir_exato(
            conteudo,
            "ef7da896-dae5-4e7c-b986-1d644ad94ffc",
            "conserta-ou-troca/simulador/",
            1,
        )
        conteudo = substituir_exato(conteudo, "5. Leia o painel", "5. Faça sua simulação", 1)
        conteudo = substituir_exato(
            conteudo,
            "Compare Reparar e Trocar dentro do mesmo caso.",
            "Calcule com seus próprios valores.",
            1,
        )
        conteudo = substituir_exato(
            conteudo,
            "Simulação educativa com dados sintéticos. Não é recomendação comercial.",
            "Material e simulador educativos. Não é recomendação comercial.",
            1,
        )
        conteudo = substituir_exato(conteudo, 'draw:name="qr-looker"', 'draw:name="qr-simulador"', 1)
        conteudo = substituir_exato(
            conteudo,
            "<svg:title>QR do painel Looker Studio</svg:title>",
            "<svg:title>QR do Simulador Conserta ou Troca</svg:title>",
            1,
        )
        conteudo = substituir_exato(
            conteudo,
            "<svg:desc>Código QR que abre o painel público em modo de visualização. A URL textual equivalente aparece abaixo.</svg:desc>",
            "<svg:desc>Código QR que abrirá o simulador educativo após a publicação. A URL textual equivalente aparece abaixo.</svg:desc>",
            1,
        )
        conteudo = substituir_exato(
            conteudo,
            "versao_texto: v1.0.0; congelamento técnico: 08/11/2026.",
            "versao_texto: v1.0.0; integração visual do simulador: v1.1.0 em 09/11/2026.",
            1,
        )
        conteudo = substituir_exato(
            conteudo,
            "QR decodificado digitalmente; testes físicos permanecem pendentes com Caio.",
            "QR do simulador validado digitalmente; publicação e testes físicos permanecem pendentes de autorização de Caio.",
            1,
        )

        metadados = entrada.read("meta.xml").decode("utf-8")
        metadados = substituir_exato(
            metadados,
            "Conserta ou Troca? — guia de decisão (v1.0.0)",
            "Conserta ou Troca? — guia de decisão com simulador (v1.1.0)",
            1,
        )

        with zipfile.ZipFile(destino, "w") as saida:
            # ODF exige mimetype como primeiro item e sem compressão.
            saida.writestr("mimetype", entrada.read("mimetype"), compress_type=zipfile.ZIP_STORED)
            for nome in nomes:
                if nome == "mimetype":
                    continue
                info = entrada.getinfo(nome)
                if nome == "content.xml":
                    dados = conteudo.encode("utf-8")
                elif nome == "meta.xml":
                    dados = metadados.encode("utf-8")
                elif nome == imagem_qr:
                    dados = qr_png.read_bytes()
                else:
                    dados = entrada.read(nome)
                saida.writestr(info, dados)


def registrar_fontes() -> tuple[str, str]:
    pasta_fontes = Path("C:/Windows/Fonts")
    regular = pasta_fontes / "arial.ttf"
    negrito = pasta_fontes / "arialbd.ttf"
    if not regular.exists() or not negrito.exists():
        raise FileNotFoundError("As fontes Arial do sistema não foram encontradas.")
    pdfmetrics.registerFont(TTFont("Arial", str(regular)))
    pdfmetrics.registerFont(TTFont("Arial-Bold", str(negrito)))
    return "Arial", "Arial-Bold"


def desenhar_texto_centralizado(
    c: canvas.Canvas,
    linhas: list[str],
    y: float,
    fonte: str,
    tamanho: float,
    entrelinha: float,
    cor=TEXTO,
) -> float:
    c.setFillColor(cor)
    c.setFont(fonte, tamanho)
    for linha in linhas:
        c.drawCentredString(A5[0] / 2, y, linha)
        y -= entrelinha
    return y


def criar_cartao(qr_png: Path, destino: Path) -> None:
    fonte, negrito = registrar_fontes()
    largura, altura = A5
    c = canvas.Canvas(str(destino), pagesize=A5)
    c.setTitle(f"Simulador Conserta ou Troca? - cartão QR ({VERSAO})")
    c.setAuthor("Larissa Costa")
    c.setSubject("Acesso ao simulador educativo Conserta ou Troca?")

    c.setFillColor(AZUL_ESCURO)
    c.rect(0, altura - 67 * mm, largura, 67 * mm, stroke=0, fill=1)
    desenhar_texto_centralizado(c, ["Simulador", "Conserta ou Troca?"], altura - 24 * mm, negrito, 27, 10 * mm, white)
    desenhar_texto_centralizado(
        c,
        ["Compare o custo anual de reparar e trocar", "usando os valores da sua situação."],
        altura - 50 * mm,
        fonte,
        12,
        6 * mm,
        white,
    )

    tamanho_qr = 78 * mm
    x_qr = (largura - tamanho_qr) / 2
    y_qr = altura - 151 * mm
    c.drawImage(str(qr_png), x_qr, y_qr, tamanho_qr, tamanho_qr, preserveAspectRatio=True, mask="auto")

    c.setFillColor(AZUL_MEDIO)
    c.setFont(negrito, 12)
    c.drawCentredString(largura / 2, y_qr - 7 * mm, "Aponte a câmera para o QR")
    desenhar_texto_centralizado(
        c,
        ["https://caioarthur08-pre51.github.io/", "conserta-ou-troca/simulador/"],
        y_qr - 14 * mm,
        fonte,
        8.5,
        4.5 * mm,
        AZUL_MEDIO,
    )

    c.setFillColor(HexColor("#EAF5EF"))
    c.roundRect(14 * mm, 12 * mm, largura - 28 * mm, 24 * mm, 4 * mm, stroke=0, fill=1)
    c.setStrokeColor(VERDE)
    c.setLineWidth(1.5)
    c.roundRect(14 * mm, 12 * mm, largura - 28 * mm, 24 * mm, 4 * mm, stroke=1, fill=0)
    c.setFillColor(TEXTO)
    c.setFont(negrito, 10.5)
    c.drawString(20 * mm, 29 * mm, "Privacidade:")
    c.setFont(fonte, 9.5)
    c.drawString(20 * mm, 23 * mm, "os valores digitados ficam no seu aparelho.")
    c.drawString(20 * mm, 17 * mm, "Eles não são enviados nem armazenados.")

    c.setFillColor(LARANJA)
    c.rect(0, 0, largura, 8 * mm, stroke=0, fill=1)
    c.setFillColor(TEXTO)
    c.setFont(negrito, 8.5)
    c.drawCentredString(largura / 2, 3 * mm, "FERRAMENTA EDUCATIVA - NÃO É RECOMENDAÇÃO COMERCIAL")
    c.showPage()
    c.save()


def exportar_pdf(soffice: Path, odp: Path, pasta_saida: Path) -> Path:
    perfil = odp.parent / "perfil_lo"
    perfil.mkdir(parents=True, exist_ok=True)
    uri_perfil = perfil.resolve().as_uri()
    comando = [
        str(soffice),
        "--headless",
        f"-env:UserInstallation={uri_perfil}",
        "--convert-to",
        "pdf:impress_pdf_Export",
        "--outdir",
        str(pasta_saida),
        str(odp),
    ]
    processo = subprocess.run(comando, capture_output=True, text=True, check=False)
    if processo.returncode != 0:
        raise RuntimeError(f"LibreOffice falhou: {processo.stdout}\n{processo.stderr}")
    exportado = pasta_saida / f"{odp.stem}.pdf"
    if not exportado.exists():
        raise FileNotFoundError(f"O PDF exportado não foi criado. Saída: {processo.stdout}")
    return exportado


def sha256(caminho: Path) -> str:
    digest = hashlib.sha256()
    with caminho.open("rb") as arquivo:
        for bloco in iter(lambda: arquivo.read(1024 * 1024), b""):
            digest.update(bloco)
    return digest.hexdigest()


def gerar(args: argparse.Namespace) -> None:
    origem = args.source_odp.resolve()
    saida = args.output_dir.resolve()
    soffice = args.soffice.resolve()
    if not origem.exists():
        raise FileNotFoundError(origem)
    if not soffice.exists():
        raise FileNotFoundError(soffice)
    saida.mkdir(parents=True, exist_ok=True)

    qr_png = saida / "qr_simulador_conserta_ou_troca_v1.1.0.png"
    qr_svg = saida / "qr_simulador_conserta_ou_troca_v1.1.0.svg"
    guia_pdf = saida / "guia_decisao_simulador_v1.1.0_2026-11-09.pdf"
    cartao_pdf = saida / "cartao_qr_simulador_v1.1.0_2026-11-09.pdf"
    url_txt = saida / "url_simulador_publicacao_pendente.txt"

    criar_qr(URL_SIMULADOR, qr_png, qr_svg)
    criar_cartao(qr_png, cartao_pdf)
    url_txt.write_text(
        f"{URL_SIMULADOR}\n\nPUBLICAÇÃO PENDENTE DE AUTORIZAÇÃO DE CAIO.\n",
        encoding="utf-8",
    )

    with tempfile.TemporaryDirectory(prefix="simulador-guia-") as temporario:
        pasta_tmp = Path(temporario)
        odp_tmp = pasta_tmp / "guia_decisao_simulador_v1.1.0_2026-11-09.odp"
        criar_odp_atualizado(origem, odp_tmp, qr_png)
        exportado = exportar_pdf(soffice, odp_tmp, pasta_tmp)
        shutil.copy2(exportado, guia_pdf)

    artefatos = [qr_png, qr_svg, guia_pdf, cartao_pdf, url_txt]
    manifesto = {
        "projeto": "Conserta ou Troca? O Custo Total do Dispositivo",
        "versao": VERSAO,
        "data": DATA,
        "url_qr": URL_SIMULADOR,
        "publicacao_pendente": True,
        "observacao": "O QR somente deve ser distribuído após o deploy e os testes físicos.",
        "autoria_por_dominio": {
            "modelagem": "Laís Eulálio",
            "produto": "Guilherme Almeida",
            "conteudo": "Letícia Costa",
            "comunicacao_visual": "Larissa Costa",
            "coordenacao_integracao": "Caio Rocha",
            "execucao_tecnica_assistida": "Codex sob coordenação de Caio Rocha",
        },
        "arquivos": [
            {"nome": item.name, "sha256": sha256(item), "tamanho_bytes": item.stat().st_size}
            for item in artefatos
        ],
    }
    manifesto_path = saida / "manifesto_entregaveis_simulador_v1.1.0.json"
    manifesto_path.write_text(json.dumps(manifesto, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(json.dumps({"output_dir": str(saida), "arquivos": [p.name for p in artefatos] + [manifesto_path.name]}, ensure_ascii=False, indent=2))


def analisar_argumentos() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-odp", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--soffice", type=Path, required=True)
    return parser.parse_args()


if __name__ == "__main__":
    gerar(analisar_argumentos())
