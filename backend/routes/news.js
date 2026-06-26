const express = require('express');
const router = express.Router();
const News = require('../models/News');
const Version = require('../models/Version');
const { authenticate, authorize, optionalAuthenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

// 获取资讯列表（带分页）
router.get('/', optionalAuthenticate, async (req, res) => {
  try {
    const { category, page = 1, limit = 9, keyword, tag } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    // 构建查询条件
    const options = {
      limit: limitNum,
      offset
    };

    if (category) options.category = category;

    // 获取总数和列表
    const totalResult = await News.count(options);
    const newsList = await News.findAll(options);

    // 关键词搜索过滤
    let filteredList = newsList;
    if (keyword) {
      const kw = keyword.toLowerCase();
      filteredList = newsList.filter(n =>
        n.title.toLowerCase().includes(kw) ||
        (n.summary && n.summary.toLowerCase().includes(kw)) ||
        (n.tags && n.tags.toLowerCase().includes(kw))
      );
    }

    // 标签过滤
    if (tag) {
      filteredList = filteredList.filter(n =>
        n.tags && n.tags.split(',').includes(tag)
      );
    }

    res.json({
      news: filteredList,
      pagination: {
        total: totalResult,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(totalResult / limitNum)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 搜索资讯 - 必须放在 /:id 前面
router.get('/search', async (req, res) => {
  try {
    const { keyword, page = 1, limit = 9 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    if (!keyword) {
      return res.json({ news: [], pagination: { total: 0, page: pageNum, limit: limitNum, pages: 0 } });
    }

    const result = await News.search(keyword, limitNum, offset);
    res.json({
      news: result.list,
      pagination: {
        total: result.total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(result.total / limitNum)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 热门资讯 - 必须放在 /:id 前面
router.get('/popular', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const newsList = await News.getPopular(parseInt(limit));
    res.json(newsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 统计概览 - 必须放在 /:id 前面
router.get('/stats/overview', authenticate, authorize('admin', 'user'), async (req, res) => {
  try {
    const stats = await News.getStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取资讯详情
router.get('/:id', optionalAuthenticate, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: '资讯不存在' });
    }

    // 增加浏览量
    await News.incrementViews(req.params.id);

    // 获取相关资讯
    const relatedNews = await News.getRelated(req.params.id, news.category);

    res.json({ ...news, relatedNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/', authenticate, authorize('admin', 'user'), upload.single('image'), async (req, res) => {
  try {
    const { title, content, summary, tags, category, author } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '');

    const news = await News.create({
      title,
      content,
      summary: summary || '',
      tags: Array.isArray(tags) ? tags.join(',') : (tags || ''),
      image: imageUrl,
      category,
      author: author || req.user.username,
      status: 'pending'
    });

    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/:id', authenticate, authorize('admin', 'user'), upload.single('image'), async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: '资讯不存在' });
    }

    const versionNumber = await Version.getNextVersion('news', parseInt(req.params.id));
    await Version.create({
      targetType: 'news',
      targetId: parseInt(req.params.id),
      version: versionNumber,
      content: news,
      author: req.user.username,
      reason: req.body.versionReason || '资讯内容更新'
    });

    const { title, content, summary, tags, category, author, status } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (content) updates.content = content;
    if (summary !== undefined) updates.summary = summary;
    if (tags !== undefined) updates.tags = Array.isArray(tags) ? tags.join(',') : tags;
    if (category) updates.category = category;
    if (author) updates.author = author;
    if (status) updates.status = status;
    if (req.file) updates.image = `/uploads/${req.file.filename}`;

    const updatedNews = await News.update(req.params.id, updates);
    res.json(updatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: '资讯不存在' });
    }
    await News.delete(req.params.id);
    res.json({ message: '资讯删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});



module.exports = router;
