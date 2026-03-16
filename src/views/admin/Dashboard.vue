<template>
  <div class="dashboard-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站 - 管理后台</h1>
        </div>
        <nav class="nav-menu">
          <a href="/admin/dashboard" class="active">后台首页</a>
          <a href="/admin/config">系统配置</a>
          <a href="/admin/users">用户管理</a>
          <a href="/admin/audit">资讯审核</a>
          <a href="/admin/logs">操作日志</a>
          <a href="/admin/reports">数据报表</a>
        </nav>
        <div class="user-info">
          <el-avatar size="40" :src="userAvatar">{{ username.charAt(0) }}</el-avatar>
          <span class="username">{{ username }}</span>
          <el-dropdown>
            <el-button type="text">
              <el-icon><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="toProfile">个人中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <!-- 仪表盘内容 -->
    <div class="dashboard-content">
      <!-- 数据概览 -->
      <div class="overview-section">
        <h2>数据概览</h2>
        <div class="overview-cards">
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">总用户数</div>
              <div class="card-value">{{ overview.totalUsers }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">总资讯数</div>
              <div class="card-value">{{ overview.totalNews }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">总课程数</div>
              <div class="card-value">{{ overview.totalCourses }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">总评论数</div>
              <div class="card-value">{{ overview.totalComments }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">今日新增用户</div>
              <div class="card-value">{{ overview.todayNewUsers }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">今日新增资讯</div>
              <div class="card-value">{{ overview.todayNewNews }}</div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 图表统计 -->
      <div class="charts-section">
        <div class="charts-grid">
          <!-- 用户增长趋势 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>用户增长趋势</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="userGrowthChartOption" />
            </div>
          </el-card>

          <!-- 资讯分类分布 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>资讯分类分布</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="newsCategoryChartOption" />
            </div>
          </el-card>

          <!-- 课程类型分布 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>课程类型分布</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="courseTypeChartOption" />
            </div>
          </el-card>

          <!-- 用户角色分布 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>用户角色分布</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="userRoleChartOption" />
            </div>
          </el-card>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="activity-section">
        <h2>最近活动</h2>
        <el-table :data="recentActivities" style="width: 100%">
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="user" label="用户"></el-table-column>
          <el-table-column prop="action" label="操作"></el-table-column>
          <el-table-column prop="target" label="目标"></el-table-column>
          <el-table-column prop="time" label="时间" width="180"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import VChart from 'vue-echarts'

const router = useRouter()

// 模拟用户信息
const username = ref('管理员')
const userAvatar = ref('')

// 模拟概览数据
const overview = ref({
  totalUsers: 2000,
  totalNews: 300,
  totalCourses: 50,
  totalComments: 1500,
  todayNewUsers: 25,
  todayNewNews: 10
})

// 模拟最近活动数据
const recentActivities = ref([
  {
    id: 1,
    user: '用户1',
    action: '发布资讯',
    target: '如何科学制定健身计划',
    time: '2024-01-16 15:30'
  },
  {
    id: 2,
    user: '用户2',
    action: '报名课程',
    target: '初级瑜伽入门',
    time: '2024-01-16 14:20'
  },
  {
    id: 3,
    user: '管理员',
    action: '审核资讯',
    target: '健身营养补充指南',
    time: '2024-01-16 13:10'
  },
  {
    id: 4,
    user: '用户3',
    action: '评论资讯',
    target: '健身后如何正确恢复',
    time: '2024-01-16 12:00'
  }
])

// 用户增长趋势图表配置
const userGrowthChartOption = ref({
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [500, 800, 1200, 1500, 1800, 2000],
      type: 'line',
      smooth: true
    }
  ]
})

// 资讯分类分布图表配置
const newsCategoryChartOption = ref({
  series: [
    {
      type: 'pie',
      data: [
        { value: 120, name: '健身知识' },
        { value: 80, name: '营养健康' },
        { value: 60, name: '运动康复' },
        { value: 40, name: '健身器材' }
      ]
    }
  ]
})

// 课程类型分布图表配置
const courseTypeChartOption = ref({
  series: [
    {
      type: 'pie',
      data: [
        { value: 20, name: '瑜伽' },
        { value: 15, name: '力量训练' },
        { value: 10, name: '有氧运动' },
        { value: 5, name: '普拉提' }
      ]
    }
  ]
})

// 用户角色分布图表配置
const userRoleChartOption = ref({
  series: [
    {
      type: 'pie',
      data: [
        { value: 1500, name: '健身爱好者' },
        { value: 300, name: '教练' },
        { value: 150, name: '内容创作者' },
        { value: 50, name: '管理员' }
      ]
    }
  ]
})

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
.dashboard-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 导航栏 */
.navbar {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo h1 {
  font-size: 20px;
  color: #1890ff;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  padding: 8px 0;
  position: relative;
}

.nav-menu a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1890ff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-size: 14px;
  color: #333;
}

/* 仪表盘内容 */
.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* 数据概览 */
.overview-section {
  margin-bottom: 30px;
}

.overview-section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.overview-card {
  transition: transform 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
}

.card-content {
  text-align: center;
}

.card-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
}

/* 图表统计 */
.charts-section {
  margin-bottom: 30px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}

.chart-card {
  transition: transform 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-5px);
}

.chart-container {
  height: 300px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 最近活动 */
.activity-section {
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.activity-section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .overview-cards {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 250px;
  }
}
</style>