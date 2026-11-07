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

## Acompanhamento da Fase 3 — 05/11/2026

O inventário acima documenta as versões F2, não a conclusão da F3. O [índice do pacote](../90_integracao/indice_pacote.md), v0.1, registra origem, destino, responsável, versão, consumidor e estado de cada candidato. A [lista de incompatibilidades](incompatibilidades_f3.md) registra a divergência de prazos e a errata da sequência de ensaio. No início desta produção, `origin/main` estava em `0c02bc5360fe2e69b6a5ab58e76f73e260f047c7`; as quatro branches remotas dos demais cargos ainda não traziam commits F3 e as tarefas F3 do Notion permaneciam pendentes. Isso não descreve eventuais arquivos locais ainda não enviados pelos autores.

| Domínio | Versão única comprovada nesta revisão | Candidato F3 necessário | Passagem aguardada |
| --- | --- | --- | --- |
| Caio | Manifesto F2 v0.4; índice e incompatibilidades F3 v0.1 publicados na branch de governança | Atualização das cinco entradas, decisão de reprogramação e integração publicada | `F3 ENTRADAS INTEGRADAS` e `F3 INTEGRADA` ainda não emitidos |
| Laís | CSV/ODS/XLSX F2 v0.2 | Fonte privada de 16 linhas, relatório Looker candidato, URL e captura | `DADOS F3 LIBERADOS`; `CAPTURA LOOKER LIBERADA` |
| Guilherme | Esqueleto MVP F2 v0.2 | Comparador com cálculo/sensibilidade e captura estável | `CAPTURA MVP LIBERADA` |
| Letícia | Roteiro/interface/referências F2 v0.3; guia Markdown F2 v0.2; ODT de trabalho F1 v0.1 | Relatório completo, DOCX e texto do guia liberado | `CONTEÚDO DO GUIA LIBERADO`; depois `FIDELIDADE CONFERIDA` |
| Larissa | Wireframes ODP/PPTX/PDF F2 v0.3 | Apresentação e guia completos, prova do guia, exportações candidatas | `F3 PROVA DO GUIA`; `F3 VISUAL CANDIDATO` |

Não há uma nova versão corrente F3 para os quatro domínios alheios até cada proprietário publicar o candidato com versão, testes e commit ou hash. A integração intermediária depende de Laís, Guilherme e Letícia; a final também depende de Larissa e da conferência textual de Letícia. A falta desses marcos não invalida a F2 e impede apenas declarar a F3 integrada. Nenhuma fonte intermediária foi movida para `02_entrega_final`.

**Recebimento em 06/11/2026:** a branch de Laís chegou ao commit `8d229c9`, com atualização de README que declara Sheets e Looker v0.3. O [índice](../90_integracao/indice_pacote.md) e a [incompatibilidade I-F3-04](incompatibilidades_f3.md) registram as evidências ainda não verificáveis e a distinção entre SHA-256 do CSV em CRLF e do blob Git em LF. Esse commit é candidato recebido, não nova versão corrente integrada nem autorização para o marco `CAPTURA LOOKER LIBERADA`.

## Fotografia anterior da Fase 3 — 06/11/2026

As versões F2 da tabela principal permanecem congeladas como histórico. Os candidatos F3 abaixo são as versões correntes **para conferência**, ainda fora de `main` e de `02_entrega_final`. Nenhum deles equivale à integração final ou a aprovação pessoal do responsável. O índice corrente registra os links de cada exportação.

| Domínio | Versão candidata e origem | Evidência técnica | Passagem pendente |
| --- | --- | --- | --- |
| Laís | CSV derivado v0.3 em `codex/lais-f3` `8bef79f`; [Sheets restrito](https://docs.google.com/spreadsheets/d/1kTtj5dAstqlrg_KlhrJNKB5KcZYKiXwqmpM8c19_RLE/edit) | 15 campos, 16 linhas, 8 IDs, C01/C03 conferidos; SHA-256 do CSV derivado no checkout `3A3D34A90DEEE5310F81BE46BA4A6E6378D94A1DC283CB00F8E1BA0315DBC502`; 14 testes do modelo aprovados | Transferir propriedade ou criar a fonte única na conta de Laís; criar/testar Looker Viewer anônimo e colocar PDF pela própria Laís; publicar `DADOS F3 LIBERADOS` e `CAPTURA LOOKER LIBERADA` |
| Guilherme | MVP v0.3 em `guilherme/produto` `2208cbf` | `file://`, oito casos, dez entradas inválidas, sensibilidade, C01/C03/empate, restauração, impressão e captura 390 px testados; [capturas e PDF na pasta](https://drive.google.com/drive/folders/1Hgjk_AYS7Pu4GFqtjr8CSukWGor7s8vD) | Marco `CAPTURA MVP LIBERADA` registrado; aceite pessoal do cargo não presumido |
| Letícia | Guia e roteiro v0.8, matriz e relatório em `codex/leticia-f3-producao` `741ed4a` | [ODT canônico](https://drive.google.com/file/d/14QJfuI7_fhUgBlAEfqvSnPwPwqPvKku-/view), DOCX e PDF na pasta; 13 seções, sumário atualizado e referências rastreadas | Auto revisão editorial, liberação pessoal do conteúdo e conferência da prova do guia após a captura Looker |
| Larissa | Apresentação e guia único v0.4 em `codex/larissa-f3-producao` `d5d9a6d` | [Pasta visual F3](https://drive.google.com/drive/folders/1SeII7XT2dOEaB86i60OJP4rzNJB7zIwc): ODP/PPTX/PDF de oito slides e ODP/PDF do guia A4; PDFs marcados e prova visual inspecionada | Captura Looker para slide 7, resposta `FIDELIDADE CONFERIDA` de Letícia e reconhecimento das fontes após `F3 ENTRADAS INTEGRADAS` |
| Caio | `caio/governanca`, índice e incompatibilidades atualizados | Origem, destino, versão, cargo, consumidores e bloqueios registrados sem alterar as branches de outro domínio | `F3 ENTRADAS INTEGRADAS` e `F3 INTEGRADA` aguardam o painel e as passagens; não publicar hash fictício de `main` |

As pastas editáveis continham uma única versão F3 identificada de cada artefato e formato naquela conferência. Os ODS/XLSX e wireframes F1/F2 anteriores têm função histórica, não são alternativas F3. A planilha Google criada sob propriedade de Caio foi posteriormente retirada ao se constatar que tinha hash diferente e não alimentava o painel publicado por Laís. A autoria funcional permanece associada aos cargos, e os commits de materialização assistida identificam Codex como executor técnico.

## Fotografia da Fase 3 — 07/11/2026

A [tarefa F3 de Laís](https://app.notion.com/p/3fbe84185835817d9d54df0a0b4aa3e9) contém os marcos `DADOS F3 LIBERADOS` e `CAPTURA LOOKER LIBERADA`, publicados pela própria responsável em comentários. O [Looker v0.3](https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc) abriu sem login, exibiu 16 linhas/8 IDs e filtrou C03 corretamente. [PDF](https://drive.google.com/file/d/1XRbvmfUWGMsOXkfj5XN-9XKPNGHy0uvo/view) e [captura](https://drive.google.com/file/d/1izrhIeo7G_IE-qeoIy45M5bQ15Q1JCak/view) estão na contingência de Laís. O CSV importado de 3.022 bytes e SHA-256 `BB247D36AAFCF23FEDB765E86EFF27269732B852C31E7504459F45EAC8B41E7B` é **declaração da autora**; faltam arquivo/URL da planilha para conferência direta do hash e propriedade, além do teste por conta de colega. A reconstrução auxiliar de Codex, de hash diferente, foi removida do Drive e da branch de apoio `a63e324`; não há duas fontes F3 correntes na pasta.

Guilherme mantém o MVP candidato `2208cbf`, reconferido com oito casos, dez limites e sensibilidade. Letícia atualizou roteiro e relatório para v0.9 em `ccf646f`; ODT, DOCX e PDF foram substituídos nos mesmos IDs, e o PDF A4 de nove páginas foi inspecionado. Laís teve o cabeçalho `custo_anual` corrigido apenas no PDF, no mesmo ID do Drive, com SHA-256 `B80E6218B4A66015531D7616185D3E8EEA756B0E1530E3FB039DD11D34BD150F`; o apoio técnico está em `146f26d`. Larissa atualizou apresentação e guia de v0.4 para **v0.5** em `52e1812`, com a captura real do Looker no slide 7, substituindo os mesmos cinco IDs do Drive, sem cópia F3 concorrente. O único [PDF de orientação de Caio v1.5](https://drive.google.com/file/d/1Nm4jd7xocLwCUSjauwiPU20JZ0Nvj4lY/view), SHA-256 `036996B82DB45847A49B3554F61E097606EF6B47222BB153E14DB3C14876DC46`, incorporou a sequência de tempos e `FIDELIDADE CONFERIDA`; a cópia v1.4 obsoleta foi removida localmente.

O [índice do pacote](../90_integracao/indice_pacote.md) tem os links e os portões atuais. Antes de `F3 ENTRADAS INTEGRADAS`, Caio precisa conferir a fonte privada de Laís e os aceites pessoais das três entradas. Depois, Larissa deve confirmar recebimento e publicar a prova v0.5; Letícia deve responder `FIDELIDADE CONFERIDA`. `main` continua em `0c02bc5` e os marcos de integração não foram emitidos.

Em integração **local de ensaio**, as cinco branches candidatas foram reunidas sem conflitos e `node --test 02_produto_guilherme/testes/calculos.test.mjs` passou. Esse ensaio não move `main` nem publica os marcos. A revisão visual final de Larissa em `7c27683` acrescentou metadados pt-BR, texto alternativo e PDF/UA; o PPTX recuperou as cores e o contraste da fonte. Os cinco arquivos foram substituídos nos mesmos IDs do Drive e a [conferência técnica](../04_comunicacao_larissa/conferencia_fidelidade_f3.md) compara a prova com o guia v0.8 e roteiro v0.9. O conector GitHub confirmou permissão `write` para os quatro logins dos integrantes. As pastas Drive e as tarefas F3 do Notion concedem edição aos respectivos cargos; as duas contas Google de Laís podem editar sua pasta e Letícia usa contas distintas no Notion e no Drive. A decisão D-023 autoriza a assistência técnica entre domínios, com o executor real identificado nos commits, e preserva a auto revisão pessoal exigida para a conclusão de cada tarefa.

Após essa fotografia, o registro de Laís chegou a `afc768e` para refletir as duas contas editoras da pasta; o guia de Larissa chegou a `c8f5af8` com fonte textual, versão e data explícitas nas notas do ODP, substituindo o mesmo ID do Drive. O ensaio atualizado está publicado na [branch `codex/f3-preflight`](https://github.com/caioarthur08-pre51/conserta-ou-troca/tree/codex/f3-preflight), hash `21a0b8b`, para revisão. É uma mesclagem candidata, não o checkpoint `F3 ENTRADAS INTEGRADAS` nem a integração final em `main`.

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

