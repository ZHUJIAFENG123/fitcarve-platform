import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNewsStore } from '@/stores/news'

export function useNewsDetail() {
  const store = useNewsStore()
  const route = useRoute()
  const router = useRouter()

  const loading = computed(() => store.detailLoading)

  const news = computed(() => store.currentDetail)

  const relatedList = computed(() => store.relatedNews)

  const readingTime = computed(() => store.readingTime)

  const hasPrev = computed(() => store.prevArticleId !== null)
  const hasNext = computed(() => store.nextArticleId !== null)

  const error = computed(() => store.error)

  function loadDetail(id?: number) {
    const newsId = id ?? (parseInt(route.params.id as string) || 0)
    if (newsId) {
      store.fetchDetail(newsId)
      store.fetchComments(newsId)
    }
  }

  function navigateToDetail(id: number) {
    if (id) {
      router.push(`/news/detail/${id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goToPrev() {
    if (store.prevArticleId) {
      navigateToDetail(store.prevArticleId)
    }
  }

  function goToNext() {
    if (store.nextArticleId) {
      navigateToDetail(store.nextArticleId)
    }
  }

  return {
    news,
    loading,
    error,
    relatedList,
    readingTime,
    hasPrev,
    hasNext,
    loadDetail,
    goToPrev,
    goToNext,
    navigateToDetail
  }
}
