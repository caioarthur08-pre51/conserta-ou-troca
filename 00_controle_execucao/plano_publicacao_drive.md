# Plano de publicação no Google Drive

Data da verificação: 08/11/2026

As cinco pastas originais `02_entrega_final` estavam vazias na leitura imediatamente anterior à publicação. Os artefatos são primeiro produzidos e validados em `.build/final_f5`, copiados para `03_saidas_autonomas` do staging e só então publicados nas pastas finais/contingência. Uma nova versão não será enviada com o mesmo formato e finalidade sem substituir formalmente a anterior.

| Cargo | Staging — saídas | Entrega final | Contingência | Evidências restritas |
|---|---|---|---|---|
| Caio | `1SyYfX8CHKpwRIR7YcluVKH1gqaem5I6U` | `1FXNCDvh293lew5pegMmtOKYoxdB-9xfL` | `18KG7sjz_au7gInMWfYyX0X1KF29PFJqX` | `1uRgiUCRv0eUQrMjom341b7opFcv0xUaP` |
| Laís | `1OW6Ny32XsdO_R2Fdy-lfIIFxKU_uInyk` | `1A6pxNuSx6MonH1fIb7z2eH7FfCkHlbsa` | `1F1fjTnz1sn1koOR_Qe15YkvLDThPXGSS` | `14iJXSujVsGPLpbDZFIg2DG4znTEu7BAI` |
| Guilherme | `1B6dSyRV2hextBAYkgCbhIH7bzL5GNRdz` | `14Wk9kLckyao9dPZyS0yirr85HqCK8z7k` | `1ZPODnW_HW-cUptUyVIJGUbQbHBJ0kTIR` | `1qtyun98hv503VniFqPfJbZ0AsTNmlWu2` |
| Letícia | `1CUTu9qF_c7N-jzSmkWbRQ0op_I64ju-f` | `1LmOHhYMxtqzyfmTRaSznBlrBmq-zHe95` | `1pQLoDyE_9FLTCorV_v-eoaWECvfM8jmL` | `17sQSabRBCw5-RoH31DDTOI0WuvxvD4vR` |
| Larissa | `1vHdAca2rtsR3rhwDHJxDDq_Wbx2S2q0-` | `1sg9a4gRLaOs84HNJN4rB5m1oIlooEYG6` | `1ctNp4BacgyCE4lm4DoqLCENI3Jqv6Q46` | `1xs56TmDSP6YdAaDzlFbN78Z8KYWOixk2` |

## Regras de publicação

1. Editáveis canônicos também permanecem nas áreas `01_editaveis` e no staging de origem; a entrega final recebe a versão congelada solicitada pelo planejamento.
2. PDFs operacionais e o ZIP do MVP são duplicados em contingência somente quando o planejamento exige essa redundância.
3. Evidências restritas não recebem material público nem fotografias inexistentes.
4. Cada upload é relido pela listagem da pasta e registrado com ID, link, tamanho e SHA-256 no manifesto.
5. Se um upload falhar, não se cria uma segunda cópia às cegas; a pasta é relida antes de qualquer nova tentativa.

## Resultado da publicação — 09/11/2026

| Cargo | Staging | Entrega final | Contingência | Títulos duplicados |
|---|---:|---:|---:|---:|
| Caio | 5 | 5 | 5 | 0 |
| Laís | 10 | 10 | 8, incluindo históricos de contingência | 0 |
| Guilherme | 5 | 5 | 4 | 0 |
| Letícia | 13 | 13 | 3 | 0 |
| Larissa | 12 | 12 | 7 | 0 |

Os títulos de todas as quinze pastas foram relidos após a publicação. Não houve repetição de nome dentro de nenhuma pasta. O pacote local final possui 45 arquivos: 43 artefatos distribuíveis e os dois manifestos centrais (CSV e JSON); não contém arquivo `sanitized`, intermediário técnico, pasta extraída do MVP nem relatório de inspeção.

O arquivo extraído do MVP e o PPTX intermediário do guia foram preservados somente em `.build/qa_intermediarios`, fora do pacote distribuível. Eles permanecem recuperáveis para auditoria e não concorrem com os formatos finais.
