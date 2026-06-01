/* ============================================================
   sw.js — Service Worker: offline ishlash uchun keshlash.
   Aeroportda internet zaif bo'lsa ham sayt ishlashi uchun.
   ============================================================ */

const CACHE = "bojxona-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/css/style.css",
  "./assets/img/icon.svg",
  "./assets/js/i18n.js",
  "./assets/js/prohibited.js",
  "./assets/js/content.js",
  "./assets/js/contacts.js",
  "./assets/js/calculator.js",
  "./assets/js/app.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Valyuta kursi (cbu.uz / proksilar) — har doim tarmoqdan, keshlanmaydi
  if (/cbu\.uz|corsproxy\.io|allorigins\.win/.test(url.hostname)) return;

  // O'z domenimizdagi statik fayllar — avval kesh, keyin tarmoq (stale-while-revalidate)
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
  }
});
