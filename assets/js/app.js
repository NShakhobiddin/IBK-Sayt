/* ============================================================
   app.js — Ilova mantiqi: til, routing, render, qidiruv, kalkulyator
   ============================================================ */

const STATE = {
  lang: localStorage.getItem("lang") || "uz",
  rate: null,
  rateDate: "",
};

/* --- Yordamchilar --- */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const t = (key) => (I18N[STATE.lang] && I18N[STATE.lang][key]) || I18N.uz[key] || key;
const tr = (obj) => (obj ? (obj[STATE.lang] || obj.uz || "") : "");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = (n) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(n));
const fmt2 = (n) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);

/* --- Bosh menyu tuzilishi --- */
const MENU = [
  { id: "air", icon: "✈️", k: "m_air", ks: "m_air_sub", route: "#/air" },
  { id: "post", icon: "📮", k: "m_post", ks: "m_post_sub", route: "#/post" },
  { id: "calc", icon: "🧮", k: "m_calc", ks: "m_calc_sub", route: "#/calc" },
  { id: "imei", icon: "📲", k: "m_imei", ks: "m_imei_sub", route: "#/s/imei" },
  { id: "contact", icon: "📞", k: "m_contact", ks: "m_contact_sub", route: "#/contact" },
];

const CATEGORIES = {
  air: [
    { id: "air-in", icon: "🛬", k: "air_in", ks: "air_in_sub", route: "#/air-in" },
    { id: "air-out", icon: "🛫", k: "air_out", ks: "air_out_sub", route: "#/air-out" },
  ],
};

function sectionsByParent(parent) {
  return Object.entries(SECTIONS)
    .filter(([, s]) => s.parent === parent)
    .map(([id, s]) => ({ id, ...s }));
}

/* ============================================================
   RENDER — sahifalar
   ============================================================ */

function renderHome() {
  return `
    <section class="hero reveal">
      <h1>${esc(t("homeTitle"))}</h1>
      <p class="lead">${esc(t("homeLead"))}</p>
    </section>
    <div class="card-grid">
      ${MENU.map((m, i) => `
        <a class="nav-card reveal" style="--d:${i * 60}ms" href="${m.route}">
          <span class="nav-card__icon">${m.icon}</span>
          <span class="nav-card__body">
            <span class="nav-card__title">${esc(t(m.k))}</span>
            <span class="nav-card__sub">${esc(t(m.ks))}</span>
          </span>
          <span class="nav-card__arrow">→</span>
        </a>`).join("")}
    </div>`;
}

function renderCategory(catId) {
  const items = CATEGORIES[catId];
  if (!items) return renderSectionList(catId);
  const menuItem = MENU.find(m => m.id === catId);
  const catTitle = menuItem ? t(menuItem.k) : "";
  return `
    <div class="crumbs">${crumb("#/", t("home"))}<span>${esc(catTitle)}</span></div>
    <h1 class="page-title">${esc(catTitle)}</h1>
    <p class="lead">${esc(t("chooseSection"))}</p>
    <div class="card-grid">
      ${items.map((m, i) => `
        <a class="nav-card reveal" style="--d:${i * 60}ms" href="${m.route}">
          <span class="nav-card__icon">${m.icon}</span>
          <span class="nav-card__body">
            <span class="nav-card__title">${esc(t(m.k))}</span>
            <span class="nav-card__sub">${esc(t(m.ks))}</span>
          </span>
          <span class="nav-card__arrow">→</span>
        </a>`).join("")}
    </div>`;
}

function parentTitleKey(parent) {
  if (parent === "air-in") return t("air_in");
  if (parent === "air-out") return t("air_out");
  if (parent === "post") return t("m_post");
  return "";
}

function renderSectionList(parent) {
  const items = sectionsByParent(parent);
  const title = parentTitleKey(parent);
  return `
    <div class="crumbs">${crumb("#/", t("home"))} ${parent.startsWith("air") ? crumb("#/air", t("m_air")) : ""}<span>${esc(title)}</span></div>
    <h1 class="page-title">${esc(title)}</h1>
    <p class="lead">${esc(t("chooseSection"))}</p>
    <div class="list-grid">
      ${items.map((s, i) => `
        <a class="list-item reveal" style="--d:${i * 40}ms" href="#/s/${s.id}">
          <span class="list-item__icon">${s.icon}</span>
          <span class="list-item__title">${esc(tr(s.title))}</span>
          <span class="list-item__arrow">→</span>
        </a>`).join("")}
    </div>`;
}

function crumb(href, label) {
  return `<a href="${href}">${esc(label)}</a><span class="sep">/</span>`;
}

/* ---- Bo'lim (section) ---- */
function renderSection(id) {
  const s = SECTIONS[id];
  if (!s) return `<p>${esc(t("searchEmpty"))}</p>`;
  let up = "#/";
  if (s.parent === "air-in") up = "#/air-in";
  else if (s.parent === "air-out") up = "#/air-out";
  else if (s.parent === "post") up = "#/post";

  const body = s.blocks.map(renderBlock).join("");
  const related = (s.related || []).map(rid => {
    const target = rid === "calc" ? { route: "#/calc", title: { uz: t("m_calc"), ru: t("m_calc"), en: t("m_calc"), zh: t("m_calc") }, icon: "🧮" }
      : SECTIONS[rid] ? { route: `#/s/${rid}`, title: SECTIONS[rid].title, icon: SECTIONS[rid].icon } : null;
    if (!target) return "";
    return `<a class="chip" href="${target.route}">${target.icon} ${esc(tr(target.title))}</a>`;
  }).join("");

  return `
    <div class="crumbs">${crumb("#/", t("home"))}${s.parent ? crumb(up, parentTitleKey(s.parent)) : ""}<span>${esc(tr(s.title))}</span></div>
    <article class="article reveal">
      <header class="article__head">
        <span class="article__icon">${s.icon}</span>
        <h1>${esc(tr(s.title))}</h1>
      </header>
      ${body}
      ${related ? `<div class="related"><h3>${esc(t("relatedTitle"))}</h3><div class="chips">${related}</div></div>` : ""}
    </article>`;
}

function renderBlock(b) {
  switch (b.t) {
    case "lead": return `<p class="b-lead">${esc(tr(b.x))}</p>`;
    case "p": return `<p>${esc(tr(b.x))}</p>`;
    case "h": return `<h3 class="b-h">${esc(tr(b.x))}</h3>`;
    case "quote": return `<blockquote class="b-quote">${esc(tr(b.x))}</blockquote>`;
    case "note": return `<div class="b-note"><span class="b-note__ic">⚠️</span><div>${esc(tr(b.x))}</div></div>`;
    case "example": return `<div class="b-example"><span class="b-example__tag">${exampleTag()}</span><div>${esc(tr(b.x))}</div></div>`;
    case "list": return `<ul class="b-list">${b.items.map(it => `<li>${esc(tr(it))}</li>`).join("")}</ul>`;
    case "norms": return `<div class="norms">${b.items.map(it => `
        <div class="norm">
          <div class="norm__label">${esc(tr(it.label))}</div>
          <div class="norm__value">${esc(tr(it.value))}</div>
        </div>`).join("")}</div>`;
    case "linkcards": return `<div class="linkcards">${b.items.map(it => `
        <a class="linkcard" href="${it.url}" target="_blank" rel="noopener">
          <span class="linkcard__lbl">${esc(it.label)}</span>
          <span class="linkcard__desc">${esc(tr(it.desc))}</span>
        </a>`).join("")}</div>`;
    case "prohibited": return renderProhibited(b.set);
    default: return "";
  }
}

function exampleTag() {
  const m = { uz: "Misol", ru: "Пример", en: "Example", zh: "示例" };
  return esc(tr(m));
}

function renderProhibited(set) {
  const rows = set === "post" ? [...PROHIBITED_BASE, ...PROHIBITED_POST_EXTRA] : PROHIBITED_BASE;
  const statusLabel = (st) => st === "banned"
    ? { uz: "Taqiqlangan", ru: "Запрещено", en: "Prohibited", zh: "禁止" }
    : { uz: "Cheklangan", ru: "Ограничено", en: "Restricted", zh: "限制" };
  return `<div class="proh">${rows.map((r, i) => `
    <details class="proh__item proh--${r.status}" style="--d:${i * 20}ms">
      <summary>
        <span class="proh__num">${i + 1}</span>
        <span class="proh__name">${esc(tr(r.name))}</span>
        <span class="proh__status proh__status--${r.status}">${esc(tr(statusLabel(r.status)))}</span>
      </summary>
      <div class="proh__body">
        <p>${esc(tr(r.detail))}</p>
        <p class="proh__src"><strong>${esc(t("legalBasis"))}:</strong> ${esc(r.source)}</p>
      </div>
    </details>`).join("")}</div>`;
}

/* ---- Kontaktlar ---- */
function renderContacts() {
  const c = CONTACTS;
  const tel = c.main.phone.replace(/[^0-9+]/g, "");
  return `
    <div class="crumbs">${crumb("#/", t("home"))}<span>${esc(tr(c.title))}</span></div>
    <h1 class="page-title">${esc(tr(c.title))}</h1>
    <p class="lead">${esc(tr(c.lead))}</p>

    <div class="contact-main reveal">
      <h3>${esc(tr(c.main.name))}</h3>
      <div class="contact-rows">
        <a class="contact-row" href="tel:${tel}"><span>📞</span> ${esc(c.main.phone)}</a>
        <a class="contact-row" href="mailto:${c.main.email}"><span>✉️</span> ${esc(c.main.email)}</a>
        <div class="contact-row"><span>📍</span> ${esc(tr(c.main.address))}</div>
        <a class="contact-row" href="${c.main.map}" target="_blank" rel="noopener"><span>🗺️</span> ${esc(t("quickLinks"))}: Yandex Maps</a>
      </div>
    </div>

    <div class="contact-block reveal">
      <h3>${esc(tr(c.internal.title))}</h3>
      <div class="ext-grid">
        ${c.internal.items.map(it => `<div class="ext"><span class="ext__n">${esc(tr(it.name))}</span><span class="ext__v">${esc(it.ext)}</span></div>`).join("")}
      </div>
    </div>

    ${c.posts.map(p => `
      <div class="contact-block reveal">
        <h3>${esc(tr(p.name))}</h3>
        <p class="contact-addr">📍 ${esc(tr(p.address))} ${p.map ? `· <a href="${p.map}" target="_blank" rel="noopener">Maps</a>` : ""}</p>
        <div class="ext-grid">
          ${p.lines.map(l => `<div class="ext"><span class="ext__n">${esc(tr(l.name))}</span><span class="ext__v">${esc(l.ext)}</span></div>`).join("")}
        </div>
      </div>`).join("")}`;
}

/* ============================================================
   KALKULYATOR
   ============================================================ */
let CALC_MODE = "air"; // "air" | "post"

function renderCalculator() {
  return `
    <div class="crumbs">${crumb("#/", t("home"))}<span>${esc(t("m_calc"))}</span></div>
    <h1 class="page-title">${esc(t("calc_title"))}</h1>
    <p class="lead">${esc(t("calc_lead"))}</p>

    <div class="calc reveal">
      <div class="calc__tabs">
        <button class="calc__tab ${CALC_MODE === "air" ? "is-active" : ""}" data-mode="air">${esc(t("calc_mode_air"))}</button>
        <button class="calc__tab ${CALC_MODE === "post" ? "is-active" : ""}" data-mode="post">${esc(t("calc_mode_post"))}</button>
      </div>

      <div class="calc__rate" id="rateBox">
        <span class="calc__rate-lbl">${esc(t("calc_rate"))}:</span>
        <span id="rateVal">${STATE.rate ? `1 USD = ${fmt(STATE.rate)} ${soum()}` : t("calc_rate_loading")}</span>
      </div>

      <div class="calc__fields">
        <label class="field">
          <span>${esc(t("calc_value"))}</span>
          <input type="number" id="cValue" min="0" step="0.01" inputmode="decimal" placeholder="0">
        </label>
        <label class="field">
          <span>${esc(t("calc_weight"))}</span>
          <input type="number" id="cWeight" min="0" step="0.01" inputmode="decimal" placeholder="0">
        </label>
        <label class="field calc-post-only" ${CALC_MODE === "air" ? "hidden" : ""}>
          <span>${esc(t("calc_delivery"))}</span>
          <input type="number" id="cDelivery" min="0" step="0.01" inputmode="decimal" placeholder="0">
        </label>
        <div class="field calc-post-only" ${CALC_MODE === "air" ? "hidden" : ""}>
          <span>${esc(t("calc_channel"))}</span>
          <div class="seg">
            <button type="button" class="seg__btn is-active" data-channel="200">${esc(t("calc_courier"))}</button>
            <button type="button" class="seg__btn" data-channel="100">${esc(t("calc_mail"))}</button>
          </div>
        </div>
      </div>

      <details class="calc__manual" id="manualBox">
        <summary>${esc(t("calc_rate_manual"))}</summary>
        <input type="number" id="cRate" min="0" step="0.01" inputmode="decimal" placeholder="${STATE.rate ? fmt(STATE.rate) : "12650"}">
      </details>

      <div class="calc__actions">
        <button class="btn btn--primary" id="calcBtn">${esc(t("calc_btn"))}</button>
        <button class="btn btn--ghost" id="calcReset">${esc(t("calc_reset"))}</button>
      </div>

      <div id="calcResult" class="calc__result" hidden></div>

      <p class="b-note calc__disc"><span class="b-note__ic">ℹ️</span><span>${esc(t("calc_note"))}</span></p>
    </div>`;
}

function soum() {
  return { uz: "so‘m", ru: "сум", en: "soum", zh: "苏姆" }[STATE.lang] || "so‘m";
}

function bindCalculator() {
  const valEl = $("#cValue"), wEl = $("#cWeight"), dEl = $("#cDelivery"), rEl = $("#cRate");
  let channel = 200;

  // Kurs hali yuklanmagan bo'lsa (masalan, sahifa to'g'ridan-to'g'ri ochilsa) qayta urinamiz
  if (!STATE.rate) loadRate();

  $$(".calc__tab").forEach(b => b.addEventListener("click", () => {
    CALC_MODE = b.dataset.mode;
    rerender();
  }));

  $$(".seg__btn").forEach(b => b.addEventListener("click", () => {
    $$(".seg__btn").forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");
    channel = parseInt(b.dataset.channel, 10);
  }));

  $("#calcReset").addEventListener("click", () => {
    [valEl, wEl, dEl, rEl].forEach(el => { if (el) el.value = ""; });
    $("#calcResult").hidden = true;
  });

  $("#calcBtn").addEventListener("click", () => {
    const value = parseFloat(valEl.value);
    const weight = parseFloat(wEl.value);
    const rate = (rEl && rEl.value) ? parseFloat(rEl.value) : STATE.rate;
    const out = $("#calcResult");

    if (isNaN(value) || value < 0 || isNaN(weight) || weight < 0) {
      out.hidden = false;
      out.innerHTML = `<div class="b-note"><span class="b-note__ic">⚠️</span><div>${esc(t("calc_invalid"))}</div></div>`;
      return;
    }

    let r;
    if (CALC_MODE === "air") {
      r = calcAirport(value, weight, rate);
    } else {
      const delivery = dEl && dEl.value ? parseFloat(dEl.value) : 0;
      r = calcShipment(value, weight, delivery || 0, channel, rate);
    }
    out.hidden = false;
    out.innerHTML = renderCalcResult(r, rate);
    out.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function renderCalcResult(r, rate) {
  if (!r.dutiable) {
    return `<div class="result-ok"><span class="result-ok__ic">✅</span><div>${esc(t("calc_no_duty"))}</div></div>`;
  }
  const methodTxt = r.method === "value" ? t("calc_by_value") : t("calc_by_weight");
  const rows = [];
  rows.push(row(t("calc_limit"), `$${fmt2(r.limit)}`));
  rows.push(row(t("calc_excess"), `$${fmt2(r.excessValue)}`));
  if (r.customsValue !== undefined) rows.push(row("Bojxona qiymati / Customs value", `$${fmt2(r.customsValue)}`));
  rows.push(row(t("calc_method"), methodTxt));
  rows.push(row(t("calc_duty_usd"), `$${fmt2(r.dutyUsd)}`, true));
  if (rate) {
    rows.push(row(t("calc_duty_soum"), `${fmt(r.dutySoum)} ${soum()}`));
    rows.push(row(t("calc_fee"), `${fmt(r.feeSoum)} ${soum()}`));
  }
  const total = rate
    ? `<div class="result-total"><span>${esc(t("calc_total_soum"))}</span><strong>${fmt(r.totalSoum)} ${soum()}</strong></div>`
    : `<div class="b-note"><span class="b-note__ic">⚠️</span><div>${esc(t("calc_rate_fail"))}</div></div>`;
  return `<div class="result"><h3>${esc(t("calc_result"))}</h3>
    <div class="result-rows">${rows.join("")}</div>
    ${total}</div>`;
}

function row(label, value, strong) {
  return `<div class="result-row"><span>${esc(label)}</span><${strong ? "strong" : "span"}>${esc(value)}</${strong ? "strong" : "span"}></div>`;
}

/* ============================================================
   QIDIRUV
   ============================================================ */
// Indeks barcha tillardagi matnni jamlaydi — foydalanuvchi istalgan tilda qidira oladi.
function allLangText(obj) {
  if (!obj) return "";
  return LANGS.map(l => obj[l] || "").join(" ");
}
function buildSearchIndex() {
  const idx = [];
  Object.entries(SECTIONS).forEach(([id, s]) => {
    let text = allLangText(s.title) + " " + (s.source || "") + " ";
    s.blocks.forEach(b => {
      if (b.x) text += allLangText(b.x) + " ";
      if (b.items) b.items.forEach(it => {
        text += allLangText(it.label) + " " + allLangText(it.value) + " ";
        if (it.uz) text += allLangText(it) + " ";
      });
      if (b.t === "prohibited") {
        const rows = b.set === "post" ? [...PROHIBITED_BASE, ...PROHIBITED_POST_EXTRA] : PROHIBITED_BASE;
        rows.forEach(r => { text += allLangText(r.name) + " " + allLangText(r.detail) + " "; });
      }
    });
    idx.push({ id, title: s.title, icon: s.icon, text: text.toLowerCase() });
  });
  return idx;
}
let SEARCH_INDEX = null;

function doSearch(q) {
  if (!SEARCH_INDEX) SEARCH_INDEX = buildSearchIndex();
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return SEARCH_INDEX.filter(x => x.text.includes(query)).slice(0, 12);
}

function openSearch() {
  $("#searchModal").classList.add("is-open");
  $("#searchInput").value = "";
  $("#searchResults").innerHTML = "";
  setTimeout(() => $("#searchInput").focus(), 50);
}
function closeSearch() { $("#searchModal").classList.remove("is-open"); }

/* ============================================================
   ROUTING
   ============================================================ */
function route() {
  const hash = location.hash || "#/";
  const app = $("#app");
  let html = "";

  if (hash === "#/" || hash === "") html = renderHome();
  else if (hash === "#/air") html = renderCategory("air");
  else if (hash === "#/air-in") html = renderSectionList("air-in");
  else if (hash === "#/air-out") html = renderSectionList("air-out");
  else if (hash === "#/post") html = renderSectionList("post");
  else if (hash === "#/calc") html = renderCalculator();
  else if (hash === "#/contact") html = renderContacts();
  else if (hash.startsWith("#/s/")) html = renderSection(hash.slice(4));
  else html = renderHome();

  app.innerHTML = html;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  revealOnScroll();

  if (hash === "#/calc") bindCalculator();
  // post rejimida bo'lsa kalkulyatorni qayta bog'lash route ichida amalga oshadi
}

function rerender() { route(); }

function revealOnScroll() {
  const els = $$(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
  }, { threshold: 0.05 });
  els.forEach(el => io.observe(el));
}

/* ============================================================
   TIL ALMASHTIRISH + UI
   ============================================================ */
function applyLang() {
  document.documentElement.lang = STATE.lang;
  $("#brandName").textContent = t("brand");
  $("#brandSub").textContent = t("brandSub");
  $("#homeLink").setAttribute("title", t("home"));
  $("#searchBtn").setAttribute("aria-label", t("search"));
  $("#footerText").textContent = t("footerRights");
  $("#disclaimer").textContent = t("disclaimer");
  $("#searchInput").placeholder = t("search");
  $$(".lang-btn").forEach(b => b.classList.toggle("is-active", b.dataset.lang === STATE.lang));
  route();
}

function setLang(lang) {
  STATE.lang = lang;
  localStorage.setItem("lang", lang);
  applyLang();
}

/* ============================================================
   INTRO ANIMATSIYA
   ============================================================ */
function runIntro() {
  const intro = $("#intro");
  $("#introText").textContent = t("intro");
  $("#introSub").textContent = t("introSub");
  $("#skipIntro").textContent = t("skipIntro");

  const finish = () => {
    intro.classList.add("intro--done");
    setTimeout(() => { intro.style.display = "none"; }, 900);
  };
  // Har sessiyada bir marta ko'rsatamiz
  if (sessionStorage.getItem("introShown")) {
    intro.style.display = "none";
    return;
  }
  sessionStorage.setItem("introShown", "1");
  $("#skipIntro").addEventListener("click", finish);
  setTimeout(finish, 3600);
}

/* ============================================================
   ISHGA TUSHIRISH
   ============================================================ */
async function init() {
  // til tugmalari
  $$(".lang-btn").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  // qidiruv
  $("#searchBtn").addEventListener("click", openSearch);
  $("#searchClose").addEventListener("click", closeSearch);
  $("#searchModal").addEventListener("click", (e) => { if (e.target.id === "searchModal") closeSearch(); });
  $("#searchInput").addEventListener("input", (e) => {
    const res = doSearch(e.target.value);
    const box = $("#searchResults");
    if (!e.target.value.trim()) { box.innerHTML = ""; return; }
    box.innerHTML = res.length
      ? res.map(r => `<a class="sresult" href="#/s/${r.id}">${r.icon} ${esc(tr(r.title))}</a>`).join("")
      : `<div class="sempty">${esc(t("searchEmpty"))}</div>`;
  });
  $("#searchResults").addEventListener("click", (e) => { if (e.target.closest(".sresult")) closeSearch(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSearch(); });

  // mobil menyu
  $("#menuToggle").addEventListener("click", () => $(".lang-switch").classList.toggle("is-open"));

  window.addEventListener("hashchange", route);

  runIntro();
  applyLang();

  // CBU kursini olish
  loadRate();
}

async function loadRate() {
  const r = await fetchUsdRate();
  const rv = $("#rateVal");
  if (r) {
    STATE.rate = r.rate;
    STATE.rateDate = r.date;
    STATE.rateCached = !!r.cached;
    if (rv) {
      const suffix = r.cached ? ` · ${t("calc_rate_cached")}` : (r.date ? " · " + r.date : "");
      rv.textContent = `1 USD = ${fmt(r.rate)} ${soum()}${suffix}`;
    }
  } else {
    if (rv) rv.textContent = t("calc_rate_fail");
    const mb = $("#manualBox");
    if (mb) mb.open = true; // qo'lda kiritishni avtomatik ochamiz
  }
}

document.addEventListener("DOMContentLoaded", init);

// Service worker — offline ishlash uchun (faqat http/https da)
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline rejim ixtiyoriy */ });
  });
}
