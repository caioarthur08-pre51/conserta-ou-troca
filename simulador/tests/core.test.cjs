const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../core.js");

function entradaBase() {
  return {
    custo_reparo: 300,
    manutencao_adicional: 60,
    residual_reparado: 60,
    vida_adicional_meses: 24,
    preco_substituto: 900,
    custos_acessorios: 100,
    valor_venda_atual: 100,
    residual_substituto: 100,
    vida_substituto_meses: 48
  };
}

test("calcula os custos anuais com meses convertidos para anos", () => {
  const resultado = core.calcularAnalise(entradaBase());
  assert.equal(resultado.custo_liquido_reparar, 300);
  assert.equal(resultado.custo_liquido_trocar, 800);
  assert.equal(resultado.custo_anual_reparar, 150);
  assert.equal(resultado.custo_anual_trocar, 200);
  assert.equal(resultado.classificacao, "reparar");
  assert.equal(resultado.vida_equilibrio_reparo_meses, 18);
});

test("classifica trocar quando o reparo tem maior custo anual", () => {
  const entrada = entradaBase();
  entrada.vida_adicional_meses = 12;
  const resultado = core.calcularAnalise(entrada);
  assert.equal(resultado.custo_anual_reparar, 300);
  assert.equal(resultado.classificacao, "trocar");
});

test("usa margem estrita inferior a um real para empate", () => {
  const entrada = entradaBase();
  entrada.custo_reparo = 200.99;
  entrada.manutencao_adicional = 0;
  entrada.residual_reparado = 0;
  entrada.vida_adicional_meses = 12;
  const empate = core.calcularAnalise(entrada, 1);
  assert.ok(Math.abs(empate.diferenca_anual_absoluta - 0.99) < 1e-9);
  assert.equal(empate.classificacao, "empate");

  entrada.custo_reparo = 201;
  const foraDaMargem = core.calcularAnalise(entrada, 1);
  assert.equal(foraDaMargem.diferenca_anual_absoluta, 1);
  assert.equal(foraDaMargem.classificacao, "trocar");
});

test("rejeita valores negativos, vida zero, meses fracionários e custo líquido negativo", () => {
  const negativo = entradaBase();
  negativo.custo_reparo = -1;
  assert.throws(() => core.calcularAnalise(negativo), /não pode ser negativo/);

  const vidaZero = entradaBase();
  vidaZero.vida_adicional_meses = 0;
  assert.throws(() => core.calcularAnalise(vidaZero), /maior que zero/);

  const mesesFracionarios = entradaBase();
  mesesFracionarios.vida_substituto_meses = 12.5;
  assert.throws(() => core.calcularAnalise(mesesFracionarios), /meses inteiros/);

  const liquidoNegativo = entradaBase();
  liquidoNegativo.residual_reparado = 1000;
  assert.throws(() => core.calcularAnalise(liquidoNegativo), /custo líquido ficou negativo/);
});

test("cria CSV local compatível com separador brasileiro e escapa texto", () => {
  const resultado = core.calcularAnalise(entradaBase());
  const csv = core.criarCsvAnalise({
    resultado,
    criterios: {
      risco_reparo: "Médio",
      urgencia_uso: "Alta",
      prioridade_ambiental: "Alta"
    },
    decisao: "Reparar",
    justificativa: 'Custa menos, mas depende do "tempo estimado".',
    dataHora: "09/11/2026 12:00:00"
  });
  assert.ok(csv.startsWith("\ufeff"));
  assert.match(csv, /"150,00"/);
  assert.match(csv, /"Custa menos, mas depende do ""tempo estimado""\."/);
  assert.equal(csv.trim().split("\r\n").length, 2);
});

test("não permite exportar sem decisão e justificativa", () => {
  const resultado = core.calcularAnalise(entradaBase());
  assert.throws(
    () => core.criarCsvAnalise({
      resultado,
      criterios: { risco_reparo: "Baixo", urgencia_uso: "Baixa", prioridade_ambiental: "Baixa" },
      decisao: "",
      justificativa: ""
    }),
    /Complete o resultado/
  );
});
