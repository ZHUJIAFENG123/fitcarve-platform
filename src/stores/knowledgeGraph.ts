import { defineStore } from 'pinia'
import { ref } from 'vue'
import { httpGet } from '@/utils/request'
import type { KnowledgeGraph } from '@/types/knowledgeGraph'

export const useKnowledgeGraphStore = defineStore('knowledgeGraph', () => {
  const graphData = ref<KnowledgeGraph | null>(null)
  const loading = ref(false)

  async function fetchGraph() {
    loading.value = true
    try {
      const res = await httpGet('/api/knowledge-graph')
      graphData.value = res.data
    } catch (e) {
      console.error('获取知识图谱失败', e)
    } finally {
      loading.value = false
    }
  }

  return { graphData, loading, fetchGraph }
})
