const { pool } = require('./db');

async function alterTable() {
  try {
    await pool.query('ALTER TABLE news ADD COLUMN summary VARCHAR(500) NOT NULL DEFAULT "" AFTER content');
    console.log('添加 summary 字段成功');
  } catch(e) {
    if (e.code === 'ER_DUP_FIELDNAME') {
      console.log('summary 字段已存在');
    } else {
      console.error('添加 summary 字段失败:', e.message);
    }
  }

  try {
    await pool.query('ALTER TABLE news ADD COLUMN tags VARCHAR(500) NOT NULL DEFAULT "" AFTER summary');
    console.log('添加 tags 字段成功');
  } catch(e) {
    if (e.code === 'ER_DUP_FIELDNAME') {
      console.log('tags 字段已存在');
    } else {
      console.error('添加 tags 字段失败:', e.message);
    }
  }

  try {
    await pool.query('ALTER TABLE news ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT "pending" AFTER author');
    console.log('添加 status 字段成功');
  } catch(e) {
    if (e.code === 'ER_DUP_FIELDNAME') {
      console.log('status 字段已存在');
    } else {
      console.error('添加 status 字段失败:', e.message);
    }
  }

  console.log('表结构更新完成');
  process.exit();
}

alterTable();