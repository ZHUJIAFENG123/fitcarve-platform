<template>
  <div class="ns-page">
    <Navbar :menu-links="menuLinks" />
    <!-- Hero Header -->
    <header class="ns-hero">
      <div class="ns-hero-bg">
        <div class="ns-hero-orb ns-hero-orb--1"></div>
        <div class="ns-hero-orb ns-hero-orb--2"></div>
      </div>
      <div class="ns-hero-content">
        <div class="ns-hero-top">
          <div class="ns-hero-badge">
            <Database :size="14" />
            <span>薄荷数据 · 8000+ 食物</span>
          </div>
          <div class="ns-hero-badge ns-hero-badge--sub">
            <Globe :size="13" />
            <span>Open Food Facts</span>
          </div>
        </div>
        <h1>营养查询</h1>
        <p>精准查询食物营养成分，科学管理每一口饮食</p>
      </div>
    </header>

    <div class="ns-container">
      <!-- Search Card -->
      <div class="ns-search-card">
        <div class="ns-search-tabs">
          <button :class="['ns-tab', { active: searchMode === 'keyword' }]" @click="searchMode = 'keyword'">
            <Search :size="15" /><span>关键词搜索</span>
          </button>
          <button :class="['ns-tab', { active: searchMode === 'barcode' }]" @click="searchMode = 'barcode'">
            <Barcode :size="15" /><span>条形码查询</span>
          </button>
        </div>
        <div class="ns-search-row" v-if="searchMode === 'keyword'">
          <div class="ns-input-wrap">
            <Search :size="18" class="ns-input-icon" />
            <input v-model="keyword" class="ns-input" placeholder="输入食物名称，如：苹果、鸡胸肉..." @keyup.enter="searchFood" />
          </div>
          <button class="ns-btn-search" @click="searchFood" :disabled="loading">
            <Search :size="15" v-if="!loading" /><Loader2 :size="15" v-else class="ns-spin" />
            <span>{{ loading ? '搜索中' : '搜索' }}</span>
          </button>
        </div>
        <div class="ns-search-row" v-else>
          <div class="ns-input-wrap">
            <Barcode :size="18" class="ns-input-icon" />
            <input v-model="barcode" class="ns-input" placeholder="输入条形码数字，如：3017620422003" @keyup.enter="searchBarcode" />
          </div>
          <button class="ns-btn-search" @click="searchBarcode" :disabled="loading">
            <span>{{ loading ? '查询中' : '查询' }}</span>
          </button>
        </div>
        <div class="ns-search-hints" v-if="searchMode === 'barcode'">
          <Lightbulb :size="13" />
          <span>条形码通常印在食品包装背面，为 8-13 位数字</span>
        </div>
        <!-- Quick suggestions -->
        <div class="ns-quick-tags" v-if="!hasSearched && searchMode === 'keyword'">
          <span class="ns-quick-label">热门：</span>
          <button @click="keyword = '苹果'; searchFood()">苹果</button>
          <button @click="keyword = '鸡胸肉'; searchFood()">鸡胸肉</button>
          <button @click="keyword = '红烧肉'; searchFood()">红烧肉</button>
          <button @click="keyword = '酸奶'; searchFood()">酸奶</button>
          <button @click="keyword = '燕麦'; searchFood()">燕麦</button>
          <button @click="keyword = '鸡蛋'; searchFood()">鸡蛋</button>
        </div>
      </div>

      <!-- Categories -->
      <div class="ns-section" v-if="categories.length && !hasSearched">
        <div class="ns-section-header">
          <h3><Grid3x3 :size="16" /> 分类浏览</h3>
          <span class="ns-section-count">{{ categories.length }} 个分类</span>
        </div>
        <div class="ns-cat-grid">
          <button v-for="cat in categories" :key="cat.category" class="ns-cat-card"
            :style="{ '--cat-color': getCategoryColor(cat.category) }"
            @click="selectedCategory = cat.category; browseCategory()">
            <div class="ns-cat-icon-wrap">
              <span class="ns-cat-emoji">{{ getCategoryEmoji(cat.category) }}</span>
            </div>
            <span class="ns-cat-name">{{ getCategoryLabel(cat.category) }}</span>
            <span class="ns-cat-count">{{ cat.count }} 种</span>
          </button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="ns-error">
        <AlertCircle :size="16" />
        <span>{{ error }}</span>
      </div>

      <!-- Source hint -->
      <div v-if="searchSource && !error" class="ns-source-bar">
        <Database :size="13" />
        <span v-if="searchSource === 'local'">来自薄荷食物数据库（8000+ 种中文食物）</span>
        <span v-else-if="searchSource === 'mixed'">来自薄荷 + Open Food Facts 双数据源</span>
        <span v-else>来自 Open Food Facts 全球食品数据库</span>
      </div>

      <!-- Barcode Result -->
      <div v-if="searchMode === 'barcode' && barcodeResult" class="ns-barcode-card">
        <div class="ns-br-top">
          <div class="ns-br-img-wrap" v-if="barcodeResult.image_url">
            <img :src="barcodeResult.image_url" :alt="barcodeResult.product_name" />
          </div>
          <div v-else class="ns-br-img-ph"><Package :size="28" /></div>
          <div class="ns-br-info">
            <h2>{{ barcodeResult.product_name || '未知产品' }}</h2>
            <p v-if="barcodeResult.brands">品牌：{{ barcodeResult.brands }}</p>
            <p v-if="barcodeResult.quantity">规格：{{ barcodeResult.quantity }}</p>
          </div>
        </div>
        <div class="ns-br-nuts" v-if="barcodeResult.nutriments">
          <div class="ns-br-nut" style="--nut-color: #EA580C">
            <span class="ns-br-nut-val">{{ nut(barcodeResult, 'energy-kcal') }}</span>
            <span class="ns-br-nut-label">热量 <small>kcal</small></span>
          </div>
          <div class="ns-br-nut" style="--nut-color: #2563EB">
            <span class="ns-br-nut-val">{{ nut(barcodeResult, 'proteins') }}</span>
            <span class="ns-br-nut-label">蛋白质 <small>g</small></span>
          </div>
          <div class="ns-br-nut" style="--nut-color: #D97706">
            <span class="ns-br-nut-val">{{ nut(barcodeResult, 'carbohydrates') }}</span>
            <span class="ns-br-nut-label">碳水 <small>g</small></span>
          </div>
          <div class="ns-br-nut" style="--nut-color: #7C3AED">
            <span class="ns-br-nut-val">{{ nut(barcodeResult, 'fat') }}</span>
            <span class="ns-br-nut-label">脂肪 <small>g</small></span>
          </div>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="searchMode === 'keyword' && searchResults.length > 0" class="ns-results">
        <div class="ns-results-header">
          <span>找到 <strong>{{ searchResults.length }}</strong> 个食物</span>
        </div>
        <div class="ns-results-grid">
          <article v-for="(item, idx) in searchResults" :key="item.code || item.product_name"
            class="ns-food-card" :style="{ animationDelay: `${idx * 40}ms` }"
            @click="openDetail(item)">
            <div class="ns-fc-img" v-if="item.image_url">
              <img :src="item.image_url" :alt="item.product_name" loading="lazy" />
              <span class="ns-fc-tag" :style="{ background: getCategoryColor(item.categories) }">{{ getCategoryLabel(item.categories) }}</span>
            </div>
            <div v-else class="ns-fc-img-ph">
              <Apple :size="26" :style="{ color: getCategoryColor(item.categories) }" />
              <span class="ns-fc-tag ns-fc-tag--bottom" :style="{ background: getCategoryColor(item.categories) }">{{ getCategoryLabel(item.categories) }}</span>
            </div>
            <div class="ns-fc-body">
              <h3>{{ item.product_name || '未知食物' }}</h3>
              <div class="ns-fc-macros" v-if="item.nutriments">
                <div class="ns-fc-macro">
                  <span class="ns-fc-macro-val">{{ item.nutriments['energy-kcal_100g'] || '?' }}</span>
                  <span class="ns-fc-macro-unit">kcal</span>
                </div>
                <div class="ns-fc-macro-dot"></div>
                <div class="ns-fc-macro">
                  <span class="ns-fc-macro-val">{{ item.nutriments.proteins_100g || '?' }}</span>
                  <span class="ns-fc-macro-unit">蛋白g</span>
                </div>
                <div class="ns-fc-macro-dot"></div>
                <div class="ns-fc-macro">
                  <span class="ns-fc-macro-val">{{ item.nutriments.carbohydrates_100g || '?' }}</span>
                  <span class="ns-fc-macro-unit">碳水g</span>
                </div>
                <div class="ns-fc-macro-dot"></div>
                <div class="ns-fc-macro">
                  <span class="ns-fc-macro-val">{{ item.nutriments.fat_100g || '?' }}</span>
                  <span class="ns-fc-macro-unit">脂肪g</span>
                </div>
              </div>
              <NutrientBar v-if="item.nutriments" :items="nutItems(item.nutriments)" />
            </div>
            <div class="ns-fc-hover-hint">
              <Eye :size="13" />
              <span>查看详情</span>
            </div>
          </article>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && !error && !barcodeResult && searchResults.length === 0 && hasSearched" class="ns-empty">
        <div class="ns-empty-icon"><SearchX :size="36" /></div>
        <h3>没有找到相关食物</h3>
        <p>换个关键词试试吧</p>
      </div>

      <!-- Welcome state -->
      <div v-if="!loading && !error && !barcodeResult && searchResults.length === 0 && !hasSearched" class="ns-welcome">
        <div class="ns-welcome-visual">
          <div class="ns-welcome-ring">
            <Apple :size="36" />
          </div>
        </div>
        <h3>搜索食物营养信息</h3>
        <p>薄荷食物库包含 8000+ 种中文食物数据，涵盖热量、蛋白质、维生素等详细营养成分</p>
      </div>

      <!-- Detail Drawer -->
      <el-drawer v-model="drawerVisible" :title="detailFood?.product_name || '食物详情'" direction="rtl" size="480px" :close-on-click-modal="true" class="ns-drawer" :show-close="true">
        <template v-if="detailFood">
          <!-- Image -->
          <div class="ns-d-hero" v-if="detailFood.image_url">
            <img :src="detailFood.image_url" :alt="detailFood.product_name" />
            <div class="ns-d-hero-overlay">
              <span class="ns-d-cat" :style="{ background: getCategoryColor(detailFood.categories) }">{{ getCategoryLabel(detailFood.categories) }}</span>
              <span v-if="detailFood.brands && detailFood.brands !== '薄荷食物库'" class="ns-d-brand">{{ detailFood.brands }}</span>
            </div>
          </div>
          <div class="ns-d-meta" v-else>
            <span class="ns-d-cat" :style="{ background: getCategoryColor(detailFood.categories) }">{{ getCategoryLabel(detailFood.categories) }}</span>
            <span v-if="detailFood.brands && detailFood.brands !== '薄荷食物库'" class="ns-d-brand">{{ detailFood.brands }}</span>
          </div>

          <!-- Serving sizes -->
          <div class="ns-d-section" v-if="detailFood.serving_units && detailFood.serving_units.length">
            <h4>常见份量</h4>
            <div class="ns-serving-chips">
              <button v-for="(s, i) in detailFood.serving_units" :key="i"
                :class="['ns-serving-chip', { active: addToAmount === s.grams }]"
                @click="addToAmount = s.grams">
                {{ s.label }} <small>{{ s.grams }}g</small> <em>{{ s.calories }}大卡</em>
              </button>
            </div>
          </div>

          <!-- Basic Nutrition -->
          <div class="ns-d-section">
            <h4>基础营养 <small>每100g</small></h4>
            <div class="ns-d-nut-grid">
              <div class="ns-d-nut" style="--nut-bg: rgba(234,88,12,0.08); --nut-color: #EA580C">
                <span class="ns-d-nut-val">{{ detailFood.nutriments?.['energy-kcal_100g'] || '-' }}</span>
                <span class="ns-d-nut-label">热量 <em>kcal</em></span>
              </div>
              <div class="ns-d-nut" style="--nut-bg: rgba(37,99,235,0.08); --nut-color: #2563EB">
                <span class="ns-d-nut-val">{{ detailFood.nutriments?.proteins_100g || '-' }}</span>
                <span class="ns-d-nut-label">蛋白质 <em>g</em></span>
              </div>
              <div class="ns-d-nut" style="--nut-bg: rgba(217,119,6,0.08); --nut-color: #D97706">
                <span class="ns-d-nut-val">{{ detailFood.nutriments?.carbohydrates_100g || '-' }}</span>
                <span class="ns-d-nut-label">碳水 <em>g</em></span>
              </div>
              <div class="ns-d-nut" style="--nut-bg: rgba(124,58,237,0.08); --nut-color: #7C3AED">
                <span class="ns-d-nut-val">{{ detailFood.nutriments?.fat_100g || '-' }}</span>
                <span class="ns-d-nut-label">脂肪 <em>g</em></span>
              </div>
            </div>
          </div>

          <!-- Micro Nutrients -->
          <div class="ns-d-section" v-if="hasMicroNutrients(detailFood)">
            <h4>维生素与矿物质 <small>每100g · %每日推荐量</small></h4>
            <div class="ns-d-micro-list">
              <div class="ns-d-micro" v-for="m in microNutrientsList(detailFood)" :key="m.label">
                <div class="ns-d-micro-top">
                  <span class="ns-d-micro-name">{{ m.label }}</span>
                  <span class="ns-d-micro-val">{{ m.value }}{{ m.unit }}</span>
                </div>
                <div class="ns-d-micro-bar">
                  <div class="ns-d-micro-fill" :style="{ width: m.percent + '%', background: m.color }"></div>
                </div>
                <span class="ns-d-micro-pct">{{ m.percent }}%</span>
              </div>
            </div>
          </div>

          <!-- Add to diet log -->
          <div class="ns-d-add" v-if="isLoggedIn">
            <div class="ns-d-add-row">
              <select v-model="addToMeal" class="ns-d-select">
                <option value="breakfast">早餐</option>
                <option value="lunch">午餐</option>
                <option value="dinner">晚餐</option>
                <option value="snack">加餐</option>
              </select>
              <div class="ns-d-amount">
                <input v-model.number="addToAmount" type="number" class="ns-d-amount-input" placeholder="克数" min="1" />
                <span class="ns-d-amount-unit">g</span>
              </div>
              <button class="ns-d-add-btn" @click="addToDietLog(detailFood)">
                <Plus :size="15" /> 添加
              </button>
            </div>
            <p class="ns-d-calc" v-if="addToAmount && detailFood.nutriments">
              预计摄入：<strong>{{ Math.round((detailFood.nutriments['energy-kcal_100g'] || 0) * addToAmount / 100) }} kcal</strong>
            </p>
          </div>
        </template>
      </el-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'
import NutrientBar from '@/components/common/NutrientBar.vue'
import {
  Search, Barcode, Database, Grid3x3, AlertCircle, Apple, Package,
  Lightbulb, Plus, SearchX, Globe, Loader2, Eye
} from 'lucide-vue-next'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const CAT_MAP: Record<string, { label: string; color: string; emoji: string }> = {
  staple: { label: '谷薯主食', color: '#D97706', emoji: '🌾' },
  meat: { label: '蛋类肉类', color: '#DC2626', emoji: '🥩' },
  vegetable: { label: '蔬果菌藻', color: '#16A34A', emoji: '🥬' },
  fruit: { label: '水果', color: '#DB2777', emoji: '🍎' },
  dairy: { label: '奶制品', color: '#7C3AED', emoji: '🥛' },
  bean: { label: '豆类制品', color: '#65A30D', emoji: '🫘' },
  grain: { label: '谷物制品', color: '#92400E', emoji: '🌽' },
  nut: { label: '坚果', color: '#78350F', emoji: '🥜' },
  snack: { label: '零食点心', color: '#EA580C', emoji: '🍪' },
  drink: { label: '饮料', color: '#2563EB', emoji: '🥤' },
  condiment: { label: '调味品', color: '#71717A', emoji: '🧂' },
  fastfood: { label: '速食', color: '#E11D48', emoji: '🍔' },
  seafood: { label: '水产品', color: '#0891B2', emoji: '🐟' },
  homemade: { label: '家常菜', color: '#059669', emoji: '🍳' },
  health: { label: '滋补品', color: '#9333EA', emoji: '🍯' },
  baby: { label: '婴幼儿', color: '#EC4899', emoji: '🍼' },
  other: { label: '其他', color: '#6B7280', emoji: '📦' }
}

const getCategoryLabel = (c: string) => CAT_MAP[c]?.label || '其他'
const getCategoryColor = (c: string) => CAT_MAP[c]?.color || '#9CA3AF'
const getCategoryEmoji = (c: string) => CAT_MAP[c]?.emoji || '📦'

const categories = ref<{ category: string; category_name: string; count: number }[]>([])
const selectedCategory = ref('')
const searchMode = ref<'keyword' | 'barcode'>('keyword')
const keyword = ref('')
const barcode = ref('')
const loading = ref(false)
const error = ref('')
const hasSearched = ref(false)
const searchResults = ref<any[]>([])
const barcodeResult = ref<any>(null)
const searchSource = ref('')
const detailFood = ref<any>(null)
const drawerVisible = ref(false)
const addToMeal = ref('breakfast')
const addToAmount = ref(100)
const isLoggedIn = computed(() => !!localStorage.getItem('token'))

function nut(p: any, f: string) {
  const n = p.nutriments; if (!n) return '-'
  const v = n[`${f}_100g`] ?? n[f]; return v != null ? v : '-'
}

function nutItems(n: any) {
  const r: any[] = []
  if (n.proteins_100g) r.push({ value: n.proteins_100g, unit: 'g', color: '#2563EB', label: '蛋白' })
  if (n.carbohydrates_100g) r.push({ value: n.carbohydrates_100g, unit: 'g', color: '#D97706', label: '碳水' })
  if (n.fat_100g) r.push({ value: n.fat_100g, unit: 'g', color: '#7C3AED', label: '脂肪' })
  return r
}

function hasMicroNutrients(food: any) {
  if (!food?.nutriments) return false
  const microFields = ['vitamin_a_100g', 'vitamin_c_100g', 'vitamin_e_100g', 'cholesterol_100g', 'calcium_100g', 'iron_100g', 'sodium_100g', 'potassium_100g', 'phosphorus_100g', 'magnesium_100g', 'zinc_100g', 'selenium_100g']
  return microFields.some(f => food.nutriments[f] != null)
}

const MICRO_DV: Record<string, { dv: number; unit: string; color: string }> = {
  vitamin_a_100g: { dv: 800, unit: 'μg', color: '#F59E0B' },
  vitamin_c_100g: { dv: 90, unit: 'mg', color: '#F97316' },
  vitamin_e_100g: { dv: 15, unit: 'mg', color: '#10B981' },
  cholesterol_100g: { dv: 300, unit: 'mg', color: '#EF4444' },
  calcium_100g: { dv: 1000, unit: 'mg', color: '#3B82F6' },
  iron_100g: { dv: 18, unit: 'mg', color: '#8B5CF6' },
  sodium_100g: { dv: 2300, unit: 'mg', color: '#6366F1' },
  potassium_100g: { dv: 3500, unit: 'mg', color: '#14B8A6' },
  phosphorus_100g: { dv: 700, unit: 'mg', color: '#0EA5E9' },
  magnesium_100g: { dv: 400, unit: 'mg', color: '#22C55E' },
  zinc_100g: { dv: 11, unit: 'mg', color: '#A855F7' },
  selenium_100g: { dv: 55, unit: 'μg', color: '#EC4899' }
}
const MICRO_LABELS: Record<string, string> = {
  vitamin_a_100g: '维生素A', vitamin_c_100g: '维生素C', vitamin_e_100g: '维生素E',
  cholesterol_100g: '胆固醇', calcium_100g: '钙', iron_100g: '铁',
  sodium_100g: '钠', potassium_100g: '钾', phosphorus_100g: '磷',
  magnesium_100g: '镁', zinc_100g: '锌', selenium_100g: '硒'
}

function microNutrientsList(food: any) {
  if (!food?.nutriments) return []
  return Object.entries(MICRO_DV)
    .filter(([key]) => food.nutriments[key] != null)
    .map(([key, cfg]) => {
      const val = food.nutriments[key]
      const percent = Math.min(100, Math.round((val / cfg.dv) * 100))
      return { label: MICRO_LABELS[key], value: val, unit: cfg.unit, percent, color: cfg.color }
    })
}

function openDetail(item: any) {
  detailFood.value = item
  drawerVisible.value = true
}

async function loadCategories() {
  try {
    const r = await fetch(`${API}/nutrition/categories`)
    if (r.ok) categories.value = await r.json()
  } catch {}
}

async function browseCategory() {
  if (!selectedCategory.value) { searchResults.value = []; hasSearched.value = false; return }
  loading.value = true; error.value = ''; hasSearched.value = true; searchResults.value = []; barcodeResult.value = null
  try {
    const r = await fetch(`${API}/foods?category=${selectedCategory.value}`)
    if (!r.ok) throw new Error('获取分类食物失败')
    const foods = await r.json()
    searchResults.value = foods.map((f: any) => ({
      code: `local_${f.id}`, product_name: f.name, brands: '薄荷食物库', categories: f.category,
      image_url: f.image_url || '',
      nutriments: {
        'energy-kcal_100g': f.calories_per_100g, proteins_100g: f.protein_per_100g,
        carbohydrates_100g: f.carbs_per_100g, fat_100g: f.fat_per_100g, fiber_100g: f.fiber_per_100g,
        vitamin_a_100g: f.vitamin_a, vitamin_c_100g: f.vitamin_c, vitamin_e_100g: f.vitamin_e,
        cholesterol_100g: f.cholesterol, calcium_100g: f.calcium, iron_100g: f.iron,
        sodium_100g: f.sodium, potassium_100g: f.potassium, phosphorus_100g: f.phosphorus,
        magnesium_100g: f.magnesium, zinc_100g: f.zinc, selenium_100g: f.selenium,
      },
      serving_units: f.serving_units ? JSON.parse(f.serving_units) : null, _source: 'local'
    }))
    searchSource.value = 'local'
  } catch (e: any) { error.value = e.message } finally { loading.value = false }
}

async function searchFood() {
  if (!keyword.value.trim()) return
  loading.value = true; error.value = ''; hasSearched.value = true; searchResults.value = []; barcodeResult.value = null; searchSource.value = ''
  try {
    const p = new URLSearchParams({ q: keyword.value, limit: '24' })
    if (selectedCategory.value) p.set('category', selectedCategory.value)
    const r = await fetch(`${API}/nutrition/search?${p}`)
    if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.message || '搜索失败') }
    const d = await r.json(); searchResults.value = d.products || []; searchSource.value = d.source || ''
  } catch (e: any) { error.value = e.message || '搜索失败' } finally { loading.value = false }
}

async function searchBarcode() {
  if (!barcode.value.trim()) return
  loading.value = true; error.value = ''; hasSearched.value = true; searchResults.value = []; barcodeResult.value = null; searchSource.value = ''
  try {
    const r = await fetch(`${API}/nutrition/barcode/${barcode.value.trim()}`)
    if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.message || '查询失败') }
    const d = await r.json()
    if (d.status === 0 || !d.product) { error.value = d.message || '未找到该产品' }
    else { barcodeResult.value = d.product; searchSource.value = 'openfoodfacts' }
  } catch (e: any) { error.value = e.message || '查询失败' } finally { loading.value = false }
}

async function addToDietLog(product: any) {
  if (!addToAmount.value || addToAmount.value < 1) { ElMessage.warning('请输入有效克数'); return }
  const n = product.nutriments || {}, ratio = addToAmount.value / 100
  try {
    const r = await fetch(`${API}/diet-log`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ log_date: new Date().toISOString().split('T')[0], meal_type: addToMeal.value, food_name: product.product_name || '未知食物', amount_g: addToAmount.value, calories: Math.round((n['energy-kcal_100g'] || 0) * ratio), protein_g: ((n.proteins_100g || 0) * ratio).toFixed(1), carbs_g: ((n.carbohydrates_100g || 0) * ratio).toFixed(1), fat_g: ((n.fat_100g || 0) * ratio).toFixed(1) })
    })
    if (r.ok) ElMessage.success('已添加！'); else ElMessage.error('添加失败')
  } catch { ElMessage.error('网络错误') }
}

onMounted(() => loadCategories())
</script>

<style scoped>
.ns-page { min-height: 100vh; background: var(--color-bg); }

/* ===== Hero ===== */
.ns-hero {
  background: linear-gradient(145deg, #0F3D24 0%, #1B6B3A 45%, #238B4D 100%);
  padding: var(--space-8) var(--space-4) var(--space-6);
  position: relative; overflow: hidden;
}
.ns-hero-bg { position: absolute; inset: 0; pointer-events: none; }
.ns-hero-orb {
  position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.15;
}
.ns-hero-orb--1 { width: 300px; height: 300px; background: #22C55E; top: -80px; right: -60px; }
.ns-hero-orb--2 { width: 200px; height: 200px; background: #10B981; bottom: -60px; left: 10%; }
.ns-hero-content { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
.ns-hero-top { display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-4); }
.ns-hero-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
  padding: 5px 12px; border-radius: var(--radius-full);
  font-size: 12px; color: rgba(255,255,255,0.9); font-weight: 500;
  border: 1px solid rgba(255,255,255,0.08);
}
.ns-hero-badge--sub { background: rgba(255,255,255,0.06); }
.ns-hero h1 { font-size: var(--text-2xl); font-weight: 800; color: #fff; letter-spacing: -0.02em; }
.ns-hero p { font-size: var(--text-sm); color: rgba(255,255,255,0.65); margin-top: 4px; }

/* ===== Container ===== */
.ns-container { max-width: 1100px; margin: 0 auto; padding: var(--space-5) var(--space-4) var(--space-12); }

/* ===== Search Card ===== */
.ns-search-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-5);
  box-shadow: var(--shadow-md); margin-top: -28px; position: relative; z-index: 2;
}
.ns-search-tabs { display: flex; gap: var(--space-2); margin-bottom: var(--space-4); }
.ns-tab {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 18px; border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-full); background: transparent;
  color: var(--color-text-secondary); font-size: var(--text-sm);
  cursor: pointer; transition: all 0.25s; font-weight: 500;
}
.ns-tab.active {
  background: var(--color-primary); color: #fff;
  border-color: var(--color-primary); box-shadow: 0 2px 8px rgba(27,107,58,0.2);
}
.ns-search-row { display: flex; gap: 10px; }
.ns-input-wrap { flex: 1; position: relative; display: flex; align-items: center; }
.ns-input-icon { position: absolute; left: 14px; color: var(--color-text-tertiary); pointer-events: none; z-index: 1; }
.ns-input {
  width: 100%; padding: 13px 16px 13px 44px;
  border: 1.5px solid var(--color-border-light); border-radius: var(--radius-lg);
  font-size: 15px; outline: none; transition: all 0.25s;
  background: var(--color-bg); color: var(--color-text-primary);
}
.ns-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(27,107,58,0.08); }
.ns-btn-search {
  display: flex; align-items: center; gap: 6px;
  padding: 13px 28px; background: var(--color-primary); color: #fff;
  border: none; border-radius: var(--radius-lg);
  font-size: var(--text-sm); font-weight: 600;
  cursor: pointer; transition: all 0.25s; white-space: nowrap;
}
.ns-btn-search:hover { background: #15803d; box-shadow: 0 4px 12px rgba(27,107,58,0.25); }
.ns-btn-search:disabled { opacity: 0.5; cursor: not-allowed; }
.ns-search-hints { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--color-text-tertiary); margin-top: 10px; }
.ns-quick-tags { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border-light); }
.ns-quick-label { font-size: 12px; color: var(--color-text-tertiary); font-weight: 500; }
.ns-quick-tags button {
  padding: 5px 12px; border: 1px solid var(--color-border-light); border-radius: var(--radius-full);
  background: var(--color-bg); font-size: 12px; cursor: pointer; transition: all 0.2s; font-weight: 500;
  color: var(--color-text-secondary);
}
.ns-quick-tags button:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-50); }

/* ===== Section ===== */
.ns-section { margin-top: var(--space-6); }
.ns-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); }
.ns-section-header h3 { display: flex; align-items: center; gap: 6px; font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); }
.ns-section-count { font-size: 12px; color: var(--color-text-tertiary); }

/* ===== Category Grid ===== */
.ns-cat-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
.ns-cat-card {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 16px 8px 12px; background: var(--color-bg-card);
  border: 1.5px solid var(--color-border-light); border-radius: var(--radius-lg);
  cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
}
.ns-cat-card:hover {
  border-color: var(--cat-color, #999);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
.ns-cat-icon-wrap {
  width: 40px; height: 40px; border-radius: 10px;
  background: color-mix(in srgb, var(--cat-color, #999) 10%, transparent);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s;
}
.ns-cat-card:hover .ns-cat-icon-wrap { transform: scale(1.1); }
.ns-cat-emoji { font-size: 20px; }
.ns-cat-name { font-size: 12px; font-weight: 600; color: var(--color-text-primary); text-align: center; }
.ns-cat-count { font-size: 11px; color: var(--color-text-tertiary); }

/* ===== Error ===== */
.ns-error {
  display: flex; align-items: center; gap: 8px;
  background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15);
  border-radius: var(--radius-lg); padding: 12px 16px; margin-top: 16px;
  font-size: var(--text-sm); color: #ef4444;
}

/* ===== Source Bar ===== */
.ns-source-bar {
  display: flex; align-items: center; gap: 6px;
  background: rgba(27,107,58,0.05); border: 1px solid rgba(27,107,58,0.12);
  border-radius: var(--radius-lg); padding: 10px 14px; margin-top: 16px;
  font-size: var(--text-sm); color: var(--color-primary);
}

/* ===== Barcode Result ===== */
.ns-barcode-card {
  margin-top: var(--space-5); background: var(--color-bg-card);
  border: 1px solid var(--color-border-light); border-radius: var(--radius-xl);
  padding: var(--space-5); box-shadow: var(--shadow-sm);
  animation: fadeUp 0.4s ease;
}
.ns-br-top { display: flex; gap: 16px; margin-bottom: 20px; align-items: center; }
.ns-br-img-wrap { width: 80px; height: 80px; border-radius: var(--radius-lg); overflow: hidden; flex-shrink: 0; background: var(--color-surface); }
.ns-br-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.ns-br-img-ph { width: 80px; height: 80px; border-radius: var(--radius-lg); background: var(--color-surface); display: flex; align-items: center; justify-content: center; color: var(--color-text-tertiary); flex-shrink: 0; }
.ns-br-info h2 { font-size: var(--text-lg); font-weight: 700; margin-bottom: 4px; }
.ns-br-info p { font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 2px; }
.ns-br-nuts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.ns-br-nut {
  text-align: center; padding: 16px 8px;
  background: color-mix(in srgb, var(--nut-color, #999) 6%, transparent);
  border-radius: var(--radius-lg); border: 1px solid color-mix(in srgb, var(--nut-color, #999) 12%, transparent);
}
.ns-br-nut-val { font-size: var(--text-xl); font-weight: 800; color: var(--nut-color, #999); display: block; }
.ns-br-nut-label { font-size: 12px; color: var(--color-text-tertiary); margin-top: 4px; display: block; }
.ns-br-nut-label small { font-size: 10px; opacity: 0.7; }

/* ===== Results ===== */
.ns-results { margin-top: var(--space-5); }
.ns-results-header { font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: 14px; }
.ns-results-header strong { color: var(--color-primary); font-weight: 700; }
.ns-results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }

/* Food Card */
.ns-food-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); overflow: hidden; cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  animation: fadeUp 0.45s ease both; position: relative;
}
.ns-food-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
.ns-fc-img { width: 100%; height: 150px; background: var(--color-surface); overflow: hidden; position: relative; }
.ns-fc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.ns-food-card:hover .ns-fc-img img { transform: scale(1.08); }
.ns-fc-img-ph { width: 100%; height: 150px; background: var(--color-surface); display: flex; align-items: center; justify-content: center; position: relative; }
.ns-fc-tag {
  position: absolute; top: 10px; right: 10px;
  padding: 3px 10px; border-radius: var(--radius-full);
  font-size: 11px; color: #fff; font-weight: 600;
  backdrop-filter: blur(4px);
}
.ns-fc-tag--bottom { top: auto; bottom: 10px; }
.ns-fc-body { padding: 14px; }
.ns-fc-body h3 { font-size: var(--text-sm); font-weight: 600; line-height: 1.35; margin-bottom: 10px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.ns-fc-macros { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.ns-fc-macro { text-align: center; flex: 1; }
.ns-fc-macro-val { font-size: 13px; font-weight: 700; color: var(--color-text-primary); display: block; }
.ns-fc-macro-unit { font-size: 10px; color: var(--color-text-tertiary); }
.ns-fc-macro-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--color-border); flex-shrink: 0; }
.ns-fc-hover-hint {
  position: absolute; inset: 0; background: rgba(27,107,58,0.85);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  opacity: 0; transition: opacity 0.3s; color: #fff; font-size: 13px; font-weight: 600;
}
.ns-food-card:hover .ns-fc-hover-hint { opacity: 1; }

/* ===== Empty / Welcome ===== */
.ns-empty { text-align: center; padding: 56px 20px; }
.ns-empty-icon { display: inline-flex; padding: 16px; background: var(--color-surface); border-radius: 50%; color: var(--color-text-tertiary); margin-bottom: 16px; }
.ns-empty h3 { font-size: var(--text-lg); font-weight: 700; margin-bottom: 6px; }
.ns-empty p { font-size: var(--text-sm); color: var(--color-text-tertiary); }

.ns-welcome { text-align: center; padding: 48px 20px; }
.ns-welcome-visual { margin-bottom: 20px; }
.ns-welcome-ring {
  display: inline-flex; align-items: center; justify-content: center;
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(27,107,58,0.08), rgba(27,107,58,0.04));
  border: 2px solid rgba(27,107,58,0.12);
  color: var(--color-primary);
}
.ns-welcome h3 { font-size: var(--text-lg); font-weight: 700; margin-bottom: 8px; }
.ns-welcome p { font-size: var(--text-sm); color: var(--color-text-tertiary); max-width: 400px; margin: 0 auto; line-height: 1.6; }

/* ===== Drawer ===== */
:deep(.el-drawer__header) { padding: 16px 20px; margin-bottom: 0; border-bottom: 1px solid var(--color-border-light); }
:deep(.el-drawer__body) { padding: 0 20px 20px; }
:deep(.el-drawer) { border-radius: 16px 0 0 16px; overflow: hidden; }

.ns-d-hero { width: 100%; height: 200px; border-radius: var(--radius-lg); overflow: hidden; margin: 16px 0; position: relative; }
.ns-d-hero img { width: 100%; height: 100%; object-fit: cover; }
.ns-d-hero-overlay { position: absolute; bottom: 10px; left: 10px; display: flex; align-items: center; gap: 6px; }
.ns-d-cat { padding: 4px 12px; border-radius: var(--radius-full); font-size: 11px; font-weight: 600; color: #fff; }
.ns-d-brand { font-size: 12px; color: rgba(255,255,255,0.9); background: rgba(0,0,0,0.4); padding: 3px 8px; border-radius: var(--radius-full); backdrop-filter: blur(4px); }
.ns-d-meta { display: flex; align-items: center; gap: 8px; margin: 16px 0; }

.ns-d-section { margin-bottom: 20px; }
.ns-d-section h4 { font-size: var(--text-sm); font-weight: 700; margin-bottom: 12px; color: var(--color-text-primary); }
.ns-d-section h4 small { font-weight: 400; color: var(--color-text-tertiary); margin-left: 6px; font-size: 11px; }

/* Serving chips */
.ns-serving-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.ns-serving-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 6px 12px; border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-full); font-size: 12px; cursor: pointer;
  transition: all 0.2s; background: var(--color-bg);
  color: var(--color-text-secondary); font-weight: 500;
}
.ns-serving-chip small { color: var(--color-text-tertiary); }
.ns-serving-chip em { font-style: normal; color: var(--color-accent); font-weight: 600; }
.ns-serving-chip.active { border-color: var(--color-primary); background: var(--color-primary-50); color: var(--color-primary); }
.ns-serving-chip:hover { border-color: var(--color-primary); }

/* Nutrition grid */
.ns-d-nut-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.ns-d-nut {
  text-align: center; padding: 14px 6px;
  background: var(--nut-bg, var(--color-surface));
  border-radius: var(--radius-lg);
}
.ns-d-nut-val { font-size: var(--text-lg); font-weight: 800; color: var(--nut-color, var(--color-text-primary)); display: block; }
.ns-d-nut-label { font-size: 11px; color: var(--color-text-tertiary); margin-top: 3px; display: block; }
.ns-d-nut-label em { font-style: normal; font-size: 10px; opacity: 0.7; }

/* Micro nutrients */
.ns-d-micro-list { display: flex; flex-direction: column; gap: 12px; }
.ns-d-micro { position: relative; }
.ns-d-micro-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
.ns-d-micro-name { font-size: var(--text-sm); color: var(--color-text-primary); font-weight: 500; }
.ns-d-micro-val { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); }
.ns-d-micro-bar { height: 6px; background: var(--color-surface); border-radius: 3px; overflow: hidden; }
.ns-d-micro-fill { height: 100%; border-radius: 3px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
.ns-d-micro-pct { position: absolute; right: 0; top: 0; font-size: 10px; color: var(--color-text-tertiary); }

/* Add to diet */
.ns-d-add {
  position: sticky; bottom: 0; background: var(--color-bg-card);
  padding: 16px 0; border-top: 1px solid var(--color-border-light); margin-top: 20px;
}
.ns-d-add-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ns-d-select { padding: 9px 12px; border: 1.5px solid var(--color-border-light); border-radius: var(--radius-md); font-size: var(--text-sm); outline: none; background: var(--color-bg-card); color: var(--color-text-primary); }
.ns-d-amount { position: relative; display: flex; align-items: center; }
.ns-d-amount-input { width: 80px; padding: 9px 26px 9px 12px; border: 1.5px solid var(--color-border-light); border-radius: var(--radius-md); font-size: var(--text-sm); outline: none; background: var(--color-bg-card); color: var(--color-text-primary); }
.ns-d-amount-unit { position: absolute; right: 10px; font-size: 12px; color: var(--color-text-tertiary); pointer-events: none; }
.ns-d-add-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 9px 20px; background: var(--color-accent); color: #fff;
  border: none; border-radius: var(--radius-md);
  font-size: var(--text-sm); font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.ns-d-add-btn:hover { background: #ea580c; box-shadow: 0 4px 12px rgba(249,115,22,0.3); }
.ns-d-calc { font-size: 12px; color: var(--color-text-tertiary); margin-top: 8px; }
.ns-d-calc strong { color: var(--color-accent); font-weight: 700; }

/* ===== Animations ===== */
.ns-spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .ns-cat-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 768px) {
  .ns-cat-grid { grid-template-columns: repeat(3, 1fr); }
  .ns-results-grid { grid-template-columns: repeat(2, 1fr); }
  .ns-br-nuts { grid-template-columns: repeat(2, 1fr); }
  .ns-d-nut-grid { grid-template-columns: repeat(2, 1fr); }
  .ns-hero { padding: var(--space-6) var(--space-4) var(--space-5); }
}
@media (max-width: 480px) {
  .ns-cat-grid { grid-template-columns: repeat(3, 1fr); }
  .ns-results-grid { grid-template-columns: 1fr; }
  .ns-search-row { flex-direction: column; }
  .ns-btn-search { width: 100%; justify-content: center; }
}
</style>
