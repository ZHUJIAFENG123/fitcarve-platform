#!/bin/bash
set -e

# =============================================================================
# 炼刻健身平台 - 腾讯云一键部署脚本
# 适用系统：Ubuntu 20.04/22.04 / CentOS 7/8
# 说明：在全新的云服务器上自动安装环境、拉取代码、构建并启动服务
# =============================================================================

PROJECT_DIR="/var/www/fitness-frontend"
GITHUB_REPO=""  # 使用时请替换为你的 GitHub 仓库地址，例如：https://github.com/username/fitness-frontend.git

echo "========================================"
echo "  炼刻健身平台 - 腾讯云一键部署脚本"
echo "========================================"

# ---------- 0. 检查 root 权限 ----------
if [ "$EUID" -ne 0 ]; then
    echo "❌ 请使用 root 用户运行此脚本：sudo bash install.sh"
    exit 1
fi

# ---------- 1. 检测系统类型 ----------
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VER=$VERSION_ID
else
    echo "❌ 无法检测操作系统类型"
    exit 1
fi

echo "📦 检测到系统：$OS $VER"

# ---------- 2. 更新系统并安装基础工具 ----------
echo "📦 [1/9] 更新系统软件包..."
if [ "$OS" == "ubuntu" ] || [ "$OS" == "debian" ]; then
    apt-get update -y
    apt-get install -y curl wget git nginx mysql-server
elif [ "$OS" == "centos" ] || [ "$OS" == "rhel" ] || [ "$OS" == "fedora" ]; then
    yum update -y
    yum install -y curl wget git nginx mysql-server
else
    echo "❌ 不支持的操作系统：$OS"
    exit 1
fi

# ---------- 3. 安装 Node.js 20 (LTS) ----------
echo "📦 [2/9] 安装 Node.js 20..."
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'v' -f2 | cut -d'.' -f1)" != "20" ]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    if [ "$OS" == "ubuntu" ] || [ "$OS" == "debian" ]; then
        apt-get install -y nodejs
    else
        yum install -y nodejs
    fi
fi
echo "✅ Node.js 版本：$(node -v)"
echo "✅ NPM 版本：$(npm -v)"

# ---------- 4. 配置 MySQL ----------
echo "📦 [3/9] 配置 MySQL..."
if [ "$OS" == "ubuntu" ] || [ "$OS" == "debian" ]; then
    systemctl start mysql
    systemctl enable mysql
elif [ "$OS" == "centos" ] || [ "$OS" == "rhel" ]; then
    systemctl start mysqld
    systemctl enable mysqld
fi

# 设置 MySQL root 密码
MYSQL_ROOT_PASSWORD="FitnessRoot$(date +%s)"
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PASSWORD}'; FLUSH PRIVILEGES;" || true

echo "✅ MySQL root 密码已设置为：${MYSQL_ROOT_PASSWORD}"
echo "   请妥善保存，后续创建数据库需要用到"

# ---------- 5. 拉取项目代码 ----------
echo "📦 [4/9] 拉取项目代码..."
if [ -z "$GITHUB_REPO" ]; then
    echo "⚠️  请先在脚本顶部修改 GITHUB_REPO 变量为你的 GitHub 仓库地址"
    echo "   示例：GITHUB_REPO=https://github.com/你的用户名/fitness-frontend.git"
    exit 1
fi

rm -rf "$PROJECT_DIR"
git clone "$GITHUB_REPO" "$PROJECT_DIR"
cd "$PROJECT_DIR"

# ---------- 6. 安装依赖并构建 ----------
echo "📦 [5/9] 安装前端依赖并构建..."
cd "$PROJECT_DIR"
npm ci
npm run build

echo "📦 [6/9] 安装后端依赖..."
cd "$PROJECT_DIR/backend"
npm ci

# ---------- 7. 配置环境变量 ----------
echo "📦 [7/9] 配置环境变量..."
cd "$PROJECT_DIR/backend"

# 生成随机 JWT Secret
JWT_SECRET=$(openssl rand -base64 48 2>/dev/null || cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)

# 复制环境变量模板
cp "$PROJECT_DIR/deploy/tencent/.env.example" .env

# 提示用户输入数据库密码
read -sp "请设置数据库用户密码（建议高强度密码）：" DB_PASSWORD
echo ""

# 创建数据库和用户
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "
CREATE DATABASE IF NOT EXISTS community_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'fitness_user'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON community_db.* TO 'fitness_user'@'localhost';
FLUSH PRIVILEGES;
" || {
    echo "⚠️  数据库创建失败，请手动执行数据库初始化"
}

# 替换 .env 中的密码
sed -i "s/MYSQL_PASSWORD=.*/MYSQL_PASSWORD=${DB_PASSWORD}/" .env
sed -i "s/JWT_SECRET=.*/JWT_SECRET=${JWT_SECRET}/" .env
sed -i "s|MYSQL_HOST=.*|MYSQL_HOST=localhost|" .env
sed -i "s|MYSQL_USER=.*|MYSQL_USER=fitness_user|" .env
sed -i "s|MYSQL_DATABASE=.*|MYSQL_DATABASE=community_db|" .env

echo "✅ 环境变量已配置"
echo "   JWT_SECRET: ${JWT_SECRET:0:20}..."

# ---------- 8. 初始化数据库 ----------
echo "📦 [8/9] 初始化数据库..."
cd "$PROJECT_DIR/backend"
if [ -f "schema.sql" ]; then
    mysql -u fitness_user -p"${DB_PASSWORD}" community_db < schema.sql
    echo "✅ 数据库表结构已导入"
fi

if [ -f "seed-all.js" ]; then
    node seed-all.js || echo "⚠️ 数据种子执行失败，可稍后手动执行：node seed-all.js"
fi

# ---------- 9. 配置 Nginx 和 Systemd ----------
echo "📦 [9/9] 配置 Nginx 和系统服务..."

cp "$PROJECT_DIR/deploy/tencent/nginx.conf" /etc/nginx/sites-available/fitness
ln -sf /etc/nginx/sites-available/fitness /etc/nginx/sites-enabled/fitness
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
systemctl enable nginx

cp "$PROJECT_DIR/deploy/tencent/fitness-api.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable fitness-api
systemctl start fitness-api

# ---------- 完成 ----------
echo ""
echo "========================================"
echo "  🎉 部署完成！"
echo "========================================"
echo ""
echo "📋 服务状态："
echo "   Nginx:     $(systemctl is-active nginx)"
echo "   MySQL:     $(systemctl is-active mysql || systemctl is-active mysqld)"
echo "   Fitness API: $(systemctl is-active fitness-api)"
echo ""
echo "🌐 访问地址："
echo "   http://$(curl -s ifconfig.me || hostname -I | awk '{print $1}')"
echo ""
echo "📁 项目目录：$PROJECT_DIR"
echo "📁 后端目录：$PROJECT_DIR/backend"
echo "🔧 环境文件：$PROJECT_DIR/backend/.env"
echo ""
echo "⚠️  重要提醒："
echo "   1. MySQL root 密码：${MYSQL_ROOT_PASSWORD}"
echo "   2. 请尽快配置服务器防火墙（安全组），只开放 80/443 端口"
echo "   3. 建议配置 HTTPS（可使用腾讯云免费 SSL 证书）"
echo "   4. 如需修改配置，编辑 .env 后执行：systemctl restart fitness-api"
echo ""
echo "📖 查看后端日志：journalctl -u fitness-api -f"
echo "📖 查看 Nginx 日志：tail -f /var/log/nginx/error.log"
echo ""
