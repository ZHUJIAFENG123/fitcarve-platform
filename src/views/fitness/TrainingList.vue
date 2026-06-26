<template>
  <div class="tl-page">
    <Navbar :menu-links="menuLinks" />

    <div class="tl-hero">
      <h1>📋 训练计划</h1>
      <p>选择适合你的训练计划，开始科学训练</p>
    </div>

    <!-- 筛选栏 -->
    <div class="tl-filter">
      <div class="tl-filter-inner">
        <button :class="['tl-fbtn', { active: !filters.goal }]" @click="setFilter('goal', '')">全部目标</button>
        <button v-for="g in GOALS" :key="g.value" :class="['tl-fbtn', { active: filters.goal === g.value }]" @click="setFilter('goal', g.value)">{{ g.label }}</button>
        <span class="tl-sep">|</span>
        <button :class="['tl-fbtn', { active: !filters.level }]" @click="setFilter('level', '')">全部难度</button>
        <button v-for="l in LEVELS" :key="l.value" :class="['tl-fbtn', { active: filters.level === l.value }]" @click="setFilter('level', l.value)">{{ l.label }}</button>
      </div>
    </div>

    <div class="tl-container">
      <!-- Loading -->
      <div v-if="loading" class="tl-grid">
        <div v-for="i in 6" :key="i" class="tl-card-skeleton" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="tl-state">
        <el-result icon="error" title="加载失败" :sub-title="error">
          <template #extra><el-button type="primary" @click="fetchData">重新加载</el-button></template>
        </el-result>
      </div>

      <!-- Empty -->
      <div v-else-if="list.length === 0" class="tl-state">
        <el-empty description="暂无训练计划" />
      </div>

      <!-- Grid -->
      <div v-else class="tl-grid">
        <article v-for="item in list" :key="item.id" class="tl-card" @click="$router.push(`/fitness/training/${item.id}`)">
          <div class="tl-cover">
            <img v-if="item.cover_image" :src="item.cover_image" :alt="item.title" />
            <div v-else class="tl-cover-placeholder">📋</div>
          </div>
          <div class="tl-card-top">
            <span class="tl-goal">{{ GOAL_MAP[item.goal] }}</span>
            <span class="tl-level">{{ LEVEL_MAP[item.level] }}</span>
          </div>
          <h3 class="tl-title">{{ item.title }}</h3>
          <p class="tl-desc">{{ (item.description || '').slice(0, 80) }}{{ item.description && item.description.length > 80 ? '...' : '' }}</p>
          <div class="tl-meta">
            <span>📅 {{ item.duration_weeks }}周</span>
            <span>📆 每周{{ item.days_per_week }}天</span>
            <span>👁 {{ formatViews(item.views) }}</span>
          </div>
          <button class="tl-btn">查看计划 →</button>
        </article>
      </div>

      <!-- Pagination -->
      <div class="tl-pagination" v-if="total > 12">
        <el-pagination v-model:current-page="page" :page-size="12" :total="total" layout="prev, pager, next" @current-change="fetchData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const GOALS = [
  { value: 'build_muscle', label: '增肌' },
  { value: 'lose_fat', label: '减脂' },
  { value: 'endurance', label: '耐力' },
  { value: 'flexibility', label: '柔韧' },
  { value: 'general', label: '综合' }
]
const LEVELS = [
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' }
]
const GOAL_MAP: Record<string, string> = { build_muscle: '增肌', lose_fat: '减脂', endurance: '耐力', flexibility: '柔韧', general: '综合' }
const LEVEL_MAP: Record<string, string> = { beginner: '初级', intermediate: '中级', advanced: '高级' }

const API = import.meta.env.VITE_API_BASE_URL || '/api'
const list = ref<any[]>([])
const total = ref(0)
const page = ref(1)
const loading = ref(false)
const error = ref('')
const filters = reactive({ goal: '', level: '' })

function setFilter(key: string, val: string) {
  (filters as any)[key] = val
  page.value = 1
  fetchData()
}

function formatViews(v: number) { return v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(v) }

async function fetchData() {
  loading.value = true; error.value = ''
  try {
    const params = new URLSearchParams({ page: String(page.value), limit: '12' })
    if (filters.goal) params.set('goal', filters.goal)
    if (filters.level) params.set('level', filters.level)
    const res = await fetch(`${API}/training?${params}`)
    const data = await res.json()
    list.value = data.list || []
    total.value = data.total || 0
  } catch (e: any) {
    error.value = e.message || '加载失败'
  } finally { loading.value = false }
}

onMounted(fetchData)
</script>

<style scoped>
.tl-page { min-height: 100vh; background: var(--color-bg); }
.tl-hero { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); padding: var(--space-10) var(--space-4); text-align: center; }
.tl-hero h1 { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 800; color: #fff; }
.tl-hero p { color: var(--color-primary-100); margin-top: var(--space-2); }

.tl-filter { background: var(--color-bg-card); border-bottom: 1px solid var(--color-border-light); padding: var(--space-3) var(--space-4); position: sticky; top: 64px; z-index: 30; }
.tl-filter-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: center; }
.tl-fbtn { padding: 6px 16px; border-radius: var(--radius-full); border: 1px solid var(--color-border-light); background: var(--color-bg-card); color: var(--color-text-secondary); font-size: var(--text-sm); cursor: pointer; transition: all 0.2s; font-family: var(--font-body); }
.tl-fbtn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.tl-fbtn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.tl-sep { color: var(--color-border); margin: 0 4px; }

.tl-container { max-width: 1100px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }
.tl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5); }
.tl-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl);
  cursor: pointer; transition: all 0.25s; border-left: 3px solid transparent;
  display: flex; flex-direction: column; gap: 0; overflow: hidden;
}
.tl-cover { height: 160px; overflow: hidden; background: var(--color-primary-50); display: flex; align-items: center; justify-content: center; }
.tl-cover img { width: 100%; height: 100%; object-fit: cover; }
.tl-cover-placeholder { font-size: 2.5rem; opacity: 0.3; }
.tl-card-top { display: flex; gap: var(--space-2); padding: var(--space-3) var(--space-4) 0; }
.tl-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-left-color: var(--color-primary); }
.tl-card-top { display: flex; gap: var(--space-2); }
.tl-goal { font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: var(--radius-sm); background: var(--color-primary-50); color: var(--color-primary); }
.tl-level { font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: var(--radius-sm); background: var(--color-accent-50); color: var(--color-accent); }
.tl-title { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; color: var(--color-text-primary); padding: 0 var(--space-4); }
.tl-desc { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: var(--leading-normal); flex: 1; padding: 0 var(--space-4); }
.tl-meta { display: flex; gap: var(--space-4); font-size: var(--text-xs); color: var(--color-text-tertiary); padding: 0 var(--space-4); }
.tl-btn { margin-top: var(--space-2); padding: 10px 0; border: 1px solid var(--color-primary); border-radius: var(--radius-md); background: transparent; color: var(--color-primary); font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--font-body); }
.tl-btn:hover { background: var(--color-primary); color: #fff; }

.tl-card-skeleton { height: 200px; border-radius: var(--radius-xl); background: var(--color-surface); animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
.tl-state { display: flex; justify-content: center; padding: var(--space-16) 0; }
.tl-pagination { display: flex; justify-content: center; margin-top: var(--space-8); }

@media (max-width: 640px) { .tl-grid { grid-template-columns: 1fr; } }
</style>
