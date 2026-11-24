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
