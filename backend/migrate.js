const { pool } = require('./db');
const fs = require('fs');
const path = require('path');

async function runAll() {
  // 001: news 表加字段
  const newsMigrations = [
    `ALTER TABLE news ADD COLUMN related_exercise_ids TEXT AFTER comment_count`,
    `ALTER TABLE news ADD COLUMN related_plan_ids TEXT AFTER related_exercise_ids`,
    `ALTER TABLE news ADD COLUMN evidence_tags VARCHAR(255) AFTER related_plan_ids`
  ];
  console.log('=== 001: news 关联字段 ===');
  for (const sql of newsMigrations) {
    try { await pool.query(sql); console.log(' ✅', sql.slice(0, 60)); }
    catch (e) { if (e.message.includes('Duplicate')) console.log(' ⏭️  已存在'); else console.error(' ❌', e.message); }
  }

  // 002: learning_paths 系列表
  console.log('\n=== 002: 学习路径 ===');
  const tables = [
    `CREATE TABLE IF NOT EXISTS learning_paths (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      cover_image VARCHAR(500),
      difficulty ENUM('beginner','intermediate','advanced') DEFAULT 'beginner',
      category VARCHAR(50),
      total_items INT DEFAULT 0,
      status ENUM('draft','published') DEFAULT 'published',
      creator VARCHAR(100),
      views INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS learning_path_items (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      path_id BIGINT NOT NULL,
      news_id BIGINT NOT NULL,
      title VARCHAR(200),
      sort_order INT DEFAULT 0,
      description TEXT,
      INDEX idx_path (path_id),
      INDEX idx_news (news_id)
    )`,
    `CREATE TABLE IF NOT EXISTS user_path_progress (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT NOT NULL,
      path_id BIGINT NOT NULL,
      item_id BIGINT NOT NULL,
      status ENUM('pending','in_progress','completed') DEFAULT 'pending',
      completed_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_user_item (user_id, item_id),
      INDEX idx_user_path (user_id, path_id)
    )`
  ];
  for (const sql of tables) {
    try { await pool.query(sql); console.log(' ✅ 表已创建/已存在'); }
    catch (e) { console.error(' ❌', e.message); }
  }

  // 插入种子数据
  console.log('\n=== 种子数据 ===');
  const [paths] = await pool.query('SELECT COUNT(*) as c FROM learning_paths');
  if (paths[0].c === 0) {
    // 创建学习路径
    const seeds = [
      { title: '健身入门必学', description: '从零开始建立正确的健身观念和动作基础', difficulty: 'beginner', category: 'knowledge', creator: 'admin', cover_image: '/images/01.jpg' },
      { title: '科学增肌全攻略', description: '深入理解肌肉生长原理，掌握增肌训练的核心技术', difficulty: 'intermediate', category: 'knowledge', creator: 'admin', cover_image: '/images/08.jpg' },
      { title: '运动营养基础课', description: '吃什么、什么时候吃、吃多少——营养与运动表现的完整指南', difficulty: 'beginner', category: 'nutrition', creator: 'admin', cover_image: '/images/15.jpg' },
      { title: '损伤预防与康复', description: '常见运动损伤的预防方法和科学的康复训练方案', difficulty: 'intermediate', category: 'recovery', creator: 'admin', cover_image: '/images/22.jpg' },
      { title: '高级训练方法论', description: '周期化训练、超负荷原则、恢复策略的深度解析', difficulty: 'advanced', category: 'knowledge', creator: 'admin', cover_image: '/images/30.jpg' }
    ];
    for (const s of seeds) {
      await pool.query(
        'INSERT INTO learning_paths (title, description, difficulty, category, creator, cover_image) VALUES (?,?,?,?,?,?)',
        [s.title, s.description, s.difficulty, s.category, s.creator, s.cover_image]
      );
    }

    // 每个路径添加文章作为学习项（取已有的 news 文章）
    const [news] = await pool.query('SELECT id, title FROM news ORDER BY views DESC LIMIT 25');
    const [allPaths] = await pool.query('SELECT id FROM learning_paths');
    const itemsPerPath = 5;
    let newsIdx = 0;
    for (const p of allPaths) {
      for (let i = 0; i < itemsPerPath; i++) {
        if (newsIdx >= news.length) break;
        await pool.query(
          'INSERT INTO learning_path_items (path_id, news_id, title, sort_order) VALUES (?,?,?,?)',
          [p.id, news[newsIdx].id, news[newsIdx].title, i]
        );
        newsIdx++;
      }
      await pool.query('UPDATE learning_paths SET total_items = ? WHERE id = ?', [itemsPerPath, p.id]);
    }
    console.log(` ✅ 创建了 ${allPaths.length} 个学习路径，${newsIdx} 个学习项`);
  } else {
    console.log(` ⏭️  已有 ${paths[0].c} 个路径，跳过种子数据`);
  }

  // 003: 教练模块
  console.log('\n=== 003: 教练模块 ===');
  const coachTables = [
    `CREATE TABLE IF NOT EXISTS coaches (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT NOT NULL,
      name VARCHAR(100) NOT NULL,
      avatar VARCHAR(500),
      title VARCHAR(200),
      bio TEXT,
      specialty VARCHAR(500),
      certifications TEXT,
      experience_years INT DEFAULT 0,
      education VARCHAR(200),
      hourly_rate DECIMAL(10,2) DEFAULT 0,
      max_students INT DEFAULT 20,
      rating DECIMAL(3,1) DEFAULT 0,
      review_count INT DEFAULT 0,
      student_count INT DEFAULT 0,
      verified TINYINT DEFAULT 0,
      status ENUM('pending','approved','rejected','suspended') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_user (user_id),
      INDEX idx_status (status)
    )`,
    `CREATE TABLE IF NOT EXISTS coach_students (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      coach_id BIGINT NOT NULL,
      user_id BIGINT NOT NULL,
      status ENUM('active','inactive') DEFAULT 'active',
      joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_coach (coach_id),
      INDEX idx_user (user_id),
      UNIQUE KEY unique_coach_user (coach_id, user_id)
    )`,
    `CREATE TABLE IF NOT EXISTS coach_reviews (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      coach_id BIGINT NOT NULL,
      user_id BIGINT NOT NULL,
      rating TINYINT NOT NULL,
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_coach (coach_id)
    )`
  ];
  for (const sql of coachTables) {
    try { await pool.query(sql); console.log(' ✅ 表已创建/已存在'); }
    catch (e) { console.error(' ❌', e.message); }
  }

  // 教练种子数据
  const [existingCoaches] = await pool.query('SELECT COUNT(*) as c FROM coaches');
  if (existingCoaches[0].c === 0) {
    const coachSeeds = [
      { name: '张教练', title: 'NSCA-CSCS 认证体能教练', bio: '10年体能训练经验，曾在国家队担任体能助理教练', specialty: '体能训练,增肌塑形', certifications: 'NSCA-CSCS, ACE-CPT', experienceYears: 10, education: '北京体育大学 运动人体科学' },
      { name: '李教练', title: 'ISSN 运动营养师', bio: '专注运动营养7年，帮助超500人实现身材目标', specialty: '营养指导,减脂塑形', certifications: 'ISSN-SNS, RD', experienceYears: 7, education: '中国农业大学 食品科学与营养工程' },
      { name: '王教练', title: 'ACSM 认证运动康复师', bio: '运动损伤预防和康复专家，前省级运动队康复师', specialty: '运动康复,体态矫正', certifications: 'ACSM-CEP', experienceYears: 8, education: '上海体育学院 运动康复' }
    ];
    for (const c of coachSeeds) {
      await pool.query(
        'INSERT INTO coaches (user_id, name, title, bio, specialty, certifications, experience_years, education, verified, status) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [0, c.name, c.title, c.bio, c.specialty, c.certifications, c.experienceYears, c.education, 1, 'approved']
      );
    }
    console.log(' ✅ 创建了 3 个种子教练');
  } else {
    console.log(` ⏭️  已有 ${existingCoaches[0].c} 个教练，跳过种子数据`);
  }

  // 004: news 加 video_url
  console.log('\n=== 004: news 视频字段 ===');
  try { await pool.query(`ALTER TABLE news ADD COLUMN video_url VARCHAR(500) AFTER evidence_tags`); console.log(' ✅ video_url 已添加'); }
  catch (e) { if (e.message.includes('Duplicate')) console.log(' ⏭️  已存在'); else console.error(' ❌', e.message); }

  process.exit(0);
}

runAll().catch(e => { console.error('迁移失败:', e); process.exit(1); });
