const express = require('express');
const router = express.Router();
const User = require('../models/User');
const News = require('../models/News');
const { pool } = require('../db');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/dashboard', authenticate, authorize('admin'), async (req, res) => {
  try {
    const [totalUsersResult] = await pool.query('SELECT COUNT(*) as count FROM users');
    const [activeUsersResult] = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE last_login > DATE_SUB(NOW(), INTERVAL 30 DAY)'
    );
    const [totalNewsResult] = await pool.query('SELECT COUNT(*) as count FROM news');
    const [totalCoursesResult] = await pool.query('SELECT COUNT(*) as count FROM courses');
    const [totalCommentsResult] = await pool.query('SELECT COUNT(*) as count FROM comments');
    const [unreadResult] = await pool.query('SELECT COUNT(*) as count FROM notifications WHERE is_read = 0');

    res.json({
      users: {
        total: totalUsersResult[0].count,
        active: activeUsersResult[0].count
      },
      content: {
        news: totalNewsResult[0].count,
        courses: totalCoursesResult[0].count,
        comments: totalCommentsResult[0].count
      },
      notifications: {
        unread: unreadResult[0].count
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/config', authenticate, authorize('admin'), async (req, res) => {
  try {
    const config = {
      siteName: '健身资讯网站',
      siteDescription: '专业的健身资讯与课程平台',
      adminEmail: 'admin@example.com',
      enableRegistration: true,
      enableComments: true,
      maxFileSize: 5 * 1024 * 1024
    };
    res.json(config);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/config', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { siteName, siteDescription, adminEmail, enableRegistration, enableComments, maxFileSize } = req.body;

    const updatedConfig = {
      siteName: siteName || '健身资讯网站',
      siteDescription: siteDescription || '专业的健身资讯与课程平台',
      adminEmail: adminEmail || 'admin@example.com',
      enableRegistration: enableRegistration !== undefined ? enableRegistration : true,
      enableComments: enableComments !== undefined ? enableComments : true,
      maxFileSize: maxFileSize || 5 * 1024 * 1024
    };

    res.json(updatedConfig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/logs', authenticate, authorize('admin'), async (req, res) => {
  try {
    const logs = [
      { id: 1, timestamp: new Date().toISOString(), level: 'info', message: '系统启动' },
      { id: 2, timestamp: new Date(Date.now() - 3600000).toISOString(), level: 'warning', message: '用户登录失败' }
    ];
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/notifications/broadcast', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { title, content, link } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: '缺少必要参数' });
    }

    const users = await User.findAll();
    const notifications = [];

    for (const user of users) {
      const notification = await Notification.create({
        userId: user.id,
        type: 'system',
        title,
        content,
        link
      });
      notifications.push(notification);
    }

    res.json({ message: `已发送 ${notifications.length} 条通知`, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/moderation', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;

    let results = [];
    let total = 0;

    if (type === 'news') {
      results = await News.findAll();
      total = results.length;
    } else if (type === 'courses') {
      const [results] = await pool.query('SELECT * FROM courses');
      total = results.length;
    } else if (type === 'comments') {
      results = await Comment.findAll();
      total = results.length;
    }

    const start = (page - 1) * limit;
    const paginatedResults = results.slice(start, start + parseInt(limit));

    res.json({
      items: paginatedResults,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/moderation/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { type, status, reason } = req.body;

    if (!type || !status) {
      return res.status(400).json({ message: '缺少必要参数' });
    }

    let result;
    if (type === 'news') {
      result = await News.findById(id);
    } else if (type === 'courses') {
      const [resultRows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
      result = resultRows[0];
    } else if (type === 'comments') {
      result = await Comment.findById(id);
    }

    if (!result) {
      return res.status(404).json({ message: '内容不存在' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
