-- P1-1: 学习路径功能建表
-- 执行方式：node backend/migrate.js 自动运行

CREATE TABLE IF NOT EXISTS learning_paths (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  cover_image VARCHAR(500),
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  category VARCHAR(50),
  total_items INT DEFAULT 0,
  status ENUM('draft', 'published') DEFAULT 'published',
  creator VARCHAR(100),
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_path_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  path_id INT NOT NULL,
  news_id INT NOT NULL,
  title VARCHAR(200),
  sort_order INT DEFAULT 0,
  description TEXT,
  FOREIGN KEY (path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
  FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_path_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  path_id INT NOT NULL,
  item_id INT NOT NULL,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_item (user_id, item_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES learning_path_items(id) ON DELETE CASCADE
);
