# Simulador Conserta ou Troca?

Aplicação web estática, responsiva e sem coleta de dados para os estudantes inserirem
valores reais e compararem o custo anual de reparar ou trocar um dispositivo.

## Estado de publicação

**Não publicado.** O endereço planejado é
`https://caioarthur08-pre51.github.io/conserta-ou-troca/simulador/`, mas só deve ser
ativado após autorização expressa de Caio. O QR preparado para o guia usa esse endereço
futuro e, portanto, só se torna operacional depois do deploy.

## Autoria por domínio

- regras e fórmula: Modelagem de Dados — Laís Eulálio;
- engenharia do simulador: Engenharia do Comparador Local — Guilherme Almeida;
- conteúdo e linguagem educativa: Conteúdo Didático — Letícia Costa;
- identidade e composição visual: Comunicação Visual — Larissa Costa;
- coordenação, integração e autorização de publicação: Caio Rocha;
- execução técnica assistida: Codex, sob coordenação de Caio Rocha.

## Privacidade

- nenhum nome, e-mail, turma, cookie, analytics ou identificador é solicitado;
- os valores ficam apenas na memória da página;
- não há servidor, API, banco de dados, `localStorage` ou `sessionStorage`;
- a planilha é um CSV criado no próprio navegador e baixado diretamente no aparelho.

## Cálculo

```text
Reparar = (reparo + manutenção adicional - residual do reparado) / vida adicional em anos
Trocar  = (substituto + acessórios - venda atual - residual do substituto) / vida em anos
```

As vidas são digitadas em meses e convertidas para anos. Diferença inferior a R$ 1,00
por ano é exibida como custo praticamente equivalente. Critérios qualitativos nunca
alteram a fórmula.

## Execução local

Abra um terminal nesta pasta e execute um servidor HTTP estático. Exemplo:

```powershell
python -m http.server 4173
```

Depois abra `http://localhost:4173/`. O modo offline exige HTTP/HTTPS para registrar o
service worker; abrir `index.html` diretamente ainda permite calcular, mas sem cache.

## Testes

```powershell
node --test tests/core.test.cjs
```

## Publicação futura

1. validar em Chrome, Edge e Firefox e em pelo menos dois celulares;
2. confirmar que o endereço planejado permanecerá estável;
3. publicar a pasta `simulador/` no GitHub Pages;
4. testar o QR na tela e impresso;
5. somente então distribuir o PDF atualizado.
