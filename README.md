# 炼刻 FitCarve — 全栈健身管理平台

[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

一个集**训练管理、饮食追踪、知识学习、社区互动**于一体的全栈健身管理平台。前端基于 Vue 3 + Vite + TypeScript + Element Plus，后端基于 Node.js + Express + MySQL，集成 AI 训练计划生成与知识图谱可视化。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| **前端框架** | Vue 3 + TypeScript + Vite |
| **UI 组件库** | Element Plus + Lucide Icons |
| **状态管理** | Pinia |
| **路由** | Vue Router 4 |
| **图表** | ECharts + vue-echarts |
| **后端** | Node.js + Express |
| **数据库** | MySQL 8.0 + mysql2 |
| **认证** | JWT + bcryptjs + Passport |
| **AI 集成** | DeepSeek API（训练计划生成、智能问答） |
| **安全** | Helmet + express-rate-limit + Joi 参数校验 |
| **文件上传** | Multer |
| **邮件** | Nodemailer |

---

## 功能模块

### 🏋️ 训练管理
- 训练计划创建/编辑/详情，支持自定义动作组合与分组
- **动作库 800+ 动作**，含 GIF 演示、目标肌群标注、难度分级
- 我的训练计划管理，训练进度追踪
- **AI 训练计划生成器** — 基于用户目标（增肌/减脂/塑形）自动生成个性化计划
- 教练模块：教练列表、教练详情、训练报名

### 🥗 饮食与营养
- 饮食计划浏览与详情查看
- **饮食日志** — 每日摄入追踪，按餐次记录
- **营养数据搜索** — 对接 Open Food Facts 开放数据
- 健身计算器 — BMI / TDEE / 宏量营养素（碳水·蛋白质·脂肪）计算
- 饮水记录追踪

### 📚 知识体系
- **资讯/文章系统** — 富文本编辑、评论互动、点赞收藏、阅读进度追踪
- **学习路径** — 结构化课程系列，含难度分级与进度追踪
- **知识图谱可视化** — 动作 ↔ 目标肌群 ↔ 文章关联图谱
- **循证标签系统** — ACSM / NSCA / ISSN 等专业认证标签
- 文章分类与标签管理

### 💬 社区与互动
- 文章评论系统（嵌套回复、点赞）
- 内容互动（收藏、点赞、通知推送）
- **推荐系统** — 基于用户兴趣的内容个性化推荐
- **创作者中心** — 文章发布、内容管理、互动数据统计
- Newsletter 邮件订阅

### 🔧 管理后台
- **数据看板** — 用户/内容/互动数据统计可视化
- **用户管理** — 用户列表、状态管理
- **内容审核** — 文章审核流程
- **评论管理** — 评论审核与举报处理
- **系统日志** — 操作日志查看
- **举报处理** — 用户举报管理与处置

### 👤 个人中心
- 身体档案与健身目标管理
- 训练日历、饮食追踪、学习进度汇总
- 收藏夹、我的评论、消息通知中心
- 个人资料编辑

---

## 项目结构

```
fitness-frontend/
├── src/                          # 前端源码
│   ├── components/               # 组件
│   │   ├── admin/                #   管理后台组件（AdminLayout, AdminSidebar）
│   │   ├── ai/                   #   AI 聊天组件（AiChatFab）
│   │   ├── common/               #   通用组件（HeroSection, DonutChart, FilterBar…）
│   │   ├── fitness/              #   健身组件（MuscleChart）
│   │   ├── news/                 #   资讯组件（NewsCard, HeroBanner, CommentSection…）
│   │   └── user/                 #   用户组件（UserAvatar, StatCard, ContentList）
│   ├── composables/              # 组合式函数（useNewsList, useComment, useAuthGuard…）
│   ├── views/                    # 页面
│   │   ├── public/               #   公共页（Login, Register, Profile, 404, 500）
│   │   ├── user/                 #   用户页（Home, NewsList, NewsDetail, Recommendation）
│   │   ├── fitness/              #   健身页（Dashboard, Training, Diet, Calculator…）
│   │   ├── admin/                #   管理页（Dashboard, Users, Audit, Comments…）
│   │   ├── creator/              #   创作者中心（CreatorCenter, Manage, Publish）
│   │   └── coach/                #   教练页（CoachDetail, CoachList）
│   ├── stores/                   # Pinia 状态管理（news/user/coach/learning/knowledgeGraph）
│   ├── router/                   # 路由配置
│   ├── services/                 # API 服务层
│   ├── utils/                    # 工具函数（request, security, upload, constants…）
│   ├── types/                    # TypeScript 类型定义
│   ├── styles/                   # 全局样式（variables, animations, article, transitions）
│   └── env.d.ts                  # 类型声明
├── backend/                      # 后端源码
│   ├── routes/                   # API 路由（24 个模块）
│   ├── models/                   # 数据模型（18 个）
│   ├── middleware/               # 中间件（auth JWT 验证, upload 文件上传）
│   ├── services/                 # 服务层（aiService DeepSeek API 集成）
│   ├── migrations/               # 数据库迁移脚本（3 个）
│   ├── migrate.js                # 迁移执行器
│   ├── schema.sql                # 数据库建表脚本
│   ├── seed-all.js               # 全量数据种子
│   ├── db.js                     # 数据库连接
│   └── server.js                 # 服务入口
├── seed/                         # 种子数据（exercises, foods, diet_plans, training_plans, news）
├── public/                       # 静态资源
│   ├── exercise-gifs/            #   800+ 动作 GIF 演示
│   ├── news-images/              #   文章配图（按类别组织）
│   ├── logo.png / logo.svg       #   品牌 Logo
└── PRODUCT.md                    # 产品设计规范
```

---

## 快速开始

### 环境要求

- **Node.js** >= 18
- **MySQL** >= 8.0
- **npm** >= 9

### 1️⃣ 安装依赖

```bash
# 前端依赖
npm install

# 后端依赖
cd backend && npm install && cd ..
```

### 2️⃣ 环境配置

```bash
# 前端环境变量
cp .env.example .env.development

# 后端环境变量
cp backend/.env.example backend/.env
# 编辑 backend/.env 填入数据库连接、JWT 密钥、AI API Key 等
```

### 3️⃣ 初始化数据库

```bash
# 导入建表脚本
mysql -u root -p < backend/schema.sql

# 运行数据库迁移
cd backend && node migrate.js && cd ..

# 导入种子数据
cd seed && npm install && node index.js && cd ..
```

### 4️⃣ 启动开发服务

```bash
# 终端 1 — 启动后端（默认 http://localhost:5000）
cd backend && npm run dev

# 终端 2 — 启动前端（默认 http://localhost:5173）
npm run dev
```

---

## API 概览

后端提供 24 个 API 路由模块：

| 路由 | 说明 |
|------|------|
| `/api/auth` | 用户注册/登录/登出 |
| `/api/users` | 用户信息管理 |
| `/api/news` | 文章 CRUD |
| `/api/news-categories` | 文章分类管理 |
| `/api/news-tags` | 文章标签管理 |
| `/api/comments` | 评论系统（嵌套回复） |
| `/api/interactions` | 点赞/收藏互动 |
| `/api/notifications` | 消息通知 |
| `/api/training` | 训练计划管理 |
| `/api/exercises` | 动作库（800+） |
| `/api/diet` | 饮食计划 |
| `/api/diet-log` | 饮食日志 |
| `/api/foods` | 食物数据 |
| `/api/nutrition` | 营养数据搜索 |
| `/api/water` | 饮水记录 |
| `/api/ai` | AI 训练计划生成 / 智能问答 |
| `/api/learning` | 学习路径 |
| `/api/knowledge-graph` | 知识图谱数据 |
| `/api/coaches` | 教练模块 |
| `/api/admin` | 管理后台操作 |
| `/api/search` | 全局搜索 |
| `/api/upload` | 文件上传 |
| `/api/versions` | 版本管理 |
| `/api/newsletter` | 邮件订阅 |

---

## 部署指南

### 🇨🇳 Zeabur 部署（推荐，国内平台）

[Zeabur](https://zeabur.com) 是国内团队开发的一站式部署平台，原生支持 MySQL + Node.js，中文界面，操作简单。

**部署步骤：**

1. **推送代码** 到 GitHub 仓库 `fitcarve-platform`
2. 打开 [Zeabur Dashboard](https://zeabur.com/dashboard) → **创建项目**
3. **添加服务** → **从 GitHub 导入** → 选择 `fitcarve-platform`
4. 添加 **MySQL** 数据库：
   - 项目页面 → **添加服务** → **MySQL** → Zeabur 会自动创建数据库并提供连接信息
5. Zeabur 自动读取 `zeabur.json`，执行构建和部署
6. 等待首次构建完成（自动安装依赖 → 构建前端 → 启动后端）
7. **配置环境变量**（服务设置 → 环境变量）：

   | 变量 | 说明 |
   |------|------|
   | `NODE_ENV` | 设为 `production` |
   | `MYSQL_HOST` | Zeabur MySQL 提供的主机地址 |
   | `MYSQL_USER` | Zeabur MySQL 提供的用户名 |
   | `MYSQL_PASSWORD` | Zeabur MySQL 提供的密码 |
   | `MYSQL_DATABASE` | Zeabur MySQL 提供的数据库名 |
   | `JWT_SECRET` | 随机字符串，用于 JWT 加密 |
   | `AI_API_KEY` | （可选）DeepSeek API 密钥 |

8. **初始化数据库**：在 Zeabur 的 **终端** 中运行：

   ```bash
   # 导入表结构
   mysql -h $MYSQL_HOST -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE < backend/schema.sql

   # 运行数据库迁移
   cd backend && node migrate.js

   # 导入种子数据
   cd ../seed && npm install && node index.js
   ```

9. 部署完成后，Zeabur 会分配一个 `.zeabur.app` 域名，直接访问即可

> 💡 **提示：** Zeabur 免费版提供足够额度运行本项目。服务在闲置时可能休眠，访问后自动唤醒。

---

### 🌍 其他部署方式

#### Railway（国际平台）

Railway 是国际流行的部署平台，同样支持 MySQL + Node.js：

1. 在 [Railway Dashboard](https://railway.app/dashboard) → **New Project** → **Deploy from GitHub repo**
2. 选择 `fitcarve-platform` 仓库，Railway 自动读取 `railway.json`
3. 添加 **MySQL** 插件（Plugins → Add Plugin → MySQL）
4. 设置 `NODE_ENV=production` 和 `JWT_SECRET`
5. 初始化数据库方式同 Zeabur 步骤 8
6. 访问 `https://fitcarve-platform.up.railway.app`

> Railway 免费版提供 $5/月额度，足以运行本项目。

#### 云服务器（VPS）

如果你有云服务器（腾讯云/阿里云等），手动部署也很简单：

```bash
# 1. 安装 MySQL 8.0+ 和 Node.js 18+
# 2. 拉取代码
git clone https://github.com/ZHUJIAFENG123/fitcarve-platform.git
cd fitcarve-platform

# 3. 构建前端
npm ci && npm run build

# 4. 安装后端依赖
cd backend && npm ci && cd ..

# 5. 导入数据库
mysql -u root -p < backend/schema.sql

# 6. 运行迁移和种子数据
cd backend && node migrate.js && node seed-all.js && cd ..

# 7. 启动（建议使用 PM2 守护进程）
NODE_ENV=production node backend/server.js

# 或使用 PM2
npm i -g pm2
NODE_ENV=production pm2 start backend/server.js --name fitcarve
```

---

## 安全说明

- `.env` 文件已在 `.gitignore` 中忽略，不会提交到仓库
- 后端使用 **Helmet** 设置安全响应头，**express-rate-limit** 限制请求频率
- 密码使用 **bcryptjs** 加密存储，**JWT** 进行身份验证
- 接口参数使用 **Joi** 校验

---

## 致谢

- [free-exercise-db](https://github.com/yuhonas/free-exercise-db) — 动作数据与 GIF 演示
- [Open Food Facts API](https://world.openfoodfacts.org/data) — 开放营养数据
- [Element Plus](https://element-plus.org/) — Vue 3 UI 组件库
- [ECharts](https://echarts.apache.org/) — 数据可视化

---

## License

[MIT](LICENSE)
