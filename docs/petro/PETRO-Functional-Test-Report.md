# Functional test report

Snapshot: 2026-11-23T21:54:34+08:00. APK source: `08d044320a2d17cc4652165a3629bd00bf896a72`. Full-check source: `2a539fd312a16bb325a25d9b8df6b277eb3456cb`.

**Development APK produced and verified. Physical phone installation and wallet/mainnet acceptance have not been executed.**

| Check                                               | Result             | Evidence                                                                                                                                                            |
| --------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Upstream application/native/dependency preservation | PASS               | Exact base tree comparison; only four added CI/helper/documentation files. No upstream application file modified or deleted.                                        |
| Immutable dependencies and upstream preparation     | PASS               | CI early snapshot logs; unchanged lockfile and upstream allow-scripts/patch preparation.                                                                            |
| Android standalone Release build                    | PASS               | `BUILD SUCCESSFUL in 1h 6m 29s`; 3,399 executed tasks. Original release lint, all four ABIs, Hermes and R8 retained.                                                |
| APK signature and package verification              | PASS               | CI apksigner; expected public development certificate; artifact/APK SHA-256, ZIP CRC, manifest/DEX, JS runtime and original inpage bridge presence checked locally. |
| Full lint, four upstream shards                     | PASS with warnings | All four enforced check jobs succeeded; warnings were not suppressed.                                                                                               |
| Full project TypeScript                             | PASS               | Enforced typecheck job succeeded.                                                                                                                                   |
| Full unit command, ten upstream shards              | PASS               | 5,926 suites; 90,660 passed assertions, 10 skipped, 1 todo, zero failed; 111 snapshots passed. Skipped/todo cases are not passes.                                   |
| Focused upstream unit checks                        | PASS               | 509 original focused tests plus 20 tooling, 87 quote and 2 Snap Registry tests = 618 unit tests. These overlap full-suite coverage and are not added to its total.  |
| Selected network integration                        | PASS               | Six tests across two existing suites; real controller code, mocked I/O.                                                                                             |
| Selected Android component-view checks              | PASS               | Five tests across two existing suites; Engine/native behavior mocked.                                                                                               |
| Evidence-helper checks / scoped TypeScript          | PASS               | Seven helper safety tests, zero failures; scoped tsc exited zero.                                                                                                   |
| Dependency audit                                    | FAIL               | 49 advisory rows: three critical, 24 high, 22 moderate; fixes not applied.                                                                                          |
| Android emulator / physical phone installation      | USER-REPORTED FAIL | Signature conflict with existing io.metamask; no successful installation verified.                                                                                  |
| Complete integration/view/native security coverage  | NOT RUN            | Only the selected suites above were executed.                                                                                                                       |

The first complete unit run at the APK commit had one failing Snap Registry assertion because CI injected `METAMASK_BUILD_TYPE=main` into tests. The CI-only correction clears that test variable, matching upstream unit CI defaults. The two focused tests and the entire ten-shard command then passed. No assertion, controller, APK Main build flag or allowlist protection was changed. Only workflow and build-documentation files differ between the APK and corrected-check commits; application/native/dependency/test sources are identical. Earlier monolithic resource failures remain historical failures, not retroactive passes. Jest emitted forced-exit/teardown warnings; clean asynchronous teardown is not established.

The early CI snapshot was captured before the long checks and labels them NOT RUN. This report and `test-evidence/corrected-unit-report.json` describe their later completed results. The APK run may have an overall failed/pending status from separate checks, the first shard failure or audit findings; that does not change its verified compile/APK outcomes. No production release has been published.

| Acceptance | Result  | Missing evidence                                  |
| ---------- | ------- | ------------------------------------------------- |
| WAL-001    | BLOCKED | No installed-phone acceptance execution recorded. |
| WAL-002    | BLOCKED | No installed-phone acceptance execution recorded. |
| WAL-003    | BLOCKED | No installed-phone acceptance execution recorded. |
| WAL-004    | BLOCKED | No installed-phone acceptance execution recorded. |
| WAL-005    | BLOCKED | No installed-phone acceptance execution recorded. |
| WAL-006    | BLOCKED | No installed-phone acceptance execution recorded. |
| WAL-007    | BLOCKED | No installed-phone acceptance execution recorded. |
| POL-001    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-002    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-003    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-004    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-005    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-006    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-007    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-008    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-009    | BLOCKED | No real Polygon execution/receipt recorded.       |
| POL-010    | BLOCKED | No real Polygon execution/receipt recorded.       |

No fresh wallet, real send/receive, ERC-20 transfer, DApp transaction or QuickSwap swap has been executed by the agent. All funded stages require explicit approval of concrete amounts, recipients/contracts, allowance, slippage and gas. A connected DApp or quote alone cannot pass WAL-007. See PETRO-Android-Phone-Checklist.txt.

APK CI: https://github.com/dxkon123/metamask-mobile/actions/runs/45168107679

Corrected full checks: https://github.com/dxkon123/metamask-mobile/actions/runs/45176887394

## Pre-install review update — 2026-11-23

The user reports installation failed with conflicting signatures. The APK is unchanged. See [PETRO-Preinstall-Security-Review.md](PETRO-Preinstall-Security-Review.md) for signer/coexistence, telemetry, host and permission findings. The previous suggestion to use a different Android profile is corrected: use a spare device/emulator without the official package in any profile, or wait for a separately authorized distinct package ID. No successful phone install or WAL/POL execution is claimed.
