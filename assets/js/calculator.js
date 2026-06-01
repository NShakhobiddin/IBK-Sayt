/* ============================================================
   calculator.js — Bojxona to'lovi kalkulyatori
   Manba (loyiha texnik topshirig'i):
   - Aeroport: 1000$ limit. Ortiqcha qism 30%, lekin har kg uchun $3
     (qaysi ko'p bo'lsa) + BHM ning 25% (BHM = 412000 so'm).
   - Jo'natma: 200$ (kuryer) / 100$ (pochta) imtiyoz. Yetkazib berish
     narxini ortiqcha qismga nisbat qilib bojxona qiymatiga qo'shadi,
     keyin 30% / $3 kg + BHM 25%.
   Natija usha kungi CBU kursi bo'yicha so'mda ham beriladi.
   ============================================================ */

const BHM = 412000;          // Bazaviy hisoblash miqdori (so'm)
const DUTY_RATE = 0.30;      // 30%
const PER_KG_USD = 3;        // har kg uchun $3 (minimal)
const FEE_RATE = 0.25;       // BHM ning 25% (yagona bojxona to'lovi yig'imi)

// Joriy USD kursi (so'mda). CBU API'dan yoki qo'lda kiritiladi.
let CURRENT_RATE = null;

/* CBU (Markaziy bank) API'dan USD kursini olish */
async function fetchUsdRate() {
  const endpoints = [
    "https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/",
    "https://cbu.uz/oz/arkhiv-kursov-valyut/json/USD/",
  ];
  for (const url of endpoints) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();
      const item = Array.isArray(data) ? data[0] : data;
      const rate = parseFloat(item && item.Rate);
      if (rate && !isNaN(rate)) {
        CURRENT_RATE = rate;
        return { rate, date: item.Date || "" };
      }
    } catch (e) {
      /* keyingi endpoint yoki qo'lda kiritishga o'tamiz */
    }
  }
  return null;
}

/*
  Aeroport rejimi.
  value  — tovar qiymati (USD)
  weight — umumiy vazn (kg)
  rate   — USD kursi (so'm)
*/
function calcAirport(value, weight, rate) {
  const limit = 1000;
  const excessValue = Math.max(0, value - limit);
  if (excessValue <= 0) {
    return { dutiable: false, limit, excessValue: 0 };
  }
  // Vazni ortiqcha qiymatga proporsional hisoblanadi
  const excessWeight = value > 0 ? weight * (excessValue / value) : 0;
  const byValue = excessValue * DUTY_RATE;
  const byWeight = excessWeight * PER_KG_USD;
  const dutyUsd = Math.max(byValue, byWeight);
  const method = byValue >= byWeight ? "value" : "weight";
  const feeSoum = BHM * FEE_RATE;                 // BHM 25% (so'mda)
  const dutySoum = rate ? dutyUsd * rate : null;
  const totalSoum = rate ? dutySoum + feeSoum : null;
  return {
    dutiable: true, limit, excessValue, excessWeight,
    byValue, byWeight, dutyUsd, method,
    feeSoum, dutySoum, totalSoum,
  };
}

/*
  Jo'natma rejimi.
  value    — bir kalendar oydagi umumiy jo'natma summasi (USD)
  weight   — umumiy vazn (kg)
  delivery — 1 kg uchun yetkazib berish narxi (USD)
  limit    — 200 (kuryer) yoki 100 (pochta)
  rate     — USD kursi (so'm)
*/
function calcShipment(value, weight, delivery, limit, rate) {
  const excessValue = Math.max(0, value - limit);
  if (excessValue <= 0) {
    return { dutiable: false, limit, excessValue: 0 };
  }
  const proportion = value > 0 ? excessValue / value : 0;
  const excessWeight = weight * proportion;
  const deliveryTotal = delivery * weight;
  const deliveryOnExcess = deliveryTotal * proportion;   // yetkazib berishni ortiqcha qismga nisbatlash
  const customsValue = excessValue + deliveryOnExcess;   // bojxona qiymati
  const byValue = customsValue * DUTY_RATE;
  const byWeight = excessWeight * PER_KG_USD;
  const dutyUsd = Math.max(byValue, byWeight);
  const method = byValue >= byWeight ? "value" : "weight";
  const feeSoum = BHM * FEE_RATE;
  const dutySoum = rate ? dutyUsd * rate : null;
  const totalSoum = rate ? dutySoum + feeSoum : null;
  return {
    dutiable: true, limit, excessValue, excessWeight,
    customsValue, deliveryOnExcess,
    byValue, byWeight, dutyUsd, method,
    feeSoum, dutySoum, totalSoum,
  };
}
