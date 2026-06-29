const { pool } = require('../db');

class Comment {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM comments';
    const params = [];
    const conditions = [];

    if (options.where) {
      for (const [key, value] of Object.entries(options.where)) {
        const dbField = key === 'userId' ? 'user_id' : key === 'targetType' ? 'target_type' : key === 'targetId' ? 'target_id' : key;
        conditions.push(`${dbField} = ?`);
        params.push(value);
      }
    }

    if (options.targetType && options.targetId) {
      conditions.push('target_type = ?');
      params.push(options.targetType);
      conditions.push('target_id = ?');
      params.push(options.targetId);
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
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM comments WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  }

  static async findByTarget(targetType, targetId) {
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE target_id = ? ORDER BY created_at DESC',
      [targetId]
    );
    return rows;
  }

  static async create(commentData) {
    const [result] = await pool.query(
      `INSERT INTO comments (content, user_id, username, target_type, target_id, rating, parent_id, likes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        commentData.content,
        commentData.userId,
        commentData.username,
        commentData.targetType,
        commentData.targetId,
        commentData.rating || null,
        commentData.parentId || null,
        commentData.likes || 0
      ]
    );
    return { id: result.insertId, ...commentData };
  }

  static async update(id, commentData) {
    const fields = [];
    const values = [];

    if (commentData.content !== undefined) {
      fields.push('content = ?');
      values.push(commentData.content);
    }
    if (commentData.likes !== undefined) {
      fields.push('likes = ?');
      values.push(commentData.likes);
    }

    if (fields.length === 0) return this.findById(id);

    fields.push('updated_at = NOW()');
    values.push(id);
    await pool.query(
      `UPDATE comments SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM comments WHERE id = ?', [id]);
    return true;
  }

  static async incrementLikes(id) {
    await pool.query('UPDATE comments SET likes = likes + 1 WHERE id = ?', [id]);
  }
}

module.exports = Comment;
