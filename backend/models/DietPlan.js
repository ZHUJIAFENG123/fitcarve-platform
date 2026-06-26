const { pool } = require('../db');

class DietPlan {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM diet_plans';
    const params = [];
    const conditions = [];

    if (options.goal) { conditions.push('goal = ?'); params.push(options.goal); }
    if (options.author) { conditions.push('author = ?'); params.push(options.author); }

    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY views DESC';

    if (options.limit) { query += ' LIMIT ?'; params.push(options.limit); }
    if (options.offset) { query += ' OFFSET ?'; params.push(options.offset); }

    const [rows] = await pool.query(query, params);
    return rows.map(this.format);
  }

  static async count(options = {}) {
    let query = 'SELECT COUNT(*) as total FROM diet_plans';
    const params = [];
    const conditions = [];
    if (options.goal) { conditions.push('goal = ?'); params.push(options.goal); }
    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM diet_plans WHERE id = ?', [id]);
    return rows[0] ? this.format(rows[0]) : null;
  }

  static async incrementViews(id) {
    await pool.query('UPDATE diet_plans SET views = views + 1 WHERE id = ?', [id]);
  }

  static async getPopular(limit = 6) {
    const [rows] = await pool.query('SELECT * FROM diet_plans ORDER BY views DESC LIMIT ?', [limit]);
    return rows.map(this.format);
  }

  static format(row) {
    return {
      ...row,
      meals: typeof row.meals === 'string' ? JSON.parse(row.meals) : row.meals
    };
  }
}

module.exports = DietPlan;
