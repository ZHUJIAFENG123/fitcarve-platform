<template>
  <div class="ex-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Compact Header -->
    <header class="ex-header">
      <div class="ex-header-inner">
        <div class="ex-header-left">
          <h1 class="ex-title">动作库</h1>
          <div class="ex-stats-badges">
            <span class="ex-badge">
              <Database :size="12" /> {{ totalCount }} 个动作
            </span>
            <span class="ex-badge">
              <Layers :size="12" /> 7 肌群
            </span>
          </div>
        </div>
        <div class="ex-header-right">
          <div class="ex-search-box" :class="{ focused: searchFocused }">
            <Search :size="16" class="ex-search-icon" />
            <input v-model="searchKeyword" class="ex-search-input"
              placeholder="搜索动作名称、肌群、器材..."
              @input="onSearchInput" @focus="searchFocused = true" @blur="searchFocused = false" />
            <span class="ex-search-count" v-if="!loading && searchKeyword">{{ filteredList.length }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Sticky Muscle Tabs -->
    <div class="ex-tab-bar">
      <div class="ex-tab-scroll">
        <button
          v-for="g in muscleGroups"
          :key="g.value"
          :class="['ex-tab', { active: filters.muscleGroup === g.value }]"
          :style="filters.muscleGroup === g.value ? { '--tab-color': g.color } : {}"
          @click="setFilter('muscleGroup', g.value)"
        >
          <span class="ex-tab__dot" :style="{ background: g.color }"></span>
          <span class="ex-tab__label">{{ g.label }}</span>
          <span class="ex-tab__count">{{ g.count }}</span>
        </button>
      </div>
    </div>

    <!-- Filter Toolbar -->
    <div class="ex-toolbar">
      <div class="ex-toolbar-row">
        <div class="ex-filter-group">
          <span class="ex-filter-label">难度</span>
          <div class="ex-filter-chips">
            <button v-for="d in difficulties" :key="'d-'+d.value"
              :class="['ex-chip', { active: filters.difficulty === d.value }]"
              @click="setFilter('difficulty', d.value)">{{ d.label }}</button>
          </div>
        </div>
        <div class="ex-filter-sep"></div>
        <div class="ex-filter-group">
          <span class="ex-filter-label">类型</span>
          <div class="ex-filter-chips">
            <button v-for="c in categories" :key="'c-'+c.value"
              :class="['ex-chip', { active: filters.category === c.value }]"
              @click="setFilter('category', c.value)">{{ c.label }}</button>
          </div>
        </div>
        <div class="ex-filter-sep"></div>
        <div class="ex-equip-dropdown">
          <button :class="['ex-chip ex-chip--dropdown', { active: filters.equipment }]"
            @click="showEquipDropdown = !showEquipDropdown">
            <Dumbbell :size="14" />
            {{ filters.equipment ? (EQUIP_MAP[filters.equipment] || filters.equipment) : '器材' }}
            <ChevronDown :size="14" />
          </button>
          <div v-if="showEquipDropdown" class="ex-equip-menu" @click.stop>
            <button v-for="e in equipmentList" :key="'e-'+e.value"
              :class="['ex-equip-item', { active: filters.equipment === e.value }]"
              @click="setFilter('equipment', e.value); showEquipDropdown = false">
              {{ e.label }}
              <span v-if="e.count" class="ex-equip-count">{{ e.count }}</span>
            </button>
          </div>
        </div>
        <div class="ex-toolbar-meta">
          <span class="ex-result-count">{{ filteredList.length }} 个结果</span>
          <button v-if="hasActiveFilters" class="ex-clear-btn" @click="resetFilters">
            <X :size="14" /> 清除
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="ex-container">
      <!-- Loading -->
      <div v-if="loading" class="ex-grid">
        <div v-for="i in 12" :key="i" class="ex-skeleton">
          <div class="ex-skeleton-gif"></div>
          <div class="ex-skeleton-body">
            <div class="ex-skeleton-line w60"></div>
            <div class="ex-skeleton-line w40"></div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="ex-state">
        <div class="ex-state-icon-wrap">
          <AlertCircle :size="32" :stroke-width="1.5" />
        </div>
        <p class="ex-state-text">{{ error }}</p>
        <button class="ex-retry-btn" @click="fetchExercises">重新加载</button>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredList.length === 0" class="ex-state">
        <div class="ex-state-icon-wrap">
          <SearchX :size="32" :stroke-width="1.5" />
        </div>
        <p class="ex-state-text">没有符合条件的动作</p>
        <button class="ex-retry-btn" @click="resetFilters">清除筛选</button>
      </div>

      <!-- Grouped Mode -->
      <template v-else-if="isGroupedMode">
        <section v-for="group in groupedExercises" :key="group.value" class="ex-group">
          <div class="ex-group-header" :style="{ '--group-color': group.color }">
            <span class="ex-group-dot" :style="{ background: group.color }"></span>
            <h2 class="ex-group-title">{{ group.label }}</h2>
            <span class="ex-group-count">{{ group.items.length }}</span>
          </div>
          <div class="ex-grid">
            <article v-for="(ex, idx) in group.items" :key="ex.id" class="ex-card animate-fade-up"
              :style="{ animationDelay: (idx % 12) * 40 + 'ms' }"
              @click="$router.push(`/fitness/exercise/${ex.id}`)">
              <div class="ex-card-gif">
                <img v-if="ex.gif_url" :src="ex.gif_url" :alt="ex.name" loading="lazy" />
                <img v-else-if="ex.image_url" :src="ex.image_url" :alt="ex.name" loading="lazy" />
                <div v-else class="ex-card-fallback" :style="{ background: group.color + '12' }">
                  <span :style="{ color: group.color }">{{ group.label.charAt(0) }}</span>
                </div>
                <div class="ex-card-overlay">
                  <span class="ex-card-muscle-tag" :style="{ background: group.color }">{{ group.label }}</span>
                </div>
                <div class="ex-card-hover">
                  <span class="ex-card-hover-text">查看详情</span>
                </div>
              </div>
              <div class="ex-card-body">
                <h3 class="ex-card-title">{{ ex.name }}</h3>
                <div class="ex-card-meta">
                  <div class="ex-card-difficulty">
                    <span :class="['ex-dot', 'ex-dot--' + ex.difficulty]"></span>
                    <span class="ex-dot-label">{{ DIFF_LABEL[ex.difficulty] || '' }}</span>
                  </div>
                  <span class="ex-card-equip" v-if="ex.equipment">{{ shortEquip(ex.equipment) }}</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </template>

      <!-- Flat Mode -->
      <template v-else>
        <div class="ex-grid">
          <article v-for="(ex, idx) in displayList" :key="ex.id" class="ex-card animate-fade-up"
            :style="{ animationDelay: (idx % 12) * 40 + 'ms' }"
            @click="$router.push(`/fitness/exercise/${ex.id}`)">
            <div class="ex-card-gif">
              <img v-if="ex.gif_url" :src="ex.gif_url" :alt="ex.name" loading="lazy" />
              <img v-else-if="ex.image_url" :src="ex.image_url" :alt="ex.name" loading="lazy" />
              <div v-else class="ex-card-fallback" :style="{ background: getGroupColor(ex.muscle_group) + '12' }">
                <span :style="{ color: getGroupColor(ex.muscle_group) }">{{ (MUSCLE_MAP[ex.muscle_group] || '').charAt(0) }}</span>
              </div>
              <div class="ex-card-overlay">
                <span class="ex-card-muscle-tag" :style="{ background: getGroupColor(ex.muscle_group) }">
                  {{ MUSCLE_MAP[ex.muscle_group] || ex.muscle_group }}
                </span>
              </div>
              <div class="ex-card-hover">
                <span class="ex-card-hover-text">查看详情</span>
              </div>
            </div>
            <div class="ex-card-body">
              <h3 class="ex-card-title">{{ ex.name }}</h3>
              <div class="ex-card-meta">
                <div class="ex-card-difficulty">
                  <span :class="['ex-dot', 'ex-dot--' + ex.difficulty]"></span>
                  <span class="ex-dot-label">{{ DIFF_LABEL[ex.difficulty] || '' }}</span>
                </div>
                <span class="ex-card-equip" v-if="ex.equipment">{{ shortEquip(ex.equipment) }}</span>
              </div>
            </div>
          </article>
        </div>
        <div v-if="displayList.length < filteredList.length" class="ex-load-more">
          <button class="ex-load-more-btn" @click="loadMore" :disabled="loadingMore">
            {{ loadingMore ? '加载中...' : `加载更多 (已显示 ${displayList.length}/${filteredList.length})` }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { MUSCLE_MAP, LEVEL_MAP, FITNESS_CATEGORY_MAP as CATEGORY_MAP, MUSCLE_DISPLAY, EQUIP_MAP } from '@/utils/fitness-constants'
import { Search, ChevronDown, X, AlertCircle, SearchX, Database, Layers, Dumbbell } from 'lucide-vue-next'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const DIFF_LABEL: Record<string, string> = { beginner: '初级', intermediate: '中级', advanced: '高级' }

const API = import.meta.env.VITE_API_BASE_URL || '/api'

function getGroupColor(mg: string): string { return MUSCLE_DISPLAY[mg]?.color || '#999' }

function shortEquip(eq: string): string {
  if (!eq) return ''
  const first = eq.split(',')[0].trim().toLowerCase()
  return EQUIP_MAP[first] || EQUIP_MAP[eq.split(',')[0].trim()] || eq.split(',')[0].trim()
}

const muscleGroups = computed(() => [
  { value: '', label: '全部', color: '#1B6B3A', count: list.value.length },
  ...Object.entries(MUSCLE_DISPLAY).map(([value, info]) => ({
    value, label: info.label, color: info.color,
    count: list.value.filter(e => e.muscle_group === value).length
  })).filter(g => g.count > 0)
])

const difficulties = [
  { value: '', label: '全部' },
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' }
]
const categories = [
  { value: '', label: '全部' },
  { value: 'strength', label: '力量' },
  { value: 'cardio', label: '有氧' },
  { value: 'flexibility', label: '柔韧' }
]

const equipmentList = computed(() => {
  const eqMap = new Map<string, number>()
  for (const ex of list.value) {
    if (ex.equipment) {
      ex.equipment.split(',').forEach((e: string) => {
        const t = e.trim(); if (t) eqMap.set(t, (eqMap.get(t) || 0) + 1)
      })
    }
  }
  return [
    { value: '', label: '全部' },
    ...[...eqMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([v, cnt]) => ({ value: v, label: EQUIP_MAP[v.toLowerCase()] || v, count: cnt }))
  ]
})

const list = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const searchKeyword = ref('')
const searchFocused = ref(false)
const currentPage = ref(1)
const pageSize = 48
const showEquipDropdown = ref(false)
const loadingMore = ref(false)

const filters = reactive({ muscleGroup: '', difficulty: '', category: '', equipment: '' })
let searchTimer: ReturnType<typeof setTimeout> | null = null

const hasActiveFilters = computed(() =>
  filters.difficulty || filters.category || filters.equipment || searchKeyword.value
)

const isGroupedMode = computed(() => !filters.muscleGroup && !searchKeyword.value && !filters.equipment && !filters.difficulty && !filters.category)

const filteredList = computed(() => {
  return list.value.filter(ex => {
    if (filters.muscleGroup && ex.muscle_group !== filters.muscleGroup) return false
    if (filters.difficulty && ex.difficulty !== filters.difficulty) return false
    if (filters.category && ex.category !== filters.category) return false
    if (filters.equipment && !ex.equipment?.toLowerCase().includes(filters.equipment.toLowerCase())) return false
    if (searchKeyword.value) {
      const kw = searchKeyword.value.toLowerCase()
      const haystack = `${ex.name} ${ex.muscle_group} ${ex.target_muscles} ${ex.equipment} ${ex.body_part}`.toLowerCase()
      if (!haystack.includes(kw)) return false
    }
    return true
  })
})

const totalCount = computed(() => list.value.length)

const groupedExercises = computed(() => {
  const groupMap: Record<string, any[]> = {}
  for (const ex of filteredList.value) {
    const mg = ex.muscle_group
    if (!groupMap[mg]) groupMap[mg] = []
    groupMap[mg].push(ex)
  }
  const groups: any[] = []
  for (const [value, info] of Object.entries(MUSCLE_DISPLAY)) {
    if (groupMap[value]?.length) {
      groups.push({ value, label: info.label, color: info.color, items: groupMap[value] })
    }
  }
  return groups
})

const displayList = computed(() => {
  const count = currentPage.value * pageSize
  return filteredList.value.slice(0, count)
})

function setFilter(key: string, value: string) {
  ;(filters as any)[key] = value
  currentPage.value = 1
}

function resetFilters() {
  filters.muscleGroup = ''; filters.difficulty = ''; filters.category = ''
  filters.equipment = ''; searchKeyword.value = ''; currentPage.value = 1
}

function loadMore() {
  loadingMore.value = true
  setTimeout(() => {
    currentPage.value++
    loadingMore.value = false
  }, 200)
}

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { currentPage.value = 1 }, 300)
}

async function fetchExercises() {
  loading.value = true; error.value = ''
  try {
    const res = await fetch(`${API}/exercises?limit=2000`)
    if (!res.ok) throw new Error(`请求失败 (${res.status})`)
    list.value = await res.json()
  } catch (e: any) {
    error.value = e.message || '加载失败，请稍后重试'
  } finally { loading.value = false }
}

onMounted(() => { fetchExercises() })
</script>

<style scoped>
.ex-page { min-height: 100vh; background: var(--color-bg); }

/* ── Header ── */
.ex-header {
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-4) var(--space-5);
}
.ex-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}
.ex-header-left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.ex-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text-primary);
}
.ex-stats-badges {
  display: flex;
  gap: var(--space-2);
}
.ex-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  background: var(--color-surface);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

/* Header Search */
.ex-search-box {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-full);
  padding: 7px 14px;
  transition: all 0.2s ease;
  min-width: 240px;
}
.ex-search-box.focused {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(27,107,58,0.08);
}
.ex-search-icon { color: var(--color-text-tertiary); flex-shrink: 0; }
.ex-search-input {
  flex: 1; border: none; outline: none; background: transparent;
  font-size: var(--text-sm); color: var(--color-text-primary);
  font-family: var(--font-body);
}
.ex-search-input::placeholder { color: var(--color-text-tertiary); }
.ex-search-count {
  font-size: var(--text-xs); color: var(--color-primary);
  white-space: nowrap; font-weight: 700;
  background: var(--color-primary-50);
  padding: 1px 8px;
  border-radius: var(--radius-full);
}

/* ── Muscle Tabs ── */
.ex-tab-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-light);
  padding: 0 var(--space-5);
}
.ex-tab-scroll {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: var(--space-3) 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.ex-tab-scroll::-webkit-scrollbar { display: none; }

.ex-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border: 1.5px solid transparent;
  border-radius: var(--radius-full);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
}
.ex-tab:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}
.ex-tab.active {
  background: color-mix(in srgb, var(--tab-color) 10%, transparent);
  border-color: var(--tab-color);
  color: var(--color-text-primary);
  font-weight: 600;
}
.ex-tab__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ex-tab__label { font-weight: 500; }
.ex-tab__count {
  font-size: 11px;
  color: var(--color-text-tertiary);
  font-weight: 600;
}
.ex-tab.active .ex-tab__count {
  color: var(--tab-color);
}

/* ── Toolbar ── */
.ex-toolbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3) var(--space-5);
}
.ex-toolbar-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.ex-filter-group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ex-filter-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.ex-filter-chips {
  display: flex;
  align-items: center;
  gap: 4px;
}
.ex-chip {
  padding: 5px 12px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  font-weight: 500;
}
.ex-chip.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.ex-chip:hover:not(.active) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.ex-chip--dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
}
.ex-filter-sep {
  width: 1px;
  height: 20px;
  background: var(--color-border-light);
  margin: 0 4px;
}

.ex-equip-dropdown { position: relative; }
.ex-equip-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-2);
  z-index: 10;
  min-width: 180px;
  max-height: 280px;
  overflow-y: auto;
}
.ex-equip-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.15s;
  text-align: left;
}
.ex-equip-item:hover { background: var(--color-surface); color: var(--color-text-primary); }
.ex-equip-item.active { color: var(--color-primary); font-weight: 600; }
.ex-equip-count { font-size: 11px; color: var(--color-text-tertiary); }

.ex-toolbar-meta {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.ex-result-count {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: 600;
}
.ex-clear-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: none;
  background: rgba(220,38,38,0.06);
  color: var(--state-error);
  font-size: var(--text-xs);
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: all 0.15s;
  font-weight: 500;
}
.ex-clear-btn:hover { background: rgba(220,38,38,0.12); }

/* ── Container & Grid ── */
.ex-container { max-width: 1200px; margin: 0 auto; padding: var(--space-2) var(--space-5) var(--space-12); }
.ex-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: var(--space-4); }

/* ── Group ── */
.ex-group { margin-bottom: var(--space-8); }
.ex-group-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-4);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--group-color) 6%, transparent);
  border-left: 3px solid var(--group-color);
}
.ex-group-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ex-group-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}
.ex-group-count {
  margin-left: auto;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-tertiary);
  background: var(--color-bg-card);
  padding: 2px 10px;
  border-radius: var(--radius-full);
}

/* ── Card ── */
.ex-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--color-border-light);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.ex-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
  border-color: var(--color-border);
}
.ex-card-gif {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background: var(--color-surface);
}
.ex-card-gif img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.ex-card:hover .ex-card-gif img {
  transform: scale(1.08);
}
.ex-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-3);
  background: linear-gradient(transparent, rgba(0,0,0,0.55));
  display: flex;
  align-items: flex-end;
}
.ex-card-muscle-tag {
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
}
.ex-card-hover {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.ex-card:hover .ex-card-hover {
  opacity: 1;
}
.ex-card-hover-text {
  padding: 8px 20px;
  background: rgba(255,255,255,0.95);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  backdrop-filter: blur(4px);
}
.ex-card-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  opacity: 0.4;
}
.ex-card-body { padding: var(--space-3) var(--space-4) var(--space-4); }
.ex-card-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ex-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}
.ex-card-difficulty {
  display: flex;
  align-items: center;
  gap: 4px;
}
.ex-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ex-dot--beginner { background: #22C55E; }
.ex-dot--intermediate { background: #F59E0B; }
.ex-dot--advanced { background: #EF4444; }
.ex-dot-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
}
.ex-card-equip {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

/* ── Skeleton ── */
.ex-skeleton { border-radius: var(--radius-xl); overflow: hidden; background: var(--color-bg-card); border: 1px solid var(--color-border-light); }
.ex-skeleton-gif { height: 200px; background: var(--color-surface); animation: shimmer 1.5s infinite; }
.ex-skeleton-body { padding: var(--space-3) var(--space-4); display: flex; flex-direction: column; gap: 6px; }
.ex-skeleton-line { height: 14px; border-radius: 7px; background: var(--color-surface); animation: shimmer 1.5s infinite; }
.ex-skeleton-line.w60 { width: 60%; }
.ex-skeleton-line.w40 { width: 40%; }
@keyframes shimmer { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

/* ── State ── */
.ex-state { padding: var(--space-16) var(--space-5); display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
.ex-state-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  opacity: 0.6;
}
.ex-state-text { font-size: var(--text-sm); color: var(--color-text-tertiary); }
.ex-retry-btn {
  padding: 8px 24px; background: var(--color-primary); color: #fff;
  border: none; border-radius: var(--radius-full); font-size: var(--text-sm);
  font-weight: 600; cursor: pointer; transition: opacity 0.2s;
}
.ex-retry-btn:hover { opacity: 0.9; }

/* ── Load More ── */
.ex-load-more { display: flex; justify-content: center; margin-top: var(--space-8); }
.ex-load-more-btn {
  padding: 10px 32px;
  background: var(--color-bg-card);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.ex-load-more-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.ex-load-more-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .ex-header-inner { flex-direction: column; align-items: flex-start; gap: var(--space-3); }
  .ex-search-box { min-width: auto; width: 100%; }
  .ex-tab { padding: 6px 12px; font-size: var(--text-xs); }
  .ex-tab__count { display: none; }
  .ex-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--space-3); }
  .ex-card-gif { height: 160px; }
  .ex-toolbar-row { flex-direction: column; align-items: flex-start; }
  .ex-filter-group { width: 100%; overflow-x: auto; }
  .ex-filter-sep { display: none; }
  .ex-toolbar-meta { margin-left: 0; width: 100%; justify-content: space-between; }
  .ex-stats-badges { display: none; }
}
</style>
