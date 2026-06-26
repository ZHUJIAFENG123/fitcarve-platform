/**
 * 一键导入所有种子数据
 * 用法: node backend/seed-all.js
 * 
 * 数据来自 seed/ 目录:
 * - news: 12篇补充资讯
 * - exercises: 60个动作
 * - foods: 120种食物
 * - training_plans: 12套训练计划
 * - diet_plans: 8套饮食方案
 */

const { pool } = require('./db');
const path = require('path');

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
    // ========== 1. News ==========
    console.log('📰 导入资讯...');
    const news = loadSeed('news');
    for (const item of news) {
      await conn.query(
        `INSERT INTO news (title, content, summary, tags, image, category, author, status, views, publish_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', ?, ?)`,
        [item.title, item.content, item.summary, item.tags, item.image || '', item.category, item.author, item.views || 0, item.created_at || new Date()]
      );
    }
    console.log(`   ✅ ${news.length} 篇资讯导入完成`);

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
    console.log('🍎 导入食物库...');
    const foods = loadSeed('foods');
    for (const item of foods) {
      await conn.query(
        `INSERT INTO foods (name, category, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, serving_size, serving_unit)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.name, item.category, item.calories_per_100g, item.protein_per_100g, item.carbs_per_100g, item.fat_per_100g, item.fiber_per_100g || 0, item.serving_size || 100, item.serving_unit || 'g']
      );
    }
    console.log(`   ✅ ${foods.length} 种食物导入完成`);

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
    console.log(`   资讯: ${news.length} 篇`);
    console.log(`   动作: ${exercises.length} 个`);
    console.log(`   食物: ${foods.length} 种`);
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
