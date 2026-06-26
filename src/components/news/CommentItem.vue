<template>
  <div class="comment-item">
    <div class="comment-item__avatar">
      <el-avatar :size="36">{{ comment.user?.charAt(0) || '?' }}</el-avatar>
    </div>
    <div class="comment-item__body">
      <div class="comment-item__header">
        <span class="comment-item__user">{{ comment.user }}</span>
        <span class="comment-item__time">{{ comment.time }}</span>
      </div>
      <div class="comment-item__content" v-html="comment.content"></div>
      <div class="comment-item__actions">
        <span class="action-btn" :class="{ 'action-btn--active': liked }" @click="$emit('like')">
          <el-icon :size="16">
            <StarFilled v-if="liked" class="icon-liked" />
            <Star v-else />
          </el-icon>
          <span>{{ liked ? '已赞' : '点赞' }}</span>
          <span v-if="comment.likes > 0" class="action-num">{{ comment.likes }}</span>
        </span>
        <span class="action-btn" @click="$emit('reply')">
          <el-icon :size="16"><ChatLineRound /></el-icon>
          <span>回复</span>
        </span>
        <span class="action-btn action-btn--delete" @click="$emit('delete')">
          <span>删除</span>
        </span>
      </div>
      <div v-if="replyOpen" class="reply-box">
        <el-input
          :model-value="replyText"
          placeholder="写下你的回复..."
          size="small"
          @update:model-value="$emit('update:replyText', $event)"
        >
          <template #append>
            <el-button type="primary" size="small" @click="$emit('submitReply', replyText || '')">回复</el-button>
          </template>
        </el-input>
        <el-button type="text" size="small" class="reply-cancel" @click="$emit('cancelReply')">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, StarFilled, ChatLineRound } from '@element-plus/icons-vue'
import type { Comment } from '@/types/news'

defineProps<{
  comment: Comment
  liked?: boolean
  replyOpen?: boolean
  replyText?: string
}>()

defineEmits<{
  like: []
  reply: []
  delete: []
  'update:replyText': [value: string]
  submitReply: [content: string]
  cancelReply: []
}>()
</script>

<style scoped>
.comment-item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comment-item__avatar {
  margin-right: 15px;
  flex-shrink: 0;
}

.comment-item__body {
  flex: 1;
}

.comment-item__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-item__user {
  font-weight: bold;
  color: #333;
}

.comment-item__time {
  font-size: 12px;
  color: #999;
}

.comment-item__content {
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  margin-bottom: 10px;
}

.comment-item__actions {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 12px;
  transition: all 0.2s ease;
  font-size: 13px;
  color: #999;
}

.action-btn:hover {
  background: #f0f2f5;
  color: #1890ff;
}

.action-btn--active {
  color: #ff6b6b !important;
}

.action-btn--delete:hover {
  color: #ff4d4f !important;
  background: #fff1f0;
}

.action-num {
  font-size: 12px;
}

.icon-liked {
  color: #ff6b6b !important;
}

.reply-box {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.reply-cancel {
  font-size: 12px;
}
</style>
