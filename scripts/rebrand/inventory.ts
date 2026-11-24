/** Inventory tracked public source/assets, never private untracked configuration. */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import sharp from 'sharp';
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).split('\0').filter(Boolean);
interface TextHit { path: string; lines: number[]; count: number; classification: string; }
interface Asset { path: string; type: string; width?: number; height?: number; brandCandidate: boolean; }
const hits: TextHit[] = []; const assets: Asset[] = [];
const candidate = /(?:fox|metamask|branding|welcome|splash|onboard|wordmark|mm[_-]logo|logo[_-]mm)/iu;
for (const path of files) {
  if (!existsSync(path)) continue; // Case-distinct font collisions are kept in Git, not deleted.
  if (/\.(?:png|jpe?g|webp|gif|svg|avif|ico|icns|riv|otf|ttf|mp4|mov|mp3|wav|ogg)$/iu.test(path)) {
    const item: Asset = { path, type: path.split('.').pop() ?? '', brandCandidate: candidate.test(path) };
    if (/\.(?:png|jpe?g|webp|gif|svg|avif)$/iu.test(path)) {
      try { const m = await sharp(path).metadata(); item.width = m.width; item.height = m.height; } catch { /* Non-renderable assets remain listed for manual review. */ }
    }
    assets.push(item);
  }
  if (!/\.(?:tsx?|jsx?|json|xml|gradle|yml|yaml|md|txt|html|svg|sh|properties|plist|pbxproj|strings|css|xcconfig)$/iu.test(path) && !/LICENSE|README|CHANGELOG/iu.test(path)) continue;
  const text = readFileSync(path, 'utf8'); if (text.includes('\0')) continue;
  const lines: number[] = []; let count = 0;
  text.split('\n').forEach((line, i) => { const m = line.match(/metamask|consensys|fox/giu); if (m) { lines.push(i + 1); count += m.length; } });
  if (!count) continue;
  const classification = /LICENSE|copyright|AGENTS|CLAUDE|docs\/|\.github\/|\.md$/iu.test(path) ? 'upstream attribution / docs / tooling: review, retain required notices' : /test|mock|fixture|snapshot/iu.test(path) ? 'test or fixture: preserve technical expectations, review UI assertions' : /locales\/languages|strings\.xml|branding|images/iu.test(path) ? 'user-facing branding candidate' : 'mixed runtime/internal/API/provider attribution: inspect before editing';
  hits.push({ path, lines, count, classification });
}
mkdirSync('docs/rebrand', { recursive: true });
writeFileSync('docs/rebrand/inventory.json.gz', gzipSync(JSON.stringify({ schema: 1, base: 'c51abcebdb3ddc67de1e78bdcf8a44f225495240', textHits: hits, assets }, null, 2), { level: 9 }));
writeFileSync('brand/assets/inventory-assets.json', `${JSON.stringify(assets, null, 2)}\n`);
const rows = hits.map((h) => `| \`${h.path}\` | ${h.count} | ${h.lines.join(', ')} | ${h.classification} |`).join('\n');
writeFileSync('docs/rebrand/inventory.md', `# Rebrand inventory\n\nTracked-source scan: ${files.length} files, ${hits.length} matching text files, ${hits.reduce((n,h)=>n+h.count,0)} case-insensitive MetaMask/Consensys/fox occurrences, ${assets.length} media/font/animation files. This is an inventory, not a claim every asset has been visually cleared. Internal identifiers, upstream dependencies, service hosts, test fixtures and legal notices require justified retention; do not blind-replace them.\n\nFull machine inventory: inventory.json.gz (gzip JSON with all line numbers/assets); image/animation metadata: ../../brand/assets/inventory-assets.json. Native exact-size generation contract is native-assets.json. SVG/Rive/video/typography/sound are listed even when no thumbnail decoder exists.\n\n## Text references\n\n| Path | Occurrences | Lines | Disposition class |\n| --- | --- | --- | --- |\n${rows}\n\n## Media / fonts / animations\n\n| Path | Type | Dimensions | Brand candidate |\n| --- | --- | --- | --- |\n${assets.map(a=>`| \`${a.path}\` | ${a.type} | ${a.width??'?'}×${a.height??'?'} | ${a.brandCandidate?'YES':'visual review'} |`).join('\n')}\n`);
const esc = (s: string): string => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const images = assets.filter(a=>/^(?:png|jpe?g|webp|gif|svg|avif)$/iu.test(a.type));
writeFileSync('docs/rebrand/assets-contact-sheet.html', `<!doctype html><html lang="en"><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' data: file:; style-src 'unsafe-inline'"><title>PetroCASH asset inventory</title><style>body{font:14px system-ui;background:#17171b;color:white;padding:24px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:16px}.item{padding:12px;background:#29292f;border-radius:10px;overflow-wrap:anywhere}.candidate{border:2px solid #ff245e}img{width:140px;height:140px;object-fit:contain;background:repeating-conic-gradient(#404048 0 25%,#606068 0 50%) 0/20px 20px}small{display:block;margin-top:8px}</style><h1>Tracked asset contact sheet</h1><p>Pink border = filename-based brand candidate. Every image still needs visual review. No external network resources.</p><div class="grid">${images.sort((a,b)=>Number(b.brandCandidate)-Number(a.brandCandidate)).map(a=>`<figure class="item ${a.brandCandidate?'candidate':''}"><img loading="lazy" src="../../${encodeURI(a.path)}" alt="${esc(a.path)}"><figcaption><small>${esc(a.path)}</small><small>${a.width??'?'} × ${a.height??'?'}</small></figcaption></figure>`).join('')}</div></html>`);
console.log(`Inventory recorded: ${hits.length} text files, ${assets.length} assets. No private/untracked configuration inspected.`);
