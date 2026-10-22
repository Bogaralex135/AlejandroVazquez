import { isPreview } from "./deployment.mjs";
export { isPreview };

export function siteOrigin(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an http(s) origin without a path, query or credentials.');
  }
  return url.origin;
}

export function isIndexable() {
  return Boolean(siteOrigin()) && !isPreview();
}
