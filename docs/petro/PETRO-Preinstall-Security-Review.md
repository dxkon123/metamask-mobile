# Pre-install security review — 2026-11-23

## Scope and result

This review changes documentation and the CI evidence helper's exact documentation allowlist only. No app/native code, dependencies, runtime configuration, package ID, icon, name, signing key or permissions were changed. Rebranding is deferred as explicitly requested for this step. The user reports a signature-conflict installation failure. There is no successful phone-install verification, runtime network trace, complete runtime SBOM or production security approval.

## Artifact and provenance

- Upstream base: `a3251559c8af381b7b9689dd49d3dce8d5f76261`.
- APK source: branch `codex/petro-wallet-v1`, commit `08d044320a2d17cc4652165a3629bd00bf896a72`.
- APK: `PETRO-SocialFi-Wallet-V1.apk`, SHA-256 `2b745f79ad47c1db97d123aef911db091c85758643a6325a20cd89320ae71322`, 400,243,656 bytes.
- Version 8.22.0 / 4532; application ID `io.metamask`; min/target API 24/36; four upstream ABIs.
- [APK CI run](https://github.com/dxkon123/metamask-mobile/actions/runs/45168107679); [artifact 14818988292](https://github.com/dxkon123/metamask-mobile/actions/runs/45168107679/artifacts/14818988292), named `petro-build-diagnostics-08d044320a2d17cc4652165a3629bd00bf896a72`.
- [Corrected full-quality run](https://github.com/dxkon123/metamask-mobile/actions/runs/45176887394), commit `2a539fd312a16bb325a25d9b8df6b277eb3456cb`: lint, typecheck, all ten unit shards PASS. App/native/dependency/test sources are identical to APK source. This later run did not compile a replacement APK.

## Changed files and application preservation

The APK's source commit differs from the upstream base only by these added paths:

```text
.github/workflows/petro-wallet-baseline.yml
docs/petro/ACCEPTANCE.md
docs/petro/BUILD.md
scripts/petro/baseline.ts
```

All original tracked upstream files have identical Git blobs and modes. No custom wallet/runtime code or endpoints were added; no upstream feature was removed. These four paths occur in neither the APK ZIP entries nor the recorded main-JS source paths. Handoff/report additions committed after the APK was compiled cannot be present in that unchanged artifact. The complete current branch path list is in HANDOFF.md and is reproducible with `git diff --name-only a3251559c8af381b7b9689dd49d3dce8d5f76261 HEAD`.

A literal claim that the APK contains only upstream repository code would be inaccurate: normal upstream builds also contain locked third-party dependencies, generated bridge/native code and embedded fork service configuration. Source identity is not bit-for-bit identity with an official MetaMask APK or proof of equivalent behavior.

## Android permissions

No fork changes were made to any Android manifest, Gradle dependency declaration or lockfile. **No permission was added by our source changes.** However, the final merged APK requests more permissions than the literal upstream `android/app/src/main/AndroidManifest.xml`: upstream library manifests contribute additional declarations. The complete APK permission names and the comparison with the literal main manifest are recorded in PETRO-Preinstall-Static-Evidence.json, including notifications, biometrics, storage, NFC, activity recognition, wake locks and exact alarms. A separately built same-variant upstream APK/merged-manifest comparison was not performed, so a compiled-permission equivalence claim is not established. Unchanged source manifests/dependencies support the narrower source-preservation claim.

## Certificate and installation conflict

CI apksigner verified APK v2 signing with one RSA-2048 signer:

- DN: `CN=Unknown, OU=MetaMask, O=Consensys, L=Unknown, ST=Unknown, C=Unknown`.
- Certificate SHA-256: `6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9`.
- Matches upstream `android/keystores/debug.keystore`, alias `androiddebugkey`.

This key is public/shared development material checked into upstream, not a private PETRO or official Play Store signing identity. It does not authenticate a trusted publisher; anyone possessing the shared key can sign another build. Do not use it for production distribution or valuable wallets.

The current artifact cannot update or coexist with a differently signed official `io.metamask` on standard Android, including a different user/work profile on the same OS. Android shares package code/version across profiles and checks package signing identity globally. The earlier profile workaround advice was incorrect. Preserve the official wallet and its data. Use a spare device/clean emulator with no official package in any profile, or later authorize a distinct application ID and rebuild. Changing the display name/icon or signing again alone does not fix coexistence. No official app was uninstalled or altered.

Primary references: [Google: one app version across personal/work profiles](https://support.google.com/googleplay/work/answer/9350374?hl=en), [AOSP signature enforcement](https://android.googlesource.com/platform/frameworks/base/+/742d65385f63c685dfe5ceab734dac3c5069e11d/services/core/java/com/android/server/pm/PackageManagerServiceUtils.java), [AOSP multi-user behavior](https://source.android.com/docs/devices/admin/multi-user).

## Data leaving the device and hosts

**This is a static capability/configuration review, not a record of actual transmissions.** No successfully installed device or traffic capture was available. Startup, consent choices, feature flags, connected DApps and user actions affect requests. Remote configuration, user RPCs, DApp subresources and redirects prevent a finite exhaustive host guarantee. Hosts receive network metadata such as IP address and request timing. Service configurations are client credentials embedded by the normal upstream build; never treat an APK as a safe secret store.

| Capability / possible transmitted data                                                                                                                | Hosts or host families present in upstream configuration/code                                                                                                                                                                                     | Conditions / limits                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blockchain RPC: chain queries, public addresses, balances, gas, signed transactions                                                                   | Infura chain hosts under `infura.io`; user/custom network RPC hosts                                                                                                                                                                               | RPC is needed for live chain use; signed transactions become public when broadcast. Seed/private keys should stay local under upstream design, but leakage absence was not dynamically verified.                |
| Assets, portfolio, pricing, phishing/security/simulation requests: public account/chain/token identifiers, transaction/signature payloads as relevant | `portfolio.api.cx.metamask.io`, `portfolio.dev-api.cx.metamask.io`, `price-alerts.dev-api.cx.metamask.io`, `security-alerts.api.cx.metamask.io`, `signature-insights.api.cx.metamask.io`                                                          | Depends on settings/features; not all services are enabled or verified.                                                                                                                                         |
| Authentication, profiles, social, rewards, notifications and websocket state: account identifiers, authentication/session data and feature payloads   | `auth-service.api.cx.metamask.io`, `profile.dev-api.cx.metamask.io`, `social.dev-api.cx.metamask.io`, `digest.dev-api.cx.metamask.io`, `rewards.dev-api.cx.metamask.io`, `rewards-money.dev-api.cx.metamask.io`, `gateway.dev-api.cx.metamask.io` | Configured main-dev hosts, service access not verified. Social/OAuth flows can require separately configured services.                                                                                          |
| Card, identity, compliance, fiat flows: public wallet/account data and information the user supplies                                                  | `card.dev-api.cx.metamask.io`, `dev.api.baanx.com`, `kyc-api.dev-api.cx.metamask.io`, `compliance.api.cx.metamask.io`, `enclave.tee.staging.idos.network`, `relay.staging.idos.network`                                                           | Only relevant flows; do not assume successful fork access or submit production identity information for this test.                                                                                              |
| Downloaded chart/static assets and other upstream service resources                                                                                   | `charting-assets.static.metamask.io`; other upstream controller/resource hosts                                                                                                                                                                    | Main-dev retains both development and production hosts. This is not an exhaustive static-host inventory.                                                                                                        |
| WalletConnect relay, verification and optional SDK telemetry: encrypted pairing/session traffic and connection/device metadata                        | Upstream defaults include `relay.walletconnect.org`, `verify.walletconnect.com`, `verify.walletconnect.org`, `pulse.walletconnect.org`, `echo.walletconnect.com`                                                                                  | Project ID is supplied; real pairing/relay access remains unverified. Relay payload encryption does not conceal all transport metadata.                                                                         |
| Firebase install/push registration: installation identifiers, push token, device/app metadata                                                         | Google/Firebase endpoints such as `firebaseinstallations.googleapis.com`, `fcmregistrations.googleapis.com`, `fcm.googleapis.com`                                                                                                                 | Native Firebase configuration is supplied. Upstream firebase.json disables analytics auto-collection and messaging auto-init; later enabled flows may register for push. Actual SDK traffic remains unverified. |
| Browser/DApp traffic, quotes and swaps: visited origin, connection metadata; approved public account and signing requests                             | Visited DApp/provider hosts and subresources; `quickswap.exchange` during the proposed test                                                                                                                                                       | Not executed. DApps/custom networks can introduce arbitrary additional hosts under user action.                                                                                                                 |
| Segment analytics: settings requests; if configured, event/properties, analytics ID, device/app context and consent metadata                          | `cdn-settings.segment.com`, `api.segment.io` (SDK defaults); no proxy supplied                                                                                                                                                                    | See telemetry assessment below.                                                                                                                                                                                 |

### Segment and Sentry

The workflow explicitly injects only the three listed fork service secrets; it does not expose all repository secrets. `builds.yml` main-dev env supplies neither a Segment write key/proxy nor a Sentry DSN. Merely adding another repository secret would not inject it into this workflow.

- **Sentry reporting: not configured / expected inactive for this artifact.** `app/util/sentry/utils.ts:setupSentry` returns before initialization when `MM_SENTRY_DSN` is missing, including the force-enabled path. Sentry SDK code and native libraries are still packaged. `SENTRY_DISABLE_AUTO_UPLOAD=true` controls build symbol/source-map uploads, not runtime reporting. No device trace proves zero Sentry traffic.
- **Segment: retained and initialized, without a configured write key/proxy; do not label it disabled.** `app/core/Engine/wallet-init/instance-options/analytics-controller.ts` instantiates the platform adapter; `platform-adapter.ts` passes the missing key to Segment `createClient`. The upstream SDK `init()` calls `fetchSettings()` against the settings CDN even without a valid write key. Successful authenticated analytics delivery is not established, and attempted requests still expose IP/network metadata. The controller supports consent/category rules and anonymous events; no universal "no analytics until opt-in" claim is made. Runtime verification remains open.

## Three critical advisories — all OPEN

| Locked package    | Advisory                                                                                                | Likely exposure / evidence                                                                                                                       | Published fixed version |
| ----------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| proxy-addr 2.0.7  | npm 1241210 / [GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h), CVE-2026-90711  | Express paths under MCP/docs tooling; zero main-JS source-map matches                                                                            | 2.0.8                   |
| shell-quote 1.9.0 | npm 1241332 / [GHSA-pqg4-j6r4-53mv](https://github.com/advisories/GHSA-pqg4-j6r4-53mv), CVE-2026-102422 | Tooling and a dependency declared under Segment/Sovran; zero main-JS module-path matches; a root-package resolutions string is present in Hermes | 1.11.0                  |
| tar 7.5.18        | npm 1123940 / [GHSA-23hp-3jrh-7fpw](https://github.com/advisories/GHSA-23hp-3jrh-7fpw), CVE-2026-59873  | Node/build/install tooling paths; zero main-JS source-map matches                                                                                | 7.5.19                  |

The 21,348 count is source-map paths, **not packaged files**. The APK contains 3,125 ZIP entries and 175 native .so entries. Package/path marker scans of those native entries and the auxiliary JS assets found no package identifiers for these dependencies; the main bundle contains `shell-quote@npm:1.8.0`, consistent with upstream root package metadata. Marker scans are a heuristic, not code provenance or exploitability proof. No complete native-library SBOM or vulnerable-code reachability analysis was performed. Therefore **we cannot confirm all three are absent from every JS/native component, cannot call all paths proven build-only, and cannot promise testing is unaffected**. Build-chain vulnerabilities also matter even if they are absent at runtime. No fixes or exclusions were applied; 3 critical, 24 high and 22 moderate audit rows remain open for triage.

See PETRO-Preinstall-Static-Evidence.json for file hashes, actual APK permission names, per-library marker results and limitations. Before release, upgrade through compatible dependency paths, review changed upstream files explicitly, regenerate the locked audit/runtime SBOM and rerun build, quality and device/security acceptance.

## Final CI state observation

The latest GitHub job listing reports the APK run android job as completed/failure, while its compile, APK verification and early upload steps are success. Thus the original run is not an overall green CI run; the separate corrected quality run is the completed lint/typecheck/unit PASS evidence. Step-summary snapshots can lag the final job state.
