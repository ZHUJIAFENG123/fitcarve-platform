const { pool } = require('../db');

class Exercise {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM exercises';
    const params = [];
    const conditions = [];

    if (options.muscleGroup) { conditions.push('muscle_group = ?'); params.push(options.muscleGroup); }
    if (options.category) { conditions.push('category = ?'); params.push(options.category); }
    if (options.difficulty) { conditions.push('difficulty = ?'); params.push(options.difficulty); }

    if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY muscle_group, name';

    if (options.limit) { query += ' LIMIT ?'; params.push(options.limit); }

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async search(keyword, limit = 20) {
    const kw = `%${keyword}%`;
    const [rows] = await pool.query(
      'SELECT * FROM exercises WHERE name LIKE ? OR muscle_group LIKE ? LIMIT ?',
      [kw, kw, limit]
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
}

module.exports = Exercise;
