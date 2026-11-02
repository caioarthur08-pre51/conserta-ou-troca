# Contratos entre cargos — Fase 2

**Proprietário deste índice:** Caio Rocha. **Corte de planejamento:** 02/11/2026. **Prazo da Fase 2:** 03/11/2026. Este índice especifica a passagem entre cargos; cada autor conserva a propriedade e a decisão sobre o próprio artefato. Um caminho previsto não significa que o arquivo tenha sido entregue.

## Regra para consumir uma entrega

1. O autor termina o teste do próprio domínio, cria commit na própria branch e faz `push`. Para fonte binária, coloca a versão editável no seu espaço do [Drive do projeto](https://drive.google.com/drive/folders/10ijJh6opepOq2tLa5_BwmuMxNXJYlupW).
2. O autor registra na própria tarefa do Notion o marco, caminho ou link, versão, commit ou SHA-256, teste, destinatário e impacto se a versão mudar. O protocolo completo está em [`protocolo_comunicacao.md`](protocolo_comunicacao.md).
3. O destinatário verifica **a mesma versão** e responde `RECEBIDO` na própria tarefa. Se houver problema, registra entrada, resultado esperado, resultado obtido e como reproduzir; o autor corrige somente o próprio arquivo.
4. Caio integra os commits publicados e anuncia o hash de `main`. Ninguém usa apenas “o arquivo mais recente” sem identificador.

## Cinco contratos de passagem

| Domínio e autor | Fonte canônica e formato | Destinatários na F2 | Verificação de aceite antes de usar | Contingência |
|---|---|---|---|---|
| Dados e modelagem — Laís | `01_modelagem_lais/casos.csv` em UTF-8, CSV com 18 campos A:R e oito casos C01–C08; [`dicionario_dados.md`](../01_modelagem_lais/dicionario_dados.md); ODS editável no Drive privado | Guilherme, Letícia e Caio | Cabeçalho idêntico, oito IDs únicos, fórmulas e versão da ODS reconciliados com o CSV; marco `DADOS F2 LIBERADOS` com commit e link | CSV da F1 mantém a estrutura para preparo; **não** substitui uma liberação F2 nem autoriza publicar números finais |
| Comparador local — Guilherme | `02_produto_guilherme/app/` e conversor/testes em JavaScript clássico; [`especificacao_mvp.md`](../02_produto_guilherme/especificacao_mvp.md) | Laís, Letícia, Larissa e Caio | `index.html` abre por `file://`, sem dependência externa; teste do conversor e esqueleto relatados no marco `MVP ESQUELETO LIBERADO` | Roteiro de cálculo manual e apresentação em PDF, até o comparador ser utilizável |
| Conteúdo — Letícia | `03_conteudo_leticia/roteiro_microoficina.md`, matriz de afirmações, texto de interface e conteúdo do guia em Markdown; ODT no Drive | Guilherme, Larissa e Caio | Roteiro contém até 18 min obrigatórios e até 2 min de margem; afirmações têm fonte; texto e versão no marco `TEXTO F2 LIBERADO` | Texto F1 serve para estrutura, sem números nem conclusões não liberados |
| Comunicação visual — Larissa | `04_comunicacao_larissa/guia_visual.md`, storyboard e fonte ODP no Drive | Guilherme, Letícia e Caio | Oito slides com propósito, paleta legível, contraste e ordem coerente; marco `TEMA F2 LIBERADO` com versão e link | Guia visual F1 é provisório até a liberação F2 |
| Governança e integração — Caio | Este contrato, [`manifesto_integracao.md`](manifesto_integracao.md), decisões, riscos, cronograma e quadro do Notion; texto/CSV no GitHub | Todos | Caminhos, donos, consumidores, estados, riscos e permissões do Drive conferidos; branch publicada e mensagem `DRIVE E CONTRATOS LIBERADOS` | Se um autor atrasar, manter a dependência visível; não declarar a fase integrada nem avançar sem a barreira dos cinco |

## Interface financeira comum

O CSV canônico contém, nesta ordem exata, sem título acima do cabeçalho e sem colunas calculadas:

```text
caso_id,tipo_dispositivo,modelo_ficticio,custo_reparo,manutencao_adicional,residual_reparado,vida_adicional_anos,garantia_reparo_meses,preco_substituto,custos_acessorios,valor_venda_atual,residual_substituto,vida_substituto_anos,garantia_substituto_meses,risco_reparo,necessidade_usuario,impacto_ambiental,observacao
```

O cabeçalho ocupa A1:R1 e C01–C08 ocupam A2:R9. Vírgula separa campos; ponto separa decimais; textos com vírgula usam aspas duplas. Os números são sintéticos. Campos O–Q são qualitativos e nunca entram na conta. A fórmula anual é `(custo_reparo + manutencao_adicional - residual_reparado) / vida_adicional_anos` para reparar e `(preco_substituto + custos_acessorios - valor_venda_atual - residual_substituto) / vida_substituto_anos` para trocar. Vidas devem ser maiores que zero; entradas monetárias e custos líquidos não podem ser negativos. Calcular com precisão completa e arredondar a duas casas **somente para exibir**. `Empate técnico` exige diferença absoluta menor que R$ 0,01 por ano. A regra detalhada e o tratamento de vazio estão no dicionário da Laís. Se ODS, CSV, MVP ou Looker divergirem, o autor responsável corrige a própria fonte e publica nova versão; ninguém “acerta” números manualmente em outro domínio.

## Sequência de integração da Fase 2

1. Guilherme prepara estrutura e testes sem inventar dados. Laís e Letícia trabalham em paralelo em seus arquivos.
2. Depois de `DADOS F2 LIBERADOS` e `TEXTO F2 LIBERADO` com `push`, Caio verifica as referências remotas, integra **somente** essas duas branches e publica `F2 ENTRADAS INTEGRADAS` com hash de `main`. Esse marco não encerra F2.
3. Guilherme e Larissa sincronizam `origin/main` e confirmam `RECEBIDO` nas próprias tarefas. Larissa libera `TEMA F2 LIBERADO`; Guilherme libera `MVP ESQUELETO LIBERADO` depois de testar o esqueleto contra as versões recebidas.
4. Caio integra os cinco envios finais, testa a árvore integrada, registra hashes e publica `F2 INTEGRADA`. Apenas então as cinco tarefas F2 podem ser concluídas e F3 pode começar.

## Confirmação de infraestrutura

O [Drive principal](https://drive.google.com/drive/folders/10ijJh6opepOq2tLa5_BwmuMxNXJYlupW) possui áreas `01_editaveis`, `02_entrega_final`, `03_contingencia` e `04_evidencias_restritas`, cada qual organizada por cargo. Caio é proprietário; as áreas compartilhadas de Caio permitem leitura dos quatro integrantes e de uma segunda conta autorizada de Guilherme. A pasta de evidências restritas de Caio é acessível só a ele. Binários (ODT/ODS/ODP, exportações, ZIP, PDF, QR e fotos permitidas) ficam no Drive, **fora** do GitHub público. A fonte Google Sheets fica privada e o Looker Studio final terá apenas acesso anônimo de visualização; não há link final liberado na F2.

## Teste de uma passagem por domínio

| Domínio | Teste mínimo de Caio na F2 | Situação em 02/11/2026 |
|---|---|---|
| Governança | Abrir este contrato, manifesto, decisões e cronograma; verificar dono, caminho, versão, consumidor e contingência | Arquivos locais conferidos; 25 tarefas no CSV, F1 com cinco concluídas; publicar commit e depois anunciar |
| Dados | Ler o cabeçalho e contar oito IDs em `casos.csv`; aguardar ODS, link, teste e commit da Laís | Estrutura F1 disponível; 8 IDs, 18 campos e 14 testes de referência passaram; liberação F2 pendente |
| Comparador | Conferir a especificação e abrir o esqueleto depois do marco do Guilherme; não confundir commit parcial com liberação | Especificação F1 disponível; esqueleto F2 ainda sem marco de liberação |
| Conteúdo | Conferir matriz F1 e ODT de 13 seções; aguardar roteiro e textos com marco da Letícia | Estrutura F1 disponível; liberação F2 pendente |
| Visual | Conferir guia visual F1 e fontes ODP; aguardar wireframe/storyboard com marco da Larissa | Direção F1 disponível; liberação F2 pendente |

**Logística externa:** escola, data, grupos e infraestrutura continuam sem confirmação. A janela 09h–12h foi informada como provável, sem valor de agendamento. Caio não publica `LOGÍSTICA CONFIRMADA` até obter fonte, data e hora da resposta institucional.
