(function publicarGeradorPdf(raiz, fabrica) {
  const api = fabrica();
  if (typeof module === "object" && module.exports) module.exports = api;
  raiz.SimuladorPdf = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function criarGeradorPdf() {
  "use strict";

  const LARGURA = 595.28;
  const ALTURA = 841.89;
  const CORES = Object.freeze({
    azulEscuro: "#17324d",
    azulMedio: "#2e6f9e",
    azulClaro: "#eef5f9",
    verde: "#2f7d5a",
    verdeClaro: "#eaf5ef",
    laranja: "#c87523",
    laranjaClaro: "#fff3e7",
    texto: "#111827",
    textoSuave: "#455568",
    borda: "#b8c5d0",
    branco: "#ffffff",
    cinzaBarra: "#dce5eb"
  });

  const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const numero = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  function codificarWinAnsi(texto) {
    const substituicoes = new Map([
      [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93], [0x201d, 0x94],
      [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97], [0x2026, 0x85]
    ]);
    const bytes = [];
    for (const caractere of String(texto).normalize("NFC")) {
      const codigo = caractere.codePointAt(0);
      if (codigo <= 255) bytes.push(codigo);
      else if (substituicoes.has(codigo)) bytes.push(substituicoes.get(codigo));
      else bytes.push(0x3f);
    }
    return new Uint8Array(bytes);
  }

  function concatenar(...partes) {
    const tamanho = partes.reduce((total, parte) => total + parte.length, 0);
    const saida = new Uint8Array(tamanho);
    let posicao = 0;
    for (const parte of partes) {
      saida.set(parte, posicao);
      posicao += parte.length;
    }
    return saida;
  }

  function escaparTextoPdf(texto) {
    return String(texto)
      .replaceAll("\\", "\\\\")
      .replaceAll("(", "\\(")
      .replaceAll(")", "\\)")
      .replace(/[\r\n]+/g, " ");
  }

  function decimal(valor) {
    return Number(valor).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
  }

  function rgb(hexadecimal) {
    const valor = hexadecimal.replace("#", "");
    return [0, 2, 4]
      .map((indice) => decimal(parseInt(valor.slice(indice, indice + 2), 16) / 255))
      .join(" ");
  }

  function larguraAproximada(texto, tamanho) {
    return String(texto).length * tamanho * 0.52;
  }

  function quebrarTexto(texto, largura, tamanho) {
    const palavras = String(texto).split(/\s+/).filter(Boolean);
    const linhas = [];
    let linha = "";
    for (const palavra of palavras) {
      const tentativa = linha ? `${linha} ${palavra}` : palavra;
      if (linha && larguraAproximada(tentativa, tamanho) > largura) {
        linhas.push(linha);
        linha = palavra;
      } else {
        linha = tentativa;
      }
    }
    if (linha) linhas.push(linha);
    return linhas.length ? linhas : [""];
  }

  function criarPagina() {
    const comandos = [];
    const adicionar = (comando) => comandos.push(comando);

    function retangulo(x, y, largura, altura, cor, contorno = null, espessura = 1) {
      if (cor) adicionar(`${rgb(cor)} rg ${decimal(x)} ${decimal(y)} ${decimal(largura)} ${decimal(altura)} re f`);
      if (contorno) adicionar(`${rgb(contorno)} RG ${decimal(espessura)} w ${decimal(x)} ${decimal(y)} ${decimal(largura)} ${decimal(altura)} re S`);
    }

    function linha(x1, y1, x2, y2, cor, espessura = 1) {
      adicionar(`${rgb(cor)} RG ${decimal(espessura)} w ${decimal(x1)} ${decimal(y1)} m ${decimal(x2)} ${decimal(y2)} l S`);
    }

    function texto(x, y, conteudo, tamanho = 10, fonte = "F1", cor = CORES.texto) {
      adicionar(
        `BT /${fonte} ${decimal(tamanho)} Tf ${rgb(cor)} rg 1 0 0 1 ${decimal(x)} ${decimal(y)} Tm (${escaparTextoPdf(conteudo)}) Tj ET`
      );
    }

    function textoAjustado(x, y, conteudo, largura, tamanho = 10, minimo = 7, fonte = "F1", cor = CORES.texto) {
      const estimada = larguraAproximada(conteudo, tamanho);
      const tamanhoFinal = estimada > largura
        ? Math.max(minimo, tamanho * (largura / estimada))
        : tamanho;
      texto(x, y, conteudo, tamanhoFinal, fonte, cor);
    }

    function paragrafo(x, y, conteudo, largura, tamanho = 10, entrelinha = tamanho * 1.35, fonte = "F1", cor = CORES.texto, maximo = 99) {
      const linhas = quebrarTexto(conteudo, largura, tamanho).slice(0, maximo);
      linhas.forEach((item, indice) => texto(x, y - indice * entrelinha, item, tamanho, fonte, cor));
      return y - linhas.length * entrelinha;
    }

    function barra(x, y, largura, altura, valor, maximo, cor) {
      retangulo(x, y, largura, altura, CORES.cinzaBarra);
      const proporcao = maximo > 0 ? Math.max(0, Math.min(1, valor / maximo)) : 0;
      if (proporcao > 0) retangulo(x, y, Math.max(2, largura * proporcao), altura, cor);
    }

    return {
      adicionar,
      retangulo,
      linha,
      texto,
      textoAjustado,
      paragrafo,
      barra,
      bytes: () => codificarWinAnsi(`${comandos.join("\n")}\n`)
    };
  }

  function cabecalho(pagina, subtitulo) {
    pagina.retangulo(0, 760, LARGURA, 82, CORES.azulEscuro);
    pagina.texto(36, 808, "CONSERTA OU TROCA?", 10, "F2", CORES.branco);
    pagina.texto(36, 780, subtitulo, 21, "F2", CORES.branco);
    pagina.texto(470, 808, "ANÁLISE EDUCATIVA", 8, "F2", CORES.branco);
  }

  function rodape(pagina, paginaAtual, totalPaginas, dataHora) {
    pagina.linha(36, 52, 559, 52, CORES.borda, 0.7);
    pagina.texto(36, 34, `Gerado no aparelho em ${dataHora}`, 8, "F1", CORES.textoSuave);
    pagina.texto(480, 34, `Página ${paginaAtual} de ${totalPaginas}`, 8, "F1", CORES.textoSuave);
  }

  function textoClassificacao(classificacao) {
    if (classificacao === "reparar") return "Reparar tem menor custo anual";
    if (classificacao === "trocar") return "Trocar tem menor custo anual";
    return "Custos financeiros praticamente equivalentes";
  }

  function textoEquilibrio(valor) {
    if (valor === null) return "Sem ponto de equilíbrio: trocar tem custo anual igual a zero.";
    if (valor === 0) return "Empate desde o primeiro mês.";
    return `${numero.format(valor)} meses ou mais, mantidas as demais estimativas.`;
  }

  function desenharPaginaResumo(resultado, criterios, dataHora) {
    const pagina = criarPagina();
    cabecalho(pagina, "Relatório da análise");

    const corResultado = resultado.classificacao === "reparar"
      ? CORES.verde
      : resultado.classificacao === "trocar" ? CORES.laranja : CORES.azulMedio;
    pagina.retangulo(36, 698, 523, 42, CORES.azulClaro);
    pagina.retangulo(36, 698, 7, 42, corResultado);
    pagina.textoAjustado(52, 714, textoClassificacao(resultado.classificacao), 480, 17, 11, "F2", CORES.azulEscuro);

    pagina.texto(36, 669, "Comparação do custo anual", 13, "F2", CORES.azulEscuro);
    pagina.retangulo(36, 510, 523, 142, CORES.branco, CORES.borda, 1);
    const maximoAnual = Math.max(resultado.custo_anual_reparar, resultado.custo_anual_trocar, 1);
    pagina.textoAjustado(52, 626, `Reparar: ${moeda.format(resultado.custo_anual_reparar)} por ano`, 490, 10, 7, "F2", CORES.texto);
    pagina.barra(52, 602, 490, 16, resultado.custo_anual_reparar, maximoAnual, CORES.verde);
    pagina.textoAjustado(52, 568, `Trocar: ${moeda.format(resultado.custo_anual_trocar)} por ano`, 490, 10, 7, "F2", CORES.texto);
    pagina.barra(52, 544, 490, 16, resultado.custo_anual_trocar, maximoAnual, CORES.laranja);
    pagina.texto(52, 522, "O maior valor ocupa toda a escala; o outro é mostrado proporcionalmente.", 8, "F1", CORES.textoSuave);

    pagina.retangulo(36, 424, 250, 68, CORES.verdeClaro, CORES.verde, 1.2);
    pagina.texto(50, 472, "REPARAR", 9, "F2", CORES.verde);
    pagina.textoAjustado(50, 449, `Líquido: ${moeda.format(resultado.custo_liquido_reparar)}`, 220, 13, 8, "F2", CORES.azulEscuro);
    pagina.textoAjustado(50, 432, `${moeda.format(resultado.custo_anual_reparar)} por ano`, 220, 9, 7, "F1", CORES.textoSuave);

    pagina.retangulo(309, 424, 250, 68, CORES.laranjaClaro, CORES.laranja, 1.2);
    pagina.texto(323, 472, "TROCAR", 9, "F2", CORES.laranja);
    pagina.textoAjustado(323, 449, `Líquido: ${moeda.format(resultado.custo_liquido_trocar)}`, 220, 13, 8, "F2", CORES.azulEscuro);
    pagina.textoAjustado(323, 432, `${moeda.format(resultado.custo_anual_trocar)} por ano`, 220, 9, 7, "F1", CORES.textoSuave);

    pagina.retangulo(36, 354, 523, 52, CORES.azulClaro);
    pagina.texto(50, 384, "Diferença anual", 9, "F2", CORES.azulEscuro);
    pagina.textoAjustado(50, 366, `${moeda.format(resultado.diferenca_anual_absoluta)} por ano`, 190, 11, 7, "F2", CORES.texto);
    pagina.texto(260, 384, "Vida adicional para o reparo empatar", 9, "F2", CORES.azulEscuro);
    pagina.paragrafo(260, 366, textoEquilibrio(resultado.vida_equilibrio_reparo_meses), 280, 9, 11, "F1", CORES.texto, 2);

    pagina.texto(36, 326, "Critérios que não entram na fórmula", 13, "F2", CORES.azulEscuro);
    const itens = [
      `Risco de o reparo não resolver: ${criterios.risco_reparo}.`,
      `Urgência da necessidade de uso: ${criterios.urgencia_uso}.`,
      `Importância ambiental de prolongar a vida útil: ${criterios.prioridade_ambiental}.`
    ];
    itens.forEach((item, indice) => {
      pagina.retangulo(40, 297 - indice * 24, 6, 6, [CORES.verde, CORES.laranja, CORES.azulMedio][indice]);
      pagina.texto(56, 294 - indice * 24, item, 10, "F1", CORES.texto);
    });

    pagina.retangulo(36, 130, 523, 82, CORES.laranjaClaro);
    pagina.retangulo(36, 130, 6, 82, CORES.laranja);
    pagina.texto(52, 190, "Como interpretar", 10, "F2", CORES.azulEscuro);
    pagina.paragrafo(
      52,
      172,
      "O resultado compara estimativas financeiras. Diagnóstico técnico, segurança, garantia, tempo sem o aparelho e impacto ambiental devem ser avaliados separadamente.",
      490,
      9,
      12,
      "F1",
      CORES.texto,
      4
    );

    rodape(pagina, 1, 2, dataHora);
    return pagina.bytes();
  }

  function desenharListaValores(pagina, x, y, titulo, cor, itens) {
    pagina.retangulo(x, y - 174, 250, 190, CORES.branco, CORES.borda, 1);
    pagina.retangulo(x, y - 174, 7, 190, cor);
    pagina.texto(x + 18, y - 8, titulo, 12, "F2", CORES.azulEscuro);
    itens.forEach(([rotulo, valor], indice) => {
      const linhaY = y - 40 - indice * 29;
      pagina.texto(x + 18, linhaY, rotulo, 8, "F1", CORES.textoSuave);
      pagina.textoAjustado(x + 18, linhaY - 13, valor, 214, 10, 7, "F2", CORES.texto);
    });
  }

  function desenharPaginaDetalhes(resultado, dataHora) {
    const pagina = criarPagina();
    const entrada = resultado.entrada;
    cabecalho(pagina, "Dados e método");
    pagina.texto(36, 730, "Valores informados", 14, "F2", CORES.azulEscuro);

    desenharListaValores(pagina, 36, 704, "REPARAR", CORES.verde, [
      ["Custo do reparo", moeda.format(entrada.custo_reparo)],
      ["Manutenção adicional", moeda.format(entrada.manutencao_adicional)],
      ["Valor residual", moeda.format(entrada.residual_reparado)],
      ["Vida adicional", `${entrada.vida_adicional_meses} meses`]
    ]);
    desenharListaValores(pagina, 309, 704, "TROCAR", CORES.laranja, [
      ["Preço do substituto", moeda.format(entrada.preco_substituto)],
      ["Acessórios", moeda.format(entrada.custos_acessorios)],
      ["Venda do aparelho atual", moeda.format(entrada.valor_venda_atual)],
      ["Valor residual do substituto", moeda.format(entrada.residual_substituto)],
      ["Vida útil", `${entrada.vida_substituto_meses} meses`]
    ]);

    pagina.texto(36, 492, "Comparação do custo líquido", 13, "F2", CORES.azulEscuro);
    pagina.retangulo(36, 372, 523, 102, CORES.branco, CORES.borda, 1);
    const maximoLiquido = Math.max(resultado.custo_liquido_reparar, resultado.custo_liquido_trocar, 1);
    pagina.textoAjustado(52, 448, `Reparar: ${moeda.format(resultado.custo_liquido_reparar)}`, 490, 9, 7, "F2", CORES.texto);
    pagina.barra(52, 428, 490, 14, resultado.custo_liquido_reparar, maximoLiquido, CORES.verde);
    pagina.textoAjustado(52, 402, `Trocar: ${moeda.format(resultado.custo_liquido_trocar)}`, 490, 9, 7, "F2", CORES.texto);
    pagina.barra(52, 382, 490, 14, resultado.custo_liquido_trocar, maximoLiquido, CORES.laranja);

    pagina.texto(36, 342, "Como os cálculos são feitos", 13, "F2", CORES.azulEscuro);
    pagina.retangulo(36, 250, 523, 76, CORES.azulClaro);
    pagina.texto(50, 304, "Reparar", 9, "F2", CORES.verde);
    pagina.paragrafo(50, 288, "(reparo + manutenção - residual) ÷ vida adicional em anos", 485, 9, 12, "F1", CORES.texto, 2);
    pagina.texto(50, 266, "Trocar", 9, "F2", CORES.laranja);
    pagina.paragrafo(105, 266, "(substituto + acessórios - venda atual - residual) ÷ vida útil em anos", 430, 9, 12, "F1", CORES.texto, 2);

    pagina.texto(36, 220, "Limites da análise", 13, "F2", CORES.azulEscuro);
    pagina.retangulo(36, 104, 523, 98, CORES.laranjaClaro);
    pagina.paragrafo(
      50,
      180,
      "Os números dependem das estimativas de preço, vida útil e valor residual. O menor custo anual não é uma ordem de compra ou reparo. Considere diagnóstico profissional, garantia, disponibilidade de peças, segurança, urgência e descarte responsável.",
      490,
      9,
      13,
      "F1",
      CORES.texto,
      6
    );
    pagina.texto(50, 118, "Relatório educativo. Não é recomendação comercial.", 8, "F2", CORES.textoSuave);

    rodape(pagina, 2, 2, dataHora);
    return pagina.bytes();
  }

  function criarMapaUnicode() {
    const codigos = [];
    for (let codigo = 0x20; codigo <= 0x7e; codigo += 1) codigos.push(codigo);
    for (let codigo = 0xa0; codigo <= 0xff; codigo += 1) codigos.push(codigo);
    const linhas = [
      "/CIDInit /ProcSet findresource begin",
      "12 dict begin",
      "begincmap",
      "/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def",
      "/CMapName /WinAnsi-UTF16 def",
      "/CMapType 2 def",
      "1 begincodespacerange",
      "<00> <FF>",
      "endcodespacerange"
    ];
    for (let inicio = 0; inicio < codigos.length; inicio += 100) {
      const grupo = codigos.slice(inicio, inicio + 100);
      linhas.push(`${grupo.length} beginbfchar`);
      for (const codigo of grupo) {
        linhas.push(`<${codigo.toString(16).padStart(2, "0").toUpperCase()}> <${codigo.toString(16).padStart(4, "0").toUpperCase()}>`);
      }
      linhas.push("endbfchar");
    }
    linhas.push("endcmap", "CMapName currentdict /CMap defineresource pop", "end", "end");
    return codificarWinAnsi(`${linhas.join("\n")}\n`);
  }

  function criarDocumentoPdf(conteudos) {
    const objetos = [null];
    objetos[1] = codificarWinAnsi("<< /Type /Catalog /Pages 2 0 R >>");
    objetos[2] = codificarWinAnsi("<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>");
    objetos[3] = codificarWinAnsi("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> /Contents 5 0 R >>");
    objetos[4] = codificarWinAnsi("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> /Contents 6 0 R >>");
    objetos[5] = concatenar(codificarWinAnsi(`<< /Length ${conteudos[0].length} >>\nstream\n`), conteudos[0], codificarWinAnsi("endstream"));
    objetos[6] = concatenar(codificarWinAnsi(`<< /Length ${conteudos[1].length} >>\nstream\n`), conteudos[1], codificarWinAnsi("endstream"));
    objetos[7] = codificarWinAnsi("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding /ToUnicode 10 0 R >>");
    objetos[8] = codificarWinAnsi("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding /ToUnicode 10 0 R >>");
    objetos[9] = codificarWinAnsi("<< /Title (Relatorio Conserta ou Troca?) /Creator (Simulador Conserta ou Troca?) >>");
    const mapaUnicode = criarMapaUnicode();
    objetos[10] = concatenar(codificarWinAnsi(`<< /Length ${mapaUnicode.length} >>\nstream\n`), mapaUnicode, codificarWinAnsi("endstream"));

    const partes = [codificarWinAnsi("%PDF-1.4\n%âãÏÓ\n")];
    const deslocamentos = [0];
    let tamanho = partes[0].length;
    for (let indice = 1; indice < objetos.length; indice += 1) {
      deslocamentos[indice] = tamanho;
      const objeto = concatenar(
        codificarWinAnsi(`${indice} 0 obj\n`),
        objetos[indice],
        codificarWinAnsi("\nendobj\n")
      );
      partes.push(objeto);
      tamanho += objeto.length;
    }

    const inicioXref = tamanho;
    let xref = `xref\n0 ${objetos.length}\n0000000000 65535 f \n`;
    for (let indice = 1; indice < objetos.length; indice += 1) {
      xref += `${String(deslocamentos[indice]).padStart(10, "0")} 00000 n \n`;
    }
    xref += `trailer\n<< /Size ${objetos.length} /Root 1 0 R /Info 9 0 R >>\nstartxref\n${inicioXref}\n%%EOF\n`;
    partes.push(codificarWinAnsi(xref));
    return concatenar(...partes);
  }

  function criarRelatorioPdf({ resultado, criterios, dataHora }) {
    if (!resultado || !resultado.entrada || !criterios) {
      throw new Error("Calcule a análise antes de gerar o relatório.");
    }
    const horario = String(dataHora || new Date().toLocaleString("pt-BR"));
    return criarDocumentoPdf([
      desenharPaginaResumo(resultado, criterios, horario),
      desenharPaginaDetalhes(resultado, horario)
    ]);
  }

  return Object.freeze({ criarRelatorioPdf });
});
