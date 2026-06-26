const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Version = require('../models/Version');

router.get('/:targetType/:targetId', authenticate, async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    const versions = await Version.findAll({
      targetType,
      targetId: parseInt(targetId)
    });
    res.json(versions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '获取版本历史失败' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const version = await Version.findById(req.params.id);
    if (!version) {
      return res.status(404).json({ message: '版本不存在' });
    }
    res.json(version);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '获取版本失败' });
  }
});

router.post('/:id/rollback', authenticate, async (req, res) => {
  try {
    const version = await Version.findById(req.params.id);
    if (!version) {
      return res.status(404).json({ message: '版本不存在' });
    }

    res.json({ message: '回滚成功', version });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '回滚失败' });
  }
});

router.delete('/:id', authenticate, authorize(['admin', 'user']), async (req, res) => {
  try {
    const version = await Version.findById(req.params.id);
    if (!version) {
      return res.status(404).json({ message: '版本不存在' });
    }
    await Version.delete(req.params.id);
    res.json({ message: '版本删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '删除版本失败' });
  }
});

module.exports = router;
