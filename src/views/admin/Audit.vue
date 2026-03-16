<template>
  <div class="admin-audit">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>资讯审核</span>
        </div>
      </template>
      
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索资讯标题或内容"
          prefix-icon="el-icon-search"
          style="width: 300px; margin-right: 10px"
        />
        <el-select v-model="statusFilter" placeholder="按状态筛选" style="width: 150px; margin-right: 10px">
          <el-option label="全部" value="" />
          <el-option label="待审核" value="pending" />
          <el-option label="已通过" value="approved" />
          <el-option label="已驳回" value="rejected" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      
      <el-table :data="filteredNews" style="width: 100%" border>
        <el-table-column prop="id" label="资讯ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="300">
          <template #default="scope">
            <a href="javascript:void(0)" @click="viewNews(scope.row)">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创作者" width="120" />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusName(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="viewNews(scope.row)">查看</el-button>
            <el-button size="small" type="success" @click="approveNews(scope.row.id)" v-if="scope.row.status === 'pending'">通过</el-button>
            <el-button size="small" type="danger" @click="rejectNews(scope.row.id)" v-if="scope.row.status === 'pending'">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredNews.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 资讯详情对话框 -->
    <el-dialog
      v-model="newsDialogVisible"
      title="资讯详情"
      width="800px"
      :close-on-click-modal="false"
    >
      <div v-if="currentNews">
        <h2>{{ currentNews.title }}</h2>
        <div class="news-meta">
          <span>创作者: {{ currentNews.creator }}</span>
          <span>分类: {{ currentNews.category }}</span>
          <span>创建时间: {{ currentNews.createdAt }}</span>
        </div>
        <div class="news-content" v-html="currentNews.content"></div>
        <div class="news-status" v-if="currentNews.status !== 'pending'">
          <p>审核状态: <el-tag :type="getStatusType(currentNews.status)">{{ getStatusName(currentNews.status) }}</el-tag></p>
          <p v-if="currentNews.auditBy">审核人: {{ currentNews.auditBy }}</p>
          <p v-if="currentNews.auditAt">审核时间: {{ currentNews.auditAt }}</p>
          <p v-if="currentNews.reason" class="reject-reason">驳回原因: {{ currentNews.reason }}</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newsDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 驳回原因对话框 -->
    <el-dialog
      v-model="rejectDialogVisible"
      title="驳回原因"
      width="500px"
    >
      <el-form :model="rejectForm">
        <el-form-item label="驳回原因">
          <el-input
            v-model="rejectForm.reason"
            type="textarea"
            rows="4"
            placeholder="请输入驳回原因"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rejectDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmReject">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索和筛选
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 对话框状态
const newsDialogVisible = ref(false)
const rejectDialogVisible = ref(false)

// 表单数据
const rejectForm = ref({
  reason: '',
  newsId: ''
})

// 当前查看的资讯
const currentNews = ref(null)

// 模拟资讯数据
const news = ref([
  {
    id: 1,
    title: '健身初学者必备的5个基础动作',
    content: '<p>对于健身初学者来说，掌握基础动作至关重要。本文将介绍5个最基础的健身动作，帮助你建立良好的健身习惯。</p><p>1. 深蹲：锻炼大腿和臀部肌肉</p><p>2. 俯卧撑：锻炼胸部和手臂肌肉</p><p>3. 平板支撑：锻炼核心肌群</p><p>4. 引体向上：锻炼背部肌肉</p><p>5. 卧推：锻炼胸部肌肉</p>',
    creator: 'creator1',
    category: '健身指南',
    status: 'pending',
    createdAt: '2023-01-01 10:00:00'
  },
  {
    id: 2,
    title: '如何制定科学的健身计划',
    content: '<p>制定科学的健身计划是健身成功的关键。本文将教你如何根据自己的目标和身体状况制定适合自己的健身计划。</p>',
    creator: 'creator2',
    category: '健身指南',
    status: 'pending',
    createdAt: '2023-01-02 11:00:00'
  },
  {
    id: 3,
    title: '健身饮食的重要性',
    content: '<p>健身不仅需要锻炼，还需要合理的饮食。本文将介绍健身饮食的基本原则和注意事项。</p>',
    creator: 'creator1',
    category: '营养饮食',
    status: 'approved',
    createdAt: '2023-01-03 12:00:00',
    auditBy: 'admin',
    auditAt: '2023-01-03 14:00:00'
  },
  {
    id: 4,
    title: '常见健身误区解析',
    content: '<p>健身过程中存在很多误区，本文将为你解析这些误区，帮助你避免走弯路。</p>',
    creator: 'creator3',
    category: '健身指南',
    status: 'rejected',
    createdAt: '2023-01-04 13:00:00',
    auditBy: 'admin',
    auditAt: '2023-01-04 15:00:00',
    reason: '内容存在错误信息，需要修改后重新提交'
  },
  {
    id: 5,
    title: '如何选择适合自己的健身器材',
    content: '<p>选择适合自己的健身器材对于健身效果至关重要。本文将介绍不同健身器材的特点和适用人群。</p>',
    creator: 'creator2',
    category: '健身装备',
    status: 'pending',
    createdAt: '2023-01-05 14:00:00'
  }
])

// 过滤后的资讯列表
const filteredNews = computed(() => {
  let result = news.value
  
  if (searchQuery.value) {
    result = result.filter(item => 
      item.title.includes(searchQuery.value) || 
      item.content.includes(searchQuery.value)
    )
  }
  
  if (statusFilter.value) {
    result = result.filter(item => item.status === statusFilter.value)
  }
  
  return result
})

// 状态类型映射
const getStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || 'info'
}

// 状态名称映射
const getStatusName = (status) => {
  const nameMap = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回'
  }
  return nameMap[status] || status
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

// 查看资讯详情
const viewNews = (newsItem) => {
  currentNews.value = { ...newsItem }
  newsDialogVisible.value = true
}

// 批准资讯
const approveNews = (id) => {
  ElMessageBox.confirm('确定要通过该资讯吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'success'
  }).then(() => {
    const index = news.value.findIndex(item => item.id === id)
    if (index !== -1) {
      news.value[index].status = 'approved'
      news.value[index].auditBy = 'admin'
      news.value[index].auditAt = new Date().toLocaleString()
      ElMessage.success('资讯已通过审核')
    }
  }).catch(() => {
    // 取消操作
  })
}

// 驳回资讯
const rejectNews = (id) => {
  rejectForm.value = {
    reason: '',
    newsId: id
  }
  rejectDialogVisible.value = true
}

// 确认驳回
const confirmReject = () => {
  if (!rejectForm.value.reason) {
    ElMessage.warning('请输入驳回原因')
    return
  }
  
  const index = news.value.findIndex(item => item.id === rejectForm.value.newsId)
  if (index !== -1) {
    news.value[index].status = 'rejected'
    news.value[index].reason = rejectForm.value.reason
    news.value[index].auditBy = 'admin'
    news.value[index].auditAt = new Date().toLocaleString()
    ElMessage.success('资讯已驳回')
    rejectDialogVisible.value = false
  }
}
</script>

<style scoped>
.admin-audit {
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

.news-meta {
  margin: 10px 0;
  color: #666;
  font-size: 14px;
}

.news-meta span {
  margin-right: 20px;
}

.news-content {
  margin: 20px 0;
  line-height: 1.6;
}

.news-status {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 14px;
}

.reject-reason {
  color: #f56c6c;
}

@media (max-width: 768px) {
  .admin-audit {
    padding: 10px;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-bar .el-input,
  .search-bar .el-select {
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