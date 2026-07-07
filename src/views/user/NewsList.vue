<template>
  <div class="nl-page">
    <Navbar :menu-links="newsMenuLinks" />
    <HeroBanner :items="heroItems" />

    <!-- 筛选栏 吸顶 -->
    <div class="nl-filter">
      <div class="nl-filter-inner">
        <div class="nl-search">
          <Search :size="16" class="nl-search-icon" />
          <input
            v-model="searchKeyword"
            class="nl-search-input"
            placeholder="搜索文章标题、关键词..."
            @input="onSearchInput"
          />
          <button v-if="searchKeyword" class="nl-search-clear" @click="search('')">
            <X :size="14" />
          </button>
        </div>
        <div class="nl-controls">
          <div class="nl-select-wrap">
            <select v-model="selectedCategory" class="nl-select" @change="onCategoryChange">
              <option value="all">全部分类</option>
              <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
            </select>
            <ChevronDown :size="14" class="nl-select-arrow" />
          </div>
          <div class="nl-select-wrap">
            <select v-model="sort" class="nl-select" @change="onSortChange">
              <option value="newest">最新发布</option>
              <option value="popular">最多浏览</option>
            </select>
            <ChevronDown :size="14" class="nl-select-arrow" />
          </div>
          <ViewToggle v-model="viewMode" />
        </div>
      </div>
      <!-- 标签行 -->
      <div class="nl-tags-bar" v-if="allTags.length > 0">
        <span class="nl-tags-fire"><Flame :size="14" /></span>
        <div :class="['nl-tags-row', { expanded: tagExpanded }]">
          <button v-for="tag in allTags" :key="tag" :class="['nl-tag', { active: selectedTags.includes(tag) }]" @click="toggleTag(tag)">{{ tag }}</button>
        </div>
        <button v-if="selectedTags.length > 0" class="nl-tags-clear" @click="resetTags()">
          <X :size="12" />
        </button>
        <button class="nl-tags-toggle" @click="tagExpanded = !tagExpanded">
          <ChevronDown :size="12" :class="{ 'rotated': tagExpanded }" />
        </button>
      </div>
    </div>

    <!-- 主体 -->
    <div class="nl-main">
      <div class="nl-layout">
        <div class="nl-primary">
          <div class="nl-results-header" v-if="!loading">
            <span v-if="!isFiltering" class="nl-results-count">
              共 <strong>{{ total }}</strong> 篇资讯
            </span>
            <span v-else class="nl-results-count">
              找到 <strong>{{ total }}</strong> 篇
              <button class="nl-results-reset" @click="resetFilters()">
                <X :size="12" /> 清除筛选
              </button>
            </span>
          </div>

          <!-- Loading -->
          <div v-if="loading" :class="viewMode === 'list' ? 'nl-list-view' : 'nl-grid'">
            <NewsCard v-for="i in 6" :key="i" :news="{} as any" :loading="true" />
          </div>

          <!-- Error -->
          <div v-else-if="hasError" class="nl-state">
            <div class="nl-state-icon"><AlertCircle :size="36" /></div>
            <h3>加载失败</h3>
            <p>{{ error }}</p>
            <button class="nl-state-btn" @click="retry">重新加载</button>
          </div>

          <!-- Empty -->
          <div v-else-if="list.length === 0" class="nl-state">
            <div class="nl-state-icon"><FileX :size="36" /></div>
            <h3>没有找到匹配的资讯</h3>
            <p>试试调整筛选条件</p>
            <button class="nl-state-btn" @click="resetFilters()">重置筛选</button>
          </div>

          <!-- List -->
          <div v-else :class="viewMode === 'list' ? 'nl-list-view' : 'nl-grid'">
            <NewsCard v-for="item in list" :key="item.id" :news="item" :list-view="viewMode === 'list'" />
          </div>

          <!-- Pagination -->
          <div class="nl-pagination" v-if="total > pageSize">
            <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" layout="total, prev, pager, next" @current-change="onPageChange" />
          </div>
        </div>

        <TrendingSidebar :items="popularNews" :loading="popularLoading" :active-category="selectedCategory" :categories="categories" @select-category="onSidebarCategory" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import Navbar from '@/components/Navbar.vue'
import NewsCard from '@/components/news/NewsCard.vue'
import HeroBanner from '@/components/news/HeroBanner.vue'
import TrendingSidebar from '@/components/news/TrendingSidebar.vue'
import ViewToggle from '@/components/news/ViewToggle.vue'
import { useNewsList } from '@/composables/useNewsList'
import { useNewsStore } from '@/stores/news'
import { Search, X, ChevronDown, Flame, AlertCircle, FileX } from 'lucide-vue-next'
import type { NewsCardData } from '@/types/news'

const newsMenuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯', active: true },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现' }
]

const store = useNewsStore()
const { list, total, loading, error, hasError, searchKeyword, selectedCategory, selectedTags, sort, page, pageSize, isFiltering, categories, allTags, search, setCategory, setSort, setPage, toggleTag, resetTags, resetFilters } = useNewsList()

const viewMode = ref<'grid' | 'list'>((localStorage.getItem('newsViewMode') as 'grid' | 'list') || 'grid')
const heroItems = ref<NewsCardData[]>([])
const popularNews = computed(() => store.popularNews)
const popularLoading = ref(false)
const tagExpanded = ref(false)

let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearchInput() { clearTimeout(searchTimer!); searchTimer = setTimeout(() => search(searchKeyword.value), 350) }
function onCategoryChange() { setCategory(selectedCategory.value) }
function onSortChange() { setSort(sort.value) }
function onPageChange(p: number) { setPage(p) }
function onSidebarCategory(val: string) { setCategory(val as any) }
function retry() { search() }

watch(viewMode, (v) => localStorage.setItem('newsViewMode', v))

onMounted(async () => {
  popularLoading.value = true
  const [popular] = await Promise.all([
    store.fetchPopular(10),
    store.fetchHotTags(20)
  ])
  heroItems.value = popular.slice(0, 5)
  popularLoading.value = false
})
</script>

<style scoped>
.nl-page { min-height: 100vh; background: var(--color-bg); }

/* ===== Filter Bar ===== */
.nl-filter {
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-light);
  padding: 12px var(--space-4);
  position: sticky;
  top: 64px;
  z-index: 40;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}

.nl-filter-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Search */
.nl-search {
  flex: 1;
  min-width: 160px;
  position: relative;
  display: flex;
  align-items: center;
}
.nl-search-icon {
  position: absolute;
  left: 12px;
  color: var(--color-text-tertiary);
  pointer-events: none;
}
.nl-search-input {
  width: 100%;
  padding: 9px 32px 9px 36px;
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  font-size: 13px;
  outline: none;
  transition: all 0.2s;
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-body);
}
.nl-search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(27,107,58,0.08);
}
.nl-search-input::placeholder {
  color: var(--color-text-tertiary);
}
.nl-search-clear {
  position: absolute;
  right: 8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: var(--color-surface);
  color: var(--color-text-tertiary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.nl-search-clear:hover {
  background: var(--color-border);
  color: var(--color-text-primary);
}

/* Controls */
.nl-controls {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.nl-select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.nl-select {
  appearance: none;
  padding: 9px 30px 9px 12px;
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  font-size: 13px;
  outline: none;
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
  font-weight: 500;
}
.nl-select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(27,107,58,0.08);
}
.nl-select-arrow {
  position: absolute;
  right: 10px;
  color: var(--color-text-tertiary);
  pointer-events: none;
}

/* Tags bar */
.nl-tags-bar {
  max-width: 1200px;
  margin: 8px auto 0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}
.nl-tags-fire {
  display: flex;
  align-items: center;
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 4px;
}
.nl-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 30px;
  overflow: hidden;
  transition: max-height 0.35s ease;
  flex: 1;
}
.nl-tags-row.expanded { max-height: 600px; }

.nl-tag {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--color-border-light);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  transition: all 0.2s;
  font-family: var(--font-body);
  white-space: nowrap;
  line-height: 20px;
}
.nl-tag:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-50);
}
.nl-tag.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 2px 6px rgba(27,107,58,0.2);
}

.nl-tags-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: rgba(239,68,68,0.08);
  color: var(--state-error);
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 4px;
  transition: all 0.15s;
}
.nl-tags-clear:hover { background: rgba(239,68,68,0.15); }

.nl-tags-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--color-border-light);
  background: var(--color-bg-card);
  color: var(--color-text-tertiary);
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 3px;
  transition: all 0.2s;
}
.nl-tags-toggle:hover { border-color: var(--color-primary); color: var(--color-primary); }
.nl-tags-toggle .rotated { transform: rotate(180deg); transition: transform 0.3s; }

/* ===== Layout ===== */
.nl-main { max-width: 1200px; margin: 0 auto; padding: 20px var(--space-4) 80px; }
.nl-layout { display: flex; gap: 24px; align-items: flex-start; }
.nl-primary { flex: 1; min-width: 0; }

/* Results header */
.nl-results-header { margin-bottom: 16px; display: flex; align-items: center; }
.nl-results-count { font-size: var(--text-sm); color: var(--color-text-tertiary); }
.nl-results-count strong { color: var(--color-primary); font-weight: 700; }
.nl-results-reset {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--text-sm);
  text-decoration: underline;
  margin-left: 8px;
  font-family: var(--font-body);
}

/* Grid / List */
.nl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}
.nl-list-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

/* State */
.nl-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}
.nl-state-icon {
  color: var(--color-text-tertiary);
  margin-bottom: 16px;
  opacity: 0.5;
}
.nl-state h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: 6px;
}
.nl-state p {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin-bottom: 20px;
}
.nl-state-btn {
  padding: 10px 24px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
}
.nl-state-btn:hover {
  background: var(--color-primary-light);
  box-shadow: 0 4px 12px rgba(27,107,58,0.25);
}

/* Pagination */
.nl-pagination { display: flex; justify-content: center; }

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .nl-layout { flex-direction: column; }
}
@media (max-width: 640px) {
  .nl-filter-inner { flex-direction: column; }
  .nl-controls { width: 100%; }
  .nl-controls .nl-select-wrap { flex: 1; }
  .nl-controls .nl-select { width: 100%; }
  .nl-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
}
</style>
