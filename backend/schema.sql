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
  tags          VARCHAR(500)    NOT NULL DEFAULT ''     COMMENT '标签，逗号分隔(兼容旧数据)',
  image         VARCHAR(255)    NOT NULL DEFAULT ''     COMMENT '封面图片URL',
  category      VARCHAR(50)     NOT NULL                COMMENT '分类: training-science/sports-nutrition/muscle-building/fat-loss/recovery-injury/gear-equipment',
  author        VARCHAR(50)     NOT NULL                COMMENT '创作者用户名',
  status        VARCHAR(20)     NOT NULL DEFAULT 'pending' COMMENT '审核状态: pending/approved/rejected',
  quality_score DECIMAL(5,2)    NOT NULL DEFAULT 0.00    COMMENT '内容质量分(0-100)',
  is_featured   TINYINT(1)      NOT NULL DEFAULT 0       COMMENT '是否精选/推荐',
  is_original   TINYINT(1)      NOT NULL DEFAULT 1       COMMENT '是否原创',
  source_url    VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '原文链接(非原创时)',
  word_count    INT             NOT NULL DEFAULT 0       COMMENT '正文字数',
  read_time_min INT             NOT NULL DEFAULT 5       COMMENT '预计阅读时长(分钟)',
  report_count  INT             NOT NULL DEFAULT 0       COMMENT '举报次数',
  audit_by      VARCHAR(50)     NULL                    COMMENT '审核人用户名',
  audit_at      DATETIME        NULL                    COMMENT '审核时间',
  last_audited_at DATETIME      NULL                    COMMENT '最后审核时间',
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
  INDEX idx_publish_date (publish_date),
  INDEX idx_quality (quality_score DESC),
  INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯表';

-- -------------------------------------------
-- 2b. 资讯分类表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS news_categories (
  id            INT             NOT NULL AUTO_INCREMENT  COMMENT '分类ID',
  key_name      VARCHAR(30)     NOT NULL                COMMENT '分类英文key',
  name          VARCHAR(20)     NOT NULL                COMMENT '分类中文名',
  description   VARCHAR(200)    NOT NULL DEFAULT ''     COMMENT '分类描述',
  icon          VARCHAR(100)    NOT NULL DEFAULT ''     COMMENT '分类图标(emoji或URL)',
  color         VARCHAR(20)     NOT NULL DEFAULT '#1890ff' COMMENT '分类主题色',
  sort_order    INT             NOT NULL DEFAULT 0      COMMENT '排序权重',
  article_count INT             NOT NULL DEFAULT 0      COMMENT '文章数量(冗余)',
  is_active     TINYINT(1)      NOT NULL DEFAULT 1      COMMENT '是否启用',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_key_name (key_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯分类表';

-- -------------------------------------------
-- 2c. 资讯标签表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS news_tags (
  id            INT             NOT NULL AUTO_INCREMENT  COMMENT '标签ID',
  name          VARCHAR(50)     NOT NULL                COMMENT '标签名称',
  slug          VARCHAR(50)     NOT NULL                COMMENT '标签slug(URL用)',
  category      VARCHAR(30)     NULL                    COMMENT '所属分类key',
  usage_count   INT             NOT NULL DEFAULT 0      COMMENT '使用次数',
  heat_score    DECIMAL(8,2)    NOT NULL DEFAULT 0.00   COMMENT '热度分(综合使用量+互动)',
  is_recommended TINYINT(1)     NOT NULL DEFAULT 0      COMMENT '是否推荐标签',
  sort_order    INT             NOT NULL DEFAULT 0      COMMENT '排序权重',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_name (name),
  UNIQUE KEY uk_slug (slug),
  INDEX idx_category (category),
  INDEX idx_heat (heat_score DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯标签表';

-- -------------------------------------------
-- 2d. 资讯-标签关联表（多对多）
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS news_tag_relations (
  news_id   INT NOT NULL COMMENT '资讯ID',
  tag_id    INT NOT NULL COMMENT '标签ID',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (news_id, tag_id),
  INDEX idx_tag_id (tag_id),
  CONSTRAINT fk_ntr_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
  CONSTRAINT fk_ntr_tag FOREIGN KEY (tag_id) REFERENCES news_tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯-标签关联表';

-- -------------------------------------------
-- 2e. 资讯举报表
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS news_reports (
  id          INT             NOT NULL AUTO_INCREMENT  COMMENT '举报ID',
  news_id     INT             NOT NULL                COMMENT '被举报资讯ID',
  user_id     INT             NOT NULL                COMMENT '举报人用户ID',
  reason_type VARCHAR(30)     NOT NULL                COMMENT '举报类型:misinformation/plagiarism/spam/inappropriate/other',
  description TEXT            NULL                    COMMENT '举报详情',
  status      VARCHAR(20)     NOT NULL DEFAULT 'pending' COMMENT '处理状态:pending/resolved/dismissed',
  handled_by  VARCHAR(50)     NULL                    COMMENT '处理人',
  handled_at  DATETIME        NULL                    COMMENT '处理时间',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_news_id (news_id),
  INDEX idx_status (status),
  CONSTRAINT fk_report_news FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资讯举报表';

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
  id             INT             NOT NULL AUTO_INCREMENT  COMMENT '计划ID',
  title          VARCHAR(200)    NOT NULL                COMMENT '计划标题',
  description    TEXT            NULL                    COMMENT '计划描述',
  cover_image    VARCHAR(255)    DEFAULT ''              COMMENT '封面图',
  goal           VARCHAR(20)     NOT NULL                COMMENT '目标: build_muscle/lose_fat/endurance/flexibility/general',
  level          VARCHAR(20)     NOT NULL                COMMENT '难度: beginner/intermediate/advanced',
  duration_weeks INT             NOT NULL DEFAULT 4      COMMENT '训练周期(周)',
  days_per_week  INT             NOT NULL DEFAULT 4      COMMENT '每周训练天数',
  equipment     VARCHAR(255)    DEFAULT ''              COMMENT '所需器材,逗号分隔',
  coach         VARCHAR(50)     NOT NULL                COMMENT '作者',
  author_id     INT             NULL                    COMMENT '创建者用户ID(NULL=官方预置)',
  views         INT             DEFAULT 0               COMMENT '浏览量',
  enrolled      INT             DEFAULT 0               COMMENT '参与人数',
  is_official   TINYINT(1)      NOT NULL DEFAULT 1      COMMENT '1=官方预置/0=用户创建',
  is_public     TINYINT(1)      NOT NULL DEFAULT 1      COMMENT '1=公开/0=私有(仅作者可见)',
  source        VARCHAR(20)     DEFAULT 'manual'        COMMENT '创建方式: manual/ai',
  syllabus      JSON            NOT NULL                COMMENT '训练大纲 [{week:1, days:[{day:1, title, warmup, exercises:[{name, sets, reps, rest, notes, video_url, exercise_id(关联动作库), gif_url, image_url, target_muscles, secondary_muscles, muscle_group, equipment, difficulty, db_name(动作库原名), is_approximate(是否近似匹配)}], cooldown}]}]',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_goal (goal),
  INDEX idx_level (level),
  INDEX idx_coach (coach),
  INDEX idx_author (author_id),
  INDEX idx_official (is_official)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='训练计划表';

-- -------------------------------------------
-- 5b. User Training Enrollments (用户报名训练计划)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS user_training_enrollments (
  id            INT             NOT NULL AUTO_INCREMENT  COMMENT '报名记录ID',
  user_id       INT             NOT NULL                COMMENT '用户ID',
  plan_id       INT             NOT NULL                COMMENT '训练计划ID',
  status        VARCHAR(20)     DEFAULT 'active'        COMMENT 'active/completed/abandoned',
  progress_pct  DECIMAL(5,2)    DEFAULT 0               COMMENT '完成百分比',
  enrolled_at   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报名时间',
  completed_at  DATETIME        NULL                    COMMENT '完成时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_user_plan (user_id, plan_id),
  INDEX idx_user (user_id),
  INDEX idx_plan (plan_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户训练计划报名表';

-- -------------------------------------------
-- 5c. Training Logs (训练日志/打卡)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS training_logs (
  id                  INT             NOT NULL AUTO_INCREMENT  COMMENT '日志ID',
  user_id             INT             NOT NULL                COMMENT '用户ID',
  plan_id             INT             NOT NULL                COMMENT '训练计划ID',
  week                INT             NOT NULL                COMMENT '第几周',
  day                 INT             NOT NULL                COMMENT '第几天',
  completed_exercises JSON            NULL                    COMMENT '完成的动作ID数组',
  duration_minutes    INT             DEFAULT 0               COMMENT '训练时长(分钟)',
  notes               TEXT            NULL                    COMMENT '训练感受',
  completed_at        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '完成时间',
  PRIMARY KEY (id),
  UNIQUE KEY uk_user_plan_day (user_id, plan_id, week, day),
  INDEX idx_user (user_id),
  INDEX idx_plan (plan_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='训练日志表';

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
  target_muscles    VARCHAR(255) DEFAULT ''              COMMENT '目标肌群,逗号分隔(中文名)',
  secondary_muscles VARCHAR(255) DEFAULT ''              COMMENT '辅助肌群,逗号分隔(中文名)',
  body_part         VARCHAR(50)  DEFAULT ''              COMMENT '身体部位',
  gif_url           VARCHAR(500) DEFAULT ''              COMMENT 'GIF动画URL',
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
-- 8. Foods (食物库 - 薄荷网数据库)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS foods (
  id              INT             NOT NULL AUTO_INCREMENT  COMMENT '食物ID',
  boohee_id       VARCHAR(100)    DEFAULT ''               COMMENT '薄荷网食物ID',
  name            VARCHAR(150)    NOT NULL                COMMENT '食物名称',
  category        VARCHAR(50)     NOT NULL                COMMENT '分类(英文key)',
  category_name   VARCHAR(50)     NOT NULL DEFAULT ''      COMMENT '分类名称(中文)',
  calories_per_100g INT          NOT NULL                COMMENT '每100g热量(kcal)',
  protein_per_100g  DECIMAL(6,1) DEFAULT 0              COMMENT '每100g蛋白质(g)',
  carbs_per_100g    DECIMAL(6,1) DEFAULT 0              COMMENT '每100g碳水(g)',
  fat_per_100g      DECIMAL(6,1) DEFAULT 0              COMMENT '每100g脂肪(g)',
  fiber_per_100g    DECIMAL(6,1) DEFAULT 0              COMMENT '每100g纤维(g)',
  vitamin_a         DECIMAL(8,1) DEFAULT NULL            COMMENT '维生素A(μg)',
  vitamin_c         DECIMAL(8,1) DEFAULT NULL            COMMENT '维生素C(mg)',
  vitamin_e         DECIMAL(8,2) DEFAULT NULL            COMMENT '维生素E(mg)',
  cholesterol       DECIMAL(8,1) DEFAULT NULL            COMMENT '胆固醇(mg)',
  calcium           DECIMAL(8,1) DEFAULT NULL            COMMENT '钙(mg)',
  iron              DECIMAL(8,2) DEFAULT NULL            COMMENT '铁(mg)',
  sodium            DECIMAL(8,1) DEFAULT NULL            COMMENT '钠(mg)',
  potassium         DECIMAL(8,1) DEFAULT NULL            COMMENT '钾(mg)',
  phosphorus        DECIMAL(8,1) DEFAULT NULL            COMMENT '磷(mg)',
  magnesium         DECIMAL(8,1) DEFAULT NULL            COMMENT '镁(mg)',
  zinc              DECIMAL(8,2) DEFAULT NULL            COMMENT '锌(mg)',
  selenium          DECIMAL(8,1) DEFAULT NULL            COMMENT '硒(μg)',
  serving_units     TEXT            NULL                    COMMENT '度量单位(JSON数组)',
  image_url         VARCHAR(500)    DEFAULT ''              COMMENT '食物图片URL',
  source            VARCHAR(20)     DEFAULT '薄荷'          COMMENT '数据来源',
  PRIMARY KEY (id),
  INDEX idx_category (category),
  INDEX idx_boohee_id (boohee_id),
  FULLTEXT idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食物库表(薄荷网数据)';

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
