<template>
  <div class="fav-page">
    <Navbar :menu-links="menuLinks" />

    <div class="fav-hero"><h1>⭐ 我的收藏</h1></div>

    <div class="fav-container">
      <el-tabs v-model="activeTab" class="fav-tabs">
        <el-tab-pane label="资讯收藏" name="news" />
        <el-tab-pane label="训练计划" name="training" />
      </el-tabs>

      <div v-if="activeTab === 'news'">
        <el-empty v-if="newsItems.length === 0" description="暂无收藏的资讯" />
        <div v-else class="fav-grid">
          <article v-for="item in newsItems" :key="item.id" class="fav-card" @click="$router.push(`/news/detail/${item.id}`)">
            <div class="fav-card-img"><span class="fav-card-cat">{{ item.categoryName || '资讯' }}</span></div>
            <div class="fav-card-body">
              <h3>{{ item.title }}</h3>
              <p>{{ (item.summary || '').slice(0, 60) }}</p>
              <span class="fav-card-meta">👁 {{ item.views || 0 }} 浏览</span>
            </div>
          </article>
        </div>
      </div>

      <div v-if="activeTab === 'training'">
        <el-empty description="暂无收藏的训练计划" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { getCollections } from '@/composables/useCollections'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现' }
]

const activeTab = ref('news')
const newsItems = ref([])

onMounted(() => {
  // Get favorited news IDs from localStorage
  try {
    const raw = localStorage.getItem('favoritedNews')
    const ids = raw ? JSON.parse(raw) : []
    // Mock: show placeholder cards for favorited IDs
    newsItems.value = ids.map((id, i) => ({
      id, title: `收藏的资讯 #${id}`, summary: '点击查看详情', views: 0, categoryName: '资讯'
    }))
  } catch { newsItems.value = [] }
})
</script>

<style scoped>
.fav-page { min-height: 100vh; background: var(--color-bg); }
.fav-hero { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); padding: var(--space-6) var(--space-4); }
.fav-hero h1 { font-family: var(--font-display); font-size: var(--text-2xl); color: #fff; max-width: 700px; margin: 0 auto; }

.fav-container { max-width: 800px; margin: 0 auto; padding: var(--space-6) var(--space-4); }

.fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4); }
.fav-card {
  cursor: pointer; background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: all 0.2s;
}
.fav-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-left: 3px solid var(--color-primary); }
.fav-card-img { height: 100px; background: var(--color-primary-50); display: flex; align-items: flex-start; padding: 10px; }
.fav-card-cat { font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: var(--radius-sm); background: var(--color-primary); color: #fff; }
.fav-card-body { padding: var(--space-3); }
.fav-card-body h3 { font-family: var(--font-display); font-size: var(--text-sm); font-weight: 700; margin: 0 0 4px; color: var(--color-text-primary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.fav-card-body p { font-size: 12px; color: var(--color-text-secondary); margin: 0 0 6px; }
.fav-card-meta { font-size: 11px; color: var(--color-text-tertiary); }
</style>
