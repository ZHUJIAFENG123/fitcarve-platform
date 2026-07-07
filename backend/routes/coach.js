const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

// GET /api/coaches — 教练列表
router.get('/', async (req, res) => {
  try {
    const { specialty, verified, limit } = req.query;
    const coaches = await Coach.findAll({
      specialty,
      verified: verified === 'true' ? true : undefined,
      status: 'approved',
      limit: limit ? parseInt(limit) : undefined
    });
    res.json({ success: true, data: coaches });
  } catch (err) {
    console.error('获取教练列表失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// GET /api/coaches/:id — 教练详情
router.get('/:id', async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ success: false, message: '教练不存在' });
    const reviews = await Coach.getReviews(req.params.id);
    res.json({ success: true, data: { ...coach, reviews } });
  } catch (err) {
    console.error('获取教练详情失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// GET /api/coaches/:id/dashboard — 教练工作台
router.get('/:id/dashboard', authenticate, async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ success: false, message: '教练不存在' });
    if (coach.user_id !== req.user.id) {
      return res.status(403).json({ success: false, message: '无权访问' });
    }
    const dashboard = await Coach.getDashboard(req.params.id);
    res.json({ success: true, data: dashboard });
  } catch (err) {
    console.error('获取教练工作台失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// POST /api/coaches/apply — 申请成为教练
router.post('/apply', authenticate, async (req, res) => {
  try {
    const existing = await Coach.findByUserId(req.user.id);
    if (existing) {
      return res.status(400).json({ success: false, message: '您已提交过申请' });
    }

    const { name, title, bio, specialty, certifications, experienceYears, education, hourlyRate } = req.body;
    const coachId = await Coach.apply({
      userId: req.user.id,
      name: name || req.user.username,
      avatar: req.user.avatar || '',
      title: title || '',
      bio: bio || '',
      specialty: specialty || '',
      certifications: certifications || '',
      experienceYears: experienceYears || 0,
      education: education || '',
      hourlyRate: hourlyRate || 0
    });

    res.json({ success: true, data: { id: coachId }, message: '申请已提交，等待审核' });
  } catch (err) {
    console.error('教练申请失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// POST /api/coaches/:id/review — 评价教练
router.post('/:id/review', authenticate, async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ success: false, message: '教练不存在' });

    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: '评分需在1-5之间' });
    }

    const reviewId = await Coach.addReview(req.params.id, req.user.id, rating, comment);
    res.json({ success: true, data: { id: reviewId }, message: '评价成功' });
  } catch (err) {
    console.error('评价教练失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

module.exports = router;
