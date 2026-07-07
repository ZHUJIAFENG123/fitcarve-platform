<template>
  <div v-if="newsList.length > 0" class="rn-section">
    <h3 class="rn-title">
      <BookOpen :size="16" />
      <span>相关推荐</span>
    </h3>
    <div class="rn-grid">
      <article
        v-for="item in newsList"
        :key="item.id"
        class="rn-card"
        @click="navigate(item.id)"
      >
        <div class="rn-card-cover" v-if="item.image">
          <img :src="item.image" :alt="item.title" loading="lazy" />
        </div>
        <div class="rn-card-cover rn-card-cover--ph" v-else>
          <BookOpen :size="24" />
        </div>
        <div class="rn-card-body">
          <h4 class="rn-card-title">{{ item.title }}</h4>
          <div class="rn-card-meta">
            <span><User :size="11" /> {{ item.author }}</span>
            <span><Eye :size="11" /> {{ formatViews(item.views) }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { NewsCardData } from '@/types/news'
import { BookOpen, User, Eye } from 'lucide-vue-next'

defineProps<{
  newsList: NewsCardData[]
}>()

const router = useRouter()

function navigate(id: number) {
  router.push(`/news/detail/${id}`)
}

function formatViews(v: number) {
  if (v >= 10000) return (v / 10000).toFixed(1) + 'w'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return String(v)
}
</script>

<style scoped>
.rn-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--color-border-light);
}

.rn-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 20px;
  font-family: var(--font-display);
}

.rn-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.rn-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
}

.rn-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.08);
  border-color: var(--color-border);
}

.rn-card-cover {
  width: 100%;
  height: 140px;
  overflow: hidden;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
}

.rn-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.rn-card:hover .rn-card-cover img {
  transform: scale(1.06);
}

.rn-card-body {
  padding: 12px 14px;
}

.rn-card-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: var(--leading-snug);
  transition: color 0.2s;
}

.rn-card:hover .rn-card-title {
  color: var(--color-primary);
}

.rn-card-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.rn-card-meta span {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

@media (max-width: 768px) {
  .rn-grid { grid-template-columns: 1fr; }
}
</style>
