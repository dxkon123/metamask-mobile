# PetroCASH 候选安全复核（非生产批准）

日期：2026-11-24。APK源提交 ce55e77174ca5128c19c98868a9defe86f47c684；原生 run45386233779。本文写入时APK仍编译中，不能确认新APK的hash、merged manifest或模块排除。

## 三项原始 critical：保留 open 门禁

| 包 / ID | 官方修复版本 | 当前锁定版本与用途证据 | 当前结论 / 下一动作 |
| --- | --- | --- | --- |
| proxy-addr / GHSA-jqcg-44mw-7w3h / CVE-2026-90711 | 2.0.8 | yarn why: Express4.22.2/5.2.1→2.0.8，开发服务器链 | patched candidate；新APK JS排除与完整回归证据完成前不称生产关闭 |
| shell-quote / GHSA-pqg4-j6r4-53mv / CVE-2026-102422 | 1.11.0 | 1.11.0及1.12.0；Appium/launch-editor/npm-run-all/react-devtools等工具链；Segment sovran也在dependencies声明1.8.0，被resolution升到1.11.0，已安装包src/lib未发现导入 | patched candidate；不能仅凭npm dev/runtime分类判定打包排除，需新Metro source-map证据 |
| tar / GHSA-23hp-3jrh-7fpw / CVE-2026-59873 | 7.5.19 | foundryup/cacache19/node-gyp11→7.5.19；**cacache18/eas-cli12/node-gyp10仍→6.2.1**，属于开发/原生构建工具 | **尚未覆盖全部版本**。官方受影响范围<=7.5.18，旧audit未报告不能证明6.x安全；后续需兼容升级或受维护回移补丁并验证工具链，不盲目跨major override |

以上官方页面于本日复核：[proxy-addr](https://github.com/advisories/GHSA-jqcg-44mw-7w3h)、[shell-quote](https://github.com/advisories/GHSA-pqg4-j6r4-53mv)、[tar](https://github.com/advisories/GHSA-23hp-3jrh-7fpw)。npm audit的日期快照记录0 critical/24 high/22 moderate，不表示无其他风险，也不替代实际版本范围和可达性分析。不得沿用旧io.metamask基线的bundle排除结论到这个新APK。

原生工作流生成build/petro/reports/bundled-modules.json，但当前上传白名单不含该文件。日志中的sourceCount本身不能证明三个包不存在。新APK中JS/native检查的能力边界必须如实记录；不靠字符串未命中声称绝对排除。后续CI可将无sourceContents/无配置值的source-map路径摘要保存到private draft。

## 身份、权限与数据

- 新applicationId org.petrocash.wallet；内部namespace io.metamask保留。源Manifest的FileProvider authority为${applicationId}.provider，无sharedUserId声明。源权限与上游相同；最终需对比两份APK merged permissions/provider authorities。不同applicationId应能与官方io.metamask共存，实际手机安装尚未执行，不能承诺任何profile都已验证。
- 当前是重品牌衍生代码，不能再声称“只有上游代码、改动都不打包”。文字、图片、字体、主题、动效、包名及少量纯显示/路由兼容改动会进入APK。受保护的钱包/密钥/签名/审批文件由source guard保持原样。
- changed public source中的字面URL主机集合比较，唯一新增主机为petrocash.org；这只是限定静态扫描，不是抓包。自有法律页/支持页/链接尚待部署验证，上游网络/RPC/报价/远端flags服务保留。不得声称没有网络发送；钱包地址、IP/设备连接信息及按功能请求的交易/余额数据可能经相应上游服务发送。
- 构建子进程清空Segment key/proxy及Sentry DSN；无key guard阻止Segment client创建，无DSN沿用Sentry guard；WalletConnect telemetry=false，OTA关闭。SDK仍在依赖里；未做设备抓包，不能把禁用配置写成所有网络流量已验证。
- CI预计使用上游公用TEST证书6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9，必须以下载APK的apksigner结果最终确认。不是owner私钥，也不是生产签名；仅空测试钱包。用户本地private key/密码和完整flags从未加入源码ZIP。

## 仍待设备/发行验收

WAL001–007、POL001–010仍BLOCKED。Firebase测试派生身份、OAuth/push/attestation、1.0.0原生版本与上游minimumVersion flags匹配、自有HTTPS绑定、全部媒体目视、生产签名和Mobile LICENSE许可均未关闭。完整单测即使通过也不等于这些真实边界通过。
