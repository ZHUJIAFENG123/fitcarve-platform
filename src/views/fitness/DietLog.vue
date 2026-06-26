<template>
  <div class="dlog-page">
    <Navbar :menu-links="menuLinks" />

    <div class="dlog-hero">
      <h1>📝 饮食记录</h1>
      <div class="dlog-date-nav">
        <button @click="changeDate(-1)">◀</button>
        <span class="dlog-date-text">{{ logDate }} {{ weekDay }}</span>
        <button @click="changeDate(1)">▶</button>
        <button @click="goToday" class="dlog-today">今天</button>
      </div>
    </div>

    <div class="dlog-container" v-if="loggedIn">
      <!-- 摄入概览 -->
      <div class="dlog-overview">
        <div class="dlog-over-item">
          <div class="dlog-over-val">{{ summary.total_calories || 0 }}</div>
          <div class="dlog-over-label">已摄入 kcal</div>
        </div>
        <div class="dlog-over-item"><div class="dlog-over-val">{{ summary.total_protein || 0 }}g</div><div class="dlog-over-label">蛋白质</div></div>
        <div class="dlog-over-item"><div class="dlog-over-val">{{ summary.total_carbs || 0 }}g</div><div class="dlog-over-label">碳水</div></div>
        <div class="dlog-over-item"><div class="dlog-over-val">{{ summary.total_fat || 0 }}g</div><div class="dlog-over-label">脂肪</div></div>
      </div>

      <!-- 各餐 -->
      <div v-for="meal in MEALS" :key="meal.value" class="dlog-meal">
        <div class="dlog-meal-header">
          <h3>{{ meal.label }}</h3>
          <div class="dlog-meal-total">{{ mealCalories(meal.value) }} kcal</div>
        </div>

        <!-- 已记录的食物 -->
        <div class="dlog-items">
          <div v-for="item in mealItems(meal.value)" :key="item.id" class="dlog-item">
            <span class="dlog-item-name">{{ item.food_name }}</span>
            <span class="dlog-item-amount">{{ item.amount_g }}g</span>
            <span class="dlog-item-cal">{{ item.calories }} kcal</span>
            <button class="dlog-item-del" @click="removeItem(item.id)">✕</button>
          </div>
        </div>

        <!-- 搜索添加 -->
        <div class="dlog-add">
          <div class="dlog-add-row">
            <input
              v-model="searchQueries[meal.value]"
              :placeholder="'搜索食物添加到' + meal.label + '...'"
              class="dlog-search"
              @input="onSearchInput(meal.value)"
              @focus="activeMeal = meal.value"
            />
          </div>
          <!-- 搜索结果 -->
          <div v-if="activeMeal === meal.value && searchResults.length > 0" class="dlog-results">
            <div v-for="food in searchResults" :key="food.id" class="dlog-result" @click="addFood(meal.value, food)">
              <div class="dlog-res-main">
                <span class="dlog-res-name">{{ food.name }}</span>
                <span class="dlog-res-cal">{{ food.calories_per_100g }} kcal/100g</span>
              </div>
              <div class="dlog-res-nums">
                蛋白{{ food.protein_per_100g }}g | 碳水{{ food.carbs_per_100g }}g | 脂肪{{ food.fat_per_100g }}g
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="dlog-container dlog-login">
      <el-empty description="请先登录以记录饮食">
        <template #extra><el-button type="primary" @click="$router.push('/login')">去登录</el-button></template>
      </el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const API = import.meta.env.VITE_API_BASE_URL || '/api'
const MEALS = [
  { value: 'breakfast', label: '🥐 早餐' },
  { value: 'lunch', label: '🍱 午餐' },
  { value: 'dinner', label: '🍽 晚餐' },
  { value: 'snack', label: '🍪 加餐' }
]

const loggedIn = ref(!!localStorage.getItem('token'))
const logDate = ref(new Date().toISOString().slice(0, 10))
const logs = ref<any[]>([])
const summary = ref<any>({})
const searchQueries: Record<string, string> = reactive({ breakfast: '', lunch: '', dinner: '', snack: '' })
const searchResults = ref<any[]>([])
const activeMeal = ref('')
let searchTimer: any = null

const weekDay = computed(() => {
  const d = new Date(logDate.value)
  return '周' + ['日','一','二','三','四','五','六'][d.getDay()]
})

function changeDate(delta: number) {
  const d = new Date(logDate.value)
  d.setDate(d.getDate() + delta)
  logDate.value = d.toISOString().slice(0, 10)
  fetchLogs()
}
function goToday() { logDate.value = new Date().toISOString().slice(0, 10); fetchLogs() }

function mealItems(type: string) { return logs.value.filter((l: any) => l.meal_type === type) }
function mealCalories(type: string) { return mealItems(type).reduce((s: number, l: any) => s + Number(l.calories), 0) }

async function fetchLogs() {
  if (!loggedIn.value) return
  const res = await fetch(`${API}/diet-log?date=${logDate.value}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  const data = await res.json()
  logs.value = data.logs || []
  summary.value = data.summary || {}
}

async function onSearchInput(meal: string) {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(async () => {
    const kw = searchQueries[meal]
    if (!kw || kw.length < 1) { searchResults.value = []; return }
    const res = await fetch(`${API}/foods/search?keyword=${encodeURIComponent(kw)}`)
    searchResults.value = await res.json()
  }, 300)
}

async function addFood(mealType: string, food: any) {
  const amount = food.serving_size || 100
  const ratio = amount / 100
  await fetch(`${API}/diet-log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({
      logDate: logDate.value, mealType, foodId: food.id, foodName: food.name, amountG: amount,
      calories: Math.round(food.calories_per_100g * ratio),
      proteinG: +(food.protein_per_100g * ratio).toFixed(1),
      carbsG: +(food.carbs_per_100g * ratio).toFixed(1),
      fatG: +(food.fat_per_100g * ratio).toFixed(1)
    })
  })
  searchResults.value = []
  searchQueries[mealType] = ''
  fetchLogs()
}

async function removeItem(id: number) {
  await fetch(`${API}/diet-log/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  fetchLogs()
}

import { reactive } from 'vue'
onMounted(() => {
  if (loggedIn.value) fetchLogs()
})
</script>

<style scoped>
.dlog-page { min-height: 100vh; background: var(--color-bg); }
.dlog-hero { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); padding: var(--space-8) var(--space-4); text-align: center; }
.dlog-hero h1 { font-family: var(--font-display); font-size: var(--text-3xl); color: #fff; font-weight: 800; }
.dlog-date-nav { display: flex; align-items: center; justify-content: center; gap: var(--space-3); margin-top: var(--space-4); }
.dlog-date-nav button { background: rgba(255,255,255,0.15); border: none; color: #fff; padding: 6px 14px; border-radius: var(--radius-md); cursor: pointer; font-size: var(--text-base); }
.dlog-date-nav button:hover { background: rgba(255,255,255,0.25); }
.dlog-date-text { font-size: var(--text-lg); color: #fff; font-weight: 600; }
.dlog-today { font-size: var(--text-sm) !important; margin-left: var(--space-2); }

.dlog-container { max-width: 650px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }
.dlog-overview { display: flex; gap: var(--space-3); margin-bottom: var(--space-6); flex-wrap: wrap; }
.dlog-over-item { flex: 1; min-width: 80px; background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: var(--space-3); text-align: center; }
.dlog-over-val { font-size: var(--text-xl); font-weight: 800; color: var(--color-primary); font-family: var(--font-display); }
.dlog-over-label { font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: 2px; }

.dlog-meal { margin-bottom: var(--space-5); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); overflow: hidden; }
.dlog-meal-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-3) var(--space-4); background: var(--color-bg-warm); }
.dlog-meal-header h3 { margin:0; font-size: var(--text-base); font-weight: 700; }
.dlog-meal-total { font-weight: 700; color: var(--color-primary); font-size: var(--text-sm); }

.dlog-items { padding: var(--space-3) var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); }
.dlog-item { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); padding: var(--space-1) 0; }
.dlog-item-name { flex: 1; color: var(--color-text-primary); font-weight: 500; }
.dlog-item-amount { color: var(--color-text-tertiary); }
.dlog-item-cal { color: var(--color-primary); font-weight: 600; }
.dlog-item-del { background: none; border: none; color: var(--color-text-tertiary); cursor: pointer; font-size: var(--text-sm); }
.dlog-item-del:hover { color: var(--state-error); }

.dlog-add { padding: 0 var(--space-4) var(--space-4); }
.dlog-add-row { display: flex; gap: var(--space-2); }
.dlog-search { flex: 1; padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light); background: var(--color-surface); font-size: var(--text-sm); color: var(--color-text-primary); outline: none; font-family: var(--font-body); }
.dlog-search:focus { border-color: var(--color-primary); }

.dlog-results { margin-top: var(--space-2); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); max-height: 200px; overflow-y: auto; }
.dlog-result { padding: var(--space-2) var(--space-3); cursor: pointer; transition: background 0.15s; }
.dlog-result:hover { background: var(--color-primary-50); }
.dlog-res-main { display: flex; justify-content: space-between; }
.dlog-res-name { font-weight: 600; font-size: var(--text-sm); }
.dlog-res-cal { font-size: var(--text-xs); color: var(--color-primary); }
.dlog-res-nums { font-size: 11px; color: var(--color-text-tertiary); margin-top: 2px; }

.dlog-login { display: flex; justify-content: center; min-height: 300px; align-items: center; }
</style>
