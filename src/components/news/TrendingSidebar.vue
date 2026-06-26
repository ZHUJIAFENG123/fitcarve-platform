<template>
  <aside class="trending-sidebar">
    <!-- 热门排行 -->
    <div class="sidebar-card">
      <h3 class="sidebar-title">🔥 热门排行</h3>
      <div v-if="loading" class="sidebar-skeleton">
        <div v-for="i in 5" :key="i" class="sk-line" :style="{ width: (90 - i * 10) + '%' }" />
      </div>
      <ul v-else-if="items.length > 0" class="popular-list">
        <li
          v-for="(item, idx) in items"
          :key="item.id"
          class="popular-item"
          @click="$router.push(`/news/detail/${item.id}`)"
        >
          <span :class="['popular-rank', { top3: idx < 3 }]">{{ idx + 1 }}</span>
          <div class="popular-info">
            <span class="popular-title">{{ item.title }}</span>
            <span class="popular-views">{{ formatViews(item.views) }} 浏览</span>
          </div>
        </li>
      </ul>
      <p v-else class="sidebar-empty">暂无热门资讯</p>
    </div>

    <!-- 分类快选 -->
    <div class="sidebar-card">
      <h3 class="sidebar-title">📂 分类浏览</h3>
      <div class="category-grid">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="['cat-btn', { active: activeCategory === cat.value }]"
          @click="$emit('select-category', activeCategory === cat.value ? 'all' : cat.value)"
        >
          <span class="cat-icon">{{ CATEGORY_ICONS[cat.value] }}</span>
          <span class="cat-label">{{ cat.label }}</span>
        </button>
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
import type { NewsCardData } from '@/types/news'
import type { NewsCategory } from '@/types/common'
import { CATEGORY_OPTIONS } from '@/utils/constants'

const CATEGORY_ICONS: Record<string, string> = {
  knowledge: '🏋️',
  nutrition: '🥗',
  recovery: '🩺',
  equipment: '🎯'
}

defineProps<{
  items: NewsCardData[]
  loading?: boolean
  activeCategory?: string
  categories?: typeof CATEGORY_OPTIONS
}>()

defineEmits<{
  'select-category': [value: string]
}>()

function formatViews(v: number) {
  if (v >= 10000) return (v / 10000).toFixed(1) + 'w'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return String(v)
}
</script>

<style scoped>
.trending-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.sidebar-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-md);
}
.sidebar-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  font-family: var(--font-display);
}

/* Skeleton */
.sidebar-skeleton .sk-line {
  height: 18px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  margin-bottom: var(--space-3);
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.sidebar-empty {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  text-align: center;
  padding: var(--space-4) 0;
}

/* Popular list */
.popular-list {
  list-style: none;
  padding: 0;
}
.popular-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.15s;
}
.popular-item:hover {
  background: var(--color-primary-50);
  margin: 0 calc(-1 * var(--space-2));
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}
.popular-rank {
  font-weight: 800;
  font-size: var(--text-base);
  color: var(--color-text-tertiary);
  width: 24px;
  text-align: center;
  flex-shrink: 0;
  font-family: var(--font-display);
}
.popular-rank.top3 { color: var(--color-accent); }
.popular-info { min-width: 0; }
.popular-title {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 2px;
  transition: color 0.15s;
}
.popular-item:hover .popular-title { color: var(--color-primary); }
.popular-views {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

/* Category grid */
.category-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}
.cat-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-2);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
}
.cat-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}
.cat-btn.active {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
  box-shadow: 0 0 0 2px rgba(27,107,58,0.1);
}
.cat-icon { font-size: 1.5rem; }
.cat-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
}

/* Tag cloud */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
.tag-chip {
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--color-border-light);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  transition: all 0.2s;
  font-family: var(--font-body);
}
.tag-chip:hover { border-color: var(--color-primary); color: var(--color-primary); }
.tag-chip.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
</style>
