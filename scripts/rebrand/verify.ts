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
];
const changed = git('diff', '--name-only', base, 'HEAD')
  .split('\n')
  .filter(Boolean);
const protectedChanges = changed.filter((p) =>
  protectedRoots.some((prefix) => p.startsWith(prefix)),
);
if (protectedChanges.length)
  throw new Error(`Protected source changed: ${protectedChanges.join(', ')}`);
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
if (git('diff', '--diff-filter=D', '--name-only', base, 'HEAD'))
  throw new Error('Upstream tracked files deleted');
const config = JSON.parse(readFileSync('brand/brand.config.json', 'utf8')) as {
  applicationId: string;
  name: string;
  versionName: string;
  versionCode: number;
};
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
