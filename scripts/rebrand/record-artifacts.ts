/** Public artifact metadata only; no service configuration or signing material. */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const config = JSON.parse(readFileSync('brand/brand.config.json', 'utf8')) as {
  applicationId: string;
  versionName: string;
  versionCode: number;
};
const apk = 'build/petrocash/PetroCASH-TEST-1.0.0.apk';
const aab = 'build/petrocash/PetroCASH-TEST-1.0.0.aab';
const badging = readFileSync('build/petrocash/apk-badging.txt', 'utf8');
const match = badging.match(
  /package: name='([^']+)' versionCode='([^']+)' versionName='([^']+)'/u,
);
if (
  !match ||
  match[1] !== config.applicationId ||
  match[2] !== String(config.versionCode) ||
  match[3] !== config.versionName
)
  throw new Error('Built APK identity mismatch');
const signature = readFileSync('build/petrocash/apk-signature.txt', 'utf8');
const cert = signature.match(/certificate SHA-256 digest: ([a-f\d]+)/u)?.[1];
if (!cert) throw new Error('APK signer fingerprint missing');
const files = [apk, aab]
  .filter(existsSync)
  .map((path) => ({
    path: path.split('/').pop(),
    sha256: createHash('sha256').update(readFileSync(path)).digest('hex'),
  }));
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
  encoding: 'utf8',
}).trim();
writeFileSync(
  'build/petrocash/SHA256SUMS.txt',
  `${files.map((file) => `${file.sha256}  ${file.path}`).join('\n')}\n`,
);
writeFileSync(
  'build/petrocash/artifact-metadata.json',
  JSON.stringify(
    {
      applicationId: match[1],
      versionCode: match[2],
      versionName: match[3],
      sourceCommit,
      branch: 'codex/petrocash-rebrand',
      ciRun: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
      signing: 'TEST: upstream public development certificate',
      certificateSHA256: cert,
      firebase: 'Derived development client; not production registered',
      files,
      phoneInstallation: 'NOT RUN',
      walletPolygonAcceptance: 'BLOCKED',
      releaseReady: false,
    },
    null,
    2,
  ),
);
console.log(
  'Artifact identity and signer recorded; TEST artifacts are not production approved.',
);
