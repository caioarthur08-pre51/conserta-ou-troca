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

O contrato de campos, testes, consumidores e ordem de integração da Fase 2 está em [`contratos_fase_2.md`](contratos_fase_2.md). **Versão deste inventário: F2 v0.4, atualizada em 05/11/2026.** A tabela distingue a F2 tecnicamente liberada das saídas de F3–F5 ainda futuras. A data de corte 03/11 da planilha identifica a base sintética; os arquivos faltantes foram materializados e verificados em 05/11 sob delegação. O Drive do projeto é [esta pasta](https://drive.google.com/drive/folders/10ijJh6opepOq2tLa5_BwmuMxNXJYlupW). Cada binário abaixo tem link próprio e SHA-256.

| Artefato | Proprietário | Caminho canônico ou origem | Versão congelada | Data de corte | Commit | SHA-256 | Link Drive do arquivo | Contingência | Consumidores | Situação |
|---|---|---|---|---|---|---|---|---|---|---|
| Contratos F2 | Caio | `00_governanca_caio/contratos_fase_2.md` | F2 v0.3 | 02/11/2026 | `70486ad` | n.a. para fonte Git | — | Cópia local do repositório | Todos | Publicado; contrato vigente |
| Manifesto de integração | Caio | `00_governanca_caio/manifesto_integracao.md` | F2 v0.4 | 05/11/2026 | Hash do próprio fechamento no Notion após `push` | n.a. para fonte Git | — | Cópia local do repositório | Todos | Inventário e passagens revisados |
| Decisões | Caio | `00_governanca_caio/registro_decisoes.csv` | F2 vigente | 02/11/2026 | `70486ad` | n.a. para fonte Git | — | Cópia local do repositório | Todos | D-007, D-011, D-019 e D-021 conferidas |
| Riscos e pendências | Caio | `00_governanca_caio/riscos_e_pendencias.md` | F2 vigente | 05/11/2026 | Hash do próprio fechamento no Notion após `push` | n.a. para fonte Git | — | Modo offline e replanejamento explícito | Todos | Risco de atraso F2 encerrado; logística externa aberta |
| Cronograma | Caio | `90_integracao/cronograma_14_dias.csv` | F2 vigente | 05/11/2026 | Hash do próprio fechamento no Notion após `push` | n.a. para fonte Git | — | Cópia local do repositório | Todos | Cinco linhas F2 conciliadas com o Notion |
| Protocolo de comunicação | Caio | `00_governanca_caio/protocolo_comunicacao.md` | F1 vigente | 21/10/2026 | `d2d2904` em `main` | n.a. para fonte Git | — | Cópia local do repositório | Todos | Disponível |
| Logística da ação | Caio | `00_governanca_caio/logistica_acao.md` | Planejamento em aberto | 02/11/2026 | `70486ad` | n.a. para fonte Git | — | Roteiro genérico e modo offline | Todos | Escola, data, grupos e infraestrutura não confirmados |
| CSV canônico A:R | Laís | `01_modelagem_lais/casos.csv` | Base F2 v0.2; mesmos 8 casos da F1 | 03/11/2026 | `d2d2904`; verificação `6e97f75` | `AF130CF8B43D0F3C6634311F863F0AE78C526F492A8E6AD06AF34B9670DABC46` | — | Cópia local e ODS | Guilherme, Letícia, Caio, Looker | `DADOS F2 LIBERADOS`; 1.616 bytes; A:R e categorias conferidos |
| Dicionário de dados | Laís | `01_modelagem_lais/dicionario_dados.md` | Contrato F2 v0.2 | 05/11/2026 | `6e97f75` | n.a. para fonte Git | — | Cópia local do repositório | Guilherme, Letícia, Caio | Publicado e reconciliado |
| Evidência da modelagem | Laís | `01_modelagem_lais/verificacao_f2.md` | F2 v0.2 | 05/11/2026 | `6e97f75` | n.a. para fonte Git | — | Testes reproduzíveis descritos | Guilherme, Letícia, Caio | 14 testes, ODS/XLSX e conversor aprovados |
| ODS canônico | Laís | `modelo_tco_canonico.ods` no Drive | F2 v0.2 | 03/11/2026 | n.a. para binário | `FA8D3F9AC3A550DDBAE2B8F7115E0D0BE9F9FB2DE92C0F478ACA02BB1A6CCA23` | [Arquivo](https://drive.google.com/file/d/101mZ5MzYDEVMOJcXUyKvWho0iYZdc_Sz/view) | CSV e cálculo de referência | Guilherme, Letícia, Caio | Editável; 25.772 bytes; 7 abas e 8 casos testados |
| Fotografia ODS | Laís | `modelo_tco_v0.2_2026-11-03.ods` no Drive | F2 v0.2 | 03/11/2026 | n.a. para binário | `FA8D3F9AC3A550DDBAE2B8F7115E0D0BE9F9FB2DE92C0F478ACA02BB1A6CCA23` | [Arquivo](https://drive.google.com/file/d/1WIX8osTkWE33SXvY4oy_rjDCG6yZSOQT/view) | ODS canônico | Guilherme, Letícia, Caio | Cópia congelada idêntica; 25.772 bytes |
| Exportação XLSX | Laís | `modelo_tco_v0.2_2026-11-03.xlsx` no Drive | F2 v0.2 | 03/11/2026 | n.a. para binário | `FB21D963E8EBCF26A99EDCC36291C7F4BE1EB3A7734033ABD9DE6BD47AEE7E33` | [Arquivo](https://docs.google.com/spreadsheets/d/1TYaAvlLYyekgYI77GJyGMNQP3TxyZXqY/edit) | ODS canônico | Guilherme, Letícia, Caio | Exportação recalculada e testada; 23.489 bytes |
| Fonte do Looker Studio | Laís | Google Sheets privado | — | — | n.a. | n.a. | Link restrito a informar | CSV e ODS | Laís, Caio | Não publicada |
| Relatório Looker Studio | Laís | URL anônima somente leitura | — | — | n.a. | A informar para PDF offline | A informar pela autora | PDF offline | Larissa, Letícia, Caio | Não publicado |
| Esqueleto MVP local | Guilherme | `02_produto_guilherme/app/` e `app/README.md` | F2 v0.2 | 05/11/2026 | `8cace36`, `f62f327`, `84f6d42` | n.a. para fonte Git | — | Cálculo manual e roteiro | Laís, Letícia, Larissa, Caio | `MVP ESQUELETO LIBERADO`; `file://` e console testados |
| Conversor e `dados.js` | Guilherme | `02_produto_guilherme/scripts/gerar_dados.mjs`, `app/js/dados.js` | F2 v0.2 | 05/11/2026 | `8cace36`, `f62f327`, `84f6d42` | n.a. para fonte Git | — | CSV canônico e tabela manual | Laís, Letícia, Larissa, Caio | 8 objetos, 18 campos e 4 rejeições mínimas conferidos |
| ZIP do MVP | Guilherme | Fonte `02_produto_guilherme/app/`; ZIP no Drive | — | — | A informar para fonte Git | A informar para ZIP | A informar pelo autor | Pasta descompactada | Caio e dupla de apresentação | Não produzido |
| Relatório acadêmico | Letícia | ODT editável no Drive de Letícia | Fonte F1 | 21/10/2026 | n.a. para ODT | A informar na F5 | [Pasta do cargo](https://drive.google.com/drive/folders/1GVMsFw9FbN9rJaWktQ5q-o7cR5jaGCnm) | PDF quando exportado | Caio e Larissa | Versão completa do relatório pertence à F3 |
| Roteiro | Letícia | `03_conteudo_leticia/roteiro_microoficina.md` | F2 v0.3 | 05/11/2026 | `718f29e`, `422fe6d` | n.a. para fonte Git | — | Roteiro impresso após versão final | Guilherme, Larissa, Caio | `TEXTO F2 LIBERADO`; 18+2 min verificados por TTS |
| Contrato de interface | Letícia | `03_conteudo_leticia/textos_interface.md` | F2 v0.3 | 05/11/2026 | `422fe6d` | n.a. para fonte Git | — | Texto da interface no repositório | Guilherme, Larissa, Caio | Rótulos, garantias e erro líquido definidos |
| Referências iniciais | Letícia | `03_conteudo_leticia/referencias_iniciais.md` | F2 v0.3 | 05/11/2026 | `422fe6d` | n.a. para fonte Git | — | Fontes institucionais registradas | Guilherme, Larissa, Caio | Referências verificadas na F2 |
| Matriz afirmação–fonte | Letícia | `03_conteudo_leticia/matriz_afirmacoes_fontes.csv` | F2 v0.3 | 05/11/2026 | `422fe6d` | n.a. para fonte Git | — | Referências iniciais | Guilherme, Larissa, Caio | 8 de 8 afirmações com fonte verificada |
| Conteúdo do guia único | Letícia | `03_conteudo_leticia/guia_decisao_conteudo.md` | F2 v0.2 | 03/11/2026 | `718f29e` | n.a. para fonte Git | — | Roteiro e Markdown do conteúdo | Larissa e Caio | Texto entregue; diagramação final pertence à F3 |
| Wireframe da apresentação | Larissa | `apresentacao_trabalho_v0.3.odp` no Drive | F2 v0.3 | 05/11/2026 | n.a. para binário | `A04CCA7669CD5854A9E69AC6E75B7128CC59727997B4486E51B3161AEBC4A5D7` | [Arquivo](https://drive.google.com/file/d/1Vp2uU61dLgb-zOcejiXrOzPvrwBmylSq/view) | [PDF](https://drive.google.com/file/d/1OqScrcldG1hZQShOSJ2mfQ6LKfFgMADT/view) | Letícia, Caio, dupla | Oito slides e notas ligados às versões recebidas; 17.330 bytes |
| Wireframe do guia A4 | Larissa | `guia_decisao_v0.3.odp` no Drive | F2 v0.3 | 05/11/2026 | n.a. para binário | `D779924F4BE93FB2536D6521CC545A8B1FF3EBDAD53E0E8EECDA75E5A5B11E3E` | [Arquivo](https://drive.google.com/file/d/1XVcTCXEK_ACW6iwwfGoKBLEGUMYzAbfc/view) | [PDF](https://drive.google.com/file/d/1ppIiWxSdytp3weZBV8shJ9CcJUSUzqZ0/view) | Letícia e Caio | Uma página, fonte textual de Letícia identificada; 18.386 bytes |
| PPTX da apresentação | Larissa | `apresentacao_trabalho_v0.3.pptx` no Drive | F2 v0.3 | 05/11/2026 | n.a. para binário | `C60F1356B04DC0C857F7354A40DEF026B37105BD1D30F52E6A9CF3612D84F0B1` | [Arquivo](https://docs.google.com/presentation/d/1EK0yHjwUCdT_SSADCRmRnVkMY0WOac09/edit) | ODP canônico | Letícia, Caio, dupla | Exportação sem edição independente; 36.100 bytes |
| PDF dos wireframes | Larissa | `wireframes_apresentacao_v0.3.pdf` no Drive | F2 v0.3 | 05/11/2026 | n.a. para binário | `256A4757249D7A34A731F169F3844F933C3AB172A4A721BA447F11625F04C846` | [Arquivo](https://drive.google.com/file/d/1OqScrcldG1hZQShOSJ2mfQ6LKfFgMADT/view) | ODP e PPTX | Letícia, Caio, dupla | Oito páginas inspecionadas; 44.477 bytes |
| PDF do guia | Larissa | `wireframe_guia_v0.3.pdf` no Drive | F2 v0.3 | 05/11/2026 | n.a. para binário | `BD1A19E1C180339D94782F1A506691971CDA5FF204CD4493E765B4F4841CFF8E` | [Arquivo](https://drive.google.com/file/d/1ppIiWxSdytp3weZBV8shJ9CcJUSUzqZ0/view) | ODP do guia | Letícia e Caio | Uma página A4 inspecionada; 34.354 bytes |
| Guia visual | Larissa | `04_comunicacao_larissa/guia_visual.md` | F2 v0.3 | 05/11/2026 | `c1da8e3` | n.a. para fonte Git | — | ODPs e PDFs | Guilherme, Letícia, Caio | Paleta, contraste, tamanho e links conferidos |
| Storyboard | Larissa | `04_comunicacao_larissa/storyboard_f2.md` | F2 v0.3 | 05/11/2026 | `6cbe8e5` | n.a. para fonte Git | — | ODPs e PDFs | Guilherme, Letícia, Caio | `TEMA F2 LIBERADO`; tempos 0:00–20:00 cobertos |
| Ativos e licenças visuais | Larissa | Nenhum ativo externo foi usado nos wireframes F2 | n.a. | 05/11/2026 | `6cbe8e5` | n.a. | — | Formas e texto nativos dos ODPs | Guilherme, Letícia, Caio | Nenhuma licença de imagem exigida na F2 |
| QR e URL textual | Larissa | Destino: URL final de Laís; fonte visual no Drive | — | — | n.a. | A informar para PDF/QR | A informar pela autora | URL textual e PDF offline | Caio, Laís, equipe | Aguardando URL final validada |

Caio atualiza este manifesto a cada liberação. O responsável pelo domínio informa versão, data, commit, link do **arquivo**, tamanho e SHA-256 quando aplicável e publica `ENTREGA FINAL LIBERADA` na Fase 5. Nesta regularização da F2, a produção técnica assistida ocorreu sob delegação para as lacunas de cada cargo; os commits identificam a assistência sem se passar pelos integrantes. A propriedade de cada artefato e as decisões de conteúdo permanecem nos respectivos cargos. O caminho canônico continua existindo; o arquivo versionado é uma cópia congelada. O hash do commit que contém este próprio manifesto será registrado no Notion depois do `push`, pois não pode constar dentro do mesmo commit sem gerar outro hash.

## Controle obrigatório das passagens

Esta tabela complementa o inventário acima. Caio preenche uma linha para cada versão liberada; não basta registrar apenas o arquivo final.

| Artefato e versão | Link Drive ou caminho consumível | Consumidores | Marco | Confirmações recebidas |
|---|---|---|---|---|
| Contratos F2 v0.2 | `00_governanca_caio/contratos_fase_2.md` e manifesto no commit `8458700` | Todos | `SUBSTITUÍDA` pela v0.3; regra de prazo presencial esclarecida | Não usar como referência vigente |
| Contratos F2 v0.3 | `00_governanca_caio/contratos_fase_2.md` em `70486ad` | Todos | `DRIVE E CONTRATOS LIBERADOS` | Conferência técnica de integração; assinatura pessoal de cada consumidor não presumida |
| Dados F2 v0.2 | CSV no Git, [ODS canônico](https://drive.google.com/file/d/101mZ5MzYDEVMOJcXUyKvWho0iYZdc_Sz/view), dicionário e `verificacao_f2.md` em `6e97f75` | Guilherme, Letícia, Caio | `DADOS F2 LIBERADOS` | Recebido tecnicamente na integração `036b584`; Guilherme regenerou oito objetos iguais |
| Texto F2 v0.3 | Roteiro, contrato e referências em `422fe6d`; guia v0.2 em `718f29e` | Guilherme, Larissa, Caio | `TEXTO F2 LIBERADO` | Recebido tecnicamente na integração `036b584`; storyboard consumiu roteiro v0.3 |
| Tema F2 v0.3 | `guia_visual.md` e `storyboard_f2.md` em `6cbe8e5`; [ODP apresentação](https://drive.google.com/file/d/1Vp2uU61dLgb-zOcejiXrOzPvrwBmylSq/view) e [guia](https://drive.google.com/file/d/1XVcTCXEK_ACW6iwwfGoKBLEGUMYzAbfc/view) | Guilherme, Letícia, Caio | `TEMA F2 LIBERADO` | Oito slides e guia A4 conferidos na integração; aceites pessoais não presumidos |
| Esqueleto F2 v0.2 | `02_produto_guilherme/app/`, conversor e testes em `84f6d42` | Laís, Letícia, Larissa, Caio | `MVP ESQUELETO LIBERADO` | CSV/dados.js iguais; `file://` e quatro rejeições conferidos na integração |

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

