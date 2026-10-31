# Dicionário de dados — contrato da Fase 1

**Responsável:** Laís Eulálio  
**Versão do contrato:** 1.0  
**Base de referência:** contrato do Planejamento v1.3  
**Origem dos valores:** planilha canônica privada, a conferir na integração. Não incluir neste repositório planilha restrita, credenciais ou dados pessoais.  
**Natureza:** casos sintéticos para finalidade educativa.

## Convenções

- Moeda em reais (R$); cálculos preservam precisão total e a apresentação exibe duas casas decimais.
- CSV UTF-8, delimitador vírgula, ponto decimal e aspas duplas para campos textuais que contenham vírgula.
- `n.a.` indica cálculo indisponível/inválido; não é valor numérico e não define vencedor.
- `ODS` é a fonte canônica; XLSX, CSV, Google Sheets e Looker Studio são derivados e não devem implementar fórmulas divergentes.
- Os campos qualitativos são descritivos, com vocabulário fechado, e não entram nas fórmulas financeiras.
- Os 18 campos abaixo seguem a ordem contratual A:R: 14 campos de identificação/entradas, três critérios e uma observação. Não inserir saídas calculadas no CSV canônico.
- Os nomes técnicos e categorias são sensíveis à grafia contratual: preservar acentos, espaços e maiúsculas/minúsculas exatamente como definidos.

Cabeçalhos obrigatórios, nesta ordem, sem linha de título adicional:

```text
caso_id,tipo_dispositivo,modelo_ficticio,custo_reparo,manutencao_adicional,residual_reparado,vida_adicional_anos,garantia_reparo_meses,preco_substituto,custos_acessorios,valor_venda_atual,residual_substituto,vida_substituto_anos,garantia_substituto_meses,risco_reparo,necessidade_usuario,impacto_ambiental,observacao
```

A linha de cabeçalho é A1:R1; os oito casos ocupam A2:R9, um por ID C01–C08, sem IDs duplicados. Os critérios ficam em O:Q e `observacao` em R.

## Campos de entrada canônicos (A:N)

| # | Campo | Descrição | Origem | Tipo | Obrigatório | Unidade / domínio | Vazio ou inválido | Exemplo de formato | Consumidores |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `caso_id` | Identificador único do caso sintético. | Aba `Casos` da planilha canônica | Texto | Sim | `C01`–`C08`; único por registro | Rejeitar vazio ou duplicado. | `C01` | Planilha, MVP, Looker, relatório, slides |
| 2 | `tipo_dispositivo` | Categoria do aparelho considerado. | Aba `Casos` | Categoria | Sim | `Celular` ou `Notebook` | Rejeitar valor fora da lista. | `Celular` | Planilha, MVP, Looker, relatório, slides |
| 3 | `modelo_ficticio` | Identificação fictícia do aparelho; sem marca real. | Aba `Casos` | Texto | Sim | Texto não vazio; nome fictício | Rejeitar vazio ou marca/dado pessoal real. | `Celular A` | Planilha, MVP, Looker, relatório, slides |
| 4 | `custo_reparo` | Desembolso estimado para reparar. | Aba `Casos` | Decimal | Sim | R$; mínimo 0 | Vazio, texto ou negativo invalida o cálculo. Zero somente se premissa legítima. | `420.00` | Planilha, cálculo, relatório |
| 5 | `manutencao_adicional` | Manutenção futura além do reparo. | Aba `Casos` | Decimal | Sim | R$; mínimo 0 | Vazio, texto ou negativo invalida o cálculo. Zero permitido se não houver custo adicional. | `80.00` | Planilha, cálculo, relatório |
| 6 | `residual_reparado` | Valor recuperável futuro do aparelho reparado. | Aba `Casos` | Decimal | Sim | R$; mínimo 0 | Vazio, texto ou negativo invalida o cálculo. Zero permitido se não houver residual. | `120.00` | Planilha, cálculo, relatório |
| 7 | `vida_adicional_anos` | Tempo adicional estimado de uso após reparar. | Aba `Casos` | Decimal | Sim | Anos; estritamente maior que 0 | Vazio, texto, zero ou negativo resulta em `n.a.`. | `1.5` | Planilha, cálculo, relatório |
| 8 | `garantia_reparo_meses` | Duração da garantia do reparo, se aplicável. | Aba `Casos` | Inteiro | Sim | Meses; mínimo 0 | Vazio ou não inteiro deve ser corrigido antes da publicação. Zero permitido se sem garantia. | `6` | Planilha, MVP, relatório |
| 9 | `preco_substituto` | Preço estimado do aparelho substituto. | Aba `Casos` | Decimal | Sim | R$; mínimo 0 | Vazio, texto ou negativo invalida o cálculo. | `1800.00` | Planilha, cálculo, relatório |
| 10 | `custos_acessorios` | Custos futuros de acessórios necessários ao substituto. | Aba `Casos` | Decimal | Sim | R$; mínimo 0 | Vazio, texto ou negativo invalida o cálculo. Zero permitido se não houver acessórios. | `90.00` | Planilha, cálculo, relatório |
| 11 | `valor_venda_atual` | Valor estimado obtido ao vender o aparelho atual. | Aba `Casos` | Decimal | Sim | R$; mínimo 0 | Vazio, texto ou negativo invalida o cálculo. Zero permitido se não houver venda. | `180.00` | Planilha, cálculo, relatório |
| 12 | `residual_substituto` | Valor recuperável futuro do aparelho substituto. | Aba `Casos` | Decimal | Sim | R$; mínimo 0 | Vazio, texto ou negativo invalida o cálculo. Zero permitido se não houver residual. | `450.00` | Planilha, cálculo, relatório |
| 13 | `vida_substituto_anos` | Tempo de uso estimado do aparelho substituto. | Aba `Casos` | Decimal | Sim | Anos; estritamente maior que 0 | Vazio, texto, zero ou negativo resulta em `n.a.`. | `4` | Planilha, cálculo, relatório |
| 14 | `garantia_substituto_meses` | Duração da garantia do aparelho substituto. | Aba `Casos` | Inteiro | Sim | Meses; mínimo 0 | Vazio ou não inteiro deve ser corrigido antes da publicação. Zero permitido somente se premissa legítima. | `12` | Planilha, MVP, relatório |

## Critérios qualitativos e observação (O:R)

| # | Campo | Descrição | Origem | Tipo | Obrigatório | Unidade / domínio | Vazio ou inválido | Exemplo de formato | Consumidores |
|---:|---|---|---|---|---|---|---|---|---|
| 15 | `risco_reparo` | Incerteza sintética de o reparo sustentar a vida adicional estimada. | Aba `Casos` | Categoria | Sim | `Baixo`, `Médio`, `Alto` | Corrigir antes da publicação; não inferir automaticamente do custo. | `Médio` | Planilha, MVP, Looker, relatório, slides |
| 16 | `necessidade_usuario` | Urgência fictícia de disponibilidade e desempenho. | Aba `Casos` | Categoria | Sim | `Essencial`, `Importante`, `Adiável` | Corrigir antes da publicação; não entra na fórmula. | `Importante` | Planilha, MVP, Looker, relatório, slides |
| 17 | `impacto_ambiental` | Reflexão qualitativa sobre reuso/descarte; não é medição ambiental. | Aba `Casos` | Categoria | Sim | `Reparo favorece reuso`, `Equilibrado`, `Troca requer descarte responsável` | Corrigir antes da publicação; não apresentar como métrica quantitativa. | `Reparo favorece reuso` | Planilha, MVP, Looker, relatório, slides |
| 18 | `observacao` | Explicação curta e específica do aprendizado do caso, sem recomendar compra. | Aba `Casos` | Texto | Sim | Texto simples; sem pessoa, marca real, escola, turma ou dado pessoal | Corrigir ausência; não preencher com informação inventada. | `Comparar custo anual com risco, necessidade e reuso.` | Planilha, MVP, Looker, relatório, slides |

## Saídas derivadas

Estas saídas não fazem parte dos 18 campos de entrada A:R. São calculadas pela planilha ou pelo código de referência; não digitar resultados manualmente nem adicioná-las como colunas no `ExportCSV` canônico.

| Saída | Fórmula / regra | Tipo e unidade | Tratamento de inválidos | Consumidores |
|---|---|---|---|---|
| `custo_liquido_reparar` | `custo_reparo + manutencao_adicional - residual_reparado` | Decimal, R$ | `n.a.` se alguma entrada obrigatória inválida ou resultado negativo. | Planilha, MVP, Looker derivado, relatório |
| `custo_anual_reparar` | `custo_liquido_reparar / vida_adicional_anos` | Decimal, R$/ano | `n.a.` se custo líquido inválido/negativo ou vida útil inválida. | Planilha, MVP, Looker, relatório, slides |
| `custo_liquido_trocar` | `preco_substituto + custos_acessorios - valor_venda_atual - residual_substituto` | Decimal, R$ | `n.a.` se alguma entrada obrigatória inválida ou resultado negativo. | Planilha, MVP, Looker derivado, relatório |
| `custo_anual_trocar` | `custo_liquido_trocar / vida_substituto_anos` | Decimal, R$/ano | `n.a.` se custo líquido inválido/negativo ou vida útil inválida. | Planilha, MVP, Looker, relatório, slides |
| `diferenca_anual` | `custo_anual_reparar - custo_anual_trocar` | Decimal, R$/ano | `n.a.` se qualquer custo anual não for numérico. | Planilha, MVP, relatório, slides |
| `resultado` | Se `ABS(diferenca_anual) < 0.01`: `Empate técnico`; se negativa: `Reparar`; se positiva: `Trocar`. | Categoria | Domínio exato: `Reparar`, `Trocar`, `Empate técnico`, `n.a.`. `n.a.` se cálculo inválido; empate é estrito (`<`, não `<=`). Campo derivado, fora dos 18 campos A:R. | Planilha, MVP, Looker, relatório, slides |
| `versao_base` | Identificador da versão da base usada na exportação. | Texto | Obrigatória nos metadados da fonte Looker. | Looker, relatório, slides |
| `data_corte` | Data de referência da versão da base. | Data ISO `AAAA-MM-DD` | Obrigatória nos metadados da fonte Looker. | Looker, relatório, slides |

### Fonte longa derivada para Looker Studio

`fonte_looker` é uma derivação dos dados financeiros conferidos, não uma segunda calculadora. Conforme o planejamento, deve conter 15 colunas e 16 linhas de dados — `Reparar` e `Trocar` para cada um dos oito casos — com os campos: `versao_base`, `data_corte`, `caso_id`, `tipo_dispositivo`, `modelo_ficticio`, `cenario`, `custo_liquido`, `vida_util_anos`, `custo_anual`, `garantia_meses`, `resultado`, `risco_reparo`, `necessidade_usuario`, `impacto_ambiental`, `observacao`. Valores devem coincidir com a planilha canônica; custos são exibidos em R$/ano e comparados somente dentro do mesmo caso. Não somar aparelhos/casos diferentes.

## Regra financeira oficial

O preço originalmente pago pelo aparelho atual é um gasto passado e fica fora das fórmulas. Os critérios qualitativos complementam a leitura e nunca alteram o resultado financeiro. A decisão compara apenas os custos anuais calculados, sem arredondar valores intermediários.
