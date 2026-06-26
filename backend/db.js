const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  database: process.env.MYSQL_DATABASE || 'community_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL 数据库连接成功');
    connection.release();
    return true;
  } catch (error) {
    console.error('MySQL 数据库连接失败:', error.message);
    return false;
  }
}

module.exports = { pool, testConnection };
