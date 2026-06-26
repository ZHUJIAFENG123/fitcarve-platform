const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const users = await User.findAll();
    const usersWithoutPassword = users.map(u => {
      const { password, ...user } = u;
      return user;
    });
    res.json(usersWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.id.toString() !== req.params.id.toString()) {
      return res.status(403).json({ message: '权限不足' });
    }

    const { username, email, bio, signature } = req.body;
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;
    if (bio) updates.bio = bio;
    if (signature) updates.signature = signature;

    const user = await User.update(req.params.id, updates);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/:id/avatar', authenticate, upload.single('avatar'), async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.id.toString() !== req.params.id.toString()) {
      return res.status(403).json({ message: '权限不足' });
    }

    if (!req.file) {
      return res.status(400).json({ message: '请上传文件' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    const user = await User.update(req.params.id, { avatar: avatarUrl });

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    await User.delete(req.params.id);
    res.json({ message: '用户删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/:id/role', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: '无效的角色' });
    }

    const user = await User.update(req.params.id, { role });
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/stats/overview', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { pool } = require('../db');

    const [totalResult] = await pool.query('SELECT COUNT(*) as count FROM users');
    const [adminResult] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
    const [coachResult] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'coach'");
    const [creatorResult] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'creator'");
    const [userResult] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'user'");

    res.json({
      totalUsers: totalResult[0].count,
      adminCount: adminResult[0].count,
      coachCount: coachResult[0].count,
      creatorCount: creatorResult[0].count,
      userCount: userResult[0].count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
