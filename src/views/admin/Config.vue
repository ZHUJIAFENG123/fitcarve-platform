<template>
  <div class="config-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="nav-content">
        <div class="logo">
          <h1>健身资讯网站 - 管理后台</h1>
        </div>
        <nav class="nav-menu">
          <a href="/admin/dashboard">后台首页</a>
          <a href="/admin/config" class="active">系统配置</a>
          <a href="/admin/users">用户管理</a>
          <a href="/admin/audit">资讯审核</a>
          <a href="/admin/logs">操作日志</a>
          <a href="/admin/reports">数据报表</a>
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

    <!-- 系统配置内容 -->
    <div class="config-content">
      <h2>系统配置</h2>
      <el-tabs>
        <el-tab-pane label="基本配置">
          <el-form :model="basicConfig" :rules="basicRules" ref="basicForm">
            <el-form-item label="网站名称" prop="siteName">
              <el-input v-model="basicConfig.siteName" placeholder="请输入网站名称"></el-input>
            </el-form-item>
            <el-form-item label="网站域名" prop="siteDomain">
              <el-input v-model="basicConfig.siteDomain" placeholder="请输入网站域名"></el-input>
            </el-form-item>
            <el-form-item label="网站描述" prop="siteDescription">
              <el-input
                v-model="basicConfig.siteDescription"
                type="textarea"
                :rows="3"
                placeholder="请输入网站描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="网站关键词" prop="siteKeywords">
              <el-input v-model="basicConfig.siteKeywords" placeholder="请输入网站关键词，用逗号分隔"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="contactEmail">
              <el-input v-model="basicConfig.contactEmail" placeholder="请输入联系邮箱"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model="basicConfig.contactPhone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveBasicConfig">保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="邮件配置">
          <el-form :model="emailConfig" :rules="emailRules" ref="emailForm">
            <el-form-item label="SMTP服务器" prop="smtpServer">
              <el-input v-model="emailConfig.smtpServer" placeholder="请输入SMTP服务器地址"></el-input>
            </el-form-item>
            <el-form-item label="SMTP端口" prop="smtpPort">
              <el-input v-model="emailConfig.smtpPort" placeholder="请输入SMTP端口"></el-input>
            </el-form-item>
            <el-form-item label="发件人邮箱" prop="senderEmail">
              <el-input v-model="emailConfig.senderEmail" placeholder="请输入发件人邮箱"></el-input>
            </el-form-item>
            <el-form-item label="发件人密码" prop="senderPassword">
              <el-input type="password" v-model="emailConfig.senderPassword" placeholder="请输入发件人密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveEmailConfig">保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="安全配置">
          <el-form :model="securityConfig" :rules="securityRules" ref="securityForm">
            <el-form-item label="登录失败次数限制" prop="loginFailLimit">
              <el-input v-model="securityConfig.loginFailLimit" placeholder="请输入登录失败次数限制"></el-input>
            </el-form-item>
            <el-form-item label="登录锁定时间(分钟)" prop="loginLockTime">
              <el-input v-model="securityConfig.loginLockTime" placeholder="请输入登录锁定时间"></el-input>
            </el-form-item>
            <el-form-item label="密码复杂度要求" prop="passwordComplexity">
              <el-select v-model="securityConfig.passwordComplexity" placeholder="请选择密码复杂度要求">
                <el-option label="简单" value="simple"></el-option>
                <el-option label="中等" value="medium"></el-option>
                <el-option label="复杂" value="complex"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveSecurityConfig">保存配置</el-button>
            </el-form-item>
          </el-form>
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
const username = ref('管理员')
const userAvatar = ref('')

// 基本配置
const basicConfig = ref({
  siteName: '健身资讯网站',
  siteDomain: 'www.fitness.com',
  siteDescription: '专业的健身资讯和课程平台',
  siteKeywords: '健身,瑜伽,力量训练,营养健康',
  contactEmail: 'contact@fitness.com',
  contactPhone: '12345678901'
})

const basicRules = {
  siteName: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
  siteDomain: [{ required: true, message: '请输入网站域名', trigger: 'blur' }],
  siteDescription: [{ required: true, message: '请输入网站描述', trigger: 'blur' }],
  siteKeywords: [{ required: true, message: '请输入网站关键词', trigger: 'blur' }],
  contactEmail: [{ required: true, message: '请输入联系邮箱', trigger: 'blur' }],
  contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
}

// 邮件配置
const emailConfig = ref({
  smtpServer: 'smtp.qq.com',
  smtpPort: '465',
  senderEmail: 'sender@fitness.com',
  senderPassword: 'password'
})

const emailRules = {
  smtpServer: [{ required: true, message: '请输入SMTP服务器地址', trigger: 'blur' }],
  smtpPort: [{ required: true, message: '请输入SMTP端口', trigger: 'blur' }],
  senderEmail: [{ required: true, message: '请输入发件人邮箱', trigger: 'blur' }],
  senderPassword: [{ required: true, message: '请输入发件人密码', trigger: 'blur' }]
}

// 安全配置
const securityConfig = ref({
  loginFailLimit: '5',
  loginLockTime: '30',
  passwordComplexity: 'medium'
})

const securityRules = {
  loginFailLimit: [{ required: true, message: '请输入登录失败次数限制', trigger: 'blur' }],
  loginLockTime: [{ required: true, message: '请输入登录锁定时间', trigger: 'blur' }],
  passwordComplexity: [{ required: true, message: '请选择密码复杂度要求', trigger: 'change' }]
}

// 表单引用
const basicForm = ref(null)
const emailForm = ref(null)
const securityForm = ref(null)

// 保存基本配置
const saveBasicConfig = () => {
  // 模拟保存，实际项目中需要调用后端API
  console.log('保存基本配置:', basicConfig.value)
  alert('基本配置保存成功！')
}

// 保存邮件配置
const saveEmailConfig = () => {
  // 模拟保存，实际项目中需要调用后端API
  console.log('保存邮件配置:', emailConfig.value)
  alert('邮件配置保存成功！')
}

// 保存安全配置
const saveSecurityConfig = () => {
  // 模拟保存，实际项目中需要调用后端API
  console.log('保存安全配置:', securityConfig.value)
  alert('安全配置保存成功！')
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
.config-container {
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
  max-width: 1400px;
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
  gap: 20px;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
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

/* 系统配置内容 */
.config-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.config-content h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>