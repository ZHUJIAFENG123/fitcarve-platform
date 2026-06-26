const { pool } = require('../db');

class DietLog {
  static async findByUserDate(userId, date) {
    const [rows] = await pool.query(
      'SELECT * FROM diet_logs WHERE user_id = ? AND log_date = ? ORDER BY meal_type, created_at',
      [userId, date]
    );
    return rows;
  }

  static async getDailySummary(userId, date) {
    const [rows] = await pool.query(
      `SELECT 
        COALESCE(SUM(calories), 0) as total_calories,
        COALESCE(SUM(protein_g), 0) as total_protein,
        COALESCE(SUM(carbs_g), 0) as total_carbs,
        COALESCE(SUM(fat_g), 0) as total_fat
      FROM diet_logs WHERE user_id = ? AND log_date = ?`,
      [userId, date]
    );
    return rows[0] || { total_calories: 0, total_protein: 0, total_carbs: 0, total_fat: 0 };
  }

  static async getWeekSummary(userId, startDate, endDate) {
    const [rows] = await pool.query(
      `SELECT log_date, 
        COALESCE(SUM(calories), 0) as total_calories,
        COALESCE(SUM(protein_g), 0) as total_protein
      FROM diet_logs WHERE user_id = ? AND log_date BETWEEN ? AND ? 
      GROUP BY log_date ORDER BY log_date`,
      [userId, startDate, endDate]
    );
    return rows;
  }

  static async create(data) {
    const [result] = await pool.query(
      `INSERT INTO diet_logs (user_id, log_date, meal_type, food_id, food_name, amount_g, calories, protein_g, carbs_g, fat_g)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.userId, data.logDate, data.mealType, data.foodId || null, data.foodName, data.amountG,
       data.calories, data.proteinG || 0, data.carbsG || 0, data.fatG || 0]
    );
    return { id: result.insertId, ...data };
  }

  static async delete(id, userId) {
    const [result] = await pool.query('DELETE FROM diet_logs WHERE id = ? AND user_id = ?', [id, userId]);
    return result.affectedRows > 0;
  }

  static async deleteAllByDate(userId, date, mealType) {
    await pool.query('DELETE FROM diet_logs WHERE user_id = ? AND log_date = ? AND meal_type = ?', 
      [userId, date, mealType]);
  }
}

module.exports = DietLog;
