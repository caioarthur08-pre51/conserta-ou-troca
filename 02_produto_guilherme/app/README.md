# Comparador local — entrega final v1.0.0

**Domínio responsável:** Guilherme Almeida. **Versão do aplicativo:** v0.3.1, congelada no pacote v1.0.0 em 09/11/2026. **Execução técnica de fechamento:** Codex sob coordenação de Caio Rocha. O registro preserva o cargo funcional e não atribui a Guilherme testes pessoais que ele não declarou.

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

## Validação F4 e pacote F5

O mesmo conteúdo foi testado por `file://` e com recursos HTTP/HTTPS bloqueados nos seguintes ambientes locais: Chrome, Edge e Firefox em 390 × 844 e 1280 × 720. O teste interativo automatizado conferiu C01, C03, empate técnico, restauração por teclado, impressão por teclado e ausência de rolagem horizontal nos dois pontos de vista. A equivalência entre o modelo Python e o JavaScript foi aprovada para 8/8 casos.

O ZIP final contém somente esta pasta `app`, sem dependências, perfis ou evidências temporárias. Para usar:

1. extraia todo o ZIP para uma pasta local;
2. abra `index.html` por duplo clique;
3. mantenha as subpastas `css`, `js` e `dados` ao lado do arquivo inicial;
4. escolha um caso e pressione **Calcular**;
5. se o navegador bloquear a impressão, use o PDF de contingência fornecido separadamente.

Os testes automatizados não substituem a experiência de um iniciante, leitor de tela humano ou computador/projetor externo. Consulte `registro_f4_f5.md` no repositório para os ambientes, evidências e hashes.
