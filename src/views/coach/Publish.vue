<template>
  <div class="publish-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站</h1>
        </div>
        <nav class="nav-menu">
          <a href="/coach/publish" class="active">内容发布</a>
          <a href="/coach/interaction">用户互动</a>
          <a href="/coach/statistics">数据统计</a>
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

    <!-- 内容发布表单 -->
    <div class="publish-content">
      <h2>发布课程</h2>
      <el-form :model="courseForm" :rules="courseRules" ref="courseForm">
        <el-form-item label="课程标题" prop="title">
          <el-input v-model="courseForm.title" placeholder="请输入课程标题"></el-input>
        </el-form-item>
        <el-form-item label="课程分类" prop="category">
          <el-select v-model="courseForm.category" placeholder="请选择课程分类">
            <el-option label="瑜伽" value="yoga"></el-option>
            <el-option label="力量训练" value="strength"></el-option>
            <el-option label="有氧运动" value="cardio"></el-option>
            <el-option label="普拉提" value="pilates"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程难度" prop="level">
          <el-select v-model="courseForm.level" placeholder="请选择课程难度">
            <el-option label="初级" value="beginner"></el-option>
            <el-option label="中级" value="intermediate"></el-option>
            <el-option label="高级" value="advanced"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程价格" prop="price">
          <el-input v-model="courseForm.price" placeholder="请输入课程价格"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <RichTextEditor v-model="courseForm.description" />
        </el-form-item>
        <el-form-item label="课程图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="handleImageUpload"
          >
            <img v-if="courseForm.image" :src="courseForm.image" class="avatar">
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程大纲" prop="syllabus">
          <div v-for="(lesson, index) in courseForm.syllabus" :key="index" class="lesson-item">
            <el-input
              v-model="lesson.title"
              placeholder="课时标题"
              class="lesson-title"
            ></el-input>
            <el-input
              v-model="lesson.description"
              placeholder="课时描述"
              class="lesson-description"
            ></el-input>
            <el-input
              v-model="lesson.duration"
              placeholder="课时时长"
              class="lesson-duration"
            ></el-input>
            <el-button type="danger" @click="removeLesson(index)">删除</el-button>
          </div>
          <el-button type="primary" @click="addLesson">添加课时</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">发布课程</el-button>
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
const username = ref('教练')
const userAvatar = ref('')

// 课程表单
const courseForm = ref({
  title: '',
  category: '',
  level: '',
  price: '',
  description: '',
  image: '',
  syllabus: [
    {
      title: '',
      description: '',
      duration: ''
    }
  ]
})

// 表单验证规则
const courseRules = {
  title: [{ required: true, message: '请输入课程标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择课程分类', trigger: 'change' }],
  level: [{ required: true, message: '请选择课程难度', trigger: 'change' }],
  price: [{ required: true, message: '请输入课程价格', trigger: 'blur' }],
  description: [{ required: true, message: '请输入课程描述', trigger: 'blur' }],
  image: [{ required: true, message: '请上传课程图片', trigger: 'change' }]
}

// 表单引用
const courseFormRef = ref(null)

// 处理图片上传
const handleImageUpload = (file) => {
  // 实际项目中需要上传到服务器
  // 这里使用模拟图片
  courseForm.value.image = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20course%20${file.name}&image_size=square`
}

// 添加课时
const addLesson = () => {
  courseForm.value.syllabus.push({
    title: '',
    description: '',
    duration: ''
  })
}

// 删除课时
const removeLesson = (index) => {
  if (courseForm.value.syllabus.length > 1) {
    courseForm.value.syllabus.splice(index, 1)
  }
}

// 提交表单
const submitForm = () => {
  // 模拟提交，实际项目中需要调用后端API
  console.log('课程信息:', courseForm.value)
  alert('课程发布成功！')
  resetForm()
}

// 重置表单
const resetForm = () => {
  courseForm.value = {
    title: '',
    category: '',
    level: '',
    price: '',
    description: '',
    image: '',
    syllabus: [
      {
        title: '',
        description: '',
        duration: ''
      }
    ]
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

/* 课时项 */
.lesson-item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: flex-end;
}

.lesson-title {
  flex: 1;
}

.lesson-description {
  flex: 2;
}

.lesson-duration {
  width: 120px;
}

/* 图片上传 */
.avatar-uploader {
  width: 200px;
  height: 200px;
}

.avatar {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.avatar-uploader-icon {
  width: 200px;
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
  
  .lesson-item {
    flex-direction: column;
    align-items: stretch;
  }
  
  .lesson-title,
  .lesson-description,
  .lesson-duration {
    width: 100%;
  }
}
</style>