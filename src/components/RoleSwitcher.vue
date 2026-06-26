<template>
  <el-dropdown v-if="allRoles.length > 1" trigger="click" @command="handleSwitch">
    <span class="role-switch-btn">
      <span class="role-dot" :style="{ background: currentDef.color }"></span>
      <span class="role-label">{{ currentDef.label }}</span>
      <el-icon class="role-arrow"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <div class="role-menu-header">切换身份</div>
        <el-dropdown-item
          v-for="role in allRoles"
          :key="role"
          :command="role"
          :class="{ 'role-active': role === activeRole }"
        >
          <span class="role-dot" :style="{ background: ROLE_DEFINITIONS[role]?.color || '#999' }"></span>
          <span>{{ ROLE_DEFINITIONS[role]?.label || role }}</span>
          <el-icon v-if="role === activeRole" class="role-check"><Check /></el-icon>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 单角色时仅显示标签，不显示切换器 -->
  <span v-else class="role-switch-btn role-single">
    <span class="role-dot" :style="{ background: currentDef.color }"></span>
    <span class="role-label">{{ currentDef.label }}</span>
  </span>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ArrowDown, Check } from '@element-plus/icons-vue'
import { ROLE_DEFINITIONS, switchRole as permSwitchRole, getActiveRole, getUserRoles } from '../services/permission.js'

const activeRole = ref('user')
const allRoles = ref([])

const refreshAll = () => {
  activeRole.value = getActiveRole()
  allRoles.value = getUserRoles()
}

const currentDef = computed(() => {
  return ROLE_DEFINITIONS[activeRole.value] || { label: '未知', color: '#999' }
})

const handleSwitch = (role) => {
  if (role === activeRole.value) return
  
  refreshAll()
  const roles = allRoles.value
  if (!roles.includes(role)) return
  
  permSwitchRole(role)
  activeRole.value = role
  const def = ROLE_DEFINITIONS[role]
  if (def && def.home) {
    window.location.href = def.home
  }
}

// 定时轮询检查角色变化（每2秒检查一次，检测新审批通过的角色）
let pollTimer = null

onMounted(() => {
  refreshAll()
  window.addEventListener('focus', refreshAll)
  window.addEventListener('storage', refreshAll)
  pollTimer = setInterval(refreshAll, 2000)
})

onUnmounted(() => {
  window.removeEventListener('focus', refreshAll)
  window.removeEventListener('storage', refreshAll)
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style scoped>
.role-switch-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #e8e8e8;
  background: #fafafa;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  user-select: none;
}

.role-switch-btn:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}

.role-single {
  cursor: default;
}

.role-single:hover {
  border-color: #e8e8e8;
  background: #fafafa;
}

.role-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.role-label {
  color: #333;
  font-weight: 500;
}

.role-arrow {
  font-size: 10px;
  color: #999;
}

.role-menu-header {
  padding: 8px 20px;
  font-size: 12px;
  color: #999;
  border-bottom: 1px solid #f0f0f0;
}

.role-active {
  background: #e6f7ff;
}

.role-check {
  margin-left: auto;
  color: #1890ff;
  font-size: 14px;
}
</style>
