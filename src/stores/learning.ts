import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LearningPath, PathProgress } from '@/types/learning'
import { httpGet, httpPost } from '@/utils/request'

export const useLearningStore = defineStore('learning', () => {
  const list = ref<LearningPath[]>([])
  const current = ref<LearningPath | null>(null)
  const enrolled = ref<LearningPath[]>([])
  const loading = ref(false)

  function diffLabel(d: string) {
    return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[d] || d
  }

  function catLabel(c: string) {
    return {
      'training-science': '训练科学', 'sports-nutrition': '运动营养',
      'muscle-building': '增肌专区', 'fat-loss': '减脂塑形',
      'recovery-injury': '运动康复', 'gear-equipment': '健身装备',
      // 兼容旧分类
      knowledge: '训练科学', nutrition: '运动营养', recovery: '运动康复', equipment: '健身装备'
    }[c] || c
  }

  async function fetchList() {
    loading.value = true
    try {
      const data = await httpGet<any>('/learning', { limit: 50 })
      list.value = (data.list || []).map((p: any) => ({
        ...p,
        items: p.items || [],
        progress: p.progress || []
      }))
    } catch { list.value = [] }
    finally { loading.value = false }
  }

  async function fetchDetail(id: number, userId?: number) {
    loading.value = true
    try {
      const data = await httpGet<any>(`/learning/${id}`)
      current.value = {
        ...data,
        items: data.items || [],
        progress: data.progress || []
      }
    } catch { current.value = null }
    finally { loading.value = false }
  }

  async function fetchEnrolled() {
    try {
      const data = await httpGet<any>('/learning/mine')
      enrolled.value = data.list || []
    } catch { enrolled.value = [] }
  }

  async function enroll(pathId: number) {
    await httpPost(`/learning/${pathId}/enroll`)
    // Refresh detail
    if (current.value?.id === pathId) await fetchDetail(pathId)
    await fetchEnrolled()
  }

  async function markProgress(pathId: number, itemId: number, status = 'completed') {
    await httpPost(`/learning/${pathId}/progress`, { itemId, status })
    // Update local state
    if (current.value) {
      const existing = current.value.progress?.find(p => p.item_id === itemId)
      if (existing) existing.status = status as PathProgress['status']
      else current.value.progress?.push({ id: 0, user_id: 0, path_id: pathId, item_id: itemId, status: status as PathProgress['status'] })
    }
  }

  function getItemProgress(itemId: number): string {
    if (!current.value?.progress) return 'pending'
    const p = current.value.progress.find(p => p.item_id === itemId)
    return p?.status || 'pending'
  }

  return {
    list, current, enrolled, loading,
    diffLabel, catLabel,
    fetchList, fetchDetail, fetchEnrolled,
    enroll, markProgress, getItemProgress
  }
})
