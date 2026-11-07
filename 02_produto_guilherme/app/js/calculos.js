(function publicarCalculos() {
  const camposNaoNegativos = [
    "custo_reparo", "manutencao_adicional", "residual_reparado",
    "preco_substituto", "custos_acessorios", "valor_venda_atual",
    "residual_substituto"
  ];
  const camposPositivos = ["vida_adicional_anos", "vida_substituto_anos"];

  function normalizarNumero(valor, positivo) {
    if (
      valor === null ||
      valor === undefined ||
      (typeof valor === "string" && valor.trim() === "")
    ) {
      throw new Error("Preencha este campo para calcular.");
    }
    if (typeof valor !== "number" && typeof valor !== "string") {
      throw new Error("Digite apenas números neste campo.");
    }

    const numero = typeof valor === "number" ? valor : Number(valor);
    if (!Number.isFinite(numero)) {
      throw new Error("Digite apenas números neste campo.");
    }
    if (positivo ? numero <= 0 : numero < 0) {
      throw new Error(positivo
        ? "A vida adicional precisa ser maior que 0 anos."
        : "Digite um valor maior ou igual a 0.");
    }
    return numero;
  }

  function calcularCenario(entrada) {
    try {
      if (!entrada || typeof entrada !== "object" || Array.isArray(entrada)) {
        throw new Error("Caso ausente.");
      }

      const caso = { ...entrada };
      for (const campo of camposNaoNegativos) {
        caso[campo] = normalizarNumero(caso[campo], false);
      }
      for (const campo of camposPositivos) {
        caso[campo] = normalizarNumero(caso[campo], true);
      }

      const custoLiquidoReparar =
        caso.custo_reparo + caso.manutencao_adicional - caso.residual_reparado;
      const custoLiquidoTrocar =
        caso.preco_substituto + caso.custos_acessorios -
        caso.valor_venda_atual - caso.residual_substituto;

      if (custoLiquidoReparar < 0 || custoLiquidoTrocar < 0) {
        throw new Error(
          "Com esses valores, o custo líquido fica negativo e o cálculo não é válido. Revise os dados."
        );
      }

      const custoAnualReparar = custoLiquidoReparar / caso.vida_adicional_anos;
      const custoAnualTrocar = custoLiquidoTrocar / caso.vida_substituto_anos;
      const diferencaAnual = custoAnualReparar - custoAnualTrocar;
      const decisao = Math.abs(diferencaAnual) < 0.01
        ? "Empate técnico"
        : diferencaAnual < 0 ? "Reparar" : "Trocar";

      return {
        valido: true,
        caso_id: caso.caso_id,
        custo_liquido_reparar: custoLiquidoReparar,
        custo_liquido_trocar: custoLiquidoTrocar,
        custo_anual_reparar: custoAnualReparar,
        custo_anual_trocar: custoAnualTrocar,
        diferenca_anual: diferencaAnual,
        decisao
      };
    } catch (erro) {
      return {
        valido: false,
        mensagem: erro instanceof Error ? erro.message : "Entrada inválida."
      };
    }
  }

  globalThis.calcularCenario = calcularCenario;
})();
