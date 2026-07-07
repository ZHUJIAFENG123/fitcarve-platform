<template>
  <div class="lpd-page">
    <Navbar :menu-links="menuLinks" />
    <div v-if="store.loading" class="lpd-loading">
      <el-skeleton :rows="5" animated />
    </div>
    <div v-else-if="!store.current" class="lpd-empty">
      <el-empty description="学习路径不存在" />
    </div>
    <div v-else class="lpd-layout">
      <!-- 头部 -->
      <div class="lpd-header">
        <img :src="store.current.cover_image || '/images/01.jpg'" class="lpd-cover" />
        <div class="lpd-header-info">
          <span class="lpd-cat">{{ store.catLabel(store.current.category) }}</span>
          <h1>{{ store.current.title }}</h1>
          <p>{{ store.current.description }}</p>
          <div class="lpd-meta">
            <span class="lpd-diff" :class="store.current.difficulty">{{ store.diffLabel(store.current.difficulty) }}</span>
            <span>{{ store.current.total_items }} 节课</span>
            <span>{{ store.current.views }} 次浏览</span>
            <span>作者: {{ store.current.creator }}</span>
          </div>
          <el-button v-if="!enrolled" type="primary" size="large" @click="handleEnroll" :loading="enrolling">
            📚 加入学习
          </el-button>
          <div v-else class="lpd-enrolled-tag">
            ✅ 已加入 · {{ completedCount }}/{{ store.current.total_items }} 完成
          </div>
        </div>
      </div>

      <!-- 学习进度条 -->
      <div class="lpd-overall-progress">
        <div class="lpd-progress-bar">
          <div class="lpd-progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <span class="lpd-progress-label">{{ progressPercent }}%（{{ completedCount }}/{{ store.current.total_items }}）</span>
      </div>

      <!-- 学习项列表 -->
      <div class="lpd-items">
        <div
          v-for="(item, idx) in store.current.items"
          :key="item.id"
          class="lpd-item"
          :class="{ completed: getStatus(item.id) === 'completed' }"
        >
          <div class="lpd-item-num">
            <span v-if="getStatus(item.id) === 'completed'" class="lpd-check">✓</span>
            <span v-else>{{ idx + 1 }}</span>
          </div>
          <div class="lpd-item-body">
            <h4>
              <router-link :to="`/news/detail/${item.news_id}`">
                {{ item.news_title || item.title }}
              </router-link>
            </h4>
            <p v-if="item.news_summary || item.description">
              {{ item.news_summary || item.description }}
            </p>
          </div>
          <div class="lpd-item-action">
            <el-button
              v-if="getStatus(item.id) !== 'completed'"
              type="primary"
              size="small"
              plain
              @click="handleMark(item.id)"
              :loading="markingId === item.id"
            >
              标记完成
            </el-button>
            <span v-else class="lpd-done">✅ 已完成</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { useLearningStore } from '@/stores/learning'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const route = useRoute()
const store = useLearningStore()
const userStore = useUserStore()
const enrolling = ref(false)
const markingId = ref<number | null>(null)

const menuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现', active: false }
]

const enrolled = computed(() => {
  if (!store.current) return false
  return store.enrolled.some(e => e.id === store.current!.id)
})

const completedCount = computed(() => {
  if (!store.current?.progress) return 0
  return store.current.progress.filter(p => p.status === 'completed').length
})

const progressPercent = computed(() => {
  if (!store.current) return 0
  return Math.round(completedCount.value / Math.max(store.current.total_items, 1) * 100)
})

function getStatus(itemId: number) {
  return store.getItemProgress(itemId)
}

async function handleEnroll() {
  if (!userStore.token) { ElMessage.warning('请先登录'); return }
  const id = Number(route.params.id)
  enrolling.value = true
  try {
    await store.enroll(id)
    ElMessage.success('已加入学习路径')
    await store.fetchDetail(id)
  } catch { ElMessage.error('加入失败') }
  finally { enrolling.value = false }
}

async function handleMark(itemId: number) {
  const id = Number(route.params.id)
  markingId.value = itemId
  try {
    await store.markProgress(id, itemId)
    ElMessage.success('已完成本节学习')
  } catch { ElMessage.error('操作失败') }
  finally { markingId.value = null }
}

onMounted(async () => {
  const id = Number(route.params.id)
  await store.fetchDetail(id)
  if (userStore.token) await store.fetchEnrolled()
})
</script>

<style scoped>
.lpd-page { min-height: 100vh; background: var(--color-bg); }
.lpd-loading, .lpd-empty { max-width: 800px; margin: 60px auto; padding: 0 20px; }
.lpd-layout { max-width: 900px; margin: 0 auto; padding: 32px 20px 80px; }
.lpd-header {
  display: flex; gap: 28px; margin-bottom: 28px; align-items: flex-start;
}
.lpd-cover {
  width: 280px; height: 200px; border-radius: 14px; object-fit: cover; flex-shrink: 0;
}
.lpd-header-info { flex: 1; }
.lpd-cat { display: inline-block; padding: 3px 12px; border-radius: 10px; font-size: 12px; background: #e8f5e9; color: #2e7d32; margin-bottom: 10px; }
.lpd-header-info h1 { margin: 0 0 10px; font-size: 26px; }
.lpd-header-info p { margin: 0 0 14px; color: #666; line-height: 1.6; }
.lpd-meta { display: flex; gap: 16px; align-items: center; font-size: 13px; color: #999; margin-bottom: 18px; flex-wrap: wrap; }
.lpd-diff { padding: 2px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #fff; }
.lpd-diff.beginner { background: #16a34a; }
.lpd-diff.intermediate { background: #f97316; }
.lpd-diff.advanced { background: #dc2626; }
.lpd-enrolled-tag {
  display: inline-block; padding: 8px 18px; background: #e8f5e9; color: #2e7d32;
  border-radius: 10px; font-weight: 600; font-size: 15px;
}
.lpd-overall-progress {
  display: flex; align-items: center; gap: 12px;
  background: #fff; border-radius: 12px; padding: 16px 20px;
  margin-bottom: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.lpd-progress-bar { flex: 1; height: 8px; border-radius: 4px; background: #e5e7eb; overflow: hidden; }
.lpd-progress-fill { height: 100%; background: #1B6B3A; border-radius: 4px; transition: width .4s; }
.lpd-progress-label { font-size: 14px; font-weight: 600; color: #1B6B3A; white-space: nowrap; }
.lpd-items { display: flex; flex-direction: column; gap: 12px; }
.lpd-item {
  display: flex; gap: 16px; align-items: center;
  background: #fff; border-radius: 12px; padding: 18px 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  border-left: 4px solid #e5e7eb; transition: border-color .3s;
}
.lpd-item.completed { border-left-color: #16a34a; background: #f0fdf4; }
.lpd-item-num {
  width: 36px; height: 36px; border-radius: 50%; display: flex;
  align-items: center; justify-content: center; font-size: 15px;
  font-weight: 600; background: #f3f4f6; color: #666; flex-shrink: 0;
}
.lpd-item.completed .lpd-item-num { background: #16a34a; color: #fff; }
.lpd-check { font-size: 18px; }
.lpd-item-body { flex: 1; min-width: 0; }
.lpd-item-body h4 { margin: 0 0 4px; font-size: 16px; }
.lpd-item-body h4 a { color: inherit; text-decoration: none; }
.lpd-item-body h4 a:hover { color: var(--color-primary); }
.lpd-item-body p {
  margin: 0; font-size: 13px; color: #888;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 400px;
}
.lpd-item-action { flex-shrink: 0; }
.lpd-done { color: #16a34a; font-weight: 600; }

@media (max-width: 640px) {
  .lpd-header { flex-direction: column; }
  .lpd-cover { width: 100%; height: 180px; }
}
</style>
