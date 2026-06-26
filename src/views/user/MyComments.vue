<template>
  <div class="comments-container">
    <Navbar :menu-links="menuLinks" />
    <!-- 内容区域 -->
    <div class="comments-content">
      <div class="page-header">
        <h2>我的评论</h2>
        <el-tabs v-model="activeTab" @tab-change="handleTabChange">
          <el-tab-pane label="资讯评论" name="news"></el-tab-pane>
          <el-tab-pane label="课程评论" name="courses"></el-tab-pane>
        </el-tabs>
      </div>

      <!-- 资讯评论列表 -->
      <div v-if="activeTab === 'news'" class="comments-list">
        <el-empty v-if="newsComments.length === 0" description="暂无评论"></el-empty>
        <el-card v-for="item in newsComments" :key="item.id" class="comment-card" shadow="hover">
          <div class="comment-item">
            <div class="comment-target" @click="goToNewsDetail(item.targetId)">
              <span class="target-label">评论于：</span>
              <span class="target-title">{{ item.targetTitle }}</span>
              <el-icon class="link-icon"><Link /></el-icon>
            </div>
            <div class="comment-content">
              <p>{{ item.content }}</p>
            </div>
            <div class="comment-meta">
              <span class="time">{{ item.time }}</span>
              <span class="likes">
                <el-icon><Star /></el-icon>
                {{ item.likes }}
              </span>
            </div>
            <div class="comment-actions">
              <el-button type="primary" size="small" @click="editComment(item)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteComment(item)">删除</el-button>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 课程评论列表 -->
      <div v-if="activeTab === 'courses'" class="comments-list">
        <el-empty v-if="courseComments.length === 0" description="暂无评论"></el-empty>
        <el-card v-for="item in courseComments" :key="item.id" class="comment-card" shadow="hover">
          <div class="comment-item">
            <div class="comment-target" @click="goToCourseDetail(item.targetId)">
              <span class="target-label">评论于：</span>
              <span class="target-title">{{ item.targetTitle }}</span>
              <el-icon class="link-icon"><Link /></el-icon>
            </div>
            <div class="comment-content">
              <p>{{ item.content }}</p>
            </div>
            <div class="comment-meta">
              <span class="time">{{ item.time }}</span>
              <span class="likes">
                <el-icon><Star /></el-icon>
                {{ item.likes }}
              </span>
            </div>
            <div class="comment-actions">
              <el-button type="primary" size="small" @click="editComment(item)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteComment(item)">删除</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 编辑评论对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑评论"
      width="500px"
    >
      <el-input
        v-model="editingComment"
        type="textarea"
        :rows="4"
        placeholder="请输入评论内容"
        maxlength="500"
        show-word-limit
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Star, Link } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()
const menuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/fitness', label: '训练&饮食', active: false },
  { to: '/recommendation', label: '发现', active: false }
]

// 用户信息
const loadUserInfo = () => {
  const savedUserInfo = localStorage.getItem('userInfo')
  if (savedUserInfo) {
    return JSON.parse(savedUserInfo)
  }
  return { username: '健身爱好者', avatar: '' }
}

const userInfo = ref(loadUserInfo())
const username = computed(() => userInfo.value.username)
const userAvatar = computed(() => userInfo.value.avatar)

// 当前标签
const activeTab = ref('news')

// 编辑对话框状态
const editDialogVisible = ref(false)
const editingComment = ref('')
const currentEditingItem = ref(null)

// 模拟资讯评论
const newsComments = ref([
  {
    id: 1,
    targetId: 1,
    targetTitle: '如何科学制定健身计划',
    content: '这篇文章写得很好，对我很有帮助！按照这个方法制定了计划，效果显著。',
    time: '2024-01-15 15:30',
    likes: 12
  },
  {
    id: 2,
    targetId: 2,
    targetTitle: '健身后如何正确恢复',
    content: '恢复真的很重要，之前就是不重视恢复导致训练效果不好。',
    time: '2024-01-14 10:20',
    likes: 8
  }
])

// 模拟课程评论
const courseComments = ref([
  {
    id: 1,
    targetId: 1,
    targetTitle: '初级瑜伽入门',
    content: '课程很棒，老师讲解得很详细，跟着练习有进步！',
    time: '2024-01-13 18:45',
    likes: 15
  },
  {
    id: 2,
    targetId: 2,
    targetTitle: '力量训练基础',
    content: '动作讲解清晰，训练计划合理，适合初学者。',
    time: '2024-01-12 12:30',
    likes: 10
  }
])

// 标签切换
const handleTabChange = (tab) => {
  console.log('切换到标签:', tab)
}

// 编辑评论
const editComment = (item) => {
  currentEditingItem.value = item
  editingComment.value = item.content
  editDialogVisible.value = true
}

// 保存编辑
const saveEdit = () => {
  if (!editingComment.value.trim()) {
    ElMessage.warning('评论内容不能为空')
    return
  }
  if (currentEditingItem.value) {
    currentEditingItem.value.content = editingComment.value
    ElMessage.success('评论已更新')
  }
  editDialogVisible.value = false
}

// 删除评论
const deleteComment = (item) => {
  ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (activeTab.value === 'news') {
      const index = newsComments.value.findIndex(c => c.id === item.id)
      if (index > -1) {
        newsComments.value.splice(index, 1)
      }
    } else {
      const index = courseComments.value.findIndex(c => c.id === item.id)
      if (index > -1) {
        courseComments.value.splice(index, 1)
      }
    }
    ElMessage.success('评论已删除')
  }).catch(() => {})
}

// 导航函数
const goToProfile = () => router.push('/profile')
const goToNewsDetail = (id) => router.push(`/news/detail/${id}`)
const goToCourseDetail = (id) => router.push(`/courses/detail/${id}`)
const logout = () => router.push('/login')
</script>

<style scoped>
.comments-container {
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

/* 通知消息 */
.notification-btn {
  position: relative;
  margin-right: 10px;
}

.unread-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.notification-item {
  padding: 10px 20px;
}

.notification-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-title {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

/* 页面内容 */
.comments-content {
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
  margin: 0 0 15px 0;
  font-size: 24px;
  color: #333;
}

/* 评论列表 */
.comments-list {
  display: grid;
  gap: 20px;
}

.comment-item {
  display: flex;
  flex-direction: column;
}

.comment-target {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.comment-target:hover .target-title {
  color: #1890ff;
}

.target-label {
  color: #999;
  font-size: 14px;
}

.target-title {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  margin: 0 5px;
}

.link-icon {
  color: #999;
  font-size: 14px;
}

.comment-content {
  margin-bottom: 15px;
}

.comment-content p {
  margin: 0;
  color: #333;
  line-height: 1.6;
}

.comment-meta {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 14px;
  margin-bottom: 15px;
}

.likes {
  display: flex;
  align-items: center;
  gap: 5px;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>