const { pool } = require('../db');

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

class NewsTag {
  // 查询标签列表（支持筛选）
  static async findAll(options = {}) {
    const { category, keyword, sort = 'heat', page, limit } = options;
    let query = 'SELECT * FROM news_tags';
    const params = [];
    const conditions = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }

    if (keyword) {
      conditions.push('name LIKE ?');
      params.push(`%${keyword}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    // 排序
    if (sort === 'name') {
      query += ' ORDER BY name ASC';
    } else if (sort === 'usage') {
      query += ' ORDER BY usage_count DESC';
    } else if (sort === 'heat') {
      query += ' ORDER BY heat_score DESC, usage_count DESC';
    } else {
      query += ' ORDER BY sort_order ASC, id ASC';
    }

    // 分页
    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
      if (page && page > 1) {
        query += ' OFFSET ?';
        params.push((parseInt(page) - 1) * parseInt(limit));
      }
    }

    const [rows] = await pool.query(query, params);
    return rows;
  }

  // 统计总数
  static async count(options = {}) {
    const { category, keyword } = options;
    let query = 'SELECT COUNT(*) as total FROM news_tags';
    const params = [];
    const conditions = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }

    if (keyword) {
      conditions.push('name LIKE ?');
      params.push(`%${keyword}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM news_tags WHERE id = ?', [id]);
    return rows[0];
  }

  static async findBySlug(slug) {
    const [rows] = await pool.query('SELECT * FROM news_tags WHERE slug = ?', [slug]);
    return rows[0];
  }

  static async findByName(name) {
    const [rows] = await pool.query('SELECT * FROM news_tags WHERE name = ?', [name]);
    return rows[0];
  }

  // 创建标签
  static async create(tagData) {
    const { name, category = null, isRecommended = false, sortOrder = 0 } = tagData;
    const slug = tagData.slug || generateSlug(name);

    // 检查是否已存在
    const existing = await this.findByName(name);
    if (existing) {
      return existing;
    }

    const [result] = await pool.query(
      `INSERT INTO news_tags (name, slug, category, is_recommended, sort_order)
       VALUES (?, ?, ?, ?, ?)`,
      [name, slug, category, isRecommended ? 1 : 0, sortOrder]
    );

    return { id: result.insertId, name, slug, category, usageCount: 0, heatScore: 0 };
  }

  // 批量创建或获取标签（用于文章创建时）
  static async findOrCreateMany(tagNames, category = null) {
    if (!tagNames || tagNames.length === 0) return [];

    const tags = [];
    for (const name of tagNames) {
      const trimmed = name.trim();
      if (!trimmed) continue;

      let tag = await this.findByName(trimmed);
      if (!tag) {
        tag = await this.create({ name: trimmed, category });
      } else if (!tag.category && category) {
        // 如果标签没有分类，补上分类
        await this.update(tag.id, { category });
        tag.category = category;
      }
      tags.push(tag);
    }

    return tags;
  }

  // 更新标签
  static async update(id, tagData) {
    const fields = [];
    const values = [];

    const fieldMap = {
      name: 'name',
      slug: 'slug',
      category: 'category',
      isRecommended: 'is_recommended',
      sortOrder: 'sort_order'
    };

    for (const [key, dbField] of Object.entries(fieldMap)) {
      if (tagData[key] !== undefined) {
        fields.push(`${dbField} = ?`);
        values.push(tagData[key]);
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await pool.query(
      `UPDATE news_tags SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  // 删除标签
  static async delete(id) {
    // 先删除关联关系
    await pool.query('DELETE FROM news_tag_relations WHERE tag_id = ?', [id]);
    // 再删除标签
    await pool.query('DELETE FROM news_tags WHERE id = ?', [id]);
    return true;
  }

  // 更新使用次数
  static async incrementUsage(tagId, delta = 1) {
    await pool.query(
      'UPDATE news_tags SET usage_count = usage_count + ?, updated_at = NOW() WHERE id = ?',
      [delta, tagId]
    );
    // 重新计算热度分
    await this.updateHeatScore(tagId);
    return true;
  }

  // 重新计算热度分
  static async updateHeatScore(tagId) {
    // 热度分 = 使用次数 * 0.6 + (近7天新增使用次数) * 0.4
    // 简化版：热度分 = 使用次数
    const tag = await this.findById(tagId);
    if (!tag) return 0;

    const heatScore = tag.usage_count * 1.0;

    await pool.query(
      'UPDATE news_tags SET heat_score = ?, updated_at = NOW() WHERE id = ?',
      [heatScore, tagId]
    );

    return heatScore;
  }

  // 批量更新所有标签热度
  static async updateAllHeatScores() {
    const tags = await this.findAll();
    for (const tag of tags) {
      await this.updateHeatScore(tag.id);
    }
    return true;
  }

  // 获取热门标签
  static async getHotTags(limit = 20, category = null) {
    let query = 'SELECT * FROM news_tags';
    const params = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY heat_score DESC, usage_count DESC LIMIT ?';
    params.push(limit);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  // 获取某篇文章的所有标签
  static async getTagsForNews(newsId) {
    const [rows] = await pool.query(
      `SELECT nt.* FROM news_tags nt
       INNER JOIN news_tag_relations ntr ON nt.id = ntr.tag_id
       WHERE ntr.news_id = ?
       ORDER BY nt.sort_order ASC, nt.id ASC`,
      [newsId]
    );
    return rows;
  }

  // 设置文章的标签（全量替换）
  static async setTagsForNews(newsId, tagIds) {
    // 获取旧标签
    const oldTags = await this.getTagsForNews(newsId);
    const oldTagIds = oldTags.map(t => t.id);

    // 计算需要新增和删除的
    const toAdd = tagIds.filter(id => !oldTagIds.includes(id));
    const toRemove = oldTagIds.filter(id => !tagIds.includes(id));

    // 删除旧关联
    if (toRemove.length > 0) {
      const placeholders = toRemove.map(() => '?').join(',');
      await pool.query(
        `DELETE FROM news_tag_relations WHERE news_id = ? AND tag_id IN (${placeholders})`,
        [newsId, ...toRemove]
      );
      // 减少使用次数
      for (const tagId of toRemove) {
        await this.incrementUsage(tagId, -1);
      }
    }

    // 新增关联
    if (toAdd.length > 0) {
      const values = toAdd.map(tagId => [newsId, tagId]);
      await pool.query(
        'INSERT INTO news_tag_relations (news_id, tag_id) VALUES ?',
        [values]
      );
      // 增加使用次数
      for (const tagId of toAdd) {
        await this.incrementUsage(tagId, 1);
      }
    }

    return this.getTagsForNews(newsId);
  }

  // 合并标签（将 fromTagId 的所有文章转到 toTagId，然后删除 fromTagId）
  static async merge(fromTagId, toTagId) {
    if (fromTagId === toTagId) {
      throw new Error('不能合并到同一个标签');
    }

    const fromTag = await this.findById(fromTagId);
    const toTag = await this.findById(toTagId);

    if (!fromTag || !toTag) {
      throw new Error('标签不存在');
    }

    // 获取 from 标签关联的所有文章
    const [relations] = await pool.query(
      'SELECT news_id FROM news_tag_relations WHERE tag_id = ?',
      [fromTagId]
    );

    // 将这些文章关联到 to 标签（使用 INSERT IGNORE 避免重复）
    if (relations.length > 0) {
      const values = relations.map(r => [r.news_id, toTagId]);
      await pool.query(
        'INSERT IGNORE INTO news_tag_relations (news_id, tag_id) VALUES ?',
        [values]
      );

      // 更新 to 标签的使用次数
      await pool.query(
        `UPDATE news_tags SET usage_count = (
           SELECT COUNT(*) FROM news_tag_relations WHERE tag_id = ?
         ) WHERE id = ?`,
        [toTagId, toTagId]
      );
      await this.updateHeatScore(toTagId);
    }

    // 删除 from 标签及其关联
    await this.delete(fromTagId);

    return { merged: fromTag.name, into: toTag.name, affectedNewsCount: relations.length };
  }

  // 初始化默认标签数据
  static async seedDefaultTags() {
    const defaultTags = {
      'training-science': ['力量训练', 'HIIT', '功能性训练', '周期化训练', '动作技术', '运动生理', '新手入门'],
      'sports-nutrition': ['蛋白质', '碳水化合物', '脂肪', '补剂', '补水', '饮食时机', '维生素矿物质'],
      'muscle-building': ['增肌训练', '增肌饮食', '增肌补剂', '自然增肌', '新手增肌', '分化训练'],
      'fat-loss': ['减脂训练', '减脂饮食', 'HIIT燃脂', '局部塑形', '有氧训练', '饮食控制'],
      'recovery-injury': ['损伤预防', '康复训练', '拉伸放松', '睡眠恢复', '疼痛管理', '物理治疗'],
      'gear-equipment': ['自由重量', '器械测评', '运动护具', '运动服饰', '居家器材', '智能设备']
    };

    for (const [category, tagNames] of Object.entries(defaultTags)) {
      for (let i = 0; i < tagNames.length; i++) {
        const name = tagNames[i];
        let tag = await this.findByName(name);
        if (!tag) {
          await this.create({ name, category, isRecommended: true, sortOrder: i + 1 });
        } else if (!tag.category || tag.is_recommended === 0) {
          await this.update(tag.id, { category, isRecommended: true, sortOrder: i + 1 });
        }
      }
    }

    return this.findAll({ sort: 'usage' });
  }
}

module.exports = NewsTag;
