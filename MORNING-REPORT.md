# PetroCASH 早晨报告

更新时间：2026-11-24（Asia/Kuching）。里程碑 M1：快速验证版准备中。

- 工作分支：[codex/petrocash-rebrand](https://github.com/dxkon123/metamask-mobile/tree/codex/petrocash-rebrand)。从 c51abceb（旧基线分支）建立；没有向 main 推送。
- 已保留你提供的 673×673 透明无限循环箭头 logo；35 张 Android 启动/通知/自适应图标按原尺寸生成。
- 目标：PetroCASH、org.petrocash.wallet、1.0.0 / 1，与官方 io.metamask 使用不同包名。
- 已增加无 owner key 时不创建 Segment 客户端的开关；Sentry 未配置 DSN。Focused telemetry 测试 PASS（2 suites / 34 assertions，原始 JSON 将入库）；35 图尺寸与重复执行确定性检查 PASS。
- 快速 APK：**待 CI 产出**，旧版 io.metamask APK 不是 PetroCASH。工作流：`.github/workflows/petrocash-rebrand.yml` / PetroCASH Rebrand。
- APK/AAB 当前使用公开上游开发证书，必须标记 TEST；不是生产签名。新的本地钥匙及 GitHub signing secrets 尚未完成。
- Firebase 为现有配置派生包名的测试方案；没有注册新 Firebase app，不保证 push、attestation 或 OAuth 可用。不会提交生成配置。
- 完整替换、动画、固定 feature flags、漏洞修复、全套检查、手机/模拟器验证和草稿 release：待后续里程碑。
- 发布阻塞：此提交 Mobile LICENSE 并非“一万月活”许可；需权利人确认商业/分发授权。Grotzec 字体为受限字体，需替换。三项 critical 及 WAL/POL 仍开放。

## 你醒来后

当前无需操作。APK 准备好后，本文件会补充 CI/artifact/release 链接、SHA-256、真实测试结果与安装步骤。仅用新建的临时测试钱包；不要导入有资产的钱包，不要卸载官方钱包。

## 继续用的消息

“读取 codex/petrocash-rebrand 的 HANDOFF.md、MORNING-REPORT.md 和 docs/DECISIONS.md，核对远端与 CI 后继续未完成项。保持所有钱包安全逻辑，记录真实结果，不把 TEST 版当生产版。”

学习文档：[PLAYBOOK-zh.md](docs/PLAYBOOK-zh.md)。

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

## Current build blocker / M4 pushed

M4 public candidate: 1c35f1f55c03f2b3c089336de99739681a9bf600; exact tree eae9a3799b61bbe94507497ccc93489c4569419a; local == origin. All 54 reviewed files are present (verify manifest entry counts as well as tree SHA; large terminal JSON can be truncated). 5 suites/119 assertions, 159 image dimensions, two-run text idempotence and scoped script types PASS. No new APK yet.
GitHub UI shows fork workflows disabled. Automatic approval rejected the repository-wide re-enable action because it could activate scheduled/main-targeting write/distribution workflows. Owner was asked to authorize re-enable plus disabling unrelated upstream scheduled publication/sync jobs, or manually re-enable and reply ready. Do not bypass. Screenshot: outputs/PetroCASH/Actions-disabled.png. No setting was changed. Continue independent original animations/docs meanwhile.
Next concrete action: on owner reply, safely restore build access within approved scope and run only codex/petrocash-rebrand; record run ID and actual source SHA. Original Rive fox animations remain TODO; do not claim complete rebranding/installation.

## Actions restored / candidate retry (2026-11-24)

Owner explicitly authorized repository Actions re-enable, disabling all unrelated workflows, read-only default GITHUB_TOKEN, and running candidate 1c35f1f5. Actions Enabled was verified in the authenticated GitHub UI. All three other registered workflows were disabled manually and their Disabled state was verified:

| Workflow | Path | Verified state |
| --- | --- | --- |
| Create release bug report issue when release branch gets created | .github/workflows/create-bug-report.yml | disabled manually |
| Merge Previous Release Branches | .github/workflows/merge-previous-release-branches.yml | disabled manually |
| PETRO Wallet Baseline | .github/workflows/petro-wallet-baseline.yml | disabled manually; not needed |

Only registered PetroCASH Rebrand remains enabled. The Actions sidebar exposes four registered workflows total; the other upstream YAML source files are retained, not deleted. A direct check of nightly-build.yml returned “This workflow does not exist”; these unregistered files must not be described as manually disabled. Re-audit workflow registration after any upstream sync/new workflow event. This is a current registry observation, not a permanent guarantee against future registration.

Default repository Workflow permissions already selected “Read repository contents and packages permissions”; “Allow GitHub Actions to create and approve pull requests” is unchecked. Verified, no need to broaden it. In the enabled PetroCASH workflow, only the Android job grants contents:write for unpublished draft upload; quality jobs inherit contents:read. Other disabled upstream source YAML permission declarations remain preserved and inactive in the current registry.

The workflow UI offers no Run workflow button (feature-branch workflow absent on main). Updating the ref to the same SHA created no run. A branch-only CI retry commit therefore selects the exact reviewed source 1c35f1f55c03f2b3c089336de99739681a9bf600 when its message contains [candidate-1c35f1f5]. Both native and quality checkout that exact SHA. Actual artifact metadata, draft target and quality result record the checked-out source SHA; workflow trigger SHA is recorded separately. No app code changes in this retry; no main changes; future ordinary pushes build their own source.

Run status: retry source prepared; actual new run ID pending verification. Next: push this CI/docs checkpoint, verify source SHA in new run, save run ID here, then continue original animations while native compilation runs. No new APK exists yet. Full flags remain local only; add full flags after moving to a private repo.

## Verified retry run / 当前继续点

CI https://github.com/dxkon123/metamask-mobile/actions/runs/45367200108 is IN PROGRESS (not yet passed). Workflow commit f3cf097073af4f3344e71334dd7c0aaa5ea64ddf; selected build/test source 1c35f1f55c03f2b3c089336de99739681a9bf600. Native job 138351904223 and all 15 quality jobs are registered and started. Screenshot CI-candidate-started.png is in local outputs/PetroCASH. Verify actual checkout log and artifact source metadata before claiming provenance. No APK yet.

Continue from here: monitor this run; do not restart M1. During native work, implement original local PetroCASH animations with preserved Rive switch, hardware/network/reduce-motion fallbacks and unchanged business lifecycle. Next final verification must target the later animation commit, not claim this earlier candidate covers it. WAL/POL remain BLOCKED, licence launch blocker and draft-only binary delivery remain in force. The current Actions settings subsection supersedes older disabled/pending-owner notes above.

## 2026-11-24 resume: delivery failure identified

Run 45367200108 source 1c35f1f55c03f2b3c089336de99739681a9bf600 compiled successfully (step 1h03m46s), passed Android release lint and APK signature/identity/bundle validation. Signer SHA256 6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9 (public TEST certificate). APK was not retained: draft creation returned HTTP403 Resource not accessible by integration; AAB/source delivery skipped. Do not claim a downloadable APK or a known APK checksum from this run.

Token setup log confirms Contents:write. GitHub's current Create a release documentation explains that a target whose .github/workflows differs from the default branch additionally requires Workflows:write, unavailable to GITHUB_TOKEN. Source: https://docs.github.com/en/rest/releases/releases#create-a-release . No main push, PAT request or permission broadening is needed: owner now explicitly permits a public workflow artifact with retention-days:1 if private draft still fails. This supersedes the earlier draft-only restriction only for this short-lived APK fallback; no public Release is authorized.

Next: run PetroCASH Delivery Probe (.github/workflows/petrocash-delivery-probe.yml) with only harmless tiny text, same scoped token, exact branch target; attempt draft upload/download/cleanup; independently upload a one-day tiny artifact. No native rebuild before the result. Probe commit uses [checkpoint] so native job skips. When working, place APK fallback immediately after verification and before draft/AAB; ensure upload failure cannot strand a verified APK again.

Quality triage confirmed: lint3 apply-text.ts no-useless-escape; lint4 Brand/text.ts no-control-regex; TSC verifySignature.ts TS1117 because AppConstants production/test signed-link host values were both rebranded to the same domain. Preserve upstream signature implementation and distinct signed-link constants; do not weaken verification. Unit logs include genuine stale branded-copy expectations; gather every failed suite and use yarn jest --runTestsByPath (not yarn test:unit plus paths). Full regression remains failed until rerun evidence.

Local original-motion work from the interrupted turn is still WIP and not in this built candidate. A focused attempt hit non-configurable Reanimated spy exports, then heap exhaustion; test mock was corrected locally but not rerun. Save/review it separately; do not silently include unverified animation changes in a delivery-only rebuild. Full flags stay local; add full flags after moving to a private repo.
