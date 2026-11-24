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

## M1 CI 已启动 / 2026-11-24 03:36 +08:00

快速构建：[45250643845](https://github.com/dxkon123/metamask-mobile/actions/runs/45250643845)，源码 fe41b953c5f716b3d8c27ed35aba58015223c984。APK 尚未产出。Focused telemetry：34 assertions / 2 suites PASS；35 图尺寸和重复执行确定性 PASS；品牌脚本 scoped TypeScript PASS。Mac 应用 ESLint 达到 4GB heap，标记 BLOCKED/待云端，不是假称 PASS。完整品牌替换与全量检查尚未完成。

## M2 checkpoint / 2026-11-24

先读 docs/PROGRESS.md，旧的M1 next-work段落为历史状态。M1 fe41b953 的CI45250643845已FAIL，没有APK artifact；全量检查/草稿均SKIPPED。job137959034711日志API为404 BlobNotFound，根因尚未确认。
本地WIP将全部checkpoint到codex/petrocash-rebrand：文字/54图/105native图/Inter补丁/三个advisory候选补丁/固定flags/OTA/WCtelemetry/原创插画/owner签名脚本。4套27断言PASS后又增加一项测试，需重跑；audit为0critical/24high/22moderate，完整回归未跑，不称关闭。新key只存在Mac私密目录，CI仍TEST公用签名。
许可证门禁：根Mobile LICENSE仅inspection/study，修改、衍生、分发需ConsenSys prior consent；商用未获授权。owner决定前不公开Release，不公开分发APK/AAB；只允许draft。下一步调整公开Actions artifact，然后继续动画和native修复。
确切恢复消息：继续。先读docs/PROGRESS.md、HANDOFF.md、MORNING-REPORT.md，核对远端与CI，跳过done，从Resume here继续。每步更新记录并push，永不推main，不显示或提交secret，不公开分发APK/AAB。

### M2 checkpoint safety review

Focused复查：4 suites /29 assertions PASS（coverage=false；含本地flags不触发fetch、API/auth凭据必须为空）。发现第三个远程配置认证字段providerFrontendAuth，已清空；原始未净化snapshot从未成功上传。旧本地47fcc9f5不是发布分支parent，绝不可push它；远端checkpoint将从fe41b953以净化后的文件树创建。两个支付选项协议字符串恢复上游，只有支付标题改品牌。压缩盘点通过严格schema检查：8642文本/999媒体记录仅含已跟踪相对路径、正整数与固定标签；无文件正文、绝对路径或凭据。自动审批原先拒绝opaque上传，验证后盘点已获准；flags改明文并去除认证值后再同步。

### Current override: flags publication BLOCKED

自动审批拒绝完整去凭据flags的公开上传（金融/交易/服务配置）。owner选择待答；不绕过。完整snapshot/local fetch/test移出repo保存在work/petrocash-rebrand/blocked-flags；公开分支恢复上游flags fetch及测试，避免缺失JSON和关闭特性。公开checkpoint不包含完整snapshot，旧本地47fcc9f5绝不可push。29项PASS属于含本地未发布flags的WIP；公开候选会重跑对应子集。下一步是完成其余checkpoint推送、调整私密draft交付、查native失败，并修正文案生成器不得修改paymentOptions/test IDs等协议值。

公开候选 focused：3 suites / 25 assertions PASS（不含被暂存于本地的flags实现）；原始JSON见docs/rebrand/evidence/m2-public-focused-tests.json。

### Pushed checkpoint / owner Option 1

M2 pushed: ce880256a728f3defa063781787870f3c2e9ac13 (234 paths, full snapshot/local-fetch withheld); tree 3eb7f858c5beb15a474203eb6ccd0648dafcc1f4. Local matches origin. Full flags never enter public Git. Owner chose Option 1: publish only 38 name-to-boolean switches in brand/feature-flags.minimal.json; no endpoints/keys/financial config. Runtime retains upstream fetch and complex/version/security configuration. Add full flags after moving to a private repo. Next: draft-only delivery and native failure diagnosis.

## M3 build correction / source ready

Owner Option 1 commit: b55c4a1f83084e0fc1fa6d811d209eb8e2974bb6 (minimal booleans + exact checkpoint records).
M1 failure confirmed in GitHub UI: "The hosted runner lost communication with the server" during Metro, not a captured compiler diagnostic. Logs API is 404; screenshot saved in outputs/PetroCASH/CI-M1-runner-error.png. Resource pressure is a hypothesis, not proven root cause.
Changes: opt-in PETROCASH_PREBUNDLE_FIRST serializes Metro/Hermes before native tasks and releases their processes; same upstream heaps, ABIs, security checks and release tasks. Compile step 240 min, job 360 min. Native APK/AAB no longer use public Actions artifacts; publish-draft.sh uploads to unpublished per-run/per-commit draft and refuses any published release. APK goes first. Only the native job requests contents:write, GH_TOKEN is scoped to draft-upload steps, checkout credentials are not persisted. Quality evidence remains separate; no APK/AAB in those paths.
Checks PASS: bash syntax; scoped script TypeScript with allowImportingTsExtensions (matches root config); source permission/protected-file guard; workflow structure (private native uploads, APK-first, ten unit shards); three mocked gh CLI boundary cases (new draft, existing draft, reject published release). These are not native-install or real-upload proof.
Next: push this build correction and record new CI run. While native runs, review generator protocol/test ID exclusions and continue original animations. Full quality pending; WAL/POL blocked; public release/distribution remains forbidden.

## M4 安全边界复审（2026-11-24）

已恢复 26 个被过宽文案替换影响的技术文件，包括 confirmation origin、QR sync、测试 ID、真实代币名称、嵌入 WebView 代码；Portfolio 保留上游真实 host/id，只改显示名。此前 ce880256/325b8e41 是未验收 checkpoint，不能作为安装候选。文案生成器现在只处理明确的显示属性与 JSX 文本，排除测试、服务、provider、hooks、constants、生成代码；新增 origin/QR/WebView 等源码保护。5 suites /119 assertions PASS（含 WC 69 项，明确期望 telemetryEnabled=false）；使用上游相同的 forceExit，未证明异步句柄清理。159 张图（105 native+54 app）均按原尺寸验证 PASS。完整 lint/TSC/单元分片和设备验收仍待 CI。

当前远端构建修正为325b8e4178786f9fc05107f599fc4ca4e555e604，接口 ref 更新尚未产生新的 Actions run。下一步：提交 M4 复审修正、手动 dispatch PetroCASH Rebrand 的 codex/petrocash-rebrand，记录实际 run ID；等待期间继续原创动画与完整品牌审查。公开二进制分发禁止，draft only。完整 flags 仅本地；公开最小38布尔开关只是参考，运行时保留上游复杂配置加载。迁移私有仓库后再加入完整 flags。
