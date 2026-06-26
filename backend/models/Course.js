const { pool } = require('../db');

class Course {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM courses';
    const params = [];

    if (options.where) {
      const conditions = [];
      for (const [key, value] of Object.entries(options.where)) {
        conditions.push(`${key} = ?`);
        params.push(value);
      }
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
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
    const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByCoach(coach) {
    const [rows] = await pool.query('SELECT * FROM courses WHERE coach = ? ORDER BY created_at DESC', [coach]);
    return rows;
  }

  static async create(courseData) {
    const [result] = await pool.query(
      `INSERT INTO courses (title, description, image, coach, level, price, category, views, rating, enrolled, syllabus, target_audience, highlights, outcomes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseData.title,
        courseData.description,
        courseData.image,
        courseData.coach,
        courseData.level,
        courseData.price,
        courseData.category,
        courseData.views || 0,
        courseData.rating || 0,
        courseData.enrolled || 0,
        JSON.stringify(courseData.syllabus || []),
        JSON.stringify(courseData.targetAudience || []),
        JSON.stringify(courseData.highlights || []),
        JSON.stringify(courseData.outcomes || [])
      ]
    );
    return { id: result.insertId, ...courseData };
  }

  static async update(id, courseData) {
    const fields = [];
    const values = [];

    const fieldMap = {
      title: 'title',
      description: 'description',
      image: 'image',
      coach: 'coach',
      level: 'level',
      price: 'price',
      category: 'category',
      views: 'views',
      rating: 'rating',
      enrolled: 'enrolled',
      syllabus: 'syllabus',
      targetAudience: 'target_audience',
      highlights: 'highlights',
      outcomes: 'outcomes'
    };

    for (const [key, dbField] of Object.entries(fieldMap)) {
      if (courseData[key] !== undefined) {
        fields.push(`${dbField} = ?`);
        if (['syllabus', 'targetAudience', 'highlights', 'outcomes'].includes(key)) {
          values.push(JSON.stringify(courseData[key]));
        } else {
          values.push(courseData[key]);
        }
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await pool.query(
      `UPDATE courses SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    return true;
  }

  static async incrementViews(id) {
    await pool.query('UPDATE courses SET views = views + 1 WHERE id = ?', [id]);
  }

  static async incrementEnrolled(id) {
    await pool.query('UPDATE courses SET enrolled = enrolled + 1 WHERE id = ?', [id]);
  }

  static async updateRating(id, newRating) {
    await pool.query('UPDATE courses SET rating = ? WHERE id = ?', [newRating, id]);
  }
}

module.exports = Course;
