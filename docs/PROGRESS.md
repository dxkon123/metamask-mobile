# PetroCASH 进度 / continuation checklist

更新：2026-11-24，Asia/Kuching。分支 codex/petrocash-rebrand；禁止向 main 推送。
每项开始先读本文件，跳过 done；每完成子步骤更新本文件、HANDOFF.md、MORNING-REPORT.md，然后 commit/push。约 30 分钟内保存一次，长 CI 等待前先 push。

M1 = fe41b953c5f716b3d8c27ed35aba58015223c984。M2 = ce880256a728f3defa063781787870f3c2e9ac13; baseline c51abcebdb3ddc67de1e78bdcf8a44f225495240; upstream a3251559c8af381b7b9689dd49d3dce8d5f76261.

| 项目 | 状态 | 提交 / 证据 | CI run | 下个具体动作 |
| --- | --- | --- | --- | --- |
| SSOT / 用户原 logo | done | M1; brand/brand.config.json; 原图673×673 | 45250643845 | 后续从配置派生 |
| 文字/素材盘点 | done 初扫 | M2; docs/rebrand/inventory.md/json.gz; 8642文本/999媒体 | 无 | 最终扫描排除生成报告自身；记录保留原因 |
| 快速包名/版本/Android图标 | done 源码 | M1; org.petrocash.wallet;1.0.0/1;35图原尺寸 | 45250643845 FAIL | 找编译原因并重建；没有APK artifact |
| 全局用户可见文字 | in progress | M2;23语言与选定UI literal | 未运行 | 审查误改协议/代币名字；补模板字符串与余项 |
| 图片替换 | in progress | M2;54应用路径/105原尺寸native图 | 未运行 | 扩展尺寸/确定性验证、剩余图目视、保存生成prompt |
| 字体 | in progress | M2;Inter许可/设计系统patch/Grotzec打包排除 | 未运行 | APK检查无Grotzec；设备排版检查 |
| 原创动画 / Rive切换 | todo | Rive原代码仍在 | 未运行 | 本地原创动效，reduce motion/硬件/网络降级；保留生命周期 |
| dApp身份/链接 | in progress | M2;EIP6963/WC/UA/Android scheme与host | 未运行 | 协议兼容、链接与法律页验证 |
| 固定flags/OTA/telemetry | in progress | M2;完整flags仅本地（自动审批拒绝公开）；上游fetch保留；OTA关/WC telemetry false | 未运行 | 等owner决定flags存储；继续WC测试与egress检查 |
| Firebase测试派生 | done 源码 | M1;build-android.ts仅子进程env | 45250643845 FAIL | native启动验证；生产需真实Firebase app |
| 签名 | in progress | M2;私钥仅Mac外部目录;CI仍TEST公开key | M1未产包 | 接入可选signing secrets；绝不读回/提交钥匙密码 |
| 三个critical补丁 | in progress | M2;proxy-addr2.0.8/shell-quote1.11.0/tar7.5.19;审计0critical/24high/22moderate | 未运行 | 全回归与可达性证据；不是生产批准 |
| 商店素材 | in progress | M2;icon512/feature graphic1024×500 | 无 | 描述与data safety草稿；不上架 |
| focused测试 | in progress | M1:2套34断言PASS;M2:4套29断言PASS（含无网络与凭据空值检查） | M1 source guards PASS | 运行脚本types与WC测试；不重跑Mac内存不足ESLint |
| lint/TSC/10单元分片 | todo | 旧基线PASS不能覆盖rebrand | M1 SKIPPED | 候选提交[full-checks]运行并记录各job |
| 安装/生命周期/网络 | todo | 无新APK，无设备证据 | M1 FAIL/no artifacts | 私密交付校验APK；模拟器/手机清单 |
| WAL/POL验收 | blocked | WAL001–007/POL001–010均未执行 | 无 | native与服务依赖；有资金交易需具体授权 |
| 发布/交付隐私 | blocked公开发布 | 最新指令仅draft，无公开APK/AAB | M1 draft SKIPPED | 下次native前移除公开明文artifact，改private draft交付 |
| 许可证上线门禁 | blocked | 根LICENSE仅inspection/study；修改/衍生/分发需prior consent | 无 | owner解决授权；不得公开Release/分发 |
| 中文PLAYBOOK | done 初版 | M1;docs/PLAYBOOK-zh.md含MASTER/RESUME | 无 | 持续补真实坑与法律/安全事项 |
| 交接/报告/源码交付 | in progress | M1/M2 | 45250643845 | 补确切SHA、失败原因、下一项与最终源码zip |

## 构建与安全

工作流 .github/workflows/petrocash-rebrand.yml / PetroCASH Rebrand。必需secret名称：GOOGLE_SERVICES_B64_ANDROID、MM_INFURA_PROJECT_ID、WALLET_CONNECT_PROJECT_ID。可选签名：PETROCASH_KEYSTORE_B64、PETROCASH_KEYSTORE_PASSWORD、PETROCASH_KEY_ALIAS、PETROCASH_KEY_PASSWORD。只记录名称，绝无值。
不改密钥管理、助记词、vault/加密、交易签名和审批，不加权限或第三方分享。保留源码不等于通过功能验收。没有证据不称无bug。
Mobile LICENSE只授予inspection/study，并明确限制未经同意修改、衍生与分发；不能据此商用。owner决定前不公开Release，不公开分发APK/AAB；draft only。保留版权。
本地新证书SHA256（公开信息）：efa70c6c8825a6bd268bbbfc43c69c90df9b0349227bf5b9496b03154963869f。该证书尚未签署CI产物。

## Resume here

1. 保存全部WIP到新分支，补M2确切SHA。
2. 45250643845/job137959034711失败，无artifact；logs API返回404 BlobNotFound，需检查job annotations或新运行保留诊断。
3. 修正私密交付方式；检查CI失败；修正文字生成器保护支付协议/test IDs；继续动画和全套验证。

精确继续消息：继续。先读 docs/PROGRESS.md、HANDOFF.md、MORNING-REPORT.md，核对分支/远端/CI，跳过done，从Resume here下一项继续。每完成一步更新三份记录并push。禁止公开分发APK/AAB、向main推送、显示或提交secrets。

## Automatic approval block: full flags snapshot

完整去凭据snapshot的公开上传仍被自动审批拒绝：含金融/交易/服务配置，需要owner明确授权或私有存储。没有绕过拒绝。完整snapshot、local-fetch实现和测试暂存在本机workspace的work/petrocash-rebrand/blocked-flags；不属于公开分支。公开源码恢复上游fetch工厂及其测试，保留上游特性加载方式，不发布缺失JSON的不可构建源码。OTA/WC telemetry等独立开关保留。owner问题已发出，其他工作继续。旧本地47fcc9f5含未净化snapshot，不可推送；公开checkpoint从fe41直接创建。

公开候选 focused：3 suites / 25 assertions PASS（不含被暂存于本地的flags实现）；原始JSON见docs/rebrand/evidence/m2-public-focused-tests.json。

## Owner Option 1 / exact checkpoint

- done: M2 pushed ce880256a728f3defa063781787870f3c2e9ac13; tree 3eb7f858c5beb15a474203eb6ccd0648dafcc1f4. All approved WIP is on codex/petrocash-rebrand; full flags/local fetch are withheld. No main push.
- done (source): brand/feature-flags.minimal.json contains 38 top-level boolean switches only, no endpoints, keys, auth values or financial config. Runtime keeps upstream fetch and complex/version/security configuration. The minimal file is a reviewable build reference; object flags were not flattened into booleans.
- todo: **add full flags after moving to a private repo**. Full snapshot stays local, never in the public repository; remove all credentials before any later private integration.
- next: private draft-only binary delivery; inspect failed CI; protect paymentOptions/test IDs in text generator; continue animations and full verification.

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

## Delivery probe PASS / 交付修复已验证

Probe https://github.com/dxkon123/metamask-mobile/actions/runs/45382420486, commit 412735fce724678c203c36d70103721ffb30dfa6, job 138404578642: draft create/upload/download byte comparison/cleanup ALL PASS. Authenticated release listing afterwards is empty (temporary draft removed). One-day tiny artifact upload PASS, artifact14914851383, expires2026-11-25T11:15:28Z. This real test supersedes the earlier assumption that every feature-branch target necessarily fails. Observed difference: failed run built/targeted older 1c35 while triggered by f3cf; successful probe targets its own trigger/head SHA. Old-target/workflow authorization is the supported diagnosis; do not claim it was missing Contents:write.

Delivery correction: remove old-source override; both native and quality checkout the triggering SHA. publish-draft refuses source/workflow mismatch. Draft upload has 5-minute timeout and continue-on-error. If it fails after APK verification, upload only APK + public signature/identity/checksum metadata as a retention-days:1 artifact BEFORE AAB. Final native gate requires both verified APK and at least one retained delivery channel. No production keys, service values or raw build logs are in that artifact. The next code candidate can rebuild only after relevant tests and true lint/type errors are fixed; this checkpoint does not start native compilation.
