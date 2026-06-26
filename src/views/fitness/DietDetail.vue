<template>
  <div class="dd-page">
    <Navbar :menu-links="menuLinks" />

    <div v-if="loading" class="dd-container"><div class="dd-skeleton"><div class="sk-h1"></div><div class="sk-block"></div></div></div>
    <div v-else-if="!plan" class="dd-container dd-empty"><el-empty description="方案不存在" /></div>

    <template v-else>
      <div class="dd-hero">
        <div class="dd-hero-inner">
          <span class="dd-badge">{{ GOAL_MAP[plan.goal] }}</span>
          <h1>{{ plan.title }}</h1>
          <p>{{ plan.description }}</p>
        </div>
      </div>

      <div class="dd-content">
        <!-- 营养素总览 -->
        <div class="dd-summary">
          <div class="dd-sum-item"><strong>🔥 {{ plan.daily_calories }}</strong><span>kcal/天</span></div>
          <div class="dd-sum-item"><strong>🥩 {{ plan.protein_g }}g</strong><span>蛋白质</span></div>
          <div class="dd-sum-item"><strong>🍚 {{ plan.carbs_g }}g</strong><span>碳水</span></div>
          <div class="dd-sum-item"><strong>🥑 {{ plan.fat_g }}g</strong><span>脂肪</span></div>
        </div>

        <!-- 餐食 -->
        <div class="dd-meals">
          <div v-for="(meal, mi) in plan.meals" :key="mi" class="dd-meal">
            <div class="dd-meal-header">
              <h3>{{ meal.meal }} <span class="dd-meal-time">{{ meal.time }}</span></h3>
            </div>
            <div class="dd-recipes">
              <div v-for="(r, ri) in meal.recipes" :key="ri" class="dd-recipe">
                <div class="dd-recipe-name">{{ r.name }}</div>
                <div class="dd-recipe-ing">{{ r.ingredients }}</div>
                <div class="dd-recipe-nums">
                  <span>{{ r.calories }} kcal</span>
                  <span>蛋白{{ r.protein }}g</span>
                  <span>碳水{{ r.carbs }}g</span>
                  <span>脂肪{{ r.fat }}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 合计 -->
        <div class="dd-total">
          <span>合计：{{ plan.daily_calories }} kcal | 蛋白{{ plan.protein_g }}g | 碳水{{ plan.carbs_g }}g | 脂肪{{ plan.fat_g }}g</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()
const API = import.meta.env.VITE_API_BASE_URL || '/api'
const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]
const GOAL_MAP: Record<string, string> = { build_muscle: '增肌', lose_fat: '减脂', maintenance: '维持' }

const plan = ref<any>(null)
const loading = ref(true)

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
.dd-hero { background: linear-gradient(135deg, #EA580C, #C2410C); padding: var(--space-10) var(--space-4); }
.dd-hero-inner { max-width: 700px; margin: 0 auto; color: #fff; }
.dd-badge { font-size: var(--text-xs); font-weight: 600; padding: 3px 12px; border-radius: var(--radius-full); background: rgba(255,255,255,0.2); }
.dd-hero-inner h1 { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 800; margin: var(--space-3) 0; }
.dd-hero-inner p { color: #FFEDD5; line-height: var(--leading-relaxed); }

.dd-content { max-width: 700px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

.dd-summary { display: flex; gap: var(--space-4); margin-bottom: var(--space-6); flex-wrap: wrap; }
.dd-sum-item { flex: 1; min-width: 100px; background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: var(--space-4); text-align: center; }
.dd-sum-item strong { display: block; font-size: var(--text-xl); color: var(--color-accent); font-family: var(--font-display); }
.dd-sum-item span { font-size: var(--text-xs); color: var(--color-text-tertiary); }

.dd-meals { display: flex; flex-direction: column; gap: var(--space-5); }
.dd-meal { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); overflow: hidden; }
.dd-meal-header { background: var(--color-accent-50); padding: var(--space-3) var(--space-5); }
.dd-meal-header h3 { font-family: var(--font-display); font-weight: 700; color: var(--color-accent); margin:0; font-size: var(--text-base); }
.dd-meal-time { font-weight: 400; font-size: var(--text-sm); color: var(--color-text-tertiary); margin-left: var(--space-2); }
.dd-recipes { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-4); }
.dd-recipe { padding: var(--space-3); border-radius: var(--radius-md); background: var(--color-bg-warm); }
.dd-recipe-name { font-weight: 700; color: var(--color-text-primary); font-size: var(--text-base); }
.dd-recipe-ing { font-size: var(--text-sm); color: var(--color-text-secondary); margin: 4px 0; }
.dd-recipe-nums { display: flex; gap: var(--space-3); font-size: var(--text-xs); color: var(--color-text-tertiary); flex-wrap: wrap; }

.dd-total { margin-top: var(--space-6); text-align: center; padding: var(--space-4); background: var(--color-accent-50); border-radius: var(--radius-lg); font-weight: 600; color: var(--color-accent); font-size: var(--text-sm); }

.dd-container { max-width: 700px; margin: 0 auto; padding: var(--space-6) var(--space-4); }
.dd-empty { display: flex; justify-content: center; min-height: 400px; align-items: center; }
.dd-skeleton .sk-h1 { height:28px; background: var(--color-surface); border-radius: var(--radius-md); margin-bottom: var(--space-4); }
.dd-skeleton .sk-block { height:300px; background: var(--color-surface); border-radius: var(--radius-lg); animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
</style>
