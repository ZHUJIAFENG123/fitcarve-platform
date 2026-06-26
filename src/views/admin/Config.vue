<template>
  <div class="admin-config">
    <Navbar :menu-links="adminMenuLinks" :logo-suffix="'管理后台'" />
    <div class="admin-content">
      <div class="page-header">
        <h2>系统配置</h2>
      </div>
      <el-card shadow="hover">
        <template #header><span>网站基础配置</span></template>
        <el-form :model="configForm" :rules="rules" ref="configFormRef">
          <el-form-item label="网站名称" prop="siteName">
            <el-input v-model="configForm.siteName" placeholder="请输入网站名称" />
          </el-form-item>
          <el-form-item label="网站公告" prop="announcement">
            <el-input v-model="configForm.announcement" type="textarea" rows="3" placeholder="请输入网站公告" />
          </el-form-item>
          <el-form-item label="联系邮箱" prop="contactEmail">
            <el-input v-model="configForm.contactEmail" type="email" placeholder="请输入联系邮箱" />
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="configForm.contactPhone" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="网站版权" prop="copyright">
            <el-input v-model="configForm.copyright" placeholder="请输入网站版权信息" />
          </el-form-item>
          <el-form-item label="ICP备案号" prop="icpNumber">
            <el-input v-model="configForm.icpNumber" placeholder="请输入ICP备案号" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveConfig">保存配置</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px;">
        <template #header><span>文件上传配置</span></template>
        <el-form :model="uploadConfig" :rules="uploadRules" ref="uploadFormRef">
          <el-form-item label="最大文件大小 (MB)" prop="maxFileSize">
            <el-input-number v-model="uploadConfig.maxFileSize" :min="1" :max="100" :step="1" />
          </el-form-item>
          <el-form-item label="允许的文件类型" prop="allowedTypes">
            <el-select v-model="uploadConfig.allowedTypes" multiple placeholder="请选择允许的文件类型">
              <el-option label="JPG" value="jpg" />
              <el-option label="PNG" value="png" />
              <el-option label="GIF" value="gif" />
              <el-option label="WebP" value="webp" />
              <el-option label="MP4" value="mp4" />
              <el-option label="PDF" value="pdf" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveUploadConfig">保存配置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'

const adminMenuLinks = [
  { to: '/admin/dashboard', label: '后台首页', active: false },
  { to: '/admin/config', label: '系统配置', active: true },
  { to: '/admin/users', label: '用户管理', active: false },
  { to: '/admin/audit', label: '资讯审核', active: false },
  { to: '/admin/comments', label: '评论监控', active: false },
  { to: '/admin/logs', label: '操作日志', active: false },
  { to: '/admin/reports', label: '数据报表', active: false }
]

const configFormRef = ref(null)
const uploadFormRef = ref(null)

const configForm = ref({
  siteName: '健身资讯网站',
  announcement: '欢迎访问健身资讯网站，这里有最新的健身资讯和课程！',
  contactEmail: 'contact@fitness.com',
  contactPhone: '12345678901',
  copyright: '© 2023 健身资讯网站 版权所有',
  icpNumber: '京ICP备12345678号'
})

const uploadConfig = ref({ maxFileSize: 5, allowedTypes: ['jpg', 'png', 'gif', 'webp'] })

const rules = {
  siteName: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
  contactEmail: [{ type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }]
}

const uploadRules = {
  maxFileSize: [{ required: true, message: '请设置最大文件大小', trigger: 'blur' }],
  allowedTypes: [{ required: true, message: '请至少选择一种文件类型', trigger: 'change' }]
}

const loadConfig = () => {
  const sc = localStorage.getItem('siteConfig')
  if (sc) configForm.value = { ...configForm.value, ...JSON.parse(sc) }
  const uc = localStorage.getItem('uploadConfig')
  if (uc) uploadConfig.value = { ...uploadConfig.value, ...JSON.parse(uc) }
}

const saveConfig = () => {
  localStorage.setItem('siteConfig', JSON.stringify(configForm.value))
  ElMessage.success('网站配置保存成功')
}

const saveUploadConfig = () => {
  localStorage.setItem('uploadConfig', JSON.stringify(uploadConfig.value))
  ElMessage.success('上传配置保存成功')
}

const resetForm = () => {
  configForm.value = {
    siteName: '健身资讯网站', announcement: '欢迎访问健身资讯网站，这里有最新的健身资讯和课程！',
    contactEmail: 'contact@fitness.com', contactPhone: '12345678901',
    copyright: '© 2023 健身资讯网站 版权所有', icpNumber: '京ICP备12345678号'
  }
  uploadConfig.value = { maxFileSize: 5, allowedTypes: ['jpg', 'png', 'gif', 'webp'] }
}

onMounted(() => { loadConfig() })
</script>

<style scoped>
.admin-config { min-height: 100vh; background: #f5f5f5; }
.admin-content { max-width: 1400px; margin: 0 auto; padding: 20px; }
.page-header { margin-bottom: 24px; }
.page-header h2 { font-size: 20px; color: #333; margin: 0; padding-bottom: 10px; border-bottom: 2px solid #1890ff; display: inline-block; }
@media (max-width: 768px) { .admin-content { padding: 12px; } }
</style>
