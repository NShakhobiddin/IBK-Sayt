/* ============================================================
   contacts.js — "Toshkent-AERO" IBK bog'lanish ma'lumotlari
   ============================================================ */

const CONTACTS = {
  title: { uz: "Bojxona organlari bilan bog‘lanish", ru: "Связь с таможенными органами", en: "Contact the customs authorities", zh: "联系海关机构" },
  lead: {
    uz: "“Toshkent-AERO” ixtisoslashtirilgan bojxona kompleksi (IBK) va uning bo‘limlari.",
    ru: "Специализированный таможенный комплекс «Ташкент-АЭРО» (СТК) и его подразделения.",
    en: "The “Tashkent-AERO” specialized customs complex and its units.",
    zh: "“塔什干-AERO”专业海关综合体及其下属部门。",
  },
  main: {
    name: { uz: "“Toshkent-AERO” IBK", ru: "СТК «Ташкент-АЭРО»", en: "“Tashkent-AERO” customs complex", zh: "“塔什干-AERO”海关综合体" },
    phone: "55-502-86-30",
    email: "toshkent_aero@customs.uz",
    address: {
      uz: "Toshkent shahar, Sergeli tumani, Qumariq ko‘chasi, 13/1",
      ru: "г. Ташкент, Сергелийский район, ул. Кумарик, 13/1",
      en: "Tashkent, Sergeli district, Qumariq street, 13/1",
      zh: "塔什干市，谢尔格利区，库马里克街 13/1 号",
    },
    map: "https://yandex.ru/navi/org/187089998812?si=1ykdnqfqkte5knkjtjdd6mz83w",
  },
  // Ichki (qisqa) raqamlar
  internal: {
    title: { uz: "IBK bo‘limlari ichki raqamlari", ru: "Внутренние номера подразделений СТК", en: "Internal numbers of the customs complex units", zh: "海关综合体各部门内线号码" },
    items: [
      { name: { uz: "Kadrlar bo‘limi", ru: "Отдел кадров", en: "HR department", zh: "人事部门" }, ext: "41-16, 41-19" },
      { name: { uz: "Tashkiliy nazorat", ru: "Организационный контроль", en: "Organizational control", zh: "组织监督" }, ext: "41-12, 41-56" },
      { name: { uz: "Bojxona nazorati", ru: "Таможенный контроль", en: "Customs control", zh: "海关监管" }, ext: "41-35, 41-36, 41-37" },
      { name: { uz: "Valyuta nazorati", ru: "Валютный контроль", en: "Currency control", zh: "货币监管" }, ext: "41-41" },
      { name: { uz: "Surishtiruv", ru: "Дознание", en: "Inquiry", zh: "侦查" }, ext: "41-45 … 41-50" },
      { name: { uz: "Bojxona to‘lovlari", ru: "Таможенные платежи", en: "Customs payments", zh: "海关税费" }, ext: "41-31, 41-32, 41-33" },
      { name: { uz: "TIFTN ekspert", ru: "Эксперт ТН ВЭД", en: "HS code expert", zh: "商品编码专家" }, ext: "41-39" },
      { name: { uz: "Tadbirkorlikni qo‘llab-quvvatlash", ru: "Поддержка предпринимательства", en: "Business support", zh: "企业支持" }, ext: "41-43" },
      { name: { uz: "Audit", ru: "Аудит", en: "Audit", zh: "审计" }, ext: "41-22, 41-25" },
    ],
  },
  // Postlar
  posts: [
    {
      name: { uz: "“Toshkent” xalqaro aeroporti CH/P", ru: "МП аэропорта «Ташкент» им. И. Каримова", en: "“Tashkent” airport customs post", zh: "“塔什干”机场海关" },
      address: { uz: "Toshkent, Sergeli tumani, Qumariq ko‘chasi, 4", ru: "Ташкент, Сергелийский р-н, ул. Кумарик, 4", en: "Tashkent, Sergeli district, Qumariq street, 4", zh: "塔什干，谢尔格利区，库马里克街 4 号" },
      lines: [
        { name: { uz: "Post boshlig‘i", ru: "Начальник поста", en: "Post chief", zh: "海关负责人" }, ext: "41-64" },
        { name: { uz: "Boshliq o‘rinbosari", ru: "Зам. начальника", en: "Deputy chief", zh: "副负责人" }, ext: "41-20, 41-17" },
        { name: { uz: "Smena boshlig‘i", ru: "Начальник смены", en: "Shift chief", zh: "值班负责人" }, ext: "41-30" },
        { name: { uz: "IMEI guruhi", ru: "Группа IMEI", en: "IMEI group", zh: "IMEI 小组" }, ext: "41-92, 41-84" },
      ],
    },
    {
      name: { uz: "“Avia yuklar” TIF", ru: "ТП «Авиагрузы»", en: "“Air cargo” customs post", zh: "“航空货运”海关" },
      address: { uz: "Toshkent, Sergeli tumani, Qumariq ko‘chasi", ru: "Ташкент, Сергелийский р-н, ул. Кумарик", en: "Tashkent, Sergeli district, Qumariq street", zh: "塔什干，谢尔格利区，库马里克街" },
      map: "https://yandex.ru/navi/org/155385460485?si=1ykdnqfqkte5knkjtjdd6mz83w",
      lines: [
        { name: { uz: "Post boshlig‘i", ru: "Начальник поста", en: "Post chief", zh: "海关负责人" }, ext: "41-68" },
        { name: { uz: "Smena xodimlari", ru: "Сотрудники смены", en: "Shift staff", zh: "值班人员" }, ext: "41-73" },
        { name: { uz: "Tranzit guruhi", ru: "Группа транзита", en: "Transit group", zh: "过境小组" }, ext: "41-74" },
      ],
    },
    {
      name: { uz: "“Elektron tijorat” TIF — CPT Pochta", ru: "ТП «Электронная торговля» — CPT Почта", en: "“E-commerce” customs post — CPT Post", zh: "“电子商务”海关 — CPT 邮政" },
      address: { uz: "Toshkent, Sergeli tumani, Qumariq ko‘chasi, 102", ru: "Ташкент, Сергелийский р-н, ул. Кумарик, 102", en: "Tashkent, Sergeli district, Qumariq street, 102", zh: "塔什干，谢尔格利区，库马里克街 102 号" },
      map: "https://yandex.ru/navi/org/54103356254?si=1ykdnqfqkte5knkjtjdd6mz83w",
      lines: [
        { name: { uz: "Post boshlig‘i", ru: "Начальник поста", en: "Post chief", zh: "海关负责人" }, ext: "44-11" },
        { name: { uz: "Xodimlar", ru: "Сотрудники", en: "Staff", zh: "工作人员" }, ext: "44-10, 44-13" },
        { name: { uz: "IMEI bo‘limi", ru: "Отдел IMEI", en: "IMEI unit", zh: "IMEI 部门" }, ext: "44-19" },
      ],
    },
    {
      name: { uz: "Xalqaro pochtamt", ru: "Международный почтамт", en: "International post office", zh: "国际邮局" },
      address: { uz: "Toshkent, Mirobod tumani, Turkiston ko‘chasi, 4", ru: "Ташкент, Мирободский р-н, ул. Туркистон, 4", en: "Tashkent, Mirobod district, Turkiston street, 4", zh: "塔什干，米罗巴德区，土耳其斯坦街 4 号" },
      map: "https://yandex.ru/navi/org/201613713922?si=1ykdnqfqkte5knkjtjdd6mz83w",
      lines: [
        { name: { uz: "Punkt boshlig‘i", ru: "Начальник пункта", en: "Office chief", zh: "站点负责人" }, ext: "44-22" },
        { name: { uz: "Xodimlar", ru: "Сотрудники", en: "Staff", zh: "工作人员" }, ext: "44-14, 44-15, 44-16" },
      ],
    },
  ],
};
