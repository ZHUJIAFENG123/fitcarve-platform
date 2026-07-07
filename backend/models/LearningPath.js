const { pool } = require('../db');

class LearningPath {
  static async findAll(options = {}) {
    let q = 'SELECT * FROM learning_paths';
    const conds = [];
    const params = [];
    if (options.category) { conds.push('category = ?'); params.push(options.category); }
    if (options.difficulty) { conds.push('difficulty = ?'); params.push(options.difficulty); }
    if (options.status) { conds.push('status = ?'); params.push(options.status); }
    if (conds.length > 0) q += ' WHERE ' + conds.join(' AND ');
    q += ' ORDER BY created_at DESC';
    if (options.limit) { q += ' LIMIT ?'; params.push(options.limit); }
    const [rows] = await pool.query(q, params);
    return rows;
  }

  static async count(options = {}) {
    let q = 'SELECT COUNT(*) as total FROM learning_paths';
    const conds = [];
    const params = [];
    if (options.category) { conds.push('category = ?'); params.push(options.category); }
    if (options.difficulty) { conds.push('difficulty = ?'); params.push(options.difficulty); }
    if (conds.length > 0) q += ' WHERE ' + conds.join(' AND ');
    const [rows] = await pool.query(q, params);
    return rows[0].total;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM learning_paths WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async getItems(pathId) {
    const [rows] = await pool.query(
      `SELECT i.*, n.title as news_title, n.summary as news_summary, n.image as news_image,
              n.category as news_category, n.views as news_views
       FROM learning_path_items i
       LEFT JOIN news n ON i.news_id = n.id
       WHERE i.path_id = ?
       ORDER BY i.sort_order`, [pathId]
    );
    return rows;
  }

  static async getUserProgress(userId, pathId) {
    const [rows] = await pool.query(
      'SELECT * FROM user_path_progress WHERE user_id = ? AND path_id = ?',
      [userId, pathId]
    );
    return rows;
  }

  static async markProgress(userId, pathId, itemId, status = 'completed') {
    await pool.query(
      `INSERT INTO user_path_progress (user_id, path_id, item_id, status, completed_at)
       VALUES (?, ?, ?, ?, ${status === 'completed' ? 'NOW()' : 'NULL'})
       ON DUPLICATE KEY UPDATE status = ?, completed_at = ${status === 'completed' ? 'NOW()' : 'NULL'}`,
      [userId, pathId, itemId, status, status]
    );
    return { userId, pathId, itemId, status };
  }

  static async enroll(userId, pathId) {
    // 初始化该路径下所有 item 的进度为 pending
    const items = await this.getItems(pathId);
    for (const item of items) {
      await pool.query(
        `INSERT IGNORE INTO user_path_progress (user_id, path_id, item_id, status)
         VALUES (?, ?, ?, 'pending')`,
        [userId, pathId, item.id]
      );
    }
    return { enrolled: items.length };
  }

  static async getUserEnrolled(userId) {
    const [rows] = await pool.query(
      `SELECT DISTINCT p.*, 
        (SELECT COUNT(*) FROM learning_path_items WHERE path_id = p.id) as total_items,
        (SELECT COUNT(*) FROM user_path_progress WHERE user_id = ? AND path_id = p.id AND status = 'completed') as completed_items
       FROM learning_paths p
       INNER JOIN user_path_progress up ON p.id = up.path_id AND up.user_id = ?
       GROUP BY p.id`,
      [userId, userId]
    );
    return rows;
  }

  static async incrementViews(id) {
    await pool.query('UPDATE learning_paths SET views = views + 1 WHERE id = ?', [id]);
  }
}

module.exports = LearningPath;
