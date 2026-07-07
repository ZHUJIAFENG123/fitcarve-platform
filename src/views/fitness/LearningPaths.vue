<template>
  <div class="lp-page">
    <Navbar :menu-links="menuLinks" />
    <div class="lp-hero">
      <h1>📚 学习路径</h1>
      <p>系统化的健身知识课程，从入门到进阶，一步一个脚印</p>
    </div>
    <div class="lp-container">
      <el-empty v-if="!loading && !store.list.length" description="暂无学习路径" />
      <div v-else class="lp-grid">
        <router-link
          v-for="path in store.list"
          :key="path.id"
          :to="`/fitness/learning/${path.id}`"
          class="lp-card"
        >
          <div class="lp-card-img-wrap">
            <img :src="path.cover_image || '/images/01.jpg'" :alt="path.title" />
            <span class="lp-diff" :class="path.difficulty">{{ store.diffLabel(path.difficulty) }}</span>
          </div>
          <div class="lp-card-body">
            <span class="lp-cat">{{ store.catLabel(path.category) }}</span>
            <h3>{{ path.title }}</h3>
            <p>{{ path.description }}</p>
            <div class="lp-card-meta">
              <span>📖 {{ path.total_items }} 节课</span>
              <span>👁 {{ path.views }}</span>
            </div>
            <!-- 进度条（已报名的路径） -->
            <div v-if="path.completed_items !== undefined" class="lp-progress">
              <div class="lp-progress-bar">
                <div class="lp-progress-fill" :style="{ width: (path.completed_items! / Math.max(path.total_items, 1) * 100) + '%' }"></div>
              </div>
              <span class="lp-progress-text">{{ path.completed_items }}/{{ path.total_items }} 已完成</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useLearningStore } from '@/stores/learning'
import { useUserStore } from '@/stores/user'

const store = useLearningStore()
const userStore = useUserStore()
const loading = ref(true)

const menuLinks = [
  { to: '/home', label: '首页', active: false },
  { to: '/news/list', label: '资讯', active: false },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现', active: false }
]

onMounted(async () => {
  await store.fetchList()
  if (userStore.token) {
    await store.fetchEnrolled()
    // Merge enrolled progress into list
    store.list = store.list.map(p => {
      const enrolled = store.enrolled.find(e => e.id === p.id)
      return enrolled ? { ...p, completed_items: enrolled.completed_items } : p
    })
  }
  loading.value = false
})
</script>

<style scoped>
.lp-page { min-height: 100vh; background: var(--color-bg); }
.lp-hero {
  background: linear-gradient(135deg, #1B6B3A, #15803d);
  padding: 48px 32px; text-align: center; color: #fff;
}
.lp-hero h1 { font-size: 32px; margin: 0 0 8px; }
.lp-hero p { font-size: 15px; opacity: 0.85; margin: 0; }
.lp-container { max-width: 1100px; margin: 0 auto; padding: 32px 20px 80px; }
.lp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.lp-card {
  background: #fff; border-radius: 14px; overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  text-decoration: none; color: inherit; transition: transform .2s, box-shadow .2s;
}
.lp-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.lp-card-img-wrap { position: relative; height: 180px; overflow: hidden; }
.lp-card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.lp-diff {
  position: absolute; top: 12px; right: 12px;
  padding: 3px 10px; border-radius: 10px; font-size: 12px; font-weight: 600; color: #fff;
}
.lp-diff.beginner { background: #16a34a; }
.lp-diff.intermediate { background: #f97316; }
.lp-diff.advanced { background: #dc2626; }
.lp-card-body { padding: 16px 20px 20px; }
.lp-cat {
  display: inline-block; padding: 2px 10px; border-radius: 8px;
  font-size: 11px; background: #e8f5e9; color: #2e7d32; margin-bottom: 8px;
}
.lp-card-body h3 { margin: 0 0 8px; font-size: 18px; }
.lp-card-body p {
  margin: 0 0 12px; font-size: 13px; color: #666;
  line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.lp-card-meta { display: flex; gap: 16px; font-size: 13px; color: #999; margin-bottom: 12px; }
.lp-progress { display: flex; align-items: center; gap: 10px; }
.lp-progress-bar { flex: 1; height: 6px; border-radius: 3px; background: #e5e7eb; overflow: hidden; }
.lp-progress-fill { height: 100%; background: #1B6B3A; border-radius: 3px; transition: width .4s; }
.lp-progress-text { font-size: 12px; color: #666; white-space: nowrap; }
</style>
