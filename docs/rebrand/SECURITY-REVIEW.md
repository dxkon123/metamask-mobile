# PetroCASH 候选安全复核（非生产批准）

2026-11-24。实际交付source7df8638619afcb06f6acbe8d09bd7a41fa5bfe36，run45405350978；APK SHA25629fdc0d4dffba2724c263705b0fada9316d18fa30def3773a4e5d7fea40ea9b7。独立签名/包名/权限/provider/16KB/字体及源码归档验证均已完成，证据在evidence/verified-apk.json与verified-source.json。证书为公开共享TEST，非owner生产签名；真实手机安装/WAL/POL未验收。

本次差异包含会打包的品牌代码和素材；不能沿用重品牌前“所有改动都不进APK”的结论。全部362条路径见CHANGED-PATHS-7df86386.txt，保护的钱包/密钥/审批代码与原签名host/public key未改。合并权限与原基线归一包名后0新增/0减少，无io.metamask provider authority/sharedUserId。只满足共存的静态条件，未实机安装。

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
