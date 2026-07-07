/**
 * 一键导入所有种子数据
 * 用法: node backend/seed-all.js
 * 
 * 数据来自 seed/ 目录:
 * - news: 30篇高质量资讯
 * - exercises: 60个动作
 * - foods: 120种食物
 * - training_plans: 12套训练计划
 * - diet_plans: 8套饮食方案
 */

const { pool } = require('./db');
const path = require('path');
const NewsCategory = require('./models/NewsCategory');

// 动态加载 seed 数据（避免 ESM/CJS 冲突）
function loadSeed(name) {
  const filePath = path.join(__dirname, '..', 'seed', `${name}.js`);
  delete require.cache[require.resolve(filePath)];
  return require(filePath);
}

async function seedAll() {
  console.log('🚀 开始导入种子数据...\n');

  const conn = await pool.getConnection();
  try {
    // ========== 0. 清理旧资讯数据 ==========
    console.log('🧹 清理旧资讯数据...');
    await conn.query('DELETE FROM news_tag_relations');
    await conn.query('DELETE FROM news_reports');
    await conn.query('DELETE FROM news');
    console.log('   ✅ 旧资讯数据已清理');

    // ========== 0b. 初始化分类 ==========
    console.log('📂 初始化资讯分类...');
    const categories = await NewsCategory.seedDefaultCategories();
    console.log(`   ✅ ${categories.length} 个分类已就绪`);

    // ========== 1. News ==========
    console.log('📰 导入资讯...');
    const news = loadSeed('news');
    let newsInserted = 0;
    for (const item of news) {
      // 跳过没有标题或内容的占位条目
      if (!item.title || !item.content) continue;
      // 计算字数和阅读时长
      const plainText = item.content.replace(/<[^>]+>/g, '');
      const wordCount = plainText.length;
      const readTimeMin = Math.max(1, Math.ceil(wordCount / 500));
      await conn.query(
        `INSERT INTO news (title, content, summary, tags, image, category, author, status, views, word_count, read_time_min, publish_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', ?, ?, ?, ?)`,
        [item.title, item.content, item.summary, item.tags, item.image || '', item.category, item.author, item.views || 0, wordCount, readTimeMin, item.created_at || new Date()]
      );
      newsInserted++;
    }
    console.log(`   ✅ ${newsInserted} 篇资讯导入完成（跳过 ${news.length - newsInserted} 篇占位）`);

    // 修正浏览量（模拟真实用户行为）
    console.log('📊 修正资讯浏览量...');
    const viewOverrides = {
      '新手健身第一个月': { views: 6280, comments: 58 },
      'RPE训练法入门': { views: 2350, comments: 22 },
      '5个你一直在做错的深蹲': { views: 5340, comments: 67 },
      '每周练几次效果最好': { views: 2950, comments: 33 },
      '碳水不是敌人': { views: 4720, comments: 41 },
      '减脂期一日三餐': { views: 6850, comments: 72 },
      '健身人群蛋白质摄入': { views: 7850, comments: 89 },
      '蛋白粉到底要不要喝': { views: 6520, comments: 95 },
      '自然健身者第一年': { views: 2780, comments: 61 },
      '瘦子增肌指南': { views: 2180, comments: 46 },
      'Push-Pull-Legs': { views: 1720, comments: 24 },
      '渐进超负荷实操手册': { views: 1860, comments: 19 },
      '每天走1万步': { views: 7230, comments: 76 },
      '减脂3个月体脂不动': { views: 1320, comments: 29 },
      '女生减脂塑形常见误区': { views: 4960, comments: 83 },
      '减脂的底层逻辑': { views: 2640, comments: 37 },
      '膝盖疼还能深蹲': { views: 4350, comments: 52 },
      '下背痛的3个常见原因': { views: 2050, comments: 31 },
      '肩峰撞击综合征': { views: 3280, comments: 44 },
      '训练后拉伸 vs 泡沫轴': { views: 4180, comments: 48 },
      '2026年家用哑铃选购': { views: 3520, comments: 28 },
      '健身手套、腰带、护膝': { views: 1580, comments: 17 },
      '心率监测设备对比': { views: 3860, comments: 35 },
      '深蹲架 vs 史密斯机': { views: 1450, comments: 21 },
    };
    const [insertedNews] = await conn.query('SELECT id, title FROM news');
    for (const n of insertedNews) {
      for (const [key, val] of Object.entries(viewOverrides)) {
        if (n.title.startsWith(key)) {
          await conn.query('UPDATE news SET views = ?, comment_count = ? WHERE id = ?', [val.views, val.comments, n.id]);
          break;
        }
      }
    }
    console.log('   ✅ 浏览量已修正');

    // 关联配图（从 public/news-images 目录按分类匹配）
    console.log('🖼  关联资讯配图...');
    const CATEGORY_IMAGE_MAP = {
      'training-science': { dir: 'training-science', prefix: 'T' },
      'sports-nutrition': { dir: 'nutrition', prefix: 'N' },
      'muscle-building':  { dir: 'muscle-gain', prefix: 'M' },
      'fat-loss':         { dir: 'fat-loss', prefix: 'F' },
      'recovery-injury':  { dir: 'rehabilitation', prefix: 'R' },
      'gear-equipment':   { dir: 'equipment', prefix: 'G' }
    };
    const fs = require('fs');
    const imagesBase = path.join(__dirname, '..', 'public', 'news-images');
    function getImgsForCat(cat) {
      const map = CATEGORY_IMAGE_MAP[cat];
      if (!map) return [];
      const dir = path.join(imagesBase, map.dir);
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir)
        .filter(f => f.startsWith(map.prefix) && /\.(jpg|png|webp)$/i.test(f))
        .sort()
        .map(f => `/news-images/${map.dir}/${f}`);
    }
    const [newsForImg] = await conn.query('SELECT id, category FROM news ORDER BY category, id');
    const imgByCat = {};
    for (const cat of Object.keys(CATEGORY_IMAGE_MAP)) imgByCat[cat] = getImgsForCat(cat);
    const catCounter = {};
    let imgUpdated = 0;
    for (const n of newsForImg) {
      const imgs = imgByCat[n.category] || [];
      if (imgs.length === 0) continue;
      const idx = (catCounter[n.category] || 0) % imgs.length;
      catCounter[n.category] = (catCounter[n.category] || 0) + 1;
      await conn.query('UPDATE news SET image = ? WHERE id = ?', [imgs[idx], n.id]);
      imgUpdated++;
    }
    console.log(`   ✅ ${imgUpdated} 篇配图已关联`);

    // 更新分类文章计数
    await NewsCategory.updateAllArticleCounts();
    console.log('   ✅ 分类文章计数已更新');

    // ========== 1b. 初始化标签数据 ==========
    console.log('🏷  初始化资讯标签...');
    await conn.query('DELETE FROM news_tag_relations');
    await conn.query('DELETE FROM news_tags');
    const [allNewsForTags] = await conn.query('SELECT id, tags, category FROM news');
    const tagMap = {};  // name -> { count, categories }
    for (const article of allNewsForTags) {
      if (!article.tags) continue;
      const tagNames = article.tags.split(',').map(t => t.trim()).filter(Boolean);
      for (const name of tagNames) {
        if (!tagMap[name]) tagMap[name] = { count: 0, categories: new Set() };
        tagMap[name].count++;
        tagMap[name].categories.add(article.category);
      }
    }
    // 按使用次数排序，分配热度分数
    const sortedTags = Object.entries(tagMap)
      .sort((a, b) => b[1].count - a[1].count);
    const slugify = (str) => str.replace(/[^\w\u4e00-\u9fa5]/g, '-').toLowerCase();
    let tagOrder = 0;
    for (const [name, info] of sortedTags) {
      const cat = [...info.categories][0] || '';
      const heatScore = info.count * 10 + Math.max(0, 30 - tagOrder) * 2;
      const isRecommended = tagOrder < 10 ? 1 : 0;
      const [tagResult] = await conn.query(
        `INSERT INTO news_tags (name, slug, category, usage_count, heat_score, is_recommended, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, slugify(name), cat, info.count, heatScore, isRecommended, tagOrder]
      );
      // 关联到所有使用该标签的文章
      for (const article of allNewsForTags) {
        if (!article.tags) continue;
        const tagNames = article.tags.split(',').map(t => t.trim()).filter(Boolean);
        if (tagNames.includes(name)) {
          await conn.query(
            'INSERT IGNORE INTO news_tag_relations (news_id, tag_id) VALUES (?, ?)',
            [article.id, tagResult.insertId]
          );
        }
      }
      tagOrder++;
    }
    console.log(`   ✅ ${sortedTags.length} 个标签初始化完成，关联已建立`);

    // ========== 2. Exercises ==========
    console.log('🏃 导入动作库...');
    const exercises = loadSeed('exercises');
    for (const item of exercises) {
      await conn.query(
        `INSERT INTO exercises (name, category, muscle_group, equipment, difficulty, instructions, tips, calories_per_30min)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.name, item.category, item.muscle_group, item.equipment || '', item.difficulty, item.instructions || '', item.tips || '', item.calories_per_30min || 0]
      );
    }
    console.log(`   ✅ ${exercises.length} 个动作导入完成`);

    // ========== 3. Foods ==========
    // 注意: 食物库数据已改用薄荷网数据库，请通过 seed-boohee.js 导入
    // node backend/seed-boohee.js
    console.log('🍎 食物库请使用 seed-boohee.js 导入薄荷网数据');

    // ========== 4. Training Plans ==========
    console.log('📋 导入训练计划...');
    const trainingPlans = loadSeed('training_plans');
    for (const item of trainingPlans) {
      await conn.query(
        `INSERT INTO training_plans (title, description, cover_image, goal, level, duration_weeks, days_per_week, equipment, coach, syllabus)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.title, item.description || '', item.cover_image || '', item.goal, item.level,
         item.duration_weeks, item.days_per_week, item.equipment || '', item.coach,
         JSON.stringify(item.syllabus)]
      );
    }
    console.log(`   ✅ ${trainingPlans.length} 套训练计划导入完成`);

    // ========== 5. Diet Plans ==========
    console.log('🍽 导入饮食方案...');
    const dietPlans = loadSeed('diet_plans');
    for (const item of dietPlans) {
      await conn.query(
        `INSERT INTO diet_plans (title, description, cover_image, goal, daily_calories, protein_g, carbs_g, fat_g, meals, author)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.title, item.description || '', item.cover_image || '', item.goal, item.daily_calories,
         item.protein_g, item.carbs_g, item.fat_g, JSON.stringify(item.meals), item.author]
      );
    }
    console.log(`   ✅ ${dietPlans.length} 套饮食方案导入完成`);

    // ========== 统计 ==========
    console.log('\n📊 导入汇总：');
    console.log(`   资讯: ${newsInserted} 篇`);
    console.log(`   动作: ${exercises.length} 个`);
    console.log(`   食物: 请通过 seed-boohee.js 导入`);
    console.log(`   训练计划: ${trainingPlans.length} 套`);
    console.log(`   饮食方案: ${dietPlans.length} 套`);
    console.log('\n🎉 全部种子数据导入完成！');

  } catch (err) {
    console.error('❌ 导入失败:', err.message);
    throw err;
  } finally {
    conn.release();
    process.exit(0);
  }
}

seedAll();
