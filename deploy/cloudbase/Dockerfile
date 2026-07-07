# =============================================================================
# 炼刻健身平台 - CloudBase 云托管 Dockerfile
# 说明：多阶段构建，前端构建产物 + 后端一体化部署
# =============================================================================

# ---------- 阶段 1：构建前端 ----------
FROM node:20-alpine AS builder

WORKDIR /build

# 先复制包管理文件（利用缓存层）
COPY package*.json ./
RUN npm ci

# 复制源代码并构建
COPY . .
RUN npm run build

# ---------- 阶段 2：运行环境 ----------
FROM node:20-alpine

# 安装基础工具（如需）
RUN apk add --no-cache curl

WORKDIR /app

# 1. 复制后端依赖文件并安装生产依赖
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --production

# 2. 复制后端源代码
COPY backend/ ./backend/

# 3. 复制前端构建产物（从阶段1）
COPY --from=builder /build/dist ./dist/

# 4. 复制 public 目录下的静态资源（exercise-gifs, news-images 等）
COPY public/ ./public/

# 5. 创建工作目录和上传目录
RUN mkdir -p /app/backend/uploads

WORKDIR /app/backend

# CloudBase 云托管要求监听 80 端口（或容器暴露的端口）
# 但我们保持 5000，在 CloudBase 控制台中配置端口映射
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

# 健康检查
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
