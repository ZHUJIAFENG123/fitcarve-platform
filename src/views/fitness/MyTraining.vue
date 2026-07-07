<template>
  <div class="mt-page">
    <Navbar :menu-links="menuLinks" />
    <HeroSection title="我的训练" subtitle="追踪你的训练进度与打卡记录" icon="📊" compact />

    <div class="mt-container">
      <!-- 统计卡片 -->
      <div class="mt-stats">
        <div class="mt-stat-card">
          <div class="mt-stat-num">{{ stats.total_enrollments || 0 }}</div>
          <div class="mt-stat-label">报名计划</div>
        </div>
        <div class="mt-stat-card">
          <div class="mt-stat-num">{{ stats.week_sessions || 0 }}</div>
          <div class="mt-stat-label">本周训练</div>
        </div>
        <div class="mt-stat-card">
          <div class="mt-stat-num">{{ formatDuration(stats.total_minutes || 0) }}</div>
          <div class="mt-stat-label">总训练时长</div>
        </div>
        <div class="mt-stat-card">
          <div class="mt-stat-num">{{ stats.last_training ? formatDate(stats.last_training) : '—' }}</div>
          <div class="mt-stat-label">最近训练</div>
        </div>
      </div>

      <!-- 进行中的计划 -->
      <section class="mt-section">
        <h2 class="mt-section-title">进行中的计划</h2>
        <el-empty v-if="enrolledPlans.length === 0" description="还没有报名任何训练计划">
          <el-button type="primary" @click="$router.push('/fitness/training')">浏览训练计划</el-button>
        </el-empty>
        <div v-else class="mt-plan-list">
          <div
            v-for="e in enrolledPlans"
            :key="e.plan_id"
            class="mt-plan-card"
            @click="$router.push(`/fitness/training/${e.plan_id}`)"
          >
            <div class="mt-plan-info">
              <h3>{{ e.title }}</h3>
              <p>{{ (e.description || '').slice(0, 60) }}{{ e.description && e.description.length > 60 ? '...' : '' }}</p>
              <div class="mt-plan-meta">
                <span class="mt-tag mt-tag-goal">{{ GOAL_MAP[e.goal] || e.goal }}</span>
                <span class="mt-tag mt-tag-level">{{ LEVEL_MAP[e.level] || e.level }}</span>
                <span>{{ e.duration_weeks }}周 · 每周{{ e.days_per_week }}天</span>
              </div>
            </div>
            <div class="mt-plan-progress">
              <el-progress :percentage="e.progress_pct || 0" :stroke-width="8" />
              <span class="mt-progress-pct">{{ e.progress_pct || 0 }}%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 训练日历 -->
      <section class="mt-section">
        <div class="mt-section-header">
          <h2 class="mt-section-title">训练日历</h2>
          <div class="mt-cal-nav">
            <button @click="changeMonth(-1)">‹</button>
            <span>{{ currentMonthLabel }}</span>
            <button @click="changeMonth(1)">›</button>
          </div>
        </div>
        <div class="mt-calendar">
          <div class="mt-cal-weekday" v-for="w in ['一','二','三','四','五','六','日']" :key="w">周{{ w }}</div>
          <div
            v-for="cell in calendarCells"
            :key="cell.key"
            :class="['mt-cal-cell', { 'is-empty': !cell.date, 'has-log': cell.logs.length > 0, 'is-today': cell.isToday }]"
            @click="cell.logs.length > 0 && showDayLogs(cell)"
          >
            <span v-if="cell.date" class="mt-cal-day">{{ cell.date }}</span>
            <div v-if="cell.logs.length > 0" class="mt-cal-dot">{{ cell.logs.length }}</div>
          </div>
        </div>
      </section>

      <!-- 最近打卡 -->
      <section class="mt-section">
        <h2 class="mt-section-title">最近打卡</h2>
        <el-empty v-if="recentLogs.length === 0" description="还没有打卡记录" />
        <div v-else class="mt-log-list">
          <div
            v-for="log in recentLogs"
            :key="log.id"
            class="mt-log-item"
            @click="$router.push(`/fitness/training/${log.plan_id}`)"
          >
            <span class="mt-log-date">{{ formatDate(log.completed_at) }}</span>
            <span class="mt-log-title">{{ log.plan_title }}</span>
            <span class="mt-log-detail">W{{ log.week }} D{{ log.day }}</span>
            <span v-if="log.duration_minutes" class="mt-log-duration">{{ log.duration_minutes }}分钟</span>
          </div>
        </div>
      </section>
    </div>

    <!-- 当日训练内容弹层 -->
    <el-dialog v-model="dayDialogVisible" :title="dayDialogTitle" width="420px">
      <div v-if="dayDialogLogs.length === 0" style="color: var(--color-text-tertiary); text-align: center;">当日无训练记录</div>
      <div v-for="log in dayDialogLogs" :key="log.id" class="mt-day-log">
        <div class="mt-day-log-title">{{ log.plan_title }}</div>
        <div class="mt-day-log-meta">
          <span>W{{ log.week }} · D{{ log.day }}</span>
          <span v-if="log.duration_minutes">{{ log.duration_minutes }}分钟</span>
        </div>
        <div v-if="log.notes" class="mt-day-log-notes">{{ log.notes }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/common/HeroSection.vue'
import { useUserStore } from '@/stores/user'
import { GOAL_MAP, LEVEL_MAP } from '@/utils/fitness-constants'

const userStore = useUserStore()
const API = import.meta.env.VITE_API_BASE_URL || '/api'

const menuLinks = [
  { to: '/home', label: '首页' },
  { to: '/news/list', label: '资讯' },
  { to: '/fitness', label: '训练&饮食', active: true },
  { to: '/recommendation', label: '发现' }
]

const stats = ref<any>({})
const enrolledPlans = ref<any[]>([])
const calendarLogs = ref<any[]>([])
const recentLogs = ref<any[]>([])
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const dayDialogVisible = ref(false)
const dayDialogLogs = ref<any[]>([])
const dayDialogTitle = ref('')

const currentMonthLabel = computed(() => `${currentYear.value}年${currentMonth.value}月`)

// 计算日历网格：周一开始，前置空格
const calendarCells = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1)
  const lastDate = new Date(currentYear.value, currentMonth.value, 0).getDate()
  const startWeekday = (firstDay.getDay() + 6) % 7  // 周一=0
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const cells: any[] = []
  // 前置空格
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ key: `e${i}`, date: null, logs: [], isToday: false })
  }
  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const logs = calendarLogs.value.filter(l => (l.completed_at || '').startsWith(dateStr))
    cells.push({ key: `d${d}`, date: d, logs, isToday: dateStr === todayStr })
  }
  return cells
})

function formatDate(s: string) {
  if (!s) return '—'
  const d = new Date(s)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function formatDuration(minutes: number) {
  if (!minutes) return '0m'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h${m > 0 ? m + 'm' : ''}` : `${m}m`
}

function authHeaders() {
  return { Authorization: `Bearer ${userStore.token}` }
}

async function fetchAll() {
  if (!userStore.isLoggedIn) return
  try {
    const monthStr = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}`
    const [statsRes, enrolledRes, calRes] = await Promise.all([
      fetch(`${API}/training/stats`, { headers: authHeaders() }).then(r => r.json()),
      fetch(`${API}/training/enrolled`, { headers: authHeaders() }).then(r => r.json()),
      fetch(`${API}/training/logs/calendar?month=${monthStr}`, { headers: authHeaders() }).then(r => r.json())
    ])
    stats.value = statsRes || {}
    enrolledPlans.value = (enrolledRes.list || []).filter((x: any) => x.status === 'active')
    calendarLogs.value = calRes.list || []
    // 最近打卡：从日历数据中按 completed_at 降序取前 10 条
    recentLogs.value = [...calendarLogs.value]
      .sort((a, b) => (b.completed_at || '').localeCompare(a.completed_at || ''))
      .slice(0, 10)
  } catch (e) {
    console.error('MyTraining fetchAll error', e)
  }
}

function changeMonth(delta: number) {
  let m = currentMonth.value + delta
  let y = currentYear.value
  if (m < 1) { m = 12; y-- }
  if (m > 12) { m = 1; y++ }
  currentMonth.value = m
  currentYear.value = y
  fetchAll()
}

function showDayLogs(cell: any) {
  dayDialogTitle.value = `${currentMonth.value}月${cell.date}日训练`
  dayDialogLogs.value = cell.logs
  dayDialogVisible.value = true
}

onMounted(fetchAll)
</script>

<style scoped>
.mt-page { min-height: 100vh; background: var(--color-bg); }

.mt-container { max-width: 800px; margin: 0 auto; padding: var(--space-6) var(--space-4) var(--space-16); }

/* 统计卡片 */
.mt-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}
.mt-stat-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  text-align: center;
  box-shadow: var(--shadow-sm);
}
.mt-stat-num {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.2;
  margin-bottom: 4px;
}
.mt-stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: 500;
}

/* 区块通用 */
.mt-section { margin-bottom: var(--space-8); }
.mt-section-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: var(--space-4);
}
.mt-section-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4);
}

/* 计划卡片 */
.mt-plan-list { display: flex; flex-direction: column; gap: var(--space-3); }
.mt-plan-card {
  display: flex; align-items: center; gap: var(--space-4);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  cursor: pointer; transition: all 0.2s;
}
.mt-plan-card:hover {
  transform: var(--hover-lift-sm);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}
.mt-plan-info { flex: 1; min-width: 0; }
.mt-plan-info h3 {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 4px;
}
.mt-plan-info p {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  margin: 0 0 6px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.mt-plan-meta {
  display: flex; gap: var(--space-2); align-items: center;
  font-size: var(--text-xs); color: var(--color-text-tertiary);
  flex-wrap: wrap;
}
.mt-tag {
  font-size: 10px; font-weight: 600; padding: 1px 8px;
  border-radius: var(--radius-sm);
}
.mt-tag-goal { background: var(--color-primary-50); color: var(--color-primary); }
.mt-tag-level { background: #FEF3C7; color: #D97706; }
.mt-plan-progress {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  min-width: 120px;
}
.mt-plan-progress :deep(.el-progress) { width: 100%; }
.mt-progress-pct {
  font-size: var(--text-xs); font-weight: 700;
  color: var(--color-primary);
}

/* 日历 */
.mt-cal-nav {
  display: flex; align-items: center; gap: var(--space-3);
  font-size: var(--text-sm); color: var(--color-text-secondary);
}
.mt-cal-nav button {
  width: 28px; height: 28px; border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
  background: var(--color-bg-card); cursor: pointer;
  font-size: var(--text-base); font-weight: 700; color: var(--color-text-secondary);
  transition: all 0.15s;
}
.mt-cal-nav button:hover {
  background: var(--color-primary); color: #fff; border-color: var(--color-primary);
}
.mt-calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
}
.mt-cal-weekday {
  text-align: center; font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: 600; padding: var(--space-2) 0;
}
.mt-cal-cell {
  aspect-ratio: 1;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border-radius: var(--radius-md);
  cursor: default;
  position: relative;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background: var(--color-surface);
  transition: all 0.15s;
  min-height: 36px;
}
.mt-cal-cell.is-empty { background: transparent; cursor: default; }
.mt-cal-cell.has-log {
  background: var(--color-primary);
  color: #fff;
  cursor: pointer;
}
.mt-cal-cell.has-log:hover { transform: scale(1.05); }
.mt-cal-cell.is-today:not(.has-log) {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  font-weight: 700;
}
.mt-cal-day { font-weight: 500; }
.mt-cal-dot {
  font-size: 10px; font-weight: 700;
  background: rgba(255,255,255,0.3); color: #fff;
  padding: 0 6px; border-radius: var(--radius-full);
  margin-top: 2px;
}

/* 打卡记录列表 */
.mt-log-list {
  display: flex; flex-direction: column; gap: var(--space-2);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
}
.mt-log-item {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer; transition: background 0.15s;
  font-size: var(--text-sm);
}
.mt-log-item:hover { background: var(--color-primary-50); }
.mt-log-date {
  font-weight: 700; color: var(--color-primary);
  min-width: 48px;
}
.mt-log-title { flex: 1; color: var(--color-text-primary); font-weight: 500; }
.mt-log-detail {
  font-size: var(--text-xs); color: var(--color-text-tertiary);
  background: var(--color-surface); padding: 2px 8px; border-radius: var(--radius-sm);
}
.mt-log-duration {
  font-size: var(--text-xs); color: var(--color-text-tertiary);
}

/* 弹层 */
.mt-day-log {
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border-light);
}
.mt-day-log:last-child { border-bottom: none; }
.mt-day-log-title {
  font-weight: 700; color: var(--color-text-primary);
  margin-bottom: 4px;
}
.mt-day-log-meta {
  display: flex; gap: var(--space-3);
  font-size: var(--text-xs); color: var(--color-text-tertiary);
}
.mt-day-log-notes {
  margin-top: var(--space-2);
  font-size: var(--text-xs); color: var(--color-text-secondary);
  font-style: italic;
}

/* 响应式 */
@media (max-width: 640px) {
  .mt-stats { grid-template-columns: repeat(2, 1fr); }
  .mt-plan-card { flex-direction: column; align-items: stretch; }
  .mt-plan-progress { min-width: 0; width: 100%; }
  .mt-cal-cell { min-height: 32px; font-size: var(--text-xs); }
}
</style>
