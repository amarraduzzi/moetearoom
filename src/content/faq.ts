// TEMPLATE — the seven questions below are generic ones that apply to
// almost any restaurant (location, hours, delivery, dietary options,
// groups/private events, budget, payment) — they're a reasonable starting
// point, not filler. Still: REPLACE every answer with this client's real,
// verified information before publishing. Never guess or leave a plausible-
// sounding but unconfirmed answer (payment methods and dietary claims
// especially — see the ⚠ note below) — a wrong FAQ answer is worse than no
// FAQ at all, since AI answer engines and Google's FAQ rich results both
// lift straight from this content (see the JSON-LD built from it in
// FaqContent.astro).
//
// `category` is presentation metadata (groups the flat list into scannable
// sections on the page) — it's deliberately NOT emitted in the FAQPage
// JSON-LD, which stays exactly the flat question/answer shape AI answer
// engines and Google expect.
import type { LocalizedText } from '../i18n/languages';

export interface FaqItem {
  question: LocalizedText;
  answer: LocalizedText;
  category: 'pratique' | 'menu' | 'paiement';
}

export const faqCategoryLabels: Record<FaqItem['category'], LocalizedText> = {
  pratique: { fr: 'Infos pratiques', en: 'Practical info', ar: 'معلومات عملية' },
  menu: { fr: 'Menu & réservations', en: 'Menu & bookings', ar: 'القائمة والحجوزات' },
  paiement: { fr: 'Paiement', en: 'Payment', ar: 'الدفع' },
};

export const faqItems: FaqItem[] = [
  {
    question: {
      fr: 'Où se trouve votre restaurant ?',
      en: 'Where is your restaurant located?',
      ar: 'أين يقع مطعمكم؟',
    },
    answer: {
      fr: 'Moë Tea Room se trouve au 6 Av. Abou Faris Al Marini, à Rabat.',
      en: 'Moë Tea Room is located at 6 Av. Abou Faris Al Marini, Rabat.',
      ar: 'يقع Moë Tea Room في 6 Av. Abou Faris Al Marini، الرباط.',
    },
    category: 'pratique',
  },
  {
    question: {
      fr: 'Quels sont les horaires d’ouverture ?',
      en: 'What are the opening hours?',
      ar: 'ما هي ساعات العمل؟',
    },
    answer: {
      fr: 'Nous sommes ouverts tous les jours de 08:30 à 23:30.',
      en: 'We are open every day from 8:30 AM to 11:30 PM.',
      ar: 'نحن مفتوحون كل يوم من 08:30 إلى 23:30.',
    },
    category: 'pratique',
  },
  {
    question: {
      fr: 'Comment puis-je passer une commande ?',
      en: 'How can I place an order?',
      ar: 'كيف يمكنني تقديم طلب؟',
    },
    answer: {
      fr: "Le plus simple est de nous écrire directement sur WhatsApp via le bouton \"Commander\" du site.",
      en: 'The easiest way is to message us directly on WhatsApp via the "Order" button on the site.',
      ar: 'أسهل طريقة هي مراسلتنا مباشرة عبر واتساب من خلال زر "اطلب" في الموقع.',
    },
    category: 'pratique',
  },
  {
    question: {
      fr: 'Le restaurant propose-t-il des options végétariennes ?',
      en: 'Does the restaurant offer vegetarian options?',
      ar: 'هل يقدم المطعم خيارات نباتية؟',
    },
    answer: {
      fr: 'Oui — notre carte (thés, cafés, jus, pâtisseries et éclairs) est entièrement végétarienne.',
      en: 'Yes — our menu (teas, coffees, juices, pastries and éclairs) is entirely vegetarian.',
      ar: 'نعم — قائمتنا (الشاي والقهوة والعصائر والمعجنات والإكلير) نباتية بالكامل.',
    },
    category: 'menu',
  },
  {
    question: {
      fr: 'Y a-t-il un espace pour les groupes ou événements privés ?',
      en: 'Is there space for groups or private events?',
      ar: 'هل توجد مساحة للمجموعات أو المناسبات الخاصة؟',
    },
    answer: {
      fr: 'REMPLACER par la vraie réponse.',
      en: 'REPLACE with the real answer.',
      ar: 'استبدل هذا بالإجابة الحقيقية.',
    },
    category: 'menu',
  },
  {
    question: {
      fr: 'Quel est le budget moyen par personne ?',
      en: 'What is the average budget per person?',
      ar: 'ما هي الميزانية المتوسطة للشخص الواحد؟',
    },
    answer: {
      fr: 'Comptez entre 50 et 100 MAD par personne.',
      en: 'Expect to spend between 50 and 100 MAD per person.',
      ar: 'يتراوح متوسط الإنفاق للشخص الواحد بين 50 و100 درهم.',
    },
    category: 'menu',
  },
  {
    question: {
      fr: 'Quels moyens de paiement acceptez-vous ?', // ⚠ VÉRIFIER avec le client avant publication
      en: 'What payment methods do you accept?', // ⚠ VERIFY with the client before publishing
      ar: 'ما هي وسائل الدفع التي تقبلونها؟', // ⚠ تحقق من العميل قبل النشر
    },
    answer: {
      fr: 'REMPLACER — confirmer avec le client, ne jamais deviner (carte bancaire, espèces, etc.).',
      en: 'REPLACE — confirm with the client, never guess (card, cash, etc.).',
      ar: 'استبدل هذا — تأكّد من العميل، ولا تخمّن أبدًا.',
    },
    category: 'paiement',
  },
];
