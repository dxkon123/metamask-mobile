# PetroCASH 进度 / continuation checklist

更新：2026-11-24 22:30 +08。仅codex/petrocash-rebrand，永不main。每子步骤更新本文件/HANDOFF/MORNING并push；跳过done。详细交付事实见docs/rebrand/DELIVERY-REPORT-zh.md，历史在Git。

## 当前准确继续点

**APK已成功交付并独立校验，不要重跑CI。** run45405350978 / source7df8638619afcb06f6acbe8d09bd7a41fa5bfe36，arm64 dev TEST/R8关闭。APK已下载至workspace outputs/PetroCASH；private draft456815401保存APK、源码及校验记录。原run45386233779自然失联FAIL，未被本代理取消，已无另一轮需取消。

APK SHA256：29fdc0d4dffba2724c263705b0fada9316d18fa30def3773a4e5d7fea40ea9b7。
包名org.petrocash.wallet，1.0.0/code1，公用TEST证书6f9f444af1cb1ff7c0d7791af2e775fddf4d48900642647640e225783554ecf9。下一动作是owner手机测试及反馈；真机/WAL/POL未执行，不称无bug或生产可用。

| 项目 | 状态 | 证据 / 下一动作 |
| --- | --- | --- |
| owner logo / SSOT / 包名版本 | done当前候选 | 实物APK label PetroCASH/org.petrocash.wallet/1.0.0(1)；launcher前景目视正确 |
| 初始盘点 | done | 8642文本/999媒体；技术标识/协议/版权保留，最后全媒体目视仍待 |
| 原尺寸资产 | done生成及尺寸 | 105native+54app=159原尺寸；真机主题/裁切检查待 |
| 文字 / Inter / 主题 | done当前源码与回归 | 23语言；APK Inter存在、Grotzec排除；原icon字体技术名保留 |
| 原创动效 / Rive可切换 | done三处实现/单测 | BrandMotion替换三处Fox装饰，legacy Rive保留；设备视觉/FPS及其他Rive媒体待 |
| dApp / scheme | done源码/单测 | WC/EIP6963名PetroCASH；仅petrocash://归一原router，签名域名/公钥原值保留；实际OS/WC配对待 |
| 小交付探测 | done PASS | 45382420486/412735fc：自身SHA draft创建/上传/下载比较/删除PASS；1天artifact PASS |
| 首次丢失APK | 历史FAIL | 45367200108：编译/验证PASS，旧target草稿403未保存；已修SHA一致与fallback |
| 第二次原生运行 | 已终止FAIL | 45386233779：runner lost communication，1h55m9s；不是代码编译错误或已证实OOM，无APK |
| 恢复APK | done PASS / 已保存 | 45405350978，44m55s；dev显式arm64/R8关闭，16GB新增swap、早清磁盘、5分钟stdout心跳；不重复质量、不构建AAB |
| APK独立验证 | done PASS | 下载hash=CI；apksigner v2；aapt身份；无旧provider冲突/无sharedUID；权限归一差异0；16KB ZIP及44个ELF对齐PASS |
| 源码ZIP | done保存及核对 | CI SHA4b575e8f716ad08162dfa884f701eed45e60cb64536a8dbc544b7446ee8bd98b；19471 blobs符合Git/EOL规则；iOS submodule另初始化 |
| 完整lint / TSC | done PASS | 45388166315，4lint/TSC；候选亦PASS，恢复不重跑 |
| 完整unit | done PASS，未执行另列 | 45388166315：5932套/90732断言/111快照PASS，0FAIL；10skip+1todo不计PASS |
| 相关 / 漏项修正 | done PASS | 62套1643断言；补充45392919611两文件229断言0skip/0todo+lint/TSC PASS；恢复3遗漏，仍7上游skip/1todo |
| 三critical | production跟踪仍open | 当前21361个Metro源路径三个包均0；proxy2.0.8/shell1.11/1.12已补丁；tar工具链仍6.2.1，需专门升级验证 |
| flags / telemetry | done授权部分 | 仅38布尔参考；上游复杂fetch/安全门槛保留；Segment/Sentry缺配置guard，native Sentry auto-init=false，WCtelemetry false/OTA关闭 |
| 完整flags | todo私有仓库后 | **add full flags after moving to a private repo**；full snapshot只本地，旧47fcc9f5禁止push |
| Firebase / 自有站点 | 测试workaround / OPEN | 真实包名证书app、OAuth/push/attestation/HTTPS/法律页未注册部署；1.0.0与远端minimumVersion需私有fork策略 |
| 签名 / 许可 | TEST / BLOCKED正式发行 | owner私钥未进CI；Mobile LICENSE门禁未解除，无public Release |
| phone / WAL / POL | NOT RUN / BLOCKED | 下一具体动作：PHONE-CHECKLIST-zh.md；无真实配对/链上/资金交易授权证据 |

## 固定安全与构建边界

不改keyring/SRP/vault/加密/签名/审批；source guard核对保护源、原签名host/public key、权限及上游文件未删除。内部io.metamask namespace、RN注册名、原功能/协议及版权保留。原Rive可切换。没有新第三方SDK或新权限；实际设备egress未抓包，不称零发送。

Workflow .github/workflows/petrocash-rebrand.yml，Node/Yarn固定见.nvmrc/packageManager；Java17/SDK36/NDK27.1/CMake3.22.1。[android-recovery]只触发android dev TEST arm64/R8 off；非dev用fast属性会拒绝，正式默认R8及四ABI保留。质量已PASS，不因文档push重复跑。

3必需secret名称仅GOOGLE_SERVICES_B64_ANDROID、MM_INFURA_PROJECT_ID、WALLET_CONNECT_PROJECT_ID。未来owner签名secret名称PETROCASH_KEYSTORE_B64、PETROCASH_KEYSTORE_PASSWORD、PETROCASH_KEY_ALIAS、PETROCASH_KEY_PASSWORD，当前未消费。绝不打印或提交值/owner私钥/full flags。旧本地47fcc9f5非公开祖先且禁止push。

默认GITHUB_TOKEN只读，PR创建/批准关闭；contents:write限草稿job。已手动禁用登记workflow：create-bug-report.yml、merge-previous-release-branches.yml、petro-wallet-baseline.yml；其它源YAML保留，未登记不称已手动disabled。probe由owner明确授权。两草稿未发布；本次上传成功，1天公开APK后备未触发。

## 故障结论与证据位置

旧403：trigger/check-out/target不一致，Contents:write已生效；自身SHA真实probe成功，改为统一SHA并提前创建草稿后解决。后续runner失联：只确认GitHub失联错误，CPU/RAM/网络根因未知。恢复版心跳实际观察到available8021MiB、swap0/19455MiB、disk66GiB；最终成功。失联时job根状态failure但step可仍in_progress，监控以job/run为准。

evidence/full-regression.json、related-validation.json、upstream-test-completion.json、android-recovery.json、verified-apk.json、ci-artifact-metadata.json、verified-source.json及native-library-inventory.json。与upstream差异362条见rebrand/CHANGED-PATHS-7df86386.txt。完整模块摘要针对本次APK；它不是完整 exploitability 审计。

里程碑：已验证APK→手机反馈→私有仓库→完整flags/剩余品牌与自有服务→功能→许可与生产签名后的发行。

精确恢复消息：继续。先读docs/PROGRESS.md、HANDOFF.md、MORNING-REPORT.md。45405350978的APK与源码已交付并独立验证，不重跑CI。根据手机反馈处理首个可复现问题；WAL/POL仍BLOCKED，私有仓库/完整flags/生产签名/许可未完成。每步更新并push，仅codex/petrocash-rebrand，永不main/secret/public Release。


## 草稿说明最终同步（2026-11-24 22:40 +08）

已通过owner登录页面更新草稿456815401说明，并独立API确认draft=true、target=7df8638619afcb06f6acbe8d09bd7a41fa5bfe36、11个附件及APK/源码digest不变。GitHub保存草稿会更换untagged临时入口；当前为[交付草稿](https://github.com/dxkon123/metamask-mobile/releases/tag/untagged-684d28d7a0b84b80be5f)。附件报告是CI源码时刻快照，最新状态以分支DELIVERY-REPORT/HANDOFF为准；未发布或删除任何产物。停点：交付完成，等待owner空钱包手机测试，继续时不重跑CI。
