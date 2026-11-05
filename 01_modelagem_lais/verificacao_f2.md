# Liberação técnica da modelagem — Fase 2

**Domínio responsável:** Laís Eulálio, Modelagem Financeira e Inteligência de Dados. **Versão da base:** 0.2. **Data de corte dos dados:** 03/11/2026. **Verificação e materialização assistidas:** 05/11/2026, sob delegação para encerrar as pendências da F2. Esta verificação não representa assinatura pessoal da responsável.

## Fontes e arquivos

| Artefato | Local e função | SHA-256 |
| --- | --- | --- |
| ODS canônico | [Drive: `modelo_tco_canonico.ods`](https://drive.google.com/file/d/101mZ5MzYDEVMOJcXUyKvWho0iYZdc_Sz/view), fonte editável | `FA8D3F9AC3A550DDBAE2B8F7115E0D0BE9F9FB2DE92C0F478ACA02BB1A6CCA23` |
| Fotografia ODS v0.2 | [Drive: `modelo_tco_v0.2_2026-11-03.ods`](https://drive.google.com/file/d/1WIX8osTkWE33SXvY4oy_rjDCG6yZSOQT/view), cópia congelada | `FA8D3F9AC3A550DDBAE2B8F7115E0D0BE9F9FB2DE92C0F478ACA02BB1A6CCA23` |
| Exportação XLSX v0.2 | [Drive: `modelo_tco_v0.2_2026-11-03.xlsx`](https://docs.google.com/spreadsheets/d/1TYaAvlLYyekgYI77GJyGMNQP3TxyZXqY/edit), mesma base | `FB21D963E8EBCF26A99EDCC36291C7F4BE1EB3A7734033ABD9DE6BD47AEE7E33` |
| CSV A:R | [`casos.csv`](casos.csv), fonte sintética no Git; conteúdo preservado da F1 | `AF130CF8B43D0F3C6634311F863F0AE78C526F492A8E6AD06AF34B9670DABC46` |

Os três arquivos do Drive foram lidos de volta com tipo, tamanho e pasta confirmados. O CSV do Git e `ExportCSV!A1:R9` possuem os mesmos 18 campos e oito registros, C01–C08, sem alteração de valores ou das categorias O:Q da base integrada da F1. O XLSX e o ODS usam a mesma base; o ODS canônico e a fotografia têm bytes iguais. Nenhum binário foi adicionado ao Git público.

## Comprovação do contrato

- **Abas:** `Leia-me`, `Resumo`, `Casos`, `Calculos`, `DataStudio`, `ExportCSV` e `Fontes`.
- **Cálculo:** `C01` = R$ 253,33/ano ao reparar e R$ 315,00/ano ao trocar, resultado `Reparar`; `C03` = R$ 370,00/ano e R$ 282,86/ano, resultado `Trocar`. As fórmulas mantêm precisão integral e formatam duas casas somente na exibição.
- **Looker futuro:** `DataStudio` fornece 16 linhas, duas por caso, com 15 colunas na ordem do dicionário. A coluna H é `vida_util_anos` e a K é `resultado`, com classificação derivada da conta.
- **Guardas:** vazio, texto em campo numérico, valor monetário negativo, vida zero, custo líquido negativo, categoria fora do domínio e garantia fracionária retornam `n.a.` nas saídas, sem vencedor. Diferença absoluta de R$ 0,005/ano retorna `Empate técnico`.
- **Reprodução:** o XLSX foi importado e recalculado, o ODS foi convertido de volta a XLSX e os mesmos testes passaram. O conversor F2 do comparador gerou oito objetos de 18 campos do CSV sem divergência.
- **Teste de referência no Git:** 14 testes de `python -m unittest discover -v` passaram em `01_modelagem_lais`.

**Marco para integração:** `DADOS F2 LIBERADOS`. Guilherme, Letícia e Caio consomem `casos.csv` e o dicionário nesta versão; o ODS no Drive é a fonte de edição. Google Sheets privado e painel Looker Studio anônimo pertencem à F3/F4, portanto não são declarados prontos nesta liberação.
