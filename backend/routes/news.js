const express = require('express');
const router = express.Router();
const News = require('../models/News');
const NewsCategory = require('../models/NewsCategory');
const NewsTag = require('../models/NewsTag');
const Version = require('../models/Version');
const { authenticate, authorize, optionalAuthenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ============================================
// 公开接口
// ============================================

// 获取分类列表
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await NewsCategory.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取标签列表（支持分页、搜索、分类筛选）
router.get('/tags/list', async (req, res) => {
  try {
    const { category, keyword, sort = 'heat', page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const options = { category, keyword, sort, page: pageNum, limit: limitNum };
    const tags = await NewsTag.findAll(options);
    const total = await NewsTag.count({ category, keyword });

    res.json({
      tags,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取热门标签
router.get('/tags/hot', async (req, res) => {
  try {
    const { limit = 20, category } = req.query;
    const tags = await NewsTag.getHotTags(parseInt(limit), category);
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 精选推荐
router.get('/featured/list', async (req, res) => {
  try {
    const { limit = 10, category } = req.query;
    const newsList = await News.getFeatured(parseInt(limit), category);
    res.json(newsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取资讯列表（带分页）
router.get('/', optionalAuthenticate, async (req, res) => {
  try {
    const { category, page = 1, limit = 9, keyword, tag, tags, tagSlug, sort, qualityMin, isFeatured } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    // 构建查询条件
    const options = {
      limit: limitNum,
      offset
    };

    // 非 admin 用户只展示已通过审核的文章
    if (!req.user || req.user.role !== 'admin') {
      options.status = 'approved';
    }

    if (category) options.category = category;
    if (sort) options.sort = sort;
    if (keyword) options.keyword = keyword;
    if (tagSlug) options.tagSlug = tagSlug;
    else if (tags) options.tags = tags.split(',').map(t => t.trim()).filter(Boolean);
    else if (tag) options.tag = tag;
    if (qualityMin !== undefined && qualityMin !== '') options.qualityMin = parseFloat(qualityMin);
    if (isFeatured !== undefined && isFeatured !== '') options.isFeatured = isFeatured === 'true' || isFeatured === '1';

    // 获取总数和列表
    const totalResult = await News.count(options);
    const newsList = await News.findAll(options);

    res.json({
      news: newsList,
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
router.get('/search', optionalAuthenticate, async (req, res) => {
  try {
    const { keyword, page = 1, limit = 9, sort } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    if (!keyword) {
      return res.json({ news: [], pagination: { total: 0, page: pageNum, limit: limitNum, pages: 0 } });
    }

    // 非 admin 用户只搜索已审核通过的文章
    const status = (!req.user || req.user.role !== 'admin') ? 'approved' : null;
    const result = await News.search(keyword, limitNum, offset, status, sort);
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
router.get('/popular/list', async (req, res) => {
  try {
    const { limit = 10, category } = req.query;
    const newsList = await News.getPopular(parseInt(limit), category);
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

// 质量分统计 - 必须放在 /:id 前面
router.get('/stats/quality', authenticate, authorize('admin'), async (req, res) => {
  try {
    const stats = await News.getQualityStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 举报统计 - 必须放在 /:id 前面
router.get('/stats/reports', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 20 } = req.query;
    const result = await News.getReports({
      status,
      page: parseInt(page),
      limit: parseInt(limit)
    });
    res.json(result);
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

    // 获取相关资讯（基于标签相似度）
    const relatedNews = await News.getRelated(req.params.id, news.category);

    // 获取真实点赞数
    const { pool } = require('../db');
    const [likeRows] = await pool.query(
      'SELECT COUNT(*) as count FROM interactions WHERE target_type = ? AND target_id = ? AND type = ?',
      ['news', parseInt(req.params.id), 'like']
    );
    const likeCount = likeRows[0]?.count || 0;

    res.json({ ...news, relatedNews, likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 提交举报
router.post('/:id/report', authenticate, async (req, res) => {
  try {
    const { reasonType, description } = req.body;

    if (!reasonType) {
      return res.status(400).json({ message: '请选择举报类型' });
    }

    const validTypes = ['misinformation', 'plagiarism', 'spam', 'inappropriate', 'other'];
    if (!validTypes.includes(reasonType)) {
      return res.status(400).json({ message: '举报类型无效' });
    }

    const result = await News.report(
      parseInt(req.params.id),
      req.user.id,
      reasonType,
      description || ''
    );

    res.status(201).json({ message: '举报提交成功，我们会尽快处理', ...result });
  } catch (error) {
    console.error(error);
    if (error.message.includes('已举报')) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes('不存在')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// ============================================
// 创作 & 管理接口
// ============================================

// 创建资讯
router.post('/', authenticate, authorize('admin', 'user'), upload.single('image'), async (req, res) => {
  try {
    const { title, content, summary, tags, category, author, relatedExerciseIds, relatedPlanIds, evidenceTags, videoUrl, isOriginal, sourceUrl, tagNames } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '');

    // 解析标签名称数组（用于创建关联表）
    let tagNamesArray = [];
    if (tagNames) {
      tagNamesArray = Array.isArray(tagNames) ? tagNames : tagNames.split(',').map(t => t.trim());
    } else if (tags) {
      tagNamesArray = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    }

    const news = await News.create({
      title,
      content,
      summary: summary || '',
      tags: Array.isArray(tags) ? tags.join(',') : (tags || ''),
      image: imageUrl,
      category,
      author: author || req.user.username,
      status: 'pending',
      relatedExerciseIds: relatedExerciseIds || '',
      relatedPlanIds: relatedPlanIds || '',
      evidenceTags: evidenceTags || '',
      videoUrl: videoUrl || '',
      isOriginal: isOriginal !== 'false' && isOriginal !== false,
      sourceUrl: sourceUrl || '',
      tagNames: tagNamesArray
    });

    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新资讯
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

    const { title, content, summary, tags, category, author, status, relatedExerciseIds, relatedPlanIds, evidenceTags, videoUrl, isOriginal, sourceUrl, tagNames, tagIds } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (content) updates.content = content;
    if (summary !== undefined) updates.summary = summary;
    if (tags !== undefined) updates.tags = Array.isArray(tags) ? tags.join(',') : tags;
    if (category) updates.category = category;
    if (author) updates.author = author;
    if (status && (req.user.role === 'admin' || news.author === req.user.username)) updates.status = status;
    if (relatedExerciseIds !== undefined) updates.relatedExerciseIds = relatedExerciseIds;
    if (relatedPlanIds !== undefined) updates.relatedPlanIds = relatedPlanIds;
    if (evidenceTags !== undefined) updates.evidenceTags = evidenceTags;
    if (videoUrl !== undefined) updates.videoUrl = videoUrl;
    if (isOriginal !== undefined) updates.isOriginal = isOriginal;
    if (sourceUrl !== undefined) updates.sourceUrl = sourceUrl;
    if (req.file) updates.image = `/uploads/${req.file.filename}`;

    // 处理标签更新
    if (tagIds !== undefined) {
      updates.tagIds = Array.isArray(tagIds) ? tagIds : (tagIds ? tagIds.split(',').map(Number) : []);
    } else if (tagNames !== undefined) {
      updates.tagNames = Array.isArray(tagNames) ? tagNames : (tagNames ? tagNames.split(',').map(t => t.trim()) : []);
    }

    const updatedNews = await News.update(req.params.id, updates);
    res.json(updatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除资讯
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

// 更新质量分（管理员）
router.put('/:id/quality', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { score } = req.body;
    if (score === undefined || isNaN(score)) {
      return res.status(400).json({ message: '质量分无效' });
    }
    if (score < 0 || score > 100) {
      return res.status(400).json({ message: '质量分应在 0-100 之间' });
    }

    const news = await News.updateQualityScore(req.params.id, parseFloat(score));
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 切换精选状态（管理员）
router.put('/:id/featured', authenticate, authorize('admin'), async (req, res) => {
  try {
    const news = await News.toggleFeatured(req.params.id);
    if (!news) {
      return res.status(404).json({ message: '资讯不存在' });
    }
    res.json({ message: '精选状态更新成功', isFeatured: !!news.is_featured, news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 处理举报（管理员）
router.put('/reports/:reportId/handle', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { action } = req.body;
    if (!['resolved', 'dismissed'].includes(action)) {
      return res.status(400).json({ message: '操作类型无效' });
    }

    const result = await News.handleReport(
      parseInt(req.params.reportId),
      req.user.username,
      action
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
