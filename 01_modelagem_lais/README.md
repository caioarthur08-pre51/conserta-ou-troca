# Fase 1 — Modelagem financeira e inteligência de dados

**Responsável:** Laís Eulálio

**Versão do contrato:** 1.0 (Planejamento v1.3)

**Natureza dos dados:** sintéticos, para finalidade educativa

**Integração da Fase 1:** Caio Rocha organizou os arquivos e normalizou `casos.csv` a partir do CSV didático local que aprovou para esta integração. Os commits originais de Laís permanecem no histórico; a normalização não é atribuída a ela.

## Objetivo

Definir um único contrato financeiro e qualitativo que possa ser reproduzido por planilha, MVP, Looker Studio, relatório e slides. O resultado compara custos anuais estimados; não é recomendação de compra.

## Regras de cálculo

- **Reparar:** custo líquido = custo do reparo + manutenção adicional − residual do aparelho reparado.
- **Custo anual de reparar:** custo líquido de reparar ÷ vida adicional estimada, em anos.
- **Trocar:** custo líquido = preço do substituto + acessórios − valor de venda do aparelho atual − residual futuro do substituto.
- **Custo anual de trocar:** custo líquido de trocar ÷ vida útil estimada do substituto, em anos.
- **Diferença anual:** custo anual de reparar − custo anual de trocar.
- Valores negativos na diferença favorecem financeiramente reparar; positivos favorecem trocar. Se o valor absoluto for **estritamente menor que R$ 0,01/ano**, há empate técnico.
- Custos líquidos negativos, entradas monetárias inválidas ou vida útil vazia/não numérica/menor ou igual a zero resultam em `n.a.` e não definem vencedor.
- Preserve precisão completa durante o cálculo; exiba moeda com duas casas decimais. Não arredonde os valores intermediários.
- O preço já pago pelo aparelho atual é custo passado e não entra na comparação.

## Casos e dados

`casos.csv` contém os oito casos C01–C08, quatro celulares e quatro notebooks. Os valores financeiros, garantias, IDs, tipos, modelos e observações foram preservados do CSV didático aprovado por Caio. As colunas foram reordenadas segundo `dicionario_dados.md` e os três critérios qualitativos foram convertidos para o vocabulário fechado do contrato:

| Caso | Risco | Necessidade | Impacto ambiental |
|---|---|---|---|
| C01 | Baixo | Adiável | Reparo favorece reuso |
| C02 | Médio | Importante | Reparo favorece reuso |
| C03 | Alto | Essencial | Troca requer descarte responsável |
| C04 | Médio | Adiável | Reparo favorece reuso |
| C05 | Médio | Importante | Reparo favorece reuso |
| C06 | Médio | Essencial | Reparo favorece reuso |
| C07 | Alto | Adiável | Reparo favorece reuso |
| C08 | Médio | Essencial | Reparo favorece reuso |

Em C08, a descrição original “Baixo a médio” foi classificada como `Médio`, para respeitar o domínio fechado. As descrições originais de necessidade e impacto foram classificadas conforme urgência de uso e efeito de reuso ou descarte. Essas categorias não alteram o cálculo financeiro. Como conferência manual:

- **C01 — reprodução manual:** reparar: `420 + 80 − 120 = 380`; `380 ÷ 1,5 = 253,33 R$/ano`. Trocar: `1.800 + 90 − 180 − 450 = 1.260`; `1.260 ÷ 4 = 315,00 R$/ano`. A diferença não arredondada é negativa; reparar apresenta menor custo anual.
- **C03:** reparar R$ 370,00/ano; trocar R$ 282,86/ano; menor custo anual para trocar.

Esses resultados foram recalculados sobre o CSV publicado. A ODS editável prevista para a Fase 2 deverá manter os mesmos casos e o mesmo contrato.

## Critérios qualitativos

`risco_reparo`: `Baixo` | `Médio` | `Alto`

`necessidade_usuario`: `Essencial` | `Importante` | `Adiável`

`impacto_ambiental`: `Reparo favorece reuso` | `Equilibrado` | `Troca requer descarte responsável`

Os três critérios são registrados por caso, repetidos nas duas linhas do cenário de Looker e **não entram nas fórmulas**. A observação do caso deve explicar o aprendizado sem nomes, marcas reais, escola, turma ou opinião de participante.

## Limitações

Modelo didático simplificado. Não considera inflação, juros, financiamento, impostos, probabilidade estatística de falha, consumo de energia ou valor do dinheiro no tempo. Os dados são sintéticos e a conclusão financeira não substitui a análise de risco, necessidade de uso e impacto ambiental.

## Testes de referência

Na pasta `01_modelagem_lais`, execute `python -m unittest discover -v`. Os testes cobrem fórmulas e limites, cabeçalho A:R, oito IDs únicos, quatro casos de cada tipo, categorias, garantias inteiras e resultados C01/C03. Os artefatos da Fase 2 (ODS, Sheets e Looker Studio) exigem validação própria quando forem produzidos.
