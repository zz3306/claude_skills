---
name: agentic-building-skills
description: Walk a vague "I want to build an agent" idea into a concrete, staged Agentic Design Brief — Memory (Working/Procedural/Semantic/Episodic) + Harness/Loop + Guardrails + RAG + LLMOps. Use when the user says they want to build an agent / AI assistant / agentic system, has a fuzzy idea that needs Memory-RAG-Loop-Guardrails structure, wants a Memory/LLMOps audit and upgrade path for an existing agent, or asks to "walkthrough by the agentic building framework" / 按 agentic building framework 做 walkthrough. Ask the questionnaire first, write code later.
---

# Agentic Building Skills

> **用途**：用问答 Walkthrough 把用户的 idea / 需求引导成完整的 Agentic 框架（Memory + Harness + RAG + Loop + LLMOps），并产出可执行的分阶段计划与脚手架清单。
> **课程正文**：同目录 [`agentic-building-framework.md`](./agentic-building-framework.md)
> **范围**：通用框架技能。**不要**把任何具体产品名、客户名、内部仓库路径、真实业务指标写进输出；举例一律脱敏抽象。

---

## 1. 何时使用

在以下场景启用本技能：

- 用户说「我想做一个 agent / AI 助手 / agentic 系统」
- 用户有模糊 idea，需要梳理 Memory / RAG / Loop / Guardrails
- 用户要对现有 Agent 做 Memory / LLMOps 自查与升级路线
- 用户说「按 agentic building framework 帮我 walkthrough」

---

## 2. 工作方式（强制）

1. **先问再写**：不要一上来就写代码。先完成 Walkthrough 问卷（§3），缺信息就继续问。
2. **对照课程**：架构概念以 `agentic-building-framework.md` 为准。
3. **脱敏输出**：Design Brief、示例、文件树、验收描述均用通用词（`run_id`、阶段、工具、硬门槛）。禁止写入真实客户路径、内部系统代号、未授权业务细节。
4. **分阶段交付**：每次只推进一个 Phase / Milestone；禁止「一次做完整向量库 + Judge + 面板」。
5. **默认保守**：先 Episodic Trace + Guardrails，再 Semantic/RAG；检索默认关键词，向量后置。
6. **旁路原则**：Memory / Summarizer / Judge / Tracing 导出失败不得破坏主业务、不得触发非幂等重试。

---

## 3. Walkthrough 问卷（按序问，可合并成少轮）

每轮只问 **3～5 个**关键问题，记答案，未答完不进入设计终稿。

### Round A — Idea & 成功标准

1. 这个助手服务谁？（角色 / 场景，可用抽象描述）
2. 「一次成功」长什么样？（可观察结果，不要空话）
3. 主要是聊天型、任务流水线型，还是两者都有？
4. 必须连接哪些外部系统 / 工具？（用能力描述，如「读工单」「写日历」）
5. 有没有合规 / 脱敏 / 离线约束？

### Round B — 行动与风险

6. 哪些动作是只读？哪些会写数据 / 花钱 / 不可逆？
7. 高风险动作要不要人审？用什么方式确认？
8. 最大可接受延迟 / 成本大概多少？
9. 失败时更怕「乱做」还是「卡住不动」？

### Round C — 记忆需求

10. 跨会话需要记住什么？（用户偏好 / 业务事实 / 历史任务）
11. 现在有没有历史日志、文档、SOP 可当 Procedural / Episodic 原料？
12. 检索更像「按类型过滤」（结构化）还是「意思相近就行」（语义）？
13. 能不能接受「候选知识要人工审核后才生效」？

### Round D — 循环与终止

14. 复杂任务是否需要多步工具循环？
15. 明确的停止条件有哪些？（成功 / 超预算 / 等人 / 澄清）
16. 最大重试次数心里数是多少？

### Round E — 可观测与评估

17. 上线后最想回答的诊断问题是什么？（为什么错 / 为什么慢）
18. 现有「硬门槛」指标有哪些？（准确率、通过率、SLA…用抽象名）
19. 改 Prompt 前要不要离线回归集？

**问卷结束后输出**：`Requirements Snapshot`（半页以内，已脱敏），请用户确认再进入 §4。

---

## 4. 设计输出模板（确认需求后生成）

按下面结构输出 **Agentic Design Brief**（Markdown）：

```markdown
# <项目名> Agentic Design Brief

## 1. 一句话目标
## 2. Agent 类型（Chat / Pipeline / Hybrid）
## 3. 五层映射
- LLM + Prompt：
- Memory：Working / Procedural / Semantic / Episodic / Consolidation（有/缺/延后）
- Tools：
- Harness & Loop / Guardrails：
- LLMOps：
## 4. LLM vs Hardcode 分工表
## 5. Memory 数据流（情景 → Gate → Summarizer → Semantic → RAG）
## 6. RAG 策略（keyword / vector / hybrid；注入到哪些节点）
## 7. 终止条件清单
## 8. Phase 计划（0→7）与本周只做哪一 Phase
## 9. 非目标（明确不做）
## 10. 验收标准
```

若用户已有代码库，再追加（仍脱敏）：

```markdown
## 11. 现状对照（有 / 部分 / 缺）
## 12. 差距与优先级（P0/P1/P2）
```

---

## 5. 从 Brief 到实现的引导顺序

用户确认 Brief 后，按课程 Phase 推进；**默认建议顺序**：

| 顺序 | Phase | 交付物 |
|---|---|---|
| 1 | Phase 1～2 | 最小 Agent + 工具白名单 + 终止护栏 |
| 2 | Phase 3 | Episodic Trace（含 duration_ms） |
| 3 | Phase 4 | Procedural Skills 文件化 |
| 4 | Phase 5 | Gate + Summarizer + 关键词 RAG |
| 5 | Phase 6～7 | Judge / 回归 / 面板（按需） |

每开始一个 Phase，先给用户：

1. 本 Phase 改动文件清单（通用路径名）
2. 明确「不做」列表
3. 验收命令 / 检查项
4. 完成后的下一 Phase 预告

未完成当前 Phase 验收，不进入下一 Phase。

---

## 6. 提问话术示例（可直接用）

**开场**：

> 我们按 Agentic Building Framework 做一次 Walkthrough。先确认 5 件事：谁用、一次成功长什么样、聊天还是流水线、必须接哪些工具、有没有脱敏/离线限制？

**Memory 澄清**：

> 你说的「要有记忆」，更接近：① 本会话上下文 ② 跨会话用户事实 ③ 历史任务审计日志 ④ 从历史提炼的可检索经验？可以多选。

**RAG 澄清**：

> 检索键主要是结构化字段（类型/环境/标签）还是自然语言模糊相似？如果是前者，我们先做关键词/SQL，不上 embedding。

**护栏澄清**：

> 如果 Agent 连续失败，你希望：停下来找人、自动重试 N 次、还是降级到只读建议？N 是多少？

---

## 7. 质量门禁（Skill 自检）

生成 Brief 或代码前自检：

- [ ] 问卷关键项已答或已标「待定」
- [ ] 有明确终止条件
- [ ] Memory 各层标注了有/缺/延后，没有假装已有 Semantic
- [ ] RAG 注入目标仅限 LLM 节点
- [ ] 浓缩与 Judge 标为旁路
- [ ] 本周范围只有一个 Phase
- [ ] 脱敏与非幂等风险已写明
- [ ] 输出中无真实产品名 / 客户路径 / 未授权内部细节

---

## 8. 一句话

**本 Skill = 用问卷把 idea 逼成可执行的 Agentic Design Brief，再按课程 Phase 一段一段落地；课程讲「为什么」，Skill 管「怎么问、怎么拆、怎么验收」。全程通用、脱敏。**
