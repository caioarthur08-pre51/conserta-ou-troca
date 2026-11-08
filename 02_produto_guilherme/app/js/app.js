(function iniciarAplicativo() {
  const casos = globalThis.CASOS;
  const select = document.querySelector("#caso");
  const formulario = document.querySelector("#form-comparacao");
  const custoReparo = document.querySelector("#custo-reparo");
  const vidaAdicional = document.querySelector("#vida-adicional");
  const botaoCalcular = document.querySelector("#calcular");
  const botaoRestaurar = document.querySelector("#restaurar");
  const botaoImprimir = document.querySelector("#imprimir");

  if (!Array.isArray(casos) || casos.length !== 8) {
    throw new Error("dados.js precisa publicar exatamente oito casos.");
  }

  let original = null;

  function obterSelecionado() {
    const caso = casos.find((item) => item.caso_id === select.value);
    if (!caso) throw new Error("Caso selecionado não encontrado.");
    return caso;
  }

  function carregarSelecionado() {
    original = { ...obterSelecionado() };
    globalThis.mostrarCasoBase(original);
    document.querySelector("#resultados").hidden = true;
    const mensagem = document.querySelector("#mensagem");
    mensagem.textContent = "Revise as premissas e pressione Calcular.";
    mensagem.className = "";
    botaoCalcular.disabled = false;
    botaoRestaurar.disabled = false;
    botaoImprimir.disabled = true;
  }

  function lerCasoEditado() {
    return {
      ...original,
      custo_reparo: custoReparo.value === "" ? "" : custoReparo.valueAsNumber,
      vida_adicional_anos:
        vidaAdicional.value === "" ? "" : vidaAdicional.valueAsNumber
    };
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const entradaEditada = lerCasoEditado();
    const resultadoBase = globalThis.calcularCenario(original);
    const resultadoEditado = globalThis.calcularCenario(entradaEditada);
    globalThis.renderizarResultado(
      resultadoEditado,
      original,
      resultadoBase,
      entradaEditada
    );
    botaoImprimir.disabled = !resultadoEditado.valido;
  });

  botaoRestaurar.addEventListener("click", function () {
    globalThis.mostrarCasoBase(original);
    document.querySelector("#resultados").hidden = true;
    const mensagem = document.querySelector("#mensagem");
    mensagem.textContent = "Valores originais restaurados. Pressione Calcular.";
    mensagem.className = "";
    botaoImprimir.disabled = true;
  });

  botaoImprimir.addEventListener("click", function () {
    window.print();
  });

  select.addEventListener("change", carregarSelecionado);
  globalThis.preencherCasos(select, casos);
  carregarSelecionado();
})();
