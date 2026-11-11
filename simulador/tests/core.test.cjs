const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../core.js");
const pdf = require("../pdf.js");

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

test("calcula faixas dinâmicas para impedir custo líquido negativo no reparo", () => {
  const compatibilidade = core.obterCompatibilidadeCustos({
    custo_reparo: 300,
    manutencao_adicional: 60,
    residual_reparado: 500
  });

  assert.equal(compatibilidade.reparo.completo, true);
  assert.equal(compatibilidade.reparo.compativel, false);
  assert.equal(compatibilidade.reparo.limites.custo_reparo.min, 440);
  assert.equal(compatibilidade.reparo.limites.manutencao_adicional.min, 200);
  assert.equal(compatibilidade.reparo.limites.residual_reparado.max, 360);
  assert.equal(compatibilidade.compativel, false);
});

test("calcula faixas dinâmicas para impedir custo líquido negativo na troca", () => {
  const compatibilidade = core.obterCompatibilidadeCustos({
    preco_substituto: 900,
    custos_acessorios: 100,
    valor_venda_atual: 300,
    residual_substituto: 800
  });

  assert.equal(compatibilidade.troca.completo, true);
  assert.equal(compatibilidade.troca.compativel, false);
  assert.equal(compatibilidade.troca.limites.preco_substituto.min, 1000);
  assert.equal(compatibilidade.troca.limites.custos_acessorios.min, 200);
  assert.equal(compatibilidade.troca.limites.valor_venda_atual.max, 200);
  assert.equal(compatibilidade.troca.limites.residual_substituto.max, 700);
});

test("não acusa incompatibilidade antes de o grupo financeiro estar completo", () => {
  const compatibilidade = core.obterCompatibilidadeCustos({
    custo_reparo: 300,
    residual_reparado: 500,
    preco_substituto: 900,
    valor_venda_atual: 300
  });

  assert.equal(compatibilidade.reparo.completo, false);
  assert.equal(compatibilidade.reparo.compativel, true);
  assert.equal(compatibilidade.troca.completo, false);
  assert.equal(compatibilidade.troca.compativel, true);
  assert.equal(compatibilidade.compativel, true);
});

test("arredonda limites monetários em centavos sem falso negativo de ponto flutuante", () => {
  const compatibilidade = core.obterCompatibilidadeCustos({
    custo_reparo: 0.1,
    manutencao_adicional: 0.2,
    residual_reparado: 0.3
  });

  assert.equal(compatibilidade.reparo.compativel, true);
  assert.equal(compatibilidade.reparo.custo_liquido, 0);
  assert.equal(compatibilidade.reparo.limites.residual_reparado.max, 0.3);
});

test("aceita os limites exatos que produzem custo líquido zero", () => {
  const entrada = entradaBase();
  entrada.residual_reparado = entrada.custo_reparo + entrada.manutencao_adicional;
  entrada.valor_venda_atual = 300;
  entrada.residual_substituto =
    entrada.preco_substituto + entrada.custos_acessorios - entrada.valor_venda_atual;

  const compatibilidade = core.obterCompatibilidadeCustos(entrada);
  const resultado = core.calcularAnalise(entrada);

  assert.equal(compatibilidade.compativel, true);
  assert.equal(resultado.custo_liquido_reparar, 0);
  assert.equal(resultado.custo_liquido_trocar, 0);
  assert.equal(resultado.classificacao, "empate");
});

test("cria PDF local de duas páginas com gráficos vetoriais", () => {
  const resultado = core.calcularAnalise(entradaBase());
  const bytes = pdf.criarRelatorioPdf({
    resultado,
    criterios: {
      risco_reparo: "Médio",
      urgencia_uso: "Alta",
      prioridade_ambiental: "Alta"
    },
    dataHora: "09/11/2026 12:00:00"
  });

  const conteudo = Buffer.from(bytes).toString("latin1");
  assert.ok(bytes instanceof Uint8Array);
  assert.ok(bytes.length > 5000);
  assert.ok(conteudo.startsWith("%PDF-1.4"));
  assert.match(conteudo, /\/Count 2/);
  assert.match(conteudo, /Comparação do custo anual/);
  assert.match(conteudo, /%%EOF\n$/);
});

test("não cria PDF sem resultado e critérios", () => {
  assert.throws(
    () => pdf.criarRelatorioPdf({ resultado: null, criterios: null }),
    /Calcule a análise/
  );
});
