<template>
  <div class="fitness-dashboard">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero Section -->
    <section class="fd-hero">
      <div class="fd-hero-bg">
        <div class="fd-hero-orb fd-hero-orb--1"></div>
        <div class="fd-hero-orb fd-hero-orb--2"></div>
        <div class="fd-hero-orb fd-hero-orb--3"></div>
      </div>
      <div class="fd-hero-content">
        <div class="fd-hero-top">
          <div class="fd-hero-greeting">
            <span class="fd-hero-date">{{ today }}</span>
          </div>
          <div class="fd-hero-streak">
            <Flame :size="16" />
            <span>连续训练 {{ streakDays }} 天</span>
          </div>
        </div>
        <h1>炼刻健身</h1>
        <p class="fd-hero-sub">科学训练 · 精准饮食 · AI智能助手</p>
      </div>
    </section>

    <div class="fd-container">
      <!-- Quick Stats -->
      <section class="fd-stats">
        <div class="fd-stat-card">
          <div class="fd-stat-ring" style="--pct: 65; --ring-color: #1B6B3A">
            <span class="fd-stat-ring-val">{{ todayCalories }}</span>
          </div>
          <div class="fd-stat-info">
            <span class="fd-stat-label">今日消耗</span>
            <span class="fd-stat-unit">kcal</span>
          </div>
        </div>
        <div class="fd-stat-card">
          <div class="fd-stat-ring" style="--pct: 80; --ring-color: #F97316">
            <span class="fd-stat-ring-val">{{ todayWorkout }}</span>
          </div>
          <div class="fd-stat-info">
            <span class="fd-stat-label">训练时长</span>
            <span class="fd-stat-unit">分钟</span>
          </div>
        </div>
        <div class="fd-stat-card">
          <div class="fd-stat-ring" style="--pct: 45; --ring-color: #2563EB">
            <span class="fd-stat-ring-val">{{ todayProtein }}</span>
          </div>
          <div class="fd-stat-info">
            <span class="fd-stat-label">蛋白质摄入</span>
            <span class="fd-stat-unit">g</span>
          </div>
        </div>
        <div class="fd-stat-card">
          <div class="fd-stat-ring" style="--pct: 90; --ring-color: #7C3AED">
            <span class="fd-stat-ring-val">{{ waterCups }}</span>
          </div>
          <div class="fd-stat-info">
            <span class="fd-stat-label">饮水量</span>
            <span class="fd-stat-unit">杯</span>
          </div>
        </div>
      </section>

      <!-- 三大主模块 -->
      <section class="fd-main-modules">
        <router-link to="/fitness/training" class="fd-main-card fd-main-card--training">
          <div class="fd-main-card__bg"></div>
          <div class="fd-main-card__content">
            <div class="fd-main-card__icon-wrap">
              <Dumbbell :size="28" :stroke-width="1.8" />
            </div>
            <div class="fd-main-card__body">
              <h3>训练计划</h3>
              <p>增肌·减脂·耐力·柔韧，系统化训练方案</p>
            </div>
            <div class="fd-main-card__action">
              <span>开始训练</span>
              <ArrowRight :size="16" />
            </div>
          </div>
          <div class="fd-main-card__deco">
            <Activity :size="120" :stroke-width="0.8" />
          </div>
        </router-link>

        <router-link to="/fitness/diet" class="fd-main-card fd-main-card--diet">
          <div class="fd-main-card__bg"></div>
          <div class="fd-main-card__content">
            <div class="fd-main-card__icon-wrap">
              <UtensilsCrossed :size="28" :stroke-width="1.8" />
            </div>
            <div class="fd-main-card__body">
              <h3>饮食管理</h3>
              <p>专业饮食方案，精准营养搭配</p>
            </div>
            <div class="fd-main-card__action">
              <span>查看方案</span>
              <ArrowRight :size="16" />
            </div>
          </div>
          <div class="fd-main-card__deco">
            <Apple :size="120" :stroke-width="0.8" />
          </div>
        </router-link>

        <router-link to="/fitness/ai-generator" class="fd-main-card fd-main-card--ai">
          <div class="fd-main-card__bg"></div>
          <div class="fd-main-card__content">
            <div class="fd-main-card__icon-wrap">
              <Sparkles :size="28" :stroke-width="1.8" />
            </div>
            <div class="fd-main-card__body">
              <h3>AI 训练助手</h3>
              <p>告诉AI你的目标，秒出专属训练计划</p>
            </div>
            <div class="fd-main-card__action">
              <span>立即体验</span>
              <ArrowRight :size="16" />
            </div>
          </div>
          <div class="fd-main-card__deco">
            <Zap :size="120" :stroke-width="0.8" />
          </div>
        </router-link>
      </section>

      <!-- 更多工具 -->
      <section class="fd-tools">
        <div class="fd-section-header">
          <h2 class="fd-section-title">更多工具</h2>
          <span class="fd-section-sub">辅助你的训练与饮食管理</span>
        </div>
        <div class="fd-tools__grid">
          <router-link to="/fitness/exercises" class="fd-tool-item">
            <div class="fd-tool-item__icon" style="--tool-color: #1B6B3A">
              <Activity :size="20" :stroke-width="1.8" />
            </div>
            <div class="fd-tool-item__text">
              <span class="fd-tool-item__name">动作库</span>
              <span class="fd-tool-item__desc">1000+动作，精准定位目标肌群</span>
            </div>
            <div class="fd-tool-item__count">
              <span>1024</span>
            </div>
            <ChevronRight :size="16" class="fd-tool-item__chevron" />
          </router-link>

          <router-link to="/fitness/diet-log" class="fd-tool-item">
            <div class="fd-tool-item__icon" style="--tool-color: #F97316">
              <ClipboardList :size="20" :stroke-width="1.8" />
            </div>
            <div class="fd-tool-item__text">
              <span class="fd-tool-item__name">饮食记录</span>
              <span class="fd-tool-item__desc">记录每餐摄入，追踪热量变化</span>
            </div>
            <div class="fd-tool-item__count">
              <span>AI</span>
            </div>
            <ChevronRight :size="16" class="fd-tool-item__chevron" />
          </router-link>

          <router-link to="/fitness/nutrition" class="fd-tool-item">
            <div class="fd-tool-item__icon" style="--tool-color: #2563EB">
              <Search :size="20" :stroke-width="1.8" />
            </div>
            <div class="fd-tool-item__text">
              <span class="fd-tool-item__name">营养查询</span>
              <span class="fd-tool-item__desc">食物营养速查，扫码即查</span>
            </div>
            <div class="fd-tool-item__count">
              <span>8K+</span>
            </div>
            <ChevronRight :size="16" class="fd-tool-item__chevron" />
          </router-link>

          <router-link to="/fitness/calculator" class="fd-tool-item">
            <div class="fd-tool-item__icon" style="--tool-color: #DC2626">
              <Calculator :size="20" :stroke-width="1.8" />
            </div>
            <div class="fd-tool-item__text">
              <span class="fd-tool-item__name">热量计算器</span>
              <span class="fd-tool-item__desc">TDEE计算·BMI·每日摄入建议</span>
            </div>
            <div class="fd-tool-item__count">
              <span>TDEE</span>
            </div>
            <ChevronRight :size="16" class="fd-tool-item__chevron" />
          </router-link>
        </div>
      </section>

      <!-- 健身小贴士 -->
      <section class="fd-tip">
        <div class="fd-tip-card">
          <div class="fd-tip-icon">
            <Lightbulb :size="20" :stroke-width="1.8" />
          </div>
          <div class="fd-tip-content">
            <h4>每日健身贴士</h4>
            <p>{{ dailyTip }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import {
  Dumbbell, UtensilsCrossed, Sparkles, ArrowRight, Activity,
  ClipboardList, Search, Calculator, ChevronRight, Flame,
  Apple, Zap, Lightbulb
} from 'lucide-vue-next'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

// Mock data for visual richness
const todayCalories = ref(486)
const todayWorkout = ref(45)
const todayProtein = ref(72)
const waterCups = ref(5)
const streakDays = ref(12)

const tips = [
  '训练后30分钟内摄入蛋白质，可以最大化肌肉合成效率。',
  '每组动作之间休息60-90秒，有助于维持训练强度。',
  '每天至少摄入每公斤体重1.6g蛋白质以支持肌肉生长。',
  '充足的睡眠（7-9小时）是肌肉恢复和生长的关键。',
  '复合动作（深蹲、硬拉、卧推）能同时激活多个肌群，训练效率更高。',
  '训练前动态拉伸，训练后静态拉伸，可以减少受伤风险。',
  '保持水分摄入，每20分钟训练至少补充150ml水。'
]
const dailyTip = computed(() => {
  const day = new Date().getDay()
  return tips[day % tips.length]
})

const today = computed(() => {
  const d = new Date()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 周${weekDays[d.getDay()]}`
})
</script>

<style scoped>
.fitness-dashboard {
  min-height: 100vh;
  background: var(--color-bg);
}

/* ── Hero ── */
.fd-hero {
  position: relative;
  background: linear-gradient(145deg, #0F3D24 0%, #1B6B3A 40%, #238B4D 100%);
  padding: var(--space-12) var(--space-4) var(--space-10);
  overflow: hidden;
}
.fd-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.fd-hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.25;
}
.fd-hero-orb--1 {
  width: 300px; height: 300px;
  background: #22C55E;
  top: -80px; right: -60px;
  animation: float-orb 8s ease-in-out infinite;
}
.fd-hero-orb--2 {
  width: 200px; height: 200px;
  background: #F97316;
  bottom: -40px; left: 10%;
  animation: float-orb 10s ease-in-out infinite reverse;
}
.fd-hero-orb--3 {
  width: 150px; height: 150px;
  background: #3B82F6;
  top: 20%; left: 60%;
  animation: float-orb 12s ease-in-out infinite 2s;
}
@keyframes float-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -15px) scale(1.05); }
  66% { transform: translate(-10px, 10px) scale(0.95); }
}

.fd-hero-content {
  position: relative;
  z-index: 1;
  max-width: 960px;
  margin: 0 auto;
}
.fd-hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}
.fd-hero-date {
  font-size: var(--text-sm);
  color: var(--color-primary-200);
  font-weight: 500;
}
.fd-hero-streak {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: #FCD34D;
  font-weight: 600;
}
.fd-hero-streak svg {
  color: #F59E0B;
}
.fd-hero-content h1 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 800;
  color: #fff;
  margin-bottom: var(--space-2);
  letter-spacing: -0.03em;
}
.fd-hero-sub {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.7);
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* ── Container ── */
.fd-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 var(--space-4) var(--space-12);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-top: calc(-1 * var(--space-6));
  position: relative;
  z-index: 2;
}

/* ── Quick Stats ── */
.fd-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}
.fd-stat-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
}
.fd-stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.fd-stat-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: conic-gradient(
    var(--ring-color) calc(var(--pct) * 1%),
    var(--color-surface) 0
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.fd-stat-ring::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--color-bg-card);
}
.fd-stat-ring-val {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--color-text-primary);
}
.fd-stat-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.fd-stat-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
}
.fd-stat-unit {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

/* ── Main Modules (3 cards) ── */
.fd-main-modules {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.fd-main-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  min-height: 200px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.fd-main-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}
.fd-main-card__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.fd-main-card--training .fd-main-card__bg {
  background: linear-gradient(145deg, #1B6B3A, #238B4D);
}
.fd-main-card--diet .fd-main-card__bg {
  background: linear-gradient(145deg, #EA580C, #F97316);
}
.fd-main-card--ai .fd-main-card__bg {
  background: linear-gradient(145deg, #6D28D9, #7C3AED);
}
.fd-main-card__content {
  position: relative;
  z-index: 1;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex: 1;
}
.fd-main-card__icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
}
.fd-main-card__body {
  flex: 1;
}
.fd-main-card__body h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: #fff;
  margin-bottom: var(--space-1);
}
.fd-main-card__body p {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.75);
  line-height: 1.5;
}
.fd-main-card__action {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: #fff;
  transition: gap 0.2s ease;
}
.fd-main-card:hover .fd-main-card__action {
  gap: 10px;
}
.fd-main-card__deco {
  position: absolute;
  right: -10px;
  bottom: -10px;
  color: rgba(255,255,255,0.07);
  z-index: 0;
  pointer-events: none;
}

/* ── Tools Section ── */
.fd-tools {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.fd-section-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}
.fd-section-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}
.fd-section-sub {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

.fd-tools__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}
.fd-tool-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-4);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: var(--shadow-sm);
}
.fd-tool-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-border);
}
.fd-tool-item__icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--tool-color) 10%, transparent);
  color: var(--tool-color);
}
.fd-tool-item__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.fd-tool-item__name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
}
.fd-tool-item__desc {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  line-height: 1.3;
}
.fd-tool-item__count {
  flex-shrink: 0;
  padding: 3px 10px;
  background: var(--color-surface);
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
}
.fd-tool-item__chevron {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
  transition: transform 0.2s ease;
}
.fd-tool-item:hover .fd-tool-item__chevron {
  transform: translateX(2px);
  color: var(--color-text-secondary);
}

/* ── Tip Card ── */
.fd-tip-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-primary-50), var(--color-bg-card));
  border: 1px solid var(--color-primary-100);
  border-radius: var(--radius-xl);
}
.fd-tip-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fd-tip-content h4 {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 4px;
}
.fd-tip-content p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .fd-hero { padding: var(--space-10) var(--space-4) var(--space-8); }
  .fd-hero-content h1 { font-size: var(--text-2xl); }
  .fd-hero-sub { font-size: var(--text-base); }
  .fd-stats { grid-template-columns: repeat(2, 1fr); gap: var(--space-2); }
  .fd-main-modules { grid-template-columns: 1fr; gap: var(--space-3); }
  .fd-main-card { min-height: 160px; }
  .fd-tools__grid { grid-template-columns: 1fr; }
  .fd-tool-item__count { display: none; }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .fd-stats { grid-template-columns: repeat(4, 1fr); gap: var(--space-2); }
  .fd-main-modules { gap: var(--space-3); }
  .fd-main-card__content { padding: var(--space-4); }
}
</style>
