<template>
  <div v-if="newsList.length > 0" class="related-section">
    <h3 class="related-section__title">📖 相关推荐</h3>
    <div class="related-grid">
      <el-card
        v-for="item in newsList"
        :key="item.id"
        class="related-card"
        shadow="hover"
        @click="navigate(item.id)"
      >
        <img
          v-if="item.image"
          :data-src="item.image"
          :alt="item.title"
          class="related-card__image"
          loading="lazy"
        >
        <div class="related-card__body">
          <h4 class="related-card__title">{{ item.title }}</h4>
          <div class="related-card__meta">
            <span>{{ item.author }}</span>
            <span>{{ item.views }} 浏览</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { NewsCardData } from '@/types/news'

defineProps<{
  newsList: NewsCardData[]
}>()

const router = useRouter()

function navigate(id: number) {
  router.push(`/news/detail/${id}`)
}
</script>

<style scoped>
.related-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #ebeef5;
}

.related-section__title {
  font-size: 20px;
  color: #333;
  margin: 0 0 20px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.related-card {
  cursor: pointer;
  transition: transform 0.25s ease;
}

.related-card:hover {
  transform: translateY(-4px);
}

.related-card__image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.related-card__title {
  font-size: 14px;
  color: #333;
  margin: 0 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.related-card__meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
