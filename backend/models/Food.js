const { pool } = require('../db');

class Food {
  static async search(keyword, limit = 20) {
    const kw = `%${keyword}%`;
    const [rows] = await pool.query(
      'SELECT * FROM foods WHERE name LIKE ? ORDER BY category LIMIT ?',
      [kw, limit]
    );
    return rows;
  }

  static async findByCategory(category, limit = 50) {
    const [rows] = await pool.query(
      'SELECT * FROM foods WHERE category = ? ORDER BY name LIMIT ?',
      [category, limit]
    );
    return rows;
  }

  static async findAll(limit = 200) {
    const [rows] = await pool.query('SELECT * FROM foods ORDER BY category, name LIMIT ?', [limit]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM foods WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async getCategories() {
    const [rows] = await pool.query('SELECT DISTINCT category FROM foods ORDER BY category');
    return rows.map(r => r.category);
  }
}

module.exports = Food;
