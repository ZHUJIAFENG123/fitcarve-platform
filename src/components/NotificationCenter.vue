<template>
  <div class="notification-center">
    <el-badge :value="unreadCount" class="notification-badge">
      <el-button @click="toggleNotification" class="notification-btn">
        <i class="el-icon-bell"></i>
      </el-button>
    </el-badge>
    
    <div v-if="showNotification" class="notification-panel">
      <div class="notification-header">
        <h3>消息通知</h3>
        <el-button type="text" @click="markAllAsRead">全部已读</el-button>
      </div>
      
      <div class="notification-tabs">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane label="系统通知" name="system"></el-tab-pane>
          <el-tab-pane label="邮件通知" name="email"></el-tab-pane>
          <el-tab-pane label="站内信" name="message"></el-tab-pane>
        </el-tabs>
      </div>
      
      <div class="notification-list">
        <div 
          v-for="notification in filteredNotifications" 
          :key="notification.id"
          class="notification-item"
          :class="{ 'unread': !notification.read }"
          @click="markAsRead(notification.id)"
        >
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-body">{{ notification.content }}</div>
            <div class="notification-time">{{ notification.time }}</div>
          </div>
        </div>
        
        <div v-if="filteredNotifications.length === 0" class="empty-notification">
          暂无通知
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const notifications = ref([])
const unreadCount = ref(0)
function markAsRead() {}
function markAllAsRead() {}

const showNotification = ref(false)
const activeTab = ref('all')

// 过滤通知
const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === activeTab.value)
})

// 切换通知面板
const toggleNotification = () => {
  showNotification.value = !showNotification.value
}

// 点击外部关闭通知面板
const handleClickOutside = (event) => {
  const notificationCenter = document.querySelector('.notification-center')
  if (notificationCenter && !notificationCenter.contains(event.target)) {
    showNotification.value = false
  }
}

// 添加全局点击事件监听器
setTimeout(() => {
  document.addEventListener('click', handleClickOutside)
}, 0)

// 清理事件监听器
const cleanup = () => {
  document.removeEventListener('click', handleClickOutside)
}

// 组件卸载时清理
import { onUnmounted } from 'vue'
onUnmounted(cleanup)
</script>

<style scoped>
.notification-center {
  position: relative;
  display: inline-block;
}

.notification-btn {
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
}

.notification-badge {
  margin-right: 10px;
}

.notification-panel {
  position: absolute;
  top: 100%;
  right: 0;
  width: 400px;
  max-height: 500px;
  background-color: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.notification-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.notification-tabs {
  border-bottom: 1px solid #e4e7ed;
}

.notification-list {
  max-height: 350px;
  overflow-y: auto;
}

.notification-item {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #f0f9eb;
}

.notification-title {
  font-weight: 500;
  margin-bottom: 5px;
}

.notification-body {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: #909399;
}

.empty-notification {
  padding: 40px;
  text-align: center;
  color: #909399;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notification-panel {
    width: 300px;
  }
}
</style>
