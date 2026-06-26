export interface Pagination {
  page: number
  pageSize: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface User {
  id: number
  username: string
  avatar: string
  role: 'admin' | 'creator' | 'coach' | 'user'
}

export type NewsCategory = 'knowledge' | 'nutrition' | 'recovery' | 'equipment'

export type NewsStatus = 'pending' | 'approved' | 'rejected'

export type NewsSort = 'newest' | 'popular'

export type InteractionType = 'like' | 'favorite' | 'share'
