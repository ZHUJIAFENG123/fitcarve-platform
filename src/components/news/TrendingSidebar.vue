<template>
  <aside class="ts-sidebar">
    <!-- 热门排行 -->
    <div class="ts-card">
      <div class="ts-card-header">
        <h3 class="ts-card-title">
          <TrendingUp :size="16" />
          <span>热门排行</span>
        </h3>
        <span class="ts-card-badge">TOP {{ items.length }}</span>
      </div>
      <div v-if="loading" class="ts-skeleton">
        <div v-for="i in 5" :key="i" class="ts-sk-line" :style="{ width: (90 - i * 8) + '%' }" />
      </div>
      <ul v-else-if="items.length > 0" class="ts-rank-list">
        <li
          v-for="(item, idx) in items"
          :key="item.id"
          class="ts-rank-item"
          @click="$router.push(`/news/detail/${item.id}`)"
        >
          <div class="ts-rank-num" :class="{ 'ts-top3': idx < 3 }">
            <span v-if="idx < 3" class="ts-rank-medal">{{ ['🥇','🥈','🥉'][idx] }}</span>
            <span v-else>{{ idx + 1 }}</span>
          </div>
          <div class="ts-rank-info">
            <span class="ts-rank-title">{{ item.title }}</span>
            <div class="ts-rank-bottom">
              <span class="ts-rank-views">
                <Eye :size="11" />
                {{ formatViews(item.views) }}
              </span>
              <div class="ts-rank-bar">
                <div class="ts-rank-bar-fill" :style="{ width: getBarWidth(idx) }" :class="{ 'ts-top3-bar': idx < 3 }"></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="ts-empty">暂无热门资讯</p>
    </div>

    <!-- 分类快选 -->
    <div class="ts-card">
      <div class="ts-card-header">
        <h3 class="ts-card-title">
          <Layers :size="16" />
          <span>分类浏览</span>
        </h3>
      </div>
      <div class="ts-cat-grid">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="['ts-cat-btn', { active: activeCategory === cat.value }]"
          :style="{ '--cat-color': getCategoryColor(cat.value) }"
          @click="$emit('select-category', activeCategory === cat.value ? 'all' : cat.value)"
        >
          <div class="ts-cat-icon-wrap">
            <component :is="getCategoryIcon(cat.value)" :size="18" :stroke-width="1.8" />
          </div>
          <span class="ts-cat-label">{{ cat.label }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { NewsCardData } from '@/types/news'
import type { NewsCategory } from '@/types/common'
import { CATEGORY_OPTIONS, CATEGORY_COLORS } from '@/utils/constants'
import { TrendingUp, Eye, Layers, BookOpen, Apple, Heart, Wrench } from 'lucide-vue-next'
import type { Component } from 'vue'

const CATEGORY_ICONS: Record<string, Component> = {
  knowledge: BookOpen,
  nutrition: Apple,
  recovery: Heart,
  equipment: Wrench
}

const props = defineProps<{
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

function getCategoryColor(cat: string) {
  return (CATEGORY_COLORS as Record<string, string>)[cat] || '#1890ff'
}

function getCategoryIcon(cat: string): Component {
  return CATEGORY_ICONS[cat] || BookOpen
}

function getBarWidth(idx: number) {
  // First item 100%, decreasing
  const maxItems = props.items.length || 1
  return Math.max(20, ((maxItems - idx) / maxItems) * 100) + '%'
}
</script>

<style scoped>
.ts-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.ts-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
}

.ts-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.ts-card-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.ts-card-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(249,115,22,0.08);
  padding: 3px 8px;
  border-radius: var(--radius-full);
  letter-spacing: 0.5px;
}

/* Skeleton */
.ts-skeleton .ts-sk-line {
  height: 16px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  margin-bottom: var(--space-3);
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.ts-empty {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  text-align: center;
  padding: var(--space-4) 0;
}

/* Rank list */
.ts-rank-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ts-rank-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: 10px 8px;
  cursor: pointer;
  border-radius: var(--radius-lg);
  transition: all 0.2s;
  margin: 0 -8px;
}

.ts-rank-item:hover {
  background: var(--color-primary-50);
}

.ts-rank-num {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  font-family: var(--font-display);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.ts-rank-num.ts-top3 {
  background: transparent;
}

.ts-rank-medal {
  font-size: 18px;
}

.ts-rank-info {
  flex: 1;
  min-width: 0;
}

.ts-rank-title {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
  transition: color 0.15s;
}

.ts-rank-item:hover .ts-rank-title {
  color: var(--color-primary);
}

.ts-rank-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ts-rank-views {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.ts-rank-bar {
  flex: 1;
  height: 4px;
  background: var(--color-surface);
  border-radius: 2px;
  overflow: hidden;
}

.ts-rank-bar-fill {
  height: 100%;
  background: var(--color-border);
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
}

.ts-rank-bar-fill.ts-top3-bar {
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light));
}

/* Category grid */
.ts-cat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.ts-cat-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  background: var(--color-bg-card);
  cursor: pointer;
  transition: all 0.25s;
  font-family: var(--font-body);
}

.ts-cat-btn:hover {
  border-color: var(--cat-color, var(--color-primary));
  background: color-mix(in srgb, var(--cat-color, var(--color-primary)) 5%, transparent);
  transform: translateY(-1px);
}

.ts-cat-btn.active {
  border-color: var(--cat-color, var(--color-primary));
  background: color-mix(in srgb, var(--cat-color, var(--color-primary)) 8%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--cat-color, var(--color-primary)) 10%, transparent);
}

.ts-cat-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--cat-color, #999) 10%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cat-color, var(--color-primary));
  flex-shrink: 0;
  transition: transform 0.2s;
}

.ts-cat-btn:hover .ts-cat-icon-wrap {
  transform: scale(1.1);
}

.ts-cat-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}
</style>
