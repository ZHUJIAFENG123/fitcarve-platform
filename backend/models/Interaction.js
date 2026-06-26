const { pool } = require('../db');

class Interaction {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM interactions';
    const params = [];
    const conditions = [];

    if (options.userId) {
      conditions.push('user_id = ?');
      params.push(options.userId);
    }
    if (options.targetType) {
      conditions.push('target_type = ?');
      params.push(options.targetType);
    }
    if (options.targetId) {
      conditions.push('target_id = ?');
      params.push(options.targetId);
    }
    if (options.type) {
      conditions.push('type = ?');
      params.push(options.type);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findOne(userId, targetType, targetId, type) {
    const [rows] = await pool.query(
      'SELECT * FROM interactions WHERE user_id = ? AND target_type = ? AND target_id = ? AND type = ?',
      [userId, targetType, targetId, type]
    );
    return rows[0];
  }

  static async create(interactionData) {
    const [result] = await pool.query(
      `INSERT INTO interactions (user_id, target_type, target_id, type)
       VALUES (?, ?, ?, ?)`,
      [
        interactionData.userId,
        interactionData.targetType,
        interactionData.targetId,
        interactionData.type
      ]
    );
    return { id: result.insertId, ...interactionData };
  }

  static async delete(userId, targetType, targetId, type) {
    await pool.query(
      'DELETE FROM interactions WHERE user_id = ? AND target_type = ? AND target_id = ? AND type = ?',
      [userId, targetType, targetId, type]
    );
    return true;
  }

  static async toggle(userId, targetType, targetId, type) {
    const existing = await this.findOne(userId, targetType, targetId, type);
    if (existing) {
      await this.delete(userId, targetType, targetId, type);
      return { action: 'removed', interaction: existing };
    } else {
      const interaction = await this.create({ userId, targetType, targetId, type });
      return { action: 'added', interaction };
    }
  }
}

module.exports = Interaction;
