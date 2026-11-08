import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "../app");
const repoRoot = resolve(appDir, "../..");
const buildDir = join(repoRoot, ".build", "evidencias_f3_v0.3.1");
const profileDir = join(buildDir, `chrome-profile-${randomUUID()}`);
const chrome = process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!existsSync(chrome)) throw new Error(`Chrome não encontrado: ${chrome}`);
mkdirSync(profileDir, { recursive: true });

const browser = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--disable-extensions", "--no-first-run",
  "--no-default-browser-check", "--remote-debugging-port=0",
  `--user-data-dir=${profileDir}`, "about:blank"
], { windowsHide: true, stdio: "ignore" });

const pause = (ms) => new Promise((done) => setTimeout(done, ms));
async function waitUntil(check, label) {
  for (let i = 0; i < 200; i += 1) {
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
    { method: "PUT" }
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
      expression, returnByValue: true, awaitPromise: true
    });
    if (value.exceptionDetails) throw new Error(JSON.stringify(value.exceptionDetails));
    return value.result.value;
  };
  const viewport = async (width, height) => send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 1, mobile: false
  });
  const save = (name, data) => {
    const path = join(buildDir, name);
    const bytes = Buffer.from(data, "base64");
    writeFileSync(path, bytes);
    return { path, bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex").toUpperCase() };
  };
  const resultClip = async (width, height) => {
    const y = await evaluate(
      "Math.round(document.querySelector('#resultados').getBoundingClientRect().top + scrollY)"
    );
    const shot = await send("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: true,
      clip: { x: 0, y, width, height, scale: 1 }
    });
    return shot.data;
  };
  const runCase = async (id, repairCost) => {
    const script = `(() => {
      const select = document.querySelector('#caso');
      select.value = ${JSON.stringify(id)};
      select.dispatchEvent(new Event('change', { bubbles: true }));
      ${repairCost == null ? "" : `document.querySelector('#custo-reparo').value = ${JSON.stringify(repairCost)};`}
      document.querySelector('#calcular').click();
      return {
        decision: document.querySelector('#decisao').textContent,
        explanation: document.querySelector('#explicacao-resultado').textContent,
        criteria: document.querySelector('#criterios').textContent,
        rows: [...document.querySelectorAll('#tabela-resultados tbody tr')]
          .map((row) => row.textContent),
        printEnabled: !document.querySelector('#imprimir').disabled
      };
    })()`;
    const state = await evaluate(script);
    if (!state.printEnabled || state.rows.length !== 2) {
      throw new Error(`Resultado incompleto para ${id}: ${JSON.stringify(state)}`);
    }
    return state;
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await viewport(1120, 1019);
  await send("Page.navigate", { url: appURL });
  await waitUntil(
    () => evaluate("document.readyState === 'complete' && Array.isArray(globalThis.CASOS)"),
    "carregamento local do aplicativo"
  );

  const c03 = await runCase("C03");
  const c03File = save("mvp_f3_v0.3.1_c03_resultado.png", await resultClip(1120, 1019));
  const tie = await runCase("C01", "512.50");
  const tieFile = save("mvp_f3_v0.3.1_empate_resultado.png", await resultClip(1120, 1019));
  await viewport(900, 900);
  const c01 = await runCase("C01");
  const c01File = save("mvp_f3_v0.3.1_c01_slide.png", await resultClip(900, 450));
  const pdf = await send("Page.printToPDF", {
    printBackground: true, preferCSSPageSize: true,
    paperWidth: 8.27, paperHeight: 11.69,
    marginTop: 0.3, marginBottom: 0.3, marginLeft: 0.3, marginRight: 0.3
  });
  const pdfFile = save("mvp_f3_v0.3.1_candidato.pdf", pdf.data);

  console.log(JSON.stringify({ commit: "389f866", cases: { c01, c03, tie },
    files: { c01: c01File, c03: c03File, tie: tieFile, pdf: pdfFile } }, null, 2));
} finally {
  socket?.close();
  browser.kill();
}
