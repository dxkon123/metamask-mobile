/** Deterministic brand asset/config generator. Never reads service credentials. */
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '../..');
process.chdir(root);
interface Brand {
  name: string;
  applicationId: string;
  flaskApplicationId: string;
  versionName: string;
  versionCode: number;
  domain: string;
  scheme: string;
  logo: string;
  colors: {
    primary: string;
    primaryLight: string;
    backgroundDark: string;
    backgroundLight: string;
  };
}
const brand = JSON.parse(
  readFileSync('brand/brand.config.json', 'utf8'),
) as Brand;
if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*){2,}$/u.test(brand.applicationId))
  throw new Error('Invalid applicationId');
if (
  !/^\d+\.\d+\.\d+$/u.test(brand.versionName) ||
  !Number.isSafeInteger(brand.versionCode) ||
  brand.versionCode < 1
)
  throw new Error('Invalid Android version');
function edit(path: string, transform: (source: string) => string): void {
  const source = readFileSync(path, 'utf8');
  const result = transform(source);
  if (source !== result) writeFileSync(path, result);
}
edit('android/app/build.gradle', (s) =>
  s
    .replace(
      /applicationId "[^"]+"/gu,
      `applicationId "${brand.applicationId}"`,
    )
    .replace(/versionName "[^"]+"/u, `versionName "${brand.versionName}"`)
    .replace(/versionCode \d+/u, `versionCode ${brand.versionCode}`),
);
// Keep the Java/R namespace and internal React Native registration untouched.
for (const dir of [
  'android/app/src/main/res/values',
  'android/app/src/main/res/values-night',
  'android/app/src/flask/res/values',
]) {
  const path = join(dir, 'strings.xml');
  if (existsSync(path))
    edit(path, (s) =>
      s.replace(
        /(<string name="app_name">)[^<]*(<\/string>)/u,
        `$1${brand.name}${dir.includes('/flask/') ? ' Flask' : ''}$2`,
      ),
    );
}
const source = await sharp(brand.logo).trim().png().toBuffer();
const meta = await sharp(source).metadata();
if (!meta.width || !meta.height) throw new Error('Logo has no dimensions');
const alpha = await sharp(source).extractChannel('alpha').toBuffer();
const white = await sharp({
  create: {
    width: meta.width,
    height: meta.height,
    channels: 3,
    background: '#FFFFFF',
  },
})
  .joinChannel(alpha)
  .png()
  .toBuffer();
await sharp(white)
  .resize(673, 673, { fit: 'contain', background: '#00000000' })
  .png()
  .toFile('brand/assets/logo-white.png');
interface NativeAsset {
  path: string;
  width: number;
  height: number;
}
const manifestPath = 'brand/assets/native-assets.json';
let assets: NativeAsset[];
if (existsSync(manifestPath))
  assets = JSON.parse(readFileSync(manifestPath, 'utf8')) as NativeAsset[];
else {
  assets = [];
  const res = 'android/app/src/main/res';
  for (const dir of readdirSync(res).filter((name) =>
    /^mipmap-(?:m|h|xh|xxh|xxxh)dpi$/u.test(name),
  )) {
    for (const name of readdirSync(join(res, dir)).filter((file) =>
      /^(?:ic_launcher(?:_background|_round|_foreground)?|splash|ic_notification(?:_small)?)\.png$/u.test(
        file,
      ),
    )) {
      const path = join(res, dir, name);
      const metadata = await sharp(path).metadata();
      if (!metadata.width || !metadata.height)
        throw new Error(`Invalid image: ${path}`);
      assets.push({ path, width: metadata.width, height: metadata.height });
    }
  }
  writeFileSync(manifestPath, `${JSON.stringify(assets, null, 2)}\n`);
}
for (const asset of assets) {
  const background = asset.path.includes('background');
  const notification = asset.path.includes('notification');
  const transparent = /foreground|splash|notification/u.test(asset.path);
  let canvas = sharp({
    create: {
      width: asset.width,
      height: asset.height,
      channels: 4,
      background: transparent ? '#00000000' : asset.path.includes('_light') ? brand.colors.backgroundLight : brand.colors.backgroundDark,
    },
  });
  if (!background) {
    const fraction = asset.path.includes('foreground') ? 0.6 : 0.74;
    const logo = await sharp(notification || asset.path.includes('_tinted') ? white : source)
      .resize(
        Math.max(1, Math.round(asset.width * fraction)),
        Math.max(1, Math.round(asset.height * fraction)),
        { fit: 'inside' },
      )
      .png()
      .toBuffer();
    canvas = canvas.composite([{ input: logo, gravity: 'centre' }]);
  }
  await canvas.png().toFile(asset.path);
}
mkdirSync('store', { recursive: true });
await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: brand.colors.backgroundDark,
  },
})
  .composite([
    {
      input: await sharp(source).resize(380, 380, { fit: 'inside' }).toBuffer(),
      gravity: 'centre',
    },
  ])
  .png()
  .toFile('store/play-icon-512.png');
console.log(
  `Applied ${brand.name}: ${brand.applicationId}; ${assets.length} native images retain exact dimensions.`,
);

await import('./apply-text.ts');
await import('./apply-assets.ts');
