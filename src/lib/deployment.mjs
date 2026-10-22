export function isPreview(env = process.env) {
  if (env.SITE_ENV) return env.SITE_ENV === "preview";
  return Boolean(env.CF_PAGES_BRANCH) && env.CF_PAGES_BRANCH !== (env.PRODUCTION_BRANCH || "main");
}
