# Roteiro da micro-oficina — Conserta ou Troca? O custo total do dispositivo

Versão: v0.8 (candidata Fase 3; consolida a v0.3 da Fase 2) · Responsável editorial: Letícia Costa · Apoio técnico à consolidação: Codex · Disciplina: BI e Finanças (Prof. Me. Tadeu Duarte) · 2026.2

Pergunta orientadora: em quais condições consertar um celular ou notebook custa menos por ano do que trocar?

Objetivo observável: ao final da micro-oficina, o estudante deverá comparar consertar e trocar um dispositivo fictício pelo custo anual, reconhecer que o resultado depende de premissas e justificar a escolha com pelo menos um dado financeiro e uma limitação.

## Regras do roteiro

- O conteúdo obrigatório termina aos **18:00**. Os dois minutos finais (18:00–20:00) absorvem interação, pergunta breve, troca de grupo e contingência. A apresentação nunca passa de **20:00**.
- O cálculo manual vem **antes** do MVP.
- Nada é registrado: sem nomes, respostas, desempenho, contagem de participantes ou observações sobre estudantes. Respostas são orais ou por gesto, e o apresentador não conta nem anota.
- O caso é fictício, com dados sintéticos. Sem marcas reais, sem recomendação comercial.
- O preço originalmente pago pelo aparelho atual é um gasto passado e fica fora das fórmulas (regra do dicionário de dados de Laís).
- A ordem dos slides segue a tabela oficial de Larissa (`guia_visual.md`, seção 5).
- Vocabulário: o objetivo oficial fala em "consertar"; os rótulos do MVP, do relatório e dos slides são **Reparar**, **Trocar** e **Empate técnico**. Na fala, diz-se "consertar (reparar)" na primeira vez e depois só "reparar".

## Fonte dos valores

Todos os números do caso C01 vêm de `01_modelagem_lais/casos.csv` (contrato v1.0) e os resultados foram conferidos com `modelo.py`.

| Dado do C01 (Orion Mini, celular fictício) | Campo | Valor |
| --- | --- | --- |
| Custo do reparo | `custo_reparo` | R$ 420 |
| Manutenção adicional | `manutencao_adicional` | R$ 80 |
| Valor residual do aparelho reparado | `residual_reparado` | R$ 120 |
| Vida adicional após o reparo | `vida_adicional_anos` | 1,5 ano |
| Preço do substituto | `preco_substituto` | R$ 1.800 |
| Custos de acessórios | `custos_acessorios` | R$ 90 |
| Venda do aparelho atual | `valor_venda_atual` | R$ 180 |
| Valor residual do substituto | `residual_substituto` | R$ 450 |
| Vida do substituto | `vida_substituto_anos` | 4 anos |
| Garantias | `garantia_reparo_meses` / `garantia_substituto_meses` | 3 e 12 meses |
| Critérios | `risco_reparo` / `necessidade_usuario` / `impacto_ambiental` | Baixo · Adiável · Reparo favorece reuso |

Resultado: reparar tem custo líquido de R$ 380,00 e custo anual de R$ 253,33; trocar tem custo líquido de R$ 1.260,00 e custo anual de R$ 315,00; a diferença anual é de −R$ 61,67, e o resultado é **Reparar**.

Sensibilidade: com `vida_adicional_anos` = 1,0 no lugar de 1,5, reparar passa a R$ 380,00 por ano e o resultado muda para **Trocar** (diferença de R$ 65,00 por ano).

Os textos entre colchetes, como [aviso_educativo] ou [rotulo_reparar], vêm de `textos_interface.md`.

## Tabela-resumo

| Intervalo | Conteúdo | Slides (Larissa) | Orçamento |
| --- | --- | --- | --- |
| 0:00–2:00 | Dilema e pergunta orientadora | 1 | 2 min |
| 2:00–5:00 | Caso fictício, conceitos e premissas | 2 | 3 min |
| 5:00–9:00 | Fórmulas (5:00–7:00, slide 3) e cálculo manual (7:00–9:00, slide 4) | 3–4 | 4 min |
| 9:00–12:00 | Comparação anual e conferência no MVP | 5 | 3 min |
| 12:00–15:00 | Sensibilidade e critérios não financeiros | 6 | 3 min |
| 15:00–18:00 | Looker Studio (15:00–17:00, slide 7); síntese, limites, QR e URL textual (17:00–18:00, slide 8) | 7–8 | 3 min |
| 18:00–20:00 | Interação, pergunta breve, transição e margem | 8 (continuação) | 2 min |

---

## 0:00–2:00 · Dilema e pergunta orientadora (slide 1)

**Objetivo:** despertar a pergunta e apresentar o que o estudante conseguirá fazer.

**Fala principal:**

> Olá, pessoal. Imagine esta cena: a tela do seu celular trincou de vez. O conserto custa uma parte do preço de um aparelho novo. O que vale mais a pena, consertar ou trocar?
> Pensem na frase "não compensa consertar, é melhor comprar outro". Ela soa óbvia, mas será que vale para todos os casos? Hoje vamos testar essa ideia com números, e não com impressão.
> Muita gente decide olhando só o preço da etiqueta. Vamos olhar de outro jeito: quanto cada opção custa por ano de uso.
> Nossa pergunta é: em quais condições consertar custa menos por ano do que trocar?
> Ao final, vocês vão conseguir comparar consertar e trocar um dispositivo fictício pelo custo anual, reconhecer que o resultado depende de premissas e justificar uma escolha com pelo menos um dado financeiro e uma limitação.
> Três combinados. O caso é fictício, com dados sintéticos e sem marcas reais. Nada do que vocês responderem será anotado ou avaliado. E o que veremos é um exercício educativo, não um conselho de compra.

**Ação do estudante:** responde por gesto, sem contagem: "só pelo preço da etiqueta, quem consertaria? quem trocaria?"

**Recurso:** slide 1.

**Frase de saída:** "Para responder com números, precisamos conhecer o caso e as suas premissas."

---

## 2:00–5:00 · Caso fictício, conceitos e premissas (slide 2)

**Objetivo:** apresentar o caso C01 e os conceitos: custo líquido, vida útil, valor residual e premissa.

**Fala principal:**

> Vamos trabalhar com o caso C01, um celular fictício chamado Orion Mini. Ele tem dois caminhos: consertar, que no MVP aparece como Reparar, ou trocar.
> Reparar: o conserto custa R$ 420, mais R$ 80 de manutenção adicional. Depois, o aparelho reparado ainda teria um valor residual de R$ 120, que é o que se espera recuperar dele no futuro. E ele deve durar mais um ano e meio. Esse tempo de uso esperado é a vida útil.
> Trocar: o aparelho substituto custa R$ 1.800, mais R$ 90 de acessórios. Vendemos o atual por R$ 180, e o substituto teria um valor residual de R$ 450. Ele deve durar 4 anos.
> O custo líquido é o que pagamos menos o que recuperamos. Por que dividir pelo tempo? Porque um aparelho que custa mais, mas dura mais, pode custar menos por ano. É o custo por ano de uso que queremos comparar, e não o valor pago de uma vez.
> Um detalhe importante: quanto a pessoa pagou pelo aparelho atual no passado fica fora da conta. É um gasto passado, que não muda com a escolha de hoje.
> Agora, uma palavra-chave: premissa. Premissa é uma suposição que adotamos para poder calcular. Aqui supomos que as vidas úteis se cumprem e que os valores de venda e residuais estão corretos. Se uma premissa mudar, o resultado pode mudar. Toda vez que mostrarmos um número, vamos dizer em quais premissas ele se apoia.

**Ação do estudante:** localiza no slide qual dado é a vida útil e qual é o valor residual (apontando ou respondendo oralmente).

**Recurso:** slide 2 com a tabela do caso C01.

**Frase de saída:** "Com esses dados, só faltam as fórmulas."

---

## 5:00–9:00 · Fórmulas e cálculo manual (slides 3–4)

**Objetivo:** calcular à mão o custo anual das duas opções, antes de qualquer computador.

### 5:00–7:00 · Fórmulas (slide 3)

**Fala principal:**

> Agora, as fórmulas. São duas, uma para cada opção.
> Reparar: o custo líquido é o custo do reparo, mais a manutenção adicional, menos o valor residual do aparelho reparado. O custo anual é esse custo líquido dividido pela vida adicional.
> Trocar: o custo líquido é o preço do substituto, mais os acessórios, menos o valor da venda do aparelho atual, menos o valor residual do substituto. O custo anual é esse custo líquido dividido pela vida do substituto.
> Para decidir, calculamos a diferença anual: custo anual de reparar menos custo anual de trocar. Primeiro, se o valor absoluto da diferença for menor que um centavo por ano, é empate técnico. Nos outros casos, diferença negativa favorece reparar; positiva favorece trocar.
> Cuidado com as unidades: dinheiro em reais, tempo em anos.

**Ação do estudante:** acompanha as fórmulas no slide e aponta, em cada uma, o que entra somando e o que entra subtraindo.

**Recurso:** slide 3 (fórmulas e significado das variáveis).

### 7:00–9:00 · Cálculo manual (slide 4)

**Fala principal:**

> À mão, calculem os dois custos anuais e a diferença. Vocês têm um minuto.
> Conferindo: reparar, 420 mais 80 menos 120 dá 380; dividido por 1,5 dá R$ 253,33 por ano. Trocar, 1.800 mais 90 menos 180 menos 450 dá 1.260; dividido por 4 dá R$ 315,00 por ano.
> Diferença: menos R$ 61,67; reparar custa menos neste caso.

**Ação do estudante:** calcula à mão as duas opções e a diferença, com papel e calculadora se necessário, e compara com a conferência guiada; há um minuto de pausa independente, além das contas acompanhadas na fala.

**Recurso:** slide 4 (passo a passo com o C01).

**Frase de saída:** "Agora vamos ver se a ferramenta chega ao mesmo número."

---

## 9:00–12:00 · Comparação anual e conferência no MVP (slide 5)

**Objetivo:** conferir o cálculo manual no MVP e ler o resultado com cautela.

**Fala principal:**

> Agora vamos conferir no MVP. Abrimos o comparador e selecionamos o caso C01. O resultado precisa bater com o que calculamos à mão.
> O MVP mostra o resultado, uma tabela com o custo líquido e o custo anual das duas opções e um gráfico de barras. Procurem os mesmos números: R$ 253,33 por ano para reparar e R$ 315,00 por ano para trocar.
> Se o número for diferente, a conferência é investigar: esquecemos de subtrair algum valor? A unidade está certa? Achar a diferença faz parte do método.
> Reparem na linguagem. O resultado diz Reparar, mas isso depende das premissas. Resultado não é ordem, e o aviso na tela lembra: é uma simulação educativa com dados sintéticos, não é recomendação comercial.
> [Opcional, 20 segundos] O MVP também ajuda quando algo dá errado. Se apagarmos o custo do reparo, ele pede para preencher: [erro_vazio]. E nenhum resultado aparece até corrigirmos.

**Ação do estudante:** compara o resultado do MVP com o seu cálculo manual e diz se bateu.

**Recurso:** slide 5 e o MVP (modo A, B ou C, conforme abaixo).

**Frase de saída:** "O resultado depende das premissas. Vamos testar o quanto."

---

## 12:00–15:00 · Sensibilidade e critérios não financeiros (slide 6)

**Objetivo:** mostrar que o resultado pode mudar com uma premissa e que o dinheiro não é o único critério.

**Fala principal:**

> Sensibilidade é testar o quanto o resultado muda quando alteramos uma premissa. No MVP, dá para editar duas coisas: o custo do reparo e a vida adicional após o reparo. Vamos mudar a vida adicional, de 1,5 ano para 1 ano.
> Antes de testar, façam uma previsão: o resultado muda?
> Resultado: com 1 ano, reparar passa a custar R$ 380,00 por ano, mais que os R$ 315,00 de trocar. O resultado muda de Reparar para Trocar. O MVP avisa quando a classificação muda em relação ao caso original. Uma conclusão que muda com uma premissa só é frágil.
> Agora, o que o número não mostra. São critérios não financeiros, e eles nunca alteram o resultado financeiro. No C01: o risco do reparo é baixo, a necessidade do usuário é adiável e o impacto ambiental, uma reflexão qualitativa, é que reparar favorece o reuso. As garantias também aparecem: 3 meses no reparo e 12 meses no aparelho novo.
> Para ter ideia do contexto: segundo o relatório da ITU e da UNITAR, o mundo gerou 62 bilhões de quilos de lixo eletrônico em 2022, e só 22,3% foi documentado como coletado e reciclado de forma adequada. Isso dá o contexto da reflexão ambiental, mas não é uma medição do nosso caso.

**Ação do estudante:** prevê oralmente se o resultado muda; depois confere no MVP.

**Recurso:** slide 6 e o MVP.

**Fonte de apoio ao facilitador:** a definição de análise de sensibilidade corresponde à afirmação A08 da `matriz_afirmacoes_fontes.csv`, verificada no documento oficial da EPA. Os números sobre lixo eletrônico correspondem às afirmações A01 e A02, verificadas no *Global E-waste Monitor 2024*.

**Frase de saída:** "Com número, premissa e critério na mesa, dá para justificar uma escolha."

---

## 15:00–18:00 · Looker Studio, síntese, limites e materiais (slides 7–8)

**Objetivo:** ler o painel, fechar o conteúdo com síntese e limites e apresentar os materiais de apoio.

### 15:00–17:00 · Looker Studio (slide 7)

**Fala principal:**

> O painel no Looker Studio mostra os oito casos fictícios. Para cada caso, ele traz o custo anual de reparar e o de trocar, lado a lado.
> Uma regra de leitura: comparamos reparar e trocar só dentro do mesmo caso. Não somamos aparelhos diferentes, porque cada caso tem as suas próprias premissas.
> Olhando o conjunto, vemos que no C01 reparar custa menos por ano. Procurem no painel um caso em que isso não acontece: é o C03, em que trocar tem o menor custo anual. O painel não decide por ninguém. Ele ajuda a ver em que condições o resultado muda.

**Ação do estudante:** localiza no painel o caso em que trocar custa menos por ano (modo C: o apresentador aponta).

**Recurso:** slide 7. O painel F3 foi aberto sem autenticação, mostrou os oito casos e dispõe de captura e PDF no Drive. Antes do ensaio, confirmar se a versão visual projetada corresponde ao painel publicado e se o endereço/QR final foram liberados para uso.

### 17:00–18:00 · Síntese, limites, QR e URL textual (slide 8)

**Fala principal:**

> Resumindo: custo anual depende das premissas. Risco, necessidade e impacto ambiental ajudam a decidir, sem mudar o cálculo. Os dados são sintéticos; não é recomendação comercial.
> O slide traz QR, endereço do painel e Guia de decisão. Justifiquem com um dado e uma limitação: "Reparar custa R$ 61,67 a menos por ano se durar 1,5 ano; essa duração é incerta." Completem com outro limite.

**Ação do estudante:** completa oralmente o modelo de frase com um dado financeiro e uma limitação.

**Recurso:** slide 8 (QR, URL textual e síntese).

**Frase de saída:** "Última pergunta, rápida."

---

## 18:00–20:00 · Interação, pergunta breve, transição e margem (slide 8, continuação)

**Objetivo:** encerrar com uma interação curta e liberar a margem de segurança.

**Fala principal:**

> Uma pergunta rápida, respondendo em voz alta ou por gesto: qual premissa mais mexeu no resultado, o custo do reparo ou a vida adicional?
> Obrigada. Lembrem: o resultado é educativo e depende das premissas. Agora, a troca de grupo.

**Ação do estudante:** responde por gesto ou em voz alta. Nada é registrado.

**Recurso:** slide 8.

**Regra da margem:** se o conteúdo passou de 18:00, pule a pergunta. A margem de 18:00 a 20:00 serve a perguntas, troca de grupo e contingência, e nunca a conteúdo novo.

**Frase de saída:** "Obrigada, e boa continuação."

---

## Modo sem computadores

O apresentador demonstra tudo. O público responde só oralmente ou por gesto, e **nada é registrado**.

| Intervalo | Modo A: computadores individuais | Modo B: pequenos grupos | Modo C: só projeção (sem computadores) |
| --- | --- | --- | --- |
| 0:00–2:00 | Resposta por gesto | Igual ao A | Igual ao A |
| 2:00–5:00 | Localiza os dados no slide | Igual ao A | Igual ao A |
| 5:00–7:00 | Aponta no slide o que soma e o que subtrai | Igual ao A | Igual ao A |
| 7:00–9:00 | Calcula à mão, sozinho | Calcula à mão em dupla ou trio e compara | Apresentador calcula no slide 4, passo a passo, e o público confirma cada passo oralmente |
| 9:00–12:00 | Seleciona C01 no MVP | Um integrante seleciona C01 no MVP do grupo | Apresentador seleciona C01 no MVP projetado |
| 12:00–15:00 | Prevê e edita a vida adicional no MVP | O grupo prevê e edita | Apresentador edita e o público prevê oralmente |
| 15:00–17:00 | Localiza o caso no painel | Igual ao A | Apresentador aponta no painel projetado |
| 17:00–18:00 | Completa a frase oralmente | Igual ao A | Igual ao A |
| 18:00–20:00 | Gesto ou voz | Igual ao A | Igual ao A |

Contingência de rede: se o painel não abrir, usar o PDF do dashboard F3 publicado no Drive, após conferir que os valores exibidos correspondem à versão congelada para a oficina. O apresentador pode explicar a regra de leitura pelo caso C01 sem depender da conexão.

## Cortes de contingência

Se a leitura passar de 18:00, corte nesta ordem:

1. a demonstração opcional da mensagem de erro (9:00–12:00);
2. a frase do relatório ITU/UNITAR (12:00–15:00);
3. a leitura do caso C03 no painel (15:00–17:00), mantendo só a regra de leitura.

**Nunca corte:** o cálculo manual antes do MVP e o aviso educativo ([aviso_educativo]). Nunca elimine a margem final de 18:00 a 20:00.

## Verificação reproduzível de duração da Fase 2

Em 05/11/2026, `medir_roteiro_tts.ps1` extraiu somente as falas marcadas neste roteiro e sintetizou cada trecho com a voz Windows **Microsoft Maria Desktop**, pt-BR, velocidade normal (`Rate=0`). A duração foi calculada pelo tamanho do áudio PCM gerado, sem reproduzi-lo em tempo real. O teste inclui a fala opcional de erro. Os valores arredondados abaixo são **tempo de fala sintética**, não tempo da oficina nem leitura humana.

| Intervalo | Orçamento | Fala TTS | Tempo restante para ação, pausa e transição |
| --- | --- | --- | --- |
| 0:00–2:00 | 2:00 | 1:31 | 0:29 |
| 2:00–5:00 | 3:00 | 2:08 | 0:52 |
| 5:00–7:00 | 2:00 | 1:14 | 0:46 |
| 7:00–9:00 | 2:00 | 0:48 | 1:12 |
| 9:00–12:00 | 3:00 | 1:27 | 1:33 |
| 12:00–15:00 | 3:00 | 1:55 | 1:05 |
| 15:00–17:00 | 2:00 | 0:50 | 1:10 |
| 17:00–18:00 | 1:00 | 0:41 | 0:19 |
| 18:00–20:00 | 2:00 | 0:23 | 1:37 |
| **Total** | **20:00** | **10:58** | **9:02** |

No slide 4, os 48,13 segundos de fala somados ao minuto de cálculo independente ocupam 1:48,13 do intervalo 7:00–9:00; sobram cerca de 12 segundos para passagem. Até 18:00, a fala TTS ocupa 10:34,89, deixando 7:25,11 distribuídos entre ações e transições. O slide 8 tem apenas 19 segundos para a resposta oral. Em projeção ou com computadores lentos, use os cortes de contingência acima e preserve a margem final.

Houve leitura em voz alta sem cronômetro, que não comprova a duração real. **O ensaio humano cronometrado ainda não foi realizado e não é atribuído a Letícia nem aos demais integrantes.** A síntese de voz indica viabilidade, mas só o ensaio com navegação, cálculo manual e troca de grupo mede a execução completa.
