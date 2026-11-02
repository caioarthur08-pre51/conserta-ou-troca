# Manifesto de integração

## Fechamento da Fase 1

As cinco entregas de fundação estão integradas em `main`. O quadro do Notion e `90_integracao/cronograma_14_dias.csv` registram as cinco tarefas da F1 como `Concluída`; o commit `bbd7c91` conciliou o cronograma com o quadro. A tabela abaixo identifica as fontes da F1. O inventário seguinte acompanha as versões operacionais previstas para as fases posteriores.

| Cargo | Saída da F1 | Rastreio | Estado da F1 |
|---|---|---|---|
| Caio | Termo de abertura, riscos, decisões e cronograma | `bffa6c7` | Integrada; cronograma conciliado em `bbd7c91` |
| Laís | Dicionário, fórmulas e oito casos sintéticos no contrato A:R | Origem `16a85b3`; CSV e organização em `3cf443d` | Integrada |
| Guilherme | Especificação de arquitetura, importação e validações do MVP | Origem `035aab9`; alinhamento ao contrato em `a281d64` | Integrada |
| Letícia | Objetivo observável, estrutura de 13 seções, matriz inicial e fonte ODT | Git `7a7db45`; ODT no Drive | Integrada |
| Larissa | Guia visual, sequência de oito slides e fontes ODP iniciais | Git `f62df45`; ODPs no Drive | Integrada |

## Contratos e inventário das versões

O contrato de campos, testes, consumidores e ordem de integração da Fase 2 está em [`contratos_fase_2.md`](contratos_fase_2.md). A tabela abaixo separa **fonte existente** de **entrega F2/final ainda pendente**. `—` significa que não existe versão liberada; jamais substitua por um nome de arquivo esperado. O Drive do projeto é [esta pasta](https://drive.google.com/drive/folders/10ijJh6opepOq2tLa5_BwmuMxNXJYlupW). Link de pasta não prova que um arquivo foi enviado.

| Artefato | Proprietário | Caminho canônico ou origem | Versão congelada | Data de corte | Commit | SHA-256 | Link Drive do arquivo | Contingência | Consumidores | Situação |
|---|---|---|---|---|---|---|---|---|---|---|
| Contratos F2 e decisões | Caio | `00_governanca_caio/contratos_fase_2.md` e `registro_decisoes.csv` | F2 v0.2 | 02/11/2026 | Referência da própria branch no Notion após `push` | n.a. para fonte Git | — | Cópia local do repositório | Todos | Fonte testada; liberação identificada no Notion |
| Protocolo de comunicação | Caio | `00_governanca_caio/protocolo_comunicacao.md` | F1 vigente | 21/10/2026 | `d2d2904` em `main` | n.a. para fonte Git | — | Cópia local do repositório | Todos | Disponível |
| Logística da ação | Caio | `00_governanca_caio/logistica_acao.md` | Planejamento em aberto | 02/11/2026 | Referência da própria branch no Notion após `push` | n.a. para fonte Git | — | Roteiro genérico e modo offline | Todos | Escola, data, grupos e infraestrutura não confirmados |
| CSV canônico A:R | Laís | `01_modelagem_lais/casos.csv` | F1 disponível; F2 não liberada | 21/10/2026 | `d2d2904` em `main` | A informar na versão final | — | Cópia CSV F1 para preparo, sem declaração de F2 | Guilherme, Letícia, Caio, Looker | Aguardando `DADOS F2 LIBERADOS` |
| Dicionário de dados | Laís | `01_modelagem_lais/dicionario_dados.md` | Contrato F1 1.0; F2 não liberada | 21/10/2026 | `d2d2904` em `main` | n.a. para fonte Git | — | Cópia local do repositório | Guilherme, Letícia, Caio | Aguardando F2 |
| Planilha financeira | Laís | ODS editável no Drive de Laís | — | — | n.a. | A informar pela autora | A informar pela autora | CSV e cálculo de referência | Guilherme, Letícia, Caio | Aguardando ODS e teste F2 |
| Fonte do Looker Studio | Laís | Google Sheets privado | — | — | n.a. | n.a. | Link restrito a informar | CSV e ODS | Laís, Caio | Não publicada |
| Relatório Looker Studio | Laís | URL anônima somente leitura | — | — | n.a. | A informar para PDF offline | A informar pela autora | PDF offline | Larissa, Letícia, Caio | Não publicado |
| MVP local | Guilherme | `02_produto_guilherme/app/` | Esqueleto parcial F2 | 02/11/2026 | `850652e` na branch do autor, ainda não integrado | n.a. para fonte Git | — | Cálculo manual e roteiro | Laís, Letícia, Larissa, Caio | Sem marco `MVP ESQUELETO LIBERADO`; não consumir |
| ZIP do MVP | Guilherme | Fonte `02_produto_guilherme/app/`; ZIP no Drive | — | — | A informar para fonte Git | A informar para ZIP | A informar pelo autor | Pasta descompactada | Caio e dupla de apresentação | Não produzido |
| Relatório acadêmico | Letícia | ODT editável no Drive de Letícia | F1 inicial; F2 não liberada | 21/10/2026 | n.a. para ODT | A informar pela autora | A informar pela autora | PDF quando exportado | Caio e Larissa | Aguardando conteúdo F2 |
| Roteiro e referências | Letícia | `03_conteudo_leticia/roteiro_microoficina.md` e matriz | Matriz F1 disponível; roteiro F2 não liberado | 21/10/2026 | `d2d2904` para matriz | n.a. para fonte Git | — | Roteiro impresso após versão final | Guilherme, Larissa, Caio | Aguardando `TEXTO F2 LIBERADO` |
| Conteúdo do guia | Letícia | `03_conteudo_leticia/guia_estudante_conteudo.md` | — | — | A informar | n.a. para fonte Git | — | Roteiro | Larissa e Caio | Não produzido |
| Apresentação | Larissa | ODP editável no Drive de Larissa | F1 inicial; F2 não liberada | 21/10/2026 | n.a. para ODP | A informar pela autora | A informar pela autora | PDF quando exportado | Letícia, Caio, dupla | Aguardando storyboard F2 |
| Guia visual único | Larissa | Fonte editável no Drive de Larissa | — | — | n.a. | A informar pela autora | A informar pela autora | Cópia impressa quando pronta | Letícia, Caio e estudantes | Não produzido |
| QR e URL textual | Larissa | Destino: URL final de Laís; fonte visual no Drive | — | — | n.a. | A informar para PDF/QR | A informar pela autora | URL textual e PDF offline | Caio, Laís, equipe | Aguardando URL final validada |

Caio atualiza este manifesto a cada liberação. O autor informa versão, data, commit, link do **arquivo**, tamanho e SHA-256 quando aplicável e publica `ENTREGA FINAL LIBERADA` na Fase 5. O integrador não edita o conteúdo. O caminho canônico continua existindo; o arquivo versionado é uma cópia congelada, não um substituto que quebre dependências. O hash de um commit que contém o próprio manifesto fica registrado no Notion depois do `push`, pois não pode constar dentro do mesmo commit sem gerar outro hash.

## Controle obrigatório das passagens

Esta tabela complementa o inventário acima. Caio preenche uma linha para cada versão liberada; não basta registrar apenas o arquivo final.

| Artefato e versão | Link Drive ou caminho consumível | Consumidores | Marco | Confirmações recebidas |
|---|---|---|---|---|
| Contratos F2 v0.2 | `00_governanca_caio/contratos_fase_2.md` e manifesto na branch de Caio | Todos | `DRIVE E CONTRATOS LIBERADOS`, após `push` | Aguardando confirmação por versão |
| Dados F2, pendente | `01_modelagem_lais/casos.csv`, ODS e dicionário | Guilherme, Letícia, Caio | `DADOS F2 LIBERADOS` | Não recebido |
| Texto F2, pendente | Roteiro, textos e referências na branch de Letícia/Drive | Guilherme, Larissa, Caio | `TEXTO F2 LIBERADO` | Não recebido |
| Tema F2, pendente | Guia visual, wireframe e ODP na branch de Larissa/Drive | Guilherme, Letícia, Caio | `TEMA F2 LIBERADO` | Não recebido |
| Esqueleto F2, pendente | `02_produto_guilherme/app/` e testes | Laís, Letícia, Larissa, Caio | `MVP ESQUELETO LIBERADO` | Não recebido; commit parcial não é liberação |

Para cada mudança, duplique a linha, mantenha a anterior como `SUBSTITUÍDA` no campo de marco e registre quem confirmou a nova versão. Uma confirmação deve citar o mesmo commit ou SHA-256 publicado pelo autor.

## Ordem interna da integração final

1. Laís congela CSV, planilha e fonte do dashboard.
2. Guilherme copia o mesmo CSV, regenera `dados.js` e executa os testes.
3. Laís compara os oito resultados entre planilha e MVP.
4. Letícia atualiza números e textos usando somente versões aprovadas.
5. Larissa atualiza capturas, QR, URL e arquivos de apresentação.
6. Caio integra as branches, executa o checklist e registra hashes.
7. Caio publica `PACOTE FINAL INTEGRADO` com commit de `main`, versão do manifesto, resultado dos testes e tag candidata.
8. Caio publica `TAG PUBLICADA`; cada proprietário confere seus artefatos em `v1.0.0` somente para leitura e responde `TAG CONFERIDA` com o hash observado.

