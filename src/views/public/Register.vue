<template>
  <div class="register-page">
    <div class="register-wrapper">
      <!-- 左侧品牌区 -->
      <div class="register-banner">
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <router-link to="/home" class="banner-logo">
            <img src="/logo.png" alt="Logo" />
            <span>FitNews</span>
          </router-link>
          <h1>健身资讯网站</h1>
          <p class="banner-subtitle">专业 · 科学 · 前沿</p>
          <div class="banner-quote">
            <p>"加入我们，开启<br/>科学健身之旅。"</p>
          </div>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="register-form-panel">
        <div class="form-scroll">
          <div class="form-header">
            <h2>创建账号</h2>
            <p>注册成为健身社区的一员</p>
          </div>

          <el-form
            :model="registerForm"
            :rules="registerRules"
            ref="registerFormRef"
            class="register-form-content"
          >
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
                prefix-icon="User"
                size="large"
                class="custom-input"
              />
            </el-form-item>

            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                placeholder="请输入邮箱"
                prefix-icon="Message"
                size="large"
                class="custom-input"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                size="large"
                class="custom-input"
              />
            </el-form-item>

            <el-form-item prop="confirmPassword">
              <el-input
                type="password"
                v-model="registerForm.confirmPassword"
                placeholder="请确认密码"
                prefix-icon="Lock"
                size="large"
                class="custom-input"
              />
            </el-form-item>

            <el-form-item prop="role">
              <el-select
                v-model="registerForm.role"
                placeholder="请选择身份"
                size="large"
                class="custom-select"
              >
                <el-option label="🏃 健身爱好者" value="user" />
                <el-option label="🎯 教练" value="coach" />
                <el-option label="✏️ 内容创作者" value="creator" />
              </el-select>
            </el-form-item>

            <el-button
              type="primary"
              size="large"
              class="register-btn"
              @click="register"
              :loading="loading"
            >
              {{ loading ? '注册中...' : '注 册' }}
            </el-button>

            <div class="form-footer">
              <span>已有账号？</span>
              <el-link type="primary" :underline="false" @click="toLogin">
                立即登录
              </el-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { mockRegister } from '../../services/auth.js'

const router = useRouter()
const loading = ref(false)

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user'
})

const registerRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
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
  role: [{ required: true, message: '请选择身份', trigger: 'change' }]
}

const registerFormRef = ref(null)

const register = async () => {
  try {
    loading.value = true
    const response = await mockRegister(registerForm.value)
    ElMessage.success(response.data.message)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    ElMessage.error('注册失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const toLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0e17;
  padding: 24px;
}

.register-wrapper {
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 640px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 120px rgba(24, 144, 255, 0.08);
  background: #fff;
}

/* ========== 左侧品牌区 ========== */
.register-banner {
  flex: 1;
  position: relative;
  background:
    linear-gradient(160deg, #0d1b2a 0%, #1b2838 30%, #0a1628 60%, #0d2137 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 50px;
  overflow: hidden;
}

.register-banner::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(24, 144, 255, 0.12) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}

.register-banner::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -40px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(24, 144, 255, 0.08) 0%, transparent 70%);
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(15px, -15px) scale(1.05); }
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.015) 2px,
      rgba(255, 255, 255, 0.015) 4px
    );
  pointer-events: none;
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
}

.banner-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 32px;
}

.banner-logo img {
  height: 48px;
  width: auto;
  filter: drop-shadow(0 0 16px rgba(24, 144, 255, 0.4));
}

.banner-logo span {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #1890ff 0%, #69c0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.banner-content h1 {
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: 4px;
  color: #e8edf2;
}

.banner-subtitle {
  font-size: 15px;
  letter-spacing: 8px;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 48px 0;
}

.banner-quote {
  border-left: 3px solid rgba(24, 144, 255, 0.5);
  padding-left: 20px;
  text-align: left;
}

.banner-quote p {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  letter-spacing: 2px;
}

/* ========== 右侧表单区 ========== */
.register-form-panel {
  flex: 0 0 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 56px;
  background: #fff;
}

.form-scroll {
  width: 100%;
}

.form-header {
  margin-bottom: 36px;
}

.form-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.form-header p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.register-form-content {
  width: 100%;
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 10px;
  border: 1px solid #e8ecf1;
  box-shadow: none;
  transition: all 0.3s ease;
  background: #f8fafc;
  padding: 4px 12px;
}

.custom-input :deep(.el-input__wrapper:hover) {
  border-color: #69b1ff;
  background: #fafbfd;
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  border-color: #1890ff;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.08);
  background: #fff;
}

.custom-input :deep(.el-input__inner) {
  color: #1a1a2e !important;
  font-size: 15px;
}

.custom-input :deep(.el-input__prefix) {
  color: #b0b8c1;
}

.custom-select :deep(.el-input__wrapper) {
  border-radius: 10px;
  border: 1px solid #e8ecf1;
  box-shadow: none;
  transition: all 0.3s ease;
  background: #f8fafc;
  padding: 4px 12px;
}

.custom-select :deep(.el-input__wrapper:hover) {
  border-color: #69b1ff;
  background: #fafbfd;
}

.custom-select :deep(.el-input__wrapper.is-focus) {
  border-color: #1890ff;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.08);
  background: #fff;
}

.register-btn {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(24, 144, 255, 0.25);
  margin-top: 4px;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(24, 144, 255, 0.4);
}

.register-btn:active {
  transform: translateY(0);
}

.form-footer {
  text-align: center;
  margin-top: 28px;
  font-size: 14px;
  color: #909399;
}

.form-footer .el-link {
  font-size: 14px;
  margin-left: 4px;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .register-page {
    padding: 0;
  }

  .register-wrapper {
    flex-direction: column;
    border-radius: 0;
    min-height: 100vh;
  }

  .register-banner {
    flex: none;
    padding: 40px 30px;
  }

  .banner-quote {
    display: none;
  }

  .banner-content h1 {
    font-size: 24px;
    letter-spacing: 2px;
  }

  .register-form-panel {
    flex: 1;
    padding: 40px 28px;
    max-width: 100%;
  }

  .form-header h2 {
    font-size: 24px;
  }
}
</style>
