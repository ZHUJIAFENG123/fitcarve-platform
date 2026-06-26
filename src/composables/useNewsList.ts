import { ref, computed, watch, type Ref } from 'vue'
import type { NewsCategory, NewsSort } from '@/types/common'
import type { NewsCardData, NewsQuery } from '@/types/news'
import { useNewsStore } from '@/stores/news'
import { CATEGORY_OPTIONS, COMMON_TAGS, DEFAULT_PAGE_SIZE } from '@/utils/constants'

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

  // Tags always from COMMON_TAGS only (don't change with pagination)
  const allTags = computed(() => [...COMMON_TAGS].sort())

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
