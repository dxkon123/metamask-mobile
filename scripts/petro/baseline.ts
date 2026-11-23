/** Evidence collection only. Never reads or creates wallet secrets. */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

type Status = 'PASS' | 'FAIL' | 'BLOCKED' | 'NOT RUN';
interface Step {
  outcome?: string;
  conclusion?: string;
}
interface Check {
  id: string;
  status: Status;
  evidence: string;
}

const base = 'a3251559c8af381b7b9689dd49d3dce8d5f76261';
const output = 'build/petro';
const reports = join(output, 'reports');
const allowedAdditions = new Set([
  '.github/workflows/petro-wallet-baseline.yml',
  'scripts/petro/baseline.ts',
  'docs/petro/BUILD.md',
  'docs/petro/ACCEPTANCE.md',
]);
mkdirSync(reports, { recursive: true });
mkdirSync(join(output, 'logs'), { recursive: true });

function git(...args: string[]): string {
  return execFileSync('git', args, {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  }).trim();
}

function save(name: string, value: unknown): void {
  writeFileSync(join(output, name), `${JSON.stringify(value, null, 2)}\n`);
}

function bundleInventory(): void {
  const maps = [
    'android/app/build/generated/sourcemaps/react/prodRelease/index.android.bundle.map',
    'android/app/build/intermediates/sourcemaps/react/prodRelease/index.android.bundle.packager.map',
  ];
  const sources = new Set<string>();
  const recordedMaps: string[] = [];
  function visit(value: unknown): void {
    if (!value || typeof value !== 'object') return;
    const map = value as Record<string, unknown>;
    if (Array.isArray(map.sources)) {
      for (const source of map.sources) {
        if (typeof source === 'string') sources.add(source.replaceAll('\\', '/'));
      }
    }
    if (Array.isArray(map.sections)) {
      for (const section of map.sections) {
        if (section && typeof section === 'object') {
          visit((section as Record<string, unknown>).map);
        }
      }
    }
  }
  for (const path of maps) {
    if (existsSync(path)) {
      visit(JSON.parse(readFileSync(path, 'utf8')) as unknown);
      recordedMaps.push(path);
    }
  }
  const paths = [...sources].sort();
  save('reports/bundled-modules.json', {
    status: paths.length ? 'RECORDED' : 'BLOCKED',
    sourceMaps: recordedMaps,
    sourceCount: paths.length,
    criticalPackages: ['proxy-addr', 'shell-quote', 'tar'].map((name) => ({
      package: name,
      matches: paths.filter((path) => `/${path}`.includes(`/node_modules/${name}/`)),
    })),
    sources: paths,
    limitation:
      'Source-map inclusion is not exploitability or runtime reachability. An absent map cannot establish package exclusion. Source contents and service values are never copied.',
  });
  console.log(`Recorded ${paths.length} bundled source paths; no source contents copied.`);
}

function sha256(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function inspect(): void {
  const head = git('rev-parse', 'HEAD');
  const changes = git('diff', '--name-status', base, head)
    .split('\n')
    .filter(Boolean);
  const unexpected = changes.filter((line) => {
    const [status, path] = line.split('\t');
    return status !== 'A' || !allowedAdditions.has(path);
  });
  const dirty = git('diff', '--name-only', 'HEAD');
  const result: Check = {
    id: 'SOURCE-PRESERVATION',
    status: unexpected.length === 0 && !dirty ? 'PASS' : 'FAIL',
    evidence:
      'Exact git tree comparison with pinned upstream base. This proves source preservation only; runtime equivalence remains unverified.',
  };
  save('source-preservation.json', {
    ...result,
    base,
    head,
    changes,
    unexpected,
    dirty,
  });
  save('provenance.json', {
    repository: 'https://github.com/dxkon123/metamask-mobile',
    upstream: 'https://github.com/MetaMask/metamask-mobile',
    base,
    head,
    branch: process.env.GITHUB_REF_NAME || git('branch', '--show-current'),
    runUrl: process.env.GITHUB_RUN_ID
      ? `https://github.com/dxkon123/metamask-mobile/actions/runs/${process.env.GITHUB_RUN_ID}`
      : null,
    observedAt: new Date().toISOString(),
    node: process.version,
    nodeRequired: readFileSync('.nvmrc', 'utf8').trim(),
    yarnSha256: sha256('.yarn/releases/yarn-4.14.1.cjs'),
    lockfileSha256: sha256('yarn.lock'),
    gradleWrapper: readFileSync(
      'android/gradle/wrapper/gradle-wrapper.properties',
      'utf8',
    ),
    signing:
      'Upstream public development keystore only; not a production release.',
  });
  writeFileSync(
    join(reports, 'upstream-file-inventory.txt'),
    `${git('ls-tree', '-r', base)}\n`,
  );
  const groups = [
    'app/components/Views',
    'app/components/UI',
    'app/core',
    'app/core/Engine/controllers',
  ];
  const rows = groups.flatMap((group) =>
    readdirSync(group, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map(
        (item) =>
          `| ${group}/${item.name} | Source preserved if SOURCE-PRESERVATION passes | NOT RUN |`,
      ),
  );
  writeFileSync(
    join(reports, 'feature-inventory.md'),
    `# Selected upstream feature inventory\n\nBase: ${base}\n\n` +
      'All upstream files and Git blob IDs are enumerated in upstream-file-inventory.txt. ' +
      'The table inventories feature surfaces and controllers, including features outside WAL-001–007. ' +
      'It does not assert that every flag, service, native integration or runtime behavior works. ' +
      'Existing Social features in this revision are retained; no PETRO SocialFi feature is added.\n\n' +
      '| Source surface | Preservation | Runtime regression |\n| --- | --- | --- |\n' +
      `${rows.join('\n')}\n`,
  );
  const manifest = readFileSync(
    'android/app/src/main/AndroidManifest.xml',
    'utf8',
  );
  save('android-source-observations.json', {
    allowBackupFalse: manifest.includes('android:allowBackup="false"'),
    manifestSha256: sha256('android/app/src/main/AndroidManifest.xml'),
    limitations:
      'Static source observation; merged APK manifest and installed-device behavior still require verification.',
  });
  console.log(`${result.id}: ${result.status}`);
  if (result.status !== 'PASS') process.exitCode = 1;
}

function prerequisites(): void {
  const checks: Check[] = [];
  const infura = process.env.MM_INFURA_PROJECT_ID || '';
  checks.push({
    id: 'MM_INFURA_PROJECT_ID',
    status: /^[a-f0-9]{32}$/iu.test(infura) ? 'PASS' : 'BLOCKED',
    evidence:
      'Checks configuration format only. RPC access and Polygon availability need live validation.',
  });
  let firebaseMatches = false;
  try {
    const raw: unknown = JSON.parse(
      Buffer.from(
        process.env.GOOGLE_SERVICES_B64_ANDROID || '',
        'base64',
      ).toString('utf8'),
    );
    if (
      typeof raw === 'object' &&
      raw !== null &&
      'client' in raw &&
      Array.isArray(raw.client)
    ) {
      firebaseMatches = raw.client.some((client: unknown) => {
        if (
          typeof client !== 'object' ||
          client === null ||
          !('client_info' in client)
        )
          return false;
        const info = client.client_info;
        if (
          typeof info !== 'object' ||
          info === null ||
          !('android_client_info' in info)
        )
          return false;
        const android = info.android_client_info;
        return (
          typeof android === 'object' &&
          android !== null &&
          'package_name' in android &&
          android.package_name === 'io.metamask'
        );
      });
    }
  } catch {
    // Never print configuration contents or parsing errors that may contain it.
  }
  checks.push({
    id: 'GOOGLE_SERVICES_B64_ANDROID',
    status: firebaseMatches ? 'PASS' : 'BLOCKED',
    evidence:
      'Requires fork-owned Firebase Android configuration with an io.metamask client. Contents never logged.',
  });
  save('prerequisites.json', checks);
  for (const check of checks) console.log(`${check.id}: ${check.status}`);
  if (checks.some((check) => check.status !== 'PASS')) process.exitCode = 1;
}

function stepStatus(step?: Step): Status {
  if (step?.outcome === 'success') return 'PASS';
  if (step?.outcome === 'failure') return 'FAIL';
  if (step?.outcome === 'cancelled') return 'BLOCKED';
  return 'NOT RUN';
}

function readSteps(): Record<string, Step> {
  return JSON.parse(process.env.PETRO_STEP_RESULTS || '{}') as Record<
    string,
    Step
  >;
}

function redactServiceConfiguration(): void {
  const values = new Set<string>();
  for (const name of [
    'MM_INFURA_PROJECT_ID',
    'GOOGLE_SERVICES_B64_ANDROID',
    'WALLET_CONNECT_PROJECT_ID',
  ]) {
    const value = process.env[name];
    if (value && value.length >= 8) values.add(value);
  }
  function collect(value: unknown): void {
    if (typeof value === 'string' && value.length >= 12) values.add(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value !== null && typeof value === 'object')
      Object.values(value).forEach(collect);
  }
  try {
    collect(
      JSON.parse(
        Buffer.from(
          process.env.GOOGLE_SERVICES_B64_ANDROID || '',
          'base64',
        ).toString('utf8'),
      ),
    );
  } catch {
    // Do not print decoded service configuration or parsing diagnostics.
  }
  function redactFolder(folder: string): void {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) {
        redactFolder(path);
        continue;
      }
      if (!entry.isFile() || !/\.(?:log|json|jsonl|tap|xml|html|txt|md)$/u.test(entry.name))
        continue;
      let content = readFileSync(path, 'utf8');
      for (const value of values)
        content = content.replaceAll(value, '[REDACTED SERVICE CONFIGURATION]');
      writeFileSync(path, content);
    }
  }
  redactFolder(output);
}

function report(): void {
  redactServiceConfiguration();
  const steps = readSteps();
  const ids = [
    'inventory',
    'prerequisites',
    'dependencies',
    'android_tools',
    'setup',
    'build',
    'lint',
    'typecheck',
    'unit',
    'audit',
    'apk',
  ];
  const checks: Check[] = ids.map((id) => ({
    id,
    status:
      id === 'prerequisites' && steps[id]?.outcome === 'failure'
        ? 'BLOCKED'
        : stepStatus(steps[id]),
    evidence:
      id === 'inventory'
        ? 'source-preservation.json, provenance.json'
        : id === 'prerequisites'
          ? 'prerequisites.json'
          : `Workflow step ${id}; logs/ and GitHub job logs`,
  }));
  const walletNames = [
    'Create wallet, phrase generation, address, persistence, secure access',
    'Import phrase/private key, address recovery, persistence',
    'Add/derive/switch/recover accounts',
    'Authenticated selected-account private-key export; no secret logging/transmission',
    'Sign, broadcast and confirm real Polygon send',
    'Receive real Polygon funds and reconcile balance/history',
    'Original Web3 Browser, provider, permissions and completed QuickSwap swap',
  ];
  const acceptance: Check[] = walletNames.map((name, index) => ({
    id: `WAL-00${index + 1}`,
    status: 'BLOCKED',
    evidence: `${name}. Requires installed APK and device evidence${index >= 4 ? ', funded fresh wallet and explicit transaction approval' : ''}. No acceptance execution recorded.`,
  }));
  const polygon: Check[] = Array.from({ length: 10 }, (_, i) => ({
    id: `POL-${String(i + 1).padStart(3, '0')}`,
    status: 'BLOCKED',
    evidence:
      'No installed-device Polygon Mainnet test or on-chain evidence recorded. See docs/petro/ACCEPTANCE.md.',
  }));
  save('reports/checks.json', { checks, acceptance, polygon });
  const table = (items: Check[]) =>
    '| Check | Status | Evidence / missing requirement |\n| --- | --- | --- |\n' +
    items
      .map((item) => `| ${item.id} | ${item.status} | ${item.evidence} |`)
      .join('\n') +
    '\n';
  writeFileSync(
    join(reports, 'functional-test-report.md'),
    '# Functional test report\n\nAutomated checks are separate from installed-app acceptance. ' +
      'Mocked upstream unit tests cannot establish successful mainnet sends, receives or swaps.\n\n' +
      table(checks) +
      '\n' +
      table(acceptance) +
      '\n' +
      table(polygon),
  );
  writeFileSync(
    join(reports, 'security-test-report.md'),
    '# Security test report\n\n' +
      table(
        checks.filter((check) =>
          ['inventory', 'audit', 'apk'].includes(check.id),
        ),
      ) +
      '\nUpstream keyring, SecureKeychain, authentication, signing, phishing checks, provider and permission code are preserved by the source gate. ' +
      'Source preservation is not a security audit. Secure randomness, storage, phrase/key export, DApp isolation, request destinations, ' +
      'merged manifest, installation, supply-chain integrity and build reproducibility require independent runtime/release review. ' +
      'No wallet or funds are created/used by this workflow. No production signer is requested. ' +
      'No security equivalence or zero-vulnerability claim is made.\n',
  );
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
    version: string;
    engines: Record<string, string>;
    packageManager: string;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  const auditPath = [
    'logs/dependency-audit.jsonl',
    'logs/local-dependency-audit-retry.jsonl',
  ].find((path) => existsSync(join(output, path)));
  const findings: {
    package: string;
    severity: string;
    advisory: number;
    url: string;
  }[] = [];
  if (auditPath) {
    for (const line of readFileSync(join(output, auditPath), 'utf8').split(
      '\n',
    )) {
      try {
        const item = JSON.parse(line) as {
          value?: string;
          children?: Record<string, unknown>;
        };
        if (
          item.value &&
          typeof item.children?.Severity === 'string' &&
          typeof item.children.ID === 'number' &&
          typeof item.children.URL === 'string'
        ) {
          findings.push({
            package: item.value,
            severity: item.children.Severity,
            advisory: item.children.ID,
            url: item.children.URL,
          });
        }
      } catch {
        // Non-JSON command diagnostics stay in the original log, never count as findings.
      }
    }
  }
  save('reports/dependency-audit-summary.json', {
    log: auditPath || null,
    findings,
    limitation:
      'Registry advisory matches require reachability/exploitability triage. No vulnerabilities are silently accepted or automatically patched.',
  });
  save('reports/dependency-report.json', {
    version: packageJson.version,
    engines: packageJson.engines,
    packageManager: packageJson.packageManager,
    dependencies: packageJson.dependencies,
    devDependencies: packageJson.devDependencies,
    lockfileSha256: sha256('yarn.lock'),
    audit: checks.find((check) => check.id === 'audit'),
    advisoryRows: findings.length,
    criticalAdvisoryRows: findings.filter(
      (finding) => finding.severity === 'critical',
    ).length,
    securityPolicy:
      'Preserve upstream disabled lifecycle scripts, LavaMoat allowlist, approved Git dependencies, minimal package age and immutable lockfile. Audit separately overrides advisory exclusions for visibility.',
  });
  writeFileSync(
    join(reports, 'known-issues.md'),
    '# Known issues and release blockers\n\n' +
      checks
        .filter((check) => check.status !== 'PASS')
        .map((check) => `- ${check.id}: ${check.status}; ${check.evidence}`)
        .join('\n') +
      '\n- All WAL/POL acceptance gates remain BLOCKED until executed on an installed app.\n' +
      '- External API access is not inherited by a fork: Infura, Firebase, WalletConnect, OAuth, analytics, notifications, card/fiat, swaps/bridge, feature flags, compliance, security alerts and OTA services require validation; see builds.yml.\n' +
      '- The upstream development keystore is public and unsuitable for production or valuable wallets. App ID and UI remain upstream; use a separate test device/profile.\n' +
      '- No branding, package ID, feature flag, wallet engine, browser, permission or security code changes have been made.\n' +
      '- No APK exists unless the apk workflow step passed and its artifact/checksum are present.\n',
  );
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      '# PETRO baseline evidence\n\n' +
        table(checks) +
        '\nWAL-001–007 and POL-001–010: BLOCKED pending installed-device and approved mainnet testing.\n',
    );
  }
  console.log('Evidence reports written. No acceptance test marked PASS.');
}

function gate(): void {
  const steps = readSteps();
  const required = [
    'inventory',
    'prerequisites',
    'dependencies',
    'android_tools',
    'setup',
    'build',
    'lint',
    'typecheck',
    'unit',
    'audit',
    'apk',
  ];
  const failed = required.filter((name) => steps[name]?.outcome !== 'success');
  if (failed.length) {
    console.error(
      `Baseline build/check gate not satisfied: ${failed.join(', ')}`,
    );
    process.exitCode = 1;
  } else {
    console.log(
      'Automated baseline gate passed. Manual WAL/POL acceptance and production release remain blocked.',
    );
  }
}

switch (process.argv[2]) {
  case 'inspect':
    inspect();
    break;
  case 'prerequisites':
    prerequisites();
    break;
  case 'report':
    report();
    break;
  case 'bundle-inventory':
    bundleInventory();
    break;
  case 'gate':
    gate();
    break;
  default:
    throw new Error(
      'Usage: node scripts/petro/baseline.ts inspect|prerequisites|report|bundle-inventory|gate',
    );
}
