import type { NewsCategory, NewsStatus } from './common'

export interface News {
  id: number
  title: string
  content: string
  summary: string
  tags: string[]
  image: string
  category: NewsCategory
  author: string
  status: NewsStatus
  auditBy?: string
  auditAt?: string
  rejectReason?: string
  views: number
  commentCount: number
  publishDate: string
  createdAt: string
  updatedAt: string
}

export interface NewsCardData {
  id: number
  title: string
  summary: string
  tags: string[]
  image: string
  category: NewsCategory
  author: string
  views: number
  publishDate: string
}

export interface NewsQuery {
  page: number
  pageSize: number
  category?: NewsCategory
  tags?: string[]
  keyword?: string
  sort?: 'newest' | 'popular'
}

export interface NewsListResponse {
  list: NewsCardData[]
  total: number
  page: number
  pageSize: number
}

export interface NewsDetail {
  news: News
  relatedNews: NewsCardData[]
  prevArticle: NewsCardData | null
  nextArticle: NewsCardData | null
}

export interface CommentReply {
  id: number
  user: string
  content: string
  time: string
}

export interface Comment {
  id: number
  targetType: string
  targetId: number
  user: string
  content: string
  time: string
  likes: number
  liked: boolean
  replies: CommentReply[]
}

export interface CommentInput {
  targetType: string
  targetId: number
  content: string
  parentId?: number
}

export interface NewsFormData {
  title: string
  category: NewsCategory
  tags: string[]
  summary: string
  image: string
  content: string
}

export interface NewsStats {
  total: number
  categoryStats: { category: string; count: number }[]
  totalViews: number
  totalComments: number
}

export interface VersionHistory {
  id: number
  targetType: string
  targetId: number
  version: number
  content: string
  author: string
  reason: string
  createdAt: string
}
