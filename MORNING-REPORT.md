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
