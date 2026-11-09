await import("../../02_produto_guilherme/app/js/dados.js");
await import("../../02_produto_guilherme/app/js/calculos.js");

if (!Array.isArray(globalThis.CASOS) || globalThis.CASOS.length !== 8) {
  throw new Error("O aplicativo não publicou exatamente oito casos.");
}

const resultados = globalThis.CASOS.map((caso) => {
  const resultado = globalThis.calcularCenario(caso);
  if (!resultado.valido) {
    throw new Error(`${caso.caso_id}: ${resultado.mensagem}`);
  }
  return resultado;
});

process.stdout.write(JSON.stringify(resultados));
