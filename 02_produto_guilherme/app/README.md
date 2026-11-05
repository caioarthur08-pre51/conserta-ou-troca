# Comparador local — esqueleto da Fase 2

**Domínio responsável:** Guilherme Almeida. **Estado:** esqueleto executável F2, conferido em 05/11/2026 após `F2 ENTRADAS INTEGRADAS`. A conferência técnica assistida não equivale à assinatura pessoal do responsável.

Abra `index.html` por duplo clique em Chrome, Edge ou Firefox em um computador. O endereço começa por `file://`; não é preciso servidor nem internet. O seletor deve mostrar os oito casos C01–C08. Nesta fase, os botões de cálculo, restauração e impressão permanecem desativados e os resultados ficam ocultos. O cálculo e a sensibilidade completos são da Fase 3.

Para reconstruir `js/dados.js` a partir do CSV canônico, na raiz do repositório execute:

```powershell
node 02_produto_guilherme/scripts/gerar_dados.mjs 01_modelagem_lais/casos.csv 02_produto_guilherme/app/js/dados.js
```

O conversor exige o cabeçalho A:R e oito IDs únicos, rejeitando linhas incompletas, texto em campo numérico, vida vazia e categorias fora do contrato. `app/dados/casos.csv` é uma cópia exata do CSV consumido. O teste da F2 confirmou que a regeneração produziu o mesmo `dados.js` do aplicativo, com normalização de fim de linha.

Os scripts são clássicos e locais, sem `fetch`, módulos ou bibliotecas externas. Consulte [`../especificacao_mvp.md`](../especificacao_mvp.md) para contrato, validações e evidência do teste de abertura por `file://`.
