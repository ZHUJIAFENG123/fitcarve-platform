const express = require('express');
const router = express.Router();
const TrainingPlan = require('../models/TrainingPlan');
const TrainingEnrollment = require('../models/TrainingEnrollment');
const TrainingLog = require('../models/TrainingLog');
const { pool } = require('../db');
const { authenticate } = require('../middleware/auth');

// GET /api/training — 列表（支持 goal/level/keyword/equipment/sort 筛选）
router.get('/', async (req, res) => {
  try {
    const { goal, level, keyword, equipment, sort, page = 1, limit = 12 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(60, Math.max(1, parseInt(limit) || 12));

    const options = { limit: limitNum, offset: (pageNum - 1) * limitNum };
    if (goal) options.goal = goal;
    if (level) options.level = level;
    if (keyword) options.keyword = keyword.trim();
    if (equipment) options.equipment = equipment;
    if (sort) options.sort = sort;

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

// GET /api/training/mine — 我的训练计划（需登录）
router.get('/mine', authenticate, async (req, res) => {
  try {
    const { goal, level, page = 1, limit = 12 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(60, Math.max(1, parseInt(limit) || 12));
    const options = { limit: limitNum, offset: (pageNum - 1) * limitNum };
    if (goal) options.goal = goal;
    if (level) options.level = level;
    const list = await TrainingPlan.findByAuthor(req.user.id, options);
    res.json({ list, total: list.length, page: pageNum, limit: limitNum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/enrolled — 我报名的训练计划列表（需登录）
router.get('/enrolled', authenticate, async (req, res) => {
  try {
    const list = await TrainingEnrollment.findByUser(req.user.id);
    res.json({ list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/logs/calendar?month=YYYY-MM — 训练日历（需登录）
router.get('/logs/calendar', authenticate, async (req, res) => {
  try {
    const month = String(req.query.month || '');
    const m = month.match(/^(\d{4})-(\d{2})$/);
    if (!m) return res.status(400).json({ message: 'month 参数格式应为 YYYY-MM' });
    const list = await TrainingLog.findByUserMonth(req.user.id, +m[1], +m[2]);
    res.json({ list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/stats — 我的训练统计（需登录）
router.get('/stats', authenticate, async (req, res) => {
  try {
    const stats = await TrainingLog.getStats(req.user.id);
    const [[{ total_enrollments }]] = await pool.query(
      'SELECT COUNT(*) AS total_enrollments FROM user_training_enrollments WHERE user_id = ?',
      [req.user.id]
    );
    res.json({ ...stats, total_enrollments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 输入校验：创建/更新训练计划
function validatePlanInput(data, isCreate = true) {
  const errors = [];
  if (isCreate) {
    if (!data.title || !data.title.trim()) errors.push('标题不能为空');
    if (!data.goal) errors.push('目标不能为空');
    if (!data.level) errors.push('难度不能为空');
    if (!data.syllabus) errors.push('训练大纲不能为空');
  }
  if (data.title && data.title.length > 200) errors.push('标题不能超过200字');
  if (data.goal && !['build_muscle', 'lose_fat', 'endurance', 'flexibility', 'general'].includes(data.goal)) {
    errors.push('目标值不合法');
  }
  if (data.level && !['beginner', 'intermediate', 'advanced'].includes(data.level)) {
    errors.push('难度值不合法');
  }
  if (data.duration_weeks && (data.duration_weeks < 1 || data.duration_weeks > 52)) {
    errors.push('训练周期应在1-52周之间');
  }
  if (data.days_per_week && (data.days_per_week < 1 || data.days_per_week > 7)) {
    errors.push('每周训练天数应在1-7之间');
  }
  return errors;
}

// POST /api/training — 创建训练计划（需登录）
router.post('/', authenticate, async (req, res) => {
  try {
    const errors = validatePlanInput(req.body, true);
    if (errors.length > 0) return res.status(400).json({ message: '输入校验失败', errors });

    const id = await TrainingPlan.create(req.body, req.user.id);
    res.status(201).json({ id, message: '训练计划创建成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// PUT /api/training/:id — 更新训练计划（需登录，仅作者或 admin）
router.put('/:id', authenticate, async (req, res) => {
  try {
    const errors = validatePlanInput(req.body, false);
    if (errors.length > 0) return res.status(400).json({ message: '输入校验失败', errors });

    const isAdmin = req.user.role === 'admin';
    const userId = isAdmin ? 0 : req.user.id;  // admin 用 0 跳过权限校验
    const ok = await TrainingPlan.update(req.params.id, req.body, userId);
    if (!ok) return res.status(403).json({ message: '无权修改此计划或计划不存在' });
    res.json({ message: '更新成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// DELETE /api/training/:id — 删除训练计划（需登录，仅作者或 admin）
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const userId = isAdmin ? 0 : req.user.id;
    const ok = await TrainingPlan.delete(req.params.id, userId);
    if (!ok) return res.status(403).json({ message: '无权删除此计划或计划不存在' });
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 浏览量去重缓存：key = `${ip}_${planId}`，24h 内同一 IP 同一计划只算一次
const viewDedupMap = new Map();
const VIEW_DEDUP_TTL = 24 * 60 * 60 * 1000;

function shouldIncrementView(ip, planId) {
  const key = `${ip}_${planId}`;
  const now = Date.now();
  if (viewDedupMap.has(key)) {
    const lastView = viewDedupMap.get(key);
    if (now - lastView < VIEW_DEDUP_TTL) return false;
  }
  viewDedupMap.set(key, now);
  // 定期清理过期项（每 1000 次访问清理一次）
  if (viewDedupMap.size > 1000) {
    for (const [k, t] of viewDedupMap) {
      if (now - t > VIEW_DEDUP_TTL) viewDedupMap.delete(k);
    }
  }
  return true;
}

// POST /api/training/:id/enroll — 报名训练计划（需登录）
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const plan = await TrainingPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: '训练计划不存在' });

    await TrainingEnrollment.enroll(req.user.id, req.params.id);
    await TrainingPlan.incrementEnrolled(req.params.id);
    res.json({ message: '报名成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// DELETE /api/training/:id/enroll — 取消报名（需登录）
router.delete('/:id/enroll', authenticate, async (req, res) => {
  try {
    const ok = await TrainingEnrollment.unenroll(req.user.id, req.params.id);
    if (ok) await TrainingPlan.decrementEnrolled(req.params.id);
    res.json({ message: ok ? '已取消报名' : '未报名该计划' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// POST /api/training/:id/log — 提交训练打卡（需登录，必须先报名）
router.post('/:id/log', authenticate, async (req, res) => {
  try {
    const { week, day, duration_minutes, notes, completed_exercises } = req.body;
    if (!Number.isInteger(week) || !Number.isInteger(day)) {
      return res.status(400).json({ message: 'week/day 必须为整数' });
    }
    // 必须先报名才能打卡
    const enrolled = await TrainingEnrollment.findOne(req.user.id, req.params.id);
    if (!enrolled) return res.status(403).json({ message: '请先报名该训练计划' });

    await TrainingLog.log(req.user.id, req.params.id, week, day, {
      duration_minutes, notes, completed_exercises
    });
    res.json({ message: '打卡成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/:id/logs — 该计划我的打卡记录（需登录）
router.get('/:id/logs', authenticate, async (req, res) => {
  try {
    const list = await TrainingLog.findByUserPlan(req.user.id, req.params.id);
    res.json({ list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/by-ids?ids=1,2,3
router.get('/by-ids', async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) return res.json([]);
    const idList = ids.split(',').map(s => parseInt(s.trim())).filter(Boolean);
    if (!idList.length) return res.json([]);
    const placeholders = idList.map(() => '?').join(',');
    const [rows] = await pool.query(
      `SELECT id, title, goal, level, duration_weeks, days_per_week, summary, cover_image, enrolled_count, views, coach
       FROM training_plans WHERE id IN (${placeholders})`,
      idList
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/training/:id
router.get('/:id', async (req, res) => {
  try {
    const plan = await TrainingPlan.findByIdWithExercises(req.params.id);
    if (!plan) return res.status(404).json({ message: '训练计划不存在' });

    // 浏览量按 IP 去重
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    if (shouldIncrementView(ip, req.params.id)) {
      await TrainingPlan.incrementViews(req.params.id);
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
