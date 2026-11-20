export type PageSeo = {
  title: string;
  description: string;
  snippet: string;
};

/** Canonical marketing SEO: meta title, meta description, snippet (kısa açıklama).
 * GSC 2026-11: yorumlar, kapalı bel fıtığı, ameliyat ücreti, marka aramalarına göre güncellendi.
 */
export const PAGE_SEO = {
  home: {
    title:
      "Op. Dr. Eyüp Baykara | Kapalı Bel Fıtığı Ameliyatı | Endoskopik Bel Ameliyatı",
    description:
      "Op. Dr. Eyüp Baykara — kapalı bel fıtığı ameliyatı ve endoskopik bel ameliyatı. Bel–boyun fıtığı, kanal darlığı. Aynı gün taburcu, Silivri / İstanbul.",
    snippet:
      "Eyüp Baykara ile kapalı bel fıtığı ameliyatı ve endoskopik omurga cerrahisi: hızlı iyileşme, minimal kesi.",
  },
  hakkimizda: {
    title: "Eyüp Baykara Kimdir? | Op. Dr. Eyüp Baykara",
    description:
      "Eyüp Baykara kimdir? Op. Dr. Eyüp Baykara — beyin ve sinir cerrahisi uzmanı. Kapalı bel fıtığı, boyun fıtığı ve kanal darlığı ameliyatı. Silivri Anadolu Hastanesi.",
    snippet:
      "Op. Dr. Eyüp Baykara: full endoskopik omurga cerrahisi uzmanı. Eğitim, klinik ve tedavi alanları.",
  },
  iletisim: {
    title: "Op. Dr. Eyüp Baykara İletişim | Randevu",
    description:
      "Op. Dr. Eyüp Baykara randevu ve iletişim: Özel Silivri Anadolu Hastanesi. Tel 0530 783 72 24 — WhatsApp veya form ile yazın. Ameliyat ücreti bilgisi için ulaşın.",
    snippet:
      "Randevu, ameliyat ücreti sorusu ve şikâyet/geri bildirim için telefon, WhatsApp veya form.",
  },
  hastaDeneyimleri: {
    title:
      "Op. Dr. Eyüp Baykara Yorumları | Dr. Eyüp Baykara Yorumlar",
    description:
      "Op. Dr. Eyüp Baykara yorumları ve hasta videoları. Dr. Eyüp Baykara yorumlar, Google değerlendirmeleri ve kapalı bel fıtığı ameliyatı sonrası gerçek deneyimler.",
    snippet:
      "Eyüp Baykara yorumları: ameliyat sonrası videolar ve hasta hikâyeleri — gerçek deneyimleri izleyin.",
  },
  blog: {
    title:
      "Kapalı Bel Fıtığı Ameliyatı Blog | Op. Dr. Eyüp Baykara",
    description:
      "Kapalı bel fıtığı ameliyatı, Eyüp Baykara yorumları, ameliyat ücreti ve bel fıtığı rehberi. Op. Dr. Eyüp Baykara blog yazıları.",
    snippet:
      "Bel fıtığı, yorumlar, ameliyat ücreti ve endoskopik cerrahi hakkında güncel yazılar.",
  },
  hizmetler: {
    title: "Kapalı Bel Fıtığı Ameliyatı | Tedaviler | Op. Dr. Eyüp Baykara",
    description:
      "Kapalı bel fıtığı ameliyatı, boyun fıtığı ve kanal darlığı. Op. Dr. Eyüp Baykara ile endoskopik omurga tedavileri — Silivri / İstanbul.",
    snippet:
      "Kapalı bel fıtığı ameliyatı ve full endoskopik tedavi seçenekleri.",
  },
  cerezler: {
    title: "Çerez Politikası | Op. Dr. Eyüp Baykara",
    description:
      "Op. Dr. Eyüp Baykara web sitesinde kullanılan çerezler, KVKK/GDPR uyumlu kategori bazlı onay ve tercihlerinizi nasıl yöneteceğiniz.",
    snippet:
      "KVKK ve GDPR kapsamında çerezleri kategori bazlı yönetebilirsiniz. Zorunlu çerezler her zaman aktiftir; diğerleri yalnızca onayınızla çalışır.",
  },
} as const satisfies Record<string, PageSeo>;

export const SITE_KEYWORDS = [
  "Op. Dr. Eyüp Baykara",
  "Eyüp Baykara",
  "dr eyüp baykara",
  "Op. Dr. Eyüp Baykara yorumları",
  "dr eyüp baykara yorumlar",
  "eyüp baykara yorumlar",
  "dr eyüp baykara ameliyat ücreti",
  "kapalı bel fıtığı ameliyatı",
  "endoskopik bel ameliyatı",
  "kapalı bel ameliyatı",
  "bel fıtığı ameliyatı",
  "eyüp baykara şikayet",
  "kapalı boyun fıtığı ameliyatı",
  "kanal darlığı ameliyatı",
  "Silivri beyin cerrahisi",
] as const;
