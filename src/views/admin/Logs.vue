<template>
  <div class="admin-logs">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>操作日志审计</span>
        </div>
      </template>
      
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索操作内容或用户"
          prefix-icon="el-icon-search"
          style="width: 300px; margin-right: 10px"
        />
        <el-select v-model="userFilter" placeholder="按用户筛选" style="width: 150px; margin-right: 10px">
          <el-option label="全部" value="" />
          <el-option label="admin" value="admin" />
          <el-option label="user1" value="user1" />
          <el-option label="coach1" value="coach1" />
          <el-option label="creator1" value="creator1" />
        </el-select>
        <el-select v-model="typeFilter" placeholder="按操作类型筛选" style="width: 150px; margin-right: 10px">
          <el-option label="全部" value="" />
          <el-option label="登录" value="login" />
          <el-option label="资讯管理" value="news" />
          <el-option label="用户管理" value="user" />
          <el-option label="系统配置" value="system" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 250px; margin-right: 10px"
        />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      
      <el-table :data="filteredLogs" style="width: 100%" border>
        <el-table-column prop="id" label="日志ID" width="80" />
        <el-table-column prop="user" label="操作用户" width="120" />
        <el-table-column prop="type" label="操作类型" width="120">
          <template #default="scope">
            <el-tag :type="getTypeType(scope.row.type)">
              {{ getTypeName(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作内容" min-width="300" />
        <el-table-column prop="ip" label="IP地址" width="150" />
        <el-table-column prop="createdAt" label="操作时间" width="180" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="viewLog(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredLogs.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 日志详情对话框 -->
    <el-dialog
      v-model="logDialogVisible"
      title="操作日志详情"
      width="600px"
    >
      <div v-if="currentLog">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="日志ID">{{ currentLog.id }}</el-descriptions-item>
          <el-descriptions-item label="操作用户">{{ currentLog.user }}</el-descriptions-item>
          <el-descriptions-item label="操作类型">{{ getTypeName(currentLog.type) }}</el-descriptions-item>
          <el-descriptions-item label="操作内容">{{ currentLog.action }}</el-descriptions-item>
          <el-descriptions-item label="IP地址">{{ currentLog.ip }}</el-descriptions-item>
          <el-descriptions-item label="操作时间">{{ currentLog.createdAt }}</el-descriptions-item>
          <el-descriptions-item label="详细信息" v-if="currentLog.details">
            <pre>{{ JSON.stringify(currentLog.details, null, 2) }}</pre>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="logDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索和筛选
const searchQuery = ref('')
const userFilter = ref('')
const typeFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)

// 对话框状态
const logDialogVisible = ref(false)

// 当前查看的日志
const currentLog = ref(null)

// 模拟操作日志数据
const logs = ref([
  {
    id: 1,
    user: 'admin',
    type: 'login',
    action: '用户登录',
    ip: '192.168.1.100',
    createdAt: '2023-01-01 10:00:00',
    details: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  },
  {
    id: 2,
    user: 'admin',
    type: 'news',
    action: '审核资讯通过',
    ip: '192.168.1.100',
    createdAt: '2023-01-01 10:30:00',
    details: {
      newsId: 3,
      newsTitle: '健身饮食的重要性'
    }
  },
  {
    id: 3,
    user: 'admin',
    type: 'news',
    action: '审核资讯驳回',
    ip: '192.168.1.100',
    createdAt: '2023-01-01 11:00:00',
    details: {
      newsId: 4,
      newsTitle: '常见健身误区解析',
      reason: '内容存在错误信息，需要修改后重新提交'
    }
  },
  {
    id: 4,
    user: 'admin',
    type: 'user',
    action: '新增用户',
    ip: '192.168.1.100',
    createdAt: '2023-01-01 11:30:00',
    details: {
      userId: 11,
      username: 'user4',
      role: 'user'
    }
  },
  {
    id: 5,
    user: 'creator1',
    type: 'news',
    action: '发布资讯',
    ip: '192.168.1.101',
    createdAt: '2023-01-01 12:00:00',
    details: {
      newsId: 6,
      newsTitle: '如何正确进行有氧运动'
    }
  },
  {
    id: 6,
    user: 'coach1',
    type: 'login',
    action: '用户登录',
    ip: '192.168.1.102',
    createdAt: '2023-01-01 12:30:00',
    details: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  },
  {
    id: 7,
    user: 'admin',
    type: 'system',
    action: '修改系统配置',
    ip: '192.168.1.100',
    createdAt: '2023-01-01 13:00:00',
    details: {
      configKey: 'site_name',
      oldValue: '健身资讯平台',
      newValue: '健身资讯网'
    }
  },
  {
    id: 8,
    user: 'user1',
    type: 'login',
    action: '用户登录',
    ip: '192.168.1.103',
    createdAt: '2023-01-01 13:30:00',
    details: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  }
])

// 过滤后的日志列表
const filteredLogs = computed(() => {
  let result = logs.value
  
  if (searchQuery.value) {
    result = result.filter(item => 
      item.action.includes(searchQuery.value) || 
      item.user.includes(searchQuery.value)
    )
  }
  
  if (userFilter.value) {
    result = result.filter(item => item.user === userFilter.value)
  }
  
  if (typeFilter.value) {
    result = result.filter(item => item.type === typeFilter.value)
  }
  
  if (dateRange.value && dateRange.value.length === 2) {
    const startDate = new Date(dateRange.value[0])
    const endDate = new Date(dateRange.value[1])
    result = result.filter(item => {
      const logDate = new Date(item.createdAt)
      return logDate >= startDate && logDate <= endDate
    })
  }
  
  return result
})

// 操作类型映射
const getTypeType = (type) => {
  const typeMap = {
    login: 'info',
    news: 'warning',
    user: 'success',
    system: 'danger'
  }
  return typeMap[type] || 'info'
}

// 操作类型名称映射
const getTypeName = (type) => {
  const nameMap = {
    login: '登录',
    news: '资讯管理',
    user: '用户管理',
    system: '系统配置'
  }
  return nameMap[type] || type
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 查看日志详情
const viewLog = (log) => {
  currentLog.value = { ...log }
  logDialogVisible.value = true
}
</script>

<style scoped>
.admin-logs {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

@media (max-width: 768px) {
  .admin-logs {
    padding: 10px;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-bar .el-input,
  .search-bar .el-select,
  .search-bar .el-date-picker {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .search-bar .el-button {
    width: 100%;
  }
  
  .el-dialog {
    width: 90% !important;
  }
}
</style>