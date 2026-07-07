const { pool } = require('../db');

class NewsCategory {
  // 获取所有分类（按 sort_order 排序）
  static async findAll(options = {}) {
    const { includeInactive = false } = options;
    let query = 'SELECT * FROM news_categories';
    const params = [];

    if (!includeInactive) {
      query += ' WHERE is_active = 1';
    }

    query += ' ORDER BY sort_order ASC, id ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  // 按 key 查询
  static async findByKey(keyName) {
    const [rows] = await pool.query(
      'SELECT * FROM news_categories WHERE key_name = ?',
      [keyName]
    );
    return rows[0];
  }

  // 按 ID 查询
  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM news_categories WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // 创建分类
  static async create(categoryData) {
    const { keyName, name, description = '', icon = '', color = '#1890ff', sortOrder = 0 } = categoryData;
    const [result] = await pool.query(
      `INSERT INTO news_categories (key_name, name, description, icon, color, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [keyName, name, description, icon, color, sortOrder]
    );
    return { id: result.insertId, ...categoryData };
  }

  // 更新分类
  static async update(id, categoryData) {
    const fields = [];
    const values = [];

    const fieldMap = {
      keyName: 'key_name',
      name: 'name',
      description: 'description',
      icon: 'icon',
      color: 'color',
      sortOrder: 'sort_order',
      isActive: 'is_active'
    };

    for (const [key, dbField] of Object.entries(fieldMap)) {
      if (categoryData[key] !== undefined) {
        fields.push(`${dbField} = ?`);
        values.push(categoryData[key]);
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await pool.query(
      `UPDATE news_categories SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  // 删除分类
  static async delete(id) {
    // 先检查是否有关联文章
    const category = await this.findById(id);
    if (!category) return false;

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as count FROM news WHERE category = ?',
      [category.key_name]
    );

    if (countResult[0].count > 0) {
      throw new Error('该分类下还有文章，无法删除');
    }

    await pool.query('DELETE FROM news_categories WHERE id = ?', [id]);
    return true;
  }

  // 更新文章计数
  static async updateArticleCount(categoryKey) {
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as count FROM news WHERE category = ? AND status = ?',
      [categoryKey, 'approved']
    );
    const count = countResult[0].count;

    await pool.query(
      'UPDATE news_categories SET article_count = ?, updated_at = NOW() WHERE key_name = ?',
      [count, categoryKey]
    );
    return count;
  }

  // 批量更新所有分类的文章计数
  static async updateAllArticleCounts() {
    const categories = await this.findAll({ includeInactive: true });
    for (const cat of categories) {
      await this.updateArticleCount(cat.key_name);
    }
    return true;
  }

  // 批量调整排序
  static async reorder(orderedIds) {
    // orderedIds: [id1, id2, id3, ...] 按顺序排列
    const promises = orderedIds.map((id, index) =>
      pool.query('UPDATE news_categories SET sort_order = ?, updated_at = NOW() WHERE id = ?', [index, id])
    );
    await Promise.all(promises);
    return true;
  }

  // 初始化默认分类数据
  static async seedDefaultCategories() {
    const defaultCategories = [
      { keyName: 'training-science', name: '训练科学', description: '力量训练原理、训练计划设计、动作技术分析、周期化训练、运动生理学', icon: '💪', color: '#1B6B3A', sortOrder: 1 },
      { keyName: 'sports-nutrition', name: '运动营养', description: '宏量营养素、微量营养素、补剂指南、运动补水、饮食时机', icon: '🥗', color: '#F97316', sortOrder: 2 },
      { keyName: 'muscle-building', name: '增肌专区', description: '增肌训练法、增肌饮食、增肌补剂、新手增肌、自然增肌', icon: '🏋️', color: '#DC2626', sortOrder: 3 },
      { keyName: 'fat-loss', name: '减脂塑形', description: '减脂训练、减脂饮食、HIIT、局部塑形、产后恢复', icon: '🔥', color: '#EA580C', sortOrder: 4 },
      { keyName: 'recovery-injury', name: '运动康复', description: '运动损伤预防与康复、拉伸放松、睡眠恢复、疼痛管理', icon: '🩹', color: '#2563EB', sortOrder: 5 },
      { keyName: 'gear-equipment', name: '健身装备', description: '器材选购、装备测评、运动护具、运动服饰', icon: '🎽', color: '#7C3AED', sortOrder: 6 }
    ];

    for (const cat of defaultCategories) {
      const existing = await this.findByKey(cat.keyName);
      if (!existing) {
        await this.create(cat);
      }
    }

    return this.findAll();
  }
}

module.exports = NewsCategory;
