<template>
  <div class="publish-container">
    <Navbar :menu-links="coachMenuLinks" />
    <div class="admin-content">
      <div class="page-header">
        <h2>{{ isEdit ? '编辑课程' : '发布课程' }}</h2>
      </div>
      <el-form :model="courseForm" :rules="courseRules" ref="courseFormRef" label-width="100px">
        <div class="form-grid">
          <div class="form-left">
            <el-form-item label="课程标题" prop="title">
              <el-input v-model="courseForm.title" placeholder="请输入课程标题" size="large" />
            </el-form-item>
            <el-form-item label="课程分类" prop="category">
              <el-select v-model="courseForm.category" placeholder="请选择课程分类" size="large">
                <el-option label="瑜伽" value="yoga" />
                <el-option label="力量训练" value="strength" />
                <el-option label="有氧运动" value="cardio" />
                <el-option label="普拉提" value="pilates" />
                <el-option label="健身知识" value="knowledge" />
                <el-option label="营养健康" value="nutrition" />
                <el-option label="运动康复" value="recovery" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程难度" prop="level">
              <el-select v-model="courseForm.level" placeholder="请选择课程难度" size="large">
                <el-option label="初级" value="beginner" />
                <el-option label="中级" value="intermediate" />
                <el-option label="高级" value="advanced" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程价格" prop="price">
              <el-input v-model="courseForm.price" placeholder="请输入课程价格（元）" size="large" type="number" />
            </el-form-item>
            <el-form-item label="适用人群" prop="targetAudience">
              <el-input v-model="courseForm.targetAudience" placeholder="如：健身初学者、有基础的训练者" size="large" />
            </el-form-item>
            <el-form-item label="课程亮点" prop="highlights">
              <el-input v-model="courseForm.highlights" placeholder="如：名师授课、小班教学" size="large" />
            </el-form-item>
          </div>
          <div class="form-right">
            <el-form-item label="课程封面" prop="image">
              <div class="cover-upload">
                <div class="cover-preview" v-if="courseForm.image">
                  <img :src="courseForm.image" alt="封面" />
                  <el-button type="danger" size="small" circle class="cover-remove" @click="courseForm.image = ''">✕</el-button>
                </div>
                <div class="cover-placeholder" v-else @click="triggerUpload">
                  <el-icon :size="40"><Plus /></el-icon>
                  <span>上传封面图片</span>
                </div>
                <input type="file" ref="fileInputRef" accept="image/*" style="display:none" @change="onFileChange" />
              </div>
            </el-form-item>
          </div>
        </div>

        <el-form-item label="课程描述" prop="description">
          <RichTextEditor v-model="courseForm.description" />
        </el-form-item>

        <el-form-item label="课程大纲">
          <div v-for="(lesson, index) in courseForm.syllabus" :key="index" class="lesson-item">
            <span class="lesson-num">课时 {{ index + 1 }}</span>
            <el-input v-model="lesson.title" placeholder="课时标题" />
            <el-input v-model="lesson.description" placeholder="课时描述" />
            <el-input v-model="lesson.duration" placeholder="时长(分)" style="width:100px" />
            <el-button type="danger" circle size="small" @click="removeLesson(index)">✕</el-button>
          </div>
          <el-button type="primary" plain @click="addLesson" class="add-lesson-btn">+ 添加课时</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" @click="submitForm" :loading="submitting" class="submit-btn">
            {{ submitting ? '提交中...' : (isEdit ? '保存修改' : '发布课程') }}
          </el-button>
          <el-button size="large" @click="resetForm">重置</el-button>
          <el-button size="large" @click="saveDraft" :loading="savingDraft">保存草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import Navbar from '@/components/Navbar.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { courseApi } from '@/services/api.js'

const router = useRouter()
const route = useRoute()

const coachMenuLinks = [
  { to: '/coach/publish', label: '内容发布', active: true },
  { to: '/coach/interaction', label: '用户互动', active: false },
  { to: '/coach/statistics', label: '数据统计', active: false },
  { to: '/coach/manage', label: '课程管理', active: false }
]

const isEdit = ref(false)
const editId = ref(null)
const submitting = ref(false)
const savingDraft = ref(false)
const fileInputRef = ref(null)
const courseFormRef = ref(null)

const emptyForm = () => ({
  title: '', category: '', level: '', price: '',
  targetAudience: '', highlights: '', description: '', image: '',
  syllabus: [{ title: '', description: '', duration: '' }]
})

const courseForm = ref(emptyForm())

const courseRules = {
  title: [{ required: true, message: '请输入课程标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择课程分类', trigger: 'change' }],
  level: [{ required: true, message: '请选择课程难度', trigger: 'change' }],
  price: [{ required: true, message: '请输入课程价格', trigger: 'blur' }],
  description: [{ required: true, message: '请输入课程描述', trigger: 'blur' }]
}

const triggerUpload = () => fileInputRef.value?.click()

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => { courseForm.value.image = reader.result }
  reader.readAsDataURL(file)
}

const addLesson = () => courseForm.value.syllabus.push({ title: '', description: '', duration: '' })

const removeLesson = (index) => {
  if (courseForm.value.syllabus.length > 1) courseForm.value.syllabus.splice(index, 1)
}

const submitForm = async () => {
  try {
    await courseFormRef.value.validate()
  } catch { return }

  submitting.value = true
  try {
    const payload = { ...courseForm.value }
    payload.price = Number(payload.price) || 0
    payload.syllabus = payload.syllabus.filter(l => l.title)

    if (isEdit.value) {
      await courseApi.update(editId.value, payload)
      ElMessage.success('课程修改成功')
    } else {
      await courseApi.create(payload)
      ElMessage.success('课程发布成功，已提交审核')
    }
    localStorage.removeItem('courseDraft')
    courseForm.value = emptyForm()
    isEdit.value = false
  } catch (e) {
    ElMessage.error(e.message || '操作失败，请重试')
  } finally {
    submitting.value = false
  }
}

const saveDraft = () => {
  savingDraft.value = true
  localStorage.setItem('courseDraft', JSON.stringify(courseForm.value))
  ElMessage.success('草稿已保存')
  savingDraft.value = false
}

const resetForm = () => {
  courseForm.value = emptyForm()
  isEdit.value = false
  localStorage.removeItem('courseDraft')
}

const loadDraft = () => {
  const draft = localStorage.getItem('courseDraft')
  if (draft) courseForm.value = JSON.parse(draft)
}

const loadEditData = () => {
  const editData = route.query.edit
  if (editData) {
    try {
      const parsed = JSON.parse(editData)
      courseForm.value = { ...emptyForm(), ...parsed }
      isEdit.value = true
      editId.value = parsed.id
    } catch {}
  }
}

onMounted(() => {
  loadDraft()
  loadEditData()
})
</script>

<style scoped>
.publish-container { min-height: 100vh; background: #f5f5f5; }
.admin-content { max-width: 1200px; margin: 0 auto; padding: 20px; }
.page-header { margin-bottom: 24px; }
.page-header h2 { font-size: 20px; color: #333; margin: 0; padding-bottom: 10px; border-bottom: 2px solid #1890ff; display: inline-block; }

.form-grid { display: grid; grid-template-columns: 1fr 280px; gap: 30px; margin-bottom: 10px; }

.cover-upload { position: relative; }
.cover-preview { position: relative; width: 240px; height: 160px; border-radius: 8px; overflow: hidden; }
.cover-preview img { width: 100%; height: 100%; object-fit: cover; }
.cover-remove { position: absolute; top: 6px; right: 6px; }
.cover-placeholder { width: 240px; height: 160px; border: 2px dashed #d9d9d9; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; color: #999; gap: 8px; transition: all 0.2s; }
.cover-placeholder:hover { border-color: #1890ff; color: #1890ff; }

.lesson-item { display: flex; gap: 10px; margin-bottom: 12px; align-items: center; }
.lesson-num { min-width: 60px; font-size: 13px; color: #999; }
.add-lesson-btn { margin-top: 8px; }
.submit-btn { min-width: 140px; }

@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
  .lesson-item { flex-wrap: wrap; }
  .lesson-item .el-input { min-width: 140px; flex: 1; }
}
</style>
