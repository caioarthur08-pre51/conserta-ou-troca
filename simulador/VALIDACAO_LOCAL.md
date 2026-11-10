# Validação local do simulador

Data: 09/11/2026

Estado: pronto localmente, **não publicado**

## Resultados obtidos

- seis testes automatizados do núcleo aprovados;
- fórmulas verificadas com conversão de meses para anos;
- empate verificado para diferença estritamente inferior a R$ 1,00 por ano;
- entradas negativas, vidas iguais a zero, meses fracionários e custos líquidos negativos rejeitados;
- fluxo completo conferido em navegador: preenchimento, cálculo, critérios qualitativos, decisão e justificativa;
- arquivo CSV baixado e reaberto com cabeçalhos e valores esperados;
- layout conferido em viewport de 390 por 844 pixels;
- service worker, manifesto e todos os arquivos locais solicitados com resposta HTTP 200;
- estratégia online-first verificada no código para atualizar arquivos quando houver rede e usar o cache na contingência;
- QR decodificado no PNG original, no PDF do guia renderizado e no cartão renderizado;
- destino decodificado nos três testes: `https://caioarthur08-pre51.github.io/conserta-ou-troca/simulador/`;
- guia A4 e cartão A5 inspecionados visualmente, sem cortes, sobreposições ou glifos ausentes.

## Privacidade verificada

- nenhum nome, e-mail, turma ou identificador é solicitado;
- nenhum `localStorage`, `sessionStorage`, cookie, analytics, API ou banco de dados é usado;
- a política de conteúdo da página bloqueia scripts e conexões externas;
- a planilha é criada na memória do navegador e baixada localmente.

## Pendências deliberadas

- publicação no GitHub Pages depende de nova autorização de Caio;
- `push` desta branch não foi realizado;
- o QR não deve ser distribuído antes da publicação;
- após o deploy, repetir o teste em Chrome, Edge e Firefox, em dois celulares e em prova impressa.
