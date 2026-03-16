<template>
  <div class="forgot-password-container">
    <div class="forgot-password-form">
      <h2>忘记密码</h2>
      <el-form :model="forgotForm" :rules="forgotRules" ref="forgotFormRef">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="forgotForm.email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForgotPassword" class="submit-btn">发送重置链接</el-button>
          <el-button @click="toLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { mockForgotPassword } from '../../services/auth.js'

const router = useRouter()
const forgotForm = ref({
  email: ''
})

const forgotRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const forgotFormRef = ref(null)

const submitForgotPassword = async () => {
  try {
    // 调用模拟的忘记密码接口
    const response = await mockForgotPassword(forgotForm.value.email)
    // 显示成功消息
    ElMessage.success(response.data.message)
    // 跳转到登录页
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    ElMessage.error('发送重置链接失败，请稍后重试')
  }
}

const toLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.forgot-password-form {
  width: 100%;
  max-width: 420px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 30px;
}

.forgot-password-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #667eea;
}

.submit-btn {
  width: 100%;
  margin-bottom: 10px;
}

/* 确保输入框文本可见 */
.el-input__inner {
  color: #000 !important;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .forgot-password-form {
    margin: 0 10px;
    padding: 20px;
  }
}
</style>
