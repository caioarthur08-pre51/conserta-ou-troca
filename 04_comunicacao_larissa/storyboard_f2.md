# Storyboard e wireframes da fase 2

**Domínio responsável:** Comunicação visual — Larissa Costa. **Versão:** v0.3. **Base visual:** [`apresentacao_trabalho_v0.3.odp`](https://drive.google.com/file/d/1Vp2uU61dLgb-zOcejiXrOzPvrwBmylSq/view) e [`guia_decisao_v0.3.odp`](https://drive.google.com/file/d/1XVcTCXEK_ACW6iwwfGoKBLEGUMYzAbfc/view) na pasta `01_editaveis/Larissa` do Drive. **Integração documental:** 05/11/2026.

Este documento especifica os oito slides e o guia de uma página. Os ODPs são wireframes editáveis; os PDFs correspondentes permitem conferir a disposição sem LibreOffice. Os espaços de painel, QR e URL permanecem identificados até a liberação das respectivas fontes nas fases seguintes.

## Fontes consumidas e regra de revisão

| Conteúdo | Proprietário | Fonte de referência na F2 | Uso no visual |
| --- | --- | --- | --- |
| Fala, objetivo e sequência | Letícia, Conteúdo | `03_conteudo_leticia/roteiro_microoficina.md`, v0.3 | Preservar sentido e tempo; qualquer corte volta à responsável pelo texto. |
| Rótulos e aviso educativo | Letícia, Conteúdo | `03_conteudo_leticia/textos_interface.md`, v0.3 | Copiar sem reformular. |
| Guia único | Letícia, Conteúdo | `03_conteudo_leticia/guia_decisao_conteudo.md`, v0.2 | Diagramar no ODP existente; não criar segundo guia. |
| Caso C01, fórmulas e critérios | Laís, Modelagem | `01_modelagem_lais/casos.csv` e `dicionario_dados.md`; F2 v0.2, verificação `verificacao_f2.md` | Copiar dados e unidades da versão liberada; não recalcular manualmente no arquivo visual. |
| Imagem do comparador | Guilherme, Produto | `02_produto_guilherme/app/`; build F3 estável | Na F2, manter área reservada, sem captura fabricada. |
| Painel, QR e URL | Laís, Modelagem; Larissa, Visual | URL anônima e QR somente após os marcos F3/F4 | Manter espaços no wireframe e texto `PDF offline`. |

Os números são **sintéticos**. O orçamento abaixo cobre 0:00–20:00 sem lacunas; o conteúdo termina em 18:00. Os 2 minutos finais servem para interação, transição ou contingência, sem conteúdo novo.

## Slide 1 — Título e pergunta (0:00–2:00)

- **Propósito e mensagem:** introduzir o dilema “Conserta ou Troca?” e perguntar em quais condições reparar custa menos por ano que trocar.
- **Origem:** roteiro v0.3, seção 0:00–2:00; pergunta orientadora de Letícia. **Dados:** não se aplica.
- **Visual:** título à esquerda e pergunta à direita; duas áreas amplas para projeção. **Fala:** apresentar o celular fictício e o objetivo da comparação anual.
- **Ação do público:** responder oralmente ou por gesto, sem contagem ou registro. **Transição:** “Para responder com números, precisamos conhecer o caso e as suas premissas.”
- **Contingência:** fazer a pergunta oralmente e escrevê-la no quadro.

## Slide 2 — Caso, premissas e conceitos (2:00–5:00)

- **Propósito e mensagem:** identificar os dados do C01 e separar custo líquido, vida útil, valor residual e premissa. A conclusão depende dessas premissas.
- **Origem:** roteiro v0.3, seção 2:00–5:00; C01 e unidades de Laís. **Dados:** C01 é um celular fictício; a fonte numérica liberada é `casos.csv` F2.
- **Visual:** área do caso com indicação visível `exemplo didático`; área curta de conceitos. **Fala:** explicar valores de entrada e por que preço pago no passado não participa da decisão atual.
- **Ação do público:** localizar a vida útil e o valor residual. **Transição:** “Com esses dados, só faltam as fórmulas.”
- **Contingência:** ler os dados do caso em papel e definir os termos no quadro.

## Slide 3 — Fórmulas (5:00–7:00)

- **Propósito e mensagem:** mostrar que cada opção tem custo líquido e vida em anos; o resultado é custo em R$/ano.
- **Origem:** roteiro v0.3, seção 5:00–7:00; fórmulas do `dicionario_dados.md` de Laís. **Dados:** `reparar = (reparo + manutenção − residual reparado) / vida adicional`; `trocar = (substituto + acessórios − venda atual − residual substituto) / vida do substituto`.
- **Visual:** fórmula à esquerda, significado das variáveis à direita. **Fala:** explicar entradas que somam e que subtraem, e a unidade de cada termo.
- **Ação do público:** apontar termos positivos e negativos. **Transição:** “Agora vamos aplicar essas fórmulas ao C01.”
- **Contingência:** escrever as duas expressões no quadro, mantendo a unidade R$/ano.

## Slide 4 — Cálculo manual (7:00–9:00)

- **Propósito e mensagem:** os participantes calculam antes de consultar o comparador.
- **Origem:** roteiro v0.3, seção 7:00–9:00; entradas C01 da F2 v0.2 de Laís. **Dados conferidos:** custo líquido de reparar R$ 380,00; de trocar R$ 1.260,00; custo anual R$ 253,33 e R$ 315,00.
- **Visual:** passos numerados à esquerda, espaço para resultado à direita. **Fala:** orientar soma/subtração, divisão pela vida e comparação da diferença; reservar cerca de 1,5 minuto para a conta.
- **Ação do público:** calcular à mão sem coletar resposta. **Transição:** “Agora vamos ver se a ferramenta chega ao mesmo número.”
- **Contingência:** calculadora simples ou conta no quadro; apresentação em PDF, se o ODP não abrir.

## Slide 5 — Comparação e conferência no MVP (9:00–12:00)

- **Propósito e mensagem:** comparar os custos anuais e conferir se o comparador reproduz o cálculo manual.
- **Origem:** roteiro v0.3, seção 9:00–12:00; dados C01 da F2 v0.2 de Laís; captura somente após build estável de Guilherme. **Dados conferidos:** Reparar R$ 253,33/ano; Trocar R$ 315,00/ano.
- **Visual:** comparação com rótulos textuais `Reparar` e `Trocar`; área de conferência do MVP. A cor nunca é o único identificador. **Fala:** explicar que o resultado é condicional às premissas, não uma recomendação de compra.
- **Ação do público:** comparar a própria conta com o valor mostrado. **Transição:** “O resultado depende das premissas. Vamos testar o quanto.”
- **Contingência:** conferir contra a tabela impressa do caso e seguir sem o aplicativo.

## Slide 6 — Sensibilidade e critérios não financeiros (12:00–15:00)

- **Propósito e mensagem:** uma premissa pode inverter a opção de menor custo; critérios qualitativos são exibidos à parte.
- **Origem:** roteiro v0.3, seção 12:00–15:00; C01 e três campos qualitativos de Laís. **Dados previstos:** ao mudar a vida adicional de 1,5 para 1 ano, reparar passa a R$ 380,00/ano, acima de trocar a R$ 315,00/ano. Risco, necessidade e impacto ambiental não entram na conta.
- **Visual:** duas áreas, sensibilidade e critérios. **Fala:** perguntar a previsão antes da mudança e explicar a inversão e as limitações do modelo.
- **Ação do público:** prever oralmente e conferir. **Transição:** “Vamos observar como os oito casos aparecem no painel.”
- **Contingência:** mostrar os dois cenários calculados em papel, sem alterar a fonte.

## Slide 7 — Looker Studio (15:00–17:00)

- **Propósito e mensagem:** ler as duas opções dentro de cada caso; não somar dispositivos distintos.
- **Origem:** roteiro v0.3, seção 15:00–17:00; fonte do painel pertence a Laís e será liberada em fase posterior. **Dados:** oito casos sintéticos C01–C08; os rótulos e resultados finais dependem da mesma versão da planilha.
- **Visual:** área para captura do painel e orientação de leitura. **Fala:** mostrar C01 e procurar um caso em que trocar custe menos, depois que o painel estiver publicado.
- **Ação do público:** identificar o caso no painel, sem registrar resposta. **Transição:** “O painel ajuda a comparar, mas a escolha precisa citar premissas e limites.”
- **Contingência:** usar PDF offline do painel quando existir; até lá, tabela impressa dos casos.

## Slide 8 — Síntese, limites, QR e URL (17:00–20:00)

- **Propósito e mensagem (17:00–18:00):** sintetizar a comparação anual, o papel das premissas e o limite educativo dos dados sintéticos.
- **Origem:** roteiro v0.3, seções 17:00–18:00 e 18:00–20:00; aviso e conteúdo do guia de Letícia. **Dados:** nenhum número novo; QR e URL dependem da liberação anônima do painel por Laís e da validação F4.
- **Visual:** síntese e limites à esquerda; espaços rotulados `QR`, `URL textual` e `PDF offline` à direita. **Fala:** dar um exemplo de justificativa com dado financeiro e limitação; apontar o guia único.
- **Ação do público (18:00–20:00):** pergunta breve oral ou por gesto e troca de grupo. Se o conteúdo atrasar, pular a pergunta. **Transição:** encerramento, sem conteúdo novo após 18:00.
- **Contingência:** informar verbalmente a localização do guia e usar PDF local; não exibir QR ou URL provisórios como definitivos.

## Guia A4 de uma página

O wireframe `guia_decisao_v0.3.odp` tem **uma página vertical** com título, área do conteúdo único de Letícia, QR, URL textual e aviso educativo. `guia_decisao_conteudo.md` v0.2 é a fonte textual. A diagramação final e a inserção do QR dependem das liberações posteriores; nesta fase não se cria outro guia nem um destino fictício.

## Conferência da F2

- O PDF dos wireframes contém oito páginas, sem lâmina extra, na ordem 1–8; o PDF do guia contém uma página.
- Os intervalos são contínuos; fórmula e conta manual precedem o MVP; o conteúdo termina em 18:00.
- O tema usa fundo branco, azul escuro e fonte sans-serif; o guia visual registra os contrastes. Nos wireframes, os blocos têm rótulos textuais e não dependem de imagens ou animações.
- As capturas, o QR, a URL anônima e o PDF do painel permanecem para os marcos de F3/F4 definidos pelos respectivos proprietários.

## Arquivos congelados da F2

| Arquivo no Drive | SHA-256 |
| --- | --- |
| [Apresentação ODP v0.3](https://drive.google.com/file/d/1Vp2uU61dLgb-zOcejiXrOzPvrwBmylSq/view) | `A04CCA7669CD5854A9E69AC6E75B7128CC59727997B4486E51B3161AEBC4A5D7` |
| [Guia ODP v0.3](https://drive.google.com/file/d/1XVcTCXEK_ACW6iwwfGoKBLEGUMYzAbfc/view) | `D779924F4BE93FB2536D6521CC545A8B1FF3EBDAD53E0E8EECDA75E5A5B11E3E` |
| [Apresentação PPTX v0.3](https://docs.google.com/presentation/d/1EK0yHjwUCdT_SSADCRmRnVkMY0WOac09/edit) | `C60F1356B04DC0C857F7354A40DEF026B37105BD1D30F52E6A9CF3612D84F0B1` |
| [Wireframes da apresentação PDF v0.3](https://drive.google.com/file/d/1OqScrcldG1hZQShOSJ2mfQ6LKfFgMADT/view) | `256A4757249D7A34A731F169F3844F933C3AB172A4A721BA447F11625F04C846` |
| [Wireframe do guia PDF v0.3](https://drive.google.com/file/d/1ppIiWxSdytp3weZBV8shJ9CcJUSUzqZ0/view) | `BD1A19E1C180339D94782F1A506691971CDA5FF204CD4493E765B4F4841CFF8E` |

Os ODPs preservam o tema e os espaços do wireframe v0.2, com notas revistas para os textos de Letícia v0.3 e os dados de Laís v0.2. A apresentação continua com oito slides e o guia com uma página. Os PDFs foram abertos e conferidos visualmente; o PPTX foi exportado do ODP, sem edição independente.
