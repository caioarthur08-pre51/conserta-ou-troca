# Registro técnico F4-F5 — dados e BI

**Domínio funcional:** Modelagem Financeira e Inteligência de Dados — Laís Eulálio  
**Execução técnica de fechamento:** Codex sob coordenação de Caio Rocha  
**Pacote:** v1.0.0, congelamento técnico em 09/11/2026

## Fonte única e versões

- O CSV canônico continua sendo `casos.csv`: exatamente 18 campos, 8 registros e 8 IDs C01–C08.
- A planilha final deriva da base v0.3 com data de corte 04/11/2026 e contém as sete abas `Leia-me`, `Resumo`, `Casos`, `Calculos`, `DataStudio`, `ExportCSV` e `Fontes`.
- A aba `DataStudio` contém 15 colunas e 16 registros, dois cenários por caso.
- O Google Sheets privado permanece como fonte online restrita; a cópia autônoma de contingência não substitui a fonte conectada ao relatório.
- O destino público final é https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc.

## Gates técnicos executados

- 14 testes do modelo e contrato foram aprovados.
- A equivalência entre Python e o MVP foi aprovada para 8/8 casos com tolerância `1E-9`.
- C01 foi conferido em 253,33 × 315,00 R$/ano e C03 em 370,00 × 282,86 R$/ano.
- O Looker abriu sem login, mostrou 16 registros/8 IDs, filtrou C03 corretamente e foi restaurado para 16/16.
- A planilha final foi recalculada, reaberta, inspecionada em suas sete abas e não apresentou erros de fórmula no scan final.

## Limites e gates externos

- O PDF do painel conserva a versão de dados v0.3 dentro do pacote de entrega v1.0.0; isso não representa divergência de dados.
- A norma de propriedade/edição do Sheets continua sendo privada; a entrega pública é somente o relatório Viewer.
- Dois celulares, prova impressa e distâncias de leitura do QR pertencem ao gate físico de Caio e não foram simulados neste registro.
