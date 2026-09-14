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
}
export interface MenuHighlightCategory {
  label: LocalizedText;
  items: MenuHighlightItem[];
  image?: string;
  imageAlt?: LocalizedText;
}

export const menuHighlights: MenuHighlightCategory[] = [
  // Transcribed from the client's "Menu sur le pouce" PDF (Sept 2026) —
  // their savoury à-la-carte, distinct from the day/time-window formules
  // (see src/content/menu-formules.ts) which have no fixed items/price and
  // are shown separately, and from the drinks/pâtisserie card below.
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
        name: 'Matcha Latte',
        description: {
          fr: 'Thé matcha avec lait chaud.',
          en: 'Matcha tea with steamed milk.',
          ar: 'شاي ماتشا مع حليب ساخن.',
        },
        price: 45,
        vegetarian: true,
        image: '/images/matcha-latte.webp',
        imageAlt: {
          fr: 'Matcha latte avec mousse de lait en forme de cœur',
          en: 'Matcha latte with heart-shaped milk foam art',
          ar: 'ماتشا لاتيه مع رغوة حليب على شكل قلب',
        },
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
      {
        name: 'Iced Matcha Latte',
        description: { fr: 'Matcha latte glacé maison.', en: 'House-made iced matcha latte.', ar: 'ماتشا لاتيه مثلج، صنع منزلي.' },
        price: 50,
        vegetarian: true,
      },
      {
        name: 'Strawberry Matcha Latte',
        description: { fr: 'Matcha latte glacé à la fraise.', en: 'Iced matcha latte with strawberry.', ar: 'ماتشا لاتيه مثلج بالفراولة.' },
        price: 55,
        vegetarian: true,
      },
      {
        name: 'Mango Matcha Latte',
        description: { fr: 'Matcha latte glacé à la mangue.', en: 'Iced matcha latte with mango.', ar: 'ماتشا لاتيه مثلج بالمانجو.' },
        price: 55,
        vegetarian: true,
      },
      {
        name: 'Coconut Matcha Latte',
        description: {
          fr: 'Matcha latte glacé à la noix de coco.',
          en: 'Iced matcha latte with coconut.',
          ar: 'ماتشا لاتيه مثلج بجوز الهند.',
        },
        price: 55,
        vegetarian: true,
      },
    ],
  },
];
