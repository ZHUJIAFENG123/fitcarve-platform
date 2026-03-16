<template>
  <div class="manage-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/creator/publish">资讯发布</a>
          <a href="/creator/manage" class="active">内容管理</a>
          <a href="/creator/fans">粉丝互动</a>
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

    <!-- 内容管理 -->
    <div class="manage-content">
      <el-tabs>
        <el-tab-pane label="已发布">
          <div class="news-list">
            <el-table :data="publishedNews" style="width: 100%">
              <el-table-column prop="id" label="资讯ID" width="80"></el-table-column>
              <el-table-column prop="title" label="资讯标题"></el-table-column>
              <el-table-column prop="category" label="分类" width="120"></el-table-column>
              <el-table-column prop="time" label="发布时间" width="180"></el-table-column>
              <el-table-column prop="views" label="浏览量" width="100"></el-table-column>
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="editNews(scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteNews(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="待审核">
          <div class="news-list">
            <el-table :data="pendingNews" style="width: 100%">
              <el-table-column prop="id" label="资讯ID" width="80"></el-table-column>
              <el-table-column prop="title" label="资讯标题"></el-table-column>
              <el-table-column prop="category" label="分类" width="120"></el-table-column>
              <el-table-column prop="time" label="提交时间" width="180"></el-table-column>
              <el-table-column label="操作" width="100">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="viewNews(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已驳回">
          <div class="news-list">
            <el-table :data="rejectedNews" style="width: 100%">
              <el-table-column prop="id" label="资讯ID" width="80"></el-table-column>
              <el-table-column prop="title" label="资讯标题"></el-table-column>
              <el-table-column prop="category" label="分类" width="120"></el-table-column>
              <el-table-column prop="time" label="提交时间" width="180"></el-table-column>
              <el-table-column prop="reason" label="驳回原因"></el-table-column>
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button type="primary" size="small" @click="editNews(scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteNews(scope.row.id)">删除</el-button>
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
const username = ref('内容创作者')
const userAvatar = ref('')

// 模拟已发布资讯数据
const publishedNews = ref([
  {
    id: 1,
    title: '如何科学制定健身计划',
    category: '健身知识',
    time: '2024-01-15 10:00',
    views: 1234
  },
  {
    id: 2,
    title: '健身后如何正确恢复',
    category: '运动康复',
    time: '2024-01-10 14:30',
    views: 987
  },
  {
    id: 3,
    title: '不同年龄段的健身建议',
    category: '健身知识',
    time: '2024-01-05 09:00',
    views: 756
  }
])

// 模拟待审核资讯数据
const pendingNews = ref([
  {
    id: 4,
    title: '健身营养补充指南',
    category: '营养健康',
    time: '2024-01-16 16:00'
  },
  {
    id: 5,
    title: '家庭健身器材推荐',
    category: '健身器材',
    time: '2024-01-16 15:30'
  }
])

// 模拟已驳回资讯数据
const rejectedNews = ref([
  {
    id: 6,
    title: '快速减肥方法',
    category: '健身知识',
    time: '2024-01-14 11:00',
    reason: '内容夸大其词，缺乏科学依据'
  }
])

// 编辑资讯
const editNews = (news) => {
  console.log('编辑资讯:', news)
  // 实际项目中可以跳转到编辑页面
  alert(`编辑资讯: ${news.title}`)
}

// 删除资讯
const deleteNews = (id) => {
  console.log('删除资讯:', id)
  // 实际项目中需要调用后端API
  alert(`删除资讯ID: ${id}`)
}

// 查看资讯
const viewNews = (news) => {
  console.log('查看资讯:', news)
  // 实际项目中可以跳转到资讯详情页
  alert(`查看资讯: ${news.title}`)
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
.manage-container {
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

/* 管理内容 */
.manage-content {
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