// Shared, short, repeated-everywhere UI strings — navigation labels, button
// labels, common info labels. Page-specific prose (hero copy, paragraphs,
// pull-quotes) lives next to each page instead of here — see the `copy`
// object at the top of each src/content-pages/*.astro file. Splitting it
// this way means a future editor translating one page's wording doesn't
// have to hunt through one giant sitewide file, while strings that
// genuinely repeat (nav, buttons) still have exactly one source of truth.
import type { LocalizedText } from './languages';

export const nav: Record<'accueil' | 'menu' | 'reservation' | 'aPropos' | 'avis' | 'faq' | 'contact', LocalizedText> = {
  accueil: { fr: 'Accueil', en: 'Home', ar: 'الرئيسية' },
  menu: { fr: 'Menu', en: 'Menu', ar: 'القائمة' },
  reservation: { fr: 'Réserver', en: 'Reserve', ar: 'احجز' },
  aPropos: { fr: 'À propos', en: 'About', ar: 'من نحن' },
  avis: { fr: 'Avis', en: 'Reviews', ar: 'التقييمات' },
  faq: { fr: 'FAQ', en: 'FAQ', ar: 'الأسئلة الشائعة' },
  contact: { fr: 'Contact', en: 'Contact', ar: 'اتصل بنا' },
};

export const common = {
  commander: { fr: 'Commander', en: 'Order', ar: 'اطلب الآن' } satisfies LocalizedText,
  voirLeMenu: { fr: 'Voir le menu', en: 'View the menu', ar: 'شاهد القائمة' } satisfies LocalizedText,
  menuComplet: { fr: 'Menu complet', en: 'Full menu', ar: 'القائمة الكاملة' } satisfies LocalizedText,
  decouvrirLeMenu: { fr: 'Découvrir le menu', en: 'Discover the menu', ar: 'اكتشف القائمة' } satisfies LocalizedText,
  voirLeMenuComplet: { fr: 'Voir le menu complet', en: 'See the full menu', ar: 'شاهد القائمة الكاملة' } satisfies LocalizedText,
  lireTousLesAvis: { fr: 'Lire tous les avis', en: 'Read all reviews', ar: 'اقرأ جميع التقييمات' } satisfies LocalizedText,
  voirTousLesAvisTripadvisor: { fr: 'Voir tous les avis sur Tripadvisor', en: 'See all reviews on Tripadvisor', ar: 'شاهد جميع التقييمات على Tripadvisor' } satisfies LocalizedText,
  pretACommander: { fr: 'Prêt à commander ?', en: 'Ready to order?', ar: 'جاهز للطلب؟' } satisfies LocalizedText,
  itineraire: { fr: 'Itinéraire', en: 'Directions', ar: 'الاتجاهات' } satisfies LocalizedText,
  retourAccueil: { fr: "Retour à l'accueil", en: 'Back to home', ar: 'العودة للرئيسية' } satisfies LocalizedText,

  adresse: { fr: 'Adresse', en: 'Address', ar: 'العنوان' } satisfies LocalizedText,
  telephone: { fr: 'Téléphone', en: 'Phone', ar: 'الهاتف' } satisfies LocalizedText,
  whatsapp: { fr: 'WhatsApp', en: 'WhatsApp', ar: 'واتساب' } satisfies LocalizedText,
  horaires: { fr: 'Horaires', en: 'Opening hours', ar: 'ساعات العمل' } satisfies LocalizedText,

  avisTripadvisorSuffix: { fr: 'avis Tripadvisor', en: 'Tripadvisor reviews', ar: 'تقييم على Tripadvisor' } satisfies LocalizedText,
  avisGoogle: { fr: 'Avis Google', en: 'Google reviews', ar: 'تقييمات Google' } satisfies LocalizedText,
  laisserAvisGoogle: { fr: 'Laisser un avis sur Google', en: 'Leave a review on Google', ar: 'اترك تقييمًا على Google' } satisfies LocalizedText,
  voirSurGoogle: { fr: 'Voir sur Google', en: 'View on Google', ar: 'شاهد على Google' } satisfies LocalizedText,
  surGoogle: { fr: 'sur Google', en: 'on Google', ar: 'على Google' } satisfies LocalizedText,
  ouvertMaintenant: { fr: 'Ouvert maintenant', en: 'Open now', ar: 'مفتوح الآن' } satisfies LocalizedText,
  fermeMaintenant: { fr: 'Fermé maintenant', en: 'Closed now', ar: 'مغلق الآن' } satisfies LocalizedText,
  toutLeMenu: { fr: 'Tout le menu', en: 'Full menu', ar: 'القائمة كاملة' } satisfies LocalizedText,
  vegetarienUniquement: { fr: 'Végétarien', en: 'Vegetarian', ar: 'نباتي' } satisfies LocalizedText,
  noteMoyenneClients: { fr: 'note moyenne de nos clients', en: 'average customer rating', ar: 'متوسط تقييم عملائنا' } satisfies LocalizedText,
  ansExperience: { fr: "ans d'expérience", en: 'years of experience', ar: 'سنوات خبرة' } satisfies LocalizedText, // REPLACE if a more specific phrase fits this client's cuisine
  platsPreparesCommande: { fr: 'plats préparés à la commande', en: 'dishes cooked to order', ar: 'أطباق تُحضّر عند الطلب' } satisfies LocalizedText,
  preparesCommandeLine: { fr: 'de nos plats sont préparés à la commande — jamais réchauffés, jamais à l\'avance.', en: 'of our dishes are cooked to order — never reheated, never made in advance.', ar: 'من أطباقنا تُحضّر عند الطلب — لا تُسخّن أبدًا ولا تُجهّز مسبقًا.' } satisfies LocalizedText,

  ajouter: { fr: 'Ajouter', en: 'Add', ar: 'إضافة' } satisfies LocalizedText,
  ajouterAuPanier: { fr: 'Ajouter au panier', en: 'Add to cart', ar: 'أضف إلى السلة' } satisfies LocalizedText,
  // Menu search + filter chips (MenuContent.astro).
  rechercherUnPlat: { fr: 'Rechercher un plat...', en: 'Search a dish...', ar: 'ابحث عن طبق...' } satisfies LocalizedText,
  aucunPlatTrouve: {
    fr: "Aucun plat ne correspond à votre recherche.",
    en: 'No dish matches your search.',
    ar: 'لا يوجد طبق يطابق بحثك.',
  } satisfies LocalizedText,
  // Shown on a menu item card when the staff screen has marked it
  // unavailable (see MenuContent.astro's menu_items sync script).
  epuise: { fr: 'Épuisé', en: 'Sold out', ar: 'نفدت الكمية' } satisfies LocalizedText,
  reserverUneTable: { fr: 'Réserver une table', en: 'Book a table', ar: 'احجز طاولة' } satisfies LocalizedText,
};

export const footer = {
  confidentialite: { fr: 'Confidentialité', en: 'Privacy', ar: 'الخصوصية' } satisfies LocalizedText,
  builtBy: { fr: 'Built by Amplify Growth Studio', en: 'Built by Amplify Growth Studio', ar: 'built by Amplify Growth Studio' } satisfies LocalizedText,
};

// Display-only place names — kept separate from siteConfig.identity.city/
// country (which stay the single romanized form used in structured data,
// addresses and Google Maps links, since mixing scripts there risks
// breaking schema.org/Maps matching). This is purely what a human reads.
// REPLACE — the city/country name as it should be READ in each language
// (e.g. an Arabic reader expects "الرباط", not the romanized "Rabat").
// Must refer to the same real place as siteConfig.identity.city/country.
export const place = {
  city: { fr: 'Rabat', en: 'Rabat', ar: 'الرباط' } satisfies LocalizedText,
  country: { fr: 'Maroc', en: 'Morocco', ar: 'المغرب' } satisfies LocalizedText,
};

export const seoDefaults = {
  legal: { fr: 'Légal', en: 'Legal', ar: 'قانوني' } satisfies LocalizedText,
  besoinAide: { fr: "Besoin d'aide ?", en: 'Need help?', ar: 'تحتاج مساعدة؟' } satisfies LocalizedText,
};
