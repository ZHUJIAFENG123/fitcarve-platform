const express = require('express');
const router = express.Router();
const Interaction = require('../models/Interaction');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, async (req, res) => {
  try {
    const { targetType, targetId, type } = req.body;

    if (!targetType || !targetId || !type) {
      return res.status(400).json({ message: '缺少必要参数' });
    }

    if (!['like', 'favorite', 'share'].includes(type)) {
      return res.status(400).json({ message: '无效的互动类型' });
    }

    if (!['news', 'course', 'comment', 'training_plan'].includes(targetType)) {
      return res.status(400).json({ message: '无效的目标类型' });
    }

    const result = await Interaction.toggle(
      req.user.id,
      targetType,
      parseInt(targetId),
      type
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/user', authenticate, async (req, res) => {
  try {
    const { type, targetType, page = 1, limit = 10 } = req.query;

    let interactions = await Interaction.findAll({
      userId: req.user.id,
      type,
      targetType
    });

    // 如果是 training_plan 类型，JOIN 关联训练计划详情供前端展示
    if (targetType === 'training_plan' && interactions.length > 0) {
      const { pool } = require('../db');
      const ids = interactions.map(i => i.target_id);
      const placeholders = ids.map(() => '?').join(',');
      const [plans] = await pool.query(
        `SELECT id, title, description, cover_image, goal, level, duration_weeks, days_per_week, coach
         FROM training_plans WHERE id IN (${placeholders})`,
        ids
      );
      const planMap = new Map(plans.map(p => [p.id, p]));
      interactions = interactions.map(i => ({ ...i, target: planMap.get(i.target_id) || null }));
    }

    res.json({
      interactions,
      pagination: {
        total: interactions.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(interactions.length / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/check', authenticate, async (req, res) => {
  try {
    const { targetType, targetId, type } = req.query;

    if (!targetType || !targetId || !type) {
      return res.status(400).json({ message: '缺少必要参数' });
    }

    const interaction = await Interaction.findOne(
      req.user.id,
      targetType,
      parseInt(targetId),
      type
    );

    res.json({ exists: !!interaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/stats/:targetType/:targetId', async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    const { pool } = require('../db');

    const [stats] = await pool.query(
      'SELECT type, COUNT(*) as count FROM interactions WHERE target_type = ? AND target_id = ? GROUP BY type',
      [targetType, parseInt(targetId)]
    );

    const result = { like: 0, favorite: 0, share: 0 };
    stats.forEach(stat => {
      result[stat.type] = stat.count;
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { pool } = require('../db');
    const [rows] = await pool.query('SELECT * FROM interactions WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: '互动不存在' });
    }

    const interaction = rows[0];

    if (interaction.user_id !== req.user.id) {
      return res.status(403).json({ message: '权限不足' });
    }

    await Interaction.delete(interaction.user_id, interaction.target_type, interaction.target_id, interaction.type);
    res.json({ message: '互动删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
