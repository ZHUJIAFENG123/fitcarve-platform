const express = require('express');
const router = express.Router();
const WaterLog = require('../models/WaterLog');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// GET /api/water?date=2025-06-25
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const logDate = date || new Date().toISOString().slice(0, 10);
    const logs = await WaterLog.findByDate(req.user.userId, logDate);
    const totalMl = await WaterLog.getDailyTotal(req.user.userId, logDate);
    res.json({ logs, totalMl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/water/week?start=2025-06-23&end=2025-06-29
router.get('/week', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ message: '请指定日期范围' });
    const summary = await WaterLog.getWeekSummary(req.user.userId, start, end);
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// POST /api/water
router.post('/', async (req, res) => {
  try {
    const { logDate, amountMl } = req.body;
    if (!logDate) return res.status(400).json({ message: '缺少日期' });
    const log = await WaterLog.create({
      userId: req.user.userId,
      logDate,
      amountMl: amountMl || 250
    });
    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// DELETE /api/water/:id
router.delete('/:id', async (req, res) => {
  try {
    const ok = await WaterLog.delete(req.params.id, req.user.userId);
    if (!ok) return res.status(404).json({ message: '记录不存在' });
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
