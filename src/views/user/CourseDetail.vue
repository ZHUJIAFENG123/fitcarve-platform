<template>
  <div class="course-detail-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/home">首页</a>
          <a href="/news/list">资讯</a>
          <a href="/courses/list" class="active">课程</a>
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

    <!-- 课程详情 -->
    <div v-if="Object.keys(course).length > 0" class="course-detail">
      <div class="course-header">
        <div class="course-info">
          <h1>{{ course.title }}</h1>
          <div class="course-meta">
            <span class="coach">{{ course.coach }}</span>
            <span class="level">{{ course.level }}</span>
            <span class="price">{{ course.price }}</span>
          </div>
          <div class="course-description">
            <p>{{ course.description }}</p>
          </div>
          <div class="course-stats">
            <div class="stat-item">
              <el-icon><View /></el-icon>
              <span>{{ course.views }} 浏览</span>
            </div>
            <div class="stat-item">
              <el-icon><Star /></el-icon>
              <span>{{ course.rating }} 评分</span>
            </div>
            <div class="stat-item">
              <el-icon><User /></el-icon>
              <span>{{ course.enrolled }} 人已报名</span>
            </div>
          </div>
        </div>
        <div class="course-image">
          <img :src="course.image" :alt="course.title">
        </div>
      </div>

      <!-- 学习进度 -->
      <div class="progress-section">
        <h3>学习进度</h3>
        <el-progress :percentage="courseProgress" :format="() => `${courseProgress}%`" status="success"></el-progress>
        <div class="progress-text">
          <span>已完成 {{ completedLessons }} / {{ totalLessons }} 课时</span>
        </div>
      </div>

      <!-- 课程大纲 -->
      <div class="syllabus-section">
        <h3>课程大纲</h3>
        <div class="syllabus-list">
          <div 
            v-for="(lesson, index) in course.syllabus" 
            :key="index"
            class="lesson-item"
            :class="{ 'completed': lesson.completed }"
            @click="toggleLesson(index)"
          >
            <div class="lesson-header">
              <div class="lesson-info">
                <el-checkbox v-model="lesson.completed" @change="updateProgress"></el-checkbox>
                <span class="lesson-title">{{ lesson.title }}</span>
              </div>
              <div class="lesson-duration">{{ lesson.duration }}</div>
            </div>
            <div class="lesson-content" v-if="expandedLesson === index">
              <p>{{ lesson.description }}</p>
              <el-button type="primary" size="small">开始学习</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 教练信息 -->
      <div class="coach-section">
        <h3>教练信息</h3>
        <div class="coach-info">
          <el-avatar size="80">{{ course.coach.charAt(0) }}</el-avatar>
          <div class="coach-details">
            <h4>{{ course.coach }}</h4>
            <p>{{ coachInfo.description }}</p>
            <div class="coach-stats">
              <span>{{ coachInfo.courses }} 门课程</span>
              <span>{{ coachInfo.students }} 名学生</span>
              <span>{{ coachInfo.years }} 年经验</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comment-section">
        <h3>学员评价</h3>
        <div class="comments">
          <div class="comment-item" v-for="comment in comments" :key="comment.id">
            <div class="comment-avatar">
              <el-avatar>{{ comment.user.charAt(0) }}</el-avatar>
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-user">{{ comment.user }}</span>
                <span class="comment-time">{{ comment.time }}</span>
                <div class="comment-rating">
                  <el-rate v-model="comment.rating" disabled :max="5"></el-rate>
                </div>
              </div>
              <div class="comment-body">{{ comment.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowDown, View, Star, User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 模拟用户信息
const username = ref('健身爱好者')
const userAvatar = ref('')

// 课程数据
const courses = ref({
  '1': {
    id: 1,
    title: '初级瑜伽入门',
    description: '适合初学者的瑜伽课程，提高柔韧性和平衡感，由资深瑜伽教练授课。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20yoga%20class&image_size=landscape_16_9',
    coach: '瑜伽教练',
    level: '初级',
    price: '免费',
    views: 1234,
    rating: 4.8,
    enrolled: 567,
    syllabus: [
      {
        title: '瑜伽基础介绍',
        description: '了解瑜伽的基本概念和呼吸方法',
        duration: '30分钟',
        completed: true
      },
      {
        title: '基础体式练习',
        description: '学习常见的瑜伽基础体式',
        duration: '45分钟',
        completed: true
      },
      {
        title: '平衡训练',
        description: '提高平衡能力的瑜伽练习',
        duration: '40分钟',
        completed: false
      },
      {
        title: '柔韧性训练',
        description: '增强身体柔韧性的拉伸练习',
        duration: '35分钟',
        completed: false
      },
      {
        title: '瑜伽放松与冥想',
        description: '学习瑜伽放松和冥想技巧',
        duration: '25分钟',
        completed: false
      }
    ]
  },
  '2': {
    id: 2,
    title: '力量训练基础',
    description: '学习正确的力量训练方法，塑造完美身材，由专业健身教练授课。本课程适合初学者和中级训练者，通过系统化的训练计划，帮助你建立基础力量和正确的动作模式。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=strength%20training%20basics%20gym%20workout&image_size=landscape_16_9',
    coach: '健身教练',
    level: '中级',
    price: '¥99',
    views: 2345,
    rating: 4.9,
    enrolled: 890,
    syllabus: [
      {
        title: '力量训练基础知识',
        description: '了解力量训练的基本原理、安全注意事项和训练计划制定方法',
        duration: '40分钟',
        completed: true
      },
      {
        title: '上肢力量训练',
        description: '学习胸部、肩部、手臂的基础力量训练动作，包括卧推、哑铃飞鸟、俯卧撑等',
        duration: '60分钟',
        completed: true
      },
      {
        title: '下肢力量训练',
        description: '学习腿部和臀部的基础力量训练动作，包括深蹲、硬拉、腿举等',
        duration: '60分钟',
        completed: false
      },
      {
        title: '核心力量训练',
        description: '学习核心肌群的训练方法，包括平板支撑、仰卧起坐、俄罗斯转体等',
        duration: '45分钟',
        completed: false
      },
      {
        title: '训练计划设计',
        description: '学习如何根据个人目标设计合理的力量训练计划',
        duration: '30分钟',
        completed: false
      },
      {
        title: '营养与恢复',
        description: '了解力量训练的营养需求和恢复方法',
        duration: '35分钟',
        completed: false
      }
    ]
  },
  '3': {
    id: 3,
    title: '有氧运动减脂',
    description: '高效有氧运动，帮助你快速减脂，由减脂专家授课。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cardio%20fat%20loss%20workout&image_size=landscape_16_9',
    coach: '减脂专家',
    level: '高级',
    price: '¥199',
    views: 1890,
    rating: 4.7,
    enrolled: 678,
    syllabus: [
      {
        title: '有氧运动基础',
        description: '了解有氧运动的基本原理和减脂机制',
        duration: '30分钟',
        completed: true
      },
      {
        title: 'HIIT训练',
        description: '高强度间歇训练，提高燃脂效率',
        duration: '45分钟',
        completed: false
      },
      {
        title: '稳态有氧训练',
        description: '中低强度持续训练，提高心肺功能',
        duration: '60分钟',
        completed: false
      },
      {
        title: '有氧与力量结合',
        description: '如何将有氧运动与力量训练结合，最大化减脂效果',
        duration: '40分钟',
        completed: false
      }
    ]
  }
})

// 当前课程
const course = ref({})

// 教练信息
const coachInfo = ref({})

// 根据课程ID加载课程信息
const loadCourseInfo = (id) => {
  const courseData = courses.value[id]
  if (courseData) {
    course.value = courseData
    // 根据课程设置教练信息
    if (courseData.coach === '健身教练') {
      coachInfo.value = {
        description: '专业健身教练，拥有8年教学经验，专注于力量训练和体态调整。',
        courses: 8,
        students: 2000,
        years: 8
      }
    } else if (courseData.coach === '瑜伽教练') {
      coachInfo.value = {
        description: '资深瑜伽教练，拥有10年教学经验，专注于初学者瑜伽教学。',
        courses: 12,
        students: 1200,
        years: 10
      }
    } else if (courseData.coach === '减脂专家') {
      coachInfo.value = {
        description: '专业减脂教练，拥有6年教学经验，帮助超过1000名学员成功减脂。',
        courses: 6,
        students: 1500,
        years: 6
      }
    }
  }
}



// 学习进度
const expandedLesson = ref(-1)

// 计算已完成课时
const completedLessons = computed(() => {
  return course.value.syllabus ? course.value.syllabus.filter(lesson => lesson.completed).length : 0
})

// 总课时
const totalLessons = computed(() => {
  return course.value.syllabus ? course.value.syllabus.length : 0
})

// 学习进度百分比
const courseProgress = computed(() => {
  if (totalLessons.value === 0) return 0
  return Math.round((completedLessons.value / totalLessons.value) * 100)
})

// 模拟评论数据
const comments = ref([
  {
    id: 1,
    user: '用户1',
    time: '2024-01-16',
    content: '课程非常好，教练讲解详细，适合初学者。',
    rating: 5
  },
  {
    id: 2,
    user: '用户2',
    time: '2024-01-17',
    content: '跟着练习了几节课，感觉身体明显变得更灵活了。',
    rating: 4
  }
])

// 生命周期
onMounted(() => {
  // 获取路由参数中的课程ID
  const id = route.params.id || '1'
  console.log('课程ID:', id)
  // 加载课程信息
  loadCourseInfo(id)
})

// 切换课时展开/收起
const toggleLesson = (index) => {
  expandedLesson.value = expandedLesson.value === index ? -1 : index
}

// 更新学习进度
const updateProgress = () => {
  // 实际项目中需要将进度保存到后端
  console.log('学习进度更新:', courseProgress.value)
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
.course-detail-container {
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

/* 课程详情 */
.course-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.course-header {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.course-info {
  flex: 1;
}

.course-info h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.course-meta {
  font-size: 14px;
  color: #999;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.course-description {
  margin-bottom: 20px;
}

.course-description p {
  line-height: 1.6;
  color: #666;
}

.course-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.course-image {
  width: 400px;
  flex-shrink: 0;
}

.course-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

/* 学习进度 */
.progress-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.progress-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.progress-text {
  margin-top: 10px;
  text-align: right;
  color: #666;
}

/* 课程大纲 */
.syllabus-section {
  margin-bottom: 30px;
}

.syllabus-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.lesson-item {
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.lesson-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.lesson-item.completed {
  border-color: #67c23a;
  background-color: #f0f9eb;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lesson-title {
  font-weight: bold;
  color: #333;
}

.lesson-duration {
  color: #999;
  font-size: 14px;
}

.lesson-content {
  padding: 15px;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
}

.lesson-content p {
  margin-bottom: 15px;
  color: #666;
}

/* 教练信息 */
.coach-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.coach-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.coach-info {
  display: flex;
  gap: 20px;
}

.coach-details h4 {
  margin-bottom: 10px;
  color: #333;
}

.coach-details p {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.6;
}

.coach-stats {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 14px;
}

/* 评论区 */
.comment-section {
  margin-bottom: 30px;
}

.comment-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comment-avatar {
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.comment-user {
  font-weight: bold;
  color: #333;
}

.comment-time {
  color: #999;
  font-size: 14px;
}

.comment-body {
  color: #666;
  line-height: 1.6;
}

/* 加载状态 */
.loading-container {
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
  
  .course-header {
    flex-direction: column;
  }
  
  .course-image {
    width: 100%;
  }
  
  .course-stats {
    flex-wrap: wrap;
  }
  
  .coach-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .loading-container {
    margin: 20px 10px;
  }
}
</style>