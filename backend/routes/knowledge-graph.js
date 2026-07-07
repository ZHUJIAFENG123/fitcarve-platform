const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET /api/knowledge-graph — 返回知识图谱数据（节点+边）
router.get('/', async (req, res) => {
  try {
    // 1. 获取所有动作及其肌群信息
    const [exercises] = await pool.query(
      'SELECT id, name, muscle_group, body_part, target_muscles, secondary_muscles, difficulty FROM exercises'
    );

    // 2. 获取所有含关联动作的资讯
    const [articles] = await pool.query(
      "SELECT id, title, related_exercise_ids FROM news WHERE related_exercise_ids IS NOT NULL AND related_exercise_ids != '' AND status = 'published'"
    );

    const nodes = [];
    const edges = [];
    const nodeIds = new Set();
    const muscleSet = new Map(); // muscle_name -> { count }

    // 辅助函数：添加节点
    function addNode(id, name, type, extra = {}) {
      if (nodeIds.has(id)) return;
      nodeIds.add(id);
      nodes.push({ id, name, type, ...extra });
    }

    // 3. 构建动作节点
    exercises.forEach(ex => {
      addNode(`exercise_${ex.id}`, ex.name, 'exercise', {
        muscleGroup: ex.muscle_group,
        bodyPart: ex.body_part,
        difficulty: ex.difficulty,
        symbolSize: 30
      });

      // 收集主肌群
      if (ex.muscle_group) {
        const key = `muscle_${ex.muscle_group}`;
        muscleSet.set(key, {
          name: ex.muscle_group,
          count: (muscleSet.get(key)?.count || 0) + 1
        });
        edges.push({
          source: `exercise_${ex.id}`,
          target: key,
          label: '主肌群'
        });
      }

      // 收集目标肌群
      if (ex.target_muscles) {
        ex.target_muscles.split(',').forEach(m => {
          const muscle = m.trim();
          if (!muscle) return;
          const key = `muscle_${muscle}`;
          muscleSet.set(key, {
            name: muscle,
            count: (muscleSet.get(key)?.count || 0) + 1
          });
          edges.push({
            source: `exercise_${ex.id}`,
            target: key,
            label: '目标'
          });
        });
      }

      // 收集辅助肌群
      if (ex.secondary_muscles) {
        ex.secondary_muscles.split(',').forEach(m => {
          const muscleSplit = m.trim();
          if (!muscleSplit) return;
          const key = `muscle_${muscleSplit}`;
          muscleSet.set(key, {
            name: muscleSplit,
            count: (muscleSet.get(key)?.count || 0) + 1
          });
          edges.push({
            source: `exercise_${ex.id}`,
            target: key,
            label: '辅助'
          });
        });
      }
    });

    // 4. 构建肌群节点（按引用数排序，大小渐变）
    const maxCount = Math.max(...Array.from(muscleSet.values()).map(m => m.count), 1);
    muscleSet.forEach((value, key) => {
      addNode(key, value.name, 'muscle', {
        symbolSize: 18 + (value.count / maxCount) * 30,
        exerciseCount: value.count
      });
    });

    // 5. 构建资讯节点及与动作的关联
    articles.forEach(article => {
      const exerciseIds = article.related_exercise_ids.split(',').map(id => id.trim()).filter(Boolean);
      if (exerciseIds.length === 0) return;

      addNode(`article_${article.id}`, article.title, 'article', {
        symbolSize: 25
      });

      exerciseIds.forEach(eid => {
        edges.push({
          source: `article_${article.id}`,
          target: `exercise_${eid}`,
          label: '关联'
        });
      });
    });

    res.json({
      success: true,
      data: { nodes, edges }
    });
  } catch (err) {
    console.error('知识图谱查询失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

module.exports = router;
