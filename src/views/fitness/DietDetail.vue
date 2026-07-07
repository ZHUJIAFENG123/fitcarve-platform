<template>
  <div class="dd-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Loading -->
    <div v-if="loading" class="dd-container">
      <div class="dd-skeleton">
        <div class="sk-header"></div>
        <div class="sk-cards">
          <div class="sk-card"></div>
          <div class="sk-card"></div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!plan" class="dd-container dd-empty">
      <div class="dd-empty-icon-wrap">
        <AlertCircle :size="32" :stroke-width="1.5" />
      </div>
      <p>方案不存在</p>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Header -->
      <header class="dd-header">
        <div class="dd-header-inner">
          <button class="dd-back" @click="$router.push('/fitness/diet')">
            <ArrowLeft :size="16" /> 返回方案列表
          </button>
          <div class="dd-header-info">
            <span class="dd-goal-badge" :class="'dd-goal--' + plan.goal">{{ GOAL_MAP[plan.goal] }}</span>
            <h1 class="dd-title">{{ plan.title }}</h1>
            <p class="dd-desc">{{ plan.description }}</p>
          </div>
        </div>
      </header>

      <div class="dd-layout">
        <!-- Main Content -->
        <div class="dd-main">
          <!-- Meals -->
          <div class="dd-meals">
            <div v-for="(meal, mi) in plan.meals" :key="mi" class="dd-meal animate-fade-up" :style="{ animationDelay: mi * 80 + 'ms' }">
              <div class="dd-meal-header" :style="{ '--meal-color': MEAL_COLORS[mi % MEAL_COLORS.length] }">
                <div class="dd-meal-left">
                  <div class="dd-meal-icon-wrap">
                    <Clock :size="14" />
                  </div>
                  <div>
                    <h3>{{ meal.meal }}</h3>
                    <span class="dd-meal-time" v-if="meal.time">{{ meal.time }}</span>
                  </div>
                </div>
                <span class="dd-meal-subtotal">{{ getMealCalories(meal) }} kcal</span>
              </div>
              <div class="dd-recipes">
                <div v-for="(r, ri) in meal.recipes" :key="ri" class="dd-recipe">
                  <div class="dd-recipe-top">
                    <span class="dd-recipe-name">{{ r.name }}</span>
                    <span class="dd-recipe-cal">{{ r.calories }} kcal</span>
                  </div>
                  <div class="dd-recipe-ing" v-if="r.ingredients">{{ r.ingredients }}</div>
                  <div class="dd-recipe-macros">
                    <span class="dd-macro dd-macro--p">
                      <span class="dd-macro-dot" style="background: #3B82F6"></span>
                      蛋白 {{ r.protein }}g
                    </span>
                    <span class="dd-macro dd-macro--c">
                      <span class="dd-macro-dot" style="background: #F59E0B"></span>
                      碳水 {{ r.carbs }}g
                    </span>
                    <span class="dd-macro dd-macro--f">
                      <span class="dd-macro-dot" style="background: #EF4444"></span>
                      脂肪 {{ r.fat }}g
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar: Nutrition Summary -->
        <aside class="dd-sidebar">
          <div class="dd-summary-card">
            <h2 class="dd-summary-title">
              <BarChart3 :size="16" :stroke-width="1.8" />
              每日营养目标
            </h2>

            <!-- Calorie Ring -->
            <div class="dd-cal-ring-wrap">
              <div class="dd-cal-ring">
                <span class="dd-cal-val">{{ plan.daily_calories }}</span>
                <span class="dd-cal-unit">kcal/天</span>
              </div>
            </div>

            <!-- Macro Cards -->
            <div class="dd-macro-cards">
              <div class="dd-macro-card">
                <div class="dd-macro-card-ring" style="--pct: 35; --mc: #3B82F6">
                  <span class="dd-mcr-val">{{ plan.protein_g }}g</span>
                </div>
                <div class="dd-macro-card-info">
                  <span class="dd-mcr-label">蛋白质</span>
                  <span class="dd-mcr-pct">35%</span>
                </div>
              </div>
              <div class="dd-macro-card">
                <div class="dd-macro-card-ring" style="--pct: 40; --mc: #F59E0B">
                  <span class="dd-mcr-val">{{ plan.carbs_g }}g</span>
                </div>
                <div class="dd-macro-card-info">
                  <span class="dd-mcr-label">碳水</span>
                  <span class="dd-mcr-pct">40%</span>
                </div>
              </div>
              <div class="dd-macro-card">
                <div class="dd-macro-card-ring" style="--pct: 25; --mc: #EF4444">
                  <span class="dd-mcr-val">{{ plan.fat_g }}g</span>
                </div>
                <div class="dd-macro-card-info">
                  <span class="dd-mcr-label">脂肪</span>
                  <span class="dd-mcr-pct">25%</span>
                </div>
              </div>
            </div>

            <NutrientBar :items="summaryItems" />
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import NutrientBar from '@/components/common/NutrientBar.vue'
import { ArrowLeft, Clock, AlertCircle, BarChart3 } from 'lucide-vue-next'

const route = useRoute()
const API = import.meta.env.VITE_API_BASE_URL || '/api'
const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]
const GOAL_MAP: Record<string, string> = { build_muscle: '增肌', lose_fat: '减脂', maintenance: '维持' }
const MEAL_COLORS = ['#1B6B3A', '#F97316', '#2563EB', '#7C3AED']

const plan = ref<any>(null)
const loading = ref(true)

const summaryItems = computed(() => [
  { value: plan.value?.protein_g || 0, unit: 'g', color: '#3B82F6', label: '蛋白' },
  { value: plan.value?.carbs_g || 0, unit: 'g', color: '#F59E0B', label: '碳水' },
  { value: plan.value?.fat_g || 0, unit: 'g', color: '#EF4444', label: '脂肪' }
])

function getMealCalories(meal: any): number {
  if (!meal.recipes) return 0
  return meal.recipes.reduce((sum: number, r: any) => sum + (r.calories || 0), 0)
}

onMounted(async () => {
  try {
    const res = await fetch(`${API}/diet/${route.params.id}`)
    if (!res.ok) throw new Error('加载失败')
    plan.value = await res.json()
  } catch (e) { console.error(e) } finally { loading.value = false }
})
</script>

<style scoped>
.dd-page { min-height: 100vh; background: var(--color-bg); }

/* Header */
.dd-header {
  background: linear-gradient(145deg, #0F3D24 0%, #1B6B3A 50%, #238B4D 100%);
  padding: var(--space-5) var(--space-4) var(--space-8);
  position: relative;
  overflow: hidden;
}
.dd-header-inner { max-width: 1100px; margin: 0 auto; }
.dd-back {
  display: inline-flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.12); color: #fff; border: none;
  padding: 6px 14px; border-radius: var(--radius-full);
  font-size: var(--text-sm); cursor: pointer; margin-bottom: var(--space-4);
  backdrop-filter: blur(4px); transition: all 0.2s;
}
.dd-back:hover { background: rgba(255,255,255,0.2); }
.dd-header-info { }
.dd-goal-badge {
  display: inline-block; padding: 3px 12px; border-radius: var(--radius-full);
  font-size: 11px; font-weight: 600; color: #fff; background: rgba(255,255,255,0.18);
  margin-bottom: var(--space-2);
}
.dd-goal--build_muscle { background: #3B82F6 !important; }
.dd-goal--lose_fat { background: #EF4444 !important; }
.dd-goal--maintenance { background: #10B981 !important; }
.dd-title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: #fff; margin-bottom: var(--space-1); }
.dd-desc { color: rgba(255,255,255,0.7); line-height: var(--leading-relaxed); max-width: 600px; font-size: var(--text-sm); }

/* Layout */
.dd-layout { max-width: 1100px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-12); display: grid; grid-template-columns: 1fr 300px; gap: var(--space-6); align-items: start; }
.dd-main { display: flex; flex-direction: column; gap: var(--space-4); }
.dd-sidebar { position: sticky; top: var(--space-5); }

/* Meals */
.dd-meals { display: flex; flex-direction: column; gap: var(--space-4); }
.dd-meal { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); overflow: hidden; }
.dd-meal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-3) var(--space-5);
  background: color-mix(in srgb, var(--meal-color) 6%, transparent);
  border-bottom: 1px solid var(--color-border-light);
}
.dd-meal-left { display: flex; align-items: center; gap: var(--space-3); }
.dd-meal-icon-wrap {
  width: 28px; height: 28px; border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--meal-color) 15%, transparent);
  color: var(--meal-color);
  display: flex; align-items: center; justify-content: center;
}
.dd-meal-header h3 { font-family: var(--font-display); font-weight: 700; color: var(--color-text-primary); font-size: var(--text-base); margin: 0; }
.dd-meal-time { font-weight: 400; font-size: var(--text-xs); color: var(--color-text-tertiary); }
.dd-meal-subtotal {
  font-size: var(--text-xs); font-weight: 700;
  color: var(--meal-color);
  background: var(--color-bg-card);
  padding: 3px 12px; border-radius: var(--radius-full);
}

.dd-recipes { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
.dd-recipe {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border-light);
}
.dd-recipe-top { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.dd-recipe-name { font-weight: 600; color: var(--color-text-primary); font-size: var(--text-base); }
.dd-recipe-cal { font-size: var(--text-sm); font-weight: 700; color: var(--color-accent); white-space: nowrap; }
.dd-recipe-ing { font-size: var(--text-sm); color: var(--color-text-secondary); margin-top: 4px; line-height: 1.4; }
.dd-recipe-macros { display: flex; gap: var(--space-3); margin-top: 6px; flex-wrap: wrap; }
.dd-macro { display: flex; align-items: center; gap: 4px; font-size: var(--text-xs); font-weight: 500; }
.dd-macro-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.dd-macro--p { color: #3B82F6; }
.dd-macro--c { color: #F59E0B; }
.dd-macro--f { color: #EF4444; }

/* Summary Card */
.dd-summary-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  display: flex; flex-direction: column; gap: var(--space-4);
}
.dd-summary-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  display: flex; align-items: center; gap: var(--space-2);
}

/* Calorie Ring */
.dd-cal-ring-wrap { display: flex; justify-content: center; }
.dd-cal-ring {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: conic-gradient(var(--color-accent) 0deg, var(--color-accent-100) 360deg);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  position: relative;
}
.dd-cal-ring::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: var(--color-bg-card);
}
.dd-cal-val { position: relative; z-index: 1; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; color: var(--color-accent); }
.dd-cal-unit { position: relative; z-index: 1; font-size: var(--text-xs); color: var(--color-text-tertiary); }

/* Macro Cards */
.dd-macro-cards { display: flex; flex-direction: column; gap: var(--space-3); }
.dd-macro-card {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-2);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
}
.dd-macro-card-ring {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: conic-gradient(var(--mc) calc(var(--pct) * 3.6deg), var(--color-surface) 0);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.dd-macro-card-ring::before {
  content: ''; position: absolute; inset: 4px;
  border-radius: 50%; background: var(--color-bg);
}
.dd-mcr-val { position: relative; z-index: 1; font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
.dd-macro-card-info { display: flex; flex-direction: column; gap: 1px; }
.dd-mcr-label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); }
.dd-mcr-pct { font-size: 11px; color: var(--color-text-tertiary); }

/* Skeleton */
.dd-container { max-width: 1100px; margin: 0 auto; padding: var(--space-6) var(--space-4); }
.dd-empty { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); min-height: 400px; justify-content: center; }
.dd-empty-icon-wrap {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--color-surface);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-tertiary); opacity: 0.6;
}
.dd-skeleton { display: flex; flex-direction: column; gap: var(--space-5); }
.sk-header { height: 120px; background: var(--color-surface); border-radius: var(--radius-xl); animation: shimmer 1.5s infinite; }
.sk-cards { display: grid; grid-template-columns: 1fr 300px; gap: var(--space-5); }
.sk-card { height: 200px; background: var(--color-surface); border-radius: var(--radius-xl); animation: shimmer 1.5s infinite; }
@keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* Responsive */
@media (max-width: 900px) {
  .dd-layout { grid-template-columns: 1fr; }
  .dd-sidebar { position: static; }
  .dd-title { font-size: var(--text-xl); }
  .sk-cards { grid-template-columns: 1fr; }
}
</style>
