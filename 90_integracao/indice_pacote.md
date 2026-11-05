# Índice do pacote — acompanhamento da Fase 3

**Responsável pelo índice:** Caio Rocha (governança e integração). **Registro técnico:** 05/11/2026. **Base integrada conferida:** `origin/main` em `0c02bc5360fe2e69b6a5ab58e76f73e260f047c7` (fechamento da F2). Este índice identifica versões e dependências; ele ainda não é o pacote operacional da F4/F5.

`Publicado F2` significa que a fonte existente foi conferida na integração da F2. `Não publicado F3` significa que não foi localizada uma versão candidata da F3 nas branches remotas, nas tarefas F3 do Notion ou nas pastas editáveis do [Drive do projeto](https://drive.google.com/drive/folders/10ijJh6opepOq2tLa5_BwmuMxNXJYlupW) na conferência de 05/11/2026. A ausência de publicação não reprova o trabalho em elaboração do proprietário.

## Versões e destinos

| Artefato | Origem verificável | Destino previsto | Cargo responsável | Versão corrente comprovada | Consumidores | Estado na F3 |
| --- | --- | --- | --- | --- | --- | --- |
| Índice e lista de incompatibilidades | `00_governanca_caio/manifesto_integracao.md`, tarefas F3 do Notion e evidência de Git/Drive | `90_integracao/indice_pacote.md` e `00_governanca_caio/incompatibilidades_f3.md` no Git | Caio | F3 v0.1 nesta branch; integração pendente | Todos | Produzidos como acompanhamento, sem declarar F3 integrada |
| CSV A:R e dicionário | `01_modelagem_lais/casos.csv`, `dicionario_dados.md` e `verificacao_f2.md` no Git | Mesmos caminhos no Git; fonte de dados da F3 derivada da versão liberada por Laís | Laís | Base F2 v0.2, oito casos; SHA-256 do CSV `AF130CF8B43D0F3C6634311F863F0AE78C526F492A8E6AD06AF34B9670DABC46` | Guilherme, Letícia, Caio, Looker | Publicado F2; `DADOS F3 LIBERADOS` não publicado |
| Planilha financeira | [ODS canônico](https://drive.google.com/file/d/101mZ5MzYDEVMOJcXUyKvWho0iYZdc_Sz/view) e [XLSX](https://docs.google.com/spreadsheets/d/1TYaAvlLYyekgYI77GJyGMNQP3TxyZXqY/edit) de Laís | `01_editaveis/Lais` no Drive; depois `02_entrega_final/Lais`, somente após liberação final | Laís | F2 v0.2, sete abas, oito casos | Guilherme, Caio | Publicado F2; versão F3 não publicada |
| Fonte privada e relatório Looker Studio | Tabela `DataStudio` da planilha F2 (16 linhas) | Google Sheets privado e relatório de visualização anônima; URL candidata e PDF no registro de Laís | Laís | Não há URL ou versão F3 verificável | Larissa, Letícia, Caio | **Não publicado F3**; captura e QR dependem da liberação correspondente |
| Comparador local e captura estável | `02_produto_guilherme/app/` e `app/README.md` no Git | Mesmo diretório no Git; captura candidata informada por Guilherme; ZIP somente em fase posterior no Drive | Guilherme | Esqueleto F2 v0.2 em `84f6d42` | Laís, Letícia, Larissa, Caio | Publicado F2; MVP com cálculo e `CAPTURA MVP LIBERADA` **não publicados F3** |
| Relatório acadêmico e exportação | [ODT de trabalho v0.1](https://drive.google.com/file/d/1edGs9IB6QfI85bmZCf62kpLTNgH26vIZ/view) de Letícia | `01_editaveis/Leticia` no Drive; DOCX candidato no mesmo domínio | Letícia | Fonte editável F1 v0.1 | Caio, Larissa | Relatório completo e DOCX **não publicados F3** |
| Roteiro, interface, fontes e conteúdo do guia | `03_conteudo_leticia/` no Git | Mesmos caminhos no Git; `CONTEÚDO DO GUIA LIBERADO` com versão própria | Letícia | Roteiro/textos/fontes F2 v0.3; guia em Markdown F2 v0.2 | Guilherme, Larissa, Caio | Publicado F2; liberação textual F3 não publicada |
| Apresentação e guia único | [ODP apresentação](https://drive.google.com/file/d/1Vp2uU61dLgb-zOcejiXrOzPvrwBmylSq/view), [ODP guia](https://drive.google.com/file/d/1XVcTCXEK_ACW6iwwfGoKBLEGUMYzAbfc/view), storyboard e guia visual no Git | `01_editaveis/Larissa` no Drive; `04_comunicacao_larissa/` no Git; exportações candidatas | Larissa | Wireframes F2 v0.3 | Letícia, Caio, dupla de apresentação | Publicado F2; versão visual completa F3, prova do guia e fidelidade textual **não publicadas** |

Os artefatos binários permanecem no Drive. Não foram movidas versões intermediárias para `02_entrega_final`. O [manifesto](../00_governanca_caio/manifesto_integracao.md) conserva links, tamanhos e SHA-256 das fontes binárias F2; este índice mostra a situação de consumo na F3.

## Portões de integração

1. Laís publica `DADOS F3 LIBERADOS` com a versão de `casos.csv` efetivamente usada, hash e fonte longa; Guilherme confirma a cópia em `dados.js`.
2. Letícia publica `CONTEÚDO DO GUIA LIBERADO`. Guilherme e Laís publicam candidatos e `CAPTURA MVP LIBERADA` / `CAPTURA LOOKER LIBERADA`, com versão, teste e destinatários.
3. Caio integra **somente então** as três branches candidatas em `main` e registra `F3 ENTRADAS INTEGRADAS` com hash. Esse checkpoint transporta as fontes para Larissa e não conclui a fase.
4. Larissa sincroniza esse hash, compõe os materiais e publica `F3 PROVA DO GUIA`; Letícia confere fidelidade. Larissa declara `F3 VISUAL CANDIDATO` com as versões consumidas.
5. Caio confere as cinco saídas, atualiza este índice/manifesto e a [lista de incompatibilidades](../00_governanca_caio/incompatibilidades_f3.md), integra as cinco branches e registra `F3 INTEGRADA` com o hash de `main`. **Este marco permanece pendente nesta revisão.**

Para cada arquivo recebido, verificar abertura, instrução de uso, versão, cargo proprietário, commit ou SHA-256, aderência ao contrato e pendência crítica com responsável e prazo. A assinatura pessoal do titular ou a confirmação `RECEBIDO` de outro cargo não é presumida por esta conferência técnica.
