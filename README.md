# 炼刻 FitCarve — 健身管理平台

一个集训练计划、饮食追踪、知识学习、社区互动于一体的全栈健身管理平台。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue 3 + Vite + TypeScript + Element Plus + ECharts + Pinia + Vue Router |
| 后端 | Node.js + Express + MySQL + JWT |
| AI | DeepSeek API（AI 训练计划生成、智能问答） |
| 安全 | Helmet + express-rate-limit + bcryptjs + Joi |

## 功能模块

### 训练管理
- 训练计划创建/编辑/详情，支持自定义动作组合
- 动作库 800+ 动作，含 GIF 演示、目标肌群、难度分级
- 我的训练计划管理，训练进度追踪
- AI 训练计划生成器（基于用户目标自动生成计划）

### 饮食与营养
- 饮食计划浏览与详情
- 饮食日志记录（每日摄入追踪）
- 营养数据搜索（对接 Open Food Facts 数据）
- 健身计算器（BMI / TDEE / 宏量营养素计算）

### 知识体系
- 资讯/文章系统（富文本编辑、评论、点赞、收藏、阅读进度）
- 学习路径（结构化课程系列，含难度分级与学习进度）
- 知识图谱可视化（动作 ↔ 肌群 ↔ 文章关联）
- 循证标签系统（ACSM / NSCA / ISSN 专业标签）

### 社区与互动
- 文章评论与互动（点赞、收藏、评论通知）
- 推荐系统（基于兴趣的内容推荐）
- 创作者中心（发布文章、数据统计、内容管理）
- Newsletter 订阅

### 管理后台
- 数据看板（用户/内容/互动统计）
- 用户管理、内容审核
- 评论管理、日志查看、举报处理

### 个人中心
- 身体档案与健身目标管理
- 训练日历、饮食追踪、学习进度汇总
- 收藏夹、我的评论、消息通知中心

## 项目结构

```
fitness-frontend/
├── src/                    # 前端源码
│   ├── components/         # 组件（news/ai/admin/common/fitness）
│   ├── composables/        # 组合式函数（useNewsList, useInteraction 等）
│   ├── views/              # 页面（public/user/fitness/admin/creator）
│   ├── stores/             # Pinia 状态管理
│   ├── router/             # 路由配置
│   ├── services/           # API 服务
│   ├── utils/              # 工具函数
│   └── types/              # TypeScript 类型定义
├── backend/                # 后端源码
│   ├── routes/             # API 路由（auth/news/training/diet/ai 等）
│   ├── models/             # 数据模型
│   ├── middleware/         # 中间件（auth/upload）
│   ├── services/           # 服务层（aiService）
│   ├── migrations/         # 数据库迁移
│   ├── schema.sql          # 数据库建表脚本
│   └── server.js           # 入口文件
├── seed/                   # 种子数据
├── public/                 # 静态资源（exercise-gifs/images）
└── PRODUCT.md              # 产品设计规范
```

## 快速开始

### 环境要求
- Node.js >= 18
- MySQL >= 8.0

### 安装

```bash
# 前端依赖
npm install

# 后端依赖
cd backend && npm install && cd ..
```

### 配置

```bash
# 前端环境变量（根目录）
cp .env.example .env.development

# 后端环境变量
cp backend/.env.example backend/.env
# 编辑 backend/.env 填入数据库密码、JWT 密钥、AI API Key 等
```

### 初始化数据库

```bash
# 导入建表脚本
mysql -u root -p < backend/schema.sql

# 运行数据库迁移
cd backend && node migrate.js && cd ..

# 导入种子数据
cd seed && npm install && node index.js && cd ..
```

### 启动

```bash
# 后端（终端 1）
cd backend && npm run dev

# 前端（终端 2）
npm run dev
```

前端运行在 http://localhost:5173，后端运行在 http://localhost:5000

## 安全说明

- `.env` 文件已在 `.gitignore` 中忽略，不会提交到仓库
- 后端使用 Helmet 设置安全响应头，express-rate-limit 限制请求频率
- 密码使用 bcryptjs 加密存储，JWT 进行身份验证
- 接口参数使用 Joi 校验

## 开源数据致谢

本项目动作库数据参考了以下开源项目：
- [free-exercise-db](https://github.com/yuhonas/free-exercise-db) — 动作数据与 GIF 演示
- [Open Food Facts API](https://world.openfoodfacts.org/data) — 营养数据查询


## License

MIT
