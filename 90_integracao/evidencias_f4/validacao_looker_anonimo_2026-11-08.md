# Validação técnica do destino público do QR

Data: 08/11/2026  
Executor técnico: Codex, sob coordenação de Caio Rocha  
Domínio funcional: Modelagem Financeira e Inteligência de Dados — Laís Eulálio

## Destino

https://datastudio.google.com/reporting/ef7da896-dae5-4e7c-b986-1d644ad94ffc

## Procedimento e resultado

1. A URL foi aberta em uma sessão de navegador sem conta Google autenticada no painel.
2. O relatório carregou com o título `Conserta ou Troca — Custo Total do Dispositivo — v0.3` e sem solicitar login.
3. A tabela principal apresentou 16 registros, correspondentes a dois cenários para cada um dos oito casos C01–C08.
4. A tabela qualitativa apresentou os oito identificadores.
5. O filtro `caso_id` foi ajustado para C03.
6. O painel filtrado retornou exatamente:
   - Trocar: 282,86 R$/ano;
   - Reparar: 370,00 R$/ano;
   - resultado do caso: Trocar.
7. A tabela qualitativa ficou restrita ao C03, com risco Alto, necessidade Essencial e a observação `Troca requer descarte responsável`.
8. Ao final, o filtro foi restaurado para todos os casos e a tabela voltou a 16/16 registros.

## Conclusão técnica

O destino atual está apto como URL pública candidata para o QR e satisfaz o teste técnico de abertura anônima e filtro C03. A data exibida pelo painel para atualização foi 08/11/2026.

## Limite da evidência

Esta validação não substitui os testes físicos em dois celulares, a leitura da prova impressa a 30/60/100 cm nem a digitação manual da URL. Caio Rocha assumiu esses gates físicos e deverá registrar aparelhos, data, distância e resultado antes de declarar `F4 DESTINO DO QR VALIDADO` em sentido integral.
