const { pool } = require('../db');

class Exercise {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM exercises';
    const params = [];
    const conditions = [];

    if (options.muscleGroup) { conditions.push('muscle_group = ?'); params.push(options.muscleGroup); }
    if (options.category) { conditions.push('category = ?'); params.push(options.category); }
    if (options.difficulty) { conditions.push('difficulty = ?'); params.push(options.difficulty); }
    if (options.equipment) { conditions.push('equipment LIKE ?'); params.push(`%${options.equipment}%`); }
    if (options.bodyPart) { conditions.push('(body_part LIKE ? OR muscle_group LIKE ?)'); params.push(`%${options.bodyPart}%`); params.push(`%${options.bodyPart}%`); }

    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY muscle_group, name';

    if (options.limit) { query += ' LIMIT ?'; params.push(options.limit); }

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async search(keyword, limit = 50) {
    const kw = `%${keyword}%`;
    const [rows] = await pool.query(
      'SELECT * FROM exercises WHERE name LIKE ? OR muscle_group LIKE ? OR target_muscles LIKE ? OR secondary_muscles LIKE ? OR equipment LIKE ? LIMIT ?',
      [kw, kw, kw, kw, kw, limit]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM exercises WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async getMuscleGroups() {
    const [rows] = await pool.query('SELECT DISTINCT muscle_group FROM exercises ORDER BY muscle_group');
    return rows.map(r => r.muscle_group);
  }

  static async getStats() {
    const [rows] = await pool.query(
      'SELECT muscle_group, COUNT(*) as count FROM exercises GROUP BY muscle_group ORDER BY count DESC'
    );
    return rows;
  }

  static async findByNames(names) {
    if (!names.length) return [];
    const placeholders = names.map(() => '?').join(',');
    const [rows] = await pool.query(
      `SELECT * FROM exercises WHERE name IN (${placeholders})`,
      names
    );
    return rows;
  }
}

module.exports = Exercise;
