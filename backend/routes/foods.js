const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// GET /api/foods/search?keyword=xxx
router.get('/search', async (req, res) => {
  try {
    const { keyword, limit = 20 } = req.query;
    if (!keyword) return res.json([]);
    const foods = await Food.search(keyword, parseInt(limit));
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/foods/categories
router.get('/categories', async (req, res) => {
  try {
    const cats = await Food.getCategories();
    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/foods?category=xxx
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let foods;
    if (category) {
      foods = await Food.findByCategory(category);
    } else {
      foods = await Food.findAll();
    }
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
