# Fontes e evidências da linha de base

Data da leitura: 08/11/2026

## Fontes de orientação

- [Página principal do projeto no Notion](https://app.notion.com/p/Conserta-ou-Troca-O-Custo-Total-do-Dispositivo-3c9e84185835809c8673f78325c4b142?source=copy_link)
- [Relatório de 07/11](https://app.notion.com/p/RELAT-RIO-07-11-411e8418583580928193c3d70e0a80a2?source=copy_link)
- [Planejamento individual de Caio — PDF](https://drive.google.com/file/d/1Nm4jd7xocLwCUSjauwiPU20JZ0Nvj4lY/view)
- PDFs individuais de Laís, Guilherme, Letícia e Larissa: links ainda não identificados com segurança; solicitação registrada em `perguntas_abertas.md`.

## Fontes operacionais

- [Pasta de entrega final no Drive](https://drive.google.com/drive/folders/1-qAhQbG4ueH9l4uN4Be8GXBQACWe1VlH)
- [Relatório Looker candidato atual](https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc)
- Repositório integrado local: branch `codex/f3-entradas-20261108`, commit `3ce43d6`.
- Área autônoma: branch `codex/execucao-f3-f5-autonoma-20261108`, derivada de `3ce43d6`.

## Evidências técnicas verificadas

- Modelagem de Laís: 14/14 testes aprovados.
- MVP de Guilherme v0.3.1: oito casos, dez limites e sensibilidade aprovados.
- O CSV da modelagem e o CSV consumido pelo aplicativo têm o mesmo hash.
- `git diff --check` aprovado na base integrada.
- A integração por merge-tree da produção atual de Larissa não apresenta conflito.
- O Drive possui pastas separadas por cargo e função, com permissões de escrita por responsável.
- Exceção de acesso: a pasta restrita de Laís permite escrita para `laislne1@gmail.com`, mas não para `laeulalio@gmail.com`.

## Estado das plataformas

- Notion: Laís F3 marcada como concluída; Guilherme e Letícia F3 em andamento; Larissa e Caio F3 bloqueadas; todas as tarefas F4/F5 pendentes.
- Git: `origin/main` ainda na fase 2; candidato integrado local não publicado; nenhuma tag final.
- Drive: todas as pastas `02_entrega_final` vazias; não existem pacotes F4/F5 congelados.

## Limites da auditoria

- A análise técnica não equivale a auto-revisão pessoal do integrante.
- Testes físicos em aparelhos, impressão, projetor e ensaio humano precisam de evidência real ou de registro explícito como pendência.
- Não foi encontrada fonte legal completa da NBR 6023:2025; a página principal prevê uso de guia institucional público.
