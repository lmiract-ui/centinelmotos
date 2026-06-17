import sharp from "sharp";
import { readFile } from "node:fs/promises";
const svg = await readFile("scripts/og-image.svg");
const info = await sharp(svg, { density: 144 }).resize(1200, 630).png().toFile("public/og-image.png");
console.log("og-image.png:", Math.round(info.size/1024), "KB", info.width + "x" + info.height);
