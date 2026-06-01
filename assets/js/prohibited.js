/* ============================================================
   prohibited.js — Taqiqlangan va cheklangan tovarlar ma'lumotlari
   status: "banned" (taqiqlangan) | "restricted" (cheklangan)
   Har bir maydon 4 tilda. Huquqiy manba (source) universal kodlar
   bo'lgani uchun barcha tillarda bir xil ko'rsatiladi.
   ============================================================ */

const PROHIBITED_BASE = [
  {
    status: "banned",
    name: {
      uz: "Giyohvandlik vositalari, psixotrop moddalar, prekursorlar",
      ru: "Наркотические средства, психотропные вещества, прекурсоры",
      en: "Narcotic drugs, psychotropic substances, precursors",
      zh: "麻醉药品、精神药物、前体化学品",
    },
    source: "VMQ 330-son, 1-band, 5–7-ilovalar",
    detail: {
      uz: "Ushbu moddalarning muomalasi cheklangan. To‘liq ro‘yxatlar 5–7-ilovalarda keltirilgan. Jismoniy shaxslar uchun shaxsiy tibbiy foydalanish istisnolari 191-son Nizomga muvofiq qo‘llanadi.",
      ru: "Оборот этих веществ ограничен. Полные списки приведены в приложениях 5–7. Исключения для личного медицинского применения физическими лицами применяются согласно Положению № 191.",
      en: "The circulation of these substances is restricted. Full lists are given in Annexes 5–7. Exceptions for personal medical use by individuals apply under Regulation No. 191.",
      zh: "这些物质的流通受到限制。完整清单见附件 5–7。个人医疗使用的例外情况依照第 191 号条例适用。",
    },
  },
  {
    status: "restricted",
    name: {
      uz: "Fuqaroviy qurol va uning o‘q-dorilari",
      ru: "Гражданское оружие и боеприпасы к нему",
      en: "Civilian weapons and ammunition",
      zh: "民用武器及其弹药",
    },
    source: "O‘RQ-550, 31–32-moddalar; VMQ 366-son",
    detail: {
      uz: "IIV ruxsatnomasi talab etiladi. Vaqtincha turgan chet el fuqarolari faqat ov va sport qurolini — tegishli taklifnoma/shartnoma va IIV ruxsatnomasi mavjud bo‘lsa — olib kirishi mumkin; qurol va ishlatilmagan o‘q-dorilar belgilangan muddatda qayta olib chiqilishi kerak. Import ruxsatnomasi 10 ish kunida ko‘riladi.",
      ru: "Требуется разрешение МВД. Временно пребывающие иностранцы могут ввозить только охотничье и спортивное оружие при наличии приглашения/договора и разрешения МВД; оружие и неиспользованные боеприпасы должны быть вывезены в установленный срок. Заявление на ввоз рассматривается в течение 10 рабочих дней.",
      en: "An MIA (Ministry of Internal Affairs) permit is required. Temporarily staying foreigners may import only hunting and sporting weapons with a relevant invitation/contract and an MIA permit; the weapon and unused ammunition must be re-exported within the set period. An import permit is reviewed within 10 working days.",
      zh: "需要内务部许可证。临时停留的外国人只能携带狩猎和运动武器入境，并须持有相应邀请函/合同及内务部许可证；武器和未使用的弹药须在规定期限内复运出境。进口许可证在 10 个工作日内审理。",
    },
  },
  {
    status: "restricted",
    name: {
      uz: "Radioelektron vositalar va yuqori chastotali qurilmalar",
      ru: "Радиоэлектронные средства и высокочастотные устройства",
      en: "Radio-electronic means and high-frequency devices",
      zh: "无线电电子设备及高频装置",
    },
    source: "VMQ 801-son 4-ilova; VMQ 417-son",
    detail: {
      uz: "EMMM ruxsatnomasi bilan olib kiriladi. Ro‘yxatda ayrim telefoniya apparatlari, sun’iy yo‘ldosh aloqa apparatlari, bazaviy stansiyalar, signal generatorlari, uchuvchisiz uchish apparatlari ham bor. REV import ruxsatnomasi 7 ish kunida, YuChQniki 5 ish kunida ko‘riladi; yig‘im undirilmaydi.",
      ru: "Ввозится с разрешением EMMM. В список входят, в частности, отдельные телефонные аппараты, аппараты спутниковой связи, базовые станции, генераторы сигналов, беспилотные летательные аппараты. Разрешение на ввоз РЭС рассматривается за 7 рабочих дней, ВЧУ — за 5; сбор не взимается.",
      en: "Imported with an EMMM permit. The list includes, among others, certain telephone devices, satellite communication devices, base stations, signal generators and unmanned aerial vehicles. An import permit for radio-electronic means is reviewed in 7 working days, for high-frequency devices in 5; no fee is charged.",
      zh: "需凭 EMMM 许可证进口。清单中包括某些电话设备、卫星通信设备、基站、信号发生器、无人机等。无线电电子设备进口许可证在 7 个工作日内审理，高频装置在 5 个工作日内审理；不收取费用。",
    },
  },
  {
    status: "restricted",
    name: {
      uz: "Diniy mazmundagi materiallar",
      ru: "Материалы религиозного содержания",
      en: "Materials of religious content",
      zh: "宗教内容材料",
    },
    source: "VMQ 180-son Nizom 3, 9–12, 16–19, 27–30-bandlar",
    detail: {
      uz: "Ijobiy dinshunoslik ekspertizasi xulosasidan keyin olib kiriladi. Jismoniy shaxslar o‘z ehtiyoji va ilmiy-tadqiqot uchun har bir nomdan 3 nusxadan oshmagan miqdorda olib kirishi mumkin. Ekspertiza odatda 10 ish kunida, zaruratda 20 ish kunigacha o‘tkaziladi.",
      ru: "Ввозятся после получения положительного заключения религиоведческой экспертизы. Физические лица могут ввозить для личных нужд и научных исследований не более 3 экземпляров каждого наименования. Экспертиза обычно проводится за 10 рабочих дней, при необходимости — до 20.",
      en: "Imported after a positive religious-studies expert opinion. Individuals may import up to 3 copies of each title for personal needs and research. The expert review usually takes 10 working days, up to 20 if necessary.",
      zh: "经宗教学鉴定获得肯定结论后方可入境。个人因自身需要及科研用途，每种名称不得超过 3 份。鉴定通常在 10 个工作日内完成，必要时可延长至 20 个工作日。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Ijobiy xulosasiz va gologrammasiz diniy materiallar",
      ru: "Религиозные материалы без положительного заключения и голограммы",
      en: "Religious materials without a positive opinion and hologram",
      zh: "无肯定结论及无全息标记的宗教材料",
    },
    source: "VMQ 180-son Nizom 11-band",
    detail: {
      uz: "Ijobiy xulosa olinmagan va gologramma bilan tamg‘alanmagan materiallar hududga olib kirilishi taqiqlanadi.",
      ru: "Ввоз материалов без положительного заключения и не маркированных голограммой запрещён.",
      en: "Importing materials without a positive opinion and not marked with a hologram is prohibited.",
      zh: "未获肯定结论且未加贴全息标记的材料禁止入境。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Saqlanishi taqiqlangan yovvoyi hayvonlar",
      ru: "Дикие животные, содержание которых запрещено",
      en: "Wild animals prohibited from being kept",
      zh: "禁止饲养的野生动物",
    },
    source: "VMQ 736-son 1-ilova; VMQ 821-son",
    detail: {
      uz: "736-sonning 1-ilovasida zaharli va yirtqich hayvonlarning keng ro‘yxati berilgan. 821-son hujjatda mazkur ro‘yxatdagi yovvoyi hayvonlarni jismoniy shaxslar tomonidan O‘zbekiston hududiga olib kirish taqiqlanishi belgilangan.",
      ru: "В приложении 1 к № 736 приведён обширный список ядовитых и хищных животных. Документ № 821 прямо устанавливает запрет на ввоз этих диких животных физическими лицами на территорию Узбекистана.",
      en: "Annex 1 to No. 736 provides a broad list of venomous and predatory animals. Document No. 821 directly prohibits individuals from importing these wild animals into Uzbekistan.",
      zh: "第 736 号附件 1 列出了大量有毒和猛兽类动物名单。第 821 号文件明确规定，禁止个人将该名单上的野生动物携带进入乌兹别克斯坦境内。",
    },
  },
  {
    status: "restricted",
    name: {
      uz: "Mineral o‘g‘itlar va o‘simliklarni himoya qilish kimyoviy vositalari",
      ru: "Минеральные удобрения и химические средства защиты растений",
      en: "Mineral fertilizers and chemical plant-protection agents",
      zh: "矿物肥料及植物保护化学制剂",
    },
    source: "VMQ 481-son, 1-ilova 3–6, 9-bandlar; 2-ilova 5–8-bandlar",
    detail: {
      uz: "Agentlik ruxsatnomasi talab etiladi. O‘z ehtiyoji uchun import qilgan jismoniy shaxs undan faqat o‘z yer maydonida foydalanishi mumkin; ulgurji/chakana savdo taqiqlanadi. Ruxsatnoma amal qilish muddati 12 oy.",
      ru: "Требуется разрешение Агентства. Физическое лицо, ввезшее для личных нужд, может использовать их только на собственном земельном участке; оптовая/розничная торговля запрещена. Срок действия разрешения — 12 месяцев.",
      en: "An Agency permit is required. An individual who has imported them for personal needs may use them only on their own land plot; wholesale/retail trade is prohibited. The permit is valid for 12 months.",
      zh: "需要主管局许可证。因个人需要进口的人只能在自己的土地上使用；禁止批发/零售。许可证有效期为 12 个月。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "O‘g‘it va kimyoviy vositalarni qo‘l yuki, bagaj, pochta orqali olib kirish",
      ru: "Ввоз удобрений и химсредств в ручной клади, багаже, по почте",
      en: "Importing fertilizers and chemicals via hand luggage, baggage, mail",
      zh: "通过手提行李、托运行李、邮件携带肥料和化学制剂",
    },
    source: "VMQ 481-son 9-band “o” kichik bandi",
    detail: {
      uz: "Xorijiy mamlakatlardan qo‘l yuki yoki bagajda, pochta jo‘natmalarida yoki boshqa yuk bilan olib o‘tish taqiqlanadi. Faqat tajriba-sinov uchun ruxsatnoma asosida pochta jo‘natmasi mumkin.",
      ru: "Перемещение из зарубежных стран в ручной клади или багаже, в почтовых отправлениях или с иным грузом запрещено. Почтовое отправление возможно только на основании разрешения для опытно-испытательных целей.",
      en: "Carriage from foreign countries in hand luggage or baggage, in postal items or with other cargo is prohibited. A postal shipment is possible only on the basis of a permit for experimental/testing purposes.",
      zh: "禁止从国外通过手提行李、托运行李、邮件或随其他货物携带。仅在持有试验用途许可证的情况下方可邮寄。",
    },
  },
  {
    status: "restricted",
    name: {
      uz: "Madaniy boyliklar",
      ru: "Культурные ценности",
      en: "Cultural valuables",
      zh: "文化珍品",
    },
    source: "“Madaniy boyliklar...” Qonun 5-modda; VMQ 131-son",
    detail: {
      uz: "Import va eksport yagona davlat tartibiga, ro‘yxatga olish va ekspertizaga bo‘ysunadi. Miqdoriy limit ushbu aktlarda aniqlanmagan.",
      ru: "Ввоз и вывоз подчиняются единому государственному порядку, регистрации и экспертизе. Количественный лимит данными актами не установлен.",
      en: "Import and export are subject to a unified state procedure, registration and expert examination. A quantitative limit is not set by these acts.",
      zh: "进出口须遵守统一的国家程序、登记和鉴定。这些法令未设定数量限额。",
    },
  },
  {
    status: "restricted",
    name: {
      uz: "Hayvonotga mansub oziq-ovqat mahsulotlari",
      ru: "Пищевые продукты животного происхождения",
      en: "Food products of animal origin",
      zh: "动物源性食品",
    },
    source: "PQ-4508, 1-band",
    detail: {
      uz: "Jismoniy shaxslar tomonidan qo‘l yuki, kuzatib borilayotgan bagaj va pochta jo‘natmalari orqali olib kiriladigan hayvonotga mansub oziq-ovqat mahsulotlarida ishlab chiqarish o‘rovi (zavod qadog‘i) majburiy.",
      ru: "Для пищевых продуктов животного происхождения, ввозимых физлицами в ручной клади, сопровождаемом багаже и почтовых отправлениях, обязательна заводская упаковка производителя.",
      en: "Food products of animal origin imported by individuals in hand luggage, accompanied baggage and postal items must be in the manufacturer's original packaging.",
      zh: "个人通过手提行李、随身行李和邮件携带的动物源性食品必须为生产厂家的原厂包装。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Nikotinli suyuqliklar va moslamalar (elektron sigaretalar)",
      ru: "Никотиносодержащие жидкости и устройства (электронные сигареты)",
      en: "Nicotine liquids and devices (e-cigarettes)",
      zh: "含尼古丁液体及装置（电子烟）",
    },
    source: "O‘RQ-844 (24.05.2023), 37-modda",
    detail: {
      uz: "Olib kirish va realizatsiya taqiqlanadi. Me’yor va ruxsatnoma aniqlanmagan.",
      ru: "Ввоз и реализация запрещены. Норма и разрешение не предусмотрены.",
      en: "Import and sale are prohibited. No norm or permit is provided.",
      zh: "禁止进口和销售。未设定限额和许可。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Portlovchi materiallar va masofadan portlatish qurilmalari",
      ru: "Взрывчатые материалы и устройства дистанционного подрыва",
      en: "Explosive materials and remote detonation devices",
      zh: "爆炸物及远程引爆装置",
    },
    source: "VMQ 213 (06.05.2004), 2-band",
    detail: {
      uz: "Jismoniy shaxslar tomonidan olib kirish va h.k. qat’iyan taqiqlangan (kuzatilmaydigan bagajda ham).",
      ru: "Ввоз физическими лицами и т.п. категорически запрещён (в том числе в несопровождаемом багаже).",
      en: "Import by individuals, etc., is strictly prohibited (including in unaccompanied baggage).",
      zh: "严禁个人携带进口等（包括无人陪同行李）。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Pul yutug‘i bo‘lgan o‘yin avtomatlari",
      ru: "Игровые автоматы с денежным выигрышем",
      en: "Gambling machines with cash payout",
      zh: "带现金奖励的游戏机",
    },
    source: "VMQ 176 (16.08.2007), 1-band",
    detail: {
      uz: "Umuman olib kirish taqiqlanadi; bojxona qo‘mitasi nazorat qiladi.",
      ru: "Ввоз полностью запрещён; контроль осуществляет таможенный комитет.",
      en: "Import is fully prohibited; controlled by the customs committee.",
      zh: "完全禁止进口；由海关委员会监管。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Pirotexnika vositalari (II xavflilik sinfi)",
      ru: "Пиротехнические изделия (II класс опасности)",
      en: "Pyrotechnic articles (hazard class II)",
      zh: "烟花爆竹制品（II 类危险品）",
    },
    source: "VMQ 309 (10.12.2009), 1-band",
    detail: {
      uz: "Olib kirish, ishlab chiqarish, saqlash, realizatsiya va foydalanish vaqtincha taqiqlangan.",
      ru: "Ввоз, производство, хранение, реализация и использование временно запрещены.",
      en: "Import, production, storage, sale and use are temporarily prohibited.",
      zh: "暂时禁止进口、生产、储存、销售和使用。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Portativ lazerli nur tarqatuvchilar (TN kod 9013 20 0000)",
      ru: "Портативные лазерные излучатели (код ТН 9013 20 0000)",
      en: "Portable laser emitters (HS code 9013 20 0000)",
      zh: "便携式激光发射器（HS 编码 9013 20 0000）",
    },
    source: "VMQ 50 (20.02.2013), 1-band",
    detail: {
      uz: "2013-yil 1-martdan chetdan kirishi va savdosi taqiqlangan.",
      ru: "С 1 марта 2013 года ввоз и торговля запрещены.",
      en: "Import and trade prohibited since 1 March 2013.",
      zh: "自 2013 年 3 月 1 日起禁止进口和销售。",
    },
  },
  {
    status: "restricted",
    name: {
      uz: "Uchuvchisiz uchish apparatlari (dronlar)",
      ru: "Беспилотные летательные аппараты (дроны)",
      en: "Unmanned aerial vehicles (drones)",
      zh: "无人驾驶航空器（无人机）",
    },
    source: "VMQ 658 (15.11.2022), 3-ilova",
    detail: {
      uz: "Umumiy tartibda Fuqarolik aviatsiya agentligi ruxsatnomasi talab qilinadi. Olib kirish bojxona nazorati ostida; noqonuniy olib kirish taqiqlanadi.",
      ru: "В общем порядке требуется разрешение Агентства гражданской авиации. Ввоз под таможенным контролем; незаконный ввоз запрещён.",
      en: "As a general rule, a permit from the Civil Aviation Agency is required. Import is under customs control; illegal import is prohibited.",
      zh: "一般情况下需要民用航空局许可证。进口受海关监管；禁止非法进口。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Ishlatilgan induksion pechlar va kameralar (3 yildan oshgan)",
      ru: "Б/у индукционные печи и камеры (старше 3 лет)",
      en: "Used induction furnaces and chambers (over 3 years old)",
      zh: "二手感应炉及炉室（超过 3 年）",
    },
    source: "VMQ 999 (14.12.2019), 1-band",
    detail: {
      uz: "2020-yil 1-martdan boshlab shaxsiy import uchun 3 yildan ortiq ishlatilganini olib kirish taqiqlanadi.",
      ru: "С 1 марта 2020 года ввоз для личного импорта бывших в эксплуатации более 3 лет запрещён.",
      en: "Since 1 March 2020, importing those used for more than 3 years for personal import is prohibited.",
      zh: "自 2020 年 3 月 1 日起，禁止个人进口使用超过 3 年的设备。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Nodavlat ekspertizadan o‘tmagan diniy materiallar (gologrammasiz)",
      ru: "Религиозные материалы без экспертизы (без голограммы)",
      en: "Religious materials without expert review (no hologram)",
      zh: "未经鉴定的宗教材料（无全息标记）",
    },
    source: "VMQ 180 (14.04.2022), Nizom 11-band",
    detail: {
      uz: "Ijobiy dinshunoslik xulosasi yo‘q va gologrammasiz materiallarni olib kirish taqiqlanadi (saqlash, realizatsiya ham taqiq ostida).",
      ru: "Ввоз материалов без положительного религиоведческого заключения и без голограммы запрещён (хранение и реализация также под запретом).",
      en: "Importing materials without a positive religious-studies opinion and without a hologram is prohibited (storage and sale are also banned).",
      zh: "禁止进口无肯定宗教学结论且无全息标记的材料（储存、销售亦在禁止之列）。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Ekstremistik, terrorchilik, zo‘ravonlik, irqchilik va pornografik materiallar",
      ru: "Экстремистские, террористические, насильственные, расистские и порнографические материалы",
      en: "Extremist, terrorist, violent, racist and pornographic materials",
      zh: "极端主义、恐怖主义、暴力、种族主义及色情材料",
    },
    source: "PF-5286 (15.12.2017), 2-ilova",
    detail: {
      uz: "Bunday mazmundagi materiallar importi va tarqatilishi umuman taqiqlangan.",
      ru: "Импорт и распространение материалов такого содержания полностью запрещены.",
      en: "Import and distribution of materials of such content are completely prohibited.",
      zh: "完全禁止进口和传播此类内容的材料。",
    },
  },
];

/* Pochta/kuryerlik jo'natmalari uchun qo'shimcha taqiqlar (20–22) */
const PROHIBITED_POST_EXTRA = [
  {
    status: "banned",
    name: {
      uz: "O‘zbekiston pul belgilari va xorijiy valyuta (jo‘natmalarda)",
      ru: "Денежные знаки Узбекистана и иностранная валюта (в отправлениях)",
      en: "Uzbek banknotes and foreign currency (in shipments)",
      zh: "乌兹别克斯坦货币及外币（邮件中）",
    },
    source: "AV-2219 3-ilova, 1",
    detail: {
      uz: "Markaziy bank va uning muassasalari tomonidan yuboriladiganlaridan tashqari, pul belgilari va valyutani jo‘natmalarda yuborish taqiqlanadi.",
      ru: "Кроме отправляемых Центральным банком и его учреждениями, пересылка денежных знаков и валюты в отправлениях запрещена.",
      en: "Except for those sent by the Central Bank and its institutions, sending banknotes and currency in shipments is prohibited.",
      zh: "除中央银行及其机构寄送的以外，禁止在邮件中寄送货币和外币。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Tirik hayvonlar (jo‘natmalarda)",
      ru: "Живые животные (в отправлениях)",
      en: "Live animals (in shipments)",
      zh: "活体动物（邮件中）",
    },
    source: "AV-2219 3-ilova, 1",
    detail: {
      uz: "Tirik hayvonlarni xalqaro pochta va kuryerlik jo‘natmalari orqali yuborish taqiqlanadi.",
      ru: "Пересылка живых животных в международных почтовых и курьерских отправлениях запрещена.",
      en: "Sending live animals via international postal and courier shipments is prohibited.",
      zh: "禁止通过国际邮政和快递邮件寄送活体动物。",
    },
  },
  {
    status: "banned",
    name: {
      uz: "Qimmatbaho buyumlar (qiymati e’lon qilinmagan posilkalarda)",
      ru: "Ценные предметы (в посылках без объявленной ценности)",
      en: "Valuables (in parcels without declared value)",
      zh: "贵重物品（未申报价值的包裹中）",
    },
    source: "AV-2219 3-ilova, 4",
    detail: {
      uz: "Qiymati e’lon qilinmagan posilkalarda tangalar, bank/kredit chiptalari, yo‘l cheklari, platina, oltin yoki kumush buyumlar, ishlov berilmagan qimmatbaho toshlar, zargarlik buyumlari va boshqa qimmatbaho predmetlarni jo‘natish taqiqlanadi.",
      ru: "В посылках без объявленной ценности запрещена пересылка монет, банковских/кредитных билетов, дорожных чеков, изделий из платины, золота или серебра, необработанных драгоценных камней, ювелирных изделий и иных ценных предметов.",
      en: "In parcels without a declared value it is prohibited to send coins, bank/credit notes, traveller's cheques, items made of platinum, gold or silver, unworked precious stones, jewellery and other valuables.",
      zh: "在未申报价值的包裹中，禁止寄送硬币、银行/信用券、旅行支票、铂金、黄金或白银制品、未加工的宝石、珠宝及其他贵重物品。",
    },
  },
];
