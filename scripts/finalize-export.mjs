import { access, copyFile, readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { isPreview } from "../src/lib/deployment.mjs";

// Only build artifacts are changed. Cloudflare serves these without a runtime.
for (const file of ["es.html", "en.html", "es/privacidad.html", "en/privacy.html", "404.html", "_redirects", "_headers", "icon.svg", "es/opengraph-image", "en/opengraph-image"]) {
  await access(new URL(`../out/${file}`, import.meta.url));
}
{
  const path = new URL("../out/_headers", import.meta.url);
  const headers = (await readFile(path, "utf8")).replace(/^  X-Robots-Tag: noindex, nofollow\r?\n/gm, "");
  await writeFile(path, isPreview() ? headers.replace(/^\/\*\r?\n/, "/*\n  X-Robots-Tag: noindex, nofollow\n") : headers);
}
// Next 16.4 exports nested segment payloads while its static prefetch client
// requests their dot-joined equivalents. Keep both names for static hosts.
const root = resolve("out");
async function addPrefetchAliases(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { await addPrefetchAliases(path); continue; }
    if (!entry.name.endsWith(".txt")) continue;
    const name = relative(root, path).split(sep).join("/");
    const marker = name.indexOf("/__next.");
    if (marker < 0) continue;
    const payload = name.slice(marker + 1);
    if (payload.includes("/")) await copyFile(path, join(root, name.slice(0, marker + 1) + payload.replaceAll("/", ".")));
  }
}
await addPrefetchAliases(root);
console.log(`Static export verified${isPreview() ? "; preview indexing disabled" : ""}.`);
