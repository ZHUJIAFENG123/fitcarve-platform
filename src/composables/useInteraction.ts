import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useNewsStore } from '@/stores/news'
import { useAuthGuard } from './useAuthGuard.js'

export function useInteraction() {
  const store = useNewsStore()
  const { requireAuth } = useAuthGuard()

  const shareDialogVisible = ref(false)
  const shareLinkCopied = ref(false)

  const shareUrl = computed(() => window.location.href)

  function toggleLike(id: number) {
    if (!requireAuth('点赞')) return
    store.toggleLike(id)
    const liked = store.isLiked(id)
    ElMessage({
      message: liked ? '已取消点赞' : '点赞成功',
      type: liked ? 'info' : 'success',
      duration: 1000
    })
  }

  function toggleFavorite(id: number) {
    if (!requireAuth('收藏')) return
    store.toggleFavorite(id)
    const favorited = store.isFavorited(id)
    ElMessage({
      message: favorited ? '已取消收藏' : '收藏成功',
      type: favorited ? 'info' : 'success',
      duration: 1000
    })
  }

  function shareNews() {
    shareDialogVisible.value = true
    shareLinkCopied.value = false
  }

  function copyShareLink() {
    navigator.clipboard.writeText(shareUrl.value).then(() => {
      shareLinkCopied.value = true
      ElMessage({ message: '链接已复制到剪贴板', type: 'success', duration: 1500 })
    }).catch(() => {
      shareLinkCopied.value = true
      ElMessage({ message: '请手动复制链接', type: 'warning', duration: 1500 })
    })
  }

  return {
    isLiked: (id: number) => store.isLiked(id),
    isFavorited: (id: number) => store.isFavorited(id),
    toggleLike,
    toggleFavorite,
    shareNews,
    copyShareLink,
    shareDialogVisible,
    shareLinkCopied,
    shareUrl
  }
}
