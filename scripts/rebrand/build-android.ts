/** Test-only Firebase package adaptation stays inside the child build environment. */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
interface FirebaseClient {
  client_info?: { android_client_info?: { package_name?: string } };
}
interface FirebaseConfig {
  client: FirebaseClient[];
}
const brand = JSON.parse(readFileSync('brand/brand.config.json', 'utf8')) as {
  applicationId: string;
  flaskApplicationId: string;
};
const encoded = process.env.GOOGLE_SERVICES_B64_ANDROID;
if (!encoded || !process.env.MM_INFURA_PROJECT_ID)
  throw new Error(
    'Missing development service configuration; values are never logged',
  );
let firebase: FirebaseConfig;
try {
  firebase = JSON.parse(
    Buffer.from(encoded, 'base64').toString('utf8'),
  ) as FirebaseConfig;
} catch {
  throw new Error('Invalid Firebase development configuration; values omitted');
}
if (!Array.isArray(firebase.client) || firebase.client.length === 0)
  throw new Error('Firebase has no Android clients');
for (const client of firebase.client) {
  const info = client.client_info?.android_client_info;
  if (!info) continue;
  info.package_name = info.package_name?.endsWith('.flask')
    ? brand.flaskApplicationId
    : brand.applicationId;
}
const env = {
  ...process.env,
  GOOGLE_SERVICES_B64_ANDROID: Buffer.from(JSON.stringify(firebase)).toString(
    'base64',
  ),
  MM_SENTRY_DSN: '',
  SEGMENT_WRITE_KEY: '',
  SEGMENT_PROXY_URL: '',
};
console.log(
  'TEST Firebase package adaptation enabled. Real apps/attestation/push are not registered or verified.',
);
const result = process.argv.includes('--aab')
  ? spawnSync('./gradlew', ['bundleProdRelease', '--no-daemon'], {
      cwd: 'android',
      env: { ...env, GENERATE_BUNDLE: 'true' },
      stdio: 'inherit',
    })
  : spawnSync('yarn', ['build:android:main:dev'], { env, stdio: 'inherit' });
process.exit(result.status ?? 1);
