"use strict";

const CACHE = "simulador-conserta-ou-troca-v4";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./styles.css",
  "./core.js",
  "./pdf.js",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/app-icon.svg"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((nome) => nome !== CACHE).map((nome) => caches.delete(nome)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  const requisicao = evento.request;
  if (requisicao.method !== "GET") return;

  const url = new URL(requisicao.url);
  if (url.origin !== self.location.origin) return;

  if (requisicao.mode === "navigate") {
    evento.respondWith(
      fetch(requisicao)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(CACHE).then((cache) => cache.put("./index.html", copia));
          return resposta;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  evento.respondWith(
    fetch(requisicao)
      .then((resposta) => {
        const copia = resposta.clone();
        caches.open(CACHE).then((cache) => cache.put(requisicao, copia));
        return resposta;
      })
      .catch(() => caches.match(requisicao))
  );
});
