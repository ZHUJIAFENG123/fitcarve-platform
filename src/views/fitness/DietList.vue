<template>
  <div class="dl-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero Header -->
    <header class="dl-hero">
      <div class="dl-hero-bg">
        <div class="dl-hero-orb dl-hero-orb--1"></div>
        <div class="dl-hero-orb dl-hero-orb--2"></div>
      </div>
      <div class="dl-hero-content">
        <h1 class="dl-title">饮食方案</h1>
        <p class="dl-subtitle">科学配比，精准营养，助力你的训练目标</p>
      </div>
    </header>

    <!-- Goal Filter Tabs -->
    <div class="dl-goals">
      <div class="dl-goals-inner">
        <button :class="['dl-goal-tab', { active: !filters.goal }]" @click="setFilter('goal', '')">
          <Layers :size="16" />
          <div class="dl-goal-text">
            <span class="dl-goal-name">全部</span>
          </div>
        </button>
        <button :class="['dl-goal-tab', { active: filters.goal === 'build_muscle' }]" @click="setFilter('goal', 'build_muscle')">
          <Dumbbell :size="16" />
          <div class="dl-goal-text">
            <span class="dl-goal-name">增肌</span>
            <span class="dl-goal-desc">高蛋白 · 热量盈余</span>
          </div>
        </button>
        <button :class="['dl-goal-tab', { active: filters.goal === 'lose_fat' }]" @click="setFilter('goal', 'lose_fat')">
          <Flame :size="16" />
          <div class="dl-goal-text">
            <span class="dl-goal-name">减脂</span>
            <span class="dl-goal-desc">低热量 · 高蛋白</span>
          </div>
        </button>
        <button :class="['dl-goal-tab', { active: filters.goal === 'maintenance' }]" @click="setFilter('goal', 'maintenance')">
          <Scale :size="16" />
          <div class="dl-goal-text">
            <span class="dl-goal-name">维持</span>
            <span class="dl-goal-desc">均衡营养 · 健康饮食</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="dl-container">
      <!-- Loading -->
      <div v-if="loading" class="dl-grid">
        <div v-for="i in 6" :key="i" class="dl-skeleton">
          <div class="dl-skel-cover"></div>
          <div class="dl-skel-body">
            <div class="dl-skel-line w40"></div>
            <div class="dl-skel-line w80"></div>
            <div class="dl-skel-line w60"></div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="dl-state">
        <div class="dl-state-icon-wrap">
          <AlertCircle :size="32" :stroke-width="1.5" />
        </div>
        <p>加载失败</p>
        <button class="dl-retry" @click="fetchData">重试</button>
      </div>

      <!-- Empty -->
      <div v-else-if="list.length === 0" class="dl-state">
        <div class="dl-state-icon-wrap">
          <UtensilsCrossed :size="32" :stroke-width="1.5" />
        </div>
        <p>暂无饮食方案</p>
      </div>

      <!-- Cards -->
      <div v-else class="dl-grid">
        <article
          v-for="(item, idx) in list"
          :key="item.id"
          class="dl-card animate-fade-up"
          :style="{ animationDelay: idx * 60 + 'ms' }"
          @click="$router.push(`/fitness/diet/${item.id}`)"
        >
          <div class="dl-cover">
            <img v-if="item.cover_image" :src="item.cover_image" :alt="item.title" loading="lazy" />
            <div v-else class="dl-cover-ph">
              <UtensilsCrossed :size="36" :stroke-width="1.5" />
            </div>
            <div class="dl-cover-overlay">
              <span class="dl-goal-badge" :class="'dl-goal--' + item.goal">{{ GOAL_MAP[item.goal] }}</span>
              <span class="dl-cover-cal">
                <Flame :size="12" /> {{ item.daily_calories }} kcal/天
              </span>
            </div>
          </div>
          <div class="dl-card-body">
            <h3 class="dl-card-title">{{ item.title }}</h3>
            <p class="dl-card-desc">{{ (item.description || '').slice(0, 60) }}{{ item.description?.length > 60 ? '...' : '' }}</p>
            <div class="dl-card-macros">
              <div class="dl-macro-item">
                <span class="dl-macro-dot" style="background: #3B82F6"></span>
                <span class="dl-macro-val">{{ item.protein_g || 0 }}g</span>
                <span class="dl-macro-label">蛋白</span>
              </div>
              <div class="dl-macro-item">
                <span class="dl-macro-dot" style="background: #F59E0B"></span>
                <span class="dl-macro-val">{{ item.carbs_g || 0 }}g</span>
                <span class="dl-macro-label">碳水</span>
              </div>
              <div class="dl-macro-item">
                <span class="dl-macro-dot" style="background: #EF4444"></span>
                <span class="dl-macro-val">{{ item.fat_g || 0 }}g</span>
                <span class="dl-macro-label">脂肪</span>
              </div>
            </div>
            <NutrientBar :items="getNutrientItems(item)" />
          </div>
          <div class="dl-card-footer">
            <span>查看方案</span>
            <ArrowRight :size="14" />
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import NutrientBar from '@/components/common/NutrientBar.vue'
import { Layers, Dumbbell, Flame, Scale, ArrowRight, AlertCircle, UtensilsCrossed } from 'lucide-vue-next'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]
const GOAL_MAP: Record<string, string> = { build_muscle: '增肌', lose_fat: '减脂', maintenance: '维持' }
const API = import.meta.env.VITE_API_BASE_URL || '/api'
const list = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const filters = reactive({ goal: '' })

function setFilter(k: string, v: string) { (filters as any)[k] = v; fetchData() }

function getNutrientItems(item: any) {
  const total = (item.protein_g || 0) + (item.carbs_g || 0) + (item.fat_g || 0)
  if (!total) return []
  return [
    { value: item.protein_g || 0, unit: 'g', color: '#3B82F6', label: '蛋白' },
    { value: item.carbs_g || 0, unit: 'g', color: '#F59E0B', label: '碳水' },
    { value: item.fat_g || 0, unit: 'g', color: '#EF4444', label: '脂肪' }
  ]
}

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

/* Hero */
.dl-hero {
  position: relative;
  background: linear-gradient(145deg, #0F3D24 0%, #1B6B3A 50%, #238B4D 100%);
  padding: var(--space-10) var(--space-4) var(--space-8);
  text-align: center;
  overflow: hidden;
}
.dl-hero-bg {
  position: absolute; inset: 0; pointer-events: none;
}
.dl-hero-orb {
  position: absolute; border-radius: 50%; filter: blur(50px); opacity: 0.2;
}
.dl-hero-orb--1 {
  width: 250px; height: 250px; background: #F97316;
  top: -60px; right: -40px;
  animation: float-orb 10s ease-in-out infinite;
}
.dl-hero-orb--2 {
  width: 180px; height: 180px; background: #3B82F6;
  bottom: -30px; left: 15%;
  animation: float-orb 12s ease-in-out infinite reverse;
}
@keyframes float-orb {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -10px); }
}
.dl-hero-content {
  position: relative; z-index: 1;
  max-width: 600px; margin: 0 auto;
}
.dl-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 800;
  color: #fff;
  margin-bottom: var(--space-2);
}
.dl-subtitle { color: rgba(255,255,255,0.7); font-size: var(--text-base); }

/* Goal Tabs */
.dl-goals {
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-light);
  padding: 0 var(--space-4);
}
.dl-goals-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  padding: var(--space-3) 0;
  scrollbar-width: none;
}
.dl-goals-inner::-webkit-scrollbar { display: none; }
.dl-goal-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1.5px solid transparent;
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}
.dl-goal-tab:hover { background: var(--color-surface); }
.dl-goal-tab.active {
  background: var(--color-primary-50);
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.dl-goal-text {
  display: flex; flex-direction: column; gap: 0;
}
.dl-goal-name { font-weight: 600; font-size: var(--text-sm); }
.dl-goal-desc { font-size: 10px; color: var(--color-text-tertiary); }
.dl-goal-tab.active .dl-goal-desc { color: var(--color-primary); opacity: 0.7; }

/* Container */
.dl-container { max-width: 1100px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-12); }
.dl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5); }

/* Card */
.dl-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}
.dl-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
}

/* Cover */
.dl-cover { height: 170px; overflow: hidden; background: var(--color-accent-50); position: relative; }
.dl-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.dl-card:hover .dl-cover img { transform: scale(1.06); }
.dl-cover-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--color-accent); opacity: 0.25; }
.dl-cover-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: var(--space-3);
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
  display: flex; align-items: flex-end; justify-content: space-between;
}
.dl-goal-badge {
  padding: 3px 12px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: var(--color-accent);
}
.dl-goal--build_muscle { background: #3B82F6; }
.dl-goal--lose_fat { background: #EF4444; }
.dl-goal--maintenance { background: #10B981; }
.dl-cover-cal {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; font-weight: 600; color: #fff;
}

/* Card Body */
.dl-card-body { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); flex: 1; }
.dl-card-title { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; color: var(--color-text-primary); }
.dl-card-desc { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.5; }

/* Macros */
.dl-card-macros {
  display: flex; gap: var(--space-3); margin-top: var(--space-1);
}
.dl-macro-item {
  display: flex; align-items: center; gap: 4px;
}
.dl-macro-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.dl-macro-val { font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); }
.dl-macro-label { font-size: 11px; color: var(--color-text-tertiary); }

/* Card Footer */
.dl-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border-light);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all 0.2s;
}
.dl-card:hover .dl-card-footer { background: var(--color-primary-50); }
.dl-card-footer svg { transition: transform 0.2s; }
.dl-card:hover .dl-card-footer svg { transform: translateX(3px); }

/* Skeleton */
.dl-skeleton { border-radius: var(--radius-xl); overflow: hidden; background: var(--color-bg-card); border: 1px solid var(--color-border-light); }
.dl-skel-cover { height: 170px; background: var(--color-surface); animation: shimmer 1.5s infinite; }
.dl-skel-body { padding: var(--space-4); display: flex; flex-direction: column; gap: 8px; }
.dl-skel-line { height: 14px; border-radius: 7px; background: var(--color-surface); animation: shimmer 1.5s infinite; }
.dl-skel-line.w40 { width: 40%; }
.dl-skel-line.w60 { width: 60%; }
.dl-skel-line.w80 { width: 80%; }
@keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* State */
.dl-state { padding: var(--space-16) 0; display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
.dl-state-icon-wrap {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--color-surface);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-tertiary); opacity: 0.6;
}
.dl-state p { color: var(--color-text-tertiary); font-size: var(--text-sm); }
.dl-retry { padding: 8px 24px; background: var(--color-primary); color: #fff; border: none; border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600; cursor: pointer; }

@media (max-width: 640px) {
  .dl-grid { grid-template-columns: 1fr; }
  .dl-title { font-size: var(--text-2xl); }
  .dl-goal-desc { display: none; }
}
</style>
