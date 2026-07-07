const express = require('express');
const router = express.Router();
const LearningPath = require('../models/LearningPath');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

// GET /api/learning — 学习路径列表
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, limit } = req.query;
    const options = {};
    if (category) options.category = category;
    if (difficulty) options.difficulty = difficulty;
    if (limit) options.limit = parseInt(limit);
    const list = await LearningPath.findAll(options);
    const total = await LearningPath.count(options);
    res.json({ list, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/learning/mine — 我报名的学习路径（需登录）
router.get('/mine', authenticate, async (req, res) => {
  try {
    const list = await LearningPath.getUserEnrolled(req.user.id);
    res.json({ list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/learning/:id — 学习路径详情（含学习项列表）
router.get('/:id', optionalAuthenticate, async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id);
    if (!path) return res.status(404).json({ message: '学习路径不存在' });
    const items = await LearningPath.getItems(req.params.id);
    let progress = [];
    if (req.user) {
      progress = await LearningPath.getUserProgress(req.user.id, req.params.id);
    }
    await LearningPath.incrementViews(req.params.id);
    res.json({ ...path, items, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// POST /api/learning/:id/enroll — 加入学习路径（需登录）
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const result = await LearningPath.enroll(req.user.id, req.params.id);
    res.json({ message: `已加入学习路径，共 ${result.enrolled} 节课`, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// POST /api/learning/:id/progress — 标记学习进度（需登录）
router.post('/:id/progress', authenticate, async (req, res) => {
  try {
    const { itemId, status = 'completed' } = req.body;
    if (!itemId) return res.status(400).json({ message: '缺少 itemId' });
    const result = await LearningPath.markProgress(req.user.id, req.params.id, itemId, status);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
