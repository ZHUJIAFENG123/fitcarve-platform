<template>
  <div class="news-detail-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/home">首页</a>
          <a href="/news/list" class="active">资讯</a>
          <a href="/courses/list">课程</a>
          <a href="/recommendation">推荐</a>
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

    <!-- 资讯详情 -->
    <div class="news-detail">
      <div class="news-header">
        <h1>{{ news.title }}</h1>
        <div class="news-meta">
          <span class="author">{{ news.author }}</span>
          <span class="time">{{ news.time }}</span>
          <span class="views">{{ news.views }} 浏览</span>
        </div>
        <div class="news-tags">
          <el-tag v-for="tag in news.tags" :key="tag">{{ tag }}</el-tag>
        </div>
      </div>

      <div class="news-content">
        <img :src="news.image" :alt="news.title" class="news-image">
        <div class="news-body">
          <p>{{ news.content }}</p>
          <p>这是资讯的详细内容，包含了丰富的健身知识和建议。通过科学的训练方法和合理的饮食搭配，你可以获得更好的健身效果。</p>
          <p>健身是一个长期的过程，需要坚持和耐心。每天适量的运动，结合健康的生活方式，能够让你拥有更健康的身体和更积极的心态。</p>
          <p>希望这篇资讯对你有所帮助，如果你有任何问题或建议，欢迎在下方评论区留言。</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="news-actions">
        <el-button type="primary" @click="toggleFavorite" :icon="isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'">
          {{ isFavorite ? '已收藏' : '收藏' }}
        </el-button>
        <el-button @click="share" icon="el-icon-share">分享</el-button>
        <el-button @click="comment" icon="el-icon-chat-dot-round">评论</el-button>
      </div>

      <!-- 评论区 -->
      <div class="comment-section">
        <h3>评论区</h3>
        <div class="comment-input">
          <el-input
            v-model="commentContent"
            type="textarea"
            placeholder="写下你的评论..."
            :rows="3"
          ></el-input>
          <el-button type="primary" @click="submitComment" class="submit-btn">提交评论</el-button>
        </div>
        <div class="comments">
          <div class="comment-item" v-for="comment in comments" :key="comment.id">
            <div class="comment-avatar">
              <el-avatar>{{ comment.user.charAt(0) }}</el-avatar>
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-user">{{ comment.user }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <div class="comment-body">{{ comment.content }}</div>
              <div class="comment-actions">
                <el-button type="text" size="small">回复</el-button>
                <el-button type="text" size="small">点赞</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 模拟用户信息
const username = ref('健身爱好者')
const userAvatar = ref('')

// 模拟资讯数据
const news = ref({
  id: 1,
  title: '如何科学制定健身计划',
  content: '这是一篇关于如何科学制定健身计划的详细资讯。',
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20plan%20scientific&image_size=landscape_16_9',
  author: '健身专家',
  time: '2024-01-15',
  views: 1234,
  tags: ['健身计划', '科学训练', '减肥'],
  isFavorite: false
})

// 收藏状态
const isFavorite = ref(false)

// 评论相关
const commentContent = ref('')
const comments = ref([
  {
    id: 1,
    user: '用户1',
    time: '2024-01-16',
    content: '这篇文章写得很详细，对我很有帮助！'
  },
  {
    id: 2,
    user: '用户2',
    time: '2024-01-17',
    content: '感谢分享，我会按照这个计划开始训练。'
  }
])

// 生命周期
onMounted(() => {
  // 获取路由参数中的资讯ID
  const id = route.params.id
  console.log('资讯ID:', id)
  // 实际项目中需要根据ID从后端获取资讯详情
})

// 切换收藏状态
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  console.log('收藏状态:', isFavorite.value)
}

// 分享功能
const share = () => {
  // 实际项目中可以实现分享到社交媒体的功能
  console.log('分享资讯:', news.value.title)
  alert('分享成功！')
}

// 评论功能
const comment = () => {
  // 滚动到评论输入框
  document.querySelector('.comment-input').scrollIntoView({ behavior: 'smooth' })
}

// 提交评论
const submitComment = () => {
  if (commentContent.value.trim()) {
    comments.value.push({
      id: comments.value.length + 1,
      user: username.value,
      time: new Date().toISOString().split('T')[0],
      content: commentContent.value
    })
    commentContent.value = ''
    console.log('评论提交成功')
  }
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
.news-detail-container {
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

/* 资讯详情 */
.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.news-header {
  margin-bottom: 20px;
}

.news-header h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.news-meta {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
  display: flex;
  gap: 15px;
}

.news-tags {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.news-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.news-body {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

.news-body p {
  margin-bottom: 15px;
}

/* 操作按钮 */
.news-actions {
  margin: 30px 0;
  display: flex;
  gap: 10px;
}

/* 评论区 */
.comment-section {
  margin-top: 40px;
}

.comment-section h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.comment-input {
  margin-bottom: 30px;
}

.submit-btn {
  margin-top: 10px;
  float: right;
}

.comments {
  clear: both;
}

.comment-item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comment-avatar {
  margin-right: 15px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-user {
  font-weight: bold;
  color: #333;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-body {
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  margin-bottom: 10px;
}

.comment-actions {
  display: flex;
  gap: 15px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .news-image {
    height: 200px;
  }
  
  .news-actions {
    flex-direction: column;
  }
  
  .news-actions button {
    width: 100%;
  }
}
</style>