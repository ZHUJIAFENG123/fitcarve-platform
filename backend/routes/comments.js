const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const News = require('../models/News');
const Course = require('../models/Course');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

router.get('/', optionalAuthenticate, async (req, res) => {
  try {
    const { targetType, targetId, page = 1, limit = 20 } = req.query;

    if (!targetType || !targetId) {
      return res.status(400).json({ message: '缺少必要参数' });
    }

    const comments = await Comment.findByTarget(targetType, parseInt(targetId));
    const topLevelComments = comments.filter(c => !c.parent_id);
    const replies = comments.filter(c => c.parent_id);

    const commentsWithReplies = topLevelComments.map(comment => ({
      ...comment,
      replies: replies.filter(r => r.parent_id === comment.id)
    }));

    res.json({
      comments: commentsWithReplies,
      pagination: {
        total: commentsWithReplies.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(commentsWithReplies.length / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { content, targetType, targetId, parentId, rating } = req.body;

    if (!content || !targetType || !targetId) {
      return res.status(400).json({ message: '缺少必要参数' });
    }

    let targetExists = false;
    if (targetType === 'news') {
      const news = await News.findById(parseInt(targetId));
      targetExists = !!news;
    } else if (targetType === 'course') {
      const course = await Course.findById(parseInt(targetId));
      targetExists = !!course;
    }

    if (!targetExists) {
      return res.status(404).json({ message: '目标不存在' });
    }

    if (parentId) {
      const parentComment = await Comment.findById(parseInt(parentId));
      if (!parentComment) {
        return res.status(404).json({ message: '父评论不存在' });
      }
    }

    const comment = await Comment.create({
      content,
      userId: req.user.id,
      username: req.user.username,
      targetType,
      targetId: parseInt(targetId),
      parentId: parentId ? parseInt(parentId) : null,
      rating
    });

    if (targetType === 'news') {
      await News.incrementCommentCount(parseInt(targetId));
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: '评论不存在' });
    }

    if (comment.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: '权限不足' });
    }

    const updatedComment = await Comment.update(req.params.id, { content });
    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: '评论不存在' });
    }

    if (comment.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: '权限不足' });
    }

    await Comment.delete(req.params.id);

    if (comment.target_type === 'news') {
      await News.incrementCommentCount(comment.target_id);
    }

    res.json({ message: '评论删除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: '评论不存在' });
    }

    await Comment.incrementLikes(req.params.id);
    const updatedComment = await Comment.findById(req.params.id);

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    if (parseInt(userId) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: '权限不足' });
    }

    const comments = await Comment.findByUserId(parseInt(userId));

    res.json({
      comments,
      pagination: {
        total: comments.length,
        page: 1,
        limit: 10,
        pages: 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

module.exports = router;
