<template>
  <div class="publish-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/creator/publish" class="active">资讯发布</a>
          <a href="/creator/manage">内容管理</a>
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

    <!-- 资讯发布表单 -->
    <div class="publish-content">
      <h2>发布资讯</h2>
      <el-form :model="newsForm" :rules="newsRules" ref="newsForm">
        <el-form-item label="资讯标题" prop="title">
          <el-input v-model="newsForm.title" placeholder="请输入资讯标题"></el-input>
        </el-form-item>
        <el-form-item label="资讯分类" prop="category">
          <el-select v-model="newsForm.category" placeholder="请选择资讯分类">
            <el-option label="健身知识" value="knowledge"></el-option>
            <el-option label="营养健康" value="nutrition"></el-option>
            <el-option label="运动康复" value="recovery"></el-option>
            <el-option label="健身器材" value="equipment"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯标签" prop="tags">
          <el-select
            v-model="newsForm.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <el-option label="减肥" value="减肥"></el-option>
            <el-option label="增肌" value="增肌"></el-option>
            <el-option label="瑜伽" value="瑜伽"></el-option>
            <el-option label="跑步" value="跑步"></el-option>
            <el-option label="力量训练" value="力量训练"></el-option>
            <el-option label="营养" value="营养"></el-option>
            <el-option label="康复" value="康复"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="handleImageUpload"
          >
            <img v-if="newsForm.image" :src="newsForm.image" class="avatar">
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="资讯内容" prop="content">
          <RichTextEditor v-model="newsForm.content" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">发布资讯</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown, Plus } from '@element-plus/icons-vue'
import RichTextEditor from '../../components/RichTextEditor.vue'

const router = useRouter()

// 模拟用户信息
const username = ref('内容创作者')
const userAvatar = ref('')

// 资讯表单
const newsForm = ref({
  title: '',
  category: '',
  tags: [],
  image: '',
  content: ''
})

// 表单验证规则
const newsRules = {
  title: [{ required: true, message: '请输入资讯标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择资讯分类', trigger: 'change' }],
  tags: [{ required: true, message: '请选择标签', trigger: 'change' }],
  image: [{ required: true, message: '请上传资讯图片', trigger: 'change' }],
  content: [{ required: true, message: '请输入资讯内容', trigger: 'blur' }]
}

// 表单引用
const newsFormRef = ref(null)

// 处理图片上传
const handleImageUpload = (file) => {
  // 实际项目中需要上传到服务器
  // 这里使用模拟图片
  newsForm.value.image = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20news%20${file.name}&image_size=landscape_16_9`
}

// 提交表单
const submitForm = () => {
  // 模拟提交，实际项目中需要调用后端API
  console.log('资讯信息:', newsForm.value)
  alert('资讯发布成功！')
  resetForm()
}

// 重置表单
const resetForm = () => {
  newsForm.value = {
    title: '',
    category: '',
    tags: [],
    image: '',
    content: ''
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
.publish-container {
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

/* 发布内容 */
.publish-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.publish-content h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

/* 图片上传 */
.avatar-uploader {
  width: 400px;
  height: 200px;
}

.avatar {
  width: 400px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.avatar-uploader-icon {
  width: 400px;
  height: 200px;
  line-height: 200px;
  font-size: 48px;
  color: #999;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .avatar-uploader,
  .avatar,
  .avatar-uploader-icon {
    width: 100%;
    height: 150px;
  }
}
</style>