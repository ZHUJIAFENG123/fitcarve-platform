const express = require('express');
const router = express.Router();
const NewsCategory = require('../models/NewsCategory');
const { authenticate, authorize } = require('../middleware/auth');

// 获取分类列表（公开）
router.get('/', async (req, res) => {
  try {
    const { includeInactive } = req.query;
    const options = {};
    if (includeInactive === 'true' && req.user?.role === 'admin') {
      options.includeInactive = true;
    }
    const categories = await NewsCategory.findAll(options);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 获取单个分类（按 key）
router.get('/:key', async (req, res) => {
  try {
    const category = await NewsCategory.findByKey(req.params.key);
    if (!category) {
      return res.status(404).json({ message: '分类不存在' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 新建分类（管理员）
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { keyName, name, description, icon, color, sortOrder } = req.body;

    if (!keyName || !name) {
      return res.status(400).json({ message: '分类 key 和名称不能为空' });
    }

    // 检查 key 是否已存在
    const existing = await NewsCategory.findByKey(keyName);
    if (existing) {
      return res.status(400).json({ message: '分类 key 已存在' });
    }

    const category = await NewsCategory.create({
      keyName,
      name,
      description,
      icon,
      color,
      sortOrder
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 更新分类（管理员）
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const category = await NewsCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: '分类不存在' });
    }

    const updated = await NewsCategory.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 删除分类（管理员）
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const category = await NewsCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: '分类不存在' });
    }

    await NewsCategory.delete(req.params.id);
    res.json({ message: '分类删除成功' });
  } catch (error) {
    console.error(error);
    if (error.message.includes('还有文章')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 批量调整排序（管理员）
router.put('/sort/batch', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return res.status(400).json({ message: '排序数据无效' });
    }

    await NewsCategory.reorder(orderedIds);
    res.json({ message: '排序更新成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 刷新所有分类文章计数（管理员）
router.post('/refresh-counts', authenticate, authorize('admin'), async (req, res) => {
  try {
    await NewsCategory.updateAllArticleCounts();
    res.json({ message: '计数更新成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// 初始化默认分类（首次部署用，管理员）
router.post('/seed-defaults', authenticate, authorize('admin'), async (req, res) => {
  try {
    const categories = await NewsCategory.seedDefaultCategories();
    await NewsCategory.updateAllArticleCounts();
    res.json({ message: '默认分类初始化成功', categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
