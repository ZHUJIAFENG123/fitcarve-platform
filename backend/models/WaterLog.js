const { pool } = require('../db');

class WaterLog {
  static async findByDate(userId, date) {
    const [rows] = await pool.query(
      'SELECT * FROM water_logs WHERE user_id = ? AND log_date = ? ORDER BY created_at',
      [userId, date]
    );
    return rows;
  }

  static async getDailyTotal(userId, date) {
    const [rows] = await pool.query(
      'SELECT COALESCE(SUM(amount_ml), 0) as total_ml FROM water_logs WHERE user_id = ? AND log_date = ?',
      [userId, date]
    );
    return rows[0]?.total_ml || 0;
  }

  static async getWeekSummary(userId, startDate, endDate) {
    const [rows] = await pool.query(
      `SELECT log_date, COALESCE(SUM(amount_ml), 0) as total_ml
       FROM water_logs WHERE user_id = ? AND log_date BETWEEN ? AND ?
       GROUP BY log_date ORDER BY log_date`,
      [userId, startDate, endDate]
    );
    return rows;
  }

  static async create(data) {
    const [result] = await pool.query(
      'INSERT INTO water_logs (user_id, log_date, amount_ml) VALUES (?, ?, ?)',
      [data.userId, data.logDate, data.amountMl || 250]
    );
    return { id: result.insertId, ...data };
  }

  static async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM water_logs WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = WaterLog;
