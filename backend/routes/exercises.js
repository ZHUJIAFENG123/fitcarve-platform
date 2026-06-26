const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// GET /api/exercises
router.get('/', async (req, res) => {
  try {
    const { muscleGroup, category } = req.query;
    const options = {};
    if (muscleGroup) options.muscleGroup = muscleGroup;
    if (category) options.category = category;
    const exercises = await Exercise.findAll(options);
    res.json(exercises);
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
    const exercises = await Exercise.search(keyword);
    res.json(exercises);
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
    res.json(ex);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
