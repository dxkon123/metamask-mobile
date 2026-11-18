# PETRO upstream baseline build

Repository: https://github.com/dxkon123/metamask-mobile
Branch: `codex/petro-wallet-v1`
Selected upstream base: `a3251559c8af381b7b9689dd49d3dce8d5f76261` (2026-11-18).

The application source and features remain upstream. PETRO names identify the requested artifacts only. No SocialFi functionality or branding is added during baseline verification. This is a test build, not a production release or a claim of security equivalence.

## Exact toolchain

| Tool                                   | Revision requirement / source                                        |
| -------------------------------------- | -------------------------------------------------------------------- |
| Node                                   | 24.22.1 (`.nvmrc`)                                                   |
| Yarn                                   | 4.14.1, vendored binary and packageManager checksum (`package.json`) |
| Java                                   | Temurin 17 (upstream `.github/workflows/build.yml`)                  |
| React Native                           | 0.86.3 plus upstream Yarn patch (`package.json`)                     |
| Gradle                                 | 9.3.1 (wrapper properties)                                           |
| Android compile / target / build tools | API 36 / API 36 / 36.0.0 (`android/build.gradle`)                    |
| Android minimum                        | API 24, with upstream feature-specific requirements                  |
| NDK                                    | 27.1.12297006 (`android/build.gradle`)                               |
| CMake                                  | 3.22.1 (upstream environment documentation)                          |
| Kotlin                                 | 2.1.20 (`android/build.gradle`)                                      |

The prose environment guide still mentions NDK 26.1; the selected native build file pins 27.1 and takes precedence for this build. All native architecture settings remain upstream.

## Run the isolated workflow

Push a change to the workflow, `scripts/petro/`, or this directory on the dedicated branch. The `PETRO Wallet Baseline` push workflow runs only in this fork/branch, with `contents: read`. Enable Actions for the fork if GitHub has left fork workflows disabled. No default-branch change is needed. A workflow_dispatch trigger is also defined, subject to GitHub's default-branch discovery rules.

In repository **Settings → Secrets and variables → Actions**, configure only fork-owned development service values:

- `MM_INFURA_PROJECT_ID`: a working Infura project ID, with Polygon Mainnet access. Required by upstream README for RPC connectivity.
- `GOOGLE_SERVICES_B64_ANDROID`: base64 encoding of the fork's Firebase `google-services.json`, with Android package `io.metamask`. Required by `scripts/build.sh`.
- `WALLET_CONNECT_PROJECT_ID`: fork-owned WalletConnect project ID for WalletConnect workflows; browser injected-provider support is a separate path.

Never submit production credentials or wallet seed phrases/private keys in chat, commits, workflow inputs or logs. The workflow checks only configuration presence/shape, never logs its values, and does not create an account with any external provider. A passing shape check does not verify service access. Credentials that must be embedded by the upstream mobile build can be extracted from an APK: restrict client API keys and quotas appropriately. Additional services in upstream `builds.yml` are not automatically provisioned for a fork.

The workflow uses `main-dev` (Release configuration) to bundle the JavaScript/Hermes runtime; an Expo Debug development client requiring Metro is not the requested standalone artifact. It uses only upstream's public development signing key with its existing development signing configuration. It does not invoke upstream AWS production/RC signers, deploy OTA updates or publish a GitHub release. `MM_FOX_CODE=EXAMPLE_FOX_CODE` follows the external-contributor example. All application security and feature code is retained.

## Equivalent commands in an isolated Android build environment

```bash
git checkout codex/petro-wallet-v1
node .yarn/releases/yarn-4.14.1.cjs install --immutable
export PATH="$PWD/node_modules/.bin:$PATH"
export CI=true METAMASK_BUILD_TYPE=main METAMASK_ENVIRONMENT=dev
# Supply the fork-owned service configuration through the environment.
node scripts/setup.mjs --no-build-ios
# Use upstream development keystore credentials only, as in the workflow.
yarn build:android:main:dev
yarn lint
yarn lint:tsc
yarn test:unit --maxWorkers=2 --ci --watchman=false
```

The workflow retains disabled arbitrary dependency lifecycle scripts, upstream LavaMoat allow-scripts preparation, package patches, Git dependency allowlist, minimum package age, immutable lockfile and all wallet/security checks. An additional audit exposes advisories including upstream exclusions; it does not silently accept them.

## Outputs and evidence

On successful build, service preflight and signature/bundle verification, `build/petro/` contains `PETRO-SocialFi-Wallet-V1.apk`, `APK-SHA256.txt`, a versioned Git source archive and `PETRO-SocialFi-Wallet-V1.zip`. The ZIP includes build instructions, provenance, source, logs and reports. No ZIP is labeled as the final wallet delivery when the APK is absent. Evidence is uploaded on failure too, under `petro-wallet-evidence-<commit>`, retained for 14 days; GitHub artifact downloads require repository access/sign-in. An artifact upload is not a production publication.

## Test layer placement

Keep and execute existing upstream unit suites; do not duplicate or rewrite tests merely for this branch. The evidence helper performs deterministic repository/configuration checks only. Existing component-view/integration suites remain available, and are not claimed as run by this workflow. The real WAL/POL acceptance requires installed Android packaging, native secure storage/lifecycle, native Web3 provider injection, and real chain receipts. Component-view and integration mocks cannot establish those facts. Device evidence is therefore required for those acceptance boundaries, using upstream Appium tooling when available, with a fresh low-value test wallet. No mocked E2E build may establish real-mainnet acceptance.

## Change justification

Only the new workflow, evidence helper and these baseline documents are added. The source gate rejects modifications/deletions of any upstream file. Build-generated bridge, terms-of-use and native configuration files are prepared by upstream scripts in the ephemeral runner and are not committed. No unavoidable application source correction is known or applied yet. Further changes must be separately justified and the preservation allowlist reviewed explicitly.

Official references at the selected revision: [README](https://github.com/MetaMask/metamask-mobile/blob/a3251559c8af381b7b9689dd49d3dce8d5f76261/README.md), [environment](https://github.com/MetaMask/metamask-mobile/blob/a3251559c8af381b7b9689dd49d3dce8d5f76261/docs/readme/environment.md), [troubleshooting](https://github.com/MetaMask/metamask-mobile/blob/a3251559c8af381b7b9689dd49d3dce8d5f76261/docs/readme/troubleshooting.md), [build script](https://github.com/MetaMask/metamask-mobile/blob/a3251559c8af381b7b9689dd49d3dce8d5f76261/scripts/build.sh).
