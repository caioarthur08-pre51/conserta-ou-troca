globalThis.preencherCasos = function preencherCasos(select, casos) {
  select.replaceChildren();
  for (const caso of casos) {
    const opcao = document.createElement("option");
    opcao.value = caso.caso_id;
    opcao.textContent =
      caso.caso_id + " - " + caso.tipo_dispositivo + " " + caso.modelo_ficticio;
    select.append(opcao);
  }
};

globalThis.mostrarCasoBase = function mostrarCasoBase(caso) {
  document.querySelector("#descricao-caso").textContent =
    caso.caso_id + " - " + caso.modelo_ficticio + ". " + caso.observacao;
  document.querySelector("#premissas-caso").textContent =
    "Reparar: manutenção adicional R$ " + caso.manutencao_adicional +
    ", residual R$ " + caso.residual_reparado +
    ", vida " + caso.vida_adicional_anos + " ano(s). Trocar: preço R$ " +
    caso.preco_substituto + ", acessórios R$ " + caso.custos_acessorios +
    ", venda atual R$ " + caso.valor_venda_atual + ", residual R$ " +
    caso.residual_substituto + ", vida " + caso.vida_substituto_anos + " ano(s).";
  document.querySelector("#custo-reparo").value = caso.custo_reparo;
  document.querySelector("#vida-adicional").value = caso.vida_adicional_anos;
};
