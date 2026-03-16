<template>
  <div class="news-list-container">
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

    <!-- 搜索和筛选 -->
    <div class="filter-section">
      <div class="filter-content">
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索资讯"
            prefix-icon="el-icon-search"
            @keyup.enter="search"
          >
            <template #append>
              <el-button type="primary" @click="search">搜索</el-button>
            </template>
          </el-input>
        </div>
        <div class="category-filter">
          <el-select v-model="selectedCategory" placeholder="选择分类" @change="filterNews">
            <el-option label="全部" value="all"></el-option>
            <el-option label="健身知识" value="knowledge"></el-option>
            <el-option label="营养健康" value="nutrition"></el-option>
            <el-option label="运动康复" value="recovery"></el-option>
            <el-option label="健身器材" value="equipment"></el-option>
          </el-select>
        </div>
        <div class="tag-filter">
          <el-tag
            v-for="tag in tags"
            :key="tag"
            :type="selectedTags.includes(tag) ? 'primary' : ''"
            @click="toggleTag(tag)"
            class="tag-item"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 资讯列表 -->
    <div class="news-container">
      <div class="news-grid">
        <el-card v-for="news in filteredNews" :key="news.id" class="news-card">
          <img :src="news.image" :alt="news.title" class="news-image">
          <div class="news-content">
            <h3>{{ news.title }}</h3>
            <p class="news-description">{{ news.description }}</p>
            <div class="news-meta">
              <span class="author">{{ news.author }}</span>
              <span class="time">{{ news.time }}</span>
              <span class="views">{{ news.views }} 浏览</span>
            </div>
            <div class="news-tags">
              <el-tag size="small" v-for="tag in news.tags" :key="tag">{{ tag }}</el-tag>
            </div>
            <el-button type="primary" @click="toNewsDetail(news.id)" class="read-btn">阅读全文</el-button>
          </div>
        </el-card>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalNews"
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
const selectedTags = ref([])
const tags = ref(['减肥', '增肌', '瑜伽', '跑步', '力量训练', '营养', '康复'])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 模拟资讯数据
const newsData = ref(
  Array.from({ length: 300 }, (_, index) => ({
    id: index + 1,
    title: `健身资讯 ${index + 1}`,
    description: '这是一条健身相关的资讯，包含了详细的健身知识和建议。',
    image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20news%20${index + 1}&image_size=square`,
    author: `作者 ${(index % 10) + 1}`,
    time: `2024-01-${String((index % 30) + 1).padStart(2, '0')}`,
    views: 1000 + index * 10,
    category: ['knowledge', 'nutrition', 'recovery', 'equipment'][index % 4],
    tags: tags.value.filter((_, tagIndex) => tagIndex % (index % 3 + 1) === 0)
  }))
)

// 计算筛选后的资讯
const filteredNews = computed(() => {
  let result = newsData.value
  
  // 分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(news => news.category === selectedCategory.value)
  }
  
  // 标签筛选
  if (selectedTags.value.length > 0) {
    result = result.filter(news => 
      selectedTags.value.every(tag => news.tags.includes(tag))
    )
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(news => 
      news.title.toLowerCase().includes(query) ||
      news.description.toLowerCase().includes(query)
    )
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return result.slice(start, end)
})

// 总资讯数
const totalNews = computed(() => {
  let result = newsData.value
  
  // 分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(news => news.category === selectedCategory.value)
  }
  
  // 标签筛选
  if (selectedTags.value.length > 0) {
    result = result.filter(news => 
      selectedTags.value.every(tag => news.tags.includes(tag))
    )
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(news => 
      news.title.toLowerCase().includes(query) ||
      news.description.toLowerCase().includes(query)
    )
  }
  
  return result.length
})

// 搜索
const search = () => {
  currentPage.value = 1
}

// 筛选
const filterNews = () => {
  currentPage.value = 1
}

// 切换标签
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
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
.news-list-container {
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

.category-filter {
  min-width: 200px;
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
}

.tag-item {
  cursor: pointer;
  user-select: none;
}

/* 资讯列表 */
.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
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

.news-content h3 {
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
  margin-bottom: 10px;
  display: flex;
  gap: 15px;
}

.news-tags {
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.read-btn {
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
  
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>