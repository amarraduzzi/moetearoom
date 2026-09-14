// Day/time-window formules — transcribed from the client's second uploaded
// PDF ("Plus qu'un repas, une expérience"). These are NOT à-la-carte items:
// no fixed item list or price is printed for any of them, so unlike
// menu-highlights.ts they are shown as informational cards (day + time
// window + what's included) rather than addable-to-cart products. The
// source PDF explicitly recommends reservation for brunchs, soirées and
// "expériences gastronomiques" — each card links to /reservation instead of
// the cart. See MenuContent.astro for the rendering.
import type { LocalizedText } from '../i18n/languages';
import { siteConfig } from '../config/site.config';

const CLOSE_HOUR = siteConfig.contact.hours.close; // 23.5 (23h30) — see the comment on MenuFormule.endHour above

export interface MenuFormule {
  name: LocalizedText;
  schedule: LocalizedText; // e.g. "8h30 – 11h30 · Tous les jours"
  description: LocalizedText;
  tagline?: LocalizedText; // short italic line from the PDF, e.g. "Tradition et authenticité"
  // Structured mirror of `schedule`, added for FormuleSpotlight.astro's live
  // "what's on right now" badge on the menu page — `schedule` alone is a
  // free-text display string, not something a script can compare against
  // the clock. `days` is 0=dimanche..6=samedi; start/endHour are 24h
  // decimals matching siteConfig.contact.hours' own format (e.g. 19.5 =
  // 19h30). Where the source PDF only said "midi" or "soir" without an
  // exact window (Rfissa, Couscous, Dima Maghreb), the hours below were
  // inferred to match the sibling formule that DOES state one for that
  // same moment of day (Déjeuner Moë's 11h30–16h00 for "midi", Les Soirées
  // Moë's 19h–close for "soir") — confirm with the client if theirs differ.
  days: number[];
  startHour: number;
  endHour: number;
}

export const menuFormules: MenuFormule[] = [
  {
    name: { fr: 'Good Morning Moë — Brunch du matin', en: 'Good Morning Moë — Morning Brunch', ar: 'صباح الخير موي — فطور الصباح' },
    schedule: { fr: '8h30 – 11h30 · Tous les jours', en: '8:30 AM – 11:30 AM · Every day', ar: '8:30 – 11:30 · يوميًا' },
    description: {
      fr: "Le panier du boulanger : demi-baguette de tradition, beurre doux, miel ou confiture, fromage blanc crémeux et tapenade d'olives. Œufs en plusieurs propositions, viennoiseries douceurs, boissons chaudes & fraîches.",
      en: "The baker's basket: half a traditional baguette, sweet butter, honey or jam, creamy fromage blanc and olive tapenade. Eggs several ways, sweet viennoiseries, hot & cold drinks.",
      ar: 'سلة الخباز: نصف باغيت تقليدي، زبدة حلوة، عسل أو مربى، جبن أبيض كريمي وتابيناد الزيتون. بيض بعدة طرق، معجنات، مشروبات ساخنة وباردة.',
    },
    days: [0, 1, 2, 3, 4, 5, 6],
    startHour: 8.5,
    endHour: 11.5,
  },
  {
    name: { fr: 'Le Déjeuner Moë', en: 'Le Déjeuner Moë (Lunch)', ar: 'غداء موي' },
    schedule: { fr: '11h30 – 16h00 · Lundi, mardi, jeudi', en: '11:30 AM – 4:00 PM · Mon, Tue, Thu', ar: '11:30 – 16:00 · الإثنين، الثلاثاء، الخميس' },
    description: {
      fr: '2 entrées signature Moë + 2 plats suggestion du jour.',
      en: '2 signature Moë starters + 2 dish-of-the-day suggestions.',
      ar: 'مقبلتان من توقيع موي + طبقان من اقتراحات اليوم.',
    },
    tagline: { fr: 'Une cuisine de saison, fraîche et créative.', en: 'Seasonal, fresh and creative cooking.', ar: 'مطبخ موسمي، طازج وإبداعي.' },
    days: [1, 2, 4],
    startHour: 11.5,
    endHour: 16,
  },
  {
    name: { fr: 'Le Rfissa Moë', en: 'Le Rfissa Moë', ar: 'الرفيسة موي' },
    schedule: { fr: 'Mercredi midi', en: 'Wednesday lunch', ar: 'ظهر الأربعاء' },
    description: {
      fr: 'Un mercredi comme on les aime : généreux, réconfortant et profondément marocain.',
      en: 'A Wednesday just how we like it: generous, comforting and deeply Moroccan.',
      ar: 'أربعاء كما نحبه: سخي، مريح ومغربي بامتياز.',
    },
    tagline: { fr: 'Tradition et authenticité.', en: 'Tradition and authenticity.', ar: 'تقليد وأصالة.' },
    days: [3],
    startHour: 11.5,
    endHour: 16,
  },
  {
    name: { fr: 'Le Couscous Moë', en: 'Le Couscous Moë', ar: 'الكسكس موي' },
    schedule: { fr: 'Vendredi midi', en: 'Friday lunch', ar: 'ظهر الجمعة' },
    description: {
      fr: 'Un vendredi comme on les aime : généreux, chaleureux et profondément marocain.',
      en: 'A Friday just how we like it: generous, warm and deeply Moroccan.',
      ar: 'جمعة كما نحبها: سخية، دافئة ومغربية بامتياز.',
    },
    tagline: { fr: 'Partage et convivialité.', en: 'Sharing and conviviality.', ar: 'مشاركة وأجواء ودية.' },
    days: [5],
    startHour: 11.5,
    endHour: 16,
  },
  {
    name: { fr: 'Les Soirées Moë', en: 'Les Soirées Moë (Evenings)', ar: 'أمسيات موي' },
    schedule: { fr: "Tous les soirs à partir de 19h", en: 'Every evening from 7:00 PM', ar: 'كل مساء ابتداءً من 19:00' },
    description: {
      fr: '2 entrées signature Moë + 2 plats suggestion du jour.',
      en: '2 signature Moë starters + 2 dish-of-the-day suggestions.',
      ar: 'مقبلتان من توقيع موي + طبقان من اقتراحات اليوم.',
    },
    tagline: { fr: 'Une atmosphère unique du matin au soir.', en: 'A unique atmosphere from morning to night.', ar: 'أجواء فريدة من الصباح إلى المساء.' },
    days: [0, 1, 2, 3, 4, 5, 6],
    startHour: 19,
    endHour: CLOSE_HOUR,
  },
  {
    name: { fr: 'Le Brunch du Week-end Signature Moë', en: 'Moë Signature Weekend Brunch', ar: 'برانش نهاية الأسبوع بتوقيع موي' },
    schedule: { fr: '10h00 – 16h30 · Samedi & dimanche', en: '10:00 AM – 4:30 PM · Sat & Sun', ar: '10:00 – 16:30 · السبت والأحد' },
    description: {
      fr: 'Le brunch signature du week-end, préparé avec le même soin que notre carte.',
      en: "The weekend's signature brunch, prepared with the same care as our menu.",
      ar: 'برانش نهاية الأسبوع المميز، يُحضّر بنفس عناية قائمتنا.',
    },
    tagline: { fr: 'Une expérience unique.', en: 'A unique experience.', ar: 'تجربة فريدة.' },
    days: [6, 0],
    startHour: 10,
    endHour: 16.5,
  },
  {
    name: { fr: 'Gastronomie Dima Maghreb', en: 'Gastronomie Dima Maghreb', ar: 'غاسترونومي ديما مغرب' },
    schedule: { fr: 'Vendredi soir', en: 'Friday evening', ar: 'مساء الجمعة' },
    description: {
      fr: 'Un voyage culinaire à travers les saveurs du Maghreb.',
      en: 'A culinary journey through the flavours of the Maghreb.',
      ar: 'رحلة طهي عبر نكهات المغرب العربي.',
    },
    days: [5],
    startHour: 19,
    endHour: CLOSE_HOUR,
  },
];
