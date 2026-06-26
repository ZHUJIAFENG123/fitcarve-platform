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
  background-color: var(--color-bg);
}

.publish-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--color-bg-card);
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  margin-top: 30px;
  margin-bottom: 30px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--color-primary);
}

.form-header h2 {
  font-size: 22px;
  color: var(--color-text-primary);
  margin: 0;
  font-weight: 700;
  font-family: var(--font-display);
}

.status-badge.saved {
  background-color: var(--color-primary-50);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-100);
}

.status-badge.unsaved {
  background-color: var(--color-accent-50);
  color: var(--color-accent);
  border: 1px solid var(--color-accent-100);
}

.category-select { width: 200px; }

.tag-section {
  padding: 15px;
  background-color: var(--color-bg-warm);
  border-radius: var(--radius-md);
}

.selected-tag {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-100);
  color: var(--color-primary);
}

.common-tag-btn:hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.upload-placeholder {
  width: 400px; height: 220px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: border-color 0.2s;
}
.upload-placeholder:hover { border-color: var(--color-primary); }

.editor-wrapper {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.toolbar-container { border-bottom: 1px solid var(--color-border); }

.form-actions {
  display: flex; gap: 15px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border-light);
}

.submit-btn { padding: 10px 30px; font-size: 15px; font-weight: 500; }

@media (max-width: 768px) {
  .image-uploader, .image-preview, .upload-placeholder { width: 100%; height: 180px; }
  .tag-input { width: 100%; }
  .tag-input-area { flex-direction: column; }
}
</style>
