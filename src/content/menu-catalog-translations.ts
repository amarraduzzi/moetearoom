// EN/AR overlay for the two menu-catalog.ts categories MenuContent.astro
// (the /menu marketing page) borrows directly from /commande's live
// catalog: Boissons and Pâtisserie. menu-catalog.ts itself deliberately
// keeps every item's `name`/`desc` as a plain FR string (see its own
// TRANSLATION STATUS note) — that's still correct for /commande, which
// is FR-only. But Amar asked for /menu to be "compleet" in every
// language ("doe maar in alle talen vertalen ook de boissons"), so this
// file supplies the missing EN/AR text for exactly those two sections,
// keyed by the catalog item's own `id` so it can never drift out of sync
// with which item is which — only MenuContent.astro reads this; /commande
// is untouched and keeps reading menu-catalog.ts's FR-only fields
// directly, per the earlier "alleen /menu aanpassen" scope decision.
//
// French is NOT repeated here — MenuContent.astro reads item.name/
// item.desc straight from menu-catalog.ts for 'fr' and only consults
// this file for 'en'/'ar', so the catalog file stays the single source
// of truth for the French text, prices, and images.
//
// Keep this in sync by hand whenever a Boissons/Pâtisserie item is
// added, renamed, or removed in menu-catalog.ts — there's no automated
// check tying the two together.
export interface CatalogItemTranslation {
  name: string;
  desc?: string;
}

export const catalogTranslations: Record<string, { en: CatalogItemTranslation; ar: CatalogItemTranslation }> = {
  // ---- Boissons — Chaud ----
  'dr-espresso': { en: { name: 'Espresso', desc: 'A pure shot, dense crema.' }, ar: { name: 'إسبريسو', desc: 'جرعة نقية بقشدة كثيفة.' } },
  'dr-double-espresso': { en: { name: 'Double Espresso', desc: 'Two shots, more intense.' }, ar: { name: 'إسبريسو مزدوج', desc: 'جرعتان، أكثر قوة.' } },
  'dr-americano': { en: { name: 'Americano', desc: 'Espresso lengthened with hot water.' }, ar: { name: 'أمريكانو', desc: 'إسبريسو ممدد بالماء الساخن.' } },
  'dr-cappuccino': { en: { name: 'Cappuccino', desc: 'Espresso, frothed milk, cocoa.' }, ar: { name: 'كابتشينو', desc: 'إسبريسو، حليب مرغى، كاكاو.' } },
  'dr-cortado': { en: { name: 'Cortado', desc: 'Espresso, warm milk, perfect balance.' }, ar: { name: 'كورتادو', desc: 'إسبريسو، حليب دافئ، توازن مثالي.' } },
  'dr-latte': { en: { name: 'Latte', desc: 'Espresso, silky milk.' }, ar: { name: 'لاتيه', desc: 'إسبريسو، حليب ناعم.' } },
  'dr-flatwhite': { en: { name: 'Flat White', desc: 'Espresso, silky micro-foam milk.' }, ar: { name: 'فلات وايت', desc: 'إسبريسو، رغوة حليب حريرية دقيقة.' } },
  'dr-mocaccino': { en: { name: 'Mocaccino', desc: 'Espresso, chocolate, frothed milk.' }, ar: { name: 'موكاتشينو', desc: 'إسبريسو، شوكولاتة، حليب مرغى.' } },
  'dr-chocolat-chaud': { en: { name: 'Hot Chocolate', desc: 'Melted dark chocolate, hot milk.' }, ar: { name: 'شوكولاتة ساخنة', desc: 'شوكولاتة داكنة مذابة، حليب ساخن.' } },
  'dr-caramel-macchiato': { en: { name: 'Caramel Macchiato', desc: 'Espresso, milk, house-made caramel.' }, ar: { name: 'كراميل ماكياتو', desc: 'إسبريسو، حليب، كراميل منزلي.' } },

  // ---- Boissons — Thés & Infusions ----
  'dr-the-vert-marocain': { en: { name: 'Moroccan Mint Tea', desc: 'Green tea with fresh mint.' }, ar: { name: 'أتاي مغربي بالنعناع', desc: 'شاي أخضر بالنعناع الطازج.' } },
  'dr-the-vert-jasmin': { en: { name: 'Jasmine Green Tea', desc: 'Green tea scented with jasmine.' }, ar: { name: 'شاي أخضر بالياسمين', desc: 'شاي أخضر معطر بالياسمين.' } },
  'dr-the-citron-gingembre': { en: { name: 'Lemon Ginger Tea', desc: 'Black tea, lemon, fresh ginger.' }, ar: { name: 'شاي بالليمون والزنجبيل', desc: 'شاي أسود، ليمون، زنجبيل طازج.' } },
  'dr-the-fruits-rouges': { en: { name: 'Red Berry Tea', desc: 'Tea with red berries.' }, ar: { name: 'شاي بالفواكه الحمراء', desc: 'شاي بنكهة الفواكه الحمراء.' } },
  'dr-infusion-verveine': { en: { name: 'Verbena Infusion', desc: 'Fresh verbena infusion.' }, ar: { name: 'منقوع لويزة', desc: 'منقوع لويزة طازجة.' } },
  'dr-the-curcuma': { en: { name: 'Turmeric Tea', desc: 'Tea with turmeric and mild spices.' }, ar: { name: 'شاي بالكركم', desc: 'شاي بالكركم والتوابل الخفيفة.' } },
  'dr-the-noir-assam': { en: { name: 'Assam Black Tea', desc: 'Bold, classic black tea.' }, ar: { name: 'شاي أسود أسام', desc: 'شاي أسود قوي وكلاسيكي.' } },
  'dr-rooibos': { en: { name: 'Rooibos', desc: 'Caffeine-free rooibos infusion.' }, ar: { name: 'رويبوس', desc: 'منقوع رويبوس خالٍ من الكافيين.' } },

  // ---- Boissons — Jus & Mocktails ----
  'dr-orange-pressee': { en: { name: 'Fresh Orange Juice', desc: 'Freshly squeezed orange juice.' }, ar: { name: 'عصير برتقال طازج', desc: 'عصير برتقال معصور في اللحظة.' } },
  'dr-citron-presse': { en: { name: 'Fresh Lemon Juice', desc: 'Freshly squeezed lemon, sugar on the side.' }, ar: { name: 'عصير ليمون طازج', desc: 'عصير ليمون طازج، مع السكر جانبًا.' } },
  'dr-avocat': { en: { name: 'Avocado Juice', desc: 'Creamy avocado juice.' }, ar: { name: 'عصير أفوكادو', desc: 'عصير أفوكادو كريمي.' } },
  'dr-avocat-fruits-secs': { en: { name: 'Avocado & Dried Fruits', desc: 'Avocado, milk, dried fruits.' }, ar: { name: 'أفوكادو وفواكه مجففة', desc: 'أفوكادو، حليب، فواكه مجففة.' } },
  'dr-citron-gingembre': { en: { name: 'Lemon & Ginger', desc: 'Lemon, fresh ginger, honey.' }, ar: { name: 'ليمون وزنجبيل', desc: 'ليمون، زنجبيل طازج، عسل.' } },
  'dr-mojito': { en: { name: 'Classic Mojito (Virgin)', desc: 'Lime, mint, cane sugar (non-alcoholic).' }, ar: { name: 'موخيتو كلاسيكي (بدون كحول)', desc: 'ليمون أخضر، نعناع، سكر القصب (بدون كحول).' } },
  'dr-sunrise': { en: { name: 'Sunrise', desc: 'Orange, grenadine, seasonal fruits.' }, ar: { name: 'صنرايز', desc: 'برتقال، غرينادين، فواكه الموسم.' } },
  'dr-red-mood': { en: { name: 'Red Mood', desc: 'Red berries, refreshing mocktail.' }, ar: { name: 'ريد مود', desc: 'فواكه حمراء، موكتيل منعش.' } },
  'dr-blue-mood': { en: { name: 'Blue Mood', desc: 'Blue curaçao, lemon, signature mocktail.' }, ar: { name: 'بلو مود', desc: 'كوراساو أزرق، ليمون، موكتيل مميز.' } },

  // ---- Boissons — Frappés & Glacés ----
  'dr-milkshake-vanille': { en: { name: 'Vanilla Milkshake', desc: 'Vanilla ice cream, milk, whipped cream.' }, ar: { name: 'ميلك شيك بالفانيليا', desc: 'آيس كريم فانيليا، حليب، كريمة مخفوقة.' } },
  'dr-milkshake-chocolat': { en: { name: 'Chocolate Milkshake', desc: 'Chocolate ice cream, milk, whipped cream.' }, ar: { name: 'ميلك شيك بالشوكولاتة', desc: 'آيس كريم شوكولاتة، حليب، كريمة مخفوقة.' } },
  'dr-milkshake-caramel': { en: { name: 'Caramel Milkshake', desc: 'Caramel ice cream, milk, whipped cream.' }, ar: { name: 'ميلك شيك بالكراميل', desc: 'آيس كريم كراميل، حليب، كريمة مخفوقة.' } },
  'dr-milkshake-fraise': { en: { name: 'Strawberry Milkshake', desc: 'Strawberry ice cream, milk, whipped cream.' }, ar: { name: 'ميلك شيك بالفراولة', desc: 'آيس كريم فراولة، حليب، كريمة مخفوقة.' } },
  'dr-milkshake-banane': { en: { name: 'Banana Milkshake', desc: 'Banana ice cream, milk, whipped cream.' }, ar: { name: 'ميلك شيك بالموز', desc: 'آيس كريم موز، حليب، كريمة مخفوقة.' } },
  'dr-frappe-cafe': { en: { name: 'Coffee Frappé', desc: 'Blended iced coffee, creamy foam.' }, ar: { name: 'فرابيه قهوة', desc: 'قهوة مثلجة ممزوجة، رغوة كريمية.' } },
  'dr-frappe-lotus': { en: { name: 'Lotus Coffee Frappé', desc: 'Iced coffee, Lotus biscuit.' }, ar: { name: 'فرابيه قهوة لوتس', desc: 'قهوة مثلجة، بسكويت لوتس.' } },
  'dr-iced-americano': { en: { name: 'Iced Americano', desc: 'Long espresso, ice.' }, ar: { name: 'أمريكانو مثلج', desc: 'إسبريسو ممدد، ثلج.' } },
  'dr-iced-latte': { en: { name: 'Iced Latte', desc: 'Espresso, cold milk, ice.' }, ar: { name: 'لاتيه مثلج', desc: 'إسبريسو، حليب بارد، ثلج.' } },
  'dr-iced-caramel': { en: { name: 'Iced Caramel Macchiato', desc: 'Espresso, milk, caramel, ice.' }, ar: { name: 'كراميل ماكياتو مثلج', desc: 'إسبريسو، حليب، كراميل، ثلج.' } },
  'dr-iced-mocha': { en: { name: 'Iced Mocha Latte', desc: 'Espresso, chocolate, milk, ice.' }, ar: { name: 'موكا لاتيه مثلج', desc: 'إسبريسو، شوكولاتة، حليب، ثلج.' } },
  'dr-iced-chocolat': { en: { name: 'Iced Chocolate', desc: 'Iced chocolate, whipped cream.' }, ar: { name: 'شوكولاتة مثلجة', desc: 'شوكولاتة مثلجة، كريمة مخفوقة.' } },

  // ---- Pâtisserie — Éclairs ----
  'pa-eclair-vanille': { en: { name: 'Vanilla Éclair', desc: 'Vanilla pastry cream.' }, ar: { name: 'إكلير فانيليا', desc: 'كريم حلواني بالفانيليا.' } },
  'pa-eclair-cafe': { en: { name: 'Coffee Éclair', desc: 'Coffee pastry cream.' }, ar: { name: 'إكلير قهوة', desc: 'كريم حلواني بالقهوة.' } },
  'pa-eclair-chocolat': { en: { name: 'Chocolate Éclair', desc: 'Dark chocolate pastry cream.' }, ar: { name: 'إكلير شوكولاتة', desc: 'كريم حلواني بالشوكولاتة الداكنة.' } },
  'pa-eclair-noisette': { en: { name: 'Hazelnut Éclair', desc: 'Hazelnut cream, crunchy pieces.' }, ar: { name: 'إكلير بندق', desc: 'كريم البندق، قطع مقرمشة.' } },
  'pa-eclair-pistache': { en: { name: 'Pistachio Éclair', desc: 'Pistachio cream, pistachio pieces.' }, ar: { name: 'إكلير فستق', desc: 'كريم الفستق، قطع فستق.' } },
  'pa-eclair-framboise': { en: { name: 'Raspberry Éclair', desc: 'Vanilla cream, raspberry glaze.' }, ar: { name: 'إكلير توت العليق', desc: 'كريم فانيليا، تزجيج بتوت العليق.' } },
  'pa-eclair-citron': { en: { name: 'Lemon Éclair', desc: 'Lemon cream, fresh zest.' }, ar: { name: 'إكلير ليمون', desc: 'كريم الليمون، برش طازج.' } },
  'pa-eclair-mangue': { en: { name: 'Mango Éclair', desc: 'Mango cream, golden glaze.' }, ar: { name: 'إكلير مانجو', desc: 'كريم المانجو، تزجيج ذهبي.' } },
  'pa-eclair-tiramisu': { en: { name: 'Tiramisu Éclair', desc: 'Mascarpone-coffee cream, cocoa.' }, ar: { name: 'إكلير تيراميسو', desc: 'كريم الماسكاربوني بالقهوة، كاكاو.' } },
  'pa-eclair-amlou': { en: { name: 'Amlou Éclair', desc: 'Almond, honey, argan.' }, ar: { name: 'إكلير أملو', desc: 'لوز، عسل، أركان.' } },
  'pa-eclair-signature': { en: { name: 'Signature Moë Éclair', desc: "The moment's creation." }, ar: { name: 'إكلير موي المميز', desc: 'إبداع اللحظة.' } },

  // ---- Pâtisserie — Boulangerie ----
  'pa-croissant': { en: { name: 'All-Butter Croissant', desc: 'All butter, traditional lamination.' }, ar: { name: 'كرواسون بالزبدة الخالصة', desc: 'زبدة خالصة، عجين مورّق تقليدي.' } },
  'pa-pain-chocolat': { en: { name: 'Pain au Chocolat', desc: 'All-butter pastry, chocolate heart.' }, ar: { name: 'بان أو شوكولا', desc: 'عجين مورّق بالزبدة، بقلب شوكولاتة.' } },
  'pa-pain-suisse': { en: { name: 'Pain Suisse', desc: 'Pastry cream, chocolate chips.' }, ar: { name: 'بان سويس', desc: 'كريم حلواني، رقائق شوكولاتة.' } },
  'pa-pain-raisins': { en: { name: 'Pain aux Raisins', desc: 'Laminated spiral, raisins, cream.' }, ar: { name: 'بان أو رزان', desc: 'لفائف مورّقة، زبيب، كريمة.' } },
  'pa-baguette': { en: { name: 'Traditional Baguette', desc: 'French tradition, crisp crust.' }, ar: { name: 'باغيت تقليدي', desc: 'على الطريقة الفرنسية التقليدية، قشرة مقرمشة.' } },
  'pa-brioche': { en: { name: 'Artisanal Brioche', desc: 'Soft, house-made brioche.' }, ar: { name: 'بريوش حرفي', desc: 'بريوش طري، صنع منزلي.' } },
};
