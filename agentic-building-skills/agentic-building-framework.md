# Agentic Building Framework

> 一份从零构建 Agentic AI 助手的课程型总纲。
> 覆盖：**记忆系统（Working / Procedural / Semantic / Episodic）**、**浓缩闭环（Consolidation Gate + Summarizer）**、**RAG Top-K**、**Harness & Loop（驾驭与循环）**、**End-Loop Guardrails**、**LLMOps（Tracing / Eval / 反馈闭环）**。
> 配套技能文档见同目录 [`SKILL.md`](./SKILL.md)。
> 本文是**通用框架**，不绑定任何具体产品或业务仓库；举例均为脱敏后的抽象场景。

---

## 0. 这门课要解决什么问题

很多人做 Agent 时只做了「给 LLM 挂几个工具」，跑通了 Demo，上线后却陷入：

- 聊完就忘，跨会话不会学；
- 工具乱调、死循环、后台空转；
- 出错了不知道哪一步慢、哪一步错；
- 改 Prompt 修好一个 case，拖垮另一批。

**Agentic Building Framework** 的核心观点：

> Agent = **LLM（大脑）** + **Memory（记忆）** + **Tools（手脚）** + **Harness/Loop（驾驭与循环）** + **LLMOps（体检与进化）**。
> 缺任何一块，系统都会在「能聊」和「能干活且可靠」之间掉链子。

本课程目标：让你能从一张白纸，按阶段搭出可审计、可终止、可检索、可评估的 Agent 系统；并知道每块**为什么存在、什么时候上、什么时候先不做**。

---

## 1. 总架构：五层模型

```text
┌─────────────────────────────────────────────────────────────┐
│  LLMOps：Tracing / Eval / Diagnosis / Iteration             │  第 5 层：知道好不好，并进化
├─────────────────────────────────────────────────────────────┤
│  Harness & Loop：Tool Calling + Think→Act→Observe + 终止护栏 │  第 4 层：控制何时行动、何时停
├─────────────────────────────────────────────────────────────┤
│  Tools / Environment：API、DB、日历、支付、工单、代码仓……     │  第 3 层：改变世界的能力
├─────────────────────────────────────────────────────────────┤
│  Memory：Working + Procedural + Semantic + Episodic + 浓缩   │  第 2 层：让 Agent 有持续性
├─────────────────────────────────────────────────────────────┤
│  LLM + System Prompt：推理与语言生成                         │  第 1 层：预训练大脑（不够用）
└─────────────────────────────────────────────────────────────┘
```

**意义**：预训练只给了「通用智力」。业务规则、用户事实、历史事件、工具治理都不在模型权重里——必须由 Memory / Tools / Harness / LLMOps 补上。

---

## 2. 记忆系统（Memory System）

### 2.1 为什么需要记忆

没有外部记忆时，Agent 只有 **Context Window（上下文窗口）**：

- 会话结束 → 清空；
- 窗口塞满 → 早期信息被挤掉；
- 无法跨任务复用「上次类似情况怎么处理的」。

所以 Memory 是 **LLM 之上的上下文增强层**：把「临时对话」和「长期知识」拆开管理。

### 2.2 Working Memory（工作记忆 / Context RAM）

**是什么**：当前这一轮立刻可见的短期上下文。

典型组成：

| 组成 | 作用 |
|---|---|
| System Prompt | 角色、边界、输出格式 |
| User Prompt / 当前任务 | 这次要干什么 |
| Chat / Message History | 本会话已发生的对话 |
| 注入的检索结果（RAG） | 本轮临时塞进来的历史经验 |
| Task State（任务型 Agent） | 结构化状态：任务 ID、轮次、中间结果 |

**意义**：

- 这是 Agent「此刻在想什么」的全部可见信息；
- 会话结束通常清空（除非有 checkpoint）；
- **RAG 注入的事实，注入后就变成 Working Memory 的一部分**。

**实现提示**：

- 聊天型：`messages = [System, Human, AI, …]`
- 流水线型：图编排里的 State / TypedDict
- Checkpoint（如本地 sqlite）= Working Memory 的断点续跑，不是长期知识库

**设计原则**：Working Memory 要**短、准、可审计**。不要把整库聊天记录无脑塞进窗口。

### 2.3 三支柱：Procedural / Semantic / Episodic

#### A. Procedural Memory（流程记忆）——「怎么做」

**是什么**：行为规则、SOP、Skills、工具治理策略。

常见形态：

- `SKILL.md` / `AGENTS.md` / 项目级操作规范
- 专家 playbook（领域步骤说明）
- Tool contracts / 白名单策略注入 prompt

**意义**：让 Agent 行为可版本化、可评审、可回滚——改文件等于改「技能」，比只改口头 System Prompt 更工程化。

**设计原则**：静态、git 管理、人工审核后上线；不要让 Agent 随便改自己的 Procedural 文件（至少 v1 不要）。

#### B. Semantic Memory（语义记忆）——「长期事实」

**是什么**：跨会话仍成立的 durable facts：用户偏好、业务常识、失败模式、经验阈值。

常见形态：

- Vector DB + embedding（语义相似检索）
- 或先结构化库 + 关键词 / SQL（小语料更稳）
- 知识条目文件：`candidate → 人工审核 → approved`

**意义**：避免每次从零推理；把「这类情况通常该怎么处理」固化下来。

**何时上 embedding**：

| 情况 | 建议 |
|---|---|
| 事实少、键清晰（类型、环境、项目标签） | **先关键词 / SQL** |
| 语料大、同义词多、查询很糊 | **再上向量** |
| 终态 | **混合**：硬过滤（类型/环境）+ 向量重排 |

#### C. Episodic Memory（情景记忆）——「发生过什么」

**是什么**：带时间戳的事件日志 / 运行档案。

常见形态（脱敏示意）：

```text
runs/<run_id>/
  manifest.json
  run_trace.jsonl      # stage / tool / route / retrieval …
  gate_events.jsonl
  usage_events.jsonl
  attempts/
```

**意义**：

- 审计：「第几次尝试为什么失败」
- 诊断：「哪一步慢、调了什么工具」
- Summarizer 的原料：「从情景提炼语义」

**关键限定**：只有「写」没有「读回」时，它是**证据账本**，还不是认知意义上的「记忆」。真正记忆 = 情景可浓缩 + 语义可检索 + 回喂 Working Memory。

### 2.4 浓缩闭环（Consolidation）：Gate + Summarizer

情景日志无限堆砌 → token 贵、检索噪声大、Agent 被淹没。

```text
Episodic（run_trace）
    │
    ▼
Consolidation Gate（攒够 N 次 / N 条消息再触发）
    │
    ▼
Summarizer Agent（便宜模型蒸馏成 fact）
    │
    ▼
Semantic Store（candidate → approved）
    │
    ▼
RAG Top-K → 注入 Working Memory
```

| 组件 | 职责 | 意义 |
|---|---|---|
| **Gate** | 是否触发浓缩（阈值 / 手动 / force） | 控成本，避免每次运行都跑总结 |
| **Summarizer** | 读脱敏结构化事实 → 产出 KnowledgeItem | 情景 → 语义的「压缩机」 |
| **Semantic Store** | 存 fact + 审核状态 + 索引 | durable facts 的家 |
| **RAG** | Top-K 召回并注入 | 让历史经验进入本轮决策 |

**原则**：浓缩是**旁路**——失败不影响业务；只吃脱敏事实，不喂原始客户路径 / 完整隐私 prompt。

### 2.5 RAG Top-K：如何检索到「真正对的」几条

RAG ≠ 「随便向量搜一下」。质量取决于：

1. **Query 构造**：从任务 state 确定性拼（类型 / 环境 / 关键词），不要整段自由文本胡搜。
2. **硬过滤再打分**：类型、环境等先精确过滤，再 BM25 / 向量排序。
3. **宁缺毋滥**：低于 `min_score` 丢弃；0 条就不注入。
4. **只召回 approved**：未审核 candidate 不进默认检索。
5. **注入可追溯**：hint 带来源 `run_id` / `fact_id` + score，写入 `retrieval` 事件。
6. **标注「供参考，非硬约束」**：硬门槛仍由确定性规则决定。

**注入流程（字符串拼接）**：

```text
起步节点读 state → 拼 query → retrieve_topk(k)
→ 格式化文字块 → system_prompt += 【历史经验】…
→ Agent 带着增强 prompt 干活
```

**脱敏示例（注入后 Agent 看到什么）**：

```text
你是任务执行助手……（原 system prompt）

【历史经验 · 供参考，非硬约束】
- 同类任务在环境 A 下第 1 轮常因指标未达标回退，优先调整参数组 X（来源 run_20260712_xxxx）
- 该类型历史上材料/映射类检查易在字段 Y 出错，起步时优先核对（来源 run_20260709_xxxx）
```

**三个模型触点（不要混）**：

| 触点 | 是否模型 | 干什么 |
|---|---|---|
| Summarizer | 聊天 LLM（便宜） | 写 fact |
| Embedding | embedding 小模型（非聊天） | 文字→向量 |
| Top-K 检索本身 | **不是模型** | 余弦 / 关键词打分 |
| 主 Agent | 贵 LLM | 根据注入的 hints **思考并行动** |

基础版关键词检索：**一个模型都不用**。

---

## 3. Harness & Loop Engineering（驾驭与循环）

### 3.1 Agentic Tool Calling

Agent 必须能调用外部工具：读业务数据、调度日历、提交任务、退款、改代码仓……

**意义**：LLM 只能生成文本；**工具才能改变世界**。

治理要点（缺了就危险）：

- **白名单**：未登记工具禁止调用
- **阶段门禁**：当前阶段只能用允许的工具集
- **风险分级 + 审批**：高风险写操作需显式批准 / interrupt
- **幂等与失败处理**：写接口不盲目自动重试
- **Trace**：每次调用落 input/output/status

### 3.2 Loop：Think → Tool → Observe → Think

复杂任务不是一次生成完，而是循环：

```text
思考下一步
  → 选工具并调用
  → 观察结果
  → 再思考
  → …直到终止条件
```

两层循环常同时存在：

| 层 | 例子 |
|---|---|
| **子 Agent 内 react loop** | 助手多次调「查询 → 修改 → 再验证」 |
| **编排图外层回环** | 质量检查不过 → 回到前序准备 / 执行阶段 |

### 3.3 End-Loop Guardrails（终止护栏）——关键点

没有护栏 = 无限循环、烧钱、后台空转。

明确终止条件示例：

- 任务成功（硬门槛通过）
- 达到最大重试 / recursion_limit
- 需要用户授权（interrupt / 弹窗）
- 需要澄清意图
- 不可重试的失败

**意义**：自由调用工具的权力，必须配「知道何时停」的机制。这是生产级 Agent 与 Demo 的分水岭。

---

## 4. LLM vs Hardcode：谁该想、谁该判

成熟系统通常是**混合体**：

| 类型 | 适合 | 脱敏例子 |
|---|---|---|
| **LLM Agent** | 开放决策、创造性、多工具协调 | 方案设计、选配置、调参策略、范围选择 |
| **Hardcode / 规则** | 必须可复现、可审计、安全闸门 | 输入齐套检查、指标阈值、路由 retry/stop、最终导出 |

**原则**：

- 「怎么做」可以交给 LLM；
- 「能不能过、往哪走」尽量确定性；
- LLM-as-a-judge 做**旁路评分**，不要轻易替换硬门槛。

**RAG 只注入 LLM 节点**。规则节点不读 prompt，注入无效且可能造成错觉。

---

## 5. LLMOps & Eval（体检与进化）

### 5.1 Tracing（运行追踪）

每次运行记录「事件树」：

- 检索了什么、调了多少次工具
- Token 用量
- **各步 latency（duration_ms）**——stage / tool / LLM / retrieve **分开测**

**意义**：没有 Trace，就无法回答「为什么错 / 为什么慢」。Trace 是浓缩、评估、诊断的**数据地基**。可选桥接 Langfuse / LangSmith 做面板；本地 JSONL 也是合法起步。

### 5.2 Evaluation（评估）

三层直觉：

```text
① 硬门槛   = 考试及格线（业务指标、结构检查）→ 决定能不能往下走
② LLM-judge = 老师批注解题过程（效率、过程质量、证据完整性）→ 旁路记录
③ 离线回归集 = 标准卷考新版 → 改 Prompt/阈值前整体跑，防拖垮
```

### 5.3 Diagnosis & Iteration

Trace + Eval 发现问题 → 改 Prompt / 阈值 / 检索配置 → 灰度开关推上线。

**意义**：系统能「自我进化」靠的是闭环，不是一次性 Prompt 工程。

---

## 6. 从零构建：分阶段课程路径

按依赖顺序建设。**不要一上来做向量库。**

### Phase 0 — 定义任务与边界（0.5～1 天）

产出：一页 PRD

- 用户是谁？成功长什么样？
- 必须用哪些工具 / 数据源？
- 哪些动作高风险需要人审？
- 离线 / 在线？是否有脱敏要求？

### Phase 1 — 最小 Agent 骨架（1～3 天）

产出：能跑通的「单轮 / 少轮」Agent

1. 选运行时：图编排 / 自研 loop / 现成 Agent 框架均可
2. System Prompt + 1～3 个只读工具
3. Working Memory（messages 或 state）
4. 人工看输出即可，先不要 Memory 平台

验收：给定输入，能正确调用工具并给出结构化结果。

### Phase 2 — Harness：工具治理 + 终止护栏（2～5 天）

产出：可生产调用的工具层

1. Tool 白名单 + schema + 风险等级
2. 高风险 interrupt / 审批
3. max_iterations / recursion_limit / 明确 END
4. 失败结构化返回（可重试 vs 不可重试）

验收：故意制造坏输入 / 超预算，系统会停，不会死循环。

### Phase 3 — Episodic Trace（证据账本）（2～4 天）

产出：每次 run 可复盘

1. `run_id` + append-only `run_trace.jsonl`
2. stage / tool / route 事件
3. 脱敏边界
4. `duration_ms` + token usage（可观测地基）

验收：跑完能回答「调了什么、为何分支、哪步慢」。

### Phase 4 — Procedural 固化（1～2 天）

产出：Skills / heuristics 文件化

1. 把口头经验写入 `SKILL.md` / playbook
2. 工具策略生成进 prompt
3. reproducibility：记录 prompt 文件 hash / 配置快照

验收：改 playbook 能改变行为，且可 git 回滚。

### Phase 5 — 浓缩闭环 + Semantic + RAG（1～2 周）

产出：跨会话会「记得」

1. Consolidation Gate（每 N 次运行）
2. Summarizer（便宜模型）→ candidate facts
3. 人工审核 → approved
4. 检索：先关键词，再可选向量 / hybrid
5. 仅在 LLM 节点注入 Top-K

验收：审核后的经验会出现在下一轮相关任务的 prompt 里，且带来源。

### Phase 6 — Eval 与回归（持续）

产出：改动前有安全网

1. 硬门槛保留
2. LLM-judge 旁路
3. 金标准 run 离线回归

验收：改 Prompt 前后有分数对比报告。

### Phase 7 — 观测面板与灰度（按需）

Langfuse / LangSmith、feature flags、retention / 归档策略。

---

## 7. 最小模块清单（可当脚手架）

```text
agent/
├── prompts/                 # Procedural：system / skills / heuristics
├── tools/                   # 白名单工具 + contracts
├── orchestrator/            # Loop + routes + guardrails
├── memory/
│   ├── working.py           # state / messages / checkpoint
│   ├── episodic/            # run archive writers
│   ├── semantic/            # knowledge store + retrieve_topk
│   └── consolidation.py     # gate + summarizer
├── observability/           # duration_ms、usage、export
└── eval/                    # judge + regression fixtures
```

---

## 8. 自查清单（Memory / Harness / LLMOps）

### Memory

- [ ] Working Memory：短期窗口清晰（prompt + history + state）
- [ ] Procedural：Skills / SOP 文件化
- [ ] Semantic：durable facts（可先占位，再检索）
- [ ] Episodic：时间序列 run / events
- [ ] Consolidation：Gate + Summarizer → 语义，而非无限堆聊天
- [ ] RAG：硬过滤 + Top-K + 可追溯注入

### Harness & Loop

- [ ] 工具可多次调用且受治理
- [ ] Think→Act→Observe 有效循环
- [ ] 明确终止条件（成功 / 预算 / 人审 / 澄清）

### LLMOps

- [ ] Tracing（含 latency，分对象打点）
- [ ] Eval（硬门槛 + 可选 judge）
- [ ] 诊断与反馈闭环
- [ ] 配置 / Prompt 可推送、可回滚（灰度开关）

---

## 9. 抽象案例：任务型 Agent 的混合形态（脱敏）

下面用**虚构的「多阶段任务助手」**说明框架如何落地（非任何真实产品）：

| 框架概念 | 常见落地形态 |
|---|---|
| Working | 会话 `messages` 或流水线 `TaskState` |
| Procedural | Skills / playbook / tool 策略文件 |
| Episodic | `runs/<run_id>/run_trace.jsonl`（审计强） |
| Semantic + RAG + Consolidation | 往往后置：先有日志，再补「写回学习闭环」 |
| Harness / Guardrails | 白名单、人审、重试预算、明确 END |
| Tracing | 事件树 + token；再补 per-step latency / 面板 |
| Eval | 先硬门槛；再旁路 judge + 回归集 |
| LLM vs Hardcode | 方案/调参类步骤用 LLM；齐套检查/阈值/路由用规则 |

**启示**：先做扎实的 Episodic + Harness，再补「写回学习闭环」，比一上来做向量库更稳。

---

## 10. 反模式（常见翻车）

1. **把全部聊天记录当长期记忆** —— 贵、吵、无提炼。
2. **无护栏的 tool loop** —— 死循环。
3. **用 LLM 替换所有业务闸门** —— 不可复现、难审计。
4. **RAG 硬凑 K 条** —— 检索污染。
5. **浓缩吃原始敏感数据** —— 合规事故。
6. **没有 Trace 就谈 Eval** —— 无数据地基。
7. **一次上齐向量 + Judge + 面板** —— 工期爆炸；按 Phase 推进。

---

## 11. 推荐落地顺序（性价比）

```text
M1  duration_ms / 基础 Trace 打齐
M2  观测导出（可选）
M3  Consolidation Gate + Summarizer + candidate knowledge
M4  关键词 RAG 注入 LLM 节点
M5  向量 / hybrid（语料变大再上）
M6  LLM-judge
M7  离线回归集
```

Trace 是整条链的数据地基：浓缩、评估、诊断都吃它。

---

## 12. 课程小结

1. **记忆**让 Agent 有持续性；**浓缩**让记忆不臃肿；**RAG**让记忆可回喂。
2. **Harness / Loop / Guardrails**让 Agent 敢动手且知道何时停。
3. **LLMOps**让你知道好不好，并能安全迭代。
4. **LLM 负责怎么做，规则负责能不能过**。
5. **从 Episodic + 护栏起步，再补 Semantic 闭环**——这是从 Demo 到生产的主路径。

下一步：用同目录的 [`SKILL.md`](./SKILL.md)（Skill `agentic-building-skills`）做需求 Walkthrough，生成你自己的 Phase 计划与脚手架。
