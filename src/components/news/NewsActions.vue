<template>
  <div class="na-actions">
    <button :class="['na-item', { active: liked }]" @click="$emit('like')">
      <Heart :size="20" :fill="liked ? 'currentColor' : 'none'" :stroke-width="liked ? 0 : 2" />
      <span class="na-label">{{ liked ? '已点赞' : '点赞' }}</span>
      <span v-if="likeCount !== undefined" class="na-count">{{ likeCount }}</span>
    </button>
    <button :class="['na-item', { active: favorited }]" @click="$emit('favorite')">
      <Bookmark :size="20" :fill="favorited ? 'currentColor' : 'none'" :stroke-width="favorited ? 0 : 2" />
      <span class="na-label">{{ favorited ? '已收藏' : '收藏' }}</span>
    </button>
    <button class="na-item" @click="$emit('share')">
      <Share2 :size="20" />
      <span class="na-label">分享</span>
    </button>
    <button class="na-item" @click="$emit('comment')">
      <MessageCircle :size="20" />
      <span class="na-label">评论</span>
      <span v-if="commentCount !== undefined" class="na-count">{{ commentCount }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Heart, Bookmark, Share2, MessageCircle } from 'lucide-vue-next'

defineProps<{
  liked?: boolean
  favorited?: boolean
  likeCount?: number
  commentCount?: number
}>()

defineEmits<{
  like: []
  favorite: []
  share: []
  comment: []
}>()
</script>

<style scoped>
.na-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 20px 0;
  flex-wrap: wrap;
}

.na-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border-light);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.25s;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
}

.na-item:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-50);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27,107,58,0.1);
}

.na-item.active {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
  color: var(--color-primary);
}

.na-item.active:first-child {
  border-color: #ef4444;
  background: rgba(239,68,68,0.06);
  color: #ef4444;
}

.na-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  margin-left: 2px;
}

.na-item.active .na-count {
  color: inherit;
}

@media (max-width: 640px) {
  .na-actions { gap: 8px; }
  .na-item { padding: 8px 16px; font-size: 12px; }
  .na-item svg { width: 18px; height: 18px; }
}
</style>
