# Validação local do simulador

Data da última auditoria: 11/11/2026

Estado: **publicado e operacional**

## Resultados obtidos

- onze testes automatizados do núcleo aprovados;
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
- 7.290 combinações determinísticas e 100.000 combinações monetárias aleatórias comparadas entre a validação preventiva e o núcleo de cálculo, sem divergência e sem resultado negativo aceito;
- valores negativos testados individualmente nos sete campos monetários, todos com borda, rótulo e orientação em vermelho, atributo `aria-invalid` e cálculo bloqueado;
- vida útil zero e meses fracionários testados nos dois campos de duração, com orientação específica em vermelho;
- valores monetários com mais de duas casas decimais rejeitados e destacados antes do cálculo;
- preenchimento em ordem inversa testado para reparo e troca, com redirecionamento, faixas mínimas/máximas e todos os campos relacionados destacados;
- limites exatos que produzem custo líquido de R$ 0,00 aceitos e calculados sem falso negativo;
- envio incompleto testado: os nove campos numéricos e os três grupos qualitativos foram destacados em vermelho com instrução de correção;
- cache do service worker atualizado para `simulador-conserta-ou-troca-v5` e arquivos alterados versionados na página para evitar interface antiga após a publicação.

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
