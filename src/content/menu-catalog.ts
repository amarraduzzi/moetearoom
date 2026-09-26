// Single source of truth for the real menu — used by BOTH the marketing
// Menu page (MenuContent.astro, browse-only) and the QR table-ordering
// page (CommandeContent.astro, /commande). Previously these were two
// separate catalogs (menu-highlights.ts vs. an inline array inside
// CommandeContent.astro) that had already drifted apart — different
// categories, different item names for the same dishes. Amar asked
// (Sept 2026) for the site's Menu page to become "hetzelfde" as
// /commande instead of its own thing, since both are meant to feed the
// same place orders land (the staff screen at /screen): one catalog,
// shown two ways.
//
// TRANSLATION STATUS (flag this honestly, don't hide it): category
// labels below are translated fr/en/ar. Individual item names and
// descriptions are NOT — they're the exact French text transcribed from
// the client's own menu/PDFs, shown as-is regardless of the selected
// language for now. Translating ~90 dish names/descriptions into en/ar
// is real work of its own; this file is the "basis" Amar asked for
// first, photos and translations layer on top of it later.
//
// Photos: Amar is producing real photography for every item on the
// card (Sept 2026). `image` is already wired wherever a real photo
// exists today (breakfast/brunch/sandwichs/pancakes, a handful of
// Moëtcha drinks) — everything else falls back to a plain text
// row/icon on both pages until its photo lands. Drop a new photo into
// /public/images and set this item's `image` field; both pages pick
// it up automatically, nothing else to touch.
import type { LocalizedText } from '../i18n/languages';

export interface CatalogItem {
  id: string;
  cat: string;
  // FR-only sub-heading within a `style: 'list'` category (e.g. "Chaud",
  // "Moëtcha", "Éclairs") — see TRANSLATION STATUS above.
  sub?: string;
  station: 'cuisine' | 'bar';
  name: string;
  desc?: string;
  price: number;
  // Indicative dietary/style tags for the /commande filter bar — 'vegan'
  // and 'epice' are explicit positive lists (only items we're confident
  // about carry the tag); 'viande' marks the few dishes containing meat
  // so the "Végétarien" filter can exclude them (everything else on this
  // menu has no meat/fish, so it's the safer list to maintain by hand).
  // Always shown next to a "signalez vos allergies en salle" note on the
  // page itself — these are a convenience, not an allergen guarantee.
  tags?: Array<'vegan' | 'epice' | 'viande'>;
  // Small merchandising badge on the card — kept to a handful of items
  // so it still means something.
  badge?: 'populaire' | 'chef';
  image?: string;
  imageAlt?: LocalizedText;
}

export interface CatalogCategory {
  id: string;
  label: LocalizedText;
  // 'cards' = big photo-forward tiles (breakfast/brunch/sandwichs/pancakes
  // — dishes composed freely, one photo tells the story). 'list' = compact
  // text rows grouped by `sub` (drinks/patisserie — too many items for
  // photo cards to make sense of everything at once).
  style: 'cards' | 'list';
  // FR-only short service-note shown under the category heading, and the
  // "compose your plate" blurb for breakfast/brunch — see TRANSLATION
  // STATUS above.
  sub?: string;
  combo?: string;
}

export const CATEGORIES: CatalogCategory[] = [
  {
    id: 'breakfast',
    label: { fr: 'Petit-déjeuner', en: 'Breakfast', ar: 'الإفطار' },
    style: 'cards',
    sub: 'Service du matin. Petites portions à composer librement.',
    combo: 'Composez votre petit-déjeuner : piochez librement parmi ces 8 assiettes, une ou plusieurs à la fois.',
  },
  {
    id: 'brunch',
    label: { fr: 'Brunch & Lunch', en: 'Brunch & Lunch', ar: 'برانش وغداء' },
    style: 'cards',
    sub: 'Service dès 11h30. Petites portions à composer librement.',
    combo: 'Composez votre brunch ou déjeuner : ces 8 assiettes se combinent entre elles comme celles du petit-déjeuner.',
  },
  {
    // Own top-level category (Amar, Sept 2026: "ik wil een aparte
    // categorie Moetcha, niet onder Boissons") — was a `sub`-grouped
    // subsection inside 'drinks' before. Kept `style: 'cards'` since
    // every Moëtcha drink already has real photography and rendered as
    // full photo cards even as a subgroup (see CommandeContent.astro's
    // "hasPhotos" branch) — moving it out one level just drops the
    // in-between "Moëtcha" subheading, the cards look identical.
    id: 'moetcha',
    label: { fr: 'Moëtcha', en: 'Moëtcha', ar: 'موتشا' },
    style: 'cards',
    sub: 'Notre gamme matcha maison, servie chaude ou glacée.',
  },
  {
    id: 'sandwichs',
    label: { fr: 'Sandwichs', en: 'Sandwiches', ar: 'ساندويتشات' },
    style: 'cards',
  },
  {
    id: 'pancakes',
    label: { fr: 'Pancakes', en: 'Pancakes', ar: 'بان كيك' },
    style: 'cards',
    sub: 'Base américaine classique, à garnir selon l’envie.',
  },
  {
    id: 'drinks',
    label: { fr: 'Boissons', en: 'Drinks', ar: 'المشروبات' },
    style: 'list',
  },
  {
    id: 'patisserie',
    label: { fr: 'Pâtisserie', en: 'Pastries', ar: 'المعجنات' },
    style: 'list',
  },
];
export const CATEGORIES_BY_ID: Record<string, CatalogCategory> = {};
CATEGORIES.forEach((c) => { CATEGORIES_BY_ID[c.id] = c; });

export const ITEMS: CatalogItem[] = [
  // ---- Petit-déjeuner (8) ----
  { id: 'bf-msemen', cat: 'breakfast', station: 'cuisine', name: 'Msemen & Amlou Miel', desc: 'Mini msemen tiède, amlou maison, filet de miel.', price: 35, image: '/images/bf-msemen-amlou.webp' },
  { id: 'bf-baghrir', cat: 'breakfast', station: 'cuisine', name: 'Baghrir Beurre-Miel Fleur d’Oranger', desc: 'Mini baghrir, beurre fondu, miel à la fleur d’oranger.', price: 35, image: '/images/bf-baghrir.webp' },
  { id: 'bf-tartine', cat: 'breakfast', station: 'cuisine', name: 'Tartine Huile d’Olive & Tomate Confite', desc: 'Pain maison, huile d’olive, za’atar, tomate confite.', price: 32, tags: ['vegan'], image: '/images/bf-tartine-tomate.webp' },
  { id: 'bf-oeuf', cat: 'breakfast', station: 'cuisine', name: 'Oeuf Mollé, Dukkah & Pain Grillé', desc: 'Oeuf mollé, dukkah, pain grillé.', price: 38, image: '/images/bf-oeuf-mole-dukkah.webp' },
  { id: 'bf-yaourt', cat: 'breakfast', station: 'cuisine', name: 'Yaourt, Granola Maison & Fruits Secs', desc: 'Yaourt nature, granola maison, fruits secs.', price: 32, image: '/images/bf-yaourt-granola.webp' },
  { id: 'bf-viennoiserie', cat: 'breakfast', station: 'cuisine', name: 'Viennoiserie Chocolat-Amande', desc: 'Mini viennoiserie façon française, coeur amande.', price: 28, image: '/images/bf-viennoiserie-chocolat-amande.webp' },
  { id: 'bf-dattes', cat: 'breakfast', station: 'cuisine', name: 'Dattes Farcies Amande & Cannelle', desc: 'Dattes deglet nour, pâte d’amande, cannelle.', price: 30, tags: ['vegan'], image: '/images/bf-dattes-farcies.webp' },
  { id: 'bf-assiette', cat: 'breakfast', station: 'cuisine', name: 'Assiette Marocaine Traditionnelle', desc: 'Huile d’olive, olives beldi, khobz maison.', price: 30, tags: ['vegan'], image: '/images/bf-assiette-marocaine.webp' },

  // ---- Brunch / Lunch (8) ----
  { id: 'br-shakshuka', cat: 'brunch', station: 'cuisine', name: 'Shakshuka Ras el Hanout', desc: 'Format individuel, oeufs pochés, pain maison.', price: 48, tags: ['epice'], badge: 'populaire', image: '/images/br-shakshuka.webp' },
  { id: 'br-tapas', cat: 'brunch', station: 'cuisine', name: 'Assiette de Tapas Marocaines', desc: 'Zaalouk, houmous, taktouka, pain grillé.', price: 45, tags: ['vegan'], badge: 'populaire', image: '/images/br-tapas-marocaines.webp' },
  { id: 'br-salade', cat: 'brunch', station: 'cuisine', name: 'Salade Marocaine-Française', desc: 'Légumes de saison, vinaigrette à l’orange.', price: 42, tags: ['vegan'], image: '/images/br-salade-marocaine-francaise.webp' },
  { id: 'br-wrap', cat: 'brunch', station: 'cuisine', name: 'Wrap Poulet Chermoula', desc: 'Poulet mariné, légumes croquants.', price: 48, tags: ['epice', 'viande'], image: '/images/br-wrap-poulet-chermoula.webp' },
  { id: 'br-bouddha', cat: 'brunch', station: 'cuisine', name: 'Bol Bouddha Marocain', desc: 'Quinoa, légumes rôtis, tahini-citron.', price: 52, tags: ['vegan'], image: '/images/br-bol-bouddha.webp' },
  { id: 'br-veloute', cat: 'brunch', station: 'cuisine', name: 'Velouté de Courge & Épices Douces', desc: 'Texture soyeuse, croûtons maison.', price: 35, image: '/images/br-veloute-courge.webp' },
  { id: 'br-boulettes', cat: 'brunch', station: 'cuisine', name: 'Boulettes d’Agneau Ras el Hanout', desc: 'Format tapas, sauce yaourt.', price: 48, tags: ['epice', 'viande'], image: '/images/br-boulettes-agneau.webp' },
  { id: 'br-planche', cat: 'brunch', station: 'cuisine', name: 'Planche Sucrée-Salée à Partager', desc: 'Format 2 pers., fromages, fruits, miel, noix.', price: 90, image: '/images/br-planche-sucree-salee.webp' },

  // ---- Sandwichs (2) ----
  { id: 'sw-club', cat: 'sandwichs', station: 'cuisine', name: 'Club Moë', desc: 'Poulet ras el hanout, mayonnaise harissa, pain grillé.', price: 58, tags: ['epice', 'viande'], badge: 'populaire', image: '/images/sw-club.webp' },
  { id: 'sw-amlou', cat: 'sandwichs', station: 'cuisine', name: 'Végétarien Amlou', desc: 'Chèvre, amlou, roquette.', price: 52, image: '/images/sw-amlou.webp' },

  // ---- Pancakes (3) ----
  { id: 'pc-classique', cat: 'pancakes', station: 'cuisine', name: 'Pile Classique', desc: 'Sirop d’érable, beurre.', price: 48, image: '/images/pc-classique.webp' },
  { id: 'pc-marocaine', cat: 'pancakes', station: 'cuisine', name: 'Pile Marocaine', desc: 'Amlou, miel, fruits secs.', price: 58, image: '/images/pc-marocaine.webp' },
  { id: 'pc-fruits', cat: 'pancakes', station: 'cuisine', name: 'Pile Fruits de Saison', desc: 'Fruits frais, coulis maison.', price: 55, image: '/images/pc-fruits.webp' },

  // ---- Boissons — Chaud ----
  { id: 'dr-espresso', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Espresso', desc: 'Un shot pur, crema dense.', price: 22, tags: ['vegan'], image: '/images/espresso.webp' },
  { id: 'dr-double-espresso', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Double Espresso', desc: 'Deux shots, plus intense.', price: 25, tags: ['vegan'], image: '/images/double-espresso.webp' },
  { id: 'dr-americano', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Americano', desc: 'Espresso allongé à l\'eau chaude.', price: 25, tags: ['vegan'], image: '/images/americano.webp' },
  { id: 'dr-cappuccino', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Cappuccino', desc: 'Espresso, lait mousseux, cacao.', price: 30, image: '/images/cappuccino.webp' },
  { id: 'dr-cortado', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Cortado', desc: 'Espresso, lait chaud, équilibre parfait.', price: 30, image: '/images/cortado.webp' },
  { id: 'dr-latte', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Latte', desc: 'Espresso, lait onctueux.', price: 30, image: '/images/latte.webp' },
  { id: 'dr-flatwhite', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Flat White', desc: 'Espresso, micro-mousse de lait soyeuse.', price: 30, image: '/images/flatwhite.webp' },
  { id: 'dr-mocaccino', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Mocaccino', desc: 'Espresso, chocolat, lait mousseux.', price: 35, image: '/images/mocaccino.webp' },
  { id: 'dr-chocolat-chaud', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Chocolat Chaud', desc: 'Chocolat noir fondu, lait chaud.', price: 35, image: '/images/chocolat-chaud.webp' },
  { id: 'dr-caramel-macchiato', cat: 'drinks', station: 'bar', sub: 'Chaud', name: 'Caramel Macchiato', desc: 'Espresso, lait, caramel maison.', price: 35, image: '/images/caramel-macchiato.webp' },

  // ---- Moëtcha (own top-level category, see CATEGORIES above) ----
  { id: 'dr-moetcha-classic', cat: 'moetcha', station: 'bar', name: 'Moëtcha Classic', desc: 'Le pur matcha.', price: 38, image: '/images/dr-moetcha-classic.webp' },
  { id: 'dr-moetcha-classic-glace', cat: 'moetcha', station: 'bar', name: 'Moëtcha Classic Glacé', desc: 'Le pur matcha, glacé.', price: 42, image: '/images/dr-moetcha-classic-glace.webp' },
  { id: 'dr-moetcha-nana', cat: 'moetcha', station: 'bar', name: 'Moëtcha Nana', desc: 'Matcha et menthe fraîche.', price: 42, badge: 'populaire', image: '/images/dr-moetcha-nana.webp' },
  { id: 'dr-moetcha-nana-glace', cat: 'moetcha', station: 'bar', name: 'Moëtcha Nana Glacé', desc: 'Matcha et menthe fraîche, glacé.', price: 46, image: '/images/dr-moetcha-nana-glace.webp' },
  { id: 'dr-moetcha-amlou', cat: 'moetcha', station: 'bar', name: 'Moëtcha Amlou', desc: 'Matcha, amlou maison.', price: 48, image: '/images/dr-moetcha-amlou.webp' },
  { id: 'dr-moetcha-amlou-glace', cat: 'moetcha', station: 'bar', name: 'Moëtcha Amlou Glacé', desc: 'Matcha, amlou maison, glacé.', price: 52, image: '/images/dr-moetcha-amlou-glace.webp' },
  { id: 'dr-moetcha-zahr', cat: 'moetcha', station: 'bar', name: 'Moëtcha Zahr', desc: 'Matcha, fleur d’oranger.', price: 42, image: '/images/dr-moetcha-zahr.webp' },
  { id: 'dr-moetcha-zahr-glace', cat: 'moetcha', station: 'bar', name: 'Moëtcha Zahr Glacé', desc: 'Matcha, fleur d\'oranger, glacé.', price: 46, image: '/images/dr-moetcha-zahr-glace.webp' },

  // ---- Boissons — Thés & Infusions ----
  { id: 'dr-the-vert-marocain', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Thé Vert Marocain', desc: 'Thé vert à la menthe fraîche.', price: 28, tags: ['vegan'], image: '/images/the-vert-marocain.webp' },
  { id: 'dr-the-vert-jasmin', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Thé Vert Jasmin', desc: 'Thé vert parfumé au jasmin.', price: 30, tags: ['vegan'], image: '/images/the-vert-jasmin.webp' },
  { id: 'dr-the-citron-gingembre', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Thé Citron Gingembre', desc: 'Thé noir, citron, gingembre frais.', price: 30, tags: ['vegan'], image: '/images/the-citron-gingembre.webp' },
  { id: 'dr-the-fruits-rouges', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Thé Fruits Rouges', desc: 'Thé aux fruits rouges.', price: 30, tags: ['vegan'], image: '/images/the-fruits-rouges.webp' },
  { id: 'dr-infusion-verveine', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Infusion Verveine', desc: 'Infusion de verveine fraîche.', price: 25, tags: ['vegan'], image: '/images/infusion-verveine.webp' },
  { id: 'dr-the-curcuma', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Thé Curcuma', desc: 'Thé au curcuma et épices douces.', price: 30, tags: ['vegan'], image: '/images/the-curcuma.webp' },
  { id: 'dr-the-noir-assam', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Thé Noir Assam', desc: 'Thé noir corsé, classique.', price: 30, tags: ['vegan'], image: '/images/the-noir-assam.webp' },
  { id: 'dr-rooibos', cat: 'drinks', station: 'bar', sub: 'Thés & Infusions', name: 'Rooibos', desc: 'Infusion rooibos, sans théine.', price: 30, tags: ['vegan'], image: '/images/rooibos.webp' },

  // ---- Boissons — Jus & Mocktails ----
  { id: 'dr-orange-pressee', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Orange Pressée', desc: 'Orange pressée minute.', price: 30, tags: ['vegan'], image: '/images/orange-pressee.webp' },
  { id: 'dr-citron-presse', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Citron Pressé', desc: 'Citron pressé, sucre à part.', price: 30, tags: ['vegan'], image: '/images/citron-presse.webp' },
  { id: 'dr-avocat', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Avocat', desc: 'Jus d\'avocat crémeux.', price: 40, image: '/images/avocat.webp' },
  { id: 'dr-avocat-fruits-secs', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Avocat & Fruits Secs', desc: 'Avocat, lait, fruits secs.', price: 45, image: '/images/avocat-fruits-secs.webp' },
  { id: 'dr-citron-gingembre', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Citron & Gingembre', desc: 'Citron, gingembre frais, miel.', price: 35, tags: ['vegan'], image: '/images/citron-gingembre.webp' },
  { id: 'dr-mojito', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Mojito Classique', desc: 'Citron vert, menthe, sucre de canne (sans alcool).', price: 40, tags: ['vegan'], image: '/images/mojito.webp' },
  { id: 'dr-sunrise', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Sunrise', desc: 'Orange, grenadine, fruits de saison.', price: 45, tags: ['vegan'], image: '/images/sunrise.webp' },
  { id: 'dr-red-mood', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Red Mood', desc: 'Fruits rouges, mocktail rafraîchissant.', price: 45, tags: ['vegan'], image: '/images/red-mood.webp' },
  { id: 'dr-blue-mood', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Blue Mood', desc: 'Curaçao bleu, citron, mocktail signature.', price: 45, tags: ['vegan'], image: '/images/blue-mood.webp' },
  // Amar, Sept 2026: "Boisson extra / Bissap MOE 50DH" — nieuwe echte
  // drank, geen foto beschikbaar (geen image-veld, net als andere
  // items zonder foto elders in deze catalogus).
  { id: 'dr-bissap-moe', cat: 'drinks', station: 'bar', sub: 'Jus & Mocktails', name: 'Bissap Moë', desc: 'Infusion d\'hibiscus maison, fraîche et légèrement sucrée.', price: 50, tags: ['vegan'] },

  // ---- Boissons — Frappés & Glacés ----
  { id: 'dr-milkshake-vanille', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Milk Shake Vanille', desc: 'Glace vanille, lait, chantilly.', price: 45, image: '/images/milkshake-vanille.webp' },
  { id: 'dr-milkshake-chocolat', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Milk Shake Chocolat', desc: 'Glace chocolat, lait, chantilly.', price: 45, image: '/images/milkshake-chocolat.webp' },
  { id: 'dr-milkshake-caramel', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Milk Shake Caramel', desc: 'Glace caramel, lait, chantilly.', price: 45, image: '/images/milkshake-caramel.webp' },
  { id: 'dr-milkshake-fraise', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Milk Shake Fraise', desc: 'Glace fraise, lait, chantilly.', price: 45, image: '/images/milkshake-fraise.webp' },
  { id: 'dr-milkshake-banane', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Milk Shake Banane', desc: 'Glace banane, lait, chantilly.', price: 45, image: '/images/milkshake-banane.webp' },
  { id: 'dr-frappe-cafe', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Frappé Café', desc: 'Café glacé mixé, mousse onctueuse.', price: 50, image: '/images/frappe-cafe.webp' },
  { id: 'dr-frappe-lotus', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Frappé Café Lotus', desc: 'Café glacé, biscuit lotus.', price: 50, image: '/images/frappe-cafe-lotus.webp' },
  { id: 'dr-iced-americano', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Iced Americano', desc: 'Espresso allongé, glace.', price: 30, tags: ['vegan'], image: '/images/iced-americano.webp' },
  { id: 'dr-iced-latte', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Iced Latte', desc: 'Espresso, lait froid, glace.', price: 35, image: '/images/iced-latte.webp' },
  { id: 'dr-iced-caramel', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Iced Caramel Macchiato', desc: 'Espresso, lait, caramel, glace.', price: 40, image: '/images/iced-caramel.webp' },
  { id: 'dr-iced-mocha', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Iced Mocha Latte', desc: 'Espresso, chocolat, lait, glace.', price: 40, image: '/images/iced-mocha.webp' },
  { id: 'dr-iced-chocolat', cat: 'drinks', station: 'bar', sub: 'Frappés & Glacés', name: 'Iced Chocolat', desc: 'Chocolat glacé, chantilly.', price: 40, image: '/images/iced-chocolat.webp' },

  // ---- Pâtisserie — Éclairs ----
  { id: 'pa-eclair-vanille', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Vanille', desc: 'Crème pâtissière vanille.', price: 28, image: '/images/eclair-vanille.webp' },
  { id: 'pa-eclair-cafe', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Café', desc: 'Crème pâtissière café.', price: 28, image: '/images/eclair-cafe.webp' },
  { id: 'pa-eclair-chocolat', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Chocolat', desc: 'Crème pâtissière chocolat noir.', price: 28, image: '/images/eclair-chocolat.webp' },
  { id: 'pa-eclair-noisette', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Noisette', desc: 'Crème noisette, éclats croquants.', price: 38, image: '/images/eclair-noisette.webp' },
  { id: 'pa-eclair-pistache', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Pistache', desc: 'Crème pistache, éclats de pistache.', price: 38, image: '/images/eclair-pistache.webp' },
  { id: 'pa-eclair-framboise', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Framboise', desc: 'Crème vanille, glaçage framboise.', price: 38, image: '/images/eclair-framboise.webp' },
  { id: 'pa-eclair-citron', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Citron', desc: 'Crème citron, zeste frais.', price: 38, image: '/images/eclair-citron.webp' },
  { id: 'pa-eclair-mangue', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Mangue', desc: 'Crème mangue, glaçage doré.', price: 38, image: '/images/eclair-mangue.webp' },
  { id: 'pa-eclair-tiramisu', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Tiramisu', desc: 'Crème mascarpone-café, cacao.', price: 38, image: '/images/eclair-tiramisu.webp' },
  { id: 'pa-eclair-amlou', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Amlou', desc: 'Amande, miel, argan.', price: 40, image: '/images/eclair-amlou.webp' },
  { id: 'pa-eclair-signature', cat: 'patisserie', station: 'cuisine', sub: 'Éclairs', name: 'Éclair Signature Moë', desc: 'Création du moment.', price: 42, badge: 'chef', image: '/images/eclair-signature.webp' },
  // ---- Pâtisserie — Boulangerie ----
  { id: 'pa-croissant', cat: 'patisserie', station: 'cuisine', sub: 'Boulangerie', name: 'Croissant Pur Beurre', desc: 'Pur beurre, feuilletage traditionnel.', price: 11, image: '/images/croissant.webp' },
  { id: 'pa-pain-chocolat', cat: 'patisserie', station: 'cuisine', sub: 'Boulangerie', name: 'Pain au Chocolat', desc: 'Feuilletage pur beurre, coeur chocolat.', price: 13, image: '/images/pain-chocolat.webp' },
  { id: 'pa-pain-suisse', cat: 'patisserie', station: 'cuisine', sub: 'Boulangerie', name: 'Pain Suisse', desc: 'Crème pâtissière, pépites de chocolat.', price: 13, image: '/images/pain-suisse.webp' },
  { id: 'pa-pain-raisins', cat: 'patisserie', station: 'cuisine', sub: 'Boulangerie', name: 'Pain aux Raisins', desc: 'Spirale feuilletée, raisins, crème.', price: 13, image: '/images/pain-raisins.webp' },
  { id: 'pa-baguette', cat: 'patisserie', station: 'cuisine', sub: 'Boulangerie', name: 'Baguette Tradition', desc: 'Tradition française, croûte croustillante.', price: 6.5, image: '/images/baguette.webp' },
  { id: 'pa-brioche', cat: 'patisserie', station: 'cuisine', sub: 'Boulangerie', name: 'Brioche Artisanale', desc: 'Brioche moelleuse, façon maison.', price: 35, image: '/images/brioche.webp' },
];
export const ITEMS_BY_ID: Record<string, CatalogItem> = {};
ITEMS.forEach((it) => { ITEMS_BY_ID[it.id] = it; });

export function itemsByCategory(catId: string): CatalogItem[] {
  return ITEMS.filter((it) => it.cat === catId);
}
