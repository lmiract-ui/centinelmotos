// Procesa la carpeta de prueba social: fotos -> WebP, videos .MOV -> MP4 comprimido + poster.
// Genera src/data/socialProof.js con el manifiesto por perfil.
// Correr: node scripts/process-social-proof.mjs
import sharp from "sharp";
import { mkdir, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const FFMPEG =
  "C:\\Users\\lau_9\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe";

const SRC_ROOT = "C:\\Users\\lau_9\\Downloads\\Social Proof";
const OUT_ROOT = path.resolve("public/clientes");

// Carpeta de origen -> id de perfil en el código
const FOLDER_TO_PROFILE = {
  "Trabaja con la moto": "laburante",
  Transporte: "transporte",
  Viajero: "rider",
  Tesoro: "fierrero",
};

const IMG_EXT = new Set([".jpg", ".jpeg", ".png"]);
const VID_EXT = new Set([".mov", ".mp4", ".m4v"]);

const manifest = {};

for (const [folder, profile] of Object.entries(FOLDER_TO_PROFILE)) {
  const srcDir = path.join(SRC_ROOT, folder);
  const outDir = path.join(OUT_ROOT, profile);
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(srcDir)).filter((f) => !f.startsWith(".")).sort();
  const items = [];
  let n = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const inPath = path.join(srcDir, file);

    if (IMG_EXT.has(ext)) {
      n++;
      const outName = `${profile}-${n}.webp`;
      await sharp(inPath)
        .rotate() // respeta orientación EXIF
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(path.join(outDir, outName));
      items.push({ type: "image", src: `/clientes/${profile}/${outName}` });
      console.log(`IMG  ${profile}/${outName}`);
    } else if (VID_EXT.has(ext)) {
      n++;
      const outName = `${profile}-${n}.mp4`;
      const posterName = `${profile}-${n}-poster.webp`;
      // Video: H.264 720p, encaja en 1280x1280 sin agrandar, faststart para streaming
      const vf = "scale=w=1280:h=1280:force_original_aspect_ratio=decrease:force_divisible_by=2";
      const r1 = spawnSync(
        FFMPEG,
        ["-y", "-i", inPath, "-vf", vf, "-c:v", "libx264", "-crf", "28",
         "-preset", "veryfast", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
         "-c:a", "aac", "-b:a", "96k", path.join(outDir, outName)],
        { stdio: "ignore" }
      );
      // Poster: primer frame ~1s
      const r2 = spawnSync(
        FFMPEG,
        ["-y", "-ss", "00:00:01", "-i", inPath, "-frames:v", "1", "-vf", vf,
         path.join(outDir, posterName)],
        { stdio: "ignore" }
      );
      if (r1.status !== 0) { console.log(`VID  FALLO ${file}`); continue; }
      items.push({
        type: "video",
        src: `/clientes/${profile}/${outName}`,
        poster: r2.status === 0 ? `/clientes/${profile}/${posterName}` : null,
      });
      console.log(`VID  ${profile}/${outName}`);
    }
  }
  manifest[profile] = items;
}

const dataPath = path.resolve("src/data/socialProof.js");
await mkdir(path.dirname(dataPath), { recursive: true });
const body =
  "// Generado por scripts/process-social-proof.mjs — no editar a mano.\n" +
  "// Para regenerar tras cambiar la carpeta de origen, correr el script de nuevo.\n" +
  "export const SOCIAL_PROOF = " +
  JSON.stringify(manifest, null, 2) +
  ";\n";
await writeFile(dataPath, body);
console.log("\nManifiesto: src/data/socialProof.js");
for (const [p, items] of Object.entries(manifest)) {
  console.log(`  ${p}: ${items.filter(i=>i.type==='image').length} fotos, ${items.filter(i=>i.type==='video').length} videos`);
}
