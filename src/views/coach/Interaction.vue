<template>
  <div class="interaction-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/coach/publish">内容发布</a>
          <a href="/coach/interaction" class="active">用户互动</a>
          <a href="/coach/statistics">数据统计</a>
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

    <!-- 互动内容 -->
    <div class="interaction-content">
      <el-tabs>
        <el-tab-pane label="评论管理">
          <div class="comments-section">
            <el-table :data="comments" style="width: 100%">
              <el-table-column prop="id" label="评论ID" width="80"></el-table-column>
              <el-table-column prop="course" label="课程名称"></el-table-column>
              <el-table-column prop="user" label="用户"></el-table-column>
              <el-table-column prop="content" label="评论内容"></el-table-column>
              <el-table-column prop="time" label="评论时间" width="180"></el-table-column>
              <el-table-column prop="rating" label="评分" width="80">
                <template #default="scope">
                  <el-rate v-model="scope.row.rating" disabled :max="5"></el-rate>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="replyComment(scope.row)">回复</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="粉丝管理">
          <div class="fans-section">
            <el-table :data="fans" style="width: 100%">
              <el-table-column prop="id" label="粉丝ID" width="80"></el-table-column>
              <el-table-column prop="name" label="粉丝名称"></el-table-column>
              <el-table-column prop="followTime" label="关注时间" width="180"></el-table-column>
              <el-table-column prop="courses" label="已购课程" width="120"></el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="sendMessage(scope.row)">私信</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="私信管理">
          <div class="messages-section">
            <el-table :data="messages" style="width: 100%">
              <el-table-column prop="id" label="消息ID" width="80"></el-table-column>
              <el-table-column prop="user" label="用户"></el-table-column>
              <el-table-column prop="content" label="消息内容"></el-table-column>
              <el-table-column prop="time" label="发送时间" width="180"></el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="replyMessage(scope.row)">回复</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()

// 模拟用户信息
const username = ref('教练')
const userAvatar = ref('')

// 模拟评论数据
const comments = ref([
  {
    id: 1,
    course: '初级瑜伽入门',
    user: '用户1',
    content: '课程非常好，教练讲解详细，适合初学者。',
    time: '2024-01-16 10:30',
    rating: 5
  },
  {
    id: 2,
    course: '力量训练基础',
    user: '用户2',
    content: '跟着练习了几节课，感觉身体明显变得更有力了。',
    time: '2024-01-15 15:45',
    rating: 4
  },
  {
    id: 3,
    course: '有氧运动减脂',
    user: '用户3',
    content: '课程强度适中，减脂效果明显。',
    time: '2024-01-14 09:20',
    rating: 5
  }
])

// 模拟粉丝数据
const fans = ref([
  {
    id: 1,
    name: '用户1',
    followTime: '2024-01-10',
    courses: 3
  },
  {
    id: 2,
    name: '用户2',
    followTime: '2024-01-05',
    courses: 2
  },
  {
    id: 3,
    name: '用户3',
    followTime: '2023-12-28',
    courses: 5
  }
])

// 模拟私信数据
const messages = ref([
  {
    id: 1,
    user: '用户1',
    content: '教练，请问这个动作怎么做才正确？',
    time: '2024-01-16 11:00'
  },
  {
    id: 2,
    user: '用户2',
    content: '教练，我想咨询一下如何制定个人健身计划。',
    time: '2024-01-15 16:30'
  }
])

// 回复评论
const replyComment = (comment) => {
  console.log('回复评论:', comment)
  // 实际项目中可以弹出回复对话框
  alert(`回复 ${comment.user} 的评论`)
}

// 发送私信
const sendMessage = (fan) => {
  console.log('发送私信:', fan)
  // 实际项目中可以弹出私信对话框
  alert(`给 ${fan.name} 发送私信`)
}

// 回复消息
const replyMessage = (message) => {
  console.log('回复消息:', message)
  // 实际项目中可以弹出回复对话框
  alert(`回复 ${message.user} 的消息`)
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
.interaction-container {
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

/* 互动内容 */
.interaction-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>