# Evidências técnicas do MVP F3 v0.3.1

**Domínio funcional:** Guilherme Almeida. **Correção textual do aplicativo:** commit
[`389f866`](https://github.com/caioarthur08-pre51/conserta-ou-troca/commit/389f866f81064049f9d24d78cd395c908c2806de),
publicado pelo login GitHub `guialmeidacr`. **Captura e atualização dos arquivos de
contingência:** Codex (apoio técnico), em 08/11/2026. Este registro não atribui a
Guilherme a execução dos testes de apoio nem substitui sua auto revisão.

## Fonte e testes

- A alteração de v0.3 para v0.3.1 muda apenas a apresentação dos cinco critérios
  não financeiros, conforme `03_conteudo_leticia/textos_interface.md`. Os dados,
  fórmulas e testes de cálculo não mudaram.
- `01_modelagem_lais/casos.csv` e `02_produto_guilherme/app/js/dados.js` mantêm os
  mesmos oito casos e 18 campos. A fonte longa v0.3 de Laís tem 15 campos e 16
  registros, dois cenários por ID; os valores são coerentes com o CSV canônico.
- `node 02_produto_guilherme/testes/calculos.test.mjs` aprovou oito casos, dez
  limites e a sensibilidade financeira no checkout de `389f866`.
- O aplicativo foi aberto por `file://` no Chrome headless. C01 resultou em Reparar
  (R$ 253,33 e R$ 315,00/ano), C03 em Trocar (R$ 370,00 e R$ 282,86/ano) e
  C01 com reparo de R$ 512,50 em Empate técnico (R$ 315,00/ano para ambos).
  A tabela, o texto e o gráfico corresponderam aos mesmos resultados. Os cinco
  critérios foram renderizados com a redação do contrato textual. A impressão
  gerou PDF A4 de uma página, conferido visualmente, sem cortes.
- Para regenerar as evidências em Windows com Chrome instalado, execute
  `node 02_produto_guilherme/scripts/capturar_evidencias_f3.mjs` na raiz do
  repositório. Os resultados locais ficam em `.build/evidencias_f3_v0.3.1/` e
  não são versionados. O PDF incorpora data de criação, portanto seu hash pode
  mudar em uma nova impressão.

## Arquivos atuais no Drive

Os quatro arquivos anteriores foram **substituídos no mesmo ID**, sem criar cópias
concorrentes. O download de cada ID após a substituição reproduziu os bytes e
hashes abaixo. Guilherme permanece com permissão de edição na pasta; a
propriedade funcional e a decisão de liberar o material pertencem ao cargo.

| Evidência | Link permanente | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| C01 para slide, 900 × 450 | [PNG](https://drive.google.com/file/d/1mhNMOIID0g1JeU0fkIeriYxcxDXd5DIA/view) | 26.886 | `3604E88A076F972B96C20AECCD1ED5F80361A643AD09CD89639E91F16448F5D3` |
| C03, 1120 × 1019 | [PNG](https://drive.google.com/file/d/1GRL4iOMOnXWVEFgN7hJ02TsYATd5wf_5/view) | 46.497 | `4645E38B058E57C466BBB5CCD07610AAF42F6F4A50A04C0CD08E9CCE94F6DDF4` |
| Empate, 1120 × 1019 | [PNG](https://drive.google.com/file/d/1WGu1k7C2f4d6dEOYYOCfAQq5hLhTn7c4/view) | 47.690 | `7DE811E9D4964578A9606314D563AFCFD4DE7FFA0E66B5E508172828341A65D5` |
| C01 impresso, A4, uma página | [PDF](https://drive.google.com/file/d/1EZGoJL0vCghotrWCj3EJ37-Jv-Wn3a57/view) | 39.663 | `70214A584A3614E11D951F90F93FD6F304EED201FC36460DCCAACF43E21FE87F` |

## Passagem ainda necessária

O corpo da tarefa F3 de Guilherme ainda cita o commit `2208cbf` e arquivos v0.3.
Guilherme deve revisar pessoalmente o build v0.3.1 e as quatro evidências atuais,
registrar na própria tarefa o recebimento efetivo da fonte de Laís e liberar as
capturas com o commit `389f866` e os links acima. O comentário anterior contém
o campo não resolvido “abriu / não abriu” sobre a planilha Google; ele precisa
informar o resultado real. Só o responsável pode declarar essa auto revisão.
Testes em três navegadores e duas larguras pertencem à F4.
