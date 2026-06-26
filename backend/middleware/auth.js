const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 认证中间件
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: '未提供认证令牌' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }

    // v2: 将旧 coach/creator 角色映射为 user
    if (user.role === 'coach' || user.role === 'creator') {
      user.role = 'user';
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '认证令牌已过期' });
    }
    res.status(401).json({ message: '认证失败' });
  }
};

// 权限中间件（v2 - 仅支持 admin 和 user）
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // 将旧角色映射为新角色
    const userRole = (req.user.role === 'coach' || req.user.role === 'creator') ? 'user' : req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: '权限不足' });
    }
    next();
  };
};

// 可选认证中间件（用于获取当前用户信息，但不强制要求登录）
exports.optionalAuthenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    next();
  }
};