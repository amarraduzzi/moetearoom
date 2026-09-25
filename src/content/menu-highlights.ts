// The real menu — displayed on the Home/Menu pages AND used as the ordering
// catalog by the cart (src/components/cart/CartWidget.astro renders an "add
// to cart" control next to each item on the Menu page; see
// MenuContent.astro). One list, one source of truth for both.
//
// Real menu, transcribed from the client's own price-list photos (August
// 2026). Note: the client's printed menu has two "Éclair Amlou" lines with
// the same description text (one clearly a copy-paste of the Tiramisu
// description) — only the correct amlou description is kept below; flag
// this to the client so they can fix their printed/Instagram menu too.
import type { LocalizedText } from '../i18n/languages';

export interface MenuHighlightItem {
  name: string;
  description: LocalizedText;
  price: number;
  image?: string;
  imageAlt?: LocalizedText;
  vegetarian?: boolean;
  // Short subtitle under the item name (e.g. "la rencontre des deux
  // thés") — added for the Moëtcha sub-line (Amar, Sept 2026), optional
  // so every other category's cards render exactly as before.
  tagline?: LocalizedText;
}
export interface MenuHighlightCategory {
  label: LocalizedText;
  items: MenuHighlightItem[];
  image?: string;
  imageAlt?: LocalizedText;
  // Sub-brand fields, added for Moëtcha (Amar, Sept 2026) — all optional,
  // so only a category that sets them gets the extra visual treatment in
  // MenuContent.astro; every existing category is unaffected.
  // brandLine: small wordmark subtext under the category title (e.g.
  //   "MATCHA · BY MOË TEA ROOM") — kept verbatim across fr/en/ar, same
  //   treatment as the site's other untranslated brand wordplay (see
  //   ReservationContent.astro's "MOË — Majestueux, Élégant, Opulent").
  // intro: one short paragraph telling the category's own story.
  // photoForward: true renders a photo (or a branded placeholder tile
  //   until the real photo exists) next to each item instead of the
  //   plain text-only card every other category uses.
  brandLine?: LocalizedText;
  intro?: LocalizedText;
  photoForward?: boolean;
}

export const menuHighlights: MenuHighlightCategory[] = [
  // Transcribed from the client's "Menu sur le pouce" PDF (Sept 2026) —
  // their savoury à-la-carte, distinct from the drinks/pâtisserie card
  // below. The day/time-window "formules" concept this once sat beside
  // (menu-formules.ts) was removed sitewide, Sept 2026 — the client only
  // runs the one menu now (see MenuContent.astro / AboutContent.astro).
  {
    label: { fr: 'Menu sur le pouce', en: 'Quick Bites', ar: 'وجبات سريعة' },
    items: [
      {
        name: 'Le Cheeseburger Moë',
        description: {
          fr: 'Accompagné de pommes wedges croustillantes et de son mesclun de salade verte.',
          en: 'Served with crispy potato wedges and a green mesclun salad.',
          ar: 'يقدم مع بطاطا ويدجز مقرمشة وسلطة مسكلان خضراء.',
        },
        price: 90,
      },
      {
        name: 'Le Croque Monsieur Classique',
        description: {
          fr: 'Servi avec pommes wedges et salade verte.',
          en: 'Served with potato wedges and green salad.',
          ar: 'يقدم مع بطاطا ويدجز وسلطة خضراء.',
        },
        price: 65,
        vegetarian: true,
      },
      {
        name: 'La Quesadilla au Poulet',
        description: {
          fr: 'Dorée et fondante, accompagnée de la salade verte aux herbes.',
          en: 'Golden and melty, served with a herbed green salad.',
          ar: 'ذهبية اللون وذائبة، تقدم مع سلطة خضراء بالأعشاب.',
        },
        price: 70,
      },
      {
        name: 'Le Mex',
        description: {
          fr: 'Cassolette de saucisses façon Tex-Mex, poivrons confits & pommes wedges.',
          en: 'Tex-Mex-style sausage cassolette with confit peppers & potato wedges.',
          ar: 'طاجين صغير من السجق على الطريقة التكس مكس مع فلفل مطهو وبطاطا ويدجز.',
        },
        price: 80,
      },
      {
        name: 'Le Panini du Chef',
        description: {
          fr: "Pain toasté, garniture du jour, accompagné de salade verte.",
          en: "Toasted bread, chef's daily filling, served with green salad.",
          ar: 'خبز محمص، حشوة اليوم، يقدم مع سلطة خضراء.',
        },
        price: 60,
      },
    ],
  },
  {
    label: { fr: 'Boissons Chaudes', en: 'Hot Drinks', ar: 'المشروبات الساخنة' },
    items: [
      {
        name: 'Espresso',
        description: { fr: 'Café espresso italien.', en: 'Italian espresso.', ar: 'إسبريسو إيطالي.' },
        price: 22,
        vegetarian: true,
      },
      {
        name: 'Double Espresso',
        description: {
          fr: 'Double dose d’espresso.',
          en: 'Double shot of espresso.',
          ar: 'جرعة مضاعفة من الإسبريسو.',
        },
        price: 25,
        vegetarian: true,
      },
      {
        name: 'Americano',
        description: {
          fr: 'Espresso allongé à l’eau chaude.',
          en: 'Espresso lengthened with hot water.',
          ar: 'إسبريسو ممدد بالماء الساخن.',
        },
        price: 25,
        vegetarian: true,
      },
      {
        name: 'Cappuccino',
        description: {
          fr: 'Espresso, lait chaud et mousse de lait.',
          en: 'Espresso, steamed milk and milk foam.',
          ar: 'إسبريسو مع حليب مبخر ورغوة الحليب.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Cortado',
        description: {
          fr: 'Espresso adouci d’un peu de lait chaud.',
          en: 'Espresso softened with a little steamed milk.',
          ar: 'إسبريسو ممزوج بقليل من الحليب الساخن.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Latte',
        description: {
          fr: 'Espresso avec beaucoup de lait chaud.',
          en: 'Espresso with plenty of steamed milk.',
          ar: 'إسبريسو مع كمية وافرة من الحليب الساخن.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Flat White',
        description: {
          fr: 'Espresso avec lait micro-moussé.',
          en: 'Espresso with velvety micro-foamed milk.',
          ar: 'إسبريسو مع حليب مخفوق ناعم.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Mocaccino',
        description: {
          fr: 'Espresso, chocolat et lait chaud.',
          en: 'Espresso, chocolate and steamed milk.',
          ar: 'إسبريسو مع شوكولاتة وحليب ساخن.',
        },
        price: 35,
        vegetarian: true,
      },
      {
        name: 'Chocolat Chaud',
        description: { fr: 'Chocolat chaud onctueux.', en: 'Rich hot chocolate.', ar: 'شوكولاتة ساخنة غنية.' },
        price: 35,
        vegetarian: true,
      },
      {
        name: 'Caramel Macchiato',
        description: {
          fr: 'Espresso, lait et sirop de caramel.',
          en: 'Espresso, milk and caramel syrup.',
          ar: 'إسبريسو مع حليب وشراب الكراميل.',
        },
        price: 35,
        vegetarian: true,
      },
    ],
  },
  // Moëtcha — matcha sub-line with a Moroccan twist (Amar, Sept 2026).
  // Replaces the old single generic "Matcha Latte" (Boissons Chaudes) and
  // the 4 generic iced fruit-matcha items that used to sit unrelated in
  // "Milkshakes, Frappés & Glacés" (Iced Matcha Latte, Strawberry/Mango/
  // Coconut Matcha Latte) — folded in here as the iced ("Glacé") variant
  // of each of the same 4 flavors, so the site tells ONE coherent matcha
  // story instead of two competing ones. Positioning: not the priciest/
  // chicest matcha in town (see matchai.ma) — accessible entry price,
  // Moroccan storytelling, quality sourcing as the actual selling point
  // (see `intro` below). Photos: `photoForward: true` below renders a
  // photo next to each item — the real product shots landed (Sept 2026,
  // /public/images/dr-moetcha-*.webp, same files menu-catalog.ts uses),
  // so every item below is wired to its own `image` now instead of the
  // branded placeholder tile. No dedicated Moëtcha logo yet — this still
  // leans on the brandLine text treatment below, not a mark.
  {
    label: { fr: 'Moëtcha', en: 'Moëtcha', ar: 'موتشا' },
    brandLine: { fr: 'MATCHA · BY MOË TEA ROOM', en: 'MATCHA · BY MOË TEA ROOM', ar: 'MATCHA · BY MOË TEA ROOM' },
    intro: {
      fr: 'Une matcha de haute qualité, sourcée avec soin, réinventée avec des saveurs marocaines accessibles à tous — pas la matcha la plus chic de la ville, la plus nôtre.',
      en: 'High-quality matcha, carefully sourced, reimagined with accessible Moroccan flavors — not the fanciest matcha in town, the one that’s truly ours.',
      ar: 'ماتشا عالية الجودة، مصدرها موثوق، بنكهات مغربية في متناول الجميع — ليست الأفخم في المدينة، بل الأقرب إلينا.',
    },
    photoForward: true,
    items: [
      {
        name: 'Moëtcha Classic',
        tagline: { fr: 'le pur matcha', en: 'pure matcha', ar: 'الماتشا النقية' },
        description: {
          fr: "Matcha latte pur, lait chaud, sans fioriture — le point d'entrée dans l'univers Moëtcha.",
          en: 'Pure matcha latte with steamed milk, no frills — the entry point into the Moëtcha world.',
          ar: 'ماتشا لاتيه نقية مع حليب ساخن، بدون إضافات، بوابتكم إلى عالم موتشا.',
        },
        price: 38,
        vegetarian: true,
        image: '/images/dr-moetcha-classic.webp',
      },
      {
        name: 'Moëtcha Classic Glacé',
        tagline: { fr: 'la version fraîche', en: 'the iced version', ar: 'النسخة المثلجة' },
        description: {
          fr: 'Le Classic servi glacé, pour les journées chaudes de Rabat.',
          en: "The Classic served over ice, for Rabat's warm days.",
          ar: 'نسخة الكلاسيك مثلجة، مثالية لأيام الرباط الحارة.',
        },
        price: 42,
        vegetarian: true,
        image: '/images/dr-moetcha-classic-glace.webp',
      },
      {
        name: 'Moëtcha Nana',
        tagline: { fr: 'la rencontre des deux thés', en: 'where two teas meet', ar: 'لقاء الشايين' },
        description: {
          fr: 'Matcha et menthe fraîche — le pont entre notre thé vert marocain et le matcha japonais.',
          en: "Matcha and fresh mint — the bridge between our Moroccan mint tea and Japanese matcha.",
          ar: 'ماتشا ونعناع طازج، جسر بين شاينا الأخضر المغربي والماتشا اليابانية.',
        },
        price: 42,
        vegetarian: true,
        image: '/images/dr-moetcha-nana.webp',
      },
      {
        name: 'Moëtcha Nana Glacé',
        tagline: { fr: 'fraîcheur marocaine', en: 'Moroccan freshness', ar: 'انتعاش مغربي' },
        description: {
          fr: 'Le Nana glacé, aussi rafraîchissant qu’un thé à la menthe bien frappé.',
          en: 'Nana served iced, as refreshing as a well-chilled mint tea.',
          ar: 'نانا مثلجة، منعشة كالشاي بالنعناع البارد.',
        },
        price: 46,
        vegetarian: true,
        image: '/images/dr-moetcha-nana-glace.webp',
      },
      {
        name: 'Moëtcha Amlou',
        tagline: { fr: 'la douceur du Maroc', en: 'the sweetness of Morocco', ar: 'حلاوة المغرب' },
        description: {
          fr: 'Matcha, amlou maison (amande, argan, miel) — onctueux et généreux.',
          en: 'Matcha with house amlou (almond, argan, honey) — creamy and indulgent.',
          ar: 'ماتشا مع أملو منزلي (لوز، أركان، عسل)، قوام كريمي وغني.',
        },
        price: 48,
        vegetarian: true,
        image: '/images/dr-moetcha-amlou.webp',
      },
      {
        name: 'Moëtcha Amlou Glacé',
        tagline: { fr: 'gourmand et frais', en: 'indulgent, served cold', ar: 'غني ومنعش' },
        description: {
          fr: "L'Amlou glacé, tout aussi crémeux, servi frappé.",
          en: 'The Amlou, just as creamy, served over ice.',
          ar: 'أملو مثلج بنفس القوام الكريمي.',
        },
        price: 52,
        vegetarian: true,
        image: '/images/dr-moetcha-amlou-glace.webp',
      },
      {
        name: 'Moëtcha Zahr',
        tagline: { fr: 'la fleur d’oranger en tasse', en: 'orange blossom in a cup', ar: 'زهر البرتقال في كوب' },
        description: {
          fr: 'Matcha et eau de fleur d’oranger — un clin d’œil floral à la pâtisserie marocaine.',
          en: 'Matcha and orange blossom water — a floral nod to Moroccan pastry.',
          ar: 'ماتشا وماء زهر البرتقال، لمسة عطرية من الحلويات المغربية.',
        },
        price: 42,
        vegetarian: true,
        image: '/images/dr-moetcha-zahr.webp',
      },
      {
        name: 'Moëtcha Zahr Glacé',
        tagline: { fr: 'légère et florale', en: 'light and floral', ar: 'خفيفة وعطرية' },
        description: {
          fr: "Le Zahr glacé, léger et parfumé, pour l'après-midi.",
          en: 'Zahr served iced, light and fragrant, for the afternoon.',
          ar: 'زهر مثلج، خفيف وعطري، مثالي لبعد الظهر.',
        },
        price: 46,
        vegetarian: true,
        image: '/images/dr-moetcha-zahr-glace.webp',
      },
    ],
  },
  {
    label: { fr: 'Thés et Infusions', en: 'Teas & Infusions', ar: 'الشاي والأعشاب' },
    items: [
      {
        name: 'Thé Vert Marocain',
        description: {
          fr: 'Le classique thé à la menthe marocain.',
          en: 'The classic Moroccan mint tea.',
          ar: 'الشاي الأخضر المغربي الكلاسيكي بالنعناع.',
        },
        price: 28,
        vegetarian: true,
        image: '/images/the-vert-marocain.webp',
        imageAlt: {
          fr: 'Thé vert marocain à la menthe servi dans un verre traditionnel',
          en: 'Moroccan mint green tea served in a traditional glass',
          ar: 'الشاي الأخضر المغربي بالنعناع في كأس تقليدي',
        },
      },
      {
        name: 'Thé Vert Jasmin',
        description: {
          fr: 'Thé vert parfumé à la fleur de jasmin.',
          en: 'Green tea scented with jasmine flowers.',
          ar: 'شاي أخضر معطر بأزهار الياسمين.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Thé Citron Gingembre',
        description: {
          fr: 'Infusion chaude au citron et gingembre.',
          en: 'Hot lemon and ginger infusion.',
          ar: 'شاي ساخن بالليمون والزنجبيل.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Thé Fruits Rouges',
        description: {
          fr: 'Thé aux notes fruitées de fruits rouges.',
          en: 'Tea with fruity red-berry notes.',
          ar: 'شاي بنكهة الفواكه الحمراء.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Infusion Verveine',
        description: {
          fr: 'Infusion apaisante à la verveine.',
          en: 'Soothing verbena infusion.',
          ar: 'شاي أعشاب مهدئ بنبتة اللويزة.',
        },
        price: 25,
        vegetarian: true,
      },
      {
        name: 'Thé Curcuma',
        description: {
          fr: 'Infusion au curcuma.',
          en: 'Turmeric infusion.',
          ar: 'شاي بالكركم.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Thé Noir Assam',
        description: {
          fr: 'Thé noir corsé originaire d’Assam.',
          en: 'Full-bodied black tea from Assam.',
          ar: 'شاي أسود قوي من منطقة آسام.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Rooibos',
        description: {
          fr: 'Infusion sud-africaine sans théine.',
          en: 'Caffeine-free South African infusion.',
          ar: 'شاي جنوب أفريقي خالٍ من الكافيين.',
        },
        price: 30,
        vegetarian: true,
      },
    ],
  },
  {
    label: { fr: 'Notre Expérience Éclair', en: 'The Éclair Experience', ar: 'تجربة الإكلير' },
    // Swapped Sept 2026 (Amar) for a real photo of the client's own éclair
    // counter (was the generic signature-dish.webp placeholder).
    image: '/images/eclair-vitrine.webp',
    imageAlt: {
      fr: 'Vitrine de pâtisserie Moë Tea Room avec éclairs et pâtisseries maison',
      en: 'Moë Tea Room pastry counter with éclairs and house-made pastries',
      ar: 'واجهة حلويات Moë Tea Room مع الإكلير والحلويات المصنوعة يدويًا',
    },
    items: [
      {
        name: 'Éclair Vanille',
        description: {
          fr: 'Crème vanille onctueuse aux notes douces et réconfortantes.',
          en: 'Silky vanilla cream with soft, comforting notes.',
          ar: 'كريمة فانيليا ناعمة بلمسات دافئة ومريحة.',
        },
        price: 28,
        vegetarian: true,
      },
      {
        name: 'Éclair Café',
        description: {
          fr: 'Crème café intense et parfumée, pour les amateurs de caractère.',
          en: 'Intense, fragrant coffee cream, for those who like character.',
          ar: 'كريمة قهوة قوية وعطرة لمحبي النكهات المميزة.',
        },
        price: 28,
        vegetarian: true,
      },
      {
        name: 'Éclair Chocolat',
        description: {
          fr: 'Crème chocolat fondante et riche en cacao.',
          en: 'Melting chocolate cream, rich in cocoa.',
          ar: 'كريمة شوكولاتة ذائبة وغنية بالكاكاو.',
        },
        price: 28,
        vegetarian: true,
      },
      {
        name: 'Éclair Noisette',
        description: {
          fr: 'Crème pralinée noisette, subtilement toastée et gourmande.',
          en: 'Hazelnut praline cream, subtly toasted and indulgent.',
          ar: 'كريمة برالين البندق، محمصة بلطف وغنية.',
        },
        price: 38,
        vegetarian: true,
      },
      {
        name: 'Éclair Pistache',
        description: {
          fr: 'Crème pistache douce et raffinée, aux arômes délicats.',
          en: 'Smooth, refined pistachio cream with delicate aromas.',
          ar: 'كريمة فستق ناعمة وراقية بنكهات دقيقة.',
        },
        price: 38,
        vegetarian: true,
      },
      {
        name: 'Éclair Framboise',
        description: {
          fr: 'Crème légère à la framboise, fraîche et légèrement acidulée.',
          en: 'Light raspberry cream, fresh and slightly tangy.',
          ar: 'كريمة توت العليق الخفيفة، منعشة ولاذعة قليلاً.',
        },
        price: 38,
        vegetarian: true,
      },
      {
        name: 'Éclair Citron',
        description: {
          fr: 'Crème citron vive et rafraîchissante, parfaite en fin de repas.',
          en: 'Bright, refreshing lemon cream, perfect to end a meal.',
          ar: 'كريمة ليمون منعشة، مثالية لختام الوجبة.',
        },
        price: 38,
        vegetarian: true,
      },
      {
        name: 'Éclair Mangue',
        description: {
          fr: 'Crème mangue exotique, douce et ensoleillée.',
          en: 'Exotic mango cream, sweet and sun-kissed.',
          ar: 'كريمة مانجو استوائية، حلوة ومشمسة.',
        },
        price: 38,
        vegetarian: true,
      },
      {
        name: 'Éclair Tiramisu',
        description: {
          fr: 'Crème mascarpone au café, inspirée du célèbre dessert italien.',
          en: 'Coffee mascarpone cream, inspired by the famous Italian dessert.',
          ar: 'كريمة الماسكاربوني بالقهوة، مستوحاة من الحلوى الإيطالية الشهيرة.',
        },
        price: 38,
        vegetarian: true,
      },
      {
        name: 'Éclair Amlou',
        description: {
          fr: "Crème amlou artisanale à base d'amandes, miel et huile d'argan, saveur authentique du Maroc.",
          en: 'House-made amlou cream with almonds, honey and argan oil — an authentic Moroccan flavor.',
          ar: 'كريمة أملو منزلية من اللوز والعسل وزيت الأركان، نكهة مغربية أصيلة.',
        },
        price: 40,
        vegetarian: true,
        // Best-guess match from the photos Amar sent (Sept 2026) — the
        // toasted, caramel-toned cream in the bitten shot reads as amlou's
        // almond/honey/argan filling. Flagged to Amar; swap if this is
        // actually a different flavor (e.g. Noisette/Café).
        image: '/images/eclair-amlou.webp',
        imageAlt: {
          fr: 'Éclair Amlou coupé, montrant sa crème onctueuse',
          en: 'Éclair Amlou, cut open to show its creamy filling',
          ar: 'إكلير أملو مقطوع يظهر كريمته الناعمة',
        },
      },
      {
        name: 'Éclair Signature Moë',
        description: {
          fr: 'Création éphémère, inspirée du moment et sublimée par le Chef Pâtissier.',
          en: 'A limited-edition creation, inspired by the moment and crafted by the Pastry Chef.',
          ar: 'إبداع موسمي مستوحى من اللحظة، من صنع شيف الحلويات.',
        },
        price: 42,
        vegetarian: true,
        // This item's own description says "création éphémère" — a
        // rotating seasonal creation — so the peach-and-white-chocolate
        // éclair Amar sent (clearly a specific one-off, not on the fixed
        // price list) fits here best. Flag to Amar if a different photo
        // should represent the "current" signature creation instead.
        image: '/images/eclair-signature.webp',
        imageAlt: {
          fr: 'Éclair signature du moment, garni de pêche et chocolat blanc',
          en: "The current signature éclair, topped with peach and white chocolate",
          ar: 'إكلير التوقيع الحالي، مزين بالخوخ والشوكولاتة البيضاء',
        },
      },
    ],
  },
  {
    label: { fr: 'Boulangerie et Viennoiseries', en: 'Bakery & Pastries', ar: 'المخبوزات والفطائر' },
    image: '/images/gallery-1.webp',
    // Corrected Sept 2026 (Amar) — this photo is actually the pastry-counter
    // tarts/gebakjes shot, not a basket of croissants/baguettes as
    // originally captioned. Kept generic on purpose: describe what the
    // photo actually shows rather than re-guessing another specific claim.
    imageAlt: {
      fr: 'Sélection de pâtisseries maison présentées au comptoir',
      en: 'Selection of house-made pastries displayed at the counter',
      ar: 'تشكيلة من الحلويات المصنوعة يدويًا معروضة على الطاولة',
    },
    items: [
      {
        name: 'Croissant Pur Beurre',
        description: {
          fr: 'Croissant traditionnel au beurre, feuilleté et doré.',
          en: 'Traditional all-butter croissant, flaky and golden.',
          ar: 'كرواسون تقليدي بالزبدة، طبقات مقرمشة وذهبية.',
        },
        price: 11,
        vegetarian: true,
      },
      {
        name: 'Pain au Chocolat',
        description: {
          fr: 'Viennoiserie feuilletée fourrée de chocolat.',
          en: 'Flaky pastry filled with chocolate.',
          ar: 'معجنات مقرمشة محشوة بالشوكولاتة.',
        },
        price: 13,
        vegetarian: true,
      },
      {
        name: 'Pain Suisse',
        description: {
          fr: 'Viennoiserie garnie de crème pâtissière et pépites de chocolat.',
          en: 'Pastry filled with custard cream and chocolate chips.',
          ar: 'معجنات محشوة بكريمة الحلوى ورقائق الشوكولاتة.',
        },
        price: 13,
        vegetarian: true,
      },
      {
        name: 'Pain aux Raisins',
        description: {
          fr: 'Viennoiserie feuilletée enroulée, garnie de crème et raisins secs.',
          en: 'Rolled flaky pastry with custard cream and raisins.',
          ar: 'معجنات ملفوفة محشوة بالكريمة والزبيب.',
        },
        price: 13,
        vegetarian: true,
      },
      {
        name: 'Baguette Tradition',
        description: {
          fr: 'Baguette de tradition française, croûte croustillante.',
          en: 'Traditional French baguette, crisp crust.',
          ar: 'باغيت فرنسي تقليدي بقشرة مقرمشة.',
        },
        price: 6.5,
        vegetarian: true,
      },
      {
        name: 'Brioche Artisanale',
        description: {
          fr: 'Brioche moelleuse faite maison.',
          en: 'Soft, house-made brioche.',
          ar: 'بريوش طري مصنوع منزليًا.',
        },
        price: 35,
        vegetarian: true,
      },
    ],
  },
  {
    label: { fr: 'Jus Frais & Mocktails', en: 'Fresh Juices & Mocktails', ar: 'العصائر الطازجة والموكتيل' },
    items: [
      {
        name: 'Orange Pressée',
        description: {
          fr: 'Jus d’orange fraîchement pressé.',
          en: 'Freshly squeezed orange juice.',
          ar: 'عصير برتقال طازج.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Citron Pressé',
        description: {
          fr: 'Jus de citron fraîchement pressé.',
          en: 'Freshly squeezed lemon juice.',
          ar: 'عصير ليمون طازج.',
        },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Avocat',
        description: { fr: 'Jus d’avocat crémeux.', en: 'Creamy avocado juice.', ar: 'عصير أفوكادو كريمي.' },
        price: 40,
        vegetarian: true,
      },
      {
        name: 'Avocat & Fruits Secs',
        description: {
          fr: 'Jus d’avocat aux fruits secs.',
          en: 'Avocado juice with dried fruits.',
          ar: 'عصير أفوكادو مع الفواكه المجففة.',
        },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Citron & Gingembre',
        description: {
          fr: 'Jus frais citron-gingembre.',
          en: 'Fresh lemon-ginger juice.',
          ar: 'عصير طازج بالليمون والزنجبيل.',
        },
        price: 35,
        vegetarian: true,
      },
      {
        name: 'Mojito Classique',
        description: {
          fr: 'Mocktail menthe et citron vert.',
          en: 'Mint and lime mocktail.',
          ar: 'موكتيل بالنعناع والليمون الأخضر.',
        },
        price: 40,
        vegetarian: true,
      },
      {
        name: 'Sunrise',
        description: {
          fr: 'Mocktail fruité aux couleurs du levant.',
          en: 'Fruity mocktail with sunrise colors.',
          ar: 'موكتيل فواكه بألوان شروق الشمس.',
        },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Red Mood',
        description: { fr: 'Mocktail aux fruits rouges.', en: 'Red-berry mocktail.', ar: 'موكتيل بالفواكه الحمراء.' },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Blue Mood',
        description: {
          fr: 'Mocktail fruité bleu curaçao.',
          en: 'Fruity blue curaçao mocktail.',
          ar: 'موكتيل فواكه بنكهة البلو كوراساو.',
        },
        price: 45,
        vegetarian: true,
      },
    ],
  },
  {
    label: {
      fr: 'Milkshakes, Frappés & Glacés',
      en: 'Milkshakes, Frappés & Iced Drinks',
      ar: 'الميلك شيك والفرابيه والمشروبات المثلجة',
    },
    items: [
      {
        name: 'Milk Shake Vanille',
        description: { fr: 'Milkshake onctueux à la vanille.', en: 'Creamy vanilla milkshake.', ar: 'ميلك شيك كريمي بالفانيليا.' },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Milk Shake Chocolat',
        description: { fr: 'Milkshake onctueux au chocolat.', en: 'Creamy chocolate milkshake.', ar: 'ميلك شيك كريمي بالشوكولاتة.' },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Milk Shake Caramel',
        description: { fr: 'Milkshake onctueux au caramel.', en: 'Creamy caramel milkshake.', ar: 'ميلك شيك كريمي بالكراميل.' },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Milk Shake Fraise',
        description: { fr: 'Milkshake onctueux à la fraise.', en: 'Creamy strawberry milkshake.', ar: 'ميلك شيك كريمي بالفراولة.' },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Milk Shake Banane',
        description: { fr: 'Milkshake onctueux à la banane.', en: 'Creamy banana milkshake.', ar: 'ميلك شيك كريمي بالموز.' },
        price: 45,
        vegetarian: true,
      },
      {
        name: 'Frappé Café',
        description: { fr: 'Café frappé glacé et mousseux.', en: 'Iced, frothy coffee frappé.', ar: 'قهوة فرابيه مثلجة ورغوية.' },
        price: 50,
        vegetarian: true,
      },
      {
        name: 'Frappé Café Lotus',
        description: { fr: 'Café frappé au biscuit Lotus.', en: 'Coffee frappé with Lotus biscuit.', ar: 'قهوة فرابيه بنكهة بسكويت لوتس.' },
        price: 50,
        vegetarian: true,
        image: '/images/frappe-cafe-lotus.webp',
        imageAlt: {
          fr: 'Frappé café glacé surmonté de chantilly et biscuit Lotus',
          en: 'Iced coffee frappé topped with whipped cream and a Lotus biscuit',
          ar: 'فرابيه قهوة مثلج مع كريمة مخفوقة وبسكويت لوتس',
        },
      },
      {
        name: 'Iced Americano',
        description: { fr: 'Americano glacé.', en: 'Iced americano.', ar: 'أمريكانو مثلج.' },
        price: 30,
        vegetarian: true,
      },
      {
        name: 'Iced Latte',
        description: { fr: 'Latte glacé.', en: 'Iced latte.', ar: 'لاتيه مثلج.' },
        price: 35,
        vegetarian: true,
      },
      {
        name: 'Iced Caramel Macchiato',
        description: { fr: 'Caramel macchiato glacé.', en: 'Iced caramel macchiato.', ar: 'كراميل ماكياتو مثلج.' },
        price: 40,
        vegetarian: true,
      },
      {
        name: 'Iced Mocha Latte',
        description: { fr: 'Mocha latte glacé.', en: 'Iced mocha latte.', ar: 'موكا لاتيه مثلج.' },
        price: 40,
        vegetarian: true,
      },
      {
        name: 'Iced Chocolat',
        description: { fr: 'Chocolat glacé.', en: 'Iced chocolate.', ar: 'شوكولاتة مثلجة.' },
        price: 40,
        vegetarian: true,
      },
      // The 4 generic iced matcha items that used to live here (Iced Matcha
      // Latte, Strawberry/Mango/Coconut Matcha Latte) moved into the new
      // "Moëtcha" category above, as the "Glacé" variant of each Moëtcha
      // flavor (Amar, Sept 2026) — one coherent matcha story instead of two.
    ],
  },
];
