/**
 * 003: 为资讯文章匹配生成的配图
 * 用法: node backend/migrations/003_update_news_images.js
 * 
 * 根据文章主题，将每篇文章匹配到 public/news-images/ 下最合适的配图
 * 使用 title 模糊匹配（因为数据库没有 slug 列）
 */

const { pool } = require('../db');

// 文章标题关键词 → 配图路径 映射表
// 按子主题分组，同类文章共用一张配图
const imageMapping = [
  // ========== 训练科学 (training-science) - 13篇 → 5张配图 ==========
  // T1: 健身房全景/入门/新手 → 新手训练、热身指南、训练频率
  { keyword: '新手健身第一个月', image: '/news-images/training-science/T1-gym-panorama.jpg' },
  { keyword: '热身指南', image: '/news-images/training-science/T1-gym-panorama.jpg' },
  { keyword: '每周练几次', image: '/news-images/training-science/T1-gym-panorama.jpg' },
  // T2: 深蹲/动作细节 → 深蹲、复合动作、组间休息
  { keyword: '深蹲细节', image: '/news-images/training-science/T2-squat-form.jpg' },
  { keyword: '复合动作', image: '/news-images/training-science/T2-squat-form.jpg' },
  { keyword: '组间休息', image: '/news-images/training-science/T2-squat-form.jpg' },
  // T3: 训练日志/数据 → RPE、RIR、训练日志
  { keyword: 'RPE训练法', image: '/news-images/training-science/T3-training-log.jpg' },
  { keyword: 'RIR保留次数', image: '/news-images/training-science/T3-training-log.jpg' },
  { keyword: '训练日志', image: '/news-images/training-science/T3-training-log.jpg' },
  // T4: 高级技术 → 超级组、离心训练
  { keyword: '超级组', image: '/news-images/training-science/T4-advanced-techniques.jpg' },
  { keyword: '离心训练', image: '/news-images/training-science/T4-advanced-techniques.jpg' },
  // T5: 功能性训练 → 功能性vs健美、减载周
  { keyword: '功能性训练', image: '/news-images/training-science/T5-functional-training.jpg' },
  { keyword: '减载周', image: '/news-images/training-science/T5-functional-training.jpg' },

  // ========== 运动营养 (sports-nutrition) - 12篇 → 5张配图 ==========
  // N1: 健康餐食/蛋白质 → 蛋白质指南、蛋白粉、训练前后饮食
  { keyword: '蛋白质摄入完全指南', image: '/news-images/nutrition/N1-healthy-meal.jpg' },
  // N2: 碳水 → 碳水循环、碳水摄入时机
  { keyword: '碳水不是敌人', image: '/news-images/nutrition/N2-carb-foods.jpg' },
  { keyword: '碳水循环', image: '/news-images/nutrition/N2-carb-foods.jpg' },
  // N3: 补剂 → 补剂排行、微量营养素、LeanBulk
  { keyword: '蛋白粉到底要不要喝', image: '/news-images/nutrition/N3-supplements.jpg' },
  { keyword: '补剂排行', image: '/news-images/nutrition/N3-supplements.jpg' },
  { keyword: '微量营养素', image: '/news-images/nutrition/N3-supplements.jpg' },
  { keyword: 'LeanBulk', image: '/news-images/nutrition/N3-supplements.jpg' },
  // N4: 外出就餐/断食/酒精 → 间歇性断食、外出就餐
  { keyword: '间歇性断食', image: '/news-images/nutrition/N4-dining-out.jpg' },
  { keyword: '外出就餐', image: '/news-images/nutrition/N4-dining-out.jpg' },
  { keyword: '酒精', image: '/news-images/nutrition/N4-dining-out.jpg' },
  // N5: 三餐/食谱/热量 → 减脂食谱、一日三餐、热量控制
  { keyword: '一日三餐', image: '/news-images/nutrition/N5-three-meals.jpg' },
  { keyword: '热量控制', image: '/news-images/nutrition/N5-three-meals.jpg' },

  // ========== 增肌专区 (muscle-building) - 11篇 → 4张配图 ==========
  // M1: 上肢 → PPL、上肢编排、手臂专项
  { keyword: 'Push-Pull-Legs', image: '/news-images/muscle-gain/M1-upper-body.jpg' },
  { keyword: '上肢编排', image: '/news-images/muscle-gain/M1-upper-body.jpg' },
  { keyword: '手臂专项', image: '/news-images/muscle-gain/M1-upper-body.jpg' },
  // M2: 下肢 → 瘦子增肌、腿部训练
  { keyword: '瘦子增肌', image: '/news-images/muscle-gain/M2-lower-body.jpg' },
  { keyword: '腿部训练', image: '/news-images/muscle-gain/M2-lower-body.jpg' },
  // M3: 背部/核心 → 引体向上、核心训练、渐进超负荷
  { keyword: '渐进超负荷', image: '/news-images/muscle-gain/M3-back-training.jpg' },
  { keyword: '引体向上', image: '/news-images/muscle-gain/M3-back-training.jpg' },
  { keyword: '核心训练', image: '/news-images/muscle-gain/M3-back-training.jpg' },
  // M4: 增肌概念 → FFMI、新手福利期、训练量
  { keyword: '自然健身者第一年', image: '/news-images/muscle-gain/M4-muscle-concept.jpg' },
  { keyword: '新手福利期', image: '/news-images/muscle-gain/M4-muscle-concept.jpg' },
  { keyword: '训练量', image: '/news-images/muscle-gain/M4-muscle-concept.jpg' },

  // ========== 减脂塑形 (fat-loss) - 12篇 → 5张配图 ==========
  // F1: HIIT/有氧 → HIIT vs 稳态有氧
  { keyword: 'HIIT', image: '/news-images/fat-loss/F1-hiit-cardio.jpg' },
  { keyword: '稳态有氧', image: '/news-images/fat-loss/F1-hiit-cardio.jpg' },
  // F2: 女性力量 → 女性力量训练、女生减脂误区
  { keyword: '女生减脂', image: '/news-images/fat-loss/F2-women-strength.jpg' },
  { keyword: '女性力量', image: '/news-images/fat-loss/F2-women-strength.jpg' },
  // F3: 体态/姿势 → 体态纠正、圆肩驼背、骨盆前倾
  { keyword: '体态纠正', image: '/news-images/fat-loss/F3-posture.jpg' },
  { keyword: '圆肩驼背', image: '/news-images/fat-loss/F3-posture.jpg' },
  { keyword: '骨盆前倾', image: '/news-images/fat-loss/F3-posture.jpg' },
  { keyword: '姿势矫正', image: '/news-images/fat-loss/F3-posture.jpg' },
  // F4: 体重/测量 → 体重评估、反弹、小基数、代谢适应、TDEE
  { keyword: '体重评估', image: '/news-images/fat-loss/F4-body-composition.jpg' },
  { keyword: '反弹', image: '/news-images/fat-loss/F4-body-composition.jpg' },
  { keyword: '小基数', image: '/news-images/fat-loss/F4-body-composition.jpg' },
  { keyword: '代谢适应', image: '/news-images/fat-loss/F4-body-composition.jpg' },
  { keyword: 'TDEE', image: '/news-images/fat-loss/F4-body-composition.jpg' },
  // F5: NEAT/日常 → NEAT、步数、减脂期力量调整
  { keyword: '每天走1万步', image: '/news-images/fat-loss/F5-neat-lifestyle.jpg' },
  { keyword: 'NEAT', image: '/news-images/fat-loss/F5-neat-lifestyle.jpg' },

  // ========== 运动康复 (recovery-injury) - 9篇 → 4张配图 ==========
  // R1: 膝盖/下肢 → 膝关节、脚踝
  { keyword: '膝盖', image: '/news-images/rehabilitation/R1-knee-care.jpg' },
  { keyword: '脚踝', image: '/news-images/rehabilitation/R1-knee-care.jpg' },
  // R2: 肩关节/上肢 → 肩峰撞击、腕关节、网球肘
  { keyword: '肩峰撞击', image: '/news-images/rehabilitation/R2-shoulder-rehab.jpg' },
  { keyword: '腕关节', image: '/news-images/rehabilitation/R2-shoulder-rehab.jpg' },
  { keyword: '网球肘', image: '/news-images/rehabilitation/R2-shoulder-rehab.jpg' },
  // R3: 核心/拉伸 → 下背痛、核心稳定、DOMS
  { keyword: '下背痛', image: '/news-images/rehabilitation/R3-core-stretch.jpg' },
  { keyword: '核心稳定', image: '/news-images/rehabilitation/R3-core-stretch.jpg' },
  { keyword: 'DOMS', image: '/news-images/rehabilitation/R3-core-stretch.jpg' },
  // R4: 睡眠/恢复 → 睡眠、拉伸vs泡沫轴
  { keyword: '睡眠', image: '/news-images/rehabilitation/R4-sleep-recovery.jpg' },
  { keyword: '拉伸 vs 泡沫轴', image: '/news-images/rehabilitation/R4-sleep-recovery.jpg' },

  // ========== 健身装备 (gear-equipment) - 9篇 → 4张配图 ==========
  // G1: 哑铃/器材 → 哑铃选购、居家器材
  { keyword: '哑铃', image: '/news-images/equipment/G1-dumbbells.jpg' },
  { keyword: '居家器材', image: '/news-images/equipment/G1-dumbbells.jpg' },
  // G2: 深蹲架/史密斯 → 深蹲架vs史密斯
  { keyword: '深蹲架', image: '/news-images/equipment/G2-power-rack.jpg' },
  { keyword: '史密斯机', image: '/news-images/equipment/G2-power-rack.jpg' },
  // G3: 智能穿戴 → 心率监测、智能设备
  { keyword: '心率监测', image: '/news-images/equipment/G3-smart-wearables.jpg' },
  { keyword: '智能手表', image: '/news-images/equipment/G3-smart-wearables.jpg' },
  // G4: 护具/配件 → 护具、腰带、训练鞋、筋膜枪
  { keyword: '手套', image: '/news-images/equipment/G4-protective-gear.jpg' },
  { keyword: '腰带', image: '/news-images/equipment/G4-protective-gear.jpg' },
  { keyword: '护膝', image: '/news-images/equipment/G4-protective-gear.jpg' },
  { keyword: '护具', image: '/news-images/equipment/G4-protective-gear.jpg' },
  { keyword: '训练鞋', image: '/news-images/equipment/G4-protective-gear.jpg' },
  { keyword: '筋膜枪', image: '/news-images/equipment/G4-protective-gear.jpg' },
];

async function updateImages() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    let updated = 0;
    let skipped = 0;

    for (const { keyword, image } of imageMapping) {
      const [rows] = await connection.query(
        'SELECT id, title, image FROM news WHERE title LIKE ? AND image = ?',
        [`%${keyword}%`, '']
      );

      if (rows.length === 0) {
        continue; // 该文章可能还不存在或已设置过图片，静默跳过
      }

      for (const article of rows) {
        await connection.query(
          'UPDATE news SET image = ? WHERE id = ?',
          [image, article.id]
        );
        console.log(`   ✅ [${article.id}] ${article.title.substring(0, 40)}... → ${image}`);
        updated++;
      }
    }

    await connection.commit();
    console.log(`\n🎯 完成: 更新 ${updated} 篇`);
  } catch (error) {
    await connection.rollback();
    console.error('❌ 更新失败:', error.message);
    throw error;
  } finally {
    connection.release();
    process.exit(0);
  }
}

updateImages();