const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, async (req, res) => {
  try {
    const { type, isRead, page = 1, limit = 20 } = req.query;

    const notifications = await Notification.findAll({
      userId: req.user.id,
      type,
      isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined
    });

    res.json({
      notifications,
      pagination: {
        total: notifications.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(notifications.length / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/:id/read', authenticate, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: '通知不存在' });
    }

    if (notification.user_id !== req.user.id) {
      return res.status(403).json({ message: '权限不足' });
    }

    const updated = await Notification.markAsRead(req.params.id);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/read-all', authenticate, async (req, res) => {
  try {
    await Notification.markAllAsRead(req.user.id);
    res.json({ message: '所有通知已标记为已读' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: '通知不存在' });
    }

    if (notification.user_id !== req.user.id) {
      return res.status(403).json({ message: '权限不足' });
    }

    await Notification.delete(req.params.id);
    res.json({ message: '通知删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.delete('/clear-all', authenticate, async (req, res) => {
  try {
    const { pool } = require('../db');
    await pool.query('DELETE FROM notifications WHERE user_id = ?', [req.user.id]);
    res.json({ message: '所有通知已清空' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/unread-count', authenticate, async (req, res) => {
  try {
    const count = await Notification.getUnreadCount(req.user.id);
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/system', authenticate, async (req, res) => {
  try {
    const { title, content, userId, link } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: '缺少必要参数' });
    }

    const notification = await Notification.create({
      userId,
      type: 'system',
      title,
      content,
      link
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
