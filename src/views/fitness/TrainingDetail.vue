<template>
  <div class="td-page">
    <Navbar :menu-links="menuLinks" />

    <div v-if="loading" class="td-container">
      <div class="td-skeleton"><div class="sk-h1"></div><div class="sk-meta"></div><div class="sk-block"></div><div class="sk-block" style="width:60%"></div></div>
    </div>

    <div v-else-if="!plan" class="td-container td-empty">
      <el-empty description="计划不存在" />
    </div>

    <template v-else>
      <!-- Header -->
      <div class="td-hero">
        <div class="td-hero-inner">
          <div class="td-badges">
            <span class="td-badge td-badge-goal">{{ GOAL_MAP[plan.goal] }}</span>
            <span class="td-badge td-badge-level">{{ LEVEL_MAP[plan.level] }}</span>
          </div>
          <h1>{{ plan.title }}</h1>
          <p>{{ plan.description }}</p>
          <div class="td-meta">
            <span>👤 {{ plan.coach }}</span>
            <span>📅 {{ plan.duration_weeks }}周</span>
            <span>📆 每周{{ plan.days_per_week }}天</span>
            <span>👁 {{ formatViews(plan.views) }}</span>
          </div>
        </div>
      </div>

      <!-- Week Selector -->
      <div class="td-content">
        <div class="td-week-selector">
          <button
            v-for="w in plan.duration_weeks"
            :key="w"
            :class="['td-week-btn', { active: currentWeek === w }]"
            @click="currentWeek = w"
          >第{{ w }}周</button>
        </div>

        <!-- Days -->
        <div class="td-days">
          <div v-for="day in weekDays" :key="day.day" class="td-day-card">
            <div class="td-day-header">
              <h3>Day {{ day.day }}: {{ day.title }}</h3>
            </div>

            <!-- Warmup -->
            <div class="td-section" v-if="day.warmup">
              <span class="td-section-label">🏃 热身</span>
              <p>{{ day.warmup }}</p>
            </div>

            <!-- Exercises -->
            <div class="td-exercises">
              <div v-for="(ex, i) in day.exercises" :key="i" class="td-exercise">
                <div class="td-ex-num">{{ i + 1 }}</div>
                <div class="td-ex-info">
                  <div class="td-ex-name">{{ ex.name }}</div>
                  <div class="td-ex-detail">
                    <span>{{ ex.sets }}组 × {{ ex.reps }}</span>
                    <span class="td-ex-rest">休息 {{ ex.rest }}s</span>
                  </div>
                  <div class="td-ex-notes" v-if="ex.notes">{{ ex.notes }}</div>
                </div>
              </div>
            </div>

            <!-- Cooldown -->
            <div class="td-section" v-if="day.cooldown">
              <span class="td-section-label">🧘 拉伸</span>
              <p>{{ day.cooldown }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const GOAL_MAP: Record<string, string> = { build_muscle: '增肌', lose_fat: '减脂', endurance: '耐力', flexibility: '柔韧', general: '综合' }
const LEVEL_MAP: Record<string, string> = { beginner: '初级', intermediate: '中级', advanced: '高级' }

const plan = ref<any>(null)
const loading = ref(true)
const currentWeek = ref(1)

const weekDays = computed(() => {
  if (!plan.value?.syllabus) return []
  const week = plan.value.syllabus.find((w: any) => w.week === currentWeek.value)
  return week?.days || []
})

function formatViews(v: number) { return v >= 1000 ? (v / 1000).toFixed(1) + 'k' : String(v) }

onMounted(async () => {
  try {
    const res = await fetch(`${API}/training/${route.params.id}`)
    if (!res.ok) throw new Error('加载失败')
    plan.value = await res.json()
  } catch (e) {
    console.error(e)
  } finally { loading.value = false }
})
</script>

<style scoped>
.td-page { min-height: 100vh; background: var(--color-bg); }

.td-hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  padding: var(--space-10) var(--space-4);
}
.td-hero-inner { max-width: 800px; margin: 0 auto; color: #fff; }
.td-badges { display: flex; gap: var(--space-2); margin-bottom: var(--space-4); }
.td-badge { font-size: var(--text-xs); font-weight: 600; padding: 3px 12px; border-radius: var(--radius-full); }
.td-badge-goal { background: rgba(255,255,255,0.2); color: #fff; }
.td-badge-level { background: var(--color-accent); color: #fff; }
.td-hero-inner h1 { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-3); }
.td-hero-inner p { font-size: var(--text-base); color: var(--color-primary-100); line-height: var(--leading-relaxed); margin-bottom: var(--space-4); }
.td-meta { display: flex; flex-wrap: wrap; gap: var(--space-4); font-size: var(--text-sm); color: var(--color-primary-200); }

/* Week selector */
.td-content { max-width: 800px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }
.td-week-selector {
  display: flex; gap: var(--space-2); overflow-x: auto; padding-bottom: var(--space-1);
  margin-bottom: var(--space-6); border-bottom: 1px solid var(--color-border-light);
}
.td-week-btn {
  padding: 8px 20px; border-radius: var(--radius-md); border: 1px solid var(--color-border-light);
  background: var(--color-bg-card); color: var(--color-text-secondary); font-weight: 600;
  cursor: pointer; white-space: nowrap; transition: all 0.2s; font-family: var(--font-body); font-size: var(--text-sm);
}
.td-week-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.td-week-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

/* Day cards */
.td-days { display: flex; flex-direction: column; gap: var(--space-6); }
.td-day-card {
  background: var(--color-bg-card); border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl); padding: var(--space-5); box-shadow: var(--shadow-sm);
}
.td-day-header h3 { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--color-text-primary); }

.td-section {
  margin-top: var(--space-4); padding: var(--space-3) var(--space-4);
  background: var(--color-bg-warm); border-radius: var(--radius-md);
}
.td-section-label { font-size: var(--text-sm); font-weight: 700; color: var(--color-primary); display: block; margin-bottom: 4px; }
.td-section p { font-size: var(--text-sm); color: var(--color-text-secondary); margin: 0; }

.td-exercises { margin-top: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
.td-exercise { display: flex; gap: var(--space-4); align-items: flex-start; padding: var(--space-3); border-radius: var(--radius-md); transition: background 0.15s; }
.td-exercise:hover { background: var(--color-primary-50); }
.td-ex-num {
  width: 32px; height: 32px; border-radius: var(--radius-full); background: var(--color-primary);
  color: #fff; font-weight: 700; font-size: var(--text-sm); display: flex; align-items: center;
  justify-content: center; flex-shrink: 0;
}
.td-ex-info { flex: 1; min-width: 0; }
.td-ex-name { font-weight: 700; color: var(--color-text-primary); font-size: var(--text-base); }
.td-ex-detail { display: flex; gap: var(--space-3); margin-top: 2px; font-size: var(--text-sm); color: var(--color-text-secondary); }
.td-ex-rest { color: var(--color-text-tertiary); }
.td-ex-notes { margin-top: var(--space-1); font-size: var(--text-xs); color: var(--color-text-tertiary); font-style: italic; }

.td-container { max-width: 800px; margin: 0 auto; padding: var(--space-6) var(--space-4); }
.td-empty { display: flex; justify-content: center; min-height: 400px; align-items: center; }
.td-skeleton .sk-h1 { height: 32px; background: var(--color-surface); border-radius: var(--radius-md); margin-bottom: var(--space-4); }
.td-skeleton .sk-meta { height: 16px; width: 40%; background: var(--color-surface); border-radius: var(--radius-sm); margin-bottom: var(--space-6); }
.td-skeleton .sk-block { height: 120px; background: var(--color-surface); border-radius: var(--radius-lg); margin-bottom: var(--space-4); animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }

@media (max-width: 640px) {
  .td-hero-inner h1 { font-size: var(--text-xl); }
}
</style>
