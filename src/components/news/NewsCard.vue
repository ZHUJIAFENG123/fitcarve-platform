<template>
  <article
    :class="['news-card', { 'news-card--loading': loading }]"
    @click="handleClick"
  >
    <NewsSkeleton v-if="loading" />
    <template v-else>
      <!-- Cover Image -->
      <div class="card-cover">
        <img
          v-if="news.image"
          :data-src="news.image"
          :alt="news.title"
          class="card-image"
          loading="lazy"
        />
        <div v-else class="card-placeholder" :style="placeholderStyle">
          <span class="placeholder-icon">{{ categoryIcon }}</span>
        </div>
        <!-- Category badge -->
        <span class="card-category">{{ categoryLabel }}</span>
      </div>

      <!-- Content -->
      <div class="card-body">
        <h3 class="card-title">{{ news.title }}</h3>
        <p class="card-summary">{{ news.summary || '暂无摘要' }}</p>

        <!-- Meta row -->
        <div class="card-meta">
          <span class="meta-item">
            <span class="meta-icon">👤</span>{{ news.author || '佚名' }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">📅</span>{{ formatDate(news.publishDate) }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">👁</span>{{ formatViews(news.views) }}
          </span>
          <span class="meta-item meta-reading">
            <span class="meta-icon">📖</span>{{ readingTime }}
          </span>
        </div>

        <!-- Tags -->
        <div class="card-tags" v-if="news.tags && news.tags.length > 0">
          <span v-for="tag in news.tags.slice(0, 3)" :key="tag" class="card-tag">{{ tag }}</span>
        </div>

        <!-- Read button -->
        <button class="card-btn" @click.stop="handleClick">
          阅读全文
          <span class="btn-arrow">→</span>
        </button>
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NewsSkeleton from './NewsSkeleton.vue'
import { CATEGORY_MAP } from '@/utils/constants'
import type { NewsCardData } from '@/types/news'
import type { NewsCategory } from '@/types/common'

const CATEGORY_ICONS: Record<NewsCategory, string> = {
  knowledge: '🏋️',
  nutrition: '🥗',
  recovery: '🩺',
  equipment: '🎯'
}

const CATEGORY_GRADIENTS: Record<NewsCategory, string> = {
  knowledge: 'linear-gradient(135deg, #E8F5EC 0%, #C8E6D0 100%)',
  nutrition: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
  recovery: 'linear-gradient(135deg, #E8F5EC 0%, #C8E6D0 100%)',
  equipment: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)'
}

const props = defineProps<{
  news: NewsCardData
  loading?: boolean
}>()

const router = useRouter()

const categoryLabel = computed(() => CATEGORY_MAP[props.news.category] || '资讯')
const categoryIcon = computed(() => CATEGORY_ICONS[props.news.category] || '📄')
const placeholderStyle = computed(() => ({
  background: CATEGORY_GRADIENTS[props.news.category] || CATEGORY_GRADIENTS.knowledge
}))

const readingTime = computed(() => {
  return '约 3 分钟'
})

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 10)
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
.news-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  border-left: 3px solid transparent;
}

.news-card:not(.news-card--loading):hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-left-color: var(--color-primary);
}

.news-card--loading {
  cursor: default;
}

/* ── Cover ── */
.card-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.news-card:not(.news-card--loading):hover .card-image {
  transform: scale(1.05);
}
.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.placeholder-icon {
  font-size: 3rem;
  opacity: 0.35;
}

/* ── Category badge ── */
.card-category {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: 600;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-body);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

/* ── Body ── */
.card-body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-title {
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
}
.card-summary {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--space-3);
}

/* ── Meta ── */
.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-2);
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.meta-icon {
  font-size: 12px;
}
.meta-reading {
  color: var(--color-primary);
  font-weight: 600;
}

/* ── Tags ── */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}
.card-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 500;
  background: var(--color-primary-50);
  color: var(--color-primary);
}

/* ── Button ── */
.card-btn {
  margin-top: auto;
  width: 100%;
  padding: 10px 0;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-body);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
}
.card-btn:hover {
  background: var(--color-primary);
  color: #fff;
}
.btn-arrow {
  transition: transform 0.2s ease;
}
.card-btn:hover .btn-arrow {
  transform: translateX(4px);
}
</style>
