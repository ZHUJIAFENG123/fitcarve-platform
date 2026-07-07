<template>
  <div class="ed-page">
    <Navbar :menu-links="menuLinks" />

    <!-- Loading -->
    <div v-if="loading" class="ed-container">
      <div class="ed-skeleton">
        <div class="sk-header"></div>
        <div class="sk-grid">
          <div class="sk-main"></div>
          <div class="sk-side"></div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!exercise" class="ed-empty">
      <div class="ed-empty-icon-wrap">
        <AlertCircle :size="32" :stroke-width="1.5" />
      </div>
      <p class="ed-empty-text">动作不存在</p>
      <button class="ed-back-btn" @click="$router.push('/fitness/exercises')">返回动作库</button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Compact header -->
      <header class="ed-header">
        <div class="ed-header-inner">
          <button class="ed-back" @click="$router.push('/fitness/exercises')">
            <ArrowLeft :size="16" /> <span>动作库</span>
          </button>
          <div class="ed-tags">
            <span class="ed-tag" :style="{ background: getMuscleColor(exercise.muscle_group) + '15', color: getMuscleColor(exercise.muscle_group) }">
              {{ MUSCLE_MAP[exercise.muscle_group] || exercise.muscle_group }}
            </span>
            <span class="ed-tag ed-tag--level">
              <span :class="['ed-dot', 'ed-dot--' + exercise.difficulty]"></span>
              {{ LEVEL_MAP[exercise.difficulty] || exercise.difficulty }}
            </span>
            <span class="ed-tag ed-tag--cat" v-if="exercise.category">{{ CATEGORY_MAP[exercise.category] || exercise.category }}</span>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="ed-container">
        <div class="ed-title-row">
          <h1 class="ed-title">{{ exercise.name }}</h1>
          <div class="ed-quick-info">
            <span class="ed-qi" v-if="exercise.equipment">
              <Dumbbell :size="13" /> {{ exercise.equipment }}
            </span>
            <span class="ed-qi" v-if="exercise.body_part">
              <MapPin :size="13" /> {{ exercise.body_part }}
            </span>
          </div>
        </div>

        <div class="ed-layout">
          <!-- Left: GIF + Steps -->
          <div class="ed-main">
            <!-- GIF Demo -->
            <div class="ed-demo">
              <div class="ed-demo-body" v-if="exercise.gif_url">
                <img :src="exercise.gif_url" :alt="exercise.name" class="ed-gif" />
              </div>
              <div class="ed-demo-body" v-else-if="exercise.video_url">
                <video :src="exercise.video_url" controls loop class="ed-video" />
              </div>
              <div class="ed-demo-body ed-demo-body--ph" v-else-if="exercise.image_url">
                <img :src="exercise.image_url" :alt="exercise.name" class="ed-gif" @error="imgError=true" v-if="!imgError" />
                <div class="ed-ph" v-else>
                  <ImageOff :size="40" :stroke-width="1.5" />
                  <span>演示图准备中</span>
                </div>
              </div>
              <div class="ed-demo-body ed-demo-body--ph" v-else>
                <div class="ed-ph">
                  <ImageOff :size="40" :stroke-width="1.5" />
                  <span>演示图准备中</span>
                </div>
              </div>
            </div>

            <!-- Info Tags Bar -->
            <div class="ed-info-bar">
              <div class="ed-info-pill" v-if="exercise.target_muscles">
                <Target :size="14" />
                <span>{{ exercise.target_muscles }}</span>
              </div>
              <div class="ed-info-pill" v-if="exercise.equipment">
                <Dumbbell :size="14" />
                <span>{{ exercise.equipment }}</span>
              </div>
              <div class="ed-info-pill" v-if="exercise.body_part">
                <MapPin :size="14" />
                <span>{{ exercise.body_part }}</span>
              </div>
            </div>

            <!-- Instructions (Timeline) -->
            <div class="ed-section" v-if="exercise.instructions">
              <h2 class="ed-section-title">
                <span class="ed-st-icon"><ListOrdered :size="18" :stroke-width="1.8" /></span>
                动作步骤
              </h2>
              <div class="ed-timeline">
                <div v-for="(step, i) in parsedInstructions" :key="i" class="ed-timeline-item">
                  <div class="ed-timeline-line">
                    <span class="ed-timeline-dot">{{ i + 1 }}</span>
                  </div>
                  <p class="ed-timeline-text">{{ step }}</p>
                </div>
              </div>
            </div>

            <!-- Secondary Muscles -->
            <div class="ed-section" v-if="exercise.secondary_muscles">
              <h2 class="ed-section-title">
                <span class="ed-st-icon"><Link :size="18" :stroke-width="1.8" /></span>
                辅助肌群
              </h2>
              <div class="ed-muscle-tags">
                <span v-for="m in exercise.secondary_muscles.split(',')" :key="m" class="ed-muscle-tag">{{ m.trim() }}</span>
              </div>
            </div>

            <!-- Tips -->
            <div class="ed-section" v-if="exercise.tips">
              <h2 class="ed-section-title">
                <span class="ed-st-icon"><Lightbulb :size="18" :stroke-width="1.8" /></span>
                动作要点
              </h2>
              <div class="ed-tips-card">
                <Lightbulb :size="16" class="ed-tips-icon" />
                <p>{{ exercise.tips }}</p>
              </div>
            </div>
          </div>

          <!-- Right: Muscle Chart + Info -->
          <aside class="ed-sidebar">
            <div class="ed-sidebar-card">
              <h2 class="ed-section-title">
                <span class="ed-st-icon"><Activity :size="18" :stroke-width="1.8" /></span>
                目标肌群
              </h2>
              <MuscleChart :bodyState="muscleBodyState" :height="'380px'" @muscleClick="onMuscleClick" />
              <div class="ed-muscle-list" v-if="activeMuscles.length > 0">
                <div v-for="m in activeMuscles" :key="m.id" class="ed-muscle-item">
                  <span class="ed-muscle-dot" :style="{ background: m.color }" />
                  <span class="ed-muscle-name">{{ m.name }}</span>
                  <div class="ed-muscle-bar">
                    <div class="ed-muscle-bar-fill" :style="{ width: m.intensity*10+'%', background: m.color }"></div>
                  </div>
                  <span class="ed-muscle-intensity">{{ m.intensity }}/10</span>
                </div>
              </div>
            </div>

            <div class="ed-sidebar-card">
              <h2 class="ed-section-title">
                <span class="ed-st-icon"><BarChart3 :size="18" :stroke-width="1.8" /></span>
                动作信息
              </h2>
              <div class="ed-info-grid">
                <div class="ed-info-row">
                  <span class="ed-info-label">分类</span>
                  <span class="ed-info-value">{{ CATEGORY_MAP[exercise.category] || '-' }}</span>
                </div>
                <div class="ed-info-row">
                  <span class="ed-info-label">难度</span>
                  <span class="ed-info-value">
                    <span :class="['ed-dot-sm', 'ed-dot-sm--' + exercise.difficulty]"></span>
                    {{ LEVEL_MAP[exercise.difficulty] || '-' }}
                  </span>
                </div>
                <div class="ed-info-row">
                  <span class="ed-info-label">器材</span>
                  <span class="ed-info-value">{{ exercise.equipment || '无' }}</span>
                </div>
                <div class="ed-info-row">
                  <span class="ed-info-label">部位</span>
                  <span class="ed-info-value">{{ exercise.body_part || '-' }}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import MuscleChart from '@/components/fitness/MuscleChart.vue'
import { buildMuscleState, type ActiveMuscle, type BodyMuscleState } from '@/utils/exercise-muscle-map'
import { MUSCLE_MAP, LEVEL_MAP, FITNESS_CATEGORY_MAP as CATEGORY_MAP } from '@/utils/fitness-constants'
import {
  ArrowLeft, Target, Dumbbell, MapPin, ListOrdered, Link, Lightbulb,
  Activity, BarChart3, AlertCircle, ImageOff
} from 'lucide-vue-next'

const route = useRoute()
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const MUSCLE_COLORS: Record<string, string> = { chest: '#E53E3E', back: '#3182CE', legs: '#38A169', shoulders: '#D69E2E', arms: '#805AD5', core: '#00B5D8', full_body: '#4A5568' }

function getMuscleColor(mg: string): string { return MUSCLE_COLORS[mg] || '#4A5568' }

const MUSCLE_COLOR_BY_PART: Record<string, string> = {
  '胸': '#E53E3E', 'chest': '#E53E3E',
  '背': '#3182CE', 'back': '#3182CE', 'lats': '#3182CE',
  '腿': '#38A169', 'leg': '#38A169', 'quad': '#38A169', 'hamstring': '#38A169', 'calf': '#38A169', 'glute': '#38A169',
  '肩': '#D69E2E', 'shoulder': '#D69E2E', 'deltoid': '#D69E2E',
  '臂': '#805AD5', 'arm': '#805AD5', 'biceps': '#805AD5', 'tricep': '#805AD5', 'forearm': '#805AD5',
  '腹': '#00B5D8', 'abs': '#00B5D8', 'core': '#00B5D8', 'oblique': '#00B5D8',
  '颈': '#ED8936', 'neck': '#ED8936',
  '脊柱': '#9F7AEA', 'spine': '#9F7AEA', 'back-erector': '#9F7AEA',
}

function getMuscleIdColor(id: string): string {
  const lower = id.toLowerCase()
  for (const key in MUSCLE_COLOR_BY_PART) {
    if (lower.includes(key.toLowerCase())) return MUSCLE_COLOR_BY_PART[key]
  }
  return '#4A5568'
}

const exercise = ref<any>(null)
const loading = ref(false)
const clickedMuscle = ref<{ name: string } | null>(null)
const imgError = ref(false)

const muscleData = computed(() => {
  if (!exercise.value) return { bodyState: {}, activeMuscles: [] as ActiveMuscle[] }
  return buildMuscleState(exercise.value.target_muscles, exercise.value.secondary_muscles)
})

const activeMuscles = computed(() => {
  return muscleData.value.activeMuscles.map(m => ({ ...m, color: getMuscleIdColor(m.id) }))
})

const muscleBodyState = computed(() => muscleData.value.bodyState)

const parsedInstructions = computed(() => {
  if (!exercise.value?.instructions) return []
  return exercise.value.instructions.split(/\n/).map((s: string) => s.replace(/^Step:\d+\s*/i, '').trim()).filter((s: string) => s.length > 0)
})

function onMuscleClick(id: string, name: string) { clickedMuscle.value = { name } }

async function fetchExercise() {
  loading.value = true
  try {
    const res = await fetch(`${API}/exercises/${route.params.id}`)
    if (!res.ok) throw new Error('请求失败')
    exercise.value = await res.json()
  } catch (e) { exercise.value = null } finally { loading.value = false }
}

onMounted(() => { fetchExercise() })
</script>

<style scoped>
.ed-page { min-height: 100vh; background: var(--color-bg); }
.ed-container { max-width: 1200px; margin: 0 auto; padding: var(--space-6) var(--space-5) var(--space-12); }

/* Skeleton */
.ed-skeleton { display: flex; flex-direction: column; gap: var(--space-5); }
.sk-header { height: 48px; width: 200px; background: var(--color-surface); border-radius: var(--radius-lg); animation: shimmer 1.5s infinite; }
.sk-grid { display: grid; grid-template-columns: 1fr 380px; gap: var(--space-5); }
.sk-main { height: 400px; background: var(--color-surface); border-radius: var(--radius-xl); animation: shimmer 1.5s infinite; }
.sk-side { height: 300px; background: var(--color-surface); border-radius: var(--radius-xl); animation: shimmer 1.5s infinite; }
@keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* Empty */
.ed-empty { padding: var(--space-20) var(--space-5); display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
.ed-empty-icon-wrap {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--color-surface);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-tertiary); opacity: 0.6;
}
.ed-empty-text { font-size: var(--text-base); color: var(--color-text-tertiary); }
.ed-back-btn { padding: 10px 24px; background: var(--color-primary); color: #fff; border: none; border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600; cursor: pointer; }

/* Header */
.ed-header { background: var(--color-bg-card); border-bottom: 1px solid var(--color-border-light); padding: var(--space-3) var(--space-5); }
.ed-header-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: var(--space-4); flex-wrap: wrap; }
.ed-back {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--color-surface); color: var(--color-text-secondary);
  border: none; padding: 6px 14px; border-radius: var(--radius-full);
  font-size: var(--text-sm); cursor: pointer; transition: all 0.2s; flex-shrink: 0;
}
.ed-back:hover { background: var(--color-border); color: var(--color-text-primary); }
.ed-tags { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.ed-tag { padding: 4px 12px; border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
.ed-tag--level { background: var(--color-surface); color: var(--color-text-secondary); }
.ed-tag--cat { background: var(--color-primary-50); color: var(--color-primary); }
.ed-dot { width: 7px; height: 7px; border-radius: 50%; }
.ed-dot--beginner { background: #22C55E; }
.ed-dot--intermediate { background: #F59E0B; }
.ed-dot--advanced { background: #EF4444; }

/* Title Row */
.ed-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}
.ed-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
}
.ed-quick-info {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}
.ed-qi {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: var(--color-surface);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
}
.ed-qi svg { color: var(--color-text-tertiary); }

/* Layout */
.ed-layout { display: grid; grid-template-columns: 1fr 380px; gap: var(--space-6); align-items: start; }
.ed-main { display: flex; flex-direction: column; gap: var(--space-5); }
.ed-sidebar { display: flex; flex-direction: column; gap: var(--space-5); position: sticky; top: var(--space-5); }

/* Demo */
.ed-demo { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); overflow: hidden; }
.ed-demo-body { width: 100%; min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--color-surface); }
.ed-demo-body--ph { min-height: 320px; }
.ed-gif { width: 100%; max-height: 500px; object-fit: contain; }
.ed-video { width: 100%; max-height: 500px; background: #000; }
.ed-ph { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); color: var(--color-text-tertiary); }

/* Info Bar */
.ed-info-bar { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.ed-info-pill {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}
.ed-info-pill svg { color: var(--color-primary); }

/* Sections */
.ed-section { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); padding: var(--space-5); }
.ed-section-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.ed-st-icon {
  width: 32px; height: 32px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Timeline Steps */
.ed-timeline { display: flex; flex-direction: column; }
.ed-timeline-item { display: flex; gap: var(--space-4); position: relative; }
.ed-timeline-line { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.ed-timeline-dot {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: var(--text-xs); font-weight: 700;
  flex-shrink: 0; position: relative; z-index: 1;
}
.ed-timeline-item:not(:last-child) .ed-timeline-line::after {
  content: ''; width: 2px; flex: 1;
  background: var(--color-border-light);
  margin-top: 4px;
}
.ed-timeline-text {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
  padding-bottom: var(--space-4);
  padding-top: 3px;
}

/* Muscle Tags */
.ed-muscle-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.ed-muscle-tag {
  padding: 5px 14px;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* Tips */
.ed-tips-card {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--color-accent-50), var(--color-bg-warm));
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--color-accent);
}
.ed-tips-icon { color: var(--color-accent); flex-shrink: 0; margin-top: 2px; }
.ed-tips-card p { font-size: var(--text-sm); line-height: var(--leading-relaxed); color: var(--color-text-secondary); }

/* Sidebar Cards */
.ed-sidebar-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
}
.ed-sidebar-card h2 { margin-bottom: var(--space-3); }

/* Muscle List */
.ed-muscle-list {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.ed-muscle-item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); }
.ed-muscle-dot { width: 8px; height: 8px; border-radius: var(--radius-full); flex-shrink: 0; }
.ed-muscle-name { flex: 1; color: var(--color-text-primary); font-weight: 500; }
.ed-muscle-bar { width: 60px; height: 6px; background: var(--color-surface); border-radius: 3px; overflow: hidden; }
.ed-muscle-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
.ed-muscle-intensity { font-size: var(--text-xs); color: var(--color-text-tertiary); font-weight: 600; min-width: 32px; text-align: right; }

/* Info Grid */
.ed-info-grid { display: flex; flex-direction: column; }
.ed-info-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border-light);
}
.ed-info-row:last-child { border-bottom: none; }
.ed-info-label { font-size: var(--text-sm); color: var(--color-text-tertiary); }
.ed-info-value { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); display: flex; align-items: center; gap: 4px; }
.ed-dot-sm { width: 7px; height: 7px; border-radius: 50%; }
.ed-dot-sm--beginner { background: #22C55E; }
.ed-dot-sm--intermediate { background: #F59E0B; }
.ed-dot-sm--advanced { background: #EF4444; }

/* Responsive */
@media (max-width: 900px) {
  .ed-layout { grid-template-columns: 1fr; }
  .ed-sidebar { position: static; }
  .ed-title { font-size: var(--text-2xl); }
  .sk-grid { grid-template-columns: 1fr; }
  .sk-side { display: none; }
}
</style>
