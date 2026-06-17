// Genera la imagen Open Graph (1200x630) combinando la foto del producto
// con el branding de Centinel GPS. Correr: node scripts/gen-og-photo.mjs
import sharp from "sharp";

const W = 1200, H = 630;
const PHOTO = "C:/Users/lau_9/Downloads/Como se ve en la APP.png";

// Foto a la derecha, escalada a la altura del lienzo
const photo = await sharp(PHOTO).resize({ height: H }).toBuffer();
const pMeta = await sharp(photo).metadata();
const photoLeft = W - pMeta.width;
const cx = Math.round(photoLeft / 2); // centro de la zona de branding

const PIN = `<g transform="translate(${cx - 81},86) scale(0.18)">
  <path d="M498.76,990.49C487.77,986.45 468.39,965.78 435.03,922.50C429.52,915.35 416.00,898.02 404.98,884.00C382.30,855.11 329.93,785.58 319.50,770.50C315.69,765.00 308.75,755.33 304.07,749.00C294.88,736.57 280.83,716.18 267.23,695.50C262.53,688.35 254.09,675.52 248.49,667.00C205.91,602.22 173.76,540.42 157.17,491.43C144.77,454.83 141.17,432.73 139.43,382.50C136.29,291.84 167.90,203.52 228.09,134.84C281.89,73.44 330.58,42.52 411.19,18.56C431.04,12.66 455.65,9.06 494.00,6.45C512.57,5.19 547.48,8.10 570.65,12.84C619.16,22.77 648.58,35.64 698.00,68.56C804.37,139.41 866.45,258.19 862.62,383.50C859.59,482.31 822.99,567.04 717.05,720.43C694.53,753.03 677.70,776.22 627.34,844.00C573.39,916.62 562.70,930.93 545.54,953.50C516.35,991.89 511.98,995.34 498.76,990.49Z" fill="url(#pinBody)"/>
  <path d="M479.99,545.51C378.04,533.15 306.93,446.47 313.94,343.12C316.09,311.42 325.26,283.25 343.29,253.00C365.08,216.42 391.88,194.62 434.71,178.64C516.31,148.18 614.17,180.87 662.42,254.71C671.04,267.89 672.75,272.64 670.54,277.19C668.08,282.27 667.82,282.40 616.58,305.80C600.33,313.22 597.21,312.38 586.05,297.61C556.16,258.06 508.30,244.68 462.30,263.00C404.19,286.15 382.68,368.22 421.29,419.50C441.42,446.25 468.18,458.76 503.00,457.73C523.37,457.12 531.02,455.12 551.72,444.98C568.27,436.87 571.82,433.78 585.37,415.64C598.50,398.08 600.35,397.50 616.57,405.85C622.03,408.67 634.08,414.52 643.34,418.86C677.71,434.95 678.85,438.78 658.06,468.11C634.97,500.68 603.67,524.11 566.12,536.95C541.86,545.24 506.63,548.74 479.99,545.51Z" fill="url(#cBody)"/>
</g>`;

const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="ogBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#02255b"/><stop offset="55%" stop-color="#011a42"/><stop offset="100%" stop-color="#00102b"/>
    </linearGradient>
    <radialGradient id="ogGlow" cx="${Math.round((cx/W)*100)}%" cy="50%" r="42%">
      <stop offset="0%" stop-color="#9fe43f" stop-opacity="0.15"/><stop offset="100%" stop-color="#9fe43f" stop-opacity="0"/>
    </radialGradient>
    <pattern id="ogGrid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 L0 0 0 48" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.04"/>
    </pattern>
    <radialGradient id="pinBody" cx="38%" cy="22%" r="78%">
      <stop offset="0%" stop-color="#2c4a7e"/><stop offset="35%" stop-color="#10306a"/><stop offset="70%" stop-color="#072457"/><stop offset="100%" stop-color="#031540"/>
    </radialGradient>
    <linearGradient id="cBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e3e8ef"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#ogBg)"/>
  <rect width="${W}" height="${H}" fill="url(#ogGrid)"/>
  <rect width="${W}" height="${H}" fill="url(#ogGlow)"/>
  ${PIN}
  <text x="${cx}" y="408" text-anchor="middle" font-family="Arial, sans-serif" font-size="60" font-weight="900" letter-spacing="-1.5" fill="#ffffff">CENTINEL <tspan fill="#9fe43f">GPS</tspan></text>
  <text x="${cx}" y="456" text-anchor="middle" font-family="Arial, sans-serif" font-size="27" font-weight="700" fill="#dbe4f0">Rastreo satelital para tu moto</text>
  <text x="${cx}" y="498" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#9fe43f">Córdoba · Taller propio</text>
</svg>`;

const info = await sharp(Buffer.from(bgSvg))
  .composite([{ input: photo, left: photoLeft, top: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("og-image.jpg:", Math.round(info.size / 1024), "KB", info.width + "x" + info.height, "| foto ancho:", pMeta.width);
