<template>
  <div class="discover-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Hero -->
    <section class="dis-hero">
      <h1>🔍 发现</h1>
      <p>{{ heroSubtitle }}</p>
      <div class="dis-hero-tabs">
        <button :class="{ active: activeTab === 'hot' }" @click="activeTab = 'hot'">🔥 热门</button>
        <button :class="{ active: activeTab === 'personal' }" @click="activeTab = 'personal'">🎯 为你推荐</button>
        <button :class="{ active: activeTab === 'newest' }" @click="activeTab = 'newest'">📰 最新</button>
      </div>
    </section>

    <div class="dis-container">

      <!-- ===== 热门Tab ===== -->
      <template v-if="activeTab === 'hot'">
        <!-- 头条大卡片 -->
        <section class="dis-section" v-if="featuredNews.length > 0">
          <div class="dis-featured">
            <div class="dis-feat-main" @click="goNews(featuredNews[0].id)">
              <div class="dis-feat-img" :style="featBg(featuredNews[0].image)"></div>
              <div class="dis-feat-body">
                <span class="dis-feat-cat">{{ catLabel(featuredNews[0].category) }}</span>
                <h2>{{ featuredNews[0].title }}</h2>
                <p>{{ featuredNews[0].summary }}</p>
                <div class="dis-feat-meta">
                  <span>👁 {{ fmt(featuredNews[0].views) }}</span>
                  <span>📅 {{ fmtDate(featuredNews[0].publishDate) }}</span>
                </div>
              </div>
            </div>
            <div class="dis-feat-side">
              <div v-for="n in featuredNews.slice(1, 3)" :key="n.id" class="dis-feat-mini" @click="goNews(n.id)">
                <h4>{{ n.title }}</h4>
                <span>{{ catLabel(n.category) }} · {{ fmt(n.views) }}浏览</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 热门资讯 -->
        <section class="dis-section">
          <div class="dis-section-hd"><h3>🔥 热门资讯</h3><router-link to="/news/list?sort=popular" class="dis-more">查看全部 →</router-link></div>
          <div class="dis-scroll">
            <article v-for="n in hotNews" :key="n.id" class="dis-card" @click="goNews(n.id)">
              <div class="dis-card-img" :style="cardBg(n.image)"><span class="dis-card-cat">{{ catLabel(n.category) }}</span></div>
              <div class="dis-card-body">
                <h4>{{ n.title }}</h4>
                <span class="dis-card-meta">👁 {{ fmt(n.views) }} · {{ fmtDate(n.publishDate) }}</span>
              </div>
            </article>
          </div>
        </section>

        <!-- 热门训练计划 -->
        <section class="dis-section" v-if="hotTraining.length > 0">
          <div class="dis-section-hd"><h3>📋 热门训练计划</h3><router-link to="/fitness/training" class="dis-more">查看全部 →</router-link></div>
          <div class="dis-scroll">
            <article v-for="t in hotTraining" :key="'t'+t.id" class="dis-card" @click="$router.push(`/fitness/training/${t.id}`)">
              <div class="dis-card-img dis-card-img--green"><span class="dis-card-cat dis-card-cat--green">{{ goalLabel(t.goal) }}</span></div>
              <div class="dis-card-body">
                <h4>{{ t.title }}</h4>
                <span class="dis-card-meta">📆 {{ t.duration_weeks }}周 · {{ levelLabel(t.level) }} · 👁 {{ fmt(t.views) }}</span>
              </div>
            </article>
          </div>
        </section>

        <!-- 热门饮食方案 -->
        <section class="dis-section" v-if="hotDiet.length > 0">
          <div class="dis-section-hd"><h3>🍽 热门饮食方案</h3><router-link to="/fitness/diet" class="dis-more">查看全部 →</router-link></div>
          <div class="dis-scroll">
            <article v-for="d in hotDiet" :key="'d'+d.id" class="dis-card" @click="$router.push(`/fitness/diet/${d.id}`)">
              <div class="dis-card-img dis-card-img--orange"><span class="dis-card-cat dis-card-cat--orange">{{ goalLabel(d.goal) }}</span></div>
              <div class="dis-card-body">
                <h4>{{ d.title }}</h4>
                <span class="dis-card-meta">🔥 {{ d.daily_calories }}kcal · 蛋白{{ d.protein_g }}g</span>
              </div>
            </article>
          </div>
        </section>
      </template>

      <!-- ===== 个性化Tab ===== -->
      <template v-if="activeTab === 'personal'">
        <section class="dis-section" v-if="personalList.length > 0">
          <div class="dis-section-hd"><h3>🎯 猜你喜欢</h3><span class="dis-section-sub">基于你的阅读偏好</span></div>
          <div class="dis-grid">
            <article v-for="item in personalList" :key="item.type+item.id" class="dis-card dis-card--grid" @click="goItem(item)">
              <div class="dis-card-img" :style="cardBg(item.image)"><span class="dis-card-cat">{{ item.typeLabel }}</span></div>
              <div class="dis-card-body">
                <h4>{{ item.title }}</h4>
                <p class="dis-reason">{{ item.reason }}</p>
              </div>
            </article>
          </div>
        </section>
        <section v-else class="dis-empty">
          <el-empty description="多看看内容，我会更懂你">
            <template #extra><el-button type="primary" @click="$router.push('/news/list')">去逛逛</el-button></template>
          </el-empty>
        </section>
      </template>

      <!-- ===== 最新Tab ===== -->
      <template v-if="activeTab === 'newest'">
        <section class="dis-section">
          <div class="dis-section-hd"><h3>📰 最新资讯</h3></div>
          <div class="dis-grid">
            <article v-for="n in newestNews" :key="n.id" class="dis-card dis-card--grid" @click="goNews(n.id)">
              <div class="dis-card-img" :style="cardBg(n.image)"><span class="dis-card-cat">{{ catLabel(n.category) }}</span></div>
              <div class="dis-card-body">
                <h4>{{ n.title }}</h4>
                <span class="dis-card-meta">{{ fmtDate(n.publishDate) }} · 👁 {{ fmt(n.views) }}</span>
              </div>
            </article>
          </div>
        </section>
      </template>

      <!-- ===== 热门标签云（所有Tab都显示）===== -->
      <section class="dis-section">
        <div class="dis-section-hd"><h3>🏷 热门标签</h3></div>
        <div class="dis-tags">
          <button v-for="tag in hotTags" :key="tag" class="dis-tag" @click="$router.push(`/news/list?tag=${tag}`)">{{ tag }}</button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { getHistory } from '@/composables/useReadingHistory'
import { CATEGORY_MAP, COMMON_TAGS } from '@/utils/constants'

const router = useRouter()
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食' },
  { to: '/recommendation', label: '发现', active: true }
]

const activeTab = ref<'hot' | 'personal' | 'newest'>('hot')
const heroSubtitle = computed(() => {
  if (activeTab.value === 'hot') return '大家都在看的热门内容'
  if (activeTab.value === 'personal') return '基于你的阅读偏好，为你精选'
  return '最新发布的优质内容'
})

const featuredNews = ref<any[]>([])
const hotNews = ref<any[]>([])
const newestNews = ref<any[]>([])
const hotTraining = ref<any[]>([])
const hotDiet = ref<any[]>([])
const personalList = ref<any[]>([])
const hotTags = ref<string[]>([])

const GOAL_MAP: Record<string, string> = { build_muscle: '增肌', lose_fat: '减脂', endurance: '耐力', flexibility: '柔韧', general: '综合', maintenance: '维持' }
const LEVEL_MAP: Record<string, string> = { beginner: '初级', intermediate: '中级', advanced: '高级' }

function catLabel(c: string) { return (CATEGORY_MAP as any)[c] || c }
function goalLabel(g: string) { return GOAL_MAP[g] || g }
function levelLabel(l: string) { return LEVEL_MAP[l] || l }
function fmt(v: number) { return v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(v) }
function fmtDate(d: string) { return d ? d.slice(0, 10) : '' }
function featBg(img: string) { return img ? `background-image:url(${img})` : 'background:var(--color-primary-100)' }
function cardBg(img: string) { return img ? `background-image:url(${img})` : 'background:var(--color-primary-50)' }
function goNews(id: number) { router.push(`/news/detail/${id}`) }
function goItem(item: any) { router.push(`/news/detail/${item.id}`) }

async function fetchHotNews() {
  const res = await fetch(`${API}/news?limit=10&sort=popular`)
  const data = await res.json()
  const list = data.news || data.list || []
  featuredNews.value = list.slice(0, 3)
  hotNews.value = list.slice(3, 9)
}

async function fetchNewestNews() {
  const res = await fetch(`${API}/news?limit=8`)
  const data = await res.json()
  newestNews.value = (data.news || data.list || []).slice(0, 8)
}

async function fetchHotTraining() {
  try {
    const res = await fetch(`${API}/training/popular?limit=5`)
    hotTraining.value = await res.json()
  } catch { hotTraining.value = [] }
}

async function fetchHotDiet() {
  try {
    const res = await fetch(`${API}/diet/popular?limit=5`)
    hotDiet.value = await res.json()
  } catch { hotDiet.value = [] }
}

function buildPersonal() {
  const history = getHistory()
  if (history.length === 0) { personalList.value = []; return }

  // Extract top categories from reading history
  const catCount: Record<string, number> = {}
  history.forEach(h => { catCount[h.category] = (catCount[h.category] || 0) + 1 })
  const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0]?.[0]

  // Build personal list from history
  personalList.value = history.slice(0, 6).map(h => ({
    ...h,
    type: 'news',
    typeLabel: catLabel(h.category),
    reason: topCat && h.category === topCat ? `你常看「${catLabel(topCat)}」` : '继续阅读'
  }))
}

// Hot tags from COMMON_TAGS
hotTags.value = COMMON_TAGS.slice(0, 15)

onMounted(async () => {
  await Promise.all([fetchHotNews(), fetchNewestNews(), fetchHotTraining(), fetchHotDiet()])
  buildPersonal()
})
</script>

<style scoped>
.discover-page { min-height: 100vh; background: var(--color-bg); }

.dis-hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  padding: var(--space-10) var(--space-4) var(--space-6);
  text-align: center;
}
.dis-hero h1 { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 800; color: #fff; }
.dis-hero p { color: var(--color-primary-100); margin: var(--space-2) 0 var(--space-5); font-size: var(--text-base); }
.dis-hero-tabs { display: inline-flex; background: rgba(255,255,255,0.15); border-radius: var(--radius-full); padding: 4px; }
.dis-hero-tabs button {
  padding: 8px 20px; border-radius: var(--radius-full); border: none; background: transparent;
  color: rgba(255,255,255,0.7); font-weight: 600; cursor: pointer; font-size: var(--text-sm);
  transition: all 0.2s; font-family: var(--font-body); white-space: nowrap;
}
.dis-hero-tabs button:hover { color: #fff; }
.dis-hero-tabs button.active { background: #fff; color: var(--color-primary); }

.dis-container { max-width: 1100px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

/* Sections */
.dis-section { margin-bottom: var(--space-8); }
.dis-section-hd { display: flex; align-items: baseline; gap: var(--space-3); margin-bottom: var(--space-4); }
.dis-section-hd h3 { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--color-text-primary); }
.dis-section-sub { font-size: var(--text-sm); color: var(--color-text-tertiary); }
.dis-more { font-size: var(--text-sm); color: var(--color-primary); text-decoration: none; font-weight: 600; margin-left: auto; }
.dis-more:hover { text-decoration: underline; }

/* Featured */
.dis-featured { display: flex; gap: var(--space-4); margin-bottom: var(--space-2); }
.dis-feat-main { flex: 1; background: var(--color-bg-card); border-radius: var(--radius-xl); overflow: hidden; cursor: pointer; transition: all 0.25s; border: 1px solid var(--color-border-light); }
.dis-feat-main:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.dis-feat-img { height: 200px; background-size: cover; background-position: center; }
.dis-feat-body { padding: var(--space-4); }
.dis-feat-cat { font-size: 11px; font-weight: 600; padding: 2px 10px; border-radius: var(--radius-sm); background: var(--color-primary-50); color: var(--color-primary); }
.dis-feat-body h2 { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; margin: var(--space-2) 0; color: var(--color-text-primary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.dis-feat-body p { font-size: var(--text-sm); color: var(--color-text-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: var(--space-2); }
.dis-feat-meta { font-size: var(--text-xs); color: var(--color-text-tertiary); display: flex; gap: var(--space-3); }

.dis-feat-side { width: 280px; display: flex; flex-direction: column; gap: var(--space-3); flex-shrink: 0; }
.dis-feat-mini { flex: 1; background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-lg); padding: var(--space-4); cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; justify-content: center; }
.dis-feat-mini:hover { border-color: var(--color-primary); background: var(--color-primary-50); }
.dis-feat-mini h4 { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 4px; }
.dis-feat-mini span { font-size: var(--text-xs); color: var(--color-text-tertiary); }

/* Scroll row */
.dis-scroll {
  display: flex; gap: var(--space-4); overflow-x: auto; padding-bottom: var(--space-2);
  scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
}
.dis-scroll::-webkit-scrollbar { height: 4px; }
.dis-scroll::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }

.dis-card {
  min-width: 200px; max-width: 200px; background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg); overflow: hidden; cursor: pointer; transition: all 0.2s;
  scroll-snap-align: start; flex-shrink: 0;
}
.dis-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.dis-card--grid { max-width: none; min-width: 0; }

.dis-card-img {
  height: 120px; background-size: cover; background-position: center;
  position: relative; display: flex; align-items: flex-start; padding: 8px;
}
.dis-card-img--green { background: linear-gradient(135deg, #E8F5EC, #C8E6D0); }
.dis-card-img--orange { background: linear-gradient(135deg, #FFF7ED, #FFEDD5); }
.dis-card-cat {
  font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-sm);
  background: var(--color-primary); color: #fff;
}
.dis-card-cat--green { background: var(--color-primary); color: #fff; }
.dis-card-cat--orange { background: var(--color-accent); color: #fff; }
.dis-card-body { padding: var(--space-3); }
.dis-card-body h4 { font-size: var(--text-sm); font-weight: 700; color: var(--color-text-primary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 4px; line-height: var(--leading-snug); }
.dis-card-meta { font-size: 11px; color: var(--color-text-tertiary); }
.dis-reason { font-size: 11px; color: var(--color-primary); margin-top: 2px; }

/* Grid */
.dis-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-4); }

/* Tags */
.dis-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.dis-tag {
  padding: 6px 16px; border-radius: var(--radius-full); border: 1px solid var(--color-border-light);
  background: var(--color-bg-card); color: var(--color-text-secondary); cursor: pointer;
  font-size: var(--text-sm); transition: all 0.2s; font-family: var(--font-body);
}
.dis-tag:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-50); }

.dis-empty { padding: var(--space-16) 0; }

@media (max-width: 768px) {
  .dis-featured { flex-direction: column; }
  .dis-feat-side { width: 100%; flex-direction: row; }
  .dis-feat-side .dis-feat-mini { flex: 1; }
  .dis-hero-tabs button { padding: 6px 14px; font-size: var(--text-xs); }
}
</style>
