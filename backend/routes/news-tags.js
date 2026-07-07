const express = require('express');
const router = express.Router();
const NewsTag = require('../models/NewsTag');
const { authenticate, authorize } = require('../middleware/auth');

// 获取标签列表（公开，支持分页、搜索、分类筛选）
router.get('/', async (req, res) => {
  try {
    const { category, keyword, sort = 'heat', page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const options = {
      category,
      keyword,
      sort,
      page: pageNum,
      limit: limitNum
    };

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

// 获取热门标签（公开）
router.get('/hot/list', async (req, res) => {
  try {
    const { limit = 20, category } = req.query;
    const tags = await NewsTag.getHotTags(parseInt(limit), category);
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个标签（按 slug）
router.get('/slug/:slug', async (req, res) => {
  try {
    const tag = await NewsTag.findBySlug(req.params.slug);
    if (!tag) {
      return res.status(404).json({ message: '标签不存在' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个标签（按 ID）
router.get('/:id', async (req, res) => {
  try {
    const tag = await NewsTag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: '标签不存在' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 新建标签（管理员）
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, category, isRecommended, sortOrder } = req.body;

    if (!name) {
      return res.status(400).json({ message: '标签名称不能为空' });
    }

    // 检查是否已存在
    const existing = await NewsTag.findByName(name.trim());
    if (existing) {
      return res.status(400).json({ message: '标签已存在' });
    }

    const tag = await NewsTag.create({
      name: name.trim(),
      category,
      isRecommended,
      sortOrder
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新标签（管理员）
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const tag = await NewsTag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: '标签不存在' });
    }

    const updated = await NewsTag.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除标签（管理员）
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const tag = await NewsTag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: '标签不存在' });
    }

    await NewsTag.delete(req.params.id);
    res.json({ message: '标签删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 合并标签（管理员）
router.post('/:id/merge', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { targetTagId } = req.body;
    const fromId = parseInt(req.params.id);
    const toId = parseInt(targetTagId);

    if (!toId) {
      return res.status(400).json({ message: '目标标签 ID 无效' });
    }

    const result = await NewsTag.merge(fromId, toId);
    res.json({ message: '标签合并成功', ...result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || '合并失败' });
  }
});

// 刷新所有标签热度（管理员）
router.post('/refresh-heat', authenticate, authorize('admin'), async (req, res) => {
  try {
    await NewsTag.updateAllHeatScores();
    res.json({ message: '热度更新成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 初始化默认标签（首次部署用，管理员）
router.post('/seed-defaults', authenticate, authorize('admin'), async (req, res) => {
  try {
    const tags = await NewsTag.seedDefaultTags();
    res.json({ message: '默认标签初始化成功', count: tags.length, tags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
