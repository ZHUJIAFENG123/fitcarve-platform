# 腾讯云部署指南（傻瓜式教程）

本文档手把手教你把 **炼刻健身平台** 部署到腾讯云服务器上，让项目正式上线。即使你是第一次部署，跟着步骤做也能成功。

---

## 方案概览

| 组件 | 部署方式 | 说明 |
|------|---------|------|
| 前端 (Vue 3) | Nginx 托管静态文件 | 构建后的 `dist/` 目录 |
| 后端 (Express) | Node.js 进程 + Systemd 守护 | 端口 5000，Nginx 反向代理 |
| 数据库 (MySQL) | 服务器本地安装 | 也可升级为腾讯云云数据库 |
| 域名访问 | 服务器公网 IP 或域名 | 支持后续配置 HTTPS |

**成本参考：** 腾讯云轻量应用服务器 2核2G，约 50~100 元/年（新用户更便宜）。

---

## 第一步：购买腾讯云服务器

1. 打开 [腾讯云官网](https://cloud.tencent.com/)，登录账号
2. 进入 **控制台** → **轻量应用服务器**（推荐新手）或 **云服务器 CVM**
3. 点击 **新建**，按下图选择配置：

| 配置项 | 推荐选择 | 说明 |
|--------|---------|------|
| 地域 | 离你用户最近的 | 例如：上海/广州/北京 |
| 镜像 | **Ubuntu 22.04 LTS** | 稳定、文档多、易操作 |
| 套餐 | 2核 2GB 内存 | 个人项目完全够用 |
| 流量包 | 3TB/月 | 足够 |
| 时长 | 1年 | 新用户首单有优惠 |

4. 付款完成后，进入服务器控制台，找到你的实例，记录以下信息：
   - **公网 IP**（例如：`123.456.78.90`）
   - **重置密码**（首次使用必须设置 root 密码）

5. **配置安全组**（防火墙）：
   - 点击实例 → 防火墙 → 添加规则
   - 放行以下端口：
     - `22`（SSH，远程连接）
     - `80`（HTTP，网页访问）
     - `443`（HTTPS，加密访问，可先不开）

---

## 第二步：连接服务器

你需要一个终端工具连接云服务器。Windows 用户推荐以下两种方式：

**方式 A：腾讯云自带的登录（最简单）**
- 在控制台实例列表中，点击 **登录** → **OrcaTerm 登录**，直接在浏览器中打开终端

**方式 B：使用本地终端（推荐长期用）**
- 下载 [PuTTY](https://www.putty.org/) 或 Windows Terminal
- 连接命令：
  ```bash
  ssh root@你的服务器公网IP
  # 例如：ssh root@123.456.78.90
  ```
- 输入你设置的 root 密码（输入时不会显示，回车即可）

登录成功后，你会看到类似这样的提示：
```
root@VM-xxx:~#
```

---

## 第三步：一键部署（推荐）

> 如果你不想手动敲很多命令，我们已经写好了一键安装脚本。

### 3.1 把部署文件推送到 GitHub

确保你的项目代码（包含 `deploy/tencent/` 目录）已经推送到 GitHub：

```bash
# 在你的本地项目目录执行
git add deploy/
git commit -m "add: 腾讯云部署配置"
git push
```

### 3.2 在服务器上执行一键脚本

在服务器终端中，依次执行以下命令：

```bash
# 1. 安装 Git（如未安装）
apt-get update && apt-get install -y git

# 2. 克隆你的项目（把下面的地址换成你的真实 GitHub 仓库地址）
cd /root
git clone https://github.com/你的用户名/fitness-frontend.git

# 3. 进入部署目录
cd fitness-frontend/deploy/tencent

# 4. 修改脚本中的仓库地址（用 vim 或 nano 编辑）
nano install.sh
# 找到 GITHUB_REPO="" 这一行，填入你的仓库地址，例如：
# GITHUB_REPO="https://github.com/zhangsan/fitness-frontend.git"
# 按 Ctrl+O 保存，Ctrl+X 退出

# 5. 给脚本执行权限并运行
chmod +x install.sh
bash install.sh
```

脚本会自动完成以下所有操作：
- 安装 Node.js 20、Nginx、MySQL
- 拉取代码、安装依赖、构建前端
- 创建数据库和用户
- 配置 Nginx 反向代理
- 启动后端服务并设置为开机自启

运行过程中会提示你设置数据库密码，输入一个记得住的强密码即可。

### 3.3 等待完成

脚本运行时间约 5~10 分钟（取决于服务器网速）。当看到以下输出就表示成功了：

```
========================================
  部署完成！
========================================

访问地址：
   http://123.456.78.90
```

---

## 第四步：手动部署（备选）

如果你更喜欢手动操作，或者一键脚本出了问题，按以下步骤逐一执行。

### 4.1 安装基础环境

```bash
# 更新系统
apt-get update -y

# 安装 Nginx、MySQL、Git
apt-get install -y nginx mysql-server git curl

# 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 验证安装
node -v    # 应显示 v20.x.x
npm -v     # 应显示 10.x.x
```

### 4.2 配置 MySQL

```bash
# 启动 MySQL
systemctl start mysql
systemctl enable mysql

# 设置 root 密码（把 YOUR_ROOT_PASSWORD 换成你自己的）
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_ROOT_PASSWORD'; FLUSH PRIVILEGES;"

# 创建数据库和用户（把 YOUR_DB_PASSWORD 换成你自己的）
mysql -u root -p'YOUR_ROOT_PASSWORD' -e "
CREATE DATABASE IF NOT EXISTS community_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'fitness_user'@'localhost' IDENTIFIED BY 'YOUR_DB_PASSWORD';
GRANT ALL PRIVILEGES ON community_db.* TO 'fitness_user'@'localhost';
FLUSH PRIVILEGES;
"
```

### 4.3 拉取代码并构建

```bash
# 克隆项目（换成你的仓库地址）
cd /var/www
git clone https://github.com/你的用户名/fitness-frontend.git
cd fitness-frontend

# 安装前端依赖并构建
npm ci
npm run build

# 安装后端依赖
cd backend
npm ci
```

### 4.4 配置后端环境变量

```bash
cd /var/www/fitness-frontend/backend

# 复制环境模板
cp ../../deploy/tencent/.env.example .env

# 编辑 .env 文件
nano .env
```

按照注释填写以下内容（**必须修改！**）：

```env
NODE_ENV=production
PORT=5000

MYSQL_HOST=localhost
MYSQL_USER=fitness_user
MYSQL_PASSWORD=你刚才设置的数据库密码
MYSQL_DATABASE=community_db

# JWT_SECRET 必须改！去 https://1password.com/password-generator/ 生成一个 64 位随机字符串
JWT_SECRET=你的随机字符串
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
```

保存后退出（Ctrl+O，回车，Ctrl+X）。

### 4.5 导入数据库

```bash
cd /var/www/fitness-frontend/backend

# 导入表结构
mysql -u fitness_user -p'YOUR_DB_PASSWORD' community_db < schema.sql

# 导入种子数据（可选）
node seed-all.js
```

### 4.6 配置 Nginx

```bash
# 复制 Nginx 配置
cp /var/www/fitness-frontend/deploy/tencent/nginx.conf /etc/nginx/sites-available/fitness
ln -sf /etc/nginx/sites-available/fitness /etc/nginx/sites-enabled/fitness
rm -f /etc/nginx/sites-enabled/default

# 检查配置并重启
nginx -t
systemctl restart nginx
systemctl enable nginx
```

### 4.7 启动后端服务

```bash
# 复制 systemd 服务配置
cp /var/www/fitness-frontend/deploy/tencent/fitness-api.service /etc/systemd/system/
systemctl daemon-reload

# 启动并设为开机自启
systemctl start fitness-api
systemctl enable fitness-api
```

---

## 第五步：验证部署

### 5.1 检查服务状态

在服务器上执行：

```bash
# 检查后端是否运行
systemctl status fitness-api

# 检查 Nginx 是否运行
systemctl status nginx

# 检查 MySQL 是否运行
systemctl status mysql
```

如果都显示 `active (running)` 就是正常的。

### 5.2 浏览器访问

打开你的浏览器，访问：

```
http://你的服务器公网IP
```

例如：`http://123.456.78.90`

如果能看到网站首页，恭喜你，部署成功！

### 5.3 测试 API

```bash
curl http://你的服务器公网IP/api/health
```

应返回：
```json
{"status":"ok","timestamp":"2026-07-07T..."}
```

---

## 第六步：后续维护

### 更新代码（重新部署）

当你修改了代码并推送到 GitHub 后，在服务器上执行：

```bash
cd /var/www/fitness-frontend

# 拉取最新代码
git pull

# 重新构建前端
npm ci
npm run build

# 重新安装后端依赖（如果 package.json 有变化）
cd backend
npm ci

# 重启后端服务
systemctl restart fitness-api

# 刷新 Nginx（一般不需要）
systemctl reload nginx
```

### 常用命令速查表

| 操作 | 命令 |
|------|------|
| 查看后端实时日志 | `journalctl -u fitness-api -f` |
| 查看后端最近 50 行日志 | `journalctl -u fitness-api -n 50` |
| 重启后端 | `systemctl restart fitness-api` |
| 查看 Nginx 错误日志 | `tail -f /var/log/nginx/error.log` |
| 查看 Nginx 访问日志 | `tail -f /var/log/nginx/access.log` |
| 重启 Nginx | `systemctl restart nginx` |
| 进入 MySQL | `mysql -u fitness_user -p` |
| 备份数据库 | `mysqldump -u fitness_user -p community_db > backup.sql` |

---

## 第七步：进阶配置（可选）

### 配置域名

1. 购买域名（腾讯云/阿里云均可）
2. 添加解析记录：
   - 记录类型：`A`
   - 主机记录：`@`（主域名）或 `www`
   - 记录值：你的服务器公网 IP
3. 修改 Nginx 配置中的 `server_name`：
   ```nginx
   server_name www.yourdomain.com;
   ```
4. 重启 Nginx：`systemctl restart nginx`

### 配置 HTTPS（SSL 证书）

腾讯云免费提供 SSL 证书：

1. 进入 [腾讯云 SSL 证书控制台](https://console.cloud.tencent.com/ssl)
2. 申请免费证书（域名验证）
3. 下载 **Nginx** 格式的证书
4. 上传到服务器 `/etc/nginx/ssl/`
5. 修改 Nginx 配置，添加 443 端口和证书路径
6. 重启 Nginx

### 升级为腾讯云云数据库 MySQL

如果服务器本地 MySQL 性能不够：

1. 购买 [腾讯云云数据库 MySQL](https://console.cloud.tencent.com/cdb)
2. 创建实例后，在 **内网地址** 中复制连接地址
3. 修改 `.env` 中的 `MYSQL_HOST` 为内网地址
4. 在安全组中放行 MySQL 端口（内网通常已通）
5. 重启后端：`systemctl restart fitness-api`

---

## 常见问题排查

### 问题 1：浏览器访问显示 "502 Bad Gateway"

**原因：** 后端服务没有启动

**解决：**
```bash
# 查看后端日志，定位错误
journalctl -u fitness-api -n 50

# 常见原因：
# - 数据库连不上 -> 检查 .env 中的数据库配置
# - 端口被占用 -> 检查 PORT 环境变量
```

### 问题 2：页面白屏，控制台报 404

**原因：** 前端构建失败或 Nginx 根目录配置错误

**解决：**
```bash
# 检查 dist 目录是否存在
ls /var/www/fitness-frontend/dist/

# 如果不存在，重新构建
cd /var/www/fitness-frontend
npm run build
```

### 问题 3：API 请求返回 CORS 错误

**原因：** 前端通过 IP 直接访问后端，跨域了

**解决：** 确保通过 Nginx 访问（`http://IP/`），而不是直接访问 `http://IP:5000/`

### 问题 4：图片/GIF 加载不出来

**原因：** `public/` 目录下的静态资源路径问题

**解决：** 检查 Nginx 配置中的 `exercise-gifs` 和 `news-images` location 块，确认路径正确。

### 问题 5：MySQL 连接失败

**解决：**
```bash
# 检查 MySQL 是否运行
systemctl status mysql

# 检查用户权限
mysql -u root -p -e "SELECT user, host FROM mysql.user;"

# 测试连接
mysql -u fitness_user -p'你的密码' -e "USE community_db; SHOW TABLES;"
```

---

## 部署架构图

```
┌─────────────────────────────────────────────┐
│              用户浏览器                        │
│         http://你的服务器IP                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│              Nginx (端口 80)                  │
│  ┌──────────────┬──────────────┐             │
│  │  / /login 等  │  /api/*      │             │
│  │  -> dist/    │  -> :5000    │             │
│  │  (前端静态)   │  (后端API)   │             │
│  └──────────────┴──────────────┘             │
└────────────────┬────────────────────────────┘
                 │
       ┌─────────┴──────────┐
       ▼                    ▼
┌──────────────┐    ┌──────────────────┐
│  dist/ 目录   │    │ Node.js :5000    │
│  (Vue 构建)   │    │ Express API      │
└──────────────┘    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ MySQL (localhost) │
                    │ community_db      │
                    └──────────────────┘
```

---

## 需要帮助？

如果按照本文档操作仍有问题，请收集以下信息排查：

1. 执行 `systemctl status fitness-api` 的截图
2. 执行 `journalctl -u fitness-api -n 50` 的日志
3. 执行 `nginx -t` 的结果
4. 浏览器开发者工具（F12）Network 面板的报错截图
