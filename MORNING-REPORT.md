# PetroCASH 当前交接报告

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
