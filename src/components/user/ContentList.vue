<template>
  <div class="cl-list">
    <!-- Empty state -->
    <div v-if="items.length === 0" class="cl-empty">
      <component :is="emptyIcon" :size="48" class="cl-empty-icon" />
      <h3>{{ emptyTitle }}</h3>
      <p>{{ emptyDesc }}</p>
      <button v-if="ctaText" class="cl-empty-btn" @click="$emit('cta')">{{ ctaText }}</button>
    </div>

    <!-- List items -->
    <article
      v-for="item in items"
      :key="item.id"
      class="cl-item"
      :class="{ 'cl-item--selected': selectedIds.includes(item.id) }"
      @click="handleItemClick(item)"
    >
      <!-- Checkbox for batch operations -->
      <label v-if="selectable" class="cl-checkbox" @click.stop>
        <input type="checkbox" :checked="selectedIds.includes(item.id)" @change="toggleSelect(item.id)" />
        <span class="cl-checkmark"></span>
      </label>

      <!-- Thumbnail -->
      <div v-if="showImage && item.image" class="cl-thumb">
        <img :src="item.image" :alt="item.title" loading="lazy" />
      </div>

      <!-- Content -->
      <div class="cl-body">
        <h3 class="cl-title">{{ item.title }}</h3>
        <p v-if="item.summary" class="cl-summary">{{ item.summary }}</p>
        
        <!-- Meta row -->
        <div class="cl-meta">
          <span v-if="item.category" class="cl-badge" :style="{ background: getCategoryColor(item.category) }">
            {{ getCategoryLabel(item.category) }}
          </span>
          <span v-if="item.views !== undefined" class="cl-meta-item">
            <Eye :size="12" /> {{ formatViews(item.views) }}
          </span>
          <span v-if="item.commentCount !== undefined" class="cl-meta-item">
            <MessageCircle :size="12" /> {{ item.commentCount }}
          </span>
          <span v-if="item.publishDate" class="cl-meta-item">
            <Calendar :size="12" /> {{ formatDate(item.publishDate) }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div v-if="actions" class="cl-actions">
        <slot name="actions" :item="item"></slot>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { Eye, MessageCircle, Calendar, FileX, Bookmark } from 'lucide-vue-next'
import { CATEGORY_MAP, CATEGORY_COLORS } from '@/utils/constants'
import type { NewsCardData } from '@/types/news'

const props = defineProps<{
  items: Array<NewsCardData & { [key: string]: any }>
  selectable?: boolean
  selectedIds?: number[]
  showImage?: boolean
  actions?: boolean
  emptyTitle?: string
  emptyDesc?: string
  emptyIcon?: any
  ctaText?: string
}>()

const emit = defineEmits<{
  click: [item: any]
  select: [id: number]
  deselect: [id: number]
  cta: []
}>()

function handleItemClick(item: any) {
  if (props.selectable) return // Don't navigate when selecting
  emit('click', item)
}

function toggleSelect(id: number) {
  if (props.selectedIds?.includes(id)) {
    emit('deselect', id)
  } else {
    emit('select', id)
  }
}

function getCategoryLabel(cat: string) {
  return (CATEGORY_MAP as Record<string, string>)[cat] || cat
}

function getCategoryColor(cat: string) {
  return (CATEGORY_COLORS as Record<string, string>)[cat] || '#1890ff'
}

function formatViews(v: number) {
  if (v >= 10000) return (v / 10000).toFixed(1) + 'w'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return String(v)
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 10)
  return d.toISOString().slice(0, 10)
}
</script>

<style scoped>
.cl-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Empty state */
.cl-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: var(--color-text-tertiary);
}

.cl-empty-icon {
  opacity: 0.4;
  margin-bottom: 16px;
}

.cl-empty h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.cl-empty p {
  font-size: var(--text-sm);
  margin-bottom: 20px;
}

.cl-empty-btn {
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

.cl-empty-btn:hover {
  background: var(--color-primary-light);
  box-shadow: 0 4px 12px rgba(27,107,58,0.25);
}

/* List items */
.cl-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s;
}

.cl-item:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.cl-item--selected {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

/* Checkbox */
.cl-checkbox {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
}

.cl-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.cl-checkmark {
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  transition: all 0.2s;
}

.cl-checkbox input:checked ~ .cl-checkmark {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.cl-checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.2s;
}

.cl-checkbox input:checked ~ .cl-checkmark::after {
  opacity: 1;
}

/* Thumbnail */
.cl-thumb {
  width: 80px;
  height: 60px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-surface);
}

.cl-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Body */
.cl-body {
  flex: 1;
  min-width: 0;
}

.cl-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.cl-summary {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

/* Meta */
.cl-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.cl-badge {
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

.cl-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: var(--color-text-tertiary);
}

/* Actions */
.cl-actions {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .cl-item {
    flex-wrap: wrap;
  }
  
  .cl-thumb {
    width: 60px;
    height: 45px;
  }
  
  .cl-title {
    font-size: var(--text-sm);
  }
}
</style>
