# Comparador local — MVP candidato da Fase 3

**Domínio responsável:** Guilherme Almeida. **Versão:** v0.3.1 candidata (critérios não financeiros com a redação exata do contrato textual v0.3). **Execução técnica assistida:** Codex, a pedido de Caio; a auto revisão e a aprovação do cargo não são presumidas.

## Abrir e usar

Em um computador, abra `index.html` por duplo clique. O endereço começa por `file://`; o aplicativo não requer servidor, instalação ou internet. Escolha C01–C08, revise o custo do reparo e a vida adicional, depois pressione **Calcular**. A tabela e o gráfico mostram os mesmos custos anuais em R$/ano. A sensibilidade compara a classificação com a do caso original. **Restaurar caso** recupera as entradas; **Imprimir/salvar PDF** fica disponível após um cálculo válido.

O aviso no topo deixa claro que os dados são sintéticos e a comparação é educativa, sem recomendação de compra. Garantias, risco, necessidade e impacto ambiental aparecem fora da fórmula financeira. O aplicativo não coleta nem envia dados pessoais.

## Fonte e reconstrução

A origem é `01_modelagem_lais/casos.csv` de 18 campos, C01–C08, no main F2 `0c02bc5`. `app/dados/casos.csv` é sua cópia fiel. No checkout Windows, ambos possuem SHA-256 `AF130CF8B43D0F3C6634311F863F0AE78C526F492A8E6AD06AF34B9670DABC46` (fins de linha CRLF). O blob LF normalizado pelo Git possui SHA-256 `694792AD4E772F102787C5E45942DAE3B332D789F60E9CD142101C4543EE7DBB`; indique o formato ao conferir hashes.

Para reconstruir `js/dados.js` a partir da mesma fonte, execute na raiz do repositório:

```powershell
node 02_produto_guilherme/scripts/gerar_dados.mjs 01_modelagem_lais/casos.csv 02_produto_guilherme/app/js/dados.js
```

O conversor valida cabeçalho A:R, oito IDs únicos, números, categorias e custos líquidos. Ele não altera a fonte. Os scripts do app são clássicos e locais: não usam `fetch()`, módulos, CDN nem bibliotecas externas.

## Conferência F3

Na raiz do repositório:

```powershell
node 02_produto_guilherme/testes/calculos.test.mjs
```

O teste confere os oito resultados, dez entradas inválidas, empate técnico e mudança de classificação. Na tela, C01 deve mostrar Reparar (R$ 253,33 × R$ 315,00 por ano), C03 deve mostrar Trocar (R$ 370,00 × R$ 282,86), e C01 com custo do reparo de R$ 512,50 deve mostrar Empate técnico. Entradas vazias, negativas, vida zero e custo líquido negativo não geram um resultado plausível.

Esta é a versão candidata F3. Os testes completos de três navegadores, duas larguras e o congelamento do pacote pertencem à Fase 4; o ZIP operacional pertence à Fase 5. Consulte [`../especificacao_mvp.md`](../especificacao_mvp.md) para contrato e limites.
