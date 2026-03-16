<template>
  <div class="recommendation-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/home">首页</a>
          <a href="/news/list">资讯</a>
          <a href="/courses/list">课程</a>
          <a href="/recommendation" class="active">推荐</a>
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

    <!-- 推荐内容 -->
    <div class="recommendation-content">
      <div class="section-header">
        <h2>为您推荐</h2>
        <p>基于您的兴趣和浏览历史</p>
      </div>

      <!-- 推荐课程 -->
      <div class="section">
        <h3>推荐课程</h3>
        <div class="course-grid">
          <el-card v-for="course in recommendedCourses" :key="course.id" class="course-card">
            <img :src="course.image" :alt="course.title" class="course-image">
            <div class="course-content">
              <h4>{{ course.title }}</h4>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-meta">
                <span class="coach">{{ course.coach }}</span>
                <span class="level">{{ course.level }}</span>
              </div>
              <el-button type="primary" @click="toCourseDetail(course.id)" class="enroll-btn">查看详情</el-button>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 推荐资讯 -->
      <div class="section">
        <h3>推荐资讯</h3>
        <div class="news-grid">
          <el-card v-for="news in recommendedNews" :key="news.id" class="news-card">
            <img :src="news.image" :alt="news.title" class="news-image">
            <div class="news-content">
              <h4>{{ news.title }}</h4>
              <p class="news-description">{{ news.description }}</p>
              <div class="news-meta">
                <span class="author">{{ news.author }}</span>
                <span class="time">{{ news.time }}</span>
              </div>
              <el-button type="primary" @click="toNewsDetail(news.id)" class="read-btn">阅读全文</el-button>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 推荐教练 -->
      <div class="section">
        <h3>推荐教练</h3>
        <div class="coach-grid">
          <el-card v-for="coach in recommendedCoaches" :key="coach.id" class="coach-card">
            <el-avatar size="80">{{ coach.name.charAt(0) }}</el-avatar>
            <div class="coach-content">
              <h4>{{ coach.name }}</h4>
              <p class="coach-specialty">{{ coach.specialty }}</p>
              <div class="coach-stats">
                <span>{{ coach.courses }} 门课程</span>
                <span>{{ coach.students }} 名学生</span>
              </div>
              <el-button type="primary" class="view-btn">查看详情</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { loadUserInfo } from '../../services/user.js'

const router = useRouter()

// 用户信息
const userInfo = ref(loadUserInfo())
const username = computed(() => userInfo.value.username)
const userAvatar = computed(() => userInfo.value.avatar)

// 监听localStorage变化，实时更新用户信息
const handleStorageChange = () => {
  userInfo.value = loadUserInfo()
}

// 组件挂载时添加监听器
onMounted(() => {
  window.addEventListener('storage', handleStorageChange)
})

// 组件卸载时移除监听器
onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})

// 模拟推荐课程数据
const recommendedCourses = ref([
  {
    id: 1,
    title: '瑜伽进阶课程',
    description: '适合有一定基础的瑜伽爱好者，提升瑜伽技能',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=advanced%20yoga%20class&image_size=square',
    coach: '瑜伽教练',
    level: '中级'
  },
  {
    id: 2,
    title: '力量训练强化',
    description: '针对性的力量训练，增强肌肉力量',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=strength%20training%20advanced&image_size=square',
    coach: '健身教练',
    level: '高级'
  },
  {
    id: 3,
    title: '有氧运动减脂',
    description: '高效有氧运动，帮助快速减脂',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cardio%20fat%20loss%20workout&image_size=square',
    coach: '减脂专家',
    level: '中级'
  }
])

// 模拟推荐资讯数据
const recommendedNews = ref([
  {
    id: 1,
    title: '如何科学增肌',
    description: '科学的增肌方法和饮食建议',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=muscle%20building%20science&image_size=square',
    author: '健身专家',
    time: '2024-01-15'
  },
  {
    id: 2,
    title: '健身后的营养补充',
    description: '健身后如何正确补充营养',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=post%20workout%20nutrition&image_size=square',
    author: '营养专家',
    time: '2024-01-10'
  },
  {
    id: 3,
    title: '如何避免健身受伤',
    description: '正确的健身姿势和预防受伤的方法',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20injury%20prevention&image_size=square',
    author: '运动康复师',
    time: '2024-01-05'
  }
])

// 模拟推荐教练数据
const recommendedCoaches = ref([
  {
    id: 1,
    name: '瑜伽教练',
    specialty: '瑜伽、普拉提',
    courses: 12,
    students: 1200
  },
  {
    id: 2,
    name: '健身教练',
    specialty: '力量训练、减脂',
    courses: 8,
    students: 850
  },
  {
    id: 3,
    name: '营养专家',
    specialty: '运动营养、饮食规划',
    courses: 5,
    students: 600
  }
])

// 跳转到课程详情
const toCourseDetail = (id) => {
  router.push(`/courses/detail/${id}`)
}

// 跳转到资讯详情
const toNewsDetail = (id) => {
  router.push(`/news/detail/${id}`)
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
.recommendation-container {
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

/* 推荐内容 */
.recommendation-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.section-header p {
  color: #666;
  font-size: 16px;
}

/* 通用 section 样式 */
.section {
  margin-bottom: 40px;
}

.section h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

/* 课程网格 */
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  transition: transform 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.course-content h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.course-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-meta {
  font-size: 12px;
  color: #999;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.enroll-btn {
  width: 100%;
}

/* 资讯网格 */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.news-card {
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.news-content h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.news-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  font-size: 12px;
  color: #999;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.read-btn {
  width: 100%;
}

/* 教练网格 */
.coach-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.coach-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.coach-card:hover {
  transform: translateY(-5px);
}

.coach-card .el-avatar {
  margin: 0 auto 15px;
}

.coach-content h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.coach-specialty {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.coach-stats {
  font-size: 12px;
  color: #999;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.view-btn {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .course-grid,
  .news-grid,
  .coach-grid {
    grid-template-columns: 1fr;
  }
}
</style>