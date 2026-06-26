<template>
  <div class="comment-section" id="comment-section">
    <h3 class="comment-section__title">评论区</h3>

    <div class="comment-input">
      <el-input
        :model-value="text"
        type="textarea"
        placeholder="写下你的评论..."
        :rows="3"
        @update:model-value="$emit('update:text', $event)"
      />
      <el-button type="primary" class="comment-input__btn" :loading="submitting" @click="$emit('submit')">
        提交评论
      </el-button>
    </div>

    <div v-if="loading" class="comment-section__loading">
      <span>加载评论中...</span>
    </div>

    <div v-else-if="comments.length === 0" class="comment-section__empty">
      <span>暂无评论，快来发表第一条评论吧</span>
    </div>

    <div v-else class="comments">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :liked="!!commentLikes[comment.id]"
        :reply-open="replyTarget === comment.id"
        :reply-text="replyTarget === comment.id ? replyText : ''"
        @like="$emit('like-comment', comment.id)"
        @reply="$emit('start-reply', comment.id)"
        @submit-reply="(content) => $emit('submit-reply', comment.id, content)"
        @update:reply-text="$emit('update:reply-text', $event)"
        @cancel-reply="$emit('cancel-reply')"
        @delete="$emit('remove-comment', comment.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentItem from './CommentItem.vue'
import type { Comment } from '@/types/news'

defineProps<{
  comments: Comment[]
  loading?: boolean
  submitting?: boolean
  text: string
  replyTarget: number | null
  replyText: string
  commentLikes: Record<number, boolean>
}>()

defineEmits<{
  'update:text': [value: string]
  submit: []
  'like-comment': [commentId: number]
  'start-reply': [commentId: number]
  'submit-reply': [commentId: number, content: string]
  'update:reply-text': [value: string]
  'cancel-reply': []
  'remove-comment': [commentId: number]
}>()
</script>

<style scoped>
.comment-section {
  margin-top: 40px;
}

.comment-section__title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.comment-section__loading,
.comment-section__empty {
  text-align: center;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
}

.comment-input {
  margin-bottom: 30px;
}

.comment-input__btn {
  margin-top: 10px;
  float: right;
}

.comments {
  clear: both;
}
</style>
