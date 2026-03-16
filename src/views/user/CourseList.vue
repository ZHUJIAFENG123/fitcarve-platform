<template>
  <div class="course-list-container">
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

    <!-- 搜索和筛选 -->
    <div class="filter-section">
      <div class="filter-content">
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索课程"
            prefix-icon="el-icon-search"
            @keyup.enter="search"
          >
            <template #append>
              <el-button type="primary" @click="search">搜索</el-button>
            </template>
          </el-input>
        </div>
        <div class="category-filter">
          <el-select v-model="selectedCategory" placeholder="选择分类" @change="filterCourses">
            <el-option label="全部" value="all"></el-option>
            <el-option label="瑜伽" value="yoga"></el-option>
            <el-option label="力量训练" value="strength"></el-option>
            <el-option label="有氧运动" value="cardio"></el-option>
            <el-option label="普拉提" value="pilates"></el-option>
          </el-select>
        </div>
        <div class="level-filter">
          <el-select v-model="selectedLevel" placeholder="选择难度" @change="filterCourses">
            <el-option label="全部" value="all"></el-option>
            <el-option label="初级" value="beginner"></el-option>
            <el-option label="中级" value="intermediate"></el-option>
            <el-option label="高级" value="advanced"></el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- 课程列表 -->
    <div class="course-container">
      <div class="course-grid">
        <el-card v-for="course in filteredCourses" :key="course.id" class="course-card">
          <img :src="course.image" :alt="course.title" class="course-image">
          <div class="course-content">
            <h3>{{ course.title }}</h3>
            <p class="course-description">{{ course.description }}</p>
            <div class="course-meta">
              <span class="coach">{{ course.coach }}</span>
              <span class="level">{{ course.level }}</span>
              <span class="price">{{ course.price }}</span>
            </div>
            <div class="course-progress" v-if="course.progress > 0">
              <el-progress :percentage="course.progress" :format="() => `${course.progress}%`"></el-progress>
            </div>
            <el-button type="primary" @click="toCourseDetail(course.id)" class="enroll-btn">
              {{ course.progress > 0 ? '继续学习' : '查看详情' }}
            </el-button>
          </div>
        </el-card>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalCourses"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
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

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedLevel = ref('all')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 模拟课程数据
const coursesData = ref([
  {
    id: 1,
    title: '初级瑜伽入门',
    description: '适合初学者的瑜伽课程，提高柔韧性和平衡感，由资深瑜伽教练授课。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20yoga%20class&image_size=square',
    coach: '瑜伽教练',
    level: '初级',
    price: '免费',
    category: 'yoga',
    progress: 66 // 模拟学习进度
  },
  {
    id: 2,
    title: '力量训练基础',
    description: '学习正确的力量训练方法，塑造完美身材，由专业健身教练授课。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=strength%20training%20basics&image_size=square',
    coach: '健身教练',
    level: '中级',
    price: '¥99',
    category: 'strength',
    progress: 33 // 模拟学习进度
  },
  {
    id: 3,
    title: '有氧运动减脂',
    description: '高效有氧运动，帮助你快速减脂，由减脂专家授课。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cardio%20fat%20loss%20workout&image_size=square',
    coach: '减脂专家',
    level: '高级',
    price: '¥199',
    category: 'cardio',
    progress: 0 // 模拟学习进度
  },
  ...Array.from({ length: 47 }, (_, index) => ({
    id: index + 4,
    title: `健身课程 ${index + 4}`,
    description: '这是一门专业的健身课程，由资深教练授课。',
    image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20course%20${index + 4}&image_size=square`,
    coach: `教练 ${(index % 5) + 1}`,
    level: ['初级', '中级', '高级'][index % 3],
    price: index % 2 === 0 ? '免费' : `¥${(index % 5) * 50 + 50}`,
    category: ['yoga', 'strength', 'cardio', 'pilates'][index % 4],
    progress: index % 3 * 33 // 模拟学习进度
  }))
])

// 计算筛选后的课程
const filteredCourses = computed(() => {
  let result = coursesData.value
  
  // 分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(course => course.category === selectedCategory.value)
  }
  
  // 难度筛选
  if (selectedLevel.value !== 'all') {
    const levelMap = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    }
    result = result.filter(course => course.level === levelMap[selectedLevel.value])
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.coach.toLowerCase().includes(query)
    )
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return result.slice(start, end)
})

// 总课程数
const totalCourses = computed(() => {
  let result = coursesData.value
  
  // 分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(course => course.category === selectedCategory.value)
  }
  
  // 难度筛选
  if (selectedLevel.value !== 'all') {
    const levelMap = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    }
    result = result.filter(course => course.level === levelMap[selectedLevel.value])
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.coach.toLowerCase().includes(query)
    )
  }
  
  return result.length
})

// 搜索
const search = () => {
  currentPage.value = 1
}

// 筛选
const filterCourses = () => {
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (current) => {
  currentPage.value = current
}

// 跳转到课程详情
const toCourseDetail = (id) => {
  router.push(`/courses/detail/${id}`)
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
.course-list-container {
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

/* 筛选部分 */
.filter-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 300px;
}

.category-filter,
.level-filter {
  min-width: 200px;
}

/* 课程列表 */
.course-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
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

.course-content h3 {
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
  margin-bottom: 10px;
  display: flex;
  gap: 15px;
}

.course-progress {
  margin-bottom: 15px;
}

.enroll-btn {
  width: 100%;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .filter-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .course-grid {
    grid-template-columns: 1fr;
  }
}
</style>