<template>
  <div class="auth-page">
    <div class="auth-card">
      <router-link to="/home" class="fp-logo">
        <img src="/logo.png" alt="Logo" />
        <span>菜头健身</span>
      </router-link>

      <h2>忘记密码</h2>
      <p class="fp-sub">输入注册邮箱，我们将发送重置链接</p>

      <el-form ref="formRef" :model="form" :rules="rules" @keyup.enter="handleSubmit">
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入注册邮箱"
            prefix-icon="Message"
            size="large"
          />
        </el-form-item>

        <el-button type="primary" size="large" class="submit-btn" @click="handleSubmit" :loading="loading">
          {{ loading ? '发送中...' : '发送重置链接' }}
        </el-button>

        <div v-if="error" class="form-error">{{ error }}</div>
        <div v-if="success" class="form-success">{{ success }}</div>

        <div class="form-switch">
          <router-link to="/login">← 返回登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Message } from '@element-plus/icons-vue'
import { forgotPassword as apiForgot } from '@/services/auth.js'

const loading = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({ email: '' })
const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

async function handleSubmit() {
  error.value = ''; success.value = ''
  if (!form.email) { error.value = '请输入邮箱'; return }

  loading.value = true
  try {
    await apiForgot(form.email)
    success.value = '重置链接已发送，请检查邮箱（如未收到请查看垃圾箱）'
  } catch (e) {
    error.value = e.message || '发送失败，请稍后重试'
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
.auth-card {
  width: 100%; max-width: 420px; background: var(--color-bg-card);
  border-radius: var(--radius-xl); padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.06);
}

.fp-logo {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  text-decoration: none; margin-bottom: 32px;
}
.fp-logo img { height: 36px; }
.fp-logo span { font-size: 22px; font-weight: 800; color: var(--color-primary); font-family: var(--font-display); }

h2 { font-size: 24px; font-weight: 700; color: var(--color-text-primary); text-align: center; margin: 0 0 8px; font-family: var(--font-display); }
.fp-sub { font-size: 14px; color: var(--color-text-tertiary); text-align: center; margin: 0 0 28px; }

.submit-btn {
  width: 100%; height: 48px; border-radius: var(--radius-md); font-size: 16px; font-weight: 600;
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  border: none; box-shadow: 0 4px 16px rgba(27,107,58,0.2);
}
.submit-btn:hover { transform: translateY(-1px); }

.form-error { margin-top: 12px; padding: 10px 14px; border-radius: var(--radius-md); background: #FEF2F2; color: #DC2626; font-size: 13px; text-align: center; }
.form-success { margin-top: 12px; padding: 10px 14px; border-radius: var(--radius-md); background: #F0FDF4; color: #16A34A; font-size: 13px; text-align: center; }

.form-switch { text-align: center; margin-top: 24px; }
.form-switch a { color: var(--color-text-secondary); font-size: 14px; text-decoration: none; }
.form-switch a:hover { color: var(--color-primary); }
</style>
