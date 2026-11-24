# PetroCASH developer handoff

## 当前权威继续点（2026-11-24 19:58 +08）

旧轮次记录仅是历史。当前APK run45386233779/source ce55e77174ca5128c19c98868a9defe86f47c684，4lint/TSC/62套1643相关断言均PASS，native job138421900226正编译。其private preflight PASS；draft456690358已创建未发布，后续同run直接上传到既有draft，失败后备1天artifact。尚无新APK下载/hash，不可虚报。

完整回归run45388166315/source4354564ab2c279fb6aa5744de07102bc6cde58ac并行中；checkpoint不会第二次编译。应用/原生/依赖树与ce55相同，只有报告和workflow注释变化。下一步：收集全套真实结果；APK保存后独立SHA/apksigner/aapt校验再给链接；无需等AAB。

精确恢复消息：继续。先读PROGRESS当前权威继续点，检查45386233779的APK交付和45388166315的完整回归。不要重做已PASS的探测和相关测试，不要重复启动Android编译。下载真实APK独立验证SHA/包名/签名并交付；全量若失败修真实问题。每步更新三份记录和PLAYBOOK并push，仅codex/petrocash-rebrand，永不main/secret/public Release。

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

## 云端相关检查已启动

run https://github.com/dxkon123/metamask-mobile/actions/runs/45384401830 ，commit01631382a0dfe30022dead0b272624e68971ce26，tree b7fe73d91ccebdbd66211eb9c80a40f70cb8edf2。70文件已完整上传并核对tree hash，本地==origin。Android job按checkpoint明确SKIPPED；15个质量job已开始，unitScope=related。此处只启动检查，未开始1小时native重编译。下一步读所有失败诊断并修复，不跳过。

## 第二轮修正 / 自动构建门槛

45384401830 completed: TSC PASS, lint4 PASS; lint1/2/3分别发现新动效测试namespace import、动效transparent颜色literal、verify.ts引号多余escape，已改成named import、仅用品牌颜色、无多余escape，不关闭规则。相关10分片7PASS，unit3/8/10中4套8断言FAIL：外部pageTitle应保留MetaMask；支持host改为owner地址；Snap快照只更新实际受影响3处primary颜色，不能将原token颜色全局重写。后续本地重测DeepLinkModal13、AccountCreateErrorAdapter7、Snap两套13断言/13快照均PASS。

待推送候选新增native needs:upstream-quality；相关测试、完整lint/type任一失败则不花1小时native。全部成功后自动构建同一触发SHA。native在依赖安装/编译前先创建并小文件验证草稿，避免后续进度push使旧target再失败；仍保留草稿失败→1天APK artifact后备。只读默认token不变，contents:write仍限草稿job。不能把即将运行的检查记作PASS。

## 当前候选运行与待核验限制

候选ce55e77174ca5128c19c98868a9defe86f47c684，tree452c0ba00998eb632cfb497457c24df854b3fe76，run https://github.com/dxkon123/metamask-mobile/actions/runs/45386233779。10个related unit分片全部PASS；完整4lint/TSC尚待最终结果，native按needs门槛等待。此记录先本地保存；原生preflight草稿建立后再push运行记录，避免提前移动远端head影响权限探测。

用于本地复核的Google官方Build Tools36已下载校验，aapt/aapt2/apksigner在Mac可运行。vendor zip SHA25604e7f3a72044de4926fa038fa0e251a37bba1e1c3fb8beab6f8401bfd9eb4bf3，官方repo SHA1 199ae0047ee61e842f8ee0c6d3918e44fb9a1f83；工具仅在workspace work/toolchain，未进App源码或Git。

新增后续核验项：app/util/remoteFeatureFlag/index.ts及app/util/feature-flags/index.ts使用原生getVersion与远端minimumVersion比较。用户指定新native1.0.0，brand的upstreamCompatibilityVersion8.22.0本身并不覆盖这些调用；可能影响受版本门槛控制的功能显隐。没有读取/公开完整snapshot，也没有降低或绕过版本/安全门槛。本轮不据源码保留宣称全部功能可用；迁移私有repo时制定正确的fork版本/flags策略并由设备验收核实。

## 质量门槛与编译前交付预检全部通过

run45386233779 / source ce55e77174ca5128c19c98868a9defe86f47c684：完整4lint PASS、TSC PASS，62套related测试1643断言PASS/0FAIL（10分片，明确不是全量）。native job138421900226已放行；编译前private delivery preflight PASS，已创建未发布draft456690358，target精确ce55，只有preflight.txt，APK尚未生成。后续上传不再创建旧target草稿，已有草稿供同run使用；1天artifact后备仍保留。

下一项：native当前候选保持编译，同时新[checkpoint][full-checks]只启动全量回归，不启动第二次Android编译。新提交只更改workflow注释和报告；app/Android/locales/lockfile与ce55完全一致，相关tree hash见related-validation.json。不要把正在运行的全套检查写PASS。APK一旦保存就下载做本地apksigner/aapt/SHA复核，再提供链接。
