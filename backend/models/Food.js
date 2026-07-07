const { pool } = require('../db');

class Food {
  static async search(keyword, limit = 20) {
    const kw = `%${keyword}%`;
    const [rows] = await pool.query(
      'SELECT * FROM foods WHERE name LIKE ? ORDER BY category, name LIMIT ?',
      [kw, limit]
    );
    return rows;
  }

  static async findByCategory(category, limit = 100) {
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
    const [rows] = await pool.query('SELECT DISTINCT category, category_name FROM foods ORDER BY category');
    return rows;
  }

  // 获取分类及数量，按食物数量降序
  static async getCategoriesWithCount() {
    const [rows] = await pool.query(
      'SELECT category, category_name, COUNT(*) as count FROM foods GROUP BY category, category_name ORDER BY count DESC'
    );
    return rows;
  }

  // 按分类搜索
  static async searchWithCategory(keyword, category, limit = 20) {
    const kw = `%${keyword}%`;
    if (category) {
      const [rows] = await pool.query(
        'SELECT * FROM foods WHERE name LIKE ? AND category = ? ORDER BY name LIMIT ?',
        [kw, category, limit]
      );
      return rows;
    }
    return this.search(keyword, limit);
  }

  // 获取热门食物（按分类取前 N 个）
  static async getPopular(limit = 10) {
    const [rows] = await pool.query(
      'SELECT * FROM foods ORDER BY calories_per_100g DESC LIMIT ?',
      [limit]
    );
    return rows;
  }

  // 获取食物总数
  static async getTotalCount() {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM foods');
    return rows[0]?.total || 0;
  }
}

module.exports = Food;
