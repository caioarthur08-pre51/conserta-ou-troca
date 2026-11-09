import assert from "node:assert/strict";

await import("../app/js/dados.js");
await import("../app/js/calculos.js");

const casos = globalThis.CASOS;
const calcular = globalThis.calcularCenario;

assert.equal(casos.length, 8);
assert.deepEqual(
  casos.map((caso) => caso.caso_id),
  ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08"]
);

const esperados = {
  C01: [253.333333, 315.000000, "Reparar"],
  C02: [295.000000, 322.222222, "Reparar"],
  C03: [370.000000, 282.857143, "Trocar"],
  C04: [300.000000, 374.000000, "Reparar"],
  C05: [365.000000, 420.000000, "Reparar"],
  C06: [400.000000, 527.272727, "Reparar"],
  C07: [400.000000, 433.333333, "Reparar"],
  C08: [450.000000, 616.666667, "Reparar"]
};

for (const caso of casos) {
  const resultado = calcular(caso);
  const [reparar, trocar, decisao] = esperados[caso.caso_id];
  assert.equal(resultado.valido, true, caso.caso_id);
  assert.ok(Math.abs(resultado.custo_anual_reparar - reparar) < 0.0001);
  assert.ok(Math.abs(resultado.custo_anual_trocar - trocar) < 0.0001);
  assert.equal(resultado.decisao, decisao);
  assert.equal(resultado.caso_id, caso.caso_id);
}

const c01 = casos[0];
const invalidos = [
  { ...c01, custo_reparo: "" },
  { ...c01, custo_reparo: "   " },
  { ...c01, custo_reparo: "abc" },
  { ...c01, custo_reparo: false },
  { ...c01, custo_reparo: -1 },
  { ...c01, vida_adicional_anos: 0 },
  { ...c01, vida_adicional_anos: "" },
  { ...c01, manutencao_adicional: NaN },
  { ...c01, preco_substituto: Infinity },
  {
    ...c01,
    custo_reparo: 0,
    manutencao_adicional: 0,
    residual_reparado: 999
  }
];

for (const entrada of invalidos) {
  assert.equal(calcular(entrada).valido, false);
}
assert.equal(
  calcular(invalidos[0]).mensagem,
  "Preencha este campo para calcular."
);
assert.equal(
  calcular(invalidos[2]).mensagem,
  "Digite apenas números neste campo."
);
assert.equal(
  calcular(invalidos[4]).mensagem,
  "Digite um valor maior ou igual a 0."
);
assert.equal(
  calcular(invalidos[5]).mensagem,
  "A vida adicional precisa ser maior que 0 anos."
);
assert.equal(
  calcular(invalidos[9]).mensagem,
  "Com esses valores, o custo líquido fica negativo e o cálculo não é válido. Revise os dados."
);

const empate = calcular({ ...c01, custo_reparo: 512.50 });
assert.equal(empate.valido, true);
assert.equal(empate.decisao, "Empate técnico");
assert.equal(calcular({ ...c01, custo_reparo: 512.52 }).decisao, "Trocar");
assert.equal(c01.custo_reparo, 420, "A simulação não pode alterar o caso original.");

console.log("Aprovados: 8 casos, 10 limites e sensibilidade financeira.");
