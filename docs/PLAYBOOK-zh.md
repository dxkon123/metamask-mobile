# PetroCASH 钱包换品牌学习手册

本手册在第一个里程碑就写入仓库，后续随真实结果更新。命令中的密钥值都应从本地文件或仪表盘取得，不要粘贴进聊天。当前是测试版开发；“生成了 APK”不等于“全部测试通过”或“可以上架”。

## 1. 先认识各个部件

| 名称                          | 做什么                               | 为什么重要                                                         |
| ----------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| Git 分支 / commit             | 保存一组可追溯的源代码修改           | 只有明确的 commit 才能对应一个构建；不修改 main                    |
| GitHub Actions                | 云端安装依赖、编译、测试和上传文件   | Mac 无需配置完整 Android 工具链；看每一步真实结果                  |
| Actions secrets               | 将私有服务配置传给指定步骤           | 不能写进 Git；也不会自动传给所有 workflow 或 fork PR               |
| Firebase google-services.json | 告诉 Android SDK 属于哪个项目/app    | package_name 要匹配 applicationId；只改字段不是注册新 Firebase app |
| Infura project ID             | RPC 服务访问配置                     | 不是钱包私钥；仍应限制使用范围和配额                               |
| WalletConnect project ID      | 钱包与 DApp 配对所需服务标识         | 不代表能冒充官方钱包，也不等于真机配对已通过                       |
| keystore / signing            | Android 用证书识别同一个 App 的更新  | 同包名不同证书会冲突；丢钥匙可能无法延续更新                       |
| applicationId                 | Android 安装包唯一身份               | org.petrocash.wallet 与官方 io.metamask 分开安装                   |
| namespace / RN 注册名         | Java 资源和内部桥接标识              | 不是显示品牌，不应盲目改名                                         |
| Gradle flavor                 | 同一工程的 main/flask 等变体         | flask 在主 applicationId 后增加 .flask                             |
| APK / AAB                     | APK 可侧载；AAB 由 Play 生成设备 APK | AAB 不能像 APK 一样直接点安装                                      |
| feature flags / OTA           | 服务器可影响功能或下载更新           | fork 必须明确谁控制这些配置，不能误接收官方变更                    |

## 2. 从零到基线

1. 从合法可用的源代码建立自己的 fork，保留 LICENSE 和版权。先核查这个具体 commit 的许可证，不凭其他 MetaMask 项目的条款推断。
2. 在 fork 的 Actions 页启用 workflow。fork 默认可能停用 Actions；来自 fork PR 的 workflow 通常拿不到仓库 secrets。
3. 只在开发分支操作，例如：

```bash
git switch -c codex/petrocash-rebrand
```

4. Firebase 控制台建立你自己的项目和 Android app，包名填最终 applicationId；下载 google-services.json。在 Mac 上转换为一行 base64 并复制：

```bash
base64 < /path/to/google-services.json | tr -d '\n' | pbcopy
```

先手动输入 secret NAME `GOOGLE_SERVICES_B64_ANDROID`，再复制 value，避免剪贴板被后一次复制覆盖。不要把配置提交到仓库。5. Infura 使用 [app.infura.io](https://app.infura.io) 的开发者项目/key 管理，可能见到 “My First Key”。`developer.metamask.com` 的 Embedded Wallets 页面不等于 Infura RPC key 页面。菜单可能更新，按当前官方界面核对。6. WalletConnect 在 [dashboard.walletconnect.com](https://dashboard.walletconnect.com) 建立自己的项目，取得 Project ID，配置允许来源/应用身份。不要把项目 ID 当钱包密钥。7. 在仓库 Settings → Secrets and variables → Actions 建立 `MM_INFURA_PROJECT_ID`、`WALLET_CONNECT_PROJECT_ID` 与上面的 Firebase secret。始终只在文档中写名称。8. 按仓库 `.nvmrc` 和 Yarn packageManager 安装工具。这里只用 Yarn，不用 npm/npx。9. 先编译原始基线，保存 commit、run、APK SHA-256、package/version/certificate；再做 rebrand。旧基线结果见 docs/petro，不能自动算新版本 PASS。

## 3. 本项目如何快速换品牌

品牌母版是你提供的橙红/玫红无限循环箭头 logo。配置在 `brand/brand.config.json`，资源在 `brand/assets/`。不要全仓库替换内部 metamask 标识。

```bash
bash scripts/rebrand/apply-brand
```

脚本修改 Android 显示名称、applicationId/version，并按 `brand/assets/native-assets.json` 的原像素尺寸导出图标。Java namespace、包依赖和内部桥接名保留。每次执行后检查 diff；没有输入变化时应产生相同输出。后续全品牌映射会继续补入同一个可复用流程。

在 GitHub Actions 的 **PetroCASH Rebrand** 看原生编译。先上传 `petrocash-fast-apk-<commit>`，再编译 AAB。完整质量检查在提交消息含 `[full-checks]` 或手动运行时执行；跳过的 job 不算通过。具体产物链接在 MORNING-REPORT.md 更新。

## 4. Firebase 的临时方案和正式方案

当前 secret 只有旧包名。构建脚本在子进程内派生新 package_name，让 Google Services 插件找到匹配 client。原项目 app ID、key 和服务器注册并不会因此改变。这只用于编译/启动验证，push、attestation、OAuth 可能不可用，必须记录真实状态。

生产前必须在 Firebase **真正新增** org.petrocash.wallet 和 org.petrocash.wallet.flask Android apps，登记正确证书 SHA，下载新配置、更新 secret、重建并验证。若 Google API key 有 Android 包/证书限制，也必须更新。不能把“编译成功”当作 Firebase 所有功能成功。

## 5. 签名与钥匙

本次默认使用 TEST 公开开发证书；其私钥并不保密，不能用于正式资金钱包或发行。新 PetroCASH 钥匙只允许存在于 `~/PetroCASH-keys/`，不进入 Git 或 artifact。生成阶段/owner 脚本会在后续里程碑补齐。

正式发布建议 owner 在可信离线环境重新生成生产钥匙，并加密离线备份至少两份；把证书指纹与备份位置记在不含密码的记录中。不要依赖聊天、单台电脑或公有仓库备份。`*.jks`、`*.keystore`、`*.p12` 必须忽略，仍要检查已跟踪文件。

可选 CI signing secrets 名称：PETROCASH_KEYSTORE_B64、PETROCASH_KEYSTORE_PASSWORD、PETROCASH_KEY_ALIAS、PETROCASH_KEY_PASSWORD。如果工具不能安全写入，使用后续 owner clipboard 脚本逐个复制，先填名称再取值，绝不打印。

## 6. 本项目已经遇过的坑

| 症状                                 | 原因                                     | 处理                                                                                     |
| ------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| Downloads 的 Operation not permitted | macOS 隐私权限                           | 用文件选择器/授予合适访问权限，或手动复制到允许访问的工作目录；不随意关闭系统安全        |
| zsh 出现 quote>                      | 引号没闭合                               | Control+C 退出，重输完整命令                                                             |
| secret 值和名称对不上                | 剪贴板在复制名称时覆盖 value             | 先手动输入名称，再复制 value                                                             |
| 找不到 Infura key                    | 进入 Embedded Wallets dashboard          | 回到 app.infura.io 的 RPC 项目/key 页面                                                  |
| Actions 没启动                       | fork 未启用、分支/paths filter 不匹配    | 启用后核查 workflow 的 on、branch 和路径                                                 |
| fork PR 没 secrets                   | GitHub 的默认隔离机制                    | 用授权分支的受信任 push/dispatch；不把 secrets 开放给不可信 PR                           |
| provenance fetch HTTP 403            | 匿名 fetch 被限制                        | 用 contents:read 的 authenticated checkout，之后移除持久凭据                             |
| Node heap / timeout                  | 全量 lint/Jest 与 native 编译资源重叠    | 上游内存配置、10 个 unit shards、4 个 lint shards、延长 native timeout、先上传 APK       |
| Snap Registry 单测失败               | 把 METAMASK_BUILD_TYPE=main 泄漏给 tests | 只给 build，单测按上游 unset，不改安全控制或断言                                         |
| Conflicting app signatures           | 同 applicationId，不同 signer            | 使用新的 applicationId。工作资料不解决签名冲突；不要贸然卸载真实钱包                     |
| 要卸载已有钱包                       | 卸载会移除本地数据                       | 先由 owner 私下确认 SRP 和每个导入账户私钥的恢复备份；本任务不卸载官方钱包               |
| usage limit / auto-review decline    | 工具审核或额度未完成                     | 从 HANDOFF/MORNING 和远端 commit 恢复；未执行的 push 不能写成完成                        |
| 公有 vs 私有 repo                    | 可复制性、许可与 CI 成本不同             | 不保证任意套餐的 runner 资源；按当前 GitHub 账户核查。公有代码可被复制，密钥始终不能公开 |
| Mac 字体文件大小写冲突               | 上游同时有大小写不同文件名               | 用 Linux/Git archive 保存，不能因 Mac 检出而删除上游文件                                 |
| 新 package 的 Firebase mismatch      | 原 json 只注册了旧 package               | 测试用派生配置；生产必须真正新增 app                                                     |
| 没 key 仍有 Segment 请求             | SDK 初始化会取 settings                  | 无 owner key 时不创建 SDK；用测试和设备流量验证                                          |
| 附件中的一万月活许可不适用           | 不同产品/commit 的许可不同               | 以本仓库 LICENSE 为准，发行前获得权利确认                                                |
| Grotzec 字体不能复用                 | 单独商用字体许可仅给 MetaMask            | 移除打包/使用并换可商用字体，保留版权与替换记录                                          |

## 7. 钱包 fork 安全与上架

永远不为了 rebrand 改助记词生成、Keyring、vault/encryption、签名、审批、权限校验；不能移除钓鱼检测、安全提醒、生物识别、自动锁和 SRP reveal 保护。不能使用真实钱包做截图或日志。第三方服务仍有自己的运营方、条款与可用性，改品牌不等于获得服务权限。

三项 critical 必须修复或明确阻塞发行；只在 source map 中没看到包名，不代表整个 APK/native 已安全。检查新增网络域名、合并 Manifest、端点/SDK、remote flags/OTA、导出与锁屏、签名/校验和。

本提交 LICENSE 不是可直接套用的 10,000 MAU 商业许可；保留原文，发行前取得对该 Mobile 源码的权利确认。MetaMask 商标不因 fork 而转让。Play 商店也需要正确的金融/区块链声明、数据安全表和隐私政策；非托管钱包的具体政策/国家要求以当前官方文档为准，不能把“非托管”理解成免审。

新个人 Play 开发者账号（2023-11-13 后创建）当前需至少 12 位测试者连续加入封闭测试 14 天，再申请 production access。来源：[Google 官方要求](https://support.google.com/googleplay/android-developer/answer/14151465)。这不是保证上架；政策和账户条件需在提交时复核。

## 8. 给另一个 AI 的 MASTER PROMPT

```text
Read HANDOFF.md, MORNING-REPORT.md, docs/DECISIONS.md and AGENTS.md first.
Continue the MetaMask Mobile fork on a new branch only; never push main.
Use brand/brand.config.json and brand/assets as the only brand inputs.
Preserve every wallet/browser flow and all key management, recovery, vault,
signing, approval and permission logic. Never rename internal packages/classes.
Generate exact-size original brand assets; keep licensing and notices.
Build an early verification APK, then complete brand/animation/privacy/config work.
Never expose or commit secrets, passwords, keystores, wallet seeds or private keys.
Use owner service secrets by name only. Derived Firebase config is TEST-only.
Run meaningful focused tests, full lint/typecheck/unit shards, and native checks.
Record real outcomes; do not invent device, service or funded transaction passes.
Push every milestone and update handoff + morning report. Draft releases only.
Deliver APK/AAB/source, checksums, provenance, remaining blockers and reproducible docs.
```

RESUME：

```text
Resume from origin/codex/petrocash-rebrand. Read handoff/morning/decisions,
compare local and remote, inspect current CI and continue the next incomplete
milestone without overwriting existing work. Preserve all security boundaries.
```

## 9. 正式发布前清单

- 对源码、字体、商标和发行权的书面确认；域名/支持渠道/法律文本由 owner 正式审核。
- 真实 Firebase 主/flask apps 和限制正确的服务 key；Infura/WalletConnect 身份与配额验证。
- owner 生产钥匙、Play App Signing/上传钥匙与离线备份；正确证书下的 AAB。
- 域名部署 `/.well-known/assetlinks.json`，使用真正的 applicationId 和签名 SHA-256；仅写 Android intent-filter 不会自动验证域名。
- 全套功能矩阵、真机冷启动/锁定/恢复/导入导出/权限测试；具体授权下的 POL 和 QuickSwap 实测。
- 三项 critical 与其余 relevant findings 处理、native/runtime SBOM、设备 egress 验证。
- Play Console app 信息、数据安全表、隐私/条款/审核资料与适用封闭测试。
- 完整 CI 与候选 APK/AAB 指向同一源码 commit，核对 SHA-256；只有 owner 批准并满足门槛才公开发布。

## 断点恢复规则（2026-11-24更新）

以docs/PROGRESS.md为入口，跳过done。每完成一步同时更新PROGRESS/HANDOFF/MORNING并commit/push，长CI等待前先push，约30分钟内不留未推工作。最新Mobile LICENSE仅授予检查学习；修改/衍生/分发需ConsenSys事先同意，商用未获授权；未决定前不得公开Release或公开分发APK/AAB，草稿限定。公开仓库Actions artifact不是私密交付。

恢复prompt：继续。先读docs/PROGRESS.md、HANDOFF.md和MORNING-REPORT.md，核对分支/远端/CI，跳过done，从Resume here继续。每子步骤更新三份记录并push。禁止公开分发APK/AAB、推main、显示或提交secrets。

## Flags / actual approval pitfall

Public remote configuration may contain service auth fields: inspect frontendAuth as well as apiKey. Automatic approval rejected public upload of full financial/service configuration. Owner selected 38 top-level boolean switches only; full snapshot stays local until private migration. Do not flatten object flags and discard minimumVersion/security gates. Compressed inventories need strict schema verification. Connector bulk uploads are slow; inspect and handle each rejection promptly. CLI Git has no credentials here; connector creates reviewed blobs/trees/commits, then verify and align local tree.

## 2026-11-24：APK 编完却丢失的教训

- 先用几十字节文件探测交付通道，再花一小时编译；mock gh 成功不代表真实 GitHub 权限足够。
- 日志已证明 token 有 Contents:write；目标提交相对默认分支修改了 workflow 时，创建 Release 还要 Workflows:write，GITHUB_TOKEN 无法获得它。不要只把仓库默认权限改成全写，更不能为绕过问题向 main 推送。
- owner 已明确允许本次后备：公开 Actions APK artifact 只保留 1 天。必须在签名/包名/checksum 验证后立即保存，再试草稿/AAB。只保留 APK 和公开校验元数据，不上传构建配置、完整日志、钥匙或 service secrets。一天保留会过期，不能承诺长期可下载。公开 Release 仍未授权。
- test:unit 脚本已经列出所有测试根目录；追加路径不会缩小范围。相关测试用 yarn jest --runTestsByPath <明确文件列表>，不删除失败套件、不跳过测试。
- rebrand 不能把生产/测试签名 host 全设为同一个域名；它们参与签名规范化，必须保留上游协议常量。TS1117 是真实问题。

### 小文件探测的实际结果（不要只凭文档猜测）

45382420486 证明 Contents:write 以当前触发 SHA 创建草稿、上传、下载校对、删除草稿都成功。旧失败组合是 workflow SHA=f3cf、构建和 Release target=1c35。修复为每次构建自己的触发 SHA，不再把 GITHUB_SHA 强行覆盖为旧源码。官方 workflow 权限门禁是背景说明；具体可用性以小文件实测为准。构建后草稿失败则进入一天 APK artifact 后备，长 AAB/质量检查前先保存。

### 相关测试仍然可能拖成全仓任务

Jest配置默认collectCoverageFrom覆盖大量源码。即使用了runTestsByPath，若不关调试coverage，测试结束后仍会扫描/插桩全仓，Mac可能heap耗尽。相关问题复现用 --runTestsByPath 精确列表及 --coverage=false；完整发行检查仍保留原coverage流程。记录实际套件和断言数，不把相关通过当全套通过。Reanimated的ES模块导出不可spyOn重定义：mock保留 __esModule/default，仅包装需要观察的函数；真实设备动画仍要另测。

恢复上游canonical签名host，不代表把PetroCASH域名伪装为上游签名origin。新的petrocash://只做custom scheme别名，不改HTTPS host、不改签名实现、不自动批准。支持URL保留原mobile_app查询参数，帮助链接的?与&测试仍有效。实际资产MetaMask USD和API fixture不应为了让测试通过被改名。

### 修断言时也要保留测试含义

DeepLinkModal插入的是外部pageTitle，fixture里的MetaMask不能连同钱包固定文案一起改；支持入口只改owner的固定地址，不改测试的example.com opener。主题快照只改真实diff：本次radio边框/背景和loading主色3处改变，其他文字仍用原token，不能机械替换全部同色值。新动效必须遵守namespace import和颜色token规则，不用disable来消除报错。

质量job现在是native job依赖，失败不启动耗时构建。private draft在native编译前预建并验证；稍后文档push移动branch head不会丢失交付渠道，APK验证后仍确认至少一种保存渠道成功。

### 原生版本与原代码兼容版本是两件事

versionName改1.0.0后，react-native-device-info.getVersion也返回新版本。上游remoteFeatureFlag helper用它比较minimumVersion，不能仅保留package.json的8.22.0就假定功能显隐完全相同。不要为了显示入口把所有flag改true、降低minimumVersion或绕过安全门槛。迁移私有repo时显式设计fork版本/兼容版本/自有flags策略，记录实际设备结果。当前源码保留全部功能不等于服务已授权、远端flag已打开或真机已通过。

### 同时检查全量回归而不重复编译APK

先让related的62套/1643断言和4lint/TSC通过，native依赖该门槛再运行；同run的private preflight先建立草稿（本次456690358/target ce55）。之后只改报告和workflow注释，commit加 [checkpoint] [full-checks]，完整回归可以并行检查同一app/Android/locales/lockfile树，Android明确跳过，不再浪费第二小时。记录两个run/sourceSHA和树哈希，不把related通过当full通过。

## 等待原生编译时的证据与接续

先让当前候选4lint/TSC/related门槛通过，并在该SHA仍是分支head时创建private draft；然后才推报告/全量checkpoint。全量检查可在另一个带[checkpoint][full-checks]提交并行，避免再次花一小时编译。必须证明app/android/ios/locales/package/yarn.lock/品牌与脚本树和APK源提交一致。保存具体run ID和源码SHA，不能仅写“最新”。相关62套PASS不等于全量PASS，源码检查不等于真机/WAL/POL验收。

## audit零计数与多版本依赖坑

同名包可能同时安装多个major；yarn why tar显示7.5.19和6.2.1时，不能因7.x升级或audit快照0critical就称全部修复。对照官方受影响范围逐个版本核对，旧工具major兼容升级/回移需专门测试。Segment包声明shell-quote为dependencies不证明它进入Metro，反过来工具用途也不能替代新source-map排除证据。git archive忽略submodule内容：对照git ls-tree要区分160000与blob，并给出submodule锁定SHA/初始化说明，不能错误声称ZIP含所有递归源码。

## 单测绿勾仍需核对pending与focused

Jest suite绿勾不等于每个断言都执行。检查unit-results.json中的pending以及suite status=focused，再找it.only/it.skip。此上游版本含一个it.only，导致同文件2测试未跑；移除后明确runTestsByPath重测。全局BigNumber默认值被Jest setup旧模块改过时，隔离模块registry测试新模块是否改变原配置，不删除安全断言或把预期20随意改36。新修复只在测试文件，不能误触发一小时Android重编译。已有其他upstream skip单独列出，不虚称0skip。Mac typed lint即使两个文件仍可能加载整个类型图并OOM；云端足够内存跑scoped lint，不能以退出134充当代码规则失败。

## 完整回归与后续补充结果的计数

45388166315是真正10分片完整单测（保留coverage）：5932套、90732断言、111快照PASS，另10skip+1todo。后续test-completion的2套229断言包含大量已跑过的断言，不能简单与90732相加声称独立覆盖增加229；它的意义是恢复3个漏跑项并证明两个修正文件无pending。云端scoped lint和完整TSC亦PASS。报告中写原完整run/补充run/各自源码SHA及仅测试差异，APK无需为这些测试文件重编译。

## 长原生编译与GitHub日志可用性

运行中job logs API的404 BlobNotFound与release创建403不同，不能混作权限问题。UI刷新并启用Show timestamps可核对最后真实输出时间；job in_progress或计时器变化不证明CPU仍在有效工作。先与已成功构建源码比较Android/lockfile/native脚本和资源设置，记录相同输入与未知点；没有资源或失败证据前不要贸然断言死锁或改安全/编译选项。保留当前运行，实际失败后按诊断修复，避免平行重复一小时任务。

## 长编译恢复：并行arm64 TEST、R8开关与5分钟心跳

本次owner明确授权保留原四ABI/R8任务，同时起一个arm64-only、不压缩混淆的dev TEST构建，以先成功并验证者交付再取消另一轮。通过[android-recovery]标记使现有workflow只跑android，复用已完成质量证据；不跑AAB。GRADLE_USER_HOME/gradle.properties优先于项目默认，设置reactNativeArchitectures=arm64-v8a和petrocashFastTest=true；不改项目四ABI默认。Gradle文件仅对显式fast属性且METAMASK_ENVIRONMENT=dev关闭minify，非dev使用fast直接报错；正式版仍开R8。不要把TEST优化配置带入生产发布。

编译前清理一次性VM无关工具、启用swap；后台每300秒将date/free/uptime/df输出到stdout并留资源文件，不打印env或完整命令。APK校验从aapt核对仅arm64、构建日志R8关闭声明和无mapping，再验证签名/hash/包名。APK保存后再源码归档，原run一直保留到可用交付核实。长静默说明可观测性不足，不能仅据此宣称已证实OOM/死锁。官方机制：[RN单ABI构建](https://reactnative.dev/docs/build-speed)、[Gradle属性优先级](https://docs.gradle.org/current/userguide/build_environment.html)。

恢复实跑证据：45405350978/source7df86386仅android active；quality jobs均SKIPPED且引用此前PASS。新private preflight/disk cleanup PASS，draft456815401已经建立后才push运行记录。原45386233779未取消。若断线，用两个实际run ID接续竞争，不再启动第三轮或重复全部质量检查。

## runner失联时step状态可能失真

45386233779最终在1h55m9s后FAIL，Summary明确hosted runner lost communication；不能把它记作编译器代码错误或已证实OOM。该job根状态completed/failure，但compile step仍显示in_progress，其他step pending。监控以job/run根状态为准，再看step细节。恢复45405350978的13:45:34Z heartbeat给出available8021MiB、swap0/19455MiB、load1.51和磁盘66GiB，可实际观察资源；旧run只有写到runner文件的监控，host丢失后无法取回。原run自然终止，无需再取消；恢复APK验证成功即可交付。

## 本轮最终交付与可复核证据（2026-11-24）

恢复run45405350978/source7df86386在44m55s完成Android job：APK先草稿保存，source ZIP随后保存，无AAB/质量重跑；本地下载的APK哈希29fdc0d4dffba2724c263705b0fada9316d18fa30def3773a4e5d7fea40ea9b7与CI及GitHub一致，org.petrocash.wallet/1.0.0(1)，公用TEST证书6f9f444a…ecf9。原失联run自然终止，无需取消一个已经失败的任务。不能由恢复成功反推原来一定OOM。

独立验证采用Google官方apksigner/aapt/zipalign：v2有效、仅arm64、权限差异0、provider独立、无sharedUID、启动类在DEX，ZIP和44个ELF满足16KB对齐。从APK的adaptive launcher XML解析资源并提取前景PNG，目视确认owner无限箭头。Grotzec排除，Inter在包内；技术icon字体名和上游SDK保留，不宣称每一动画都已视觉清场。

同构建source-map摘要必须随artifact-metadata保存：本次21361源路径，三包均0匹配；不上传sourceContents/配置。对照官方受影响范围，多major的tar6.2.1仍是构建环境开放项，不把旧audit0计数写成全版本安全；模块排除不是完整利用可达性或设备流量审计。实际native Sentry auto-init=false也不等于所有服务零发送。

源ZIP必须核对实际CI下载hash，不能用另一次本地archive的hash代替。19471个blob中19470原始字节一致；gradlew.bat在.gitattributes声明text/eol=crlf，归一后与Git blob一致。比较时尊重export/EOL规则；git archive不带submodule内容，README写锁定SHA与初始化方法。交付报告同时记录APK源码提交和后续报告提交，不把最新文档HEAD误当构建源码。

最后更新PROGRESS/HANDOFF/MORNING、源码/evidence和手机清单并push；草稿说明链接最新交付报告，注明附件中的CI文档是源码时刻快照。手机、真实WC/Polygon、全部媒体/FPS、生产签名与许可仍是后续验收，绝不写“无bug”。精确RESUME以最新MORNING-REPORT为准，不重跑已完成CI。


## 草稿说明最终同步（2026-11-24 22:40 +08）

已通过owner登录页面更新草稿456815401说明，并独立API确认draft=true、target=7df8638619afcb06f6acbe8d09bd7a41fa5bfe36、11个附件及APK/源码digest不变。GitHub保存草稿会更换untagged临时入口；当前为[交付草稿](https://github.com/dxkon123/metamask-mobile/releases/tag/untagged-684d28d7a0b84b80be5f)。附件报告是CI源码时刻快照，最新状态以分支DELIVERY-REPORT/HANDOFF为准；未发布或删除任何产物。停点：交付完成，等待owner空钱包手机测试，继续时不重跑CI。
