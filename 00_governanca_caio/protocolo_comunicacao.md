# Protocolo de comunicação e passagem entre cargos

Este protocolo transforma toda dependência entre cargos em uma passagem verificável. Ele não cria aprovação hierárquica: o autor continua decidindo e alterando exclusivamente o próprio arquivo. O destinatário apenas confirma que recebeu uma versão utilizável ou devolve uma solicitação objetiva ao autor.

## Canal e registro obrigatório

1. O autor registra a passagem na própria tarefa do Notion e menciona os destinatários.
2. O registro no Notion é a fonte oficial. Uma mensagem em outro canal pode servir de alerta, mas não substitui o registro.
3. O destinatário registra `RECEBIDO` na própria tarefa antes de usar o arquivo.
4. Nenhum integrante escreve na tarefa nem no arquivo de outro integrante.
5. Senhas, tokens, códigos de recuperação, links de edição pública e dados pessoais nunca entram na mensagem.

## Modelo copiável de passagem

```text
MARCO: [nome padronizado]
DE: [cargo e integrante]
PARA: [cargo(s) destinatário(s)]
FASE: [1 a 5]
ARTEFATO: [nome e caminho ou link de visualização]
VERSÃO: [versão]
COMMIT OU HASH: [valor, ou n.a.]
SITUAÇÃO: LIBERADO PARA USO
O QUE FOI VALIDADO: [teste executado]
O QUE O DESTINATÁRIO DEVE FAZER: [ação objetiva]
PRAZO DE CONFIRMAÇÃO: [data e hora]
IMPACTO SE MUDAR: [arquivos e cargos que precisarão repetir trabalho]
OBSERVAÇÃO: [limitação ou n.a.]
```

O destinatário responde em sua própria tarefa:

```text
RECEBIDO: [nome do marco]
VERSÃO RECEBIDA: [versão]
RESULTADO: ACEITO PARA USO | CORREÇÃO SOLICITADA | BLOQUEADO
VERIFICAÇÃO: [o que abriu, conferiu ou comparou]
PRÓXIMA AÇÃO: [ação e prazo]
```

## Situações permitidas

- `PREPARANDO`: ainda não deve ser usado por outro cargo.
- `LIBERADO PARA USO`: passou pelo teste do autor e pode ser consumido.
- `RECEBIDO`: o destinatário confirmou a versão exata.
- `CORREÇÃO SOLICITADA`: o destinatário descreveu resultado esperado, resultado encontrado e forma de reprodução.
- `CORRIGIDO`: o autor publicou nova versão e novo commit ou hash.
- `CONFERIDO`: o consumidor abriu a versão identificada e não encontrou divergência em seu próprio domínio.
- `CONGELADO`: esta é a versão operacional; qualquer mudança exige análise de impacto.
- `BLOQUEADO`: somente a tarefa do consumidor não pode avançar; o motivo e a pessoa que pode resolver a dependência estão registrados. Esse estado nunca reprova nem bloqueia a entrega do autor.

Não usar expressões vagas como `está pronto`, `acho que funciona`, `depois vejo`, `usa o último` ou `corrigi lá`.

## Marcos obrigatórios por fase

| Fase | Marco | Emissor | Destinatário | Conteúdo mínimo | Efeito positivo |
|---|---|---|---|---|---|
| Pré-início | `ACESSOS CONFIRMADOS` | cada integrante | Caio | GitHub, branch, Notion e Drive testados | impede iniciar com permissão insuficiente |
| 1 | `CONTRATOS F1 LIBERADOS` | todos | Caio e consumidores indicados | especificação, caminho e commit | permite integrar uma base comum |
| 2 | `DADOS F2 LIBERADOS` | Laís | Guilherme, Letícia e Caio | `casos.csv`, dicionário, planilha e versão | impede código e texto sobre campos prematuros |
| 2 | `TEXTO F2 LIBERADO` | Letícia | Guilherme, Larissa e Caio | textos canônicos e referências | evita versões diferentes da mesma explicação |
| 2 | `TEMA F2 LIBERADO` | Larissa | Guilherme, Letícia e Caio | cores, tipografia, wireframe e restrições | permite interface e documentos visualmente coerentes |
| 2 | `MVP ESQUELETO LIBERADO` | Guilherme | Laís, Letícia, Larissa e Caio | build, instrução de abertura e limitações | permite conferir o contrato antes da produção completa |
| 2 | `F2 ENTRADAS INTEGRADAS` | Caio | todos | hash intermediário de `main` contendo dados e textos | transporta as dependências para as branches consumidoras sem encerrar a fase |
| 3 | `DADOS F3 LIBERADOS` | Laís | Guilherme e Caio | CSV congelado para a primeira versão utilizável | mantém planilha, `dados.js` e MVP na mesma versão |
| 3 | `CONTEÚDO DO GUIA LIBERADO` | Letícia | Larissa e Caio | Markdown aprovado e versão | separa aprovação textual de diagramação |
| 3 | `CAPTURA MVP LIBERADA` | Guilherme | Larissa e Caio | versão do build e captura estável | evita slide com tela já substituída |
| 3 | `CAPTURA LOOKER LIBERADA` | Laís | Larissa e Caio | versão do relatório e captura estável | evita slide com gráfico provisório |
| 3 | `F3 ENTRADAS INTEGRADAS` | Caio | todos | hash intermediário de `main` com conteúdo, MVP e painel candidatos | dá a Larissa arquivos reais e versionados para a composição |
| 4 | `F4 DADOS CANDIDATOS` | Laís | Guilherme e Caio | CSV, planilha, versão, hash e testes | fixa a entrada que regenerará o aplicativo |
| 4 | `RESULTADOS MVP LIBERADOS` | Guilherme | Laís e Caio | resultados dos oito casos e testes | permite confronto independente com a planilha |
| 4 | `F4 EQUIVALÊNCIA CONFIRMADA` | Laís | todos | matriz C01–C08 e resultado 8/8 | impede congelar o aplicativo com cálculo divergente |
| 4 | `URL LIBERADA PARA QR` | Laís | Larissa e Caio | URL de visualização, versão e PDF offline | impede QR apontando para edição ou versão candidata |
| 4 | `QR CANDIDATO` | Larissa | Laís e Caio | arquivo, URL codificada e teste inicial | cria uma versão verificável antes da impressão |
| 4 | `F4 DESTINO DO QR VALIDADO` | Laís | Larissa e Caio | confirmação de URL, modo anônimo e versão | confirma que o QR aponta para o destino correto |
| 4 | `VISUAL CONGELADO` | Larissa | Letícia e Caio | apresentação, guia, QR, hashes e testes | impede mudança silenciosa depois do ensaio visual |
| 4 | `FIDELIDADE CONFERIDA` | Letícia | Larissa e Caio | versão do deck/guia e conferência de sentido e tempo | evita que diagramação altere o significado sem retirar a autonomia visual |
| 5 | `ENTREGA FINAL LIBERADA` | cada autor | Caio | arquivos finais, versões, commits, hashes e contingência | torna o manifesto completo e auditável |
| 5 | `PACOTE FINAL INTEGRADO` | Caio | todos | commit de `main`, manifesto, testes e tag candidata | permite uma última conferência sem editar arquivos alheios |
| 5 | `TAG PUBLICADA` | Caio | todos | `v1.0.0`, commit e hashes | prova qual conjunto é a entrega final |
| 5 | `TAG CONFERIDA` | cada proprietário | Caio | hash observado e artefatos próprios abertos somente para leitura | impede encerrar com um commit ausente da tag |

## Ordem interna das fases com dependências

### Fase 2

1. Guilherme cria a estrutura e o conversor sem inventar dados.
2. Laís libera `DADOS F2 LIBERADOS` e Letícia libera `TEXTO F2 LIBERADO`, ambos depois de `push`.
3. Caio integra somente essas branches em `main` e publica `F2 ENTRADAS INTEGRADAS`; esse checkpoint não conclui a fase.
4. Guilherme e Larissa sincronizam `origin/main`, conferem os hashes e registram `RECEBIDO`.
5. Larissa libera `TEMA F2 LIBERADO`; Guilherme consome exatamente as versões recebidas e libera `MVP ESQUELETO LIBERADO`.
6. Caio integra novamente as cinco branches e publica `F2 INTEGRADA`.

Essa ordem permite trabalho paralelo sem obrigar Guilherme a esperar o dia inteiro: ele prepara estrutura e testes enquanto as fontes são concluídas.

### Fase 3

1. Laís libera `DADOS F3 LIBERADOS`; Guilherme gera `dados.js` da mesma cópia.
2. Letícia libera `CONTEÚDO DO GUIA LIBERADO`; Guilherme e Laís liberam candidatos e capturas depois de estabilizar as versões.
3. Caio integra as três fontes em `main` e publica `F3 ENTRADAS INTEGRADAS`; esse checkpoint não encerra a fase.
4. Larissa sincroniza o hash, confirma as três versões e só então substitui as caixas provisórias.
5. Depois da prova e da `FIDELIDADE CONFERIDA`, Caio faz a integração final e publica `F3 INTEGRADA`.

### Fase 4: Looker Studio e QR

1. Laís libera `F4 DADOS CANDIDATOS`; Caio integra esse checkpoint e publica o hash.
2. Guilherme sincroniza, regenera, testa e libera `RESULTADOS MVP LIBERADOS`; Caio integra e publica novo hash.
3. Laís sincroniza, compara os oito casos e libera `F4 EQUIVALÊNCIA CONFIRMADA`.
4. Laís testa o relatório em janela anônima e libera `URL LIBERADA PARA QR`.
5. Larissa gera o QR, testa inicialmente e libera `QR CANDIDATO`.
6. Laís digitaliza o QR, compara a URL e libera `F4 DESTINO DO QR VALIDADO`.
7. Larissa testa em dois celulares e em cópia impressa, inclui URL textual e PDF offline e libera `VISUAL CONGELADO`.
8. Letícia confere significado, ordem e tempo e libera `FIDELIDADE CONFERIDA`.
9. Caio integra. Não se imprime a tiragem antes dessas confirmações.

### Revisores humanos nomeados na Fase 4

- Laís confere cálculo e equivalência do MVP de Guilherme; Guilherme confere abertura técnica do painel, PDF e QR de Laís.
- Letícia confere fidelidade textual do guia e dos slides de Larissa; Larissa confere legibilidade e renderização das exportações de Letícia.
- Caio executa o smoke test do README, manifesto e ensaio completo.
- O revisor nunca altera a fonte alheia: responde `CONFERIDO` ou `CORREÇÃO SOLICITADA` com evidência ao proprietário.

## Mudança depois de uma passagem

O autor não sobrescreve silenciosamente um arquivo já liberado. Ele:

1. altera a situação anterior para `SUBSTITUÍDO`;
2. cria nova versão e novo commit ou hash;
3. publica `ALTERAÇÃO COM IMPACTO` usando o modelo de passagem;
4. lista todos os consumidores afetados;
5. cada consumidor repete o teste correspondente e registra nova confirmação;
6. Caio decide apenas se a mudança entre domínios exige novo congelamento, novo ensaio ou exceção de prazo.

## Mapa de consequências

| Alteração | Consumidores afetados | Trabalho que precisa ser repetido |
|---|---|---|
| Fórmula, campo ou valor dos casos | Laís, Guilherme, Letícia, Larissa e Caio | CSV, ODS/XLSX, `dados.js`, Sheets, Looker, PDF offline, testes, textos numéricos, gráficos, capturas, manifesto e ensaio |
| Texto canônico | Guilherme, Larissa e Caio | interface, slides, guia, roteiro, tempo e exportações |
| Código, comportamento, rótulo ou URL do aplicativo | Laís, Letícia, Larissa e Caio | captura, equivalência, descrição, testes offline, ZIP, hash e ensaio |
| URL do Looker Studio | Larissa, Letícia quando o link for citado, Laís e Caio | QR, teste anônimo, impressão, PDF offline, URL textual e manifesto |
| Visual congelado | Letícia e Caio | conferência de significado, acessibilidade, PDF e ensaio |
| Escola, horário, grupos ou infraestrutura | Guilherme, Laís, Letícia, Larissa e Caio | modo de execução, acesso online/offline, contingência, quantidade impressa, texto de planejamento e roteiro operacional |

## Encerramento após a tag

Depois de `TAG PUBLICADA`, cada proprietário executa `git fetch --tags`, abre `v1.0.0` em modo destacado somente para leitura, confere seus próprios artefatos e responde `TAG CONFERIDA` com o hash observado. Em seguida retorna à própria branch. Ninguém cria commit a partir da tag. Caio encerra a tarefa somente após as quatro confirmações.

## Quando comunicar Caio

Caio recebe todo marco para atualizar dependências, mas só decide quando:

- duas soluções de domínios diferentes não podem coexistir;
- a mudança altera escopo, prazo, congelamento ou pacote final;
- uma exceção aos critérios é indispensável;
- um bloqueio permanece após o autor e o consumidor descreverem o problema com evidência.

Uma dúvida interna de um cargo não precisa de aprovação de Caio. Uma entrega usada por outro cargo sempre precisa de passagem registrada.
