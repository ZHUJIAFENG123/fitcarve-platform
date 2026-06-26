const { pool } = require('../db');

class TrainingPlan {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM training_plans';
    const params = [];
    const conditions = [];

    if (options.goal) { conditions.push('goal = ?'); params.push(options.goal); }
    if (options.level) { conditions.push('level = ?'); params.push(options.level); }
    if (options.coach) { conditions.push('coach = ?'); params.push(options.coach); }

    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY views DESC';

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
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM training_plans WHERE id = ?', [id]);
    return rows[0] ? this.format(rows[0]) : null;
  }

  static async incrementViews(id) {
    await pool.query('UPDATE training_plans SET views = views + 1 WHERE id = ?', [id]);
  }

  static async getPopular(limit = 6) {
    const [rows] = await pool.query('SELECT * FROM training_plans ORDER BY views DESC LIMIT ?', [limit]);
    return rows.map(this.format);
  }

  static format(row) {
    return {
      ...row,
      syllabus: typeof row.syllabus === 'string' ? JSON.parse(row.syllabus) : row.syllabus
    };
  }
}

module.exports = TrainingPlan;
