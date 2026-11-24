# PetroCASH APK 交付与验证报告

更新：2026-11-24，Asia/Kuching。本次交付为 arm64 开发测试包，真机验收尚未执行。

## 下载与来源

- [未发布草稿及全部产物](https://github.com/dxkon123/metamask-mobile/releases/tag/untagged-884996a415116ae298a2)（需登录有权限的 GitHub 账号）。
- [成功 CI run 45405350978](https://github.com/dxkon123/metamask-mobile/actions/runs/45405350978)，Android job 138484436260，44m55s，只有 Android 构建，已通过的质量检查未重复。
- 分支 codex/petrocash-rebrand；实际构建源码 7df8638619afcb06f6acbe8d09bd7a41fa5bfe36。后续提交仅交付证据和报告。
- APK asset 787495970：PetroCASH-TEST-1.0.0.apk，221124611 bytes。
- APK SHA-256：29fdc0d4dffba2724c263705b0fada9316d18fa30def3773a4e5d7fea40ea9b7。
- CI 源码 ZIP asset 787495941：PetroCASH-source.zip，110214758 bytes；SHA-256 4b575e8f716ad08162dfa884f701eed45e60cb64536a8dbc544b7446ee8bd98b。Mac 本地文件命名 PetroCASH-source-CI-7df86386.zip。

## 实物 APK 独立验证

| 检查 | 结果 |
| --- | --- |
| applicationId / 显示名称 | org.petrocash.wallet / PetroCASH |
| versionName / versionCode | 1.0.0 / 1 |
| ABI / SDK | 仅 arm64-v8a；minSdk24 / targetSdk36 |
| 签名 | Google 官方 apksigner 验证 PASS，v2，RSA2048，1个 signer |
| 证书 SHA-256 | 6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9 |
| 证书性质 | 上游公用 TEST 开发证书；DN 含 MetaMask/Consensys；不是 owner 新私钥或生产签名 |
| 下载完整性 | 本地实际 APK SHA 与 GitHub asset digest、CI metadata 一致 |
| 主入口 | io.metamask.MainActivity 在 DEX 中；内部 namespace 保留，applicationId 已独立 |
| 打包 | JS bundle 存在；44个 arm64 原生库；官方 zipalign 16KB检查 PASS，所有 ELF load segment 满足16KB对齐 |
| 字体 / launcher | Inter 存在，Grotzec 不在包内；从实际 APK 提取前景图，目视确认为 owner 无限箭头 logo |
| 合并权限 | 与已验证的上游基线 APK 比较，归一包名前缀后新增0/减少0 |
| provider / UID | 无 io.metamask 的 provider authority；无 sharedUserId；支持与官方 io.metamask 共存的静态条件成立，尚未手机实装 |
| R8 | 本次显式 dev TEST 关闭，CI核对日志及无mapping；正式构建默认开启 |

这不是只有上游代码的未修改基线。全部差异路径见 CHANGED-PATHS-7df86386.txt（相对 upstream a3251559c8af381b7b9689dd49d3dce8d5f76261，共362条）；文字、图片、字体、主题、动效和品牌兼容代码会进入APK。受保护的钱包/密钥/加密/签名/审批源和原签名域名/public key由CI source guard核对，未修改。

CI 源码 ZIP 核对19471个tracked blob：19470个逐字节一致；android/gradlew.bat按.gitattributes声明的CRLF转换后与Git blob一致，其他差异0。iOS branch-ios-sdk submodule内容不在git archive中，锁定615267ea0b44bc3be657b84fbc9ff7c86688fa58，按.gitmodules另行初始化。源码ZIP不含owner私钥、密码或完整flags快照。

## 检查结果

| 检查 | 真实结果 / 来源 |
| --- | --- |
| 完整4组JS lint / TSC | PASS；45388166315，候选45386233779亦PASS |
| 完整unit 1–10 | PASS；45388166315：5932套、90732断言、111快照，0FAIL；原coverage保留 |
| 相关测试 | PASS；45386233779：62套1643断言，明确runTestsByPath |
| 上游遗漏补全 | PASS；45392919611：两文件229断言，0skip/0todo，scoped ESLint及完整TSC PASS |
| 原有未执行项 | 完整run有10skip+1todo；后续恢复3个遗漏，当前仍7上游skip+1todo，未计为执行通过；补充结果与全量重叠，不简单累加 |
| 原生lint vital / 编译 | 成功run的lintVitalProdRelease及assemble PASS；不称另外完整lintRelease任务已运行 |
| WAL001–007 / POL001–010 | BLOCKED，未做真实配对、真机/链上验收 |
| 手机安装 / 视觉 / 生命周期 / FPS | NOT RUN，按PHONE-CHECKLIST-zh.md由owner执行 |

完整/相关/补充质量源码的运行时代码与本次应用源码一致；后续增加的区别为两处测试修正、dev R8开关、构建public metadata和CI观察性。没有为交付重跑已通过的质量matrix。

## 三项原始 critical 跟踪

本次相同构建的Metro source-map记录21361个源路径，proxy-addr、shell-quote、tar匹配均为0；摘要已保存在artifact-metadata.json，并与实际APK checksum关联。44个原生库清单另附。此为具体包纳入证据，不是完整漏洞利用或设备安全审计。

| 包 / ID | 构建环境现状 | APK运行时 / 待关闭项 |
| --- | --- | --- |
| proxy-addr / [GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) / CVE-2026-90711 | Express工具链已锁2.0.8（官方修复版本） | 本APK graph无该包；生产风险审核跟踪尚未签收 |
| shell-quote / [GHSA-pqg4-j6r4-53mv](https://github.com/advisories/GHSA-pqg4-j6r4-53mv) / CVE-2026-102422 | 工具链及Segment声明已到1.11.0/1.12.0；官方修复1.11.0 | 本APK graph无该包；不能只凭npm dependencies分类判断运行时；生产审核跟踪尚未签收 |
| tar / [GHSA-23hp-3jrh-7fpw](https://github.com/advisories/GHSA-23hp-3jrh-7fpw) / CVE-2026-59873 | 7.x到7.5.19，但cacache18/eas-cli12/node-gyp10仍有6.2.1 | 本APK graph无该包；构建工具旧major仍OPEN，需兼容升级或维护补丁及工具链验证 |

旧audit快照0critical/24high/22moderate不等于所有版本安全，不能宣布三个问题在所有环境关闭。不得将这些构建环境问题描述为已证明存在于本APK的JS/native运行时。

## 数据与发行边界

构建子进程清空Segment key/proxy及Sentry DSN；缺key跳过Segment client，缺DSN保留Sentry guard。实际APK native io.sentry.auto-init=false；SDK/provider本身仍保留。WalletConnect telemetry=false、OTA关闭来自构建配置。没有做手机网络抓包，不能声称零发送：上游RPC、远端flags、余额/报价、Firebase/FCM和按需功能服务仍可能接收IP、安装/连接信息、公开地址或请求的数据。

限定公开源文件URL扫描唯一新增主机为owner的petrocash.org；它用于品牌网站/链接，不是新增第三方SDK。源服务保留不代表全部可用。Firebase只是测试派生包名，真实app/证书注册、OAuth/push/attestation未完成；native1.0.0可能受上游minimumVersion flags门槛影响。自有HTTPS/法律/支持站点仍需部署验证。没有新Android权限或密钥/审批自动绕过。

Mobile LICENSE许可/商用与分发门禁仍未关闭；无public Release。当前文件存于未发布草稿；1天公开Actions artifact后备未触发。首轮仅空测试钱包，保留官方MetaMask，不上传SRP/私钥。下一里程碑：手机反馈→私有仓库→完整flags及剩余品牌/服务身份→功能→获权与生产签名后的发行。
