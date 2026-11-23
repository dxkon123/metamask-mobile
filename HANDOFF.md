# PETRO wallet handoff

Updated 2026-11-23. Read this file, `AGENTS.md`, `docs/petro/BUILD.md`, `docs/petro/PETRO-Preinstall-Security-Review.md` and the reports before continuing. This repository must be sufficient to resume without the previous chat.

## Current state and authorization

- Work only on branches. Current branch and sole authorized push target: `codex/petro-wallet-v1` in `dxkon123/metamask-mobile`. Never push to main, delete upstream features, commit/print service credentials or collect wallet secrets.
- Upstream base `a3251559c8af381b7b9689dd49d3dce8d5f76261`. All original application, native, dependency and test files are preserved byte-for-byte. Only the explicitly listed CI/evidence/docs additions differ.
- A development-signed standalone Android APK exists. It remains MetaMask-branded with application ID `io.metamask`; PETRO is currently an artifact/project label. No SocialFi feature or custom wallet runtime has been added.
- User reports installation failed due conflicting app signatures. Successful installation and WAL/POL phone acceptance are not verified. A different Android user/work profile does not resolve the shared-package signature conflict. Do not uninstall or change their official wallet.
- Latest user instruction for this step: audit, push reports/checklist, add HANDOFF; **do not change application code or start rebranding yet**. Private migration, rebrand, features and release remain future milestones.

## Proven artifact and quality evidence

APK source commit: `08d044320a2d17cc4652165a3629bd00bf896a72` on this branch. APK `PETRO-SocialFi-Wallet-V1.apk`, 400,243,656 bytes, SHA-256 `2b745f79ad47c1db97d123aef911db091c85758643a6325a20cd89320ae71322`; versionName 8.22.0, versionCode 4532, applicationId `io.metamask`, minSdk 24, targetSdk 36; arm64-v8a, armeabi-v7a, x86, x86_64.

[Build run 45168107679](https://github.com/dxkon123/metamask-mobile/actions/runs/45168107679), native job 137670230405. Artifact: `petro-build-diagnostics-08d044320a2d17cc4652165a3629bd00bf896a72`, ID 14818988292, [download page](https://github.com/dxkon123/metamask-mobile/actions/runs/45168107679/artifacts/14818988292). Artifact ZIP SHA-256 `765e6f64c453b05b548005eb3db3805e10321f3eb6643bc09d624b9f0c186474`. Compile, release lint, Hermes/R8 packaging, apksigner verification and early APK upload succeeded. Overall workflow success is a separate question: long checks/audit can fail after an APK is uploaded. Never equate artifact existence with all release gates passing.

Public/shared upstream development certificate SHA-256: `6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9`, RSA-2048, checked-in upstream debug keystore. This is not a production or official Play Store signing identity. Keep valuable wallets off this development build.

Full corrected checks: [run 45176887394](https://github.com/dxkon123/metamask-mobile/actions/runs/45176887394), commit `2a539fd312a16bb325a25d9b8df6b277eb3456cb`. Four lint shards, project TypeScript and all ten unit shards PASS; 5,926 suites, 90,660 passed assertions, 0 failed, 10 skipped, 1 todo, 111 snapshots passed. Android was intentionally skipped in that quality-only push. That commit differs from the APK commit only in CI/docs; app/native/dependency/test sources are identical. See `docs/petro/evidence/corrected-unit-report.json`.

Focused tests: 618 unit assertions (overlap the full suite), six selected mocked network integration tests, five selected Android component-view tests, seven evidence-helper checks PASS. These are not native wallet or on-chain acceptance. Jest teardown/forced-exit warnings remain; skipped/todo tests were not passed. Earlier monolithic resource failures and the original one-shard environment failure remain historical failures. Unit correction unsets build-only `METAMASK_BUILD_TYPE` for tests; APK still uses Main with allowlist/security controls retained.

Artifacts/logs expire under the workflow's 14-day retention and may require GitHub access. Download/preserve approved build evidence privately before expiry; if unavailable, rebuild. Binaries, private service config and raw device logs are deliberately not committed. Root checkout plus the three fork-owned development secrets is the build source; Git alone cannot reconstruct secret values or promise byte-identical rebuilds.

## Build and verification recipe

Primary workflow: **PETRO Wallet Baseline**, `.github/workflows/petro-wallet-baseline.yml`. On GitHub Actions choose **Run workflow**, select `codex/petro-wallet-v1`, and dispatch. Manual dispatch has no head_commit push marker and runs the Android job; normal matching pushes also run it. Push commit messages containing `[quality-only]` skip Android but retain quality jobs. Do not select main. Keep the branch/repository guards when editing CI. A future private-repository move requires reviewing/updating the hard-coded repository guard and provisioning its secrets.

Required Actions repository secret NAMES ONLY:

- `GOOGLE_SERVICES_B64_ANDROID`: fork development Firebase Android configuration for the current package.
- `MM_INFURA_PROJECT_ID`: fork development RPC project.
- `WALLET_CONNECT_PROJECT_ID`: fork development WalletConnect project.

All three are user-reported configured; Firebase/Infura format checks passed, live access unverified. Do not retrieve/print values. After package-ID rebrand, matching Firebase config, service restrictions and certificate associations must be regenerated/reviewed. Segment, Sentry, OAuth and other feature services are not implicitly provisioned by these three secrets.

CI is the validated build route. It uses Node 24.22.1, Yarn 4.14.1, Java 17, SDK/build-tools 36, NDK 27.1.12297006, CMake 3.22.1, Gradle 9.3.1 and upstream React Native 0.86.3 with its upstream patch. Native compilation uses `yarn build:android:main:dev` (standalone Release packaging, Hermes/R8, all four ABIs), the upstream development keystore, upstream immutable install/preparation, no E2E overrides or security bypass. See BUILD.md and exact workflow steps for upstream setup commands; do not use npm/npx.

CI correction supplies 8 GB Metro/Gradle heaps, two workers, 2 GB Gradle metaspace and disposable runner swap without modifying app/native source. Android job timeout 360 minutes, compile step 180 minutes. APK signature/checksum/package and early upload occur before long inline checks. Release lint is retained. Independent jobs use four lint and ten unit shards plus full typecheck. Audit findings and real acceptance still block production even when the development artifact exists.

After checkout/install, source inspection: `node scripts/petro/baseline.ts inspect`. It compares HEAD with the pinned base and allows only exact added support paths, never changes/deletions of an original upstream file. Documentation additions in this handoff are explicitly allowlisted; review any future allowlist expansion. New app changes require an explicitly authorized next phase and a revised source-preservation policy, not silently bypassing the gate.

The local Mac has 8 GB RAM and no configured Android Java/SDK/emulator. Heavy local lint/Jest hit memory limits; use CI for full checks. Case-insensitive macOS cannot represent both upstream font filenames differing only by case; preserve them via Git/Linux/source archives, never commit a collision-induced deletion.

## Decisions and open issues

1. Preserve upstream wallet, key generation, import/export, secure storage, signing, warnings, permissions, original browser and network features. No custom wallet or SocialFi runtime in this baseline.
2. Critical findings OPEN: proxy-addr 2.0.7, npm 1241210 / GHSA-jqcg-44mw-7w3h / CVE-2026-90711 (fix 2.0.8); shell-quote 1.9.0, npm 1241332 / GHSA-pqg4-j6r4-53mv / CVE-2026-102422 (fix 1.11.0); tar 7.5.18, npm 1123940 / GHSA-23hp-3jrh-7fpw / CVE-2026-59873 (fix 7.5.19). Locked audit: 49 rows, 3 critical / 24 high / 22 moderate. No fixes applied.
3. Those packages have zero module-path matches among 21,348 main-JS source-map paths. APK ZIP has 3,125 entries including 175 .so entries; native marker scans do not prove code absence. Main Hermes contains an upstream package-resolution string for shell-quote. Tooling paths suggest build exposure but some shell-quote paths descend from Segment/Sovran. Do not claim all three absent from every APK component, no runtime exposure or no testing impact. Review dependencies, native/runtime SBOM and actual reachability before release.
4. No added source endpoints or Android permissions, but upstream retains extensive network capability and library-merged permissions. main-dev mixes production and development services. Segment initializes without a configured write key and may attempt settings-CDN requests. Sentry has no configured DSN and should skip initialization; SDK code/libs remain. No traffic capture or comprehensive egress clearance. See pre-install review for hosts and data categories.
5. All WAL-001–007 and POL-001–010 BLOCKED. No native create/import/export/secure-storage test, real POL/token transfer or real QuickSwap swap executed by the agent. User's only reported device result is signature-conflict install failure. Mocked tests, a DApp connection or quote cannot pass funded acceptance.
6. Every actual funded action requires explicit approval of concrete amount, recipient/contract/spender, allowance, slippage and gas. Use only fresh disposable test wallets; never request/store phrases, private keys, passwords or secret screenshots. Record public addresses/transaction hashes and non-secret observations only.
7. Other integrations can need fork service setup; real Infura/Firebase/WalletConnect access remains unverified. Upstream patch-package warned rpc-errors 7.0.2 patch applied to 7.0.3; review before release. Release signing, privacy/runtime verification and all security/acceptance gates remain open.

## Next milestones

1. **Phone test:** use a spare physical device/clean emulator with no official io.metamask installed in any user/profile; verify SHA-256 and follow `docs/petro/PETRO-Android-Phone-Checklist.txt`. Preserve the user's official wallet. If testing must use the existing phone alongside official MetaMask, report the blocker and obtain an updated sequence authorizing a distinct package ID/rebuild first. Current step does not grant that code change.
2. **Move to private repository:** after baseline phone evidence, preserve history, branch and upstream attribution/licensing; migrate only authorized repository content, CI setup and fork-owned configuration. Privacy change/migration is not done yet. Review licensing before distribution. Keep upstream security features and secrets private.
3. **Rebrand:** after authorized migration/identity decisions, choose distinct application ID, display name/icons, URL schemes/provider authorities, service associations and a separately managed signing identity. Review all upstream features and isolation; rebuild and prove side-by-side installation. Cosmetic changes alone do not fix package collision. No rebrand in this step.
4. **Features:** implement separately scoped PETRO/SocialFi features on branches with meaningful regression/security tests, preserving wallet/browser/permissions/signing behavior.
5. **Release:** resolve critical and relevant remaining findings; verify live services/privacy and every WAL/POL requirement including approved real QuickSwap swap; perform independent security review and production signing/distribution. No production acceptance until all required evidence exists.

## Complete changed-path inventory versus upstream base

These support paths only; none is part of the delivered APK's original application source. All report/handoff additions postdate the unchanged APK. Reproduce with `git diff --name-only a3251559c8af381b7b9689dd49d3dce8d5f76261 HEAD`.

```text
.github/workflows/petro-wallet-baseline.yml
HANDOFF.md
docs/petro/ACCEPTANCE.md
docs/petro/BUILD.md
docs/petro/PETRO-APK-Metadata.json
docs/petro/PETRO-Android-Phone-Checklist.txt
docs/petro/PETRO-Delivery-Report.md
docs/petro/PETRO-Dependency-Report.json
docs/petro/PETRO-Functional-Test-Report.md
docs/petro/PETRO-Known-Issues.md
docs/petro/PETRO-Preinstall-Security-Review.md
docs/petro/PETRO-Preinstall-Static-Evidence.json
docs/petro/PETRO-Security-Test-Report.md
docs/petro/evidence/APK-SHA256.txt
docs/petro/evidence/corrected-unit-report.json
docs/petro/evidence/critical-dependency-paths.json
scripts/petro/baseline.ts
```
