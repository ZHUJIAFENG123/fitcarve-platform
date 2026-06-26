const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

// GET /api/ai/status
router.get('/status', (req, res) => {
  res.json({
    available: true,
    mockMode: aiService.isMockMode(),
    model: process.env.AI_MODEL || 'deepseek-chat'
  });
});

// POST /api/ai/chat — AI 对话
router.post('/chat', optionalAuthenticate, async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ error: '请输入消息' });

    const reply = await aiService.chat(message, context || {});
    res.json({ reply, mockMode: aiService.isMockMode() });
  } catch (err) {
    console.error('AI Chat error:', err);
    res.status(500).json({ error: 'AI服务暂时不可用', mockMode: true });
  }
});

// POST /api/ai/generate-plan — AI 生成训练计划
router.post('/generate-plan', optionalAuthenticate, async (req, res) => {
  try {
    const { goal, level, weeks, daysPerWeek, equipment, notes } = req.body;
    if (!goal || !level) return res.status(400).json({ error: '请指定目标和难度' });

    const plan = await aiService.generatePlan({
      goal, level,
      weeks: weeks || 4,
      daysPerWeek: daysPerWeek || 4,
      equipment: equipment || '',
      notes: notes || ''
    });
    res.json({ plan, mockMode: aiService.isMockMode() });
  } catch (err) {
    console.error('AI Generate Plan error:', err);
    res.status(500).json({ error: 'AI服务暂时不可用', mockMode: true });
  }
});

// POST /api/ai/analyze-diet — AI 分析饮食
router.post('/analyze-diet', authenticate, async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: '请描述你吃了什么' });

    const analysis = await aiService.analyzeDiet(description);
    res.json({ analysis, mockMode: aiService.isMockMode() });
  } catch (err) {
    console.error('AI Analyze Diet error:', err);
    res.status(500).json({ error: 'AI服务暂时不可用', mockMode: true });
  }
});

// POST /api/ai/summarize — AI 文章摘要
router.post('/summarize', optionalAuthenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: '请提供标题和内容' });

    const summary = await aiService.summarizeArticle(title, content);
    res.json({ summary, mockMode: aiService.isMockMode() });
  } catch (err) {
    console.error('AI Summarize error:', err);
    res.status(500).json({ error: 'AI服务暂时不可用', mockMode: true });
  }
});

module.exports = router;
