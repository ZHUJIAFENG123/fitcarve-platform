<template>
  <div class="admin-logs">
    <Navbar :menu-links="adminMenuLinks" :logo-suffix="'管理后台'" />
    <div class="admin-content">
      <div class="page-header">
        <h2>操作日志</h2>
      </div>
      <div class="search-bar">
        <el-input v-model="searchQuery" placeholder="搜索操作内容" prefix-icon="el-icon-search" style="width: 280px" />
        <el-select v-model="typeFilter" placeholder="按操作类型筛选" style="width: 160px">
          <el-option label="全部" value="" />
          <el-option label="用户管理" value="user_management" />
          <el-option label="内容审核" value="content_audit" />
          <el-option label="系统配置" value="system_config" />
          <el-option label="评论管理" value="comment_management" />
        </el-select>
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 280px" />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="filteredLogs" style="width: 100%" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="operator" label="操作人" width="120" />
        <el-table-column prop="type" label="操作类型" width="120">
          <template #default="scope">
            <el-tag :type="getTypeType(scope.row.type)">{{ getTypeName(scope.row.type) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="操作内容" min-width="280" />
        <el-table-column prop="target" label="操作对象" width="140" />
        <el-table-column prop="ip" label="操作IP" width="140" />
        <el-table-column prop="createdAt" label="操作时间" width="180" />
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="filteredLogs.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'

const adminMenuLinks = [
  { to: '/admin/dashboard', label: '后台首页', active: false },
  { to: '/admin/config', label: '系统配置', active: false },
  { to: '/admin/users', label: '用户管理', active: false },
  { to: '/admin/audit', label: '资讯审核', active: false },
  { to: '/admin/comments', label: '评论监控', active: false },
  { to: '/admin/logs', label: '操作日志', active: true },
  { to: '/admin/reports', label: '数据报表', active: false }
]

const searchQuery = ref('')
const typeFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)

const logs = ref([
  { id: 1, operator: 'admin', type: 'user_management', content: '新增用户 user4', target: '用户管理', ip: '127.0.0.1', createdAt: '2023-01-01 10:00:00' },
  { id: 2, operator: 'admin', type: 'content_audit', content: '通过资讯 "健身初学者必备的5个基础动作"', target: '资讯审核', ip: '127.0.0.1', createdAt: '2023-01-01 10:30:00' },
  { id: 3, operator: 'admin', type: 'content_audit', content: '驳回资讯 "常见健身误区解析"', target: '资讯审核', ip: '127.0.0.1', createdAt: '2023-01-01 11:00:00' },
  { id: 4, operator: 'admin', type: 'system_config', content: '修改网站名称为 "健身资讯平台"', target: '系统配置', ip: '127.0.0.1', createdAt: '2023-01-01 11:30:00' },
  { id: 5, operator: 'admin', type: 'comment_management', content: '删除评论 ID: 5', target: '评论管理', ip: '127.0.0.1', createdAt: '2023-01-01 12:00:00' },
  { id: 6, operator: 'admin', type: 'user_management', content: '修改用户 user1 角色为教练', target: '用户管理', ip: '127.0.0.1', createdAt: '2023-01-01 12:30:00' },
  { id: 7, operator: 'admin', type: 'content_audit', content: '通过课程 "力量训练基础"', target: '课程审核', ip: '127.0.0.1', createdAt: '2023-01-01 13:00:00' },
  { id: 8, operator: 'admin', type: 'system_config', content: '修改联系邮箱', target: '系统配置', ip: '127.0.0.1', createdAt: '2023-01-01 13:30:00' }
])

const filteredLogs = computed(() => {
  let result = logs.value
  if (searchQuery.value) result = result.filter(l => l.content.includes(searchQuery.value))
  if (typeFilter.value) result = result.filter(l => l.type === typeFilter.value)
  if (dateRange.value && dateRange.value.length === 2) {
    const s = new Date(dateRange.value[0]), e = new Date(dateRange.value[1])
    result = result.filter(l => { const d = new Date(l.createdAt); return d >= s && d <= e })
  }
  return result
})

const getTypeType = (t) => ({ user_management: 'info', content_audit: 'warning', system_config: 'success', comment_management: 'danger' }[t] || 'info')
const getTypeName = (t) => ({ user_management: '用户管理', content_audit: '内容审核', system_config: '系统配置', comment_management: '评论管理' }[t] || t)
const handleSearch = () => { currentPage.value = 1 }
</script>

<style scoped>
.admin-logs { min-height: 100vh; background: #f5f5f5; }
.admin-content { max-width: 1400px; margin: 0 auto; padding: 20px; }
.page-header { margin-bottom: 24px; }
.page-header h2 { font-size: 20px; color: #333; margin: 0; padding-bottom: 10px; border-bottom: 2px solid #1890ff; display: inline-block; }
.search-bar { margin-bottom: 20px; display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }

@media (max-width: 768px) {
  .admin-content { padding: 12px; }
  .search-bar { flex-direction: column; align-items: stretch; }
  .search-bar .el-input, .search-bar .el-select, .search-bar .el-date-picker { width: 100% !important; }
}
</style>
