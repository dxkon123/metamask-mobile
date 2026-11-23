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
