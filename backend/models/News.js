const { pool } = require('../db');

class News {
  // 获取资讯列表（支持分页）
  static async findAll(options = {}) {
    let query = 'SELECT * FROM news';
    const params = [];
    const conditions = [];

    if (options.category) {
      conditions.push('category = ?');
      params.push(options.category);
    }
    if (options.status) {
      conditions.push('status = ?');
      params.push(options.status);
    }
    if (options.author) {
      conditions.push('author = ?');
      params.push(options.author);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY publish_date DESC';

    // 支持分页
    if (options.limit) {
      query += ' LIMIT ?';
      params.push(options.limit);
      if (options.offset) {
        query += ' OFFSET ?';
        params.push(options.offset);
      }
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }

  // 获取总数
  static async count(options = {}) {
    let query = 'SELECT COUNT(*) as total FROM news';
    const params = [];
    const conditions = [];

    if (options.category) {
      conditions.push('category = ?');
      params.push(options.category);
    }
    if (options.status) {
      conditions.push('status = ?');
      params.push(options.status);
    }
    if (options.author) {
      conditions.push('author = ?');
      params.push(options.author);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  // 搜索资讯
  static async search(keyword, limit = 9, offset = 0) {
    const kw = `%${keyword}%`;
    const query = `
      SELECT * FROM news 
      WHERE (title LIKE ? OR summary LIKE ? OR tags LIKE ? OR content LIKE ?)
      ORDER BY publish_date DESC
      LIMIT ? OFFSET ?
    `;
    const [rows] = await pool.query(query, [kw, kw, kw, kw, limit, offset]);

    // 获取总数
    const countQuery = `
      SELECT COUNT(*) as total FROM news 
      WHERE (title LIKE ? OR summary LIKE ? OR tags LIKE ? OR content LIKE ?)
    `;
    const [countRows] = await pool.query(countQuery, [kw, kw, kw, kw]);

    return { list: rows, total: countRows[0].total };
  }

  // 获取热门资讯
  static async getPopular(limit = 10) {
    const [rows] = await pool.query(
      'SELECT * FROM news ORDER BY views DESC LIMIT ?',
      [limit]
    );
    return rows;
  }

  // 获取相关资讯
  static async getRelated(id, category, limit = 3) {
    const [rows] = await pool.query(
      'SELECT * FROM news WHERE category = ? AND id != ? ORDER BY publish_date DESC LIMIT ?',
      [category, id, limit]
    );
    return rows;
  }

  // 获取统计数据
  static async getStats() {
    const [totalResult] = await pool.query('SELECT COUNT(*) as count FROM news');
    const [categoryResult] = await pool.query('SELECT category, COUNT(*) as count FROM news GROUP BY category');
    const [viewsResult] = await pool.query('SELECT SUM(views) as total FROM news');
    const [commentResult] = await pool.query('SELECT SUM(comment_count) as total FROM news');

    return {
      totalNews: totalResult[0].count,
      categoryStats: categoryResult,
      totalViews: viewsResult[0]?.total || 0,
      totalComments: commentResult[0]?.total || 0
    };
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByAuthor(author) {
    const [rows] = await pool.query('SELECT * FROM news WHERE author = ? ORDER BY publish_date DESC', [author]);
    return rows;
  }

  static async create(newsData) {
    const [result] = await pool.query(
      `INSERT INTO news (title, content, summary, tags, image, category, author, status, views, comment_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newsData.title,
        newsData.content,
        newsData.summary || '',
        newsData.tags || '',
        newsData.image,
        newsData.category,
        newsData.author,
        newsData.status || 'pending',
        newsData.views || 0,
        newsData.commentCount || 0
      ]
    );
    return { id: result.insertId, ...newsData };
  }

  static async update(id, newsData) {
    const fields = [];
    const values = [];

    const fieldMap = {
      title: 'title',
      content: 'content',
      summary: 'summary',
      tags: 'tags',
      image: 'image',
      category: 'category',
      author: 'author',
      status: 'status',
      views: 'views',
      commentCount: 'comment_count',
      auditBy: 'audit_by',
      auditAt: 'audit_at',
      rejectReason: 'reject_reason'
    };

    for (const [key, dbField] of Object.entries(fieldMap)) {
      if (newsData[key] !== undefined) {
        fields.push(`${dbField} = ?`);
        values.push(newsData[key]);
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await pool.query(
      `UPDATE news SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM news WHERE id = ?', [id]);
    return true;
  }

  static async incrementViews(id) {
    await pool.query('UPDATE news SET views = views + 1 WHERE id = ?', [id]);
  }

  static async incrementCommentCount(id) {
    await pool.query('UPDATE news SET comment_count = comment_count + 1 WHERE id = ?', [id]);
  }

  static async updateStatus(id, status, auditData = {}) {
    const fields = ['status = ?'];
    const values = [status];

    if (auditData.auditBy) {
      fields.push('audit_by = ?');
      values.push(auditData.auditBy);
      fields.push('audit_at = NOW()');
    }
    if (auditData.rejectReason) {
      fields.push('reject_reason = ?');
      values.push(auditData.rejectReason);
    }

    values.push(id);
    await pool.query(
      `UPDATE news SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return this.findById(id);
  }
}

module.exports = News;
