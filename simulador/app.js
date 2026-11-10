(function iniciarAplicacao() {
  "use strict";

  const core = globalThis.SimuladorCore;
  const formulario = document.querySelector("#formulario-analise");
  const formularioDecisao = document.querySelector("#formulario-decisao");
  const resultadoEl = document.querySelector("#resultado");
  const mensagemErro = document.querySelector("#mensagem-erro");
  const mensagemDecisao = document.querySelector("#mensagem-decisao");
  const botaoDownload = document.querySelector("#baixar-planilha");
  const botaoCalcular = document.querySelector("#calcular-analise");
  const estadoRede = document.querySelector("#estado-rede");
  const alertasFaixa = {
    reparo: document.querySelector("#alerta-reparar"),
    troca: document.querySelector("#alerta-trocar")
  };
  const configuracaoFaixas = Object.freeze({
    custo_reparo: { input: "#custo-reparo", texto: "#limite-custo-reparo", grupo: "reparo" },
    manutencao_adicional: { input: "#manutencao-adicional", texto: "#limite-manutencao", grupo: "reparo" },
    residual_reparado: { input: "#residual-reparado", texto: "#limite-residual-reparado", grupo: "reparo" },
    preco_substituto: { input: "#preco-substituto", texto: "#limite-preco-substituto", grupo: "troca" },
    custos_acessorios: { input: "#custos-acessorios", texto: "#limite-acessorios", grupo: "troca" },
    valor_venda_atual: { input: "#valor-venda-atual", texto: "#limite-venda-atual", grupo: "troca" },
    residual_substituto: { input: "#residual-substituto", texto: "#limite-residual-substituto", grupo: "troca" }
  });
  let resultadoAtual = null;
  let criteriosAtuais = null;
  let temporizadorRedirecionamento = null;
  let assinaturaRedirecionada = "";

  const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const numero = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  function lerNumero(dados, nome) {
    const valor = dados.get(nome);
    return valor === null || String(valor).trim() === "" ? Number.NaN : Number(valor);
  }

  function lerEntrada() {
    const dados = new FormData(formulario);
    return {
      entrada: {
        custo_reparo: lerNumero(dados, "custo_reparo"),
        manutencao_adicional: lerNumero(dados, "manutencao_adicional"),
        residual_reparado: lerNumero(dados, "residual_reparado"),
        vida_adicional_meses: lerNumero(dados, "vida_adicional_meses"),
        preco_substituto: lerNumero(dados, "preco_substituto"),
        custos_acessorios: lerNumero(dados, "custos_acessorios"),
        valor_venda_atual: lerNumero(dados, "valor_venda_atual"),
        residual_substituto: lerNumero(dados, "residual_substituto"),
        vida_substituto_meses: lerNumero(dados, "vida_substituto_meses")
      },
      criterios: {
        risco_reparo: String(dados.get("risco_reparo") || ""),
        urgencia_uso: String(dados.get("urgencia_uso") || ""),
        prioridade_ambiental: String(dados.get("prioridade_ambiental") || "")
      }
    };
  }

  function lerCustosParciais() {
    const custos = {};
    for (const [nome, configuracao] of Object.entries(configuracaoFaixas)) {
      const campo = document.querySelector(configuracao.input);
      custos[nome] = campo.value.trim() === "" ? null : Number(campo.value);
    }
    return custos;
  }

  function textoFaixa(faixa) {
    const minimo = moeda.format(faixa.min || 0);
    if (Number.isFinite(faixa.max)) {
      return `Faixa permitida com os demais valores: de ${minimo} a ${moeda.format(faixa.max)}.`;
    }
    return `Faixa permitida com os demais valores: ${minimo} ou mais.`;
  }

  function aplicarFaixa(nome, faixa, grupoCompleto) {
    const configuracao = configuracaoFaixas[nome];
    const campo = document.querySelector(configuracao.input);
    const texto = document.querySelector(configuracao.texto);
    const valor = campo.value.trim() === "" ? null : Number(campo.value);

    campo.min = String(faixa.min || 0);
    if (Number.isFinite(faixa.max)) campo.max = String(faixa.max);
    else campo.removeAttribute("max");

    texto.textContent = textoFaixa(faixa);
    const abaixo = valor !== null && Number.isFinite(valor) && valor < faixa.min - 1e-9;
    const acima = valor !== null && Number.isFinite(valor) &&
      Number.isFinite(faixa.max) && valor > faixa.max + 1e-9;
    const incompatível = grupoCompleto && (abaixo || acima);

    campo.setCustomValidity(incompatível ? `Valor incompatível. ${texto.textContent}` : "");
    if (incompatível) campo.setAttribute("aria-invalid", "true");
    else campo.removeAttribute("aria-invalid");
    campo.closest(".campo").classList.toggle("campo-invalido", incompatível);
  }

  function mensagemReparo(estado, custos) {
    const limites = estado.limites;
    return [
      "Os valores do reparo produziriam custo líquido negativo.",
      `Para compatibilizar, informe custo do reparo de pelo menos ${moeda.format(limites.custo_reparo.min)},`,
      `manutenção de pelo menos ${moeda.format(limites.manutencao_adicional.min)}`,
      `ou reduza o valor residual para no máximo ${moeda.format(limites.residual_reparado.max)}.`,
      `Valores atuais: ${moeda.format(custos.custo_reparo)} + ${moeda.format(custos.manutencao_adicional)} − ${moeda.format(custos.residual_reparado)}.`
    ].join(" ");
  }

  function mensagemTroca(estado, custos) {
    const limites = estado.limites;
    return [
      "Os valores da troca produziriam custo líquido negativo.",
      `Para compatibilizar, informe preço do substituto de pelo menos ${moeda.format(limites.preco_substituto.min)},`,
      `acessórios de pelo menos ${moeda.format(limites.custos_acessorios.min)},`,
      `reduza a venda para no máximo ${moeda.format(limites.valor_venda_atual.max)}`,
      `ou reduza o residual para no máximo ${moeda.format(limites.residual_substituto.max)}.`,
      `Valores atuais: ${moeda.format(custos.preco_substituto)} + ${moeda.format(custos.custos_acessorios)} − ${moeda.format(custos.valor_venda_atual)} − ${moeda.format(custos.residual_substituto)}.`
    ].join(" ");
  }

  function redirecionarParaCorrecao(grupo, assinatura) {
    if (assinatura === assinaturaRedirecionada) return;
    assinaturaRedirecionada = assinatura;
    const seletor = grupo === "reparo" ? "#custo-reparo" : "#preco-substituto";
    const campo = document.querySelector(seletor);
    campo.focus({ preventScroll: true });
    campo.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function atualizarCompatibilidade({ agendarRedirecionamento = false } = {}) {
    const custos = lerCustosParciais();
    const compatibilidade = core.obterCompatibilidadeCustos(custos);

    for (const [nome, faixa] of Object.entries(compatibilidade.reparo.limites)) {
      aplicarFaixa(nome, faixa, compatibilidade.reparo.completo);
    }
    for (const [nome, faixa] of Object.entries(compatibilidade.troca.limites)) {
      aplicarFaixa(nome, faixa, compatibilidade.troca.completo);
    }

    const grupos = [
      ["reparo", compatibilidade.reparo, mensagemReparo],
      ["troca", compatibilidade.troca, mensagemTroca]
    ];
    for (const [nome, estado, criarMensagem] of grupos) {
      const alerta = alertasFaixa[nome];
      const incompatível = estado.completo && !estado.compativel;
      alerta.hidden = !incompatível;
      alerta.textContent = incompatível ? criarMensagem(estado, custos) : "";
    }

    botaoCalcular.disabled = !compatibilidade.compativel;
    if (compatibilidade.compativel) botaoCalcular.removeAttribute("aria-describedby");
    else botaoCalcular.setAttribute("aria-describedby", "alerta-reparar alerta-trocar");

    globalThis.clearTimeout(temporizadorRedirecionamento);
    if (compatibilidade.compativel) {
      assinaturaRedirecionada = "";
    } else if (agendarRedirecionamento) {
      const grupo = !compatibilidade.reparo.compativel ? "reparo" : "troca";
      const assinatura = `${grupo}:${JSON.stringify(custos)}`;
      temporizadorRedirecionamento = globalThis.setTimeout(
        () => redirecionarParaCorrecao(grupo, assinatura),
        700
      );
    }

    return compatibilidade;
  }

  function exibirErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
    mensagemErro.focus();
  }

  function ocultarErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;
  }

  function textoVidaEquilibrio(valor) {
    if (valor === null) {
      return "Não há ponto de equilíbrio: trocar tem custo anual igual a zero com os valores informados.";
    }
    if (valor === 0) {
      return "O custo líquido do reparo é zero; o empate ocorre desde o primeiro mês.";
    }
    return `${numero.format(valor)} meses ou mais, mantidas as demais estimativas.`;
  }

  function montarCriterios(criterios) {
    const itens = [
      `Risco de o reparo não resolver: ${criterios.risco_reparo}.`,
      `Urgência da necessidade de uso: ${criterios.urgencia_uso}.`,
      `Importância ambiental de prolongar a vida útil: ${criterios.prioridade_ambiental}.`
    ];
    const lista = document.querySelector("#lista-criterios");
    lista.replaceChildren();
    for (const texto of itens) {
      const item = document.createElement("li");
      item.textContent = texto;
      lista.append(item);
    }
  }

  function renderizarResultado(resultado, criterios) {
    document.querySelector("#resultado-principal").textContent =
      core.textoClassificacao(resultado.classificacao);
    document.querySelector("#resultado-limite").textContent =
      "O resultado depende das estimativas informadas. Risco técnico, tempo sem o aparelho, segurança e impacto ambiental não entram na fórmula.";
    document.querySelector("#custo-anual-reparar").textContent =
      `${moeda.format(resultado.custo_anual_reparar)} por ano`;
    document.querySelector("#custo-liquido-reparar").textContent =
      `Custo líquido: ${moeda.format(resultado.custo_liquido_reparar)}`;
    document.querySelector("#custo-anual-trocar").textContent =
      `${moeda.format(resultado.custo_anual_trocar)} por ano`;
    document.querySelector("#custo-liquido-trocar").textContent =
      `Custo líquido: ${moeda.format(resultado.custo_liquido_trocar)}`;
    document.querySelector("#diferenca-anual").textContent =
      resultado.classificacao === "empate"
        ? `${moeda.format(resultado.diferenca_anual_absoluta)} por ano; abaixo da margem de R$ 1,00.`
        : `${moeda.format(resultado.diferenca_anual_absoluta)} por ano.`;
    document.querySelector("#vida-equilibrio").textContent =
      textoVidaEquilibrio(resultado.vida_equilibrio_reparo_meses);
    montarCriterios(criterios);

    formularioDecisao.reset();
    mensagemDecisao.hidden = true;
    botaoDownload.hidden = true;
    resultadoEl.hidden = false;
    resultadoEl.focus();
    resultadoEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function atualizarDisponibilidadeDownload() {
    const dados = new FormData(formularioDecisao);
    const decisao = String(dados.get("decisao_aluno") || "");
    const justificativa = String(dados.get("justificativa") || "").trim();
    botaoDownload.hidden = !(decisao && justificativa.length >= 10);
  }

  function nomeArquivoCsv() {
    const agora = new Date();
    const dois = (valor) => String(valor).padStart(2, "0");
    return `analise-conserta-ou-troca-${agora.getFullYear()}-${dois(agora.getMonth() + 1)}-${dois(agora.getDate())}-${dois(agora.getHours())}${dois(agora.getMinutes())}.csv`;
  }

  formulario.addEventListener("input", (evento) => {
    resultadoAtual = null;
    criteriosAtuais = null;
    resultadoEl.hidden = true;
    ocultarErro();
    if (evento.target instanceof HTMLInputElement && configuracaoFaixas[evento.target.name]) {
      atualizarCompatibilidade({ agendarRedirecionamento: true });
    }
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    ocultarErro();

    const compatibilidade = atualizarCompatibilidade();
    if (!compatibilidade.compativel) {
      const grupo = !compatibilidade.reparo.compativel ? "reparo" : "troca";
      redirecionarParaCorrecao(grupo, `${grupo}:envio:${Date.now()}`);
      return;
    }

    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      exibirErro("Revise os campos destacados. Todos os valores e os três critérios são obrigatórios.");
      return;
    }

    try {
      const dados = lerEntrada();
      resultadoAtual = core.calcularAnalise(dados.entrada, 1);
      criteriosAtuais = Object.freeze({ ...dados.criterios });
      renderizarResultado(resultadoAtual, criteriosAtuais);
    } catch (erro) {
      resultadoAtual = null;
      criteriosAtuais = null;
      resultadoEl.hidden = true;
      exibirErro(erro instanceof Error ? erro.message : "Não foi possível calcular.");
    }
  });

  formulario.addEventListener("reset", () => {
    resultadoAtual = null;
    criteriosAtuais = null;
    resultadoEl.hidden = true;
    ocultarErro();
    globalThis.clearTimeout(temporizadorRedirecionamento);
    globalThis.setTimeout(() => {
      atualizarCompatibilidade();
      document.querySelector("#custo-reparo").focus();
    }, 0);
  });

  formularioDecisao.addEventListener("input", atualizarDisponibilidadeDownload);
  formularioDecisao.addEventListener("change", atualizarDisponibilidadeDownload);

  formularioDecisao.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mensagemDecisao.hidden = true;

    if (!resultadoAtual || !criteriosAtuais || !formularioDecisao.checkValidity()) {
      formularioDecisao.reportValidity();
      mensagemDecisao.textContent = "Escolha uma decisão e escreva uma justificativa com pelo menos 10 caracteres.";
      mensagemDecisao.hidden = false;
      return;
    }

    try {
      const dados = new FormData(formularioDecisao);
      const csv = core.criarCsvAnalise({
        resultado: resultadoAtual,
        criterios: criteriosAtuais,
        decisao: String(dados.get("decisao_aluno")),
        justificativa: String(dados.get("justificativa")),
        dataHora: new Date().toLocaleString("pt-BR")
      });
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = nomeArquivoCsv();
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (erro) {
      mensagemDecisao.textContent = erro instanceof Error ? erro.message : "Não foi possível criar a planilha.";
      mensagemDecisao.hidden = false;
    }
  });

  document.querySelector("#nova-analise").addEventListener("click", () => {
    formulario.reset();
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  });

  function atualizarEstadoRede() {
    estadoRede.textContent = navigator.onLine
      ? "Conectado. A página fica disponível offline depois do primeiro carregamento completo."
      : "Sem internet. Você pode continuar usando a versão já carregada.";
  }

  globalThis.addEventListener("online", atualizarEstadoRede);
  globalThis.addEventListener("offline", atualizarEstadoRede);
  atualizarEstadoRede();
  atualizarCompatibilidade();

  if ("serviceWorker" in navigator && /^https?:$/.test(globalThis.location.protocol)) {
    globalThis.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        estadoRede.textContent = "A página está online, mas o modo offline não pôde ser preparado neste navegador.";
      });
    });
  }
})();
