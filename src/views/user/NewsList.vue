<template>
  <div class="news-list-page">
    <Navbar :menu-links="newsMenuLinks" />
    <HeroBanner :items="heroItems" />

    <!-- 筛选栏 吸顶 -->
    <div class="filter-bar">
      <div class="filter-inner">
        <div class="search-box">
          <el-input v-model="searchKeyword" placeholder="搜索文章标题、关键词..." :prefix-icon="Search" clearable @input="onSearchInput" @clear="search('')" />
        </div>
        <div class="filter-controls">
          <el-select v-model="selectedCategory" placeholder="全部分类" size="default" @change="onCategoryChange">
            <el-option label="全部分类" value="all" />
            <el-option v-for="cat in categories" :key="cat.value" :label="cat.label" :value="cat.value" />
          </el-select>
          <el-select v-model="sort" placeholder="排序" size="default" @change="onSortChange">
            <el-option label="最新发布" value="newest" />
            <el-option label="最多浏览" value="popular" />
          </el-select>
          <ViewToggle v-model="viewMode" />
        </div>
      </div>
      <!-- 🔥 标签行 — 仅一行，可展开 -->
      <div class="tag-row-wrap" v-if="allTags.length > 0">
        <span class="tag-fire">🔥</span>
        <div :class="['tag-row', { expanded: tagExpanded }]">
          <button v-for="tag in allTags" :key="tag" :class="['tag-pill', { active: selectedTags.includes(tag) }]" @click="toggleTag(tag)">{{ tag }}</button>
          <button v-if="selectedTags.length > 0" class="tag-clear" @click="resetTags()">✕</button>
        </div>
        <button class="tag-expand" @click="tagExpanded = !tagExpanded">{{ tagExpanded ? '收起 ▲' : '更多 ▾' }}</button>
      </div>
    </div>

    <!-- 主体 -->
    <div class="news-main">
      <div class="news-layout">
        <div class="news-primary">
          <div class="results-header" v-if="!loading">
            <span v-if="!isFiltering" class="results-count">共 <strong>{{ total }}</strong> 篇资讯</span>
            <span v-else class="results-count">找到 <strong>{{ total }}</strong> 篇 · <button class="link-reset" @click="resetFilters()">清除筛选</button></span>
          </div>

          <div v-if="loading" :class="viewMode === 'list' ? 'news-list-view' : 'news-grid'">
            <NewsCard v-for="i in 6" :key="i" :news="{} as any" :loading="true" />
          </div>
          <div v-else-if="hasError" class="state-box">
            <el-result icon="error" title="加载失败" :sub-title="error"><template #extra><el-button type="primary" @click="retry">重新加载</el-button></template></el-result>
          </div>
          <div v-else-if="list.length === 0" class="state-box">
            <el-empty description="没有找到匹配的资讯"><template #extra><el-button type="primary" @click="resetFilters()">重置筛选</el-button></template></el-empty>
          </div>
          <div v-else :class="viewMode === 'list' ? 'news-list-view' : 'news-grid'">
            <NewsCard v-for="item in list" :key="item.id" :news="item" />
          </div>

          <div class="pagination-wrap" v-if="total > pageSize">
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
import { Search } from '@element-plus/icons-vue'
import Navbar from '@/components/Navbar.vue'
import NewsCard from '@/components/news/NewsCard.vue'
import HeroBanner from '@/components/news/HeroBanner.vue'
import TrendingSidebar from '@/components/news/TrendingSidebar.vue'
import ViewToggle from '@/components/news/ViewToggle.vue'
import { useNewsList } from '@/composables/useNewsList'
import { useNewsStore } from '@/stores/news'
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
  const popular = await store.fetchPopular(10)
  heroItems.value = popular.slice(0, 5)
  popularLoading.value = false
})
</script>

<style scoped>
.news-list-page { min-height: 100vh; background: var(--color-bg); }

/* ── Filter Bar ── */
.filter-bar { background: var(--color-bg-card); border-bottom: 1px solid var(--color-border); padding: 10px var(--space-4); position: sticky; top: 64px; z-index: 40; }
.filter-inner { max-width: 1200px; margin: 0 auto; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.search-box { flex: 1; min-width: 160px; }
.filter-controls { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
.filter-controls .el-select { width: 120px; }

/* Tags — 1 row + expand */
.tag-row-wrap { max-width: 1200px; margin: 6px auto 0; display: flex; align-items: flex-start; gap: 4px; }
.tag-fire { font-size: 14px; line-height: 28px; flex-shrink: 0; }
.tag-row { display: flex; flex-wrap: wrap; gap: 6px; max-height: 30px; overflow: hidden; transition: max-height 0.3s; flex: 1; }
.tag-row.expanded { max-height: 600px; }
.tag-pill { padding: 3px 10px; border-radius: var(--radius-full); font-size: 12px; font-weight: 500; cursor: pointer; border: 1px solid var(--color-border-light); background: var(--color-surface); color: var(--color-text-secondary); transition: all 0.15s; font-family: var(--font-body); white-space: nowrap; line-height: 22px; }
.tag-pill:hover { border-color: var(--color-primary); color: var(--color-primary); }
.tag-pill.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.tag-clear { font-size: 12px; color: var(--color-text-tertiary); cursor: pointer; background: none; border: none; padding: 3px 8px; line-height: 22px; }
.tag-clear:hover { color: var(--state-error); }
.tag-expand { font-size: 11px; color: var(--color-primary); cursor: pointer; background: none; border: none; padding: 3px 6px; white-space: nowrap; line-height: 22px; flex-shrink: 0; }

/* ── Layout ── */
.news-main { max-width: 1200px; margin: 0 auto; padding: 20px var(--space-4) 80px; }
.news-layout { display: flex; gap: 24px; align-items: flex-start; }
.news-primary { flex: 1; min-width: 0; }

.results-header { margin-bottom: 16px; display: flex; align-items: center; }
.results-count { font-size: 14px; color: var(--color-text-tertiary); }
.results-count strong { color: var(--color-primary); font-weight: 700; }
.link-reset { background: none; border: none; color: var(--color-primary); cursor: pointer; font-size: 14px; text-decoration: underline; margin-left: 4px; }

/* Grid — always multi-column */
.news-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 32px; }
.news-list-view { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }

.state-box { display: flex; justify-content: center; padding: 80px 0; }
.pagination-wrap { display: flex; justify-content: center; }

@media (max-width: 900px) { .news-layout { flex-direction: column; } }
@media (max-width: 640px) {
  .filter-inner { flex-direction: column; }
  .filter-controls { width: 100%; }
  .filter-controls .el-select { flex: 1; }
  .news-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
}
</style>
