# PETRO development APK delivery

Verified Android package produced from the existing MetaMask fork. Phone installation was attempted by the user and failed with conflicting signatures; successful installation remains unverified; all real wallet/Polygon acceptance remains BLOCKED.

| Field                        | Value                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| APK                          | PETRO-SocialFi-Wallet-V1.apk                                                        |
| SHA-256                      | `2b745f79ad47c1db97d123aef911db091c85758643a6325a20cd89320ae71322`                  |
| Version                      | 8.22.0 / 4532                                                                       |
| Application ID               | `io.metamask`                                                                       |
| Minimum / target Android API | 24 / 36                                                                             |
| Architectures                | arm64-v8a, armeabi-v7a, x86, x86_64                                                 |
| Branch                       | `codex/petro-wallet-v1`                                                             |
| Built commit                 | `08d044320a2d17cc4652165a3629bd00bf896a72`                                          |
| APK CI                       | https://github.com/dxkon123/metamask-mobile/actions/runs/45168107679                |
| Artifact                     | `petro-build-diagnostics-08d044320a2d17cc4652165a3629bd00bf896a72` / ID 14818988292 |
| Corrected check commit       | `2a539fd312a16bb325a25d9b8df6b277eb3456cb`                                          |
| Corrected checks             | https://github.com/dxkon123/metamask-mobile/actions/runs/45176887394                |

Lint and TypeScript: PASS. Full units: PASS (5,926 suites; 90,660 passed, 10 skipped, 1 todo, zero failed). Focused checks: PASS (618 unit, six integration, five Android view tests; seven helper checks separately). WAL-001–007 and POL-001–010: BLOCKED. Dependency audit: FAIL; all three critical matches remain OPEN. See the detailed functional/security reports and phone checklist.

The APK/source archive correspond to the built commit. The later check commit changes only CI and documentation. Early snapshot reports are retained unchanged as dated build evidence; current functional results are in PETRO-Functional-Test-Report.md. No default-branch change or production publication was made.

Snapshot: 2026-11-23T21:54:34+08:00.

## Pre-install review update — 2026-11-23

The user reports installation failed with conflicting signatures. The APK is unchanged. See [PETRO-Preinstall-Security-Review.md](PETRO-Preinstall-Security-Review.md) for signer/coexistence, telemetry, host and permission findings. The previous suggestion to use a different Android profile is corrected: use a spare device/emulator without the official package in any profile, or wait for a separately authorized distinct package ID. No successful phone install or WAL/POL execution is claimed.

## Final CI state observation

The latest GitHub job listing reports the APK run android job as completed/failure, while its compile, APK verification and early upload steps are success. Thus the original run is not an overall green CI run; the separate corrected quality run is the completed lint/typecheck/unit PASS evidence. Step-summary snapshots can lag the final job state.
