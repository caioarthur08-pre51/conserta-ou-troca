# Registro técnico — comunicação visual F4/F5 v1.0.0

**Domínio funcional:** Larissa Costa, comunicação visual. **Execução técnica centralizada:** Caio Rocha/Codex. **Congelamento:** 08/11/2026. **QA final:** 09/11/2026.

Este registro documenta a produção técnica realizada no domínio do cargo sem atribuir a Larissa ações, aprovações ou testes presenciais que ela não registrou pessoalmente.

## Artefatos finais

| Artefato | Formatos | Escopo |
| --- | --- | --- |
| `apresentacao_trabalho_v1.0.0_2026-11-08` | PPTX, ODP e PDF | Oito slides 16:9, editáveis, com notas do apresentador, identidade v0.5 preservada, QR e URL textual. |
| `guia_decisao_v1.0.0_2026-11-08` | ODP e PDF; PPTX intermediário técnico | Uma página A4, conteúdo editorial final do domínio de Letícia, composição visual do domínio de Larissa, QR e URL textual. |
| `assets_comunicacao_v1.0.0_2026-11-08.zip` | ZIP | QR PNG/SVG, parâmetros JSON, evidência digital e inventário de ativos/licenças. |
| `manifesto_comunicacao_v1.0.0_2026-11-08.json` | JSON | Tamanho e SHA-256 dos artefatos congelados. |

Os arquivos finais são produzidos em `.build/final_f5/04_larissa`. Não houve publicação externa nem substituição de arquivos no Drive nesta execução.

## Alterações consolidadas

- O placeholder de QR foi substituído no slide 8 e no guia pelo QR definitivo do painel público.
- A URL completa permanece impressa ao lado do QR como contingência manual.
- O slide 8 separa `17:00 a 18:00 conteúdo` de `18:00 a 20:00 interação`, preservando a duração total do roteiro.
- O slide 6 recebeu margem segura no título e colunas independentes, com vão central de 170 px, eliminando qualquer risco de colisão entre os dois cenários de sensibilidade.
- As notas dos slides 5, 7 e 8 registram fontes, versão, limites de interpretação e o estado dos testes.
- A apresentação preserva a paleta azul-marinho/azul/verde/laranja e a estrutura de oito slides da identidade v0.5.

## QA executado

1. O finalizador de apresentações verificou integridade de pacote, tamanho de página, geometria, títulos, fonte Arial e reimportação pelo Artifact Tool: zero achados e zero avisos nos dois editáveis PPTX.
2. Os oito slides e a página A4 foram renderizados e inspecionados visualmente, sem cortes, sobreposições ou placeholders remanescentes.
3. Os PDFs foram conferidos com 8 páginas em 16:9 e 1 página A4, respectivamente.
4. Os ODPs foram reabertos pelo LibreOffice 26.8.1.1 em perfil isolado e reexportados para PDF; a apresentação manteve 8 páginas e o guia manteve 1 página A4.
5. O QR foi decodificado digitalmente e corresponde exatamente a `https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc`.
6. O QR mede aproximadamente 5,95 cm no slide e 3,49 cm no guia, ambos acima do mínimo de 3 cm adotado para a prova.
7. A validação do painel anônimo e do filtro C03 já está registrada em `90_integracao/evidencias_f4/validacao_looker_anonimo_2026-11-08.md`; esta frente visual apenas referencia essa evidência e não a refaz.

## Passagens ainda presenciais

Permanecem pendentes, sem declaração de conclusão:

- leitura do QR em dois celulares diferentes;
- prova impressa a 30, 60 e 100 cm;
- conferência no projetor e no ambiente da Unidade Escolar Dom Severino;
- teste de acesso pela rede disponível no local;
- ensaio humano do roteiro e validação editorial presencial.

Até essas passagens, a validação desta frente é técnica e digital. A autoria funcional continua associada ao cargo de comunicação visual; a execução centralizada não se confunde com aceite pessoal de Larissa.
