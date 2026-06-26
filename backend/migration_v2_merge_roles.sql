-- ============================================
-- 角色合并迁移脚本 v2.0
-- 将 coach 和 creator 角色合并至 user
-- 执行日期: 2026-05-15
-- ============================================

-- 1. 备份当前用户数据
CREATE TABLE IF NOT EXISTS users_backup_v1 AS SELECT * FROM users;

-- 2. 将 coach 角色用户迁移为 user
UPDATE users SET role = 'user' WHERE role = 'coach';

-- 3. 将 creator 角色用户迁移为 user
UPDATE users SET role = 'user' WHERE role = 'creator';

-- 4. 添加 is_content_creator 标记字段（表明该用户曾为创作者，保留历史记录）
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_content_creator TINYINT(1) DEFAULT 0;

-- 标记曾为 coach 的用户
UPDATE users SET is_content_creator = 1 
WHERE id IN (SELECT id FROM users_backup_v1 WHERE role IN ('coach', 'creator'));

-- 5. 所有用户的 content 权限现在默认开放（通过前端权限控制）
-- 无需修改 news/courses 表的 author/coach 字段

-- 6. 更新登录日志中的角色记录（可选）
-- UPDATE login_logs SET role = 'user' WHERE role IN ('coach', 'creator');

-- 7. 验证迁移结果
SELECT role, COUNT(*) as count FROM users GROUP BY role;
-- 预期结果: user 数量 = 原 user + coach + creator，admin 不变

-- ============================================
-- 回滚脚本（如需要恢复）
-- ============================================
-- UPDATE users u 
-- JOIN users_backup_v1 b ON u.id = b.id 
-- SET u.role = b.role;
-- DROP TABLE IF EXISTS users_backup_v1;
-- ALTER TABLE users DROP COLUMN IF EXISTS is_content_creator;
