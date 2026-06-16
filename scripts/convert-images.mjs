// Descarga las imágenes de fondo y las convierte a WebP optimizada en /public/img.
// Correr con: node scripts/convert-images.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = new URL("../public/img/", import.meta.url);

const IMAGES = [
  {
    name: "hero-moto.webp",
    url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=85&w=1600&auto=format&fit=crop",
    width: 1600,
    quality: 72,
  },
  {
    name: "taller.webp",
    url: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=85&w=1280&auto=format&fit=crop",
    width: 1280,
    quality: 68,
  },
];

await mkdir(OUT, { recursive: true });

for (const img of IMAGES) {
  const res = await fetch(img.url);
  if (!res.ok) throw new Error(`Fallo al descargar ${img.name}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const info = await sharp(buf)
    .resize({ width: img.width, withoutEnlargement: true })
    .webp({ quality: img.quality })
    .toFile(new URL(img.name, OUT).pathname.replace(/^\//, ""));
  console.log(`${img.name}: ${(info.size / 1024).toFixed(0)} KB (${info.width}x${info.height})`);
}
console.log("Listo.");
