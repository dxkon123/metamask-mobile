# Known issues

1. Production release remains BLOCKED by the open audit findings and all WAL/Polygon runtime acceptance. This APK uses the upstream public development signer.
2. Phone/emulator installation, secure key storage, wallet create/import/export, real RPC connectivity, DApp permissions and real transactions were not executed. Use only a new disposable test wallet and the supplied phone checklist. Funded actions need explicit approval.
3. The three critical packages remain locked at vulnerable versions. Their main-JS source-map matches are empty, but build-chain exposure and auxiliary/runtime reachability are not fully cleared. See PETRO-Security-Test-Report.md and PETRO-Dependency-Report.json.
4. The APK commit's first full unit run had one CI-environment failure. CI-only commit `2a539fd312a16bb325a25d9b8df6b277eb3456cb` fixed test environment isolation and all ten shards then passed. Application/native/dependency/test source is identical to the APK commit. See the included correction patch.
5. Lint has upstream warnings; Jest required forced exit and emitted teardown warnings. Ten unit tests are skipped and one is todo. They are not claimed as passing.
6. All three fork service secrets are reported configured; Firebase/Infura format checks passed. Real Infura, Firebase, WalletConnect and other upstream service access remains unverified. OAuth, remote flags, swaps/bridge and other integrations can require additional fork-owned service setup.
7. The package remains `io.metamask` / upstream MetaMask branding. Its development signer cannot replace an official installation signed with another key. Preserve existing wallet data and use a spare device/emulator with no official io.metamask in any profile. Android user/work profiles do not bypass signature checks.
8. Upstream preparation warns that the rpc-errors 7.0.2 patch was applied to 7.0.3. It succeeded, but version-specific behavior still needs review. Build logs also contain upstream R8/Gradle/deprecation warnings.
9. Source archives preserve both case-distinct font files. A case-insensitive macOS checkout collapses those names; no collision-driven source change was committed.

## Pre-install review update — 2026-11-23

The user reports installation failed with conflicting signatures. The APK is unchanged. See [PETRO-Preinstall-Security-Review.md](PETRO-Preinstall-Security-Review.md) for signer/coexistence, telemetry, host and permission findings. The previous suggestion to use a different Android profile is corrected: use a spare device/emulator without the official package in any profile, or wait for a separately authorized distinct package ID. No successful phone install or WAL/POL execution is claimed.
