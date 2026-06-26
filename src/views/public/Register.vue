<template>
  <div class="auth-page">
    <div class="auth-wrapper">
      <div class="auth-brand">
        <div class="brand-bg"></div>
        <div class="brand-content">
          <router-link to="/home" class="brand-logo">
            <img src="/logo.png" alt="Logo" />
            <span>躯造</span>
          </router-link>
          <h1>加入健身社区</h1>
          <p class="brand-desc">获取专业训练计划 · 记录饮食数据 · AI智能指导</p>
        </div>
      </div>

      <div class="auth-form">
        <div class="form-inner">
          <h2>创建账号</h2>
          <p class="form-sub">注册成为 躯造 会员</p>

          <el-form ref="formRef" :model="form" :rules="rules" @keyup.enter="handleRegister">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="用户名（4-20位字母数字）" prefix-icon="User" size="large" />
            </el-form-item>

            <el-form-item prop="email">
              <el-input v-model="form.email" placeholder="邮箱地址" prefix-icon="Message" size="large" />
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" placeholder="密码（至少6位）" prefix-icon="Lock" size="large" />
            </el-form-item>

            <el-form-item prop="confirmPassword">
              <el-input v-model="form.confirmPassword" type="password" placeholder="确认密码" prefix-icon="Lock" size="large" />
            </el-form-item>

            <el-button type="primary" size="large" class="submit-btn" @click="handleRegister" :loading="loading">
              {{ loading ? '注册中...' : '注 册' }}
            </el-button>

            <div v-if="error" class="form-error">{{ error }}</div>
            <div v-if="success" class="form-success">{{ success }}</div>

            <div class="form-switch">
              已有账号？<router-link to="/login">立即登录</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { register as apiRegister, mockRegister } from '@/services/auth.js'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateUsername = (rule, value, callback) => {
  if (!value) return callback(new Error('请输入用户名'))
  if (value.length < 2 || value.length > 20) return callback(new Error('用户名2-20个字符'))
  if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) return callback(new Error('用户名只能包含字母、数字、下划线和中文'))
  callback()
}

const rules = {
  username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) callback(new Error('两次密码不一致'))
        else callback()
      },
      trigger: 'blur'
    }
  ]
}

async function handleRegister() {
  error.value = ''; success.value = ''

  if (!form.username || !form.email || !form.password || !form.confirmPassword) {
    error.value = '请填写所有字段'
    return
  }
  if (form.password !== form.confirmPassword) {
    error.value = '两次密码不一致'
    return
  }

  loading.value = true
  try {
    try {
      await apiRegister({
        username: form.username,
        email: form.email,
        password: form.password,
        role: 'user'
      })
      success.value = '注册成功！即将跳转到登录页...'
      ElMessage.success('注册成功')
      setTimeout(() => router.push('/login'), 1500)
    } catch (apiErr) {
      // In dev mode without backend, fallback to mock
      if (import.meta.env.DEV) {
        await mockRegister(form)
        success.value = '注册成功（开发模式）！即将跳转到登录页...'
        setTimeout(() => router.push('/login'), 1500)
      } else {
        throw apiErr
      }
    }
  } catch (e) {
    error.value = e.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
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

.auth-form {
  flex: 0 0 440px; display: flex; align-items: center; justify-content: center;
  padding: 48px 48px; background: var(--color-bg-card);
}
.form-inner { width: 100%; }
.form-inner h2 { font-size: 26px; font-weight: 700; color: var(--color-text-primary); margin: 0 0 4px; font-family: var(--font-display); }
.form-sub { font-size: 14px; color: var(--color-text-tertiary); margin: 0 0 28px; }

.submit-btn {
  width: 100%; height: 48px; border-radius: var(--radius-md); font-size: 16px; font-weight: 600;
  letter-spacing: 2px; border: none; margin-top: 4px;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  box-shadow: 0 4px 16px rgba(27,107,58,0.2);
}
.submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(27,107,58,0.3); }

.form-error { margin-top: 12px; padding: 10px 14px; border-radius: var(--radius-md); background: #FEF2F2; color: #DC2626; font-size: 13px; text-align: center; }
.form-success { margin-top: 12px; padding: 10px 14px; border-radius: var(--radius-md); background: #F0FDF4; color: #16A34A; font-size: 13px; text-align: center; }

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
