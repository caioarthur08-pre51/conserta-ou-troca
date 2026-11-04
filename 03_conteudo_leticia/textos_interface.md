# Contrato textual do MVP e dos slides

Versão do contrato: **v0.2** (Fase 2) · Responsável pela redação: Letícia Costa
Consumidores: Guilherme (MVP) e Larissa (slides e guia diagramado)
Base: `01_modelagem_lais/dicionario_dados.md` (contrato v1.0) e `02_produto_guilherme/especificacao_mvp.md`.

## Regras de uso

1. Somente Letícia altera este contrato. Guilherme e Larissa podem pedir ajustes, informando a chave, o problema e o limite de espaço.
2. Os rótulos (`rotulo_*`) têm a mesma redação no MVP, no relatório e nos slides. Eles coincidem com o domínio do campo `resultado` do dicionário de dados: `Reparar`, `Trocar` e `Empate técnico`.
3. Termos sensíveis: ver a chave `termos_sensiveis`. Nunca "sempre" nem "garantido".
4. Os campos entre chaves são preenchidos pelo MVP com os nomes do dicionário de dados. Valores em reais chegam já formatados em pt-BR (por exemplo, `R$ 253,33`), e por isso o texto não repete "R$" antes do campo.
5. Cada chave tem valor, versão curta (para espaços menores) e versão. Se a versão curta estiver vazia (—), o valor principal já é curto.
6. Sem marcas reais, sem recomendação comercial, sem coleta de dados de estudantes.

## Campos preenchidos pelo MVP

| Campo | Significado |
| --- | --- |
| `{custo_anual_reparar}` | custo anual de reparar |
| `{custo_anual_trocar}` | custo anual de trocar |
| `{diferenca_anual}` | custo anual de reparar menos custo anual de trocar |
| `{resultado}` | `Reparar`, `Trocar` ou `Empate técnico` |
| `{risco_reparo}` | `Baixo`, `Médio` ou `Alto` |
| `{necessidade_usuario}` | `Essencial`, `Importante` ou `Adiável` |
| `{impacto_ambiental}` | `Reparo favorece reuso`, `Equilibrado` ou `Troca requer descarte responsável` |

## Chaves

### Aviso

| Chave | Valor | Versão curta | Usado em | Versão |
| --- | --- | --- | --- | --- |
| `aviso_educativo` | Simulação educativa com dados sintéticos. Não é recomendação comercial. | — | MVP, slides 5 e 8, guia | v0.2 |

### Rótulos do resultado

| Chave | Valor | Versão curta | Usado em | Versão |
| --- | --- | --- | --- | --- |
| `rotulo_reparar` | Reparar | — | MVP, relatório, slides 5 e 6 | v0.2 |
| `rotulo_trocar` | Trocar | — | MVP, relatório, slides 5 e 6 | v0.2 |
| `rotulo_empate` | Empate técnico | — | MVP, relatório, slides 5 e 6 | v0.2 |

### Mensagens de erro

As mensagens aparecem na região `aria-live` do MVP e ocultam os resultados, conforme a especificação.

| Chave | Valor | Versão curta | Usado em | Versão |
| --- | --- | --- | --- | --- |
| `erro_vazio` | Preencha este campo para calcular. | — | MVP | v0.2 |
| `erro_texto` | Digite apenas números neste campo. | — | MVP | v0.2 |
| `erro_negativo` | Digite um valor maior ou igual a 0. | — | MVP | v0.2 |
| `erro_vida_zero` | A vida adicional precisa ser maior que 0 anos. | — | MVP | v0.2 |
| `erro_liquido_negativo` | Com esses valores, o custo líquido fica negativo e o cálculo não é válido. Revise os dados. | Custo líquido negativo: revise os dados. | MVP | v0.2 |

A chave `erro_liquido_negativo` é uma **inclusão proposta**: a especificação do MVP prevê erro para custo líquido negativo, e o contrato original não tinha texto para ele. Guilherme confirma se usa.

### Explicação do resultado

| Chave | Valor | Versão curta | Usado em | Versão |
| --- | --- | --- | --- | --- |
| `explicacao_resultado` | Custo anual: reparar {custo_anual_reparar}; trocar {custo_anual_trocar}. Diferença: {diferenca_anual} por ano. Resultado: {resultado}. Isso depende das premissas e pode mudar se elas mudarem. | Reparar {custo_anual_reparar}; trocar {custo_anual_trocar}. Depende das premissas. | MVP, slide 5 | v0.2 |

### Critérios não financeiros

Os critérios nunca alteram o resultado financeiro.

| Chave | Valor | Versão curta | Usado em | Versão |
| --- | --- | --- | --- | --- |
| `risco_reparo` | Risco do reparo: {risco_reparo} | Risco: {risco_reparo} | MVP, slide 6, guia | v0.2 |
| `necessidade_usuario` | Necessidade do usuário: {necessidade_usuario} | Necessidade: {necessidade_usuario} | MVP, slide 6, guia | v0.2 |
| `impacto_ambiental` | Impacto ambiental (reflexão qualitativa, não é medição): {impacto_ambiental} | Ambiental: {impacto_ambiental} | MVP, slide 6, guia | v0.2 |

### Termos sensíveis

| Chave | Valor | Versão curta | Usado em | Versão |
| --- | --- | --- | --- | --- |
| `termos_sensiveis` | Usar: "pode favorecer", "depende das premissas" e "empate técnico". Nunca usar: "sempre" e "garantido". Evitar também "recomendamos" e "o melhor", que sugerem recomendação comercial. | — | MVP, relatório, slides, guia | v0.2 |

## Pendências e pontos para confirmação

| Ponto | Responsável | Observação |
| --- | --- | --- |
| Garantias na tela | Guilherme | A especificação lista garantias entre os critérios não financeiros, mas o contrato não tem chave para elas. Se o MVP precisar de rótulo, informar a chave e o texto desejado. |
| Momento do MVP na oficina | Guilherme | A especificação diz "entre os minutos 10 e 14". A cronometragem canônica usa 9:00–12:00 (conferência) e 12:00–15:00 (sensibilidade). Ajustar o texto da especificação. |
| Limite de espaço nos slides | Larissa | Os mínimos do guia visual são 32 pt (títulos), 18 pt (corpo) e 16 pt (tabelas), com no máximo 5 linhas de corpo. Se alguma chave não couber, pedir versão curta. |
| Link e QR do Looker Studio | Larissa e Laís | Aparecem no slide 8 e no guia assim que existirem. |
