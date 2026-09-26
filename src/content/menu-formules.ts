// The /menu marketing page's full menu content — Amar, Sept 2026, pasted
// the owner's actual printed-menu text ("MOË - TEA ROOM · RESTAURANT" /
// "Majestueux • Élégant • Opulent") and asked to replace everything on
// /menu with it: "Verwijder alle content wat er nu staat ... zet er dit
// op een overzichtelijke manier."
//
// IMPORTANT — scope, confirmed with Amar before building this: this
// content replaces /menu ONLY. /commande (the QR in-restaurant ordering
// page) keeps its own separate, unrelated catalog (menu-catalog.ts) —
// that page's live cart/checkout can't represent a multi-course formule
// ("choose one of two") the way this static page can, and Amar chose
// "alleen /menu aanpassen" when asked. Practical effect: /menu and
// /commande now intentionally show different things (this page: the
// owner's formules-style card; /commande: what a table can actually
// order today). Flagged to Amar; his call, not a mistake.
//
// This IS this page's content — unlike menu-catalog.ts's own
// TRANSLATION STATUS note (FR-only item names, on purpose, for that
// catalog), Amar asked for full EN/AR translation of this content up
// front, so every string below is a real LocalizedText, not a FR-only
// placeholder.
import type { LocalizedText } from '../i18n/languages';

export interface FormuleItem {
  id: string;
  name: LocalizedText;
  price: number;
  tagline: LocalizedText;
  inclusions: LocalizedText[];
}

export interface MenuLineItem {
  id: string;
  name: LocalizedText;
  price: number;
  desc?: LocalizedText;
  // Optional — only matchaSignature's items use this so far (Amar, Sept
  // 2026: "er staan 4 matcha op de menu site daar zijn ook foto van te
  // vinden op de commande site. Zet die er ook op"), reusing the real
  // photos already shot for /commande's own 'moetcha' catalog category
  // (menu-catalog.ts) rather than new ones — see matchaSignature's own
  // comment for which photo maps to which of these four flavors, and the
  // one flavor that has no matching photo.
  image?: string;
}

export interface MenuSubsection {
  id: string;
  title: LocalizedText;
  items: MenuLineItem[];
}

// One course of the Brunch Signature Moë tasting menu. `options` holds
// either a single dish (most courses) or two (the two courses the guest
// picks between — `choiceLabel` is only set then, e.g. "Au choix").
export interface SignatureCourseOption {
  name: LocalizedText;
  desc?: LocalizedText;
}
export interface SignatureCourse {
  id: string;
  title: LocalizedText;
  choiceLabel?: LocalizedText;
  options: SignatureCourseOption[];
}

export const goodMorningMoe = {
  id: 'good-morning',
  title: { fr: 'Good Morning Moë', en: 'Good Morning Moë', ar: 'Good Morning Moë' },
  hours: {
    fr: 'Tous les jours • 9h30 – 11h30',
    en: 'Every day • 9:30 AM – 11:30 AM',
    ar: 'يوميًا • من 9:30 إلى 11:30 صباحًا',
  },
  formules: [
    {
      id: 'express-moe',
      name: { fr: "L'Express Moë", en: "L'Express Moë", ar: "L'Express Moë" },
      price: 55,
      tagline: {
        fr: "L'essentiel du matin, avec élégance.",
        en: 'Morning essentials, with elegance.',
        ar: 'أساسيات الصباح، بأناقة.',
      },
      inclusions: [
        { fr: 'Boisson chaude au choix', en: 'Hot beverage of your choice', ar: 'مشروب ساخن حسب الاختيار' },
        { fr: "Jus d'orange frais", en: 'Fresh orange juice', ar: 'عصير برتقال طازج' },
        { fr: 'Viennoiseries du jour', en: 'Viennoiseries of the day', ar: 'معجنات اليوم' },
        { fr: 'Demi-baguette tradition', en: 'Half traditional baguette', ar: 'نصف باغيت تقليدي' },
        { fr: 'Beurre doux & confiture artisanale', en: 'Sweet butter & artisanal jam', ar: 'زبدة حلوة ومربى منزلي' },
      ],
    },
    {
      id: 'beldi-moe',
      name: { fr: 'Le Beldi Moë', en: 'Le Beldi Moë', ar: 'Le Beldi Moë' },
      price: 65,
      tagline: {
        fr: 'Un réveil généreux aux saveurs du Maroc.',
        en: 'A generous wake-up with the flavors of Morocco.',
        ar: 'بداية يوم سخية بنكهات المغرب.',
      },
      inclusions: [
        { fr: 'Boisson chaude au choix', en: 'Hot beverage of your choice', ar: 'مشروب ساخن حسب الاختيار' },
        { fr: "Jus d'orange frais", en: 'Fresh orange juice', ar: 'عصير برتقال طازج' },
        { fr: 'Msemen, baghrir & harcha', en: 'Msemen, baghrir & harcha', ar: 'مسمن وبغرير وحرشة' },
        { fr: 'Amlou maison, miel & huile d’olive', en: 'House-made amlou, honey & olive oil', ar: 'أملو منزلي، عسل وزيت زيتون' },
        { fr: 'Œufs au choix ou khlii', en: 'Eggs of your choice or khlii', ar: 'بيض حسب الاختيار أو خليع' },
        { fr: 'Pain marocain', en: 'Moroccan bread', ar: 'خبز مغربي' },
      ],
    },
    {
      id: 'signature-moe',
      name: { fr: 'Le Signature Moë', en: 'Le Signature Moë', ar: 'Le Signature Moë' },
      price: 90,
      tagline: {
        fr: 'Quand le petit-déjeuner prend des airs de brunch.',
        en: 'When breakfast takes on brunch airs.',
        ar: 'عندما يأخذ الإفطار طابع البرانش.',
      },
      inclusions: [
        { fr: 'Boisson chaude au choix', en: 'Hot beverage of your choice', ar: 'مشروب ساخن حسب الاختيار' },
        { fr: 'Jus frais du jour', en: 'Fresh juice of the day', ar: 'عصير طازج يومي' },
        { fr: 'Œufs au choix', en: 'Eggs of your choice', ar: 'بيض حسب الاختيار' },
        { fr: 'Granola maison, yaourt grec & fruits frais', en: 'House-made granola, Greek yogurt & fresh fruit', ar: 'غرانولا منزلية، زبادي يوناني وفواكه طازجة' },
        { fr: 'Avocado toast & œuf poché', en: 'Avocado toast & poached egg', ar: 'توست أفوكادو وبيضة مسلوقة' },
        { fr: 'Corbeille de pains & viennoiseries', en: 'Bread & pastry basket', ar: 'سلة خبز ومعجنات' },
        { fr: 'Beurre doux & confiture artisanale', en: 'Sweet butter & artisanal jam', ar: 'زبدة حلوة ومربى منزلي' },
      ],
    },
  ] satisfies FormuleItem[],
};

export const brunchLunch = {
  id: 'brunch-lunch',
  title: { fr: 'Brunch & Lunch', en: 'Brunch & Lunch', ar: 'برانش وغداء' },
  hours: {
    fr: 'Tous les jours • 10h – 16h',
    en: 'Every day • 10 AM – 4 PM',
    ar: 'يوميًا • من 10 صباحًا إلى 4 مساءً',
  },
  subsections: [
    {
      id: 'tartines',
      title: { fr: 'Les Tartines', en: 'The Toasts', ar: 'التوست' },
      items: [
        {
          id: 'tartine-avocat-saumon',
          name: { fr: 'Avocat & Saumon Fumé', en: 'Avocado & Smoked Salmon', ar: 'أفوكادو وسلمون مدخن' },
          price: 55,
          desc: {
            fr: 'Pain artisanal toasté, avocat, saumon fumé, fromage frais, graines torréfiées & herbes fraîches.',
            en: 'Toasted artisan bread, avocado, smoked salmon, cream cheese, toasted seeds & fresh herbs.',
            ar: 'خبز حرفي محمص، أفوكادو، سلمون مدخن، جبنة كريمية، بذور محمصة وأعشاب طازجة.',
          },
        },
        {
          id: 'tartine-legumes-chevre',
          name: { fr: 'Légumes Grillés & Chèvre', en: 'Grilled Vegetables & Goat Cheese', ar: 'خضار مشوية وجبن الماعز' },
          price: 55,
          desc: {
            fr: 'Pain artisanal toasté, légumes du soleil grillés, chèvre fondant, jeunes pousses, graines torréfiées & touche de miel.',
            en: 'Toasted artisan bread, grilled sun-ripened vegetables, melting goat cheese, baby greens, toasted seeds & a touch of honey.',
            ar: 'خبز حرفي محمص، خضار مشمسة مشوية، جبن ماعز ذائب، براعم خضراء، بذور محمصة ولمسة من العسل.',
          },
        },
      ],
    },
    {
      id: 'incontournables',
      title: { fr: 'Les Incontournables', en: 'The Classics', ar: 'الأطباق الأساسية' },
      items: [
        {
          id: 'duo-croque-moe',
          name: { fr: 'Le Duo Croque Moë', en: 'The Croque Moë Duo', ar: 'ثنائي كروك موي' },
          price: 65,
          desc: { fr: 'Croque-Monsieur & Croque-Madame, inséparables.', en: 'Croque-Monsieur & Croque-Madame, inseparable.', ar: 'كروك موسيو وكروك مدام، لا ينفصلان.' },
        },
        {
          id: 'shakshuka-moe',
          name: { fr: 'Shakshuka Moë', en: 'Shakshuka Moë', ar: 'شكشوكة موي' },
          price: 48,
          desc: {
            fr: 'Tomates & poivrons confits aux épices douces, œuf au cœur coulant & pain maison.',
            en: 'Slow-cooked tomatoes & peppers with mild spices, runny egg & house bread.',
            ar: 'طماطم وفلفل مطهوان ببطء بتوابل خفيفة، بيضة بقلب سائل وخبز منزلي.',
          },
        },
        {
          id: 'wrap-poulet-chermoula',
          name: { fr: 'Wrap Poulet Chermoula', en: 'Chermoula Chicken Wrap', ar: 'راب دجاج بالشرمولة' },
          price: 48,
          desc: {
            fr: 'Poulet mariné à la chermoula, crudités fraîches & sauce maison.',
            en: 'Chicken marinated in chermoula, fresh crudités & house sauce.',
            ar: 'دجاج متبل بالشرمولة، خضار طازجة وصلصة منزلية.',
          },
        },
        {
          id: 'buddha-bowl-marocain',
          name: { fr: 'Buddha Bowl Marocain', en: 'Moroccan Buddha Bowl', ar: 'بودا بول مغربي' },
          price: 52,
          desc: {
            fr: 'Une composition fraîche et généreuse aux inspirations marocaines.',
            en: 'A fresh, generous bowl with Moroccan inspirations.',
            ar: 'طبق منعش وسخي بلمسات مغربية.',
          },
        },
        {
          id: 'boulettes-agneau',
          name: { fr: "Boulettes d'Agneau", en: 'Lamb Meatballs', ar: 'كرات لحم الضأن' },
          price: 48,
          desc: {
            fr: "Boulettes d'agneau parfumées aux épices, sauce légère au yaourt.",
            en: 'Lamb meatballs fragrant with spices, light yogurt sauce.',
            ar: 'كرات لحم الضأن المتبلة بالتوابل، صلصة زبادي خفيفة.',
          },
        },
      ],
    },
    {
      id: 'fraicheurs',
      title: { fr: 'Les Fraîcheurs', en: 'The Fresh Plates', ar: 'أطباق منعشة' },
      items: [
        {
          id: 'veloute-du-moment',
          name: { fr: 'Velouté du Moment', en: 'Velouté of the Moment', ar: 'شوربة كريمية باللحظة' },
          price: 35,
          desc: {
            fr: "Selon l'inspiration du Chef : légumes de saison ou courge.",
            en: "As the Chef is inspired: seasonal vegetables or squash.",
            ar: 'حسب إلهام الشيف: خضار الموسم أو القرع.',
          },
        },
        {
          id: 'tapas-marocaines',
          name: { fr: 'Tapas Marocaines', en: 'Moroccan Tapas', ar: 'تابا مغربية' },
          price: 45,
          desc: {
            fr: 'Zaalouk, houmous & taktouka, accompagnés de pain maison.',
            en: 'Zaalouk, hummus & taktouka, served with house bread.',
            ar: 'زعلوك، حمص وتكتوكة، يقدَّم مع خبز منزلي.',
          },
        },
        {
          id: 'salade-de-saison',
          name: { fr: 'Salade de Saison', en: 'Seasonal Salad', ar: 'سلطة الموسم' },
          price: 42,
          desc: {
            fr: 'Légumes frais, jeunes pousses & vinaigrette à l’orange.',
            en: 'Fresh vegetables, baby greens & orange vinaigrette.',
            ar: 'خضار طازجة، براعم خضراء وصلصة فينيغريت بالبرتقال.',
          },
        },
      ],
    },
    {
      id: 'a-partager',
      title: { fr: 'À Partager', en: 'To Share', ar: 'للمشاركة' },
      items: [
        {
          id: 'planche-moe',
          name: { fr: 'La Planche Moë', en: 'The Moë Board', ar: 'لوح موي' },
          price: 90,
          desc: {
            fr: "Sélection sucrée-salée à partager selon l'inspiration du moment.",
            en: "A sweet-and-savory selection to share, following the moment's inspiration.",
            ar: 'تشكيلة حلوة ومالحة للمشاركة، حسب إلهام اللحظة.',
          },
        },
      ],
    },
    {
      id: 'sandwichs-moe',
      title: { fr: 'Les Sandwichs Moë', en: 'The Moë Sandwiches', ar: 'ساندويتشات موي' },
      items: [
        {
          id: 'club-moe',
          name: { fr: 'Club Moë', en: 'Club Moë', ar: 'كلوب موي' },
          price: 58,
          desc: {
            fr: 'Poulet au ras el-hanout, crudités & mayonnaise légèrement relevée à la harissa.',
            en: 'Chicken with ras el-hanout, crudités & mayonnaise lightly spiced with harissa.',
            ar: 'دجاج برأس الحانوت، خضار طازجة ومايونيز خفيف التبل بالهريسة.',
          },
        },
        {
          id: 'le-vegetarien',
          name: { fr: 'Le Végétarien', en: 'The Vegetarian', ar: 'النباتي' },
          price: 52,
          desc: { fr: 'Chèvre, amlou & roquette fraîche.', en: 'Goat cheese, amlou & fresh arugula.', ar: 'جبن ماعز، أملو وجرجير طازج.' },
        },
      ],
    },
  ] satisfies MenuSubsection[],
};

// No price shown for this one — the owner's own text doesn't list one
// (fixed formules above and à-la-carte items below all carry a price;
// this multi-course experience deliberately doesn't). Left blank rather
// than invented.
export const brunchSignature = {
  id: 'brunch-signature',
  title: { fr: 'Le Brunch Signature Moë', en: 'The Moë Signature Brunch', ar: 'برانش موي المميز' },
  tagline: { fr: 'MAJESTUEUX • ÉLÉGANT • OPULENT', en: 'MAJESTUEUX • ÉLÉGANT • OPULENT', ar: 'MAJESTUEUX • ÉLÉGANT • OPULENT' },
  intro: {
    fr: 'Une expérience généreuse pensée comme un véritable parcours gourmand.',
    en: 'A generous experience, designed as a true gourmet journey.',
    ar: 'تجربة سخية، صُممت كرحلة ذواقة حقيقية.',
  },
  courses: [
    {
      id: 'entree-fraicheur',
      title: { fr: "L'Entrée Fraîcheur", en: 'The Fresh Starter', ar: 'المقبلة المنعشة' },
      options: [
        {
          name: { fr: "Caviar de carotte & d'aubergine", en: 'Carrot & Eggplant Caviar', ar: 'كافيار الجزر والباذنجان' },
          desc: {
            fr: 'Une mise en bouche fraîche et délicatement parfumée.',
            en: 'A fresh, delicately fragrant amuse-bouche.',
            ar: 'لقمة افتتاحية منعشة وعطرة برقة.',
          },
        },
      ],
    },
    {
      id: 'tartine-moe',
      title: { fr: 'La Tartine Moë', en: 'The Moë Toast', ar: 'توست موي' },
      choiceLabel: { fr: 'Au choix', en: 'Choice of', ar: 'اختر من بين' },
      options: [
        {
          name: { fr: 'Avocat & Saumon Fumé', en: 'Avocado & Smoked Salmon', ar: 'أفوكادو وسلمون مدخن' },
          desc: {
            fr: 'Pain artisanal toasté, avocat, saumon fumé, fromage frais, graines torréfiées & herbes fraîches.',
            en: 'Toasted artisan bread, avocado, smoked salmon, cream cheese, toasted seeds & fresh herbs.',
            ar: 'خبز حرفي محمص، أفوكادو، سلمون مدخن، جبنة كريمية، بذور محمصة وأعشاب طازجة.',
          },
        },
        {
          name: { fr: 'Légumes Grillés & Chèvre', en: 'Grilled Vegetables & Goat Cheese', ar: 'خضار مشوية وجبن الماعز' },
          desc: {
            fr: 'Pain artisanal toasté, légumes du soleil grillés, chèvre fondant, jeunes pousses, graines torréfiées & touche de miel.',
            en: 'Toasted artisan bread, grilled sun-ripened vegetables, melting goat cheese, baby greens, toasted seeds & a touch of honey.',
            ar: 'خبز حرفي محمص، خضار مشمسة مشوية، جبن ماعز ذائب، براعم خضراء، بذور محمصة ولمسة من العسل.',
          },
        },
      ],
    },
    {
      id: 'coeur-de-table',
      title: { fr: 'Le Cœur de Table', en: 'The Heart of the Table', ar: 'قلب المائدة' },
      choiceLabel: { fr: 'Au choix', en: 'Choice of', ar: 'اختر من بين' },
      options: [
        {
          name: { fr: 'Le Mex', en: 'Le Mex', ar: 'لو ماكس' },
          desc: {
            fr: 'Cassolette de saucisses façon Tex-Mex, poivrons confits & pommes wedges.',
            en: 'Tex-Mex style sausage cassolette, slow-cooked peppers & potato wedges.',
            ar: 'طاجين نقانق على الطريقة التكس-مكسيكية، فلفل مطهو ببطء وبطاطا مقطعة.',
          },
        },
        {
          name: { fr: 'La Shakshuka Moë', en: 'The Shakshuka Moë', ar: 'شكشوكة موي' },
          desc: {
            fr: 'Tomates & poivrons confits aux épices douces, surmontés d’un œuf poché au cœur coulant.',
            en: 'Slow-cooked tomatoes & peppers with mild spices, topped with a runny poached egg.',
            ar: 'طماطم وفلفل مطهوان ببطء بتوابل خفيفة، مع بيضة مسلوقة بقلب سائل.',
          },
        },
      ],
    },
    {
      id: 'gourmandise-italienne',
      title: { fr: 'La Gourmandise Italienne', en: 'The Italian Indulgence', ar: 'التذوق الإيطالي' },
      options: [
        {
          name: { fr: 'Mini-Burrata Crémeuse', en: 'Mini Creamy Burrata', ar: 'بوراتا صغيرة كريمية' },
          desc: {
            fr: 'Coulis maison & éclats de fruits rouges.',
            en: 'House-made coulis & red berry pieces.',
            ar: 'كولي منزلي وقطع من الفواكه الحمراء.',
          },
        },
      ],
    },
    {
      id: 'final-sucre',
      title: { fr: 'Le Final Sucré', en: 'The Sweet Finale', ar: 'الختام الحلو' },
      options: [
        {
          name: { fr: 'Le Choix du Pâtissier', en: "The Pastry Chef's Choice", ar: 'اختيار شيف الحلويات' },
          desc: {
            fr: 'Flan traditionnel maison, ou Éclair Signature MOË au choix, ou pâtisserie du jour.',
            en: 'House-made traditional flan, or a Signature MOË Éclair of your choice, or the pastry of the day.',
            ar: 'فلان تقليدي منزلي، أو إكلير موي المميز حسب الاختيار، أو حلوى اليوم.',
          },
        },
      ],
    },
    {
      id: 'les-boissons',
      title: { fr: 'Les Boissons', en: 'The Beverages', ar: 'المشروبات' },
      options: [
        {
          name: {
            fr: 'Une boisson chaude ou fraîche au choix parmi notre sélection.',
            en: 'A hot or cold beverage of your choice from our selection.',
            ar: 'مشروب ساخن أو بارد حسب الاختيار من تشكيلتنا.',
          },
        },
      ],
    },
  ] satisfies SignatureCourse[],
};

export const pancakes = {
  id: 'pancakes',
  title: { fr: 'Les Pancakes', en: 'The Pancakes', ar: 'البان كيك' },
  items: [
    {
      id: 'pancake-classique',
      name: { fr: 'Le Classique', en: 'The Classic', ar: 'الكلاسيكي' },
      price: 48,
      desc: { fr: "Beurre doux & sirop d'érable.", en: 'Sweet butter & maple syrup.', ar: 'زبدة حلوة وشراب القيقب.' },
    },
    {
      id: 'pancake-marocain',
      name: { fr: 'Le Marocain', en: 'The Moroccan', ar: 'المغربي' },
      price: 58,
      desc: { fr: 'Amlou, miel & fruits secs.', en: 'Amlou, honey & dried fruits.', ar: 'أملو، عسل وفواكه مجففة.' },
    },
    {
      id: 'pancake-fruite',
      name: { fr: 'Le Fruité', en: 'The Fruity', ar: 'بالفواكه' },
      price: 55,
      desc: { fr: 'Fruits de saison & coulis maison.', en: 'Seasonal fruits & house-made coulis.', ar: 'فواكه الموسم وكولي منزلي.' },
    },
  ] satisfies MenuLineItem[],
};

// Photos reused from /commande's own 'moetcha' catalog category
// (menu-catalog.ts) — Amar: "er staan 4 matcha op de menu site daar zijn
// ook foto van te vinden op de commande site. Zet die er ook op." Three
// of these four flavor names line up closely enough with an existing
// /commande photo to reuse honestly:
//   - "Fleur d'Oranger" ↔ dr-moetcha-zahr ("zahr" = orange blossom water
//     — menu-catalog.ts's own desc for it is literally "Matcha, fleur
//     d'oranger").
//   - "Amlou" ↔ dr-moetcha-amlou — same flavor name, direct match.
//   - "Matcha Glacé" (no flavor specified, just "iced") ↔
//     dr-moetcha-classic-glace, the plain iced matcha.
// "Rose" has NO photo here on purpose — /commande's moetcha lineup has
// no rose flavor (only Classic/Nana/Amlou/Zahr), so there is no real
// photo of it to borrow; using another flavor's photo would show the
// wrong drink. Flagged to Amar rather than faked.
export const matchaSignature = {
  id: 'matcha-signature',
  title: { fr: 'Matcha Signature Moë', en: 'The Moë Signature Matcha', ar: 'ماتشا موي المميزة' },
  items: [
    { id: 'matcha-fleur-oranger', name: { fr: "Fleur d'Oranger", en: 'Orange Blossom', ar: 'زهر البرتقال' }, price: 42, image: '/images/dr-moetcha-zahr.webp' },
    { id: 'matcha-amlou', name: { fr: 'Amlou', en: 'Amlou', ar: 'أملو' }, price: 50, image: '/images/dr-moetcha-amlou.webp' },
    { id: 'matcha-rose', name: { fr: 'Rose', en: 'Rose', ar: 'الورد' }, price: 42 },
    { id: 'matcha-glace', name: { fr: 'Matcha Glacé', en: 'Iced Matcha', ar: 'ماتشا مثلجة' }, price: 45, image: '/images/dr-moetcha-classic-glace.webp' },
  ] satisfies MenuLineItem[],
};
