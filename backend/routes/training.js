const express = require('express');
const router = express.Router();
const TrainingPlan = require('../models/TrainingPlan');

// GET /api/training — 列表
router.get('/', async (req, res) => {
  try {
    const { goal, level, page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const options = { limit: limitNum, offset: (pageNum - 1) * limitNum };
    if (goal) options.goal = goal;
    if (level) options.level = level;

    const [list, total] = await Promise.all([
      TrainingPlan.findAll(options),
      TrainingPlan.count(options)
    ]);

    res.json({ list, total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/popular
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const list = await TrainingPlan.getPopular(limit);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/:id
router.get('/:id', async (req, res) => {
  try {
    const plan = await TrainingPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: '训练计划不存在' });
    await TrainingPlan.incrementViews(req.params.id);
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
