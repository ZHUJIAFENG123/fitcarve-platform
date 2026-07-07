import { ref, computed, watch, type Ref } from 'vue'
import type { NewsCategory, NewsSort } from '@/types/common'
import type { NewsCardData, NewsQuery } from '@/types/news'
import { useNewsStore } from '@/stores/news'
import { CATEGORY_OPTIONS, DEFAULT_PAGE_SIZE } from '@/utils/constants'

// Fallback tags if backend fails
const COMMON_TAGS_FALLBACK = [
  '力量训练', '减脂', '增肌', '瑜伽', '跑步',
  '营养', '康复', '拉伸', '有氧运动', 'HIIT',
  '核心训练', '体态矫正', '运动损伤', '补剂', '女性健身'
]

export function useNewsList() {
  const store = useNewsStore()

  const searchKeyword = ref('')
  const selectedCategory = ref<NewsCategory | 'all'>('all')
  const selectedTags = ref<string[]>([])
  const sort = ref<NewsSort>('newest')
  const page = ref(1)
  const pageSize = ref(DEFAULT_PAGE_SIZE)

  const isFiltering = computed(() =>
    searchKeyword.value !== '' ||
    selectedCategory.value !== 'all' ||
    selectedTags.value.length > 0
  )

  const categories = computed(() => CATEGORY_OPTIONS)

  // Tags from backend (dynamic)
  const allTags = computed(() => store.hotTags.length > 0 ? store.hotTags : [...COMMON_TAGS_FALLBACK].sort())

  const query = computed<NewsQuery>(() => ({
    page: page.value,
    pageSize: pageSize.value,
    keyword: searchKeyword.value || undefined,
    category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined,
    tags: selectedTags.value.length > 0 ? selectedTags.value : undefined,
    sort: sort.value
  }))

  watch(query, () => {
    store.fetchList(query.value)
  }, { immediate: true })

  function search(keyword?: string) {
    if (keyword !== undefined) searchKeyword.value = keyword
    page.value = 1
  }

  function setCategory(category: NewsCategory | 'all') {
    selectedCategory.value = category
    page.value = 1
  }

  function setSort(s: NewsSort) {
    sort.value = s
    page.value = 1
  }

  function setPage(p: number) {
    page.value = p
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function setPageSize(size: number) {
    pageSize.value = size
    page.value = 1
  }

  function toggleTag(tag: string) {
    const idx = selectedTags.value.indexOf(tag)
    if (idx > -1) {
      selectedTags.value.splice(idx, 1)
    } else {
      selectedTags.value.push(tag)
    }
    page.value = 1
  }

  function removeTag(tag: string) {
    const idx = selectedTags.value.indexOf(tag)
    if (idx > -1) {
      selectedTags.value.splice(idx, 1)
      page.value = 1
    }
  }

  function resetTags() {
    selectedTags.value = []
    page.value = 1
  }

  function resetFilters() {
    searchKeyword.value = ''
    selectedCategory.value = 'all'
    selectedTags.value = []
    sort.value = 'newest'
    page.value = 1
  }

  return {
    list: computed(() => store.list),
    total: computed(() => store.total),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    hasError: computed(() => store.hasError),
    searchKeyword,
    selectedCategory,
    selectedTags,
    sort,
    page,
    pageSize,
    isFiltering,
    categories,
    allTags,
    search,
    setCategory,
    setSort,
    setPage,
    setPageSize,
    toggleTag,
    removeTag,
    resetTags,
    resetFilters
  }
}
