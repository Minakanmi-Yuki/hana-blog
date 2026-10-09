# Paper Deep Dive 全量审校记录（2026-09-22）

范围：143 篇现有中文文章；已完成逐篇来源核验与正文修改 143 篇。

审校先纠正事实、公式与实验口径，再补充核心机制、训练与推理流程、消融解释和结论边界。逐篇对照论文正文、附录及可获得的官方代码或项目资料；来源版本和未解决的问题列在下方。

所有文章保留原有路径、封面与正文图片，更新日期统一为 2026-09-22。本次修改中文正文，未新增英文译文。论文报告值、公开实现与分析推断分别标为 `【Paper】`、`【Code】`、`【Analysis】`。这是文献和实现静态审校，未重新训练模型或重跑机器人实验。

## 代表性修正

- X-VLA：修正 LIBERO / RoboTwin 表格列错位；区分论文速度场背景与公开实现的干净动作预测。
- WAM / VLA 鲁棒性对比：发现 RoboTwin 总分混用含原始场景的八列均值与七类扰动均值；保留报告值并给出统一口径的复算，撤回确定性排名。
- ViVa、WSA₁ 等：分别解释论文公式、公开训练目标和推理配置，明确原文与实现不一致之处。
- ACT、RL 与跨本体方法：补充训练标签、时间集成、奖励/价值与策略更新之间的实际关系，收窄未经实验支持的泛化或因果结论。

## 验证

- `npm run check`：通过，0 errors、0 warnings；另有 148 条仓库提示。
- `npm run build`：通过，143 篇对应的中文文章页面均生成。
- 143 篇 MDX 编译通过；5,229 个数学片段通过 KaTeX 解析，成品 HTML 未发现 `.katex-error`。
- 143 篇文章通过 Prettier 检查，`git diff --check` 通过。
- 覆盖核验：143/143 篇均有审校记录、实质内容修改与更新日期；722 个原有正文图片引用、143 个封面和全部路径保留。
- `npm run lint:check`：未通过，56 个错误分布在 22 个本次未改动的代码文件中，主要是 `any`、未使用变量、全局对象与现有类型抑制写法；不属于文章 MDX 内容检查。
- 构建仍显示现有依赖、Node 运行时和英文内容缺失等提示；本次未修改相关配置。

## 逐篇修改

| 文章                                                                                                                    | 状态   | 本次修改                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [a1](../../src/content/blog/paper-deep-dive-a1/index.mdx)                                                               | 已审校 | 纠正FM文稿内部符号冲突、噪声方向和warm-start的时间重置含义；指出正文与附录学习率差异、区分warmup与冻结时长；修正缺失LaTeX反斜线、补充quantile条件概率问题；恢复附录A实际局限，限定LIBERO-Plus无early-exit证据和小样本迁移结论                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [a2a](../../src/content/blog/paper-deep-dive-a2a/index.mdx)                                                             | 已审校 | 区分共享latent与encoder权重、记录论文L1和代码MSE差异；明确线性路径监督速度及潜空间塌缩/IC机制；纠正per-step亚毫秒时延被写成6-step总延迟；限定ACT缩小参数对比、30与200epochs实验口径及固定条件确定性                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [ace-ego-0](../../src/content/blog/paper-deep-dive-ace-ego-0/index.mdx)                                                 | 已审校 | 区分统一pose布局与delta action执行，补充平移增量坐标变换；纠正人类平滑目标插值、二阶差分被称作jerk及归一化权重的含义；区分等权人类监督消融与robot-only，限定190K步和Hard混合训练口径；修正三处图号，去除未经证实的投稿venue和安全保证用语                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [act](../../src/content/blog/paper-deep-dive-act/index.mdx)                                                             | 已审校 | 补充leader动作标签与follower状态为何不能互换；纠正decoder并行非自回归、代码learned query与论文fixed query差异；明确temporal ensemble旧预测权重大及闭环chunk不保证降低真实调用次数；限定CVAE训练多模态和确定性部署、补充糖果多次重试协议                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [actioncodec](../../src/content/blog/paper-deep-dive-actioncodec/index.mdx)                                             | 已审校 | 区分VLM无机器人预训练和tokenizer已有机器人预训练；解释确定性VQ条件熵为零、扰动proxy不是原条件熵及结构不等于统计独立；补齐RVQ decoder复制回VQ机制与KI连续推理分支；纠正SO100 w/o CT不是纯task-only并补动作吞吐与闭环频率差异                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [adaptive-action-chunking](../../src/content/blog/paper-deep-dive-adaptive-action-chunking/index.mdx)                   | 已审校 | 删除全文/附录找不到的60.6和62.5消融数字；解释前缀均值差分的精确意义及低熵不保证长chunk；补充magnitude未过阈值强制16和预测/执行horizon区别；限定安全案例结论、纠正采样时延和非单调收益，修复pi LaTeX；核对help_function.py：复合四元数转换axis-angle后才计算净转角，纠正原误读                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [aim](../../src/content/blog/paper-deep-dive-aim/index.mdx)                                                             | 已审校 | 删除不存在的去value-map/mask消融结论，保留Stage1对照并限定归因；区分接触热图与价值函数/成功概率，latent接口与硬信息瓶颈；明确GRPO clipped目标最大化、连续流likelihood与组内采样细节缺失；解释黑图先验与高斯latent初始化表述并修复公式；核算Table1：Stage1 Hard逐行平均92.1与汇总92.0不一致，标记而不篡改论文原报告                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [aspire](../../src/content/blog/paper-deep-dive-aspire/index.mdx)                                                       | 已审校 | 重写推理算法，区分固定程序测试、BEHAVIOR逐块生成和Long无重试零样本协议；补充独立程序选择seeds66–80和消融中引擎+技能库的混杂因素；区分论文文本技能库与JSON按次数晋升辅助实现；澄清初始人工模板；说明N为源任务数、逐任务非单调和真实token首成功/预算终止统计                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [bagel](../../src/content/blog/paper-deep-dive-bagel/index.mdx)                                                         | 已审校 | 澄清MoT共享attention计算而非QKV权重及active参数/FLOPs口径；区分两套generalized causal mask和文本缓存，补双条件CFG与49积分区间事实；标记IntelligentBench闭源模型拒答分母、原始GenEval持平以及Self-CoT额外计算；区分world-model微调定性样例与实体导航，解释涌现曲线的训练recipe混杂                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [bagelvla](../../src/content/blog/paper-deep-dive-bagelvla/index.mdx)                                                   | 已审校 | 纠正图像/动作flow时间方向并展开RFG latent残差目标与防泄漏mask；标出正文/附录数据规模、实机chunk和VAE时间标注不一致；纠正40/72Hz为动作吞吐非视觉闭环，分离A800消融与5090实机口径；补CALVIN五任务链及文本规划未启用，planning accuracy为中间状态动作趋势                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [beyondmimic](../../src/content/blog/paper-deep-dive-beyondmimic/index.mdx)                                             | 已审校 | 澄清共享配方而非单RL策略覆盖全部动作，phase实际为参考关节位置速度；纠正VAE编码参考意图而非原动作、补DAgger和OU扰动恢复数据；补25Hz扩散/50Hz跟踪、异步20ms部署与导航避障依赖动捕的重要条件；解释armature/PD增益/失败前向回溯采样，区分sim-to-sim95%与实机展示；修复数学反斜杠并解释奖励权重符号问题及guidance非可行性保证                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [caip](../../src/content/blog/paper-deep-dive-caip/index.mdx)                                                           | 已审校 | 发现并补入已公开官方代码/项目/权重，核验动作格式与checkpoint配置；主结果澄清部分得分不是完整成功率，Franka增益仅LiftPeg两次成功差异；补相对SE3当前局部系、独立时间索引统计、20/30Hz horizon差异；区分pooling预训练监督与下游patch输入，zero-shot检索需要heldout动作原型；恢复论文§6明确局限，纠正L1中位数、saliency异构和固定epoch数据量混杂                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [chatvla-2](../../src/content/blog/paper-deep-dive-chatvla-2/index.mdx)                                                 | 已审校 | 明确 open-world 与预训练/微调监督边界，撤回完全未训练 OCR/方向词的表述；揭示正文与附录训练步数冲突；补评分定义与采集频率口径；将 MoE 公式和层功能解释限定为示意/作者假说；用两阶段消融分离会推理与动作跟随                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [clap](../../src/content/blog/paper-deep-dive-clap/index.mdx)                                                           | 已审校 | 发现并明确论文 KL 方向与官方 reverse_kl 实际实现相反；修正 Task Mean 与扰动均值统计口径；区分 teacher forcing 训练标签与推理输入；解释 EMA 人类 pseudo-positive 的物理锚点与不能保证之处；补 v2 训练超参数、定制人类视频来源、修正图号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [cogact](../../src/content/blog/paper-deep-dive-cogact/index.mdx)                                                       | 已审校 | 补全 AAE 权重归一化，解释弱加权不能保证模式分离及窗口口径差异；纠正 MSE 排版平方与 cognition token 实际特征提取机制；澄清 Realman 71.2% 为复合阶段均值、指出原文 Franka Octo 均值不一致；限定 scaling 结论并给等参数架构证据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [cosmos-policy](../../src/content/blog/paper-deep-dive-cosmos-policy/index.mdx)                                         | 已审校 | 澄清统一架构与规划双 checkpoint，当前/终点观测非完整视频；解释经验回报、混合策略分布与majority-mean风险边界；细分累计消融18.1百分点对应最后去future-state步骤；补真机阶段评分、OOD实际落后和控制器/推理刷新频率区别                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [cot-vla](../../src/content/blog/paper-deep-dive-cot-vla/index.mdx)                                                     | 已审校 | 修复全文丢失反斜杠的LaTex；纠正动作损失无效重复求和并补视觉目标h_j条件；澄清full-attention查询token避免误解标签泄漏；指出LIBERO原表81.13均值与四列83.925不一致；限定oracle五次试验结论、任务分别微调与目标horizon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [ctrl-world](../../src/content/blog/paper-deep-dive-ctrl-world/index.mdx)                                               | 已审校 | 纠正15控制步对应5未来帧及7+5实际输入；区分论文示意扩散和源码EDM预条件加权目标；补两层MLP关节adapter决定proprio反馈；限定排序/拟合斜率与相关系数，给Close-laptop失败实例；补复合均值、改进仅指令跟随与推理单卡边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [dexumi](../../src/content/blog/paper-deep-dive-dexumi/index.mdx)                                                       | 已审校 | 纠正86%为五个任务最终阶段平均；阶段概率分母明确；修正软件消融原先同时改变触觉变量的比较；纠正10Hz动作频率≠10Hz模型推理，补时间戳和虚拟电机参考状态；区分采集变量与策略条件，代码不默认使用本体状态；补双层运动学优化、合成遮挡前提、跨手型非零样本及采集吞吐成本；纠正四个图号与数学格式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [diffusion-policy](../../src/content/blog/paper-deep-dive-diffusion-policy/index.mdx)                                   | 已审校 | 重写标准DDPM训练与带噪score公式，说明score不等于其二阶梯度；明确执行动作索引对齐、因果attention非自回归采样；纠正46.9%汇总选模口径、22初态评估bug、非固定架构全胜；揭示Kitchen 213%与表格125%冲突；区分官方两条视觉encoder pooling路径及真机重规划频率；限定预训练消融结论                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [dp3](../../src/content/blog/paper-deep-dive-dp3/index.mdx)                                                             | 已审校 | 纠正论文H4执行3与当前代码H16执行8混淆；厘清论文噪声公式与sample prediction实现冲突并重写DDIM公式；补最高5检查点评估、100示教例外与HORA非二值指标；补视角测试手动点云变换/crop及每条件单次评估；解释PointNet T-Net/BatchNorm消融避免过度概括；补v7杂乱场景实验和安全0/40限定                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [dreamcontrol-v2](../../src/content/blog/paper-deep-dive-dreamcontrol-v2/index.mdx)                                     | 已审校 | 分离生成器采样与任务专用RL部署，移除推理算法内在线生成；揭示263维描述算术不一致并保留实现不确定性；修正SMPL argmin参数/关键点混淆；细化自动过滤仍需任务成本与无物理保证；明确自动DreamControl基线、公平对照和数据覆盖≠纯规模；补promptcalib任务/评估集口径与真机仅演示、奖励定义                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [dreamvla](../../src/content/blog/paper-deep-dive-dreamvla/index.mdx)                                                   | 已审校 | 纠正动态分支不是预测二值mask而是mask加权未来视觉重建；纠正两组query是两相机视角不是当前/未来；核实action可读取worldquery，非全query互相禁止；揭示代码深度SiLog与语义cosine和论文MSE/InfoNCE不同；补正文附录超参矛盾及分阶段预训练；明确20次尝试真机口径、CALVIN累计概率、非反事实世界模型；补91ms延迟分解                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [dreamzero](../../src/content/blog/paper-deep-dive-dreamzero/index.mdx)                                                 | 已审校 | 区分论文/代码flow时间方向、历史仅缓存视频与伪代码漏1-beta；限定6.6秒记忆和5FPS采样，修无限历史主张；补2GB200部署硬件与Flash实际9百分点损失；纠正DROID49%为unseen子集及scratch非随机初始化；细化video-only仍原动作混训/已见目标视频/九任务指标；纠正denseaction监督错误及unseenverb不等于全新运动；限定AR/BD同分、扩展趋势非scalinglaw与失败仅案例；更新官方训练脚本路径和14B维度配置                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [dust](../../src/content/blog/paper-deep-dive-dust/index.mdx)                                                           | 已审校 | 纠正FLARE分类和Code标签，澄清双向条件依赖不等于因果识别；补充初始化、计算预算、部分完成评分和RTX5090延迟口径；补齐v3未来噪声/关闭视觉/同步采样消融与LIBERO/CALVIN边界；记录GR-1分组的原文冲突并修正文内图号版本说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [dvla](../../src/content/blog/paper-deep-dive-dvla/index.mdx)                                                           | 已审校 | 修正式1错误的1/L为1/t并解释时间权重；区分CoT语义顺序与双向输出块，不虚构严格三阶段解码；解释精确prefix缓存和近似dLLM缓存区别；记录GR00T总分加总错误、trial与动作频率口径及统计边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [dworldeval](../../src/content/blog/paper-deep-dive-dworldeval/index.mdx)                                               | 已审校 | 补充from-scratch与MMaDAVLA初始化冲突并纠正Code标签；区分自动progress评分实验与按生成图像评分的history排名消融；解释progress语义、RMS差分局限、相关性和校准差别；修正5张插图原文编号并明确2HΔ往返长度与可逆性假设                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [ebench](../../src/content/blog/paper-deep-dive-ebench/index.mdx)                                                       | 已审校 | 以v3更新全部主结果/预训练/OOD数据，明确旧图口径；纠正60Hz网络推理误读，补50步预测30步执行；补阶段评分、资产split、episode加权和retention解释；审查跨benchmark预训练对照混杂与能力标签非因果解释                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [egoinfinity](../../src/content/blog/paper-deep-dive-egoinfinity/index.mdx)                                             | 已审校 | 纠正MEMFOF用途与移动物体pose细节，补六状态阈值及刚性绑定假设；解释exo-to-ego是虚拟相机重渲染而非真实头视角恢复；解释flow速度头和等变性适用范围，补真实训练预算；区分源语料127K小时、106片段验证与IK/任务成功，修正数据标签                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [egolive](../../src/content/blog/paper-deep-dive-egolive/index.mdx)                                                     | 已审校 | 纠正总规模第二的错误并补Egocentric-10K；修正示意几何公式事实标签和相机优化变量，区分标注系统与训练模型；删除caption mask输入/内置校验的无来源假设；明确校准板深度不等于全库手关键点精度，t-SNE/词频/四例caption证据限制                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [egoscale](../../src/content/blog/paper-deep-dive-egoscale/index.mdx)                                                   | 已审校 | 纠正54%相对增长为54个百分点并逐项区分完成分数/成功率及非一致收益；指出scaling公式小时单位代入负MSE的不自洽，仅把千小时归一化标为推断；补充腕部SE3/chunk起点、retargeting优化与输入点数冲突、更新模块和传感控制差异；校正Tongs与Bottle试验次数混淆并明确论文自身分母冲突；补充16预测先均值后MSE、无midtraining缩放实验、one-shot每瓶数据和评价口径                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [egosteer](../../src/content/blog/paper-deep-dive-egosteer/index.mdx)                                                   | 已审校 | 区分40任务主实验、10任务基线、4任务DAgger和1K组件消融，补训练预算混杂；澄清世界模型是条件特征训练监督，两专家不互attention，修正teacher/query上采样方向；源码核实损失路径配置、RTC前缀钳制和WM推理路径，区分归一化差异；补动作频率与底层控制差别、AgiBot/Unitree、筛选偏差和9倍吞吐口径；保留并明确论文episodes/蛋糕示范数冲突，纠正图号与80%以上含义                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [egoverse](../../src/content/blog/paper-deep-dive-egoverse/index.mdx)                                                   | 已审校 | 分离数据集总体1362h与主实验8hEV+2hID、任务级共训与通用VLA；补1秒人类/1.5秒机器人重采样100步、CFM积分方向和平台坐标差别；纠正成功率与normalized score混用及OOD含human-seen物体；纠正scene sweep固定预算误读、cup-on-saucer人数反例、MSE图轴单位冲突；核实OT源码监督/无监督分支，仅作为扩展不加入论文算法；纠正v2图号和示范数量                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [evo-0](../../src/content/blog/paper-deep-dive-evo-0/index.mdx)                                                         | 已审校 | 纠正真实57.41%为混合评分宏平均而非75试验统一成功率，补分母；澄清VGGT跨视图上下文、fuser输出形状和3D隐藏特征不等于几何真值；区分fuser轻量与完整VGGT推理成本、策略周期与伺服频率；补15k差异只有1点、训练曲线非单调、horizon局部效应；限定扰动实验单任务独立扰动与实际并列/低成功结果，修复冻结边界自相矛盾                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [fast](../../src/content/blog/paper-deep-dive-fast/index.mdx)                                                           | 已审校 | 澄清DCT不压缩、量化幅值阈值、BPE仅对整数无损并补Parseval量化误差解释；区分5xGPUhours到达性能与每步/推理加速、teacher forcing与串行部署；区分FAST+已见策略任务词表训练与未见平台仅离线压缩；补DROID44次定量与三校园定性、异质评分、Laundry需任务微调；核实processor外部归一化、horizon维度、裁剪解码回退、OpenPI10步与论文15步差异；纠图号及陈旧CDN注记                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [fast-in-slow](../../src/content/blog/paper-deep-dive-fast-in-slow/index.mdx)                                           | 已审校 | 纠正117.7Hz动作吞吐与闭环观测频率混淆，补单GPU串行异步、整块执行及hidden-state缓存；官方代码核实DINO1024/SigLIP1152，指出论文维度颠倒；共享层49/69/66/64非单调增长，纠正泛化扰动并非全部相对降幅更小；补预训练离散动作/微调语言计划监督与推理能力证据边界、真实单任务设置及宏平均；删除虚构最佳验证checkpoint、KV缓存、四步去噪含义及过强因果归因                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [faster](../../src/content/blog/paper-deep-dive-faster/index.mdx)                                                       | 已审校 | 纠正Simpler提升为11.4个百分点；澄清BAR输入块attention与同块目标预测条件，补21code/3次前向实例；解释RVQ向量/索引与DCT损失边界；区分tokenizer跨具身重建与策略zero-shot；核对5090延迟及WBC弱于pi0边界；记录原文block size表文不一致；将无代码声明从Code事实改为版本受限的Paper事实，修正图号10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [fastumi](../../src/content/blog/paper-deep-dive-fastumi/index.mdx)                                                     | 已审校 | 解释TCP参考系、刚性偏移与IK标签的具身依赖；发现公开TCP脚本帧索引递增置于循环外及旋转乘法次序差异，纠正已正确实现插值的断言；解释20Hz采样、action=qpos存储及Zarr绝对位姿非relative动作；补动态误差补偿原理与GRU/单目深度的能力边界；实验增加xArm6、每任务15次、camera实验为50条遥操作等协议；纠正MINI不存在Rearrange Coke结果及作者局限清单                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [fd-vla](../../src/content/blog/paper-deep-dive-fd-vla/index.mdx)                                                       | 已审校 | 标出flow插值与目标符号不一致并给出自洽约定；解释特权信息蒸馏、条件均值与不可观测性边界；澄清冻结与mask的不同作用，补控制token方向；明确w/oFDM仍用真实力、force token变体替换query；纠正原文pi0 without force均值笔误并限定消融结论；修正3处图号、SigLIP拼写及无实现事实标签                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [finevla](../../src/content/blog/paper-deep-dive-finevla/index.mdx)                                                     | 已审校 | 对照论文与更新GT仓库，区分10816/11631事实及71.0/68.2、83.6/82.2两个评测版本；澄清FG子集与Raw全集不能严格隔离语言因果，保留正文/附录采样描述差异；将L1限定为OFT，纠正训练脚本并无实际VLM co-training；补atomic fact评分公式、DTW旋转距离与window归一化差异；补预训练原始指令/微调混合、真机50chunk异步30Hz协议；区分部分完成分与语言关键子目标及OOD失败，并标出Table26表文不符；修正图号与人评相关性统计单位                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [forcevla2](../../src/content/blog/paper-deep-dive-forcevla2/index.mdx)                                                 | 已审校 | 区分15Hz推理、300Hz力采样，删除无依据异步毫秒闭环断言；修正力的双路径与6自由度/7参数误解、数学转义、Figure6图注；解释进度伪标签分布假设及阈值矛盾，指出附录可控性秩不等式不成立；核对主表/结论段百分点混淆，限定顺序消融与定性恢复证据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [ftp-1](../../src/content/blog/paper-deep-dive-ftp-1/index.mdx)                                                         | 已审校 | 修正Table2均值45.3与逐项45.83冲突、FixHand双阶段重复计入均值；补48触觉槽位/缺失掩码、attention前向隔离不等于梯度隔离；用实际flow-matching有效元素归一化替换不充分损失示意；补48H20预训练配置、未见传感器初始化与冻结区别、NTP去除lift后结论反转；限定MTTS必要性与知识存储位置的因果解释                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [g05](../../src/content/blog/paper-deep-dive-g05/index.mdx)                                                             | 已审校 | 补主实验默认no-CoT与CoT实验外部逐阶段指令、n5小样本限制；区分DROID部分计分、BEHAVIOR目标谓词比例、PP尝试抓取指标和未见范围；纠正27维连续布局≠27token、codec预训练≠策略单阶段CE、FlashRT标在AR；删除无来源200token限制；限定AR对FM、视觉记忆和知识保留的因果主张；补真实训练按墙钟对齐、RL仅筛选四任务与token概率含义                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [genie-envisioner](../../src/content/blog/paper-deep-dive-genie-envisioner/index.mdx)                                   | 已审校 | 修正flow路径速度场符号、区分30Hz动作采样与200ms推理；分离GE-Sim EEF接口与GE-Act joint动作，补重试使E2E可高于SR；补EWMBench三选一轨迹选优与语义评审器边界，纠正策略排名未经验证；核对v3全部图号、冻结VAE范围、VidAda与state交互及正文误写；固定官方重命名V1代码，验证单次采样视觉缓存机制                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [gr-rl](../../src/content/blog/paper-deep-dive-gr-rl/index.mdx)                                                         | 已审校 | 纠正distributional翻译，期望值并非概率向量均值，Q不是校准成功概率；解释chunk终末奖励、人工retry标注、过滤监督样本而非拼接轨迹；补噪声critic蒸馏与50/50噪声覆盖，范数惩罚不等于KL分布匹配；区分offpolicy算法与近期buffer、24episode滑窗90%和最终83.3%；限定顺序组件因果解释、未见鞋型及整双鞋成功范围，修正Figure6/7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [gr00t-n1](../../src/content/blog/paper-deep-dive-gr00t-n1/index.mdx)                                                   | 已审校 | 纠正N1.6混用：固定N1发布代码、12层VLM/16层DiT、冻结语言训练视觉；修正flow符号、Beta变换、decoder每轮速度预测和论文4步/发布16步采样差异；补连续量化前LAPA目标、各数据源监督、生成数据预算/过滤/辅助定位损失；澄清部分评分、checkpoint选择与正文/附录DexMG不一致；修左右手场景和图号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [grinningface](../../src/content/blog/paper-deep-dive-grinningface/index.mdx)                                           | 已审校 | 纠正论文标题与图号；将识别率解释为P(C/E)而非独立性假设；补Val选模、重复评估≠重复训练、实机小样本和VLM/Co-training筛选边界；区分预训练初始化/下游冻结、并行离散变体与latent联合目标阶段；核验公开环境is_obj_placed只检查目标卡，未完整实现执行率统计；补缺失agent等复现障碍                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [halo](../../src/content/blog/paper-deep-dive-halo/index.mdx)                                                           | 已审校 | 纠正PeRL误链接并补真正官方HALO代码/ICML2026与发布状态；补独立QKV共享attention、noise−clean flow及1→0积分、20%随机CoT触发与49/9次更新；明确子目标边界伪代码t/t−1差异、重复subtask映射和离线全轨迹监督；纠正Hard相对增益更大误算、控制变量/顺序删除消融误读和视觉单独18.3<无CoT21.2；区分公开w/o EM-CoT权重与完整论文结果，删除虚构本体输入与旧CDN备注                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [helix](../../src/content/blog/paper-deep-dive-helix/index.mdx)                                                         | 已审校 | 澄清共享权重协作仍由语言分配递出/接收行为，不推断自主角色协商；区分200Hz控制循环、未知相机帧率与S2语义信息年龄；补temporal offset对应机制；完成度为辅助预测而非执行器动作；单阶段/500小时排除既有预训练；明确物体零样本口径、初代发布范围并修正无法核验的GitHub API断言                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [hex](../../src/content/blog/paper-deep-dive-hex/index.mdx)                                                             | 已审校 | 发现并明确missing token声明未使用、50实际含当前+49未来、默认history关闭、Beta时间采样及chunk位置门控等论文代码差异；阐明UPP为无候选动作条件的行为预测先验而非规划动力学模型；纠正图号与长任务累计成功率口径，补基线不同训练预算、π0.5 35.7%与12次矛盾；区分优化速度与示教样本效率，补低层多策略及数据近期发布状态                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [hifi-umi](../../src/content/blog/paper-deep-dive-hifi-umi/index.mdx)                                                   | 已审校 | 澄清zero-robot只限定后训练来源、保留机器人基座及真机选模；补共同头部坐标变换抵消机制，纠正3mm局部均值/96%基础有效率/40μs同步口径；官方数据卡核实action存储为绝对下一状态、右先左后、有效mask，区分策略相对动作；补StarVLA模型改动与OpenPI简化训练/时间反向，归一化规则与统计量区别；纠正exposure scaling与数据规模定律混淆，扩充oracle姿态指标和等效性结论边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [hume](../../src/content/blog/paper-deep-dive-hume/index.mdx)                                                           | 已审校 | 纠正原文与博客flow插值/速度符号冲突，按代码统一逆时间公式并解释S1学习粗到精流；发现72.6混合抓取与全任务成功，最终成功均值60.75；补真机主图/消融分数冲突；更正全部图号、恢复作者实际存在的三项局限、补平台-specific chunk设置；核对Q仅评分前缀且无显式本体输入、双target critic取min，演员仅训练用途；区分公开同步缓存推理与论文异步部署，90Hz吞吐非视觉反馈频率；解释消融分布变化与PCA证据边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [inspire](../../src/content/blog/paper-deep-dive-inspire/index.mdx)                                                     | 已审校 | 将严格信息瓶颈与因果结论改为保留原图通路的辅助监督假说；指出乘零logits掩码不能严格限制词表及多token后处理条件不一致；补充坐标轴、对象高度修正、is_grasp标签及真值答案到预测答案的分布差异；区分LIBERO90未见任务迁移和union4分布内微调、借用基线的公平性边界；修正Long零提升、CALVIN/真实实验图号、单seed消融误差项及20%时延开销                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [interndata-a1](../../src/content/blog/paper-deep-dive-interndata-a1/index.mdx)                                         | 已审校 | 纠正Scratch仍继承PaliGemma、真实任务经过后训练及零样本sim-to-real的准确含义；指出原文统计矛盾：Table2提升、Table3重算56.7pp、Long轨迹计数和30k/100k后训练步数；纠正两项额外任务为恰好50%，区分新机器人三任务与Lift-2分拣；补充人工技能参数、成功筛选选择偏差和固定epoch删数据的规模/训练量混杂；更新数据公开状态并区分合成训练语料与现仓库sim/real混合发布                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [internvla-a1](../../src/content/blog/paper-deep-dive-internvla-a1/index.mdx)                                           | 已审校 | 修正2B动态任务46.7%与平均58.4%，区别总体优势与逐任务结果；统一论文与代码相反flow时间方向并指出Beta时间权重并非完全等价；澄清MoT独立参数、非动作条件未来预测、动作读取中间KV无需RGB回灌；补充人类视频仅视觉loss与公开forward/训练脚本无法直接复现全论文配方的边界；区分生成分支消融的容量/时序混杂、采样频率与13Hz以及Sort Rubbish指标口径不明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [internvla-m1](../../src/content/blog/paper-deep-dive-internvla-m1/index.mdx)                                           | 已审校 | 纠正LIBERO动作块8步、分suite独立模型和绝对图像坐标；分清latent空间提示与显式长程子任务规划、QA co-training与仿真动作co-training；纠正6.2pp是相对GR00T而非mid-training自增益，解析重叠300rollout与调度/执行指标；指出LIBERO空间suite下降、Goal最大增益和Simpler不齐全任务平均数比较边界；核验grad_scale默认未启用、state未接入、DDIM配置缓存和先反归一化再融合的实现；移除冒充作者局限声明与无原文依据的DiT变体参数量列                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [knowledge-insulating-vla](../../src/content/blog/paper-deep-dive-knowledge-insulating-vla/index.mdx)                   | 已审校 | 修正 Flow 插值与目标方向不一致，显式指出原文记号冲突并统一公开代码约定；补充 FAST/连续 token 双向屏蔽防标签泄漏及 key/value 两条 stop-gradient 路径；纠正 OFT 被说成并行离散解码，交代本文修改过的基线设置；区分任务进度、语言遵循与完整成功率，补充 LIBERO 联合训练及 Long 落后情况；记录 DROID 正文 generalist 与附录 specialist 的范围矛盾；澄清冻结、梯度干扰因果证据和 co-training 的边界，删除过时图床说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [la4vla](../../src/content/blog/paper-deep-dive-la4vla/index.mdx)                                                       | 已审校 | 补坐标系、标注过滤粒度及实际仅保留55.4%帧，区分episode拆分与新增数据；发现全局vision_masked可能经图像位置残差向动作头泄漏，与dataset零像素路径不同；明示仅源码风险；补动作头无self-attention、整段池化结构，修正horizon默认16/7及Beta截断；区分匹配LA/VLA对照与增加预训练收益、第二架构未设VLA对照；补300条实机微调、九格仅测4格、成功判定与小样本边界；按相同两个任务重算干净/噪声落差，纠正绝对更高被等同于下降更少的推论                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [lap](../../src/content/blog/paper-deep-dive-lap/index.mdx)                                                             | 已审校 | 统一论文0→1与代码1→0的Flow记号，注明uniform/Beta差异；补文本仅训练辅助目标、不串行生成语言再动作及与LA4VLA监督方向差别；核出旋转默认10度、EEF随机选择受wrist条件限制、连续旋转求和近似和语言摘要损失；区分15k/10小时早期checkpoint与50小时hero、DROID85.26%训练权重；核实lap默认CE1.0、LIBERO关闭梯度隔离/horizon10；补25Hz推理与15Hz控制/8步重规划差别；明确零样本样本量、胶带50%进度非完整成功、YAM微调关节动作，修正图号及scaling证据边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [lapa](../../src/content/blog/paper-deep-dive-lapa/index.mdx)                                                           | 已审校 | 修正虚构额外VQ/commitment损失，按附录A与NSVQ代码写唯一重建MSE和噪声替代机制；明确4token非4控制步、机器人0.6秒/人类2.4秒窗口、目标机器人全语言模型微调；把实机50.1%等改为进度分数，补strict35.19%对27.78%、样本量与配对平局；补SIMPLER有标签100成功rollout微调、LanguageTable cross-task7k对照非零样本；动作CE增加前动作token条件，纠正q01/q99解码为等频箱中点及夹爪二值；修正四处图号、batch128/256来源矛盾、不同GPU/backbone效率比较边界及人类数据非单调收益                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [lawam](../../src/content/blog/paper-deep-dive-lawam/index.mdx)                                                         | 已审校 | 纠正 KI 等于全冻结的说法，解释三项损失与部署信息边界；补实际 query 顺序及辅助相机可见性、物理时间范围；修正 RoboTwin 排名解读、延迟与参数统计口径、混合频率消融因果边界；区分 latent rollout/热力图证据与真机 OOD 成功率，修图号                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [learning-while-deploying](../../src/content/blog/paper-deep-dive-learning-while-deploying/index.mdx)                   | 已审校 | 明确 DIVL 为 replay 标量Q分布而非固定动作随机回报分布，区分quantile与expectile理论；补 terminal mask、H30物理时长与QAM KL目标、原论文endpoint伪代码歧义；纠正95%混合评分解读，补652.5小时离线数据、RECAP双轮交互量、指标边界；更新v4系统延迟/可靠性证据、图号与自适应tau局限                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [lerobot](../../src/content/blog/paper-deep-dive-lerobot/index.mdx)                                                     | 已审校 | 修正常规异步client默认聚合为0.3旧+0.7新，补过期动作过滤、队列阈值与非实时性保证；补异步同机实验的sorting下降与实际cycle/吞吐口径，纠正ACT A10073Hz；区分streaming缓存、全量metadata、有限shuffle和随机访问语义；锁定源码提交与图号，纠正最佳checkpoint默认行为和内存/超时统计解读                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [libero](../../src/content/blog/paper-deep-dive-libero/index.mdx)                                                       | 已审校 | 删除Thread Velcro100示教外来错误，区分130任务/40评测/90预训练与现代静态VLA协议；修BC期望索引、FWT最佳点后平台化与checkpoint、NBT末项边界及非净迁移解释；核验ER按每任务1000序列样本非完整trajectory，补PackNet额外50epoch预算；限定语言消融/预训练结论、FLOPs匹配与20rollout口径、MTL非数学上界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [libero-plus](../../src/content/blog/paper-deep-dive-libero-plus/index.mdx)                                             | 已审校 | 修条件协方差独立基准公式与等概率先验、12/15 nominal显著且只测OFT；分离Table1初始诊断与Table2最终基准，修Camera+37.2参照、79.5/79.6口径；纠正难度等级是四模型成功数量、总分按任务权重、OOD为同场景目标组合；补增强数据重放流程以及无robot-init/target-pose训练，纠正黑屏模型数值对应并限定因果结论                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [lingbot-va](../../src/content/blog/paper-deep-dive-lingbot-va/index.mdx)                                               | 已审校 | 纠正chunk内双向attention与异步短上下文被写成全token因果和永久记忆；核对VAE与视频下采样：RoboTwin16动作/latent非4；纠正few-shot5/10demo结果、图号和泛化证据类型；补真实成功率/进度反例以及附录Success与满分定义冲突；厘清语义horizon、预训练消融预算和异步速度精度取舍                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [lingbot-va-2](../../src/content/blog/paper-deep-dive-lingbot-va-2/index.mdx)                                           | 已审校 | 纠正225Hz为32动作点/chunk吞吐而非视觉闭环频率；区分15.3B训练参数/MCP移除后模型与2.5B每token激活；解释latent动作与机器人30维控制、冻结教师/从零主干边界；补MCP梯度与带噪目标机制、步数效率不等于wallclock；纠正图号；补合成ICL配对/标注HCT数据和planner监督方式；明确在线policyFDM不同于tokenizerFDM，检查上一代仓库不能充当2.0实现                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [mask-world-model](../../src/content/blog/paper-deep-dive-mask-world-model/index.mdx)                                   | 已审校 | 纠正C2正文/表格实际0.046差异，撤回统一优于RGB与Long增益；核对flow-matching代码不同于论文score公式；actionfull更新与冻结矛盾；指出相同黄色物体mask非身份跟踪、几何瓶颈为软监督而非硬信息约束；区分论文单步控制/500episodes与公开8步/10trials脚本；解释C2冻结Cosmos vs完整GE可训练相机混杂、nPAUC定义和反例；核对9视频帧vs未来latent字段误读并纠正Figure5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [mimicgen](../../src/content/blog/paper-deep-dive-mimicgen/index.mdx)                                                   | 已审校 | 纠正BC-RNN按seed最佳checkpoint后汇总，不是3seed取最大；明确跨机器人/新物体为目标域生成数据后另训策略非零样本迁移；补真实Stack同数据DiffusionPolicy76%及25插值+25固定设置；纠正delta动作归一化除尺度、给出与代码一致坐标变换并说明原文顺序笔误；撤回公开Factory/mobile实现误报；success代码为任一步达到过；纠正D1/D2范围、25demoMobile例外、图号；补覆盖偏差与姿态噪声采集成本                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [mm-act](../../src/content/blog/paper-deep-dive-mm-act/index.mdx)                                                       | 已审校 | 纠正 LIBERO 96.3 跨套件配置、真机72混合指标与RoboTwin未见任务定义；纠正只执行首动作和40Hz重规划误解，核实公开循环执行完整8步；解释三种独立条件生成、专家未来帧监督与非反事实世界模型边界；补分配置训练步数权重、长chunk解码取舍、自动文本评判口径；核实模型实现token采样与temperature作用，区分默认配置                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [mmada-vla](../../src/content/blog/paper-deep-dive-mmada-vla/index.mdx)                                                 | 已审校 | 纠正hybrid注意力为区块单向goal到action，发现公开llada和cache执行忽略mask；区分机器人预训练与基础模型初始化，补5300万窗口和目标基准混入数据口径；纠正论文argmax与代码随机采样、温度累乘、已确认token冻结及mask步数方向；补缓存默认关闭选择刷新、prompt长度与设计不符，纠正18/24步不同层次默认；纠正CALVIN累计概率、真机GR00TN1.6、效率20任务子集；补loss平均与量化边界差异                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [molmoact](../../src/content/blog/paper-deep-dive-molmoact/index.mdx)                                                   | 已审校 | 区分100深度位置/128code类别、逐图相对深度、教师pointing未来全episode轨迹；撤回TRAJ_START错误；纠正steering是单独overlay直接动作模式，不执行完整空间推理链；补teacher forcing和非硬瓶颈；纠正数据93任务、样本与抽样占比、GPU小时及midbatch内部冲突，限制动作词表成本归因；核算Tables15–23，揭示真机均值、steering进度而非成功率、OOD23.3含ID和midtrial10/11差异；揭示LIBERO分项平均86.8与报告86.6、VA次高对照错误，分离零样本与微调结果；纠正CoTVLA/TraceVLA相关工作定位，补缺乏深度和trace等逐项机制消融边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [mu0](../../src/content/blog/paper-deep-dive-mu0/index.mdx)                                                             | 已审校 | 纠正混合UV-depth坐标/误差单位；解释Top5逐点oracle指标及2DTop1边界；纠正磁盘文件与batch字段、20层release覆盖、historydropout与batch论文代码差异；纠正sigmoid零初始化实际门0.5、软anchor拟合、一阶正则意义；补rigidity不是笛卡尔刚体保证；补控制接口网格400query无depth无history、预测/执行horizon及trace与actionflow符号约定；补完整输入消融基线，防止无depth优于Full的错误因果读法，补容量差异和非单调数据规模；修正图号2/3/4/5/6与旧图床注释，限制跨形态零样本与因果worldmodel表述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [multiview-il](../../src/content/blog/paper-deep-dive-multiview-il/index.mdx)                                           | 已审校 | 澄清五视角机位泛化测试均为已见机位，并非holdout；补动作增量变换方向/平移消去/旋转共轭，纠正EEF移动原点直接影响增量的解释；补PoE score/Jacobian及同一噪声动作条件；明确原公式省略扩散条件和参考系未说明，不伪装完整实现；纠正多视角聚合额外计算不只变换求和；拆分真实训练增强和推理聚合收益；补缺少rollout/种子/误差条/计算预算，区分独立轨迹与伪样本、相对与百分点                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [omniumi](../../src/content/blog/paper-deep-dive-omniumi/index.mdx)                                                     | 已审校 | 补双边控制Eq2/3与正速度反馈是阻力补偿而非阻尼，分离内部反馈和手持外部力感知；区分六维wrench观测与13维动作的三维force、虚拟宽度隐式抓力；补六维wrench变换含力臂、静态重力补偿不等于动态测力验证；解释虚拟目标负号/弹簧力与局部J映射，指出具体刚度schedule和稳定性证明未提供；将humanalignment改为每设置一条代表轨迹、非因果消融；100%结果缺试验分母不能泛化；删除虚构hub时间戳协议与最优验证checkpoint，明确训练和控制复现缺口                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [omnivla-rl](../../src/content/blog/paper-deep-dive-omnivla-rl/index.mdx)                                               | 已审校 | 纠正GSPO全称，ODE初始高斯已随机，prefix交互非三分支全双向；指出SDE同边缘密度推导与线性路径score矛盾，区分路径密度和终点边缘概率；明确Eq18是负向KL而非声称正KL，Eq24符号不一致；不冒充修正版是作者实现；指出Figure3冻结图示与正文冲突、奖励分组/零方差/环境克隆及训练配置缺口；纠正LIBERO-Plus被写为长时序扩展且引用PRO，无法确认实际评估套件；指出Table1OpenVLA宏平均79而非76.5；32.9无Spatial对应SFT，非与80.3RL对照；训练曲线不证明测试泛化和环境样本效率                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [omnivta](../../src/content/blog/paper-deep-dive-omnivta/index.mdx)                                                     | 已审校 | 纠正15FPS与约4Hz策略调用、60Hz反馈之间关系和全部图号；区分历史动作条件预测与候选动作世界模型、LTD预期变化与RLTC执行误差；纠正LTD/gating消融递进、说明原文gating配置冲突；澄清混合完成比例/成功判定指标、已见对象和每类训练而非全数据通用策略；删除不存在的作者局限与未披露的冻结/异常阈值，补标定和安全边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [onetwovla](../../src/content/blog/paper-deep-dive-onetwovla/index.mdx)                                                 | 已审校 | 纠正pi0长程平均57%及52/60、34/60、38/60精确差值；补全附录F过期reasoning两分支、类别不平衡、状态历史、5Hz时序及token延迟；核验官方代码时间方向及16步配置、grounding禁reference与机器人仅动作监督；澄清16000图像非指令对、标注质量、专门恢复示教和对象分组评估边界；补G多模态与错误推理跟随证据，区分观察相关与主动因果干预                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [open-aoe](../../src/content/blog/paper-deep-dive-open-aoe/index.mdx)                                                   | 已审校 | 修正窗口产出率秒/小时换算，说明重叠窗口与OpenEgo更高产出；明确生产Open Application与下游完整开源差别；阐明CLIP六指标相关性、kNN含义、VLM宏平均及CI边界；补110/20/22/26/GR00T同维异义、图号、转换器无实际FPS重采样、无效手置零与第一action语义损失；纠正BA不优化mask、原始bbox需去畸变映射、camera无深度，区分重建伪标签与几何真值                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [open-h-embodiment](../../src/content/blog/paper-deep-dive-open-h-embodiment/index.mdx)                                 | 已审校 | 区分780h完整数据与缺运动学条目、601h策略子集，修正临床64%归属和标签质量；解析44D含状态/具身特有动作及clutch双帧有效累积，补归一化矩匹配含义；区分单平台闭环开发筛选和C-H-S-S开环50episode150生成，补下游冻结VLM微调；纠正29任务64%不是端到端、5/20不是恢复消融、跨具身非零样本，记录OOD样本量原文冲突及LingBot数据预算差异；修正图号和模型代码版本口径；补公开N1.6配置训练步数/warmup与论文差异                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [open-x-embodiment](../../src/content/blog/paper-deep-dive-open-x-embodiment/index.mdx)                                 | 已审校 | 分离RLDS统一容器与RT-X子集动作对齐，移除本体状态/显式e模型条件；补完整TableI双地点，纠正全域超越和参数量单因素推断；补TableII row7，区分Web预训练、混入Web及history效应和目标域技能迁移边界；核对RT1并行占位动作/11tokens/512词表/rotation实际范围/外部语言嵌入与动作解码；澄清50%相对提升、任务统计不等于能力认证、3600总体试验非单格分母                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [openvla](../../src/content/blog/paper-deep-dive-openvla/index.mdx)                                                     | 已审校 | 纠正夹爪delta/全维归一化/EOS损失/无损tokenization，核对255区间中心和mask/词表补齐；补关键脚注：LoRA量化实验为SigLIP-only小数据混合，33rollouts和显存总量，QLoRA非已验证等效；补blocking量化反事实实验和单任务下降，修正速度图号；说明16.5点按230rollout加权、半分与Wipe35/60分、ID/OOD和DP输入差异；纠正Bridge只删除首transition、RT2X第二高动作基线，区分视觉早期消融、仿真清洗及每suite独立训练                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [openvla-oft](../../src/content/blog/paper-deep-dive-openvla-oft/index.mdx)                                             | 已审校 | 拆开95.3单图L1/95.4单图diffusion/97.1额外输入及94.5未过滤集，纠正26x对应配置；补100queriesA100吞吐K/latency非闭环、ALOHA同步chunk间停顿；更正公开code全序列双向SDPA依赖fork、完整chunk尾部截断非mask、diffusion缓存视觉及50级训练意义；补FiLM普通Linear初始化、prompt均值和853M训练参数，条件中位数非联合mode；补DDIM10步几乎不掉分、最佳checkpoint选择、ALOHA分数51.25非SR及6/24最终完成、单策略LIBERO和Bridge非全面提升                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [pi-rl](../../src/content/blog/paper-deep-dive-pi-rl/index.mdx)                                                         | 已审校 | 澄清随机初始噪声与确定性 ODE、路径与最终动作边缘似然差异；指出论文正向插值与 SDE 时间符号不一致，以官方逆向时间离散均值方差重写并解释端点修正；区分预测 H 和执行 Hprime、chunk reward 与原始逐控制步折扣；核实 π0.5 一般架构与实验禁用状态的区别；解释 value 近似和 placement 消融；澄清噪声参数为标准差界、joint logprob 平均与理论求和差别、batch共用随机步；补实验专家数据预算、奖励、CALVIN两种指标与OOD协议歧义、PPO/GRPO和VLM消融边界；补实机单任务40%缺分母及GR00T扩展，修正2x仅update时间、one-shot共40条、日期与作者                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [pi0](../../src/content/blog/paper-deep-dive-pi0/index.mdx)                                                             | 已审校 | 修正高斯路径协方差缺平方、flow方向和Beta变量变换，区分原始flow单目标与Transfusion多目标；说明动作专家不隔离VLM梯度，论文18 query heads与官方8不一致；纠正整段执行为50步预测只执行16/25步；代码state suffix重算与论文缓存不同；明确out-of-box为已见任务类型，scratch保留PaliGemma、small仍预训练ViT/DistilBERT，基线预算及微调checkpoint口径；补长任务部分进度评分与洗衣单件评测，限制低质量数据和架构因果解释                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [pi05](../../src/content/blog/paper-deep-dive-pi05/index.mdx)                                                           | 已审校 | 纠正图像并非离散token、后训练保留FAST监督，区分attention隔离和梯度隔离；修复论文插值与速度符号矛盾，全文统一代码噪声时间并修正伪代码负步长；补4相机高层/3相机低层与高层、推理、执行三频率；公开sample_actions不执行高层文本解码且compute_loss仅flow；补地点扩展简化40k流程、评分rubric、取消试验与OOD语义边界；澄清高层消融固定低层、人类oracle非上界、文本输出非硬候选表；图号10/13修正；补quantile无clip、LIBERO禁用离散state、DROID H15、VI11%分母与97.6%采样口径                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [pi07](../../src/content/blog/paper-deep-dive-pi07/index.mdx)                                                           | 已审校 | 修正world-model loss最大化为最小化并标记原文错误，解释CFG β与有效条件系数及score非实现；补KI flow梯度隔离/FAST互不可见，条件dropout嵌套比例、真实/生成subgoal采样；明确5B低层外还需14B world model、两分辨率、非action-conditioned反事实模型、异步延迟成本；区分已见任务专家蒸馏、进度和成功指标、两图吞吐归一化分母；将跨形态改为任务机器人组合未见；人类对比为GC平铺衣物30trial，80.6%统计口径内部不一致显式限定；强调coaching训练高层仍有新任务数据，空气炸锅仅装入/取出、假薯条，未验证完整烹饪                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [pld](../../src/content/blog/paper-deep-dive-pld/index.mdx)                                                             | 已审校 | 区分RL probing初始化不进replay与成功SFT轨迹保留base前缀；接管仍base+residual且并非失败检测；纠正Simpler为Octo-SFT，标注OpenVLA正文AR/附录OFT不一致；限定99.2与50.6百分点口径；纠正one-shot长程各组均有目标示教，补few-shot与human unseen数据相近/60%略低；补50成功预训练和200真人轨迹成本、YAM状态机/每阶段8h与1h无reset非100%单次成功；修正Figure5/11/8，解释概念TD与SAC差异、原文a_b+bar_a重复相加错误、scheduler未公开和OTF默认1；补successful hybrid前缀可能次优、非精确部署分布与非DAgger及遗忘解释证据边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [priorvla](../../src/content/blog/paper-deep-dive-priorvla/index.mdx)                                                   | 已审校 | 纠正SQ/MQ删除消融结果写反及八个OOD因子误称；澄清SQ单向读出、MQ隔离VLM、AQ并非AE唯一条件瓶颈；区分冻结参数与恒定表征/停止梯度、动作先验与动力学模型；补训练学习率分组、动作表示、15/50执行前缀与按任务/套件模型训练；补每任务300/50/20次评估、最佳检查点与官方LIBERO基线口径；限定25%为可训练参数，补训练耗时与推理测量缺失、VQA定性边界、任务反例                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [qwen-robotmanip](../../src/content/blog/paper-deep-dive-qwen-robotmanip/index.mdx)                                     | 已审校 | 纠正VLM梯度未隔离、当前state通路与register queries；补相机位移/旋转换基公式、位姿乘积耦合差异、CaPE与无标定fallback；区分80Dstate6Drot与action3Drot、mask连续有效前缀；补数据清洗、38,161小时和28M含专有VL、ECoT教师特权标注边界；纠正Context并非固定4步、speed实际episode长度；区分IID/C2R、基础/context及joint/EEF，标明IF表8平均算术矛盾；纠正55%实验不是RoboChallenge且含ARX其他任务数据、XE仅下游零样本；补真实实验试验次数、进度与成功口径、按本体generalist、有限规模规律与恢复证据边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [qwen-vla](../../src/content/blog/paper-deep-dive-qwen-vla/index.mdx)                                                   | 已审校 | 区分真实ALOHA微调分支与统一Instruct、训练任务域与零样本口径；补默认无本体state及消融、zero-padding非物理语义对齐、按数据集裁剪归一化；深入T2A完整轨迹/语言不确定性/无物理渲染合成数据、真实与专有采样来源；修正图6最差分布组合原文错称Beta/Beta，补2k默认与完整数值；补PPO抽单去噪步概率估计而非精确边缘密度、价值头stopgrad与8192chunk采样；解释OS/SR/SPL和MS、LingBotVA属于zero-shot组、小幅RL变化未证显著；更正图号并删除失效图床过程说明、补实际局限与评估缺失                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [rdt-1b](../../src/content/blog/paper-deep-dive-rdt-1b/index.mdx)                                                       | 已审校 | 纠正全部主结果口径：未见洗杯scratch0，三房间75/41.7，左指令100/62.5，折短裤68/40，机器狗区分Total与直行；综合68.2的层级均值含已见杯；56为百分点非相对百分比；ACT缺指令维度与基线微调协议差异；纠正mask没有屏蔽训练MSE而是输入拼接及采样输出mask；夹爪仍需平台缩放；补67token数据流、DDPM MSE保留多模态的条件差别、冻结编码器推理仍必需；纠正微调使用500K而非1M预训练checkpoint；fewshot包含6K多任务背景；模型1.2B不含冻结编码器；限定无移动为目标实验，预训练含MobileALOHA；区分6chunkHz/381动作吞吐与闭环频率；重标消融三列单环境/CorrectAmount及8次试验；避免缺一不可和学习物理定律的过度归因                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [rdt2](../../src/content/blog/paper-deep-dive-rdt2/index.mdx)                                                           | 已审校 | 纠正Figure3五任务数值和Figure7全部速度标签，Table2补齐五档乒乓球命中与按键真实2758ms口径；区分4U零样本与每任务200示教/50Kexpert+20K蒸馏，受控三场景/两本体/256汇总试验和指标定义；说明人类数据为追踪UMI而非纯视频，12M VQA混合、硬件/homepose/TCP适配边界；补FM非先生成RVQ再修正，同chunk KV缓存非跨帧异步；蒸馏同噪声终点而非全轨迹；纠正正文均匀时间与附录/代码logisticnormal差异；论文chunk32/state14与公开24×20/zero-state区分；scaling为训练CE、N含视觉编码器非真实成功率定律；指出Stage2全局batch算术矛盾；限定消融语义保留、基线预训练checkpoint与训练计算口径，保留开源UltraFast接口缺口说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [recap](../../src/content/blog/paper-deep-dive-recap/index.mdx)                                                         | 已审校 | 补稀疏奖励/终止失败罚分/按任务最大长度归一及MC行为混合value与N步adv区别；纠正negative样本仍正向监督negative分支；positive非成功标签非简单A>0；阈值/dropout/Bayes机制与改进保证边界；补KI stopgradient、FAST/continuous独立预测、高层subtask在indicator之前且低频；补N50、预训练return下界印刷歧义、主文阈值percentile与附录比例区别；明确failure-removal主文无纠错与附录658纠错矛盾，box600自治/示教计数标签矛盾及97%固定任务边界；补真实收集量、box先跌后升、AWR/PPO离线同数据设置而非否定onlinePPO；修复公式反斜线、任务与吞吐图号、分布型术语；公开openpi默认配置不等于内部4B/860MRECAP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [ricl](../../src/content/blog/paper-deep-dive-ricl/index.mdx)                                                           | 已审校 | 修正8任务与6任务微调分母混比，同6任务ICL重算28.33%；checkpoint83.75非完整成功；修正误把未启用wrist DROID路径当成训练视角矛盾，实际top预处理与在线一致；补query推理无真值动作、teacher forcing与querypostfix loss mask、非jointtoken独立、距离clip和概率非连续插值；注明公开非零temperature把概率当logits的实现边界，默认贪心不受同一问题影响；补leave-one-episode-out与任务选择库、4邻居不必4轨迹、更新1000步后仍保留检索；纠正新水槽场景重新收集检索库，附录明确不支持库与测试大幅视角变化；修正所有图号、单任务10示教门槛过度外推、80%保留能力/动态视频/耗时与数据算力消融边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [rl-100](../../src/content/blog/paper-deep-dive-rl-100/index.mdx)                                                       | 已审校 | 纠正八任务数据预算正文漏Box Folding，按S3重算1004/4573/3223与112.6h；澄清1000分母450DDIM+550CM与每任务次数、不等于通用单策略可靠性；补随机DDIM正方差likelihood、共享adv非密集因果信用、chunk折扣、AM-Q非真实回报保证；区分IL监督与RL PPO；冻结离线encoder和可配置联合正则；纠正严格单调/独立飞轮消融过度结论，补S6-S8模态和seed边界；蒸馏提速使用同RL DDIM45.6/CM41.4对照，成功条件耗时与整体吞吐分开；纠正商场榨汁混合脚本、零样本/少样本/扰动平均分母及任务约束                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [rlinf-user](../../src/content/blog/paper-deep-dive-rlinf-user/index.mdx)                                               | 已审校 | 更新v4四台Franka同任务与新增跨天实验，区分移动平均和独立评估；解释异步周期与单次计算耗时、修正4.61倍算术口径；核对真实缓存配置auto_saveFalse与trajectory单位，限定持久化恢复承诺；区分HGDAgger干预成功与自主成功，加入RLPD子采样和SACFlow路径密度                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [rlinf-vla](../../src/content/blog/paper-deep-dive-rlinf-vla/index.mdx)                                                 | 已审校 | 区分ID97.66与OOD77.05、RoboTwin六个单任务模型、LIBERO130全部见过任务；指出LIBERO平均值与gamma指数及数值的原文矛盾，避免夸大action critic普适优势；解释logprob/advantage两种粒度、clip不等价、value无中间观测、mask不等于reset；补采样评估差异、训练seed与eval重复区别、效率分母H100工作负载和真实示教前提                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [robocasa](../../src/content/blog/paper-deep-dive-robocasa/index.mdx)                                                   | 已审校 | 纠正生成100/300平均26.3/35.0，解释100低于human及单任务非单调；区别100K发布与72K主实验、50总评估分母、MuJoCo实际训练渲染与Omniverse展示；加入复合任务全部原始数字0.4至4.8与真实co-training每任务单模型/未见定义；深化特权状态生成与视觉部署边界、DP对照历史与控制频率混淆、版本horizon漂移                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [robochallenge](../../src/content/blog/paper-deep-dive-robochallenge/index.mdx)                                         | 已审校 | 厘清displayname多checkpoint、machinegeneralist与数据预算混淆、排序CDF不等于逐任务支配；深化PS阶段critical及重试取舍、10rollout分辨率、标签相关非因果与视觉扰动仅开环证据；核验clockoffset未实际应用、重试非严格5次、mock仅回放RGB非物理深度同步证明；指出Figure7机器分配与Table1逐行计数不一致                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [robodojo](../../src/content/blog/paper-deep-dive-robodojo/index.mdx)                                                   | 已审校 | 纠正当前观测无历史、单checkpoint跨本体、最强维度与人类上限表述；补35目录/三seed/训练预算/类别权重口径；补统计聚合与任务级23.1pp波动，限制跨sim-real比较；核当前官方仓库改名、eval-only范围、观测RGB修复与有效episode分母；区分Score下降与SR及架构因果推断                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [robodual](../../src/content/blog/paper-deep-dive-robodual/index.mdx)                                                   | 已审校 | 撤回action_chunking_size=0关闭chunk的错误代码批评；纠正独立消融当累积删除、最大收益归属及原文0.8笔误；澄清真机直接未来第8步动作、并行vs低频调用、temporal权重新旧方向；补teacher-forcing、实际无causal mask、CFG保留VLAcontext；统一pp与relative增益、数据效率预适配成本及Table2错误均值                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [robotwin-2](../../src/content/blog/paper-deep-dive-robotwin-2/index.mdx)                                               | 已审校 | 澄清专家程序生成与视觉策略信息差，五本体采集非统一策略迁移；补10任务71.3%对全50任务43.34%，纠正10.9增益基线；纠正VLM混淆矩阵正类方向与原博客漏读附录准确率/token成本；补预训练5任务vs表8任务冲突、真机367/228%仅最难条件；核5次总尝试、>=.5门槛、单失败episode观察、固定seeds和数据/评测成功筛选；纠正桌高单侧范围、UR5 DoF、代码路径和RGB版本                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [rt1](../../src/content/blog/paper-deep-dive-rt1/index.mdx)                                                             | 已审校 | 纠正会议为 RSS 2023、五个错误图表编号和 headline 评测范围；明确正文与附录 seen/unseen 数量矛盾。；核对公开动作 mask、embedding 清零、逐维多次前向、LAST episode mask 与额外 loss 缩放，纠正架构名与运行代码混淆。；补充 TokenLearner 软聚合、动作量化分辨率与逐维多模态边界；拆开15ms网络、100ms预算、280ms定时和3Hz控制。；补全附录模型消融、数据消融的分布混杂、模拟选模机制、SayCan组合系统和50步视频边界。；补全模拟成功RL数据、Kuka动作/标签对齐与2:1混合、EDR测试外观修改及72次抓取，限制零样本跨具身解读。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [rt2](../../src/content/blog/paper-deep-dive-rt2/index.mdx)                                                             | 已审校 | 修复 co-fine-tuning 伪代码把所有样本都仅监督动作的错误，补充混合目标、采样与梯度权重区别。；移除误标为RT2官方代码的RT1元数据链接，保留有边界的前身实现参考；修正RT1完整动作与RT2八维动作差别。；修正PaLI55B结构误套5B、三处图号；指出Table4/6相同分项均值62/63不一致。；补充5B混合训练仅2pp且背景退化、训练步数混杂、PaLM-E机器人VQA图像预训练脚注，限制遗忘和零样本结论。；补全Language-Table独立数据/二维动作/五任务联合训练和误差棒未定义，澄清CoT额外训练与选锤子不等于工具技能。；补充评测重复数、6000试验合计、附录失败动力学及开放生态论述时效。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [rynnvalue](../../src/content/blog/paper-deep-dive-rynnvalue/index.mdx)                                                 | 已审校 | 区分观测剩余演示时间与最优hitting-time；澄清打乱产生的负时间差不是物理失败标签、归一化值也可下降。；核实isolation允许先前视觉历史、相对/绝对slot分别隔离，发现mismatch公开loss为均匀目标CE而非论文mask0。；发现发布评测采用LM Match门控/二值混淆分数，官方README复现isolated .647 vs论文 .675，并把论文与代码分开。；修正成功终止条件与公式换行、online Box固定reset、episode后奖励打分；补chunk折扣与terminal边界及IQL公开reward差异。；补IQL/SFT独立初始化、online冻结VLA latentSAC和Robometer offline warmstart、410条97.1%成功数据、20次评测与成功条件步骤口径。；补Table1与附录清洗数量阶段差异、排序非秒数校准、小模型分项非单调与单轨迹曲线证据边界。                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [sim1](../../src/content/blog/paper-deep-dive-sim1/index.mdx)                                                           | 已审校 | 纠正15:1样本等价方向、视角46pp、200/2000/10000预算，补完整泛化表；补附录StVK/弯曲/局部3x3Newton/几何位移限制与成本/过滤评估边界；纠正夹爪开合与末端运动分段混淆、阶段保持重组、19段任务先验；核验默认v参数化DDPM及src/tgt读取未用于端点替换，实现与论文条件化差异；纠正强制加载不等于强制使用扩散、补1.5x减速；明确零样本范围、新任务再训练、polo正文70附录93冲突及消融67/主表90差别                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [simpler](../../src/content/blog/paper-deep-dive-simpler/index.mdx)                                                     | 已审校 | 核验CoRL2024及arXiv v1版本，修正图4/5/7编号；补PD控制器累积目标/Ruckig机制及SysID半角旋转项；纠正MMRV论文<与代码>平局差异、API参数方向、Pearson退化及Kruskal非等价；解释TableI Drawer分组、Bridge中间抓取指标混入平均，以及真实最优与仿真最优不一致；修正validation MSE Google来自训练25条、RT2X未公开实现、单任务附录训练；补真实/仿真预算、Begin提前终止、Octo种子与纹理重复、具体策略适配和末态终止；限定扰动物理/Isaac/纹理验证范围并指出校准集过拟合风险                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [simplevla-rl](../../src/content/blog/paper-deep-dive-simplevla-rl/index.mdx)                                           | 已审校 | 前置改造OFT离散head、单图LIBERO无state，256为类别而非chunktoken数；澄清terminal reward一次与广播advantage、同初态GRPO、温度一致与token比率非全轨迹比率；纠正clipping为surrogate非硬概率限制；解释动态采样保留概率与额外rollout预算；厘清RoboTwin单任务、场景数与rollout量、各任务不全胜及重复评估非独立种子；指出unseen仅后续训练留出，冷启动OneTrajectory各任务1条的潜在暴露；不宣称全程零样本；按Table6报告50次每任务真实结果并指出任务名/32%/15%段落矛盾；限定pushcut任务示范外行为证据、无全预训练排除和效率测量，能力阈值限定于采样预算                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [slim](../../src/content/blog/paper-deep-dive-slim/index.mdx)                                                           | 已审校 | 澄清0.47B排除冻结T5与EMA、Stage1LIBERO90额外轨迹及两个阶段数据/预算；解释objective-specific attention masks和policy future slots不随候选action改变、可缓存原因；分开online future条件和EMA target梯度、featurewise LN-L1、Beta采样与论文uniform差异；区分repeated diffusion4独立训练采样和4Euler推理、运动6维分位数与夹爪保留；补实机0/.5/1里程碑及67.8非成功率、200试验和background劣势；补2000/10030评估分母、weighted Plus avg、CALVIN80.2全链与4.556长度及epoch15选择；指出Stage1消融数据计算混杂、EMA对照仍detach、热图非因果、延迟原生horizon差异                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [smolvla](../../src/content/blog/paper-deep-dive-smolvla/index.mdx)                                                     | 已审校 | 修正论文线性路径与目标速度的方向冲突，按官方噪声1→数据0和负Euler步长解释；state无监督损失；区分450M总模型与100M专家、SO100预训练与SO101目标微调、仿真没有机器人预训练及4GPU/30K GPUh成本；纠正实机78.3等为部分进度分数，并说明SO101位置OOD与仿真评测次数及非统一比较；纠正causal遮罩不等于防止带噪未来标签泄漏、L1中位数、不同消融基线和state前缀反例；纠正异步图号、旧动作时间对齐、空队列绕过过滤、平均延迟条件边界；19对9累计五次和1.42倍吞吐；補充完整附录任务prompt语义与数据标签边界，明确主分支新增功能不可追溯论文                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [sonic](../../src/content/blog/paper-deep-dive-sonic/index.mdx)                                                         | 已审校 | 区分PPO稠密跟踪奖励与监督克隆、统一手工reward与每技能reward工程；共享token依赖本体反馈不保证物理可行性；纠正阻尼弹簧位置式初始速度符号，验证PDF Eq8本身与文字边界条件不一致；提供正确解并明确分析改写；区分planner生成latent与控制FSQ、自回归参考上下文非真实状态反馈、10帧human与robot/hybrid不同时间间隔；精确VLA78维身体+手与81维SMPL区别、三点apple非直接token；75任务宏平均vs72/90=80池化，附录扔罐两数据来源；补IsaacLab与MuJoCo差异、MPJPE仅成功rollout、局部高度termination限制、6checkpoint非6独立训练、算力轴batch样本量混杂；补FSQ消融32/128GPU和每配置单次、S7单crawling7.4倍、公开BONES288h不是611h，当前代码prequant损失权重/外部token未重新量化                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [spatial-traces](../../src/content/blog/paper-deep-dive-spatial-traces/index.mdx)                                       | 已审校 | 纠正SimplerEnv官方SAPIEN/ManiSkill2而非原文Robosuite误写；确认官方仓库仅两文件无运行实现；重算TraceVLA TableI平均22.725与Fig4 19.9/正文18.7矛盾，提升15.35点非可归因四舍五入；微调下降11.4非10点；纠正ST-VLA只相对SpatialVLA两任务SR改善与GCS≠最终成功；外引基线不等预算，主表base未微调；深入解释TypeC恒定近深度的非真实3D几何提示、无方向箭头与时间顺序/速度信息损失，像素叠加非3D相机补偿；重算buffer7/15/30非单调，TypeC15平均劣于A15；联合提示+微调才改善，低样本是适配非从零；纠正索引b+1、MSEargmax且缺动作参数化不可确认；LoRA冻结/控制时延/训练配置不凭通例补造                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [spatialvla](../../src/content/blog/paper-deep-dive-spatialvla/index.mdx)                                               | 已审校 | 收紧统一空间坐标与零样本泛化，补q01/q99归一化及truncated Gaussian quantile公式；修正DROID最后三分之一为160k+40k；冻结ZoeDepth；区分Ego3D四点拼接与附录平均文字；区分论文三线性插值和官方griddata分片线性插值，adapt_emb/adpt_feature及CE不隐含几何距离；修正73%抓取vs63.63%完整成功；复算Franka单任务79.5/81.8及指令跟随18.2点与论文12点矛盾；补RT1converged74.6高于71.9，LIBERO逐suite非全胜/标准误与三种子，微调勺子退步，分辨率非单调；补深度消融45.4/70.5/72.7与44试次限制、插充电器27.3；处理运行20Hz和深度0.06秒计时不一致；校正图号并说明缺失token补0不是安全零动作                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [starvla](../../src/content/blog/paper-deep-dive-starvla/index.mdx)                                                     | 已审校 | 补全逐benchmark训练预算、双视角无状态、checkpoint筛选、Simpler五次评估不是训练种子、RoboTwin随机数据已训练；重写Table9 generalist比较：RoboCasa同表53.8到57.3仅3.5点，LIBERO specialist多项Avg复算不符；指出Table3 piFAST32.1vs48.3，Table6 pi44.33vs43.9，Google第四任务缺失导致不等任务均值；加入完整§8效率解释、弱扩展79%、固定步数样本量和Table10/11起点差异；核验最新稳定代码服务端反归一化actions和模型normalized_actions层级；更新版本与避免重复缩放；区分VLM初始化/辅助损失分类，WM4A取t=0表示非未来视频规划，GR00T命名非已异步；补具体OFT query/PI多层vsGR00T最后层、cotrain梯度加和及qwen依赖、ST4VLA中间配置和非API因果                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [starvla-alpha](../../src/content/blog/paper-deep-dive-starvla-alpha/index.mdx)                                         | 已审校 | 更新ECCV2026/v2与独立官方仓库，核验动态horizon/有效维度masked L1/按元素归约/服务端反归一化；区分论文mean_std与公开LIBERO/RoboTwin/RoboCasa min_max、Simpler q99，说明原checkpoint未恢复与新发布98.0非原论文98.8；复算LIBERO多头Avg错误，specialist97.85非98.8；Google最佳差值3.3非6.8；padding RoboCasa对RDT5.0非4.8；修正ARX5提升20.9百分点并报告progress54.04vs54.5内部不一致、各任务退步/失败、附录E四平台缺表；补动作预训练规模和同任务随机示范收益边界、状态少数据10.5点大收益、历史退步；补初始化/规模/batch附录与主表不同generalist数字、batch样本量混杂和预算冲突；补Franka OOD85.3/76.3与放蛋降22.5、LIBEROPlus77.8/79.7但相机弱；收紧joint training不等于未见embodiment                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [t-rex](../../src/content/blog/paper-deep-dive-t-rex/index.mdx)                                                         | 已审校 | 纠正训练action时间覆盖全区间与推理分段的混淆，补no_grad KV与延迟增强、同快照重启、非动作残差含义；将65%成功率改为含部分完成的分步得分，补16次/任务与评分例子、30分差距和对照训练不一致；校准5/20Hz网络、30Hz采集与300Hz控制，解释62维动作和每指一个VQ code；纠正图号与VQ/形变消融归属，拒绝相加收益，补预训练/中训2x2实验与零样本能力范围；核官方代码future cosine loss、在线冻结VQVAE、main分支delay_k=0及公开50h子集边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [tacvla](../../src/content/blog/paper-deep-dive-tacvla/index.mdx)                                                       | 已审校 | 更新v4并纠正Gemma2.6B误读与触觉encoder冻结错误；区分120标量与36embedding、数据10Hz与推理频率；解释双门控必要性与mask语义；明确五项单独微调模型、每任务50示教20测试及非统一多任务策略；校正增益百分点、遮挡30/37.5/62.5均值，区分定性恢复与量化泛化；补门控消融未隔离contact flag/空间压力信息、无latency和官方代码等证据边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [thinkact](../../src/content/blog/paper-deep-dive-thinkact/index.mdx)                                                   | 已审校 | 纠正few-shot分项串位与原图均值39.1/算术41.2矛盾、Goal图面7.2非7.3；补5shot；厘清8坐标点、变长答案hidden states、32QFormer queries，视觉奖励非真实完成与物理验证；补轨迹检测/RDP/人手稳定化、SFT现成165kCoT与RL数据构造，标记RoboFail300/500不一致；补N15/75、局部闭环与20DDIM、N消融与17%执行时间开销，纠正B7逐suite增益；区别QA指标/仿真/定性恢复证据，GRPO公式reference细节未公开、不杜撰代码                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [tinyvla](../../src/content/blog/paper-deep-dive-tinyvla/index.mdx)                                                     | 已审校 | 纠正MetaWorld Avg是难度组等权而非任务等权，并核21.1百分点、双臂47.8正文44.5不一致；核当前代码动作minmax非meanstd、padding后全张量均值、增强默认开启与论文无增强冲突；解释LoRA基础权重冻结与视觉适配器仍训，5%不等于整个VLA比例，10维动作与论文7维范围；收紧视角/光照/干扰物泛化夸大，逐图报告真实分子分母及2/6次协议；补评测checkpoint误差口径、3BPaliGemma规模混杂、14ms计时边界、官方eval占位接口与分支名称问题                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [touchanything](../../src/content/blog/paper-deep-dive-touchanything/index.mdx)                                         | 已审校 | 补稀疏传感器编号映射、WiLoR默认姿态、软件快照同步与归一化响应非绝对力；核验帧级gate并非显式几何重投影、左右共享decoder与mask/TV差异；明确双向时序及滑窗未来帧平均为离线估计；发现论文物体划分与源码任务划分、任一点接触与5%比例定义的协议差异；纠正全视角不总最优和Contact IoU一般上界错误，补dropout分母和数据规模消融边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [touchworld](../../src/content/blog/paper-deep-dive-touchworld/index.mdx)                                               | 已审校 | 撤回无来源1/10/30Hz，解释控制频率与commit间隔；补120维与58维残差子空间、冻结策略及等价maskedMSE；界定TWM为子目标生成，非动作条件MPC；补实际收益、消融和planner控制变量；明确预测指标与样本数及泛化证据边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [tracevla](../../src/content/blog/paper-deep-dive-tracevla/index.mdx)                                                   | 已审校 | 修正N3相对基线而非优于默认N6；文本轨迹增益图文不一致按图5.1pp；补公开筛点均值阈值、20%dropout双原图fallback、256动作词表softmax；识别wrapper参数错名/硬编码路径，区分静态代码与可运行复现；补LIBERO混合四suite与评估种子口径，纠正图号及平均延迟                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [training-time-action-conditioning](../../src/content/blog/paper-deep-dive-training-time-action-conditioning/index.mdx) | 已审校 | 修正正文flow符号与附录不一致并自洽推导；区分承诺未来prefix与历史动作，完整chunk前向与postfix监督；补等训练预算、s随delay变化、置信区间与20%延迟非任务时长；核附录JAX参考代码rng split、randint上界与最终prefix覆盖缺口                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [twinbrainvla](../../src/content/blog/paper-deep-dive-twinbrainvla/index.mdx)                                           | 已审校 | 补仿真关闭state、真机254786预训练及RGB各100示范/OOD黄块；核公开build输入丢弃state/embodiment，state另传动作头，LLR属后续集成；重写attention简式保留mask/残差边界与联合softmax解释；纠正LIBERO非OOD、真机ID/OOD同幅收益、冻结/交互差值与参数规模                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [umi](../../src/content/blog/paper-deep-dive-umi/index.mdx)                                                             | 已审校 | 修正扳机用途/部署入口，补离线SLAM与初始化方式；展开SE3相对动作、10维表示及relative/rel区别，区分免全局外参与全免标定；补按到达时刻分设备补偿、整段过期fallback及频率/速度/预测执行horizon；修正投掷按物体、洗碗成功规则、野外60次含训练杯，补预训练消融混杂                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [umi-bench](../../src/content/blog/paper-deep-dive-umi-bench/index.mdx)                                                 | 已审校 | 明确Progress与FSR区别并重算23.6/19/7.6%完整成功率，条件不等权；修正最终状态评分的历史抓取分与阶段分档规则，标出麻将评分矛盾；补运行频率/推理延迟/硬件与chunk差异，区别协议设计与实际资源发布；补T7反常泛化与T8因素定义冲突，移除诊断即因果/消融表述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [unidex](../../src/content/blog/paper-deep-dive-unidex/index.mdx)                                                       | 已审校 | 修正FAAS21槽误读，核25指槽/27使用/32总维、mimic与Shadow映射差异；解释块注意力/KV缓存/普通Euler与RTC入口，核pose排列及scale offset；纠正文内flow协方差及公开残余噪声、预训练recipe不等价；收窄zero-shot为已预训练手的任务迁移，区分DemoGen增强与自然泛化、指标/相对提升/小样本                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [videovla](../../src/content/blog/paper-deep-dive-videovla/index.mdx)                                                   | 已审校 | 用代码v-prediction而非epsilon重写loss，区分独立噪声/共享时间与首帧channel条件；纠正13latent包含当前帧、示例latent命名、零动作占位、sample返回接口不一致；修正64.6%混合中间阶段、13新物体条件平均与约3Hz非重规划频率；收窄跨embodiment/新物体范围，删除反事实保证，补事后相关性不能预执行评分及消融统计边界                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [villa-x](../../src/content/blog/paper-deep-dive-villa-x/index.mdx)                                                     | 已审校 | 修正1.6M轨迹/223.5M帧颠倒及flow方向；ACT联合训练非冻结VLM；解释带噪latent与robot专家交互、不同Beta、mask与梯度边界，标注正文附录mask冲突；核发布LAM每转换2x32维共享32码本，配置heads差异，区分接口默认与权重；区分缩小数据消融/主表、probe新MLP与零样本计划，补LIBERO和真机退步/小样本及7/8任务矛盾                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [vista](../../src/content/blog/paper-deep-dive-vista/index.mdx)                                                         | 已审校 | 明确两小时为大预训练后的本机微调，区分14→69与TableI4→67测试；补switcher未定义/初始图像条件、5和10两waypoint、delta padding与边界重标；核实际vLLM采样不使用beam参数、CFG3与app入口，收窄demo复现范围；标注234 per-policy与三组场景计数歧义、14/10embodiment和token口径冲突；深化目标时间/空间错误到执行失败机制，区分生成跨本体与真实控制证据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [viva](../../src/content/blog/paper-deep-dive-viva/index.mdx)                                                           | 已审校 | 纠正剩余代价方向与ERS升降矛盾，公开代码缺失败惩罚且clamp0–1，margin仅同进度；修复裤子MS/ES与MDR0.643/0.397错置，限定OOD无错误检测；明确共用噪声time、shift5及Euler实现与论文DDIM差别，future归一化副本轴均值；补batch16vs192、offset类75vs配置50、终止截断及离线剩余帧依赖episode长度；解释辅助监督不保证动力学一致/无候选动作条件，公开闭环复现范围，真机计数不详与消融非单调                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [vla-0](../../src/content/blog/paper-deep-dive-vla-0/index.mdx)                                                         | 已审校 | 纠正TableII原文94.7到92.0差值应2.7pp；补真实四任务85/65/60/30对60/55/30/45与转向落后、未知测试分母；纠正保留词表必然保留语义和suite名字等于OOD泛化的结论；补B+1整数/量化误差/输出成本与masked-token因果监督机制；核代码确认解析未clamp、中点非安全停止、字符索引依赖tokenizer、streaming一次请求固定图像；区分实时并发8路与仿真时间平均，纠正OFT完整等同ACT表述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [vla-opd](../../src/content/blog/paper-deep-dive-vla-opd/index.mdx)                                                     | 已审校 | 修正单token logratio可正，只有期望负KL；推导entropy项、uniformteacher反例；纠正ReverseKL必定过滤epistemic uncertainty/有界熵/不遗忘的数学过度结论；区分固定state局部采样gradient与策略影响futurestate的完整目标，注明原伪代码无return-to-go；明确group不是GRPO组归一化，1traj不含教师和交互预算；3x限定更新次数，真机未测、多seed/墙钟/环境数缺失、四双臂task非跨embodiment零样本；复核仓库仍仅网页图表无训练实现；遗忘仅Object接近0不是四任务均0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [vlac](../../src/content/blog/paper-deep-dive-vlac/index.mdx)                                                           | 已审校 | 修正done最后5%而非后95%，修复ldots公式；解释相对剩余时间进度尺度、反向非反对称/终点零分母的原稿未交代边界；区分8B reward critic与2B actor线性value head、8B动作表与2B RL；按Table1纠正RT1完整8B F1=0.930与w/oego0.955、RoboNet NaN不等0、失败排序非分类准确率；重算Table3 returnexplore90非95、指出介入非逐任务改善与10trial边界；多机总交互512/588/650、单机137与背景混杂非5倍样本收益；补vLLM/Torch概率重算、调度非完整推理延迟、timestamp补偿；FAST代码分支非原稿数字解析；保留原稿版本范围并区分后续ICML/VLACcut；核全部附录及公开代码                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [vp-vla](../../src/content/blog/paper-deep-dive-vp-vla/index.mdx)                                                       | 已审校 | 补v3附录A局限/B计算/C远程8Bplanner延迟/D舀豆z上升事件106demo30vs50；纠正非event冻结overlay：缓存实体名、SAM逐step重定位；VLM视觉检查continue/proceed非自动推进；核launch覆盖旧YAML为Qwen3VL4B/QwenOFT/双图，撤回骨干矛盾；保留100k脚本与70k报告区别；补真实分母105/120、51/60、egg37/48等；Table9红箱OOD baseline75与图85矛盾；蛋盒部分计分36.5/40、13.75/20非成功率，并明确人工目标框对纯文本baseline额外输入；RoboCasa失败子集/24task加权、decomposition仅1pp且两任务退步、消融非逐组最优；纠正v3图号、grounding是overlay坐标CE非独立物体grounding、低层仍原task语言、事件来自预测夹爪command；补异步延迟三部件不能用policyalone频率宣称整体，附录prompt完整核查                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [vtam](../../src/content/blog/paper-deep-dive-vtam/index.mdx)                                                           | 已审校 | 纠正视频主干冻结后虚拟力梯度的作用范围，区分辅助监督与力/attention约束；披露正文末端动作与附录绝对关节动作冲突、RGB而非深度输入；补GE-base/LTX28层逐层cross-attention、50k/20k训练预算及不同家族算力口径；解释flow目标归一化而非自然方差平衡、26维目标与条件token；补80次/3类别宏平均90与试验91.25、Wipe40次、皮条>10cm与连续削皮依赖；限定消融因果归因、45度训练覆盖、1Hz更新不等于30Hz触觉反馈、附录预测只定性；重新核查404且拒绝将非官方MVP称官方实现                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [warp-rm](../../src/content/blog/paper-deep-dive-warp-rm/index.mdx)                                                     | 已审校 | 按v4更新512配对场景、8方法等31.5%筛选对照，明确仿真二值筛选不验证连续加权；纠正D4/D5 WARP20/20、50.6/44.6吞吐，撤回混用D2数值；推导1395源帧归一化、46.5s窗口与逐源帧滑动，解释非因果离线奖励边界；细化时间标签假设、路径预算、C51边界与非校准不确定性；补成功条件TTC、失败超时吞吐、重置排除规则和18倍含义；补新任务RM重训、模拟分层参考集、真实61.2s rollout与全chunk执行；补新v4错误标注直接验证及24对/452轨迹、参考集重叠的口径；核对采样/标签/模型/损失/推理/注入实现与复现指南，澄清短轨迹fallback与仿真固定路径预算；保留旧128场景图但明确历史版本，记录公开基线再生限制                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [what-matters-latent-actions](../../src/content/blog/paper-deep-dive-what-matters-latent-actions/index.mdx)             | 已审校 | 按16页v1全文核对，区别41项设计选择与完整因子实验，限定结论的监督权限、控制接口和数据域。；纠正LIBERO-Plus使用动作标签后训练的错误：LIBERO动作训练、RobotInit评测；指出Stage I/II含Liberoplus视频，zero-shot不等于从未见过该数据域。；详解DAP/LAP/JAP以及JAP-DAP/LAP的阶段、头替换和损失：JAP跳过单独Stage II，LAP后训练只有动作损失，中间latent可改变。；用Figure 4数值反驳DAP总最弱、LAP总强、JAP普遍最优的笼统排序，保留作者推荐但说明表征与头的耦合。；区分LAOF辅助光流重建和RAFT/SEA-RAFT的CFD-AE；CoMo差分仍含未来信息，不能写成完全消除causal leakage；撤回严格等计算预算无证据论断。；补充probe的50步训练预算、MSE Gain公式、负值和零分母边界、21+8配置相关性口径；正则系数不应脱离loss reduction推广。；修正Figure 9最大提升为9个百分点、仅两规模点且加入OXE新数据域，不能宣称已验证scaling law；维度与归一化列明设置及例外。；真实实验317/400与259/400是5检查点×4任务×20次汇总；10k对40k是训练步效率，非四倍示教/全流程成本；真实使用DAP，不支持必须latent bottleneck；图号8改10。；主分支当前重定向XizoB/LAM仍仅README，说明实现不可核验；补充真正互联网视频及广泛embodiment仍未来工作。 |
| [world-action-model-robustness](../../src/content/blog/paper-deep-dive-world-action-model-robustness/index.mdx)         | 已审校 | 发现RoboTwin前四行八列均值、Fast-WAM七列均值混用，新增同口径复算并撤回确定排名；修正Fast-WAM延迟非同设备测量、RW速度与RT成绩不能拼接及chunk配置矛盾；补充专家可行性过滤、test_num默认100、噪声severity恒2和夹爪后续开爪命令；纠正扰动20子项/论文21计数矛盾、LIBERO加权汇总及X-VLA Light跨表冲突；将数据多样性和时空先验从因果定论改为有边界的机制假说，区分引用与重测成绩                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [worldarena](../../src/content/blog/paper-deep-dive-worldarena/index.mdx)                                               | 已审校 | 明确EWMScore只视频16项、非六维等权，修正非全部指标百分位归一化和8/14校准矛盾；重写policy模型内rolloutvsplanner模拟器闭环、1.2倍只用于evaluator；澄清二维box轨迹/估计深度/动作多样性为代理指标及动态惩罚共享测量；补六模型两任务25条及100次、policy五变体、Pearson非排序/校准证明，收窄差距外推；核DINO惩罚/NDTW公式与代码差异、JEPA CSV字段错及后续5任务协议版本                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [wsa1](../../src/content/blog/paper-deep-dive-wsa1/index.mdx)                                                           | 已审校 | 补EgoDex屏蔽动作loss与5源采样权重，692M帧及真实小时不等于全部成本；指出论文flow插值导数与target相反，代码噪声time方向一致；核Base默认顺序mask不含论文双向因果；Large匹配核心规则，joint是其他变体；区分Large默认action-only推理无未来视频与joint生成，32预测24执行；逐项重算真机均值与论文冲突，25.4pp不是20%相对，LIBERO非最优；明确定义teacher特征代理/无cycle物理保证、真机290条112分钟适配及预训练任务非零样本                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [x-vla](../../src/content/blog/paper-deep-dive-x-vla/index.mdx)                                                         | 已审校 | 纠正 LIBERO Long/Avg 与 RoboTwin 的列错位及 VLABench 进度分数口径；区分论文速度场背景与公开干净动作预测、固定噪声迭代采样；补充留出轨迹而非未见任务、Droid 视角重复与控制接口例外；补全 Transformer 负向消融、PEFT 训练参数与完整模型区别、定向采集和预算限制                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

## 已核对来源与尚存问题

### a1

- [来源 1](https://arxiv.org/pdf/2604.05672)
- [来源 2](https://github.com/ATeam-Research/A1/blob/main/a1/vla/affordvla_early_exit.py)
- [来源 3](https://github.com/ATeam-Research/A1/blob/main/a1/vla/action_heads.py)
- 定位：§3.2 Eqs1–2与官方sample_noisy_actions/predict_actions_flow_matching；§3.3.1 Eq9；§4.2对附录C Tables8–9；§5.5.3/Table7和附录A

### a2a

- [来源 1](https://arxiv.org/pdf/2602.07322)
- [来源 2](https://github.com/JIAjindou/A2A_Flow_Matching/blob/main/roboverse_learn/il/policies/a2a/a2a_policy.py)
- 定位：§3.2–3.3 Eqs3–6与a2a_policy.compute_loss；Fig7 caption；Table2；Appendix A.2；FigsS3/S8

### ace-ego-0

- [来源 1](https://arxiv.org/pdf/2606.17200)
- [来源 2](https://github.com/ACERobotics-VLA/ACE-Ego)
- [来源 3](https://acerobotics-vla.github.io/ACE-Ego/)
- 定位：§3.2 Eqs7–9；§5.3；Appendix A.5 Eqs20–24；§5.2.2；§5.4 Figure5/Table5；§5.5 Figure6

### act

- [来源 1](https://arxiv.org/pdf/2304.13705)
- [来源 2](https://github.com/tonyzhaozh/act/blob/main/detr/models/detr_vae.py)
- [来源 3](https://github.com/tonyzhaozh/act/blob/main/detr/models/transformer.py)
- 定位：§IV、§IV-A/C、Appendix C/F；DETRVAE.query_embed、Transformer.forward/tgt_mask；§VI-A单独调优TE消融

### actioncodec

- [来源 1](https://arxiv.org/pdf/2602.15397)
- [来源 2](https://github.com/ZibinDong/actioncodec/blob/main/actioncodec/configuration_actioncodec.py)
- 定位：§4 Eqs2–4与Appendix D；Appendix A.1/A.3/A.4/C；Table3；Table1 Pt标记

### adaptive-action-chunking

- [来源 1](https://arxiv.org/pdf/2604.04161)
- [来源 2](https://github.com/Adaptive-Action-Chunking/libero/blob/main/action_optimization/action_entropy_v2.py)
- 定位：§4 Eqs4–5；Tables1/3/4；Figure6；完整supplement A/B无所述消融；官方find_first_idx/select_chunk_size

### aim

- [来源 1](https://arxiv.org/pdf/2604.11135)
- 定位：§4.1 Eqs2/5/9；§4.2 Eq10；§4.3 Eq13；§5接触标注；§6 Tables1–2是全文唯一数值对照

### aspire

- [来源 1](https://arxiv.org/html/2607.00272v1)
- [来源 2](https://github.com/NVlabs/ASPIRE)
- [来源 3](https://github.com/NVlabs/ASPIRE/blob/main/aspire/sim/cap/skills/library.py)
- 定位：§3.3/3.5，Appendix D.1/D.2 held-out selection；Table 3/5/6/9及Table1；Appendix E.4/E.5和官方library.py

### bagel

- [来源 1](https://arxiv.org/abs/2505.14683v3)
- [来源 2](https://github.com/bytedance-seed/BAGEL/blob/main/modeling/bagel/bagel.py)
- [来源 3](https://github.com/bytedance-seed/BAGEL/blob/main/inferencer.py)
- 定位：§2.2–2.4/Appendix Figure15；Table1/3/5/8，§6/7.5；官方Bagel.generate_image与inferencer默认配置

### bagelvla

- [来源 1](https://arxiv.org/abs/2602.09849v2)
- [来源 2](https://cladernyjorn.github.io/BagelVLA.github.io/)
- 定位：Eq1–3与Appendix Figure7视觉检查；§3.5 对照Appendix C/D/Table6；Table3/4/8及§4.3.1

### beyondmimic

- [来源 1](https://arxiv.org/abs/2508.08241v4)
- [来源 2](https://github.com/HybridRobotics/whole_body_tracking)
- [来源 3](https://github.com/HybridRobotics/motion_tracking_controller)
- 定位：Methods Observation and Action/VAE; Supplement S1/S3/S4；Table S1/S5/S6/S7，Figure8；Results user study 与MuJoCo latent ablation；最终KaTeX检查修复控制字符或未定义论文宏

### caip

- [来源 1](https://arxiv.org/abs/2606.17256)
- [来源 2](https://caip-encoder.github.io/)
- [来源 3](https://github.com/yuvansharma/caip_encoder)
- [来源 4](https://github.com/yuvansharma/caip_encoder/blob/main/ACTION_FORMAT.md)
- [来源 5](https://huggingface.co/yuvansharma/caip-vitl256/blob/main/config.json)
- 定位：§2.3/2.4与Appendix C/D/E；Table1/5/6/7和§6；官方ACTION_FORMAT.md/config.json/modeling_caip.py

### chatvla-2

- [来源 1](https://arxiv.org/pdf/2505.21906v2)
- [来源 2](https://chatvla-2.github.io/)
- 定位：§3.2 架构与附录 C.2 注入层消融；§3.3 对比附录 B.1：50k 与15k Stage 1 差异；§4.1 OCR/数学评分；Table 4 同步数两阶段消融；附录 B.2 数据成分与过滤范围

### clap

- [来源 1](https://arxiv.org/pdf/2601.04061v2)
- [来源 2](https://github.com/LinShan-Bin/OpenCLAP/blob/main/starVLA/model/framework/VLM4A/QwenPIKM.py)
- 定位：v2 Eq.7；QwenPIKM.py 709-719 实际 kl_div 参数；Table I/II/VI/VII/VIII/IX；Algorithm 2冻结 action codebook与EMA；§V-A5人类视频采集；Figure10每类20对

### cogact

- [来源 1](https://arxiv.org/pdf/2411.19650)
- [来源 2](https://github.com/microsoft/CogACT/blob/main/vla/cogactvla.py)
- [来源 3](https://github.com/microsoft/CogACT/blob/main/sim_cogact/adaptive_ensemble.py)
- 定位：§3.1-3.4 Eq3-5；Tables3/6/7/9；附录B/C；官方vla/cogactvla.py 129-156,288-322；官方sim_cogact/adaptive_ensemble.py

### cosmos-policy

- [来源 1](https://arxiv.org/pdf/2601.16163)
- [来源 2](https://github.com/nvlabs/cosmos-policy/blob/main/cosmos_policy/models/policy_text2world_model.py)
- [来源 3](https://github.com/nvlabs/cosmos-policy/blob/main/cosmos_policy/datasets/dataset_common.py)
- 定位：§4.1/4.2/4.3；附录A.1及Figure8复制四帧机制；Table3 OOD 89.3 vs92.5；附录A.3.2评分；Table5累积消融；附录A.4.2推理暂停与8H100

### cot-vla

- [来源 1](https://arxiv.org/pdf/2503.22020)
- [来源 2](https://cot-vla.github.io/)
- 定位：§3.1-3.3 Eq4/5 Figure3；Table1四个suite与Average内部不一致；Figure4每任务独立模型；§4.4每条件5次；Supplement Table4/5预测间隔与超参数

### ctrl-world

- [来源 1](https://arxiv.org/pdf/2510.10125v3)
- [来源 2](https://github.com/Robert-gyj/Ctrl-World/blob/main/models/ctrl_world.py)
- 定位：v3附录A：15动作下采样5，7+5时间轴；附录B adapter和Table3 Close-laptop；Tables1/2/4-7；§6限制；models/ctrl_world.py 183-209

### dexumi

- [来源 1](https://arxiv.org/pdf/2505.21864v3)
- [来源 2](https://github.com/real-stanford/DexUMI/blob/main/real_script/eval_policy/eval_xhand.py)
- [来源 3](https://github.com/real-stanford/DexUMI/blob/main/config/diffusion_policy/train_diffusion_policy.yaml)
- 定位：§3.1 Eq1双层优化；§3.2 mask交集；Table1相同无触觉条件下Raw/Mask/Inpaint；五最终阶段均值.86；附录B.1不同手型初态；B.2累计成功；B.3执行；附录E.3视觉CLS和触觉；eval_xhand.py inference_iter_time及predict_action(None,...)

### diffusion-policy

- [来源 1](https://arxiv.org/pdf/2303.04137v5)
- [来源 2](https://github.com/real-stanford/diffusion_policy/blob/main/diffusion_policy/policy/diffusion_unet_image_policy.py)
- [来源 3](https://github.com/real-stanford/diffusion_policy/blob/main/diffusion_policy/model/vision/model_getter.py)
- 定位：§2 Eq3/5与官方DDPMScheduler.add_noise；§5.2脚注22initialstates；AppendixB.2平均改进；Table4 Kitchen .99/.44；Table5各encoder结果；AppendixA Table7 horizon；policy.predict_action start=To-1；model_getter.py保留avgpool与hybridobsencoder

### dp3

- [来源 1](https://arxiv.org/pdf/2403.03954v7)
- [来源 2](https://github.com/YanjieZe/3D-Diffusion-Policy/blob/master/3D-Diffusion-Policy/diffusion_policy_3d/config/dp3.yaml)
- [来源 3](https://github.com/YanjieZe/3D-Diffusion-Policy/blob/master/3D-Diffusion-Policy/diffusion_policy_3d/policy/dp3.py)
- 定位：AppendixA/C与TableXV horizon4/3；Eq2和implementation details sample冲突；dp3.py targettrajectory；§IV.A top5，TableIII DexArt/HORA100，AppendixC归一化回报；§V.C 手工变换点云和crop；TableIX–XIII；TableVI移除T-Net/BN从15.7到72.5；TableXIV安全

### dreamcontrol-v2

- [来源 1](https://arxiv.org/pdf/2604.00202v1)
- [来源 2](https://genrobo.github.io/DreamControl-v2/)
- 定位：§III-B.1轨迹维度；Eq2参数解；§III-C参考轨迹只奖励；AppendixC/D手工prompt/filter；TableI Group1/2基线；TableII旧域不同指标；TableIV有效轨迹率任务定义；TableIII仿真100；TableIX奖励

### dreamvla

- [来源 1](https://arxiv.org/pdf/2507.04447v3)
- [来源 2](https://github.com/Zhangwenyao1/DreamVLA/blob/main/models/dreamvla_model.py)
- [来源 3](https://github.com/Zhangwenyao1/DreamVLA/blob/main/utils/train_utils.py)
- [来源 4](https://github.com/Zhangwenyao1/DreamVLA/blob/main/models/action_model/action_model.py)
- 定位：§3.3和AppendixA.2动态mask监督；train_utils.py maskedMSE；generate_attention_mask显式重开action→world边；NUM_TOKEN_PER_IMAGE乘2；train_utils.py深度SiLog及DINO/SAM cosine；§4.1与Tables11/12参数矛盾；ActionModel100cosine默认；§4.3每trial20attempts；Table3任务均值；AppendixB.5延迟

### dreamzero

- [来源 1](https://arxiv.org/pdf/2602.15922v1)
- [来源 2](https://github.com/dreamzero0/dreamzero/blob/main/groot/vla/model/dreamzero/action_head/wan_flow_matching_action_tf.py)
- [来源 3](https://github.com/dreamzero0/dreamzero/blob/main/groot/vla/model/dreamzero/modules/flow_match_scheduler.py)
- [来源 4](https://github.com/dreamzero0/dreamzero/blob/main/README.md)
- 定位：§3.1/AppendixC Figure14仅视觉历史；§3.2/AppendixD噪声方向；Algorithm1漏1-；AppendixC H48/24 5FPS 6.6秒；§6两张GB200；Table3 Flash83/74/52；Table4 AR和BD均50；Figures8/9 DROID seen/unseen；§4scratch定义；§5Q4 72video9tasks 1:1 10k；Q5 55轨迹；AppendixG toaster push/depress；AppendixH失败案例；官方scheduler training_target noise-sample和add_noise

### dust

- [来源 1](https://arxiv.org/html/2510.27607v3)
- [来源 2](https://arxiv.org/pdf/2510.27607v3)
- [来源 3](https://periphanes.github.io/dust/)
- 定位：v3 Sections 4.2-4.3, Tables 1-3, Appendix A.3-A.5；v3 Tables 9-13 and Appendix A.11；Table 2 18/6 versus Appendix A.4 16/8

### dvla

- [来源 1](https://arxiv.org/html/2509.25681v1)
- 定位：Eq. 1, Sections 3.3-3.5；Tables 1-3; GR00T row 4+5+4+5 !=19; Hang Cups 7/10 versus8/10

### dworldeval

- [来源 1](https://arxiv.org/html/2604.22152v1)
- [来源 2](https://arxiv.org/pdf/2604.22152)
- [来源 3](https://dworldeval.github.io/)
- 定位：Sections 1,3.2.3,4.2.2-4.3; Appendix A.2,C；Figures 2,3,5,6,7; Tables 1-5

### ebench

- [来源 1](https://arxiv.org/html/2606.18239v3)
- [来源 2](https://github.com/InternRobotics/EBench/blob/main/baselines/X-VLA/run.py)
- [来源 3](https://github.com/InternRobotics/EBench/blob/main/baselines/InternVLA-A1/inference.py)
- 定位：v3 Tables2-3 Sections3.3-3.4,5-7 AppendixA-B；official adapters infer_horizon50/action_horizon_size30 and queue refill

### egoinfinity

- [来源 1](https://arxiv.org/html/2606.17385v2)
- [来源 2](https://huggingface.co/datasets/Rice-RobotPI-Lab/egoinfinity)
- [来源 3](https://huggingface.co/spaces/Rice-RobotPI-Lab/EgoInfinity)
- 定位：Appendix A.1-A.9, B.1-B.3, C.5; Tables1-6；Dataset card Retarget 104 clips with per-clip varying fps

### egolive

- [来源 1](https://arxiv.org/html/2604.23570v1)
- [来源 2](https://arxiv.org/pdf/2604.23570)
- 定位：Sections3.1-3.3,4.1-4.3; Tables1-3；Figures5-8 evidence type versus quantitative tracking benchmark

### egoscale

- [来源 1](https://arxiv.org/html/2602.16710v1)
- [来源 2](https://arxiv.org/pdf/2602.16710v1)
- [来源 3](https://research.nvidia.com/labs/gear/egoscale/)
- 定位：§2.1–2.5 and Appendix D: transforms, retargeting, three training stages, adapters；Figure4: average score .24/.53/.71/.83; success .02/.28/.38/.56；§3.3 Eq1 Figure5: printed units inconsistent; 2000x20x16 evaluation；§3.1 Appendix B: conflicting bottle counts, additive/progress rubrics；§3.4 Figure6 and §3.6 Figure8: per-object one-shot and representation ablation；Official project still Coming Soon on 2026-09-22

### egosteer

- [来源 1](https://arxiv.org/pdf/2607.09701)
- [来源 2](https://github.com/egosteer/egosteer)
- [来源 3](https://github.com/egosteer/egosteer/blob/main/src/policy/egosteer_loss.py)
- [来源 4](https://github.com/egosteer/egosteer/blob/main/src/policy/egosteer_inference.py)
- 定位：§3–5 Appendix A–C: geometry/filtering/robot stack/action-WM inputs；§6 Table1 and Appendix Tables4–11: all evaluation scopes/budgets/counts；Appendix C.2 attention pattern, Eq3–4 and future feature target；Official src/config/model/qwen3_vl_2b.yaml loss weights; src/policy/egosteer_loss.py masked feature MSE; inference.py Euler prefix

### egoverse

- [来源 1](https://arxiv.org/html/2604.07607v2)
- [来源 2](https://arxiv.org/pdf/2604.07607v2)
- [来源 3](https://github.com/GaTech-RL2/EgoVerse/blob/main/egomimic/algo/hpt.py)
- 定位：§IV and Appendix VIII-G–J: action representations, temporal alignment, CFM, mixture and rollout rubrics；TableII: EgoVerse-A75h vs industrial portions；Appendix VIII-K TablesVIII–XI/Figs17–18: fixed-vs-variable budgets and task-dependent diversity；hpt.py compute_ot_loss/compute_ot and pi.py PI0Pytorch implementation inspected

### evo-0

- [来源 1](https://arxiv.org/html/2507.00416v3)
- [来源 2](https://arxiv.org/pdf/2507.00416v3)
- [来源 3](https://github.com/MINT-SJTU/Evo-0)
- 定位：§III-B Eq3–6 and trainable parameter list；§IV-A Fig2 and inference speed；§IV-B Fig4 .42/.56/.53/.55 training results；§IV-C TableI mixed score footnote and trial counts；§IV-D TableII base70%, position/height ties and fixed wrist view；Official repository remains README/License Coming Soon

### fast

- [来源 1](https://arxiv.org/html/2501.09747v1)
- [来源 2](https://arxiv.org/pdf/2501.09747v1)
- [来源 3](https://huggingface.co/physical-intelligence/fast/blob/main/processing_action_tokenizer.py)
- [来源 4](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/tokenizer.py)
- [来源 5](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/training/config.py)
- 定位：§V Algorithm1/TableI: DCT quantization/BPE and rate-fidelity；§VI-B–F Figures6/8/9/11 and Fig15: policy/offline/generalist/compute distinction；Appendices A–E: tokenizer mixture, training recipe, DROID data and task rubrics；HF processor **call**/decode norm=ortho and clipping; OpenPI tokenize/extract_actions/config inspected

### fast-in-slow

- [来源 1](https://arxiv.org/html/2506.01953v1)
- [来源 2](https://github.com/CHEN-H01/Fast-in-Slow)
- [来源 3](https://papers.neurips.cc/paper_files/paper/2025/hash/8cf3760422b9d4505589a97c8f9569e7-Abstract-Conference.html)
- 定位：完整阅读v1主文§1–5及附录A–E；§3.3串行调度；§3.4目标；Table1–3主结果；Table6–10消融；AppendixB.1理论频率；官方models/backbones/vision/dinosiglip_vit.py和timm/models/vision_transformer.py核对视觉维度；官方scripts/sim.py以及models/vlas/fisvla.py、models/vlms/prismatic.py核对慢快前向与动作块循环

### faster

- [来源 1](https://arxiv.org/html/2512.04952v1)
- 定位：§3.1 RVQ/式1；§3.2 BAR/式3；§4.2 VRR/式4；Table1:87.9-76.5=11.4；Tables2/5 latency；Appendix A.1/A.2/Table4；Appendix A.3/Table7
- 原文或实现尚存问题：v1 A.2文字WBC block size8而Table4为7，Table2前向次数亦无法由Table4复算，已在正文标明

### fastumi

- [来源 1](https://arxiv.org/html/2409.19499v2)
- [来源 2](https://github.com/zxzm-zak/FastUMI_Data/tree/16bb1a966994fbf27fb7985f404d134d24b44f30)
- 定位：§III-C式1–7；§IV-C/D/E式8–12；§VI与TablesI–VI；data_processing_to_tcp.py/get_gripper_width/transform_to_base_quat；data_collection.py:235–262；data_processing_tcp_to_dp.py

### fd-vla

- [来源 1](https://arxiv.org/html/2602.02142v1)
- 定位：§III-C式3–5；§III-D式6–7；§III-E式8；§IV-C Figure6；§IV-D TableI；Figures4/5/7
- 原文或实现尚存问题：原文flow向量场与插值方向矛盾、force projection冻结策略未给出，正文明确保留

### finevla

- [来源 1](https://arxiv.org/html/2605.27284v1)
- [来源 2](https://github.com/xlang-ai/FineVLA/tree/8d02bf9a22618c47c501d7ee1345bce09ff4d8c6)
- 定位：§3.2/§4.1/AppendixA.4.4；Tables2–3 vs pinned README updated GT；A.3.3 equations1–4；Tables20–21；A.6.1/Tables25–26；utils/dtw_distance.py；train_starvla.py:\_train_step；QwenGR00T.py:predict_action
- 原文或实现尚存问题：论文正文/附录混合采样描述、RDT FG计数不一致，正文明确指出而非拼接复现参数

### forcevla2

- [来源 1](https://arxiv.org/html/2603.15169v1)
- [来源 2](https://sites.google.com/view/force-vla2/home)
- 定位：全文及附录A–D，公式2–15，Tables1–5，Figure6实际图像；官方项目页代码与数据仍待公开

### ftp-1

- [来源 1](https://arxiv.org/html/2606.13102v1)
- [来源 2](https://github.com/michaelyuancb/ftp1-policy/tree/89fa681d6c014cce28300946b7526db808e0b1c1)
- 定位：全文及附录A–E、Tables1–6；官方attention mask、forward/sample、tokenizer与inference wrapper、训练启动脚本

### g05

- [来源 1](https://arxiv.org/html/2608.11739v1)
- [来源 2](https://opengalaxea.github.io/G05/)
- 定位：全文及Tables1–7、Figures1/11/12、§4默认no-CoT；项目网页发布JS外链，未见官方实现链接

### genie-envisioner

- [来源 1](https://arxiv.org/html/2508.05635v3)
- [来源 2](https://github.com/AgibotTech/Genie-Envisioner-V1/tree/d41358f7548f2cd9fc4b79fcdf7d86d15a8d7b1e)
- 定位：论文v3全文、Tables1–2及Figures1–18；训练器target_action、custom_pipeline视觉缓存、MVActor及LeRobot配置

### gr-rl

- [来源 1](https://arxiv.org/abs/2512.01801v3)
- [来源 2](https://arxiv.org/html/2512.01801)
- [来源 3](https://seed.bytedance.com/gr_rl)
- 定位：全文§2–7、式1–4、Figures1–8、在线训练与评测协议；官方项目入口未提供可核验实现

### gr00t-n1

- [来源 1](https://arxiv.org/html/2503.14734v2)
- [来源 2](https://github.com/NVIDIA/Isaac-GR00T/tree/755876a9afdb41ca6eb6383b36f4a0adb085c73f)
- [来源 3](https://huggingface.co/nvidia/GR00T-N1-2B/blob/fc879581ca32f4f6d6e02cf0cc80452f6b0c3873/config.json)
- 定位：全文§1–6和附录A–F/Table7；n1-release action head/backbone/transforms及N1-2B配置；Table2与Table4 DexMG报告冲突，保留原报数值并注明；Figure1/2/5/7/8映射按论文HTML
- 原文或实现尚存问题：论文Eq1符号与其插值/正向Euler不一致；正文Table2与附录Table4的DexMG数值和汇总无法完整对齐；论文4步采样与公开模型配置16步不一致；公开action-head未包含附录定位辅助损失

### grinningface

- [来源 1](https://arxiv.org/html/2511.06619v1)
- [来源 2](https://github.com/zhangchuheng123/GrinningFace/tree/14d1d377f1f844b17645fb94b10cd28f6e10d01c)
- 定位：论文全文§1–5/附录A–B/三张表；固定提交环境evaluate与推理、规则采集脚本；公式链式概率解释及20/28条件分母核对
- 原文或实现尚存问题：训练主体、latent目标详细构造及论文完整Exe./Rec.评分尚未公开；Co-training使用的emoji与验证符号重叠约束未充分说明

### halo

- [来源 1](https://arxiv.org/html/2602.21157v2)
- [来源 2](https://github.com/qshou-coder/HALO/tree/9938cdf7e87f7675f49a29283b79a174052e35f8)
- 定位：全文§1–5和附录A–E含B2完整提示词/算法1–2；官方模型Qwen2MoT attention、Bagel.forward/generate_action/generate_image、trainer、HALO wrapper、HaloInferencer、dataset；Table1/2/5和Figure5–8核对
- 原文或实现尚存问题：正文预训练27k token与附录40k不一致；Algorithm2子目标索引与终止帧文字描述不一致；完整EM-CoT微调和checkpoint在核验提交仍列进行中；随机触发wrapper不能直接对齐论文成绩

### helix

- [来源 1](https://www.figure.ai/news/helix)
- 定位：官方全文Model and Training Details：Data、Architecture、Training、Optimized Streaming Inference；Results：Zero-shot multi-robot coordination与Emergent Pick up anything；Discussion单组权重与500小时口径

### hex

- [来源 1](https://arxiv.org/abs/2604.07993v2)
- [来源 2](https://github.com/Open-X-Humanoid/HEX)
- [来源 3](https://github.com/Open-X-Humanoid/HEX/blob/main/hex/model/modules/state_model/HEX_L2_StateDecoder.py)
- [来源 4](https://github.com/Open-X-Humanoid/HEX/blob/main/hex/model/modules/action_model/flow_matching_head/cross_attention_dit_hex.py)
- [来源 5](https://github.com/Open-X-Humanoid/HEX/blob/main/hex/config/training/hex_cotrain_eai_pretrain.yaml)
- 定位：全文§3.1–3.5公式1–12；§4.1实现；Tables1–2与§4.2试验数；Figures5–10；官方HEX.py query queue/reset，state head forward零缺失和horizon，action head sample_time/effective-dimension MSE，DiT gate time_weight

### hifi-umi

- [来源 1](https://arxiv.org/abs/2607.25895)
- [来源 2](https://huggingface.co/datasets/simple-world-lab/HiFi-UMI-2K)
- [来源 3](https://cloud.simpleai.tech/simple-world-lab/hifi-umi/)
- 定位：完整33页§3.1–3.4与Tables1–3；§5.1–5.7式1–6；§6.1–6.3 Tables4 Figures9–15；§7 limitations；官方数据卡Frame-Level Data/State and Action Representation/Coordinate Frames/Dataset Metadata

### hume

- [来源 1](https://arxiv.org/abs/2505.21432v4)
- [来源 2](https://github.com/hume-vla/hume)
- [来源 3](https://github.com/hume-vla/hume/blob/main/src/hume/models/modeling_hume.py)
- [来源 4](https://github.com/hume-vla/hume/blob/main/src/hume/models/value_query.py)
- 定位：全文§3.1式1及符号，§3.2式2–3，§3.3部署，§5limitations；AppendixB.2各平台horizon、C.1结果来源、C.2混合阶段指标；Tables1–3；Figures2–7；官方sample_actions/forward/select_q_actions/get_q_values/infer与CalQL正则实现

### inspire

- [来源 1](https://arxiv.org/abs/2505.13888)
- [来源 2](https://arxiv.org/pdf/2505.13888)
- [来源 3](https://github.com/InspireVLA/Inspire)
- [来源 4](https://github.com/InspireVLA/Inspire/blob/main/vla_scripts/openvla_with_vqa.py)
- [来源 5](https://github.com/InspireVLA/Inspire/blob/main/vla_scripts/datasets_with_vqa.py)
- 定位：全文8页含相关工作和结论；§II-A因果假设及§II-B原图仍输入动作分支；§III-A/Table I、§III-C/Table II、§III-D/Table III；Fig4/5/7；官方get_relation_to_robot、mask_labels、OpenVLAWithVQA.\_predict_vqa和\_predict_action逐段核验

### interndata-a1

- [来源 1](https://arxiv.org/abs/2511.16651)
- [来源 2](https://arxiv.org/pdf/2511.16651)
- [来源 3](https://internrobotics.github.io/interndata-a1.github.io/)
- [来源 4](https://huggingface.co/datasets/InternRobotics/InternData-A1)
- 定位：全文25页含AppendixA-D和Listing1已读；§5.1/Table2、§5.2/Table3、§6/Fig6/7、§6.1/Table4；§3 vs AppendixA/Table5、AppendixC/Table6 vs AppendixD首段；官方项目页与HF数据卡/文件树于2026-09-22核验

### internvla-a1

- [来源 1](https://arxiv.org/abs/2601.02456)
- [来源 2](https://arxiv.org/pdf/2601.02456)
- [来源 3](https://github.com/InternRobotics/InternVLA-A-series/tree/InternVLA-A1)
- 定位：全文25页含§1-6、References与贡献者附录；Eq1-4、Table1-5、Fig6（2B46.7%）/8/9；官方modeling compute_layer_complete、forward、sample_actions和配置/预训练脚本逐段核验

### internvla-m1

- [来源 1](https://arxiv.org/abs/2510.13778)
- [来源 2](https://arxiv.org/pdf/2510.13778)
- [来源 3](https://github.com/InternRobotics/InternVLA-M1/tree/InternVLA-M1)
- 定位：全文27页含§1-6及贡献者附录；§4.1.2/Table4 H8与独立suite；Table1/2缺失任务；Table3 PSS和QA性能；§4.2.1/Fig7；§4.2.2/Fig10；§4.2.3/Table5/Fig12与22小时子任务标注；官方M1/QFormer/QWen2_5/DiTActionHeader/train脚本/controller/adaptive_ensemble逐段核验

### knowledge-insulating-vla

- [来源 1](https://arxiv.org/pdf/2505.23705)
- [来源 2](https://www.pi.website/research/knowledge_insulation)
- [来源 3](https://github.com/Physical-Intelligence/openpi)
- [来源 4](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/pi0.py)
- [来源 5](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/tokenizer.py)
- 定位：阅读全文18页含附录A-C；§3与Eq3插值/目标、§5.1动作mask、§5.2 Eq5-6梯度路径；§6基线适配、Fig4-7训练与语言遵循、Table1 LIBERO数值；Appendix A.1 DROID/LIBERO协议、A.2真实任务评分、B架构与采样、C state表示；openpi Pi0.compute_loss/sample_actions及tokenizer源码；README公开范围仅flow head

### la4vla

- [来源 1](https://arxiv.org/pdf/2606.27295)
- [来源 2](https://github.com/MINT-SJTU/LA4VLA)
- [来源 3](https://github.com/MINT-SJTU/LA4VLA/blob/main/LA4VLA_1B/model/internvl3/internvl3_embedder.py)
- [来源 4](https://github.com/MINT-SJTU/LA4VLA/blob/main/LA4VLA_1B/model/action_head/flow_matching.py)
- [来源 5](https://github.com/MINT-SJTU/LA4VLA/blob/main/LA4VLA_1B/scripts/train.py)
- 定位：全文25页含附录A-C；§3/Table1诊断，§4/Table3数据，§5/Table4-7预训练与噪声；Appendix A.5基座坐标与dominant primitive；A.6人工评分；B实机4目标格与成功条件；C DAR/DCS；官方embedder全hidden输出、train全局mask、dataset.force_la像素归零、flow_matching.BasicTransformerBlock/get_action/forward、config默认值

### lap

- [来源 1](https://arxiv.org/pdf/2602.10556)
- [来源 2](https://github.com/lihzha/lap)
- [来源 3](https://github.com/lihzha/lap/blob/main/src/lap/models/lap.py)
- [来源 4](https://github.com/lihzha/lap/blob/main/src/lap/policies/transforms/action_text.py)
- [来源 5](https://github.com/lihzha/lap/blob/main/src/lap/training/config.py)
- [来源 6](https://github.com/lihzha/lap/blob/main/scripts/real_robot/shared.py)
- 定位：全文24页含附录A-C；§3.2动作、§3.4早期训练、B.8 flow、B.10 hero成本；Figure3零样本；Table2 heldout误差；Table3 LIBERO；Fig6 VQA、Fig7相对token loss；Appendix B.1 YAM关节微调、B.3复现baseline、C阶段评分；官方action_text/ActionProcessor/frame_transforms、lap.prepare_suffix/sample_actions、训练lap/lap_libero配置、shared.DROID_CONTROL_FREQUENCY/CHUNK_STEPS

### lapa

- [来源 1](https://arxiv.org/pdf/2410.11758)
- [来源 2](https://github.com/LatentActionPretraining/LAPA)
- [来源 3](https://github.com/LatentActionPretraining/LAPA/blob/main/laq/laq_model/nsvq.py)
- [来源 4](https://github.com/LatentActionPretraining/LAPA/blob/main/data/finetune_preprocess.py)
- [来源 5](https://github.com/LatentActionPretraining/LAPA/blob/main/latent_pretraining/deploy.py)
- 定位：全文27页含附录A-G与所有逐试验表；Appendix A Eq1-4/源码NSVQ说明无额外VQ loss；Appendix F采样窗口、Table3训练范围、B/C评测和baseline配置；正文Table2及附录Table13-16严格成功/进度得分、Appendix D配对胜率与任务分布；官方finetune_preprocess qcut/夹爪、deploy箱中点、sampler动作自回归；脚本batch/步数

### lawam

- [来源 1](https://arxiv.org/abs/2606.15768v1)
- [来源 2](https://arxiv.org/pdf/2606.15768v1)
- 定位：Sec 3.2–3.3 Eq 2–5; Appendix C.2/C.5；Table 1–3; Appendix C.4 and D.1–D.4；Appendix B; Figures 2–7,10,14–15

### learning-while-deploying

- [来源 1](https://arxiv.org/abs/2605.00416v4)
- [来源 2](https://arxiv.org/pdf/2605.00416v4)
- [来源 3](https://learning-while-deploying.github.io/)
- 定位：v4 Sec III–IV Eq 8–19, Algorithms1–2；Appendix A1–A3 and B2/C1; TablesI–VI；AppendixD Figure10 latency/reliability; Figures3/5/6/8

### lerobot

- [来源 1](https://arxiv.org/abs/2602.22818v1)
- [来源 2](https://arxiv.org/pdf/2602.22818v1)
- [来源 3](https://github.com/huggingface/lerobot/tree/240ea44cf9f887df944019cf46e18a0d496e1a56)
- 定位：Sec3.2–3.4 Tables2–3; AppendixC Figure10；AppendixE Table5; Figures4–8；Official 240ea44 configs.py/robot_client.py/streaming_dataset.py/lerobot_train.py

### libero

- [来源 1](https://arxiv.org/abs/2306.03310v2)
- [来源 2](https://arxiv.org/pdf/2306.03310v2)
- [来源 3](https://github.com/Lifelong-Robot-Learning/LIBERO/blob/master/libero/lifelong/algos/er.py)
- [来源 4](https://github.com/Lifelong-Robot-Learning/LIBERO/blob/master/libero/lifelong/datasets.py)
- 定位：Sec4.2–4.4; Sec5.1 Eq3 and footnote5；Tables1–3,8; AppendixB.1/D/E.4；Official configs lifelong er/packnet and lifelong/datasets.py/algos/er.py

### libero-plus

- [来源 1](https://arxiv.org/abs/2510.13626v3)
- [来源 2](https://arxiv.org/pdf/2510.13626v3)
- [来源 3](https://github.com/sylvestf/LIBERO-plus)
- 定位：Sec2/4/5 Eq4–8; Figures2–5；Tables1–2,7–10; AppendicesA,C,D,E,F；Official README eval num_trials_per_task=1, leaderboard and data assets

### lingbot-va

- [来源 1](https://arxiv.org/pdf/2601.21998v2)
- [来源 2](https://github.com/robbyant/lingbot-va)
- 定位：§3.2 chunk attention；§3.4异步丢弃t-1前历史；官方va_robotwin_cfg.py/action_per_frame16与latent loader的frame_stride\*4；Table1/3、§4.4不同训练设置；Figure7/8/10；AppendixA TableS4进度48.8vs62.9；TableS5试验17非满分成功

### lingbot-va-2

- [来源 1](https://arxiv.org/pdf/2607.08639v2)
- [来源 2](https://github.com/robbyant/lingbot-va)
- [来源 3](https://technology.robbyant.com/lingbot-va-v2)
- 定位：§2.2–2.3 latent action、planner、MCP和HCT；§3.3/3.4人类数据与合成配对；§4.1参数计数、chunk2/window64；Table3频率定义；Figure4路由消融、Figure8直接标注数值、Figure10步数效率；§2.3.7 Eq29/30 FDM新增执行动作条件；官方README与VA2PDF

### mask-world-model

- [来源 1](https://arxiv.org/pdf/2604.19683v2)
- [来源 2](https://github.com/LYFCLOUDFAN/mask-world-model)
- 定位：§3.3–3.5 Eq3/8与AppendixA/Table6冻结矛盾；Table1 CosmosLatent.919/C2.918 vs§4.1 .873；AppendixAlgorithms1/2；ge_trainer.py noisy_actions/target_action/action_full，eval_libero.sh exec_step8；convert_libero_hdf5_to_lerobot.py build_id2color统一object黄色；Tables7/8复算nPAUC .64772/.62944；Figure5

### mimicgen

- [来源 1](https://arxiv.org/pdf/2310.17596v1)
- [来源 2](https://github.com/NVlabs/mimicgen)
- [来源 3](https://mimicgen.github.io/)
- 定位：§4.2/AppendixM相对pose推导；pose_utils.py新pose\*源pose逆；AppendixO评测最佳checkpoint/3seed表均值；T生成seed检验；AppendixH真实DP76%、插值设置及TableI.2质量差异；Figure4 D2最低13.3/Mobile25source；F/G目标域生成再训练；AppendixR覆盖43.5%；U CoffeeD1生成63.5→4.3，策略90.7→77.3；robosuite.py归一化/反归一化、waypoint.py成功逻辑OR、公开env_interfaces目录

### mm-act

- [来源 1](https://arxiv.org/pdf/2512.00975v2)
- [来源 2](https://github.com/HHYHRHY/MM-ACT)
- [来源 3](https://github.com/HHYHRHY/MM-ACT/blob/main/models/modeling_mmact.py)
- [来源 4](https://github.com/HHYHRHY/MM-ACT/blob/main/experiments/robot/libero/run_libero_eval.py)
- [来源 5](https://github.com/HHYHRHY/MM-ACT/blob/main/experiments/robot/robotwin/deploy_policy.py)
- 定位：§3条件分布与附录A标签生成/B解码/C训练；Tables1–3独立套件模型与真机混合指标；§4.1/4.2任务及数据；Tables4–8辅助模态评估、长chunk消融、状态输入；官方modeling_mmact.action_generate、run_libero_eval action_chunk[:8]、robotwin deploy_policy整chunk执行

### mmada-vla

- [来源 1](https://arxiv.org/pdf/2603.25406v3)
- [来源 2](https://github.com/yliu-cs/MMaDA-VLA/tree/b9644cf7389f2b6f4446839dc59377d1f585df2d)
- 定位：§3.2/Figure2区块注意力；§3.3 Eq3/§3.4 Eq4-5；Tables1–5与Figure3/7；§4.2排除CALVIN-D；完整v3十页无另附录；commit b9644cf models/llada.py attention忽略mask；utils/dllm_cache.py同样；eval/utils.py默认配置；models/mmadavla.py固定已确定token/随机采样；prompt.py额外四个边界标签；action_tokenizer.py255centers

### molmoact

- [来源 1](https://arxiv.org/pdf/2508.07917v4)
- [来源 2](https://github.com/allenai/molmoact)
- [来源 3](https://github.com/allenai/molmoact/blob/main/preprocess/processors.py)
- [来源 4](https://github.com/allenai/molmoact/blob/main/olmo/hf_model/molmoact/modeling_molmoact.py)
- [来源 5](https://arxiv.org/abs/2412.10345)
- 定位：§2.2–2.4；§3.1–3.2；Figures13–17嵌入提示人工查看；§4.1与Figure3；§4.2与Table4数据/算力冲突；Tables1–2、Tables15–23重新算术核验；Figure5基线柱值对照Table17；附录D.2–D.7评测协议、Table23平均.7467/.4133、满分7/15与2/15；附录A–G全文；官方processors Depth/Trace/ActionProcessor；modeling_molmoact parsers；run_libero_eval完整chunk执行

### mu0

- [来源 1](https://arxiv.org/html/2606.13769v2)
- [来源 2](https://github.com/Yoonkyo/mu0)
- [来源 3](https://github.com/Yoonkyo/mu0/blob/main/docs/release/TRAINING.md)
- 定位：完整阅读v2主文§1–6及附录A–F；附录A.1/A.2预算与过滤；B.2/B.3样条/流/rigidity；B.4门控；附录D.1指标与单A6000；D.3/D.4控制协议；Tables6–8输入/容量/数据消融；官方trace_dataset.py、bspline_basis.py、modeling_smolvla.py、mu0_policy.py以及releaseTRAINING全文

### multiview-il

- [来源 1](https://arxiv.org/html/2604.00557v1)
- [来源 2](https://yichen928.github.io/robot_multiview/)
- 定位：完整阅读v1主文I–V及TablesI–VI/Algorithm1，无附录；§III-C Eq5/7坐标变换；§III-D Eq8/9条件乘积和省略记号；TableIV的测试CamFL/FU含在FiveViews训练内；TablesV/VI聚合收益；项目主页当前只有Paper链接，未公开源码

### omniumi

- [来源 1](https://arxiv.org/html/2604.10647v3)
- [来源 2](https://baai-aether.github.io/OmniUMI/)
- 定位：完整阅读v3正文§1–5，无附录；§3.4Eq1–4电流力估计/双边控制/重力补偿；§3.5Eq8动作13维；§3.6Eq9–15虚拟目标/关节阻抗/IK；§4.1十姿态各1秒三维力；§4.2每条件一条轨迹及126维marker范数；Tables1–3无分母；项目页CodeComingSoon状态确认

### omnivla-rl

- [来源 1](https://arxiv.org/html/2604.17706v2)
- [来源 2](https://arxiv.org/abs/2507.18071)
- [来源 3](https://github.com/sylvestf/LIBERO-plus)
- 定位：完整阅读v2§1–7及公式1–26、Tables1/2；无附录；渲染PDF第9页检查Figure3雪花：StageIReasoning和StageIIISpatial冻结，与caption/§5.1冲突；对Eq10应用论文自身线性路径score推导，对Eq18按KL定义核验方向与符号；GSPO原论文2507.18071名称；LIBERO-Plus官方repo七类扰动；v2References实际引用LIBERO-PRO

### omnivta

- [来源 1](https://arxiv.org/pdf/2603.19201v3)
- [来源 2](https://github.com/MrSecant/OmniVTA)
- [来源 3](https://huggingface.co/datasets/tars-robotics/OmniVitac)
- 定位：v3全文I–VI及References完整阅读；IV-C历史2D位置条件，IV-D Eq9聚合特征，IV-E时间重复与残差标签；Figure5 slow4Hz、TableX230ms/480ms/3.5ms；TableII每对象150示教；V-B评分定义、TableIV；TableIX 0.40→0.47→0.53与文字gating冲突；TableV Grasp cosine0.72<0.75，VI未列双臂未来工作；官方仓库仅LICENSE，数据卡空

### onetwovla

- [来源 1](https://arxiv.org/pdf/2505.11917v2)
- [来源 2](https://github.com/Fanqi-Lin/OneTwoVLA)
- 定位：v2正文1–5及附录A–I全文阅读（41页）；Figure6三方法平均57/63/87；Table1错误事件分母；C.1交互流程有差异；C.3/Table4 grounding计数；E6000x17+10000计划及Table11质量；F.1/F.2/F.3/Table14；G.1/G.2与I失败例；pi0_fuse.py compute_loss/prefill/reason/act、umi_dataset.py235–320、training/config.py681–717、train脚本和README

### open-aoe

- [来源 1](https://arxiv.org/pdf/2607.14183v2)
- [来源 2](https://github.com/ant-research/Open-AoE)
- [来源 3](https://github.com/ant-research/Open-AoE/blob/main/aoe-training-ready/ACTION_SPEC.md)
- [来源 4](https://github.com/ant-research/Open-AoE/blob/main/aoe-training-ready/lerobot/scripts/convert_open_aoe_to_lerobot.py)
- 定位：全文1–6与Privacy附录完整阅读25页；Figure1发布方式；§3.4/3.5重建和质量门；Table2动作表示；§5.1 Eq1–3六指标；§3.6/5.2区间并集与字符串；§5.3 Eq4与§5.4 Eq5–6；converter.py hand_vectors、load_annotation_tasks、convert_episode、main；data spec§3.5/4/5；visualize.py CLI与fallback文档

### open-h-embodiment

- [来源 1](https://arxiv.org/html/2604.21017v3)
- [来源 2](https://github.com/NVIDIA-Medtech/GR00T-H)
- [来源 3](https://github.com/NVIDIA-Medtech/GR00T-H/tree/GR00T-H-N1.6)
- [来源 4](https://github.com/NVIDIA-Medtech/Cosmos-H-Surgical-Simulator)
- 定位：全文Introduction/Results/Discussion/Materials and Methods及Supplementary Text/Table S1-S4通读；Figure3 caption n20 vs Generalization n10,n30; knot45vs50; Figure4 2h/6h；Figure5 multiembodimentlocaldata and pooled significance; Figure6 n10x29；C-H-S-S Methods 25datasetsx2episodesx3seeds,3seed-level SD；official scripts/README_ACTION_SPACE.md; state_action.py convert_to_hybrid_relative and convert_to_hybrid_relative_with_engagement delta_valid=prev_engaged & engaged；GR00T-H-N1.6/open_h/gr00t_h_config.yaml:85000/0warmup vs TableS2 65000/5%,per-embodimentstate1.0

### open-x-embodiment

- [来源 1](https://arxiv.org/pdf/2310.08864v9)
- [来源 2](https://github.com/google-deepmind/open_x_embodiment)
- 定位：v9全文I-VI及TablesI-II阅读；无补充附录；TableI BridgeIRIS13/40/27/50,RAIL13/30/27/30,Google92/73/91；TableII row7 48.7/47 vs row4 44.4/52 vs row6 0/1；models/rt1.py tokenize_action/detokenize_action/\_construct_attn_mask; rt1_inference_example.py main and action；README observation; dataset notebook equalinterleave仅示例

### openvla

- [来源 1](https://arxiv.org/pdf/2406.09246v3)
- [来源 2](https://github.com/openvla/openvla)
- 定位：完整v3正文1–6及AppendixA–E,Tables1–12；footnote4 SigLIP-only efficiencyexperiments;Table8 33trials;Table11 blocking70/74.4/68.8；B.1 partialscore and fixedstart OOD;B.3 Wipe rubric,Table7;C Bridge firsttransition and RT2X 2ndlikely；action_tokenizer.py256edges255centers;RLDSBatchTransform predict_stop_token;oxe/materialize mask6true1false;HF vocabsubtractpadandmask；E removes68/46/72/121demos,3x500,Table12suite scores

### openvla-oft

- [来源 1](https://arxiv.org/html/2502.19645v2)
- [来源 2](https://github.com/moojink/openvla-oft)
- [来源 3](https://github.com/moojink/transformers-openvla-oft)
- 定位：v2全文I–VIII及AppendixA-A–A-G、TableI–XVI全部阅读；TableI 95.3/95.4/97.1/94.5;TableII DDIM50/10/5/2/1 Long91.1/91/90/85.7/0；A-D/TableIV–V parameters279M/853M;A-F/ TablesX–XIII n10/10/12/24,score51.25lid5/20；TableXIV 96.8/97;XV 91.9;XVI sixscores65.8→69.2；pyproject fork + modeling_llama.pySDPA731 is_causalFalse;traj_transforms effective_traj_len;film_vit_wrapper Linear;run_aloha_eval syncqueue;actionheads151M/269M

### pi-rl

- [来源 1](https://arxiv.org/abs/2510.25889v3)
- [来源 2](https://github.com/RLinf/RLinf)
- [来源 3](https://github.com/Physical-Intelligence/openpi/issues/687)
- 定位：全文24页 Sections1–6、AppendicesA–J已读；Eq3–9 与 OpenPi0Config/sample*mean_var_val/\_get_timesteps/get_log_prob_value/default_forward 核验；ExploreNoiseNet.set_noise_range/post_process 与 algorithms/utils.py chunk_level aggregation；dataconfig pi05*\* discrete_state_input=False；issue687；B.2与4.3.2；Tables1–13、Figures5–16：CALVIN Len5 vsAvg、D.2 ABC/D矛盾、E.2实机40%无分母、F.2LoRA变LR/update；Table11 H50/Hprime5or10与π0.5 H10；Fig7 update814.2/428.6s

### pi0

- [来源 1](https://arxiv.org/pdf/2410.24164v4)
- [来源 2](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/pi0.py)
- [来源 3](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/gemma.py)
- [来源 4](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/training/config.py)
- [来源 5](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/training/optimizer.py)
- 定位：全文v4正文与附录A-E通读；IV高斯插值/损失，B三块mask和sampling；VI-A 160k/320k/700k，VI-C scratch含VLM，Appendix C baseline初始化；Appendix D H50执行16/25，Table I 73/86ms，Appendix E逐任务评分；official pi0 embed_suffix/sample_actions及gemma get_config、training config/optimizer核验

### pi05

- [来源 1](https://arxiv.org/pdf/2504.16054v1)
- [来源 2](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/pi0.py)
- [来源 3](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/tokenizer.py)
- [来源 4](https://github.com/Physical-Intelligence/openpi/blob/main/README.md)
- 定位：全文正文I-VI与附录A-E通读；IV-B Eq1符号冲突，IV-D 280k/80k及筛选；IV-E 4/3相机，V-B排除MM预训练再40k地点实验；V-E固定LL及VI占高层MM11%；AppendixB四任务8/4/3/5评分；C两指标和OODdrawer；AppendixE连续imagepatch/attention/adaRMS与官方pi0/config/tokenizer/transforms对照

### pi07

- [来源 1](https://arxiv.org/pdf/2604.15483v2)
- [来源 2](https://www.pi.website/blog/pi07)
- [来源 3](https://github.com/Physical-Intelligence)
- 定位：v2正文I-X与附录A-G全文阅读；V-B loss max矛盾，III KI，VI-C三种subgoal训练；Appendix B attention树，C双7B分支/分辨率，D38/127ms及4H1001.25s；IX-A图6/7分母与expert rollouts；IX-C主joint，AppendixF/G GC人类协议和scoring；IX-D及AppendixG长任务与高层微调边界，IX-E两个20%控制数据量

### pld

- [来源 1](https://arxiv.org/pdf/2511.00091v1)
- [来源 2](https://wenlixiao.com/self-improve-VLA-PLD)
- 定位：正文1-6与附录A-D全文通读；3.2 probe replay与Algorithm1 piecewise SFT动作；Table1三suite，Table2 Octo-SFT及逐任务diff，AppendixC2 OpenVLA-OFT；4.3 Figure6/7 targetdemonstrations，Table3human及4subsets口径；4.4/D1 200demo+200successfulRL/30trials及rewardclassifier、YAM状态机，Table6pegseen

### priorvla

- [来源 1](https://arxiv.org/pdf/2605.10925)
- [来源 2](https://github.com/xinyuguo1566/PriorVLA)
- 定位：Sec3 and AppendixA: block attention and dual-expert trajectory; equations3-6；Table6 and15: w/oSQ70/30,w/oMQ75/42,FrozenViT65/37；AppendixB-C,H4: training and evaluation protocols; Table9 compute；Tables1-5,13-14: aggregate/per-task evidence, sign tests not multiseed；AppendixG Fig11: six qualitative VQA probes with SQdisabled; AppendixE-F tasks and rollouts；Official repository README only, checked2026-09-22; full32pages inclA-H read

### qwen-robotmanip

- [来源 1](https://arxiv.org/pdf/2606.17846v2)
- [来源 2](https://github.com/QwenLM/Qwen-RobotManip)
- 定位：Full44pagev2 Sections1-8 andreferences read; noappendix；Sec2 Table1,Sec2.4-2.5 data and ECoT privileged context；Sec3 Eq5vs6,Sec4Eq10-13 gradients/masks；Tables3-9 mainprotocol;Table8 printed49.6 vs fivevalues47.4；Tables10-14 realworld trials/ARX mixed transfer/Table30perembodiment；Sec6.4 Tables15-19,Figs18-22 andSec7 limitations；OfficialrepoREADME/assets only checked2026-09-22

### qwen-vla

- [来源 1](https://arxiv.org/pdf/2605.30280v2)
- [来源 2](https://github.com/QwenLM/Qwen-VLA)
- 定位：Fullv2 34pages Sections1-8 references; no appendix；Sec2.4-2.5Eq1-5 mask and normalization;Sec5.2.4 Table12 noState；Sec3.2 real/synthetic and proprietary mixture;Sec5.2.1Fig6 visuallyrendered page22；Sec4.2PPOvalueSG,singletransitionestimator,rollout128x8x8；Tables4-9 generalist/ALOHA/navigation/OOD;Table11cumulativeSFTvsRL；OfficialREADME/assets only checked2026-09-22

### rdt-1b

- [来源 1](https://arxiv.org/html/2410.07864v2)
- [来源 2](https://arxiv.org/pdf/2410.07864v2)
- [来源 3](https://github.com/thu-ml/RoboticsDiffusionTransformer)
- [来源 4](https://github.com/thu-ml/RoboticsDiffusionTransformer/blob/main/models/rdt_runner.py)
- [来源 5](https://github.com/thu-ml/RoboticsDiffusionTransformer/blob/main/data/hdf5_vla_dataset.py)
- 定位：全文28页及附录A-I完整阅读；§4、App B-D结构/128D映射/单位与数据权重；官方runner compute_loss未mask，conditional_sample最终mask；App F-H、Table9：500K checkpoint、48H100、130K微调、基线与trial协议；Table3及Figure1重算五项58.3/75/91.7/54/62→68.2；Table2第三列CorrectAmount；Figure4无预训练结构消融；§5.5 RTX4090 6chunks/s、381actions/s；AppD预训练MobileALOHA；代码HDF5夹爪scaling；最终KaTeX检查修复控制字符或未定义论文宏

### rdt2

- [来源 1](https://arxiv.org/html/2602.03310)
- [来源 2](https://arxiv.org/pdf/2602.03310)
- [来源 3](https://github.com/thu-ml/RDT2)
- [来源 4](https://github.com/thu-ml/RDT2/blob/main/models/rdt_inferencer.py)
- [来源 5](https://github.com/thu-ml/RDT2/blob/main/deploy/inference_real_fm.py)
- 定位：完整25页正文参考文献附录A-D阅读；视觉检查PDF第7页Figure7；Figure3/FM-VQ为41/45,29/26,52/51,27/25,47/44；Table2反应时间人类2661及命中88/85/76/69/68；AppA/B采集硬件/homepose与VQA；C.3 Table10 logisticnormal；D.2-D.5训练/零样本/指标/批次；官方README和deploy FM zero state、24×20、30Hz、TCP/夹爪与调度；rdt_inferencer缓存与注释distill；train.py token映射及-100label

### recap

- [来源 1](https://arxiv.org/html/2511.14759)
- [来源 2](https://arxiv.org/pdf/2511.14759)
- [来源 3](https://pi.website/blog/pistar06)
- [来源 4](https://github.com/Physical-Intelligence/openpi)
- [来源 5](https://github.com/Physical-Intelligence/openpi/blob/main/src/openpi/models/pi0.py)
- 定位：完整v2正文参考文献附录A-F阅读；IV-A MonteCarlo value，IV-B Eq2/3条件化，V-A/B KI/independentactions/indicator顺序，V-C Eq5reward；AppendixF N50/30%dropout/30-40-10%threshold/collectorcounts；VI-C4对照AppendixF数据矛盾；VI-C Figures7-12任务/吞吐/两轮/失败消除；AppD PPOproxy/SPO限制；官方openpiREADME仅pi0/FAST/pi05及flowhead；pi0.py beta缩放与10steps、默认task可覆盖

### ricl

- [来源 1](https://arxiv.org/html/2508.02062)
- [来源 2](https://arxiv.org/pdf/2508.02062)
- [来源 3](https://github.com/ricl-vla/ricl_openpi)
- [来源 4](https://github.com/ricl-vla/ricl_openpi/blob/main/src/openpi/models/pi0_fast_ricl.py)
- [来源 5](https://github.com/ricl-vla/ricl_openpi/blob/main/src/openpi/training/data_loader.py)
- 定位：17页原文正文附录A-D及参考文献全读；PDF第7页Figure4视觉复算；Figure4 ICL六任务40/40/20/30/20/20=17/60；finetune19/60及37/60；水槽无微调列；AppC小/大视角差异、15Hz/15×8、3→8与3→5执行步、1000steps及运行时；官方data_loader禁用DROIDindices_files，preprocessing默认top；tokenizer loss_mask仅postfix；模型概率混合与temperature分支；onlineclipdistance

### rl-100

- [来源 1](https://arxiv.org/pdf/2510.14830v4)
- [来源 2](https://github.com/Lei-Kun/RL-100)
- [来源 3](https://github.com/Lei-Kun/RL-100/blob/main/RL-100/rl_100/unidpg/uni_ppo.py)
- [来源 4](https://github.com/Lei-Kun/RL-100/blob/main/RL-100/rl_100/config/rl100_3d_epsilon.yaml)
- 定位：完整阅读v4 46页含refs及全部补充材料；Methods Eq3-11与补充S16-S25：Gaussian transition/AMQ delta/frozen encoder/CM；Table1两推理版本共1000；Table2六/三/五变化；TableS3八行重算；Figure4A-B独立50成功轨迹；FigureS6-S8三seed推理频率和消融；Task Details juice press固定回放；uni_ppo.py dp_align_update_no_share比率与recon条件；rl100_3d_epsilon.yaml默认64输出10/1步

### rlinf-user

- [来源 1](https://arxiv.org/pdf/2602.07837v4)
- [来源 2](https://github.com/RLinf/RLinf/blob/main/rlinf/data/storage/replay/buffer.py)
- [来源 3](https://github.com/RLinf/RLinf/blob/main/examples/embodiment/config/realworld_sac_flow_image.yaml)
- 定位：全文v4与附录A-D；III-IV系统机制；V/TableII-VI评估；Figure9/12/16；TableIX-X/SFT字段问题；官方buffer.py auto_save/add_trajectories/TrajectoryCache；realworld_sac_flow_image.yaml；async_huggingface_worker.py；nvidia_gpu.py max_ctas

### rlinf-vla

- [来源 1](https://arxiv.org/pdf/2510.06710v3)
- [来源 2](https://github.com/RLinf/RLinf/blob/main/rlinf/algorithms/utils.py)
- [来源 3](https://github.com/RLinf/RLinf/blob/main/rlinf/models/embodiment/openvla_oft/official/openvla_oft_action_model.py)
- 定位：全文v3及附录VII-X；TableI-II/III/VI；Figure18、20、21；IX-A评估do_sample协议；官方advantages.py；algorithms/utils.py预处理及logprob求和；OFT value head与discreteprediction；异步配置

### robocasa

- [来源 1](https://arxiv.org/pdf/2406.02523v1)
- [来源 2](https://github.com/robocasa/robocasa/blob/main/docs/use_cases/mimicgen.md)
- [来源 3](https://github.com/robocasa/robocasa/blob/main/docs/datasets/using_datasets.md)
- 定位：通读v1全文与附录VII-IX、Figures11-13全表；V-A72K及28K脚注；Figure8复合任务；Figure10真实三seed；官方main README及mimicgen.md64/65，dataset_registry_utils.py，collect_demos.py，using_datasets.mdv1.0.1horizon

### robochallenge

- [来源 1](https://arxiv.org/pdf/2510.17950v1)
- [来源 2](https://github.com/RoboChallenge/RoboChallengeInference/blob/main/robot/interface_client.py)
- [来源 3](https://github.com/RoboChallenge/RoboChallengeInference/blob/main/robot/job_worker.py)
- 定位：全文v1与附录A-B；§2.3Figures3-6、§3.2评分、Figure7/Table1机器计数、Figure9逐任务结果；official interface_client.py/job_worker.py/demo.py/mock_robot_server.py/mock_rc_robot.py

### robodojo

- [来源 1](https://arxiv.org/pdf/2607.04434v3)
- [来源 2](https://github.com/RoboDojo-Benchmark/RoboDojo)
- [来源 3](https://github.com/XPolicyLab/XPolicyLab)
- 定位：全文46页及附录A–K逐节通读；§3/5与附录D/K：训练目录、episode与模型预算；Tables1–7/9/12：榜单、吞吐、波动与chunk循环；官方base_env.py replicate_physics=False；eval_env.py run_eval分母；summarize_result.py逐维均值；README 2026-09-16/17观测与通道修复

### robodual

- [来源 1](https://arxiv.org/pdf/2410.08001v3)
- [来源 2](https://github.com/OpenDriveLab/RoboDual)
- [来源 3](https://github.com/OpenDriveLab/RoboDual/blob/main/prismatic/vla/datasets/calvin_dataset.py)
- [来源 4](https://github.com/OpenDriveLab/RoboDual/blob/main/prismatic/models/policy/diffusion_transformer.py)
- 定位：全文18页与附录A–D；渲染Figure6/9核数值与图例；§4.4/Table4：5%专家适配；Figure3 82.7/56.0/62.7；calvin_dataset.py **getitem**：window8/action_chunking_size偏移；train_generalist_calvin.py；Attention.forward masked_fill未赋值；DiT.forward cond_mask仅global_cond；dual_sys_evaluation.py最新buffer[0]；附录A oldest权重、sample prediction与future第8步；Table2行求和1.246非.40

### robotwin-2

- [来源 1](https://arxiv.org/pdf/2506.18088v2)
- [来源 2](https://github.com/RoboTwin-Platform/RoboTwin)
- [来源 3](https://github.com/RoboTwin-Platform/RoboTwin/blob/main/code_gen/task_generation_mm.py)
- [来源 4](https://github.com/RoboTwin-Platform/RoboTwin/blob/main/scripts/eval_policy_xpolicylab.py)
- [来源 5](https://www.universal-robots.com/media/1828033/ur5_tech_spec_web_en.pdf)
- 定位：全文24页附录A–L全部阅读，G.4/I prompts包含完整文字；Tables1–4/8–11；AppF/G：ASR范围、6894token、130样本混淆矩阵；task_generation_mm.py继承已有类/5次/单episode；test_gen_code.py关闭DR固定0–9；collect_data.py成功与关节检查；eval_policy_xpolicylab.py默认expert_check；\_base_task.py U(-h,0)、抓取规划；README当前XPolicyLab/RGB协议

### rt1

- [来源 1](https://arxiv.org/pdf/2212.06817v2)
- [来源 2](https://roboticsproceedings.org/rss19/p025.html)
- [来源 3](https://github.com/google-research/robotics_transformer)
- [来源 4](https://github.com/google-research/robotics_transformer/blob/master/transformer_network.py)
- [来源 5](https://github.com/google-research/robotics_transformer/blob/master/sequence_agent.py)
- 定位：全文及附录 A–D 通读：1923行、31页；§6.1–6.2 与 D.1/Table8 指令数量不一致。；RSS官方 proceedings rss19/p025；Tables2–7/13；Appendix C.1/C.3/D.2/D.3。；官方 transformer_network.py \_generate_masks/\_assemble_input_token_sequence/call；sequence_agent.py \_loss；tokenizers/action_tokenizer.py；film_conditioning_layer.py；configs/transformer_mixin.gin。

### rt2

- [来源 1](https://arxiv.org/pdf/2307.15818)
- [来源 2](https://robotics-transformer2.github.io/)
- [来源 3](https://github.com/google-research/robotics_transformer)
- 定位：全文及附录 A–I 全部通读，PDF26页1403行，末页Table2及Figures7/10文字均已读取。；§3.2/3.3/4.1–4.4；Appendix B–E训练数据/模型/超参；F.2重复数；G失败；H脚注和Tables4–6；I定性CoT。；RT2项目页无训练/权重链接；RT1官方README及tokenizers/action_tokenizer.py/transformer_network.py仅为前身实现，不作为RT2源码证据。

### rynnvalue

- [来源 1](https://arxiv.org/pdf/2608.09853)
- [来源 2](https://github.com/alibaba-damo-academy/RynnValue)
- [来源 3](https://github.com/alibaba-damo-academy/RynnValue/blob/main/rynn_value/modeling_rynn_value_lang.py)
- [来源 4](https://github.com/alibaba-damo-academy/RynnValue/blob/main/robometer/robometer/evals/baselines/rynnvalue.py)
- [来源 5](https://github.com/alibaba-damo-academy/RynnValue/blob/main/pi-rl/examples/dsrl_franka/train_utils_franka.py)
- 定位：PDF全文23页1292行、Appendix A和B.1–B.7全部通读；Tables1–10、Eq6–21。；rynn_value/attention_impl.py及modeling_rynn_value_lang.py \_build_pred_slot_extras/\_compute_value_loss，processor fusion flag与value_tokenizer clip/symlog decode。；robometer/robometer/evals/baselines/rynnvalue.py scoring/Match gate；confusion_matrix.sh eager；README Policy Ranking Reproduction Results。；pi-rl/scripts/train_iql.py \_chunk_reward；pi_iql_learner.py gamma^H；examples/dsrl_franka/train_utils_franka.py apply_reward_shaping/collector mask/replay gamma^q；SAC critic实际使用batch discount。

### sim1

- [来源 1](https://arxiv.org/pdf/2604.08544v2)
- [来源 2](https://github.com/InternRobotics/SIM1)
- [来源 3](https://raw.githubusercontent.com/InternRobotics/SIM1/main/components/datagen/traj_df/src/simple_diffusion.py)
- [来源 4](https://raw.githubusercontent.com/InternRobotics/SIM1/main/components/datagen/datagen_core.py)
- 定位：全文28页正文§1–5及附录A–D.5逐段阅读；PDF Figure7/8视觉核验；§3.2、附录B.1–B.7、Table2：物理能量、约束与参数；§4.1/4.2、Figure7/8、Table1、AppendixD.1 Table3：预算/成功率/内部不一致；AppendixD.4 Table4成本；D.5判别器限制；官方selector.py/ splitter.py/ datagen_core.py/ simple_diffusion.py/ df_train.py及run_pipeline.sh、filter_cloth_quality.py核验；最终构建修正美元符号被Markdown误识别为数学定界符的排版问题

### simpler

- [来源 1](https://arxiv.org/pdf/2405.05941v1)
- [来源 2](https://proceedings.mlr.press/v270/li25c.html)
- [来源 3](https://github.com/simpler-env/SimplerEnv)
- [来源 4](https://github.com/simpler-env/SimplerEnv/blob/main/simpler_env/utils/metrics.py)
- 定位：完整arXiv v1正文及附录A–G共1382行，AppC Algorithms1/2及TablesI–XIV核验；TableI Drawer指标由TableIV开关与放苹果两组平均；TableV Figure7平均含8指标；TableIV注2；AppB试验数量；AppG 25条训练/验证MSE；官方metrics.py、calc_metrics.py、maniskill2_evaluator.py、octo_model.py、action_ensemble.py、sysid.py和env_builder.py；官方PMLR v270/li25c CoRL2024出版2025

### simplevla-rl

- [来源 1](https://arxiv.org/abs/2509.09674v1)
- [来源 2](https://github.com/PRIME-RL/SimpleVLA-RL)
- 定位：全文Sections1–8（18页正文，后6页参考文献，无附录）；Sec4.1改造model、256vocab、chunk8/25、三次eval；4.2各suite/task数据口径；Sec5.2 OneTrajectory基座与Figure4留出设置；Sec5.3/Table6各50次并发现表文冲突；Sections3.1–3.4、Table7、Figures3/5；main_ppo.RobRewardManager、core_algos.compute_grpo_outcome_advantage/compute_policy_loss、ray_trainer.filter/collect loop；dp_rob temperature/action slice/mask & model parallel categorical sampling；rob_rollout process vs thread；default scripts config

### slim

- [来源 1](https://arxiv.org/abs/2608.09771v1)
- [来源 2](https://github.com/kzz1031/SLIM)
- [来源 3](https://github.com/kzz1031/SLIM/blob/main/reproducibility/canonical_recipe.json)
- 定位：全文18页含AppendixA.1–A.6，Figures7/11经渲染核读；Sections3.1–3.3 Eq1–10、slim_transformer SLIMBlock masks/forward_idm/forward_fdm/build_ctx_cache/sample_time/flow_targets/predict_action；slim_model online future梯度与\_encode_vision_ema noEMA detach；dataset前6维clip和future_t终点；AppendixA.3参数排除T5、A.4训练数据/超参、A.5原生horizon/计时、A.6得分定义；canonical_recipe pinned recipe/data counts/optimizer steps/1950/2000与7768/10030；README checkpoint epoch15；Figure7右轴CALVIN约4.39→4.556；Table3 EMA61.28→13.95；Figure11background49vs54

### smolvla

- [来源 1](https://arxiv.org/html/2506.01844v1)
- [来源 2](https://arxiv.org/pdf/2506.01844)
- [来源 3](https://huggingface.co/docs/lerobot/smolvla)
- [来源 4](https://github.com/huggingface/lerobot/tree/main/src/lerobot/policies/smolvla)
- [来源 5](https://github.com/huggingface/lerobot/tree/main/src/lerobot/async_inference)
- [来源 6](https://github.com/huggingface/lerobot/blob/main/src/lerobot/policies/common/flow_matching.py)
- 定位：全文24页与附录A.1全部读取，包括任务重写prompt和481数据集名单；§3.1 path/velocity sign mismatch; modeling_smolvla.forward x_t=time*noise+(1-time)*actions and u=noise-actions; common.flow_matching dt=-1/K；§4.1 partial real scoring .5/.5 and sorting .25\*4; Table3 SO10075/90/70, Table4 SO10190/50; §4.3 4GPUs200Kbatch256 and overall30KGPUhours；Table2 VLA Pt No for Smol; 10trials/task; Table7 SA causal74.5 bidir67.5;Table8 16layers78.5vs32layers80.3;Table9width andTable11state CA/SA counterexample；Fig5 andTable6 asyncprogress73.3 sync78.3 sorting50vs70;10PickPlace timing trials13.75vs9.70; cumulative19/9 means3.8/1.8；async_inference robot_client time-filter/aggregate and must_go; policy_server latest observation queue and similarity filtering; configs0.3old+.7new；AppendixA.1 complete prompt; §5.1 SO100 single embodiment, OCR backbone limitation

### sonic

- [来源 1](https://arxiv.org/html/2511.07820v4)
- [来源 2](https://arxiv.org/pdf/2511.07820v4)
- [来源 3](https://nvlabs.github.io/GEAR-SONIC/)
- [来源 4](https://github.com/NVlabs/GR00T-WholeBodyControl/tree/7f151314d4d1606544bf249d2a7a1cb754c64582)
- 定位：全文39页主文§1–3.7及S1.1–S1.4,S2.1–S2.6,S3/S4全部读取，Eq8 PDF第17页渲染人工复核；§2.1/3.7 success height0.25m and metrics successfulmotions only, 6evaluationcheckpoints; baselineMuJoCo scalingIsaacLab;FigS6velocity0.1–2m/s80runs；Table1 macro(90+85+70+60+70)/5=75; counts18+15+19+7+6+7=72/90; S1.4appleteleopformat, soda1000multi+150single;78vs81dimension；TableS1 robot/hybrid10*.1sec human10*.02sec; TableS3 sharedreward;S1.2autoregressivegeneratedcontext,30to50Hzinterpolation8framecrossfade；Table3 differentcomputeconditions; FigS7mean.57vs4.23singlecrawl; §3.1BONES142220clips288hsubsetvs611h317189train；officialsnapshot7f151314 universal_token_modules encode returns encoded_tokens,latent; externaltokensbypassquantizer; auxg1_recon.01others1, token_losses prequant; modelcardlookaheadnotendtoendlatency

### spatial-traces

- [来源 1](https://arxiv.org/html/2508.09032v1)
- [来源 2](https://arxiv.org/pdf/2508.09032)
- [来源 3](https://github.com/AmpiroMax/ST-VLA/tree/e074195877d64b3237256f024a36b8b63e9c4501)
- [来源 4](https://github.com/simpler-env/SimplerEnv)
- 定位：完整读取v1七页正文I–VII和全部四表八图，版本无附录；PDFp5渲染确认Fig4与TableI并存；TableI TraceSR(9.1+9.1+0+72.7)/4=22.725;ST(36.4+25+36.4+54.5)/4=38.075;TraceGCS59.1 vsFig51.1；TableIV base34.125 finetuned22.75 traces27.3;11.375pointdrop; TableII mean31.825/25.025/38.075;TableIII A15=27.3>C15=25.025,A30=29.55<C30=38.075；Fig8 explicitly trace depthcontainsnoarrows;§VIQ3TypeC allpixelsnearestobjectdepth; no3Dtransform/calibration pipeline described；§III-AMSEargmax conflict;§IVCoTrackerfirstfivesteps;§V-C52trajs1969stepsLoRA32alllinearlr5e-5batch1epochs2；officialtreee0741958 onlyREADME/index, indexMore details coming soon; SimplerEnvREADME SAPIENManiSkill2Bridge5Hzdefault notverifiedSTruntime

### spatialvla

- [来源 1](https://arxiv.org/abs/2501.15830v5)
- [来源 2](https://arxiv.org/pdf/2501.15830v5)
- [来源 3](https://github.com/SpatialVLA/SpatialVLA/tree/18fd74b2a633ec8d9ec7aadcd803969555cc9fbd)
- [来源 4](https://docs.scipy.org/doc/scipy/reference/generated/scipy.interpolate.griddata.html)
- 定位：完整阅读v5正文§I–V及附录A–G，全部Table I–XV/Algorithm1/Fig1–13；§III及AppendixB,D：网格/204维MLP/160k+40k/部署20Hz；AppendixC 0.06s深度计时矛盾保留；Tables I–V,VIII–XV各组数据与指标逐项核对；Franka TableXII (72.72+72.72+72.72+100)/4=79.54, Spatial81.8125；XIV Spatial54.54 vsOpen36.36；model/action_tokenizer.py get_bin_policy/spatial_embedding_adaption；model/modeling_spatialvla.py backproject_patch/Ego3DPositionEmbeddingMLP；processing_spatialvla.py decode_actions；train预训练/微调冻结及embedding处理

### starvla

- [来源 1](https://arxiv.org/abs/2604.05014v1)
- [来源 2](https://arxiv.org/pdf/2604.05014v1)
- [来源 3](https://github.com/starVLA/starVLA/tree/3422b9f2387b6f682cf02802904a77b23ab13afd)
- 定位：完整阅读v1 PDF 25页正文§1–8、Tables1–11、Figures1–6、§9作者贡献（无实验附录）；§5.1–5.4预算与选点；Tables3/4/6/9逐项复算；§7RoboCasa正文与Table9冲突；§8 Tables10/11：弱扩展与step/sample throughput；官方3422b9f base_framework,QwenOFT/QwenFast/QwenPI/QwenGR00T,train_starvla_cotrain,lerobot_datasets,PolicyServerWrapper,LIBERO model2interface,WM4A docs/CosmoPredict2代码交叉核验

### starvla-alpha

- [来源 1](https://arxiv.org/abs/2604.11757v2)
- [来源 2](https://arxiv.org/pdf/2604.11757v2)
- [来源 3](https://github.com/starVLA/starVLA-alpha/tree/360f591b746dd500ceeb5bf34fe8779b5f30c889)
- [来源 4](https://github.com/starVLA/starVLA/tree/3422b9f2387b6f682cf02802904a77b23ab13afd)
- 定位：完整阅读v2 PDF27页正文及Appendix A–I、Tables1–17、Fig1–8（图5文本有字体编码问题，关键值按对应Tables10/11核对）；Tables1/2/5 LIBERO分项复算；Table6差值；Table7 11项宏平均33.636/54.036；Table16 24项宏平均53.792/57.292；AppendixC计算资源/学习率，D Tables9–11跨表冲突，E未解析Table??，F/G/I全文与逐项结果；独立官方360f591 starVLA-alpha.py/shared_tools.py masked loss/horizon；MLP_ActionHeader；四套data_config归一化；PolicyServerWrapper与README原checkpoint说明

### t-rex

- [来源 1](https://arxiv.org/html/2606.17055v2)
- [来源 2](https://arxiv.org/pdf/2606.17055v2)
- [来源 3](https://github.com/ZhuoyangLiu2005/T-Rex)
- [来源 4](https://raw.githubusercontent.com/ZhuoyangLiu2005/T-Rex/main/qwen_vla/modeling_vla.py)
- [来源 5](https://raw.githubusercontent.com/ZhuoyangLiu2005/T-Rex/main/scripts/train.py)
- [来源 6](https://raw.githubusercontent.com/ZhuoyangLiu2005/T-Rex/main/qwen_vla/lerobot_dataset.py)
- 定位：阅读全文30页，正文1–7、附录A–H及表1–4；附录F十二任务均列additive rubric；Sec4.2与AppB Eq8–10、Algorithm1：action full(0,1],tactile(0,.4], cache includes latent+action；Figure5/6和Table3经PDF第8页渲染读数；Fig4步数与tau方向原文矛盾已说明；AppC/D/G VQVAE、控制与采集频率；AppE pi0.5关节动作与正文统一空间矛盾；modeling_vla.py forward_flow_action_partial/tactile_flow_continue/encode_tactile_f6_history;train.py 1015–1173;lerobot_dataset.py 188–220,301

### tacvla

- [来源 1](https://arxiv.org/html/2603.12665v4)
- [来源 2](https://arxiv.org/pdf/2603.12665v4)
- [来源 3](https://sites.google.com/view/tacvla)
- 定位：全文9页包括正文I–VI、Tables I–III、Figures1–7，无附录；Fig1明确Gemma2.6B；SecIII-C v4 tactile encoder jointly optimized；任务分别finetune；TablesII/III 67/80 vs51/80，14/20 vs2/20；Fig6渲染确认no-gating60/45/0/45；SecIII-B mask&embedding公式，SecIV-C人为扰动明确qualitative；主页仍无代码链接

### thinkact

- [来源 1](https://arxiv.org/html/2507.16815v2)
- [来源 2](https://arxiv.org/pdf/2507.16815v2)
- [来源 3](https://jasper0314-huang.github.io/thinkact-vla/)
- 定位：全文22页，正文1–5、附录A.1–A.3/B.1–B.7及完整TableA4 prompts；PDF第10页Figure5渲染读数35.5/52/36.2,Average39.1，第17页FigureA9 24/29/32.5/28.5；Sec3.2 Eq1–4含goal起终点、DTW、oldpolicyKL；AppA数据与SFT输出模板；Sec4.1动作预训练独立；AppA.1 N15/75/1000训练20DDIM；B6 N84.0/84.6/84.4/83.7；B7 17%；Tables1/2/3/A6逐项核算；官方Code链接回主页且无仓库

### tinyvla

- [来源 1](https://arxiv.org/html/2409.12514v5)
- [来源 2](https://arxiv.org/pdf/2409.12514v5)
- [来源 3](https://github.com/liyaxuanliyaxuan/TinyVLA/tree/94f441827b45e4f76316ef6a0ae443736dc93a5d)
- [来源 4](https://tiny-vla.github.io/)
- 定位：全文8页正文I–VI，无附录；TableI四难度均值31.575/10.45，按组大小加权51.134/16.128；TableII每模型20次每任务、3checkpoint；TableIII双臂10trial标注与76.7等均值聚合未交代；TableIV292/140/14ms；Figures5–9逐任务/视角/背景/扰动计数；Figure10四任务各6次；TableV MLP/ACT/diffusion；官方仓库pax header SHA94f441827b45e4f76316ef6a0ae443736dc93a5d；llava_pythia_utils.py可训练权重流程、llava_pythia.py forward_diffusion_head；datasets.py 60–65/163–189 augmentation/minmax；eval_real_franka.py 71,243–245,280,309–345,386–405占位与actionhead不一致

### touchanything

- [来源 1](https://arxiv.org/html/2605.13083v1)
- [来源 2](https://github.com/Jianyi2004/TouchAnything/tree/d74f9ef5c189a957b7ff72781a0c998e41b45a56)
- 定位：全文§1–10全部表格与附录；multi_view_encoder、temporal_transformer、pose_decoder、dataset、loss与配置；metrics、inference_tactile_parallel、create_dataset_split、train/run_train_ddp；IoU阈值反例、dropout相对跌幅复算
- 原文或实现尚存问题：论文25epoch与公开配置100epoch不同，未获得论文运行配置；论文seen/unseen-object与公开task-level划分脚本缺少完整映射；论文任一格点接触与公开至少5%有效格点接触定义不同

### touchworld

- [来源 1](https://arxiv.org/html/2607.07287v2)
- [来源 2](https://phanes-lab.github.io/TouchWorld-website/)
- 定位：通读原博客、v2全文及§8实现附录；查看原始Figure5核实所有消融数值；检查官方项目页未发现代码链接
- 原文或实现尚存问题：真实调度频率、100次评估在两条件间的分配和指标实现未公开；缺少训练代码、目标条件混合比例与完整基线训练预算

### tracevla

- [来源 1](https://arxiv.org/html/2412.10345v3)
- [来源 2](https://github.com/umd-huang-lab/tracevla/tree/d5454af9ebe51e996005e13061ac3f6964e2923f)
- 定位：通读全文与附录A-F、现有文章；核官方固定commit模型/损失/数据/wrapper/README；直接查看Figure8并解析Figure9原始SVG字形确认数值
- 原文或实现尚存问题：正文与图中的文本trace及N3增益不一致，文章已分别标明；离线标注数据仍coming soon；未开展GPU或实机复现

### training-time-action-conditioning

- [来源 1](https://arxiv.org/html/2512.05964v2)
- 定位：通读原博客、v2全文与Algorithm1逐行代码；核对训练预算、延迟采样、图3/5图注与loss归一化
- 原文或实现尚存问题：作者真实部署实现未公开，参考代码问题不外推为实验错误

### twinbrainvla

- [来源 1](https://arxiv.org/html/2601.14133v2)
- [来源 2](https://github.com/ZGC-EmbodyAI/TwinBrainVLA)
- [来源 3](https://github.com/Phys-Brain/PhysBrain-VLA/tree/ffcc6cbd11d30d612440fe7463371cb7dcc64841)
- 定位：通读原博客、v2正文附录A-H并单独提取E提示；核固定commit公开与private模型/配置/冻结函数；重算Table7数据总量与Table8均值
- 原文或实现尚存问题：RoboCasa每任务50次与59%单元格缺少额外聚合说明；后续PhysBrain集成并非论文原始实验代码；未实机复现

### umi

- [来源 1](https://arxiv.org/html/2402.10329v3)
- [来源 2](https://umi-gripper.github.io/)
- [来源 3](https://github.com/real-stanford/universal_manipulation_interface/tree/d095ba9590df789df5189eea5ee7e431689038a6)
- 定位：通读v3全部正文与附录A1-F2及现有博客；核固定commitREADME/真实评估/环境/pose工具/训练配置；核成功规则、60次分组与训练参数
- 原文或实现尚存问题：训练杯15或18的文内冲突；论文Ta6与当前公开预测16、每6步推理默认值属于不同配置，不声称相同

### umi-bench

- [来源 1](https://arxiv.org/html/2606.10382v1)
- [来源 2](https://github.com/haoxixi1/UMI-Bench)
- [来源 3](https://huggingface.co/datasets/UMIbenchmark/UMI-Benchmark-v1)
- [来源 4](https://huggingface.co/UMIbenchmark/UMI-Benchmark-v1-checkpoints/tree/2731c27)
- 定位：通读原博客及v1正文全部附录A-G；核Table3/4/7/14/15、运行参数、10任务FSR平均；查看官方网页源码仓库、HF数据卡/分片、checkpoint目录README/scripts
- 原文或实现尚存问题：T8错篮评分0或5分与FactorB定义冲突；T7单罐任务卡与双臂两罐rubric差异；缺完整训练及统一评估runner、pi05 chunk、完整审计包公开证据

### unidex

- [来源 1](https://arxiv.org/html/2603.22264v1)
- [来源 2](https://github.com/unidex-ai/UniDex/tree/97d869e0f2d1ec0372cd3cdf28dde66b4e3f216d)
- 定位：通读博客与v1正文附录A-E；核固定commit模型完整flow/推理/attention、配置、数据映射、pose及hand_utils JSON；核五任务20次与跨手10次、figure编号和co-training指标
- 原文或实现尚存问题：正文21 base与附录/代码索引口径冲突；Shadow额外通道论文称腕关节而代码为LFJ5/THJ3；论文路径协方差少平方，公开配置与论文训练日程不完全相同

### videovla

- [来源 1](https://arxiv.org/html/2512.06963v1)
- [来源 2](https://github.com/VideoVLA-Project/VideoVLA/tree/05b5cca7d4ec32e786b7e10dcbfbf5926637b293)
- 定位：通读v1正文附录A-D及博客；核固定commitDiT/denoiser/scaling/loss/sampler/engine/脚本/README配置；查看原定性图，重算Realman末阶段均值并核各表trial步长
- 原文或实现尚存问题：正文50步与附录真实10步未逐表对应；新技能试验次数与表值步长不一致；公开sample只返回动作而示例期望视频/动作二元组，未运行确认修复

### villa-x

- [来源 1](https://arxiv.org/html/2507.23682v3)
- [来源 2](https://github.com/microsoft/villa-x/tree/9b4489946fdaef1e7b8bd55aee8f65f768323ea8)
- [来源 3](https://huggingface.co/microsoft/villa-x/blob/caa95b7/lam/model_config.json)
- 定位：通读博客与v3正文附录A-I；核固定commitLAM encoder/decoder/VQ/mixin及HF发布配置；复核SIMPLER和Realman各组指标、LIBERO附录与数据混合
- 原文或实现尚存问题：ACT源码未发布，flow符号和mask两个版本无法以实现判定；主表7任务与附录8任务口径不一致；公开LAM配置encoder12heads与附录32heads不同

### vista

- [来源 1](https://arxiv.org/html/2602.10983v2)
- [来源 2](https://github.com/vista-wm/Vista-WM/tree/755a26195105ee6b4465c0eb6a7d98ffaf9d295e)
- 定位：通读博客与v2正文全部附录含两段数据标注prompt；核固定commitREADME/config/infer/app/vLLM实际路径；查看Figure10原图并核表I指标与附录执行设置
- 原文或实现尚存问题：subtask switcher具体判定与真实重规划历史回写未公开；234 rollout与表I三种设置统计包含关系不清；主文/附录embodiment及token计数差异

### viva

- [来源 1](https://arxiv.org/html/2604.08168v2)
- [来源 2](https://github.com/GigaAI-research/ViVa/tree/046fc99dd96b29dcf7daa4737cc048042bf1357b)
- 定位：通读原博客和arXivv2全文含全部12张结果表（本版本无附录）；核固定commit dataset/model/util/scheduler/inference/visualization/train/YAML/README；逐式核return方向、单步Euler及事件指标，复核主要消融/泛化数据
- 原文或实现尚存问题：论文剩余代价与事件进度方向以及失败范围映射不闭合；公开value实现未读success标签，未给完整RECAP闭环；最终真机测试次数、窗口w/epsilon、训练数据混合清单未交代

### vla-0

- [来源 1](https://arxiv.org/pdf/2510.13054)
- [来源 2](https://github.com/NVlabs/vla0/blob/main/rv_train/models/qwen/model.py)
- [来源 3](https://github.com/NVlabs/vla0/blob/main/rv_train/deploy/service.py)
- [来源 4](https://github.com/NVlabs/vla0/blob/main/rv_train/deploy/model_manager.py)
- [来源 5](https://github.com/NVlabs/vla0/blob/main/configs/vla0.yaml)
- 定位：通读全文6页含全部表图/References，无附录；TableI 94.7与93.3、TableII原始差值矛盾、Fig4四任务结果；SecIIIB mask/decoding/ensemble与SecIVD 4Hz关闭ensemble；model.py get_text_action/get_action_from_text_action/forward、service.py固定image_data streaming、model_manager.py忽略state

### vla-opd

- [来源 1](https://arxiv.org/pdf/2603.26666)
- [来源 2](https://github.com/IRPN-LAB/VLA-OPD)
- [来源 3](https://irpn-lab.github.io/VLA-OPD/)
- 定位：完整通读16页含全部refs，无附录；Eq5-7与Algorithm1：raw immediate logratio、stopgradient、无GRPOnormalize；Table2 48.9/87.4/93.4/93.9，Table3 45.2/71.1/74，Sec4.1学生初始化；Figure2训练更新次数、Fig3两Object两Spatial、Fig4BeatBlockHammer、Fig5batch32；2026-09-22 GitHub目录仅figures/opd与index.html

### vlac

- [来源 1](https://arxiv.org/pdf/2509.15937v1)
- [来源 2](https://github.com/InternRobotics/VLAC)
- [来源 3](https://github.com/InternRobotics/VLAC/blob/main/evo_vlac/utils/model_utils.py)
- [来源 4](https://github.com/InternRobotics/VLAC/blob/main/evo_vlac/utils/data_processing_vlm.py)
- 定位：完整通读26页含References与附录A-E；Sec3.1 Eq1-4标签归一化/完成阈值/多任务、Sec3.2 PPO/系统/人工介入；Sec4.3 Eq7-9 signedcorrelation、Table1重算、Table2与3逐行验证；Sec4.7 Fig7单机137与多机每台数、AppendixD动态采样；model_utils.py critic_to_value_simple/reverse_eval/get_trajectory_done/fast_results_format及data_processing_vlm.py格式单位

### vp-vla

- [来源 1](https://arxiv.org/pdf/2603.22003v3)
- [来源 2](https://github.com/JIA-Lab-research/VP-VLA)
- [来源 3](https://github.com/JIA-Lab-research/VP-VLA/blob/main/examples/SimplerEnv/eval_files/model2simpler_interface_visual_prompt.py)
- [来源 4](https://github.com/JIA-Lab-research/VP-VLA/blob/main/examples/SimplerEnv/train_files/run_train.sh)
- [来源 5](https://github.com/JIA-Lab-research/VP-VLA/blob/main/starVLA/dataloader/visual_prompt_datasets.py)
- 定位：完整通读v3 25页含refs及附录A-H和Table5-12；Sec3/AppendixG Table7-8参考帧+当前帧+gripper continue/proceed；Table9-11分母与部分得分重算，Table12负面任务，Table6分解正负收益；AppendixB-D H200/46h/4090、8BOpenRouter .78s/SAM.36s/policy.108s、106demo toolscoop；官方eval step()每步SAM+预测gripper阈值.5；run_train.sh覆盖YAML；dataset/trainer分开groundingbatch

### vtam

- [来源 1](https://arxiv.org/pdf/2603.23481v1)
- [来源 2](https://arxiv.org/html/2603.23481v1)
- [来源 3](https://plan-lab.github.io/projects/vtam/)
- [来源 4](https://github.com/haorany7/VTAM)
- 定位：全文PDF20页/HTML全正文及附录A–C；§3.1–3.3 Eq1–10；AppendixA video frozen、28层action、50k/20k、absolute joint space vs§3.3 EE；Table1/2与AppendixB：20+20+40预算、wiping0/45、peel17/20>10cm；AppendixC 力箭头仅可视化、无显式力输入；2026-09-22 官方项目页链接GitHub及codeload均404，代码未可核验

### warp-rm

- [来源 1](https://arxiv.org/pdf/2606.28320v4)
- [来源 2](https://github.com/uynitsuj/WARP-RM)
- [来源 3](https://github.com/uynitsuj/WARP-RM/blob/main/docs/reproduce_sim.md)
- [来源 4](https://github.com/uynitsuj/WARP-RM/blob/main/warp_rm/data/samplers.py)
- [来源 5](https://github.com/uynitsuj/WARP-RM/blob/main/warp_rm/data/labelers.py)
- [来源 6](https://github.com/uynitsuj/WARP-RM/blob/main/warp_rm/visualization/inference.py)
- [来源 7](https://uynitsuj.github.io/warp-rm/)
- 定位：全文v4第1–24页，正文§1–5及附录A–I；Table1–10；旧文完整阅读；§3.2–3.5与AppendixE: Cnorm1395,S inter-token,one-frame window shift,continuous/binary variants；Table2 D4/D5 20/20 50.6/44.6; §4/Table1 TTC成功均值与240秒失败吞吐; AppendixF重置剔除；§4.7 Table5及AppendixC/D:512seed,31.5%,binaryunit,610stratifiedref,61.2s,H30full;pairCI/additionalseed；§4.8:23/24错误窗口,12/13 outsideDRM,AUROC.83/.61/.68；官方warp_rm/data/samplers.py ARSampler、labelers.py RelativeCumulativeLabeler、models/aggregators/transformer.py、core/loss.py soft_bins/RMLoss、visualization/inference.py dense_inference_relative；scripts/data/write_warp_rm_annotations.py 与 docs/reproduce_sim.md: pinnedpolicy/rollout commits,allframesdenominator,IIDthreshold1.047659,baselineverification-only

### what-matters-latent-actions

- [来源 1](https://arxiv.org/abs/2608.19613v1)
- [来源 2](https://arxiv.org/pdf/2608.19613v1)
- [来源 3](https://github.com/XizoB/LAM)
- 定位：阅读全文1088行/16页，包括Table III与References；该版本没有单独附录。；§IV-A–C Eq(1)–(18)：四建模路线、regularization、五动作整合协议；§V-A：数据集与三种子协议、front-view/no-state、probe架构和50步训练。；Table II/ Figure 4：DeltaDINO DAP .749 LAP .752 JAP .709 JAP-LAP .719；LAOF DAP .687 LAP .656；VQ DAP .756 LAP .747；正则RobotInit .517 vs .445/.433/.468/.467。；§V-E/ Figure 5：21正则配置+8维度配置=29；代理相关性不是全41项设计检验。；Figure 7/§V-F：维度8–1024，LAPO VAE1e-6，DAP/LAP均值；Figure 8：28/33改善，+.0115。；渲染查看PDF第13页Figure 9：RobotInit LAP .488→.578，DAP .477→.547，均为百分点；两个数据规模14.5%与100%。；§V-H/Figure 10：四任务200示教；6k/8k/10k/20k/40k每任务20次；累计317/400对259/400，真实DAP。Table III真实名义150k但图只到40k。；GitHub网页2026-09-22核对：旧URL重定向XizoB/LAM，main只有README、1 commit；没有实现可作逐行核验。；定向QA通过：41篇prettier --check、git diff --check均exit 0；逐篇MDX compile配合remark-math/rehype-katex无错误或警告。

### world-action-model-robustness

- [来源 1](https://arxiv.org/html/2603.22078v5)
- [来源 2](https://github.com/Robot-Robustness/RoboTwin2.0-Plus/tree/8f077616e5c3c1cb29b88db2323212d51243438a)
- [来源 3](https://arxiv.org/html/2510.13626v3)
- 定位：通读v5正文及附录A–C、Tables1–10；核验task_config八分支、script/eval_policy.py、envs/\_base_task.py、camera/camera.py及语言生成路径；复算五模型七列/八列均值与LIBERO类别加权结果
- 原文或实现尚存问题：论文RoboTwin Total混合汇总口径足以改变排名，未获原始episode结果；LIBERO Fast-WAM Total及X-VLA Light跨表不一致；附录与延迟表的动作chunk不一致且未解释映射；论文21扰动与实际列举20、noise severity与当前实现不同；原始实验版本是否采用当前公开代码无法确定，未运行依赖GPU的策略评测

### worldarena

- [来源 1](https://arxiv.org/html/2602.08971v2)
- [来源 2](https://github.com/tsinghua-fib-lab/WorldArena/tree/2da2ae253b8637ba9de3afc7bea4e087f778ee4d)
- 定位：通读原文与v2正文附录A–C，包括B完整成功judge提示词；逐列复算Wan2.6/CtrlWorld/Veo3.1/Genie16项均值确认总分；核固定commit评价入口、动作头训练、VLM/相关性、DINO/trajectory/聚合及比赛协议
- 原文或实现尚存问题：经验百分位校准8模型名单未说明；代码动态惩罚/NDTW与附录不同及CSV字段错误；主要相关性样本少，未报告置信区间/最终混合数据scaling曲线

### wsa1

- [来源 1](https://arxiv.org/html/2607.03941v1)
- [来源 2](https://github.com/zaleni/WSA/tree/bfee742c585d5ee85722e658978111934c926ca3)
- [来源 3](https://huggingface.co/zaleni/WSA-Base-RoboTwin/blob/main/config.json)
- [来源 4](https://huggingface.co/zaleni/WSA-Large-RoboTwin/blob/main/config.json)
- 定位：通读博客及v1完整正文全部表格（无附录）；核固定commit Base模型/配置/DA3与Large模型/Joint/MoT/启动脚本；核公开RoboTwin两checkpoint配置、动作队列与实际mask/flow/inference路径；复算真机SR/C全部关键均值，核训练任务和数据权重
- 原文或实现尚存问题：表3分项与SR/C平均值不一致，特别LargeC超过舍入解释范围；发布Base默认注意力与论文机制关系未解释；预训练小时与多视角帧数换算及实际速度未完整披露

### x-vla

- [来源 1](https://arxiv.org/html/2510.10274v1)
- [来源 2](https://github.com/2toinf/X-VLA/tree/6bc2513f5f1cbec715cc668b414392a6cae5c671)
- [来源 3](https://github.com/autonomousvision/navsim)
- 定位：通读原文及附录 A–O、表 1–16；核验 modeling_xvla、transformer、action_hub、configuration_xvla、train、peft_train 与 README；手算每域 prompt 与线性层参数128020、表3与6均值差异
- 原文或实现尚存问题：表3和表6的Full-data PEFT分项及平均值不一致；论文速度场背景不等同当前公开动作预测实现；没有据此反推作者原始训练版本；持续折叠复位及人工介入计数口径未充分说明；NAVSIM附录closed-loop措辞不能扩展为反应式交通交互评测
