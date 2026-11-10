# Simulador Conserta ou Troca?

Aplicação web estática, responsiva e sem coleta de dados para os estudantes inserirem
valores reais e compararem o custo anual de reparar ou trocar um dispositivo.

## Estado de publicação

**Publicado e operacional.** O endereço definitivo é:

`https://caioarthur08-pre51.github.io/conserta-ou-troca/simulador/`

Caio autorizou a publicação em 09/11/2026. O GitHub Pages foi ativado a partir da
branch `main`, o deploy concluiu com sucesso e o endereço codificado no QR foi validado
na versão pública.

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

## Limites dinâmicos

- cada campo monetário mostra o mínimo ou máximo compatível com os demais valores;
- no reparo, o residual não pode superar reparo + manutenção;
- na troca, venda + residual não pode superar preço + acessórios;
- uma combinação incompatível destaca todos os campos que podem ser ajustados, bloqueia
  o cálculo e redireciona para o primeiro campo relacionado após uma breve pausa;
- o núcleo mantém uma validação defensiva adicional, mesmo que a interface seja contornada.

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

## Publicação e validação em campo

1. publicação concluída no GitHub Pages pela branch `main`;
2. cálculo completo validado diretamente no endereço público;
3. QR digital validado contra o endereço definitivo;
4. antes da atividade, conferir o QR impresso em pelo menos dois celulares;
5. manter o endereço estável e não renomear a pasta `simulador/`.
