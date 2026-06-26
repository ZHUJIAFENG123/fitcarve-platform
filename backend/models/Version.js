const { pool } = require('../db');

class Version {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM versions';
    const params = [];
    const conditions = [];

    if (options.targetType) {
      conditions.push('target_type = ?');
      params.push(options.targetType);
    }
    if (options.targetId) {
      conditions.push('target_id = ?');
      params.push(options.targetId);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY version DESC';

    if (options.limit) {
      query += ' LIMIT ?';
      params.push(options.limit);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM versions WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByTarget(targetType, targetId) {
    return this.findAll({ targetType, targetId });
  }

  static async findLatest(targetType, targetId) {
    const [rows] = await pool.query(
      'SELECT * FROM versions WHERE target_type = ? AND target_id = ? ORDER BY version DESC LIMIT 1',
      [targetType, targetId]
    );
    return rows[0];
  }

  static async create(versionData) {
    const [result] = await pool.query(
      `INSERT INTO versions (target_type, target_id, version, content, author, reason)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        versionData.targetType,
        versionData.targetId,
        versionData.version,
        JSON.stringify(versionData.content),
        versionData.author,
        versionData.reason || null
      ]
    );
    return { id: result.insertId, ...versionData };
  }

  static async getNextVersion(targetType, targetId) {
    const latest = await this.findLatest(targetType, targetId);
    return latest ? latest.version + 1 : 1;
  }

  static async delete(id) {
    await pool.query('DELETE FROM versions WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Version;
