# Validação local do simulador

Data: 10/11/2026

Estado: **publicado e operacional**

## Resultados obtidos

- dez testes automatizados do núcleo aprovados;
- fórmulas verificadas com conversão de meses para anos;
- empate verificado para diferença estritamente inferior a R$ 1,00 por ano;
- entradas negativas, vidas iguais a zero, meses fracionários e custos líquidos negativos rejeitados;
- fluxo completo conferido em navegador: preenchimento, cálculo, critérios qualitativos e relatório PDF;
- decisão final e justificativa removidas da interface e do fluxo de download;
- PDF de duas páginas baixado pelo navegador, reaberto e validado com os valores esperados;
- gráficos vetoriais de custo anual e custo líquido conferidos visualmente em PNG;
- acentuação, metadados, extração de texto, dimensões A4 e contagem de páginas verificadas;
- layout conferido em viewport de 390 por 844 pixels;
- service worker, manifesto e todos os arquivos locais solicitados com resposta HTTP 200;
- estratégia online-first verificada no código para atualizar arquivos quando houver rede e usar o cache na contingência;
- QR decodificado no PNG original, no PDF do guia renderizado e no cartão renderizado;
- destino decodificado nos três testes: `https://caioarthur08-pre51.github.io/conserta-ou-troca/simulador/`;
- guia A4 e cartão A5 inspecionados visualmente, sem cortes, sobreposições ou glifos ausentes.
- GitHub Pages ativado pela branch `main` e primeiro deploy concluído com sucesso;
- endereço público aberto e validado após a implantação;
- cálculo completo repetido na versão pública com os nove campos e os três critérios qualitativos.
- faixas mínimas e máximas dinâmicas verificadas para reparo e troca;
- combinação negativa digitada em campo inferior redirecionou o foco ao primeiro campo relacionado;
- botão de cálculo permaneceu bloqueado enquanto a combinação estava incompatível;
- após a correção pela faixa indicada, o cálculo foi liberado e não produziu custo líquido negativo.

## Privacidade verificada

- nenhum nome, e-mail, turma ou identificador é solicitado;
- nenhum `localStorage`, `sessionStorage`, cookie, analytics, API ou banco de dados é usado;
- a política de conteúdo da página bloqueia scripts e conexões externas;
- o PDF é criado na memória do navegador e baixado localmente;
- o gerador não usa biblioteca externa, API, servidor ou transmissão de dados.

## Conferências de campo restantes

- conferir o QR impresso em pelo menos dois celulares antes da atividade;
- repetir a abertura na rede que será usada na escola;
- opcionalmente ampliar a matriz de navegadores com Edge e Firefox.
