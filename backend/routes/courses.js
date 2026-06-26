const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Version = require('../models/Version');
const { authenticate, authorize, optionalAuthenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', optionalAuthenticate, async (req, res) => {
  try {
    const { category, level, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (level) query.level = level;

    const courses = await Course.findAll(query);

    res.json({
      courses,
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

router.get('/:id', optionalAuthenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: '课程不存在' });
    }

    await Course.incrementViews(req.params.id);

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/', authenticate, authorize('admin', 'user'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: '请上传课程图片' });
    }

    const { title, description, coach, level, price, category, syllabus, targetAudience, highlights, outcomes } = req.body;

    const course = await Course.create({
      title,
      description,
      image: `/uploads/${req.file.filename}`,
      coach,
      level,
      price,
      category,
      syllabus: syllabus ? JSON.parse(syllabus) : [],
      targetAudience: targetAudience ? JSON.parse(targetAudience) : [],
      highlights: highlights ? JSON.parse(highlights) : [],
      outcomes: outcomes ? JSON.parse(outcomes) : []
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/:id', authenticate, authorize('admin', 'user'), upload.single('image'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: '课程不存在' });
    }

    const versionNumber = await Version.getNextVersion('course', parseInt(req.params.id));
    await Version.create({
      targetType: 'course',
      targetId: parseInt(req.params.id),
      version: versionNumber,
      content: course,
      author: req.user.username,
      reason: req.body.versionReason || '课程内容更新'
    });

    const { title, description, coach, level, price, category, syllabus, targetAudience, highlights, outcomes } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (coach) updates.coach = coach;
    if (level) updates.level = level;
    if (price) updates.price = price;
    if (category) updates.category = category;
    if (syllabus) updates.syllabus = JSON.parse(syllabus);
    if (targetAudience) updates.targetAudience = JSON.parse(targetAudience);
    if (highlights) updates.highlights = JSON.parse(highlights);
    if (outcomes) updates.outcomes = JSON.parse(outcomes);
    if (req.file) updates.image = `/uploads/${req.file.filename}`;

    const updatedCourse = await Course.update(req.params.id, updates);
    res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: '课程不存在' });
    }
    await Course.delete(req.params.id);
    res.json({ message: '课程删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query;

    const courses = await Course.findAll();
    const filteredCourses = courses.filter(c =>
      c.title.includes(keyword) ||
      c.description.includes(keyword) ||
      c.coach.includes(keyword) ||
      c.category.includes(keyword)
    );

    res.json({
      courses: filteredCourses,
      pagination: {
        total: filteredCourses.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(filteredCourses.length / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/stats/popular', async (req, res) => {
  try {
    const courses = await Course.findAll();
    courses.sort((a, b) => b.views - a.views);
    res.json(courses.slice(0, 10));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/stats/overview', authenticate, authorize('admin', 'user'), async (req, res) => {
  try {
    const { pool } = require('../db');

    const [totalResult] = await pool.query('SELECT COUNT(*) as count FROM courses');
    const [categoryResult] = await pool.query('SELECT category, COUNT(*) as count FROM courses GROUP BY category');
    const [levelResult] = await pool.query('SELECT level, COUNT(*) as count FROM courses GROUP BY level');
    const [viewsResult] = await pool.query('SELECT SUM(views) as total FROM courses');

    res.json({
      totalCourses: totalResult[0].count,
      categoryStats: categoryResult,
      levelStats: levelResult,
      totalViews: viewsResult[0]?.total || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
