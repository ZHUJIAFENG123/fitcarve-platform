import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useNewsStore } from '@/stores/news'
import { useAuthGuard } from './useAuthGuard.js'
function loadUserInfo() {
  try { return JSON.parse(localStorage.getItem('userInfo') || '{}') }
  catch { return {} }
}
import type { Comment, CommentInput } from '@/types/news'

export function useComment() {
  const store = useNewsStore()
  const { requireAuth } = useAuthGuard()

  const commentText = ref('')
  const replyTarget = ref<number | null>(null)
  const replyText = ref('')
  const submitting = ref(false)

  const comments = computed(() => store.comments)
  const loading = computed(() => store.commentsLoading)

  const commentLikes = ref<Record<number, boolean>>({})

  function resetNew() {
    commentText.value = ''
    replyTarget.value = null
    replyText.value = ''
  }

  async function submitComment(newsId: number) {
    if (!requireAuth('发表评论')) return
    if (!commentText.value.trim()) {
      ElMessage.warning('请输入评论内容')
      return
    }

    submitting.value = true
    try {
      const userInfo = loadUserInfo()
      const input: CommentInput = {
        targetType: 'news',
        targetId: newsId,
        content: commentText.value.replace(/\n/g, '<br/>')
      }
      await store.submitComment(input)
      commentText.value = ''
      ElMessage.success('评论发表成功')
    } catch {
      ElMessage.error('评论发表失败')
    } finally {
      submitting.value = false
    }
  }

  async function submitReply(newsId: number, parentComment: Comment) {
    if (!requireAuth('回复评论')) return
    if (!replyText.value.trim()) {
      ElMessage.warning('请输入回复内容')
      return
    }

    submitting.value = true
    try {
      const userInfo = loadUserInfo()
      const input: CommentInput = {
        targetType: 'news',
        targetId: newsId,
        content: `回复 @${parentComment.user}: ${replyText.value}`,
        parentId: parentComment.id
      }
      await store.submitComment(input)
      replyText.value = ''
      replyTarget.value = null
      ElMessage.success('回复成功')
    } catch {
      ElMessage.error('回复失败')
    } finally {
      submitting.value = false
    }
  }

  function startReply(commentId: number) {
    if (replyTarget.value === commentId) {
      replyTarget.value = null
      replyText.value = ''
    } else {
      replyTarget.value = commentId
      replyText.value = ''
    }
  }

  function toggleCommentLike(commentId: number) {
    const likes = { ...commentLikes.value }
    if (likes[commentId]) {
      delete likes[commentId]
    } else {
      likes[commentId] = true
    }
    commentLikes.value = likes
  }

  async function removeComment(commentId: number) {
    try {
      await store.deleteComment(commentId)
      ElMessage.success('评论已删除')
    } catch {
      ElMessage.error('删除评论失败')
    }
  }

  return {
    comments,
    loading,
    commentText,
    replyTarget,
    replyText,
    submitting,
    commentLikes,
    submitComment,
    submitReply,
    startReply,
    toggleCommentLike,
    removeComment,
    resetNew
  }
}
