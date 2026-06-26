<template>
  <div class="mc-page">
    <Navbar :menu-links="menuLinks" />
    <div class="mc-hero"><h1>💬 我的评论</h1></div>
    <div class="mc-container">
      <el-empty v-if="comments.length === 0" description="暂无评论">
        <template #extra><el-button type="primary" @click="$router.push('/news/list')">去浏览资讯</el-button></template>
      </el-empty>
      <div v-else class="mc-list">
        <div v-for="c in comments" :key="c.id" class="mc-item">
          <div class="mc-target" @click="$router.push(`/news/detail/${c.targetId}`)">📰 {{ c.targetTitle || '查看原文' }}</div>
          <p class="mc-content">{{ c.content }}</p>
          <span class="mc-time">{{ c.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现' }
]

const comments = ref([
  { id: 1, targetId: 1, targetTitle: '科学增肌：每周训练频率的最佳方案', content: '非常实用的建议，已经开始按照这个频率训练了！', time: '2026-06-20' }
])
</script>

<style scoped>
.mc-page { min-height: 100vh; background: var(--color-bg); }
.mc-hero { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); padding: var(--space-6) var(--space-4); }
.mc-hero h1 { font-family: var(--font-display); font-size: var(--text-2xl); color: #fff; max-width: 700px; margin: 0 auto; }
.mc-container { max-width: 700px; margin: 0 auto; padding: var(--space-6) var(--space-4); }
.mc-list { display: flex; flex-direction: column; gap: var(--space-4); }
.mc-item {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); padding: var(--space-4); box-shadow: var(--shadow-sm);
}
.mc-target { font-size: var(--text-sm); color: var(--color-primary); cursor: pointer; font-weight: 600; margin-bottom: 8px; }
.mc-target:hover { text-decoration: underline; }
.mc-content { font-size: var(--text-sm); color: var(--color-text-primary); margin: 0 0 8px; line-height: 1.6; }
.mc-time { font-size: 12px; color: var(--color-text-tertiary); }
</style>
