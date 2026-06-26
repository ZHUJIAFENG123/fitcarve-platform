import type { NewsCategory } from '@/types/common'

export const CATEGORY_MAP: Record<NewsCategory, string> = {
  knowledge: '健身知识',
  nutrition: '营养健康',
  recovery: '运动康复',
  equipment: '健身器材'
}

export const CATEGORY_REVERSE_MAP: Record<string, NewsCategory> = {
  '健身知识': 'knowledge',
  '营养健康': 'nutrition',
  '运动康复': 'recovery',
  '健身器材': 'equipment'
}

export const CATEGORY_COLORS: Record<NewsCategory, string> = {
  knowledge: '#1890ff',
  nutrition: '#52c41a',
  recovery: '#fa8c16',
  equipment: '#722ed1'
}

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_MAP).map(([value, label]) => ({
  value,
  label
}))

export const STATUS_MAP: Record<string, string> = {
  pending: '待审核',
  approved: '已通过',
  rejected: '已驳回'
}

export const STATUS_TYPE_MAP: Record<string, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger'
}

export const COMMON_TAGS = [
  '力量训练', '减脂', '增肌', '瑜伽', '跑步',
  '营养', '康复', '拉伸', '有氧运动', 'HIIT',
  '核心训练', '体态矫正', '运动损伤', '补剂', '女性健身'
]

export const SORT_OPTIONS = [
  { value: 'newest', label: '最新发布' },
  { value: 'popular', label: '最多浏览' }
]

export const DEFAULT_PAGE_SIZE = 12

export const MAX_TAGS = 5

export const MAX_TITLE_LENGTH = 50

export const MAX_SUMMARY_LENGTH = 200

export const IMAGE_UPLOAD_MAX_SIZE = 2 * 1024 * 1024

export const IMAGE_UPLOAD_ACCEPT = 'image/jpg,image/jpeg,image/png,image/gif'

export const READING_SPEED = 500

export const RELATED_NEWS_LIMIT = 3

export const POPULAR_NEWS_LIMIT = 4
