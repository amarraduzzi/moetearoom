// ============================================================================
// In-site cart engine — vanilla TypeScript, no framework, no client-side
// state library. Matches this project's standing architecture decision
// (see astro.config.mjs: `output: 'static'`, no React/Vue runtime anywhere
// on this site) — the cart is just a small array kept in localStorage, read
// and written by plain functions, with a single CustomEvent
// ('moe:cart-updated') other scripts (CartWidget.astro, MenuContent.astro)
// listen for to re-render themselves. No React, no build-step framework
// integration needed.
//
// This module is imported by <script> tags via Vite's normal ES module
// bundling (Astro/Vite bundles local .ts imports from a page <script>
// automatically) — it is NOT a global; each script that needs the cart
// imports these named functions directly.
// ============================================================================

export interface CartLine {
  /** Stable id for one menu item — category-index + item-index is enough
   *  since the menu itself is static content, not a database. */
  id: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
  /** Which prep station makes this item — set once at add-to-cart time from
   *  the menu card's data-station attribute (see MenuContent.astro), never
   *  guessed later by name-matching. Defaults to 'cuisine' for any line
   *  added before this field existed (old localStorage carts) or where a
   *  card is somehow missing the attribute — food is the safer default
   *  since a drink silently routed to the kitchen is a smaller problem than
   *  the reverse. Read by CartWidget.astro to group the WhatsApp message
   *  and the Supabase order payload by station for the staff screen. */
  station?: 'bar' | 'cuisine';
}

const STORAGE_KEY = 'moe-tea-room-cart-v1';
const UPDATE_EVENT = 'moe:cart-updated';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readCart(): CartLine[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupted localStorage value (manual edit, old schema, etc.) —
    // fail safe to an empty cart rather than throwing on every page load.
    return [];
  }
}

function writeCart(lines: CartLine[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent<CartLine[]>(UPDATE_EVENT, { detail: lines }));
}

export function getCart(): CartLine[] {
  return readCart();
}

export function addToCart(
  id: string,
  name: string,
  price: number,
  quantity = 1,
  station: 'bar' | 'cuisine' = 'cuisine'
): CartLine[] {
  const lines = readCart();
  const existing = lines.find((l) => l.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({ id, name, price, quantity, station });
  }
  writeCart(lines);
  return lines;
}

export function updateQuantity(id: string, quantity: number): CartLine[] {
  let lines = readCart();
  if (quantity <= 0) {
    lines = lines.filter((l) => l.id !== id);
  } else {
    const line = lines.find((l) => l.id === id);
    if (line) line.quantity = quantity;
  }
  writeCart(lines);
  return lines;
}

export function removeFromCart(id: string): CartLine[] {
  const lines = readCart().filter((l) => l.id !== id);
  writeCart(lines);
  return lines;
}

export function clearCart(): void {
  writeCart([]);
}

export function getCartTotal(lines: CartLine[] = readCart()): number {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}

export function getCartCount(lines: CartLine[] = readCart()): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function onCartUpdated(handler: (lines: CartLine[]) => void): () => void {
  if (!isBrowser()) return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<CartLine[]>).detail ?? readCart());
  window.addEventListener(UPDATE_EVENT, listener);
  return () => window.removeEventListener(UPDATE_EVENT, listener);
}
