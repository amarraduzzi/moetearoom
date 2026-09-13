import { common } from '../i18n/ui';
import { t, localizedPath, type Language } from '../i18n/languages';

// Single source of truth for the "Commander"/"Order" CTA that appears in
// the header, footer, and every page's primary CTA button. Deliberately
// ONE function used everywhere instead of each component hardcoding its
// own label/href — a one-line change updates it everywhere, and the label
// follows whichever of the three languages is asking.
//
// This site implements ordering itself (cart + checkout, see
// src/components/cart/CartWidget.astro) instead of linking out to a
// separate order-landing-page — every "Commander" CTA opens that in-site
// cart drawer via Button.astro's `cartTrigger` prop. `href` still points at
// a real /menu URL as the no-JS fallback, so the button stays a valid,
// crawlable link either way.
export function getOrderCtaLabel(lang: Language = 'fr') {
  return {
    label: t(common.commander, lang),
    href: localizedPath('/menu', lang),
  };
}

// Back-compat default (French) for any call site not yet passing a
// language — every current call site does, but keeping this avoids a
// silent crash if one is missed.
export const orderCtaLabel = getOrderCtaLabel('fr');
