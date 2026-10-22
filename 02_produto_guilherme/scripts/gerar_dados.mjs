import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [, , origemCasos, destinoDados] = process.argv;

if (!origemCasos || !destinoDados) {
  throw new Error("Uso: node gerar_dados.mjs casos.csv dados.js");
}

function falhar(mensagem) {
  throw new Error(mensagem);
}

function lerCsv(caminho) {
  const texto = readFileSync(resolve(caminho), "utf8").replace(/^﻿/, "");
  const linhas = [];
  let linha = [];
  let campo = "";
  let emAspas = false;

  for (let i = 0; i < texto.length; i += 1) {
    const caractere = texto[i];

    if (caractere === '"') {
      if (emAspas && texto[i + 1] === '"') {
        campo += '"';
        i += 1;
      } else {
        emAspas = !emAspas;
      }
    } else if (caractere === "," && !emAspas) {
      linha.push(campo);
      campo = "";
    } else if ((caractere === "\n" || caractere === "\r") && !emAspas) {
      if (caractere === "\r" && texto[i + 1] === "\n") i += 1;
      linha.push(campo);
      if (linha.some((valor) => valor.trim() !== "")) linhas.push(linha);
      linha = [];
      campo = "";
    } else {
      campo += caractere;
    }
  }

  if (emAspas) falhar(caminho + ": aspas não fechadas.");

  if (campo !== "" || linha.length > 0) {
    linha.push(campo);
    if (linha.some((valor) => valor.trim() !== "")) linhas.push(linha);
  }

  if (linhas.length < 2) falhar(caminho + ": sem cabeçalho e dados.");

  const cabecalho = linhas.shift().map((valor) => valor.trim());

  if (new Set(cabecalho).size !== cabecalho.length) {
    falhar(caminho + ": cabeçalho duplicado.");
  }

  return {
    cabecalho,
    registros: linhas.map((valores, indice) => {
      if (valores.length !== cabecalho.length) {
        falhar(caminho + ": número de colunas inválido na linha " + (indice + 2));
      }
      return Object.fromEntries(
        cabecalho.map((nome, posicao) => [nome, valores[posicao].trim()])
      );
    })
  };
}

function exigirCabecalho(recebido, esperado, arquivo) {
  const igual =
    recebido.length === esperado.length &&
    esperado.every((nome, indice) => recebido[indice] === nome);

  if (!igual) {
    falhar(arquivo + ": cabeçalho inválido. Esperado: " + esperado.join(","));
  }
}

function textoObrigatorio(valor, campo, id) {
  if (typeof valor !== "string" || valor.trim() === "") {
    falhar(id + ": " + campo + " é obrigatório.");
  }
  return valor.trim();
}

function numeroObrigatorio(valor, campo, id, maiorQueZero = false) {
  if (valor === "") falhar(id + ": " + campo + " está vazio.");

  const numero = Number(valor);

  if (!Number.isFinite(numero)) falhar(id + ": " + campo + " não é número.");

  if (maiorQueZero ? numero <= 0 : numero < 0) {
    falhar(id + ": " + campo + " está fora do limite.");
  }

  return numero;
}

const camposCasos = [
  "caso_id", "tipo_dispositivo", "modelo_ficticio",
  "custo_reparo", "manutencao_adicional", "vida_adicional_anos",
  "residual_reparado", "preco_substituto", "custos_acessorios",
  "valor_venda_atual", "residual_substituto", "vida_substituto_anos",
  "garantia_reparo_meses", "garantia_substituto_meses",
  "risco_reparo", "necessidade_usuario", "impacto_ambiental", "observacao"
];

const csvCasos = lerCsv(origemCasos);
exigirCabecalho(csvCasos.cabecalho, camposCasos, "casos.csv");

const idsEsperados = Array.from(
  { length: 8 },
  (_, indice) => "C" + String(indice + 1).padStart(2, "0")
);

if (csvCasos.registros.length !== 8) {
  falhar("casos.csv precisa ter exatamente oito registros.");
}

const idsCasos = csvCasos.registros.map((linha) => linha.caso_id);

if (new Set(idsCasos).size !== 8) {
  falhar("Há caso_id duplicado.");
}

if (idsEsperados.some((id) => !idsCasos.includes(id))) {
  falhar("casos.csv precisa conter exatamente C01 a C08.");
}

const camposNaoNegativos = [
  "custo_reparo", "manutencao_adicional", "residual_reparado",
  "preco_substituto", "custos_acessorios", "valor_venda_atual",
  "residual_substituto", "garantia_reparo_meses",
  "garantia_substituto_meses"
];

const casos = csvCasos.registros.map((linha) => {
  const id = linha.caso_id;

  const caso = {
    caso_id: id,
    tipo_dispositivo: textoObrigatorio(
      linha.tipo_dispositivo, "tipo_dispositivo", id
    ),
    modelo_ficticio: textoObrigatorio(
      linha.modelo_ficticio, "modelo_ficticio", id
    ),
    risco_reparo: textoObrigatorio(
      linha.risco_reparo, "risco_reparo", id
    ),
    necessidade_usuario: textoObrigatorio(
      linha.necessidade_usuario, "necessidade_usuario", id
    ),
    impacto_ambiental: textoObrigatorio(
      linha.impacto_ambiental, "impacto_ambiental", id
    ),
    observacao: textoObrigatorio(linha.observacao, "observacao", id)
  };

  for (const campo of camposNaoNegativos) {
    caso[campo] = numeroObrigatorio(linha[campo], campo, id);
  }

  caso.vida_adicional_anos = numeroObrigatorio(
    linha.vida_adicional_anos, "vida_adicional_anos", id, true
  );
  caso.vida_substituto_anos = numeroObrigatorio(
    linha.vida_substituto_anos, "vida_substituto_anos", id, true
  );

  const liquidoReparar =
    caso.custo_reparo +
    caso.manutencao_adicional -
    caso.residual_reparado;

  const liquidoTrocar =
    caso.preco_substituto +
    caso.custos_acessorios -
    caso.valor_venda_atual -
    caso.residual_substituto;

  if (liquidoReparar < 0 || liquidoTrocar < 0) {
    falhar(id + ": custo líquido negativo é inválido.");
  }

  return caso;
});

const conteudo =
  "globalThis.CASOS = Object.freeze(" +
  JSON.stringify(casos, null, 2) +
  ".map((caso) => Object.freeze(caso)));\n";

mkdirSync(dirname(resolve(destinoDados)), { recursive: true });
writeFileSync(resolve(destinoDados), conteudo, "utf8");

console.log("Gerados 8 casos válidos em " + destinoDados);
