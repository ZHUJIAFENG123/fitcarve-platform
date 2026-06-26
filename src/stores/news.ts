import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  News, NewsCardData, NewsQuery, NewsListResponse,
  Comment, CommentInput
} from '@/types/news'
import type { InteractionType } from '@/types/common'
import { httpGet, httpPost, httpPut, httpDelete } from '@/utils/request'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { CATEGORY_REVERSE_MAP } from '@/utils/constants'
import type { NewsCategory } from '@/types/common'

// ── Backend response normalizers ──

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter(Boolean)
  if (typeof raw === 'string') return raw.split(',').map(t => t.trim()).filter(Boolean)
  return []
}

function normalizeCategory(raw: string): NewsCategory {
  // Backend may return Chinese or English key
  if (raw in CATEGORY_REVERSE_MAP) return CATEGORY_REVERSE_MAP[raw]
  if (['knowledge', 'nutrition', 'recovery', 'equipment'].includes(raw)) return raw as NewsCategory
  return 'knowledge'
}

function mapCardData(raw: Record<string, unknown>): NewsCardData {
  return {
    id: Number(raw.id) || 0,
    title: String(raw.title || ''),
    summary: String(raw.summary || ''),
    tags: parseTags(raw.tags),
    image: String(raw.image || ''),
    category: normalizeCategory(String(raw.category || '')),
    author: String(raw.author || ''),
    views: Number(raw.views) || 0,
    publishDate: String(raw.publish_date || raw.publishDate || '')
  }
}

function mapNews(raw: Record<string, unknown>): News {
  return {
    id: Number(raw.id) || 0,
    title: String(raw.title || ''),
    content: String(raw.content || ''),
    summary: String(raw.summary || ''),
    tags: parseTags(raw.tags),
    image: String(raw.image || ''),
    category: normalizeCategory(String(raw.category || '')),
    author: String(raw.author || ''),
    status: (raw.status as News['status']) || 'pending',
    auditBy: raw.audit_by ? String(raw.audit_by) : undefined,
    auditAt: raw.audit_at ? String(raw.audit_at) : undefined,
    rejectReason: raw.reject_reason ? String(raw.reject_reason) : undefined,
    views: Number(raw.views) || 0,
    commentCount: Number(raw.comment_count || raw.commentCount) || 0,
    publishDate: String(raw.publish_date || raw.publishDate || ''),
    createdAt: String(raw.created_at || raw.createdAt || ''),
    updatedAt: String(raw.updated_at || raw.updatedAt || '')
  }
}

export const useNewsStore = defineStore('news', () => {
  const list = ref<NewsCardData[]>([])
  const total = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(DEFAULT_PAGE_SIZE)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentDetail = ref<News | null>(null)
  const detailLoading = ref(false)

  const relatedNews = ref<NewsCardData[]>([])
  const prevArticleId = ref<number | null>(null)
  const nextArticleId = ref<number | null>(null)

  const comments = ref<Comment[]>([])
  const commentsLoading = ref(false)

  const popularNews = ref<NewsCardData[]>([])

  const likedIds = ref<Set<number>>(new Set())
  const favoritedIds = ref<Set<number>>(new Set())

  const hasError = computed(() => error.value !== null)

  const currentDetailId = computed(() => currentDetail.value?.id ?? null)

  function loadLikedFromStorage() {
    try {
      const raw = localStorage.getItem('likedNews')
      if (raw) {
        const arr: number[] = JSON.parse(raw)
        likedIds.value = new Set(arr)
      }
    } catch { /* empty */ }
  }

  function loadFavoritedFromStorage() {
    try {
      const raw = localStorage.getItem('favoritedNews')
      if (raw) {
        const arr: number[] = JSON.parse(raw)
        favoritedIds.value = new Set(arr)
      }
    } catch { /* empty */ }
  }

  function saveLikedToStorage() {
    localStorage.setItem('likedNews', JSON.stringify([...likedIds.value]))
  }

  function saveFavoritedToStorage() {
    localStorage.setItem('favoritedNews', JSON.stringify([...favoritedIds.value]))
  }

  const isLiked = (id: number) => likedIds.value.has(id)
  const isFavorited = (id: number) => favoritedIds.value.has(id)

  const readingTime = computed(() => {
    if (!currentDetail.value?.content) return 1
    return Math.max(1, Math.ceil(currentDetail.value.content.length / 500))
  })

  async function fetchList(query: NewsQuery) {
    loading.value = true
    error.value = null
    try {
      const params: Record<string, string | number | undefined> = {
        page: query.page,
        limit: query.pageSize
      }
      if (query.category) params.category = query.category
      if (query.keyword) params.keyword = query.keyword

      // Backend returns { news: [...], pagination: { total, page, limit, pages } }
      const data = await httpGet<any>('/news', params)
      const rawList: any[] = data.news || data.list || []
      const pag = data.pagination || {}

      list.value = rawList.map(mapCardData)
      total.value = Number(pag.total) || rawList.length
      currentPage.value = Number(pag.page) || query.page
      pageSize.value = Number(pag.limit) || query.pageSize
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载资讯列表失败'
    } finally {
      loading.value = false
    }
  }

  async function fetchDetail(id: number) {
    detailLoading.value = true
    try {
      // Backend returns { ...newsFields (spread), relatedNews: [...] }
      const data = await httpGet<any>(`/news/${id}`)

      const relatedRaw: any[] = data.relatedNews || data.relatedNews_list || []
      relatedNews.value = relatedRaw.map(mapCardData)
      currentDetail.value = mapNews(data)

      // Try to derive prev/next from related context
      prevArticleId.value = data.prevArticleId ?? data.prev_article_id ?? null
      nextArticleId.value = data.nextArticleId ?? data.next_article_id ?? null
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载资讯详情失败'
    } finally {
      detailLoading.value = false
    }
  }

  async function fetchPopular(limit = 5) {
    try {
      const data = await httpGet<any[]>('/news/popular', { limit })
      popularNews.value = (Array.isArray(data) ? data : []).map(mapCardData)
      return popularNews.value
    } catch {
      popularNews.value = []
      return []
    }
  }

  async function toggleLike(id: number) {
    try {
      if (likedIds.value.has(id)) {
        await httpPost(`/interactions`, {
          targetType: 'news',
          targetId: id,
          type: 'like' as InteractionType
        })
        likedIds.value.delete(id)
      } else {
        await httpPost(`/interactions`, {
          targetType: 'news',
          targetId: id,
          type: 'like' as InteractionType
        })
        likedIds.value.add(id)
      }
      saveLikedToStorage()
    } catch (e) {
      error.value = e instanceof Error ? e.message : '操作失败'
    }
  }

  async function toggleFavorite(id: number) {
    try {
      if (favoritedIds.value.has(id)) {
        await httpPost(`/interactions`, {
          targetType: 'news',
          targetId: id,
          type: 'favorite' as InteractionType
        })
        favoritedIds.value.delete(id)
      } else {
        await httpPost(`/interactions`, {
          targetType: 'news',
          targetId: id,
          type: 'favorite' as InteractionType
        })
        favoritedIds.value.add(id)
      }
      saveFavoritedToStorage()
    } catch (e) {
      error.value = e instanceof Error ? e.message : '操作失败'
    }
  }

  async function fetchComments(targetId: number) {
    commentsLoading.value = true
    try {
      const data = await httpGet<Comment[]>(`/comments`, {
        targetType: 'news',
        targetId
      })
      comments.value = data || []
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载评论失败'
    } finally {
      commentsLoading.value = false
    }
  }

  async function submitComment(input: CommentInput) {
    try {
      const newComment = await httpPost<Comment>('/comments', input)
      comments.value.unshift(newComment)
      if (currentDetail.value) {
        currentDetail.value.commentCount += 1
      }
      return newComment
    } catch (e) {
      error.value = e instanceof Error ? e.message : '发表评论失败'
      throw e
    }
  }

  async function deleteComment(commentId: number) {
    try {
      await httpDelete(`/comments/${commentId}`)
      comments.value = comments.value.filter(c => c.id !== commentId)
      if (currentDetail.value) {
        currentDetail.value.commentCount = Math.max(0, currentDetail.value.commentCount - 1)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : '删除评论失败'
      throw e
    }
  }

  async function createNews(formData: FormData) {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || '创建失败')
      }
      return await res.json()
    } catch (e) {
      throw e instanceof Error ? e : new Error('创建资讯失败')
    }
  }

  async function updateNews(id: number, formData: FormData) {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news/${id}`, {
        method: 'PUT',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || '更新失败')
      }
      return await res.json()
    } catch (e) {
      throw e instanceof Error ? e : new Error('更新资讯失败')
    }
  }

  async function getStats() {
    try {
      return await httpGet('/news/stats/overview')
    } catch {
      return null
    }
  }

  loadLikedFromStorage()
  loadFavoritedFromStorage()

  return {
    list, total, currentPage, pageSize, loading, error, hasError,
    currentDetail, detailLoading,
    relatedNews, prevArticleId, nextArticleId,
    comments, commentsLoading,
    popularNews,
    likedIds, favoritedIds,
    readingTime, currentDetailId,
    isLiked, isFavorited,
    fetchList, fetchDetail, fetchPopular,
    toggleLike, toggleFavorite,
    fetchComments, submitComment, deleteComment,
    createNews, updateNews, getStats
  }
})
