# PetroCASH 决策记录

## 2026-11-24 / M1

1. 最新用户消息与附件授权在新分支自主 rebrand，取代此前“只审计、不改应用”的阶段限制。只操作 codex/petrocash-rebrand；保留旧基线和 main。
2. 用户最新提供的 logo 优先于附件“自行设计 logo”的默认要求：原图是品牌母版，派生图严格保持原资源像素尺寸；额外插画原创生成，不复用狐狸。
3. Android applicationId org.petrocash.wallet；flask 通过现有 .flask suffix 派生。保留 io.metamask Java namespace、内部类/文件路径、RN 注册名和 @metamask 包，避免破坏桥接。
4. 快速验证构建优先，独立于长检查；APK 校验并上传后才构建 AAB。全检查在 [full-checks] 提交或手动 dispatch 运行，不把 skipped 当 PASS。
5. 无 Segment owner key 时跳过 createClient，避免缺 key 仍请求设置 CDN。Sentry 继续保留原 missing-DSN guard。不会注入第三方 analytics keys。
6. 派生 Firebase client 只在构建子进程内替换包名，保留原项目配置信息；不是注册真实 Firebase app，也不是生产方案。配置不写 Git，不上传配置/钥匙。
7. 本地没有 gh 可用，连接器没有 secrets 写入工具。先使用 TEST 上游公开证书；稍后生成本地新钥匙并提供 owner clipboard 脚本。不得把私钥放入 CI artifact 或公有 Git。
8. 当前 LICENSE 仅授予有限检查/学习权利且限制复制、修改和分发；附件中的 10,000 MAU 说法不能套用到这个 Mobile 提交。保留 LICENSE，不声称商业发布已授权。Grotzec 有单独排除条款；从打包和使用处替换为已含的 Inter，并保留版权记录。
9. 模拟器/真机、钱包与 Polygon 实际验收不能用 mocked 测试替代。不得生成生产钱包，不使用真实资金；有资金的交易仍需具体授权。
10. caffeinate -dimsu 已启动；不修改系统电源设置。若重启会话需核对进程并重新启动。

## M2 / owner RESUME correction

- 进度事实以docs/PROGRESS.md为入口，每子步骤更新三份交接记录并push，约30分钟内保存，长CI前先push。
- Root Mobile LICENSE grants inspection/study only; modification, derivative works and distribution need ConsenSys prior consent. Commercial launch is not authorized. Owner决定前：no public Release, no public distribution of APK/AAB, drafts only。公开Actions artifact也不能当私密渠道，下次native前调整。
- 三项critical的lockfile候选版本已安装、audit不再报告这些ID，但全量回归未通过前只记candidate fix。
