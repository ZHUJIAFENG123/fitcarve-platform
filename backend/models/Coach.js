const { pool } = require('../db');

class Coach {
  static async findAll(options = {}) {
    let query = 'SELECT * FROM coaches WHERE 1=1';
    const params = [];

    if (options.specialty) {
      query += ' AND specialty LIKE ?';
      params.push(`%${options.specialty}%`);
    }
    if (options.status) {
      query += ' AND status = ?';
      params.push(options.status);
    }
    if (options.verified !== undefined) {
      query += ' AND verified = ?';
      params.push(options.verified ? 1 : 0);
    }

    query += ' ORDER BY rating DESC, created_at DESC';
    if (options.limit) {
      query += ' LIMIT ?';
      params.push(options.limit);
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM coaches WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM coaches WHERE user_id = ?', [userId]);
    return rows[0] || null;
  }

  static async create(data) {
    const [result] = await pool.query(
      `INSERT INTO coaches (user_id, name, avatar, title, bio, specialty, certifications, experience_years, education, hourly_rate, max_students, verified, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.userId, data.name, data.avatar || '', data.title || '', data.bio || '',
        data.specialty || '', data.certifications || '', data.experienceYears || 0,
        data.education || '', data.hourlyRate || 0, data.maxStudents || 20,
        data.verified || false, data.status || 'pending'
      ]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const fields = [];
    const params = [];

    const fieldMap = {
      name: 'name', avatar: 'avatar', title: 'title', bio: 'bio',
      specialty: 'specialty', certifications: 'certifications',
      experienceYears: 'experience_years', education: 'education',
      hourlyRate: 'hourly_rate', maxStudents: 'max_students',
      verified: 'verified', status: 'status', rating: 'rating',
      reviewCount: 'review_count', studentCount: 'student_count'
    };

    Object.entries(data).forEach(([key, value]) => {
      if (fieldMap[key] !== undefined && value !== undefined) {
        fields.push(`${fieldMap[key]} = ?`);
        params.push(value);
      }
    });

    if (fields.length === 0) return false;
    params.push(id);
    await pool.query(`UPDATE coaches SET ${fields.join(', ')} WHERE id = ?`, params);
    return true;
  }

  static async getDashboard(coachId) {
    const coach = await this.findById(coachId);
    if (!coach) return null;

    const [students] = await pool.query(
      'SELECT COUNT(*) as cnt FROM coach_students WHERE coach_id = ?',
      [coachId]
    );
    const [plans] = await pool.query(
      'SELECT COUNT(*) as cnt FROM training_plans WHERE creator_id = ?',
      [coach.userId]
    );
    const [articles] = await pool.query(
      'SELECT COUNT(*) as cnt FROM news WHERE author_id = ? AND status = ?',
      [coach.userId, 'published']
    );

    return {
      ...coach,
      studentCount: students[0]?.cnt || 0,
      planCount: plans[0]?.cnt || 0,
      articleCount: articles[0]?.cnt || 0
    };
  }

  static async getReviews(coachId, limit = 20) {
    const [rows] = await pool.query(
      'SELECT cr.*, u.username, u.avatar FROM coach_reviews cr JOIN users u ON cr.user_id = u.id WHERE cr.coach_id = ? ORDER BY cr.created_at DESC LIMIT ?',
      [coachId, limit]
    );
    return rows;
  }

  static async addReview(coachId, userId, rating, comment) {
    const [result] = await pool.query(
      'INSERT INTO coach_reviews (coach_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [coachId, userId, rating, comment || '']
    );

    // 更新教练评分
    const [avg] = await pool.query(
      'SELECT AVG(rating) as avg_rating, COUNT(*) as cnt FROM coach_reviews WHERE coach_id = ?',
      [coachId]
    );
    await pool.query(
      'UPDATE coaches SET rating = ?, review_count = ? WHERE id = ?',
      [Math.round(avg[0].avg_rating * 10) / 10, avg[0].cnt, coachId]
    );

    return result.insertId;
  }

  static async apply(data) {
    return this.create({ ...data, status: 'pending', verified: false });
  }
}

module.exports = Coach;
