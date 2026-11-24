# PetroCASH developer handoff

2026-11-24。先读docs/PROGRESS.md及docs/rebrand/DELIVERY-REPORT-zh.md。本文件与最新分支报告为交接入口；草稿里的CI快照绑定构建提交，可能早于验证完成。

## 当前成果

APK/source已保存并下载验证；**不重跑已完成CI**。run45405350978 / job138484436260，构建source7df8638619afcb06f6acbe8d09bd7a41fa5bfe36。APK SHA256 29fdc0d4dffba2724c263705b0fada9316d18fa30def3773a4e5d7fea40ea9b7；org.petrocash.wallet/1.0.0(code1)，仅arm64 TEST/R8 off。draft456815401未发布，完整链接见交付报告；owner手机验收是下一步。

官方apksigner v2 PASS；TEST公用cert SHA256 6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9（DN含MetaMask/Consensys，不是owner新钥匙）。权限与基线归一后无差异；provider无io.metamask冲突、无sharedUID；launcher类在DEX，JS bundle在APK，Inter有/Grotzec无，44原生库及ZIP 16KB对齐PASS。真机安装、生命周期、视觉/FPS未跑，不称无bug。

CI源码ZIP SHA2564b575e8f716ad08162dfa884f701eed45e60cb64536a8dbc544b7446ee8bd98b；19470 blobs原始字节一致、gradlew.bat按声明CRLF规则一致。iOS submodule内容不在archive，锁定615267ea0b44bc3be657b84fbc9ff7c86688fa58，另按.gitmodules初始化。

## 质量与构建方式

完整run45388166315/source4354564：4lint/TSC、10unit PASS；5932套90732断言111快照PASS，原coverage保留。原10skip+1todo另列；后续45392919611/source15d21f0b恢复Bridge it.only造成2遗漏和BigNumber隔离1遗漏，两文件229断言0skip/0todo、scoped lint和完整TSC PASS。仍7上游skip/1todo未计PASS。相关run45386233779的62套1643断言亦PASS。恢复构建复用这些结果，没有重跑质量matrix。

PetroCASH Rebrand workflow .github/workflows/petrocash-rebrand.yml；分支push构建自身SHA，永不main。生产默认四ABI/R8开。[android-recovery]为owner批准的dev TEST arm64/R8 off模式，仅android，不跑AAB；项目Gradle fast属性限制dev。GRADLE_USER_HOME属性指定ABI；16GB额外swap、磁盘清理和300秒stdout heartbeat已实跑。小probe workflow上传/下载比较/删除草稿45382420486已PASS，不重做。新build必须先preflight建draft，再允许报告推进分支head。

Node24.22.1/Yarn4.14.1/Java17/SDK36/NDK27.1/CMake3.22.1；只Yarn。相关单测用yarn jest --runTestsByPath ...；不要向已带全路径的test:unit追加文件误跑全仓。局部调试coverage=false防Mac全仓收集OOM；完整CI coverage未删除。Mac typed lint可加载全类型图，已有云端充分证据，不重复本地加压。

必需secrets名称仅GOOGLE_SERVICES_B64_ANDROID、MM_INFURA_PROJECT_ID、WALLET_CONNECT_PROJECT_ID。将来owner签名名称PETROCASH_KEYSTORE_B64、PETROCASH_KEYSTORE_PASSWORD、PETROCASH_KEY_ALIAS、PETROCASH_KEY_PASSWORD，当前未消费。owner私钥/密码在Mac外部，绝不读取到chat或提交。默认token只读、草稿job write，无PAT/public Release。

## 开放事项与安全约束

无keyring/SRP/vault/加密/签名/审批源变更，原签名host/public key有guard。仅petrocash://归一原router，不改HTTPS签名origin。三处BrandMotion使用owner logo和本地原创资产，保留legacy Rive/原框架和stop接口，无解锁或导航回调。其他Rive/所有媒体最终视觉仍待；技术标识、icon字体名及版权保留。

本次21361个打包源路径中三原始critical包匹配0；44原生库清单附证据。proxy-addr2.0.8和shell-quote1.11/1.12候选已安装；tar7.5.19但工具链仍6.2.1，生产跟踪不能全部关闭。详见SECURITY-REVIEW.md；audit零计数不是全版本安全。WAL001–007/POL001–010全部BLOCKED，不能用mock或源保留当真实验收。先空测试钱包，无资金签名/交易具体授权。

full snapshot只本地work/petrocash-rebrand/blocked-flags，公开38布尔参考；**add full flags after moving to a private repo**。旧本地47fcc9f5禁止push、非公开分支祖先。原复杂fetch/安全门槛保留；native1.0.0可能受上游minimumVersion限制，私有fork需版本/flags策略。Firebase仅测试派生包名，生产app/证书/OAuth/push/attestation、自有HTTPS与法律站点仍待注册部署。

Segment缺key不创建client、Sentry缺DSN guard及实际native auto-init=false、WC telemetry=false/OTA关闭；SDK仍在，未做设备抓包，不能声称零发送。Mobile LICENSE许可/商用/分发门禁未解决，无public Release；owner只明确批准草稿失败时一日APK artifact后备，本次未触发。

## 已结束故障

45367200108编译成功却旧target草稿403，APK丢失；本次统一SHA+小probe+preflight+一日后备已修。45386233779随后runner失联FAIL，1h55m9s、无APK，非本代理取消；具体OOM/网络原因未证实。原run已结束，无另一个live job需取消。监控看job/run终态，失联后的step可能仍in_progress。

## Test layer placement

纯helper/别名/能力矩阵unit，BrandMotion/ref/几何为窄组件合约。两处测试补全只调整执行范围/模块隔离，不改生产数字逻辑。OS安装、实际深链/生命周期/安全存储/GPU不能由CV或controller integration证明，需真实设备边界；未执行Appium或真机。

下一里程碑：手机反馈→私有仓库→完整flags/剩余品牌和自有服务→features→获权和生产签名后的release。精确继续消息见MORNING-REPORT.md。


## 草稿说明最终同步（2026-11-24 22:40 +08）

已通过owner登录页面更新草稿456815401说明，并独立API确认draft=true、target=7df8638619afcb06f6acbe8d09bd7a41fa5bfe36、11个附件及APK/源码digest不变。GitHub保存草稿会更换untagged临时入口；当前为[交付草稿](https://github.com/dxkon123/metamask-mobile/releases/tag/untagged-684d28d7a0b84b80be5f)。附件报告是CI源码时刻快照，最新状态以分支DELIVERY-REPORT/HANDOFF为准；未发布或删除任何产物。停点：交付完成，等待owner空钱包手机测试，继续时不重跑CI。
