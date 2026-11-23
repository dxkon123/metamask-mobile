# Security test report

Snapshot: 2026-11-23T21:54:34+08:00. **Production acceptance: BLOCKED.**

The APK source is `08d044320a2d17cc4652165a3629bd00bf896a72` on `codex/petro-wallet-v1`, based on `a3251559c8af381b7b9689dd49d3dce8d5f76261`. Source comparison proves original application/native/dependency files are preserved. It does not prove runtime or security equivalence to an official MetaMask release. Only CI, an evidence helper and two baseline documents are added. No authentication, keyring, signing, permissions, browser, warnings or application feature code was removed or changed.

The APK passed Android build-tools 36.0.0 apksigner verification. Its signer matches upstream's public development certificate SHA-256 `6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9`. Its SHA-256 is `2b745f79ad47c1db97d123aef911db091c85758643a6325a20cd89320ae71322`. Transport hash, APK checksum, package metadata, ZIP CRC and packaged JS/bridge files were checked locally. This is development signing, not production signing. The original manifest's backup restriction and native security configuration are preserved in source; installed-device storage, key generation, export privacy, network destinations, lifecycle and signing/permission isolation still need runtime verification.

The unfiltered locked-tree audit returned 49 advisory rows, including three critical matches. Registry rows can duplicate findings across dependency versions/paths. They are not proof of reachable Android exploitation. No lockfile upgrade or advisory exclusion was used to make the gate pass.

| Package / locked version | IDs                                                                                | Runtime versus build-only assessment                                                  | Published fix / required work                                     | State |
| ------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----- |
| proxy-addr 2.0.7         | 1241210 / [GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) | Build/tooling paths; absent from 21,348 recorded main-JS sources; inferred scope only | Upgrade to 2.0.8, verify transitive constraints and rerun checks  | OPEN  |
| shell-quote 1.9.0        | 1241332 / [GHSA-pqg4-j6r4-53mv](https://github.com/advisories/GHSA-pqg4-j6r4-53mv) | Build/tooling paths; absent from 21,348 recorded main-JS sources; inferred scope only | Upgrade to 1.11.0, verify transitive constraints and rerun checks | OPEN  |
| tar 7.5.18               | 1123940 / [GHSA-23hp-3jrh-7fpw](https://github.com/advisories/GHSA-23hp-3jrh-7fpw) | Build/tooling paths; absent from 21,348 recorded main-JS sources; inferred scope only | Upgrade to 7.5.19, verify transitive constraints and rerun checks | OPEN  |

Fix versions are documented by the linked GitHub maintainer advisories. No fix was applied during this preservation build. Dependency paths and the generated main-bundle source-map inventory support build/tooling classification; auxiliary assets and actual exploitability have not been cleared. Build-chain vulnerabilities remain relevant even when a package is absent from the main runtime bundle. All three remain OPEN.

The source-map inventory records 21,348 paths and no source contents. CI recursively redacts the configured service values from diagnostic text before upload. No wallet was created by the agent, no production wallet imported, no seed/private key requested or recorded, and no real funds were used. The three repository service values were never printed or committed. Client service configuration is embedded by upstream's normal mobile build; service access and appropriate owner restrictions remain separate runtime checks.

Full lint, TypeScript and the corrected ten-shard unit command passed. Automated tests are not a substitute for native wallet/security acceptance. The remaining 24 high and 22 moderate audit rows also require triage. No zero-vulnerability or complete security-equivalence claim is made.

## Pre-install review update — 2026-11-23

The user reports installation failed with conflicting signatures. The APK is unchanged. See [PETRO-Preinstall-Security-Review.md](PETRO-Preinstall-Security-Review.md) for signer/coexistence, telemetry, host and permission findings. The previous suggestion to use a different Android profile is corrected: use a spare device/emulator without the official package in any profile, or wait for a separately authorized distinct package ID. No successful phone install or WAL/POL execution is claimed.

The APK has 3,125 ZIP entries, 175 native .so entries and 21,348 recorded main-JS source paths. These are different inventories. Native package-name marker scans found no matches, but this is not a native SBOM or proof of absence. The main bundle contains the string `shell-quote@npm:1.8.0`, matching upstream root package metadata; its module source-map paths are absent. Do not state that all three packages are proven absent from every APK component or that testing is unaffected.
