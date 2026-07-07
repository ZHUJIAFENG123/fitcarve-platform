-- P0 迁移：为 news 表添加关联字段和循证标签字段
-- 执行方式：在 MySQL 客户端中运行此文件，或执行：
--   mysql -u <user> -p <database> < backend/migrations/001_add_news_relation_fields.sql

ALTER TABLE news
  ADD COLUMN IF NOT EXISTS related_exercise_ids TEXT AFTER comment_count,
  ADD COLUMN IF NOT EXISTS related_plan_ids TEXT AFTER related_exercise_ids,
  ADD COLUMN IF NOT EXISTS evidence_tags VARCHAR(255) AFTER related_plan_ids;

-- 说明：
--   related_exercise_ids : 逗号分隔的动作 ID，如 "1,5,12"
--   related_plan_ids     : 逗号分隔的训练计划 ID，如 "3,7"
--   evidence_tags        : 逗号分隔的循证标签，如 "acsm,research"
