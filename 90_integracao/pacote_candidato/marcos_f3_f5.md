# Marcos técnicos F3–F5

**Coordenação e integração:** Caio Rocha  
**Execução técnica centralizada:** Codex sob coordenação de Caio Rocha  
**Congelamento dos artefatos:** 08/11/2026  
**QA e publicação:** 09/11/2026

Este registro separa produção técnica, autoria funcional e ações humanas. O domínio de cada artefato continua associado ao cargo definido no planejamento; a execução assistida não equivale a aceite pessoal do integrante.

## Fechamento técnico da Fase 3

| Cargo funcional | Saída integrada | Evidência técnica | Situação |
|---|---|---|---|
| Caio — governança e integração | quadro, índice, decisões, logística e staging autônomo | branch de execução centralizada, inventário e cópias preservadas | concluída tecnicamente |
| Laís — dados e BI | planilha, oito casos, fonte longa, Looker público, PDF e captura | 14 testes; sete abas; 16 linhas/8 IDs no painel; filtro C03 anônimo | concluída tecnicamente |
| Guilherme — MVP | comparador local, sensibilidade, restauração e impressão | oito casos, dez limites, C01, C03 e empate aprovados | concluída tecnicamente |
| Letícia — conteúdo | relatório, roteiro, guia textual, referências e matriz | 13 seções, renderização e rastreabilidade das oito afirmações | concluída tecnicamente |
| Larissa — comunicação visual | apresentação de oito slides e guia A4 | renderização integral, contraste, QR e URL textual | concluída tecnicamente |

Os marcos `DADOS F3 LIBERADOS`, `CAPTURA LOOKER LIBERADA`, `CAPTURA MVP LIBERADA`, `CONTEÚDO DO GUIA LIBERADO`, `F3 PROVA DO GUIA`, `F3 VISUAL CANDIDATO`, `F3 ENTRADAS INTEGRADAS` e `F3 INTEGRADA` são satisfeitos como checkpoints técnicos desta execução centralizada. Nenhum deles atribui comentário ou aceite pessoal a quem não o realizou.

## Cadeia técnica da Fase 4

| Ordem | Marco | Evidência | Estado |
|---:|---|---|---|
| 1 | `F4 DADOS CANDIDATOS` | ODS/XLSX/CSV e fonte Looker congelados | aprovado |
| 2 | integração intermediária de Laís | equivalência do modelo e arquivos reabertos | aprovado |
| 3 | `RESULTADOS MVP LIBERADOS` | ZIP offline e evidências de C01, C03, empate, teclado, restauração e impressão | aprovado |
| 4 | integração intermediária de Guilherme | Chrome, Edge e Firefox em 390 × 844 e 1280 × 720 | aprovado |
| 5 | `F4 EQUIVALÊNCIA CONFIRMADA` | oito de oito resultados idênticos entre Python e JavaScript | aprovado |
| 6 | `F4 CONTEÚDO CONGELADO` | relatório, roteiro, referências e guia textual validados | aprovado |
| 7 | `URL LIBERADA PARA QR` | Looker público abriu sem login | aprovado |
| 8 | `QR CANDIDATO` | decodificação digital retornou exatamente a URL do Looker | aprovado |
| 9 | `F4 DESTINO DO QR VALIDADO` | exige dois celulares e prova impressa | **pendente de Caio** |
| 10 | `VISUAL CONGELADO` | apresentação e guia reexportados e reinspecionados | aprovado tecnicamente |
| 11 | candidato integrado | pacote completo, manifesto e publicação | aprovado tecnicamente; tag final retida |

## Finalização técnica da Fase 5

- Pacote do MVP extraído numa pasta limpa e executado sem servidor e sem rede.
- A planilha foi reaberta, renderizada em sete abas e não contém erro de fórmula.
- Os PDFs do painel, relatório, roteiro, apresentação, guia e contingência do MVP foram renderizados e inspecionados.
- O roteiro contém 10 min 58 s de fala sintética no total; até 18:00, a fala ocupa 10 min 34,89 s e reserva 7 min 25,11 s para ações e transições. Isso comprova viabilidade técnica, não ensaio humano.
- O QR digital codifica exatamente `https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc`.
- Cada arquivo distribuível possui tamanho e SHA-256 no manifesto final.
- Não há dados de participantes nem resultados inventados da aplicação.

## Gates que permanecem humanos ou físicos

Somente Caio pode preencher estes itens depois de executá-los:

- leitura do QR em dois celulares;
- leitura da prova impressa a aproximadamente 30 cm, 60 cm e 100 cm;
- digitação manual da URL;
- ensaio humano cronometrado com navegação, cálculo e transição;
- conferência do computador e projetor reais da ação;
- publicação da tag `v1.0.0` sobre o commit efetivamente usado.

Enquanto esses registros não existirem, o pacote é tecnicamente pronto para a ação, mas a tag final não deve ser apresentada como publicada.
