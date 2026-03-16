<template>
  <div class="register-container">
    <div class="register-form">
      <h2>注册账号</h2>
      <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="registerForm.role" placeholder="请选择角色">
            <el-option label="健身爱好者" value="user"></el-option>
            <el-option label="教练" value="coach"></el-option>
            <el-option label="内容创作者" value="creator"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" class="register-btn">注册</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <span>已有账号？</span>
          <el-link type="primary" @click="toLogin">立即登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { mockRegister } from '../../services/auth.js'

const router = useRouter()
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: 'user'
})

const registerRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== registerForm.value.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }, trigger: 'blur' }
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

const registerFormRef = ref(null)

const register = async () => {
  try {
    // 调用模拟注册接口
    console.log('注册信息:', registerForm.value)
    const response = await mockRegister(registerForm.value)
    // 注册成功
    console.log('注册成功:', response)
    ElMessage.success(response.data.message)
    // 跳转到登录页
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    console.error('注册失败:', error)
    ElMessage.error('注册失败，请稍后重试')
  }
}

const reset = () => {
  registerForm.value = {
    username: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  }
}

const toLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.register-form {
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.register-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #1890ff;
}

.register-btn {
  width: 100%;
}

/* 确保输入框文本可见 */
.el-input__inner {
  color: #000 !important;
}

/* 确保密码输入框的文本可见 */
.el-input--password .el-input__inner {
  color: #000 !important;
}
</style>