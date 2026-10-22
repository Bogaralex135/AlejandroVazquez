export function siteOrigin(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const value = configured || (vercelHost ? `https://${vercelHost}` : undefined);
  if (!value) return undefined;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an http(s) origin without a path, query or credentials.');
  }
  return url.origin;
}

export function isPreview() {
  return process.env.VERCEL_ENV === 'preview';
}

export function isIndexable() {
  return Boolean(siteOrigin()) && !isPreview();
}
