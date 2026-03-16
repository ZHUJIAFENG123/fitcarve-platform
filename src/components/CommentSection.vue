<template>
  <div class="comment-section">
    <h3 class="comment-title">评论 ({{ comments.length }})</h3>
    
    <!-- 评论输入框 -->
    <div class="comment-input">
      <el-input
        v-model="newComment"
        type="textarea"
        placeholder="写下你的评论..."
        :rows="3"
      />
      <el-button type="primary" @click="submitComment" class="submit-btn">发布评论</el-button>
    </div>
    
    <!-- 评论列表 -->
    <div class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <img :src="comment.avatar" alt="用户头像" class="user-avatar">
          <div class="user-info">
            <span class="username">{{ comment.username }}</span>
            <span class="comment-time">{{ comment.time }}</span>
          </div>
        </div>
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-actions">
          <el-button type="text" @click="toggleReply(comment.id)">回复</el-button>
          <el-button type="text" @click="likeComment(comment.id)">
            <i :class="comment.liked ? 'el-icon-heart' : 'el-icon-heart-outline'"></i>
            {{ comment.likes }}
          </el-button>
        </div>
        
        <!-- 回复输入框 -->
        <div v-if="replyTarget === comment.id" class="reply-input">
          <el-input
            v-model="replyContent"
            type="textarea"
            placeholder="回复 {{ comment.username }}..."
            :rows="2"
          />
          <div class="reply-actions">
            <el-button @click="cancelReply">取消</el-button>
            <el-button type="primary" @click="submitReply(comment.id)">回复</el-button>
          </div>
        </div>
        
        <!-- 回复列表 -->
        <div v-if="comment.replies && comment.replies.length > 0" class="reply-list">
          <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
            <div class="reply-header">
              <img :src="reply.avatar" alt="用户头像" class="user-avatar small">
              <div class="user-info">
                <span class="username">{{ reply.username }}</span>
                <span class="comment-time">{{ reply.time }}</span>
              </div>
            </div>
            <div class="reply-content">
              <span class="reply-to">@{{ reply.replyTo }}</span>
              {{ reply.content }}
            </div>
            <div class="comment-actions">
              <el-button type="text" @click="toggleReply(comment.id, reply.username)">回复</el-button>
              <el-button type="text" @click="likeReply(comment.id, reply.id)">
                <i :class="reply.liked ? 'el-icon-heart' : 'el-icon-heart-outline'"></i>
                {{ reply.likes }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  entityId: {
    type: String,
    required: true
  },
  entityType: {
    type: String,
    default: 'news'
  }
})

const comments = ref([
  {
    id: 1,
    username: '健身爱好者',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: '这篇文章写得非常好，对我很有帮助！',
    time: '2024-01-01 10:00',
    likes: 5,
    liked: false,
    replies: [
      {
        id: 11,
        username: '内容创作者',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: '谢谢支持！',
        time: '2024-01-01 10:30',
        likes: 2,
        liked: false,
        replyTo: '健身爱好者'
      }
    ]
  },
  {
    id: 2,
    username: '教练',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    content: '专业角度来看，这些建议非常科学',
    time: '2024-01-01 11:00',
    likes: 3,
    liked: false,
    replies: []
  }
])

const newComment = ref('')
const replyTarget = ref(null)
const replyContent = ref('')
const replyToUser = ref('')

// 提交评论
const submitComment = () => {
  if (!newComment.value.trim()) return
  
  const newCommentObj = {
    id: Date.now(),
    username: '当前用户',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: newComment.value,
    time: new Date().toLocaleString(),
    likes: 0,
    liked: false,
    replies: []
  }
  
  comments.value.unshift(newCommentObj)
  newComment.value = ''
}

// 切换回复状态
const toggleReply = (commentId, replyTo = '') => {
  if (replyTarget.value === commentId) {
    replyTarget.value = null
    replyContent.value = ''
    replyToUser.value = ''
  } else {
    replyTarget.value = commentId
    replyToUser.value = replyTo
  }
}

// 取消回复
const cancelReply = () => {
  replyTarget.value = null
  replyContent.value = ''
  replyToUser.value = ''
}

// 提交回复
const submitReply = (commentId) => {
  if (!replyContent.value.trim()) return
  
  const commentIndex = comments.value.findIndex(c => c.id === commentId)
  if (commentIndex === -1) return
  
  const newReply = {
    id: Date.now(),
    username: '当前用户',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: replyContent.value,
    time: new Date().toLocaleString(),
    likes: 0,
    liked: false,
    replyTo: replyToUser.value || comments.value[commentIndex].username
  }
  
  if (!comments.value[commentIndex].replies) {
    comments.value[commentIndex].replies = []
  }
  
  comments.value[commentIndex].replies.unshift(newReply)
  cancelReply()
}

// 点赞评论
const likeComment = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.liked = !comment.liked
    comment.likes += comment.liked ? 1 : -1
  }
}

// 点赞回复
const likeReply = (commentId, replyId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment && comment.replies) {
    const reply = comment.replies.find(r => r.id === replyId)
    if (reply) {
      reply.liked = !reply.liked
      reply.likes += reply.liked ? 1 : -1
    }
  }
}
</script>

<style scoped>
.comment-section {
  margin-top: 20px;
}

.comment-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.comment-input {
  margin-bottom: 30px;
}

.submit-btn {
  margin-top: 10px;
  float: right;
}

.comment-list {
  clear: both;
}

.comment-item {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-avatar.small {
  width: 30px;
  height: 30px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 500;
  margin-bottom: 2px;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-content {
  margin-bottom: 10px;
  line-height: 1.5;
}

.comment-actions {
  display: flex;
  gap: 20px;
}

.reply-input {
  margin-top: 15px;
  margin-left: 50px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.reply-list {
  margin-top: 15px;
  margin-left: 50px;
}

.reply-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.reply-content {
  margin-bottom: 8px;
  line-height: 1.4;
}

.reply-to {
  color: #1890ff;
  margin-right: 5px;
}
</style>
