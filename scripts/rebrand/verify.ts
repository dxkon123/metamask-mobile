/** Validate identity, unchanged sensitive source, and original permission declarations. */
import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const base = 'c51abcebdb3ddc67de1e78bdcf8a44f225495240';
const git = (...args: string[]): string =>
  execFileSync('git', args, {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  }).trim();
const protectedRoots = [
  'app/core/Authentication',
  'app/core/SecureKeychain',
  'app/core/Engine/controllers/keyring-controller',
  'app/core/Engine/controllers/transaction-controller',
  'app/core/Engine/controllers/permission-controller',
  'app/core/Signing',
  'app/core/Permissions',
  'app/core/DeeplinkManager/utils/verifySignature.ts',
  // These UI-adjacent files also contain protocol/approval behavior.
  'app/components/Views/confirmations/constants/confirmations.ts',
  'app/components/Views/QRScanner/index.tsx',
  'app/components/UI/Card/components/DaimoPayModal/DaimoPayModal.tsx',
  'app/components/UI/Money/utils/devErrorAlert.ts',
  'app/components/UI/Charts/AdvancedChart/webview/chartLogicString.ts',
];
const changed = git('diff', '--name-only', base).split('\n').filter(Boolean);
const protectedChanges = changed.filter((p) =>
  protectedRoots.some((prefix) => p.startsWith(prefix)),
);
if (protectedChanges.length)
  throw new Error(`Protected source changed: ${protectedChanges.join(', ')}`);
const appConstantsPath = 'app/core/AppConstants.ts';
const originalAppConstants = git('show', `${base}:${appConstantsPath}`);
const currentAppConstants = readFileSync(appConstantsPath, 'utf8');
for (const field of [
  'MM_UNIVERSAL_LINK_HOST_ALTERNATE',
  'MM_UNIVERSAL_LINK_TEST_APP_HOST',
  'MM_UNIVERSAL_LINK_TEST_APP_HOST_ALTERNATE',
  'MM_IO_UNIVERSAL_LINK_HOST',
  'MM_IO_UNIVERSAL_LINK_TEST_HOST',
  'MM_COM_UNIVERSAL_LINK_HOST',
  'MM_COM_UNIVERSAL_LINK_TEST_HOST',
  'MM_DEEP_LINK_PUBLIC_KEY_X',
  'MM_DEEP_LINK_PUBLIC_KEY_Y',
]) {
  const literal = new RegExp(`\\b${field}:\\s*['\"]([^'\"]+)['\"]`, 'u');
  const original = originalAppConstants.match(literal)?.[1];
  if (!original || currentAppConstants.match(literal)?.[1] !== original)
    throw new Error(`Signed-link protocol constant changed: ${field}`);
}
const manifestPath = 'android/app/src/main/AndroidManifest.xml';
const permissionNames = (s: string): string[] =>
  [...s.matchAll(/<uses-permission(?:-sdk-23)?[\s\S]*?\/>/gu)]
    .map((m) => m[0].replace(/\s+/gu, ' '))
    .sort();
if (
  JSON.stringify(permissionNames(git('show', `${base}:${manifestPath}`))) !==
  JSON.stringify(permissionNames(readFileSync(manifestPath, 'utf8')))
)
  throw new Error('Android permission declarations changed');
if (git('diff', '--diff-filter=D', '--name-only', base))
  throw new Error('Upstream tracked files deleted');
const config = JSON.parse(readFileSync('brand/brand.config.json', 'utf8')) as {
  applicationId: string;
  name: string;
  versionName: string;
  versionCode: number;
};
const minimalFlags: unknown = JSON.parse(
  readFileSync('brand/feature-flags.minimal.json', 'utf8'),
);
if (
  !minimalFlags ||
  Array.isArray(minimalFlags) ||
  typeof minimalFlags !== 'object' ||
  Object.entries(minimalFlags).some(
    ([name, value]) =>
      !/^[A-Za-z0-9_]+$/u.test(name) || typeof value !== 'boolean',
  )
)
  throw new Error('Public flags must contain feature names and booleans only');
const gradle = readFileSync('android/app/build.gradle', 'utf8');
if (
  !gradle.includes(`applicationId "${config.applicationId}"`) ||
  !gradle.includes(`versionName "${config.versionName}"`) ||
  !gradle.includes(`versionCode ${config.versionCode}`)
)
  throw new Error('Android identity does not match brand config');
mkdirSync('build/petrocash', { recursive: true });
writeFileSync(
  'build/petrocash/verification.json',
  JSON.stringify(
    {
      base,
      head: git('rev-parse', 'HEAD'),
      protectedSource: 'PASS',
      signedLinkProtocolConstants: 'PASS',
      originalPermissions: 'PASS',
      originalFilesRetained: 'PASS',
      identity: config,
      brandConfigSHA256: createHash('sha256')
        .update(readFileSync('brand/brand.config.json'))
        .digest('hex'),
    },
    null,
    2,
  ),
);
console.log(
  'PetroCASH identity, protected source and source-permission checks PASS; runtime acceptance still pending.',
);
