<template>
  <div class="news-actions">
    <div class="action-item" :class="{ 'action-active': liked }" @click="$emit('like')">
      <el-icon :size="22" class="action-icon" :class="{ 'action-icon--animate': liked }">
        <StarFilled v-if="liked" />
        <Star v-else />
      </el-icon>
      <span class="action-text">{{ liked ? '已点赞' : '点赞' }}</span>
      <span v-if="likeCount !== undefined" class="action-count">{{ likeCount }}</span>
    </div>
    <div class="action-item" :class="{ 'action-active': favorited }" @click="$emit('favorite')">
      <el-icon :size="22" class="action-icon">
        <FolderOpened v-if="favorited" />
        <FolderAdd v-else />
      </el-icon>
      <span class="action-text">{{ favorited ? '已收藏' : '收藏' }}</span>
    </div>
    <div class="action-item" @click="$emit('share')">
      <el-icon :size="22" class="action-icon"><Share /></el-icon>
      <span class="action-text">分享</span>
    </div>
    <div class="action-item" @click="$emit('comment')">
      <el-icon :size="22" class="action-icon"><ChatDotRound /></el-icon>
      <span class="action-text">评论</span>
      <span v-if="commentCount !== undefined" class="action-count">{{ commentCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, StarFilled, Share, ChatDotRound, FolderAdd, FolderOpened } from '@element-plus/icons-vue'

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
.news-actions {
  margin: 30px 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  user-select: none;
}

.action-item:hover {
  background: #e8f4fd;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

.action-item.action-active {
  background: #e6f7ff;
  color: #1890ff;
}

.action-icon {
  transition: transform 0.3s ease, color 0.3s ease;
}

.action-icon--animate {
  animation: actionBeat 0.4s ease;
  color: #ff6b6b;
}

@keyframes actionBeat {
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(1); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.action-text {
  font-size: 15px;
  color: #555;
}

.action-count {
  font-size: 14px;
  color: #999;
  margin-left: 2px;
}

@media (max-width: 768px) {
  .news-actions {
    flex-wrap: wrap;
    gap: 10px;
  }

  .action-item {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>
