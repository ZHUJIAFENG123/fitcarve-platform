-- ============================================
-- 健身资讯网站 - 数据库建表脚本
-- 数据库: community_db
-- 字符集: utf8mb4
-- ============================================

CREATE DATABASE IF NOT EXISTS community_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE community_db;

-- -------------------------------------------
-- 1. 用户表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id                    INT             NOT NULL AUTO_INCREMENT  COMMENT '用户ID',
  username              VARCHAR(50)     NOT NULL                COMMENT '用户名',
  email                 VARCHAR(100)    NOT NULL                COMMENT '电子邮箱',
  password              VARCHAR(255)    NOT NULL                COMMENT '加密密码(bcrypt)',
  role                  VARCHAR(20)     NOT NULL DEFAULT 'user' COMMENT '角色: admin/coach/creator/user',
  avatar_url            VARCHAR(255)    NOT NULL DEFAULT ''     COMMENT '头像图片URL',
  bio                   TEXT            NULL                    COMMENT '个人简介',
  signature             VARCHAR(255)    NOT NULL DEFAULT ''     COMMENT '个性签名',
  is_verified           TINYINT(1)      NOT NULL DEFAULT 0      COMMENT '邮箱是否已验证: 0未验证/1已验证',
  verification_token    VARCHAR(64)     NULL                    COMMENT '邮箱验证令牌',
  reset_password_token  VARCHAR(64)     NULL                    COMMENT '密码重置令牌',
  reset_password_expires DATETIME       NULL                    COMMENT '密码重置令牌过期时间',
  last_login            DATETIME        NULL                    COMMENT '最后登录时间',
  created_at            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_username (username),
  UNIQUE KEY uk_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- -------------------------------------------
-- 2. 资讯表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS news (
  id            INT             NOT NULL AUTO_INCREMENT  COMMENT '资讯ID',
  title         VARCHAR(200)    NOT NULL                COMMENT '资讯标题',
  content       LONGTEXT        NOT NULL                COMMENT '资讯正文(富文本HTML)',
  summary       VARCHAR(500)    NOT NULL DEFAULT ''     COMMENT '资讯摘要',
  tags          VARCHAR(500)    NOT NULL DEFAULT ''     COMMENT '标签，逗号分隔',
  image         VARCHAR(255)    NOT NULL DEFAULT ''     COMMENT '封面图片URL',
  category      VARCHAR(50)     NOT NULL                COMMENT '分类: knowledge/nutrition/recovery/equipment',
  author        VARCHAR(50)     NOT NULL                COMMENT '创作者用户名',
  status        VARCHAR(20)     NOT NULL DEFAULT 'pending' COMMENT '审核状态: pending/approved/rejected',
  audit_by      VARCHAR(50)     NULL                    COMMENT '审核人用户名',
  audit_at      DATETIME        NULL                    COMMENT '审核时间',
  reject_reason TEXT            NULL                    COMMENT '驳回原因',
  views         INT             NOT NULL DEFAULT 0       COMMENT '浏览量',
  comment_count INT             NOT NULL DEFAULT 0       COMMENT '评论总数',
  publish_date  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布日期',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  INDEX idx_category (category),
  INDEX idx_author (author),
  INDEX idx_status (status),
  INDEX idx_publish_date (publish_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯表';

-- -------------------------------------------
-- 3. 课程表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
  id              INT             NOT NULL AUTO_INCREMENT  COMMENT '课程ID',
  title           VARCHAR(200)    NOT NULL                COMMENT '课程标题',
  description     TEXT            NOT NULL                COMMENT '课程描述(富文本)',
  image           VARCHAR(255)    NOT NULL DEFAULT ''     COMMENT '封面图片URL',
  coach           VARCHAR(50)     NOT NULL                COMMENT '教练用户名',
  level           VARCHAR(20)     NOT NULL                COMMENT '难度: beginner/intermediate/advanced',
  price           DECIMAL(10,2)   NOT NULL DEFAULT 0.00   COMMENT '课程价格(元)',
  category        VARCHAR(50)     NOT NULL                COMMENT '分类: yoga/strength/cardio/pilates/knowledge/nutrition/recovery',
  views           INT             NOT NULL DEFAULT 0       COMMENT '浏览量',
  rating          DECIMAL(2,1)    NOT NULL DEFAULT 0.0     COMMENT '平均评分(1.0~5.0)',
  enrolled        INT             NOT NULL DEFAULT 0       COMMENT '报名/学习人数',
  syllabus        TEXT            NULL                    COMMENT '课程大纲(JSON): [{title,description,duration}]',
  target_audience TEXT            NULL                    COMMENT '适用人群(JSON数组)',
  highlights      TEXT            NULL                    COMMENT '课程亮点(JSON数组)',
  outcomes        TEXT            NULL                    COMMENT '学习成果(JSON数组)',
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (id),
  INDEX idx_coach (coach),
  INDEX idx_category (category),
  INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程表';

-- -------------------------------------------
-- 4. 评论表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS comments (
  id          INT             NOT NULL AUTO_INCREMENT  COMMENT '评论ID',
  content     TEXT            NOT NULL                COMMENT '评论内容',
  user_id     INT             NOT NULL                COMMENT '评论者用户ID',
  username    VARCHAR(50)     NOT NULL                COMMENT '评论者用户名(冗余)',
  target_type VARCHAR(20)     NOT NULL                COMMENT '目标类型: news/course',
  target_id   INT             NOT NULL                COMMENT '目标ID',
  rating      INT             NULL                    COMMENT '评分(1~5)',
  parent_id   INT             NULL                    COMMENT '父评论ID，实现嵌套回复',
  likes       INT             NOT NULL DEFAULT 0       COMMENT '点赞数',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id),
  INDEX idx_user_id (user_id),
  INDEX idx_target (target_type, target_id),
  INDEX idx_parent_id (parent_id),
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_parent FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论表';

-- -------------------------------------------
-- 5. 用户互动表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS interactions (
  id          INT             NOT NULL AUTO_INCREMENT  COMMENT '互动记录ID',
  user_id     INT             NOT NULL                COMMENT '用户ID',
  target_type VARCHAR(20)     NOT NULL                COMMENT '目标类型: news/course/comment',
  target_id   INT             NOT NULL                COMMENT '目标ID',
  type        VARCHAR(20)     NOT NULL                COMMENT '互动类型: like/favorite/share',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_user_target_type (user_id, target_type, target_id, type),
  INDEX idx_user_id (user_id),
  INDEX idx_target (target_type, target_id),
  CONSTRAINT fk_interactions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户互动表';

-- -------------------------------------------
-- 6. 通知表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id          INT             NOT NULL AUTO_INCREMENT  COMMENT '通知ID',
  user_id     INT             NOT NULL                COMMENT '接收用户ID',
  type        VARCHAR(50)     NOT NULL                COMMENT '通知类型: system/comment/audit/interaction',
  title       VARCHAR(200)    NOT NULL                COMMENT '通知标题',
  content     TEXT            NOT NULL                COMMENT '通知内容',
  link        VARCHAR(255)    NULL                    COMMENT '关联跳转链接',
  is_read     TINYINT(1)      NOT NULL DEFAULT 0       COMMENT '是否已读: 0未读/1已读',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id),
  INDEX idx_user_id (user_id),
  INDEX idx_is_read_user (user_id, is_read),
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通知表';

-- -------------------------------------------
-- 7. 内容版本历史表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS versions (
  id          INT             NOT NULL AUTO_INCREMENT  COMMENT '版本记录ID',
  target_type VARCHAR(20)     NOT NULL                COMMENT '版本类型: news/course',
  target_id   INT             NOT NULL                COMMENT '目标ID',
  version     INT             NOT NULL                COMMENT '版本号(从1递增)',
  content     TEXT            NOT NULL                COMMENT '版本快照(完整对象JSON)',
  author      VARCHAR(50)     NOT NULL                COMMENT '修改者用户名',
  reason      TEXT            NULL                    COMMENT '修改原因',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id),
  INDEX idx_target (target_type, target_id),
  INDEX idx_target_version (target_type, target_id, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='内容版本历史表';

-- -------------------------------------------
-- 4. Newsletter subscribers
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          INT             NOT NULL AUTO_INCREMENT  COMMENT '订阅ID',
  email       VARCHAR(255)    NOT NULL                COMMENT '邮箱地址',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订阅时间',
  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Newsletter订阅表';

-- -------------------------------------------
-- 5. Training Plans (训练计划)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS training_plans (
  id            INT             NOT NULL AUTO_INCREMENT  COMMENT '计划ID',
  title         VARCHAR(200)    NOT NULL                COMMENT '计划标题',
  description   TEXT            NULL                    COMMENT '计划描述',
  cover_image   VARCHAR(255)    DEFAULT ''              COMMENT '封面图',
  goal          VARCHAR(20)     NOT NULL                COMMENT '目标: build_muscle/lose_fat/endurance/flexibility/general',
  level         VARCHAR(20)     NOT NULL                COMMENT '难度: beginner/intermediate/advanced',
  duration_weeks INT            NOT NULL DEFAULT 4      COMMENT '训练周期(周)',
  days_per_week INT             NOT NULL DEFAULT 4      COMMENT '每周训练天数',
  equipment     VARCHAR(255)    DEFAULT ''              COMMENT '所需器材,逗号分隔',
  coach         VARCHAR(50)     NOT NULL                COMMENT '作者',
  views         INT             DEFAULT 0               COMMENT '浏览量',
  enrolled      INT             DEFAULT 0               COMMENT '参与人数',
  syllabus      JSON            NOT NULL                COMMENT '训练大纲 {week, days: [{day, title, warmup, exercises: [{name, sets, reps, rest, notes, video_url}], cooldown}]}',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_goal (goal),
  INDEX idx_level (level),
  INDEX idx_coach (coach)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='训练计划表';

-- -------------------------------------------
-- 6. Exercises (动作库)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS exercises (
  id              INT             NOT NULL AUTO_INCREMENT  COMMENT '动作ID',
  name            VARCHAR(100)    NOT NULL                COMMENT '动作名称',
  category        VARCHAR(20)     NOT NULL                COMMENT '分类: strength/cardio/flexibility',
  muscle_group    VARCHAR(50)     NOT NULL                COMMENT '肌群: chest/back/legs/shoulders/arms/core/full_body',
  equipment       VARCHAR(100)    DEFAULT ''              COMMENT '所需器材',
  difficulty      VARCHAR(20)     DEFAULT 'intermediate'  COMMENT '难度',
  instructions    TEXT            NULL                    COMMENT '动作说明',
  tips            TEXT            NULL                    COMMENT '要点提示',
  video_url       VARCHAR(255)    DEFAULT ''              COMMENT '演示视频URL',
  image_url       VARCHAR(255)    DEFAULT ''              COMMENT '图片URL',
  calories_per_30min INT         DEFAULT 0               COMMENT '30分钟消耗热量',
  PRIMARY KEY (id),
  INDEX idx_muscle (muscle_group),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='动作库表';

-- -------------------------------------------
-- 7. Diet Plans (饮食方案)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS diet_plans (
  id              INT             NOT NULL AUTO_INCREMENT  COMMENT '方案ID',
  title           VARCHAR(200)    NOT NULL                COMMENT '方案标题',
  description     TEXT            NULL                    COMMENT '方案描述',
  cover_image     VARCHAR(255)    DEFAULT ''              COMMENT '封面图',
  goal            VARCHAR(20)     NOT NULL                COMMENT '目标: build_muscle/lose_fat/maintenance',
  daily_calories  INT             NOT NULL                COMMENT '每日目标热量(kcal)',
  protein_g       INT             NOT NULL                COMMENT '蛋白质克数',
  carbs_g         INT             NOT NULL                COMMENT '碳水克数',
  fat_g           INT             NOT NULL                COMMENT '脂肪克数',
  meals           JSON            NOT NULL                COMMENT '餐食结构 [{meal, time, recipes: [{name, ingredients, calories, protein, carbs, fat}]}]',
  author          VARCHAR(50)     NOT NULL                COMMENT '作者',
  views           INT             DEFAULT 0               COMMENT '浏览量',
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_goal (goal),
  INDEX idx_author (author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='饮食方案表';

-- -------------------------------------------
-- 8. Foods (食物库)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS foods (
  id              INT             NOT NULL AUTO_INCREMENT  COMMENT '食物ID',
  name            VARCHAR(100)    NOT NULL                COMMENT '食物名称',
  category        VARCHAR(20)     NOT NULL                COMMENT '分类: staple/meat/vegetable/fruit/dairy/snack/drink/condiment',
  calories_per_100g INT          NOT NULL                COMMENT '每100g热量(kcal)',
  protein_per_100g  DECIMAL(5,1) DEFAULT 0              COMMENT '每100g蛋白质(g)',
  carbs_per_100g    DECIMAL(5,1) DEFAULT 0              COMMENT '每100g碳水(g)',
  fat_per_100g      DECIMAL(5,1) DEFAULT 0              COMMENT '每100g脂肪(g)',
  fiber_per_100g    DECIMAL(5,1) DEFAULT 0              COMMENT '每100g纤维(g)',
  serving_size      INT           DEFAULT 100            COMMENT '一份多少克',
  serving_unit      VARCHAR(10)   DEFAULT 'g'            COMMENT '单位',
  PRIMARY KEY (id),
  INDEX idx_category (category),
  FULLTEXT idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食物库表';

-- -------------------------------------------
-- 9. Diet Logs (饮食记录)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS diet_logs (
  id            INT             NOT NULL AUTO_INCREMENT  COMMENT '记录ID',
  user_id       INT             NOT NULL                COMMENT '用户ID',
  log_date      DATE            NOT NULL                COMMENT '日期',
  meal_type     VARCHAR(10)     NOT NULL                COMMENT '餐别: breakfast/lunch/dinner/snack',
  food_id       INT             NULL                    COMMENT '食物ID(可为空)',
  food_name     VARCHAR(100)    NOT NULL                COMMENT '食物名称',
  amount_g      INT             NOT NULL                COMMENT '摄入克数',
  calories      INT             NOT NULL                COMMENT '实际热量(kcal)',
  protein_g     DECIMAL(5,1)    DEFAULT 0               COMMENT '蛋白质(g)',
  carbs_g       DECIMAL(5,1)    DEFAULT 0               COMMENT '碳水(g)',
  fat_g         DECIMAL(5,1)    DEFAULT 0               COMMENT '脂肪(g)',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_user_date (user_id, log_date),
  INDEX idx_date (log_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='饮食记录表';
