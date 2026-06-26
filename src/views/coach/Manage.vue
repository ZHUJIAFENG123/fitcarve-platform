<template>
  <div class="manage-container">
    <Navbar :menu-links="coachMenuLinks" />
    <!-- 课程管理内容 -->
    <div class="manage-content">
      <h2>课程管理</h2>
      
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索课程标题"
          prefix-icon="el-icon-search"
          style="width: 300px; margin-right: 10px"
        />
        <el-select v-model="statusFilter" placeholder="按状态筛选" style="width: 150px; margin-right: 10px">
          <el-option label="全部" value="" />
          <el-option label="待审核" value="pending" />
          <el-option label="已通过" value="approved" />
          <el-option label="已驳回" value="rejected" />
          <el-option label="已下架" value="offline" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
      
      <el-table :data="filteredCourses" style="width: 100%" border>
        <el-table-column prop="id" label="课程ID" width="80" />
        <el-table-column prop="title" label="课程标题" min-width="300">
          <template #default="scope">
            <a href="javascript:void(0)" @click="viewCourse(scope.row)">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="level" label="难度" width="100" />
        <el-table-column prop="price" label="价格" width="100" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusName(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column prop="views" label="浏览量" width="80" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="editCourse(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteCourse(scope.row.id)">删除</el-button>
            <el-button size="small" v-if="scope.row.status === 'approved'" @click="toggleStatus(scope.row.id, 'offline')">下架</el-button>
            <el-button size="small" v-else-if="scope.row.status === 'offline'" type="success" @click="toggleStatus(scope.row.id, 'approved')">上架</el-button>
            <el-button size="small" v-if="scope.row.status === 'rejected'" @click="viewRejectReason(scope.row)">查看原因</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredCourses.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    
    <!-- 驳回原因对话框 -->
    <el-dialog
      v-model="reasonDialogVisible"
      title="驳回原因"
      width="500px"
    >
      <div v-if="currentCourse">
        <h4>{{ currentCourse.title }}</h4>
        <div class="reject-reason">
          <p><strong>驳回原因：</strong>{{ currentCourse.reason }}</p>
          <p><strong>驳回时间：</strong>{{ currentCourse.auditAt }}</p>
          <p><strong>审核人：</strong>{{ currentCourse.auditBy }}</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reasonDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

const coachMenuLinks = [
  { to: '/coach/publish', label: '内容发布', active: false },
  { to: '/coach/interaction', label: '用户互动', active: false },
  { to: '/coach/statistics', label: '数据统计', active: false },
  { to: '/coach/manage', label: '课程管理', active: true }
]

// 模拟用户信息
const username = ref('教练')
const userAvatar = ref('')

// 搜索和筛选
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 对话框状态
const reasonDialogVisible = ref(false)
const currentCourse = ref(null)

// 模拟课程数据
const courses = ref([
  {
    id: 1,
    title: '力量训练基础',
    category: '力量训练',
    level: '初级',
    price: 99,
    status: 'approved',
    createdAt: '2023-01-01 10:00:00',
    views: 125,
    auditBy: 'admin',
    auditAt: '2023-01-01 11:00:00'
  },
  {
    id: 2,
    title: '高级力量训练技巧',
    category: '力量训练',
    level: '高级',
    price: 199,
    status: 'pending',
    createdAt: '2023-01-02 14:30:00',
    views: 89
  },
  {
    id: 3,
    title: '有氧训练指南',
    category: '有氧运动',
    level: '中级',
    price: 129,
    status: 'rejected',
    createdAt: '2023-01-03 09:15:00',
    views: 67,
    reason: '课程内容不够详细，需要补充更多训练细节',
    auditBy: 'admin',
    auditAt: '2023-01-03 10:30:00'
  },
  {
    id: 4,
    title: '瑜伽入门',
    category: '瑜伽',
    level: '初级',
    price: 89,
    status: 'offline',
    createdAt: '2022-12-20 16:45:00',
    views: 234,
    auditBy: 'admin',
    auditAt: '2022-12-20 17:30:00'
  }
])

// 过滤后的课程列表
const filteredCourses = computed(() => {
  let result = courses.value
  
  if (searchQuery.value) {
    result = result.filter(course => course.title.includes(searchQuery.value))
  }
  
  if (statusFilter.value) {
    result = result.filter(course => course.status === statusFilter.value)
  }
  
  return result
})

// 状态类型映射
const getStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    offline: 'info'
  }
  return typeMap[status] || 'info'
}

// 状态名称映射
const getStatusName = (status) => {
  const nameMap = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回',
    offline: '已下架'
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

// 查看课程
const viewCourse = (course) => {
  router.push(`/courses/detail/${course.id}`)
}

const editCourse = (course) => {
  router.push({ path: '/coach/publish', query: { edit: JSON.stringify(course) } })
}

// 删除课程
const deleteCourse = (id) => {
  ElMessageBox.confirm('确定要删除该课程吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = courses.value.findIndex(course => course.id === id)
    if (index !== -1) {
      courses.value.splice(index, 1)
      ElMessage.success('课程删除成功')
    }
  }).catch(() => {
    // 取消删除
  })
}

// 切换课程状态（上架/下架）
const toggleStatus = (id, newStatus) => {
  const course = courses.value.find(course => course.id === id)
  if (course) {
    course.status = newStatus
    ElMessage.success(`课程已${newStatus === 'approved' ? '上架' : '下架'}`)
  }
}

// 查看驳回原因
const viewRejectReason = (course) => {
  currentCourse.value = { ...course }
  reasonDialogVisible.value = true
}

// 跳转到个人中心
const toProfile = () => {
  router.push('/profile')
}

// 退出登录
const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.manage-container { min-height: 100vh; background: var(--color-bg); }

.manage-content { max-width: 1200px; margin: 0 auto; padding: 20px; background: var(--color-bg-card); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--color-border-light); margin-top: 20px; margin-bottom: 20px; }
.manage-content h2 { font-size: 20px; color: var(--color-text-primary); margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid var(--color-primary); font-family: var(--font-display); font-weight: 700; }
.search-bar { margin-bottom: 20px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }
.reject-reason { margin-top: 20px; padding: 15px; background: var(--color-bg-warm); border-radius: var(--radius-md); }
.reject-reason p { margin-bottom: 8px; }
.dialog-footer { display: flex; justify-content: flex-end; }

@media (max-width: 768px) {
  .search-bar { flex-direction: column; align-items: stretch; }
  .search-bar .el-input, .search-bar .el-select { width: 100% !important; }
  .search-bar .el-button { width: 100%; }
}
</style>