import { defineStore } from 'pinia'
import { ref } from 'vue'
import { httpGet, httpPost } from '@/utils/request'
import type { Coach, CoachReview, CoachDashboard } from '@/types/coach'

export const useCoachStore = defineStore('coach', () => {
  const coaches = ref<Coach[]>([])
  const currentCoach = ref<Coach | null>(null)
  const dashboard = ref<CoachDashboard | null>(null)
  const reviews = ref<CoachReview[]>([])
  const loading = ref(false)

  async function fetchList(params?: Record<string, string>) {
    loading.value = true
    try {
      const query = params ? '?' + new URLSearchParams(params).toString() : ''
      const res = await httpGet('/api/coaches' + query)
      coaches.value = res.data || []
    } catch (e) {
      console.error('获取教练列表失败', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchDetail(id: number) {
    loading.value = true
    try {
      const res = await httpGet(`/api/coaches/${id}`)
      currentCoach.value = res.data
      reviews.value = res.data?.reviews || []
    } catch (e) {
      console.error('获取教练详情失败', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchDashboard(id: number) {
    try {
      const res = await httpGet(`/api/coaches/${id}/dashboard`)
      dashboard.value = res.data
    } catch (e) {
      console.error('获取教练工作台失败', e)
    }
  }

  async function apply(data: Record<string, any>) {
    const res = await httpPost('/api/coaches/apply', data)
    return res
  }

  async function addReview(coachId: number, rating: number, comment: string) {
    const res = await httpPost(`/api/coaches/${coachId}/review`, { rating, comment })
    return res
  }

  return { coaches, currentCoach, dashboard, reviews, loading, fetchList, fetchDetail, fetchDashboard, apply, addReview }
})
