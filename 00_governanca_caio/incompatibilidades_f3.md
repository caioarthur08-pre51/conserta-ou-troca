# Incompatibilidades e dependências — Fase 3

**Responsável pelo registro:** Caio Rocha. **Conferência técnica delegada:** 05/11/2026. **Base:** `origin/main` em `0c02bc5360fe2e69b6a5ab58e76f73e260f047c7`, tarefas F3 do Notion, branches remotas e pastas `01_editaveis` do Drive. Este registro não altera arquivos dos demais cargos nem certifica autoaprovação deles.

## Incompatibilidades observadas

| ID | Fato observado | Arquivos e efeito | Proprietário | Correção e prazo | Teste de correção | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| I-F3-01 | A F2 foi integrada em 05/11, mas o cronograma e as páginas de orientação ainda apresentam F3 em 04/11, F4 em 05/11 e F5 em 06/11. A sequência original não cabe literalmente após o fechamento da F2. | `90_integracao/cronograma_14_dias.csv`, `90_integracao/README.md`, páginas F3–F5 do Notion e PDF individual de Caio; risco de declarar fase ou pacote concluído sem as cinco entregas e testes. | Caio, após receber estimativas dos quatro proprietários | Registrar nova decisão e publicar datas viáveis no cronograma/Notion após receber as estimativas, antes de declarar `F3 INTEGRADA`; manter F3–F5 pendentes até os marcos reais. | Conferir cinco linhas por fase, mesmas datas em cronograma, Notion e manifesto; testar que `F3 ENTRADAS INTEGRADAS` e `F3 INTEGRADA` citam hashes reais antes da F4. | Aberta; prazo original identificado como histórico, não como conclusão comprovada |
| I-F3-02 | A seção de ensaio da F5 nos dois PDFs individuais de Caio v1.4 coloca cálculo manual em 2–5 min e MVP em 5–10 min. A página principal do projeto, o roteiro v0.3 de Letícia e o storyboard v0.3 de Larissa colocam conceitos em 2–5, fórmulas em 5–7, cálculo manual em 7–9 e MVP em 9–12. | PDFs `Planejamento_Caio_Rocha.pdf` e `Guia_Caio_Rocha.pdf`, roteiro e storyboard; risco de ensaio e material de projeção seguirem sequências diferentes. | Caio | Aplicar a [errata de tempos](errata_tempos_pdf_caio.md) nesta F3 e incorporar a correção na próxima revisão dos PDFs, **antes do ensaio da F5**. | Comparar todos os intervalos 0:00–20:00 da errata com a tabela da página principal, `roteiro_microoficina.md` e `storyboard_f2.md`; só usar a sequência corrigida no ensaio. | Mitigada nesta F3 por errata; PDFs v1.4 ainda precisam de nova versão para remover o texto antigo |
| I-F3-03 | A orientação F3 de Caio nos PDFs e no Notion pede `FIDELIDADE CONFIRMADA`, enquanto o protocolo de comunicação, as orientações F3 de Letícia e Larissa pedem `FIDELIDADE CONFERIDA` para o mesmo retorno da prova do guia. | PDFs/página F3 de Caio, `protocolo_comunicacao.md` e páginas F3 de Letícia/Larissa; risco de dois marcos serem tratados como respostas distintas. | Caio | Usar `FIDELIDADE CONFERIDA` como nome único do marco no índice e nas passagens; corrigir a página F3 de Caio e a próxima versão dos PDFs **antes de `F3 INTEGRADA`**. | Verificar que a prova do guia cita versão e hash e que a resposta de Letícia usa o mesmo nome, sem duplicata no Notion e manifesto. | Aberta para correção da página/PDF; rótulo canônico já indicado neste registro |

`I-F3-01` exige uma decisão de reprogramação, não um prazo inventado para o trabalho de outro cargo. A nova programação de cada entrega depende da confirmação do respectivo responsável. Enquanto isso, a tarefa de Caio pode avançar com índice e controle; não cabe marcar `F3 INTEGRADA` ou a F4 como concluídas.

## Entradas F3 ainda não publicadas

| Marco necessário | Proprietário da fonte | Evidência atual | Consequência para Caio | Ação verificável |
| --- | --- | --- | --- | --- |
| `DADOS F3 LIBERADOS` e `CAPTURA LOOKER LIBERADA` | Laís | CSV/ODS/XLSX F2 disponíveis; nenhuma URL, fonte privada ou PDF/captura candidata F3 localizada | Não pode validar relatório anônimo nem integrar a fonte visual da F3 | Receber CSV usado, hash, versão, 16 linhas/8 IDs, URL de visualização candidata, teste anônimo e PDF candidato |
| `CAPTURA MVP LIBERADA` | Guilherme | `app/` F2 é esqueleto; cálculo/sensibilidade/captura estável F3 não localizados | Não pode conferir o MVP completo nem fornecer captura versionada à Larissa | Receber commit do `app/`, oito casos calculados, sensibilidade testada, modo `file://` e captura sem dados pessoais |
| `CONTEÚDO DO GUIA LIBERADO` e relatório candidato | Letícia | Markdown F2 e ODT de trabalho v0.1 disponíveis; relatório completo/DOCX e liberação textual F3 não localizados | Não pode conferir relatório completo nem integrar texto final do guia | Receber versão do Markdown liberado, ODT/DOCX candidato, fontes e declaração de ausência de resultados de estudantes |
| `F3 VISUAL CANDIDATO`, `F3 PROVA DO GUIA` e retorno `FIDELIDADE CONFERIDA` | Larissa; fidelidade textual por Letícia | Wireframes ODP/PPTX/PDF F2 disponíveis; versão visual completa F3 e prova de fidelidade não localizadas | Não pode fazer a integração final das cinco branches | Após `F3 ENTRADAS INTEGRADAS`, receber ODP/PPTX/PDF candidatos, guia único, versões consumidas, teste de abertura/acessibilidade e retorno de Letícia |

As quatro tarefas dos outros cargos e a de Caio constavam como `Pendente` na consulta inicial ao quadro F3 em 05/11. A produção deste índice coloca a tarefa de Caio em andamento; as quatro entregas alheias ainda aguardam publicação. Também não havia commits F3 nas branches remotas dos autores. A evidência negativa refere-se somente às fontes verificadas; não afirma que ninguém esteja trabalhando localmente.

## Controles que permanecem válidos

- A F2 foi integrada e os artefatos publicados nessa fase continuam como linha de base. Não foi identificada divergência entre o CSV canônico e `dados.js` na conferência F2.
- Escola, horário, grupos e infraestrutura seguem pendência logística externa. A falta desses dados não impede produzir índice e candidatos F3; não autoriza registrar ação presencial executada.
- Não mover candidatos para `02_entrega_final`, não publicar QR definitivo e não criar tag antes das liberações e testes das fases próprias.
- Toda nova versão recebida deve ser aberta, identificada por cargo/versão/commit ou SHA-256 e vinculada aos consumidores no [índice do pacote](../90_integracao/indice_pacote.md) e no manifesto.
