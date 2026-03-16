<template>
  <div class="fans-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/creator/publish">资讯发布</a>
          <a href="/creator/manage">内容管理</a>
          <a href="/creator/fans" class="active">粉丝互动</a>
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

    <!-- 粉丝互动内容 -->
    <div class="fans-content">
      <!-- 粉丝统计 -->
      <div class="stats-section">
        <h2>粉丝统计</h2>
        <div class="stats-cards">
          <el-card class="stats-card">
            <div class="card-content">
              <div class="card-title">总粉丝数</div>
              <div class="card-value">{{ stats.totalFans }}</div>
            </div>
          </el-card>
          <el-card class="stats-card">
            <div class="card-content">
              <div class="card-title">本周新增</div>
              <div class="card-value">{{ stats.weeklyNew }}</div>
            </div>
          </el-card>
          <el-card class="stats-card">
            <div class="card-content">
              <div class="card-title">本月新增</div>
              <div class="card-value">{{ stats.monthlyNew }}</div>
            </div>
          </el-card>
          <el-card class="stats-card">
            <div class="card-content">
              <div class="card-title">互动率</div>
              <div class="card-value">{{ stats.interactionRate }}</div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 粉丝列表 -->
      <div class="fans-list-section">
        <h2>粉丝列表</h2>
        <el-table :data="fans" style="width: 100%">
          <el-table-column prop="id" label="粉丝ID" width="80"></el-table-column>
          <el-table-column prop="name" label="粉丝名称"></el-table-column>
          <el-table-column prop="followTime" label="关注时间" width="180"></el-table-column>
          <el-table-column prop="lastInteraction" label="最后互动" width="180"></el-table-column>
          <el-table-column prop="interactionCount" label="互动次数" width="120"></el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button type="primary" size="small" @click="sendMessage(scope.row)">私信</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 粉丝互动记录 -->
      <div class="interaction-section">
        <h2>互动记录</h2>
        <el-table :data="interactions" style="width: 100%">
          <el-table-column prop="id" label="记录ID" width="80"></el-table-column>
          <el-table-column prop="fan" label="粉丝名称"></el-table-column>
          <el-table-column prop="type" label="互动类型" width="120"></el-table-column>
          <el-table-column prop="content" label="互动内容"></el-table-column>
          <el-table-column prop="time" label="互动时间" width="180"></el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button type="primary" size="small" @click="replyInteraction(scope.row)">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()

// 模拟用户信息
const username = ref('内容创作者')
const userAvatar = ref('')

// 模拟统计数据
const stats = ref({
  totalFans: 1200,
  weeklyNew: 50,
  monthlyNew: 200,
  interactionRate: '85%'
})

// 模拟粉丝数据
const fans = ref([
  {
    id: 1,
    name: '用户1',
    followTime: '2024-01-10 10:00',
    lastInteraction: '2024-01-16 15:30',
    interactionCount: 15
  },
  {
    id: 2,
    name: '用户2',
    followTime: '2024-01-05 09:30',
    lastInteraction: '2024-01-15 14:20',
    interactionCount: 10
  },
  {
    id: 3,
    name: '用户3',
    followTime: '2023-12-28 16:45',
    lastInteraction: '2024-01-14 11:10',
    interactionCount: 20
  },
  {
    id: 4,
    name: '用户4',
    followTime: '2023-12-20 13:20',
    lastInteraction: '2024-01-13 09:45',
    interactionCount: 8
  }
])

// 模拟互动记录数据
const interactions = ref([
  {
    id: 1,
    fan: '用户1',
    type: '评论',
    content: '这篇文章写得很详细，对我很有帮助！',
    time: '2024-01-16 15:30'
  },
  {
    id: 2,
    fan: '用户2',
    type: '私信',
    content: '请问如何科学增肌？',
    time: '2024-01-15 14:20'
  },
  {
    id: 3,
    fan: '用户3',
    type: '评论',
    content: '感谢分享，我会按照这个计划开始训练。',
    time: '2024-01-14 11:10'
  }
])

// 发送私信
const sendMessage = (fan) => {
  console.log('发送私信:', fan)
  // 实际项目中可以弹出私信对话框
  alert(`给 ${fan.name} 发送私信`)
}

// 回复互动
const replyInteraction = (interaction) => {
  console.log('回复互动:', interaction)
  // 实际项目中可以弹出回复对话框
  alert(`回复 ${interaction.fan} 的${interaction.type}`)
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
.fans-container {
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
  max-width: 1200px;
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
  gap: 30px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
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

/* 粉丝互动内容 */
.fans-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 统计部分 */
.stats-section {
  margin-bottom: 30px;
}

.stats-section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stats-card {
  transition: transform 0.3s ease;
}

.stats-card:hover {
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

/* 粉丝列表 */
.fans-list-section {
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.fans-list-section h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

/* 互动记录 */
.interaction-section {
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.interaction-section h2 {
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
  
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>