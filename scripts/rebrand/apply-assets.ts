/** Original brand graphics at the existing resource dimensions. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
interface Asset { path: string; width?: number; height?: number; type: string; brandCandidate: boolean; }
mkdirSync('build/font-cache', { recursive: true });
writeFileSync('build/rebrand-fonts.conf', `<fontconfig><dir>${resolve('app/fonts')}</dir><cachedir>${resolve('build/font-cache')}</cachedir></fontconfig>`);
process.env.FONTCONFIG_FILE = resolve('build/rebrand-fonts.conf');
const brand = JSON.parse(readFileSync('brand/brand.config.json','utf8')) as { name:string; logo:string; colors:{backgroundDark:string;primary:string} };
const all = JSON.parse(readFileSync('brand/assets/inventory-assets.json','utf8')) as Asset[];
const assets = all.filter(a=>a.path.startsWith('app/') && a.width && a.height && a.brandCandidate && /png|svg|webp/u.test(a.type) && !/ApplePaySplash|wallet-home-onboarding|money-onboarding-stepper/u.test(a.path));
const mark = await sharp(brand.logo).trim().png().toBuffer();
const markData = `data:image/png;base64,${mark.toString('base64')}`;
const wordmark = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="152" viewBox="0 0 280.21 152"><image href="${markData}" x="84" y="4" width="112" height="80" preserveAspectRatio="xMidYMid meet"/><text x="140" y="137" text-anchor="middle" font-family="Inter-SemiBold" font-weight="600" font-size="40" fill="currentColor">${brand.name}</text></svg>`;
writeFileSync('brand/assets/wordmark.svg',wordmark);
const whiteMark = await sharp('brand/assets/logo-white.png').trim().png().toBuffer();
let index = 0;
for (const a of assets) {
  const width=a.width as number, height=a.height as number;
  const isWordmark = /metamask-name|metamask-wordmark/u.test(a.path);
  if(a.type==='svg') {
    const svg = isWordmark ? wordmark : `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image href="${markData}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/></svg>`;
    writeFileSync(a.path,svg); continue;
  }
  let image: Buffer;
  if(isWordmark) {
    const white=a.path.includes('-white');
    const text=await sharp({text:{text:brand.name,font:'Inter Semi-Bold 110',fontfile:'app/fonts/Inter-SemiBold.ttf',rgba:true}}).png().toBuffer();
    const meta=await sharp(text).metadata();
    const ink=white ? await sharp({create:{width:meta.width as number,height:meta.height as number,channels:3,background:'#FFFFFF'}}).joinChannel(await sharp(text).extractChannel('alpha').toBuffer()).png().toBuffer() : text;
    image=await sharp({create:{width:1000,height:500,channels:4,background:'#00000000'}}).composite([{input:await sharp(white?whiteMark:mark).resize(480,300,{fit:'inside'}).png().toBuffer(),left:260,top:0},{input:await sharp(ink).resize(880,140,{fit:'inside'}).png().toBuffer(),gravity:'south'}]).png().toBuffer();
  } else if(a.path.includes('/Foxicon/')) {
    const angle=(index++*29)%360;
    const frame=`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#FF5135"/><stop offset="1" stop-color="#FF245E"/></linearGradient></defs><circle cx="150" cy="150" r="145" fill="#141418"/><circle cx="150" cy="150" r="137" fill="none" stroke="url(#g)" stroke-width="${4+index%4}" stroke-dasharray="${14+index*3} ${8+index}" transform="rotate(${angle} 150 150)"/><circle cx="${55+index*11}" cy="50" r="${6+index%4}" fill="#FF7FA4"/></svg>`;
    image=await sharp(Buffer.from(frame)).composite([{input:await sharp(mark).resize(210,180,{fit:'inside'}).png().toBuffer(),gravity:'centre'}]).png().toBuffer();
  } else if(/(?:metamask-error|failed)/u.test(a.path)) {
    const error=`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect x="64" y="94" width="384" height="324" rx="90" fill="#231A22"/><circle cx="256" cy="243" r="98" fill="none" stroke="#FF5135" stroke-width="18"/><path d="M256 184v76m0 38v4" stroke="#FF7FA4" stroke-width="20" stroke-linecap="round"/></svg>`;
    image=await sharp(Buffer.from(error)).png().toBuffer();
  } else if(/success|greeting/u.test(a.path)) image=readFileSync('brand/assets/illustration-success.webp');
  else if(/onboarding-carousel|mm-card|welcome-bg|swaps_onboard|money-splash|fox-chat|vip_splash|Fox_Vipers/u.test(a.path)) image=readFileSync('brand/assets/illustration-wallet.webp');
  else image=mark;
  await sharp(image).resize(width,height,{fit:'contain',background:'#00000000'}).png().toFile(a.path);
}
mkdirSync('store',{recursive:true});
const hero=await sharp('brand/assets/illustration-wallet.webp').resize(460,460,{fit:'contain'}).png().toBuffer();
const title=await sharp({text:{text:brand.name,font:'Inter Semi-Bold 80',fontfile:'app/fonts/Inter-SemiBold.ttf',rgba:true}}).png().toBuffer();
const tm=await sharp(title).metadata();const whiteTitle=await sharp({create:{width:tm.width as number,height:tm.height as number,channels:3,background:'#FFFFFF'}}).joinChannel(await sharp(title).extractChannel('alpha').toBuffer()).png().toBuffer();
await sharp({create:{width:1024,height:500,channels:4,background:brand.colors.backgroundDark}}).composite([{input:hero,left:520,top:20},{input:await sharp(mark).resize(200,150,{fit:'inside'}).png().toBuffer(),left:60,top:95},{input:await sharp(whiteTitle).resize(455,100,{fit:'inside'}).png().toBuffer(),left:60,top:265}]).png().toFile('store/feature-graphic-1024x500.png');
writeFileSync('brand/assets/replacement-manifest.json',`${JSON.stringify(assets,null,2)}\n`);
console.log(`Original brand resources applied: ${assets.length} image paths; original dimensions retained.`);
