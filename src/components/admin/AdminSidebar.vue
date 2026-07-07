<template>
  <aside class="admin-sidebar" :class="{ 'admin-sidebar--collapsed': collapsed }">
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <img src="/logo.png" alt="炼刻" class="sidebar-logo" />
        <span v-show="!collapsed" class="sidebar-brand-text">炼刻</span>
      </div>
      <span v-show="!collapsed" class="sidebar-badge">管理后台</span>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="sidebar-link"
        :class="{ 'sidebar-link--active': isActive(item.path) }"
      >
        <el-icon :size="20"><component :is="item.icon" /></el-icon>
        <span v-show="!collapsed" class="sidebar-link__text">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <button class="sidebar-toggle" @click="$emit('toggle')">
        <el-icon :size="18">
          <component :is="collapsed ? 'DArrowRight' : 'DArrowLeft'" />
        </el-icon>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  TrendCharts, Setting, User, DocumentChecked,
  ChatDotRound, Notebook, DataAnalysis, DArrowLeft, DArrowRight
} from '@element-plus/icons-vue'

defineProps({
  collapsed: { type: Boolean, default: false }
})

defineEmits(['toggle'])

const route = useRoute()

const menuItems = [
  { path: '/admin/dashboard', label: '数据概览', icon: TrendCharts },
  { path: '/admin/users', label: '用户管理', icon: User },
  { path: '/admin/audit', label: '资讯审核', icon: DocumentChecked },
  { path: '/admin/comments', label: '评论监控', icon: ChatDotRound },
  { path: '/admin/config', label: '系统配置', icon: Setting },
  { path: '/admin/logs', label: '操作日志', icon: Notebook },
  { path: '/admin/reports', label: '数据报表', icon: DataAnalysis }
]

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.admin-sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--color-bg-card);
  border-right: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.admin-sidebar--collapsed {
  width: 64px;
}

.sidebar-header {
  padding: var(--space-5) var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.sidebar-logo {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.sidebar-brand-text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.sidebar-badge {
  display: inline-block;
  margin-top: var(--space-2);
  padding: 2px 8px;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-primary-50);
  border-radius: var(--radius-full);
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-3) var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: var(--transition-fast);
  white-space: nowrap;
}

.sidebar-link:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.sidebar-link--active {
  background: var(--color-primary-50);
  color: var(--color-primary);
  font-weight: 600;
}

.sidebar-link--active:hover {
  background: var(--color-primary-100);
  color: var(--color-primary);
}

.sidebar-link__text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  padding: var(--space-3);
  border-top: 1px solid var(--color-border-light);
}

.sidebar-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  border: none;
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}
.sidebar-toggle:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    box-shadow: var(--shadow-xl);
  }
  .admin-sidebar--collapsed {
    width: 0;
    border: none;
    overflow: hidden;
  }
}
</style>
