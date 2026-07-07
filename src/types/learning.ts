export interface LearningPathItem {
  id: number
  path_id: number
  news_id: number
  title: string
  sort_order: number
  description?: string
  news_title?: string
  news_summary?: string
  news_image?: string
  news_category?: string
  news_views?: number
}

export interface LearningPath {
  id: number
  title: string
  description: string
  cover_image: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  total_items: number
  status: string
  creator: string
  views: number
  created_at: string
  updated_at: string
  // Joined fields
  items?: LearningPathItem[]
  progress?: PathProgress[]
  completed_items?: number
}

export interface PathProgress {
  id: number
  user_id: number
  path_id: number
  item_id: number
  status: 'pending' | 'in_progress' | 'completed'
  completed_at?: string
}
