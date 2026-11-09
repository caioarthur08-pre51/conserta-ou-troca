import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "../..");
const appDir = process.env.APP_DIR
  ? resolve(process.env.APP_DIR)
  : resolve(scriptDir, "../app");
const buildDir = join(repoRoot, ".build", "evidencias_f4_mvp_v1.0.0");
const evidenceDir = join(repoRoot, "90_integracao", "evidencias_f4");
const profileDir = join(buildDir, `chrome-profile-${randomUUID()}`);
const chrome = process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!existsSync(chrome)) throw new Error(`Chrome não encontrado: ${chrome}`);
mkdirSync(profileDir, { recursive: true });
mkdirSync(evidenceDir, { recursive: true });

const browser = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--disable-extensions",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-debugging-port=0",
  `--user-data-dir=${profileDir}`,
  "about:blank",
], { windowsHide: true, stdio: "ignore" });

const pause = (ms) => new Promise((done) => setTimeout(done, ms));
async function waitUntil(check, label) {
  for (let i = 0; i < 240; i += 1) {
    const result = await check();
    if (result) return result;
    await pause(50);
  }
  throw new Error(`Tempo esgotado: ${label}`);
}

let socket;
try {
  const activePort = await waitUntil(() => {
    const file = join(profileDir, "DevToolsActivePort");
    return existsSync(file) ? readFileSync(file, "utf8").split(/\r?\n/)[0] : null;
  }, "porta DevTools");
  const appURL = pathToFileURL(join(appDir, "index.html")).href;
  const target = await fetch(
    `http://127.0.0.1:${activePort}/json/new?${encodeURIComponent(appURL)}`,
    { method: "PUT" },
  ).then((response) => response.json());

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((done, fail) => {
    socket.addEventListener("open", done, { once: true });
    socket.addEventListener("error", fail, { once: true });
  });
  let nextId = 1;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { done, fail } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) fail(new Error(JSON.stringify(message.error)));
    else done(message.result);
  });
  const send = (method, params = {}) => new Promise((done, fail) => {
    const id = nextId++;
    pending.set(id, { done, fail });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const value = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (value.exceptionDetails) throw new Error(JSON.stringify(value.exceptionDetails));
    return value.result.value;
  };
  const viewport = async (width, height) => send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const saveBase64 = (name, data) => {
    const path = join(buildDir, name);
    const bytes = Buffer.from(data, "base64");
    writeFileSync(path, bytes);
    return {
      arquivo: name,
      tamanho_bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex").toUpperCase(),
    };
  };
  const screenshot = async (name) => {
    const shot = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
    });
    return saveBase64(name, shot.data);
  };
  const pressEnter = async () => {
    await send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Enter",
      code: "Enter",
      text: "\r",
      unmodifiedText: "\r",
      windowsVirtualKeyCode: 13,
      nativeVirtualKeyCode: 13,
    });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  };
  const runCase = async (id, repairCost = null) => evaluate(`(() => {
    const select = document.querySelector('#caso');
    select.value = ${JSON.stringify(id)};
    select.dispatchEvent(new Event('change', { bubbles: true }));
    ${repairCost == null ? "" : `document.querySelector('#custo-reparo').value = ${JSON.stringify(repairCost)};`}
    document.querySelector('#calcular').click();
    return {
      caso: ${JSON.stringify(id)},
      decisao: document.querySelector('#decisao').textContent.trim(),
      linhas: [...document.querySelectorAll('#tabela-resultados tbody tr')]
        .map((row) => row.textContent.replace(/\\s+/g, ' ').trim()),
      imprimir_habilitado: !document.querySelector('#imprimir').disabled,
      sem_overflow_horizontal: document.documentElement.scrollWidth <= innerWidth,
    };
  })()`);

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Network.setBlockedURLs", { urls: ["http://*", "https://*"] });
  await send("Page.bringToFront");
  await viewport(390, 844);
  await send("Page.navigate", { url: appURL });
  await waitUntil(
    () => evaluate("document.readyState === 'complete' && Array.isArray(globalThis.CASOS)"),
    "carregamento offline do aplicativo",
  );

  const recursos = await evaluate(`performance.getEntriesByType('resource').map((item) => item.name)`);
  const recursosLocais = recursos.every((url) => url.startsWith("file://"));
  const c01 = await runCase("C01");
  const mobile = await screenshot("mvp_v1.0.0_c01_390x844.png");

  const teclado = await evaluate(`(() => {
    document.querySelector('#custo-reparo').value = '430';
    document.querySelector('#calcular').focus();
    return document.activeElement.id;
  })()`);
  await pressEnter();
  const resultadoTeclado = await evaluate(`({
    foco_inicial: ${JSON.stringify(teclado)},
    resultados_visiveis: !document.querySelector('#resultados').hidden,
    botao_imprimir_habilitado: !document.querySelector('#imprimir').disabled,
    custo_simulado: document.querySelector('#custo-reparo').value,
  })`);
  await evaluate(`(() => {
    document.querySelector('#restaurar').focus();
  })()`);
  await pressEnter();
  resultadoTeclado.restauracao_por_enter = await evaluate(
    "document.querySelector('#custo-reparo').value === '420'",
  );
  await runCase("C01");
  await evaluate(`(() => {
    globalThis.__printAcionado = false;
    window.print = () => { globalThis.__printAcionado = true; };
    document.querySelector('#imprimir').focus();
  })()`);
  await pressEnter();
  resultadoTeclado.impressao_por_enter = await evaluate("globalThis.__printAcionado === true");

  await viewport(1280, 720);
  const c03 = await runCase("C03");
  const desktop = await screenshot("mvp_v1.0.0_c03_1280x720.png");
  const empate = await runCase("C01", "512.50");
  const pdf = await send("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: true,
    paperWidth: 8.27,
    paperHeight: 11.69,
    marginTop: 0.3,
    marginBottom: 0.3,
    marginLeft: 0.3,
    marginRight: 0.3,
  });
  const pdfFile = saveBase64("mvp_v1.0.0_resultado.pdf", pdf.data);

  const aprovado = recursosLocais &&
    c01.decisao.includes("Reparar") &&
    c03.decisao.includes("Trocar") &&
    empate.decisao.includes("Empate técnico") &&
    c01.linhas.length === 2 && c03.linhas.length === 2 &&
    c01.sem_overflow_horizontal && c03.sem_overflow_horizontal &&
    resultadoTeclado.resultados_visiveis &&
    resultadoTeclado.restauracao_por_enter &&
    resultadoTeclado.impressao_por_enter;

  const report = {
    fase: 4,
    gate: "RESULTADOS MVP LIBERADOS",
    versao_entrega: "1.0.0",
    origem_testada: process.env.APP_DIR
      ? "ZIP extraído em pasta limpa"
      : "árvore de trabalho do aplicativo",
    execucao: "Chrome headless, file://, HTTP e HTTPS bloqueados",
    recursos_locais: recursosLocais,
    casos: { c01, c03, empate },
    teclado: resultadoTeclado,
    arquivos: { mobile, desktop, pdf: pdfFile },
    aprovado,
    limitacao: "Teste automatizado técnico; não substitui validação humana de leitor de tela nem prova física.",
  };
  writeFileSync(
    join(evidenceDir, "mvp_interacao_offline.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  console.log(JSON.stringify(report, null, 2));
  if (!aprovado) process.exitCode = 1;
} finally {
  socket?.close();
  browser.kill();
  await pause(250);
  if (existsSync(profileDir)) rmSync(profileDir, { recursive: true, force: true });
}
