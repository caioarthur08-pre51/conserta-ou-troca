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

  // O CSV usa números decimais com ponto, sem notação hexadecimal ou exponencial.
  if (!/^\d+(?:\.\d+)?$/.test(valor)) {
    falhar(id + ": " + campo + " não está em formato decimal.");
  }

  const numero = Number(valor);

  if (!Number.isFinite(numero)) falhar(id + ": " + campo + " não é número.");

  if (maiorQueZero ? numero <= 0 : numero < 0) {
    falhar(id + ": " + campo + " está fora do limite.");
  }

  return numero;
}

function categoriaObrigatoria(valor, campo, id, permitidos) {
  const texto = textoObrigatorio(valor, campo, id);
  if (!permitidos.includes(texto)) {
    falhar(id + ": " + campo + " fora do vocabulário (" + permitidos.join(" | ") + ").");
  }
  return texto;
}

function inteiroObrigatorio(valor, campo, id) {
  if (!/^\d+$/.test(valor)) {
    falhar(id + ": " + campo + " precisa ser inteiro.");
  }
  const numero = numeroObrigatorio(valor, campo, id);
  if (!Number.isInteger(numero)) falhar(id + ": " + campo + " precisa ser inteiro.");
  return numero;
}

// Ordem A:R definida em 01_modelagem_lais/dicionario_dados.md (contrato 1.0).
const camposCasos = [
  "caso_id", "tipo_dispositivo", "modelo_ficticio",
  "custo_reparo", "manutencao_adicional", "residual_reparado",
  "vida_adicional_anos", "garantia_reparo_meses",
  "preco_substituto", "custos_acessorios", "valor_venda_atual",
  "residual_substituto", "vida_substituto_anos", "garantia_substituto_meses",
  "risco_reparo", "necessidade_usuario", "impacto_ambiental", "observacao"
];

const vocabulario = {
  tipo_dispositivo: ["Celular", "Notebook"],
  risco_reparo: ["Baixo", "Médio", "Alto"],
  necessidade_usuario: ["Essencial", "Importante", "Adiável"],
  impacto_ambiental: [
    "Reparo favorece reuso", "Equilibrado", "Troca requer descarte responsável"
  ]
};

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
  "residual_substituto"
];

const casos = csvCasos.registros.map((linha) => {
  const id = linha.caso_id;
  const caso = {};

  for (const campo of camposCasos) {
    if (campo === "caso_id") {
      caso.caso_id = id;
    } else if (vocabulario[campo]) {
      caso[campo] = categoriaObrigatoria(linha[campo], campo, id, vocabulario[campo]);
    } else if (campo === "modelo_ficticio" || campo === "observacao") {
      caso[campo] = textoObrigatorio(linha[campo], campo, id);
    } else if (camposNaoNegativos.includes(campo)) {
      caso[campo] = numeroObrigatorio(linha[campo], campo, id);
    } else if (campo === "vida_adicional_anos" || campo === "vida_substituto_anos") {
      caso[campo] = numeroObrigatorio(linha[campo], campo, id, true);
    } else {
      caso[campo] = inteiroObrigatorio(linha[campo], campo, id);
    }
  }

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
