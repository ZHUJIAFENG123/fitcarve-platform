const { pool } = require('../db');
const TrainingEnrollment = require('./TrainingEnrollment');

/**
 * 训练打卡日志 Model
 * 表：training_logs（UNIQUE(user_id, plan_id, week, day) 保证同一天不重复）
 */
class TrainingLog {
  /**
   * 提交打卡（幂等：同 week+day 重复打卡只更新内容与时间）
   * 完成后自动重算报名进度
   */
  static async log(userId, planId, week, day, data = {}) {
    const {
      duration_minutes = null,
      notes = '',
      completed_exercises = null
    } = data;

    await pool.query(
      `INSERT INTO training_logs (user_id, plan_id, week, day, completed_exercises, duration_minutes, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         completed_exercises = COALESCE(VALUES(completed_exercises), completed_exercises),
         duration_minutes = COALESCE(VALUES(duration_minutes), duration_minutes),
         notes = COALESCE(NULLIF(VALUES(notes), ''), notes),
         completed_at = NOW()`,
      [userId, planId, week, day, JSON.stringify(completed_exercises), duration_minutes, notes]
    );

    // 自动更新报名进度
    await this.recalcProgress(userId, planId);
    return true;
  }

  /**
   * 重算进度：已打卡天数 / 计划总天数 * 100
   * 进度满 100% 时自动标记为 completed
   */
  static async recalcProgress(userId, planId) {
    const [[planRow]] = await pool.query(
      'SELECT syllabus FROM training_plans WHERE id = ?',
      [planId]
    );
    if (!planRow || !planRow.syllabus) return;

    let totalDays = 0;
    let syllabus = planRow.syllabus;
    if (typeof syllabus === 'string') {
      try { syllabus = JSON.parse(syllabus); } catch { return; }
    }
    for (const w of syllabus || []) {
      totalDays += (w.days?.length || 0);
    }
    if (totalDays === 0) return;

    const [[{ done }]] = await pool.query(
      'SELECT COUNT(*) AS done FROM training_logs WHERE user_id = ? AND plan_id = ?',
      [userId, planId]
    );
    const pct = Math.round((done / totalDays) * 100);
    await TrainingEnrollment.updateProgress(userId, planId, pct);
    if (pct >= 100) await TrainingEnrollment.markCompleted(userId, planId);
  }

  /**
   * 该用户该计划的所有打卡记录（按 week/day 升序）
   */
  static async findByUserPlan(userId, planId) {
    const [rows] = await pool.query(
      'SELECT * FROM training_logs WHERE user_id = ? AND plan_id = ? ORDER BY week, day',
      [userId, planId]
    );
    return rows;
  }

  /**
   * 日历视图：按月查询用户所有打卡（JOIN training_plans 取计划标题）
   */
  static async findByUserMonth(userId, year, month) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endMonth = month === 12 ? 1 : month + 1;
    const endYear = month === 12 ? year + 1 : year;
    const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;
    const [rows] = await pool.query(
      `SELECT l.*, p.title AS plan_title
       FROM training_logs l
       JOIN training_plans p ON l.plan_id = p.id
       WHERE l.user_id = ? AND l.completed_at >= ? AND l.completed_at < ?
       ORDER BY l.completed_at`,
      [userId, startDate, endDate]
    );
    return rows;
  }

  /**
   * 统计：总训练次数、总时长、最近训练时间、本周训练次数
   */
  static async getStats(userId) {
    const [[stats]] = await pool.query(
      `SELECT COUNT(*) AS total_sessions,
              COALESCE(SUM(duration_minutes), 0) AS total_minutes,
              MAX(completed_at) AS last_training
       FROM training_logs WHERE user_id = ?`,
      [userId]
    );
    // 本周训练次数（周一为一周起点）
    const [[weekStats]] = await pool.query(
      `SELECT COUNT(*) AS week_sessions
       FROM training_logs
       WHERE user_id = ? AND completed_at >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)`,
      [userId]
    );
    return { ...stats, ...weekStats };
  }
}

module.exports = TrainingLog;
