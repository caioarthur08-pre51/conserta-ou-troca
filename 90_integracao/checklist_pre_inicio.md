# Checklist de pré-início

Este checklist não cria uma sexta fase. Ele precisa estar concluído antes de qualquer entrega da Fase 1.

## Caio

- [ ] Confirmar que é o único proprietário ou membro do workspace Notion.
- [ ] Na página principal, abrir `Compartilhar`, informar o e-mail de cada colega, selecionar `Pode visualizar`, confirmar que será convidado e escolher `Ignorar por enquanto` se o Notion sugerir transformá-lo em membro.
- [ ] Confirmar em `Configurações → Pessoas` que somente Caio aparece como membro e que os quatro colegas aparecem como convidados.
- [ ] Compartilhar páginas de instrução somente para visualização; não conceder `Pode editar conteúdo` no banco inteiro.
- [ ] Abrir individualmente as cinco tarefas de cada pessoa e compartilhar somente essas páginas com o respectivo convidado como `Pode editar`.
- [ ] Verificar se nenhuma permissão herdada mais ampla concede edição nas tarefas dos colegas.
- [ ] Criar no banco as opções `Bloqueada` e a propriedade `Motivo do bloqueio`.
- [ ] Criar o repositório público sem README adicional.
- [ ] Copiar a URL real em `GitHub → Code → Local → HTTPS`; substituir todo `SEU_USUARIO` antes de enviar um comando.
- [ ] Convidar os quatro usuários em `Settings > Collaborators > Add people`.
- [ ] Confirmar que os quatro aceitaram o convite.
- [ ] Criar a pasta principal do Drive e as áreas `01_editaveis`, `02_entrega_final`, `03_contingencia` e `04_evidencias_restritas`.
- [ ] Dentro das três primeiras áreas, criar subpastas `Caio`, `Lais`, `Guilherme`, `Leticia` e `Larissa`.
- [ ] Aplicar e testar a matriz de permissões abaixo, sem usar link público de edição.

## Matriz gratuita de permissões

| Recurso | Caio | Autor do cargo | Outros integrantes | Público |
|---|---|---|---|---|
| Página principal e instruções do Notion | proprietário/membro | convidado: visualiza | convidado: visualiza | sem acesso |
| Cinco tarefas do próprio integrante | acesso completo | convidado: edita | somente visualiza | sem acesso |
| Tarefas de outro integrante | acesso completo | somente visualiza | somente visualiza | sem acesso |
| Banco completo de tarefas | acesso completo | não recebe `Pode editar conteúdo` | não recebe `Pode editar conteúdo` | sem acesso |
| Subpasta do próprio cargo no Drive | proprietário | editor | visualizador quando necessário | sem acesso |
| Subpasta de outro cargo no Drive | proprietário | visualizador quando necessário | visualizador quando necessário | sem acesso |
| Google Sheets e fonte do Looker Studio | visualizador | Laís: proprietária/editora | visualizador | sem acesso |
| Relatório final do Looker Studio | editor quando necessário | Laís: proprietária/editora | visualizador | visualizador anônimo |
| `04_evidencias_restritas` | proprietário/editor | acesso somente se necessário | sem acesso por padrão | sem acesso |

## Todos os integrantes

- [ ] Instalar Git, Node.js LTS, VS Code, LibreOffice, Chrome, Edge e Firefox.
- [ ] Criar ou confirmar contas pessoais gratuitas no GitHub, Google e Notion.
- [ ] Ativar o endereço privado `noreply` no GitHub.
- [ ] Clonar o repositório pela URL fornecida por Caio.
- [ ] Executar `git remote -v` e confirmar que a URL contém o usuário real de Caio e não contém `SEU_USUARIO`.
- [ ] Configurar `user.name` e `user.email` com `--local`.
- [ ] Criar e publicar exatamente uma destas branches: `caio/governanca`, `lais/modelagem-dados`, `guilherme/produto`, `leticia/conteudo` ou `larissa/comunicacao`.
- [ ] Fazer um commit de teste somente na própria pasta.
- [ ] Executar `git fetch origin --prune` e `git merge --no-edit origin/main`.
- [ ] No Notion, alterar temporariamente um campo permitido da própria tarefa e desfazer a alteração.
- [ ] Abrir a tarefa de outro integrante e confirmar que não consegue alterar título, propriedades ou conteúdo.
- [ ] Na subpasta do próprio cargo no Drive, enviar e renomear `teste-permissao-NOME.txt`.
- [ ] Abrir a subpasta de outro cargo no Drive e confirmar que não consegue enviar, renomear nem excluir arquivos.
- [ ] Registrar `ACESSOS CONFIRMADOS` na própria tarefa com branch, hash do commit e resultado dos testes do Notion e Drive.

## Prova de conclusão

Cada pessoa registra no Notion o nome da branch, o hash do commit de teste e o marco `ACESSOS CONFIRMADOS`. Caio registra o hash de `main` após integrar os cinco testes e remove os arquivos temporários de permissão do Drive. Nenhuma senha, token, código de recuperação ou link de edição público entra no Notion ou no GitHub.

O pré-início só termina quando os cinco conseguem editar a própria tarefa, não conseguem editar a tarefa alheia, conseguem escrever somente na própria subpasta do Drive e conseguem enviar a própria branch ao GitHub.
