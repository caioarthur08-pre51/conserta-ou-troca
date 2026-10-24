# Guia visual: Conserta ou Troca? O Custo Total do Dispositivo

Versão 0.1 · Fase 1 · Responsável: Larissa Costa (Comunicação)

Este guia vale para a apresentação (`apresentacao_trabalho_v0.1.odp`) e para o guia único (`guia_decisao_v0.1.odp`). Os arquivos ODP são as fontes canônicas. PPTX e PDF são apenas exportações.

Princípios: a hierarquia visual define o que se lê primeiro; o contraste é medido, não estimado; a cor nunca é a única indicação; a apresentação apoia a fala e não a transcreve; o PDF precisa ser compreensível sem animação.

---

## 1. Paleta e contraste

Contrastes medidos sobre fundo branco (#FFFFFF).

| Cor | Hex | Contraste | Uso permitido |
|---|---|---|---|
| Azul escuro | #17324D | 13,13:1 | Títulos, texto principal, fundos escuros de faixas |
| Azul médio | #2E6F9E | 5,41:1 | Subtítulos, destaques, links, texto comum |
| Verde | #2F7D5A | 5,00:1 | Indicação de "Reparar" e "menor custo" (texto ou forma) |
| Laranja | #C87523 | 3,49:1 | **Somente** formas, ícones, barras ou texto grande. Nunca texto comum sobre branco |
| Preto | #111827 | 17,74:1 | Corpo de texto, rótulos e tabelas |
| Branco | #FFFFFF | (fundo) | Fundo padrão dos slides |

### Regras de contraste

- Texto comum: contraste mínimo de **4,5:1**.
- Texto grande: contraste mínimo de **3:1**.
- O laranja (3,49:1) só atinge o mínimo de texto grande. Por isso ele aparece em formas, ícones e barras. Quando houver texto sobre uma forma laranja, o texto é escuro (#111827 ou #17324D).
- Se uma cor falhar no contraste, use-a na forma e aplique texto escuro por cima.
- Toda combinação nova de cores (por exemplo, texto sobre faixa colorida) precisa ter o contraste medido e registrado nesta tabela antes de ser usada.

### Cor nunca é a única indicação

Verde e laranja sempre vêm acompanhados de palavra:

| Cor | Palavra obrigatória ao lado |
|---|---|
| Verde | "Reparar" ou "menor custo" |
| Laranja | "Trocar" ou "atenção" |

Essa regra vale para legendas, barras, ícones, tabelas e gráficos. Em impressão em preto e branco, o significado deve continuar claro.

---

## 2. Fontes

- Família: **Liberation Sans** ou **Arial**. Use uma única família por documento.
- Se a fonte mudar ao abrir o arquivo em outro computador, volte para Liberation Sans ou Arial e teste de novo.
- Sem fontes decorativas, itálico longo ou texto todo em maiúsculas.
- Negrito apenas para destacar o essencial (números-chave, palavras de decisão).

---

## 3. Tamanhos mínimos

| Elemento | Mínimo |
|---|---|
| Títulos | **32 pt** |
| Corpo de texto | **18 pt** |
| Tabelas e rótulos | **16 pt** (só quando continuar legível à distância) |

Regras:

- Todo título previsto precisa caber em 32 pt, em no máximo duas linhas.
- Se o texto só couber reduzindo a fonte, **reduza o conteúdo**. Nunca viole os mínimos.
- Máximo sugerido: 5 linhas de corpo por slide. A apresentação apoia a fala e não a transcreve.

---

## 4. Margens e grade

Formato dos slides: 16:9.

- Margem externa: **1,5 cm** em todos os lados.
- Grade de **12 colunas**, com calha (espaço entre colunas) de 0,5 cm.
- Título alinhado à esquerda, sempre na mesma posição, ocupando a largura útil.
- Corpo alinhado à esquerda. Evite texto centralizado em blocos longos.
- Espaço em branco é permitido e desejável: não preencha o slide só porque há espaço.
- Elementos alinhados às colunas da grade; sem elementos soltos fora dela.

Estrutura de leitura por slide: 1) título; 2) elemento principal (número, tabela ou gráfico); 3) apoio curto em texto.

---

## 5. Sequência e tempo oficiais dos slides

| Slide | Tempo | Função |
|---|---|---|
| 1 | 0:00–2:00 | Título, dilema e pergunta orientadora |
| 2 | 2:00–5:00 | Caso fictício, premissas e conceitos |
| 3 | 5:00–7:00 | Fórmulas e significado das variáveis |
| 4 | 7:00–9:00 | Cálculo manual passo a passo |
| 5 | 9:00–12:00 | Comparação anual e conferência no MVP |
| 6 | 12:00–15:00 | Sensibilidade e critérios não financeiros |
| 7 | 15:00–17:00 | Looker Studio e leitura do painel |
| 8 | 17:00–18:00 | Síntese, limites, QR e URL textual |
| 8 (continuação) | 18:00–20:00 | Interação, troca de grupo e contingência |

- O cálculo manual sempre aparece antes do MVP.
- O conteúdo obrigatório termina aos 18:00.
- O bloco 18:00–20:00 é interação, troca de grupo e contingência, na continuação do slide 8.

---

## 6. Ícones

- Estilo: ícones simples, de linha ou preenchimento plano, sem sombra, sem degradê e sem detalhes finos.
- Cores permitidas: azul escuro, azul médio, verde e laranja. O laranja é permitido em ícones.
- Todo ícone vem com **rótulo de texto** (≥ 16 pt). O ícone nunca carrega o significado sozinho.
- Tamanho mínimo: 1 cm, para continuar visível à distância.
- Ícones de reparar e trocar usam formas diferentes (não só cores diferentes).
- Todo ícone ou imagem usada entra na pasta `assets` com **origem e licença** registradas. Sem fonte e licença, não entra.
- Sem fotografias nos slides.

---

## 7. Gráficos e tabelas

- Cores: azul médio e verde para as séries, laranja para destaque de atenção (como forma/barra).
- **Rótulos diretos** nas barras e linhas (valor escrito junto ao elemento), com ≥ 16 pt.
- A legenda usa palavras ("Reparar", "Trocar", "menor custo", "atenção"), nunca só cor.
- Diferenciar séries também por posição, ordem, rótulo ou padrão, não apenas por cor.
- Eixos e unidades sempre indicados (por exemplo, "R$ por ano").
- Um gráfico, uma mensagem: o título do gráfico diz a conclusão.
- Sem 3D, sem sombra, sem efeitos decorativos.
- Casos identificados como **fictícios** ou **exemplos didáticos**, de forma visível.
- Tabelas: ≥ 16 pt, cabeçalho em azul escuro com texto branco, linhas com bom espaçamento, poucas colunas.
- Gráficos e tabelas devem ser legíveis no PDF, sem depender de animação.

---

## 8. QR code e URL do Looker Studio

Entregas obrigatórias, no slide 8 e no guia:

- QR do Looker Studio, com tamanho suficiente para leitura à distância e margem branca ao redor.
- **URL textual** escrita junto ao QR, em ≥ 16 pt.
- PDF do dashboard para contingência offline, disponível caso o link ou a internet falhem.

---

## 9. Animação

- A apresentação funciona **sem animação**.
- Transições e animações, se existirem, são apenas decorativas e nunca carregam informação.
- O PDF exportado deve ser totalmente compreensível.

---

## 10. Proibições

- Texto abaixo dos mínimos (32 pt, 18 pt, 16 pt).
- Reduzir a fonte para o texto caber. Reduza o conteúdo.
- Laranja (#C87523) como texto comum sobre branco.
- Cor como única indicação de significado.
- Combinação de cores sem contraste medido.
- Animação essencial para entender o conteúdo.
- Fotografias de pessoas em slides, guia, relatório ou GitHub. Eventuais fotos dos integrantes ficam no Drive restrito até 31/12/2026, mediante concordância.
- Imagens e ícones sem origem e licença registradas.
- Canva, Microsoft 365 e serviços pagos. Não compre nada nesta fase.
- Editar o PPTX ou o PDF diretamente: **edite somente os ODP**.
- Mais de uma família de fonte por documento.
- Coleta de nomes ou dados pessoais em qualquer material.

---

## 11. Teste de comprovação (checklist)

- [ ] ODPs existem e são as fontes canônicas.
- [ ] A sequência dos slides corresponde à tabela da seção 5.
- [ ] Todo título previsto comporta 32 pt.
- [ ] Corpo e rótulos respeitam os mínimos (18 pt e 16 pt).
- [ ] Contrastes estão registrados (seção 1).
- [ ] QR, URL textual e PDF offline aparecem como entregas obrigatórias.
- [ ] A apresentação funciona sem animação.

---

## 12. Fontes canônicas e entregas planejadas

- ODP canônico da apresentação: `apresentacao_trabalho_v0.1.odp`.
- ODP canônico do guia: `guia_decisao_v0.1.odp`.
- Exportações: PPTX e PDF da apresentação; PDF do guia único.
- Pasta `assets` com origem e licença.
- QR do Looker Studio, URL textual e PDF do dashboard (contingência offline).
- Google Drive serve só para backup e compartilhamento.
