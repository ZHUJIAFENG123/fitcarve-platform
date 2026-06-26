<template>
  <div class="home-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero -->
    <section class="home-hero">
      <div class="home-hero-inner">
        <div class="hero-text">
          <h1>科学健身<br/>从这里开始</h1>
          <p>专业 · 循证 · AI赋能的健身平台，为你提供训练计划、饮食方案与权威资讯</p>
          <div class="hero-actions">
            <el-button type="primary" size="large" round class="hero-btn" @click="goNewsList">探索资讯</el-button>
            <el-button size="large" round class="hero-btn-outline" @click="goFitness">训练&饮食</el-button>
          </div>
        </div>
        <div class="hero-cards">
          <div class="hcard">💪 力量训练</div>
          <div class="hcard">🧘 瑜伽塑形</div>
          <div class="hcard">🏃 有氧燃脂</div>
          <div class="hcard">🥗 营养指导</div>
        </div>
      </div>
    </section>

    <!-- 热门资讯 -->
    <section class="home-section">
      <div class="section-head">
        <div>
          <h2>🔥 热门资讯</h2>
          <span class="section-tag">每周精选</span>
        </div>
        <router-link to="/news/list" class="section-more">查看全部 →</router-link>
      </div>
      <div v-if="newsLoading" class="card-grid">
        <div v-for="i in 6" :key="i" class="card-skeleton" />
      </div>
      <div v-else class="card-grid">
        <article v-for="item in hotNews" :key="item.id" class="home-card" @click="goToNews(item.id)">
          <div class="card-cover">
            <img v-if="item.image" :src="item.image" :alt="item.title" />
            <div v-else class="card-cover-placeholder"></div>
            <span class="card-badge">{{ catLabel(item.category) }}</span>
          </div>
          <div class="card-body">
            <h3>{{ item.title }}</h3>
            <p>{{ (item.summary || '').slice(0, 60) }}{{ item.summary && item.summary.length > 60 ? '...' : '' }}</p>
            <div class="card-meta">
              <span>👤 {{ item.author }}</span>
              <span>👁 {{ fmt(item.views) }}</span>
              <span>📅 {{ fmtDate(item.publishDate) }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 热门训练计划 -->
    <section class="home-section home-section--alt">
      <div class="section-head">
        <div>
          <h2>📋 热门训练计划</h2>
          <span class="section-tag">精选计划</span>
        </div>
        <router-link to="/fitness/training" class="section-more">查看全部 →</router-link>
      </div>
      <div v-if="trainingLoading" class="card-grid">
        <div v-for="i in 4" :key="i" class="card-skeleton" />
      </div>
      <div v-else class="card-grid">
        <article v-for="item in hotTraining" :key="item.id" class="home-card" @click="goToTraining(item.id)">
          <div class="card-cover card-cover--green">
            <span class="card-badge card-badge--green">{{ goalLabel(item.goal) }}</span>
          </div>
          <div class="card-body">
            <h3>{{ item.title }}</h3>
            <p>{{ (item.description || '').slice(0, 60) }}{{ item.description && item.description.length > 60 ? '...' : '' }}</p>
            <div class="card-meta">
              <span>📆 {{ item.duration_weeks }}周</span>
              <span>📅 每周{{ item.days_per_week }}天</span>
              <span class="card-level-tag">{{ levelLabel(item.level) }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 特色 -->
    <section class="home-section">
      <h2 class="features-title">为什么选择我们</h2>
      <div class="features-grid">
        <div class="feat-item">
          <span class="feat-icon">📖</span>
          <h3>循证内容</h3>
          <p>基于ACSM、NSCA、ISSN等权威机构研究成果</p>
        </div>
        <div class="feat-item">
          <span class="feat-icon">🤖</span>
          <h3>AI赋能</h3>
          <p>AI健身助手、训练计划生成、饮食分析，智能助力</p>
        </div>
        <div class="feat-item">
          <span class="feat-icon">📊</span>
          <h3>数据追踪</h3>
          <p>饮食记录、热量计算，量化你的每一点进步</p>
        </div>
        <div class="feat-item">
          <span class="feat-icon">🎯</span>
          <h3>个性化</h3>
          <p>基于阅读偏好智能推荐，发现适合你的内容</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { CATEGORY_MAP } from '@/utils/constants'

const router = useRouter()
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const menuLinks = [
  { to: '/home', label: '首页', active: true },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现' }
]

const hotNews = ref([])
const hotTraining = ref([])
const newsLoading = ref(true)
const trainingLoading = ref(true)

const GOAL_MAP = { build_muscle: '增肌', lose_fat: '减脂', endurance: '耐力', flexibility: '柔韧', general: '综合' }
const LEVEL_MAP = { beginner: '初级', intermediate: '中级', advanced: '高级' }

function catLabel(c) { return (CATEGORY_MAP)[c] || c }
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
      fetch(`${API}/news/popular?limit=6`),
      fetch(`${API}/training/popular?limit=4`)
    ])
    const newsData = await newsRes.json()
    hotNews.value = Array.isArray(newsData) ? newsData : (newsData.news || newsData.list || [])
    hotTraining.value = await trainingRes.json()
  } catch (e) { console.error('Home fetch error:', e) }
  finally { newsLoading.value = false; trainingLoading.value = false }
})
</script>

<style scoped>
.home-page { min-height: 100vh; background: var(--color-bg); }

/* Hero */
.home-hero {
  background: linear-gradient(160deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, #238B4D 100%);
  position: relative; overflow: hidden;
}
.home-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(249,115,22,0.05) 0%, transparent 40%);
}
.home-hero-inner {
  position: relative; max-width: 1200px; margin: 0 auto; padding: 80px 24px;
  display: flex; align-items: center; gap: 60px; z-index: 1;
}
.hero-text { flex: 1; }
.hero-text h1 {
  font-family: var(--font-display); font-size: 44px; font-weight: 800;
  color: #fff; line-height: 1.15; margin: 0 0 16px;
}
.hero-text p {
  font-size: 16px; color: var(--color-primary-100); line-height: 1.7; margin: 0 0 28px; max-width: 480px;
}
.hero-actions { display: flex; gap: 14px; }
.hero-btn {
  padding: 14px 32px !important; font-size: 15px; font-weight: 600;
  background: #fff !important; color: var(--color-primary) !important; border: none !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
.hero-btn:hover { transform: translateY(-2px); }
.hero-btn-outline {
  padding: 14px 32px !important; font-size: 15px; font-weight: 600;
  background: transparent !important; border: 2px solid rgba(255,255,255,0.35) !important;
  color: #fff !important;
}
.hero-btn-outline:hover { border-color: #fff !important; background: rgba(255,255,255,0.1) !important; }

.hero-cards {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex-shrink: 0; width: 280px;
}
.hcard {
  padding: 16px; border-radius: var(--radius-md);
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 500; text-align: center;
}

/* Sections */
.home-section { max-width: 1200px; margin: 0 auto; padding: 48px 24px; }
.home-section--alt { max-width: 100%; background: var(--color-bg-warm); }
.home-section--alt .card-grid { max-width: 1200px; margin: 0 auto; }

.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.section-head h2 { font-family: var(--font-display); font-size: 22px; color: var(--color-text-primary); margin: 0; }
.section-tag {
  font-size: 12px; color: var(--color-primary); background: var(--color-primary-50);
  padding: 2px 10px; border-radius: var(--radius-full); font-weight: 500; margin-left: 10px;
}
.section-more { font-size: 14px; color: var(--color-primary); text-decoration: none; font-weight: 600; }
.section-more:hover { text-decoration: underline; }

/* Cards */
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.home-card {
  cursor: pointer; border-radius: var(--radius-xl); overflow: hidden;
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm); transition: all 0.25s;
}
.home-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-left: 3px solid var(--color-primary); }

.card-cover { position: relative; height: 180px; overflow: hidden; background: var(--color-primary-50); }
.card-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.home-card:hover .card-cover img { transform: scale(1.05); }
.card-cover-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100)); }
.card-cover--green { background: linear-gradient(135deg, #E8F5EC, #C8E6D0); }

.card-badge {
  position: absolute; top: 10px; left: 10px;
  padding: 3px 10px; border-radius: var(--radius-sm);
  background: var(--color-primary); color: #fff; font-size: 11px; font-weight: 600;
}
.card-badge--green { background: var(--color-primary); }

.card-body { padding: 14px 16px; }
.card-body h3 {
  font-family: var(--font-display); font-size: 15px; color: var(--color-text-primary);
  margin: 0 0 6px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.card-body p { font-size: 13px; color: var(--color-text-secondary); margin: 0 0 10px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-meta { display: flex; gap: 12px; font-size: 12px; color: var(--color-text-tertiary); flex-wrap: wrap; align-items: center; }
.card-level-tag {
  font-size: 11px; font-weight: 600; padding: 1px 8px; border-radius: var(--radius-sm);
  background: var(--color-primary-50); color: var(--color-primary);
}

.card-skeleton { height: 320px; border-radius: var(--radius-xl); background: var(--color-surface); animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }

/* Features */
.features-title { font-family: var(--font-display); font-size: 22px; text-align: center; color: var(--color-text-primary); margin: 0 0 32px; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.feat-item {
  padding: 28px 20px; border-radius: var(--radius-lg); background: var(--color-bg-card);
  border: 1px solid var(--color-border-light); text-align: center; transition: all 0.25s;
}
.feat-item:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); border-color: var(--color-primary); }
.feat-icon { font-size: 32px; display: block; margin-bottom: 12px; }
.feat-item h3 { font-size: 16px; color: var(--color-text-primary); margin: 0 0 6px; }
.feat-item p { font-size: 13px; color: var(--color-text-secondary); margin: 0; line-height: 1.6; }

@media (max-width: 768px) {
  .home-hero-inner { flex-direction: column; padding: 50px 20px; gap: 30px; text-align: center; }
  .hero-text h1 { font-size: 32px; }
  .hero-text p { margin: 0 auto 24px; }
  .hero-actions { justify-content: center; }
  .hero-cards { width: 100%; grid-template-columns: 1fr 1fr; }
  .card-grid { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
}
</style>
