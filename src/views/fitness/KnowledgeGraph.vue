<template>
  <div class="kg-container">
    <div class="kg-header">
      <h1>健身知识图谱</h1>
      <p>探索动作、肌群与知识文章之间的关联网络</p>
      <div class="kg-legend">
        <span class="legend-item"><span class="dot" style="background:#1B6B3A"></span> 动作</span>
        <span class="legend-item"><span class="dot" style="background:#F97316"></span> 肌群</span>
        <span class="legend-item"><span class="dot" style="background:#3B82F6"></span> 文章</span>
      </div>
    </div>

    <div v-if="loading" class="kg-loading">
      <el-icon class="is-loading"><Loading /></el-icon>
      <span>正在构建知识网络...</span>
    </div>

    <div v-else-if="!graphData || !graphData.nodes.length" class="kg-empty">
      <el-empty description="暂无知识图谱数据" />
    </div>

    <div v-else ref="chartRef" class="kg-chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useKnowledgeGraphStore } from '@/stores/knowledgeGraph'
import * as echarts from 'echarts'

const store = useKnowledgeGraphStore()
const chartRef = ref(null)
const loading = ref(false)
const graphData = ref(null)
let chart = null

const CATEGORY_COLORS = {
  exercise: '#1B6B3A',
  muscle: '#F97316',
  article: '#3B82F6'
}

function renderChart() {
  if (!chartRef.value || !graphData.value) return

  if (chart) chart.dispose()
  chart = echarts.init(chartRef.value)

  const { nodes, edges } = graphData.value

  const option = {
    tooltip: {
      formatter: (params) => {
        if (params.dataType === 'node') {
          const n = params.data
          let html = `<strong>${n.name}</strong><br/>`
          html += `类型：${n.category === 0 ? '动作' : n.category === 1 ? '肌群' : '文章'}<br/>`
          if (n.muscleGroup) html += `肌群：${n.muscleGroup}<br/>`
          if (n.difficulty) html += `难度：${n.difficulty}<br/>`
          if (n.exerciseCount) html += `包含动作：${n.exerciseCount} 个<br/>`
          return html
        }
        return `${params.data.source} → ${params.data.target}`
      }
    },
    legend: { show: false },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      draggable: true,
      force: {
        repulsion: 180,
        gravity: 0.08,
        edgeLength: [80, 250],
        layoutAnimation: true
      },
      data: nodes.map(n => ({
        id: n.id,
        name: n.name,
        symbolSize: n.symbolSize || 25,
        category: n.type === 'exercise' ? 0 : n.type === 'muscle' ? 1 : 2,
        itemStyle: { color: CATEGORY_COLORS[n.type] || '#999' },
        label: {
          show: true,
          fontSize: 11,
          color: '#333',
          formatter: (p) => p.name.length > 6 ? p.name.slice(0, 6) + '...' : p.name
        },
        muscleGroup: n.muscleGroup,
        difficulty: n.difficulty,
        exerciseCount: n.exerciseCount
      })),
      links: edges.map(e => ({
        source: e.source,
        target: e.target,
        label: { show: false },
        lineStyle: {
          color: '#ccc',
          curveness: 0.15,
          opacity: 0.4
        }
      })),
      categories: [
        { name: '动作', itemStyle: { color: '#1B6B3A' } },
        { name: '肌群', itemStyle: { color: '#F97316' } },
        { name: '文章', itemStyle: { color: '#3B82F6' } }
      ],
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 3, opacity: 1 },
        itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0,0,0,0.3)' }
      }
    }]
  }

  chart.setOption(option)
  window.addEventListener('resize', () => chart?.resize())
}

async function loadData() {
  loading.value = true
  await store.fetchGraph()
  graphData.value = store.graphData
  loading.value = false
  await nextTick()
  renderChart()
}

watch(() => store.graphData, (val) => {
  if (val) {
    graphData.value = val
    nextTick(() => renderChart())
  }
})

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.kg-container { padding: 24px; max-width: 1400px; margin: 0 auto; }
.kg-header { margin-bottom: 20px; }
.kg-header h1 { font-size: 24px; color: #1B6B3A; margin-bottom: 6px; }
.kg-header p { color: #666; margin: 0 0 10px; }
.kg-legend { display: flex; gap: 16px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #666; }
.dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.kg-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 80px 0; color: #999; }
.kg-loading .el-icon { font-size: 24px; }
.kg-empty { padding: 80px 0; }
.kg-chart { width: 100%; height: 620px; border: 1px solid #eee; border-radius: 12px; background: #fafafa; }
</style>
