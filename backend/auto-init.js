/**
 * 自动初始化数据库表结构
 * 启动时读取 schema-cloudbase.sql，逐条执行 CREATE TABLE 语句
 * 如果表已存在则跳过（IF NOT EXISTS）
 */
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function autoInit() {
  try {
    console.log('🔄 检查数据库表结构...');

    const sqlPath = path.join(__dirname, 'schema-cloudbase.sql');
    if (!fs.existsSync(sqlPath)) {
      console.log('⚠️  未找到 schema-cloudbase.sql，跳过自动建表');
      return;
    }

    const sql = fs.readFileSync(sqlPath, 'utf-8');

    // 按分号拆分 SQL 语句，过滤空行和注释
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let created = 0;
    let skipped = 0;

    for (const stmt of statements) {
      try {
        await pool.query(stmt);
        created++;
      } catch (err) {
        // 表已存在或轻微错误，继续
        skipped++;
      }
    }

    console.log(`✅ 数据库初始化完成：成功 ${created} 条，跳过 ${skipped} 条`);
  } catch (error) {
    console.error('❌ 数据库自动初始化失败:', error.message);
    // 不阻塞服务启动，数据库问题可以后续修复
  }
}

module.exports = autoInit;

// 直接运行时执行初始化
if (require.main === module) {
  autoInit().then(() => process.exit(0));
}
