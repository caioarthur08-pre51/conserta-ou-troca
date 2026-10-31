(function iniciarEsqueleto() {
  const casos = globalThis.CASOS;
  const select = document.querySelector("#caso");

  if (!Array.isArray(casos) || casos.length !== 8) {
    throw new Error("dados.js precisa publicar exatamente oito casos.");
  }

  function casoSelecionado() {
    const caso = casos.find((item) => item.caso_id === select.value);
    if (!caso) throw new Error("Caso selecionado não encontrado.");
    return caso;
  }

  globalThis.preencherCasos(select, casos);
  globalThis.mostrarCasoBase(casoSelecionado());

  select.addEventListener("change", function () {
    globalThis.mostrarCasoBase(casoSelecionado());
  });
})();
