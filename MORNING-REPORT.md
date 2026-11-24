# PetroCASH 当前交接报告

更新：2026-11-24 22:30 +08。分支codex/petrocash-rebrand，永不main。**本次APK及源码已交付并独立验证，不再等待CI。**

## 交付

[成功run45405350978](https://github.com/dxkon123/metamask-mobile/actions/runs/45405350978)，source7df8638619afcb06f6acbe8d09bd7a41fa5bfe36，Android job44m55s。仅arm64-v8a，dev TEST/R8关闭；原生Release/Hermes及公用测试签名保留。此前完整/相关/补充质量已PASS，未重跑。

[未发布草稿](https://github.com/dxkon123/metamask-mobile/releases/tag/untagged-684d28d7a0b84b80be5f)保存APK、源码、校验资料，无public Release。Mac workspace outputs/PetroCASH有同一CI下载文件和最新报告。
APK：PetroCASH-TEST-1.0.0.apk，221124611 bytes，SHA256 **29fdc0d4dffba2724c263705b0fada9316d18fa30def3773a4e5d7fea40ea9b7**。
包名org.petrocash.wallet，1.0.0/code1，TEST cert SHA256 **6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9**，官方apksigner验证v2 PASS；不是owner生产钥匙。
CI源ZIP SHA256 **4b575e8f716ad08162dfa884f701eed45e60cb64536a8dbc544b7446ee8bd98b**，全部19471 tracked blobs符合Git及声明EOL规则，iOS submodule另初始化。

独立复核：本地hash=GitHub/CI；aapt label/ID/version/仅arm64正确；无新增权限/旧namespace provider冲突/sharedUID；启动类在DEX；bundle存在；Inter有/Grotzec无；APK提取logo目视正确；ZIP和44个ELF的16KB对齐PASS。native Sentry auto-init=false。当前bundle graph21361源路径，三原始critical包均无匹配。详见DELIVERY-REPORT-zh.md与evidence。

## 质量和故障结论

完整45388166315：4lint/TSC、10unit PASS，5932套90732断言111快照，0FAIL。原10skip/1todo另列；补充45392919611两文件229断言0skip/0todo+lint/TSC PASS，恢复3漏项，仍7上游skip/1todo；补充与全量有重叠，不直接累加。相关62套1643断言PASS。

原45367200108 APK丢失因草稿403；小probe45382420486验证并修复统一SHA/preflight及一日后备。原45386233779在1h55m9s后runner lost communication FAIL，不是本代理取消，具体资源/网络根因未知；已无另一live run需取消。恢复模式清理临时VM、加swap、每5分钟stdout资源心跳后成功，不据成功反推已证实OOM。

## 准确停点与下一步

已完成交付，下一步 **owner用PHONE-CHECKLIST-zh.md做空测试钱包真机测试并反馈**。没有执行手机安装/真实WC配对/Polygon链上验收，所以WAL/POL仍BLOCKED，不能称无bug。公用TEST证书/R8 off仅本次测试；生产签名/许可未关。tar工具链6.2.1仍open，其他安全跟踪见SECURITY-REVIEW。完整flags仅本地，待迁私有；版本门槛/Firebase真实注册、自有站点/剩余媒体视觉仍待。

## 精确恢复消息

继续。先读docs/PROGRESS.md、HANDOFF.md和docs/rebrand/DELIVERY-REPORT-zh.md。45405350978的APK与源码已交付并独立验证，不重跑CI。根据手机反馈复现并修首个问题；WAL/POL仍BLOCKED，私有仓库/完整flags/生产签名/许可未完成。每步更新并push，仅codex/petrocash-rebrand，永不main/secret/public Release。


## 草稿说明最终同步（2026-11-24 22:40 +08）

已通过owner登录页面更新草稿456815401说明，并独立API确认draft=true、target=7df8638619afcb06f6acbe8d09bd7a41fa5bfe36、11个附件及APK/源码digest不变。GitHub保存草稿会更换untagged临时入口；当前为[交付草稿](https://github.com/dxkon123/metamask-mobile/releases/tag/untagged-684d28d7a0b84b80be5f)。附件报告是CI源码时刻快照，最新状态以分支DELIVERY-REPORT/HANDOFF为准；未发布或删除任何产物。停点：交付完成，等待owner空钱包手机测试，继续时不重跑CI。
