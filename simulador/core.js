(function publicarNucleo(raiz, fabrica) {
  const api = fabrica();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  raiz.SimuladorCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function criarNucleo() {
  "use strict";

  const CAMPOS_MONETARIOS = Object.freeze([
    "custo_reparo",
    "manutencao_adicional",
    "residual_reparado",
    "preco_substituto",
    "custos_acessorios",
    "valor_venda_atual",
    "residual_substituto"
  ]);

  const CAMPOS_MESES = Object.freeze([
    "vida_adicional_meses",
    "vida_substituto_meses"
  ]);

  const TOLERANCIA_CALCULO = 1e-9;

  function arredondarCentavos(valor) {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
  }

  function numeroPreenchido(valor) {
    if (valor === null || valor === undefined || String(valor).trim() === "") return null;
    const numero = typeof valor === "number" ? valor : Number(valor);
    return Number.isFinite(numero) && numero >= 0 ? numero : null;
  }

  function congelarLimites(limites) {
    return Object.freeze(
      Object.fromEntries(
        Object.entries(limites).map(([campo, faixa]) => [campo, Object.freeze(faixa)])
      )
    );
  }

  function obterCompatibilidadeCustos(entrada = {}) {
    const custoReparo = numeroPreenchido(entrada.custo_reparo);
    const manutencao = numeroPreenchido(entrada.manutencao_adicional);
    const residualReparado = numeroPreenchido(entrada.residual_reparado);
    const precoSubstituto = numeroPreenchido(entrada.preco_substituto);
    const acessorios = numeroPreenchido(entrada.custos_acessorios);
    const vendaAtual = numeroPreenchido(entrada.valor_venda_atual);
    const residualSubstituto = numeroPreenchido(entrada.residual_substituto);

    const reparoCompleto = [custoReparo, manutencao, residualReparado]
      .every((valor) => valor !== null);
    const trocaCompleta = [precoSubstituto, acessorios, vendaAtual, residualSubstituto]
      .every((valor) => valor !== null);

    const custoLiquidoReparar = reparoCompleto
      ? arredondarCentavos(custoReparo + manutencao - residualReparado)
      : null;
    const custoLiquidoTrocar = trocaCompleta
      ? arredondarCentavos(precoSubstituto + acessorios - vendaAtual - residualSubstituto)
      : null;

    const reparoCompativel = !reparoCompleto || custoLiquidoReparar >= -TOLERANCIA_CALCULO;
    const trocaCompativel = !trocaCompleta || custoLiquidoTrocar >= -TOLERANCIA_CALCULO;

    const reparo = Object.freeze({
      completo: reparoCompleto,
      compativel: reparoCompativel,
      custo_liquido: custoLiquidoReparar,
      limites: congelarLimites({
        custo_reparo: {
          min: manutencao !== null && residualReparado !== null
            ? arredondarCentavos(Math.max(0, residualReparado - manutencao))
            : 0,
          max: null
        },
        manutencao_adicional: {
          min: custoReparo !== null && residualReparado !== null
            ? arredondarCentavos(Math.max(0, residualReparado - custoReparo))
            : 0,
          max: null
        },
        residual_reparado: {
          min: 0,
          max: custoReparo !== null && manutencao !== null
            ? arredondarCentavos(custoReparo + manutencao)
            : null
        }
      })
    });

    const troca = Object.freeze({
      completo: trocaCompleta,
      compativel: trocaCompativel,
      custo_liquido: custoLiquidoTrocar,
      limites: congelarLimites({
        preco_substituto: {
          min: acessorios !== null && vendaAtual !== null && residualSubstituto !== null
            ? arredondarCentavos(Math.max(0, vendaAtual + residualSubstituto - acessorios))
            : 0,
          max: null
        },
        custos_acessorios: {
          min: precoSubstituto !== null && vendaAtual !== null && residualSubstituto !== null
            ? arredondarCentavos(Math.max(0, vendaAtual + residualSubstituto - precoSubstituto))
            : 0,
          max: null
        },
        valor_venda_atual: {
          min: 0,
          max: precoSubstituto !== null && acessorios !== null && residualSubstituto !== null
            ? arredondarCentavos(Math.max(0, precoSubstituto + acessorios - residualSubstituto))
            : null
        },
        residual_substituto: {
          min: 0,
          max: precoSubstituto !== null && acessorios !== null && vendaAtual !== null
            ? arredondarCentavos(Math.max(0, precoSubstituto + acessorios - vendaAtual))
            : null
        }
      })
    });

    return Object.freeze({
      compativel: reparoCompativel && trocaCompativel,
      reparo,
      troca
    });
  }

  function exigirNumero(valor, nomeCampo, opcoes) {
    const numero = typeof valor === "number" ? valor : Number(valor);
    if (!Number.isFinite(numero)) {
      throw new Error(`O campo ${nomeCampo} precisa conter um número.`);
    }
    if (opcoes.inteiro && !Number.isInteger(numero)) {
      throw new Error(`O campo ${nomeCampo} precisa ser informado em meses inteiros.`);
    }
    if (opcoes.positivo ? numero <= 0 : numero < 0) {
      throw new Error(
        opcoes.positivo
          ? `O campo ${nomeCampo} precisa ser maior que zero.`
          : `O campo ${nomeCampo} não pode ser negativo.`
      );
    }
    return numero;
  }

  function calcularAnalise(entrada, margemEmpate = 1) {
    if (!entrada || typeof entrada !== "object" || Array.isArray(entrada)) {
      throw new Error("Preencha os dados antes de calcular.");
    }
    if (!Number.isFinite(margemEmpate) || margemEmpate < 0) {
      throw new Error("A margem de empate é inválida.");
    }

    const dados = {};
    for (const campo of CAMPOS_MONETARIOS) {
      dados[campo] = exigirNumero(entrada[campo], campo, { positivo: false, inteiro: false });
    }
    for (const campo of CAMPOS_MESES) {
      dados[campo] = exigirNumero(entrada[campo], campo, { positivo: true, inteiro: true });
    }

    let custoLiquidoReparar = arredondarCentavos(
      dados.custo_reparo + dados.manutencao_adicional - dados.residual_reparado
    );
    let custoLiquidoTrocar = arredondarCentavos(
      dados.preco_substituto + dados.custos_acessorios -
      dados.valor_venda_atual - dados.residual_substituto
    );

    if (custoLiquidoReparar < -TOLERANCIA_CALCULO || custoLiquidoTrocar < -TOLERANCIA_CALCULO) {
      throw new Error(
        "Com esses valores, um custo líquido ficou negativo. Revise os valores residuais e de venda."
      );
    }

    if (Math.abs(custoLiquidoReparar) < TOLERANCIA_CALCULO) custoLiquidoReparar = 0;
    if (Math.abs(custoLiquidoTrocar) < TOLERANCIA_CALCULO) custoLiquidoTrocar = 0;

    const vidaAdicionalAnos = dados.vida_adicional_meses / 12;
    const vidaSubstitutoAnos = dados.vida_substituto_meses / 12;
    const custoAnualReparar = custoLiquidoReparar / vidaAdicionalAnos;
    const custoAnualTrocar = custoLiquidoTrocar / vidaSubstitutoAnos;
    const diferencaAssinada = custoAnualReparar - custoAnualTrocar;
    const diferencaAbsoluta = Math.abs(diferencaAssinada);

    let classificacao;
    if (diferencaAbsoluta < margemEmpate) {
      classificacao = "empate";
    } else {
      classificacao = diferencaAssinada < 0 ? "reparar" : "trocar";
    }

    let vidaEquilibrioReparoMeses = null;
    if (custoAnualTrocar > 0) {
      vidaEquilibrioReparoMeses = (custoLiquidoReparar / custoAnualTrocar) * 12;
    } else if (custoLiquidoReparar === 0) {
      vidaEquilibrioReparoMeses = 0;
    }

    return Object.freeze({
      entrada: Object.freeze({ ...dados }),
      custo_liquido_reparar: custoLiquidoReparar,
      custo_liquido_trocar: custoLiquidoTrocar,
      custo_anual_reparar: custoAnualReparar,
      custo_anual_trocar: custoAnualTrocar,
      diferenca_anual_assinada: diferencaAssinada,
      diferenca_anual_absoluta: diferencaAbsoluta,
      margem_empate: margemEmpate,
      classificacao,
      vida_equilibrio_reparo_meses: vidaEquilibrioReparoMeses
    });
  }

  function textoClassificacao(classificacao) {
    if (classificacao === "reparar") return "Reparar tem menor custo anual";
    if (classificacao === "trocar") return "Trocar tem menor custo anual";
    if (classificacao === "empate") return "Custos financeiros praticamente equivalentes";
    throw new Error("Classificação desconhecida.");
  }

  function formatarNumeroCsv(valor, casas = 2) {
    if (valor === null || valor === undefined) return "";
    if (typeof valor !== "number" || !Number.isFinite(valor)) return String(valor);
    return valor.toFixed(casas).replace(".", ",");
  }

  function escaparCsv(valor) {
    return `"${String(valor ?? "").replaceAll('"', '""')}"`;
  }

  function criarCsvAnalise({ resultado, criterios, decisao, justificativa, dataHora }) {
    if (!resultado || !criterios || !decisao || !String(justificativa || "").trim()) {
      throw new Error("Complete o resultado, a decisão e a justificativa antes de baixar.");
    }

    const cabecalhos = [
      "data_hora_local",
      "custo_reparo",
      "manutencao_adicional",
      "residual_reparado",
      "vida_adicional_meses",
      "preco_substituto",
      "custos_acessorios",
      "valor_venda_atual",
      "residual_substituto",
      "vida_substituto_meses",
      "custo_liquido_reparar",
      "custo_anual_reparar",
      "custo_liquido_trocar",
      "custo_anual_trocar",
      "diferenca_anual_absoluta",
      "resultado_financeiro",
      "vida_equilibrio_reparo_meses",
      "risco_reparo",
      "urgencia_uso",
      "prioridade_ambiental",
      "decisao_aluno",
      "justificativa",
      "aviso"
    ];

    const e = resultado.entrada;
    const valores = [
      dataHora || new Date().toLocaleString("pt-BR"),
      formatarNumeroCsv(e.custo_reparo),
      formatarNumeroCsv(e.manutencao_adicional),
      formatarNumeroCsv(e.residual_reparado),
      e.vida_adicional_meses,
      formatarNumeroCsv(e.preco_substituto),
      formatarNumeroCsv(e.custos_acessorios),
      formatarNumeroCsv(e.valor_venda_atual),
      formatarNumeroCsv(e.residual_substituto),
      e.vida_substituto_meses,
      formatarNumeroCsv(resultado.custo_liquido_reparar),
      formatarNumeroCsv(resultado.custo_anual_reparar),
      formatarNumeroCsv(resultado.custo_liquido_trocar),
      formatarNumeroCsv(resultado.custo_anual_trocar),
      formatarNumeroCsv(resultado.diferenca_anual_absoluta),
      textoClassificacao(resultado.classificacao),
      resultado.vida_equilibrio_reparo_meses === null
        ? "Sem ponto de equilíbrio financeiro"
        : formatarNumeroCsv(resultado.vida_equilibrio_reparo_meses, 1),
      criterios.risco_reparo,
      criterios.urgencia_uso,
      criterios.prioridade_ambiental,
      decisao,
      String(justificativa).trim(),
      "Ferramenta educativa. Não é recomendação comercial."
    ];

    return `\ufeff${cabecalhos.map(escaparCsv).join(";")}\r\n${valores.map(escaparCsv).join(";")}\r\n`;
  }

  return Object.freeze({
    calcularAnalise,
    criarCsvAnalise,
    obterCompatibilidadeCustos,
    textoClassificacao
  });
});
