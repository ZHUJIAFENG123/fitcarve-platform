<template>
  <div class="article-nav">
    <div v-if="prev" class="article-nav__item article-nav__prev" @click="$emit('prev')">
      <span class="article-nav__label">← 上一篇</span>
      <span class="article-nav__title">{{ prev.title }}</span>
    </div>
    <div v-else class="article-nav__item article-nav__placeholder" />

    <div v-if="next" class="article-nav__item article-nav__next" @click="$emit('next')">
      <span class="article-nav__label">下一篇 →</span>
      <span class="article-nav__title">{{ next.title }}</span>
    </div>
    <div v-else class="article-nav__item article-nav__placeholder" />
  </div>
</template>

<script setup lang="ts">
import type { NewsCardData } from '@/types/news'

defineProps<{
  prev: NewsCardData | null
  next: NewsCardData | null
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>

<style scoped>
.article-nav {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
  background: #fafbfc;
  border-radius: 10px;
}

.article-nav__item {
  flex: 1;
  cursor: pointer;
  padding: 16px 20px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e8ecf1;
  transition: all 0.25s ease;
}

.article-nav__item:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(24,144,255,0.1);
}

.article-nav__placeholder {
  visibility: hidden;
  pointer-events: none;
}

.article-nav__label {
  font-size: 12px;
  color: #1890ff;
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

.article-nav__title {
  font-size: 14px;
  color: #333;
  display: block;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-nav__next {
  text-align: right;
}

@media (max-width: 768px) {
  .article-nav {
    flex-direction: column;
  }
}
</style>
