const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// 为没有图片的动作自动生成 image_url（映射到 public/images/ 下的现有图片）
function ensureImageUrl(ex) {
  if (ex) {
    // 优先使用 gif_url（开源数据），其次 image_url
    if (!ex.image_url && !ex.gif_url) {
      const imgNum = ((ex.id - 1) % 44) + 1;
      ex.image_url = `/images/${String(imgNum).padStart(2, '0')}.jpg`;
    }
  }
  return ex;
}

// GET /api/exercises
router.get('/', async (req, res) => {
  try {
    const { muscleGroup, category, difficulty, equipment, bodyPart, limit } = req.query;
    const options = {};
    if (muscleGroup) options.muscleGroup = muscleGroup;
    if (category) options.category = category;
    if (difficulty) options.difficulty = difficulty;
    if (equipment) options.equipment = equipment;
    if (bodyPart) options.bodyPart = bodyPart;
    if (limit) options.limit = parseInt(limit);
    let exercises = await Exercise.findAll(options);
    exercises = exercises.map(ensureImageUrl);
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/exercises/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Exercise.getStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/exercises/muscle-groups
router.get('/muscle-groups', async (req, res) => {
  try {
    const groups = await Exercise.getMuscleGroups();
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/exercises/search?keyword=xxx
router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) return res.json([]);
    let exercises = await Exercise.search(keyword, 100);
    exercises = exercises.map(ensureImageUrl);
    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/exercises/by-ids?ids=1,2,3
router.get('/by-ids', async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) return res.json([]);
    const idList = ids.split(',').map(s => parseInt(s.trim())).filter(Boolean);
    if (!idList.length) return res.json([]);
    const { pool } = require('../db');
    const placeholders = idList.map(() => '?').join(',');
    const [rows] = await pool.query(
      `SELECT * FROM exercises WHERE id IN (${placeholders})`,
      idList
    );
    res.json(rows.map(ensureImageUrl));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/exercises/:id
router.get('/:id', async (req, res) => {
  try {
    const ex = await Exercise.findById(req.params.id);
    if (!ex) return res.status(404).json({ message: '动作不存在' });
    res.json(ensureImageUrl(ex));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
