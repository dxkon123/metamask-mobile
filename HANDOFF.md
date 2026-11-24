# PetroCASH developer handoff

2026-11-24 Asia/Kuching。先读 docs/PROGRESS.md 当前继续点，旧历史已在Git保留。只用 codex/petrocash-rebrand，禁止main。目标PetroCASH/org.petrocash.wallet/1.0.0(1)；内部MetaMask类/包/协议、原功能、版权保留。

## Current state

- 原生run45367200108 source1c35f1f5 APK编译/签名/包名/JS bundle验证PASS，产物未保存，不能下载。草稿创建403；不是少Contents:write，日志已证明write生效。
- 真实小探测45382420486/commit412735fc：以自身触发SHA创建草稿、上传小文件、下载逐字节比较、删除草稿PASS；1天artifact也PASS。修复60f1f870已push：build/checkout/release同一SHA；publish脚本拒绝源码和workflow SHA不一致；草稿失败在AAB之前保存1天APK artifact。owner明确授权此临时公开后备，仍禁止public Release。
- 正在准备下一轮 [checkpoint] [related-checks]，native应跳过。全部4 lint+TSC仍跑；Jest --runTestsByPath docs/rebrand/related-tests.json全部62套（54失败+8新增/品牌合约），不标作全量。旧完整5929套有54FAIL/123失败断言。
- 已恢复AppConstants原签名域名，verifySignature本体不改；纯petrocash://别名送入原router，HTTPS域名不映射。两条真正lint错误已修；支持URL恢复原UTM/query约定；只改可见文案/字体断言和6个主题色快照值，保留实际token/API/protocol fixture。
- 三处狐狸装饰有本地BrandMotion替代，原Rive代码可通过brand.config animationMode=rive切回。保留原frame/safe bottom/stop接口，无解锁或完成回调。静态reduce-motion/offline，轻量LOW/slowcell，未知网络product-default，后台暂停。本地4套40断言PASS，云端/真机未验证。

## Build and delivery

Workflow .github/workflows/petrocash-rebrand.yml；probe .github/workflows/petrocash-delivery-probe.yml。Node/Yarn固定版本见.nvmrc/packageManager；Java17/SDK36/NDK27.1/CMake3.22.1，4ABI/Hermes/R8/native release lint保留。360分钟native job/240分钟compile；APK先保存，AAB后跑。测试只用Yarn，相关命令 yarn jest --runTestsByPath ... --coverage=false（调试阶段避免全仓coverage收集，不代表跳过测试）；full检查原coverage路径保留。

必需secret名称：GOOGLE_SERVICES_B64_ANDROID、MM_INFURA_PROJECT_ID、WALLET_CONNECT_PROJECT_ID。可选未来签名名称：PETROCASH_KEYSTORE_B64、PETROCASH_KEYSTORE_PASSWORD、PETROCASH_KEY_ALIAS、PETROCASH_KEY_PASSWORD。绝不读取到chat、输出或提交值。CI仍TEST公用证书SHA256 6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9。owner私钥在Mac外部目录，未用于CI。

## Boundaries / open gates

无keyring、助记词、vault、加密、签名或审批逻辑修改；不增加Android权限。签名常量与verifySignature有source guard。保留服务/特性源码不代表实际可用。Firebase仅测试派生包名，push/attestation/OAuth尚未注册新身份。上游复杂flags fetch保持，公开只38布尔参考；full snapshot仅本地work/petrocash-rebrand/blocked-flags，add full flags after moving to a private repo。旧本地47fcc9f5禁止push。

3 critical候选升级proxy-addr2.0.8/GHSA-jqcg-44mw-7w3h，shell-quote1.11.0/GHSA-pqg4-j6r4-53mv，tar7.5.19/GHSA-23hp-3jrh-7fpw。安装audit0critical/24high/22moderate，未完成回归/新APK可达性，不称生产关闭。WAL001–007/POL001–010全BLOCKED，无真机配对或链上证据，无资金交易授权。

Mobile LICENSE只inspection/study，修改/衍生/分发需prior consent，商用未获授权。无public Release，只有owner当前明确允许的一天artifact后备例外。当前里程碑：相关检查→可靠APK交付→手机测试→私有仓库→完成品牌/素材与自有服务身份→功能→获权后的发行。

## Test layer placement

纯别名/能力矩阵用unit；BrandMotion/ref/safe-area为窄组件合约，延续原unit不虚构screen E2E。真实Rive、FPS、系统深链、安装、后台/kill、网络发送和安全存储只能由native device边界验证；测试不会自动转账或签名。最终看PROGRESS中的下一具体动作，不把旧基线质量PASS算本次PASS。

本地新增验证：签名验证/路由与保留Rive接口5套116断言PASS，加品牌4套40断言共9套156PASS（明确runTestsByPath，coverage=false用于调试，forceExit沿用上游；不声称异步句柄已修）。下一步push [checkpoint] [related-checks]，等待62套相关+全lint/type真实结果。
