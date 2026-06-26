<template>
  <div class="news-list-page">
    <Navbar :menu-links="newsMenuLinks" />

    <!-- ===== Hero Banner ===== -->
    <HeroBanner :items="heroItems" />

    <!-- ===== 筛选栏 ===== -->
    <div class="filter-bar">
      <div class="filter-inner">
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索文章标题、关键词..."
            :prefix-icon="Search"
            clearable
            @input="onSearchInput"
            @clear="search('')"
          />
        </div>
        <div class="filter-right">
          <el-select v-model="selectedCategory" placeholder="全部分类" @change="onCategoryChange">
            <el-option label="全部分类" value="all" />
            <el-option
              v-for="cat in categories"
              :key="cat.value"
              :label="cat.label"
              :value="cat.value"
            />
          </el-select>
          <el-select v-model="sort" placeholder="排序" @change="onSortChange">
            <el-option label="最新发布" value="newest" />
            <el-option label="最多浏览" value="popular" />
          </el-select>
          <ViewToggle v-model="viewMode" />
        </div>
      </div>
      <!-- Tag 标签行 -->
      <div class="tag-row" v-if="allTags.length > 0">
        <button
          v-for="tag in allTags"
          :key="tag"
          :class="['tag-pill', { active: selectedTags.includes(tag) }]"
          @click="toggleTag(tag)"
        >{{ tag }}</button>
        <button v-if="selectedTags.length > 0" class="tag-clear" @click="resetTags()">
          清空标签
        </button>
      </div>
    </div>

    <!-- ===== 主体区 ===== -->
    <div class="news-main">
      <div class="news-layout">
        <!-- 左侧：列表 -->
        <div class="news-primary">
          <!-- 结果计数 -->
          <div class="results-header" v-if="!loading">
            <span class="results-count">
              找到 <strong>{{ total }}</strong> 篇资讯
              <template v-if="isFiltering">
                · <button class="link-reset" @click="resetFilters()">清除筛选</button>
              </template>
            </span>
          </div>

          <!-- Loading -->
          <div v-if="loading" :class="viewMode === 'list' ? 'news-list-view' : 'news-grid'">
            <NewsCard v-for="i in 6" :key="i" :news="{} as any" :loading="true" />
          </div>

          <!-- Error -->
          <div v-else-if="hasError" class="state-box">
            <el-result icon="error" title="加载失败" :sub-title="error">
              <template #extra>
                <el-button type="primary" @click="retry">重新加载</el-button>
              </template>
            </el-result>
          </div>

          <!-- Empty -->
          <div v-else-if="list.length === 0" class="state-box">
            <el-empty description="没有找到匹配的资讯">
              <template #extra>
                <el-button type="primary" @click="resetFilters()">重置筛选条件</el-button>
              </template>
            </el-empty>
          </div>

          <!-- Grid / List view -->
          <div v-else :class="viewMode === 'list' ? 'news-list-view' : 'news-grid'">
            <NewsCard
              v-for="item in list"
              :key="item.id"
              :news="item"
              :class="{ 'news-card--list': viewMode === 'list' }"
            />
          </div>

          <!-- Pagination -->
          <div class="pagination-wrap" v-if="total > pageSize">
            <el-pagination
              v-model:current-page="page"
              :page-size="pageSize"
              :total="total"
              layout="total, prev, pager, next"
              @current-change="onPageChange"
            />
          </div>
        </div>

        <!-- 右侧：侧栏 -->
        <TrendingSidebar
          :items="popularNews"
          :loading="popularLoading"
          :tags="allTags"
          :active-category="selectedCategory"
          :active-tags="selectedTags"
          :categories="categories"
          @select-category="onSidebarCategory"
          @toggle-tag="toggleTag"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
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
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: true },
  { to: '/fitness', label: '训练&饮食', active: false },
  { to: '/recommendation', label: '发现', active: false }
]

const store = useNewsStore()

const {
  list, total, loading, error, hasError,
  searchKeyword, selectedCategory, selectedTags, sort, page, pageSize,
  isFiltering, categories, allTags,
  search, setCategory, setSort, setPage,
  toggleTag, resetTags, resetFilters
} = useNewsList()

// View mode: grid | list (persisted in localStorage)
const viewMode = ref<'grid' | 'list'>(
  (localStorage.getItem('newsViewMode') as 'grid' | 'list') || 'grid'
)

// Hero items: top 5 popular news
const heroItems = ref<NewsCardData[]>([])
const popularNews = computed(() => store.popularNews)
const popularLoading = ref(false)

let searchTimer: ReturnType<typeof setTimeout> | null = null

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    search(searchKeyword.value)
  }, 350)
}

function onCategoryChange() {
  setCategory(selectedCategory.value)
}

function onSortChange() {
  setSort(sort.value)
}

function onPageChange(p: number) {
  setPage(p)
}

function onSidebarCategory(val: string) {
  setCategory(val as any)
}

function retry() {
  search()
}

// Persist view mode preference
import { watch } from 'vue'
watch(viewMode, (val) => {
  localStorage.setItem('newsViewMode', val)
})

onMounted(async () => {
  popularLoading.value = true
  const popular = await store.fetchPopular(10)
  heroItems.value = popular.slice(0, 5)
  popularLoading.value = false
})
</script>

<style scoped>
.news-list-page {
  min-height: 100vh;
  background: var(--color-bg);
}

/* ── Filter Bar ── */
.filter-bar {
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-4) var(--space-4);
  position: sticky;
  top: 0;
  z-index: 40;
}
.filter-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: var(--space-3);
  align-items: center;
  flex-wrap: wrap;
}
.search-box {
  flex: 1;
  min-width: 200px;
}
.filter-right {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  flex-shrink: 0;
}
.tag-row {
  max-width: 1200px;
  margin: var(--space-3) auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
}
.tag-pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--color-border-light);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  font-family: var(--font-body);
}
.tag-pill:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.tag-pill.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.tag-clear {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px 8px;
  transition: color 0.2s;
}
.tag-clear:hover { color: var(--state-error); }

/* ── Layout ── */
.news-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4) var(--space-16);
}
.news-layout {
  display: flex;
  gap: var(--space-8);
  align-items: flex-start;
}
.news-primary {
  flex: 1;
  min-width: 0;
}

/* ── Results ── */
.results-header {
  margin-bottom: var(--space-4);
}
.results-count {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}
.results-count strong {
  color: var(--color-primary);
  font-weight: 700;
}
.link-reset {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--text-sm);
  text-decoration: underline;
}

/* ── Grid ── */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

/* ── List ── */
.news-list-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}
.news-list-view :deep(.news-card) {
  flex-direction: row;
}
.news-list-view :deep(.card-cover) {
  width: 240px;
  min-height: 160px;
  height: auto;
  flex-shrink: 0;
}
.news-list-view :deep(.card-body) {
  flex: 1;
}

/* ── States ── */
.state-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: var(--space-12) 0;
}
.pagination-wrap {
  display: flex;
  justify-content: center;
  padding-top: var(--space-4);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .news-layout {
    flex-direction: column;
  }
}
@media (max-width: 640px) {
  .filter-inner { flex-direction: column; }
  .filter-right { width: 100%; }
  .filter-right .el-select { flex: 1; }
  .news-grid { grid-template-columns: 1fr; }
  .news-list-view :deep(.news-card) { flex-direction: column; }
  .news-list-view :deep(.card-cover) { width: 100%; height: 180px; }
}
</style>
