# Registro técnico F4-F5 — comparador local

**Domínio funcional:** Engenharia do Comparador Local — Guilherme Almeida

**Execução técnica de fechamento:** Codex sob coordenação de Caio Rocha

**Pacote:** v1.0.0, congelamento técnico em 09/11/2026

## Gates aprovados

- modelo Python e JavaScript equivalentes em 8/8 casos;
- oito casos, dez limites inválidos, empate técnico e sensibilidade aprovados nos testes Node;
- abertura `file://` sem servidor em Chrome, Edge e Firefox;
- pontos de vista 390 × 844 e 1280 × 720 aprovados nos três navegadores;
- C01, C03 e empate técnico conferidos na interface com recursos HTTP/HTTPS bloqueados;
- navegação por teclado, restauração e comando de impressão aprovados tecnicamente;
- C01 e C03 sem rolagem horizontal nos pontos de vista testados;
- ZIP criado somente a partir da pasta `app`, extraído em pasta limpa e revalidado.

## Fontes e evidências

- `90_integracao/evidencias_f4/equivalencia_modelo_mvp.json`;
- `90_integracao/evidencias_f4/navegadores_mvp.json`;
- `90_integracao/evidencias_f4/mvp_interacao_offline.json`;
- `02_produto_guilherme/scripts/empacotar_mvp_f5.ps1` para pacote reprodutível.

## Limites

Os testes são técnicos e automatizados. Eles não afirmam teste por iniciante, ensaio humano, leitor de tela real, projetor externo ou computador diferente. Esses itens devem permanecer explícitos até existir evidência física.
