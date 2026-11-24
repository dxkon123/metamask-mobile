# PetroCASH 进度 / continuation checklist

更新：2026-11-24，Asia/Kuching。仅 codex/petrocash-rebrand，禁止 push main。每项开始读本文件；每步完成更新本文件/HANDOFF/MORNING、commit/push，长等待前保存。

## 当前继续点

1. 交付通道已真实验证，修复 checkpoint 已推送 **60f1f870ddd0d38d30b6acc8ec9f0fe50fa18345**。不要重跑旧 workflow：它不会得到新修复。
2. 下一提交标记 **[related-checks]**：完整4 lint + TSC，Jest 用 --runTestsByPath 覆盖 related-tests.json 的62套（原失败54套+品牌8套）。native依赖这些检查，全成功才自动开始；失败则不编译。
3. 处理真实失败直至通过，再以新的同一触发SHA构建APK、创建private draft。草稿失败则自动保留1天APK artifact（owner明确授权的例外），在AAB之前完成。验证实际APK hash/ID/cert后交付。
4. 动画源代码和相关断言现已加入候选，原Rive实现可切换；本地品牌4套40断言PASS，协议/Rive合约正在复查，云端与真机尚未通过。不得称无bug或全部狐狸清除。

| 项目 | 状态 | 证据/提交/运行 | 下一动作 |
| --- | --- | --- | --- |
| SSOT、用户logo、包名版本 | done源码 | fe41b953；org.petrocash.wallet，1.0.0/1 | 实物APK复核 |
| 初始盘点 | done初扫 | ce880256；8642文本/999媒体 | 最终扫描排除生成报告自身，保留协议/版权/第三方身份 |
| 图标与图片 | done生成/尺寸 | 105 native+54 app=159原尺寸PASS；M4证据 | 真机目视与剩余动画检查 |
| 用户可见文字/字体/主题 | in progress | 23语言、Inter、原创素材；1c35f1f5 | 相关断言/快照和完整lint/type修复后验证 |
| dApp/路由 | in progress | WC/EIP6963身份PetroCASH；恢复上游签名域名 | 新petrocash://仅作原router别名；HTTPS签名host不重映射；真机待测 |
| 原创动效/Rive切换 | in progress | 三处Fox装饰替换；BrandMotion；本地40断言 | 云端合约/类型检查，设备生命周期/视觉/FPS |
| Firebase | done测试派生源码 | build-android.ts仅子进程env | 生产需真实包名/证书Firebase app；OAuth/push未验证 |
| APK编译/验证 | PASS但文件丢失 | run45367200108，source1c35f1f5，compile1h03m46s | 修复后的新候选再构建一次；没有可下载旧APK |
| 草稿与后备通道 | done真实探测 | run45382420486，412735fc；draft上传/下载校对/清理PASS；1天artifactPASS | 新构建使用相同源码/触发/targetSHA，草稿失败自动后备 |
| 全量lint/TSC | FAIL旧候选，已修源码待CI | lint1/2PASS；3/4各1规则错误；TSC重复host键 | [related-checks]仍执行完整4lint+TSC |
| 全量单测 | FAIL旧候选 | 5929套：5875PASS/54FAIL；90576断言PASS/123FAIL | 先重跑全部54失败套件+8品牌套件，不跳过；不把相关PASS称全量PASS |
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
