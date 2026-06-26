const { pool } = require('../db');

class Notification {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM notifications';
    const params = [];
    const conditions = [];

    if (options.userId) {
      conditions.push('user_id = ?');
      params.push(options.userId);
    }
    if (options.isRead !== undefined) {
      conditions.push('is_read = ?');
      params.push(options.isRead ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    if (options.limit) {
      query += ' LIMIT ?';
      params.push(options.limit);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByUserId(userId, options = {}) {
    return this.findAll({ userId, ...options });
  }

  static async findUnreadByUserId(userId) {
    return this.findAll({ userId, isRead: false });
  }

  static async create(notificationData) {
    const [result] = await pool.query(
      `INSERT INTO notifications (user_id, type, title, content, link)
       VALUES (?, ?, ?, ?, ?)`,
      [
        notificationData.userId,
        notificationData.type,
        notificationData.title,
        notificationData.content,
        notificationData.link || null
      ]
    );
    return { id: result.insertId, ...notificationData };
  }

  static async markAsRead(id) {
    await pool.query('UPDATE notifications SET is_read = 1 WHERE id = ?', [id]);
    return this.findById(id);
  }

  static async markAllAsRead(userId) {
    await pool.query('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [userId]);
    return true;
  }

  static async delete(id) {
    await pool.query('DELETE FROM notifications WHERE id = ?', [id]);
    return true;
  }

  static async getUnreadCount(userId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
      [userId]
    );
    return rows[0].count;
  }
}

module.exports = Notification;
