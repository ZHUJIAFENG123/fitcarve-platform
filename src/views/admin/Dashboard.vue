<template>
  <div class="dashboard-container">
    <Navbar :menu-links="adminMenuLinks" :logo-suffix="'管理后台'" />
    <div class="dashboard-content">
      <div class="overview-section">
        <h2>数据概览</h2>
        <div class="overview-cards">
          <el-card class="overview-card"><div class="card-content"><div class="card-title">总用户数</div><div class="card-value">{{ overview.totalUsers }}</div></div></el-card>
          <el-card class="overview-card"><div class="card-content"><div class="card-title">总资讯数</div><div class="card-value">{{ overview.totalNews }}</div></div></el-card>
          <el-card class="overview-card"><div class="card-content"><div class="card-title">总课程数</div><div class="card-value">{{ overview.totalCourses }}</div></div></el-card>
          <el-card class="overview-card"><div class="card-content"><div class="card-title">总评论数</div><div class="card-value">{{ overview.totalComments }}</div></div></el-card>
          <el-card class="overview-card"><div class="card-content"><div class="card-title">今日新增用户</div><div class="card-value">{{ overview.todayNewUsers }}</div></div></el-card>
          <el-card class="overview-card"><div class="card-content"><div class="card-title">今日新增资讯</div><div class="card-value">{{ overview.todayNewNews }}</div></div></el-card>
        </div>
      </div>

      <div class="charts-section">
        <div class="charts-grid">
          <el-card class="chart-card">
            <template #header><div class="card-header"><span>用户增长趋势</span></div></template>
            <div class="chart-container" ref="userGrowthChart"></div>
          </el-card>
          <el-card class="chart-card">
            <template #header><div class="card-header"><span>资讯分类分布</span></div></template>
            <div class="chart-container" ref="newsCategoryChart"></div>
          </el-card>
          <el-card class="chart-card">
            <template #header><div class="card-header"><span>课程类型分布</span></div></template>
            <div class="chart-container" ref="courseTypeChart"></div>
          </el-card>
          <el-card class="chart-card">
            <template #header><div class="card-header"><span>用户角色分布</span></div></template>
            <div class="chart-container" ref="userRoleChart"></div>
          </el-card>

          <!-- 地域分布热力图 -->
          <el-card class="chart-card full-width">
            <template #header><div class="card-header"><span>地域分布热力图</span></div></template>
            <div class="chart-container chart-container-large" ref="regionHeatmapChart"></div>
          </el-card>

          <!-- 设备类型分布 -->
          <el-card class="chart-card">
            <template #header><div class="card-header"><span>设备类型分布</span></div></template>
            <div class="chart-container" ref="deviceTypeChart"></div>
          </el-card>

          <!-- 页面访问量 -->
          <el-card class="chart-card">
            <template #header><div class="card-header"><span>页面访问量 TOP10</span></div></template>
            <div class="chart-container" ref="pageViewsChart"></div>
          </el-card>
        </div>
      </div>

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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import * as echarts from 'echarts'

const router = useRouter()

const adminMenuLinks = [
  { to: '/admin/dashboard', label: '后台首页', active: true },
  { to: '/admin/config', label: '系统配置', active: false },
  { to: '/admin/users', label: '用户管理', active: false },
  { to: '/admin/audit', label: '资讯审核', active: false },
  { to: '/admin/comments', label: '评论监控', active: false },
  { to: '/admin/logs', label: '操作日志', active: false },
  { to: '/admin/reports', label: '数据报表', active: false }
]
const username = ref('管理员')
const userAvatar = ref('')

const overview = ref({ totalUsers: 2000, totalNews: 300, totalCourses: 50, totalComments: 1500, todayNewUsers: 25, todayNewNews: 10 })

const recentActivities = ref([
  { id: 1, user: '用户1', action: '发布资讯', target: '如何科学制定健身计划', time: '2024-01-16 15:30' },
  { id: 2, user: '用户2', action: '报名课程', target: '初级瑜伽入门', time: '2024-01-16 14:20' },
  { id: 3, user: '管理员', action: '审核资讯', target: '健身营养补充指南', time: '2024-01-16 13:10' },
  { id: 4, user: '用户3', action: '评论资讯', target: '健身后如何正确恢复', time: '2024-01-16 12:00' }
])

const userGrowthChart = ref(null)
const newsCategoryChart = ref(null)
const courseTypeChart = ref(null)
const userRoleChart = ref(null)
const regionHeatmapChart = ref(null)
const deviceTypeChart = ref(null)
const pageViewsChart = ref(null)

let instances = {}

const userGrowthChartOption = {
  tooltip: { trigger: 'axis' },
  legend: { data: ['注册用户'], bottom: 10 },
  xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'] },
  yAxis: { type: 'value', name: '用户数' },
  series: [{ name: '注册用户', data: [120,210,350,520,780,1050,1320,1580,1750,1880,1950,2000], type: 'line', smooth: true, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(24,144,255,0.3)' }, { offset: 1, color: 'rgba(24,144,255,0.1)' }] } }, lineStyle: { color: '#1890ff' }, itemStyle: { color: '#1890ff' } }]
}

const newsCategoryChartOption = {
  tooltip: { trigger: 'item', formatter: '{a}<br/>{b}: {c} ({d}%)' },
  legend: { orient: 'vertical', left: 'left', bottom: 10 },
  series: [{ name: '资讯分类', type: 'pie', radius: '60%', center: ['50%','45%'], data: [{ value: 120, name: '健身知识' },{ value: 80, name: '营养健康' },{ value: 60, name: '运动康复' },{ value: 40, name: '健身器材' },{ value: 30, name: '健身计划' },{ value: 25, name: '赛事资讯' }], emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }, label: { formatter: '{b}: {d}%' } }]
}

const courseTypeChartOption = {
  tooltip: { trigger: 'item', formatter: '{a}<br/>{b}: {c} ({d}%)' },
  legend: { orient: 'vertical', left: 'left', bottom: 10 },
  series: [{ name: '课程类型', type: 'pie', radius: '60%', center: ['50%','45%'], data: [{ value: 20, name: '瑜伽' },{ value: 15, name: '力量训练' },{ value: 10, name: '有氧运动' },{ value: 5, name: '普拉提' },{ value: 4, name: '拳击' },{ value: 3, name: '舞蹈' },{ value: 3, name: '拉伸' }], emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }, label: { formatter: '{b}: {d}%' } }]
}

const userRoleChartOption = {
  tooltip: { trigger: 'item', formatter: '{a}<br/>{b}: {c} ({d}%)' },
  legend: { orient: 'vertical', left: 'left', bottom: 10 },
  series: [{ name: '用户角色', type: 'pie', radius: '60%', center: ['50%','45%'], data: [{ value: 1500, name: '健身爱好者' },{ value: 300, name: '教练' },{ value: 150, name: '内容创作者' },{ value: 50, name: '管理员' }], emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }, label: { formatter: '{b}: {d}%' } }]
}

const regionHeatmapOption = {
  tooltip: { position: 'top', formatter: (p) => p.data[1] + '<br/>' + p.data[0] + ': ' + p.data[2] + ' 人' },
  grid: { left: '15%', right: '10%', top: 50, bottom: 80 },
  xAxis: { type: 'category', data: ['日活跃用户', '周活跃用户', '月活跃用户', '新增用户', '留存用户'], splitArea: { show: true }, axisLabel: { fontSize: 11 } },
  yAxis: { type: 'category', data: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京'], splitArea: { show: true }, axisLabel: { fontSize: 11 } },
  visualMap: { min: 0, max: 5000, calculable: true, orient: 'horizontal', left: 'center', bottom: 10, inRange: { color: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'] }, textStyle: { fontSize: 11 } },
  series: [{ name: '地域分布', type: 'heatmap', data: [
    [0,0,3800],[0,1,2800],[0,2,1900],[0,3,2200],[0,4,1800],[0,5,1500],[0,6,1200],[0,7,900],
    [1,0,4500],[1,1,3500],[1,2,2400],[1,3,3000],[1,4,2200],[1,5,2100],[1,6,1600],[1,7,1300],
    [2,0,2900],[2,1,2200],[2,2,1700],[2,3,1800],[2,4,1400],[2,5,1300],[2,6,900],[2,7,700],
    [3,0,3200],[3,1,2500],[3,2,1800],[3,3,2100],[3,4,1500],[3,5,1400],[3,6,1100],[3,7,800],
    [4,0,2400],[4,1,1800],[4,2,1400],[4,3,1600],[4,4,1100],[4,5,1000],[4,6,700],[4,7,600]
  ], label: { show: true, fontSize: 11 }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } } }]
}

const deviceTypeOption = {
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  legend: { orient: 'vertical', left: 'left', top: 'middle', itemGap: 12 },
  series: [{ name: '设备类型', type: 'pie', radius: ['45%','75%'], center: ['55%','50%'], avoidLabelOverlap: false, itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 }, label: { show: true, formatter: '{b}\n{d}%' }, data: [
    { value: 820, name: 'iPhone' }, { value: 650, name: 'Android手机' }, { value: 280, name: 'iPad' }, { value: 180, name: 'Android平板' }, { value: 310, name: 'PC端' }, { value: 60, name: '其他' }
  ] }]
}

const pageViewsOption = {
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: { left: '3%', right: '15%', top: 20, bottom: 10, containLabel: true },
  xAxis: { type: 'value', name: '访问量(次)' },
  yAxis: { type: 'category', inverse: true, data: ['首页', '资讯列表', '课程列表', '资讯详情', '课程详情', '个人中心', '搜索页面', '注册页', '推荐页', '收藏页'], axisLabel: { fontSize: 11 } },
  series: [{ type: 'bar', barMaxWidth: 28, label: { show: true, position: 'right', fontSize: 11 }, data: [
    { value: 25600, itemStyle: { color: '#5470c6' } }, { value: 18200, itemStyle: { color: '#91cc75' } }, { value: 14300, itemStyle: { color: '#fac858' } }, { value: 11800, itemStyle: { color: '#ee6666' } }, { value: 9600, itemStyle: { color: '#73c0de' } },
    { value: 7200, itemStyle: { color: '#fc8452' } }, { value: 5800, itemStyle: { color: '#3ba272' } }, { value: 4100, itemStyle: { color: '#9a60b4' } }, { value: 3200, itemStyle: { color: '#ea7ccc' } }, { value: 2500, itemStyle: { color: '#f6ca9d' } }
  ] }]
}

const chartConfigs = [
  { ref: userGrowthChart, key: 'userGrowth', option: userGrowthChartOption, height: '300px' },
  { ref: newsCategoryChart, key: 'newsCategory', option: newsCategoryChartOption, height: '300px' },
  { ref: courseTypeChart, key: 'courseType', option: courseTypeChartOption, height: '300px' },
  { ref: userRoleChart, key: 'userRole', option: userRoleChartOption, height: '300px' },
  { ref: regionHeatmapChart, key: 'regionHeatmap', option: regionHeatmapOption, height: '400px' },
  { ref: deviceTypeChart, key: 'deviceType', option: deviceTypeOption, height: '300px' },
  { ref: pageViewsChart, key: 'pageViews', option: pageViewsOption, height: '300px' }
]

const initCharts = () => {
  chartConfigs.forEach(config => {
    const el = config.ref.value
    if (el) {
      el.style.height = config.height
      const instance = echarts.init(el)
      instance.setOption(config.option)
      instances[config.key] = instance
    }
  })
  window.addEventListener('resize', () => {
    Object.values(instances).forEach(i => i?.resize())
  })
}

onMounted(() => { initCharts() })
</script>

<style scoped>
.dashboard-container { min-height: 100vh; background-color: #f5f5f5; }
.navbar { background-color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
.nav-content { max-width: 1400px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; height: 60px; }
.logo h1 { font-size: 20px; color: #1890ff; margin: 0; }
.nav-menu { display: flex; gap: 20px; }
.nav-menu a { text-decoration: none; color: #333; font-size: 14px; padding: 8px 0; position: relative; }
.nav-menu a.active::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background-color: #1890ff; }
.user-info { display: flex; align-items: center; gap: 10px; }
.username { font-size: 14px; color: #333; }
.notification-btn { position: relative; margin-right: 10px; }
.unread-badge { position: absolute; top: -5px; right: -5px; background-color: #ff4d4f; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 12px; display: flex; align-items: center; justify-content: center; }
.notification-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 20px 0; margin-bottom: 10px; border-bottom: 1px solid #f0f0f0; }
.notification-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f5f7fa;
}

.notification-item.unread-item {
  background-color: #f0f9ff;
}

.notification-item.unread-item:hover {
  background-color: #e6f4ff;
}

.notification-content {
  min-width: 260px;
}

.notification-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.notification-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ff4d4f;
  flex-shrink: 0;
}

.notification-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.notification-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.notification-item:hover { background-color: #f5f5f5; }
.dashboard-content { max-width: 1400px; margin: 0 auto; padding: 20px; }
.overview-section { margin-bottom: 30px; }
.overview-section h2 { font-size: 20px; color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #1890ff; }
.overview-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.overview-card { transition: transform 0.3s ease; }
.overview-card:hover { transform: translateY(-5px); }
.card-content { text-align: center; }
.card-title { font-size: 14px; color: #666; margin-bottom: 10px; }
.card-value { font-size: 24px; font-weight: bold; color: #1890ff; }
.charts-section { margin-bottom: 30px; }
.charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 20px; }
.chart-card { transition: transform 0.3s ease; }
.chart-card:hover { transform: translateY(-5px); }
.chart-card.full-width { grid-column: 1 / -1; }
.chart-container { height: 300px; }
.chart-container-large { height: 400px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.activity-section { margin-bottom: 30px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.activity-section h2 { font-size: 20px; color: #333; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #1890ff; }
@media (max-width: 768px) {
  .nav-menu { display: none; }
  .overview-cards { grid-template-columns: 1fr; }
  .charts-grid { grid-template-columns: 1fr; }
  .chart-container { height: 250px; }
  .chart-container-large { height: 300px; }
}
</style>