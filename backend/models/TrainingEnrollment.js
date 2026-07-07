const { pool } = require('../db');

/**
 * 训练计划报名记录 Model
 * 表：user_training_enrollments（UNIQUE(user_id, plan_id) 保证幂等）
 */
class TrainingEnrollment {
  /**
   * 报名（幂等：已存在记录则重置为 active 状态）
   * @returns {Promise<boolean>}
   */
  static async enroll(userId, planId) {
    await pool.query(
      `INSERT INTO user_training_enrollments (user_id, plan_id, status, progress_pct)
       VALUES (?, ?, 'active', 0)
       ON DUPLICATE KEY UPDATE status='active', progress_pct=0, completed_at=NULL`,
      [userId, planId]
    );
    return true;
  }

  /**
   * 取消报名
   * @returns {Promise<boolean>} 是否删除了记录
   */
  static async unenroll(userId, planId) {
    const [result] = await pool.query(
      'DELETE FROM user_training_enrollments WHERE user_id = ? AND plan_id = ?',
      [userId, planId]
    );
    return result.affectedRows > 0;
  }

  /**
   * 查询单条报名记录
   */
  static async findOne(userId, planId) {
    const [rows] = await pool.query(
      'SELECT * FROM user_training_enrollments WHERE user_id = ? AND plan_id = ?',
      [userId, planId]
    );
    return rows[0];
  }

  /**
   * 用户所有报名记录（JOIN training_plans 返回详情）
   */
  static async findByUser(userId) {
    const [rows] = await pool.query(
      `SELECT e.*, p.title, p.description, p.cover_image, p.goal, p.level,
              p.duration_weeks, p.days_per_week, p.coach, p.syllabus
       FROM user_training_enrollments e
       JOIN training_plans p ON e.plan_id = p.id
       WHERE e.user_id = ?
       ORDER BY e.enrolled_at DESC`,
      [userId]
    );
    return rows;
  }

  /**
   * 更新进度百分比（自动 clamp 到 0-100）
   */
  static async updateProgress(userId, planId, pct) {
    const clamped = Math.min(100, Math.max(0, pct));
    await pool.query(
      'UPDATE user_training_enrollments SET progress_pct = ? WHERE user_id = ? AND plan_id = ?',
      [clamped, userId, planId]
    );
    return true;
  }

  /**
   * 标记完成（status=completed, progress=100, completed_at=NOW()）
   */
  static async markCompleted(userId, planId) {
    await pool.query(
      `UPDATE user_training_enrollments
       SET status='completed', progress_pct=100, completed_at=NOW()
       WHERE user_id = ? AND plan_id = ?`,
      [userId, planId]
    );
    return true;
  }
}

module.exports = TrainingEnrollment;
