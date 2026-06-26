const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: '请输入有效的邮箱地址' });
    }

    // Check if already subscribed
    const [existing] = await pool.query(
      'SELECT id FROM newsletter_subscribers WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return res.json({ message: '已订阅', alreadySubscribed: true });
    }

    await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [email]
    );

    res.status(201).json({ message: '订阅成功' });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    res.status(500).json({ message: '订阅失败，请稍后重试' });
  }
});

// GET /api/newsletter/subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
