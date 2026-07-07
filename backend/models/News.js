const { pool } = require('../db');
const NewsTag = require('./NewsTag');
const NewsCategory = require('./NewsCategory');

class News {
  // 获取资讯列表（支持分页、分类、标签、质量分、精选等筛选）
  static async findAll(options = {}) {
    let query = 'SELECT DISTINCT n.* FROM news n';
    const params = [];
    const conditions = [];

    // 标签过滤（JOIN 关联表精确匹配，支持单标签和多标签）
    if (options.tagSlug || options.tag || (options.tags && options.tags.length > 0)) {
      query += ' INNER JOIN news_tag_relations ntr ON n.id = ntr.news_id';
      query += ' INNER JOIN news_tags nt ON ntr.tag_id = nt.id';
      if (options.tagSlug) {
        conditions.push('nt.slug = ?');
        params.push(options.tagSlug);
      } else if (options.tags && options.tags.length > 0) {
        const placeholders = options.tags.map(() => '?').join(', ');
        conditions.push(`nt.name IN (${placeholders})`);
        options.tags.forEach(t => params.push(t));
      } else if (options.tag) {
        conditions.push('nt.name = ?');
        params.push(options.tag);
      }
    }

    if (options.category) {
      conditions.push('n.category = ?');
      params.push(options.category);
    }
    if (options.status) {
      conditions.push('n.status = ?');
      params.push(options.status);
    }
    if (options.author) {
      conditions.push('n.author = ?');
      params.push(options.author);
    }
    if (options.keyword) {
      const kw = `%${options.keyword}%`;
      conditions.push('(n.title LIKE ? OR n.summary LIKE ? OR n.tags LIKE ? OR n.content LIKE ?)');
      params.push(kw, kw, kw, kw);
    }
    if (options.qualityMin !== undefined && options.qualityMin !== null) {
      conditions.push('n.quality_score >= ?');
      params.push(options.qualityMin);
    }
    if (options.isFeatured !== undefined && options.isFeatured !== null) {
      conditions.push('n.is_featured = ?');
      params.push(options.isFeatured ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    // 排序（默认 hot = 综合热度算法：浏览量 + 评论权重 + 时间衰减）
    if (options.sort === 'popular') {
      query += ' ORDER BY n.views DESC';
    } else if (options.sort === 'most_commented') {
      query += ' ORDER BY n.comment_count DESC';
    } else if (options.sort === 'quality') {
      query += ' ORDER BY n.quality_score DESC, n.publish_date DESC';
    } else if (options.sort === 'newest') {
      query += ' ORDER BY n.publish_date DESC';
    } else {
      // 默认: hot 综合热度 (log衰减避免溢出)
      query += ' ORDER BY (n.views + n.comment_count * 5) / LN(GREATEST(DATEDIFF(NOW(), n.publish_date), 1) + 2.72) DESC';
    }

    // 分页
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
    let query = 'SELECT COUNT(DISTINCT n.id) as total FROM news n';
    const params = [];
    const conditions = [];

    if (options.tagSlug || options.tag || (options.tags && options.tags.length > 0)) {
      query += ' INNER JOIN news_tag_relations ntr ON n.id = ntr.news_id';
      query += ' INNER JOIN news_tags nt ON ntr.tag_id = nt.id';
      if (options.tagSlug) {
        conditions.push('nt.slug = ?');
        params.push(options.tagSlug);
      } else if (options.tags && options.tags.length > 0) {
        const placeholders = options.tags.map(() => '?').join(', ');
        conditions.push(`nt.name IN (${placeholders})`);
        options.tags.forEach(t => params.push(t));
      } else if (options.tag) {
        conditions.push('nt.name = ?');
        params.push(options.tag);
      }
    }

    if (options.category) {
      conditions.push('n.category = ?');
      params.push(options.category);
    }
    if (options.status) {
      conditions.push('n.status = ?');
      params.push(options.status);
    }
    if (options.author) {
      conditions.push('n.author = ?');
      params.push(options.author);
    }
    if (options.keyword) {
      const kw = `%${options.keyword}%`;
      conditions.push('(n.title LIKE ? OR n.summary LIKE ? OR n.tags LIKE ? OR n.content LIKE ?)');
      params.push(kw, kw, kw, kw);
    }
    if (options.qualityMin !== undefined && options.qualityMin !== null) {
      conditions.push('n.quality_score >= ?');
      params.push(options.qualityMin);
    }
    if (options.isFeatured !== undefined && options.isFeatured !== null) {
      conditions.push('n.is_featured = ?');
      params.push(options.isFeatured ? 1 : 0);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  // 搜索资讯
  static async search(keyword, limit = 9, offset = 0, status = null, sort = null) {
    const kw = `%${keyword}%`;
    const params = [kw, kw, kw, kw];
    const countParams = [kw, kw, kw, kw];

    let whereClause = '(n.title LIKE ? OR n.summary LIKE ? OR n.tags LIKE ? OR n.content LIKE ?)';
    if (status) {
      whereClause += ' AND n.status = ?';
      params.push(status);
      countParams.push(status);
    }

    let orderClause = '(n.views + n.comment_count * 5) / LN(GREATEST(DATEDIFF(NOW(), n.publish_date), 1) + 2.72) DESC';
    if (sort === 'popular') {
      orderClause = 'n.views DESC';
    } else if (sort === 'most_commented') {
      orderClause = 'n.comment_count DESC';
    } else if (sort === 'quality') {
      orderClause = 'n.quality_score DESC, n.publish_date DESC';
    } else if (sort === 'newest') {
      orderClause = 'n.publish_date DESC';
    }

    const query = `
      SELECT n.* FROM news n
      WHERE ${whereClause}
      ORDER BY ${orderClause}
      LIMIT ? OFFSET ?
    `;
    const [rows] = await pool.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) as total FROM news n
      WHERE ${whereClause}
    `;
    const [countRows] = await pool.query(countQuery, countParams);

    return { list: rows, total: countRows[0].total };
  }

  // 获取热门资讯
  static async getPopular(limit = 10, category = null) {
    let query = 'SELECT * FROM news WHERE status = ?';
    const params = ['approved'];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY (views + comment_count * 5) / LN(GREATEST(DATEDIFF(NOW(), publish_date), 1) + 2.72) DESC LIMIT ?';
    params.push(limit);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  // 获取精选推荐
  static async getFeatured(limit = 10, category = null) {
    let query = 'SELECT * FROM news WHERE status = ? AND is_featured = 1';
    const params = ['approved'];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY quality_score DESC, publish_date DESC LIMIT ?';
    params.push(limit);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  // 获取相关资讯（基于标签相似度）
  static async getRelated(id, category, limit = 3) {
    // 先获取当前文章的标签
    const tags = await NewsTag.getTagsForNews(id);
    const tagIds = tags.map(t => t.id);

    if (tagIds.length === 0) {
      // 没有标签时按分类推荐
      const [rows] = await pool.query(
        'SELECT * FROM news WHERE category = ? AND id != ? AND status = ? ORDER BY publish_date DESC LIMIT ?',
        [category, id, 'approved', limit]
      );
      return rows;
    }

    // 基于共同标签数量排序推荐
    const placeholders = tagIds.map(() => '?').join(',');
    const query = `
      SELECT n.*, COUNT(ntr.tag_id) as common_tags
      FROM news n
      INNER JOIN news_tag_relations ntr ON n.id = ntr.news_id
      WHERE ntr.tag_id IN (${placeholders})
        AND n.id != ?
        AND n.status = ?
      GROUP BY n.id
      ORDER BY common_tags DESC, n.publish_date DESC
      LIMIT ?
    `;

    const [rows] = await pool.query(query, [...tagIds, id, 'approved', limit]);
    return rows;
  }

  // 获取统计数据
  static async getStats() {
    const [totalResult] = await pool.query('SELECT COUNT(*) as count FROM news');
    const [categoryResult] = await pool.query('SELECT category, COUNT(*) as count FROM news GROUP BY category');
    const [viewsResult] = await pool.query('SELECT SUM(views) as total FROM news');
    const [commentResult] = await pool.query('SELECT SUM(comment_count) as total FROM news');
    const [featuredResult] = await pool.query('SELECT COUNT(*) as count FROM news WHERE is_featured = 1');
    const [reportResult] = await pool.query('SELECT COUNT(*) as count FROM news_reports WHERE status = ?', ['pending']);

    // 质量分分布
    const [qualityDist] = await pool.query(`
      SELECT
        CASE
          WHEN quality_score >= 80 THEN 'excellent'
          WHEN quality_score >= 60 THEN 'good'
          WHEN quality_score >= 40 THEN 'fair'
          ELSE 'low'
        END as level,
        COUNT(*) as count
      FROM news
      GROUP BY level
    `);

    return {
      totalNews: totalResult[0].count,
      categoryStats: categoryResult,
      totalViews: viewsResult[0]?.total || 0,
      totalComments: commentResult[0]?.total || 0,
      featuredCount: featuredResult[0].count,
      pendingReports: reportResult[0].count,
      qualityDistribution: qualityDist
    };
  }

  // 获取质量分统计
  static async getQualityStats() {
    const [distResult] = await pool.query(`
      SELECT
        CASE
          WHEN quality_score >= 90 THEN '90+'
          WHEN quality_score >= 80 THEN '80-89'
          WHEN quality_score >= 70 THEN '70-79'
          WHEN quality_score >= 60 THEN '60-69'
          WHEN quality_score >= 40 THEN '40-59'
          ELSE 'below-40'
        END as range_label,
        COUNT(*) as count
      FROM news
      GROUP BY range_label
      ORDER BY MIN(quality_score) DESC
    `);

    const [avgResult] = await pool.query('SELECT AVG(quality_score) as avg_score FROM news WHERE quality_score > 0');

    return {
      distribution: distResult,
      averageScore: avgResult[0]?.avg_score || 0
    };
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    if (rows.length === 0) return null;

    const news = rows[0];
    // 附加标签列表
    news.tagList = await NewsTag.getTagsForNews(id);
    return news;
  }

  static async findByAuthor(author) {
    const [rows] = await pool.query(
      'SELECT * FROM news WHERE author = ? ORDER BY publish_date DESC',
      [author]
    );
    return rows;
  }

  // 计算正文字数（去除HTML标签）
  static calculateWordCount(content) {
    if (!content) return 0;
    // 去除 HTML 标签
    const text = content.replace(/<[^>]*>/g, '');
    // 去除空白字符
    const clean = text.replace(/\s+/g, '');
    return clean.length;
  }

  // 计算阅读时长（约 500 字/分钟，最少 1 分钟）
  static calculateReadTime(wordCount) {
    return Math.max(1, Math.ceil(wordCount / 500));
  }

  // 自动计算初始质量分
  static calculateAutoQualityScore(newsData) {
    let score = 40; // 基础分

    // 内容结构分（20分）
    const wordCount = newsData.wordCount || this.calculateWordCount(newsData.content || '');
    if (wordCount >= 2000) score += 8;
    else if (wordCount >= 1000) score += 6;
    else if (wordCount >= 500) score += 3;

    if (newsData.summary && newsData.summary.length > 50) score += 2;
    if (newsData.image) score += 2;

    // 小标题结构检测
    const content = newsData.content || '';
    const headingCount = (content.match(/<h[1-6][^>]*>/gi) || []).length;
    if (headingCount >= 3) score += 4;
    else if (headingCount >= 1) score += 2;

    // 引用/参考文献检测
    if (/引用|参考|来源|文献|研究|ACSM|NSCA|JISSN/i.test(content)) score += 4;
    else if (/循证|科学|证据/i.test(newsData.evidenceTags || '')) score += 2;

    // 原创加分（15分）
    if (newsData.isOriginal !== false && newsData.is_original !== 0) {
      score += 15;
    } else {
      score += 5;
    }

    return Math.min(100, Math.round(score * 100) / 100);
  }

  static async create(newsData) {
    const wordCount = newsData.wordCount || this.calculateWordCount(newsData.content || '');
    const readTimeMin = newsData.readTimeMin || this.calculateReadTime(wordCount);
    const qualityScore = newsData.qualityScore !== undefined
      ? newsData.qualityScore
      : this.calculateAutoQualityScore({ ...newsData, wordCount });

    const [result] = await pool.query(
      `INSERT INTO news (title, content, summary, tags, image, category, author, status, views, comment_count, related_exercise_ids, related_plan_ids, evidence_tags, video_url, quality_score, is_featured, is_original, source_url, word_count, read_time_min)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        newsData.commentCount || 0,
        newsData.relatedExerciseIds || '',
        newsData.relatedPlanIds || '',
        newsData.evidenceTags || '',
        newsData.videoUrl || '',
        qualityScore,
        newsData.isFeatured ? 1 : 0,
        newsData.isOriginal !== false ? 1 : 0,
        newsData.sourceUrl || '',
        wordCount,
        readTimeMin
      ]
    );

    const newsId = result.insertId;

    // 处理标签关联（如果传入了 tagIds 或 tagNames）
    if (newsData.tagIds && newsData.tagIds.length > 0) {
      await NewsTag.setTagsForNews(newsId, newsData.tagIds);
    } else if (newsData.tagNames && newsData.tagNames.length > 0) {
      const tags = await NewsTag.findOrCreateMany(newsData.tagNames, newsData.category);
      const tagIds = tags.map(t => t.id);
      await NewsTag.setTagsForNews(newsId, tagIds);
    }

    // 更新分类文章计数
    await NewsCategory.updateArticleCount(newsData.category);

    return { id: newsId, ...newsData, wordCount, readTimeMin, qualityScore };
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
      rejectReason: 'reject_reason',
      relatedExerciseIds: 'related_exercise_ids',
      relatedPlanIds: 'related_plan_ids',
      evidenceTags: 'evidence_tags',
      videoUrl: 'video_url',
      qualityScore: 'quality_score',
      isFeatured: 'is_featured',
      isOriginal: 'is_original',
      sourceUrl: 'source_url',
      wordCount: 'word_count',
      readTimeMin: 'read_time_min',
      lastAuditedAt: 'last_audited_at'
    };

    for (const [key, dbField] of Object.entries(fieldMap)) {
      if (newsData[key] !== undefined) {
        let val = newsData[key];
        // 布尔值转换
        if (key === 'isFeatured' || key === 'isOriginal') {
          val = val ? 1 : 0;
        }
        fields.push(`${dbField} = ?`);
        values.push(val);
      }
    }

    // 如果内容更新了，重新计算字数和阅读时长
    if (newsData.content) {
      const wordCount = this.calculateWordCount(newsData.content);
      const readTimeMin = this.calculateReadTime(wordCount);
      fields.push('word_count = ?', 'read_time_min = ?');
      values.push(wordCount, readTimeMin);

      // 重新计算质量分（如果没有手动设置的话）
      if (newsData.qualityScore === undefined) {
        const existing = await this.findById(id);
        const autoScore = this.calculateAutoQualityScore({
          ...existing,
          ...newsData,
          wordCount
        });
        fields.push('quality_score = ?');
        values.push(autoScore);
      }
    }

    // 获取旧分类（用于更新计数）
    const oldNews = await this.findById(id);
    const oldCategory = oldNews?.category;

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await pool.query(
      `UPDATE news SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // 处理标签更新
    if (newsData.tagIds !== undefined) {
      await NewsTag.setTagsForNews(id, newsData.tagIds);
    } else if (newsData.tagNames !== undefined) {
      const newCategory = newsData.category || oldCategory;
      const tags = await NewsTag.findOrCreateMany(newsData.tagNames, newCategory);
      const tagIds = tags.map(t => t.id);
      await NewsTag.setTagsForNews(id, tagIds);
    }

    // 如果分类变了，更新两个分类的计数
    const newCategory = newsData.category;
    if (newCategory && newCategory !== oldCategory) {
      await NewsCategory.updateArticleCount(oldCategory);
      await NewsCategory.updateArticleCount(newCategory);
    }

    return this.findById(id);
  }

  static async delete(id) {
    const news = await this.findById(id);
    if (!news) return false;

    // 删除标签关联
    await pool.query('DELETE FROM news_tag_relations WHERE news_id = ?', [id]);

    // 删除举报记录
    await pool.query('DELETE FROM news_reports WHERE news_id = ?', [id]);

    await pool.query('DELETE FROM news WHERE id = ?', [id]);

    // 更新分类计数
    await NewsCategory.updateArticleCount(news.category);

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
      fields.push('last_audited_at = NOW()');
    }
    if (auditData.rejectReason) {
      fields.push('reject_reason = ?');
      values.push(auditData.rejectReason);
    }
    if (auditData.qualityScore !== undefined) {
      fields.push('quality_score = ?');
      values.push(auditData.qualityScore);
    }

    values.push(id);
    await pool.query(
      `UPDATE news SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // 更新分类计数
    const news = await this.findById(id);
    if (news) {
      await NewsCategory.updateArticleCount(news.category);
    }

    return this.findById(id);
  }

  // 更新质量分
  static async updateQualityScore(id, score) {
    await pool.query(
      'UPDATE news SET quality_score = ?, updated_at = NOW() WHERE id = ?',
      [score, id]
    );
    return this.findById(id);
  }

  // 切换精选状态
  static async toggleFeatured(id) {
    const news = await this.findById(id);
    if (!news) return null;

    const newFeatured = news.is_featured ? 0 : 1;
    await pool.query(
      'UPDATE news SET is_featured = ?, updated_at = NOW() WHERE id = ?',
      [newFeatured, id]
    );

    return this.findById(id);
  }

  // 提交举报
  static async report(id, userId, reasonType, description = '') {
    const news = await this.findById(id);
    if (!news) throw new Error('资讯不存在');

    // 检查是否已经举报过
    const [existing] = await pool.query(
      'SELECT id FROM news_reports WHERE news_id = ? AND user_id = ? AND status = ?',
      [id, userId, 'pending']
    );
    if (existing.length > 0) {
      throw new Error('您已举报过该文章，请等待处理');
    }

    const [result] = await pool.query(
      `INSERT INTO news_reports (news_id, user_id, reason_type, description)
       VALUES (?, ?, ?, ?)`,
      [id, userId, reasonType, description]
    );

    // 更新举报计数
    await pool.query(
      'UPDATE news SET report_count = report_count + 1 WHERE id = ?',
      [id]
    );

    return { id: result.insertId };
  }

  // 获取举报列表（管理端）
  static async getReports(options = {}) {
    const { status = 'pending', page = 1, limit = 20 } = options;
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      `SELECT nr.*, n.title as news_title, n.author as news_author, u.username as reporter_name
       FROM news_reports nr
       INNER JOIN news n ON nr.news_id = n.id
       LEFT JOIN users u ON nr.user_id = u.id
       WHERE nr.status = ?
       ORDER BY nr.created_at DESC
       LIMIT ? OFFSET ?`,
      [status, limit, offset]
    );

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM news_reports WHERE status = ?',
      [status]
    );

    return { list: rows, total: countResult[0].total };
  }

  // 处理举报
  static async handleReport(reportId, handledBy, action) {
    // action: 'resolved'（已处理/下架）或 'dismissed'（驳回/忽略）
    const [reportResult] = await pool.query(
      'SELECT * FROM news_reports WHERE id = ?',
      [reportId]
    );
    if (reportResult.length === 0) throw new Error('举报记录不存在');

    const report = reportResult[0];

    await pool.query(
      `UPDATE news_reports
       SET status = ?, handled_by = ?, handled_at = NOW()
       WHERE id = ?`,
      [action, handledBy, reportId]
    );

    // 如果是 resolved，减少计数
    if (action === 'dismissed') {
      await pool.query(
        'UPDATE news SET report_count = GREATEST(0, report_count - 1) WHERE id = ?',
        [report.news_id]
      );
    }

    return { success: true, reportId, action };
  }
}

module.exports = News;
