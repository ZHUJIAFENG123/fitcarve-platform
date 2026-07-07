<template>
  <div class="ctp-page">
    <Navbar :menu-links="menuLinks" />

    <div class="ctp-container">
      <div class="ctp-header">
        <h1>{{ isEdit ? '✏️ 编辑训练计划' : '📝 创建训练计划' }}</h1>
        <p class="ctp-sub">{{ isEdit ? '修改你的训练计划内容' : '手动创建一个属于你自己的训练计划' }}</p>
      </div>

      <!-- 加载中 -->
      <div v-if="pageLoading" class="ctp-loading">
        <el-skeleton :rows="6" animated />
      </div>

      <template v-else>
        <!-- 基础信息表单 -->
        <div class="ctp-section">
          <h2 class="ctp-section-title">📋 基础信息</h2>
          <div class="ctp-form-grid">
            <div class="ctp-field ctp-field--wide">
              <label>标题 <span class="ctp-required">*</span></label>
              <input v-model="form.title" class="ctp-input" placeholder="如：4周增肌入门计划" />
            </div>
            <div class="ctp-field ctp-field--wide">
              <label>简短描述</label>
              <textarea v-model="form.description" class="ctp-textarea" rows="2" placeholder="一句话介绍这个计划..."></textarea>
            </div>
            <div class="ctp-field">
              <label>训练目标 <span class="ctp-required">*</span></label>
              <select v-model="form.goal" class="ctp-select">
                <option v-for="g in GOALS" :key="g.value" :value="g.value">{{ g.label }}</option>
              </select>
            </div>
            <div class="ctp-field">
              <label>难度等级 <span class="ctp-required">*</span></label>
              <select v-model="form.level" class="ctp-select">
                <option v-for="l in LEVELS" :key="l.value" :value="l.value">{{ l.label }}</option>
              </select>
            </div>
            <div class="ctp-field">
              <label>训练周期（周）<span class="ctp-required">*</span></label>
              <input v-model.number="form.duration_weeks" type="number" min="1" max="52" class="ctp-input" />
            </div>
            <div class="ctp-field">
              <label>每周训练天数 <span class="ctp-required">*</span></label>
              <input v-model.number="form.days_per_week" type="number" min="1" max="7" class="ctp-input" />
            </div>
            <div class="ctp-field ctp-field--wide">
              <label>可用器材</label>
              <input v-model="form.equipment" class="ctp-input" placeholder="如：哑铃、杠铃、自重（可留空）" />
            </div>
            <div class="ctp-field ctp-field--wide">
              <label>封面图 URL</label>
              <input v-model="form.cover_image" class="ctp-input" placeholder="如：https://...（可留空）" />
            </div>
            <div class="ctp-field ctp-field--wide">
              <label>
                <input type="checkbox" v-model="form.is_public" :true-value="1" :false-value="0" />
                公开此计划（其他用户可见）
              </label>
            </div>
          </div>
        </div>

        <!-- syllabus 编辑器 -->
        <div class="ctp-section">
          <div class="ctp-section-head">
            <h2 class="ctp-section-title">📅 训练大纲（Syllabus）</h2>
            <button class="ctp-btn ctp-btn--ghost" @click="initSyllabus" v-if="!form.syllabus.length">
              生成默认大纲
            </button>
          </div>

          <div v-if="!form.syllabus.length" class="ctp-empty-hint">
            <p>还没添加训练大纲，点击上方「生成默认大纲」按你的周期/天数自动生成模板。</p>
          </div>

          <!-- 周列表 -->
          <div v-for="(week, wi) in form.syllabus" :key="wi" class="ctp-week">
            <div class="ctp-week-head">
              <h3>第 {{ week.week }} 周</h3>
              <button class="ctp-mini-btn ctp-mini-btn--danger" @click="removeWeek(wi)">删除周</button>
            </div>

            <div v-for="(day, di) in week.days" :key="di" class="ctp-day">
              <div class="ctp-day-head">
                <span class="ctp-day-num">Day {{ day.day }}</span>
                <input v-model="day.title" class="ctp-input ctp-input--day-title" placeholder="如：全身力量 / 休息" />
                <button class="ctp-mini-btn ctp-mini-btn--danger" @click="removeDay(wi, di)">删除日</button>
              </div>
              <div class="ctp-day-grid">
                <div class="ctp-field">
                  <label>热身</label>
                  <input v-model="day.warmup" class="ctp-input" placeholder="如：跳绳5分钟+动态拉伸" />
                </div>
                <div class="ctp-field">
                  <label>拉伸放松</label>
                  <input v-model="day.cooldown" class="ctp-input" placeholder="如：泡沫轴放松5分钟" />
                </div>
              </div>

              <!-- 动作列表 -->
              <div class="ctp-ex-list">
                <div v-for="(ex, ei) in day.exercises" :key="ei" class="ctp-ex">
                  <div class="ctp-ex-row">
                    <input v-model="ex.name" class="ctp-input ctp-input--ex-name" placeholder="动作名称（如：杠铃深蹲）" />
                    <input v-model.number="ex.sets" type="number" min="1" class="ctp-input ctp-input--ex-num" placeholder="组数" />
                    <input v-model="ex.reps" class="ctp-input ctp-input--ex-num" placeholder="次数（如 8-12 或 30秒）" />
                    <input v-model.number="ex.rest" type="number" min="0" class="ctp-input ctp-input--ex-num" placeholder="休息秒数" />
                    <button class="ctp-mini-btn ctp-mini-btn--danger" @click="removeExercise(wi, di, ei)">✕</button>
                  </div>
                  <input v-model="ex.notes" class="ctp-input ctp-input--ex-notes" placeholder="要领提示（可选）" />
                </div>
              </div>
              <button class="ctp-btn ctp-btn--ghost ctp-btn--sm" @click="addExercise(wi, di)">+ 添加动作</button>
            </div>
            <button class="ctp-btn ctp-btn--ghost ctp-btn--sm" @click="addDay(wi)">+ 添加训练日</button>
          </div>
        </div>

        <!-- 提交 -->
        <div class="ctp-actions">
          <button class="ctp-btn ctp-btn--ghost" @click="$router.back()">取消</button>
          <button class="ctp-btn ctp-btn--primary" @click="submit" :disabled="submitting">
            {{ submitting ? '保存中...' : (isEdit ? '保存修改' : '创建计划') }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import { GOALS, LEVELS } from '@/utils/fitness-constants'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const isEdit = computed(() => !!route.params.id)
const pageLoading = ref(false)
const submitting = ref(false)

const form = reactive({
  title: '',
  description: '',
  goal: 'build_muscle',
  level: 'beginner',
  duration_weeks: 4,
  days_per_week: 4,
  equipment: '',
  cover_image: '',
  is_public: 0,
  syllabus: []
})

function initSyllabus() {
  form.syllabus = []
  for (let w = 1; w <= form.duration_weeks; w++) {
    const days = []
    for (let d = 1; d <= form.days_per_week; d++) {
      days.push({
        day: d,
        title: d === form.days_per_week ? '休息' : `训练日 ${d}`,
        warmup: '5分钟动态热身',
        cooldown: '5分钟静态拉伸',
        exercises: []
      })
    }
    form.syllabus.push({ week: w, days })
  }
}

function addWeek() {
  const nextWeek = form.syllabus.length + 1
  form.syllabus.push({ week: nextWeek, days: [] })
}

function removeWeek(wi) {
  form.syllabus.splice(wi, 1)
  // 重新编号
  form.syllabus.forEach((w, i) => { w.week = i + 1 })
}

function addDay(wi) {
  const week = form.syllabus[wi]
  if (!week) return
  const nextDay = (week.days[week.days.length - 1]?.day || 0) + 1
  week.days.push({
    day: nextDay,
    title: '',
    warmup: '',
    cooldown: '',
    exercises: []
  })
}

function removeDay(wi, di) {
  form.syllabus[wi].days.splice(di, 1)
  // 重新编号
  form.syllabus[wi].days.forEach((d, i) => { d.day = i + 1 })
}

function addExercise(wi, di) {
  form.syllabus[wi].days[di].exercises.push({
    name: '', sets: 3, reps: '8-12', rest: 60, notes: ''
  })
}

function removeExercise(wi, di, ei) {
  form.syllabus[wi].days[di].exercises.splice(ei, 1)
}

function validate() {
  if (!form.title?.trim()) return '请填写标题'
  if (!form.goal) return '请选择训练目标'
  if (!form.level) return '请选择难度等级'
  if (!form.duration_weeks || form.duration_weeks < 1) return '训练周期至少 1 周'
  if (!form.days_per_week || form.days_per_week < 1) return '每周训练天数至少 1 天'
  // 校验 syllabus 中的动作名（如果有动作但 name 为空则提示）
  for (const week of form.syllabus) {
    for (const day of week.days) {
      for (const ex of day.exercises) {
        if (!ex.name?.trim()) return '请补充所有动作的名称，或删除空动作'
      }
    }
  }
  return null
}

async function submit() {
  const err = validate()
  if (err) {
    ElMessage.warning(err)
    return
  }

  submitting.value = true
  try {
    const url = isEdit.value ? `${API}/training/${route.params.id}` : `${API}/training`
    const method = isEdit.value ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        goal: form.goal,
        level: form.level,
        duration_weeks: Number(form.duration_weeks),
        days_per_week: Number(form.days_per_week),
        equipment: form.equipment,
        cover_image: form.cover_image,
        is_public: Number(form.is_public),
        syllabus: form.syllabus
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || data.error || `保存失败 (${res.status})`)
    ElMessage.success(isEdit.value ? '修改成功' : '创建成功')
    const planId = isEdit.value ? route.params.id : data.id
    router.push(`/fitness/training/${planId}`)
  } catch (e) {
    ElMessage.error(e.message || '保存失败')
  } finally {
    submitting.value = false
  }
}

async function loadPlan() {
  if (!isEdit.value) {
    // 创建模式：默认生成大纲
    initSyllabus()
    return
  }

  pageLoading.value = true
  try {
    const res = await fetch(`${API}/training/${route.params.id}`)
    if (!res.ok) throw new Error(`加载失败 (${res.status})`)
    const data = await res.json()
    // 填充表单
    form.title = data.title || ''
    form.description = data.description || ''
    form.goal = data.goal || 'build_muscle'
    form.level = data.level || 'beginner'
    form.duration_weeks = data.duration_weeks || 4
    form.days_per_week = data.days_per_week || 4
    form.equipment = data.equipment || ''
    form.cover_image = data.cover_image || ''
    form.is_public = data.is_public ?? 0
    form.syllabus = data.syllabus || []
  } catch (e) {
    ElMessage.error(e.message || '加载失败')
    router.push('/fitness/training')
  } finally {
    pageLoading.value = false
  }
}

onMounted(() => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
    return
  }
  loadPlan()
})
</script>

<style scoped>
.ctp-page { min-height: 100vh; background: var(--color-bg); }

.ctp-container { max-width: 900px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

.ctp-header { margin-bottom: var(--space-6); }
.ctp-header h1 { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--color-text-primary); margin: 0 0 var(--space-1); }
.ctp-sub { font-size: var(--text-sm); color: var(--color-text-secondary); margin: 0; }

.ctp-loading { background: var(--color-bg-card); padding: var(--space-6); border-radius: var(--radius-xl); border: 1px solid var(--color-border-light); }

.ctp-section {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-6); margin-bottom: var(--space-5);
}
.ctp-section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); flex-wrap: wrap; gap: var(--space-2); }
.ctp-section-title { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; color: var(--color-text-primary); margin: 0 0 var(--space-4); }
.ctp-section-head .ctp-section-title { margin: 0; }

.ctp-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
.ctp-field { display: flex; flex-direction: column; gap: 6px; }
.ctp-field--wide { grid-column: span 2; }
.ctp-field label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-secondary); }
.ctp-required { color: #DC2626; }
.ctp-input, .ctp-select, .ctp-textarea {
  padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light);
  background: var(--color-surface); font-size: var(--text-sm); font-family: var(--font-body);
  color: var(--color-text-primary); outline: none; resize: vertical; width: 100%; box-sizing: border-box;
}
.ctp-input:focus, .ctp-select:focus, .ctp-textarea:focus { border-color: var(--color-primary); }
.ctp-input--day-title { flex: 1; }
.ctp-input--ex-name { flex: 2; min-width: 120px; }
.ctp-input--ex-num { flex: 1; min-width: 70px; }
.ctp-input--ex-notes { margin-top: 6px; font-size: var(--text-xs); }

.ctp-empty-hint {
  padding: var(--space-6); text-align: center; color: var(--color-text-tertiary);
  background: var(--color-surface); border-radius: var(--radius-md); font-size: var(--text-sm);
}

.ctp-week { border-top: 1px solid var(--color-border-light); padding-top: var(--space-4); margin-top: var(--space-4); }
.ctp-week:first-of-type { border-top: none; margin-top: 0; padding-top: 0; }
.ctp-week-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3); }
.ctp-week-head h3 { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); margin: 0; }

.ctp-day {
  background: var(--color-surface); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md); padding: var(--space-4); margin-bottom: var(--space-3);
}
.ctp-day-head { display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); flex-wrap: wrap; }
.ctp-day-num {
  font-size: var(--text-xs); font-weight: 700; color: #fff; background: var(--color-primary);
  padding: 2px 10px; border-radius: var(--radius-sm); flex-shrink: 0;
}
.ctp-day-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-3); }

.ctp-ex-list { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-2); }
.ctp-ex { background: var(--color-bg-card); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); }
.ctp-ex-row { display: flex; gap: 6px; flex-wrap: wrap; }

.ctp-actions { display: flex; gap: var(--space-3); justify-content: flex-end; padding: var(--space-4) 0; }

.ctp-btn {
  padding: 10px 24px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light);
  background: var(--color-bg-card); color: var(--color-text-primary); font-size: var(--text-sm);
  font-weight: 600; cursor: pointer; font-family: var(--font-body); transition: all 0.2s;
}
.ctp-btn:hover:not(:disabled) { transform: translateY(-1px); }
.ctp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.ctp-btn--primary { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.ctp-btn--primary:hover:not(:disabled) { background: var(--color-primary-dark); }
.ctp-btn--ghost { background: transparent; }
.ctp-btn--ghost:hover:not(:disabled) { border-color: var(--color-primary); color: var(--color-primary); }
.ctp-btn--sm { padding: 6px 14px; font-size: var(--text-xs); }

.ctp-mini-btn {
  padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-light);
  background: var(--color-bg-card); font-size: var(--text-xs); cursor: pointer;
  font-family: var(--font-body); color: var(--color-text-secondary); transition: all 0.2s;
}
.ctp-mini-btn--danger:hover { background: #FEE2E2; color: #DC2626; border-color: #FCA5A5; }

@media (max-width: 640px) {
  .ctp-form-grid { grid-template-columns: 1fr; }
  .ctp-field--wide { grid-column: span 1; }
  .ctp-day-grid { grid-template-columns: 1fr; }
  .ctp-actions { flex-direction: column-reverse; }
  .ctp-actions .ctp-btn { width: 100%; }
}
</style>
