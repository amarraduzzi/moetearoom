import { nav as navUi } from '../i18n/ui';
import { t, localizedPath, type Language } from '../i18n/languages';

// Single source of truth for the site's primary CTA — appears in the
// header, footer, and every page's primary CTA button. Deliberately ONE
// function used everywhere instead of each component hardcoding its own
// label/href — a one-line change updates it everywhere, and the label
// follows whichever of the three languages is asking.
//
// Was "Commander" → /menu with an in-site cart/checkout (see git history
// for CartWidget.astro). Removed entirely (Amar, Sept 2026 — "de klant
// wil opeens de menu pagina niet meer doorlinken naar het scherm... Het
// menu moet gewoon alleen visueel zijn"): the menu is browse-only now, no
// ordering feature anywhere on the site, so every "Commander" CTA becomes
// "Réserver" → /reservation instead ("in de hero commander moet omgezet
// worden in reserveren en dat moet gelinkt naar de reservatie pagina").
// Function name kept as getOrderCtaLabel to avoid a mechanical rename
// across every call site for what is, underneath, still "the site's one
// primary CTA" — if that naming reads as confusing to a future editor,
// a rename is safe (it's just this function + its callers).
export function getOrderCtaLabel(lang: Language = 'fr') {
  return {
    // Same short one-word label as the nav's own "Réservation" link
    // (navUi.reservation = "Réserver") — a compact CTA, not the longer
    // "Réserver une table" phrasing used elsewhere on the page itself.
    label: t(navUi.reservation, lang),
    href: localizedPath('/reservation', lang),
  };
}

// Back-compat default (French) for any call site not yet passing a
// language — every current call site does, but keeping this avoids a
// silent crash if one is missed.
export const orderCtaLabel = getOrderCtaLabel('fr');
