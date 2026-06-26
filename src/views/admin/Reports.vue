<template>
  <div class="admin-reports">
    <Navbar :menu-links="adminMenuLinks" :logo-suffix="'管理后台'" />
    <div class="admin-content">
      <div class="page-header">
        <h2>数据统计报表</h2>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 260px"
          @change="handleDateChange"
        />
      </div>

      <div class="overview-cards">
        <el-card shadow="hover" class="overview-card">
          <div class="card-content">
            <div class="card-title">总用户数</div>
            <div class="card-value">{{ overviewData.totalUsers }}</div>
            <div class="card-change" :class="{ positive: overviewData.userGrowth > 0 }">
              {{ overviewData.userGrowth > 0 ? '+' : '' }}{{ overviewData.userGrowth }}% 较上月
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content">
            <div class="card-title">资讯数量</div>
            <div class="card-value">{{ overviewData.totalNews }}</div>
            <div class="card-change" :class="{ positive: overviewData.newsGrowth > 0 }">
              {{ overviewData.newsGrowth > 0 ? '+' : '' }}{{ overviewData.newsGrowth }}% 较上月
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content">
            <div class="card-title">课程数量</div>
            <div class="card-value">{{ overviewData.totalCourses }}</div>
            <div class="card-change" :class="{ positive: overviewData.courseGrowth > 0 }">
              {{ overviewData.courseGrowth > 0 ? '+' : '' }}{{ overviewData.courseGrowth }}% 较上月
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="overview-card">
          <div class="card-content">
            <div class="card-title">总访问量</div>
            <div class="card-value">{{ overviewData.totalVisits }}</div>
            <div class="card-change" :class="{ positive: overviewData.visitGrowth > 0 }">
              {{ overviewData.visitGrowth > 0 ? '+' : '' }}{{ overviewData.visitGrowth }}% 较上月
            </div>
          </div>
        </el-card>
      </div>

      <!-- 图表区域 -->
      <div class="charts-grid">
        <el-card shadow="hover" class="chart-card">
          <template #header><span>用户增长趋势</span></template>
          <div ref="userGrowthChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>用户角色分布</span></template>
          <div ref="userRoleChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>资讯发布趋势</span></template>
          <div ref="newsTrendChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>资讯分类分布</span></template>
          <div ref="newsCategoryChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>课程学习人数</span></template>
          <div ref="courseStudyChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>热门课程排行</span></template>
          <div ref="hotCoursesChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>用户活跃度分析</span></template>
          <div ref="userActivityChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>资讯阅读量统计</span></template>
          <div ref="newsReadChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>评论数量统计</span></template>
          <div ref="commentChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>收藏数量统计</span></template>
          <div ref="collectChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>分享数量统计</span></template>
          <div ref="shareChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>登录次数统计</span></template>
          <div ref="loginChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>地域分布热力图</span></template>
          <div ref="regionChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>设备类型分布</span></template>
          <div ref="deviceChart" class="chart"></div>
        </el-card>
        <el-card shadow="hover" class="chart-card">
          <template #header><span>页面访问量统计</span></template>
          <div ref="pageViewChart" class="chart"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import Navbar from '@/components/Navbar.vue'

const adminMenuLinks = [
  { to: '/admin/dashboard', label: '后台首页', active: false },
  { to: '/admin/config', label: '系统配置', active: false },
  { to: '/admin/users', label: '用户管理', active: false },
  { to: '/admin/audit', label: '资讯审核', active: false },
  { to: '/admin/comments', label: '评论监控', active: false },
  { to: '/admin/logs', label: '操作日志', active: false },
  { to: '/admin/reports', label: '数据报表', active: true }
]

const dateRange = ref([])

const overviewData = ref({
  totalUsers: 1200, userGrowth: 15.6,
  totalNews: 350, newsGrowth: 8.2,
  totalCourses: 85, courseGrowth: 12.3,
  totalVisits: 50000, visitGrowth: 20.5
})

const userGrowthChart = ref(null)
const userRoleChart = ref(null)
const newsTrendChart = ref(null)
const newsCategoryChart = ref(null)
const courseStudyChart = ref(null)
const hotCoursesChart = ref(null)
const userActivityChart = ref(null)
const newsReadChart = ref(null)
const commentChart = ref(null)
const collectChart = ref(null)
const shareChart = ref(null)
const loginChart = ref(null)
const regionChart = ref(null)
const deviceChart = ref(null)
const pageViewChart = ref(null)

let charts = {}

const mockData = {
  userGrowth: { months: ['1月','2月','3月','4月','5月','6月'], data: [800,850,920,980,1100,1200] },
  userRoles: { roles: ['健身爱好者','教练','内容创作者','管理员'], data: [850,150,180,20] },
  newsTrend: { months: ['1月','2月','3月','4月','5月','6月'], data: [45,52,60,58,65,70] },
  newsCategories: { categories: ['健身指南','营养饮食','健身装备','健身故事','其他'], data: [120,80,60,70,20] },
  courseStudy: { courses: ['瑜伽基础','力量训练','有氧运动','普拉提','拳击'], data: [250,200,180,150,120] },
  hotCourses: { courses: ['瑜伽基础','力量训练','有氧运动','普拉提','拳击'], data: [9.5,9.2,8.8,8.5,8.2] },
  userActivity: { days: ['周一','周二','周三','周四','周五','周六','周日'], data: [300,350,400,450,500,600,550] },
  newsRead: { months: ['1月','2月','3月','4月','5月','6月'], data: [1500,1800,2200,2500,2800,3200] },
  comments: { months: ['1月','2月','3月','4月','5月','6月'], data: [200,250,300,350,400,450] },
  collects: { months: ['1月','2月','3月','4月','5月','6月'], data: [150,180,220,260,300,350] },
  shares: { months: ['1月','2月','3月','4月','5月','6月'], data: [100,120,150,180,220,250] },
  logins: { months: ['1月','2月','3月','4月','5月','6月'], data: [800,900,1000,1100,1200,1300] },
  regions: [
    { name: '北京', value: 200 },{ name: '上海', value: 180 },{ name: '广州', value: 150 },
    { name: '深圳', value: 140 },{ name: '杭州', value: 120 },{ name: '成都', value: 100 },
    { name: '武汉', value: 90 },{ name: '西安', value: 80 },{ name: '南京', value: 70 },{ name: '重庆', value: 60 }
  ],
  devices: { types: ['PC','手机','平板','其他'], data: [40,50,8,2] },
  pageViews: { pages: ['首页','资讯列表','资讯详情','课程列表','课程详情','个人中心'], data: [15000,12000,10000,8000,7000,6000] }
}

const makeLineOption = (months, data) => ({
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', top: 15, bottom: 5, containLabel: true },
  xAxis: { type: 'category', data: months },
  yAxis: { type: 'value' },
  series: [{ data, type: 'line', smooth: true, areaStyle: { color: 'rgba(24,144,255,0.1)' }, lineStyle: { color: '#1890ff' }, itemStyle: { color: '#1890ff' } }]
})

const makeBarOption = (categories, data) => ({
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', top: 15, bottom: 5, containLabel: true },
  xAxis: { type: 'category', data: categories },
  yAxis: { type: 'value' },
  series: [{ data, type: 'bar', barMaxWidth: 36, itemStyle: { color: '#1890ff', borderRadius: [4, 4, 0, 0] } }]
})

const makePieOption = (categories, data) => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  series: [{ type: 'pie', radius: ['45%','70%'], center: ['50%','55%'], data: categories.map((n, i) => ({ value: data[i], name: n })), label: { formatter: '{b}: {d}%' } }]
})

const initCharts = () => {
  const configs = [
    { ref: userGrowthChart, key: 'userGrowth', fn: () => makeLineOption(mockData.userGrowth.months, mockData.userGrowth.data) },
    { ref: userRoleChart, key: 'userRole', fn: () => makePieOption(mockData.userRoles.roles, mockData.userRoles.data) },
    { ref: newsTrendChart, key: 'newsTrend', fn: () => makeBarOption(mockData.newsTrend.months, mockData.newsTrend.data) },
    { ref: newsCategoryChart, key: 'newsCategory', fn: () => makePieOption(mockData.newsCategories.categories, mockData.newsCategories.data) },
    { ref: courseStudyChart, key: 'courseStudy', fn: () => makeBarOption(mockData.courseStudy.courses, mockData.courseStudy.data) },
    { ref: hotCoursesChart, key: 'hotCourses', fn: () => ({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '8%', top: 15, bottom: 5, containLabel: true },
      xAxis: { type: 'value', max: 10 },
      yAxis: { type: 'category', data: mockData.hotCourses.courses },
      series: [{ data: mockData.hotCourses.data, type: 'bar', barMaxWidth: 20, itemStyle: { color: '#1890ff', borderRadius: [0, 4, 4, 0] }, label: { show: true, position: 'right' } }]
    })},
    { ref: userActivityChart, key: 'userActivity', fn: () => makeLineOption(mockData.userActivity.days, mockData.userActivity.data) },
    { ref: newsReadChart, key: 'newsRead', fn: () => makeLineOption(mockData.newsRead.months, mockData.newsRead.data) },
    { ref: commentChart, key: 'comments', fn: () => makeBarOption(mockData.comments.months, mockData.comments.data) },
    { ref: collectChart, key: 'collects', fn: () => makeBarOption(mockData.collects.months, mockData.collects.data) },
    { ref: shareChart, key: 'shares', fn: () => makeBarOption(mockData.shares.months, mockData.shares.data) },
    { ref: loginChart, key: 'logins', fn: () => makeLineOption(mockData.logins.months, mockData.logins.data) },
    { ref: regionChart, key: 'region', fn: () => ({
      tooltip: { trigger: 'item' },
      visualMap: { min: 0, max: 200, left: 'left', top: 'bottom', text: ['高','低'], calculable: true },
      series: [{ type: 'treemap', data: mockData.regions.map(r => ({ name: r.name, value: r.value })), label: { show: true, formatter: '{b}\n{c}人' } }]
    })},
    { ref: deviceChart, key: 'device', fn: () => makePieOption(mockData.devices.types, mockData.devices.data) },
    { ref: pageViewChart, key: 'pageView', fn: () => makeBarOption(mockData.pageViews.pages, mockData.pageViews.data) }
  ]

  configs.forEach(c => {
    const el = c.ref.value
    if (el) {
      el.style.height = '280px'
      const instance = echarts.init(el)
      instance.setOption(c.fn())
      charts[c.key] = instance
    }
  })

  window.addEventListener('resize', () => Object.values(charts).forEach(c => c?.resize()))
}

const handleDateChange = () => {}

onMounted(() => { initCharts() })
</script>

<style scoped>
.admin-reports { min-height: 100vh; background: #f5f5f5; }
.admin-content { max-width: 1400px; margin: 0 auto; padding: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h2 { font-size: 20px; color: #333; margin: 0; padding-bottom: 10px; border-bottom: 2px solid #1890ff; display: inline-block; }

.overview-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
.overview-card { transition: transform 0.3s ease; }
.overview-card:hover { transform: translateY(-5px); }
.card-content { display: flex; flex-direction: column; align-items: center; padding: 8px 0; }
.card-title { font-size: 14px; color: #666; margin-bottom: 8px; }
.card-value { font-size: 28px; font-weight: bold; color: #1890ff; margin-bottom: 4px; }
.card-change { font-size: 12px; color: #999; }
.card-change.positive { color: #67c23a; }

.charts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(450px, 1fr)); gap: 20px; }
.chart-card { transition: transform 0.3s ease; }
.chart-card:hover { transform: translateY(-4px); }
.chart { width: 100%; min-height: 280px; }

@media (max-width: 1200px) { .overview-cards { grid-template-columns: repeat(2, 1fr); } .charts-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .admin-content { padding: 12px; } .overview-cards { grid-template-columns: 1fr; } .page-header { flex-direction: column; align-items: flex-start; gap: 12px; } }
</style>
