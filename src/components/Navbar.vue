<template>
  <header class="navbar">
    <div class="nav-content">
      <div class="logo">
        <img src="/logo.png" alt="Logo" class="logo-img" />
        <h1>{{ logoSuffix ? `健身资讯网站 - ${logoSuffix}` : '健身资讯网站' }}</h1>
      </div>
      <nav class="nav-menu">
        <a v-for="link in menuLinks" :key="link.to" :href="link.to" :class="{ active: link.active }">{{ link.label }}</a>
      </nav>
      <div class="nav-search">
        <el-input
          v-model="searchQuery"
          placeholder="搜索资讯、课程..."
          prefix-icon="Search"
          size="small"
          class="search-input"
          @keyup.enter="handleSearch"
          clearable
        />
      </div>
      <ThemeToggle />
      <slot name="actions"></slot>
      <!-- 已登录：显示用户区域 -->
      <div class="user-info" v-if="loggedIn">
        <el-dropdown trigger="click">
          <el-button type="text" class="notification-btn">
            <el-icon :size="20"><Bell /></el-icon>
            <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="notification-header">
                <span>通知消息</span>
                <el-button type="text" size="small" @click="markAllAsRead">全部已读</el-button>
              </div>
              <el-dropdown-item
                v-for="notification in notifications"
                :key="notification.id"
                class="notification-item"
                :class="{ 'unread-item': !notification.read }"
                @click="onNotifyClick(notification)"
              >
                <div class="notification-content">
                  <div class="notification-top">
                    <span class="notification-dot" v-if="!notification.read"></span>
                    <span class="notification-title">{{ notification.title }}</span>
                  </div>
                  <div class="notification-desc">{{ notification.content }}</div>
                  <div class="notification-time">{{ notification.time }}</div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item v-if="notifications.length === 0" disabled>暂无通知</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-avatar size="36" :src="userAvatar">{{ userInitial }}</el-avatar>
        <span class="username">{{ username }}</span>
        <el-dropdown>
          <el-button type="text">
            <el-icon :size="16"><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/profile')">个人中心</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/favorites')">我的收藏</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/learning-progress')">学习进度</el-dropdown-item>
              <el-dropdown-item divided @click="$router.push('/user/publish-news')">✍ 发布资讯</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/user/publish-course')">📚 发布课程</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/user/manage-news')">📋 资讯管理</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/user/manage-courses')">🎓 课程管理</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/user/interaction')">💬 互动消息</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/user/statistics')">📊 数据统计</el-dropdown-item>
              <el-dropdown-item divided @click="doLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 未登录：显示登录/注册按钮 -->
      <div class="auth-btns" v-else>
        <el-button text class="login-link" @click="toLogin">登录</el-button>
        <el-button type="primary" size="small" round @click="toRegister">免费注册</el-button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Bell, ArrowDown, Search } from '@element-plus/icons-vue'
import ThemeToggle from '@/components/news/ThemeToggle.vue'

defineProps({
  logoSuffix: { type: String, default: '' },
  menuLinks: { type: Array, default: () => [] }
})

const notifications = ref([])
const unreadCount = ref(0)
function markAsRead() {}
function markAllAsRead() {}

const username = ref('用户')
const userAvatar = ref('')
const userInitial = computed(() => (username.value || '用').charAt(0))
const searchQuery = ref('')
const loggedIn = ref(false)

function checkLogin() {
  loggedIn.value = !!localStorage.getItem('token')
}

function loadUser() {
  checkLogin()
  if (!loggedIn.value) return
  try {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      const info = JSON.parse(stored)
      username.value = info.username || '用户'
      userAvatar.value = info.avatar || ''
    }
  } catch(e) {}
}

function onNotifyClick(notification) {
  markAsRead(notification.id)
  if (notification.link) {
    window.location.href = notification.link
  }
}

function doLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  window.location.href = '/login'
}

function toLogin() {
  window.location.href = '/login'
}

function toRegister() {
  window.location.href = '/register'
}

function handleSearch() {
  const q = searchQuery.value.trim()
  if (q) {
    window.location.href = `/news/list?search=${encodeURIComponent(q)}`
  }
}

onMounted(loadUser)
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-light);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.logo-img {
  height: 36px;
  width: auto;
}

.logo h1 {
  font-size: 18px;
  color: var(--color-primary);
  margin: 0;
  font-weight: 700;
  font-family: var(--font-display);
  white-space: nowrap;
}

.nav-menu {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: 500;
  padding: 6px 0;
  position: relative;
  transition: color 0.2s;
  white-space: nowrap;
  font-family: var(--font-body);
}

.nav-menu a:hover {
  color: var(--color-primary);
}

.nav-menu a.active {
  color: var(--color-primary);
  font-weight: 600;
}

.nav-menu a.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.username {
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.notification-btn {
  position: relative;
  padding: 4px;
  color: var(--color-primary) !important;
  transition: transform 0.2s;
}

.notification-btn:hover {
  transform: scale(1.1);
}

.unread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--color-accent);
  color: #fff;
  border-radius: 50%;
  min-width: 16px;
  height: 16px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0 3px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--color-border-light);
}

.notification-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: var(--color-bg-warm);
}

.notification-item.unread-item {
  background-color: var(--color-primary-50);
}

.notification-item.unread-item:hover {
  background-color: var(--color-primary-100);
}

.notification-content {
  min-width: 260px;
}

.notification-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.notification-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-accent);
  flex-shrink: 0;
}

.notification-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.notification-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* 响应式 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .nav-search {
    display: none;
  }
}

.nav-search {
  max-width: 240px;
  flex-shrink: 0;
}

.nav-search :deep(.el-input__wrapper) {
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border-color: transparent;
  box-shadow: none;
  transition: all 0.3s;
}

.nav-search :deep(.el-input__wrapper:hover) {
  background: var(--color-border-light);
}

.nav-search :deep(.el-input__wrapper.is-focus) {
  background: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(27, 107, 58, 0.1);
}

.auth-btns {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.login-link {
  font-size: 14px;
  color: var(--color-text-secondary) !important;
  font-weight: 500;
}

.login-link:hover {
  color: var(--color-primary) !important;
}
</style>
