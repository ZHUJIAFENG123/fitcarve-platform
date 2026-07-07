<template>
  <div class="admin-layout">
    <AdminSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <div class="admin-layout__main">
      <header class="admin-layout__header">
        <button class="admin-layout__menu-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <el-icon :size="20"><Menu /></el-icon>
        </button>
        <div class="admin-layout__breadcrumb">
          <span class="admin-layout__crumb">管理后台</span>
          <span v-if="currentPageTitle" class="admin-layout__crumb-sep">/</span>
          <span v-if="currentPageTitle" class="admin-layout__crumb admin-layout__crumb--current">{{ currentPageTitle }}</span>
        </div>
        <div class="admin-layout__actions">
          <el-dropdown trigger="click" @command="handleUserCommand">
            <span class="admin-layout__user">
              <el-avatar :size="28" :src="userAvatar">
                <el-icon :size="16"><User /></el-icon>
              </el-avatar>
              <span class="admin-layout__username">{{ username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <main class="admin-layout__content">
        <router-view />
      </main>
    </div>

    <!-- Mobile overlay -->
    <div v-if="!sidebarCollapsed && isMobile" class="admin-layout__overlay" @click="sidebarCollapsed = true" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminSidebar from './AdminSidebar.vue'
import { Menu, User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const sidebarCollapsed = ref(false)
const isMobile = ref(false)
const username = ref('管理员')
const userAvatar = ref('')

const pageTitles = {
  '/admin/dashboard': '数据概览',
  '/admin/users': '用户管理',
  '/admin/audit': '资讯审核',
  '/admin/comments': '评论监控',
  '/admin/config': '系统配置',
  '/admin/logs': '操作日志',
  '/admin/reports': '数据报表'
}

const currentPageTitle = computed(() => pageTitles[route.path] || '')

function handleUserCommand(cmd) {
  if (cmd === 'logout') {
    localStorage.removeItem('token')
    router.push('/login')
  } else if (cmd === 'profile') {
    router.push('/profile')
  }
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
  if (isMobile.value) sidebarCollapsed.value = true
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-bg);
}

.admin-layout__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.admin-layout__header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-5);
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-light);
  height: 52px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.admin-layout__menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
}
.admin-layout__menu-btn:hover {
  background: var(--color-surface);
}

.admin-layout__breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  flex: 1;
}

.admin-layout__crumb {
  color: var(--color-text-tertiary);
}
.admin-layout__crumb--current {
  color: var(--color-text-primary);
  font-weight: 600;
}
.admin-layout__crumb-sep {
  color: var(--color-border);
}

.admin-layout__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.admin-layout__user {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.admin-layout__username {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.admin-layout__content {
  flex: 1;
  padding: var(--space-5);
}

.admin-layout__overlay {
  display: none;
}

@media (max-width: 768px) {
  .admin-layout__menu-btn {
    display: flex;
  }
  .admin-layout__content {
    padding: var(--space-4);
  }
  .admin-layout__overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 99;
  }
}
</style>
