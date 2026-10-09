/**
 * Picks the right string from a `{ en, ru }` object,
 * falling back to English when a translation is missing.
 */
export function pickLocalized(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value !== 'object') return String(value);
  const normalized = typeof lang === 'string' && lang.startsWith('ru') ? 'ru' : 'en';
  return value[normalized] ?? value.en ?? '';
}