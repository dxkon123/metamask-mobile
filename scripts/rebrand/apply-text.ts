/** Apply display copy; never rename keys, imports, class identifiers, security logic or migrations. */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import { rebrandVisibleText } from '../../app/core/Brand/text.ts';
import {
  isDisplayLiteral,
  isDisplaySourceFile,
} from '../../app/core/Brand/sourcePolicy.ts';
interface Brand {
  name: string;
  domain: string;
  scheme: string;
  applicationId: string;
  flaskApplicationId: string;
  supportUrl: string;
  termsUrl: string;
  privacyUrl: string;
}
const brand = JSON.parse(
  readFileSync('brand/brand.config.json', 'utf8'),
) as Brand;
const previous = existsSync('brand/applied-brand.json')
  ? (JSON.parse(readFileSync('brand/applied-brand.json', 'utf8')) as Brand)
  : { ...brand, name: 'MetaMask' };
const publicText = (text: string): string =>
  rebrandVisibleText(text, brand.name, previous.name);
function localeValues(value: unknown): unknown {
  if (typeof value === 'string')
    return publicText(value).replace(
      /https:\/\/support\.metamask\.io[^\s"<>]*/gu,
      brand.supportUrl,
    );
  if (Array.isArray(value)) return value.map(localeValues);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localeValues(v)]),
    );
  return value;
}
let localeCount = 0;
for (const name of readdirSync('locales/languages').filter((n) =>
  n.endsWith('.json'),
)) {
  const path = `locales/languages/${name}`;
  const before = readFileSync(path, 'utf8');
  const after = `${JSON.stringify(localeValues(JSON.parse(before) as unknown), null, 2)}\n`;
  if (before !== after) {
    writeFileSync(path, after);
    localeCount++;
  }
}
const files = execFileSync(
  'git',
  ['ls-files', 'app/components', 'app/component-library'],
  { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
)
  .trim()
  .split('\n');
let sourceCount = 0;
const changedSources = new Set<string>();
for (const path of files.filter(isDisplaySourceFile)) {
  const source = readFileSync(path, 'utf8');
  if (!/MetaMask|Metamask/u.test(source) && !source.includes(previous.name))
    continue;
  const ast = ts.createSourceFile(
    path,
    source,
    ts.ScriptTarget.Latest,
    true,
    /\.tsx$/u.test(path) ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const edits: { start: number; end: number; text: string }[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      const kind = ts.isJsxAttribute(parent)
        ? 'jsxAttribute'
        : ts.isPropertyAssignment(parent)
          ? 'property'
          : 'other';
      const name =
        ts.isJsxAttribute(parent) || ts.isPropertyAssignment(parent)
          ? parent.name.getText(ast).replace(/^['"]|['"]$/gu, '')
          : undefined;
      if (!isDisplayLiteral(kind, name, node.text)) return;
      if (
        ts.isImportDeclaration(parent) ||
        ts.isExportDeclaration(parent) ||
        ts.isEnumMember(parent) ||
        (ts.isPropertyAssignment(parent) && parent.name === node)
      )
        return;
      if (
        ts.isCallExpression(parent) &&
        ts.isIdentifier(parent.expression) &&
        ['require', 'strings', 'testID'].includes(parent.expression.text)
      )
        return;
      if (
        /[/_]|^@|\.svg$|\.png$|\.riv$/u.test(node.text) &&
        !/\s/u.test(node.text)
      )
        return;
      const value = publicText(node.text);
      if (value !== node.text)
        edits.push({
          start: node.getStart(ast),
          end: node.end,
          text: JSON.stringify(value),
        });
    } else if (ts.isJsxText(node)) {
      if (!isDisplayLiteral('jsxText', undefined, node.text)) return;
      const value = publicText(node.text);
      if (value !== node.text)
        edits.push({ start: node.pos, end: node.end, text: value });
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  if (edits.length) {
    let after = source;
    for (const edit of edits.sort((a, b) => b.start - a.start))
      after = after.slice(0, edit.start) + edit.text + after.slice(edit.end);
    writeFileSync(path, after);
    changedSources.add(path);
    sourceCount++;
  }
}
function edit(path: string, fn: (s: string) => string): void {
  const s = readFileSync(path, 'utf8');
  const v = fn(s);
  if (s !== v) {
    writeFileSync(path, v);
    if (/\.[jt]sx?$/u.test(path)) changedSources.add(path);
  }
}
// Explicit display bindings in technical files; never rewrite protocol options.
edit('app/components/UI/Card/services/DaimoPayService.ts', (s) =>
  s.replace(
    /(intent:\s*)(['"])([^'"\n]*)\2/u,
    (_all, prefix: string, _quote: string, value: string) =>
      prefix + JSON.stringify(publicText(value)),
  ),
);
edit('app/components/Views/Settings/AppInformation/index.tsx', (s) =>
  s.replace(
    /goTo\(url,\s*['"][^'"]+['"]\)/u,
    `goTo(url, ${JSON.stringify(brand.domain)})`,
  ),
);
edit('app/components/UI/PhishingModal/index.js', (s) =>
  s.replace(
    /Learn more at https:\/\/(?:metamask\.io|petrocash\.org)/gu,
    `Learn more at https://${brand.domain}`,
  ),
);
edit('android/app/src/main/AndroidManifest.xml', (s) =>
  s
    .replace(
      /(?:metamask(?:-alternate)?\.(?:test-)?app\.link|link(?:-test)?\.metamask\.(?:io|com))/gu,
      brand.domain,
    )
    .replace(
      /android:scheme="expo-metamask"/gu,
      `android:scheme="expo-${brand.scheme}"`,
    )
    .replace(/android:scheme="metamask"/gu, `android:scheme="${brand.scheme}"`)
    .replace(
      /android:value="io\.metamask"/gu,
      `android:value="${brand.applicationId}"`,
    ),
);
// Signed universal-link domains are protocol identities, not display branding.
edit('app/core/AppConstants.ts', (s) =>
  s
    .replace(/name: 'MetaMask Wallet'/u, `name: ${JSON.stringify(brand.name)}`)
    .replace(
      /description: 'MetaMask Wallet Integration'/u,
      `description: ${JSON.stringify(`${brand.name} Wallet`)}`,
    )
    .replace(
      /url: 'https:\/\/metamask\.io\/'/u,
      `url: ${JSON.stringify(`https://${brand.domain}/`)}`,
    )
    .replace(
      /https:\/\/raw\.githubusercontent\.com\/MetaMask\/metamask-mobile\/main\/logo\.png/gu,
      `https://${brand.domain}/icon.png`,
    )
    .replace(
      /native: 'metamask:\/\/'/u,
      `native: ${JSON.stringify(`${brand.scheme}://`)}`,
    )
    .replace(
      /SHORT_HOMEPAGE_URL: 'MetaMask.io'/u,
      `SHORT_HOMEPAGE_URL: ${JSON.stringify(brand.domain)}`,
    )
    .replace(
      /https:\/\/(?:metamask\.(?:io|com))\/(?:terms|terms-of-use)/gu,
      brand.termsUrl,
    )
    .replace(/https:\/\/metamask\.com\/privacy-notice/gu, brand.privacyUrl),
);
edit('app/constants/urls.ts', (s) =>
  s.replace(/https:\/\/support\.metamask\.io[^'`\s]*/gu, brand.supportUrl),
);
// Preserve the upstream support attribution parameter and query separators.
edit('app/constants/urls.ts', (s) =>
  s.replace(
    /(export const METAMASK_SUPPORT_URL = )[^;]+;/u,
    (_all, prefix: string) =>
      prefix + JSON.stringify(brand.supportUrl) + ' + MOBILE_UTM;',
  ),
);
edit('app/core/AppConstants.ts', (s) =>
  s.replace(
    /(\b(?:TERMS_AND_CONDITIONS|TERMS_OF_USE|TERMS_OF_USE_URL|TERMS_OF_USE_URL_WITHOUT_COOKIES):\s*)['"][^'"]*['"]/gu,
    (_all, prefix: string) => prefix + JSON.stringify(brand.termsUrl),
  ),
);
// Native display metadata only; internal targets/registration/classes keep their names.
edit('app.config.js', (s) =>
  s
    .replace(
      /displayName: '[^']+'/u,
      `displayName: ${JSON.stringify(brand.name)}`,
    )
    .replaceAll(previous.applicationId, brand.applicationId),
);
for (const path of [
  'ios/MetaMask/Info.plist',
  'ios/MetaMask/MetaMask-Flask-Info.plist',
]) {
  edit(path, (s) =>
    s
      .replace(
        /(<key>CFBundleDisplayName<\/key>\s*<string>)[^<]*(<\/string>)/u,
        `$1${brand.name}${path.includes('-Flask-') ? ' Flask' : ''}$2`,
      )
      .replace(
        /<string>([^<]*MetaMask[^<]*)<\/string>/gu,
        (_all, value: string) => `<string>${publicText(value)}</string>`,
      )
      .replace(
        /<string>metamask<\/string>/gu,
        `<string>${brand.scheme}</string>`,
      )
      .replace(
        /<string>metamask-flask<\/string>/gu,
        `<string>${brand.scheme}-flask</string>`,
      )
      .replace(
        /<string>expo-metamask<\/string>/gu,
        `<string>expo-${brand.scheme}</string>`,
      )
      .replace(/\s*<string>GrotzecCond-Bold.otf<\/string>/gu, ''),
  );
}
edit('app/components/Views/BrowserTab/BrowserTab.tsx', (s) =>
  s
    .replaceAll('WebView MetaMaskMobile', `WebView ${brand.name}`)
    .replaceAll(`WebView ${previous.name}`, `WebView ${brand.name}`),
);

// Identity data only: keep provider transports and their compatibility identifiers unchanged.
edit('scripts/inpage-bridge/webpack.config.js', (s) =>
  s
    .replace(
      "'io.metamask.mobile.flask'",
      JSON.stringify(brand.flaskApplicationId),
    )
    .replace("'io.metamask.mobile'", JSON.stringify(brand.applicationId))
    .replace(
      "JSON.stringify('MetaMask')",
      `JSON.stringify(${JSON.stringify(brand.name)})`,
    ),
);
// Keep generated display bindings in repository style, so repeated application
// does not alternate quotes/formatting with the normal formatter.
const prettier = await import('prettier');
for (const path of changedSources) {
  const options = await prettier.resolveConfig(path);
  writeFileSync(
    path,
    await prettier.format(readFileSync(path, 'utf8'), {
      ...options,
      filepath: path,
    }),
  );
}
writeFileSync(
  'brand/applied-brand.json',
  `${JSON.stringify(brand, null, 2)}\n`,
);
console.log(
  `Rebranded ${localeCount} locale files and ${sourceCount} UI source files; keys/internal identifiers retained.`,
);
