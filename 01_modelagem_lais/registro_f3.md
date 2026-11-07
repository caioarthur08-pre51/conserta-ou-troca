# Registro técnico da fonte e do painel F3

Domínio funcional: Laís Eulálio. Conferência e correção de duplicatas por Codex em 06/11/2026. As declarações de Laís nos comentários da tarefa F3 são identificadas abaixo como tais; a conferência técnica não substitui a auto revisão da autora.

## Entrega publicada por Laís

- Origem do contrato: `modelo_tco_canonico.ods`, `ExportCSV!A1:R9`, e `casos.csv`, commit F2 `0c02bc5`.
- Laís declarou no [comentário `DADOS F3 LIBERADOS`](https://app.notion.com/p/3fbe84185835817d9d54df0a0b4aa3e9) o CSV importado `fonte_looker_v0.3.csv`, LF, 3.022 bytes, SHA-256 `BB247D36AAFCF23FEDB765E86EFF27269732B852C31E7504459F45EAC8B41E7B`, com 15 campos, 16 linhas e oito IDs. O arquivo exato ainda não está versionado nem foi disponibilizado para conferência independente do hash.
- O corte dos casos F2 é 03/11/2026; `data_corte` da fonte F3 é 04/11/2026. Laís declarou que copiou a fonte para o Sheets em 06/11/2026 às 00h40.
- [Looker Studio v0.3](https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc), [PDF candidato](https://drive.google.com/file/d/1XRbvmfUWGMsOXkfj5XN-9XKPNGHy0uvo/view) e [captura](https://drive.google.com/file/d/1izrhIeo7G_IE-qeoIy45M5bQ15Q1JCak/view). PDF e captura existem na pasta `03_contingencia/Lais` e seus metadados apontam `laislne1@gmail.com` como proprietário. A publicação do PDF nessa pasta corresponde à ação que Laís havia reservado para sua conta.
- O painel foi aberto em sessão sem login Google: exibiu tabela de 16 linhas/8 IDs e critérios qualitativos para os oito casos, sem controle de edição. O filtro `caso_id=C03` reduziu a tabela a duas linhas: Trocar R$ 282,86/ano, Reparar R$ 370,00/ano; o estado foi restaurado. Laís declarou também teste de atualização de dados em cópia temporária e registrou que falta teste por conta de colega.
- O PDF tem uma página e os valores C01/C03 legíveis, mas o cabeçalho `custo_anual` da tabela aparece abreviado como `custo_a...`. Laís deve ampliar essa coluna na exportação e substituir o PDF candidato sem deixar uma segunda versão F3 concorrente; a nova versão deve ter hash atualizado na tarefa.

## Conferência ainda necessária para a integração

- Laís declarou uma fonte Google Sheets privada com ela como proprietária e quatro integrantes leitores, mas não registrou a URL da planilha. A busca no Drive de Caio não localizou essa fonte; não foi possível conferir os metadados nem o CSV de 3.022 bytes. Solicitar URL canônica da planilha, identificação da conta proprietária, acesso de leitura para Caio e o arquivo CSV exato ou hash conferível.
- Na pasta `01_editaveis/Lais`, `laeulalio@gmail.com` aparece como leitor e `laislne1@gmail.com` como editor. O perfil Notion de `laeulalio@gmail.com` já tem **acesso completo** à tarefa F3. Confirmar qual conta pertence à fonte canônica antes de mudar permissões da pasta; se Laís precisar criar com a primeira conta, conceder edição pela interface do Drive. O conector não permite alterar permissão de pasta.
- A planilha auxiliar de 2.954 bytes criada por Codex não correspondia ao hash declarado por Laís nem era a fonte do relatório. Foi removida do Drive e do ramo de apoio para manter uma única fonte corrente. A versão histórica F2 (ODS/XLSX) continua identificada como base, não como concorrente F3.
- O marco `CAPTURA LOOKER LIBERADA` consta nos comentários de Laís, mas não equivale à aceitação final da integração por Caio. Concluir o teste por conta de colega e a conferência de propriedade/CSV antes de `F3 ENTRADAS INTEGRADAS`. Não emitir `URL LIBERADA PARA QR` nem QR definitivo nesta fase.
