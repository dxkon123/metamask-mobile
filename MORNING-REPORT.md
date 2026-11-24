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
