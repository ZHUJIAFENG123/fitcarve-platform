const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
const { testConnection } = require('./db');

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000,
  max: process.env.RATE_LIMIT_MAX || 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/exercise-gifs', express.static(path.join(__dirname, '..', 'public', 'exercise-gifs')));
app.use('/news-images', express.static(path.join(__dirname, '..', 'public', 'news-images')));

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const newsCategoryRoutes = require('./routes/news-categories');
const newsTagRoutes = require('./routes/news-tags');
const commentRoutes = require('./routes/comments');
const interactionRoutes = require('./routes/interactions');
const notificationRoutes = require('./routes/notifications');
const searchRoutes = require('./routes/search');
const adminRoutes = require('./routes/admin');
const versionsRoutes = require('./routes/versions');
const uploadRoutes = require('./routes/upload');
const newsletterRoutes = require('./routes/newsletter');
const trainingRoutes = require('./routes/training');
const dietRoutes = require('./routes/diet');
const foodsRoutes = require('./routes/foods');
const exercisesRoutes = require('./routes/exercises');
const dietLogRoutes = require('./routes/dietLog');
const nutritionRoutes = require('./routes/nutrition');
const aiRoutes = require('./routes/ai');
const waterRoutes = require('./routes/water');
const learningRoutes = require('./routes/learning');
const knowledgeGraphRoutes = require('./routes/knowledge-graph');
const coachRoutes = require('./routes/coach');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/news-categories', newsCategoryRoutes);
app.use('/api/news-tags', newsTagRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/versions', versionsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/foods', foodsRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/diet-log', dietLogRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/knowledge-graph', knowledgeGraphRoutes);
app.use('/api/coaches', coachRoutes);

app.get('/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: dbConnected ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'connected' : 'disconnected'
  });
});

const fs = require('fs');

// ── 生产环境：可选托管前端构建产物 ──
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distPath)) {
    console.log('📦 托管前端构建产物 dist/');
    app.use(express.static(distPath));
    // SPA 回退：非 /api 路径返回 index.html
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) return res.status(404).json({ message: '路由不存在' });
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.log('🌐 纯 API 模式（前端由 Vercel 等托管）');
    app.use((req, res) => {
      if (req.path.startsWith('/api')) return res.status(404).json({ message: '路由不存在' });
      res.status(200).json({ message: 'FitCarve API is running' });
    });
  }
} else {
  app.use((req, res) => {
    res.status(404).json({ message: '路由不存在' });
  });
}

// 健康检查端点（用于部署平台监控）
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  const dbConnected = await testConnection();
  if (dbConnected) {
    // 自动创建数据库表（如果不存在）
    const autoInit = require('./auto-init');
    await autoInit();
  } else {
    console.error('无法连接到数据库，服务器将在数据库不可用的情况下启动');
  }

  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}

startServer();

// 临时：捕获未处理的异常和 Promise 拒绝，定位崩溃原因
process.on('uncaughtException', (err) => {
  console.error('=== 未捕获异常 ===');
  console.error(err);
});
process.on('unhandledRejection', (reason) => {
  console.error('=== 未处理的 Promise 拒绝 ===');
  console.error(reason);
});

module.exports = app;
