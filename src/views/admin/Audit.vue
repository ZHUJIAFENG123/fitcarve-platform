<template>
  <div class="admin-audit">
    <Navbar :menu-links="adminMenuLinks" :logo-suffix="'管理后台'" />
    <div class="admin-content">
      <div class="page-header"><h2>资讯审核</h2></div>

      <div class="overview-cards">
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">待审核</div><div class="card-value" style="color:#e6a23c">{{ pendingCount }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">已通过</div><div class="card-value" style="color:#67c23a">{{ approvedCount }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">已驳回</div><div class="card-value" style="color:#f56c6c">{{ rejectedCount }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">总数</div><div class="card-value">{{ newsList.length }}</div></div>
        </el-card>
      </div>

      <div class="charts-grid">
        <el-card shadow="hover" class="chart-card">
          <template #header><span>审核状态分布</span></template>
          <div ref="statusPieChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>每日审核数量</span></template>
          <div ref="dailyAuditChart" class="chart"></div>
        </el-card>
      </div>

      <el-card shadow="hover" style="margin-top:20px">
        <div class="search-bar">
          <el-input v-model="searchQuery" placeholder="搜索资讯标题" prefix-icon="el-icon-search" style="width:280px" />
          <el-select v-model="statusFilter" placeholder="按状态筛选" style="width:140px">
            <el-option label="全部" value="" />
            <el-option label="待审核" value="pending" />
            <el-option label="已通过" value="approved" />
            <el-option label="已驳回" value="rejected" />
          </el-select>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <el-table :data="paginatedFiltered" style="width:100%" border stripe>
          <el-table-column prop="id" label="ID" width="70" />
          <el-table-column prop="title" label="标题" min-width="280">
            <template #default="{ row }"><a href="javascript:void(0)" @click="viewNews(row)">{{ row.title }}</a></template>
          </el-table-column>
          <el-table-column prop="author" label="创作者" width="110" />
          <el-table-column label="分类" width="100">
            <template #default="{ row }"><el-tag size="small">{{ getCategoryLabel(row.category) }}</el-tag></template>
          </el-table-column>
          <el-table-column label="创建时间" width="160">
            <template #default="{ row }">{{ formatDate(row.publishDate || row.createdAt) }}</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">{{ getStatusName(row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="viewNews(row)">查看</el-button>
              <el-button size="small" type="success" @click="approveNews(row.id)" v-if="row.status==='pending'">通过</el-button>
              <el-button size="small" type="danger" @click="rejectNews(row.id)" v-if="row.status==='pending'">驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10,20,50]" layout="total,sizes,prev,pager,next,jumper" :total="filteredNews.length" />
        </div>
      </el-card>
    </div>

    <el-dialog v-model="newsDialogVisible" title="资讯详情" width="800px" :close-on-click-modal="false">
      <div v-if="currentNews">
        <h2>{{ currentNews.title }}</h2>
        <div class="news-meta">
          <span>创作者: {{ currentNews.author }}</span>
          <span>分类: {{ getCategoryLabel(currentNews.category) }}</span>
          <span>创建: {{ formatDate(currentNews.publishDate || currentNews.createdAt) }}</span>
        </div>
        <div class="news-content" v-html="currentNews.content"></div>
        <div class="news-status" v-if="currentNews.status!=='pending'">
          <p>审核状态: <el-tag :type="getStatusType(currentNews.status)">{{ getStatusName(currentNews.status) }}</el-tag></p>
          <p v-if="currentNews.auditBy">审核人: {{ currentNews.auditBy }}</p>
          <p v-if="currentNews.auditAt">审核时间: {{ formatDate(currentNews.auditAt) }}</p>
          <p v-if="currentNews.rejectReason" class="reject-reason">驳回原因: {{ currentNews.rejectReason }}</p>
        </div>
      </div>
      <template #footer><el-button @click="newsDialogVisible=false">关闭</el-button></template>
    </el-dialog>

    <el-dialog v-model="rejectDialogVisible" title="驳回原因" width="500px">
      <el-form :model="rejectForm">
        <el-form-item label="驳回原因">
          <el-input v-model="rejectForm.reason" type="textarea" rows="4" placeholder="请输入驳回原因" />
        </el-form-item>
      </el-form>
      <template #footer><el-button @click="rejectDialogVisible=false">取消</el-button><el-button type="primary" @click="confirmReject">确定</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import { CATEGORY_MAP } from '@/utils/constants'
import * as echarts from 'echarts'
import type { NewsCategory } from '@/types/common'

const adminMenuLinks = [
  { to: '/admin/dashboard', label: '后台首页', active: false },
  { to: '/admin/config', label: '系统配置', active: false },
  { to: '/admin/users', label: '用户管理', active: false },
  { to: '/admin/audit', label: '资讯审核', active: true },
  { to: '/admin/comments', label: '评论监控', active: false },
  { to: '/admin/logs', label: '操作日志', active: false },
  { to: '/admin/reports', label: '数据报表', active: false }
]

const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const newsDialogVisible = ref(false)
const rejectDialogVisible = ref(false)
const rejectForm = ref({ reason: '', newsId: 0 })
const currentNews = ref<any>(null)

const statusPieChart = ref(null)
const dailyAuditChart = ref(null)
let charts: Record<string, any> = {}

const newsList = ref([
  { id: 1, title: '健身初学者必备的5个基础动作', content: '<p>掌握基础动作至关重要</p>', author: 'creator1', category: 'knowledge', status: 'pending', publishDate: '2023-01-01' },
  { id: 2, title: '如何制定科学的健身计划', content: '<p>科学计划是健身的关键</p>', author: 'creator2', category: 'knowledge', status: 'pending', publishDate: '2023-01-02' },
  { id: 3, title: '健身饮食的重要性', content: '<p>健身需要合理饮食</p>', author: 'creator1', category: 'nutrition', status: 'approved', publishDate: '2023-01-03', auditBy: 'admin', auditAt: '2023-01-03 14:00' },
  { id: 4, title: '常见健身误区解析', content: '<p>健身误区解析</p>', author: 'creator3', category: 'knowledge', status: 'rejected', publishDate: '2023-01-04', auditBy: 'admin', auditAt: '2023-01-04 15:00', rejectReason: '内容存在错误信息' },
  { id: 5, title: '如何选择健身器材', content: '<p>选择合适器材</p>', author: 'creator2', category: 'equipment', status: 'pending', publishDate: '2023-01-05' }
])

const pendingCount = computed(() => newsList.value.filter(n => n.status === 'pending').length)
const approvedCount = computed(() => newsList.value.filter(n => n.status === 'approved').length)
const rejectedCount = computed(() => newsList.value.filter(n => n.status === 'rejected').length)

const filteredNews = computed(() => {
  let r = newsList.value
  if (searchQuery.value) r = r.filter(n => n.title.includes(searchQuery.value))
  if (statusFilter.value) r = r.filter(n => n.status === statusFilter.value)
  return r
})

const paginatedFiltered = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredNews.value.slice(start, start + pageSize.value)
})

function getCategoryLabel(cat: NewsCategory): string { return CATEGORY_MAP[cat] || cat }
const getStatusType = (s: string) => ({ pending: 'warning', approved: 'success', rejected: 'danger' }[s] || 'info')
const getStatusName = (s: string) => ({ pending: '待审核', approved: '已通过', rejected: '已驳回' }[s] || s)
function formatDate(s: string) { if (!s) return ''; const d = new Date(s); return isNaN(d.getTime()) ? s : d.toLocaleString('zh-CN') }

const handleSearch = () => { currentPage.value = 1 }

const viewNews = (n: any) => { currentNews.value = { ...n }; newsDialogVisible.value = true }

const approveNews = (id: number) => {
  ElMessageBox.confirm('确定要通过该资讯吗？', '提示', { type: 'success' }).then(() => {
    const i = newsList.value.findIndex(n => n.id === id)
    if (i !== -1) {
      newsList.value[i] = { ...newsList.value[i], status: 'approved', auditBy: 'admin', auditAt: new Date().toLocaleString() }
    }
    ElMessage.success('已通过')
    updateCharts()
  }).catch(() => {})
}

const rejectNews = (id: number) => { rejectForm.value = { reason: '', newsId: id }; rejectDialogVisible.value = true }
const confirmReject = () => {
  if (!rejectForm.value.reason) return ElMessage.warning('请输入驳回原因')
  const i = newsList.value.findIndex(n => String(n.id) === String(rejectForm.value.newsId))
  if (i !== -1) {
    newsList.value[i] = { ...newsList.value[i], status: 'rejected', rejectReason: rejectForm.value.reason, auditBy: 'admin', auditAt: new Date().toLocaleString() }
  }
  ElMessage.success('已驳回')
  rejectDialogVisible.value = false
  updateCharts()
}

const initCharts = () => {
  if (statusPieChart.value) {
    charts.statusPie = echarts.init(statusPieChart.value)
    updateCharts()
  }
  if (dailyAuditChart.value) {
    charts.daily = echarts.init(dailyAuditChart.value)
    charts.daily.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', top: 15, bottom: 5, containLabel: true },
      xAxis: { type: 'category', data: ['1/1', '1/2', '1/3', '1/4', '1/5', '1/6', '1/7'] },
      yAxis: { type: 'value', name: '审核数' },
      series: [
        { name: '通过', data: [3, 2, 4, 1, 3, 2, 5], type: 'bar', barMaxWidth: 16, itemStyle: { color: '#67c23a', borderRadius: [4, 4, 0, 0] } },
        { name: '驳回', data: [1, 0, 1, 2, 0, 1, 0], type: 'bar', barMaxWidth: 16, itemStyle: { color: '#f56c6c', borderRadius: [4, 4, 0, 0] } }
      ]
    })
  }
  window.addEventListener('resize', () => Object.values(charts).forEach(c => c?.resize()))
}

const updateCharts = () => {
  if (charts.statusPie) {
    charts.statusPie.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}篇 ({d}%)' },
      series: [{
        type: 'pie', radius: ['45%', '70%'], center: ['50%', '55%'],
        data: [
          { value: pendingCount.value, name: '待审核', itemStyle: { color: '#e6a23c' } },
          { value: approvedCount.value, name: '已通过', itemStyle: { color: '#67c23a' } },
          { value: rejectedCount.value, name: '已驳回', itemStyle: { color: '#f56c6c' } }
        ],
        label: { formatter: '{b}\n{d}%' }
      }]
    })
  }
}

onMounted(() => { initCharts() })
</script>

<style scoped>
.admin-audit { min-height: 100vh; background: #f5f5f5; }
.admin-content { max-width: 1400px; margin: 0 auto; padding: 20px; }
.page-header { margin-bottom: 24px; }
.page-header h2 { font-size: 20px; color: #333; margin: 0; padding-bottom: 10px; border-bottom: 2px solid #1890ff; display: inline-block; }
.overview-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
.overview-card { transition: transform 0.3s ease; }
.overview-card:hover { transform: translateY(-4px); }
.card-content { text-align: center; padding: 6px 0; }
.card-title { font-size: 14px; color: #666; margin-bottom: 6px; }
.card-value { font-size: 28px; font-weight: bold; }
.charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
.chart-card { transition: transform 0.3s ease; }
.chart-card:hover { transform: translateY(-4px); }
.chart { width: 100%; height: 260px; }
.search-bar { margin-bottom: 20px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }
.news-meta { margin: 10px 0; color: #666; font-size: 14px; display: flex; gap: 20px; flex-wrap: wrap; }
.news-content { margin: 20px 0; line-height: 1.6; }
.news-status { margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee; font-size: 14px; }
.reject-reason { color: #f56c6c; }

@media (max-width: 768px) {
  .admin-content { padding: 12px; }
  .overview-cards { grid-template-columns: repeat(2, 1fr); }
  .charts-grid { grid-template-columns: 1fr; }
  .search-bar { flex-direction: column; align-items: stretch; }
}
</style>
