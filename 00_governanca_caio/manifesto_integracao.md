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

## Inventário das versões operacionais

| Artefato | Proprietário | Caminho canônico ou origem | Arquivo congelado/Drive | Versão | Data de corte | Commit | SHA-256 | Contingência | Situação |
|---|---|---|---|---|---|---|---|---|---|
| Governança e decisões | Caio | `00_governanca_caio/` | A definir | 0.2 | 2026-10-17 | A definir | n.a. | Cópia local | Em preparação |
| Protocolo de comunicação | Caio | `00_governanca_caio/protocolo_comunicacao.md` | Mesmo arquivo no Drive | 0.1 | 2026-10-18 | A definir | A definir | Cópia local | Criado |
| Logística da ação | Caio | `00_governanca_caio/logistica_acao.md` | Cópia restrita no Drive | 0.1 | 2026-10-18 | A definir | A definir | Roteiro genérico e modo offline | Aguardando confirmação externa |
| CSV canônico | Laís | `01_modelagem_lais/casos.csv` | `casos_v1.0_2026-10-30.csv` | 0.2 | 2026-10-17 | A definir | A definir | CSV no Drive | Em preparação |
| Dicionário de dados | Laís | `01_modelagem_lais/dicionario_dados.md` | `dicionario_v1.0_2026-10-30.md` | 0.2 | 2026-10-17 | A definir | A definir | Cópia no Drive | Em preparação |
| Planilha financeira | Laís | Fonte ODS no Drive | `modelo_tco_v1.0_2026-10-30.xlsx` | 0.2 | 2026-10-17 | n.a. | A definir | XLSX e PDF | Modelo corrigido |
| Fonte do Looker Studio | Laís | Google Sheets privado | Link restrito no Notion | 0.2 | 2026-10-17 | n.a. | n.a. | CSV e XLSX | Não publicada |
| Relatório Looker Studio | Laís | URL de visualização anônima | `dashboard_v1.0_2026-10-30.pdf` | 0.2 | 2026-10-17 | n.a. | A definir | PDF offline | Não publicado |
| MVP local | Guilherme | `02_produto_guilherme/app/` | Pasta final no Drive | 0.1 | 2026-10-17 | A definir | A definir | Navegador alternativo | Estrutura |
| ZIP do MVP | Guilherme | Pasta do app aprovada | `comparador_offline_v1.0_2026-10-30.zip` no Drive | 0.1 | 2026-10-17 | A definir | A definir | Pasta descompactada | Não produzido |
| Relatório acadêmico | Letícia | Fonte ODT no Drive | DOCX e PDF v1.0 | 0.2 | 2026-10-17 | n.a. | A definir | PDF | Modelo corrigido |
| Roteiro | Letícia | `03_conteudo_leticia/roteiro_microoficina.md` | PDF v1.0 no Drive | 0.2 | 2026-10-17 | A definir | A definir | Cópia impressa | Em preparação |
| Conteúdo do guia | Letícia | `03_conteudo_leticia/guia_estudante_conteudo.md` | Mesmo arquivo no Drive | 0.1 | 2026-10-17 | A definir | A definir | Roteiro | Não produzido |
| Apresentação | Larissa | Fonte ODP no Drive | PPTX e PDF v1.0 | 0.2 | 2026-10-17 | n.a. | A definir | PDF | Modelo corrigido |
| Guia visual único | Larissa | Fonte ODP/ODG no Drive | `guia_decisao_v1.0_2026-10-30.pdf` | 0.1 | 2026-10-17 | n.a. | A definir | Cópia impressa | Não produzido |
| QR e URL textual | Larissa | URL final do Looker Studio | PDF de impressão no Drive | 0.1 | 2026-10-17 | n.a. | A definir | URL textual | Não produzido |

Caio atualiza este manifesto ao final de cada fase. O autor informa versão, data, commit, link, tamanho e SHA-256 quando aplicável e publica `ENTREGA FINAL LIBERADA`. O integrador não edita o conteúdo. O caminho canônico continua existindo; o arquivo versionado é uma cópia congelada, não um substituto que quebre dependências.

## Controle obrigatório das passagens

Esta tabela complementa o inventário acima. Caio preenche uma linha para cada versão liberada; não basta registrar apenas o arquivo final.

| Artefato e versão | Link Drive ou caminho consumível | Consumidores | Marco | Confirmações recebidas |
|---|---|---|---|---|
| A preencher | A preencher | A preencher | A preencher | A preencher |

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

