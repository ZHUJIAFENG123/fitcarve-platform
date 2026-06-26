const express = require('express');
const router = express.Router();
const DietPlan = require('../models/DietPlan');

// GET /api/diet — 列表
router.get('/', async (req, res) => {
  try {
    const { goal, page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const options = { limit: limitNum, offset: (pageNum - 1) * limitNum };
    if (goal) options.goal = goal;

    const [list, total] = await Promise.all([
      DietPlan.findAll(options),
      DietPlan.count(options)
    ]);

    res.json({ list, total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/diet/popular
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const list = await DietPlan.getPopular(limit);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/diet/:id
router.get('/:id', async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: '饮食方案不存在' });
    await DietPlan.incrementViews(req.params.id);
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
