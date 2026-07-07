/**
 * 训练计划相关类型定义
 */

// 训练计划大纲中的动作
export interface SyllabusExercise {
  name: string
  sets: number
  reps: string
  rest: number
  notes?: string
  video_url?: string
  // 迁移后追加字段
  exercise_id?: number
  gif_url?: string
  image_url?: string
  muscle_group?: string
  target_muscles?: string
  secondary_muscles?: string
  equipment?: string
  difficulty?: string
  db_name?: string
  is_approximate?: boolean
  // 后端附加字段：动作库完整信息
  _exercise?: ExerciseDetail | null
}

// 训练日
export interface SyllabusDay {
  day: number
  title?: string
  warmup?: string
  exercises: SyllabusExercise[]
  cooldown?: string
}

// 训练周
export interface SyllabusWeek {
  week: number
  days: SyllabusDay[]
}

// 训练计划
export interface TrainingPlan {
  id: number
  title: string
  description?: string
  cover_image?: string
  goal: 'build_muscle' | 'lose_fat' | 'endurance' | 'flexibility' | 'general'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration_weeks: number
  days_per_week: number
  equipment: string
  coach: string
  views: number
  enrolled: number
  syllabus: SyllabusWeek[]
  created_at?: string
  updated_at?: string
  // Phase 3 新增字段
  author_id?: number | null
  is_official?: number
  is_public?: number
  source?: 'manual' | 'ai'
}

// 动作库详情（_exercise 字段结构）
export interface ExerciseDetail {
  id: number
  name: string
  image_url: string
  gif_url: string
  muscle_group: string
  target_muscles: string
  secondary_muscles: string
  instructions: string
  tips: string
  equipment: string
  difficulty: string
  category: string
}

// 列表查询参数
export interface TrainingListQuery {
  goal?: string
  level?: string
  keyword?: string
  equipment?: string
  sort?: 'popular' | 'latest' | 'shortest'
  page?: number
  limit?: number
}

// 列表响应
export interface TrainingListResponse {
  list: TrainingPlan[]
  total: number
  page: number
  limit: number
  pages: number
}
