# PetroCASH 当前交接报告

## Owner批准并行恢复构建（2026-11-24 21:36 +08；优先于此前“只等待”）

保留45386233779，同时新[android-recovery]仅android、不重跑已PASS的质量检查；arm64-v8a，dev TEST关闭R8，正式默认保持R8。job加入显式早期磁盘清理、构建前16GB swap与5分钟stdout资源心跳。完整源码/锁文件/原生脚本相同但本轮过长且12:52:08Z后无输出，资源卡住仅为待证假设；heartbeat用于区分耗时与停滞。两轮哪个先保存并验证APK就用哪个，之后取消另一轮。新模式跳过AAB，APK优先；包名/签名/身份检查及1天后备保留。

本地验证：workflow YAML+29段bash -n PASS；metadata4个fixture（合法arm64、拒绝额外ABI、拒绝错包名、默认R8 metadata）PASS。未重复Jest/TSC/lint；仅构建配置和public metadata变更，无app运行时/密钥/审批修改。new metadata保存同build的module count/3包匹配摘要（不含sourceContents或全量sources），解决原报告只留runner的问题。最终仍需实际APK验证。

更新：2026-11-24 20:30 +08。分支codex/petrocash-rebrand；所有完成的改动已通过分支checkpoint保存，永不main。

## 已完成

- 旧run45367200108编译/验证PASS但草稿403、文件丢失。先用小run45382420486真实验证草稿创建→上传→下载比较→删除PASS；1天artifact亦PASS。统一build/trigger/target SHA并提前private preflight，APK草稿失败自动1天artifact保存，先于AAB；无权限扩大/PAT/secret显示。
- 当前候选sourcece55e77174ca5128c19c98868a9defe86f47c684，run45386233779。完整4lint/TSC、62相关套1643断言PASS；private preflight PASS、未发布draft456690358已建。
- 完整回归run45388166315/source4354564：4lint/TSC与10unit全PASS；5932套、90732断言、111快照PASS/0FAIL；10上游skip和1todo不计PASS，原coverage保留。应用/依赖与ce55一致。
- 后续run45392919611/source15d21f0b修复3项上游测试遗漏：Bridge it.only移除，BigNumber fresh registry验证完整配置不污染。2文件229断言0skip/0todo、scoped lint及完整TSC云端PASS。与全量有重叠，不直接累加；其余7skip/1todo仍开放。不改运行时代码。
- 精确ce55源码ZIP、checksum、submodule说明、手机清单已备妥在outputs/PetroCASH。SHA256 e33ed1647df8dc571cb1296caa54523e099d915a91ce1fce613c95de933a6742。19,466个tracked blob匹配；不含iOS submodule内容/owner私钥/密码/full flags。

## 当前准确停点

**APK仍在当前同一run原生编译**，UI见4ABI CMake进度；未保存新APK，尚无可报告APK hash或下载链接。不要把preflight.txt当产物，不要重跑一小时构建。下一步等待APK→草稿/一日后备保存→独立SHA256/aapt/apksigner/版本/包名/权限/bundle检查→交付链接；AAB随后进行。

## 尚未关闭

公用TEST签名、真机安装和全部视觉/生命周期/FPS、WAL/POL实际验收、生产Firebase/HTTPS/自有服务、1.0.0与上游版本flags策略及许可发行。3 critical候选不能称生产关闭：proxy-addr2.0.8/shell-quote1.11/1.12已候选升级；tar7.5.19但工具链仍6.2.1；新source-map排除证据未上传。详见SECURITY-REVIEW.md。保留上游7skip/1todo，不称无bug。无public Release；full snapshot只本地，迁私有后再接入。

## 精确继续消息

继续。先读docs/PROGRESS.md和HANDOFF.md。检查原45386233779与arm64恢复45405350978；用先保存并独立验证的APK，交付可用后取消另一轮。完整45388166315和补充45392919611已PASS不重跑，不启动第三轮。验证hash/org.petrocash.wallet/签名并给链接，每步更新三份记录和PLAYBOOK并push，仅codex/petrocash-rebrand，永不main/secret/public Release。

## 原生长编译观察（2026-11-24 21:25 +08）

当前45386233779仍in_progress；最新刷新并开启时间戳的日志停在12:52:08Z Kotlin/Java输出，暂无失败，无法读取实时CPU/资源来确认静默原因。git diff证明当前ce55与已成功编译的1c35在android/package.json/yarn.lock/.yarn/patches/scripts/build.sh/scripts/rebrand/build-android.ts完全无差异；workflow的8GB Metro、2 workers、native内存设置亦未改。不能从静默就判断品牌代码错误，也不能声称构建健康。暂保留同run，不取消或平行启动第二个一小时编译；继续等实际产物/错误。运行中job日志下载404 BlobNotFound，表示日志blob尚不可用，不是新的repo权限403。

## 并行恢复已启动并完成预检（21:39 +08）

新run [45405350978](https://github.com/dxkon123/metamask-mobile/actions/runs/45405350978)，source **7df8638619afcb06f6acbe8d09bd7a41fa5bfe36**，android job138484436260；其余quality/test-completion job按要求SKIPPED，复用已有PASS而非重跑。新draft **456815401** target精确7df，private preflight PASS，早期磁盘清理PASS，依赖安装中，尚无APK。原run45386233779仍继续，未取消。新run提交后没有提前移动head，先确认preflight已建立才推本条记录。

精确恢复消息（以此为准）：继续。检查原45386233779与arm64恢复45405350978，两轮哪个先保存APK就下载并独立验证hash/org.petrocash.wallet/签名；验证交付可用后取消另一轮。质量45388166315和45392919611已PASS不重跑，不启动第三轮。先读PROGRESS/HANDOFF，逐步更新并push，永不main/secret/public Release。
