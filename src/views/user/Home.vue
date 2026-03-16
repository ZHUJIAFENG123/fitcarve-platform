<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/home" class="active">首页</a>
          <a href="/news/list">资讯</a>
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

    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel :interval="5000" type="card" height="400px">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <div class="banner-item" @click="goToBannerDetail(item.id)">
            <img :src="item.image" :alt="item.title" class="banner-image">
            <div class="banner-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 资讯推荐 -->
    <section class="news-section">
      <div class="section-header">
        <h2>热门资讯</h2>
        <a href="/news/list" class="more">查看更多</a>
      </div>
      <div class="news-list">
        <el-card v-for="news in hotNews" :key="news.id" class="news-card" @click="goToNewsDetail(news.id)">
          <div class="news-item">
            <img :src="news.image" :alt="news.title" class="news-image">
            <div class="news-content">
              <h3>{{ news.title }}</h3>
              <p class="news-description">{{ news.description }}</p>
              <div class="news-meta">
                <span class="author">{{ news.author }}</span>
                <span class="time">{{ news.time }}</span>
                <span class="views">{{ news.views }} 浏览</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </section>

    <!-- 课程推荐 -->
    <section class="course-section">
      <div class="section-header">
        <h2>推荐课程</h2>
        <a href="/courses/list" class="more">查看更多</a>
      </div>
      <div class="course-list">
        <el-card v-for="course in recommendedCourses" :key="course.id" class="course-card" @click="goToCourseDetail(course.id)">
          <div class="course-item">
            <img :src="course.image" :alt="course.title" class="course-image">
            <div class="course-content">
              <h3>{{ course.title }}</h3>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-meta">
                <span class="coach">{{ course.coach }}</span>
                <span class="level">{{ course.level }}</span>
                <span class="price">{{ course.price }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()

// 从localStorage读取用户信息
const loadUserInfo = () => {
  const savedUserInfo = localStorage.getItem('userInfo')
  if (savedUserInfo) {
    return JSON.parse(savedUserInfo)
  }
  return {
    username: '健身爱好者',
    avatar: ''
  }
}

const userInfo = ref(loadUserInfo())
const username = computed(() => userInfo.value.username)
const userAvatar = computed(() => userInfo.value.avatar)

// 监听localStorage变化，实时更新用户信息
window.addEventListener('storage', () => {
  userInfo.value = loadUserInfo()
})

// 模拟轮播图数据
const banners = ref([
  {
    id: 1,
    title: '2024年最新健身趋势',
    description: '了解今年最流行的健身方式',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20trends%202024%20modern%20gym&image_size=landscape_16_9'
  },
  {
    id: 2,
    title: '科学健身，健康生活',
    description: '专业教练为您定制健身计划',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20fitness%20coach%20training&image_size=landscape_16_9'
  },
  {
    id: 3,
    title: '营养与健身的完美结合',
    description: '合理饮食搭配科学训练',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20nutrition%20fitness%20meal&image_size=landscape_16_9'
  }
])

// 模拟热门资讯数据
const hotNews = ref([
  {
    id: 1,
    title: '如何科学制定健身计划',
    description: '根据个人情况定制适合自己的健身计划，提高训练效果',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20plan%20scientific&image_size=square',
    author: '健身专家',
    time: '2024-01-15',
    views: 1234
  },
  {
    id: 2,
    title: '健身后如何正确恢复',
    description: '有效的恢复方法，让你的训练效果事半功倍',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20recovery%20methods&image_size=square',
    author: '运动康复师',
    time: '2024-01-10',
    views: 987
  },
  {
    id: 3,
    title: '不同年龄段的健身建议',
    description: '根据年龄特点，选择适合的运动方式',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=age%20specific%20fitness%20advice&image_size=square',
    author: '健康顾问',
    time: '2024-01-05',
    views: 756
  }
])

// 模拟推荐课程数据
const recommendedCourses = ref([
  {
    id: 1,
    title: '初级瑜伽入门',
    description: '适合初学者的瑜伽课程，提高柔韧性和平衡感',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20yoga%20class&image_size=square',
    coach: '瑜伽教练',
    level: '初级',
    price: '免费'
  },
  {
    id: 2,
    title: '力量训练基础',
    description: '学习正确的力量训练方法，塑造完美身材',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=strength%20training%20basics&image_size=square',
    coach: '健身教练',
    level: '中级',
    price: '¥99'
  },
  {
    id: 3,
    title: '有氧运动减脂',
    description: '高效有氧运动，帮助你快速减脂',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cardio%20fat%20loss%20workout&image_size=square',
    coach: '减脂专家',
    level: '高级',
    price: '¥199'
  }
])

// 跳转到个人中心
const toProfile = () => {
  router.push('/profile')
}

// 退出登录
const logout = () => {
  router.push('/login')
}

// 跳转到资讯详情
const goToNewsDetail = (id) => {
  router.push(`/news/detail/${id}`)
}

// 跳转到课程详情
const goToCourseDetail = (id) => {
  router.push(`/courses/detail/${id}`)
}

// 轮播图点击跳转
const goToBannerDetail = (id) => {
  // 假设轮播图内容对应资讯
  router.push(`/news/detail/${id}`)
}
</script>

<style scoped>
.home-container {
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

/* 轮播图 */
.banner {
  margin-bottom: 30px;
}

.banner-item {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 20px;
}

.banner-content h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

/* 资讯和课程部分 */
.news-section,
.course-section {
  max-width: 1200px;
  margin: 0 auto 30px;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.more {
  text-decoration: none;
  color: #1890ff;
  font-size: 14px;
}

.news-list,
.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.news-card,
.course-card {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.news-card:hover,
.course-card:hover {
  transform: translateY(-5px);
}

.news-image,
.course-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.news-content h3,
.course-content h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.news-description,
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

.news-meta,
.course-meta {
  font-size: 12px;
  color: #999;
  display: flex;
  gap: 15px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .news-list,
  .course-list {
    grid-template-columns: 1fr;
  }
  
  .banner-image {
    height: 200px;
  }
}
</style>