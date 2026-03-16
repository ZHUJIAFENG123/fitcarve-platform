<template>
  <div class="profile-container">
    <div class="profile-header">
      <h2>个人中心</h2>
    </div>
    <div class="profile-content">
      <div class="profile-info">
        <div class="avatar">
          <el-avatar size="100" :src="userInfo.avatar">{{ userInfo.username.charAt(0) }}</el-avatar>
        </div>
        <div class="info">
          <h3>{{ userInfo.username }}</h3>
          <p v-if="userInfo.signature" class="signature">{{ userInfo.signature }}</p>
          <p>角色：{{ userInfo.role === 'user' ? '健身爱好者' : userInfo.role === 'coach' ? '教练' : '内容创作者' }}</p>
          <p>注册时间：{{ userInfo.registerTime }}</p>
        </div>
      </div>
      <div class="profile-actions">
        <el-button type="primary" @click="openEditDialog">编辑资料</el-button>
        <el-button>修改密码</el-button>
        <el-button type="danger">退出登录</el-button>
      </div>
      <div class="profile-stats">
        <div class="stat-item">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>我的收藏</span>
              </div>
            </template>
            <div class="stat-value">{{ userStats.favorites }}</div>
          </el-card>
        </div>
        <div class="stat-item">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>我的课程</span>
              </div>
            </template>
            <div class="stat-value">{{ userStats.courses }}</div>
          </el-card>
        </div>
        <div class="stat-item">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>我的评论</span>
              </div>
            </template>
            <div class="stat-value">{{ userStats.comments }}</div>
          </el-card>
        </div>
      </div>
    </div>
    
    <!-- 编辑资料对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑资料"
      width="500px"
    >
      <el-form :model="editForm" :rules="editRules" ref="editFormRef">
        <el-form-item label="头像">
          <div class="avatar-upload">
            <el-avatar size="100" :src="editForm.avatar">{{ editForm.username.charAt(0) }}</el-avatar>
            <el-button type="primary" @click="triggerFileInput" class="upload-btn">更换头像</el-button>
            <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handleAvatarUpload" />
          </div>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="editForm.username" placeholder="请输入昵称" maxlength="10" show-word-limit />
          <el-button type="text" @click="showEmojiPicker = !showEmojiPicker" class="emoji-btn">
            😊
          </el-button>
          <!-- 简单的表情选择器 -->
          <div v-if="showEmojiPicker" class="emoji-picker">
            <span v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)" class="emoji-item">
              {{ emoji }}
            </span>
          </div>
        </el-form-item>
        <el-form-item label="个人签名" prop="signature">
          <el-input
            v-model="editForm.signature"
            type="textarea"
            placeholder="请输入个人签名"
            maxlength="30"
            show-word-limit
            rows="3"
          />
        </el-form-item>
      </el-form>
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
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 从localStorage加载用户信息
const loadUserInfo = () => {
  const savedUserInfo = localStorage.getItem('userInfo')
  if (savedUserInfo) {
    return JSON.parse(savedUserInfo)
  }
  return {
    username: '健身爱好者',
    role: 'user',
    avatar: '',
    registerTime: '2023-01-01',
    signature: '热爱健身，享受生活！'
  }
}

// 模拟用户信息
const userInfo = ref(loadUserInfo())

// 模拟用户统计数据
const userStats = ref({
  favorites: 12,
  courses: 5,
  comments: 8
})

// 编辑对话框状态
const editDialogVisible = ref(false)
const showEmojiPicker = ref(false)

// 表单引用
const editFormRef = ref(null)
const fileInput = ref(null)

// 编辑表单数据
const editForm = ref({
  username: '',
  avatar: '',
  signature: ''
})

// 表单验证规则
const editRules = {
  username: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { max: 10, message: '昵称不能超过10个字符', trigger: 'blur' }
  ],
  signature: [
    { max: 30, message: '个人签名不能超过30个字符', trigger: 'blur' }
  ]
}

// 常用表情
const emojis = [
  '😊', '😂', '🤣', '😍', '🤔', '😎', '😢', '🤗', '👍', '👎',
  '🔥', '💪', '🏃', '🏋️', '🧘', '🥗', '💯', '✨', '🌟', '🎉'
]

// 打开编辑对话框
const openEditDialog = () => {
  // 复制用户信息到编辑表单
  editForm.value = {
    username: userInfo.value.username,
    avatar: userInfo.value.avatar,
    signature: userInfo.value.signature
  }
  editDialogVisible.value = true
}

// 保存编辑
const saveEdit = () => {
  // 模拟保存操作
  userInfo.value = {
    ...userInfo.value,
    username: editForm.value.username,
    avatar: editForm.value.avatar,
    signature: editForm.value.signature
  }
  // 保存到localStorage
  localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  ElMessage.success('资料保存成功')
  editDialogVisible.value = false
}

// 触发文件输入
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理头像上传
const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 模拟上传，实际项目中需要调用后端API
    const reader = new FileReader()
    reader.onload = (e) => {
      editForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 添加表情
const addEmoji = (emoji) => {
  editForm.value.username += emoji
  showEmojiPicker.value = false
}
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-header h2 {
  font-size: 24px;
  color: #333;
}

.profile-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.avatar {
  margin-right: 30px;
}

.info h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.info p {
  margin-bottom: 5px;
  color: #666;
}

.info .signature {
  font-style: italic;
  color: #909399;
  margin-bottom: 10px;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 20px;
}

.upload-btn {
  white-space: nowrap;
}

.emoji-btn {
  margin-left: 10px;
  font-size: 18px;
  padding: 0;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.emoji-picker {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 300px;
  margin-top: 5px;
}

.emoji-item {
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.emoji-item:hover {
  background-color: #f5f7fa;
  transform: scale(1.2);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.profile-actions {
  margin-bottom: 30px;
}

.profile-actions button {
  margin-right: 10px;
}

.profile-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  flex: 1;
}

.stat-value {
  font-size: 36px;
  text-align: center;
  color: #1890ff;
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    text-align: center;
  }
  
  .avatar {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .profile-stats {
    flex-direction: column;
  }
}
</style>