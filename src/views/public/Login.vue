<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-header">
        <h2>健身资讯网站</h2>
        <p>欢迎回来，请登录您的账号</p>
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="login-form-content">
        <el-form-item prop="username" class="form-item">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            class="input-with-icon"
          />
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <el-input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            class="input-with-icon"
          >
            <template #append>
              <el-button @click="passwordVisible = !passwordVisible" class="password-toggle">
                <i :class="passwordVisible ? 'el-icon-view' : 'el-icon-view-off'"></i>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item remember-item">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <el-link type="primary" class="forgot-password" @click="toForgotPassword">忘记密码？</el-link>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" @click="login" class="login-btn">登录</el-button>
        </el-form-item>
        <el-form-item class="form-item register-link">
          <span>还没有账号？</span>
          <el-link type="primary" @click="toRegister">立即注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { mockLogin } from '../../services/auth.js'

const router = useRouter()
const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const passwordVisible = ref(false)

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loginFormRef = ref(null)

const login = async () => {
  try {
    // 调用模拟登录接口
    const response = await mockLogin(loginForm.value.username, loginForm.value.password)
    // 登录成功
    ElMessage.success('登录成功')
    // 根据不同角色跳转到不同页面
    const userRole = response.data.user.role
    if (userRole === 'admin') {
      // 管理员登录，跳转到后台管理页面
      router.push('/admin/dashboard')
    } else {
      // 普通用户登录，跳转到首页
      router.push('/home')
    }
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
  }
}

const reset = () => {
  loginForm.value = {
    username: '',
    password: '',
    remember: false
  }
}

const toRegister = () => {
  router.push('/register')
}

const toForgotPassword = () => {
  router.push('/forgot-password')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-form {
  width: 100%;
  max-width: 420px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.login-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 30px;
  text-align: center;
  color: white;
}

.login-header h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: 600;
}

.login-header p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.login-form-content {
  padding: 30px;
}

.form-item {
  margin-bottom: 20px;
}

.input-with-icon {
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
}

.input-with-icon:hover {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.input-with-icon:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.password-toggle {
  padding: 0 10px;
  color: #909399;
}

.remember-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  font-size: 14px;
}

.login-btn {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link span {
  font-size: 14px;
  color: #606266;
}

.register-link .el-link {
  font-size: 14px;
  color: #667eea;
}

/* 确保输入框文本可见 */
.el-input__inner {
  color: #000 !important;
  font-size: 14px;
  height: 44px;
  line-height: 44px;
}

/* 确保密码输入框的文本可见 */
.el-input--password .el-input__inner {
  color: #000 !important;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-form {
    margin: 0 10px;
  }
  
  .login-header {
    padding: 30px 20px;
  }
  
  .login-form-content {
    padding: 20px;
  }
}
</style>