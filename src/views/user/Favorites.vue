<template>
  <div class="favorites-container">
    <Navbar :menu-links="menuLinks" />
    <div class="favorites-content">
      <div class="page-header">
        <h2>我的收藏</h2>
        <el-tabs v-model="activeTab">
          <el-tab-pane label="资讯" name="news"></el-tab-pane>
          <el-tab-pane label="课程" name="courses"></el-tab-pane>
        </el-tabs>
      </div>

      <div v-if="activeTab === 'news'" class="news-list">
        <el-empty v-if="favoriteNews.length === 0" description="暂无收藏的资讯" />
        <el-card v-for="item in favoriteNews" :key="item.id" class="favorite-card" shadow="hover">
          <div class="favorite-item">
            <img :src="item.image" :alt="item.title" class="favorite-image" />
            <div class="favorite-info">
              <h3 @click="goToNewsDetail(item.id)">{{ item.title }}</h3>
              <p class="favorite-desc">{{ item.summary || item.description }}</p>
              <div class="favorite-meta">
                <span class="meta-author">{{ item.author }}</span>
                <span class="meta-views">{{ item.views }} 浏览</span>
              </div>
            </div>
            <div class="favorite-actions">
              <el-button type="danger" size="small" @click="removeFromFavorites(item.id)">
                <el-icon><Remove /></el-icon>
                取消收藏
              </el-button>
            </div>
          </div>
        </el-card>
      </div>

      <div v-if="activeTab === 'courses'" class="courses-list">
        <el-empty v-if="favoriteCourses.length === 0" description="暂无收藏的课程" />
        <el-card v-for="item in favoriteCourses" :key="item.id" class="favorite-card" shadow="hover">
          <div class="favorite-item">
            <img :src="item.image" :alt="item.title" class="favorite-image" />
            <div class="favorite-info">
              <h3 @click="goToCourseDetail(item.id)">{{ item.title }}</h3>
              <p class="favorite-desc">{{ item.description }}</p>
              <div class="favorite-meta">
                <span class="meta-coach">{{ item.coach }}</span>
                <span class="meta-level">{{ item.level }}</span>
                <span class="meta-price">{{ item.price }}</span>
              </div>
            </div>
            <div class="favorite-actions">
              <el-button type="danger" size="small" @click="removeCourseFavorite(item.id)">
                <el-icon><Remove /></el-icon>
                取消收藏
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Remove } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import { useNewsStore } from '@/stores/news'

const router = useRouter()
const store = useNewsStore()

const menuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/fitness', label: '训练&饮食', active: false },
  { to: '/recommendation', label: '发现', active: false }
]

const activeTab = ref('news')

const favoriteNews = ref([
  { id: 1, title: '如何科学制定健身计划', summary: '根据个人情况定制适合自己的健身计划', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20plan%20scientific&image_size=square', author: '健身专家', views: 1234 },
  { id: 2, title: '健身后如何正确恢复', summary: '有效的恢复方法，让你的训练效果事半功倍', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20recovery%20methods&image_size=square', author: '运动康复师', views: 987 },
  { id: 3, title: '不同年龄段的健身建议', summary: '根据年龄特点，选择适合的运动方式', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=age%20specific%20fitness%20advice&image_size=square', author: '健康顾问', views: 756 }
])

const favoriteCourses = ref([
  { id: 1, title: '初级瑜伽入门', description: '适合初学者的瑜伽课程', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beginner%20yoga%20class&image_size=square', coach: '瑜伽教练', level: '初级', price: '免费' },
  { id: 2, title: '力量训练基础', description: '学习正确的力量训练方法', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=strength%20training%20basics&image_size=square', coach: '健身教练', level: '中级', price: '¥99' }
])

function removeFromFavorites(id) {
  ElMessageBox.confirm('确定要取消收藏吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.toggleFavorite(id)
    const index = favoriteNews.value.findIndex(item => item.id === id)
    if (index > -1) favoriteNews.value.splice(index, 1)
    ElMessage.success('已取消收藏')
  }).catch(() => {})
}

function removeCourseFavorite(id) {
  ElMessageBox.confirm('确定要取消收藏吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = favoriteCourses.value.findIndex(item => item.id === id)
    if (index > -1) favoriteCourses.value.splice(index, 1)
    ElMessage.success('已取消收藏')
  }).catch(() => {})
}

const goToNewsDetail = (id) => router.push(`/news/detail/${id}`)
const goToCourseDetail = (id) => router.push(`/courses/detail/${id}`)
</script>

<style scoped>
.favorites-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.favorites-content {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
}

.page-header {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0 0 15px;
  font-size: 24px;
  color: #333;
}

.news-list, .courses-list {
  display: grid;
  gap: 20px;
}

.favorite-card {
  cursor: pointer;
}

.favorite-item {
  display: flex;
  gap: 20px;
}

.favorite-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.favorite-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.favorite-info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
  cursor: pointer;
}

.favorite-info h3:hover {
  color: #1890ff;
}

.favorite-desc {
  color: #666;
  margin: 10px 0;
}

.favorite-meta {
  display: flex;
  gap: 15px;
  color: #999;
  font-size: 14px;
}

.favorite-actions {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .favorite-item {
    flex-direction: column;
  }

  .favorite-image {
    width: 100%;
    height: 200px;
  }
}
</style>
