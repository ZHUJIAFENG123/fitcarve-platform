const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (!user) {
      const userByEmail = await User.findByEmail(username);
      if (!userByEmail) {
        return res.status(400).json({ message: '用户名或密码错误' });
      }
    }

    const validUser = user || userByEmail;

    const isMatch = await User.comparePassword(validUser, password);
    if (!isMatch) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    await User.updateLastLogin(validUser.id);

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    const refreshToken = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    });

    res.json({
      token,
      refreshToken,
      user: {
        id: validUser.id,
        username: validUser.username,
        email: validUser.email,
        role: validUser.role,
        avatar: validUser.avatar_url,
        isVerified: validUser.is_verified
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: '邮箱已存在' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    await User.create({
      username,
      email,
      password,
      role: role || 'user',
      verificationToken
    });

    sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: '注册成功，请检查邮箱进行验证' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/logout', authenticate, async (req, res) => {
  try {
    res.json({ message: '登出成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: '未提供刷新令牌' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }

    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: '刷新令牌无效' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: '邮箱不存在' });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000);

    await User.setResetPasswordToken(user.id, resetPasswordToken, resetPasswordExpires);

    sendResetPasswordEmail(email, resetPasswordToken);

    res.json({ message: '重置密码邮件已发送' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const { pool } = require('../db');
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > NOW()',
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: '令牌无效或已过期' });
    }

    const user = rows[0];
    await User.update(user.id, { password: newPassword });

    await User.setResetPasswordToken(user.id, null, null);

    res.json({ message: '密码重置成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/send-verification', authenticate, async (req, res) => {
  try {
    const user = req.user;

    if (user.is_verified) {
      return res.status(400).json({ message: '邮箱已验证' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    await User.setVerificationToken(user.id, verificationToken);

    sendVerificationEmail(user.email, verificationToken);

    res.json({ message: '验证邮件已发送' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    const { pool } = require('../db');
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE verification_token = ?',
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: '令牌无效' });
    }

    const user = rows[0];
    await User.verify(user.id);

    res.json({ message: '邮箱验证成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar_url,
      bio: user.bio,
      signature: user.signature,
      isVerified: user.is_verified,
      lastLogin: user.last_login,
      createdAt: user.created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

function sendVerificationEmail(email, token) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('邮件服务未配置，跳过发送验证邮件');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '邮箱验证',
    html: `<p>请点击以下链接验证您的邮箱：</p><a href="http://localhost:3000/api/auth/verify-email?token=${token}">验证邮箱</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('发送验证邮件失败:', error);
    }
  });
}

function sendResetPasswordEmail(email, token) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('邮件服务未配置，跳过发送重置密码邮件');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '重置密码',
    html: `<p>请点击以下链接重置您的密码：</p><a href="http://localhost:3000/reset-password?token=${token}">重置密码</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('发送重置密码邮件失败:', error);
    }
  });
}

module.exports = router;
