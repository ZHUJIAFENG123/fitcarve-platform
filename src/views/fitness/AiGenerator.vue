<template>
  <div class="aigen-page">
    <Navbar :menu-links="menuLinks" />

    <div class="aigen-hero">
      <h1>🤖 AI 训练计划生成器</h1>
      <p>告诉AI你的目标，秒级生成个性化训练计划</p>
    </div>

    <div class="aigen-container">
      <!-- 表单 -->
      <div class="aigen-form-card">
        <div class="aigen-form-grid">
          <div class="aigen-field">
            <label>🎯 训练目标</label>
            <select v-model="form.goal" class="aigen-select">
              <option value="增肌">增肌</option>
              <option value="减脂">减脂</option>
              <option value="耐力提升">耐力提升</option>
              <option value="柔韧与活动度">柔韧与活动度</option>
              <option value="综合体能">综合体能</option>
            </select>
          </div>
          <div class="aigen-field">
            <label>📊 训练水平</label>
            <select v-model="form.level" class="aigen-select">
              <option value="初级">初级（< 6个月）</option>
              <option value="中级">中级（6个月-2年）</option>
              <option value="高级">高级（2年以上）</option>
            </select>
          </div>
          <div class="aigen-field">
            <label>📅 训练周期</label>
            <select v-model.number="form.weeks" class="aigen-select">
              <option :value="4">4周</option>
              <option :value="6">6周</option>
              <option :value="8">8周</option>
              <option :value="12">12周</option>
            </select>
          </div>
          <div class="aigen-field">
            <label>📆 每周几天</label>
            <select v-model.number="form.daysPerWeek" class="aigen-select">
              <option :value="3">3天</option>
              <option :value="4">4天</option>
              <option :value="5">5天</option>
              <option :value="6">6天</option>
            </select>
          </div>
          <div class="aigen-field aigen-field--wide">
            <label>🏋️ 可用器材</label>
            <input v-model="form.equipment" class="aigen-input" placeholder="如：哑铃、杠铃、弹力带、龙门架（可留空）" />
          </div>
          <div class="aigen-field aigen-field--wide">
            <label>📝 特殊要求</label>
            <textarea v-model="form.notes" class="aigen-textarea" placeholder="如：膝盖有旧伤避免深蹲、想重点练背和肩、只有30分钟训练时间..." rows="3"></textarea>
          </div>
        </div>

        <button class="aigen-btn" @click="generate" :disabled="loading">
          {{ loading ? '🤖 AI 生成中...' : '✨ AI 生成训练计划' }}
        </button>
        <p v-if="mockMode" class="aigen-mock-note">💡 当前为离线模拟模式。配置 AI_API_KEY 后可获得更个性化的计划。</p>
      </div>

      <!-- 结果 -->
      <div v-if="result" class="aigen-result">
        <div class="aigen-result-header">
          <h2>📋 生成结果</h2>
          <div class="aigen-result-actions">
            <button class="aigen-action-btn" @click="copyPlan">📋 复制</button>
            <button class="aigen-action-btn aigen-action-btn--primary" @click="savePlan">💾 保存到我的计划</button>
          </div>
        </div>
        <div class="aigen-result-body" v-html="renderMarkdown(result)"></div>
      </div>

      <!-- Error -->
      <div v-if="error" class="aigen-error">
        <p>{{ error }}</p>
        <button class="aigen-btn" @click="generate">重试</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { ElMessage } from 'element-plus'

const API = import.meta.env.VITE_API_BASE_URL || '/api'
const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现' }
]

const form = reactive({
  goal: '增肌', level: '初级', weeks: 4, daysPerWeek: 4,
  equipment: '', notes: ''
})

const loading = ref(false)
const result = ref('')
const error = ref('')
const mockMode = ref(false)

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/### (.*)/g, '<h4>$1</h4>')
    .replace(/## (.*)/g, '<h3>$1</h3>')
    .replace(/# (.*)/g, '<h2>$1</h2>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/- (.*)/g, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, (m) => `<ul>${m}</ul>`)
    .replace(/<br><ul>/g, '<ul>')
    .replace(/---+/g, '<hr>')
    .replace(/^(.+)$/gm, (m) => m.startsWith('<') ? m : `<p>${m}</p>`)
    .replace(/<p><\/p>/g, '')
}

async function generate() {
  loading.value = true; error.value = ''; result.value = ''
  try {
    const res = await fetch(`${API}/ai/generate-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    result.value = data.plan
    mockMode.value = data.mockMode
  } catch (e) {
    error.value = e.message || '生成失败'
  } finally { loading.value = false }
}

function copyPlan() {
  navigator.clipboard.writeText(result.value.replace(/<[^>]+>/g, ''))
  ElMessage.success('已复制到剪贴板')
}

function savePlan() {
  localStorage.setItem('aiGeneratedPlan', result.value)
  ElMessage.success('已保存到本地！将在后续版本支持直接保存到训练计划库')
}
</script>

<style scoped>
.aigen-page { min-height: 100vh; background: var(--color-bg); }
.aigen-hero { background: linear-gradient(135deg, #7C3AED, #5B21B6); padding: var(--space-10) var(--space-4); text-align: center; }
.aigen-hero h1 { font-family: var(--font-display); font-size: var(--text-3xl); color: #fff; font-weight: 800; }
.aigen-hero p { color: #DDD6FE; margin-top: var(--space-2); }
.aigen-container { max-width: 800px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

.aigen-form-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-6); box-shadow: var(--shadow-md);
}
.aigen-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-5); }
.aigen-field { display: flex; flex-direction: column; gap: var(--space-1); }
.aigen-field--wide { grid-column: span 2; }
.aigen-field label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); }
.aigen-select, .aigen-input, .aigen-textarea {
  padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light);
  background: var(--color-surface); font-size: var(--text-sm); font-family: var(--font-body);
  color: var(--color-text-primary); outline: none; resize: vertical;
}
.aigen-select:focus, .aigen-input:focus, .aigen-textarea:focus { border-color: #7C3AED; }
.aigen-btn {
  width: 100%; padding: 14px; border-radius: var(--radius-lg); border: none;
  background: linear-gradient(135deg, #7C3AED, #5B21B6); color: #fff; font-weight: 700;
  font-size: var(--text-base); cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
}
.aigen-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.aigen-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.aigen-mock-note { text-align: center; font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: var(--space-3); }

.aigen-result { margin-top: var(--space-6); }
.aigen-result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); }
.aigen-result-header h2 { font-family: var(--font-display); font-size: var(--text-xl); }
.aigen-result-actions { display: flex; gap: var(--space-2); }
.aigen-action-btn {
  padding: 8px 16px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light);
  background: var(--color-bg-card); font-size: var(--text-sm); cursor: pointer; font-family: var(--font-body);
}
.aigen-action-btn--primary { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.aigen-result-body {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-6);
  font-size: var(--text-sm); line-height: var(--leading-relaxed); white-space: pre-wrap;
}
.aigen-result-body :deep(h2) { font-size: var(--text-xl); margin: var(--space-4) 0 var(--space-3); }
.aigen-result-body :deep(h3) { font-size: var(--text-lg); margin: var(--space-3) 0; color: var(--color-primary); }
.aigen-result-body :deep(ul) { padding-left: var(--space-4); }
.aigen-result-body :deep(li) { margin-bottom: var(--space-1); }
.aigen-result-body :deep(strong) { color: var(--color-accent); }

.aigen-error { text-align: center; padding: var(--space-10); color: var(--state-error); }

@media (max-width: 600px) {
  .aigen-form-grid { grid-template-columns: 1fr; }
  .aigen-field--wide { grid-column: span 1; }
}
</style>
