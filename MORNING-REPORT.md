# PetroCASH 当前交接报告

## 当前权威继续点（2026-11-24 19:58 +08）

旧轮次记录仅是历史。当前APK run45386233779/source ce55e77174ca5128c19c98868a9defe86f47c684，4lint/TSC/62套1643相关断言均PASS，native job138421900226正编译。其private preflight PASS；draft456690358已创建未发布，后续同run直接上传到既有draft，失败后备1天artifact。尚无新APK下载/hash，不可虚报。

完整回归run45388166315/source4354564ab2c279fb6aa5744de07102bc6cde58ac并行中；checkpoint不会第二次编译。应用/原生/依赖树与ce55相同，只有报告和workflow注释变化。下一步：收集全套真实结果；APK保存后独立SHA/apksigner/aapt校验再给链接；无需等AAB。

精确恢复消息：继续。先读PROGRESS当前权威继续点，检查45386233779的APK交付和45388166315的完整回归。不要重做已PASS的探测和相关测试，不要重复启动Android编译。下载真实APK独立验证SHA/包名/签名并交付；全量若失败修真实问题。每步更新三份记录和PLAYBOOK并push，仅codex/petrocash-rebrand，永不main/secret/public Release。

更新：2026-11-24，Asia/Kuching。分支codex/petrocash-rebrand，禁止main。

已确认：run45367200108的APK编译1h03m46s和签名/ID/bundle验证PASS，但草稿创建403，旧APK没有保存、没有下载链接或可确认checksum。source1c35f1f5；triggerf3cf0970。

交付已先做真实小测试：run45382420486，412735fc，草稿创建→小文件上传→下载校对→删除全部PASS，之后release列表为空。一日artifact14914851383 PASS，过期2026-11-25T11:15:28Z。修复60f1f870已推送：构建/草稿统一触发SHA，草稿失败后在AAB前保留1天APK artifact，校验必须要求“APK验证+至少一个保存渠道”均通过。没有提升全局token权限，没有新增secret/PAT，没有main改动。

当前停在：源码/相关断言修复与原创动效合约复查，尚未重跑native。旧全量单测5929套中54FAIL/123失败断言；lint1/2PASS，lint3/4各一规则错误，TSC因production/test host折叠造成重复键。已恢复原签名域名/保留验证实现，新增自有scheme纯别名；修复regex与支持URL，审查文案/字体/颜色断言。下一CI只跑全部62相关套件的--runTestsByPath，另跑完整4lint/TSC，不跳过。新品牌本地4套40断言PASS；真实设备视觉/FPS/WC/Polygon均未执行。

待交付：新的可下载APK及SHA256/org.petrocash.wallet/证书复核、sourcezip、手机测试清单。CI仍TEST公开开发证书。三critical只有候选补丁和audit证据，真实回归待完成；WAL/POL BLOCKED；许可/生产签名/Firebase/self-hosted法律页和域名服务是发行门禁。完整flags不得公开，迁移私有repo后再接入。无public Release；owner只明确允许当前1天artifact后备。

精确继续消息：继续。先读docs/PROGRESS.md和HANDOFF.md，核对最新远端/CI。从62套related测试及完整lint/type的未完成项接着修，通过后构建同一触发SHA，先确保APK保存，再验证hash/包名/签名并给下载链接。每步更新三份记录与PLAYBOOK并push，永不推main或显示secret。

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
