# Fontes e evidências da linha de base

Data da leitura: 08/11/2026

## Fontes de orientação

- [Página principal do projeto no Notion](https://app.notion.com/p/Conserta-ou-Troca-O-Custo-Total-do-Dispositivo-3c9e84185835809c8673f78325c4b142?source=copy_link)
- [Relatório de 07/11](https://app.notion.com/p/RELAT-RIO-07-11-411e8418583580928193c3d70e0a80a2?source=copy_link)
- `Planejamento_Caio_Rocha.pdf` — arquivo local de autoridade.
- `Planejamento_Guilherme_Almeida.pdf` — arquivo local de autoridade.
- `Planejamento_Lais_Eulalio.pdf` — arquivo local de autoridade.
- `Planejamento_Larissa_Costa.pdf` — arquivo local de autoridade.
- `Planejamento_Leticia_Costa.pdf` — arquivo local de autoridade.

## Fontes operacionais

- [Pasta de entrega final no Drive](https://drive.google.com/drive/folders/1-qAhQbG4ueH9l4uN4Be8GXBQACWe1VlH)
- [Relatório Looker candidato atual](https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc)
- Área autônoma local: branch `codex/execucao-f3-f5-autonoma-20261108`; base integrada das cinco produções F3 em `df55a35`.
- [Staging autônomo no Drive](https://drive.google.com/drive/folders/1geRZxcVSLdNKVifTat8c9PLHyVQ0QFGv), separado por cargo, origem preservada, contingência e saídas.

## Evidências técnicas verificadas

- Modelagem de Laís: 14/14 testes da base aprovados.
- MVP de Guilherme v0.3.1: oito casos, dez limites e sensibilidade aprovados.
- O CSV da modelagem e o CSV consumido pelo aplicativo têm o mesmo hash.
- `git diff --check` aprovado na base integrada.
- A integração por merge-tree da produção atual de Larissa não apresenta conflito.
- O Drive possui pastas separadas por cargo e função, com permissões de escrita por responsável.
- O relatório público do Looker abriu sem login em 08/11/2026, mostrou 16 registros/8 IDs e o filtro C03 retornou Trocar 282,86 e Reparar 370,00; o filtro foi restaurado para 16/16.
- A cópia autônoma da fonte Google Sheets está em https://docs.google.com/spreadsheets/d/1n1w0L9OkLMcFUooadnqGxP6pMn6V5S4z7n5I-VO5jMA/edit.

## Estado das plataformas

- Notion: decisão de execução técnica centralizada registrada; as tarefas serão atualizadas somente depois das evidências finais de cada gate.
- Git: `origin/main` ainda na fase 2; candidato integrado local não publicado; nenhuma tag final.
- Drive: as pastas `02_entrega_final` permanecem vazias até a validação dos sucessores; o staging autônomo contém as cópias de origem sem títulos duplicados.

## Limites da auditoria

- A análise técnica não equivale a auto-revisão pessoal do integrante.
- Testes físicos em aparelhos, impressão, projetor e ensaio humano precisam de evidência real ou de registro explícito como pendência.
- A equipe informou possuir acesso legal à NBR 6023:2025, mas o arquivo da norma não foi fornecido ao executor; a página principal prevê o apoio de guia institucional público e essa limitação deve permanecer registrada.
