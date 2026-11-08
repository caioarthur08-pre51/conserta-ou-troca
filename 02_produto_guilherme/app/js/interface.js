(function publicarInterface() {
  const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const numero = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 6
  });

  function preencherCasos(select, casos) {
    select.replaceChildren();
    for (const caso of casos) {
      const opcao = document.createElement("option");
      opcao.value = caso.caso_id;
      opcao.textContent =
        caso.caso_id + " — " + caso.tipo_dispositivo + " " + caso.modelo_ficticio;
      select.append(opcao);
    }
  }

  function mostrarCasoBase(caso) {
    document.querySelector("#descricao-caso").textContent =
      caso.caso_id + " — " + caso.modelo_ficticio + ". " + caso.observacao;
    document.querySelector("#premissas-caso").textContent =
      "Reparar: manutenção adicional " + moeda.format(caso.manutencao_adicional) +
      ", residual " + moeda.format(caso.residual_reparado) +
      ", vida " + numero.format(caso.vida_adicional_anos) +
      " ano(s). Trocar: preço " + moeda.format(caso.preco_substituto) +
      ", acessórios " + moeda.format(caso.custos_acessorios) +
      ", venda atual " + moeda.format(caso.valor_venda_atual) +
      ", residual " + moeda.format(caso.residual_substituto) +
      ", vida " + numero.format(caso.vida_substituto_anos) + " ano(s).";
    document.querySelector("#custo-reparo").value = caso.custo_reparo;
    document.querySelector("#vida-adicional").value = caso.vida_adicional_anos;
  }

  function adicionarCelula(linha, texto, cabecalho = false) {
    const celula = document.createElement(cabecalho ? "th" : "td");
    celula.textContent = texto;
    if (cabecalho) celula.scope = "col";
    linha.append(celula);
  }

  function criarTabela(resultado) {
    const tabela = document.createElement("table");
    tabela.setAttribute("aria-label", "Comparação dos custos");
    const cabecalho = tabela.createTHead().insertRow();
    adicionarCelula(cabecalho, "Alternativa", true);
    adicionarCelula(cabecalho, "Custo líquido", true);
    adicionarCelula(cabecalho, "Custo anual", true);

    const corpo = tabela.createTBody();
    const reparar = corpo.insertRow();
    adicionarCelula(reparar, "Reparar");
    adicionarCelula(reparar, moeda.format(resultado.custo_liquido_reparar));
    adicionarCelula(reparar, moeda.format(resultado.custo_anual_reparar));
    const trocar = corpo.insertRow();
    adicionarCelula(trocar, "Trocar");
    adicionarCelula(trocar, moeda.format(resultado.custo_liquido_trocar));
    adicionarCelula(trocar, moeda.format(resultado.custo_anual_trocar));
    return tabela;
  }

  function criarBarra(rotulo, valor, maximo) {
    const grupo = document.createElement("div");
    grupo.className = "grupo-barra";
    const texto = document.createElement("p");
    texto.textContent = rotulo + ": " + moeda.format(valor) + " por ano";
    const trilho = document.createElement("div");
    trilho.className = "trilho";
    trilho.setAttribute("aria-hidden", "true");
    const barra = document.createElement("div");
    barra.className = "barra";
    barra.style.width = (valor / maximo * 100).toFixed(2) + "%";
    trilho.append(barra);
    grupo.append(texto, trilho);
    return grupo;
  }

  function renderizarErro(mensagem) {
    const saida = document.querySelector("#mensagem");
    saida.textContent = mensagem;
    saida.className = "erro";
    document.querySelector("#resultados").hidden = true;
  }

  function renderizarResultado(resultado, caso, resultadoBase, entradaEditada) {
    if (!resultado.valido) {
      renderizarErro(resultado.mensagem);
      return;
    }

    const saida = document.querySelector("#mensagem");
    saida.textContent = "Cálculo concluído.";
    saida.className = "sucesso";
    document.querySelector("#resultados").hidden = false;
    document.querySelector("#caso-simulacao").textContent =
      "Caso " + caso.caso_id + " — " + caso.tipo_dispositivo +
      " " + caso.modelo_ficticio + ". Dados sintéticos.";
    document.querySelector("#decisao").textContent =
      "Resultado financeiro: " + resultado.decisao + ".";
    document.querySelector("#explicacao-resultado").textContent =
      "Custo anual: reparar " + moeda.format(resultado.custo_anual_reparar) +
      "; trocar " + moeda.format(resultado.custo_anual_trocar) +
      ". Diferença: " + moeda.format(resultado.diferenca_anual) +
      " por ano. Resultado: " + resultado.decisao +
      ". Isso depende das premissas e pode mudar se elas mudarem.";
    document.querySelector("#premissas-simulacao").textContent =
      "Simulação: reparo " + moeda.format(entradaEditada.custo_reparo) +
      "; vida adicional " + numero.format(entradaEditada.vida_adicional_anos) +
      " ano(s). A tabela e o gráfico usam R$/ano.";

    const mudou =
      resultadoBase.valido && resultado.decisao !== resultadoBase.decisao;
    document.querySelector("#sensibilidade").textContent = mudou
      ? "Sensibilidade: a alteração mudou o resultado de " +
        resultadoBase.decisao + " para " + resultado.decisao + "."
      : "Sensibilidade: a alteração não mudou a classificação do caso.";

    document.querySelector("#tabela-resultados").replaceChildren(
      criarTabela(resultado)
    );
    const maximo = Math.max(
      resultado.custo_anual_reparar,
      resultado.custo_anual_trocar,
      0.01
    );
    document.querySelector("#grafico-resultados").replaceChildren(
      criarBarra("Reparar", resultado.custo_anual_reparar, maximo),
      criarBarra("Trocar", resultado.custo_anual_trocar, maximo)
    );

    // Redação exata de 03_conteudo_leticia/textos_interface.md (contrato v0.3).
    document.querySelector("#garantia-reparo").textContent =
      "Garantia do reparo: " + caso.garantia_reparo_meses + " meses.";
    document.querySelector("#garantia-substituto").textContent =
      "Garantia do substituto: " + caso.garantia_substituto_meses + " meses.";
    document.querySelector("#risco-reparo").textContent =
      "Risco do reparo: " + caso.risco_reparo;
    document.querySelector("#necessidade-usuario").textContent =
      "Necessidade do usuário: " + caso.necessidade_usuario;
    document.querySelector("#impacto-ambiental").textContent =
      "Impacto ambiental (reflexão qualitativa, não é medição): " + caso.impacto_ambiental;
  }

  globalThis.preencherCasos = preencherCasos;
  globalThis.mostrarCasoBase = mostrarCasoBase;
  globalThis.renderizarErro = renderizarErro;
  globalThis.renderizarResultado = renderizarResultado;
})();
