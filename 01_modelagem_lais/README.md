# Fase 1 — Modelagem financeira e inteligência de dados

**Responsável:** Laís Eulálio

**Versão do contrato:** 1.0 (Planejamento v1.3)

**Natureza dos dados:** sintéticos, para finalidade educativa

**Dados da Fase 1:** `casos.csv` contém a base sintética aprovada para a F1, normalizada segundo o contrato 1.0.

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

`casos.csv` contém os oito casos C01–C08, quatro celulares e quatro notebooks. Os valores financeiros, garantias, IDs, tipos, modelos e observações foram preservados da base sintética aprovada para a F1. As colunas foram reordenadas segundo `dicionario_dados.md` e os três critérios qualitativos foram convertidos para o vocabulário fechado do contrato:

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

Esses resultados foram recalculados sobre o CSV publicado. A ODS da Fase 2 mantém os mesmos casos e o mesmo contrato; consulte [`verificacao_f2.md`](verificacao_f2.md) para links, hashes e testes.

## Critérios qualitativos

`risco_reparo`: `Baixo` | `Médio` | `Alto`

`necessidade_usuario`: `Essencial` | `Importante` | `Adiável`

`impacto_ambiental`: `Reparo favorece reuso` | `Equilibrado` | `Troca requer descarte responsável`

Os três critérios são registrados por caso, repetidos nas duas linhas do cenário de Looker e **não entram nas fórmulas**. A observação do caso deve explicar o aprendizado sem nomes, marcas reais, escola, turma ou opinião de participante.

## Limitações

Modelo didático simplificado. Não considera inflação, juros, financiamento, impostos, probabilidade estatística de falha, consumo de energia ou valor do dinheiro no tempo. Os dados são sintéticos e a conclusão financeira não substitui a análise de risco, necessidade de uso e impacto ambiental.

## Testes de referência

Na pasta `01_modelagem_lais`, execute `python -m unittest discover -v`. Os testes cobrem fórmulas e limites, cabeçalho A:R, oito IDs únicos, quatro casos de cada tipo, categorias, garantias inteiras e resultados C01/C03. A ODS e sua exportação XLSX foram validadas na F2; Google Sheets e Looker Studio são tratados na Fase 3, na seção abaixo.

## Fase 3: fonte do Looker Studio

- **Fonte canônica editável:** `modelo_tco_canonico.ods`, no Drive.
- **Cópia versionada:** `modelo_tco_v0.2_2026-11-03.ods`, no Drive, com contrato em `ExportCSV!A1:R9`.
- **CSV de contrato (18 campos, 8 registros):** `casos.csv`. O mesmo conteúdo tem dois hashes, conforme o fim de linha:
  - arquivo LF no Git, 1.607 bytes: SHA-256 `694792AD4E772F102787C5E45942DAE3B332D789F60E9CD142101C4543EE7DBB`;
  - checkout Windows com CRLF, 1.616 bytes: SHA-256 `AF130CF8B43D0F3C6634311F863F0AE78C526F492A8E6AD06AF34B9670DABC46`.
- **CSV importado na fonte (15 colunas, 16 linhas, 8 IDs):** Laís declarou `fonte_looker_v0.3.csv`, LF, 3.022 bytes, SHA-256 `BB247D36AAFCF23FEDB765E86EFF27269732B852C31E7504459F45EAC8B41E7B` na [tarefa F3](https://app.notion.com/p/3fbe84185835817d9d54df0a0b4aa3e9). O arquivo exato e a URL da planilha proprietária ainda não estão disponíveis neste repositório para conferir o hash diretamente. A reconstrução técnica de 2.954 bytes feita por Codex tinha hash diferente e foi retirada para não concorrer com a fonte publicada por Laís.
- **Commit Git de origem:** `0c02bc5`.
- **Fonte derivada:** Laís declarou Google Sheets privado `Conserta ou Troca — Fonte Looker — v0.3`, abas `fonte_looker` e `metadados`, sob propriedade dela. A URL e os metadados de permissão dessa planilha ainda precisam ser apresentados para conferência externa; o Sheets auxiliar criado por Codex na pasta foi removido por não ser a fonte usada no painel.
- **Datas distintas e explícitas:** a base de oito casos foi congelada em 03/11/2026 (v0.2); `data_corte` da derivação v0.3 é 04/11/2026; Laís declarou cópia para o Sheets em 06/11/2026 às 00h40 e publicação do relatório no mesmo dia. Os valores exibidos dos casos conferidos não mudaram.
- **Relatório Looker:** [v0.3 publicado](https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc), com [PDF candidato](https://drive.google.com/file/d/1XRbvmfUWGMsOXkfj5XN-9XKPNGHy0uvo/view) e [captura](https://drive.google.com/file/d/1izrhIeo7G_IE-qeoIy45M5bQ15Q1JCak/view) na pasta de contingência de Laís. Em 06/11 o relatório abriu sem login, mostrou 16 linhas/8 IDs e o filtro C03 retornou R$ 282,86/ano para Trocar e R$ 370,00/ano para Reparar. Laís registrou os marcos `DADOS F3 LIBERADOS` e `CAPTURA LOOKER LIBERADA` nos comentários da tarefa. Resta conferir a URL da planilha, suas permissões e o teste com conta de colega antes de integrar; a URL ainda não autoriza QR definitivo.
