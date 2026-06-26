<template>
  <div class="calc-page">
    <Navbar :menu-links="menuLinks" />

    <div class="calc-hero">
      <h1>🔥 热量计算器</h1>
      <p>计算你的每日消耗 + 查询食物热量</p>
    </div>

    <div class="calc-container">
      <div class="calc-grid">
        <!-- TDEE 计算器 -->
        <div class="calc-card">
          <h2>📊 TDEE 计算器</h2>
          <div class="calc-form">
            <div class="calc-row">
              <label>性别</label>
              <div class="calc-toggle">
                <button :class="{ active: tdee.gender === 'male' }" @click="tdee.gender = 'male'">男</button>
                <button :class="{ active: tdee.gender === 'female' }" @click="tdee.gender = 'female'">女</button>
              </div>
            </div>
            <div class="calc-row">
              <label>年龄</label><input v-model.number="tdee.age" type="number" class="calc-input" /> <span>岁</span>
            </div>
            <div class="calc-row">
              <label>身高</label><input v-model.number="tdee.height" type="number" class="calc-input" /> <span>cm</span>
            </div>
            <div class="calc-row">
              <label>体重</label><input v-model.number="tdee.weight" type="number" class="calc-input" /> <span>kg</span>
            </div>
            <div class="calc-row">
              <label>活动量</label>
              <select v-model="tdee.activity" class="calc-select">
                <option v-for="a in ACTIVITIES" :key="a.value" :value="a.value">{{ a.label }}</option>
              </select>
            </div>
          </div>

          <div v-if="tdeeResult" class="calc-result">
            <div class="cr-item"><span>TDEE</span><strong>{{ tdeeResult.tdee }}</strong> kcal/天</div>
            <div class="cr-item"><span>BMR</span><strong>{{ tdeeResult.bmr }}</strong> kcal</div>
            <div class="cr-sub">
              <span>减脂 (-20%)：{{ tdeeResult.cut }} kcal</span>
              <span>增肌 (+20%)：{{ tdeeResult.bulk }} kcal</span>
            </div>
          </div>
          <button class="calc-btn" @click="calcTDEE">计算 TDEE</button>
        </div>

        <!-- 食物查询 -->
        <div class="calc-card">
          <h2>🔍 食物热量查询</h2>
          <div class="calc-form">
            <input v-model="foodSearch" placeholder="搜索食物名称..." class="calc-input calc-input-full" @input="searchFoods" />
          </div>
          <div class="calc-food-list" v-if="foodResults.length > 0">
            <div v-for="f in foodResults" :key="f.id" class="calc-food-item" @click="quickAdd(f)">
              <div class="cfi-left">
                <span class="cfi-name">{{ f.name }}</span>
                <span class="cfi-nums">蛋白{{ f.protein_per_100g }}g · 碳水{{ f.carbs_per_100g }}g · 脂肪{{ f.fat_per_100g }}g</span>
              </div>
              <span class="cfi-cal">{{ f.calories_per_100g }} kcal/100g</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 自定义摄入计算 -->
      <div class="calc-card calc-custom">
        <h2>🧮 自定义摄入计算</h2>
        <div class="calc-custom-form">
          <select v-model="customFoodId" class="calc-select">
            <option value="">选择食物</option>
            <option v-for="f in foodResults" :key="f.id" :value="f.id">{{ f.name }}</option>
          </select>
          <input v-model.number="customAmount" type="number" placeholder="克数" class="calc-input" min="1" />
          <button class="calc-btn calc-btn-sm" @click="addCustom">加入计算</button>
        </div>
        <div v-if="customList.length > 0" class="calc-custom-list">
          <div v-for="(c, i) in customList" :key="i" class="calc-custom-item">
            <span>{{ c.name }} {{ c.amount }}g</span>
            <span class="cci-cal">{{ c.calories }} kcal</span>
            <button @click="customList.splice(i,1)">✕</button>
          </div>
          <div class="calc-custom-total">
            <strong>合计：{{ customTotal.calories }} kcal | 蛋白{{ customTotal.protein }}g | 碳水{{ customTotal.carbs }}g | 脂肪{{ customTotal.fat }}g</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const ACTIVITIES = [
  { value: 1.2, label: '久坐（几乎不运动）' },
  { value: 1.375, label: '轻度（每周1-3次）' },
  { value: 1.55, label: '中度（每周3-5次）' },
  { value: 1.725, label: '高度（每周6-7次）' },
  { value: 1.9, label: '运动员（每天高强度）' }
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
.calc-hero { background: linear-gradient(135deg, #F97316, #EA580C); padding: var(--space-8) var(--space-4); text-align: center; }
.calc-hero h1 { font-family: var(--font-display); font-size: var(--text-3xl); color: #fff; font-weight: 800; }
.calc-hero p { color: #FFEDD5; margin-top: var(--space-2); }
.calc-container { max-width: 900px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }
.calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-5); }

.calc-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl);
  padding: var(--space-5); box-shadow: var(--shadow-sm);
}
.calc-card h2 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4); }

.calc-form { display: flex; flex-direction: column; gap: var(--space-3); }
.calc-row { display: flex; align-items: center; gap: var(--space-2); }
.calc-row label { width: 60px; font-size: var(--text-sm); color: var(--color-text-secondary); flex-shrink: 0; }
.calc-input { flex: 1; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light); font-size: var(--text-sm); outline: none; font-family: var(--font-body); background: var(--color-surface); color: var(--color-text-primary); }
.calc-input:focus { border-color: var(--color-accent); }
.calc-input-full { width: 100%; }
.calc-select { padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light); font-size: var(--text-sm); outline: none; background: var(--color-surface); font-family: var(--font-body); }
.calc-toggle { display: flex; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border-light); }
.calc-toggle button { padding: 6px 20px; border: none; background: var(--color-bg-card); cursor: pointer; font-size: var(--text-sm); font-family: var(--font-body); }
.calc-toggle button.active { background: var(--color-accent); color: #fff; }

.calc-btn { margin-top: var(--space-4); width: 100%; padding: 10px; border-radius: var(--radius-md); border: none; background: var(--color-accent); color: #fff; font-weight: 700; cursor: pointer; font-size: var(--text-sm); font-family: var(--font-body); }
.calc-btn:hover { opacity:0.9; }
.calc-btn-sm { width: auto; padding: 8px 20px; margin-top: 0; }

.calc-result { margin-top: var(--space-4); padding: var(--space-4); background: var(--color-accent-50); border-radius: var(--radius-lg); }
.cr-item { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-2); }
.cr-item span { font-size: var(--text-sm); color: var(--color-text-secondary); }
.cr-item strong { font-size: var(--text-2xl); color: var(--color-accent); font-family: var(--font-display); }
.cr-sub { display: flex; gap: var(--space-3); font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: var(--space-2); }

.calc-food-list { max-height: 250px; overflow-y: auto; margin-top: var(--space-2); border: 1px solid var(--color-border-light); border-radius: var(--radius-md); }
.calc-food-item { display: flex; justify-content: space-between; align-items: center; padding: var(--space-2) var(--space-3); cursor: pointer; transition: background 0.15s; }
.calc-food-item:hover { background: var(--color-accent-50); }
.cfi-left { min-width:0; }
.cfi-name { font-weight: 600; font-size: var(--text-sm); color: var(--color-text-primary); }
.cfi-nums { font-size: 11px; color: var(--color-text-tertiary); display: block; }
.cfi-cal { font-weight: 700; color: var(--color-accent); font-size: var(--text-sm); white-space: nowrap; }

.calc-custom { margin-top:0; }
.calc-custom-form { display: flex; gap: var(--space-2); align-items: center; }
.calc-custom-list { margin-top: var(--space-4); }
.calc-custom-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-1) 0; font-size: var(--text-sm); }
.calc-custom-item button { background:none; border:none; color: var(--color-text-tertiary); cursor: pointer; }
.calc-custom-item button:hover { color: var(--state-error); }
.cci-cal { color: var(--color-accent); font-weight: 600; }
.calc-custom-total { margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border-light); font-size: var(--text-sm); color: var(--color-accent); }

@media (max-width: 640px) { .calc-grid { grid-template-columns: 1fr; } }
</style>
