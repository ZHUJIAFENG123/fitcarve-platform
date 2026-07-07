const { pool } = require('../db');
const Exercise = require('./Exercise');

class TrainingPlan {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM training_plans';
    const params = [];
    const conditions = [];

    if (options.goal) { conditions.push('goal = ?'); params.push(options.goal); }
    if (options.level) { conditions.push('level = ?'); params.push(options.level); }
    if (options.coach) { conditions.push('coach = ?'); params.push(options.coach); }
    if (options.keyword) {
      conditions.push('(title LIKE ? OR description LIKE ?)');
      params.push(`%${options.keyword}%`, `%${options.keyword}%`);
    }
    if (options.equipment) {
      conditions.push('equipment LIKE ?');
      params.push(`%${options.equipment}%`);
    }

    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');

    // 排序：默认按 views 降序（热门），支持最新/最短周期
    const sort = options.sort || 'popular';
    if (sort === 'latest') query += ' ORDER BY created_at DESC';
    else if (sort === 'shortest') query += ' ORDER BY duration_weeks ASC, views DESC';
    else query += ' ORDER BY views DESC';

    if (options.limit) { query += ' LIMIT ?'; params.push(options.limit); }
    if (options.offset) { query += ' OFFSET ?'; params.push(options.offset); }

    const [rows] = await pool.query(query, params);
    return rows.map(this.format);
  }

  static async count(options = {}) {
    let query = 'SELECT COUNT(*) as total FROM training_plans';
    const params = [];
    const conditions = [];
    if (options.goal) { conditions.push('goal = ?'); params.push(options.goal); }
    if (options.level) { conditions.push('level = ?'); params.push(options.level); }
    if (options.coach) { conditions.push('coach = ?'); params.push(options.coach); }
    if (options.keyword) {
      conditions.push('(title LIKE ? OR description LIKE ?)');
      params.push(`%${options.keyword}%`, `%${options.keyword}%`);
    }
    if (options.equipment) {
      conditions.push('equipment LIKE ?');
      params.push(`%${options.equipment}%`);
    }
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM training_plans WHERE id = ?', [id]);
    return rows[0] ? this.format(rows[0]) : null;
  }

  /**
   * 查询训练计划详情，并为 syllabus 中每个动作附加 _exercise 字段（含动作库完整信息）
   * 优先按 exercise_id 查询，兜底用动作名模糊匹配
   */
  static async findByIdWithExercises(id) {
    const plan = await this.findById(id);
    if (!plan) return null;

    if (!plan.syllabus || !Array.isArray(plan.syllabus)) return plan;

    // 1. 收集 syllabus 中所有 exercise_id（优先）或动作名（兜底）
    const exerciseIds = new Set();
    const exerciseNames = new Set();
    for (const week of plan.syllabus) {
      if (!week.days) continue;
      for (const day of week.days) {
        if (!day.exercises) continue;
        for (const ex of day.exercises) {
          if (ex.exercise_id) {
            exerciseIds.add(ex.exercise_id);
          } else if (ex.name) {
            exerciseNames.add(ex.name.trim());
          }
        }
      }
    }

    // 2. 批量查询动作库
    const exerciseMap = {};
    if (exerciseIds.size > 0) {
      try {
        const ids = [...exerciseIds];
        const placeholders = ids.map(() => '?').join(',');
        const [rows] = await pool.query(
          `SELECT * FROM exercises WHERE id IN (${placeholders})`,
          ids
        );
        for (const ex of rows) {
          exerciseMap[ex.id] = this._pickExerciseFields(ex);
        }
      } catch (e) {
        console.error('动作库ID查询失败:', e.message);
      }
    }
    if (exerciseNames.size > 0) {
      try {
        const exercises = await Exercise.findByNames([...exerciseNames]);
        for (const ex of exercises) {
          exerciseMap[`name_${ex.name.trim()}`] = this._pickExerciseFields(ex);
        }
      } catch (e) {
        console.error('动作库名称查询失败:', e.message);
      }
    }

    // 3. 给 syllabus 中每个动作附加 _exercise 字段
    for (const week of plan.syllabus) {
      if (!week.days) continue;
      for (const day of week.days) {
        if (!day.exercises) continue;
        for (const ex of day.exercises) {
          if (ex.exercise_id && exerciseMap[ex.exercise_id]) {
            ex._exercise = exerciseMap[ex.exercise_id];
          } else if (ex.name) {
            const name = ex.name.trim();
            ex._exercise = exerciseMap[`name_${name}`] || null;
          } else {
            ex._exercise = null;
          }
        }
      }
    }

    return plan;
  }

  // 提取动作库字段（保持返回结构稳定，避免 SELECT * 字段变动影响前端）
  static _pickExerciseFields(ex) {
    return {
      id: ex.id,
      name: ex.name,
      image_url: ex.image_url || '',
      gif_url: ex.gif_url || '',
      muscle_group: ex.muscle_group || '',
      target_muscles: ex.target_muscles || '',
      secondary_muscles: ex.secondary_muscles || '',
      instructions: ex.instructions || '',
      tips: ex.tips || '',
      equipment: ex.equipment || '',
      difficulty: ex.difficulty || '',
      category: ex.category || ''
    };
  }

  static async incrementViews(id) {
    await pool.query('UPDATE training_plans SET views = views + 1 WHERE id = ?', [id]);
  }

  static async getPopular(limit = 6) {
    const [rows] = await pool.query('SELECT * FROM training_plans ORDER BY views DESC LIMIT ?', [limit]);
    return rows.map(this.format);
  }

  /**
   * 创建训练计划
   * @param {Object} data 计划数据
   * @param {number} authorId 创建者用户ID
   */
  static async create(data, authorId) {
    const {
      title, description = '', cover_image = '', goal, level,
      duration_weeks = 4, days_per_week = 4, equipment = '', coach = '我',
      syllabus, source = 'manual', is_public = 0
    } = data;

    const syllabusJson = typeof syllabus === 'string' ? syllabus : JSON.stringify(syllabus);
    const [result] = await pool.query(
      `INSERT INTO training_plans
       (title, description, cover_image, goal, level, duration_weeks, days_per_week,
        equipment, coach, author_id, is_official, is_public, source, syllabus)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)`,
      [title, description, cover_image, goal, level, duration_weeks, days_per_week,
       equipment, coach, authorId, is_public, source, syllabusJson]
    );
    return result.insertId;
  }

  /**
   * 更新训练计划（仅作者或 admin 可调用）
   * @returns {Promise<boolean>} 是否更新成功（false=无权限或计划不存在）
   */
  static async update(id, data, userId) {
    const plan = await this.findById(id);
    if (!plan) return false;
    // 权限校验：userId=0 表示系统/admin 调用，跳过校验
    if (userId !== 0) {
      // 官方计划（author_id=NULL）不允许普通用户修改
      if (plan.author_id === null) return false;
      // 非作者无权修改
      if (plan.author_id !== userId) return false;
    }

    const fields = [];
    const params = [];
    const allowed = ['title', 'description', 'cover_image', 'goal', 'level',
                     'duration_weeks', 'days_per_week', 'equipment', 'coach', 'is_public'];
    for (const f of allowed) {
      if (data[f] !== undefined) { fields.push(`${f} = ?`); params.push(data[f]); }
    }
    if (data.syllabus !== undefined) {
      fields.push('syllabus = ?');
      params.push(typeof data.syllabus === 'string' ? data.syllabus : JSON.stringify(data.syllabus));
    }
    if (fields.length === 0) return true;
    params.push(id);
    await pool.query(`UPDATE training_plans SET ${fields.join(', ')} WHERE id = ?`, params);
    return true;
  }

  /**
   * 删除训练计划（仅作者或 admin）
   * @returns {Promise<boolean>} 是否删除成功
   */
  static async delete(id, userId) {
    const plan = await this.findById(id);
    if (!plan) return false;
    if (userId !== 0) {
      if (plan.author_id === null) return false;  // 官方计划不可删
      if (plan.author_id !== userId) return false;  // 非作者不可删
    }
    const [result] = await pool.query('DELETE FROM training_plans WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  /** 查询某用户创建的计划 */
  static async findByAuthor(userId, options = {}) {
    let query = 'SELECT * FROM training_plans WHERE author_id = ?';
    const params = [userId];
    if (options.goal) { query += ' AND goal = ?'; params.push(options.goal); }
    if (options.level) { query += ' AND level = ?'; params.push(options.level); }
    query += ' ORDER BY created_at DESC';
    if (options.limit) { query += ' LIMIT ?'; params.push(options.limit); }
    if (options.offset) { query += ' OFFSET ?'; params.push(options.offset); }
    const [rows] = await pool.query(query, params);
    return rows.map(this.format);
  }

  /** 增加参与人数 */
  static async incrementEnrolled(id) {
    await pool.query('UPDATE training_plans SET enrolled = enrolled + 1 WHERE id = ?', [id]);
  }

  /** 减少参与人数 */
  static async decrementEnrolled(id) {
    await pool.query('UPDATE training_plans SET enrolled = GREATEST(enrolled - 1, 0) WHERE id = ?', [id]);
  }

  static format(row) {
    let syllabus = row.syllabus;
    if (typeof syllabus === 'string') {
      try { syllabus = JSON.parse(syllabus); } catch (e) { syllabus = []; }
    }
    return { ...row, syllabus };
  }
}

module.exports = TrainingPlan;
