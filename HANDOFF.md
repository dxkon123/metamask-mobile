# PetroCASH autonomous rebrand handoff

更新：2026-11-24，Asia/Kuching。里程碑 M1：快速验证版准备。

## Resume first

Read MORNING-REPORT.md, docs/DECISIONS.md, docs/PLAYBOOK-zh.md and AGENTS.md. User explicitly authorizes autonomous rebrand on **codex/petrocash-rebrand**, from origin/codex/petro-wallet-v1 at **c51abcebdb3ddc67de1e78bdcf8a44f225495240**. Prior audit-only restrictions are superseded for this phase. Never push main. Never ask user for routine choices; skip/document security-critical blockers and continue independent work.

Target: PetroCASH; org.petrocash.wallet (+ .flask); petrocash://; petrocash.org; version 1.0.0 / 1. Preserve all upstream wallet/browser flows, internal identifiers, packages, LICENSE and notices. Never alter key management, recovery, vault/encryption, transaction signing, approval or permission logic. No new Android permissions. Do not print/read back/commit passwords, service values or keystores.

## M1 working state

- User logo copied verbatim into brand/assets/logo-source.png (673×673 RGBA). brand/brand.config.json is the public brand source of truth.
- scripts/rebrand/apply-brand (invoke with bash) and apply-brand.ts apply native app ID/version/name and derive 35 icons/splashes/notifications at exact original dimensions. Java namespace remains io.metamask intentionally. Repeated generation must be deterministic.
- Added Segment key guard and tests; no owner key => no createClient/settings request. Sentry original guard preserved. Focused tests PASS: 2 suites / 34 assertions (check exact count in committed evidence); 35 image dimensions and generator idempotence PASS.
- New workflow PetroCASH Rebrand at .github/workflows/petrocash-rebrand.yml. Native job runs on relevant new-branch pushes. Upload fast APK first; then AAB/source. Dedicated release-draft job creates/updates **draft only** v1.0.0-rc.1. Full quality matrix requires [full-checks] in push message or manual dispatch. All original release lint/native checks retained.
- Firebase test adaptation in scripts/rebrand/build-android.ts: derive client package names in child env, never commit generated JSON. Live push/attestation/OAuth unverified; production requires real Firebase app registration.
- Signing currently TEST upstream public certificate. Native CI tooling/key generation still to do; GitHub connector cannot write signing secrets and local gh is unavailable. Use allowed fallback, never upload keystore.
- Prior unpushed three-document final-CI clarification was carried into this new phase; old baseline is not rewritten.

## Validated baseline, not rebrand results

Original APK 8.22.0 / 4532 / io.metamask at **08d044320a2d17cc4652165a3629bd00bf896a72**: [build 45168107679](https://github.com/dxkon123/metamask-mobile/actions/runs/45168107679). Compile/signature/upload passed; overall native job ended failure. Original APK SHA-256 2b745f79ad47c1db97d123aef911db091c85758643a6325a20cd89320ae71322. User reports signature conflict. This APK is NOT the new PetroCASH build.

Baseline corrected quality [45176887394](https://github.com/dxkon123/metamask-mobile/actions/runs/45176887394), commit 2a539fd312a16bb325a25d9b8df6b277eb3456cb: 4 lint + TSC + 10 unit shards PASS; 5,926 suites, 90,660 assertions passed, 10 skipped, 1 todo. These results do not automatically cover rebrand changes. All WAL-001–007 / POL-001–010 BLOCKED.

Three critical advisories remain OPEN: proxy-addr 2.0.7 / GHSA-jqcg-44mw-7w3h (fix 2.0.8); shell-quote 1.9.0 / GHSA-pqg4-j6r4-53mv (fix 1.11.0); tar 7.5.18 / GHSA-23hp-3jrh-7fpw (fix 7.5.19). Source-map absence is not full native reachability clearance. See docs/petro reports for dated evidence.

## Build inputs

Actions secrets NAMES ONLY: GOOGLE_SERVICES_B64_ANDROID, MM_INFURA_PROJECT_ID, WALLET_CONNECT_PROJECT_ID. Optional future signing: PETROCASH_KEYSTORE_B64, PETROCASH_KEYSTORE_PASSWORD, PETROCASH_KEY_ALIAS, PETROCASH_KEY_PASSWORD. Never obtain values through chat.

CI validated toolchain: Node 24.22.1, Yarn 4.14.1, Java 17, SDK/build-tools 36, NDK 27.1.12297006, CMake 3.22.1, Gradle 9.3.1. main-dev Release/Hermes/R8/all 4 ABIs; no E2E security bypass. 8 GB heaps, 2 workers, runner swap; native compile 180 min / job 360 min. Local Mac 8 GB, no installed JDK/Android SDK; use CI, not heavy local builds.

## Next work, in priority order

1. Finish/verify focused telemetry + brand generation checks, push M1 and start new native CI. Record run and fast APK artifact immediately in MORNING-REPORT.md.
2. Keep Chinese playbook updated early. Inventory all texts/locales/assets/animations/URLs/fonts; contact sheet and change manifest.
3. Full text/asset rebrand, dApp identity/deep links/legal URLs; replace fox animations with original reduce-motion-aware equivalents, preserve Rive fallback. Remove restricted font from packaged resources without deleting copyright notices. Pin feature configuration safely; retain existing security features. Record anything unsafe to change as blocked.
4. Generate local RSA4096 / 30yr keystore under ~/PetroCASH-keys only; password file chmod600, never print/read back. Use owner secret setup fallback if no authenticated secret write capability.
5. Try narrow advisory upgrades, immutable install, meaningful tests. Run full lint/tsc/10 unit shards. Feature matrix must distinguish source retention from device/service pass.
6. Rebuild final APK/AAB, verify package/cert/hash/assets/manifest, use emulator if feasible; no fake phone/on-chain passes. Draft release only; licensing, production identity/config/signing and real acceptance remain release gates.
7. Update all handoff/docs at EVERY milestone, push branch, confirm local == remote, deliver source and verified artifacts with actual limitations.

## Test layer placement

Brand config/assets and telemetry key gating are pure helper/adapter contracts: focused unit tests. CV/integration cannot establish Android package/signature, native startup or secure storage; those need native device/emulator evidence, using existing Appium tooling if feasible. No new mocked E2E may establish real mainnet acceptance.
