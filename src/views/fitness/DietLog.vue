<template>
  <div class="dlog-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Header with Date Navigation -->
    <header class="dlog-header">
      <div class="dlog-header-inner">
        <div class="dlog-header-top">
          <h1 class="dlog-title">饮食记录</h1>
          <button class="dlog-today-btn" @click="goToday" v-if="logDate !== todayStr">回到今天</button>
        </div>
        <div class="dlog-date-bar">
          <button class="dlog-date-arrow" @click="changeDate(-7)"><ChevronLeft :size="14" /></button>
          <div class="dlog-week-strip">
            <button
              v-for="day in weekDays"
              :key="day.date"
              :class="['dlog-day', { active: day.date === logDate, today: day.date === todayStr, 'has-data': day.hasData }]"
              @click="selectDate(day.date)"
            >
              <span class="dlog-day-label">{{ day.label }}</span>
              <span class="dlog-day-num">{{ day.dayNum }}</span>
              <span v-if="day.hasData" class="dlog-day-dot"></span>
            </button>
          </div>
          <button class="dlog-date-arrow" @click="changeDate(7)"><ChevronRight :size="14" /></button>
        </div>
      </div>
    </header>

    <div class="dlog-container" v-if="loggedIn">
      <!-- Intake Overview -->
      <div class="dlog-overview">
        <div class="dlog-over-main">
          <div class="dlog-over-ring" :style="{ '--pct': caloriePercent }">
            <span class="dlog-over-val">{{ summary.total_calories || 0 }}</span>
            <span class="dlog-over-unit">kcal</span>
          </div>
          <div class="dlog-over-info">
            <span class="dlog-over-label">已摄入</span>
            <span class="dlog-over-target">目标 {{ targetCalories }} kcal</span>
          </div>
        </div>
        <div class="dlog-over-divider"></div>
        <div class="dlog-over-macros">
          <div class="dlog-over-macro">
            <div class="dlog-over-macro-header">
              <span class="dlog-over-macro-dot" style="background: #3B82F6"></span>
              <span class="dlog-over-macro-label">蛋白质</span>
              <span class="dlog-over-macro-val" style="color: #3B82F6">{{ summary.total_protein || 0 }}g</span>
            </div>
            <div class="dlog-over-macro-bar"><div class="dlog-over-macro-fill" style="background: #3B82F6; width: 40%"></div></div>
          </div>
          <div class="dlog-over-macro">
            <div class="dlog-over-macro-header">
              <span class="dlog-over-macro-dot" style="background: #F59E0B"></span>
              <span class="dlog-over-macro-label">碳水</span>
              <span class="dlog-over-macro-val" style="color: #F59E0B">{{ summary.total_carbs || 0 }}g</span>
            </div>
            <div class="dlog-over-macro-bar"><div class="dlog-over-macro-fill" style="background: #F59E0B; width: 50%"></div></div>
          </div>
          <div class="dlog-over-macro">
            <div class="dlog-over-macro-header">
              <span class="dlog-over-macro-dot" style="background: #EF4444"></span>
              <span class="dlog-over-macro-label">脂肪</span>
              <span class="dlog-over-macro-val" style="color: #EF4444">{{ summary.total_fat || 0 }}g</span>
            </div>
            <div class="dlog-over-macro-bar"><div class="dlog-over-macro-fill" style="background: #EF4444; width: 30%"></div></div>
          </div>
        </div>
      </div>

      <!-- AI Smart Analysis -->
      <div class="dlog-ai">
        <div class="dlog-ai-header">
          <div class="dlog-ai-title-row">
            <div class="dlog-ai-icon-wrap">
              <Sparkles :size="16" />
            </div>
            <div>
              <h4>AI 智能记录</h4>
              <span class="dlog-ai-sub">描述你吃了什么，AI自动估算热量</span>
            </div>
          </div>
        </div>
        <div class="dlog-ai-input-row">
          <input
            v-model="aiInput"
            class="dlog-ai-input"
            placeholder="如：鸡胸肉沙拉150g，半碗米饭..."
            @keyup.enter="aiAnalyze"
            :disabled="aiLoading"
          />
          <button class="dlog-ai-btn" @click="aiAnalyze" :disabled="aiLoading || !aiInput.trim()">
            <Loader2 v-if="aiLoading" :size="16" class="animate-spin" />
            <Sparkles v-else :size="16" />
            {{ aiLoading ? '分析中...' : 'AI分析' }}
          </button>
        </div>
        <div v-if="aiResult" class="dlog-ai-result">
          <div class="dlog-ai-result-text" v-html="renderMd(aiResult)"></div>
          <div class="dlog-ai-actions">
            <button class="dlog-ai-save" @click="aiSaveTo('breakfast')">添加到早餐</button>
            <button class="dlog-ai-save" @click="aiSaveTo('lunch')">添加到午餐</button>
            <button class="dlog-ai-save" @click="aiSaveTo('dinner')">添加到晚餐</button>
          </div>
        </div>
        <p v-if="aiError" class="dlog-ai-error">{{ aiError }}</p>
      </div>

      <!-- Meals -->
      <div v-for="meal in MEALS" :key="meal.value" class="dlog-meal">
        <div class="dlog-meal-header" @click="toggleMeal(meal.value)">
          <div class="dlog-meal-title">
            <div class="dlog-meal-icon-wrap">
              <component :is="meal.icon" :size="16" />
            </div>
            <h3>{{ meal.label }}</h3>
          </div>
          <div class="dlog-meal-right">
            <span class="dlog-meal-total">{{ mealCalories(meal.value) }} kcal</span>
            <ChevronDown :size="14" :class="['dlog-meal-chevron', { open: openMeals[meal.value] }]" />
          </div>
        </div>

        <div v-show="openMeals[meal.value]" class="dlog-meal-body">
          <!-- Logged Items -->
          <div class="dlog-items" v-if="mealItems(meal.value).length">
            <div v-for="item in mealItems(meal.value)" :key="item.id" class="dlog-item">
              <span class="dlog-item-name">{{ item.food_name }}</span>
              <span class="dlog-item-amount">{{ item.amount_g }}g</span>
              <span class="dlog-item-cal">{{ item.calories }} kcal</span>
              <button class="dlog-item-del" @click.stop="removeItem(item.id)">
                <X :size="14" />
              </button>
            </div>
          </div>

          <!-- Search & Add -->
          <div class="dlog-add">
            <div class="dlog-search-wrap">
              <Search :size="14" class="dlog-search-icon" />
              <input
                v-model="searchQueries[meal.value]"
                :placeholder="'搜索食物添加到' + meal.label"
                class="dlog-search"
                @input="onSearchInput(meal.value)"
                @focus="activeMeal = meal.value"
              />
            </div>
            <div v-if="activeMeal === meal.value && searchResults.length > 0" class="dlog-results">
              <div v-for="food in searchResults" :key="food.id" class="dlog-result" @click="addFood(meal.value, food)">
                <div class="dlog-res-main">
                  <span class="dlog-res-name">{{ food.name }}</span>
                  <span class="dlog-res-cal">{{ food.calories_per_100g }} kcal</span>
                </div>
                <div class="dlog-res-nums">
                  蛋白{{ food.protein_per_100g }}g · 碳水{{ food.carbs_per_100g }}g · 脂肪{{ food.fat_per_100g }}g
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="dlog-container dlog-login">
      <div class="dlog-login-card">
        <div class="dlog-login-icon-wrap">
          <LogIn :size="28" :stroke-width="1.5" />
        </div>
        <p>请先登录以记录饮食</p>
        <button class="dlog-login-btn" @click="$router.push('/login')">去登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { ElMessage } from 'element-plus'
import {
  ChevronLeft, ChevronRight, ChevronDown, Search, X, Sparkles, Loader2,
  Croissant, Salad, UtensilsCrossed, Cookie, LogIn
} from 'lucide-vue-next'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const API = import.meta.env.VITE_API_BASE_URL || '/api'
const MEALS = [
  { value: 'breakfast', label: '早餐', icon: Croissant },
  { value: 'lunch', label: '午餐', icon: Salad },
  { value: 'dinner', label: '晚餐', icon: UtensilsCrossed },
  { value: 'snack', label: '加餐', icon: Cookie }
]

const targetCalories = 2000
const loggedIn = ref(!!localStorage.getItem('token'))
const logDate = ref(new Date().toISOString().slice(0, 10))
const logs = ref<any[]>([])
const summary = ref<any>({})
const searchQueries: Record<string, string> = reactive({ breakfast: '', lunch: '', dinner: '', snack: '' })
const searchResults = ref<any[]>([])
const activeMeal = ref('')
const openMeals = reactive<Record<string, boolean>>({ breakfast: true, lunch: true, dinner: true, snack: true })
let searchTimer: any = null

const todayStr = new Date().toISOString().slice(0, 10)

const caloriePercent = computed(() => {
  const cal = summary.value?.total_calories || 0
  return Math.min(100, Math.round((cal / targetCalories) * 100))
})

const weekDays = computed(() => {
  const base = new Date(logDate.value)
  const dayOfWeek = base.getDay()
  const monday = new Date(base)
  monday.setDate(base.getDate() - ((dayOfWeek + 6) % 7))
  const labels = ['一', '二', '三', '四', '五', '六', '日']
  return labels.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const dateStr = d.toISOString().slice(0, 10)
    return {
      label: '周' + label,
      date: dateStr,
      dayNum: d.getDate(),
      hasData: false
    }
  })
})

function changeDate(delta: number) {
  const d = new Date(logDate.value)
  d.setDate(d.getDate() + delta)
  logDate.value = d.toISOString().slice(0, 10)
  fetchLogs()
}
function selectDate(date: string) { logDate.value = date; fetchLogs() }
function goToday() { logDate.value = todayStr; fetchLogs() }
function toggleMeal(type: string) { openMeals[type] = !openMeals[type] }

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

const aiInput = ref('')
const aiLoading = ref(false)
const aiResult = ref('')
const aiError = ref('')

function renderMd(text: string) { return text ? text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') : '' }

async function aiAnalyze() {
  if (!aiInput.value.trim() || aiLoading.value) return
  aiLoading.value = true; aiError.value = ''; aiResult.value = ''
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`${API}/ai/analyze-diet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ description: aiInput.value })
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    aiResult.value = data.analysis
  } catch (e: any) { aiError.value = e.message || '分析失败' }
  finally { aiLoading.value = false }
}

function aiSaveTo(type: string) {
  aiInput.value = ''; aiResult.value = ''
  ElMessage.success('已添加到' + type)
}

onMounted(() => { if (loggedIn.value) fetchLogs() })
</script>

<style scoped>
.dlog-page { min-height: 100vh; background: var(--color-bg); }

/* Header */
.dlog-header { background: linear-gradient(145deg, #0F3D24 0%, #1B6B3A 50%, #238B4D 100%); padding: var(--space-5) var(--space-4) var(--space-5); }
.dlog-header-inner { max-width: 700px; margin: 0 auto; }
.dlog-header-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3); }
.dlog-title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 800; color: #fff; }
.dlog-today-btn { background: rgba(255,255,255,0.15); border: none; color: #fff; padding: 5px 14px; border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 600; cursor: pointer; }

/* Date Bar */
.dlog-date-bar { display: flex; align-items: center; gap: var(--space-2); }
.dlog-date-arrow { background: rgba(255,255,255,0.12); border: none; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
.dlog-date-arrow:hover { background: rgba(255,255,255,0.2); }
.dlog-week-strip { display: flex; gap: 4px; flex: 1; justify-content: center; }
.dlog-day { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 10px; border-radius: var(--radius-md); background: rgba(255,255,255,0.08); border: none; color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; min-width: 44px; position: relative; }
.dlog-day:hover { background: rgba(255,255,255,0.15); }
.dlog-day.active { background: rgba(255,255,255,0.2); color: #fff; }
.dlog-day.today { border: 1px solid rgba(255,255,255,0.3); }
.dlog-day-label { font-size: 10px; }
.dlog-day-num { font-size: var(--text-sm); font-weight: 700; }
.dlog-day-dot { width: 4px; height: 4px; border-radius: 50%; background: #22C55E; position: absolute; bottom: 3px; }

/* Container */
.dlog-container { max-width: 700px; margin: 0 auto; padding: var(--space-5) var(--space-4) var(--space-12); }

/* Overview */
.dlog-overview {
  display: flex; align-items: center; gap: var(--space-5);
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-5);
  margin-bottom: var(--space-5);
}
.dlog-over-main { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); min-width: 120px; }
.dlog-over-ring {
  width: 90px; height: 90px; border-radius: 50%;
  background: conic-gradient(var(--color-primary) calc(var(--pct, 0) * 1%), var(--color-primary-50) 0);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  position: relative;
}
.dlog-over-ring::before { content: ''; position: absolute; inset: 6px; border-radius: 50%; background: var(--color-bg-card); }
.dlog-over-val { position: relative; z-index: 1; font-family: var(--font-display); font-size: var(--text-xl); font-weight: 800; color: var(--color-primary); }
.dlog-over-unit { position: relative; z-index: 1; font-size: 10px; color: var(--color-text-tertiary); }
.dlog-over-info { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.dlog-over-label { font-size: var(--text-xs); color: var(--color-text-secondary); font-weight: 600; }
.dlog-over-target { font-size: 11px; color: var(--color-text-tertiary); }
.dlog-over-divider { width: 1px; height: 80px; background: var(--color-border-light); flex-shrink: 0; }
.dlog-over-macros { flex: 1; display: flex; flex-direction: column; gap: var(--space-3); }
.dlog-over-macro { display: flex; flex-direction: column; gap: 4px; }
.dlog-over-macro-header { display: flex; align-items: center; gap: 6px; }
.dlog-over-macro-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.dlog-over-macro-label { font-size: var(--text-xs); color: var(--color-text-tertiary); flex: 1; }
.dlog-over-macro-val { font-size: var(--text-sm); font-weight: 700; }
.dlog-over-macro-bar { height: 6px; background: var(--color-surface); border-radius: 3px; overflow: hidden; }
.dlog-over-macro-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }

/* AI Card */
.dlog-ai { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); padding: var(--space-5); margin-bottom: var(--space-5); }
.dlog-ai-header { margin-bottom: var(--space-3); }
.dlog-ai-title-row { display: flex; align-items: center; gap: var(--space-3); }
.dlog-ai-icon-wrap {
  width: 36px; height: 36px; border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.dlog-ai-title-row h4 { margin: 0; font-size: var(--text-base); font-weight: 700; }
.dlog-ai-sub { font-size: var(--text-xs); color: var(--color-text-tertiary); display: block; margin-top: 2px; }
.dlog-ai-input-row { display: flex; gap: var(--space-2); }
.dlog-ai-input { flex: 1; padding: 10px 14px; border-radius: var(--radius-md); border: 1.5px solid var(--color-border); background: var(--color-bg); font-size: var(--text-sm); outline: none; font-family: var(--font-body); color: var(--color-text-primary); transition: border-color 0.2s; }
.dlog-ai-input:focus { border-color: var(--color-primary); }
.dlog-ai-btn { display: flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: var(--radius-md); border: none; background: var(--color-primary); color: #fff; font-weight: 600; font-size: var(--text-sm); cursor: pointer; white-space: nowrap; font-family: var(--font-body); transition: opacity 0.2s; }
.dlog-ai-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.dlog-ai-result { margin-top: var(--space-3); padding: var(--space-3); background: var(--color-primary-50); border-radius: var(--radius-md); }
.dlog-ai-result-text { font-size: var(--text-sm); line-height: var(--leading-relaxed); margin-bottom: var(--space-3); color: var(--color-text-primary); }
.dlog-ai-actions { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.dlog-ai-save { padding: 6px 14px; border-radius: var(--radius-full); border: 1px solid var(--color-primary); background: var(--color-bg-card); color: var(--color-primary); font-size: 12px; cursor: pointer; font-weight: 500; transition: all 0.15s; }
.dlog-ai-save:hover { background: var(--color-primary); color: #fff; }
.dlog-ai-error { font-size: var(--text-xs); color: var(--state-error); margin-top: var(--space-2); }

/* Meals */
.dlog-meal { margin-bottom: var(--space-3); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); overflow: hidden; }
.dlog-meal-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-3) var(--space-4); cursor: pointer; transition: background 0.15s; }
.dlog-meal-header:hover { background: var(--color-bg-warm); }
.dlog-meal-title { display: flex; align-items: center; gap: var(--space-2); }
.dlog-meal-icon-wrap {
  width: 28px; height: 28px; border-radius: var(--radius-md);
  background: var(--color-accent-50);
  color: var(--color-accent);
  display: flex; align-items: center; justify-content: center;
}
.dlog-meal-title h3 { margin: 0; font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); }
.dlog-meal-right { display: flex; align-items: center; gap: var(--space-2); }
.dlog-meal-total { font-weight: 700; color: var(--color-primary); font-size: var(--text-sm); }
.dlog-meal-chevron { color: var(--color-text-tertiary); transition: transform 0.2s; }
.dlog-meal-chevron.open { transform: rotate(180deg); }

.dlog-meal-body { border-top: 1px solid var(--color-border-light); }
.dlog-items { padding: var(--space-3) var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); border-bottom: 1px solid var(--color-border-light); }
.dlog-item { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-sm); padding: var(--space-1) 0; }
.dlog-item-name { flex: 1; color: var(--color-text-primary); font-weight: 500; }
.dlog-item-amount { color: var(--color-text-tertiary); font-size: var(--text-xs); }
.dlog-item-cal { color: var(--color-primary); font-weight: 600; }
.dlog-item-del { background: none; border: none; color: var(--color-text-tertiary); cursor: pointer; padding: 4px; border-radius: var(--radius-sm); transition: all 0.15s; display: flex; }
.dlog-item-del:hover { color: var(--state-error); background: rgba(220,38,38,0.08); }

.dlog-add { padding: var(--space-3) var(--space-4) var(--space-4); }
.dlog-search-wrap { display: flex; align-items: center; gap: var(--space-2); background: var(--color-bg); border: 1.5px solid var(--color-border-light); border-radius: var(--radius-md); padding: 6px 12px; transition: border-color 0.2s; }
.dlog-search-wrap:focus-within { border-color: var(--color-primary); }
.dlog-search-icon { color: var(--color-text-tertiary); flex-shrink: 0; }
.dlog-search { flex: 1; border: none; outline: none; background: transparent; font-size: var(--text-sm); color: var(--color-text-primary); font-family: var(--font-body); }

.dlog-results { margin-top: var(--space-2); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); max-height: 200px; overflow-y: auto; }
.dlog-result { padding: var(--space-2) var(--space-3); cursor: pointer; transition: background 0.15s; }
.dlog-result:hover { background: var(--color-primary-50); }
.dlog-res-main { display: flex; justify-content: space-between; }
.dlog-res-name { font-weight: 600; font-size: var(--text-sm); }
.dlog-res-cal { font-size: var(--text-xs); color: var(--color-primary); font-weight: 600; }
.dlog-res-nums { font-size: 11px; color: var(--color-text-tertiary); margin-top: 2px; }

/* Login */
.dlog-login { display: flex; justify-content: center; min-height: 300px; align-items: center; }
.dlog-login-card { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); padding: var(--space-8); background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); }
.dlog-login-icon-wrap {
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--color-surface);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-tertiary); opacity: 0.6;
}
.dlog-login-card p { color: var(--color-text-secondary); }
.dlog-login-btn { padding: 10px 24px; background: var(--color-primary); color: #fff; border: none; border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600; cursor: pointer; }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin { animation: spin 1s linear infinite; }
</style>
