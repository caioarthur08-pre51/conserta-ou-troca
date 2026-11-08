# Registro técnico da produção textual F3

Responsável editorial do domínio: Letícia Costa. Produção e revisão técnica assistidas por Codex em 06/11/2026. Este registro não atribui auto revisão ou aprovação pessoal a Letícia.

## Entregas candidatas

- Relatório v0.9: ODT canônico, DOCX e PDF de conferência em `01_editaveis/Leticia` no Drive, atualizados nos mesmos IDs. O sumário automático foi atualizado; a exportação foi conferida tecnicamente.
- Roteiro v0.9: sequência de oito slides, cálculo manual antes do MVP, conteúdo até 18 minutos e interação/transição até 20 minutos. A medição por TTS da F2 não equivale a ensaio humano.
- Conteúdo Markdown do guia v0.8: uma única fonte textual para a diagramação de Larissa, com fórmulas, condição de 1,5 ano e sensibilidade de um ano.
- Matriz de fontes: oito afirmações, autoria, URL, acesso e referência candidata. A revisão editorial da NBR 6023:2025 está assinalada como pendente.

## Conferência dos contratos

Os rótulos `Reparar`, `Trocar` e `Empate técnico`, o aviso educativo e as mensagens de entrada inválida de `textos_interface.md` foram comparados ao MVP F3 publicado por Guilherme. Em 08/11, o [commit `389f866`](https://github.com/caioarthur08-pre51/conserta-ou-troca/commit/389f866f81064049f9d24d78cd395c908c2806de) levou a redação dos critérios não financeiros ao contrato textual v0.3 e identificou o MVP como v0.3.1 candidato. Essa conferência do diff não substitui o reteste pessoal de Guilherme nem atualiza as capturas v0.3 existentes. A fórmula e o limite de empate técnico coincidem com `01_modelagem_lais/dicionario_dados.md`. A prova diagramada v0.5 de Larissa foi comparada tecnicamente ao Markdown: mantém as fórmulas, o C01, a condição de 1,5 ano, a inversão com um ano, os critérios qualitativos e o aviso educativo. A aceitação editorial pessoal de Letícia ainda não foi registrada. Nenhum arquivo de outro domínio foi alterado nesta branch.

## Dependências e divergências

| Chave | Versão esperada | Situação encontrada | Responsável pela próxima evidência | Limite |
| --- | --- | --- | --- | --- |
| `painel_url` | URL Looker F3 anônima, somente leitura, com oito casos | [Painel F3](https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc) aberto sem autenticação; oito IDs e captura/PDF publicados. Laís registrou em [sua tarefa F3](https://app.notion.com/p/3fbe84185835817d9d54df0a0b4aa3e9) a URL da planilha privada conectada e o [CSV importado exato](https://drive.google.com/file/d/1ZcCWIKq_ugrtUOrklhXb5GFy4GWUNHHw/view), de 3.022 bytes e SHA-256 `BB247D36AAFCF23FEDB765E86EFF27269732B852C31E7504459F45EAC8B41E7B`; 16 registros/8 IDs conferidos tecnicamente. A titularidade e as permissões completas da planilha foram declaradas pela autora, mas a ACL não é exposta pelo conector. | Caio confirma o recebimento; Laís mantém a fonte privada; URL/QR definitivos exigem liberação formal | Antes de congelar URL/QR |
| `captura_mvp` | Captura da versão do MVP efetivamente liberada | Guilherme publicou MVP v0.3.1 no commit [`389f866`](https://github.com/caioarthur08-pre51/conserta-ou-troca/commit/389f866f81064049f9d24d78cd395c908c2806de), após alterar os rótulos qualitativos. As três capturas e o PDF atualmente no Drive são v0.3, anteriores a esse commit. A tarefa de Guilherme ainda não registra um novo marco pessoal `CAPTURA MVP LIBERADA` para v0.3.1. | Guilherme retesta, substitui as capturas no mesmo ID se necessário e registra versão/commit e destinatários; Letícia confere antes de atualizar a descrição | Antes do pacote textual final F3 |
| `guia_visual` | Conteúdo v0.8 fiel em PDF A4 | Prova v0.5 conferida tecnicamente contra o texto; falta aceitação editorial pessoal da versão final | Letícia confere texto e registra `FIDELIDADE CONFERIDA` | Antes de liberar guia final |
| `ensaio_humano` | Execução cronometrada com navegação e transição | Não realizado; a F2 mediu somente fala TTS | Equipe na finalização | Fase 5 |

O relatório descreve somente validações documentadas. Não há resultados de estudantes, métricas de impacto ou autorização de QR definitivo.
