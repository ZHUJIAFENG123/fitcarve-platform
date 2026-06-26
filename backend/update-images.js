const { pool } = require('./db');

async function updateImages() {
  console.log('🖼 开始更新图片路径...\n');

  // ── News: assign by category ──
  const newsMap = {
    knowledge: ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg','07.jpg'],
    nutrition: ['08.jpg','09.jpg','10.jpg','11.jpg','12.jpg','13.jpg'],
    recovery:  ['14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg'],
    equipment: ['20.jpg','21.jpg','22.jpg','23.jpg','24.jpg']
  };

  for (const [cat, imgs] of Object.entries(newsMap)) {
    const [rows] = await pool.query('SELECT id FROM news WHERE category = ? ORDER BY id', [cat]);
    for (let i = 0; i < rows.length && i < imgs.length; i++) {
      await pool.query('UPDATE news SET image = ? WHERE id = ?', [`/images/${imgs[i]}`, rows[i].id]);
    }
    console.log(`  ✅ news / ${cat}: ${Math.min(rows.length, imgs.length)} 张`);
  }

  // ── Training plans: assign by goal ──
  const trainingMap = {
    build_muscle: ['25.jpg','26.jpg','27.jpg'],
    lose_fat:     ['28.jpg','29.jpg','30.jpg'],
    endurance:    ['31.jpg','32.jpg'],
    flexibility:  ['33.jpg','34.jpg'],
    general:      ['35.jpg','36.jpg']
  };

  for (const [goal, imgs] of Object.entries(trainingMap)) {
    const [rows] = await pool.query('SELECT id FROM training_plans WHERE goal = ? ORDER BY id', [goal]);
    for (let i = 0; i < rows.length && i < imgs.length; i++) {
      await pool.query('UPDATE training_plans SET cover_image = ? WHERE id = ?', [`/images/${imgs[i]}`, rows[i].id]);
    }
    console.log(`  ✅ training / ${goal}: ${Math.min(rows.length, imgs.length)} 张`);
  }

  // ── Diet plans: assign by goal ──
  const dietMap = {
    build_muscle: ['37.jpg','38.jpg','39.jpg'],
    lose_fat:     ['40.jpg','41.jpg','42.jpg'],
    maintenance:  ['43.jpg','44.jpg']
  };

  for (const [goal, imgs] of Object.entries(dietMap)) {
    const [rows] = await pool.query('SELECT id FROM diet_plans WHERE goal = ? ORDER BY id', [goal]);
    for (let i = 0; i < rows.length && i < imgs.length; i++) {
      await pool.query('UPDATE diet_plans SET cover_image = ? WHERE id = ?', [`/images/${imgs[i]}`, rows[i].id]);
    }
    console.log(`  ✅ diet / ${goal}: ${Math.min(rows.length, imgs.length)} 张`);
  }

  console.log('\n🎉 图片路径更新完成！');
  process.exit(0);
}

updateImages().catch(e => { console.error(e); process.exit(1); });
