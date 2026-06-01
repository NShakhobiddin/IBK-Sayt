/* ============================================================
   content.js — Barcha bo'limlar matni, 4 tilda, blok ko'rinishida.
   Blok turlari app.js da render qilinadi:
     lead, p, quote, h, norms, list, example, note, prohibited
   ============================================================ */

/* ---- Qayta ishlatiladigan umumiy bloklar ---- */

const SHARED_QUANT_NORMS = {
  t: "norms",
  items: [
    {
      label: { uz: "Alkogol mahsuloti (pivo bilan)", ru: "Алкогольная продукция (включая пиво)", en: "Alcoholic products (incl. beer)", zh: "酒精制品（含啤酒）" },
      value: { uz: "2 litr", ru: "2 литра", en: "2 litres", zh: "2 升" },
    },
    {
      label: { uz: "Sigaret", ru: "Сигареты", en: "Cigarettes", zh: "香烟" },
      value: { uz: "200 dona", ru: "200 штук", en: "200 pieces", zh: "200 支" },
    },
    {
      label: { uz: "Sigara", ru: "Сигары", en: "Cigars", zh: "雪茄" },
      value: { uz: "5 dona", ru: "5 штук", en: "5 pieces", zh: "5 支" },
    },
    {
      label: { uz: "Tamaki (tabak)", ru: "Табак", en: "Tobacco", zh: "烟草" },
      value: { uz: "100 gramm", ru: "100 граммов", en: "100 grams", zh: "100 克" },
    },
    {
      label: { uz: "Atir va ifor suvlari", ru: "Духи и парфюмерные воды", en: "Perfume and fragrant waters", zh: "香水及香精水" },
      value: { uz: "3 dona (≤300 ml)", ru: "3 штуки (≤300 мл)", en: "3 pieces (≤300 ml)", zh: "3 件（≤300 毫升）" },
    },
    {
      label: { uz: "Biologik faol qo‘shimchalar (BAA)", ru: "Биологически активные добавки (БАД)", en: "Dietary supplements", zh: "膳食补充剂" },
      value: { uz: "10 ta nom (≤3 kg, har biri 1 qadoq)", ru: "10 наименований (≤3 кг, по 1 упаковке)", en: "10 names (≤3 kg, 1 pack each)", zh: "10 种（≤3 公斤，每种 1 包）" },
    },
  ],
};

const TOVAR_MAQSAD_BLOCKS = [
  { t: "lead", x: {
    uz: "Bojxona organi tovar tijorat maqsadidami yoki shaxsiy ehtiyoj uchunmi — quyidagi mezonlar asosida aniqlaydi.",
    ru: "Таможенный орган определяет, предназначен ли товар для коммерческих целей или для личных нужд, по следующим критериям.",
    en: "The customs authority determines whether goods are for commercial purposes or personal use based on the following criteria.",
    zh: "海关机构依据以下标准确定物品是用于商业目的还是个人需要。",
  }},
  { t: "quote", x: {
    uz: "Notijorat maqsadli tovarlar — shaxsiy, oilaviy (ota-ona, turmush o‘rtog‘i, farzandlar) ehtiyojlari uchun mo‘ljallangan, tadbirkorlik bilan bog‘liq bo‘lmagan tovarlar. Tijorat maqsadli tovarlar — ishlab chiqarish, tadbirkorlik yoki tijorat faoliyati uchun mo‘ljallangan tovarlar.",
    ru: "Товары для некоммерческих целей — предназначенные для личных, семейных (родители, супруг(а), дети) нужд и не связанные с предпринимательством. Товары для коммерческих целей — предназначенные для производства, предпринимательской или иной коммерческой деятельности.",
    en: "Goods for non-commercial purposes are intended for personal and family (parents, spouse, children) needs and are unrelated to business. Goods for commercial purposes are intended for production, business or other commercial activity.",
    zh: "非商业用途物品——供个人、家庭（父母、配偶、子女）需要，与经营活动无关。商业用途物品——供生产、经营或其他商业活动使用。",
  }},
  { t: "h", x: { uz: "Aniqlash mezonlari", ru: "Критерии определения", en: "Criteria for determination", zh: "判定标准" }},
  { t: "list", items: [
    { uz: "Tovarning xususiyati — iste’mol xususiyatlari shaxsiy/oilaviy ehtiyojga mosligi.", ru: "Характер товара — соответствие потребительских свойств личным/семейным нуждам.", en: "Nature of the goods — whether the consumer properties match personal/family needs.", zh: "物品性质——其消费特性是否符合个人/家庭需要。" },
    { uz: "Tovarning miqdori — bir turdagi (bir nom, o‘lcham, shakl, rang) tovarlar ehtiyojdan ortiq bo‘lsa, tijorat deb hisoblanishi mumkin.", ru: "Количество товара — однотипные товары (одно наименование, размер, форма, цвет) сверх потребности могут признаваться коммерческими.", en: "Quantity of goods — same-type goods (one name, size, shape, colour) in excess of need may be deemed commercial.", zh: "物品数量——同类物品（同一名称、尺寸、形状、颜色）超出需要的，可被认定为商业用途。" },
    { uz: "Olib o‘tishning takroriyligi — bir shaxs bir turdagi tovarni qayta-qayta olib kirsa, tijorat deb hisoblanishi mumkin. Pasportdagi shtamp/elektron ma’lumot asos bo‘ladi.", ru: "Повторность перемещения — многократный ввоз однотипного товара одним лицом может признаваться коммерческим. Основанием служат штамп/электронные данные в паспорте.", en: "Frequency of carriage — repeated import of same-type goods by one person may be deemed commercial. A passport stamp/electronic record serves as the basis.", zh: "携带的重复性——同一人多次携带同类物品可被认定为商业用途。护照上的印章/电子记录可作为依据。" },
    { uz: "Safar holatlari — safar maqsadi, davomiyligi va kelish davlati inobatga olinadi.", ru: "Обстоятельства поездки — учитываются цель, продолжительность поездки и страна прибытия.", en: "Travel circumstances — the purpose, duration of the trip and country of arrival are considered.", zh: "出行情况——考虑出行目的、时长及来访国家。" },
    { uz: "Huquqni muhofaza qiluvchi organlardan kelgan ma’lumotlar.", ru: "Сведения, поступившие от правоохранительных органов.", en: "Information received from law-enforcement bodies.", zh: "执法机关提供的信息。" },
  ]},
];

const DEKLARATSIYA_BLOCKS = [
  { t: "lead", x: {
    uz: "Yo‘lovchi bojxona deklaratsiyasi qog‘oz yoki elektron shaklda to‘ldiriladi. U 16 yoshga to‘lgan shaxslar tomonidan chegarani kesib o‘tishda tovar bilan birga taqdim etiladi.",
    ru: "Пассажирская таможенная декларация заполняется в бумажной или электронной форме. Она представляется лицами, достигшими 16 лет, одновременно с товаром при пересечении границы.",
    en: "The passenger customs declaration is filled out in paper or electronic form. It is submitted by persons aged 16 and over together with the goods when crossing the border.",
    zh: "旅客海关申报单可填写纸质或电子形式。由年满 16 岁者在过境时连同物品一并提交。",
  }},
  { t: "h", x: { uz: "Deklaratsiya quyidagilarga to‘ldiriladi:", ru: "Декларация заполняется на:", en: "A declaration is filled out for:", zh: "以下情况须填写申报单：" }},
  { t: "list", items: [
    { uz: "Bojsiz me’yordan oshadigan tovarlar.", ru: "товары сверх беспошлинной нормы;", en: "goods exceeding the duty-free limit;", zh: "超过免税限额的物品；" },
    { uz: "Yashash joyi o‘zgarganda olib kelinadigan shaxsiy mol-mulk (avtotransportdan tashqari).", ru: "личное имущество при смене места жительства (кроме автотранспорта);", en: "personal property upon change of residence (except vehicles);", zh: "变更居住地时携带的个人财产（车辆除外）；" },
    { uz: "Notijorat maqsaddagi transport vositalari (Bojxona kodeksi 158, 160-moddalar).", ru: "транспортные средства некоммерческого назначения (ст. 158, 160 Таможенного кодекса);", en: "non-commercial vehicles (Articles 158, 160 of the Customs Code);", zh: "非商业用途的运输工具（海关法典第 158、160 条）；" },
    { uz: "Yozma deklaratsiyalanishi lozim bo‘lgan naqd milliy valyuta va valyuta boyliklari.", ru: "наличная национальная валюта и валютные ценности, подлежащие письменному декларированию;", en: "cash national currency and currency valuables subject to written declaration;", zh: "须书面申报的本国现金及货币贵重物品；" },
    { uz: "Olib chiqishning cheklangan me’yoridan oshadigan tovarlar.", ru: "товары сверх ограниченной нормы вывоза;", en: "goods exceeding the restricted export limit;", zh: "超过出境限额的物品；" },
    { uz: "Alohida kuzatib boriladigan bagajdagi notijorat tovarlar.", ru: "товары некоммерческого назначения в отдельно следующем багаже;", en: "non-commercial goods in separately accompanied baggage;", zh: "单独随行行李中的非商业用途物品；" },
    { uz: "Mobil qurilmalar (O‘zbekistonda sotib olinib UZIMEI da ro‘yxatdan o‘tganlaridan tashqari).", ru: "мобильные устройства (кроме купленных в Узбекистане и зарегистрированных в UZIMEI);", en: "mobile devices (except those bought in Uzbekistan and registered in UZIMEI);", zh: "移动设备（在乌兹别克斯坦购买并已在 UZIMEI 登记的除外）；" },
    { uz: "Taqiq va/yoki cheklov belgilangan tovarlar.", ru: "товары, на которые установлены запреты и/или ограничения.", en: "goods subject to prohibitions and/or restrictions.", zh: "设有禁止和/或限制的物品。" },
  ]},
];

const DORI_BLOCKS = [
  { t: "lead", x: {
    uz: "Dori vositalari va tibbiy buyumlarni davlat ro‘yxatidan o‘tkazmasdan va bojxona rasmiylashtiruvisiz olib o‘tishga, agar ular shaxsiy foydalanish uchun mo‘ljallangan bo‘lsa, ruxsat beriladi.",
    ru: "Лекарственные средства и медицинские изделия разрешается перемещать без государственной регистрации и таможенного оформления, если они предназначены для личного пользования.",
    en: "Medicines and medical devices may be carried without state registration and customs clearance if they are intended for personal use.",
    zh: "如药品和医疗器械供个人使用，则准予在无须国家登记和海关手续的情况下携带。",
  }},
  { t: "h", x: { uz: "Hujjatsiz ruxsat etiladigan miqdor", ru: "Количество, разрешённое без документов", en: "Amount allowed without documents", zh: "无须文件即可携带的数量" }},
  { t: "list", items: [
    { uz: "Turli nomdagi 10 tagacha dori preparati, har biri uchun 5 o‘ramdan ortiq emas.", ru: "до 10 наименований лекарств, не более 5 упаковок каждого;", en: "up to 10 names of medicines, no more than 5 packs of each;", zh: "最多 10 种药品，每种不超过 5 盒；" },
    { uz: "5 birlikdan ortiq bo‘lmagan tibbiy buyumlar.", ru: "не более 5 единиц медицинских изделий.", en: "no more than 5 units of medical devices.", zh: "医疗器械不超过 5 件。" },
  ]},
  { t: "h", x: { uz: "Bir o‘ramdagi cheklovlar", ru: "Ограничения на одну упаковку", en: "Limits per package", zh: "每盒限量" }},
  { t: "list", items: [
    { uz: "Qattiq shakllar (tabletka, draje, granula, kukun, kapsula) — 100 birlikdan ortiq emas.", ru: "твёрдые формы (таблетки, драже, гранулы, порошки, капсулы) — не более 100 единиц;", en: "solid forms (tablets, dragees, granules, powders, capsules) — no more than 100 units;", zh: "固体剂型（片剂、糖衣丸、颗粒、粉剂、胶囊）——不超过 100 单位；" },
    { uz: "Eritma uchun kukunlar — 500 grammdan ortiq emas.", ru: "порошки для приготовления растворов — не более 500 г;", en: "powders for solutions — no more than 500 g;", zh: "用于配制溶液的粉剂——不超过 500 克；" },
    { uz: "Gomeopatik granulalar — 50 grammdan ortiq emas.", ru: "гомеопатические гранулы — не более 50 г;", en: "homeopathic granules — no more than 50 g;", zh: "顺势疗法颗粒——不超过 50 克；" },
    { uz: "Infuzion va og‘iz orqali eritmalar — 500 millilitrdan ortiq emas.", ru: "инфузионные и пероральные растворы — не более 500 мл;", en: "infusion and oral solutions — no more than 500 ml;", zh: "输液及口服溶液——不超过 500 毫升；" },
    { uz: "Inyeksiya eritmalari — 10 ampula yoki 10 flakondan ortiq emas.", ru: "растворы для инъекций — не более 10 ампул или 10 флаконов;", en: "injection solutions — no more than 10 ampoules or 10 vials;", zh: "注射溶液——不超过 10 安瓿或 10 瓶；" },
    { uz: "Tashqi dorilar — 200 ml yoki 200 grammdan ortiq emas.", ru: "наружные средства — не более 200 мл или 200 г.", en: "external medicines — no more than 200 ml or 200 g.", zh: "外用药——不超过 200 毫升或 200 克。" },
  ]},
  { t: "note", x: {
    uz: "Dori vositalari va tibbiy buyumlar ishlab chiqaruvchining o‘ramida bo‘lishi kerak. Giyohvandlik vositalari 7 sutkalik ehtiyojdan ortiq bo‘lmagan miqdorda, tibbiy hujjat asosida ruxsat etiladi. Psixotrop moddalar uchun — turli nomdagi 5 tagacha preparat, har biridan 2 o‘ramdan ortiq emas.",
    ru: "Лекарства и изделия должны быть в упаковке производителя. Наркотические средства разрешаются в количестве не более чем на 7 суток при наличии медицинского документа. Психотропные вещества — до 5 наименований, не более 2 упаковок каждого.",
    en: "Medicines and devices must be in the manufacturer's packaging. Narcotic drugs are allowed in an amount not exceeding a 7-day need with a medical document. Psychotropic substances — up to 5 names, no more than 2 packs of each.",
    zh: "药品和器械须为生产厂家包装。麻醉药品凭医疗文件准予携带不超过 7 天用量。精神药物——最多 5 种，每种不超过 2 盒。",
  }},
];

/* ---- Bo'limlar ---- */

const SECTIONS = {

  /* ====== AEROPORT — KIRISH ====== */
  "air-in-dutyfree": {
    parent: "air-in",
    icon: "💵",
    title: { uz: "Bojsiz olib kirish me’yorlari", ru: "Нормы беспошлинного ввоза", en: "Duty-free import limits", zh: "免税进境限额" },
    source: "VMQ; havo transporti normasi",
    related: ["air-in-quant", "air-in-currency", "calc"],
    blocks: [
      { t: "lead", x: {
        uz: "Havo transportida shaxsiy ehtiyoj uchun, notijorat maqsadda olib kiriladigan tovarlarning bojsiz me’yori — 1000 AQSH dollari.",
        ru: "Норма беспошлинного ввоза товаров для личных нужд воздушным транспортом — 1000 долларов США.",
        en: "The duty-free limit for goods for personal use carried by air is 1,000 US dollars.",
        zh: "通过航空运输携带供个人使用物品的免税限额为 1000 美元。",
      }},
      { t: "quote", x: {
        uz: "Ushbu me’yor xorijiy davlatda uch kalendar kundan kam bo‘lganda va bir kalendar oyda 3 va undan ortiq marta chegara kesib o‘tilganda qo‘llanilmaydi.",
        ru: "Эта норма не применяется при пребывании за рубежом менее трёх календарных дней и при пересечении границы 3 и более раз в течение одного календарного месяца.",
        en: "This limit does not apply when staying abroad for less than three calendar days, or when crossing the border 3 or more times in one calendar month.",
        zh: "在国外停留不足三个日历日，或在一个日历月内 3 次及以上跨境时，不适用该限额。",
      }},
      { t: "h", x: { uz: "Kalendar kun nima?", ru: "Что такое календарный день?", en: "What is a calendar day?", zh: "什么是日历日？" }},
      { t: "p", x: {
        uz: "Kalendar kun — uzluksiz 24 soatlik davr (00:00 dan 23:59 gacha). Hech qanday kun (dam olish, bayram) istisno qilinmaydi. Ya’ni chet davlatda to‘liq bo‘lgan kunlaringiz hisobga olinadi.",
        ru: "Календарный день — непрерывный 24-часовой период (с 00:00 до 23:59). Никакие дни (выходные, праздники) не исключаются. Учитываются полные дни пребывания за рубежом.",
        en: "A calendar day is a continuous 24-hour period (00:00 to 23:59). No days (weekends, holidays) are excluded. Your full days spent abroad are counted.",
        zh: "日历日是指连续 24 小时的时段（00:00 至 23:59）。任何日子（周末、节假日）均不排除。即计算您在国外停留的完整天数。",
      }},
      { t: "example", x: {
        uz: "Misol: 1-yanvar 10:00 da uchib ketdingiz, 5-yanvar 15:00 da qaytdingiz. Demak chet davlatda to‘liq 2, 3, 4-yanvar kunlari bo‘lgansiz (3 to‘liq kun) — imtiyoz olasiz. Agar 4-yanvarda qaytsangiz, imtiyoz qo‘llanmasdi.",
        ru: "Пример: вы вылетели 1 января в 10:00 и вернулись 5 января в 15:00. Значит, вы полностью пробыли за рубежом 2, 3 и 4 января (3 полных дня) — льгота предоставляется. Если бы вернулись 4 января, льгота не применялась бы.",
        en: "Example: you departed on 1 January at 10:00 and returned on 5 January at 15:00. So you were fully abroad on 2, 3 and 4 January (3 full days) — the allowance applies. Had you returned on 4 January, it would not apply.",
        zh: "例：您于 1 月 1 日 10:00 出发，1 月 5 日 15:00 返回。即您在 1 月 2、3、4 日完整地在国外停留（3 个完整日）——可享受优惠。若 1 月 4 日返回，则不适用。",
      }},
      { t: "h", x: { uz: "Kalendar oy nima?", ru: "Что такое календарный месяц?", en: "What is a calendar month?", zh: "什么是日历月？" }},
      { t: "p", x: {
        uz: "Kalendar oy — oyning 1-sanasidan so‘nggi sanasigacha bo‘lgan uzluksiz davr. Misol uchun, 1-yanvardan 31-yanvargacha.",
        ru: "Календарный месяц — непрерывный период с 1-го по последнее число месяца. Например, с 1 по 31 января.",
        en: "A calendar month is a continuous period from the 1st to the last day of the month. For example, from 1 to 31 January.",
        zh: "日历月是指从当月 1 日至最后一日的连续时段。例如 1 月 1 日至 1 月 31 日。",
      }},
    ],
  },

  "air-in-quant": {
    parent: "air-in",
    icon: "📦",
    title: { uz: "Miqdoriy cheklovlar", ru: "Количественные ограничения", en: "Quantitative limits", zh: "数量限制" },
    source: "Jismoniy shaxslar uchun miqdoriy normalar",
    related: ["air-in-dutyfree", "air-in-prohibited"],
    blocks: [
      { t: "lead", x: {
        uz: "Bojsiz me’yordan tashqari, ayrim tovarlar uchun miqdoriy normalar belgilangan. Bu normalardan ortig‘i deklaratsiyalanadi.",
        ru: "Помимо беспошлинной нормы, для отдельных товаров установлены количественные нормы. Превышение этих норм подлежит декларированию.",
        en: "In addition to the duty-free limit, quantitative norms are set for certain goods. Anything above these norms must be declared.",
        zh: "除免税限额外，对某些物品设有数量限额。超出部分须申报。",
      }},
      SHARED_QUANT_NORMS,
      { t: "note", x: {
        uz: "Diqqat: Alkogol va tamaki mahsulotlarini 21 yoshga to‘lmagan shaxslar olib kirishi taqiqlanadi.",
        ru: "Внимание: ввоз алкогольной и табачной продукции лицами младше 21 года запрещён.",
        en: "Note: import of alcohol and tobacco products by persons under 21 is prohibited.",
        zh: "注意：禁止未满 21 岁者携带酒精和烟草制品入境。",
      }},
    ],
  },

  "air-in-purpose": {
    parent: "air-in",
    icon: "🔍",
    title: { uz: "Tovar maqsadini aniqlash", ru: "Определение цели товара", en: "Determining the purpose of goods", zh: "判定物品用途" },
    source: "Tijorat / notijorat mezonlari",
    related: ["air-in-quant", "air-in-dutyfree"],
    blocks: TOVAR_MAQSAD_BLOCKS,
  },

  "air-in-currency": {
    parent: "air-in",
    icon: "💱",
    title: { uz: "Valyuta olib kirish", ru: "Ввоз валюты", en: "Importing currency", zh: "携带货币入境" },
    source: "Naqd valyuta normalari",
    related: ["air-out-currency", "air-in-declaration"],
    blocks: [
      { t: "quote", x: {
        uz: "Jismoniy shaxslar tomonidan naqd valyuta mablag‘larini O‘zbekistonga olib kirish cheklanmagan miqdorda amalga oshiriladi (bojxona nazorati qoidalariga rioya qilgan holda).",
        ru: "Ввоз физическими лицами наличных валютных средств в Узбекистан осуществляется без ограничения по сумме (при соблюдении правил таможенного контроля).",
        en: "Individuals may bring cash currency into Uzbekistan without any amount limit (subject to customs-control rules).",
        zh: "个人携带现金货币入境乌兹别克斯坦不限金额（须遵守海关监管规定）。",
      }},
      { t: "list", items: [
        { uz: "100 000 000 so‘m ekvivalentidan ortiq naqd valyuta yo‘lovchi bojxona deklaratsiyasini to‘ldirish orqali nazoratdan o‘tkaziladi.", ru: "наличная валюта свыше эквивалента 100 000 000 сумов проходит контроль с заполнением пассажирской таможенной декларации;", en: "cash currency over the equivalent of 100,000,000 soum is processed by filling out a passenger customs declaration;", zh: "超过 1 亿苏姆等值的现金货币须填写旅客海关申报单接受查验；" },
        { uz: "100 000 000 so‘mga teng yoki undan kam miqdor ham ixtiyoriy ravishda deklaratsiya qilinishi mumkin.", ru: "сумма, равная или меньше 100 000 000 сумов, также может быть задекларирована добровольно.", en: "an amount equal to or below 100,000,000 soum may also be declared voluntarily.", zh: "等于或低于 1 亿苏姆的金额也可自愿申报。" },
      ]},
    ],
  },

  "air-in-corridor": {
    parent: "air-in",
    icon: "🚦",
    title: { uz: "Yo‘lak tanlash tartibi", ru: "Выбор коридора", en: "Choosing a corridor", zh: "选择通道" },
    source: "Yashil / qizil yo‘lak",
    related: ["air-in-declaration", "air-in-quant"],
    blocks: [
      { t: "h", x: { uz: "🟢 “Yashil” yo‘lak", ru: "🟢 «Зелёный» коридор", en: "🟢 “Green” corridor", zh: "🟢 “绿色”通道" }},
      { t: "p", x: {
        uz: "Deklaratsiya qilinishi shart bo‘lgan tovarlar yo‘q bo‘lganda tanlanadi. Tovarlar og‘zaki deklaratsiyalanadi.",
        ru: "Выбирается при отсутствии товаров, подлежащих декларированию. Товары декларируются устно.",
        en: "Chosen when there are no goods subject to declaration. Goods are declared orally.",
        zh: "在没有须申报物品时选择。物品以口头方式申报。",
      }},
      { t: "h", x: { uz: "🔴 “Qizil” yo‘lak", ru: "🔴 «Красный» коридор", en: "🔴 “Red” corridor", zh: "🔴 “红色”通道" }},
      { t: "p", x: {
        uz: "Yozma deklaratsiyalanishi lozim bo‘lgan tovarlar bo‘lganda tanlanadi. Yo‘lovchi bojxona deklaratsiyasi to‘ldiriladi.",
        ru: "Выбирается при наличии товаров, подлежащих письменному декларированию. Заполняется пассажирская таможенная декларация.",
        en: "Chosen when there are goods subject to written declaration. A passenger customs declaration is filled out.",
        zh: "在有须书面申报物品时选择。须填写旅客海关申报单。",
      }},
      { t: "h", x: { uz: "“Yashil” yo‘lakdan o‘tib BO‘LMAYDIGAN tovarlar:", ru: "Товары, с которыми НЕЛЬЗЯ идти по «зелёному»:", en: "Goods that may NOT go through the “green” corridor:", zh: "不得走“绿色”通道的物品：" }},
      { t: "list", items: [
        { uz: "Olib kirish/chiqish taqiqlangan yoki cheklangan tovarlar.", ru: "товары, запрещённые или ограниченные к ввозу/вывозу;", en: "goods prohibited or restricted for import/export;", zh: "禁止或限制进出境的物品；" },
        { uz: "Bojsiz me’yordan yoki olib chiqish normasidan oshadigan tovarlar.", ru: "товары сверх беспошлинной нормы или нормы вывоза;", en: "goods exceeding the duty-free limit or the export limit;", zh: "超过免税限额或出境限额的物品；" },
        { uz: "Yozma deklaratsiyalanadigan naqd milliy va xorijiy valyuta.", ru: "наличная национальная и иностранная валюта, подлежащая письменному декларированию.", en: "cash national and foreign currency subject to written declaration.", zh: "须书面申报的本国及外国现金货币。" },
      ]},
      { t: "note", x: {
        uz: "Diqqat: “Yashil” yo‘lakdan deklaratsiya qilinishi lozim bo‘lgan tovar bilan o‘tgan shaxs qonunchilikka muvofiq javobgarlikka tortiladi. Gumon bo‘lganda bojxona xodimi nazorat shaklini qo‘llashga haqli.",
        ru: "Внимание: лицо, прошедшее по «зелёному» коридору с товаром, подлежащим декларированию, привлекается к ответственности. При подозрении сотрудник таможни вправе применить форму контроля.",
        en: "Note: a person who passes through the “green” corridor with goods subject to declaration is held liable under the law. In case of suspicion, a customs officer may apply a form of control.",
        zh: "注意：携带应申报物品走“绿色”通道者将依法承担责任。如有疑义，海关人员有权采取查验措施。",
      }},
    ],
  },

  "air-in-declaration": {
    parent: "air-in",
    icon: "📝",
    title: { uz: "Deklaratsiyani to‘ldirish tartibi", ru: "Порядок заполнения декларации", en: "How to fill out the declaration", zh: "申报单填写程序" },
    source: "Yo‘lovchi bojxona deklaratsiyasi",
    related: ["air-in-corridor", "air-in-currency"],
    blocks: DEKLARATSIYA_BLOCKS,
  },

  "air-in-mobile": {
    parent: "air-in",
    icon: "📱",
    title: { uz: "Mobil qurilmalarni rasmiylashtirish", ru: "Оформление мобильных устройств", en: "Registering mobile devices", zh: "移动设备办理" },
    source: "UZIMEI; telefon normasi",
    related: ["imei", "air-in-declaration"],
    blocks: [
      { t: "lead", x: {
        uz: "Mobil qurilmalar bojsiz me’yordan qat’iy nazar deklaratsiyalanishi lozim. O‘zbekistonda sotib olinib UZIMEI tizimida ro‘yxatdan o‘tgan qurilmalar bundan mustasno.",
        ru: "Мобильные устройства подлежат декларированию независимо от беспошлинной нормы. Исключение — устройства, купленные в Узбекистане и зарегистрированные в системе UZIMEI.",
        en: "Mobile devices must be declared regardless of the duty-free limit. The exception is devices bought in Uzbekistan and registered in the UZIMEI system.",
        zh: "移动设备无论是否在免税限额内均须申报。在乌兹别克斯坦购买并已在 UZIMEI 系统登记的设备除外。",
      }},
      { t: "quote", x: {
        uz: "Aviatsiya o‘tkazish punktlari orqali telefon apparati, shu jumladan mobil aloqa moduliga ega qurilmalar — 2 dona (har bir chegara kesib o‘tishda).",
        ru: "Через авиационные пункты пропуска: телефонные аппараты, включая устройства с модулем мобильной связи, — 2 штуки (при каждом пересечении границы).",
        en: "Through aviation checkpoints: telephone devices, including devices with a mobile communication module — 2 pieces (per each border crossing).",
        zh: "通过航空口岸：电话设备，包括带移动通信模块的设备——2 件（每次跨境）。",
      }},
    ],
  },

  "air-in-medicine": {
    parent: "air-in",
    icon: "💊",
    title: { uz: "Dori vositalari va tibbiy buyumlar", ru: "Лекарства и медицинские изделия", en: "Medicines and medical devices", zh: "药品及医疗器械" },
    source: "Shaxsiy foydalanish normalari",
    related: ["air-in-prohibited"],
    blocks: DORI_BLOCKS,
  },

  "air-in-prohibited": {
    parent: "air-in",
    icon: "⛔",
    title: { uz: "Taqiqlangan va cheklangan tovarlar", ru: "Запрещённые и ограниченные товары", en: "Prohibited and restricted goods", zh: "禁止及限制物品" },
    source: "Taqiq va cheklovlar ro‘yxati",
    related: ["air-in-medicine", "air-in-quant"],
    blocks: [
      { t: "lead", x: {
        uz: "Quyidagi tovarlar O‘zbekistonga olib kirishda taqiqlangan yoki cheklangan. Cheklangan tovarlar tegishli ruxsatnoma bilan olib kiriladi.",
        ru: "Следующие товары запрещены или ограничены к ввозу в Узбекистан. Ограниченные товары ввозятся при наличии соответствующего разрешения.",
        en: "The following goods are prohibited or restricted for import into Uzbekistan. Restricted goods are imported with the relevant permit.",
        zh: "以下物品禁止或限制进境乌兹别克斯坦。限制类物品须持相应许可证方可进口。",
      }},
      { t: "prohibited", set: "base" },
    ],
  },

  /* ====== AEROPORT — CHIQISH ====== */
  "air-out-dutyfree": {
    parent: "air-out",
    icon: "💵",
    title: { uz: "Bojsiz olib chiqish", ru: "Беспошлинный вывоз", en: "Duty-free export", zh: "免税出境" },
    source: "5000 USD normasi",
    related: ["air-out-quant", "air-out-currency", "air-out-jewelry"],
    blocks: [
      { t: "lead", x: {
        uz: "Jismoniy shaxslar qiymati 5 000 AQSH dollari ekvivalentigacha bo‘lgan tovarlarni bojxona deklaratsiyasisiz olib chiqishi mumkin (eksport boji belgilangan tovarlardan tashqari).",
        ru: "Физические лица могут вывозить товары стоимостью до эквивалента 5 000 долларов США без таможенной декларации (кроме товаров с установленной экспортной пошлиной).",
        en: "Individuals may export goods worth up to the equivalent of 5,000 US dollars without a customs declaration (except goods with an established export duty).",
        zh: "个人可在无须海关申报的情况下携带价值不超过 5000 美元等值的物品出境（已设定出口关税的物品除外）。",
      }},
      { t: "p", x: {
        uz: "Ushbu qiymat doirasidagi tijorat maqsadidagi tovarlar tovar kuzatuv hujjatlari asosida statistik maqsadlar uchun hisobga olinadi.",
        ru: "Товары коммерческого назначения в пределах этой стоимости учитываются для статистических целей на основании товаросопроводительных документов.",
        en: "Commercial goods within this value are recorded for statistical purposes based on accompanying documents.",
        zh: "在此价值范围内的商业用途物品，依据货物随附单据用于统计目的进行登记。",
      }},
    ],
  },

  "air-out-quant": {
    parent: "air-out",
    icon: "📦",
    title: { uz: "Olib chiqishda miqdoriy cheklovlar", ru: "Количественные ограничения при вывозе", en: "Quantitative limits on export", zh: "出境数量限制" },
    source: "Bojsiz olib chiqish normalari",
    related: ["air-out-dutyfree"],
    blocks: [
      { t: "lead", x: {
        uz: "Ayrim turdagi tovarlarni respublikadan bojsiz olib chiqishning miqdoriy normalari:",
        ru: "Количественные нормы беспошлинного вывоза отдельных видов товаров из республики:",
        en: "Quantitative norms for duty-free export of certain goods from the republic:",
        zh: "从共和国免税携带某些物品出境的数量限额：",
      }},
      { t: "norms", items: [
        { label: { uz: "Guruch", ru: "Рис", en: "Rice", zh: "大米" }, value: { uz: "≤ 3 kg", ru: "≤ 3 кг", en: "≤ 3 kg", zh: "≤ 3 公斤" }},
        { label: { uz: "Non-bulka mahsulotlari", ru: "Хлебобулочные изделия", en: "Bakery products", zh: "面包烘焙品" }, value: { uz: "≤ 5 kg", ru: "≤ 5 кг", en: "≤ 5 kg", zh: "≤ 5 公斤" }},
        { label: { uz: "Go‘sht va go‘sht mahsulotlari", ru: "Мясо и мясопродукты", en: "Meat and meat products", zh: "肉类及肉制品" }, value: { uz: "≤ 2 kg", ru: "≤ 2 кг", en: "≤ 2 kg", zh: "≤ 2 公斤" }},
        { label: { uz: "Shakar", ru: "Сахар", en: "Sugar", zh: "食糖" }, value: { uz: "≤ 2 kg", ru: "≤ 2 кг", en: "≤ 2 kg", zh: "≤ 2 公斤" }},
        { label: { uz: "O‘simlik yog‘i", ru: "Растительное масло", en: "Vegetable oil", zh: "植物油" }, value: { uz: "≤ 2 kg", ru: "≤ 2 кг", en: "≤ 2 kg", zh: "≤ 2 公斤" }},
        { label: { uz: "Yangi meva-sabzavot, uzum, poliz, dukkaklilar, quritilgan meva-sabzavot", ru: "Свежие овощи-фрукты, виноград, бахчевые, бобовые, сухофрукты", en: "Fresh fruit & veg, grapes, melons, legumes, dried produce", zh: "新鲜果蔬、葡萄、瓜类、豆类、干果蔬" }, value: { uz: "≤ 40 kg", ru: "≤ 40 кг", en: "≤ 40 kg", zh: "≤ 40 公斤" }},
      ]},
    ],
  },

  "air-out-currency": {
    parent: "air-out",
    icon: "💱",
    title: { uz: "Valyuta olib chiqish", ru: "Вывоз валюты", en: "Exporting currency", zh: "携带货币出境" },
    source: "Naqd valyuta normalari",
    related: ["air-in-currency", "air-out-jewelry"],
    blocks: [
      { t: "lead", x: {
        uz: "Ekvivalenti 100 000 000 so‘mga teng yoki undan kam naqd valyutani cheklovlarsiz olib chiqish mumkin. Belgilangan summadan ortiq naqd valyutani olib chiqishga umumiy holatda yo‘l qo‘yilmaydi.",
        ru: "Наличную валюту, эквивалентную 100 000 000 сумов или менее, можно вывозить без ограничений. Вывоз наличной валюты сверх установленной суммы в общем случае не допускается.",
        en: "Cash currency equal to or below the equivalent of 100,000,000 soum may be exported without restrictions. Exporting cash currency above the set amount is generally not allowed.",
        zh: "等于或低于 1 亿苏姆等值的现金货币可不受限制携带出境。超过规定金额的现金货币一般不准带出。",
      }},
      { t: "h", x: { uz: "Ortiq miqdorga ruxsat beriladigan holatlar", ru: "Случаи, когда вывоз сверх нормы допускается", en: "Cases where export above the norm is allowed", zh: "准予超额带出的情形" }},
      { t: "list", items: [
        { uz: "Rezidentlar — xizmat safariga ketayotgan Hukumat delegatsiyasi a’zolari uchun, Vazirlar Mahkamasi farmoyishi asosida.", ru: "резиденты — для членов правительственной делегации, выезжающих в командировку, на основании распоряжения Кабинета Министров;", en: "residents — for members of a government delegation on a business trip, by order of the Cabinet of Ministers;", zh: "居民——出差的政府代表团成员，依据内阁指令；" },
        { uz: "Norezidentlar — kirishda rasmiylashtirilgan deklaratsiyada ko‘rsatilgan, foydalanilmagan qoldiq mablag‘ doirasida.", ru: "нерезиденты — в пределах неиспользованного остатка средств, указанных в декларации при въезде;", en: "non-residents — within the unused balance of funds declared on entry;", zh: "非居民——在入境申报所列资金未使用余额范围内；" },
        { uz: "Xalqaro musobaqalar sovrindorlari — mablag‘ qonuniyligini tasdiqlovchi hujjat asosida.", ru: "призёры международных соревнований — на основании документа, подтверждающего законность средств;", en: "winners of international competitions — based on a document confirming the legality of funds;", zh: "国际比赛获奖者——凭证明资金合法性的文件；" },
        { uz: "“Termiz xalqaro savdo markazi” erkin zonasida zargarlik buyumlarini sotishdan olingan naqd chet el valyutasi doirasida.", ru: "в пределах наличной иностранной валюты, полученной от продажи ювелирных изделий в СЭЗ «Международный торговый центр Термез».", en: "within the cash foreign currency received from selling jewellery in the “Termez International Trade Centre” free zone.", zh: "在“铁尔梅兹国际贸易中心”自由区出售珠宝所得外币现金范围内。" },
      ]},
    ],
  },

  "air-out-jewelry": {
    parent: "air-out",
    icon: "💍",
    title: { uz: "Zargarlik buyumlarini olib chiqish", ru: "Вывоз ювелирных изделий", en: "Exporting jewellery", zh: "携带珠宝出境" },
    source: "Qimmatbaho metall normalari",
    related: ["air-out-currency", "air-out-declaration"],
    blocks: [
      { t: "quote", x: {
        uz: "Jismoniy shaxslarga og‘irligi 200 grammgacha kumushdan hamda 65 grammgacha oltin va boshqa qimmatbaho metallardan yasalgan tayyor zargarlik buyumlarini deklaratsiyasiz olib chiqishga ruxsat beriladi. Ushbu miqdordan ortig‘i yo‘lovchi bojxona deklaratsiyasi asosida olib chiqiladi.",
        ru: "Физическим лицам разрешается вывозить без декларации готовые ювелирные изделия из серебра весом до 200 граммов и из золота и других драгметаллов до 65 граммов. Свыше этого — на основании пассажирской таможенной декларации.",
        en: "Individuals may export, without a declaration, finished jewellery made of silver up to 200 grams and of gold and other precious metals up to 65 grams. Above this — based on a passenger customs declaration.",
        zh: "个人可在无须申报的情况下携带成品银饰最多 200 克、黄金及其他贵金属饰品最多 65 克出境。超出部分须凭旅客海关申报单带出。",
      }},
      { t: "p", x: {
        uz: "Tayyor zargarlik buyumi — ishlab chiqaruvchi tamg‘asi va asillik darajasi belgisiga ega, barcha texnologik bosqichlardan o‘tgan, davlat standartiga to‘liq javob beradigan buyum.",
        ru: "Готовое ювелирное изделие — изделие с клеймом производителя и пробирным клеймом, прошедшее все технологические этапы и полностью соответствующее госстандарту.",
        en: "Finished jewellery is an item bearing the manufacturer's stamp and hallmark, having passed all technological stages and fully meeting the state standard.",
        zh: "成品珠宝是指带有生产厂家印记和成色标记、经过全部工艺流程并完全符合国家标准的制品。",
      }},
    ],
  },

  "air-out-declaration": {
    parent: "air-out",
    icon: "📝",
    title: { uz: "Deklaratsiyani to‘ldirish tartibi", ru: "Порядок заполнения декларации", en: "How to fill out the declaration", zh: "申报单填写程序" },
    source: "Yo‘lovchi bojxona deklaratsiyasi",
    related: ["air-out-jewelry", "air-out-currency"],
    blocks: DEKLARATSIYA_BLOCKS,
  },

  "air-out-medicine": {
    parent: "air-out",
    icon: "💊",
    title: { uz: "Dori vositalari va tibbiy buyumlar", ru: "Лекарства и медицинские изделия", en: "Medicines and medical devices", zh: "药品及医疗器械" },
    source: "Shaxsiy foydalanish normalari",
    related: ["air-out-prohibited"],
    blocks: DORI_BLOCKS,
  },

  "air-out-prohibited": {
    parent: "air-out",
    icon: "⛔",
    title: { uz: "Taqiqlangan va cheklangan tovarlar", ru: "Запрещённые и ограниченные товары", en: "Prohibited and restricted goods", zh: "禁止及限制物品" },
    source: "Taqiq va cheklovlar ro‘yxati",
    related: ["air-out-medicine"],
    blocks: [
      { t: "lead", x: {
        uz: "Olib chiqishda ham quyidagi taqiq va cheklovlar ro‘yxati amal qiladi.",
        ru: "При вывозе также действует следующий перечень запретов и ограничений.",
        en: "The following list of prohibitions and restrictions also applies on export.",
        zh: "出境时同样适用以下禁止及限制清单。",
      }},
      { t: "prohibited", set: "base" },
    ],
  },

  /* ====== POCHTA / KURYERLIK ====== */
  "post-dutyfree": {
    parent: "post",
    icon: "💵",
    title: { uz: "Bojsiz olib kirish (jo‘natmalar)", ru: "Беспошлинный ввоз (отправления)", en: "Duty-free import (shipments)", zh: "免税进境（邮件）" },
    source: "Kuryer $200 / pochta $100",
    related: ["post-quant", "post-control", "calc"],
    blocks: [
      { t: "lead", x: {
        uz: "Xalqaro jo‘natmalar orqali bojsiz olib kirish normalari:",
        ru: "Нормы беспошлинного ввоза через международные отправления:",
        en: "Duty-free import limits for international shipments:",
        zh: "通过国际邮件免税进境的限额：",
      }},
      { t: "norms", items: [
        { label: { uz: "Xalqaro kuryerlik jo‘natmalari", ru: "Международные курьерские отправления", en: "International courier shipments", zh: "国际快递邮件" }, value: { uz: "200 USD", ru: "200 USD", en: "200 USD", zh: "200 美元" }},
        { label: { uz: "Xalqaro pochta jo‘natmalari", ru: "Международные почтовые отправления", en: "International postal shipments", zh: "国际邮政邮件" }, value: { uz: "100 USD", ru: "100 USD", en: "100 USD", zh: "100 美元" }},
      ]},
      { t: "p", x: {
        uz: "Kuryerlik jo‘natmalari uchun belgilangan bojsiz norma bir kalendar oy davomida qo‘llanadi (oyning 1-sanasidan so‘nggi sanasigacha).",
        ru: "Беспошлинная норма для курьерских отправлений применяется в течение одного календарного месяца (с 1-го по последнее число).",
        en: "The duty-free limit for courier shipments applies within one calendar month (from the 1st to the last day).",
        zh: "快递邮件的免税限额按一个日历月计算（从 1 日至最后一日）。",
      }},
    ],
  },

  "post-quant": {
    parent: "post",
    icon: "📦",
    title: { uz: "Miqdoriy cheklovlar", ru: "Количественные ограничения", en: "Quantitative limits", zh: "数量限制" },
    source: "Jo‘natmalar uchun normalar",
    related: ["post-dutyfree", "post-prohibited"],
    blocks: [
      { t: "lead", x: {
        uz: "Jo‘natmalar orqali bojsiz olib kiriladigan ayrim tovarlarning miqdoriy normalari:",
        ru: "Количественные нормы беспошлинного ввоза отдельных товаров через отправления:",
        en: "Quantitative norms for duty-free import of certain goods via shipments:",
        zh: "通过邮件免税进境某些物品的数量限额：",
      }},
      SHARED_QUANT_NORMS,
      { t: "note", x: {
        uz: "Diqqat: Alkogol va tamaki mahsulotlarini xalqaro pochta va kuryerlik jo‘natmalari orqali olib kirish taqiqlanadi.",
        ru: "Внимание: ввоз алкогольной и табачной продукции через международные почтовые и курьерские отправления запрещён.",
        en: "Note: import of alcohol and tobacco products via international postal and courier shipments is prohibited.",
        zh: "注意：禁止通过国际邮政和快递邮件携带酒精和烟草制品。",
      }},
    ],
  },

  "post-purpose": {
    parent: "post",
    icon: "🔍",
    title: { uz: "Tovar maqsadini aniqlash", ru: "Определение цели товара", en: "Determining the purpose of goods", zh: "判定物品用途" },
    source: "Tijorat / notijorat mezonlari",
    related: ["post-quant", "post-control"],
    blocks: [
      ...TOVAR_MAQSAD_BLOCKS,
      { t: "h", x: { uz: "Jo‘natmalar uchun qo‘shimcha mezonlar", ru: "Дополнительные критерии для отправлений", en: "Additional criteria for shipments", zh: "邮件的附加标准" }},
      { t: "list", items: [
        { uz: "Oluvchining (16 yoshga to‘lmagan farzandlari ham) yoshi tovar xususiyatiga mosligi.", ru: "соответствие возраста получателя (в т.ч. детей до 16 лет) характеру товара;", en: "whether the recipient's age (incl. children under 16) matches the nature of the goods;", zh: "收件人（含 16 岁以下子女）年龄与物品性质是否相符；" },
        { uz: "Bir manzildagi shaxslar tomonidan bir xil tovarni qayta-qayta olishi.", ru: "повторное получение однотипных товаров лицами по одному адресу;", en: "repeated receipt of same-type goods by persons at one address;", zh: "同一地址的人多次接收同类物品；" },
        { uz: "Deklaratsiyadagi qabul qiluvchi manzilning shaxsning haqiqiy ro‘yxat joyidan farqliligi.", ru: "несовпадение указанного в декларации адреса получателя с фактическим местом регистрации лица.", en: "a mismatch between the recipient address in the declaration and the person's actual registered place.", zh: "申报单中收件地址与本人实际登记地不一致。" },
      ]},
    ],
  },

  "post-control": {
    parent: "post",
    icon: "🛃",
    title: { uz: "Bojxona nazorati va rasmiylashtiruvi", ru: "Таможенный контроль и оформление", en: "Customs control and clearance", zh: "海关监管与办理" },
    source: "Jo‘natmalarni rasmiylashtirish",
    related: ["post-prohibited", "calc"],
    blocks: [
      { t: "lead", x: {
        uz: "Jo‘natma deklaratsiyasi tizimda ro‘yxatga olingach, har bir kuryerlik jo‘natmasi bo‘yicha xabarnoma qabul qiluvchiga YIDXP portali yoki mobil ilova orqali avtomatik yuboriladi.",
        ru: "После регистрации декларации в системе по каждому курьерскому отправлению получателю автоматически направляется уведомление через портал ЕПИГУ или мобильное приложение.",
        en: "After the shipment declaration is registered in the system, a notice for each courier shipment is automatically sent to the recipient via the single interactive state services portal or mobile app.",
        zh: "邮件申报在系统登记后，每件快递邮件的通知将通过统一互动政务服务门户或手机应用自动发送给收件人。",
      }},
      { t: "p", x: {
        uz: "Qabul qiluvchi xabarnomani tasdiqlaydi yoki rad etadi. Bu past/o‘rta xavfli jo‘natmalar uchun ixtiyoriy, yuqori xavfli jo‘natmalar uchun majburiy. Rad etish — jo‘natma uning nomiga emasligini va bojsiz normaga rozi emasligini bildiradi.",
        ru: "Получатель подтверждает или отклоняет уведомление. Для отправлений низкого/среднего риска это добровольно, для высокого — обязательно. Отклонение означает, что отправление направлено не ему и он не согласен с применением беспошлинной нормы.",
        en: "The recipient confirms or rejects the notice. For low/medium-risk shipments this is voluntary, for high-risk it is mandatory. Rejection means the shipment was not sent to them and they disagree with applying the duty-free limit.",
        zh: "收件人确认或拒绝通知。对低/中风险邮件为自愿，对高风险邮件为强制。拒绝表示该邮件并非寄给本人，且不同意适用免税限额。",
      }},
      { t: "h", x: { uz: "Vaqtincha saqlovga olinish sabablari", ru: "Причины помещения на временное хранение", en: "Reasons for temporary storage", zh: "暂存的原因" }},
      { t: "list", items: [
        { uz: "Bojxona to‘lovi to‘lanishi lozim bo‘lgan tovar aniqlanganda.", ru: "выявлены товары, по которым подлежат уплате таможенные платежи;", en: "goods subject to customs payments are found;", zh: "发现应缴纳海关税费的物品；" },
        { uz: "Tovar maqsadini aniqlashda nizoli holat yuzaga kelganda.", ru: "возник спорный вопрос при определении цели товара;", en: "a dispute arises when determining the purpose of goods;", zh: "判定物品用途时出现争议；" },
        { uz: "Namuna/sinama olinib, o‘rganish yakunlanmaganda.", ru: "взяты пробы/образцы и исследование не завершено;", en: "samples are taken and examination is unfinished;", zh: "已抽取样品而检验尚未完成；" },
        { uz: "Xavfni boshqarish tizimi topshirig‘i asosida.", ru: "по поручению системы управления рисками;", en: "by instruction of the risk management system;", zh: "依据风险管理系统的指令；" },
        { uz: "Hujjat/ma’lumot so‘ralib, tekshiruv yakunlanmaganda.", ru: "запрошены документы/сведения и проверка не завершена;", en: "documents/information are requested and the check is unfinished;", zh: "已索取文件/信息而核查尚未完成；" },
        { uz: "Bojxona ko‘rigi yoki ekspertizasi yakunlanmaganda.", ru: "таможенный досмотр или экспертиза не завершены.", en: "customs inspection or examination is unfinished.", zh: "海关查验或鉴定尚未完成。" },
      ]},
    ],
  },

  "post-prohibited": {
    parent: "post",
    icon: "⛔",
    title: { uz: "Jo‘natmalarda taqiqlangan tovarlar", ru: "Запрещённые в отправлениях товары", en: "Goods prohibited in shipments", zh: "邮件中禁止的物品" },
    source: "Taqiq va cheklovlar ro‘yxati",
    related: ["post-quant", "post-control"],
    blocks: [
      { t: "lead", x: {
        uz: "Jo‘natmalarda umumiy taqiq/cheklovlardan tashqari qo‘shimcha taqiqlar ham amal qiladi (pul belgilari, tirik hayvonlar, qimmatbaho buyumlar).",
        ru: "В отправлениях, помимо общих запретов/ограничений, действуют дополнительные запреты (денежные знаки, живые животные, ценности).",
        en: "In shipments, in addition to general prohibitions/restrictions, extra prohibitions apply (banknotes, live animals, valuables).",
        zh: "在邮件中，除一般禁止/限制外，还适用额外禁止（货币、活体动物、贵重物品）。",
      }},
      { t: "prohibited", set: "post" },
    ],
  },

  /* ====== MOBIL QURILMA / IMEI ====== */
  "imei": {
    parent: null,
    icon: "📲",
    title: { uz: "Mobil qurilmani deklaratsiyalash (IMEI)", ru: "Декларирование мобильного устройства (IMEI)", en: "Declaring a mobile device (IMEI)", zh: "移动设备申报（IMEI）" },
    source: "uzimei.customs.uz / imei.customs.uz",
    related: ["air-in-mobile", "calc"],
    blocks: [
      { t: "lead", x: {
        uz: "Mobil qurilma deklaratsiyada (yo‘lovchi yoki jo‘natma deklaratsiyasi) ko‘rsatilgan bo‘lsa, IMEI ni quyidagi usullar orqali ro‘yxatdan o‘tkazishingiz mumkin.",
        ru: "Если мобильное устройство указано в декларации (пассажирской или по отправлению), IMEI можно зарегистрировать следующими способами.",
        en: "If the mobile device is indicated in a declaration (passenger or shipment), you can register the IMEI in the following ways.",
        zh: "如移动设备已在申报单（旅客或邮件申报单）中列明，可通过以下方式登记 IMEI。",
      }},
      { t: "list", items: [
        { uz: "Rasmiylashtirilganlik holatini tekshirish: uzimei.customs.uz sayti orqali.", ru: "Проверка статуса оформления: через сайт uzimei.customs.uz.", en: "Check the clearance status: via uzimei.customs.uz.", zh: "查询办理状态：通过 uzimei.customs.uz 网站。" },
        { uz: "Agar qurilma rasmiylashtirilmagan bo‘lsa: imei.customs.uz orqali ariza qoldirishingiz mumkin (umumiy qiymatidan yagona bojxona to‘lovi undiriladi).", ru: "Если устройство не оформлено: можно подать заявку через imei.customs.uz (взимается единый таможенный платёж с общей стоимости).", en: "If the device is not cleared: you can submit an application via imei.customs.uz (a unified customs payment is charged on the total value).", zh: "若设备未办理：可通过 imei.customs.uz 提交申请（按总价值征收统一海关税费）。" },
      ]},
      { t: "linkcards", items: [
        { label: "uzimei.customs.uz", desc: { uz: "Rasmiylashtirilganlikni tekshirish", ru: "Проверка оформления", en: "Check clearance", zh: "查询办理情况" }, url: "https://uzimei.customs.uz" },
        { label: "imei.customs.uz", desc: { uz: "Ariza qoldirish", ru: "Подать заявку", en: "Submit an application", zh: "提交申请" }, url: "https://imei.customs.uz" },
      ]},
    ],
  },
};
