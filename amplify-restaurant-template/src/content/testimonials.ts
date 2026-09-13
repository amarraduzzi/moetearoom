// Real reviews from the client's Google Business Profile (screenshots sent
// August 2026). Translated — not fabricated — into the other two languages.
// Review 1 (Dalal) was shown to us already Google-translated into Dutch
// (original was English per the "Vertaald door Google" note); the other
// two are the reviewer's own English text. Dates are approximate — Google
// only showed relative dates ("3/4/5 maanden geleden"), not exact ones.
import type { LocalizedText } from '../i18n/languages';

export interface Testimonial {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: LocalizedText;
  date: string; // ISO date, used in the Review JSON-LD — approximate, see note above
  sourceUrl?: string;
}

export const aggregateRating = {
  ratingValue: '4.6', // confirmed on the client's Google Business Profile
  reviewCount: '108', // confirmed on the client's Google Business Profile
};

export const testimonials: Testimonial[] = [
  {
    name: 'Dalal',
    rating: 5,
    text: {
      fr: "Tout était parfait. Un matcha de haute qualité et un large choix de desserts frais. Le service et l'ambiance étaient excellents. Ils ont un éclair spécial !",
      en: 'Everything was perfect. High-quality matcha and a wide selection of fresh desserts. The service and atmosphere were excellent. They have a special éclair!',
      ar: 'كان كل شيء مثاليًا. ماتشا عالية الجودة وتشكيلة واسعة من الحلويات الطازجة. الخدمة والأجواء كانتا ممتازتين. لديهم إكلير مميز!',
    },
    date: '2026-05-26',
  },
  {
    name: 'Soumaya Naciri',
    rating: 5,
    text: {
      fr: "Un endroit génial, une excellente nourriture et un excellent service ! Tout le monde est accueillant et sympathique. J'ai adoré, ce ne sera clairement pas une visite unique, ce deviendra une habitude pour moi. Des prix très abordables pour la qualité et le cadre est magnifique en plus.",
      en: 'Great place, great food and great service! Everyone is so welcoming and friendly. I loved being here, certainly not a one time visit but will be a habitual spot for me. Extremely affordable prices for the quality and the beautiful setting too.',
      ar: 'مكان رائع، طعام رائع وخدمة رائعة! الجميع مرحب وودود. أحببت المكان، بالتأكيد لن تكون زيارة واحدة بل ستصبح عادة بالنسبة لي. أسعار معقولة جدًا مقابل الجودة، والديكور جميل أيضًا.',
    },
    date: '2026-04-26',
  },
  {
    name: 'Soukaina Ahaji',
    rating: 5,
    text: {
      fr: "Un endroit très beau, élégant et minimaliste. J'y suis allée pour l'Iftar, la nourriture était délicieuse et l'ambiance incroyablement détendue. Le service est très agréable. C'était ma première fois mais certainement pas la dernière. (Appelez pour réserver)",
      en: 'A very beautiful elegant and minimalistic place, I went for Iftar the food was super delicious and the atmosphere is amazingly chill. The service is very pleasant. That was my first time but definitely not the last. (Call for reservations)',
      ar: 'مكان جميل جدًا وأنيق وبسيط. ذهبت للإفطار وكان الطعام لذيذًا جدًا والأجواء هادئة بشكل رائع. الخدمة ممتعة جدًا. كانت هذه أول مرة ولن تكون الأخيرة بالتأكيد. (اتصل للحجز)',
    },
    date: '2026-03-26',
  },
];
