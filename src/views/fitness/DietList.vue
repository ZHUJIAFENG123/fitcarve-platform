<template>
  <div class="dl-page">
    <Navbar :menu-links="menuLinks" />

    <div class="dl-hero">
      <h1>🍽 饮食方案</h1>
      <p>科学配比，精准营养，助力你的训练目标</p>
    </div>

    <div class="dl-filter">
      <div class="dl-filter-inner">
        <button :class="['dl-fbtn', { active: !filters.goal }]" @click="setFilter('goal', '')">全部</button>
        <button v-for="g in GOALS" :key="g.value" :class="['dl-fbtn', { active: filters.goal === g.value }]" @click="setFilter('goal', g.value)">{{ g.label }}</button>
      </div>
    </div>

    <div class="dl-container">
      <div v-if="loading" class="dl-grid">
        <div v-for="i in 6" :key="i" class="dl-card-skeleton" />
      </div>
      <div v-else-if="error" class="dl-state"><el-empty description="加载失败" /></div>
      <div v-else-if="list.length === 0" class="dl-state"><el-empty description="暂无饮食方案" /></div>
      <div v-else class="dl-grid">
        <article v-for="item in list" :key="item.id" class="dl-card" @click="$router.push(`/fitness/diet/${item.id}`)">
          <span class="dl-goal-badge">{{ GOAL_MAP[item.goal] }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ (item.description || '').slice(0, 70) }}{{ item.description?.length > 70 ? '...' : '' }}</p>
          <div class="dl-nutrients">
            <span class="dl-cal">🔥 {{ item.daily_calories }} kcal/天</span>
            <div class="dl-bars">
              <span class="dl-bar dl-bar-p" :style="{width: (item.protein_g / (item.daily_calories / 100)).toFixed(0) + '%'}">蛋白{{ item.protein_g }}g</span>
              <span class="dl-bar dl-bar-c" :style="{width: (item.carbs_g / (item.daily_calories / 100)).toFixed(0) + '%'}">碳水{{ item.carbs_g }}g</span>
              <span class="dl-bar dl-bar-f" :style="{width: (item.fat_g / (item.daily_calories / 100)).toFixed(0) + '%'}">脂肪{{ item.fat_g }}g</span>
            </div>
          </div>
          <button class="dl-btn">查看方案 →</button>
        </article>
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
  { value: 'maintenance', label: '维持' }
]
const GOAL_MAP: Record<string, string> = { build_muscle: '增肌', lose_fat: '减脂', maintenance: '维持' }
const API = import.meta.env.VITE_API_BASE_URL || '/api'
const list = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const filters = reactive({ goal: '' })

function setFilter(k: string, v: string) { (filters as any)[k] = v; fetchData() }

async function fetchData() {
  loading.value = true; error.value = ''
  try {
    const params = new URLSearchParams()
    if (filters.goal) params.set('goal', filters.goal)
    const res = await fetch(`${API}/diet?${params}`)
    const data = await res.json()
    list.value = data.list || []
  } catch (e: any) { error.value = e.message } finally { loading.value = false }
}
onMounted(fetchData)
</script>

<style scoped>
.dl-page { min-height: 100vh; background: var(--color-bg); }
.dl-hero { background: linear-gradient(135deg, #EA580C, #C2410C); padding: var(--space-10) var(--space-4); text-align: center; }
.dl-hero h1 { font-family: var(--font-display); font-size: var(--text-3xl); color: #fff; font-weight: 800; }
.dl-hero p { color: #FFEDD5; margin-top: var(--space-2); }
.dl-filter { background: var(--color-bg-card); padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border-light); }
.dl-filter-inner { max-width: 1100px; margin: 0 auto; display: flex; gap: var(--space-2); }
.dl-fbtn { padding: 6px 16px; border-radius: var(--radius-full); border: 1px solid var(--color-border-light); background: var(--color-bg-card); color: var(--color-text-secondary); cursor: pointer; font-family: var(--font-body); font-size: var(--text-sm); transition: all 0.2s; }
.dl-fbtn:hover { border-color: var(--color-accent); color: var(--color-accent); }
.dl-fbtn.active { background: var(--color-accent); color: #fff; border-color: var(--color-accent); }
.dl-container { max-width: 1100px; margin: 0 auto; padding: var(--space-6) var(--space-4); }
.dl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5); }
.dl-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl);
  padding: var(--space-5); cursor: pointer; transition: all 0.25s; border-left: 3px solid transparent;
  display: flex; flex-direction: column; gap: var(--space-2);
}
.dl-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-left-color: var(--color-accent); }
.dl-card h3 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; color: var(--color-text-primary); }
.dl-card p { font-size: var(--text-sm); color: var(--color-text-secondary); flex:1; }
.dl-goal-badge { font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: var(--radius-sm); background: var(--color-accent-50); color: var(--color-accent); display: inline-block; width: fit-content; }
.dl-nutrients { margin-top: var(--space-2); }
.dl-cal { font-size: var(--text-base); font-weight: 700; color: var(--color-accent); }
.dl-bars { display: flex; gap: 4px; margin-top: var(--space-1); height: 22px; }
.dl-bar { display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: #fff; border-radius: var(--radius-sm); min-width: 50px; padding: 0 4px; }
.dl-bar-p { background: #F97316; }
.dl-bar-c { background: #EAB308; }
.dl-bar-f { background: #EF4444; }
.dl-btn { margin-top: var(--space-2); padding: 10px 0; border: 1px solid var(--color-accent); border-radius: var(--radius-md); background: transparent; color: var(--color-accent); font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--font-body); text-align: center; }
.dl-btn:hover { background: var(--color-accent); color: #fff; }

.dl-card-skeleton { height:180px; border-radius: var(--radius-xl); background: var(--color-surface); animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
.dl-state { display: flex; justify-content: center; padding: var(--space-16) 0; }
@media (max-width: 640px) { .dl-grid { grid-template-columns: 1fr; } }
</style>
