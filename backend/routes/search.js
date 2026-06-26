const express = require('express');
const router = express.Router();
const News = require('../models/News');
const Course = require('../models/Course');

router.get('/', async (req, res) => {
  try {
    const { keyword, type, page = 1, limit = 10 } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: '请输入搜索关键词' });
    }

    const results = {};

    if (!type || type === 'news') {
      const newsList = await News.findAll();
      const filteredNews = newsList.filter(n =>
        n.title.includes(keyword) ||
        n.content.includes(keyword) ||
        n.category.includes(keyword) ||
        n.author.includes(keyword)
      );

      results.news = {
        items: filteredNews,
        total: filteredNews.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(filteredNews.length / limit)
      };
    }

    if (!type || type === 'course') {
      const courses = await Course.findAll();
      const filteredCourses = courses.filter(c =>
        c.title.includes(keyword) ||
        c.description.includes(keyword) ||
        c.coach.includes(keyword) ||
        c.category.includes(keyword)
      );

      results.courses = {
        items: filteredCourses,
        total: filteredCourses.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(filteredCourses.length / limit)
      };
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/advanced', async (req, res) => {
  try {
    const { keyword, category, level, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.body;

    let courses = await Course.findAll();

    if (keyword) {
      courses = courses.filter(c =>
        c.title.includes(keyword) ||
        c.description.includes(keyword) ||
        c.coach.includes(keyword)
      );
    }

    if (category) {
      courses = courses.filter(c => c.category === category);
    }

    if (level) {
      courses = courses.filter(c => c.level === level);
    }

    if (sortBy) {
      switch (sortBy) {
        case 'views':
          courses.sort((a, b) => b.views - a.views);
          break;
        case 'rating':
          courses.sort((a, b) => b.rating - a.rating);
          break;
        case 'price_asc':
          courses.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'price_desc':
          courses.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        default:
          courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
    } else {
      courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    const start = (page - 1) * limit;
    const paginatedCourses = courses.slice(start, start + parseInt(limit));

    res.json({
      courses: paginatedCourses,
      pagination: {
        total: courses.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(courses.length / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
