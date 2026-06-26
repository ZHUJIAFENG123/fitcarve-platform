<template>
  <div class="fitness-dashboard">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero -->
    <section class="fd-hero">
      <div class="fd-hero-content">
        <h1>🏋️ 你的专属训练&饮食助手</h1>
        <p>科学训练计划 + 精准饮食方案 + 热量记录追踪，一站式搞定</p>
        <span class="fd-date">{{ today }}</span>
      </div>
    </section>

    <!-- 快捷入口 -->
    <div class="fd-container">
      <div class="fd-cards">
        <router-link to="/fitness/training" class="fd-card">
          <span class="fd-card-icon">📋</span>
          <h3>训练计划</h3>
          <p>增肌 · 减脂 · 耐力 · 柔韧</p>
          <span class="fd-card-arrow">查看全部 →</span>
        </router-link>
        <router-link to="/fitness/diet" class="fd-card">
          <span class="fd-card-icon">🍽</span>
          <h3>饮食方案</h3>
          <p>增肌餐 · 减脂餐 · 维持餐</p>
          <span class="fd-card-arrow">查看全部 →</span>
        </router-link>
        <router-link to="/fitness/diet-log" class="fd-card">
          <span class="fd-card-icon">📝</span>
          <h3>饮食记录</h3>
          <p>记录每餐 · 热量合计 · 营养素</p>
          <span class="fd-card-arrow">开始记录 →</span>
        </router-link>
        <router-link to="/fitness/calculator" class="fd-card">
          <span class="fd-card-icon">🔥</span>
          <h3>热量计算器</h3>
          <p>TDEE计算 · 食物查询 · 摄入统计</p>
          <span class="fd-card-arrow">开始计算 →</span>
        </router-link>
        <router-link to="/fitness/ai-generator" class="fd-card fd-card--ai">
          <span class="fd-card-icon">🤖</span>
          <h3>AI 训练生成器</h3>
          <p>告诉AI你的需求，秒出训练计划</p>
          <span class="fd-card-arrow">立即生成 →</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Navbar from '@/components/Navbar.vue'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const today = computed(() => {
  const d = new Date()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weekDays[d.getDay()]}`
})
</script>

<style scoped>
.fitness-dashboard { min-height: 100vh; background: var(--color-bg); }

.fd-hero {
  background: linear-gradient(135deg, #1B6B3A 0%, #0F3D24 40%, #145230 100%);
  padding: var(--space-16) var(--space-4) var(--space-12);
  text-align: center;
}
.fd-hero-content h1 { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: 800; color: #fff; margin-bottom: var(--space-3); }
.fd-hero-content p { font-size: var(--text-lg); color: var(--color-primary-100); margin-bottom: var(--space-4); }
.fd-date { font-size: var(--text-sm); color: var(--color-primary-200); }

.fd-container { max-width: 1000px; margin: 0 auto; padding: var(--space-8) var(--space-4); }
.fd-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-5); margin-top: -40px; position: relative; z-index: 1; }

.fd-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  text-decoration: none;
  transition: all 0.25s;
  display: flex; flex-direction: column; gap: var(--space-2);
  box-shadow: var(--shadow-md);
}
.fd-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--color-primary); }
.fd-card--ai { border-color: #C4B5FD; background: linear-gradient(135deg, #fff 0%, #F8F6FF 100%); }
.fd-card--ai:hover { border-color: #7C3AED; }
.fd-card-icon { font-size: 2.2rem; }
.fd-card h3 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; color: var(--color-text-primary); }
.fd-card p { font-size: var(--text-sm); color: var(--color-text-secondary); flex: 1; }
.fd-card-arrow { font-size: var(--text-sm); font-weight: 600; color: var(--color-primary); }

@media (max-width: 640px) {
  .fd-hero-content h1 { font-size: var(--text-2xl); }
  .fd-cards { margin-top: -20px; }
}
</style>
