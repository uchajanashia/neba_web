import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const imageRoot = path.join(publicDir, 'assets', 'images');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(entryPath) : [entryPath];
    }),
  );

  return nested.flat();
}

function withSuffix(file, suffix) {
  const extension = path.extname(file);
  return `${file.slice(0, -extension.length)}${suffix}${extension}`;
}

async function writeVariant(source, destination, width, quality = 78) {
  await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(destination);
}

async function optimizePhotos() {
  const files = (await walk(imageRoot)).filter(
    (file) => file.endsWith('.webp') && !/-(480|800)\.webp$|\.thumb\.webp$/.test(file),
  );

  for (const file of files) {
    const metadata = await sharp(file).metadata();

    for (const width of [480, 800]) {
      if ((metadata.width ?? 0) > width) {
        await writeVariant(file, withSuffix(file, `-${width}`), width);
      }
    }

    if (file.includes(`${path.sep}bracelets${path.sep}`) && !file.endsWith('hero.webp')) {
      await writeVariant(file, withSuffix(file, '.thumb'), 180, 72);
    }
  }
}

async function optimizeLogos() {
  const logoDir = path.join(publicDir, 'assets', 'logo');

  await sharp(path.join(logoDir, 'logo-icon.png'))
    .resize({ width: 667, withoutEnlargement: true })
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(logoDir, 'logo-icon.webp'));

  await sharp(path.join(logoDir, 'logo-full.png'))
    .resize({ width: 400, height: 400, fit: 'contain', withoutEnlargement: true })
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(logoDir, 'logo-full.webp'));
}

await Promise.all([optimizePhotos(), optimizeLogos()]);

const generated = (await walk(path.join(publicDir, 'assets'))).filter((file) =>
  /-(480|800)\.webp$|\.thumb\.webp$|logo-(icon|full)\.webp$/.test(file),
);
const totalBytes = (
  await Promise.all(generated.map(async (file) => (await stat(file)).size))
).reduce((total, bytes) => total + bytes, 0);

console.log(`Generated ${generated.length} optimized assets (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
