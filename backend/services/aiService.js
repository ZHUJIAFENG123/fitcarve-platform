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

async function callLLM(systemPrompt, userMessage, temperature = 0.7, maxTokens = 2000) {
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
      max_tokens: maxTokens
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

  if (msg.includes('训练计划') || msg.includes('生成') || systemPrompt.includes('训练计划')) {
    return mockPlan(userMessage);
  }
  if (msg.includes('吃了') || msg.includes('热量') || msg.includes('kcal') || systemPrompt.includes('饮食')) {
    return mockDiet(userMessage);
  }
  return mockChat(userMessage);
}

/**
 * mockPlan - 返回与 training_plans.syllabus schema 一致的结构化 JSON
 * 字段：title, description, goal, level, duration_weeks, days_per_week, equipment, syllabus
 */
function mockPlan(userMessage) {
  // 默认值：减脂 / 初级 / 1周 / 4天 / 自重
  return {
    title: 'AI 模拟训练计划（减脂入门）',
    description: '适合初学者的全身性训练计划，每周4天，以自重训练为主，配合有氧。',
    goal: 'lose_fat',
    level: 'beginner',
    duration_weeks: 1,
    days_per_week: 4,
    equipment: '自重',
    syllabus: [
      {
        week: 1,
        days: [
          {
            day: 1,
            title: '全身适应性训练',
            warmup: '跳绳5分钟 + 动态拉伸（肩部、髋部、踝部绕环）',
            exercises: [
              { name: '高脚杯深蹲', sets: 3, reps: '12-15', rest: 60, notes: '保持背部挺直' },
              { name: '哑铃卧推', sets: 3, reps: '10-12', rest: 60 },
              { name: '哑铃划船', sets: 3, reps: '10-12', rest: 60 },
              { name: '哑铃推举', sets: 3, reps: '10-12', rest: 60 },
              { name: '平板支撑', sets: 3, reps: '30秒', rest: 30 }
            ],
            cooldown: '全身静态拉伸5分钟，重点拉伸大腿、胸背、肩部'
          },
          {
            day: 2,
            title: '休息或轻度有氧',
            warmup: '',
            exercises: [],
            cooldown: '快走30分钟 或 骑行20分钟，保持心率在最大心率的60%-70%'
          },
          {
            day: 3,
            title: '全身力量训练',
            warmup: '划船机5分钟 + 动态拉伸',
            exercises: [
              { name: '罗马尼亚硬拉', sets: 3, reps: '10-12', rest: 90 },
              { name: '哑铃飞鸟', sets: 3, reps: '12-15', rest: 60 },
              { name: '单臂哑铃划船', sets: 3, reps: '10-12', rest: 60 },
              { name: '侧平举', sets: 3, reps: '15', rest: 45 },
              { name: '卷腹', sets: 3, reps: '15', rest: 30 }
            ],
            cooldown: '泡沫轴放松大腿、背部、肩部'
          },
          {
            day: 4,
            title: '休息',
            warmup: '',
            exercises: [],
            cooldown: '完全休息日，可进行轻度散步'
          }
        ]
      }
    ]
  };
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

// ── 动作库匹配 ──

/**
 * 为 syllabus 中每个 exercise 填充 exercise_id（按名称精确匹配，找不到则用模糊匹配第一个）
 * 匹配失败的 exercise 保留原样（无 exercise_id），详情页会显示「未关联」标记
 */
async function matchExercises(syllabus) {
  let Exercise;
  try {
    Exercise = require('../models/Exercise');
  } catch (e) {
    console.warn('[aiService] Exercise model not available, skip matching');
    return syllabus;
  }

  if (!Array.isArray(syllabus)) return syllabus;

  for (const week of syllabus) {
    if (!week || !Array.isArray(week.days)) continue;
    for (const day of week.days) {
      if (!day || !Array.isArray(day.exercises)) continue;
      for (const ex of day.exercises) {
        if (!ex || !ex.name || ex.exercise_id) continue;
        try {
          const matches = await Exercise.search(ex.name, 5);
          if (matches.length > 0) {
            // 优先精确匹配，否则用第一个模糊匹配结果
            const exact = matches.find(m => m.name === ex.name) || matches[0];
            ex.exercise_id = exact.id;
          }
        } catch (e) {
          console.warn(`[aiService] matchExercises failed for "${ex.name}":`, e.message);
        }
      }
    }
  }

  return syllabus;
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
 * AI 生成训练计划 - 返回结构化 JSON 对象
 * 输出格式与 training_plans.syllabus schema 一致：
 * { title, description, goal, level, duration_weeks, days_per_week, equipment, syllabus }
 * syllabus 内每个 exercise 已填充 exercise_id（若动作库有匹配）
 */
async function generatePlan(params) {
  const { goal, level, weeks, daysPerWeek, equipment, notes } = params;

  const systemPrompt = `你是一位专业的健身教练和训练计划设计师。
请根据用户的需求生成一个 ${weeks} 周、每周 ${daysPerWeek} 天的训练计划。

【输出要求】必须返回严格的 JSON 对象（不要 markdown、不要代码块包裹、不要任何解释文字），结构如下：

{
  "title": "字符串，计划标题（中文，简短有吸引力）",
  "description": "字符串，1-2 句话简短描述",
  "goal": "lose_fat | build_muscle | improve_endurance | shape | strength",
  "level": "beginner | intermediate | advanced",
  "duration_weeks": 数字,
  "days_per_week": 数字,
  "equipment": "字符串，使用的器材列表（如：哑铃、自重、杠铃）",
  "syllabus": [
    {
      "week": 数字（从1开始）,
      "days": [
        {
          "day": 数字（从1开始）,
          "title": "字符串，如「全身力量」",
          "warmup": "字符串，热身描述（5-10分钟）",
          "exercises": [
            { "name": "动作中文名", "sets": 数字, "reps": "如 8-12 或 30秒", "rest": 秒数, "notes": "可选，要领提示" }
          ],
          "cooldown": "字符串，拉伸/放松描述"
        }
      ]
    }
  ]
}

【设计原则】
1. 难度匹配 ${level} 水平：beginner 用基础动作（深蹲、硬拉、卧推）；intermediate 引入复合动作；advanced 加入进阶变式
2. 目标为 ${goal}：减脂多复合动作+短休息；增肌多力量训练+8-12次；耐力多循环组；塑形均衡训练
3. 器材仅限：${equipment || '无特殊限制，可用自重、哑铃、杠铃等常见器材'}
4. 每个 day 含 4-6 个动作，热身和拉伸是必填字段（休息日可留空）
5. 休息日 day.exercises 为空数组 []
6. 动作名称使用中文通用译法（如「杠铃深蹲」「哑铃卧推」「罗马尼亚硬拉」「卷腹」「平板支撑」）

${notes ? `【用户备注】${notes}` : ''}

只输出 JSON，不要其他任何内容。`;

  const userMessage = `请为我生成训练计划：
- 目标：${goal}
- 难度：${level}
- 周期：${weeks} 周
- 每周训练：${daysPerWeek} 天
- 可用器材：${equipment || '无特殊限制'}
- 备注：${notes || '无'}`;

  // 调用 LLM（mock 模式下 callLLM 直接返回 mockPlan 的结构化对象）
  const llmOutput = await callLLM(systemPrompt, userMessage, 0.7, 4000);

  // mock 模式：llmOutput 已是结构化对象
  if (typeof llmOutput === 'object' && llmOutput !== null) {
    return await matchExercises(llmOutput.syllabus).then(() => llmOutput);
  }

  // 真实 LLM 模式：解析 JSON 字符串
  let planObj;
  try {
    // 容错：去除可能的 markdown 代码块包裹
    let jsonStr = llmOutput.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }
    planObj = JSON.parse(jsonStr);
  } catch (e) {
    console.warn('[aiService] LLM 返回非合法 JSON，降级为 mockPlan。原始输出：', llmOutput.slice(0, 200));
    const fallback = mockPlan(userMessage);
    return await matchExercises(fallback.syllabus).then(() => fallback);
  }

  // 基本字段校验：syllabus 必须是数组
  if (!planObj || !Array.isArray(planObj.syllabus)) {
    console.warn('[aiService] LLM 返回 JSON 缺少 syllabus，降级为 mockPlan');
    const fallback = mockPlan(userMessage);
    return await matchExercises(fallback.syllabus).then(() => fallback);
  }

  // 用用户请求的参数覆盖 LLM 输出（防止 LLM 自由发挥不一致）
  planObj.duration_weeks = Number(weeks) || planObj.duration_weeks || 4;
  planObj.days_per_week = Number(daysPerWeek) || planObj.days_per_week || 4;
  planObj.goal = goal || planObj.goal;
  planObj.level = level || planObj.level;

  // 匹配动作库
  await matchExercises(planObj.syllabus);

  return planObj;
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
