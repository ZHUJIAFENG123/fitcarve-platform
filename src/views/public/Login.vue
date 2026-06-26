<template>
  <div class="auth-page">
    <div class="auth-wrapper">
      <!-- 左侧品牌 -->
      <div class="auth-brand">
        <div class="brand-bg"></div>
        <div class="brand-content">
          <router-link to="/home" class="brand-logo">
            <img src="/logo.png" alt="Logo" />
            <span>FitNews</span>
          </router-link>
          <h1>科学健身，从这里开始</h1>
          <p class="brand-desc">专业训练计划 · 循证健身资讯 · AI智能助手</p>
        </div>
      </div>

      <!-- 右侧表单 -->
      <div class="auth-form">
        <div class="form-inner">
          <h2>欢迎回来</h2>
          <p class="form-sub">登录你的账号</p>

          <el-form ref="formRef" :model="form" :rules="rules" @keyup.enter="handleLogin">
            <!-- Tab: 用户名 / 邮箱 -->
            <div class="login-tabs">
              <button :class="{ active: loginMode === 'username' }" @click="loginMode = 'username'" type="button">用户名</button>
              <button :class="{ active: loginMode === 'email' }" @click="loginMode = 'email'" type="button">邮箱</button>
            </div>

            <el-form-item prop="account">
              <el-input
                v-model="form.account"
                :placeholder="loginMode === 'email' ? '请输入邮箱' : '请输入用户名'"
                prefix-icon="User"
                size="large"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                :type="showPwd ? 'text' : 'password'"
                placeholder="请输入密码"
                prefix-icon="Lock"
                size="large"
              >
                <template #suffix>
                  <span class="pwd-toggle" @click="showPwd = !showPwd">{{ showPwd ? '🙈' : '👁' }}</span>
                </template>
              </el-input>
            </el-form-item>

            <div class="form-extra">
              <el-checkbox v-model="form.remember" label="记住我" size="small" />
              <router-link to="/forgot-password" class="forgot-link">忘记密码？</router-link>
            </div>

            <el-button type="primary" size="large" class="submit-btn" @click="handleLogin" :loading="loading">
              {{ loading ? '登录中...' : '登 录' }}
            </el-button>

            <div v-if="error" class="form-error">{{ error }}</div>

            <div class="form-switch">
              还没有账号？<router-link to="/register">立即注册</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { login, loginByEmail, saveSession, mockLogin } from '@/services/auth.js'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref('')
const showPwd = ref(false)
const loginMode = ref('username')

const form = reactive({
  account: '',
  password: '',
  remember: false
})

const rules = {
  account: [{ required: true, message: '请输入用户名或邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleLogin() {
  error.value = ''
  if (!form.account || !form.password) {
    error.value = '请填写完整信息'
    return
  }

  loading.value = true
  try {
    let data
    // Try real API first
    try {
      data = loginMode.value === 'email'
        ? await loginByEmail(form.account, form.password)
        : await login(form.account, form.password)
    } catch {
      // Fallback to mock
      if (import.meta.env.DEV) {
        data = await mockLogin(form.account, form.password)
      } else {
        throw new Error('登录失败，请检查用户名和密码')
      }
    }

    saveSession(data)
    if (form.remember) {
      localStorage.setItem('rememberedAccount', form.account)
    }

    ElMessage.success('登录成功')

    const redirect = route.query.redirect || '/home'
    router.push(redirect)
  } catch (e) {
    error.value = e.message || '登录失败'
  } finally {
    loading.value = false
  }
}

// Pre-fill remembered account
const remembered = localStorage.getItem('rememberedAccount')
if (remembered) {
  form.account = remembered
  form.remember = true
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: var(--color-bg); padding: 24px;
}
.auth-wrapper {
  display: flex; width: 100%; max-width: 960px; min-height: 600px;
  border-radius: var(--radius-xl); overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.06); background: var(--color-bg-card);
}

/* Brand */
.auth-brand {
  flex: 1; position: relative; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(160deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, #238B4D 100%);
  padding: 60px 40px; overflow: hidden;
}
.brand-bg {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(249,115,22,0.06) 0%, transparent 40%);
}
.brand-content { position: relative; z-index: 1; text-align: center; color: #fff; }
.brand-logo { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; margin-bottom: 36px; }
.brand-logo img { height: 44px; }
.brand-logo span { font-size: 24px; font-weight: 800; color: #fff; font-family: var(--font-display); }
.brand-content h1 { font-size: 26px; font-weight: 700; margin: 0 0 12px; font-family: var(--font-display); }
.brand-desc { font-size: 14px; color: var(--color-primary-100); line-height: 1.6; }

/* Form */
.auth-form {
  flex: 0 0 440px; display: flex; align-items: center; justify-content: center;
  padding: 48px 48px; background: var(--color-bg-card);
}
.form-inner { width: 100%; }
.form-inner h2 { font-size: 26px; font-weight: 700; color: var(--color-text-primary); margin: 0 0 4px; font-family: var(--font-display); }
.form-sub { font-size: 14px; color: var(--color-text-tertiary); margin: 0 0 28px; }

.login-tabs { display: flex; gap: 0; margin-bottom: 20px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light); overflow: hidden; }
.login-tabs button {
  flex: 1; padding: 8px; border: none; background: var(--color-bg-card); color: var(--color-text-secondary);
  font-size: 13px; cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
}
.login-tabs button.active { background: var(--color-primary); color: #fff; font-weight: 600; }

.pwd-toggle { cursor: pointer; font-size: 16px; user-select: none; }

.form-extra { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.forgot-link { font-size: 13px; color: var(--color-primary); text-decoration: none; }
.forgot-link:hover { text-decoration: underline; }

.submit-btn {
  width: 100%; height: 48px; border-radius: var(--radius-md); font-size: 16px; font-weight: 600;
  letter-spacing: 2px; border: none;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  box-shadow: 0 4px 16px rgba(27,107,58,0.2);
}
.submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(27,107,58,0.3); }

.form-error { margin-top: 12px; padding: 10px 14px; border-radius: var(--radius-md); background: #FEF2F2; color: #DC2626; font-size: 13px; text-align: center; }

.form-switch { text-align: center; margin-top: 24px; font-size: 14px; color: var(--color-text-secondary); }
.form-switch a { color: var(--color-primary); font-weight: 600; text-decoration: none; margin-left: 4px; }
.form-switch a:hover { text-decoration: underline; }

@media (max-width: 700px) {
  .auth-wrapper { flex-direction: column; }
  .auth-brand { flex: none; padding: 36px 24px; }
  .auth-brand h1 { font-size: 20px; }
  .auth-form { padding: 32px 24px; }
}
</style>
