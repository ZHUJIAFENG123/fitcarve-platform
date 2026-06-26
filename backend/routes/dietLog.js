const express = require('express');
const router = express.Router();
const DietLog = require('../models/DietLog');
const { authenticate } = require('../middleware/auth');

// All routes require login
router.use(authenticate);

// GET /api/diet-log?date=2025-06-25
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const logDate = date || new Date().toISOString().slice(0, 10);
    const logs = await DietLog.findByUserDate(req.user.userId, logDate);
    const summary = await DietLog.getDailySummary(req.user.userId, logDate);
    res.json({ logs, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/diet-log/week?start=2025-06-23&end=2025-06-29
router.get('/week', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ message: '请指定起止日期' });
    const summary = await DietLog.getWeekSummary(req.user.userId, start, end);
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// POST /api/diet-log
router.post('/', async (req, res) => {
  try {
    const { logDate, mealType, foodId, foodName, amountG, calories, proteinG, carbsG, fatG } = req.body;
    if (!logDate || !mealType || !foodName || !amountG) {
      return res.status(400).json({ message: '缺少必要字段' });
    }
    const log = await DietLog.create({
      userId: req.user.userId,
      logDate,
      mealType,
      foodId: foodId || null,
      foodName,
      amountG,
      calories: calories || 0,
      proteinG: proteinG || 0,
      carbsG: carbsG || 0,
      fatG: fatG || 0
    });
    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// DELETE /api/diet-log/:id
router.delete('/:id', async (req, res) => {
  try {
    const ok = await DietLog.delete(req.params.id, req.user.userId);
    if (!ok) return res.status(404).json({ message: '记录不存在' });
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
