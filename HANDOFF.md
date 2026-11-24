# PetroCASH developer handoff

## Owner批准并行恢复构建（2026-11-24 21:36 +08；优先于此前“只等待”）

保留45386233779，同时新[android-recovery]仅android、不重跑已PASS的质量检查；arm64-v8a，dev TEST关闭R8，正式默认保持R8。job加入显式早期磁盘清理、构建前16GB swap与5分钟stdout资源心跳。完整源码/锁文件/原生脚本相同但本轮过长且12:52:08Z后无输出，资源卡住仅为待证假设；heartbeat用于区分耗时与停滞。两轮哪个先保存并验证APK就用哪个，之后取消另一轮。新模式跳过AAB，APK优先；包名/签名/身份检查及1天后备保留。

本地验证：workflow YAML+29段bash -n PASS；metadata4个fixture（合法arm64、拒绝额外ABI、拒绝错包名、默认R8 metadata）PASS。未重复Jest/TSC/lint；仅构建配置和public metadata变更，无app运行时/密钥/审批修改。new metadata保存同build的module count/3包匹配摘要（不含sourceContents或全量sources），解决原报告只留runner的问题。最终仍需实际APK验证。

2026-11-24 20:30 +08。先读docs/PROGRESS.md。只用codex/petrocash-rebrand，禁止main。目标org.petrocash.wallet/1.0.0(code1)，内部io.metamask namespace、RN注册名/协议和原功能保留。

## 当前状态与下一动作

- **APK正在编译**：run45386233779/source ce55e77174ca5128c19c98868a9defe86f47c684，native138421900226。4lint/TSC/62相关套1643断言PASS；private delivery preflight PASS，draft456690358仅preflight.txt，未发布。不要重复启动原生编译。APK出现后先下载，独立SHA256/apksigner/aapt/orgID/版本/签名/权限/bundle复核，再给真实链接；不等AAB。草稿失败自动1天artifact后备。
- **完整回归PASS**：run45388166315/source4354564ab2c279fb6aa5744de07102bc6cde58ac，4lint/TSC、10全量unit、5932套90732断言111快照PASS/0FAIL；10上游skip+1todo另列，不算PASS。其runtime/dependency树与ce55一致。
- **补全3遗漏PASS**：run45392919611/source15d21f0b58cb4a165214a0bebc56b957fae02cf2。移除原Bridge测试it.only，BigNumber原skip改fresh-module-registry全配置非污染断言；2文件229断言0skip/0todo，scoped ESLint+完整TSC云端PASS。不改生产数字/财务代码。其余7上游skip/1todo保留，见PROGRESS。只在app下改2个测试文件，APK运行时无后续改变。
- 源码ZIP/手机清单已在outputs/PetroCASH，精确ce55 ZIP SHA256 e33ed1647df8dc571cb1296caa54523e099d915a91ce1fce613c95de933a6742，19466 blobs；不含iOS submodule内容，README已说明。不是最新测试记录的替代，当前branch有后续证据。

## 如何构建与测试

PetroCASH Rebrand workflow .github/workflows/petrocash-rebrand.yml，分支push构建自身SHA；[related-checks]跑62套路径+全lint/TSC并gate native；[checkpoint][full-checks]只跑全量，无第二次Android；[checkpoint][test-completion]只跑两测试修正/ESLint/TSC。小探测petrocash-delivery-probe.yml用于创建/上传/下载比较/删除临时草稿，45382420486已PASS，勿无故重做。

Node24.22.1/Yarn4.14.1/Java17/SDK36/NDK27.1/CMake3.22.1；只用Yarn。相关单测明确yarn jest --runTestsByPath ... --coverage=false；yarn test:unit本已带全仓路径，追加文件不能缩范围。全量保留原coverage，10分片。Mac typed lint两个文件也可能4GB heap OOM；云端资源足够已PASS，不反复本地加压。

3必需secret名称仅GOOGLE_SERVICES_B64_ANDROID、MM_INFURA_PROJECT_ID、WALLET_CONNECT_PROJECT_ID；不读取/显示值。将来owner签名secret名称PETROCASH_KEYSTORE_B64、PETROCASH_KEYSTORE_PASSWORD、PETROCASH_KEY_ALIAS、PETROCASH_KEY_PASSWORD，当前未消费。公用TEST证书预计6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9，待下载实物验证；owner私钥未用于CI，不进repo/artifact。

## 决策和开放事项

草稿403不是缺Contents:write；旧trigger与checkout/target不一致。真实自身SHA probe成功；新脚本校验SHA，先preflight创建draft再编译，APK先保存再AAB。默认token只读、仅草稿job write，无PAT/main/public Release。上游已登记workflow禁用清单见PROGRESS。

不改keyring/SRP/vault/加密/签名/审批，敏感源和权限有guard。源签名域名恢复原值；petrocash://仅原router别名。三处原创BrandMotion，原Rive代码可切换，无导航/解锁回调；reduce-motion/网络/后台政策有单元合约，FPS/真实Rive/OS深链/安装仍需设备。

3 critical保持发行open：proxy-addr2.0.8、shell-quote1.11/1.12候选；tar7.5.19但工具链仍tar6.2.1。SECURITY-REVIEW.md含官方GHSA/补丁范围/用途证据；旧audit0critical不代表全部版本修复。新APKsource-map排除报告未上传，不能沿用旧基线或仅靠strings断言无包。WAL001–007/POL001–010全BLOCKED，无实际配对/链上证据。空测试钱包，资金操作需具体授权。

full flags仅本地，公开38布尔参考，不改复杂fetch/安全门槛；**add full flags after moving to a private repo**。旧本地47fcc9f5禁止push。1.0.0原生getVersion可能不满足上游minimumVersion；私有fork制定版本/flags方案。Firebase仅测试派生包名，OAuth/push/attestation未注册；自有网站/法律页/HTTPS绑定仍待部署。Segment缺key不创建client/Sentry缺DSN保留guard，WC telemetry=false/OTA关闭，不宣称已抓包零发送。

Mobile LICENSE仅inspection/study，修改、衍生与分发需ConsenSys prior consent，商用未授权。无public Release；owner仅授权当前草稿失败时1天APK artifact后备。里程碑：APK→phone→private repo→剩余品牌/服务→features→获权后release。

## Test layer placement

纯helper/别名/能力矩阵是unit；BrandMotion/ref/几何为窄组件合约，保持已有unit，不冒充screen E2E。此次两文件修复沿用上游unit：报价hook不改行为；BigNumber仅隔离加载环境。真正OS安装/深链/生命周期/存储/GPU不能由CV或controller integration覆盖，应由实际设备边界验收；未运行Appium或手机，不称已通过。

精确恢复消息：继续。先读docs/PROGRESS.md和HANDOFF.md。完整回归45388166315和补充测试45392919611已PASS，不重做。检查APK run45386233779/draft456690358，下载实际文件做SHA256/apksigner/aapt校验并交付链接；草稿失败用1天artifact。不要启动第二次原生编译。完成后更新三份记录和PLAYBOOK并push，仅codex/petrocash-rebrand，永不main/secret/public Release。

## 原生长编译观察（2026-11-24 21:25 +08）

当前45386233779仍in_progress；最新刷新并开启时间戳的日志停在12:52:08Z Kotlin/Java输出，暂无失败，无法读取实时CPU/资源来确认静默原因。git diff证明当前ce55与已成功编译的1c35在android/package.json/yarn.lock/.yarn/patches/scripts/build.sh/scripts/rebrand/build-android.ts完全无差异；workflow的8GB Metro、2 workers、native内存设置亦未改。不能从静默就判断品牌代码错误，也不能声称构建健康。暂保留同run，不取消或平行启动第二个一小时编译；继续等实际产物/错误。运行中job日志下载404 BlobNotFound，表示日志blob尚不可用，不是新的repo权限403。
