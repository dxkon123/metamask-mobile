# PetroCASH 进度 / continuation checklist

更新：2026-11-24，Asia/Kuching。仅 codex/petrocash-rebrand，禁止 push main。每项开始读本文件；每步完成更新本文件/HANDOFF/MORNING、commit/push，长等待前保存。

## 当前继续点（以本节为准，后方旧轮次保留为历史）

1. 小交付探测 **45382420486** 已完成：草稿创建/上传/下载比较/删除 PASS；1天 artifact PASS，勿重做。
2. 当前 APK 源码 **ce55e77174ca5128c19c98868a9defe86f47c684**，run **45386233779**，native job **138421900226**。完整4 lint、TSC、62套相关测试/1643断言全部 PASS；编译前交付预检 PASS，未发布草稿 **456690358** 已建立。原生编译进行中，不要重启旧运行。
3. 完整回归 **45388166315**，source **4354564ab2c279fb6aa5744de07102bc6cde58ac**；checkpoint不会再编译Android。它与ce55的app/android/ios/locales/package/lockfile/品牌及脚本树完全相同，仅报告和workflow注释变化。完整unit已结束：5932套PASS，90732断言PASS，10上游skipped/1todo另列，详见末尾当前结果。
4. APK上传后立刻下载到outputs/PetroCASH，用Google官方Build Tools独立复核SHA256、包名org.petrocash.wallet、1.0.0/1、签名和bundle/字体；上传草稿失败才用1天artifact后备。不要等待AAB才保存或验证APK。
5. 完整回归有失败就查真实诊断，局部重测明确--runTestsByPath；不跳过。真机安装、WAL/POL、所有动画目视仍未执行，不能称无bug。

| 项目 | 状态 | 证据/提交/运行 | 下一动作 |
| --- | --- | --- | --- |
| SSOT、用户logo、包名版本 | done源码 | fe41b953；org.petrocash.wallet，1.0.0/1 | 实物APK复核 |
| 初始盘点 | done初扫 | ce880256；8642文本/999媒体 | 最终扫描排除生成报告自身，保留协议/版权/第三方身份 |
| 图标与图片 | done生成/尺寸 | 105 native+54 app=159原尺寸PASS；M4证据 | 真机目视与剩余动画检查 |
| 用户可见文字/字体/主题 | in progress | 23语言、Inter、原创素材；1c35f1f5 | 相关断言/快照和完整lint/type修复后验证 |
| dApp/路由 | in progress | WC/EIP6963身份PetroCASH；恢复上游签名域名 | 新petrocash://仅作原router别名；HTTPS签名host不重映射；真机待测 |
| 原创动效/Rive切换 | in progress | 三处Fox装饰替换；BrandMotion；本地40断言 | 云端合约/类型检查，设备生命周期/视觉/FPS |
| Firebase | done测试派生源码 | build-android.ts仅子进程env | 生产需真实包名/证书Firebase app；OAuth/push未验证 |
| APK编译/验证 | 新候选编译中 | run45386233779/sourcece55e771；旧45367200108文件丢失 | 等待当前编译、先保存APK、独立校验 |
| 草稿与后备通道 | done真实探测 | run45382420486，412735fc；draft上传/下载校对/清理PASS；1天artifactPASS | 新构建使用相同源码/触发/targetSHA，草稿失败自动后备 |
| 全量lint/TSC | PASS当前候选 | run45386233779，4lint与TSC全PASS | 完整回归run45388166315同时复核 |
| 全量单测 | PASS，保留上游未执行项 | run45388166315：5932套/90732断言PASS；10skip+1todo未计PASS | 另验3项测试遗漏修正；其余7skip/1todo开放记录 |
| 最小flags/telemetry | done已授权部分 | 38布尔，仅参考；上游运行时fetch保留；OTA关闭/WCtelemetry false/Segment无key不初始化 | **add full flags after moving to a private repo**；完整snapshot仅本地 |
| 3 critical补丁 | candidate已安装，非生产关闭 | proxy-addr2.0.8/shell-quote1.11.0/tar7.5.19；audit0critical/24high/22moderate | 回归/新APK可达性核验 |
| 签名 | TEST | CI公用证书6f9f444a…ecf9；本地新私钥未接入 | 不显示/提交钥匙密码；生产需owner签名配置 |
| WAL001–007/POL001–010 | BLOCKED/未执行 | 没有真机/真实配对/链上证据 | 先APK安装，无资金交易未经具体授权不得执行 |
| 商店/源码/PLAYBOOK/交付 | in progress | 商店512/1024×500已生成；PLAYBOOK初版持续更新 | APK/sourcezip、真实报告、电话清单 |
| 上线许可 | BLOCKED | 根LICENSE；此前owner要求无public Release | 发行/商用权利由owner解决；仅允许当前1天artifact后备例外 |

## 构建与安全

PetroCASH Rebrand：.github/workflows/petrocash-rebrand.yml。必需secret名称仅 GOOGLE_SERVICES_B64_ANDROID、MM_INFURA_PROJECT_ID、WALLET_CONNECT_PROJECT_ID。可选签名名称 PETROCASH_KEYSTORE_B64、PETROCASH_KEYSTORE_PASSWORD、PETROCASH_KEY_ALIAS、PETROCASH_KEY_PASSWORD；值不可进chat/Git。新keystore仅Mac外部目录，未用于CI。

GITHUB_TOKEN默认只读，PR创建/批准关闭；Android和小探测job仅为草稿请求contents:write。已手动禁用的三个登记workflow：create-bug-report.yml、merge-previous-release-branches.yml、petro-wallet-baseline.yml。其余上游YAML保留，registry未登记不称手动disabled；Nightly独立页面为不存在。新probe由owner本次明确授权，后续可禁用。没有修改main或删除上游功能。

不改keyring/助记词/vault/加密/签名/审批；Android权限声明与base一致。新增guard保护签名验证文件、原签名host和public key常量。只把petrocash://变成原metamask://路由别名，保留HTTP(S) host，不新增自动批准。保留上游服务不等于它们可用或owner获得商业授权。

## 真实交付故障与修复

45367200108触发f3cf0970但checkout/Release target是1c35f1f5；Contents:write已生效，创建Release返回403。小探测45382420486以自身触发SHA创建、上传、下载比较、清理草稿全部PASS；之后release listing为空。故修复为每次build自己的触发SHA，拒绝source/workflow不一致。不要把所有分支草稿都说成不可能，也不要提升仓库全局权限或要求PAT。

APK后备只上传APK、signature/badging/hash/public metadata，retention-days:1，禁止上传配置、完整env日志或私钥。公开Release仍未授权。一天artifact会过期，不能称永久下载。

## 历史锚点

upstream a3251559c8af381b7b9689dd49d3dce8d5f76261；原基线c51abcebdb3ddc67de1e78bdcf8a44f225495240。M1fe41b953失败runner失联；M2ce880256保存安全WIP；b55c4a1f最小flags；325b8e41分离Metro；1c35f1f5保护协议/显示文案；f3cf0970重试指定源码；7088b953运行记录；412735fc小探测；60f1f870交付修复。详细过程在这些Git提交、docs/PLAYBOOK-zh.md及docs/rebrand/evidence。旧本地47fcc9f5含full flags不可推送，不属于公开分支祖先。

精确恢复消息：继续。先读docs/PROGRESS.md、HANDOFF.md、MORNING-REPORT.md，核对远端和最新CI。跳过done，先完成62套related检查和完整lint/type；通过后构建同一触发SHA并验证APK交付。每步更新三份记录和PLAYBOOK并push；永不推main、显示secret或公开Release。

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

## 源码交付与漏洞复核检查点

精确ce55源码ZIP已生成到outputs/PetroCASH/PetroCASH-source-ce55e771.zip；SHA256 e33ed1647df8dc571cb1296caa54523e099d915a91ce1fce613c95de933a6742，110202494 bytes，19466个tracked blob逐项一致；Git archive不含ios/branch-ios-sdk submodule内容（锁定615267ea0b44bc3be657b84fbc9ff7c86688fa58），README已说明。未含owner私钥/密码/full flags路径；源码可从分支按精确SHA克隆。手机清单已复制outputs。

新增docs/rebrand/SECURITY-REVIEW.md：官方三GHSA补丁范围复核。proxy-addr2.0.8、shell-quote1.11/1.12候选；tar7.5.19已覆盖7.x，但工具链仍有tar6.2.1，不能沿用audit0critical称全部关闭。当前native上传白名单不含source-map路径报告，不能以sourceCount或APK字符串未命中伪造新bundle排除证明。此检查点不改App/依赖，不重启编译。

## 上游测试遗漏修复（不改运行时）

完整回归已完成的结果含上游原有pending：Bridge useTrackBatchSellQuotePageViewed文件it.only使另外2项未跑；BigNumber全局隔离原it.skip使1项未跑。两文件在upstream与ce55的blob一致，确认不是本次新增跳过。现在移除only，用jest.isolateModulesAsync在新模块registry加载BigNumber/bigint并比较整个配置，恢复原防全局污染断言，不改BigNumber运行时代码或改20为36来掩盖问题。明确--runTestsByPath本地2套229断言全PASS，0pending/0todo；Prettier PASS。

Mac4GB heap即使只lint两个文件仍因typed lint载入全项目OOM，不当作lint规则失败、不反复加压重跑。新增同一PetroCASH workflow内[test-completion]只读job，跑这2文件、scoped ESLint和完整TSC；[checkpoint]确保没有新Android编译。上游另外7项显式skip（Earn4/BridgeView1/Perps E2E helper2）与本次品牌/交付无关，保留原样并如实报告，不将它们计为已执行通过。应用运行时/Android/依赖仍与正在构建的ce55相同；只有测试、workflow和记录变化。

## 完整回归已结束（不是相关套件替代）

run45388166315 / source4354564ab2c279fb6aa5744de07102bc6cde58ac：4/4完整lint PASS，完整TSC PASS，10/10完整unit分片PASS，5932套PASS/0FAIL、90732断言PASS/0FAIL、111快照PASS。原覆盖收集保留。另有上游10 skipped +1 todo，未计入PASS；其中Bridge only遗漏2项及BigNumber skip1项已用两文件修正重跑229断言全PASS，云端[test-completion]待确认。其余7显式skip和FadeInView的1todo保留原上游状态，不称零跳过或真机通过。详细逐分片计数见docs/rebrand/evidence/full-regression.json。

当前只待新APK原生编译/保存/本地独立复核以及测试文件修正的云端lint/type确认。源码与依赖运行时没有新修改，不重新编译Android。
