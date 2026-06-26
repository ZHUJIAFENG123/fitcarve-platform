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
          <div class="roles-section">
            <span class="roles-label">当前身份：</span>
            <span v-for="role in allRoles" :key="role" class="role-badge" :style="{ background: ROLE_DEFINITIONS[role]?.color || '#999' }">
              {{ ROLE_DEFINITIONS[role]?.label || role }}
            </span>
          </div>
          <p>注册时间：{{ userInfo.registerTime }}</p>
        </div>
      </div>
      <div class="profile-actions">
        <el-button type="primary" @click="openEditDialog">编辑资料</el-button>
        <el-button @click="applyDialogVisible = true">申请新身份</el-button>
        <el-button type="danger" @click="logout">退出登录</el-button>
      </div>

      <!-- 申请记录 -->
      <div class="application-section" v-if="myApplications.length > 0">
        <h3>我的身份申请记录</h3>
        <el-table :data="myApplications" style="width: 100%" border>
          <el-table-column prop="targetRole" label="申请身份" width="140">
            <template #default="scope">
              <el-tag :color="ROLE_DEFINITIONS[scope.row.targetRole]?.color" effect="dark" size="small">
                {{ ROLE_DEFINITIONS[scope.row.targetRole]?.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="reason" label="申请理由" min-width="200"></el-table-column>
          <el-table-column prop="applyTime" label="申请时间" width="180"></el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 'pending'" type="warning">待审核</el-tag>
              <el-tag v-else-if="scope.row.status === 'approved'" type="success">已通过</el-tag>
              <el-tag v-else type="danger">已驳回</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="reviewComment" label="审核意见" min-width="150">
            <template #default="scope">
              <span v-if="scope.row.reviewComment">{{ scope.row.reviewComment }}</span>
              <span v-else style="color:#999">-</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="profile-stats">
        <div class="stat-item" @click="goToFavorites" style="cursor: pointer;">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>我的收藏</span>
                <span class="arrow">→</span>
              </div>
            </template>
            <div class="stat-value">{{ userStats.favorites }}</div>
          </el-card>
        </div>
        <div class="stat-item" @click="goToLearningProgress" style="cursor: pointer;">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>我的课程</span>
                <span class="arrow">→</span>
              </div>
            </template>
            <div class="stat-value">{{ userStats.courses }}</div>
          </el-card>
        </div>
        <div class="stat-item" @click="goToComments" style="cursor: pointer;">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header">
                <span>我的评论</span>
                <span class="arrow">→</span>
              </div>
            </template>
            <div class="stat-value">{{ userStats.comments }}</div>
          </el-card>
        </div>
      </div>

      <!-- 学习统计 -->
      <div class="learning-stats" v-if="learningStats.totalDays > 0">
        <h3>📊 学习统计</h3>
        <div class="learning-grid">
          <el-card shadow="hover" class="lcard">
            <div class="lcard-val">{{ learningStats.totalDays }}</div>
            <div class="lcard-label">累计学习天数</div>
          </el-card>
          <el-card shadow="hover" class="lcard">
            <div class="lcard-val">{{ learningStats.completedCourses }}</div>
            <div class="lcard-label">已完成课程</div>
          </el-card>
          <el-card shadow="hover" class="lcard">
            <div class="lcard-val">{{ learningStats.totalHours }}h</div>
            <div class="lcard-label">累计学习时长</div>
          </el-card>
          <el-card shadow="hover" class="lcard">
            <div class="lcard-val">{{ learningStats.streak }}天</div>
            <div class="lcard-label">连续学习</div>
          </el-card>
        </div>
      </div>
    </div>
    
    <!-- 编辑资料对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑资料" width="500px">
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
          <el-button type="text" @click="showEmojiPicker = !showEmojiPicker" class="emoji-btn">😊</el-button>
          <div v-if="showEmojiPicker" class="emoji-picker">
            <span v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)" class="emoji-item">{{ emoji }}</span>
          </div>
        </el-form-item>
        <el-form-item label="个人签名" prop="signature">
          <el-input v-model="editForm.signature" type="textarea" placeholder="请输入个人签名" maxlength="30" show-word-limit rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 申请新身份对话框 -->
    <el-dialog v-model="applyDialogVisible" title="申请新身份" width="520px">
      <el-form :model="applyForm" ref="applyFormRef" :rules="applyRules">
        <el-form-item label="当前身份">
          <el-tag v-for="role in allRoles" :key="role" :color="ROLE_DEFINITIONS[role]?.color" effect="dark" size="small" style="margin-right:8px">
            {{ ROLE_DEFINITIONS[role]?.label }}
          </el-tag>
        </el-form-item>
        <el-form-item label="申请身份" prop="targetRole">
          <el-select v-model="applyForm.targetRole" placeholder="请选择要申请的身份" style="width:100%">
            <el-option v-for="role in availableRoles" :key="role" :label="ROLE_DEFINITIONS[role]?.label" :value="role">
              <span :style="{ display:'inline-block', width:'10px', height:'10px', borderRadius:'50%', background: ROLE_DEFINITIONS[role]?.color, marginRight:'8px' }"></span>
              {{ ROLE_DEFINITIONS[role]?.label }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请理由" prop="reason">
          <el-input v-model="applyForm.reason" type="textarea" placeholder="请说明申请此身份的原因（至少10个字）" rows="4" maxlength="200" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="applyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitApplication" :loading="submitting">提交申请</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ROLE_DEFINITIONS } from '@/services/auth.js'

const router = useRouter()

const goToFavorites = () => router.push('/favorites')
const goToLearningProgress = () => router.push('/learning-progress')
const goToComments = () => router.push('/my-comments')
const logout = () => window.location.href = '/login'

const loadUserInfo = () => {
  const savedUserInfo = localStorage.getItem('userInfo')
  if (savedUserInfo) return JSON.parse(savedUserInfo)
  return {
    username: '健身爱好者', role: 'user', roles: ['user'], avatar: '',
    registerTime: '2023-01-01', signature: '热爱健身，享受生活！'
  }
}

const userInfo = ref(loadUserInfo())
const allRoles = computed(() => userInfo.value.roles || [userInfo.value.role])
const myApplications = ref([])

const availableRoles = computed(() => [])

const userStats = ref({ favorites: 12, courses: 5, comments: 8 })
const learningStats = ref({
  totalDays: 48,
  completedCourses: 3,
  totalHours: 126,
  streak: 7
})

const editDialogVisible = ref(false)
const showEmojiPicker = ref(false)
const editFormRef = ref(null)
const fileInput = ref(null)
const editForm = ref({ username: '', avatar: '', signature: '' })

const editRules = {
  username: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { max: 10, message: '昵称不能超过10个字符', trigger: 'blur' }
  ],
  signature: [{ max: 30, message: '个人签名不能超过30个字符', trigger: 'blur' }]
}

const emojis = ['😊','😂','🤣','😍','🤔','😎','😢','🤗','👍','👎','🔥','💪','🏃','🏋️','🧘','🥗','💯','✨','🌟','🎉']

const openEditDialog = () => {
  editForm.value = { username: userInfo.value.username, avatar: userInfo.value.avatar, signature: userInfo.value.signature }
  editDialogVisible.value = true
}

const saveEdit = () => {
  userInfo.value = { ...userInfo.value, username: editForm.value.username, avatar: editForm.value.avatar, signature: editForm.value.signature }
  localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  ElMessage.success('资料保存成功')
  editDialogVisible.value = false
}

const triggerFileInput = () => fileInput.value.click()

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    import('../../utils/upload.js').then(({ validateFile, handleFileUpload }) => {
      const validation = validateFile(file, 'image')
      if (!validation.valid) { ElMessage.error(validation.message); return }
      handleFileUpload(file, 'image').then(result => { editForm.value.avatar = result.url }).catch(error => ElMessage.error(error.message))
    })
  }
}

const addEmoji = (emoji) => { editForm.value.username += emoji; showEmojiPicker.value = false }

// ===== 角色申请系统 =====
const applyDialogVisible = ref(false)
const submitting = ref(false)
const applyFormRef = ref(null)
const applyForm = ref({ targetRole: '', reason: '' })
const applyRules = {
  targetRole: [{ required: true, message: '请选择要申请的身份', trigger: 'change' }],
  reason: [
    { required: true, message: '请填写申请理由', trigger: 'blur' },
    { min: 10, message: '申请理由至少10个字', trigger: 'blur' }
  ]
}

const submitApplication = async () => {
  ElMessage.warning('生产环境暂不支持角色申请，所有用户默认为健身爱好者')
}

onMounted(() => {
  userInfo.value = loadUserInfo()
})
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

.roles-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.roles-label {
  color: #666;
  font-size: 14px;
}

.role-badge {
  color: #fff;
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.application-section {
  margin-bottom: 24px;
}

.application-section h3 {
  margin-bottom: 16px;
  color: #333;
  font-size: 16px;
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

.arrow {
  color: #1890ff;
  font-size: 16px;
  transition: transform 0.3s;
}

.stat-item:hover .arrow {
  transform: translateX(5px);
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

/* 学习统计 */
.learning-stats { margin: 30px 0; }
.learning-stats h3 { font-size: 18px; color: #333; margin-bottom: 16px; }
.learning-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.lcard { text-align: center; transition: transform 0.2s; }
.lcard:hover { transform: translateY(-3px); }
.lcard-val { font-size: 28px; font-weight: 700; color: #1890ff; margin-bottom: 4px; }
.lcard-label { font-size: 13px; color: #909399; }

@media (max-width: 768px) {
  .learning-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>