// Local preview of out/, including the project's Cloudflare asset rules.
// This script is never part of the exported site and is not a deployment tool.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
const redirects = (await readFile(resolve(root, "_redirects"), "utf8")).split(/\r?\n/).map(line => line.trim().split(/\s+/)).filter(parts => parts.length === 3 && !parts[0].startsWith("#"));
const headerRules = [];
for (const line of (await readFile(resolve(root, "_headers"), "utf8")).split(/\r?\n/)) {
  if (!line.trim() || line.trim().startsWith("#")) continue;
  if (!/^\s/.test(line)) headerRules.push({ pattern: line.trim(), headers: {} });
  else { const split = line.indexOf(":"); headerRules.at(-1).headers[line.slice(0, split).trim()] = line.slice(split + 1).trim(); }
}
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    for (const rule of headerRules) {
      if (rule.pattern === pathname || (rule.pattern.endsWith("*") && pathname.startsWith(rule.pattern.slice(0, -1)))) {
        for (const [key, value] of Object.entries(rule.headers)) response.setHeader(key, value);
      }
    }
    const redirect = redirects.find(([source]) => source === pathname);
    if (redirect) { response.writeHead(Number(redirect[2]), { Location: redirect[1] }); response.end(); return; }
    const target = resolve(root, `.${pathname}`);
    if (!target.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    let file;
    for (const candidate of [target, `${target}.html`, resolve(target, "index.html")]) {
      if (await stat(candidate).then(info => info.isFile()).catch(() => false)) { file = candidate; break; }
    }
    const status = file ? 200 : 404;
    file ??= resolve(root, "404.html");
    if (!response.hasHeader("Content-Type")) response.setHeader("Content-Type", mime[extname(file)] || "application/octet-stream");
    response.writeHead(status);
    response.end(request.method === "HEAD" ? undefined : await readFile(file));
  } catch { response.writeHead(400); response.end(); }
}).listen(Number(process.env.PORT || 3000), "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${process.env.PORT || 3000}`));
