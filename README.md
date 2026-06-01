# Bojxona qoidalari — Xalqaro yo‘lovchilar uchun sayt

O‘zbekiston Respublikasiga **tovar va valyuta olib kirish/olib chiqish** bojxona
qoidalarini sodda tilda tushuntiruvchi sayt. Asosan xalqaro aeroportlar orqali
uchib kelgan yo‘lovchilar uchun mo‘ljallangan.

## Asosiy imkoniyatlar

- 🌐 **4 til:** O‘zbek, Rus, Ingliz, Xitoy (tepadagi tugmalar orqali almashtiriladi)
- ✈️ **Xalqaro aeroport** — Kirish (olib kirish) va Chiqish (olib chiqish) bo‘limlari
  - Bojsiz me’yorlar, miqdoriy cheklovlar, tovar maqsadini aniqlash
  - Valyuta, yo‘lak tanlash (yashil/qizil), deklaratsiya, mobil qurilma, dorilar
  - Taqiqlangan va cheklangan tovarlar ro‘yxati (huquqiy manbalar bilan)
- 📮 **Pochta va kuryerlik jo‘natmalari** — bojsiz normalar, nazorat tartibi, taqiqlar
- 🧮 **Bojxona kalkulyatori** — taxminiy yagona bojxona to‘lovini hisoblaydi
  - “Xalqaro aeroport” ($1000 limit) va “Jo‘natma” ($200/$100 limit) rejimlari
  - USD kursi avtomatik **Markaziy bank (cbu.uz)** API’sidan olinadi; qo‘lda ham kiritsa bo‘ladi
- 📞 **Bog‘lanish** — “Toshkent-AERO” IBK kontaktlari va ichki raqamlari
- 📲 **IMEI** — mobil qurilmani ro‘yxatdan o‘tkazish havolalari
- 🔍 **Qidiruv** — barcha tillarda ishlaydi
- ✨ Kirishda “Bojxonaga xush kelibsiz” animatsiyasi, zamonaviy va yengil dizayn

## Texnologiya

Hech qanday build yoki server talab qilinmaydi — sof **HTML + CSS + JavaScript**.

```
index.html
assets/
  css/style.css
  js/
    i18n.js         # interfeys matnlari (4 til)
    content.js      # bo‘limlar mazmuni (4 til)
    prohibited.js   # taqiqlangan/cheklangan tovarlar jadvali
    contacts.js     # bog‘lanish ma’lumotlari
    calculator.js   # to‘lov hisoblash + CBU kursi
    app.js          # routing, render, til, qidiruv
```

## Ishga tushirish

Faylni to‘g‘ridan-to‘g‘ri ochish yoki oddiy server:

```bash
python3 -m http.server 8000
# brauzerda: http://localhost:8000
```

## Joylashtirish (deploy)

GitHub Pages, Netlify, Vercel yoki istalgan statik hostingga shunchaki
fayllarni yuklash kifoya — qo‘shimcha sozlash kerak emas.

## Eslatma

Kalkulyator natijalari **taxminiy** bo‘lib, faqat ma’lumot maqsadida.
Aniq holatlar bo‘yicha bojxona organiga murojaat qiling.

## Huquqiy hisoblash mantiqi

Yagona bojxona to‘lovi bojsiz me’yordan ortiq qismga nisbatan: tovarning
bojxona qiymatidan **30%**, lekin har bir kg uchun **$3 dan kam emas**
(qaysi biri ko‘p bo‘lsa, o‘sha olinadi) + **BHM ning 25%** (BHM = 412 000 so‘m).
Natija o‘sha kungi kurs bo‘yicha so‘mda ko‘rsatiladi.
