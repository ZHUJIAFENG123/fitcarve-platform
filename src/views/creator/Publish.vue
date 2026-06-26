<template>
  <div class="publish-container">
    <Navbar :menu-links="creatorMenuLinks" />
    <!-- 资讯发布表单 -->
    <div class="publish-content">
      <div class="form-header">
        <h2>{{ isEdit ? '编辑资讯' : '发布资讯' }}</h2>
        <div class="status-badge" :class="draftStatus">
          {{ draftStatus === 'saved' ? '已保存草稿' : draftStatus === 'unsaved' ? '未保存' : '' }}
        </div>
      </div>
      
      <el-form :model="newsForm" :rules="newsRules" ref="newsFormRef" label-width="100px">
        <el-form-item label="资讯标题" prop="title">
          <el-input 
            v-model="newsForm.title" 
            placeholder="请输入资讯标题（50字以内）" 
            maxlength="50" 
            show-word-limit
            class="title-input"
          ></el-input>
        </el-form-item>

        <el-form-item label="资讯分类" prop="category">
          <el-select v-model="newsForm.category" placeholder="请选择资讯分类" class="category-select">
            <el-option label="健身知识" value="knowledge"></el-option>
            <el-option label="营养健康" value="nutrition"></el-option>
            <el-option label="运动康复" value="recovery"></el-option>
            <el-option label="健身器材" value="equipment"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资讯标签" prop="tags">
          <div class="tag-section">
            <div class="selected-tags">
              <el-tag 
                v-for="(tag, index) in newsForm.tags" 
                :key="index" 
                closable 
                @close="removeTag(index)"
                class="selected-tag"
              >
                {{ tag }}
              </el-tag>
              <span v-if="newsForm.tags.length === 0" class="no-tags">暂无标签</span>
            </div>
            <div class="tag-input-area">
              <el-input
                v-model="newTag"
                placeholder="输入标签后按回车添加，最多添加5个标签"
                @keyup.enter="addTag"
                class="tag-input"
              ></el-input>
              <el-button type="primary" size="small" @click="addTag" class="add-tag-btn">添加标签</el-button>
            </div>
            <div class="common-tags">
              <span class="common-tags-label">常用标签：</span>
              <el-button 
                v-for="tag in commonTags" 
                :key="tag" 
                type="text" 
                size="small" 
                @click="addCommonTag(tag)"
                class="common-tag-btn"
              >
                {{ tag }}
              </el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="资讯摘要" prop="summary">
          <el-input
            v-model="newsForm.summary"
            type="textarea"
            placeholder="请输入资讯摘要（简短描述资讯内容，不超过200字）"
            maxlength="200"
            show-word-limit
            :rows="3"
            class="summary-input"
          ></el-input>
        </el-form-item>

        <el-form-item label="封面图片" prop="image">
          <div class="image-upload-section">
            <el-upload
              class="image-uploader"
              action="/api/upload/image"
              :show-file-list="false"
              :on-success="handleImageSuccess"
              :before-upload="beforeImageUpload"
              accept="image/jpg,image/jpeg,image/png,image/gif"
            >
              <div v-if="newsForm.image" class="image-preview">
                <img :src="newsForm.image" alt="封面图片">
                <button class="remove-image-btn" @click.stop="removeImage">移除</button>
              </div>
              <div v-else class="upload-placeholder">
                <el-icon class="upload-icon"><Plus /></el-icon>
                <span>点击上传封面图片</span>
                <p class="upload-hint">支持 JPG、PNG、GIF 格式，建议尺寸 800x450，大小不超过 2MB</p>
              </div>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="资讯正文" prop="content">
          <div class="editor-wrapper">
            <div id="toolbar-container" class="toolbar-container"></div>
            <WangEditor v-model="newsForm.content" />
          </div>
        </el-form-item>

        <el-form-item class="form-actions">
          <el-button type="success" @click="submitForm" class="submit-btn" :loading="submitting">
            <el-icon><Promotion /></el-icon>
            {{ submitting ? '提交中...' : (isEdit ? '保存修改' : '提交审核') }}
          </el-button>
          <el-button type="warning" @click="saveDraft" class="draft-btn">
            <el-icon><Files /></el-icon>
            保存草稿
          </el-button>
          <el-button @click="resetForm" class="reset-btn">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 审核状态提示 -->
    <el-dialog v-model="statusDialogVisible" title="提交成功" width="400px">
      <div class="status-dialog-content">
        <el-icon class="success-icon"><CircleCheck /></el-icon>
        <p>资讯已提交审核，请耐心等待管理员审核</p>
        <p class="status-hint">审核结果将通过站内通知告知您</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="statusDialogVisible = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowDown, Plus, Promotion, Files, Refresh, CircleCheck } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import WangEditor from '@/components/WangEditor.vue'
import { useNewsStore } from '@/stores/news'

const router = useRouter()
const route = useRoute()
const store = useNewsStore()

const isEdit = ref(false)
const editId = ref(null)
const submitting = ref(false)

const creatorMenuLinks = [
  { to: '/creator/publish', label: '资讯发布', active: true },
  { to: '/creator/manage', label: '内容管理', active: false },
  { to: '/creator/fans', label: '粉丝互动', active: false }
]

const username = ref('内容创作者')
const userAvatar = ref('')

const newsForm = ref<{
  title: string
  category: string
  tags: string[]
  summary: string
  image: string
  content: string
}>({
  title: '',
  category: '',
  tags: [],
  summary: '',
  image: '',
  content: ''
})

const newTag = ref('')
const newsFormRef = ref<any>(null)
const statusDialogVisible = ref(false)

const commonTags = ['减肥', '增肌', '瑜伽', '跑步', '力量训练', '营养', '康复', '拉伸', '有氧运动', '无氧运动']

const draftStatus = computed(() => {
  const draft = localStorage.getItem('newsDraft')
  if (draft) {
    const draftObj = JSON.parse(draft)
    if (draftObj.title || draftObj.content) return 'saved'
  }
  return 'unsaved'
})

const newsRules = {
  title: [
    { required: true, message: '请输入资讯标题', trigger: 'blur' },
    { min: 5, max: 50, message: '标题长度应在5-50个字符之间', trigger: 'blur' }
  ],
  category: [{ required: true, message: '请选择资讯分类', trigger: 'change' }],
  tags: [{ required: true, message: '请至少添加一个标签', trigger: 'change' }],
  summary: [
    { required: true, message: '请输入资讯摘要', trigger: 'blur' },
    { min: 20, max: 200, message: '摘要长度应在20-200个字符之间', trigger: 'blur' }
  ],
  image: [{ required: true, message: '请上传封面图片', trigger: 'change' }],
  content: [{ required: true, message: '请输入资讯正文', trigger: 'blur' }]
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (!tag) {
    ElMessage.warning('请输入标签内容')
    return
  }
  
  if (newsForm.value.tags.length >= 5) {
    ElMessage.warning('最多只能添加5个标签')
    return
  }
  
  if (newsForm.value.tags.includes(tag)) {
    ElMessage.warning('该标签已存在')
    newTag.value = ''
    return
  }
  
  newsForm.value.tags.push(tag)
  newTag.value = ''
  ElMessage.success('标签添加成功')
}

const addCommonTag = (tag: any) => {
  if (newsForm.value.tags.length >= 5) {
    ElMessage.warning('最多只能添加5个标签')
    return
  }
  
  if (newsForm.value.tags.includes(tag)) {
    ElMessage.warning('该标签已存在')
    return
  }
  
  newsForm.value.tags.push(tag)
  ElMessage.success(`已添加标签：${tag}`)
}

const removeTag = (index: any) => {
  newsForm.value.tags.splice(index, 1)
}

const beforeImageUpload = (file: any) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2
  
  if (!isImage) {
    ElMessage.error('请上传图片文件')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过2MB')
    return false
  }
  return true
}

const handleImageSuccess = (response: any) => {
  if (response.success) {
    newsForm.value.image = response.url
    ElMessage.success('图片上传成功')
  } else {
    ElMessage.error('图片上传失败')
  }
}

const removeImage = () => {
  newsForm.value.image = ''
}

const submitForm = async () => {
  try {
    await newsFormRef.value.validate()
  } catch { return }

  submitting.value = true
  try {
    newsForm.value.tags = [...new Set(newsForm.value.tags)]

    const formData = new FormData()
    formData.append('title', newsForm.value.title)
    formData.append('category', newsForm.value.category)
    formData.append('summary', newsForm.value.summary)
    formData.append('content', newsForm.value.content)
    formData.append('tags', JSON.stringify(newsForm.value.tags || []))
    if (newsForm.value.image && !newsForm.value.image.startsWith('http')) {
      formData.append('image', newsForm.value.image)
    }

    if (isEdit.value) {
      await store.updateNews(editId.value!, formData as any)
      ElMessage.success('资讯修改成功')
    } else {
      await store.createNews(formData as any)
      ElMessage.success('资讯提交审核成功')
    }
    statusDialogVisible.value = true
    localStorage.removeItem('newsDraft')
    isEdit.value = false
    newsForm.value = { title: '', category: '', tags: [], summary: '', image: '', content: '' }
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败，请重试')
  } finally {
    submitting.value = false
  }
}

const saveDraft = () => {
  newsForm.value.tags = [...new Set(newsForm.value.tags)]
  localStorage.setItem('newsDraft', JSON.stringify(newsForm.value))
  ElMessage.success('草稿已保存')
}

const loadDraft = () => {
  const draft = localStorage.getItem('newsDraft')
  if (draft) {
    newsForm.value = JSON.parse(draft)
    ElMessage.info('已加载草稿')
  }
}

const resetForm = () => {
  newsForm.value = {
    title: '',
    category: '',
    tags: [],
    summary: '',
    image: '',
    content: ''
  }
  localStorage.removeItem('newsDraft')
  ElMessage.info('表单已重置')
}

watch(newsForm, () => {
  localStorage.setItem('newsDraft', JSON.stringify(newsForm.value))
}, { deep: true })

const loadEditData = () => {
  const draft = localStorage.getItem('newsEditDraft')
  if (draft) {
    try {
      const parsed = JSON.parse(draft)
      newsForm.value = { ...newsForm.value, ...parsed }
      isEdit.value = true
      editId.value = parsed.id
      localStorage.removeItem('newsEditDraft')
    } catch {}
  }
}

onMounted(() => {
  loadDraft()
  loadEditData()
})

const toProfile = () => {
  router.push('/profile')
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.publish-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.navbar {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
}

.logo h1 {
  font-size: 22px;
  color: #1890ff;
  margin: 0;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: 40px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s;
}

.nav-menu a:hover {
  color: #1890ff;
}

.nav-menu a.active {
  color: #1890ff;
}

.nav-menu a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #1890ff, #096dd9);
  border-radius: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.username {
  font-size: 14px;
  color: #666;
}

.notification-btn {
  position: relative;
  font-size: 18px;
  color: #666;
}

.unread-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
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
  padding: 12px 20px;
}

.notification-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-title {
  font-size: 14px;
  color: #333;
  margin-right: 15px;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.notification-item:hover {
  background-color: #f5f7fa;
}

.publish-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #1890ff;
}

.form-header h2 {
  font-size: 22px;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.status-badge {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
}

.status-badge.saved {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-badge.unsaved {
  background-color: #fff7e6;
  color: #fa8c16;
  border: 1px solid #ffd591;
}

.title-input {
  width: 100%;
  font-size: 16px;
}

.category-select {
  width: 200px;
}

.tag-section {
  padding: 15px;
  background-color: #fafafa;
  border-radius: 8px;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.selected-tag {
  font-size: 13px;
  padding: 4px 12px;
  background-color: #e6f7ff;
  border-color: #91d5ff;
  color: #1890ff;
}

.no-tags {
  font-size: 13px;
  color: #999;
  font-style: italic;
}

.tag-input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tag-input {
  width: 300px;
}

.add-tag-btn {
  white-space: nowrap;
}

.common-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.common-tags-label {
  font-size: 13px;
  color: #999;
}

.common-tag-btn {
  font-size: 13px;
  color: #666;
  padding: 4px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
}

.common-tag-btn:hover {
  background-color: #f0f5ff;
  border-color: #1890ff;
  color: #1890ff;
}

.summary-input {
  width: 100%;
}

.image-upload-section {
  margin-top: 10px;
}

.image-uploader {
  width: 400px;
}

.image-preview {
  position: relative;
  width: 400px;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-image-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.upload-placeholder {
  width: 400px;
  height: 220px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.upload-placeholder:hover {
  border-color: #1890ff;
}

.upload-icon {
  font-size: 48px;
  color: #999;
  margin-bottom: 10px;
}

.upload-placeholder span {
  font-size: 14px;
  color: #666;
}

.upload-hint {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.editor-wrapper {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
}

.toolbar-container {
  border-bottom: 1px solid #d9d9d9;
}

.form-actions {
  display: flex;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.submit-btn {
  padding: 10px 30px;
  font-size: 15px;
  font-weight: 500;
}

.draft-btn, .reset-btn {
  padding: 10px 25px;
  font-size: 15px;
}

.status-dialog-content {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  font-size: 48px;
  color: #52c41a;
  margin-bottom: 15px;
}

.status-dialog-content p {
  font-size: 15px;
  color: #666;
  margin: 8px 0;
}

.status-hint {
  font-size: 13px;
  color: #999 !important;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .image-uploader, .image-preview, .upload-placeholder {
    width: 100%;
    height: 180px;
  }
  
  .tag-input {
    width: 100%;
  }
  
  .tag-input-area {
    flex-direction: column;
  }
}
</style>
