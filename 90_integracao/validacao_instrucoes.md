# Evidências de validação das instruções

Validação executada em 16 de outubro de 2026 antes da publicação das instruções no Notion. O objetivo foi comprovar os caminhos técnicos que serão ensinados à equipe, não declarar antecipadamente que as entregas dos integrantes estão concluídas.

## Comparador local

- Foi construído um protótipo de referência com `index.html`, `dados.js`, `calculos.js` e `app.js`.
- O arquivo abriu diretamente por `file://` no Microsoft Edge, sem servidor e sem internet.
- Os oito casos foram carregados por `globalThis.CASOS`.
- O caso C01 resultou em R$ 253,33/ano para reparar e R$ 315,00/ano para trocar.
- Um segundo caso confirmou a situação inversa, em que trocar possui menor custo anual.
- Não houve erro no console durante o teste automatizado do navegador.
- A arquitetura não usa `fetch()`, módulos JavaScript, CDN ou API externa, evitando bloqueios comuns de origem em arquivos locais.
- O conversor `scripts/gerar_dados.mjs` foi executado sobre `casos.csv`: produziu oito objetos, IDs C01–C08 únicos e campos financeiros numéricos.

## Modelo financeiro e planilha

- O CSV contém oito identificadores únicos.
- A planilha abre com as abas `Resumo`, `Casos`, `Calculos`, `DataStudio` e `Fontes`.
- Os oito casos possuem cálculo; a fonte longa do Looker Studio contém dezesseis linhas, duas alternativas por caso.
- As fórmulas de referência foram recalculadas fora da planilha e conferidas com os valores esperados.
- Entradas inválidas, como vida útil igual ou inferior a zero, são tratadas como não aplicáveis em vez de produzir resultado enganoso.

## Documento acadêmico e roteiro

- O DOCX passou por teste de integridade do pacote e contém estrutura de títulos e seção de referências.
- O roteiro cobre os intervalos 0–2, 2–5, 5–10, 10–14, 14–18 e 18–20 minutos, sem lacunas ou sobreposição.
- A soma das etapas é exatamente vinte minutos; a meta operacional de ensaio permanece entre dezoito e vinte minutos.

## Apresentação e acessibilidade

- O PPTX possui oito slides e passou por teste estrutural e de elementos fora da área útil.
- Contrastes medidos sobre fundo branco: azul escuro 13,13:1; azul médio 5,41:1; verde 5,00:1; laranja 3,49:1; preto 17,74:1.
- O laranja foi limitado a formas, ícones, gráficos ou texto grande de pelo menos 24 px/18 pt. Texto comum usa azul escuro ou preto.
- Nenhuma instrução depende exclusivamente de cor.

## Git e integração

- O fluxo com `main`, remoto local e as cinco branches foi reproduzido em clones separados, como se cinco pessoas estivessem trabalhando em computadores diferentes.
- Ao fim de cada uma das cinco fases, os cinco autores publicaram suas branches; Caio executou `fetch --prune`, integrou as referências `origin/caio/governanca`, `origin/lais/modelagem-dados`, `origin/guilherme/produto`, `origin/leticia/conteudo` e `origin/larissa/comunicacao`, e publicou o novo `main`.
- Antes da fase seguinte, cada clone incorporou `origin/main`, comprovando que ninguém continuaria sobre uma versão antiga.
- Após os commits finais da Fase 5, a integração foi repetida antes da tag `v1.0.0`; as cinco referências remotas foram confirmadas como ancestrais de `main` e a tag apontou exatamente para o mesmo commit.
- Um conflito deliberado foi criado em repositório isolado; `git merge --abort` restaurou o estado limpo, validando a instrução de recuperação para iniciantes.
- A identidade foi configurada somente no repositório local com endereços `noreply` sintéticos. A regra continua sendo: cada autor altera sua própria pasta; conflitos retornam ao autor.
- A evidência reproduzível está em `.build/validacao_git_completa_20261018/resultado.json`, acompanhada do grafo de commits em `git-log.txt`.

## Estrutura do Notion

- Foram criadas 25 subpáginas: cinco fases para cada um dos cinco integrantes.
- A leitura de conferência confirmou exatamente cinco filhos em cada página de cargo, na ordem Fase 1 a Fase 5.
- Todas as 25 páginas foram relidas sem truncamento e contêm tempo estimado, teoria, procedimento prático, teste de comprovação, registro no Notion, critério de conclusão, recuperação de erros e links de apoio.
- Os nomes completos, a arquitetura `dados.js` sem `fetch()` e a regra de contraste do laranja também foram conferidos nas páginas principais.

## Limites da validação

- A conexão real com a conta Google e a publicação no Looker Studio serão realizadas por Laís na fase correspondente. O procedimento foi conferido na documentação oficial atual, mas depende do login da equipe.
- A projeção em sala, a leitura à distância e o ensaio oral exigem verificação humana nas fases 4 e 5.
- A abertura em Chrome e Firefox continua como teste obrigatório do responsável, mesmo com a referência já validada no Edge.

## Revalidação das dependências em 18/10/2026

Foi executado um ensaio cego: cada integrante recebeu somente as instruções do próprio cargo, sem conhecimento implícito das páginas dos demais. O ensaio simulou permissão insuficiente, placeholder copiado literalmente, fonte entregue no meio da mesma fase, alteração depois de uma captura, mudança de URL, confirmação tardia da escola e atraso de um cargo.

As brechas encontradas foram convertidas em controles reproduzíveis:

- `protocolo_comunicacao.md` define emissor, destinatário, artefato, versão, commit ou hash, teste, prazo, ação e impacto;
- cada consumidor confirma o recebimento na própria tarefa, preservando a regra de não editar tarefa ou arquivo de outro cargo;
- as Fases 2 a 5 possuem marcos obrigatórios que eliminam espera silenciosa e uso de versões provisórias;
- Looker Studio e QR seguem uma sequência de cinco estados antes da impressão;
- `logistica_acao.md` separa planejamento necessário de coleta proibida sobre participantes;
- o pré-início testa permissões reais no Notion, Drive e GitHub;
- `validar_atualizacoes.py --local-only` confirmou os dois arquivos novos, dezoito marcos, matriz de permissões, alerta de placeholders e ausência do nome antigo da branch de Laís nos arquivos locais.

Os PDFs e o Notion precisam ser regenerados e revalidados pelo modo completo de `validar_atualizacoes.py`; o modo completo foi deliberadamente configurado para falhar enquanto detectar a branch antiga, placeholder sem aviso ou marco ausente em qualquer guia.

## Referências técnicas consultadas

- MDN — política de mesma origem: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy
- MDN — erro CORS em URLs não HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp
- Git — `git switch`: https://git-scm.com/docs/git-switch
- Git — `git pull`: https://git-scm.com/docs/git-pull
- Google — conector Google Sheets do Looker Studio: https://docs.cloud.google.com/looker/docs/studio/connect-to-google-sheets
- Google — exportar relatório do Looker Studio em PDF: https://docs.cloud.google.com/looker/docs/studio/download-a-report-as-pdf
- W3C — contraste mínimo WCAG 2.2: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Microsoft — criação de PDFs acessíveis: https://support.microsoft.com/en-us/accessibility/office-accessibility/create-accessible-pdfs
