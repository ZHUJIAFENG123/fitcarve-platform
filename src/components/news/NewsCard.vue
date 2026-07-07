<template>
  <article
    :class="['nc-card', { 'nc-card--loading': loading, 'nc-card--list': listView }]"
    @click="handleClick"
  >
    <NewsSkeleton v-if="loading" />
    <template v-else>
      <!-- Cover Image -->
      <div class="nc-cover">
        <img
          v-if="news.image"
          :src="news.image"
          :alt="news.title"
          class="nc-img"
          loading="lazy"
        />
        <div v-else class="nc-placeholder" :style="placeholderStyle">
          <component :is="categoryLucideIcon" :size="32" :stroke-width="1.5" class="nc-placeholder-icon" />
        </div>
        <!-- Category badge -->
        <span class="nc-badge" :style="{ background: categoryColor }">{{ categoryLabel }}</span>
        <!-- Reading time badge -->
        <span class="nc-time">
          <Clock :size="11" />
          {{ readingTime }}
        </span>
      </div>

      <!-- Content -->
      <div class="nc-body">
        <h3 class="nc-title">{{ news.title }}</h3>
        <p class="nc-summary">{{ news.summary || '暂无摘要' }}</p>

        <!-- Tags -->
        <div class="nc-tags" v-if="news.tags && news.tags.length > 0">
          <span v-for="tag in news.tags.slice(0, 3)" :key="tag" class="nc-tag">{{ tag }}</span>
        </div>

        <!-- Meta row -->
        <div class="nc-meta">
          <span class="nc-meta-item">
            <User :size="12" />
            <span>{{ news.author || '佚名' }}</span>
          </span>
          <span class="nc-meta-item">
            <Calendar :size="12" />
            <span>{{ formatDate(news.publishDate) }}</span>
          </span>
          <span class="nc-meta-item">
            <Eye :size="12" />
            <span>{{ formatViews(news.views) }}</span>
          </span>
          <span class="nc-meta-item">
            <MessageCircle :size="12" />
            <span>{{ news.commentCount || 0 }}</span>
          </span>
        </div>
      </div>

      <!-- Hover hint -->
      <div class="nc-hover-hint">
        <span>阅读全文</span>
        <ArrowRight :size="14" />
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NewsSkeleton from './NewsSkeleton.vue'
import { CATEGORY_MAP, CATEGORY_COLORS } from '@/utils/constants'
import type { NewsCardData } from '@/types/news'
import type { NewsCategory } from '@/types/common'
import { Clock, User, Calendar, Eye, MessageCircle, ArrowRight, BookOpen, Apple, Heart, Wrench } from 'lucide-vue-next'
import type { Component } from 'vue'

const CATEGORY_ICONS: Record<NewsCategory, Component> = {
  knowledge: BookOpen,
  nutrition: Apple,
  recovery: Heart,
  equipment: Wrench
}

const CATEGORY_GRADIENTS: Record<NewsCategory, string> = {
  knowledge: 'linear-gradient(135deg, #E8F5EC 0%, #B8DFC8 100%)',
  nutrition: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  recovery: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  equipment: 'linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)'
}

const props = defineProps<{
  news: NewsCardData
  loading?: boolean
  listView?: boolean
}>()

const router = useRouter()

const categoryLabel = computed(() => CATEGORY_MAP[props.news.category] || '资讯')
const categoryColor = computed(() => CATEGORY_COLORS[props.news.category] || '#1890ff')
const categoryLucideIcon = computed(() => CATEGORY_ICONS[props.news.category] || BookOpen)
const placeholderStyle = computed(() => ({
  background: CATEGORY_GRADIENTS[props.news.category] || CATEGORY_GRADIENTS.knowledge
}))

const readingTime = computed(() => {
  return '约3分钟'
})

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 10)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  return d.toISOString().slice(0, 10)
}

function formatViews(views: number): string {
  if (views >= 10000) return (views / 10000).toFixed(1) + 'w'
  if (views >= 1000) return (views / 1000).toFixed(1) + 'k'
  return String(views)
}

function handleClick() {
  if (!props.loading && props.news.id) {
    router.push(`/news/detail/${props.news.id}`)
  }
}
</script>

<style scoped>
.nc-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.nc-card:not(.nc-card--loading):hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.1);
  border-color: var(--color-border);
}

/* List view variant */
.nc-card--list {
  flex-direction: row;
  height: 180px;
}
.nc-card--list .nc-cover {
  width: 260px;
  height: 100%;
  flex-shrink: 0;
}
.nc-card--list .nc-body {
  flex: 1;
  min-width: 0;
}
.nc-card--list .nc-hover-hint {
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
}

.nc-card--loading { cursor: default; }

/* ===== Cover ===== */
.nc-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}
.nc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
}
.nc-card:not(.nc-card--loading):hover .nc-img {
  transform: scale(1.06);
}
.nc-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nc-placeholder-icon {
  color: rgba(0,0,0,0.15);
}

/* Badges */
.nc-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-md);
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.nc-time {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
}

/* ===== Body ===== */
.nc-body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  flex: 1;
}
.nc-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--space-2);
  font-family: var(--font-display);
  transition: color 0.2s;
}
.nc-card:not(.nc-card--loading):hover .nc-title {
  color: var(--color-primary);
}
.nc-summary {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--space-3);
}

/* ===== Tags ===== */
.nc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}
.nc-tag {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 500;
  background: var(--color-primary-50);
  color: var(--color-primary);
  border: 1px solid transparent;
  transition: all 0.15s;
}
.nc-card:not(.nc-card--loading):hover .nc-tag {
  border-color: var(--color-primary-100);
}

/* ===== Meta ===== */
.nc-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-top: auto;
}
.nc-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

/* ===== Hover Hint ===== */
.nc-hover-hint {
  position: absolute;
  inset: 0;
  background: rgba(27,107,58,0.88);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  pointer-events: none;
}
.nc-card:not(.nc-card--loading):hover .nc-hover-hint {
  opacity: 1;
}

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .nc-card--list {
    flex-direction: column;
    height: auto;
  }
  .nc-card--list .nc-cover {
    width: 100%;
    height: 180px;
  }
}
</style>
