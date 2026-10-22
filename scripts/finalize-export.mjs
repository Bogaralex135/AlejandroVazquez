import { access, readFile, writeFile } from "node:fs/promises";
import { isPreview } from "../src/lib/deployment.mjs";

// Only build artifacts are changed. Cloudflare serves these without a runtime.
for (const file of ["es.html", "en.html", "es/privacidad.html", "en/privacy.html", "404.html", "_redirects", "_headers", "icon.svg", "es/opengraph-image", "en/opengraph-image"]) {
  await access(new URL(`../out/${file}`, import.meta.url));
}
if (isPreview()) {
  const path = new URL("../out/_headers", import.meta.url);
  const headers = await readFile(path, "utf8");
  await writeFile(path, headers.replace(/^\/\*\r?\n/, "/*\n  X-Robots-Tag: noindex, nofollow\n"));
}
console.log(`Static export verified${isPreview() ? "; preview indexing disabled" : ""}.`);
