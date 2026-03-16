<template>
  <div class="admin-reports">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>数据统计报表</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px"
            @change="handleDateChange"
          />
        </div>
      </template>
      
      <div class="reports-grid">
        <!-- 概览卡片 -->
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
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>用户增长趋势</span>
            </template>
            <div ref="userGrowthChart" class="chart"></div>
          </el-card>
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>用户角色分布</span>
            </template>
            <div ref="userRoleChart" class="chart"></div>
          </el-card>
        </div>
        
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>资讯发布趋势</span>
            </template>
            <div ref="newsTrendChart" class="chart"></div>
          </el-card>
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>资讯分类分布</span>
            </template>
            <div ref="newsCategoryChart" class="chart"></div>
          </el-card>
        </div>
        
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>课程学习人数</span>
            </template>
            <div ref="courseStudyChart" class="chart"></div>
          </el-card>
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>热门课程排行</span>
            </template>
            <div ref="hotCoursesChart" class="chart"></div>
          </el-card>
        </div>
        
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>用户活跃度分析</span>
            </template>
            <div ref="userActivityChart" class="chart"></div>
          </el-card>
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>资讯阅读量统计</span>
            </template>
            <div ref="newsReadChart" class="chart"></div>
          </el-card>
        </div>
        
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>评论数量统计</span>
            </template>
            <div ref="commentChart" class="chart"></div>
          </el-card>
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>收藏数量统计</span>
            </template>
            <div ref="collectChart" class="chart"></div>
          </el-card>
        </div>
        
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>分享数量统计</span>
            </template>
            <div ref="shareChart" class="chart"></div>
          </el-card>
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>登录次数统计</span>
            </template>
            <div ref="loginChart" class="chart"></div>
          </el-card>
        </div>
        
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card full-width">
            <template #header>
              <span>地域分布热力图</span>
            </template>
            <div ref="regionChart" class="chart"></div>
          </el-card>
        </div>
        
        <div class="chart-row">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>设备类型分布</span>
            </template>
            <div ref="deviceChart" class="chart"></div>
          </el-card>
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <span>页面访问量统计</span>
            </template>
            <div ref="pageViewChart" class="chart"></div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

// 日期范围
const dateRange = ref([])

// 概览数据
const overviewData = ref({
  totalUsers: 1200,
  userGrowth: 15.6,
  totalNews: 350,
  newsGrowth: 8.2,
  totalCourses: 85,
  courseGrowth: 12.3,
  totalVisits: 50000,
  visitGrowth: 20.5
})

// 图表引用
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

// 图表实例
let charts = {}

// 模拟数据
const mockData = {
  // 用户增长数据
  userGrowth: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [800, 850, 920, 980, 1100, 1200]
  },
  // 用户角色分布
  userRoles: {
    roles: ['健身爱好者', '教练', '内容创作者', '管理员'],
    data: [850, 150, 180, 20]
  },
  // 资讯发布趋势
  newsTrend: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [45, 52, 60, 58, 65, 70]
  },
  // 资讯分类分布
  newsCategories: {
    categories: ['健身指南', '营养饮食', '健身装备', '健身故事', '其他'],
    data: [120, 80, 60, 70, 20]
  },
  // 课程学习人数
  courseStudy: {
    courses: ['瑜伽基础', '力量训练', '有氧运动', '普拉提', '拳击'],
    data: [250, 200, 180, 150, 120]
  },
  // 热门课程排行
  hotCourses: {
    courses: ['瑜伽基础', '力量训练', '有氧运动', '普拉提', '拳击'],
    data: [9.5, 9.2, 8.8, 8.5, 8.2]
  },
  // 用户活跃度
  userActivity: {
    days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    data: [300, 350, 400, 450, 500, 600, 550]
  },
  // 资讯阅读量
  newsRead: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [1500, 1800, 2200, 2500, 2800, 3200]
  },
  // 评论数量
  comments: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [200, 250, 300, 350, 400, 450]
  },
  // 收藏数量
  collects: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [150, 180, 220, 260, 300, 350]
  },
  // 分享数量
  shares: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [100, 120, 150, 180, 220, 250]
  },
  // 登录次数
  logins: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    data: [800, 900, 1000, 1100, 1200, 1300]
  },
  // 地域分布
  regions: [
    { name: '北京', value: 200 },
    { name: '上海', value: 180 },
    { name: '广州', value: 150 },
    { name: '深圳', value: 140 },
    { name: '杭州', value: 120 },
    { name: '成都', value: 100 },
    { name: '武汉', value: 90 },
    { name: '西安', value: 80 },
    { name: '南京', value: 70 },
    { name: '重庆', value: 60 }
  ],
  // 设备类型
  devices: {
    types: ['PC', '手机', '平板', '其他'],
    data: [40, 50, 8, 2]
  },
  // 页面访问量
  pageViews: {
    pages: ['首页', '资讯列表', '资讯详情', '课程列表', '课程详情', '个人中心'],
    data: [15000, 12000, 10000, 8000, 7000, 6000]
  }
}

// 初始化图表
const initCharts = () => {
  // 用户增长趋势
  charts.userGrowth = echarts.init(userGrowthChart.value)
  charts.userGrowth.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.userGrowth.months
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.userGrowth.data,
      type: 'line',
      smooth: true,
      areaStyle: {}
    }]
  })
  
  // 用户角色分布
  charts.userRole = echarts.init(userRoleChart.value)
  charts.userRole.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '用户角色',
      type: 'pie',
      radius: '60%',
      data: mockData.userRoles.roles.map((role, index) => ({
        value: mockData.userRoles.data[index],
        name: role
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })
  
  // 资讯发布趋势
  charts.newsTrend = echarts.init(newsTrendChart.value)
  charts.newsTrend.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.newsTrend.months
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.newsTrend.data,
      type: 'bar'
    }]
  })
  
  // 资讯分类分布
  charts.newsCategory = echarts.init(newsCategoryChart.value)
  charts.newsCategory.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '资讯分类',
      type: 'pie',
      radius: '60%',
      data: mockData.newsCategories.categories.map((category, index) => ({
        value: mockData.newsCategories.data[index],
        name: category
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })
  
  // 课程学习人数
  charts.courseStudy = echarts.init(courseStudyChart.value)
  charts.courseStudy.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: mockData.courseStudy.courses,
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.courseStudy.data,
      type: 'bar'
    }]
  })
  
  // 热门课程排行
  charts.hotCourses = echarts.init(hotCoursesChart.value)
  charts.hotCourses.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'value',
      max: 10
    },
    yAxis: {
      type: 'category',
      data: mockData.hotCourses.courses
    },
    series: [{
      data: mockData.hotCourses.data,
      type: 'bar'
    }]
  })
  
  // 用户活跃度分析
  charts.userActivity = echarts.init(userActivityChart.value)
  charts.userActivity.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.userActivity.days
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.userActivity.data,
      type: 'line',
      smooth: true
    }]
  })
  
  // 资讯阅读量统计
  charts.newsRead = echarts.init(newsReadChart.value)
  charts.newsRead.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.newsRead.months
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.newsRead.data,
      type: 'line',
      smooth: true
    }]
  })
  
  // 评论数量统计
  charts.comments = echarts.init(commentChart.value)
  charts.comments.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.comments.months
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.comments.data,
      type: 'bar'
    }]
  })
  
  // 收藏数量统计
  charts.collects = echarts.init(collectChart.value)
  charts.collects.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.collects.months
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.collects.data,
      type: 'bar'
    }]
  })
  
  // 分享数量统计
  charts.shares = echarts.init(shareChart.value)
  charts.shares.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.shares.months
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.shares.data,
      type: 'bar'
    }]
  })
  
  // 登录次数统计
  charts.logins = echarts.init(loginChart.value)
  charts.logins.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.logins.months
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.logins.data,
      type: 'line',
      smooth: true
    }]
  })
  
  // 地域分布热力图
  charts.region = echarts.init(regionChart.value)
  charts.region.setOption({
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      min: 0,
      max: 200,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true
    },
    series: [{
      name: '用户分布',
      type: 'map',
      map: 'china',
      roam: false,
      label: {
        show: true,
        fontSize: 10
      },
      data: mockData.regions
    }]
  })
  
  // 设备类型分布
  charts.device = echarts.init(deviceChart.value)
  charts.device.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '设备类型',
      type: 'pie',
      radius: '60%',
      data: mockData.devices.types.map((type, index) => ({
        value: mockData.devices.data[index],
        name: type
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })
  
  // 页面访问量统计
  charts.pageView = echarts.init(pageViewChart.value)
  charts.pageView.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: mockData.pageViews.pages,
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: mockData.pageViews.data,
      type: 'bar'
    }]
  })
}

// 处理日期变化
const handleDateChange = () => {
  // 这里可以根据日期范围重新获取数据
  console.log('Date range changed:', dateRange.value)
}

// 监听窗口大小变化，调整图表大小
const handleResize = () => {
  Object.values(charts).forEach(chart => {
    chart.resize()
  })
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.admin-reports {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.overview-card {
  height: 150px;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.card-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-change {
  font-size: 12px;
  color: #999;
}

.card-change.positive {
  color: #67c23a;
}

.reports-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  height: 400px;
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart {
  width: 100%;
  height: calc(100% - 48px);
}

@media (max-width: 1200px) {
  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-reports {
    padding: 10px;
  }
  
  .overview-cards {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .card-header .el-date-picker {
    margin-top: 10px;
  }
  
  .chart-card {
    height: 300px;
  }
}
</style>