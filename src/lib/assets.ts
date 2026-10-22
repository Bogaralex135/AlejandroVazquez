import { access } from "node:fs/promises";
import path from "node:path";

export async function imageExists(filename: string) {
  try {
    await access(path.join(process.cwd(), "public", "images", filename));
    return true;
  } catch {
    return false;
  }
}
