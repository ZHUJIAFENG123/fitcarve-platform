# CloudBase 云托管部署指南（傻瓜式教程）

本文档手把手教你把 **炼刻健身平台** 部署到 **腾讯云 CloudBase（云开发）**，利用你申请的半年免费福利上线项目。

---

## 方案概览

CloudBase 是腾讯云的 Serverless 平台，我们采用以下部署方式：

| 组件 | CloudBase 产品 | 说明 |
|------|---------------|------|
| 前端 + 后端 | **云托管 CloudBase Run** | 一个容器同时跑前端静态文件 + Express API |
| 数据库 | **SQL 型数据库**（或外部 MySQL） | 存储业务数据 |
| 文件存储 | **云存储**（可选） | 上传的图片等 |

**优势：** 只需维护一个服务，自动扩缩容，按量计费（你的半年福利应该够用）。

---

## 第一步：准备 CloudBase 环境

1. 确保你已经在 [CloudBase 控制台](https://tcb.cloud.tencent.com) 创建了环境（例如 `fitcarve-platform`）
2. 记录你的 **环境 ID**，后续会用到

---

## 第二步：创建数据库（SQL 型数据库）

1. 在 CloudBase 控制台左侧菜单，点击 **SQL 型数据库**
2. 点击 **创建数据库**，选择 **MySQL 兼容版**
3. 选择最低配置（个人项目够用）
4. 创建完成后，记录以下信息（在数据库详情页查看）：
   - **内网地址**（例如：`10.0.x.x:3306`）
   - **外网地址**（部署时先用外网地址测试，后续改内网）
   - **用户名**（默认 `root`）
   - **密码**
5. 点击 **数据库管理**，创建数据库：
   ```sql
   CREATE DATABASE community_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

---

## 第三步：修改项目配置

### 3.1 修改后端 CORS 配置（必须）

打开 `backend/server.js`，把第 13 行的：

```javascript
app.use(cors());
```

改成：

```javascript
// 允许 CloudBase 云托管域名访问
app.use(cors({
  origin: true,  // 生产环境 CloudBase 会处理跨域
  credentials: true
}));
```

### 3.2 复制 Dockerfile 到项目根目录

```bash
# 在项目根目录执行
cp deploy/cloudbase/Dockerfile ./Dockerfile
cp deploy/cloudbase/.dockerignore ./.dockerignore
```

### 3.3 创建环境变量文件

在 `backend/` 目录下创建 `.env` 文件（**不要提交到 Git！**）：

```env
NODE_ENV=production
PORT=5000

# ===== 数据库配置（填你的 CloudBase SQL 数据库信息）=====
MYSQL_HOST=你的数据库内网地址
MYSQL_USER=root
MYSQL_PASSWORD=你的数据库密码
MYSQL_DATABASE=community_db

# ===== JWT 密钥（必须修改！）=====
JWT_SECRET=去 https://1password.com/password-generator/ 生成一个 64 位随机字符串
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# ===== 邮件服务（可选）=====
EMAIL_SERVICE=gmail
EMAIL_USER=
EMAIL_PASS=

# ===== AI 配置（可选）=====
AI_API_KEY=
AI_API_URL=https://api.deepseek.com/v1/chat/completions
AI_MODEL=deepseek-chat
```

---

## 第四步：推送代码到 GitHub

CloudBase 云托管支持从 Git 仓库自动部署。

```bash
git add -A
git commit -m "chore: 添加 CloudBase 云托管 Dockerfile"
git push github master
```

---

## 第五步：在 CloudBase 控制台部署

### 5.1 进入云托管

1. 打开 [CloudBase 控制台](https://tcb.cloud.tencent.com)
2. 左侧菜单点击 **云函数/托管 → 云托管**
3. 点击 **新建服务**

### 5.2 配置服务

| 配置项 | 填写内容 |
|--------|---------|
| 服务名称 | `fitcarve-api`（或你喜欢的名字） |
| 实例规格 | 0.25核 0.5GB（最低配，够用） |
| 流量策略 | 100%（默认） |
| 版本配置 → 来源 | **代码库** |
| 代码库 | 选择 **GitHub** → 绑定你的账号 → 选择 `fitcarve-platform` 仓库 |
| 分支 | `master` |
| Dockerfile 路径 | `./Dockerfile` |
| 容器端口 | `5000`（和我们的后端端口一致） |
| 最小实例数 | 0（没有访问时不计费） |
| 最大实例数 | 5 |

### 5.3 配置环境变量

在版本配置中找到 **环境变量**，添加以下变量：

```
NODE_ENV=production
PORT=5000
MYSQL_HOST=你的数据库内网地址
MYSQL_USER=root
MYSQL_PASSWORD=你的数据库密码
MYSQL_DATABASE=community_db
JWT_SECRET=你的随机字符串
```

> **注意：** 不要把 `.env` 文件提交到 Git，通过控制台配置环境变量更安全。

### 5.4 开始部署

点击 **开始部署**，等待 3~5 分钟构建完成。

---

## 第六步：初始化数据库

部署成功后，我们需要导入数据库表结构。

### 方式 A：通过 CloudBase 控制台执行 SQL

1. 进入 **SQL 型数据库 → 数据库管理**
2. 选择 `community_db`
3. 把 `backend/schema.sql` 的内容复制进去执行

### 方式 B：本地连接数据库导入

```bash
# 使用数据库外网地址连接（在控制台开启外网访问）
mysql -h 你的外网地址 -u root -p community_db < backend/schema.sql
```

### 导入种子数据（可选）

```bash
# 在云函数的 Cloud Shell 中，或者本地执行
node backend/seed-all.js
```

---

## 第七步：验证部署

### 7.1 获取访问地址

部署成功后，在云托管服务列表中，你会看到：
- **默认域名**：`https://xxx-xxx.ap-shanghai.app.tcloudbase.com`

### 7.2 测试 API

浏览器访问：
```
https://你的默认域名/api/health
```

应返回：
```json
{"status":"ok","timestamp":"2026-07-07T..."}
```

### 7.3 测试前端

直接访问默认域名：
```
https://你的默认域名/
```

应该能看到网站首页。

---

## 第八步：配置自定义域名（可选）

1. 在云托管服务详情页，点击 **自定义域名**
2. 添加你的域名（例如 `www.yourdomain.com`）
3. 按照提示添加 DNS 解析记录
4. 等待证书自动颁发（CloudBase 自动提供 HTTPS）

---

## 常见问题排查

### 问题 1：部署失败，构建日志报错

**解决：** 点击版本右侧的 **构建日志**，查看具体错误。常见原因：
- `npm ci` 失败 → 检查 `package.json` 是否有效
- Dockerfile 路径错误 → 确认 Dockerfile 在仓库根目录

### 问题 2：访问显示 502 / 服务不可用

**解决：**
- 检查容器端口是否填了 `5000`
- 查看 **版本日志**，确认后端是否启动成功
- 检查环境变量中的数据库配置是否正确

### 问题 3：数据库连接失败

**解决：**
- 确认 `MYSQL_HOST` 填的是 CloudBase SQL 数据库的 **内网地址**
- 确认数据库用户名和密码正确
- 确认 `community_db` 数据库已创建
- 如果内网不通，先试试外网地址（性能稍差，但能验证问题）

### 问题 4：前端页面白屏

**解决：**
- 检查 `dist` 目录是否正确打包到了镜像中
- 在 **版本日志** 中搜索 `📦 托管前端构建产物`，看是否有这行输出
- 如果没有，说明构建阶段出问题了

### 问题 5：图片/GIF 加载不出来

**解决：**
- 后端代码中 `/exercise-gifs/` 和 `/news-images/` 路由已经托管了 public 目录下的文件
- 确认 `public/` 目录已复制到 Docker 镜像中

---

## 费用说明

CloudBase 按量计费，你的半年免费额度通常包含：
- 云托管：一定时长的免费实例运行时间
- SQL 数据库：一定容量的免费存储和请求数
- 流量：一定额度的免费出站流量

具体额度在 [CloudBase 控制台 → 套餐用量](https://tcb.cloud.tencent.com) 查看。

**省钱技巧：**
- 最小实例数设为 0，没有访问时不产生费用（但首次访问会有冷启动延迟）
- SQL 数据库选择最低配置

---

## 架构图

```
用户浏览器
    │
    ▼
┌─────────────────────────────────────┐
│   CloudBase 云托管（CloudBase Run）   │
│   https://xxx.app.tcloudbase.com     │
│                                     │
│   ┌──────────────┐                  │
│   │  / /login 等  │                  │
│   │  -> dist/    │  前端 Vue 3       │
│   └──────────────┘                  │
│   ┌──────────────┐                  │
│   │  /api/*      │                  │
│   │  -> Express  │  后端 API         │
│   └──────────────┘                  │
└──────────┬──────────────────────────┘
           │ 内网连接
           ▼
┌─────────────────────────────────────┐
│   CloudBase SQL 型数据库             │
│   MySQL 兼容版                       │
│   community_db                       │
└─────────────────────────────────────┘
```

---

## 需要帮助？

如果按照本文档操作仍有问题，请收集以下信息：

1. CloudBase 控制台 **版本日志** 的截图
2. CloudBase 控制台 **构建日志** 的截图
3. 浏览器开发者工具（F12）Network 面板的报错截图
