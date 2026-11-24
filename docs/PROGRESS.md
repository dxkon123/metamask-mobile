# PetroCASH 进度 / continuation checklist

更新：2026-11-24 20:30 +08。只用 codex/petrocash-rebrand，禁止main。每步完成更新本文件/HANDOFF/MORNING并commit/push；约30分钟内保存，长等待前先push。旧轮次记录在Git历史，不把旧FAIL当当前状态。

## 当前继续点

1. **只等待当前APK，不重新编译**：run [45386233779](https://github.com/dxkon123/metamask-mobile/actions/runs/45386233779)，source **ce55e77174ca5128c19c98868a9defe86f47c684**，native job138421900226。其4lint/TSC/62相关套件1643断言PASS，编译前private delivery preflight PASS。
2. 当前native正在4 ABI CMake编译（UI已见app arm64完成、armeabi-v7a进行）；暂无新APK/hash/下载链接。既有未发布draft **456690358**，tag study-45386233779-ce55e77174ca，目前仅preflight.txt。同run优先上传APK；草稿失败自动保留1天APK artifact，在AAB之前完成。不能把预检文件当APK交付。
3. APK出现后立刻下载到outputs/PetroCASH，独立SHA256、Google apksigner/aapt、包名org.petrocash.wallet、1.0.0/code1、签名、JS bundle/字体/merged permissions/provider复核，再给真实下载链接。无需等AAB才保存APK。
4. 完整检查已PASS，见下表；上游未执行项另列，不称全部assertion执行或无bug。源码/依赖运行时仍与ce55相同，后续只有2个测试文件、workflow和文档变化。

| 项目 | 状态 | 证据/提交/运行 | 下一具体动作 |
| --- | --- | --- | --- |
| SSOT、owner logo、包名版本 | done源码 | fe41b953；org.petrocash.wallet，1.0.0/1 | APK实物复核 |
| 盘点 | done初扫 | ce880256；8642文本/999媒体 | 最终排除报告自引用，保留技术标识/版权/第三方身份 |
| 图标与图片 | done生成/尺寸 | 105native+54app=159原尺寸PASS | 手机目视及剩余Rive检查 |
| 文字/字体/主题 | done当前源码候选/相关回归 | 23语言、Inter、原创素材；相关测试PASS | APK字体及真机确认，不能称所有媒体已清除 |
| dApp/路由 | done源码/单测 | WC/EIP6963名PetroCASH；恢复上游签名域名；自有scheme纯别名 | 自有HTTPS/服务注册与真机派发未验证 |
| 原创动效/Rive可切换 | done三处实现/单测 | FoxAnimation/OnboardingFoxLoader/VBA装饰使用BrandMotion，原Rive可切换 | reduce-motion/生命周期/视觉/FPS只由设备验收 |
| Firebase | done测试派生源码 | 子进程内派生包名；配置不落Git | 生产需注册真实包名/证书；OAuth/push/attestation未验证 |
| 小交付探测 | done PASS | 45382420486/412735fc；draft创建/上传/下载比较/删除PASS；1天artifactPASS | 不重做 |
| 旧APK | PASS编译但文件丢失 | 45367200108/source1c35，compile1h03m46s；旧target草稿403 | 没有可下载旧APK，不重跑旧workflow |
| 新APK | in progress原生编译 | 45386233779/sourcece55；preflight PASS | 保存→下载→独立hash/身份/证书复核 |
| 完整lint/TSC | done PASS | 45388166315：4/4lint+TSC；候选45386233779亦PASS | 不重复 |
| 完整unit | done PASS，未执行项另列 | 45388166315/source4354564；5932套/90732断言/111快照PASS，0FAIL；10skip+1todo未算PASS | 保留原覆盖收集；逐分片见full-regression.json |
| 上游only/全局测试隔离 | done修正/云端PASS | 45392919611/source15d21f0b：两文件229断言0skip/0todo；scoped lint+完整TSC PASS | 3遗漏已恢复；其余上游7skip/1todo仍列开放 |
| 最小flags/telemetry | done已授权部分 | 38布尔仅参考；上游复杂fetch保留；OTA关闭/WCtelemetry false/Segment缺key不创建client | **add full flags after moving to a private repo**；full snapshot仅本地 |
| 3 critical | open发行门禁 | proxy-addr2.0.8、shell-quote1.11/1.12候选；tar7.5.19但工具链仍6.2.1 | 见SECURITY-REVIEW；旧audit零计数不等于全部版本安全；新bundle排除证据不足 |
| 签名 | TEST | 预计公用证书6f9f444a…ecf9；owner本地私钥未接入 | 实物apksigner确认，生产需owner签名 |
| WAL001–007/POL001–010 | BLOCKED未执行 | 无真机/真实WC配对/链上证据 | 先安装空测试钱包；资金动作需具体授权 |
| 源码/手机清单 | done本地交付预备 | outputs/PetroCASH源码ZIP与checksum/README/清单 | APK保存后补交付报告，CI源码ZIP在AAB后 |
| 许可/商店/发行 | BLOCKED或todo | Mobile LICENSE仅inspection/study；修改/分发需prior consent；商店图已生成 | 无public Release；仅owner授权当前1天APK后备例外 |

## 交付故障与修复

旧run45367200108触发f3cf0970却checkout/target1c35；Contents:write已生效，创建草稿403。真实小探测自身SHA成功，故修复为build/trigger/target一致，publish脚本校验SHA，拒绝published release。当前先在依赖安装/编译前建立draft，后续进度push不会再触发旧target创建。只读默认token不变，contents:write限草稿job；没有PAT或新secret。native360分钟/compile240分钟，4 ABI/Hermes/R8/native release lint保留。

## 构建 / 秘密边界

Workflow .github/workflows/petrocash-rebrand.yml；小探测petrocash-delivery-probe.yml。Node/Yarn见.nvmrc/packageManager；Java17/SDK36/NDK27.1/CMake3.22.1。3必需secret名称：GOOGLE_SERVICES_B64_ANDROID、MM_INFURA_PROJECT_ID、WALLET_CONNECT_PROJECT_ID。可选未来owner签名名称PETROCASH_KEYSTORE_B64/PASSWORD/KEY_ALIAS/KEY_PASSWORD。值禁止进chat/Git/日志/产物白名单。CI仍公用TEST钥匙，owner私钥仅Mac外部目录。

无keyring/SRP/vault/加密/签名/审批源修改；source guard检查敏感文件、7个签名host/2个public key和权限。仅petrocash://别名归一到原router，HTTPS签名host不重映射。不删上游功能。完整snapshot只在work/petrocash-rebrand/blocked-flags；旧本地47fcc9f5含完整flags，禁止push且非公开分支祖先。无public Release；1天APK artifact白名单仅APK/public verification metadata，禁止配置和私钥。

已手动禁用3个登记上游workflow：create-bug-report.yml、merge-previous-release-branches.yml、petro-wallet-baseline.yml。其它YAML保留，未登记不称手动禁用；新probe为owner明确授权。默认token只读，PR创建/批准关闭。

## 当前证据与限制

相关CI sourcece55与完整回归source4354564的app/android/ios/locales/package/lockfile/brand/scripts完全一致；后续15d21f0b只在app下改变2个*.test.ts，无运行时改变。完整单测原上游10skip/1todo；后续3skip恢复并云端229断言PASS（与完整计数重叠，不直接累加）。剩余Earn4/BridgeView1/Perps helper2显式skip和FadeInView1todo未改，不能称PASS。

源码ZIP PetroCASH-source-ce55e771.zip：SHA256 e33ed1647df8dc571cb1296caa54523e099d915a91ce1fce613c95de933a6742，110202494 bytes，19466 tracked blob逐项一致。Git archive不含ios/branch-ios-sdk submodule内容，锁定615267ea0b44bc3be657b84fbc9ff7c86688fa58；README已说明；无owner私钥/密码/full flags路径。

新APK source-map报告目前保留在runner build/petro/reports/bundled-modules.json但未在交付白名单，不能凭sourceCount/字符串未命中证明包排除。native1.0.0可能影响上游minimumVersion flags；未降低/绕过安全门槛，私有fork后需版本/flags策略。网站/法律页/自有HTTPS绑定及Firebase真实注册未完成；Segment/Sentry禁用配置不等于已做设备流量抓包。

## 下一里程碑

可靠APK交付→手机测试→私有仓库→完成剩余品牌/自有服务身份→功能→获许可后的发行。初始upstream a3251559c8af381b7b9689dd49d3dce8d5f76261；基线c51abcebdb3ddc67de1e78bdcf8a44f225495240。详细历史/决策见Git、docs/DECISIONS.md、docs/PLAYBOOK-zh.md和docs/rebrand/evidence/。

精确恢复消息：继续。先读docs/PROGRESS.md和HANDOFF.md。完整回归45388166315和补充测试45392919611已PASS，不重做。检查APK run45386233779/draft456690358，下载实际文件做SHA256/apksigner/aapt校验并交付链接；草稿失败用1天artifact。不要启动第二次原生编译。完成后更新三份记录和PLAYBOOK并push，仅codex/petrocash-rebrand，永不main/secret/public Release。
