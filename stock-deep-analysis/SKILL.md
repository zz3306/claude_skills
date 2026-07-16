---
name: stock-deep-analysis
description: Use this skill when the user wants to analyze a specific stock for investment decisions. Triggers include analyzing earnings reports, evaluating a buy/hold/sell decision, comparing two stocks, assessing a stock's bull/bear case, deciding position sizing, or interpreting a company's strategy and management. Works for any sector (tech, financials, crypto-adjacent, biotech, industrials, consumer). This is for users who want depth and pushback, not generic recommendations. Designed for active investors who think in terms of expected value, scenarios, and operational strategies — not buy-and-hold passives.
---

# Stock Deep Analysis Framework

## Philosophy

A good stock analysis answers three layers, in order:

1. **业务本质** (What is this company really?) — 穿透narrative
2. **期望值** (What are the realistic outcomes?) — 概率性思考
3. **操作策略** (What should I actually do?) — 具体动作

Most analyses fail at layer 1 — they accept the company's own story. This skill forces digging deeper.

**Core principles**:
- 永远列bear case和bull case对称（防止乐观偏差）
- 永远把分析转化为操作（"看好"不是结论）
- 永远用peer做对比（不存在绝对judgment，只有相对judgment）
- 永远challenge user的现有判断（不做yes-man）

## When to use this skill

Use when the user asks:
- "分析一下XXX" / "Analyze XXX stock"
- "帮我看看XXX的财报" / "What do you think of XXX's earnings"
- "XXX vs YYY 哪个更好" / "XXX or YYY"
- "我的成本是$X，怎么操作" / "I'm at $X cost basis, what should I do"
- "XXX是好的长期持有吗" / "Is XXX a good long-term hold"
- "XXX的增长点/风险有哪些"

Do NOT use for:
- Pure factual questions (current price, market cap) — just answer
- Index/ETF analysis — different framework needed
- Day-trading technical analysis — this skill is fundamental-focused
- General market commentary — too broad

## The 7-Step Framework

The 7 steps are:
1. **Penetrate the Narrative** — 穿透公司故事
2. **Classify the Stock's Personality** — 定义股票性格
3. **Bull Analyst's Case** (与Step 4合并为对辩format)
4. **Bear Analyst's Case** (与Step 3合并为对辩format)
5. **Comparative Analysis** — 横向对比
6. **Management Evaluation** — 管理层评估
7. **From Analysis to Action** — 操作策略

Steps 3 & 4 are **combined into a single "Analyst Debate"** to force symmetric thinking — see Step 3 & 4 below.

### Step 1: Penetrate the Narrative (穿透公司故事)

The company's investor deck tells a story. Your job is to ask: **is this story真实, partially真实, or marketing?**

**Process**:

1. **List the narrative keywords** the company emphasizes
   - Examples: "AI-native", "platform business", "recurring revenue", "ecosystem", "moat", "asset-light"
   
2. **Decompose actual revenue** by source
   - Get the real revenue mix from latest 10-Q/10-K
   - Identify the **true driver** of each revenue line (price? volume? interest rates? regulation?)
   
3. **Find the gap**
   - Where does the narrative claim "diversified" but reality is "single-driver"?
   - Where does it claim "platform" but reality is "transactional"?
   - Where does it claim "AI-native" but cost structure shows otherwise?

**Output template**:

```
管理层叙事："X is the Y for Z industry"
```

**MANDATORY: Complete Business Model Breakdown Table**

This table is non-negotiable. Every analysis must include it.

| Business Line | Revenue ($M) | % of Total Rev | Gross Margin | YoY Growth | Real Driver | Cyclicality | Strategic Importance |
|---|---|---|---|---|---|---|---|
| [Line 1] | $X | X% | X% | +X% | [What actually drives this] | High/Med/Low | Core/Growth/Legacy |
| [Line 2] | $X | X% | X% | +X% | [Driver] | High/Med/Low | Core/Growth/Legacy |
| [Line 3] | $X | X% | X% | +X% | [Driver] | High/Med/Low | Core/Growth/Legacy |
| ... | | | | | | | |
| **Total** | **$X** | **100%** | **Blended X%** | **+X%** | | | |

**How to fill this table**:

1. **Revenue breakdown**: Get from latest 10-Q/10-K segment reporting. If company reports lumped numbers, estimate from analyst day decks or peer benchmarks.

2. **Gross margin**: 
   - 公司很多时候不disclose每条线的gross margin — estimate from peer companies或industry benchmarks
   - 如果完全无法估计，明确标"N/A — not disclosed"
   - 但永远要有这一列，因为**margin profile是判断业务质量的核心**

3. **Real driver**: 
   - 不是公司说的driver
   - 例：Coinbase的"transaction revenue" → driver is **crypto market volatility + retail risk appetite**, not "user growth"
   - 例：Tesla的"automotive revenue" → driver is **average selling price (ASP)** more than units sold (margin compressed)

4. **Cyclicality**:
   - High = 收入随宏观周期大幅波动（如oil prices、crypto prices、ad spend）
   - Med = 部分受周期影响（如advertising during recession）
   - Low = recurring revenue, contractual

5. **Strategic Importance**:
   - Core = 当前赚钱的主业
   - Growth = 未来3-5年的押注
   - Legacy = 衰退中但还贡献现金流

**Why this table matters**:

- 暴露公司的真实business mix（vs. narrative）
- 识别哪些业务在拉margin、哪些在drag
- 看出growth engines是否有真实margin profile（很多growth business是不赚钱的）
- 为后续valuation做基础（不同margin profile应该用不同multiple）

**Output after table**:

```
关键观察:
1. [Observation about revenue concentration / dependency]
2. [Observation about margin profile]
3. [Observation about strategic mix]

Narrative-Reality Gap:
- 公司说"X" → 实际table显示"Y"
- 公司说"diversified" → 实际X%收入来自单一driver
- 公司说"high-margin platform" → 实际blended margin只有X%
```

**Real example** (TSLA 2024):

| Business Line | Revenue ($B) | % of Total | Gross Margin | YoY | Driver | Cyclicality | Strategic |
|---|---|---|---|---|---|---|---|
| Automotive sales | $77.1 | 79% | 17.9% | -6% | ASP + units (China-driven) | High | Core (declining) |
| Auto regulatory credits | $2.7 | 3% | ~100% | +54% | Other OEM EV mandate compliance | Med | Legacy windfall |
| Energy generation/storage | $10.1 | 10% | 26.2% | +67% | Megapack deployment | Med | Growth |
| Services & Other | $10.5 | 11% | ~5% | +27% | FSD takerate + service network | Med | Growth |
| **Total** | **$97.7** | **100%** | **17.9%** | **+1%** | | | |

关键观察:
1. 79%收入来自auto sales但margin被腰斩（25% → 18%）
2. Energy storage是真正的margin bright spot（26% margin growing 67%）
3. Regulatory credits这种one-time windfall贡献了disproportionate的profit
4. FSD revenue藏在Services里，无法独立判断真实Take rate

Narrative-Reality Gap:
- 公司说"AI公司" → 实际79%是car sales
- 公司说"FSD inflection" → 实际FSD revenue没有独立披露
- 公司说"high-margin software" → 实际blended gross margin 18%

**Anti-pattern**: 接受公司分类（如"transaction revenue"是单一类）。always拆得更细——transaction revenue from什么客户群、什么产品、什么地理市场、什么周期阶段。

### Step 2: Classify the Stock's Personality (定义股票性格)

Different stock types require different analytical frameworks. **Misclassifying a stock is the #1 source of bad investment decisions**.

**Categories**:

| Type | Characteristics | Example | Right Strategy |
|---|---|---|---|
| 长期复利股 | 业务复合机制清晰、订阅/recurring占主导、跨越周期、低beta | MSFT, GOOG, V, COST, MA | Buy and hold, DCA |
| 高速成长股 | 高营收增长（30%+）、产品-市场拐点已过、未盈利或低利润 | NVDA (early), CRWD, NET | Hold through volatility |
| 周期股 | 收入随宏观周期波动、operating leverage反向、估值难量化 | COIN, AMAT, FCX, X | 周期波段交易 |
| 价值股 | 低估值、稳定现金流、增长缓慢 | BAC, KO, JNJ | Income/dividend |
| 事件驱动股 | 价值取决于特定事件（M&A、监管、产品发布） | Biotech, SPACs | Event-based, time-bound |
| 价值陷阱 | 看起来便宜但业务永久性恶化 | F, GE (pre-2018), BBY | 避免 |
| Story股 | 估值依赖叙事而非fundamentals | TSLA (parts), MSTR | 看你信不信故事 |

**Process**:
- 用核心指标快速分类：beta、收入增长率、利润率轨迹、ARR占比、客户集中度
- 不要mix categories — 一只股票主要属于一类
- 注意分类可能随时间改变（NVDA从周期股变成成长股，TSLA从成长股加上Story股属性）

**Output template**:
```
股票性格分类：[类型]
依据：
- Beta vs benchmark: X
- 5-year revenue CAGR: X%
- Operating margin trend: [改善/恶化/稳定]
- Recurring revenue %: X%

含义：这个分类决定了正确的analytical framework和操作策略
```

### Step 3 & 4: The Analyst Debate (多空分析师对辩)

**This is the most important step**. Instead of separately listing bull case and bear case in your own voice, simulate **two opposing analysts** debating the stock. This forces真正对称分析。

**Why this format works**:
- 防止潜意识的乐观/悲观偏差
- 让reader看到完整的辩论双方
- 暴露每个论点的反驳
- 模拟真实投资committee的讨论

**The format**:

---

#### 🐂 Bull Analyst: [Make up name based on style]

**Background**: 描述这个分析师的profile (e.g., "Growth-focused PM at $50B fund, 15-year track record in tech, bullish framework")

**Investment Thesis**: 一句话核心论点

**Bull Case** (3-5 arguments, ranked by importance):

1. **[Argument name]** — 量化潜力
   - 论据: [具体数据/趋势]
   - TAM/Revenue潜力: $X
   - 时间表: X年
   - Leading indicator (当前validation): [What current data supports this]
   - Probability of materializing: X%

2. **[Argument name]** — 量化潜力
   ... (重复)

3. ...

**Counter-rebuttals** (回应空头最强的反驳):

- 空头说"X" → 多头反驳: "实际上Y, 因为Z"
- 空头说"X" → 多头反驳: "...

**Price Target**: $X (timeframe: X months)
- Path to target: [具体催化剂]

---

#### 🐻 Bear Analyst: [Make up name based on style]

**Background**: 描述这个分析师的profile (e.g., "Short-biased hedge fund analyst, focused on accounting red flags and management credibility")

**Investment Thesis**: 一句话核心反向论点

**Bear Case** (3-5 arguments, MUST match Bull side count):

1. **[Risk name]** — Severity & Probability
   - 触发条件: [What would make this materialize]
   - 对股价影响: -X% to -Y%
   - 当前monitoring指标: [Leading indicator]
   - Why mispriced: [为什么市场没有充分price in]

2. **[Risk name]**
   ... (重复)

3. ...

**Counter-rebuttals** (回应多头最强的论点):

- 多头说"X" → 空头反驳: "实际上Y, 因为Z"
- 多头说"X" → 空头反驳: "...

**Price Target**: $X (timeframe: X months)
- Path to target: [具体risk events]

---

#### 🎯 Synthesis (综合判断)

After hearing both sides, give your independent judgment:

**Where Bull is right**:
- [Specific argument that holds up]

**Where Bear is right**:
- [Specific argument that holds up]

**Where Bull is wrong**:
- [Bull argument that doesn't hold up to scrutiny]

**Where Bear is wrong**:
- [Bear argument that's overstated]

**Asymmetry analysis**:
- 上行潜力 ($X target) vs 下行风险 ($Y target)
- Risk/Reward ratio: X:1
- 当前价格更接近哪一端？

**Probability-weighted expected return**:
- Bull case ($X target) × P(bull) = ...
- Base case ($Y target) × P(base) = ...
- Bear case ($Z target) × P(bear) = ...
- **Expected return: X%**

---

**Categories of Bull Arguments to consider**:

1. **TAM expansion** — 新市场、新地理、新客户群
2. **Margin expansion** — operating leverage, mix shift, pricing power
3. **Multiple expansion** — narrative shift, sector rerating
4. **Capital return** — buyback acceleration, dividend initiation
5. **Catalyst events** — product launches, M&A, FDA approval, earnings
6. **Sentiment recovery** — oversold conditions, technical breakouts
7. **Management quality** — turnaround stories, new leadership
8. **Hidden assets** — undervalued segments, real estate, IP

**Categories of Bear Arguments to consider**:

1. **Industry structural risks** — disruption, secular decline
2. **Competitive risks** — share loss, pricing pressure
3. **Regulatory risks** — policy changes, antitrust, tariffs
4. **Macro risks** — interest rates, FX, recession
5. **Management/governance** — CEO departure, scandals, related-party transactions
6. **Technology disruption** — AI, new platforms making business obsolete
7. **Valuation risks** — already priced for perfection
8. **Customer concentration** — top 10 customers % of revenue
9. **Capital structure** — debt walls, dilution, working capital crunch
10. **Hidden financials** — accounting irregularities, unsustainable adjustments
11. **Cyclical reversion** — peak earnings being mistaken for trend

**Anti-patterns to avoid**:

❌ **Asymmetric counts** — 列了5个bull arguments但只有2个bear arguments
❌ **Strawman bear case** — 故意列弱的bear arguments让bull case显强
❌ **Generic risks** — "the stock is volatile" "macro uncertainty"这种废话
❌ **No quantification** — bull/bear arguments必须有具体数字
❌ **Skipping rebuttals** — 双方必须直接回应对方的论点
❌ **Conclusion-first** — 不要先有结论再编debate

**Real example** (TSLA 2024 Q3):

🐂 **Bull Analyst (Cathie-style growth PM)**

Thesis: TSLA是一个被错杀的AI/Robotics公司，市场只pricing其auto business。

1. **Robotaxi 2026 launch** — TAM $1T+
   - Validation: Cybercab unveil + Austin pilot scheduled
   - Probability: 50% successful 2026 launch
   
2. **FSD takerate inflection** — $20B annual recurring revenue at maturity
   - Validation: V13 release shows step-change in capability
   - Probability: 70% takerate doubles in 2025-2026

3. **Energy storage hypergrowth** — Margin profile beats auto
   - Validation: Megapack at 26% gross margin growing 67%
   - Probability: 90% continued growth

Counter-rebuttals:
- 空头说"auto margin compression" → 多头: "Energy + FSD will more than offset by 2026"
- 空头说"China share loss" → 多头: "BYD competes on low-end, TSLA premium保持defensible"

Price Target: $400 (12mo) — driven by Robotaxi narrative + FSD inflection

🐻 **Bear Analyst (Jim Chanos-style short)**

Thesis: TSLA是Story stock，每股Robotaxi optionality + 衰退中的auto business，估值无法支撑。

1. **Auto margin permanent compression** — 25% → 18% → 15%可能
   - Trigger: BYD/小米持续价格战
   - 影响: -30% stock price
   - 当前monitoring: gross margin trend

2. **Robotaxi推迟到2028+** — 估值rerating
   - Trigger: regulatory delays, accidents
   - 影响: -40% from current
   - Mispriced: 市场给2026 launch 50%概率，实际更接近25%

3. **Elon distraction risk** — politics + xAI + X
   - Trigger: 持续negative news cycle
   - 影响: -25% multiple compression

Counter-rebuttals:
- 多头说"FSD inflection" → 空头: "FSD revenue从未独立披露，怀疑数字真实性"
- 多头说"Energy storage" → 空头: "10% revenue救不了79% auto的下滑"

Price Target: $180 (12mo) — auto multiple of 12x EPS + zero credit for moonshots

🎯 **Synthesis**

Bull is right about:
- Energy storage是真正的margin bright spot
- FSD有real progress (V13)

Bear is right about:
- Auto margin compression是structural
- Robotaxi 2026 launch时间表过于乐观

Asymmetry:
- Upside: $400 (probability 30%)
- Base: $250 (probability 40%)  
- Downside: $180 (probability 30%)

Expected return from $300: (400×0.3 + 250×0.4 + 180×0.3) / 300 - 1 = -2%

判断: 当前价格已经price in moderate bull case。Risk/Reward unfavorable for new long. Existing holders can hold但应该减仓部分锁定利润。

### Step 5: Comparative Analysis & Valuation (横向对比 + 估值)

**No stock should be evaluated in isolation**. This step has two mandatory parts:
- **Part A**: Comprehensive peer comparison (operations + financials)
- **Part B**: Valuation analysis (own + relative + intrinsic)

---

#### Part A: Peer Comparison Table

**Peer selection** (必须选3-5个):
- 2-3 Direct competitors（同行业同业务模式）
- 1-2 Adjacent competitors（不同业务但争同样客户/资金）
- 1 Reference benchmark（行业绝对领导者作为标尺）

**MANDATORY Operations Comparison Table**:

| Metric | [Stock] | [Peer 1] | [Peer 2] | [Peer 3] | [Industry Median] |
|---|---|---|---|---|---|
| Market Cap ($B) | | | | | |
| Revenue (TTM, $B) | | | | | |
| Revenue Growth (YoY) | | | | | |
| Revenue Growth (3Y CAGR) | | | | | |
| Gross Margin | | | | | |
| Operating Margin | | | | | |
| FCF Margin | | | | | |
| ROE | | | | | |
| Net Cash / (Debt) | | | | | |
| Buyback Yield | | | | | |
| SBC % of Revenue | | | | | |

**Why each metric matters**:
- Revenue Growth 3Y CAGR比单季度更有意义（消除一次性因素）
- Gross Margin是商业模式质量
- Operating Margin是执行效率
- FCF Margin是真实赚钱能力
- ROE > 20%是优质生意
- Net Cash position防御性
- SBC %过高（>10%）说明真实利润被高估

---

#### Part B: Valuation Analysis (核心)

**这是分析师最容易跳过但最重要的部分**。Valuation有3个层次，每层都要做：

##### Layer 1: Multiple-Based Valuation (相对估值)

**MANDATORY Valuation Multiples Table**:

| Multiple | [Stock] | [Peer 1] | [Peer 2] | [Peer 3] | Industry Median | Stock vs Median |
|---|---|---|---|---|---|---|
| **P/E (TTM)** | | | | | | +/- X% |
| **P/E (Forward 12M)** | | | | | | +/- X% |
| **EV/Revenue (TTM)** | | | | | | +/- X% |
| **EV/EBITDA (TTM)** | | | | | | +/- X% |
| **EV/EBITDA (Forward)** | | | | | | +/- X% |
| **P/FCF** | | | | | | +/- X% |
| **PEG Ratio** | | | | | | +/- X% |
| **P/B** (financials) | | | | | | +/- X% |

**How to interpret**:

- **Premium / Discount**: stock比median贵/便宜多少%
- **PEG > 1.5**: 增长可能已经price in
- **EV/EBITDA spread > 30%**: 显著估值差异，必须有reason
- **Forward vs TTM compression**: 市场预期earnings高速增长

**Output**:

```
[Stock] vs Peers估值结论：
- 相对peer median premium/discount: +/- X%
- 这个gap是否reasonable? 
  - 如果YES，因为：[更高增长/更高margin/更好management]
  - 如果NO，可能存在：[mispricing in either direction]
- 历史上这个premium/discount range是: X% ~ Y%（当前位置）
```

##### Layer 2: Historical Multiple Analysis (自身历史估值)

**Look at the stock's OWN valuation history**, not just peers.

**MANDATORY Historical Range Table**:

| Multiple | Current | 5-Year Avg | 5-Year Low | 5-Year High | Percentile |
|---|---|---|---|---|---|
| P/E (Forward) | X | X | X | X | X% |
| EV/EBITDA | X | X | X | X | X% |
| EV/Revenue | X | X | X | X | X% |
| P/FCF | X | X | X | X | X% |

**Critical questions**:

1. **Where is current valuation in its own历史 range?**
   - <25th percentile → 历史便宜区间
   - 25-75th → 中段
   - \>75th → 历史昂贵区间

2. **Has business changed to justify rerating?**
   - 如果margin profile显著改善 → higher multiple is justified
   - 如果增长率减速 → multiple compression should happen
   - 如果业务模式转型 → 老的multiple不再适用

3. **Has the discount rate environment changed?**
   - 利率上升期：所有growth股multiple compression
   - 利率下降期：相反

##### Layer 3: Intrinsic Valuation (内在价值估算)

**Use one of these frameworks**:

**A. DCF (Discounted Cash Flow)** — for stable cash flow companies
```
Inputs:
- Current FCF: $X
- Growth rate (Year 1-5): X%
- Growth rate (Year 6-10): X%
- Terminal growth: X%
- Discount rate (WACC): X%

Output:
- DCF fair value per share: $X
- Current price: $Y
- Upside/Downside: X%
```

**B. Sum-of-the-Parts (SOTP)** — for diversified companies
```
Segment 1: $X revenue × Y multiple = $Z value
Segment 2: $X revenue × Y multiple = $Z value
Segment 3: $X revenue × Y multiple = $Z value
Net cash: $X
Total enterprise value: $X
Equity value per share: $X

Each segment uses appropriate multiple from peer set.
```

**C. Reverse DCF** — for high-growth/uncertain companies
```
"What's the market currently pricing in?"

Current market cap implies:
- X% revenue growth for Y years to justify
- Z% terminal margin to justify
- Compared to actual: [reasonable / aggressive / unreasonable]
```

**D. Scenario-Based Valuation** — for cyclical/event-driven stocks
```
Bull scenario: $X target (probability Y%)
Base scenario: $X target (probability Y%)
Bear scenario: $X target (probability Y%)
Probability-weighted fair value: $X
Current price: $Y
Expected return: X%
```

**Pick the right framework**:
- 复利股 → DCF
- 多元化公司 → SOTP
- Story股 / 高估值成长股 → Reverse DCF
- 周期股 / Story股 → Scenario-Based

---

#### Part C: Synthesis (综合估值判断)

把以上3层放在一起：

```
估值综合判断：

Layer 1 (vs Peers): [Premium / Discount / Fair] by X%
- 是否reasonable: [YES/NO，原因]

Layer 2 (vs Own History): X percentile of 5-year range
- 当前位置: [历史便宜/中段/历史昂贵]

Layer 3 (Intrinsic): Fair value $X vs current $Y
- Implied upside/downside: X%

最终结论：
- [Stock]当前估值是 [被低估 / 合理 / 被高估]
- 主要driver: [specific reason]
- Risk to thesis: [what would change valuation conclusion]

Margin of Safety:
- 如果你买入，到fair value有X%的upside
- 如果错了，downside到5-year low是X%
- Risk/Reward ratio: X:1
```

---

#### Real Example (NVDA 2024 Q3)

**Operations Comparison**:

| Metric | NVDA | AMD | INTC | TSM | Industry Median |
|---|---|---|---|---|---|
| Market Cap | $3.2T | $260B | $90B | $850B | $260B |
| Revenue Growth (YoY) | +94% | +18% | -6% | +29% | +18% |
| Gross Margin | 75% | 47% | 41% | 53% | 47% |
| Operating Margin | 60% | 8% | -8% | 42% | 8% |
| FCF Margin | 50% | 12% | -2% | 30% | 12% |
| ROE | 120% | 5% | -3% | 27% | 5% |

**Multiples**:

| Multiple | NVDA | AMD | INTC | TSM | Industry Median | NVDA vs Median |
|---|---|---|---|---|---|---|
| P/E (TTM) | 60x | 180x | N/A | 22x | 41x | +46% |
| P/E (Forward) | 35x | 28x | 28x | 18x | 28x | +25% |
| EV/Revenue | 25x | 8x | 2x | 9x | 8.5x | +194% |
| EV/EBITDA (Fwd) | 30x | 24x | 11x | 12x | 18x | +67% |

**Historical**:

| Multiple | Current | 5-Year Avg | Low | High | Percentile |
|---|---|---|---|---|---|
| P/E (Forward) | 35x | 38x | 22x | 60x | 40% |
| EV/EBITDA | 30x | 28x | 18x | 50x | 55% |

**Reverse DCF**:
```
At $3.2T market cap and current $80B FCF:
- Market implies 25%+ FCF growth for 10 years
- Then 4% terminal growth
- Comparison: This requires NVDA维持AI dominance至少10年
- Risk: AMD MI300 + Custom silicon (Google TPU, AWS Trainium)
```

**Synthesis**:
```
- vs Peers: Premium 25-194% across multiples — REASONABLE given 94% growth + 60% op margin
- vs Own History: 40-55th percentile — NOT historically expensive despite price gains
- Intrinsic: Reverse DCF requires aggressive but plausible assumptions

Conclusion: NVDA当前估值是 Fairly Valued (slight premium to fundamentals)
Risk to thesis: Custom silicon shifts AI workloads away from GPUs
Margin of Safety: 不大. Upside +20%, Downside -40% if AI capex slows.
Risk/Reward: 1:2 (unfavorable for new long here)
```

---

**关键judgment principles**:

1. **绝对估值 vs 相对估值都要做** — 单独一个不够
2. **历史估值很重要** — stock可能比peer贵但比自己历史便宜
3. **Valuation不是timing tool** — 便宜的可以更便宜，贵的可以更贵
4. **Premium需要justify** — 不是"好公司就该贵"，而是"这个premium对应什么具体优势"
5. **Margin of Safety是核心** — Risk/Reward < 1:2的trade不值得做

### Step 6: Management Evaluation (管理层评估)

**Many investors skip this. Don't.** 管理层是公司5-10年表现的最大决定因素。

**Dimensions to evaluate**:

1. **CEO background and tenure**
   - 是创始人、专业经理人、还是PE推上去的？
   - 在这个职位多久？过去任期的track record？

2. **Capital allocation track record**
   - M&A是否创造价值（看收购后的revenue和margin）
   - Buyback timing是否合理（高位回购是浪费）
   - Dividend policy是否合理

3. **Strategic clarity**
   - 公司是否有清晰的战略主线，还是"什么都做"？
   - 历史上是否做过艰难的取舍（砍业务、退出市场）？
   - 5年前的承诺是否兑现？

4. **Communication style**
   - Earnings call是真诚还是PR模板？
   - 处理坏消息的方式（直面vs甩锅）
   - 是否给清晰的forward guidance

5. **Compensation alignment**
   - SBC（股权激励）是否过度
   - Performance metrics是否合理（不是只看股价）
   - Insider buying/selling pattern

6. **Team depth**
   - 关键岗位（CFO、CTO、President）质量
   - 是否有清晰的接班计划

**Output template**:
```
管理层评分:

| Dimension | Grade | Reasoning |
|---|---|---|
| CEO judgment | A/B/C/D | ... |
| Capital allocation | A/B/C/D | ... |
| Strategic clarity | A/B/C/D | ... |
| Communication | A/B/C/D | ... |
| Compensation alignment | A/B/C/D | ... |
| Team depth | A/B/C/D | ... |

Overall: [B+/A-/etc]
Key risk: [最大的管理层风险]
```

### Step 7: From Analysis to Action (操作策略)

**A judgment without an action plan is useless**. Convert insights to specific decisions.

**For each user position scenario**:

**Scenario A: User has no position, considering entry**

```
Entry signals (any one trigger 25% target position):
- [Specific signal 1]
- [Specific signal 2]
- [Specific signal 3]

Average up signals (additional 25% each):
- [Signal A]
- [Signal B]

Avoid entry if:
- [Conditions]
```

**Scenario B: User has existing position, looking for guidance**

```
Current cost basis: $X
Current market price: $Y
Position size in portfolio: Z%

Action plan:

If price drops to:
- $A → [action]
- $B → [action]

If price rises to:
- $C → [action]
- $D → [action]

If [specific event happens]:
- [action]

Stop conditions (re-evaluate fundamentally):
- [condition 1]
- [condition 2]
```

**Scenario C: Pair/relative trades**

```
Long [Stock A] / Short [Stock B] makes sense if:
- [thesis]
- Risk: [what kills this trade]

Reverse pair makes sense if:
- [thesis]
```

**关键纪律**:
1. **Don't anchor on cost basis** — 决策应该看forward expected value，不是过去的成本
2. **Set objective triggers** — 不依赖临场判断
3. **Position size matters** — 不止说"买"，要说"占portfolio多少%"
4. **Always have an exit plan** — 进场就想好出场

## Output Structure

When delivering analysis, follow this structure:

1. **One-line judgment** (用一句话钉死核心观点)
   - 不要"It's complicated" — 必须有立场
   - 例: "X是估值已price in太多增长的complete story stock"

2. **The 7-step analysis** (按需详略)
   - 不需要每步都长篇大论
   - 但每步都要有output
   - Step 4（bear case）至少和step 3（bull case）一样详尽

3. **Specific action recommendations**
   - 根据user的position情况
   - 给出条件触发式的策略

4. **Direct challenge to user's stated view**
   - 如果user有existing judgment，要challenge它
   - 不做yes-man，但理由要充分

## Communication Style Guidelines

**Tone**:
- 直接，不绕弯子
- 像一个有经验的朋友，不是研究报告作者
- 数字要具体，避免模糊（"巨大增长" → "X%增长"）
- 中英文术语混用OK（"PE", "operating leverage", "Adjusted EBITDA"），如果user用中文

**Formatting**:
- 长分析用sections + bullet points
- 短回答用prose
- 表格用于对比和数据展示
- 不要over-format（不是每个回答都需要headers）

**What to avoid**:
- "It depends on your risk tolerance" — 这是cop-out，给具体判断
- "Past performance doesn't guarantee future" — 废话
- 过度hedging（"可能也许大概") — 给probability估计
- "Do your own research" — 你就是在帮他做research

**What to embrace**:
- "我认为..."（有清晰立场）
- "X的概率是Y%"（量化判断）
- "你这个想法是错的，原因是..."（直接挑战）
- "如果发生A，做X；如果发生B，做Y"（条件式建议）

## Common Pitfalls to Avoid

### Pitfall 1: Accepting management's framing

公司说"我们是AI公司"，你也说"这是AI公司"。**永远独立判断category**。

### Pitfall 2: Bull case asymmetry

列了5个增长引擎，只列1个风险。**强制对称**。

### Pitfall 3: Conclusion-first analysis

先有结论再找证据。**让evidence决定conclusion**，准备好被自己的分析说服改变观点。

### Pitfall 4: Ignoring valuation

"基本面好"不等于"该买"。**好公司+贵估值 = 平庸投资**。

### Pitfall 5: Static analysis

只看当前snapshot不看趋势。**Trend matters more than level**——margin从40%降到30%比稳定在25%糟糕。

### Pitfall 6: Macro blindness

把公司分析与宏观脱节。**利率、汇率、地缘政治都影响公司估值**。

### Pitfall 7: Anchoring on user's cost basis

User说"我成本$100"，你就围绕$100做分析。**Cost basis不是决策依据**——用forward expected value。

### Pitfall 8: Generic recommendations

"长期持有优质公司"——这种废话不要说。**要具体到价位、条件、仓位**。

### Pitfall 9: Following the consensus

WSB/CNBC/Twitter说什么就分析什么。**Your job is to think independently**——consensus often wrong at turning points.

### Pitfall 10: Forgetting it's the user's money

最终user做决策。**give them the framework to think, not just conclusions**。

## Adapting to User Context

If user mentions:
- **"aggressive growth investor"** — 多讨论高弹性opportunities，少讨论dividend stocks
- **"long-term holder"** — Focus on复利股 framework，慎重对待周期股
- **"trader"** — 多讨论technical levels, momentum, catalysts
- **"specific cost basis"** — 给条件触发式策略，但提醒不要被sunk cost绑架
- **"first-time investor"** — 简化，强调基础概念
- **"experienced investor"** — Use technical terms freely, get to the point

## Examples of Good vs Bad Analysis

### Bad

> "TSLA is a great long-term hold. Elon Musk is innovative and the company has multiple growth drivers including FSD, Robotaxi, Optimus, and Energy. Risks include competition and valuation. I would recommend holding for the long term."

**Why bad**: Generic, no specific data, no operational guidance, no challenge to potentially wrong assumptions, "long-term hold" is platitude.

### Good

> "TSLA当前是70% Elon premium + 30% real automotive business的story stock。
> 
> 业务本质：core automotive业务在2024-2025已经show出structural margin compression（毛利从25%降到18%），中国市场份额被BYD/小米侵蚀。Elon premium来自FSD、Robotaxi、Optimus、xAI这些option values，但每一个都还在validation phase。
> 
> 性格分类：从"成长股"漂移到"Story股"——这是危险的转变，因为story股估值依赖narrative而非cash flow。
> 
> Bull case (3个引擎，按概率排序):
> 1. Robotaxi success in 2026-2027 → +$200B市值（30%概率）
> 2. FSD revenue inflection → +$80B市值（40%概率）
> 3. Optimus mass production → +$300B市值（10%概率）
> 
> Bear case (4个风险，按severity排序):
> 1. Auto margin进一步压缩 → -30%股价
> 2. Elon distraction (politics/X) → 估值rerating -25%
> 3. Robotaxi推迟到2028+ → 估值rerating -40%
> 4. China demand cliff → -20%股价
> 
> Action: 如果你已持有，在$300+减仓30%，留长尾仓位赌Robotaxi。如果没持有，等回调到$200以下分批入场。"

**Why good**: Specific category, quantified probabilities, asymmetric scenarios, actionable triggers.

## Final Reminder

This skill exists to help users **think more clearly**, not to predict markets. 

A perfect analysis with wrong action is useless.
A good-enough analysis with disciplined action is profitable.

**Always end with**:
1. The user's most likely next question
2. An offer to deepen any specific dimension
3. A challenge to their assumed framework if you spotted one
