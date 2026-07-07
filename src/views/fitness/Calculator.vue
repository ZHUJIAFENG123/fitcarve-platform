<template>
  <div class="calc-page">
    <Navbar :menu-links="menuLinks" />
    <!-- Hero Header -->
    <header class="calc-hero">
      <div class="calc-hero-bg">
        <div class="calc-hero-orb calc-hero-orb--1"></div>
        <div class="calc-hero-orb calc-hero-orb--2"></div>
      </div>
      <div class="calc-hero-content">
        <div class="calc-hero-badge">
          <CalculatorIcon :size="14" />
          <span>智能计算工具</span>
        </div>
        <h1>热量计算器</h1>
        <p>计算每日消耗 · 查询食物热量 · 自定义饮食搭配</p>
      </div>
    </header>

    <div class="calc-container">
      <!-- TDEE Calculator Card -->
      <section class="calc-card">
        <div class="calc-card-header">
          <div class="calc-card-icon" style="background: rgba(249,115,22,0.1); color: #F97316;">
            <Activity :size="20" />
          </div>
          <div>
            <h2>TDEE 每日消耗计算</h2>
            <p class="calc-card-desc">基于 Mifflin-St Jeor 公式，计算你的每日总能量消耗</p>
          </div>
        </div>

        <div class="calc-form">
          <!-- Gender -->
          <div class="calc-field">
            <label class="calc-label">性别</label>
            <div class="calc-gender-row">
              <button :class="['calc-gender', { active: tdee.gender === 'male' }]" @click="tdee.gender = 'male'">
                <div class="calc-gender-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="6"/><path d="M12 16v4"/><path d="M9 18h6"/></svg></div>
                <span>男性</span>
              </button>
              <button :class="['calc-gender', { active: tdee.gender === 'female' }]" @click="tdee.gender = 'female'">
                <div class="calc-gender-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M12 15v6"/><path d="M9 19h6"/></svg></div>
                <span>女性</span>
              </button>
            </div>
          </div>

          <!-- Number inputs -->
          <div class="calc-num-row">
            <div class="calc-num-field">
              <label class="calc-label">年龄</label>
              <div class="calc-stepper">
                <button @click="tdee.age = Math.max(10, tdee.age - 1)" class="calc-step-btn">−</button>
                <div class="calc-step-val">
                  <input v-model.number="tdee.age" type="number" min="10" max="100" />
                  <span class="calc-step-unit">岁</span>
                </div>
                <button @click="tdee.age = Math.min(100, tdee.age + 1)" class="calc-step-btn">+</button>
              </div>
            </div>
            <div class="calc-num-field">
              <label class="calc-label">身高</label>
              <div class="calc-stepper">
                <button @click="tdee.height = Math.max(100, tdee.height - 1)" class="calc-step-btn">−</button>
                <div class="calc-step-val">
                  <input v-model.number="tdee.height" type="number" min="100" max="250" />
                  <span class="calc-step-unit">cm</span>
                </div>
                <button @click="tdee.height = Math.min(250, tdee.height + 1)" class="calc-step-btn">+</button>
              </div>
            </div>
            <div class="calc-num-field">
              <label class="calc-label">体重</label>
              <div class="calc-stepper">
                <button @click="tdee.weight = Math.max(30, tdee.weight - 1)" class="calc-step-btn">−</button>
                <div class="calc-step-val">
                  <input v-model.number="tdee.weight" type="number" min="30" max="200" />
                  <span class="calc-step-unit">kg</span>
                </div>
                <button @click="tdee.weight = Math.min(200, tdee.weight + 1)" class="calc-step-btn">+</button>
              </div>
            </div>
          </div>

          <!-- Activity Level -->
          <div class="calc-field">
            <label class="calc-label">活动量</label>
            <div class="calc-activity-row">
              <button v-for="a in ACTIVITIES" :key="a.value"
                :class="['calc-activity', { active: tdee.activity === a.value }]"
                @click="tdee.activity = a.value">
                <span class="calc-activity-name">{{ a.short }}</span>
                <span class="calc-activity-desc">{{ a.desc }}</span>
                <span class="calc-activity-factor">×{{ a.value }}</span>
              </button>
            </div>
          </div>
        </div>

        <button class="calc-btn-calc" @click="calcTDEE">
          <Activity :size="16" />
          <span>计算 TDEE</span>
        </button>

        <!-- TDEE Result Dashboard -->
        <div v-if="tdeeResult" class="calc-result">
          <div class="calc-result-ring-wrap">
            <div class="calc-result-ring">
              <svg viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(249,115,22,0.1)" stroke-width="10" />
                <circle cx="80" cy="80" r="70" fill="none" stroke="#F97316" stroke-width="10"
                  stroke-linecap="round" stroke-dasharray="440" stroke-dashoffset="0"
                  transform="rotate(-90 80 80)" class="calc-ring-progress" />
              </svg>
              <div class="calc-ring-center">
                <span class="calc-ring-val">{{ tdeeResult.tdee }}</span>
                <span class="calc-ring-unit">kcal/天</span>
              </div>
            </div>
            <span class="calc-ring-label">每日总消耗 TDEE</span>
          </div>
          <div class="calc-result-cards">
            <div class="calc-result-card">
              <div class="calc-result-card-icon" style="background: rgba(249,115,22,0.1); color: #F97316;">
                <Flame :size="16" />
              </div>
              <div class="calc-result-card-info">
                <span class="calc-result-card-label">基础代谢 BMR</span>
                <span class="calc-result-card-val">{{ tdeeResult.bmr }} <small>kcal</small></span>
              </div>
            </div>
            <div class="calc-result-card cut">
              <div class="calc-result-card-icon" style="background: rgba(22,163,74,0.1); color: #16A34A;">
                <TrendingDown :size="16" />
              </div>
              <div class="calc-result-card-info">
                <span class="calc-result-card-label">减脂摄入 (-20%)</span>
                <span class="calc-result-card-val">{{ tdeeResult.cut }} <small>kcal</small></span>
              </div>
            </div>
            <div class="calc-result-card bulk">
              <div class="calc-result-card-icon" style="background: rgba(37,99,235,0.1); color: #2563EB;">
                <TrendingUp :size="16" />
              </div>
              <div class="calc-result-card-info">
                <span class="calc-result-card-label">增肌摄入 (+20%)</span>
                <span class="calc-result-card-val">{{ tdeeResult.bulk }} <small>kcal</small></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Food Search & Builder -->
      <div class="calc-two-col">
        <!-- Food Search -->
        <section class="calc-card calc-food-search">
          <div class="calc-card-header">
            <div class="calc-card-icon" style="background: rgba(37,99,235,0.1); color: #2563EB;">
              <Search :size="20" />
            </div>
            <div>
              <h2>食物热量查询</h2>
              <p class="calc-card-desc">搜索食物并添加到自定义搭配</p>
            </div>
          </div>
          <div class="calc-search-wrap">
            <Search :size="16" class="calc-search-icon" />
            <input v-model="foodSearch" placeholder="搜索食物名称..." class="calc-search-input" @input="searchFoods" />
          </div>
          <div class="calc-food-list" v-if="foodResults.length > 0">
            <div v-for="f in foodResults" :key="f.id" class="calc-food-item" @click="quickAdd(f)">
              <div class="calc-food-info">
                <span class="calc-food-name">{{ f.name }}</span>
                <span class="calc-food-sub">蛋白{{ f.protein_per_100g }}g · 碳水{{ f.carbs_per_100g }}g · 脂肪{{ f.fat_per_100g }}g</span>
              </div>
              <div class="calc-food-action">
                <span class="calc-food-kcal">{{ f.calories_per_100g }}</span>
                <span class="calc-food-kcal-unit">kcal</span>
                <button class="calc-food-add" @click.stop="quickAdd(f)" title="添加到搭配">
                  <Plus :size="14" />
                </button>
              </div>
            </div>
          </div>
          <div v-else-if="foodSearch" class="calc-food-empty">
            <Search :size="24" />
            <p>搜索食物名称开始搭配</p>
          </div>
          <div v-else class="calc-food-empty">
            <Apple :size="28" />
            <p>输入食物名称搜索</p>
          </div>
        </section>

        <!-- Meal Builder -->
        <section class="calc-card calc-builder">
          <div class="calc-card-header">
            <div class="calc-card-icon" style="background: rgba(16,185,129,0.1); color: #10B981;">
              <ClipboardList :size="20" />
            </div>
            <div>
              <h2>自定义搭配</h2>
              <p class="calc-card-desc">添加食物计算总摄入</p>
            </div>
          </div>

          <!-- Manual add -->
          <div class="calc-manual-add">
            <select v-model="customFoodId" class="calc-select">
              <option value="">选择食物</option>
              <option v-for="f in foodResults" :key="f.id" :value="f.id">{{ f.name }}</option>
            </select>
            <div class="calc-amount-wrap">
              <input v-model.number="customAmount" type="number" placeholder="克数" class="calc-amount-input" min="1" />
              <span class="calc-amount-unit">g</span>
            </div>
            <button class="calc-btn-add" @click="addCustom">
              <Plus :size="14" /> 加入
            </button>
          </div>

          <!-- Custom list -->
          <div v-if="customList.length > 0" class="calc-items">
            <div v-for="(c, i) in customList" :key="i" class="calc-item">
              <div class="calc-item-left">
                <span class="calc-item-name">{{ c.name }}</span>
                <span class="calc-item-amount">{{ c.amount }}g</span>
              </div>
              <div class="calc-item-right">
                <span class="calc-item-kcal">{{ c.calories }} kcal</span>
                <button class="calc-item-remove" @click="customList.splice(i,1)">
                  <X :size="13" />
                </button>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div v-if="customList.length > 0" class="calc-summary">
            <div class="calc-summary-header">
              <span>搭配总计</span>
              <span class="calc-summary-items">{{ customList.length }} 种食物</span>
            </div>
            <div class="calc-summary-total">
              <span class="calc-summary-cal">{{ customTotal.calories }}</span>
              <span class="calc-summary-unit">kcal</span>
            </div>
            <div class="calc-summary-macros">
              <div class="calc-summary-macro">
                <div class="calc-summary-macro-ring" style="--macro-color: #3B82F6; --macro-pct: 33">
                  <span class="calc-summary-macro-val">{{ customTotal.protein }}g</span>
                </div>
                <span class="calc-summary-macro-label">蛋白质</span>
              </div>
              <div class="calc-summary-macro">
                <div class="calc-summary-macro-ring" style="--macro-color: #F59E0B; --macro-pct: 33">
                  <span class="calc-summary-macro-val">{{ customTotal.carbs }}g</span>
                </div>
                <span class="calc-summary-macro-label">碳水</span>
              </div>
              <div class="calc-summary-macro">
                <div class="calc-summary-macro-ring" style="--macro-color: #EF4444; --macro-pct: 33">
                  <span class="calc-summary-macro-val">{{ customTotal.fat }}g</span>
                </div>
                <span class="calc-summary-macro-label">脂肪</span>
              </div>
            </div>
          </div>

          <div v-else class="calc-empty-state">
            <ClipboardList :size="28" />
            <p>点击左侧食物卡片或手动添加开始搭配</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import {
  Activity, Search, Plus, X, ClipboardList, Calculator as CalculatorIcon,
  Flame, TrendingDown, TrendingUp, Apple
} from 'lucide-vue-next'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const ACTIVITIES = [
  { value: 1.2, short: '久坐', desc: '几乎不运动', factor: '1.2' },
  { value: 1.375, short: '轻度', desc: '每周1-3次', factor: '1.375' },
  { value: 1.55, short: '中度', desc: '每周3-5次', factor: '1.55' },
  { value: 1.725, short: '高度', desc: '每周6-7次', factor: '1.725' },
  { value: 1.9, short: '运动员', desc: '每天高强度', factor: '1.9' }
]

const tdee = reactive({ gender: 'male', age: 25, height: 175, weight: 70, activity: 1.55 })
const tdeeResult = ref<any>(null)

function calcTDEE() {
  let bmr: number
  if (tdee.gender === 'male') {
    bmr = 10 * tdee.weight + 6.25 * tdee.height - 5 * tdee.age + 5
  } else {
    bmr = 10 * tdee.weight + 6.25 * tdee.height - 5 * tdee.age - 161
  }
  const tdeeV = Math.round(bmr * tdee.activity)
  tdeeResult.value = {
    bmr: Math.round(bmr),
    tdee: tdeeV,
    cut: Math.round(tdeeV * 0.8),
    bulk: Math.round(tdeeV * 1.2)
  }
}

const foodSearch = ref('')
const foodResults = ref<any[]>([])
let foodTimer: any = null

function searchFoods() {
  clearTimeout(foodTimer)
  foodTimer = setTimeout(async () => {
    if (!foodSearch.value || foodSearch.value.length < 1) { foodResults.value = []; return }
    const res = await fetch(`${API}/foods/search?keyword=${encodeURIComponent(foodSearch.value)}`)
    foodResults.value = await res.json()
  }, 300)
}

const customFoodId = ref('')
const customAmount = ref(100)
const customList = ref<any[]>([])

const customTotal = computed(() => {
  let cal = 0, prot = 0, carb = 0, fat = 0
  customList.value.forEach(c => {
    cal += c.calories; prot += c.protein; carb += c.carbs; fat += c.fat
  })
  return { calories: cal, protein: +prot.toFixed(1), carbs: +carb.toFixed(1), fat: +fat.toFixed(1) }
})

function quickAdd(food: any) {
  customFoodId.value = String(food.id)
  addCustom()
}

function addCustom() {
  const food = foodResults.value.find((f: any) => String(f.id) === String(customFoodId.value))
  if (!food || !customAmount.value) return
  const ratio = customAmount.value / 100
  customList.value.push({
    name: food.name,
    amount: customAmount.value,
    calories: Math.round(food.calories_per_100g * ratio),
    protein: +(food.protein_per_100g * ratio).toFixed(1),
    carbs: +(food.carbs_per_100g * ratio).toFixed(1),
    fat: +(food.fat_per_100g * ratio).toFixed(1)
  })
  customAmount.value = 100
  customFoodId.value = ''
}
</script>

<style scoped>
.calc-page { min-height: 100vh; background: var(--color-bg); }

/* ===== Hero ===== */
.calc-hero {
  background: linear-gradient(135deg, #C2410C 0%, #F97316 50%, #FB923C 100%);
  padding: var(--space-8) var(--space-4) var(--space-6);
  position: relative; overflow: hidden;
}
.calc-hero-bg { position: absolute; inset: 0; pointer-events: none; }
.calc-hero-orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.15; }
.calc-hero-orb--1 { width: 280px; height: 280px; background: #FDE68A; top: -80px; right: -40px; }
.calc-hero-orb--2 { width: 200px; height: 200px; background: #FDBA74; bottom: -60px; left: 10%; }
.calc-hero-content { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
.calc-hero-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
  padding: 5px 14px; border-radius: var(--radius-full);
  font-size: 12px; color: #fff; font-weight: 500;
  border: 1px solid rgba(255,255,255,0.1);
  margin-bottom: var(--space-3);
}
.calc-hero h1 { font-size: var(--text-2xl); font-weight: 800; color: #fff; letter-spacing: -0.02em; }
.calc-hero p { font-size: var(--text-sm); color: rgba(255,255,255,0.8); margin-top: 4px; }

/* ===== Container ===== */
.calc-container { max-width: 1100px; margin: 0 auto; padding: var(--space-5) var(--space-4) var(--space-12); }

/* ===== Card ===== */
.calc-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-6);
  box-shadow: var(--shadow-sm); margin-bottom: var(--space-5);
}
.calc-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: var(--space-5); }
.calc-card-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.calc-card-header h2 { font-size: var(--text-base); font-weight: 700; margin-bottom: 2px; }
.calc-card-desc { font-size: 12px; color: var(--color-text-tertiary); }

/* ===== Form ===== */
.calc-form { display: flex; flex-direction: column; gap: var(--space-4); }
.calc-label { font-size: 13px; font-weight: 600; color: var(--color-text-secondary); margin-bottom: 6px; display: block; }

/* Gender */
.calc-gender-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.calc-gender {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px; border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-lg); background: var(--color-bg-card);
  font-size: 14px; font-weight: 500; cursor: pointer;
  transition: all 0.25s; color: var(--color-text-secondary);
}
.calc-gender.active {
  border-color: #F97316; background: rgba(249,115,22,0.06);
  color: #F97316; font-weight: 600;
  box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
}
.calc-gender-icon { display: flex; opacity: 0.6; }
.calc-gender.active .calc-gender-icon { opacity: 1; }

/* Number fields */
.calc-num-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.calc-num-field { display: flex; flex-direction: column; gap: 4px; }
.calc-stepper {
  display: flex; align-items: stretch;
  border: 1.5px solid var(--color-border-light); border-radius: var(--radius-lg);
  overflow: hidden; transition: border-color 0.2s;
}
.calc-stepper:focus-within { border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(249,115,22,0.08); }
.calc-step-btn {
  width: 38px; border: none; background: var(--color-bg);
  cursor: pointer; font-size: 16px; font-weight: 600;
  color: var(--color-text-secondary); transition: background 0.15s;
  display: flex; align-items: center; justify-content: center;
}
.calc-step-btn:hover { background: var(--color-border-light); }
.calc-step-val { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
.calc-step-val input {
  width: 100%; border: none; text-align: center;
  font-size: 18px; font-weight: 700; outline: none;
  background: transparent; color: var(--color-text-primary);
  -moz-appearance: textfield;
}
.calc-step-val input::-webkit-outer-spin-button,
.calc-step-val input::-webkit-inner-spin-button { -webkit-appearance: none; }
.calc-step-unit { font-size: 11px; color: var(--color-text-tertiary); margin-top: -2px; }

/* Activity */
.calc-activity-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.calc-activity {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 12px 6px; border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-lg); background: var(--color-bg-card);
  cursor: pointer; transition: all 0.25s; text-align: center;
}
.calc-activity.active {
  border-color: #F97316; background: rgba(249,115,22,0.05);
  box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
}
.calc-activity-name { font-size: 13px; font-weight: 600; color: var(--color-text-primary); }
.calc-activity.active .calc-activity-name { color: #F97316; }
.calc-activity-desc { font-size: 10px; color: var(--color-text-tertiary); }
.calc-activity-factor { font-size: 10px; color: var(--color-text-tertiary); font-family: var(--font-mono); opacity: 0.6; }

/* Calculate Button */
.calc-btn-calc {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px; margin-top: var(--space-5);
  background: linear-gradient(135deg, #F97316, #EA580C);
  color: #fff; border: none; border-radius: var(--radius-lg);
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 0.25s; box-shadow: 0 4px 12px rgba(249,115,22,0.25);
}
.calc-btn-calc:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(249,115,22,0.35); }

/* ===== TDEE Result Dashboard ===== */
.calc-result {
  margin-top: var(--space-5); padding: var(--space-6);
  background: linear-gradient(135deg, rgba(249,115,22,0.04), rgba(249,115,22,0.01));
  border: 1px solid rgba(249,115,22,0.12); border-radius: var(--radius-xl);
  animation: fadeUp 0.5s ease;
}
.calc-result-ring-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: var(--space-5); }
.calc-result-ring { position: relative; width: 160px; height: 160px; }
.calc-result-ring svg { width: 100%; height: 100%; }
.calc-ring-progress { animation: ringDraw 1s ease forwards; }
@keyframes ringDraw { from { stroke-dashoffset: 440; } to { stroke-dashoffset: 0; } }
.calc-ring-center {
  position: absolute; inset: 0; display: flex;
  flex-direction: column; align-items: center; justify-content: center;
}
.calc-ring-val { font-size: 36px; font-weight: 800; color: #F97316; line-height: 1; }
.calc-ring-unit { font-size: 12px; color: var(--color-text-tertiary); margin-top: 4px; }
.calc-ring-label { font-size: 13px; color: var(--color-text-secondary); margin-top: 10px; font-weight: 500; }

.calc-result-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.calc-result-card {
  display: flex; align-items: center; gap: 12px;
  padding: 14px; background: var(--color-bg-card);
  border: 1px solid var(--color-border-light); border-radius: var(--radius-lg);
}
.calc-result-card-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.calc-result-card-info { display: flex; flex-direction: column; gap: 2px; }
.calc-result-card-label { font-size: 11px; color: var(--color-text-tertiary); }
.calc-result-card-val { font-size: 18px; font-weight: 800; color: var(--color-text-primary); }
.calc-result-card-val small { font-size: 11px; font-weight: 500; color: var(--color-text-tertiary); margin-left: 2px; }
.calc-result-card.cut .calc-result-card-val { color: #16A34A; }
.calc-result-card.bulk .calc-result-card-val { color: #2563EB; }

/* ===== Two Column Layout ===== */
.calc-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }

/* ===== Food Search ===== */
.calc-search-wrap { position: relative; margin-bottom: var(--space-4); }
.calc-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--color-text-tertiary); pointer-events: none; }
.calc-search-input {
  width: 100%; padding: 12px 16px 12px 42px;
  border: 1.5px solid var(--color-border-light); border-radius: var(--radius-lg);
  font-size: 14px; outline: none; transition: all 0.25s;
  background: var(--color-bg); color: var(--color-text-primary);
}
.calc-search-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(27,107,58,0.08); }

.calc-food-list { max-height: 340px; overflow-y: auto; border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); }
.calc-food-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 14px; cursor: pointer; transition: background 0.15s;
  border-bottom: 1px solid var(--color-border-light);
}
.calc-food-item:last-child { border-bottom: none; }
.calc-food-item:hover { background: rgba(27,107,58,0.03); }
.calc-food-info { min-width: 0; }
.calc-food-name { font-size: 13px; font-weight: 600; color: var(--color-text-primary); display: block; }
.calc-food-sub { font-size: 11px; color: var(--color-text-tertiary); }
.calc-food-action { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.calc-food-kcal { font-size: 15px; font-weight: 700; color: var(--color-accent); }
.calc-food-kcal-unit { font-size: 10px; color: var(--color-text-tertiary); }
.calc-food-add {
  width: 26px; height: 26px; border-radius: 8px; border: none;
  background: rgba(27,107,58,0.08); color: var(--color-primary);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.calc-food-add:hover { background: var(--color-primary); color: #fff; }

.calc-food-empty { text-align: center; padding: 28px 16px; color: var(--color-text-tertiary); }
.calc-food-empty svg { margin-bottom: 8px; opacity: 0.3; }
.calc-food-empty p { font-size: 13px; }

/* ===== Meal Builder ===== */
.calc-manual-add { display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-4); }
.calc-select { flex: 1; padding: 10px 12px; border: 1.5px solid var(--color-border-light); border-radius: var(--radius-lg); font-size: 13px; outline: none; background: var(--color-bg-card); color: var(--color-text-primary); }
.calc-amount-wrap { position: relative; display: flex; align-items: center; }
.calc-amount-input { width: 80px; padding: 10px 26px 10px 12px; border: 1.5px solid var(--color-border-light); border-radius: var(--radius-lg); font-size: 13px; outline: none; background: var(--color-bg-card); color: var(--color-text-primary); }
.calc-amount-unit { position: absolute; right: 10px; font-size: 12px; color: var(--color-text-tertiary); pointer-events: none; }
.calc-btn-add {
  display: flex; align-items: center; gap: 4px;
  padding: 10px 16px; background: var(--color-primary); color: #fff;
  border: none; border-radius: var(--radius-lg);
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.2s; white-space: nowrap;
}
.calc-btn-add:hover { background: #15803d; }

/* Items list */
.calc-items { display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto; margin-bottom: var(--space-4); }
.calc-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; background: var(--color-bg);
  border-radius: var(--radius-lg); border: 1px solid var(--color-border-light);
}
.calc-item-left { display: flex; align-items: center; gap: 8px; }
.calc-item-name { font-size: 13px; font-weight: 600; }
.calc-item-amount { font-size: 11px; color: var(--color-text-tertiary); background: var(--color-bg-card); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--color-border-light); }
.calc-item-right { display: flex; align-items: center; gap: 8px; }
.calc-item-kcal { font-size: 13px; font-weight: 700; color: var(--color-accent); }
.calc-item-remove {
  width: 22px; height: 22px; border-radius: 6px; border: none;
  background: transparent; color: var(--color-text-tertiary);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.calc-item-remove:hover { background: rgba(239,68,68,0.1); color: #ef4444; }

/* Summary */
.calc-summary {
  padding: var(--space-4); background: linear-gradient(135deg, rgba(16,185,129,0.05), rgba(16,185,129,0.02));
  border: 1px solid rgba(16,185,129,0.15); border-radius: var(--radius-lg);
  animation: fadeUp 0.4s ease;
}
.calc-summary-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.calc-summary-header span { font-size: 13px; color: var(--color-text-secondary); font-weight: 500; }
.calc-summary-items { font-size: 11px; color: var(--color-text-tertiary); }
.calc-summary-total { text-align: center; margin-bottom: var(--space-4); }
.calc-summary-cal { font-size: 32px; font-weight: 800; color: var(--color-accent); }
.calc-summary-unit { font-size: 14px; color: var(--color-text-tertiary); margin-left: 4px; font-weight: 500; }
.calc-summary-macros { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.calc-summary-macro { text-align: center; }
.calc-summary-macro-ring {
  width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 6px;
  background: conic-gradient(var(--macro-color) calc(var(--macro-pct) * 1%), var(--color-surface) 0);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.calc-summary-macro-ring::after {
  content: ''; position: absolute; inset: 4px; border-radius: 50%;
  background: var(--color-bg-card);
}
.calc-summary-macro-val { position: relative; z-index: 1; font-size: 12px; font-weight: 700; color: var(--color-text-primary); }
.calc-summary-macro-label { font-size: 11px; color: var(--color-text-tertiary); }

/* Empty state */
.calc-empty-state { text-align: center; padding: 28px 16px; color: var(--color-text-tertiary); }
.calc-empty-state svg { margin-bottom: 8px; opacity: 0.3; }
.calc-empty-state p { font-size: 13px; }

/* ===== Animations ===== */
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .calc-num-row { grid-template-columns: 1fr; }
  .calc-activity-row { grid-template-columns: repeat(3, 1fr); }
  .calc-result-cards { grid-template-columns: 1fr; }
  .calc-two-col { grid-template-columns: 1fr; }
  .calc-manual-add { flex-wrap: wrap; }
  .calc-manual-add .calc-select { flex-basis: 100%; }
}
@media (max-width: 480px) {
  .calc-activity-row { grid-template-columns: repeat(2, 1fr); }
  .calc-gender-row { grid-template-columns: 1fr; }
}
</style>
