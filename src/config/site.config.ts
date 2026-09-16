// ============================================================================
// AMPLIFY MARKETING SITE — TEMPLATE — site.config.ts
//
// THIS IS THE ONLY FILE YOU EDIT PER CLIENT (together with src/content/faq.ts
// and src/content/testimonials.ts for longer lists, and src/content/menu-
// highlights.ts for the menu). One config object, real content, nothing
// hardcoded in the page templates. This copy of the template has every
// client-specific value reset to a clearly-marked placeholder — search this
// whole project for "REPLACE" to find everything that needs real content
// before a site built from this template can go live.
//
// PER-CLIENT PUBLISH CHECKLIST (do all of these, in this order):
//   1. Fill in every field below with the real restaurant's info.
//   2. Update astro.config.mjs's SITE_URL to match identity.siteUrl exactly
//      (sitemap + canonical URLs are generated from astro.config's `site`,
//      NOT from this file — they must match or canonicals will be wrong),
//      AND update the Sitemap: line in public/robots.txt to the same URL.
//   3. Fill src/content/faq.ts, src/content/testimonials.ts and src/content/
//      menu-highlights.ts with real, client-specific content — do not ship
//      the example FAQ/reviews/menu items. testimonials.ts especially: NEVER
//      publish the placeholder reviews as if they were real ones — see the
//      honesty note in that file.
//   4. Replace every image in public/images/ (currently generated grey
//      placeholder graphics, clearly labeled "REPLACE THIS IMAGE") with real
//      photos at matching or larger dimensions — see the "why 100+ real
//      photos matter more than any code change" note below.
//   5. Set ordering.supabaseUrl/supabaseAnonKey to a real Supabase project
//      (see the comment on that field below and SUPABASE_SETUP.md) — this
//      site implements cart/checkout/reservations itself and syncs orders
//      to the in-restaurant staff screen through that project.
//   6. Translate every LocalizedText/LocalizedString value below and in
//      src/content/*.ts into real French/English/Arabic copy — the
//      placeholders here are intentionally the same generic sentence
//      repeated in three languages, not a real translation.
// ============================================================================

// Small local alias instead of importing the shared LocalizedText type —
// site.config.ts is deliberately the one file with zero imports from the
// rest of the app (see the file banner above), so every other file can
// safely import FROM here without a circular-import risk. Shape is
// identical to src/i18n/languages.ts's LocalizedText on purpose.
interface LocalizedString {
  fr: string;
  en: string;
  ar: string;
}

export interface SiteConfig {
  identity: {
    name: string;
    tagline: LocalizedString;
    city: string;
    country: string;
    siteUrl: string; // must match astro.config.mjs's SITE_URL exactly
    // The primary SERVICE keyword — deliberately WITHOUT the city baked in
    // ("restaurant italien", not "restaurant italien Lyon"). Every page
    // composes it with `city` explicitly (`${primaryKeyword} à ${city}`),
    // exactly once per sentence. Keeping city out of the constant is what
    // stops it from being concatenated in twice in the same title/
    // description — a real bug this template shipped with once already
    // ("restaurant indien Rabat au Rabat"). Match the exact term the local
    // market actually searches, not a rebrand of it ("spa culinaire") — see
    // the standing SEO notes at the bottom of this file. LocalizedText
    // because "the term the market actually searches" is a DIFFERENT term
    // per language, not a translation of the French one (an English
    // searcher types "italian restaurant", not a literal rendering of
    // "restaurant italien").
    primaryKeyword: LocalizedString;
    // schema.org Restaurant.servesCuisine — a single plain string, e.g.
    // 'Italian', 'French', 'Japanese', 'Moroccan'. Used only in the
    // Home page's structured data (see HomeContent.astro), never shown to
    // visitors directly, so it doesn't need translating — use the English
    // cuisine term schema.org/Google expects.
    cuisineType: string;
    // ISO 4217 currency CODE (e.g. 'EUR', 'USD', 'MAD', 'GBP') used both for
    // the menu's displayed prices and the JSON-LD Offer.priceCurrency. Keep
    // this and every price in menu-highlights.ts in the same currency.
    currency: string;
  };
  colors: {
    primary: string;
    // Darker tone used for warm tint overlays (photo gradients, alternating
    // menu rows, active-tab backgrounds) — global.css's default is a wine
    // red left over from the template; without overriding it here, those
    // overlays stay red no matter what primary/accent are set to.
    primaryDark: string;
    accent: string;
    background: string;
    // Optional — the template's global.css defaults (surface/surface-muted/
    // text-primary/text-muted/border) are tuned for a DARK theme (white text
    // on near-black). A client on a light/cream background needs all five
    // overridden together, or text renders white-on-cream and cards render
    // near-black — set none of these for a dark-theme client, all five for
    // a light one.
    surface?: string;
    surfaceMuted?: string;
    textPrimary?: string;
    textMuted?: string;
    border?: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string; // tel: link, digits only with country code
    whatsappNumber: string; // digits only, country code, no + or spaces
    address: string;
    mapsUrl?: string;
    openingHours: LocalizedString;
    // Structured, machine-readable hours for the live "open now / closed"
    // badge — kept separate from the free-text `openingHours` above on
    // purpose: parsing "13:00 - 23:00" out of a translated sentence at
    // runtime is fragile (format changes per language, e.g. English's
    // "1:00 PM – 11:00 PM"), while these two plain 24h numbers are
    // unambiguous and can't drift out of sync with a wording change. Only
    // fits a restaurant open every day with the SAME hours — if that's not
    // true for this client, this becomes a per-day structure instead of two
    // flat numbers (and OpenStatusBadge.astro needs a matching update).
    hours: { open: number; close: number };
    instagramUrl?: string;
    facebookUrl?: string;
  };
  ordering: {
    // Supabase project backing the in-site cart/checkout AND the
    // reservation form (src/content-pages/ReservationContent.astro) AND
    // the in-restaurant staff screen (separate deploy, see
    // SUPABASE_SETUP.md) — all three read/write the same project. Run
    // supabase/schema.sql (shipped alongside this project) in a NEW
    // Supabase project's SQL editor, then paste that project's URL and
    // "anon / publishable" key here. Safe to ship client-side by design —
    // it can only do what the schema's row-level-security policies allow
    // (insert orders/reservations, read+update orders/reservations for the
    // staff screen) — see SUPABASE_SETUP.md for the full walkthrough.
    supabaseUrl: string;
    supabaseAnonKey: string;
  };
  social: {
    googleReviewsUrl?: string;
    // Real number from the client's Google Business Profile — NOT computed
    // or guessed. Deliberately no googleReviewCount field: only showing a
    // rating you can personally confirm on the client's live profile is
    // safe to publish — a review COUNT drifts out of date almost
    // immediately and is easy to get visibly wrong. See testimonials.ts's
    // standing note for why this project never fabricates review data.
    googleRating?: string;
  };
}

export const siteConfig: SiteConfig = {
  identity: {
    name: 'Moë Tea Room',
    // TODO — tagline is a first draft, not client-confirmed copy. Swap for
    // whatever line the client actually wants to lead with once you have it.
    tagline: {
      fr: 'Un salon de thé chaleureux au cœur de Rabat.',
      en: 'A warm tea room in the heart of Rabat.',
      ar: 'صالون شاي دافئ في قلب الرباط.',
    },
    city: 'Rabat',
    country: 'Maroc',
    // TODO — placeholder subdomain, matching the pattern used for other
    // clients (chouf.pages.dev, indianspicerabat.pages.dev). Update once
    // deployed, and keep astro.config.mjs's SITE_URL + robots.txt in sync.
    siteUrl: 'https://moe-tea-room.pages.dev',
    primaryKeyword: {
      fr: 'salon de thé',
      en: 'tea room',
      ar: 'صالون شاي',
    },
    cuisineType: 'Cafe',
    currency: 'MAD',
  },
  colors: {
    // Restyled from the client's own printed-menu branding (Sept 2026): a
    // warm cream page (the menu PDFs' paper tone), the logo's chocolate
    // brown as the secondary/primary-accent color, and the deep green used
    // for headings/prices on the "Gourmandises" and cover pages as the
    // interactive accent. Yellow/gold is gone entirely — no token below is
    // a shade of yellow.
    accent: '#3F5D45', // deep green — nav links, prices, buttons, active states
    primary: '#6B4A34', // logo chocolate brown — secondary brand color
    primaryDark: '#4A2F1F', // darker brown — photo-overlay tints, alternating rows
    background: '#F7F0DC', // warm cream page background (matches the menu PDFs)
    // Light-theme companions to the four tokens above — see the interface
    // comment: all five needed together, or text/cards stay dark-theme.
    surface: '#FFFCF3', // card/panel background — slightly lifted off the page cream
    surfaceMuted: '#EFE4C4', // alternating-row / muted panel background
    textPrimary: '#3A2A1E', // near-black warm brown — body/heading text
    textMuted: '#7A6A57', // muted brown-grey — secondary text
    border: 'rgba(58,42,30,0.14)', // brown-tinted hairline borders
  },
  contact: {
    phoneDisplay: '+212 7 22 65 31 61',
    phoneHref: 'tel:+212722653161',
    whatsappNumber: '212722653161',
    address: '6 Av. Abou Faris Al Marini, Rabat',
    // TODO — replace with a real Google Maps "Share" link for this address.
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mo%C3%AB+Tea+Room+Rabat',
    openingHours: {
      fr: 'Ouvert tous les jours : 08:30 - 23:30',
      en: 'Open every day: 8:30 AM – 11:30 PM',
      ar: 'مفتوح كل يوم: 08:30 - 23:30',
    },
    hours: { open: 8.5, close: 23.5 },
    instagramUrl: 'https://www.instagram.com/moe_rabat/',
    facebookUrl: 'https://www.facebook.com/61580975256089/',
  },
  ordering: {
    // Live Supabase project (created Sept 2026) — schema.sql run, staff
    // screen points at the same project. See SUPABASE_SETUP.md.
    supabaseUrl: 'https://jkqrtpxhxxtviizgihox.supabase.co',
    supabaseAnonKey: 'sb_publishable_nFOrexvp2LZuQ0KxiuwwWQ_acLTUrrf',
  },
  social: {
    // Real numbers from the client's Google Business Profile (see the
    // screenshot this was built from) — 4.6 stars, 108 reviews.
    googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Mo%C3%AB+Tea+Room+Rabat',
    googleRating: '4.6',
  },
};

// ----------------------------------------------------------------------------
// STANDING SEO NOTES — read before editing page copy or adding new pages.
// These are the non-negotiable rules the templates in src/pages/ were built
// around; breaking them quietly undoes the SEO work even if the page still
// "looks fine".
//
// 1. Keyword realism: use the term the local market actually types into
//    Google in the H1, body copy, meta title AND meta description of a
//    page — all four, not just one. A clever rebrand of the service name
//    loses the search traffic entirely.
// 2. No keyword cannibalization: never create two pages targeting the same
//    search intent (e.g. a "Commander" page AND a "Livraison" page). This
//    site deliberately has ONE ordering path — every "Commander" CTA opens
//    the same in-site cart — instead of splitting that intent across pages.
// 3. FAQ sections are structural, not decorative: AI answer engines (ChatGPT,
//    Google AI Overviews, Perplexity) pull directly from clearly-formatted
//    question/answer pairs. Every service-relevant page should have one.
// 4. Real photos beat every on-page trick combined. Code cannot manufacture
//    E-E-A-T — only the client uploading 100+ real, original photos of the
//    food and the physical location can. Don't waste time renaming image
//    files to keyword strings or injecting EXIF geodata: Google strips that
//    metadata on upload and it can read as manipulation, not help ranking.
// 5. Review velocity and Google Business Profile completeness (Services
//    section, not Products) are the two highest-leverage local-SEO levers
//    available — and neither is something this codebase can do for you.
//    That's an operating habit for whoever runs the account: reply to every
//    review fast, and ask happy customers to name the dish + city in their
//    review text.
// ----------------------------------------------------------------------------
