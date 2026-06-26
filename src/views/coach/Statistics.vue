<template>
  <div class="statistics-container">
    <Navbar :menu-links="coachMenuLinks" />
    <!-- 统计内容 -->
    <div class="statistics-content">
      <!-- 数据概览 -->
      <div class="overview-section">
        <h2>数据概览</h2>
        <div class="overview-cards">
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">课程数量</div>
              <div class="card-value">{{ statistics.courses }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">学员数量</div>
              <div class="card-value">{{ statistics.students }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">总收益</div>
              <div class="card-value">{{ statistics.income }}</div>
            </div>
          </el-card>
          <el-card class="overview-card">
            <div class="card-content">
              <div class="card-title">平均评分</div>
              <div class="card-value">{{ statistics.averageRating }}</div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 图表统计 -->
      <div class="charts-section">
        <h2>详细统计</h2>
        <div class="charts-grid">
          <!-- 课程报名趋势 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>课程报名趋势</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="enrollmentChartOption" />
            </div>
          </el-card>

          <!-- 课程收益分布 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>课程收益分布</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="incomeChartOption" />
            </div>
          </el-card>

          <!-- 学员地区分布 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>学员地区分布</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="regionChartOption" />
            </div>
          </el-card>

          <!-- 课程评分分布 -->
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>课程评分分布</span>
              </div>
            </template>
            <div class="chart-container">
              <v-chart :option="ratingChartOption" />
            </div>
          </el-card>
        </div>
      </div>

      <!-- 课程详情 -->
      <div class="courses-section">
        <h2>课程详情</h2>
        <el-table :data="coursesData" style="width: 100%">
          <el-table-column prop="id" label="课程ID" width="80"></el-table-column>
          <el-table-column prop="title" label="课程名称"></el-table-column>
          <el-table-column prop="students" label="学员数量" width="120"></el-table-column>
          <el-table-column prop="income" label="收益" width="120"></el-table-column>
          <el-table-column prop="rating" label="评分" width="120">
            <template #default="scope">
              <el-rate v-model="scope.row.rating" disabled :max="5"></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="enrollmentRate" label="报名率" width="120"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import VChart from 'vue-echarts'

const router = useRouter()

const coachMenuLinks = [
  { to: '/coach/publish', label: '内容发布', active: false },
  { to: '/coach/interaction', label: '用户互动', active: false },
  { to: '/coach/statistics', label: '数据统计', active: true },
  { to: '/coach/manage', label: '课程管理', active: false }
]

// 模拟用户信息
const username = ref('教练')
const userAvatar = ref('')

// 模拟统计数据
const statistics = ref({
  courses: 12,
  students: 1200,
  income: '¥120,000',
  averageRating: 4.8
})

// 模拟课程数据
const coursesData = ref([
  {
    id: 1,
    title: '初级瑜伽入门',
    students: 350,
    income: '¥35,000',
    rating: 4.9,
    enrollmentRate: '85%'
  },
  {
    id: 2,
    title: '力量训练基础',
    students: 280,
    income: '¥28,000',
    rating: 4.7,
    enrollmentRate: '75%'
  },
  {
    id: 3,
    title: '有氧运动减脂',
    students: 320,
    income: '¥32,000',
    rating: 4.8,
    enrollmentRate: '80%'
  },
  {
    id: 4,
    title: '高级瑜伽课程',
    students: 250,
    income: '¥25,000',
    rating: 4.9,
    enrollmentRate: '70%'
  }
])

// 课程报名趋势图表配置
const enrollmentChartOption = ref({
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 190, 300, 500, 800, 1200],
      type: 'line',
      smooth: true
    }
  ]
})

// 课程收益分布图表配置
const incomeChartOption = ref({
  series: [
    {
      type: 'pie',
      data: [
        { value: 35000, name: '初级瑜伽入门' },
        { value: 28000, name: '力量训练基础' },
        { value: 32000, name: '有氧运动减脂' },
        { value: 25000, name: '高级瑜伽课程' }
      ]
    }
  ]
})

// 学员地区分布图表配置
const regionChartOption = ref({
  xAxis: {
    type: 'category',
    data: ['北京', '上海', '广州', '深圳', '杭州', '成都']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [200, 180, 150, 120, 100, 80],
      type: 'bar'
    }
  ]
})

// 课程评分分布图表配置
const ratingChartOption = ref({
  xAxis: {
    type: 'category',
    data: ['5星', '4星', '3星', '2星', '1星']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [800, 300, 80, 15, 5],
      type: 'bar'
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
.statistics-container { min-height: 100vh; background-color: var(--color-bg); }
.statistics-content { max-width: 1200px; margin: 0 auto; padding: 20px; }
.overview-section { margin-bottom: 30px; }
.overview-section h2, .charts-section h2, .courses-section h2 {
  font-size: 20px; color: var(--color-text-primary); margin-bottom: 20px;
  padding-bottom: 10px; border-bottom: 2px solid var(--color-primary);
  font-family: var(--font-display); font-weight: 700;
}
.overview-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.overview-card { transition: transform 0.3s ease; }
.overview-card:hover { transform: translateY(-5px); }
.card-content { text-align: center; }
.card-title { font-size: 14px; color: var(--color-text-secondary); margin-bottom: 10px; }
.card-value { font-size: 24px; font-weight: bold; color: var(--color-primary); }
.charts-section { margin-bottom: 30px; }
.charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 20px; }
.chart-card { transition: transform 0.3s ease; }
.chart-card:hover { transform: translateY(-5px); }
.chart-container { height: 300px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.courses-section { margin-bottom: 30px; }

@media (max-width: 768px) {
  .overview-cards { grid-template-columns: 1fr; }
  .charts-grid { grid-template-columns: 1fr; }
  .chart-container { height: 250px; }
}
</style>