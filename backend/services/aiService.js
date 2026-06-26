/**
 * AI Service — wraps LLM API calls with mock fallback
 * 
 * Environment variables:
 *   AI_API_KEY=your-api-key       (required for real LLM)
 *   AI_API_URL=https://api.deepseek.com/v1/chat/completions
 *   AI_MODEL=deepseek-chat
 */

const AI_API_KEY = process.env.AI_API_KEY || '';
const AI_API_URL = process.env.AI_API_URL || 'https://api.deepseek.com/v1/chat/completions';
const AI_MODEL = process.env.AI_MODEL || 'deepseek-chat';

function isMockMode() {
  return !AI_API_KEY || AI_API_KEY === 'mock';
}

async function callLLM(systemPrompt, userMessage, temperature = 0.7) {
  if (isMockMode()) {
    return mockResponse(systemPrompt, userMessage);
  }

  const response = await fetch(AI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_API_KEY}`
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `AI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// ── Mock responses ──

function mockResponse(systemPrompt, userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('训练计划') || msg.includes('生成') || systemPrompt.includes('训练')) {
    return mockPlan(userMessage);
  }
  if (msg.includes('吃了') || msg.includes('热量') || msg.includes('kcal') || systemPrompt.includes('饮食')) {
    return mockDiet(userMessage);
  }
  return mockChat(userMessage);
}

function mockPlan(userMessage) {
  return `**AI 生成训练计划（模拟模式）**

**第1周 Day1：全身适应性训练**
- 🏃 热身：跳绳5分钟 + 动态拉伸
- 高脚杯深蹲 3×12-15
- 哑铃卧推 3×10-12
- 哑铃划船 3×10-12
- 哑铃推举 3×10-12
- 平板支撑 3×30秒
- 🧘 拉伸：全身静态拉伸5分钟

**第1周 Day2：休息或轻度有氧**
- 快走30分钟 或 骑行20分钟

**第1周 Day3：全身力量**
- 🏃 热身：划船机5分钟
- 罗马尼亚硬拉 3×10-12
- 哑铃飞鸟 3×12-15
- 单臂哑铃划船 3×10-12
- 侧平举 3×15
- 卷腹 3×15
- 🧘 拉伸：泡沫轴放松

**第1周 Day4：休息**

> 💡 以上为AI模拟生成。配置 AI_API_KEY 环境变量后可使用真实AI生成更个性化的计划。`;
}

function mockDiet(userMessage) {
  return `**AI 饮食分析（模拟模式）**

根据你的描述，估算如下：

| 项目 | 数值 |
|------|------|
| 🔥 热量 | 约 **520 kcal** |
| 🥩 蛋白质 | 约 **42g** |
| 🍚 碳水 | 约 **48g** |
| 🥑 脂肪 | 约 **16g** |

> 💡 以上为AI模拟估算。配置 AI_API_KEY 环境变量后可使用真实AI进行精准分析。`;
}

function mockChat(userMessage) {
  const replies = [
    '这是一个很好的健身问题！建议你结合科学的训练计划和合理的饮食方案来达成目标。你可以浏览我们的「训练&饮食」模块获取更多内容。',
    '根据运动科学的研究，循序渐进是取得进步的关键。建议每周增加不超过5-10%的训练量，避免过度训练。',
    '饮食和训练同样重要。一般来说，增肌需要热量盈余（+300-500kcal），减脂需要热量缺口（-300-500kcal）。具体可以查看我们的饮食方案模块。',
    '建议每次训练前做好热身（5-10分钟轻度有氧+动态拉伸），训练后进行静态拉伸帮助恢复。',
    '蛋白质摄入建议每公斤体重1.6-2.2g/天，均匀分配到三餐中。运动后30-60分钟补充蛋白质+碳水，有助于恢复。'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// ── Public API ──

/**
 * AI Chat — general fitness Q&A
 */
async function chat(userMessage, context = {}) {
  const systemPrompt = `你是一个专业的健身助手，名叫"FitAI"。你拥有以下知识：
- 运动科学（力量训练、有氧、柔韧、康复）
- 运动营养（增肌、减脂、维持、补剂）
- 训练计划设计
- 饮食方案设计

用户信息：${context.userInfo || '未知'}
当前页面：${context.currentPage || '未知'}

请用中文回答，保持专业但友好。回答简洁，控制在200字以内。可以适当使用emoji。`;

  return await callLLM(systemPrompt, userMessage, 0.8);
}

/**
 * AI 生成训练计划
 */
async function generatePlan(params) {
  const { goal, level, weeks, daysPerWeek, equipment, notes } = params;
  
  const systemPrompt = `你是一个专业的健身教练和训练计划设计师。
请根据用户的需求生成一个${weeks}周的训练计划。

输出格式要求：
1. 按周组织，每周${daysPerWeek}个训练日
2. 每个训练日包含：热身、3-6个动作（每个含组数×次数）、拉伸
3. 动作名称使用中文，器材限于用户指定的器材
4. 难度适合${level}水平，目标为${goal}
5. 考虑用户的备注信息

请输出纯文本，使用markdown格式，不要JSON。`;

  const userMessage = `请为我生成训练计划：
- 目标：${goal}
- 难度：${level}
- 周期：${weeks}周
- 每周训练：${daysPerWeek}天
- 可用器材：${equipment || '无特殊限制'}
- 备注：${notes || '无'}`;

  return await callLLM(systemPrompt, userMessage, 0.9);
}

/**
 * AI 分析饮食
 */
async function analyzeDiet(foodDescription) {
  const systemPrompt = `你是一个专业的运动营养师和饮食分析助手。
用户会用自然语言描述他们吃了什么。
请分析并估算以下数据：
- 总热量(kcal)
- 蛋白质(g)
- 碳水(g)
- 脂肪(g)
- 简短评价（一句话）

输出格式为纯文本表格，包含上述5项。`;

  return await callLLM(systemPrompt, foodDescription, 0.5);
}

/**
 * AI 文章摘要
 */
async function summarizeArticle(title, content) {
  const systemPrompt = `你是一个专业的健身内容编辑。请将以下文章总结为一句话摘要（50字以内），提取核心观点。`;
  const userMessage = `标题：${title}\n内容：${content.slice(0, 3000)}`;
  
  return await callLLM(systemPrompt, userMessage, 0.3);
}

module.exports = {
  chat,
  generatePlan,
  analyzeDiet,
  summarizeArticle,
  isMockMode
};
