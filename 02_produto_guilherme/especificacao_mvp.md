# Especificação do MVP — Comparador Local

**Projeto:** Conserta ou Troca? — O Custo Total do Dispositivo
**Cargo:** Engenharia do Comparador Local — Guilherme Almeida
**Branch:** `guilherme/produto`
**Fase:** 1 — Fundação (arquitetura, contratos e regras)
**Referência:** Guia individual de execução, versão 1.3 (19/10/2026)

---

## 1. Objetivo

Construir um comparador local, responsivo e compreensível que aplique exatamente o
contrato de dados e as fórmulas publicados pela Modelagem (Laís). O aplicativo
compara, para cada um de oito casos fictícios, o custo de **reparar** o dispositivo
atual com o custo de **trocá-lo** por um substituto, e mostra separadamente os
critérios não financeiros.

É uma **simulação educativa com dados sintéticos**. Não é recomendação comercial.

### Contexto de uso

- **Pergunta orientadora:** em quais condições consertar um celular ou notebook custa
  menos por ano do que trocar?
- **Público:** estudantes do 8º ano, 9º ano e Ensino Médio, em micro-oficina
  presencial de no máximo 20 minutos por grupo.
- **Momento do comparador na oficina:** depois do cálculo manual guiado; entre os
  minutos 10 e 14, o grupo confere o resultado no MVP e altera uma premissa
  (sensibilidade). O cálculo manual sempre precede o uso do software.
- **Demonstração:** seleção, cálculo, sensibilidade e critérios não financeiros em
  até 4 minutos.
- **Privacidade:** não há coleta de nomes, avaliação individual, questionário nem
  acompanhamento de desempenho; o app não registra nem envia dados.
- **Consistência:** ODS/XLSX, CSV, MVP e Looker Studio usam a mesma versão congelada
  dos oito casos.

## 2. Escopo de execução

| Item | Decisão |
|---|---|
| Uso oficial | Computador/projetor |
| Abertura | Duplo clique em `index.html` (protocolo `file://`) |
| Tecnologias | HTML, CSS e JavaScript clássico, sem framework |
| Proibido | `fetch()`, `type="module"`, CDN, API, servidor, banco de dados, instalação, internet |
| Responsividade | Testada em 390 px de largura; isso **não** promete execução offline em celular |
| Navegadores | Chrome, Edge e Firefox recentes |
| Distribuição | ZIP da pasta `app/` no Drive; o ZIP **não** vai para o GitHub |

Motivo: navegadores bloqueiam a leitura assíncrona de arquivos locais pelo protocolo
`file://` (política de mesma origem). Por isso os dados chegam como script clássico
(`dados.js`) e não por leitura do CSV no navegador.

## 3. Arquitetura congelada

```
02_produto_guilherme/
├── app/
│   ├── index.html
│   ├── css/tema.css
│   ├── css/app.css
│   ├── js/dados.js          (gerado; não é digitado)
│   ├── js/calculos.js
│   ├── js/interface.js
│   ├── js/app.js
│   ├── dados/casos.csv      (cópia fiel da fonte da Laís)
│   └── assets/
├── README.md                (Fase 4)
├── scripts/gerar_dados.mjs
├── testes/calculos.test.mjs
└── especificacao_mvp.md
```

**Ordem de carregamento dos scripts:** `dados.js` → `calculos.js` → `interface.js` → `app.js`.

### Responsabilidade de cada arquivo

| Arquivo | Responsabilidade | Não faz |
|---|---|---|
| `dados.js` | Publica `globalThis.CASOS`: oito objetos congelados | Fórmulas |
| `calculos.js` | Validação e cálculo puro (`calcularCenario`) | Ler ou alterar a tela |
| `interface.js` | Leitura e atualização segura do DOM (`textContent`, nunca `innerHTML` com dado) | Calcular |
| `app.js` | Inicialização e eventos | Fórmulas |
| `gerar_dados.mjs` | Conversor Node: valida `casos.csv` e gera `dados.js` | Corrigir dados (erro encerra o processo) |
| `calculos.test.mjs` | Testes automáticos (oito casos e limites) | — |
| `README.md` | Abertura, uso, limites e privacidade | — |

## 4. Fluxo

```
casos.csv (18 campos, C01–C08)
  → gerar_dados.mjs (valida; erro encerra)
  → dados.js (globalThis.CASOS)
  → usuário seleciona um caso
  → validar entradas
  → calcular (precisão completa)
  → decidir (Reparar / Trocar / Empate técnico)
  → renderizar (formatação só na tela)
  → testar
  → empacotar ZIP no Drive
```

## 5. Contrato de entrada — `casos.csv`

Fonte canônica: `01_modelagem_lais/casos.csv`, copiada sem alteração para
`app/dados/casos.csv`.

- Exatamente **18 colunas (A:R)**, na ordem abaixo, com cabeçalho idêntico.
- Exatamente **8 registros**, com IDs únicos **C01 a C08**.
- Números com **ponto decimal**; separador de campos é a vírgula; textos com vírgula
  vêm entre aspas.
- Codificação UTF-8 (BOM aceito e removido).

| Col. | Campo | Tipo | Regra |
|---|---|---|---|
| A | `caso_id` | texto | C01–C08, único |
| B | `tipo_dispositivo` | texto | obrigatório |
| C | `modelo_ficticio` | texto | obrigatório |
| D | `custo_reparo` | número | ≥ 0 |
| E | `manutencao_adicional` | número | ≥ 0 |
| F | `vida_adicional_anos` | número | > 0 |
| G | `residual_reparado` | número | ≥ 0 |
| H | `preco_substituto` | número | ≥ 0 |
| I | `custos_acessorios` | número | ≥ 0 |
| J | `valor_venda_atual` | número | ≥ 0 |
| K | `residual_substituto` | número | ≥ 0 |
| L | `vida_substituto_anos` | número | > 0 |
| M | `garantia_reparo_meses` | número | ≥ 0 |
| N | `garantia_substituto_meses` | número | ≥ 0 |
| O | `risco_reparo` | texto | obrigatório; qualitativo |
| P | `necessidade_usuario` | texto | obrigatório; qualitativo |
| Q | `impacto_ambiental` | texto | obrigatório; qualitativo |
| R | `observacao` | texto | obrigatório |

## 6. Contrato intermediário — `dados.js`

```js
globalThis.CASOS = Object.freeze([ /* 8 objetos congelados */ ]);
```

- Cada objeto contém os 18 campos; os numéricos já convertidos para `number`.
- Critérios qualitativos (O, P, Q) pertencem ao mesmo objeto, mas **nunca entram nas
  fórmulas financeiras**.
- Gerado apenas pelo conversor:
  `node 02_produto_guilherme/scripts/gerar_dados.mjs <casos.csv> <dados.js>`

## 7. Regras financeiras (definidas pela Modelagem)

**Reparar**
- custo líquido = `custo_reparo + manutencao_adicional − residual_reparado`
- custo anual = custo líquido ÷ `vida_adicional_anos`

**Trocar**
- custo líquido = `preco_substituto + custos_acessorios − valor_venda_atual − residual_substituto`
- custo anual = custo líquido ÷ `vida_substituto_anos`

**Decisão**
- diferença anual = custo anual reparar − custo anual trocar
- |diferença| < R$ 0,01 → **Empate técnico**
- diferença < 0 → **Reparar**
- diferença > 0 → **Trocar**

**Precisão:** cálculo com precisão completa; arredondamento para duas casas
**somente na exibição** (`Intl.NumberFormat` pt-BR, BRL).

## 8. Entradas editáveis pelo usuário

| Campo da tela | Campo do caso | Regra |
|---|---|---|
| Custo do reparo (R$) | `custo_reparo` | obrigatório, número, ≥ 0 |
| Vida adicional após reparo (anos) | `vida_adicional_anos` | obrigatório, número, > 0 |

Leitura com `valueAsNumber`; campo vazio é tratado como inválido, nunca como zero.

## 9. Saídas

| Saída | Conteúdo |
|---|---|
| Resultado financeiro | Reparar, Trocar ou Empate técnico |
| Tabela | Custo líquido e custo anual das duas alternativas |
| Gráfico | Barras proporcionais do custo anual (mesmo objeto de resultado da tabela) |
| Sensibilidade | Informa se a edição mudou a classificação em relação ao caso original |
| Critérios não financeiros | Garantias, risco do reparo, necessidade do usuário, impacto ambiental — separados do resultado |
| Aviso | "Simulação educativa com dados sintéticos. Não é recomendação comercial." |
| Ações | Restaurar caso; imprimir/salvar PDF |

## 10. Erros e validações

| Situação | Onde é barrada | Comportamento |
|---|---|---|
| Arquivo CSV sem cabeçalho/dados, aspas abertas | Conversor | Encerra com erro |
| Cabeçalho diferente ou duplicado | Conversor | Encerra com erro |
| Número de colunas diferente numa linha | Conversor | Encerra com erro |
| Quantidade ≠ 8, ID duplicado ou fora de C01–C08 | Conversor | Encerra com erro |
| Texto obrigatório vazio | Conversor | Encerra com erro |
| Número vazio ou texto em campo numérico | Conversor e app | Erro; nunca vira zero |
| Valor negativo | Conversor e app | Erro |
| Vida útil ≤ 0 | Conversor e app | Erro |
| Custo líquido negativo | Conversor e app | Erro |
| `dados.js` sem oito casos | App (inicialização) | Erro no console; página não segue |

No app, entrada inválida **oculta os resultados** e mostra a mensagem em região
`aria-live`; nenhum resultado plausível é exibido.

## 11. Acessibilidade e impressão

- Todo campo possui `label`; mensagens em `output` com `role="status"` e `aria-live`.
- Foco visível em botões, campos e seletor.
- Impressão oculta formulário e botões e evita cortar seções.

## 12. Dependências entre cargos

| De quem | O quê | Marco |
|---|---|---|
| Laís | `casos.csv` e regras financeiras | DADOS F2 LIBERADOS / F4 DADOS CANDIDATOS |
| Letícia | Rótulos e textos | TEXTO F2 LIBERADO |
| Larissa | Identidade visual | — |
| Caio | Integração em `main` | F1 INTEGRADA, F2 ENTRADAS INTEGRADAS |

Este cargo **não altera** fórmulas, casos, textos acadêmicos, ativos visuais
originais nem o cronograma.

## 13. Critérios de autoaprovação do produto

- Abre por duplo clique em `index.html`.
- Inspeção confirma ausência de `fetch()`, `type="module"` e dependências externas.
- Entradas inválidas não produzem resultado plausível.
- Resultados coincidem com a planilha da Modelagem.
- Funciona em computador/projetor; 390 px comprova apenas responsividade.
- O README permite execução autônoma.
