<template>
  <div class="admin-comments">
    <Navbar :menu-links="adminMenuLinks" :logo-suffix="'管理后台'" />
    <div class="admin-content">
      <div class="page-header">
        <h2>评论监控</h2>
      </div>

      <div class="overview-cards">
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">总评论数</div><div class="card-value">{{ comments.length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">资讯评论</div><div class="card-value">{{ comments.filter(c=>c.targetType==='news').length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">课程评论</div><div class="card-value">{{ comments.filter(c=>c.targetType==='course').length }}</div></div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content"><div class="card-title">总点赞数</div><div class="card-value">{{ comments.reduce((s,c)=>s+c.likes,0) }}</div></div>
        </el-card>
      </div>

      <div class="charts-grid">
        <el-card shadow="hover" class="chart-card">
          <template #header><span>评论来源分布</span></template>
          <div ref="sourcePieChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>每日评论趋势</span></template>
          <div ref="trendLineChart" class="chart"></div>
        </el-card>
      </div>

      <el-card shadow="hover" style="margin-top: 20px;">
        <div class="search-bar">
          <el-input v-model="searchQuery" placeholder="搜索评论内容" prefix-icon="el-icon-search" style="width: 280px" />
          <el-select v-model="targetTypeFilter" placeholder="按目标类型筛选" style="width: 140px">
            <el-option label="全部" value="" />
            <el-option label="资讯" value="news" />
            <el-option label="课程" value="course" />
          </el-select>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <el-table :data="filteredComments" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="70" />
          <el-table-column prop="content" label="评论内容" min-width="280" />
          <el-table-column prop="username" label="用户" width="110" />
          <el-table-column prop="targetType" label="类型" width="80">
            <template #default="scope">
              <el-tag :type="getTargetType(scope.row.targetType)">{{ getTargetTypeName(scope.row.targetType) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="targetTitle" label="目标标题" width="180" />
          <el-table-column prop="createdAt" label="评论时间" width="160" />
          <el-table-column prop="likes" label="点赞" width="70" />
          <el-table-column label="操作" width="80" fixed="right">
            <template #default="scope">
              <el-button size="small" type="danger" @click="deleteComment(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10,20,50]" layout="total, sizes, prev, pager, next, jumper" :total="filteredComments.length" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import * as echarts from 'echarts'

const adminMenuLinks = [
  { to: '/admin/dashboard', label: '后台首页', active: false },
  { to: '/admin/config', label: '系统配置', active: false },
  { to: '/admin/users', label: '用户管理', active: false },
  { to: '/admin/audit', label: '资讯审核', active: false },
  { to: '/admin/comments', label: '评论监控', active: true },
  { to: '/admin/logs', label: '操作日志', active: false },
  { to: '/admin/reports', label: '数据报表', active: false }
]

const searchQuery = ref('')
const targetTypeFilter = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const comments = ref([
  { id:1, content:'这篇文章写得非常好，对我帮助很大！', username:'user1', targetType:'news', targetId:1, targetTitle:'健身初学者必备的5个基础动作', likes:5, createdAt:'2023-01-01 10:30' },
  { id:2, content:'感谢分享，我会尝试这些动作的', username:'user2', targetType:'news', targetId:1, targetTitle:'健身初学者必备的5个基础动作', likes:3, createdAt:'2023-01-01 11:20' },
  { id:3, content:'课程内容非常丰富，教练讲解很详细', username:'user3', targetType:'course', targetId:1, targetTitle:'力量训练基础', likes:8, createdAt:'2023-01-02 09:15' },
  { id:4, content:'这个课程难度适中，适合初学者', username:'user4', targetType:'course', targetId:1, targetTitle:'力量训练基础', likes:4, createdAt:'2023-01-02 10:45' },
  { id:5, content:'希望能有更多这样的优质内容', username:'user5', targetType:'news', targetId:3, targetTitle:'健身饮食的重要性', likes:2, createdAt:'2023-01-03 14:20' },
  { id:6, content:'教练讲得太好了，学到了很多新知识', username:'user1', targetType:'course', targetId:2, targetTitle:'瑜伽基础入门', likes:12, createdAt:'2023-01-03 16:30' },
  { id:7, content:'有图有真相，非常实用的技巧', username:'coach1', targetType:'news', targetId:4, targetTitle:'常见健身误区解析', likes:7, createdAt:'2023-01-04 08:15' }
])

const filteredComments = computed(() => {
  let r = comments.value
  if (searchQuery.value) r = r.filter(c => c.content.includes(searchQuery.value))
  if (targetTypeFilter.value) r = r.filter(c => c.targetType === targetTypeFilter.value)
  return r
})

const getTargetType = (t) => ({ news:'info', course:'warning' }[t]||'info')
const getTargetTypeName = (t) => ({ news:'资讯', course:'课程' }[t]||t)
const handleSearch = () => { currentPage.value=1 }

const deleteComment = (id) => {
  ElMessageBox.confirm('确定要删除该评论吗？','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'}).then(()=>{
    const i=comments.value.findIndex(c=>c.id===id)
    if(i!==-1){ comments.value.splice(i,1); ElMessage.success('删除成功') }
  }).catch(()=>{})
}

// 图表
const sourcePieChart = ref(null)
const trendLineChart = ref(null)
let charts = {}

const initCharts = () => {
  if (sourcePieChart.value) {
    sourcePieChart.value.style.height = '260px'
    charts.source = echarts.init(sourcePieChart.value)
    charts.source.setOption({
      tooltip: { trigger:'item', formatter:'{b}: {c}条 ({d}%)' },
      series: [{ type:'pie', radius:['45%','70%'], center:['50%','55%'], data:[
        { value: comments.value.filter(c=>c.targetType==='news').length, name:'资讯评论', itemStyle:{color:'#409eff'} },
        { value: comments.value.filter(c=>c.targetType==='course').length, name:'课程评论', itemStyle:{color:'#e6a23c'} }
      ], label:{formatter:'{b}\n{d}%'} }]
    })
  }
  if (trendLineChart.value) {
    trendLineChart.value.style.height = '260px'
    charts.trend = echarts.init(trendLineChart.value)
    charts.trend.setOption({
      tooltip: { trigger:'axis' },
      grid: { left:'3%',right:'4%',top:15,bottom:5,containLabel:true },
      xAxis: { type:'category', data:['1/1','1/2','1/3','1/4','1/5','1/6','1/7'] },
      yAxis: { type:'value', name:'评论数' },
      series: [
        { name:'资讯评论', data:[12,18,15,22,20,25,30], type:'line', smooth:true, lineStyle:{color:'#409eff'}, itemStyle:{color:'#409eff'}, areaStyle:{color:'rgba(64,158,255,0.1)'} },
        { name:'课程评论', data:[5,8,10,9,12,14,16], type:'line', smooth:true, lineStyle:{color:'#e6a23c'}, itemStyle:{color:'#e6a23c'}, areaStyle:{color:'rgba(230,162,60,0.1)'} }
      ]
    })
  }
  window.addEventListener('resize',()=>Object.values(charts).forEach(c=>c?.resize()))
}

onMounted(() => { initCharts() })
</script>

<style scoped>
.admin-comments { min-height: 100vh; background: #f5f5f5; }
.admin-content { max-width: 1400px; margin: 0 auto; padding: 20px; }
.page-header { margin-bottom: 24px; }
.page-header h2 { font-size: 20px; color:#333; margin:0; padding-bottom:10px; border-bottom:2px solid #1890ff; display:inline-block; }

.overview-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
.overview-card { transition: transform 0.3s ease; }
.overview-card:hover { transform: translateY(-4px); }
.card-content { text-align: center; padding: 6px 0; }
.card-title { font-size: 14px; color:#666; margin-bottom:6px; }
.card-value { font-size: 28px; font-weight:bold; color:#1890ff; }

.charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
.chart-card { transition: transform 0.3s ease; }
.chart-card:hover { transform: translateY(-4px); }
.chart { width: 100%; }

.search-bar { margin-bottom: 20px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }

@media (max-width: 768px) { .admin-content { padding: 12px; } .overview-cards { grid-template-columns: repeat(2, 1fr); } .charts-grid { grid-template-columns: 1fr; } .search-bar { flex-direction: column; align-items: stretch; } }
</style>
