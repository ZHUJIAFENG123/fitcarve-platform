<template>
  <div class="home-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero -->
    <section class="hp-hero">
      <div class="hp-hero-orb hp-hero-orb--1"></div>
      <div class="hp-hero-orb hp-hero-orb--2"></div>
      <div class="hp-hero-orb hp-hero-orb--3"></div>
      <div class="hp-hero-inner">
        <div class="hp-hero-text">
          <h1>科学健身<br/>从这里开始</h1>
          <p>专业 · 循证 · AI赋能的健身平台，为你提供训练计划、饮食方案与权威资讯</p>
          <div class="hp-hero-actions">
            <button class="hp-btn-white" @click="goNewsList">探索资讯</button>
            <button class="hp-btn-outline" @click="goFitness">训练&amp;饮食</button>
          </div>
        </div>
        <div class="hp-hero-cards">
          <div class="hp-hero-card" v-for="card in heroCards" :key="card.label">
            <div class="hp-hero-card__icon">
              <component :is="card.icon" :size="28" :stroke-width="1.8" />
            </div>
            <span>{{ card.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门资讯 -->
    <section class="hp-section">
      <div class="hp-section-hd">
        <div class="hp-section-title">
          <Flame :size="22" class="hp-section-icon" />
          <h2>热门资讯</h2>
          <span class="hp-section-tag">每周精选</span>
        </div>
        <router-link to="/news/list" class="hp-section-more">
          查看全部 <ArrowRight :size="14" />
        </router-link>
      </div>
      <div v-if="newsLoading" class="hp-card-grid">
        <div v-for="i in 6" :key="i" class="hp-skeleton" />
      </div>
      <div v-else class="hp-card-grid">
        <article v-for="item in hotNews" :key="item.id" class="hp-card" @click="goToNews(item.id)">
          <div class="hp-card-cover">
            <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" />
            <div v-else class="hp-card-cover-ph"></div>
            <div class="hp-card-cover-overlay"></div>
            <span class="hp-card-badge">{{ catLabel(item.category) }}</span>
          </div>
          <div class="hp-card-body">
            <h3>{{ item.title }}</h3>
            <p>{{ (item.summary || '').slice(0, 60) }}{{ item.summary && item.summary.length > 60 ? '...' : '' }}</p>
            <div class="hp-card-meta">
              <span><User :size="12" />{{ item.author }}</span>
              <span><Eye :size="12" />{{ fmt(item.views) }}</span>
              <span><Calendar :size="12" />{{ fmtDate(item.publishDate) }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 热门训练计划 -->
    <section class="hp-section hp-section--alt">
      <div class="hp-section-hd">
        <div class="hp-section-title">
          <ClipboardList :size="22" class="hp-section-icon" />
          <h2>热门训练计划</h2>
          <span class="hp-section-tag">精选计划</span>
        </div>
        <router-link to="/fitness/training" class="hp-section-more">
          查看全部 <ArrowRight :size="14" />
        </router-link>
      </div>
      <div v-if="trainingLoading" class="hp-card-grid">
        <div v-for="i in 4" :key="i" class="hp-skeleton" />
      </div>
      <div v-else class="hp-card-grid">
        <article v-for="item in hotTraining" :key="item.id" class="hp-card hp-card--training" @click="goToTraining(item.id)">
          <div class="hp-card-cover hp-card-cover--green">
            <span class="hp-card-badge hp-card-badge--green">{{ goalLabel(item.goal) }}</span>
            <Dumbbell :size="80" class="hp-card-deco" />
          </div>
          <div class="hp-card-body">
            <h3>{{ item.title }}</h3>
            <p>{{ (item.description || '').slice(0, 60) }}{{ item.description && item.description.length > 60 ? '...' : '' }}</p>
            <div class="hp-card-meta">
              <span><CalendarDays :size="12" />{{ item.duration_weeks }}周</span>
              <span><Repeat :size="12" />每周{{ item.days_per_week }}天</span>
              <span class="hp-level-tag">{{ levelLabel(item.level) }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 特色 -->
    <section class="hp-features">
      <h2 class="hp-features-title">为什么选择我们</h2>
      <div class="hp-features-grid">
        <div v-for="feat in features" :key="feat.title" class="hp-feat" :style="{ '--feat-color': feat.color }">
          <div class="hp-feat__icon">
            <component :is="feat.icon" :size="24" />
          </div>
          <h3>{{ feat.title }}</h3>
          <p>{{ feat.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { CATEGORY_MAP } from '@/utils/constants'
import {
  Flame, ClipboardList, Dumbbell, HeartPulse, Activity, Apple,
  User, Eye, Calendar, CalendarDays, Repeat, BookOpen, Sparkles,
  BarChart3, Target, ArrowRight
} from 'lucide-vue-next'

const router = useRouter()
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const menuLinks = [
  { to: '/home', label: '首页', active: true },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现' }
]

const heroCards = [
  { icon: markRaw(Dumbbell), label: '力量训练' },
  { icon: markRaw(HeartPulse), label: '瑜伽塑形' },
  { icon: markRaw(Activity), label: '有氧燃脂' },
  { icon: markRaw(Apple), label: '营养指导' }
]

const features = [
  { icon: markRaw(BookOpen), title: '循证内容', desc: '基于ACSM、NSCA、ISSN等权威机构研究成果', color: '#1B6B3A' },
  { icon: markRaw(Sparkles), title: 'AI赋能', desc: 'AI健身助手、训练计划生成、饮食分析，智能助力', color: '#7C3AED' },
  { icon: markRaw(BarChart3), title: '数据追踪', desc: '饮食记录、热量计算，量化你的每一点进步', color: '#2563EB' },
  { icon: markRaw(Target), title: '个性化', desc: '基于阅读偏好智能推荐，发现适合你的内容', color: '#F97316' }
]

const hotNews = ref([])
const hotTraining = ref([])
const newsLoading = ref(true)
const trainingLoading = ref(true)

const GOAL_MAP = { build_muscle: '增肌', lose_fat: '减脂', endurance: '耐力', flexibility: '柔韧', general: '综合' }
const LEVEL_MAP = { beginner: '初级', intermediate: '中级', advanced: '高级' }

function catLabel(c) { return CATEGORY_MAP[c] || c }
function goalLabel(g) { return GOAL_MAP[g] || g }
function levelLabel(l) { return LEVEL_MAP[l] || l }
function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n) }
function fmtDate(d) { return d ? d.slice(0, 10) : '' }

function goToNews(id) { router.push(`/news/detail/${id}`) }
function goToTraining(id) { router.push(`/fitness/training/${id}`) }
function goNewsList() { router.push('/news/list') }
function goFitness() { router.push('/fitness') }

onMounted(async () => {
  try {
    const [newsRes, trainingRes] = await Promise.all([
      fetch(`${API}/news/popular/list?limit=6`),
      fetch(`${API}/training/popular?limit=4`)
    ])
    const newsData = await newsRes.json()
    hotNews.value = Array.isArray(newsData) ? newsData : (newsData.news || newsData.list || [])
    const trainingData = await trainingRes.json()
    hotTraining.value = Array.isArray(trainingData) ? trainingData : (trainingData.plans || trainingData.list || [])
  } catch (e) { console.error('Home fetch error:', e) }
  finally { newsLoading.value = false; trainingLoading.value = false }
})
</script>

<style scoped>
.home-page { min-height: 100vh; background: var(--color-bg); }

/* Hero */
.hp-hero {
  background: linear-gradient(160deg, #0f4d2a 0%, #1B6B3A 50%, #238B4D 100%);
  position: relative; overflow: hidden;
}
.hp-hero-orb {
  position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; pointer-events: none;
}
.hp-hero-orb--1 { width: 400px; height: 400px; background: #1B6B3A; top: -100px; right: -50px; }
.hp-hero-orb--2 { width: 300px; height: 300px; background: #F97316; bottom: -80px; left: 10%; }
.hp-hero-orb--3 { width: 200px; height: 200px; background: #7C3AED; top: 30%; left: 50%; }

.hp-hero-inner {
  position: relative; max-width: 1200px; margin: 0 auto; padding: 100px 24px 80px;
  display: flex; align-items: center; gap: 60px; z-index: 1;
}
.hp-hero-text { flex: 1; }
.hp-hero-text h1 {
  font-family: var(--font-display); font-size: 44px; font-weight: 800;
  color: #fff; line-height: 1.15; margin: 0 0 16px;
}
.hp-hero-text p {
  font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.7; margin: 0 0 28px; max-width: 480px;
}
.hp-hero-actions { display: flex; gap: 14px; }

.hp-btn-white {
  padding: 14px 32px; border-radius: var(--radius-full); border: none;
  background: #fff; color: var(--color-primary); font-size: 15px; font-weight: 600;
  cursor: pointer; font-family: var(--font-body); box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  transition: all 0.25s;
}
.hp-btn-white:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(0,0,0,0.2); }

.hp-btn-outline {
  padding: 14px 32px; border-radius: var(--radius-full);
  background: transparent; border: 2px solid rgba(255,255,255,0.35);
  color: #fff; font-size: 15px; font-weight: 600;
  cursor: pointer; font-family: var(--font-body); transition: all 0.25s;
}
.hp-btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

/* Hero cards */
.hp-hero-cards {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex-shrink: 0; width: 280px;
}
.hp-hero-card {
  padding: 16px; border-radius: var(--radius-lg);
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500;
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  backdrop-filter: blur(8px); transition: all 0.25s; cursor: default;
}
.hp-hero-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
.hp-hero-card__icon {
  width: 48px; height: 48px; border-radius: var(--radius-md);
  background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.9);
}

/* Sections */
.hp-section { max-width: 1200px; margin: 0 auto; padding: 56px 24px; }
.hp-section--alt { max-width: 100%; background: var(--color-bg-warm); padding-top: 56px; padding-bottom: 56px; }
.hp-section--alt .hp-section-hd, .hp-section--alt .hp-card-grid { max-width: 1200px; margin-left: auto; margin-right: auto; }

.hp-section-hd { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 28px; }
.hp-section-title { display: flex; align-items: center; gap: 10px; }
.hp-section-title h2 { font-family: var(--font-display); font-size: 22px; color: var(--color-text-primary); margin: 0; }
.hp-section-icon { color: var(--color-primary); }
.hp-section-tag {
  font-size: 12px; color: var(--color-primary); background: var(--color-primary-50);
  padding: 2px 10px; border-radius: var(--radius-full); font-weight: 500;
}
.hp-section-more {
  font-size: 14px; color: var(--color-primary); text-decoration: none; font-weight: 600;
  display: flex; align-items: center; gap: 4px; transition: gap 0.2s;
  margin-left: auto !important; flex-shrink: 0;
}
.hp-section-more:hover { gap: 8px; text-decoration: underline; }

/* Cards */
.hp-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.hp-card {
  cursor: pointer; border-radius: var(--radius-xl); overflow: hidden;
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm); transition: all 0.3s;
}
.hp-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }

.hp-card-cover { position: relative; height: 180px; overflow: hidden; background: var(--color-primary-50); }
.hp-card-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.hp-card:hover .hp-card-cover img { transform: scale(1.05); }
.hp-card-cover-ph { width: 100%; height: 100%; background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100)); }
.hp-card-cover-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
}
.hp-card-badge {
  position: absolute; top: 10px; left: 10px; z-index: 1;
  padding: 4px 12px; border-radius: var(--radius-sm);
  background: rgba(27,107,58,0.85); backdrop-filter: blur(8px);
  color: #fff; font-size: 11px; font-weight: 600;
}
.hp-card-badge--green { background: rgba(27,107,58,0.85); }
.hp-card-cover--green { background: linear-gradient(135deg, #E8F5EC, #C8E6D0); }
.hp-card-deco {
  position: absolute; bottom: -10px; right: -10px; opacity: 0.08; color: #1B6B3A;
}

.hp-card-body { padding: 16px 18px; }
.hp-card-body h3 {
  font-family: var(--font-display); font-size: 15px; color: var(--color-text-primary);
  margin: 0 0 6px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.hp-card-body p { font-size: 13px; color: var(--color-text-secondary); margin: 0 0 10px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hp-card-meta { display: flex; gap: 12px; font-size: 12px; color: var(--color-text-tertiary); flex-wrap: wrap; align-items: center; }
.hp-card-meta span { display: flex; align-items: center; gap: 4px; }
.hp-card-meta svg { flex-shrink: 0; opacity: 0.7; }
.hp-level-tag {
  font-size: 11px; font-weight: 600; padding: 1px 8px; border-radius: var(--radius-sm);
  background: var(--color-primary-50); color: var(--color-primary);
}

/* Skeleton */
.hp-skeleton {
  height: 320px; border-radius: var(--radius-xl);
  background: linear-gradient(90deg, var(--color-surface) 25%, var(--color-bg-card) 50%, var(--color-surface) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Features */
.hp-features { max-width: 1200px; margin: 0 auto; padding: 56px 24px 72px; }
.hp-features-title {
  font-family: var(--font-display); font-size: 22px; text-align: center;
  color: var(--color-text-primary); margin: 0 0 36px;
}
.hp-features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.hp-feat {
  padding: 32px 24px; border-radius: var(--radius-xl); background: var(--color-bg-card);
  border: 1px solid var(--color-border-light); text-align: center; transition: all 0.3s;
  position: relative; overflow: hidden;
}
.hp-feat::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--feat-color); opacity: 0; transition: opacity 0.3s;
}
.hp-feat:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); border-color: var(--feat-color); }
.hp-feat:hover::before { opacity: 1; }
.hp-feat__icon {
  width: 52px; height: 52px; border-radius: 50%; margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center;
  background: color-mix(in srgb, var(--feat-color) 12%, transparent);
  color: var(--feat-color);
}
.hp-feat h3 { font-size: 16px; color: var(--color-text-primary); margin: 0 0 8px; font-family: var(--font-display); }
.hp-feat p { font-size: 13px; color: var(--color-text-secondary); margin: 0; line-height: 1.6; }

@media (max-width: 768px) {
  .hp-hero-inner { flex-direction: column; padding: 60px 20px; gap: 30px; text-align: center; }
  .hp-hero-text h1 { font-size: 32px; }
  .hp-hero-text p { margin: 0 auto 24px; }
  .hp-hero-actions { justify-content: center; }
  .hp-hero-cards { width: 100%; grid-template-columns: 1fr 1fr; }
  .hp-card-grid { grid-template-columns: 1fr; }
  .hp-features-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
}
</style>
