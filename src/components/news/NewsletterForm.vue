<template>
  <div class="newsletter-card">
    <h4 class="nl-title">📧 订阅精选资讯</h4>
    <p class="nl-desc">每周精选 5 篇最值得读的健身科学文章，直接发送到你的邮箱。</p>
    <form class="nl-form" @submit.prevent="subscribe">
      <input
        v-model="email"
        type="email"
        placeholder="your@email.com"
        class="nl-input"
        required
        :disabled="submitting"
      />
      <button type="submit" class="nl-btn" :disabled="submitting || success">
        {{ success ? '✓ 已订阅' : submitting ? '订阅中...' : '订阅' }}
      </button>
    </form>
    <p v-if="error" class="nl-error">{{ error }}</p>
    <p v-if="success" class="nl-success">🎉 订阅成功！请查看邮箱确认。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const submitting = ref(false)
const success = ref(false)
const error = ref('')

async function subscribe() {
  if (!email.value || submitting.value) return
  submitting.value = true
  error.value = ''
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || '订阅失败')
    }
    success.value = true
    email.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : '订阅失败，请稍后重试'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.newsletter-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  color: #fff;
}
.nl-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: var(--space-2);
}
.nl-desc {
  font-size: var(--text-sm);
  color: var(--color-primary-100);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}
.nl-form {
  display: flex;
  gap: var(--space-2);
}
.nl-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: var(--text-sm);
  font-family: var(--font-body);
  outline: none;
  transition: all 0.2s;
}
.nl-input::placeholder { color: rgba(255,255,255,0.5); }
.nl-input:focus {
  background: rgba(255,255,255,0.25);
  border-color: rgba(255,255,255,0.5);
}
.nl-btn {
  padding: 10px 20px;
  border-radius: var(--radius-md);
  border: none;
  background: #fff;
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
  white-space: nowrap;
}
.nl-btn:hover:not(:disabled) { background: var(--color-primary-50); }
.nl-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.nl-error { font-size: var(--text-xs); color: #FCA5A5; margin-top: var(--space-2); }
.nl-success { font-size: var(--text-xs); color: #86EFAC; margin-top: var(--space-2); }
</style>
