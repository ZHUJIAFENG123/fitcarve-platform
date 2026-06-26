<template>
  <div class="login-page">
    <div class="login-wrapper">
      <!-- 左侧品牌区 -->
      <div class="login-banner">
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <router-link to="/home" class="banner-logo">
            <img src="/logo.png" alt="Logo" />
            <span>FitNews</span>
          </router-link>
          <h1>健身资讯网站</h1>
          <p class="banner-subtitle">专业 · 科学 · 前沿</p>
          <div class="banner-features">
            <div class="feature-item">
              <span class="feature-icon">📰</span>
              <span>权威健身资讯</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📚</span>
              <span>专业训练课程</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🏋️</span>
              <span>科学运动指导</span>
            </div>
          </div>
          <div class="banner-quote">
            <p>"身体是灵魂的殿堂，<br/>健身是终身的修行。"</p>
          </div>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="login-form-panel">
        <div class="form-scroll">
          <div class="form-header">
            <h2>欢迎回来</h2>
            <p>登录您的账号以继续</p>
          </div>

          <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginFormRef"
            class="login-form-content"
            @keyup.enter="login"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                prefix-icon="User"
                size="large"
                class="custom-input"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                :type="passwordVisible ? 'text' : 'password'"
                v-model="loginForm.password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                size="large"
                class="custom-input"
              >
                <template #suffix>
                  <el-icon
                    class="password-eye"
                    @click="passwordVisible = !passwordVisible"
                  >
                    <View v-if="!passwordVisible" />
                    <Hide v-if="passwordVisible" />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <div class="form-options">
              <el-checkbox v-model="loginForm.remember" class="remember-check">
                记住我
              </el-checkbox>
              <el-link type="primary" :underline="false" @click="toForgotPassword">
                忘记密码？
              </el-link>
            </div>

            <el-button
              type="primary"
              size="large"
              class="login-btn"
              @click="login"
              :loading="loading"
            >
              {{ loading ? '登录中...' : '登 录' }}
            </el-button>

            <div class="form-footer">
              <span>还没有账号？</span>
              <el-link type="primary" :underline="false" @click="toRegister">
                立即注册
              </el-link>
            </div>

            <div class="form-divider">
              <span>测试账号快速登录</span>
            </div>

            <div class="quick-login">
              <el-button
                class="quick-btn"
                @click="quickLogin('user1', '123456')"
              >
                普通用户
              </el-button>
              <el-button
                class="quick-btn"
                @click="quickLogin('coach1', '123456')"
              >
                教练
              </el-button>
              <el-button
                class="quick-btn"
                @click="quickLogin('creator1', '123456')"
              >
                创作者
              </el-button>
              <el-button
                class="quick-btn admin-btn"
                @click="quickLogin('admin', '123456')"
              >
                管理员
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { View, Hide, User, Lock } from '@element-plus/icons-vue'
import { mockLogin } from '../../services/auth.js'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const route = useRoute()

const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const passwordVisible = ref(false)
const loading = ref(false)
const loginFormRef = ref(null)

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const login = async () => {
  try {
    loading.value = true
    const response = await mockLogin(loginForm.value.username, loginForm.value.password)
    ElMessage.success('登录成功')

    const { forceReload } = useNotifications()
    forceReload()

    const userRole = response.data.user.role
    let redirectPath = route.query.redirect || '/home'

    if (!route.query.redirect) {
      if (userRole === 'admin') {
        redirectPath = '/admin/dashboard'
      } else if (userRole === 'creator') {
        redirectPath = '/creator/manage'
      } else if (userRole === 'coach') {
        redirectPath = '/coach/manage'
      }
    }

    window.location.href = redirectPath
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}

const quickLogin = async (username, password) => {
  loginForm.value.username = username
  loginForm.value.password = password
  await login()
}

const toRegister = () => {
  router.push('/register')
}

const toForgotPassword = () => {
  router.push('/forgot-password')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg);
  padding: 24px;
}

.login-wrapper {
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 640px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  background: #fff;
}

/* ========== 左侧品牌区 ========== */
.login-banner {
  flex: 1;
  position: relative;
  background: linear-gradient(160deg, #145230 0%, #1B6B3A 30%, #0F3D24 60%, #145230 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 50px;
  overflow: hidden;
}

.login-banner::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.12) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}

.login-banner::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -40px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%);
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
  filter: drop-shadow(0 0 16px rgba(74, 222, 128, 0.4));
}

.banner-logo span {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #4ADE80 0%, #22C55E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-display);
}

.banner-content h1 {
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: 4px;
  color: #fff;
  font-family: var(--font-display);
}

.banner-subtitle {
  font-size: 15px;
  letter-spacing: 8px;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 48px 0;
}

.banner-features {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 56px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(74, 222, 128, 0.12);
  border-color: rgba(74, 222, 128, 0.3);
  color: #fff;
}

.feature-icon {
  font-size: 20px;
}

.banner-quote {
  border-left: 3px solid rgba(74, 222, 128, 0.5);
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
.login-form-panel {
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
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
  letter-spacing: 1px;
  font-family: var(--font-display);
}

.form-header p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
}

.login-form-content {
  width: 100%;
}

/* 自定义输入框 */
.custom-input :deep(.el-input__wrapper) {
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: none;
  transition: all 0.3s ease;
  background: var(--color-surface);
  padding: 4px 12px;
}

.custom-input :deep(.el-input__wrapper:hover) {
  border-color: var(--color-primary-200);
  background: var(--color-bg);
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(27, 107, 58, 0.08);
  background: #fff;
}

.custom-input :deep(.el-input__inner) {
  color: var(--color-text-primary) !important;
  font-size: 15px;
}

.custom-input :deep(.el-input__prefix) {
  color: var(--color-text-tertiary);
}

.custom-input :deep(.el-input__prefix .el-icon) {
  font-size: 18px;
}

.password-eye {
  cursor: pointer;
  font-size: 18px;
  color: var(--color-text-tertiary);
  transition: color 0.2s;
}

.password-eye:hover {
  color: var(--color-primary);
}

/* 记住我 + 忘记密码 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.remember-check :deep(.el-checkbox__label) {
  font-size: 13px;
  color: var(--color-text-secondary);
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 50px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #238B4D 0%, #1B6B3A 100%);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(27, 107, 58, 0.25);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(27, 107, 58, 0.35);
}

.login-btn:active {
  transform: translateY(0);
}

/* 底部注册链接 */
.form-footer {
  text-align: center;
  margin-top: 28px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.form-footer .el-link {
  font-size: 14px;
  margin-left: 4px;
}

/* 分割线 */
.form-divider {
  display: flex;
  align-items: center;
  margin: 28px 0 20px;
  color: var(--color-text-tertiary);
  font-size: 13px;
}

.form-divider::before,
.form-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border-light);
}

.form-divider span {
  padding: 0 16px;
}

/* 快速登录 */
.quick-login {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.quick-btn {
  border-radius: var(--radius-md);
  font-size: 13px;
  padding: 8px 18px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-warm);
  color: var(--color-text-secondary);
  transition: all 0.25s ease;
}

.quick-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-50);
}

.quick-btn.admin-btn:hover {
  border-color: #DC2626;
  color: #DC2626;
  background: #FEF2F2;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .login-page {
    padding: 0;
  }

  .login-wrapper {
    flex-direction: column;
    border-radius: 0;
    min-height: 100vh;
  }

  .login-banner {
    flex: none;
    padding: 40px 30px;
  }

  .banner-features {
    display: none;
  }

  .banner-quote {
    display: none;
  }

  .banner-content h1 {
    font-size: 24px;
    letter-spacing: 2px;
  }

  .login-form-panel {
    flex: 1;
    padding: 40px 28px;
    max-width: 100%;
  }

  .form-header h2 {
    font-size: 24px;
  }
}
</style>
