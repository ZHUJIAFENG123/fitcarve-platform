<template>
  <section v-if="plans.length" class="related-plans">
    <h3 class="section-title">
      <i class="icon-calendar"></i>
      关联训练计划
      <span class="count">{{ plans.length }}</span>
    </h3>
    <div class="plan-cards">
      <router-link
        v-for="plan in plans"
        :key="plan.id"
        :to="`/fitness/training/${plan.id}`"
        class="plan-card"
      >
        <div class="plan-badge" :class="plan.goal">{{ goalLabel(plan.goal) }}</div>
        <h4 class="plan-title">{{ plan.title }}</h4>
        <div class="plan-meta">
          <span>{{ levelLabel(plan.level) }}</span>
          <span>{{ plan.duration_weeks }}周</span>
          <span>{{ plan.days_per_week }}天/周</span>
        </div>
        <p class="plan-summary">{{ plan.summary || '暂无简介' }}</p>
        <div class="plan-stats">
          <span><i class="icon-users"></i> {{ plan.enrolled_count || 0 }}人报名</span>
          <span><i class="icon-eye"></i> {{ plan.views || 0 }}次浏览</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { httpGet } from '@/utils/request'

const props = defineProps<{ ids: string }>()

interface TrainingPlan {
  id: number
  title: string
  goal: string
  level: string
  duration_weeks: number
  days_per_week: number
  summary?: string
  enrolled_count?: number
  views?: number
}

const plans = ref<TrainingPlan[]>([])

function goalLabel(g: string) {
  return { build_muscle: '增肌', lose_fat: '减脂', endurance: '耐力', flexibility: '柔韧', general: '综合' }[g] || g
}
function levelLabel(l: string) {
  return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[l] || l
}

async function load() {
  if (!props.ids) { plans.value = []; return }
  const idList = props.ids.split(',').map(s => s.trim()).filter(Boolean).map(Number).filter(Boolean)
  if (!idList.length) { plans.value = []; return }
  try {
    const data = await httpGet<any>('/training/by-ids', { ids: idList.join(',') })
    plans.value = (data || []) as TrainingPlan[]
  } catch {
    plans.value = []
  }
}

watch(() => props.ids, load)
onMounted(load)
</script>

<style scoped>
.related-plans {
  margin: 32px 0 0;
  padding: 24px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}
.count {
  font-size: 13px;
  background: var(--color-primary-50);
  color: var(--color-primary);
  border-radius: 10px;
  padding: 1px 8px;
}
.plan-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.plan-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  text-decoration: none;
  color: inherit;
  transition: transform .2s, box-shadow .2s;
  position: relative;
}
.plan-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}
.plan-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}
.plan-badge.build_muscle { background: var(--color-primary-50); color: var(--color-primary); }
.plan-badge.lose_fat { background: var(--color-accent-50); color: var(--color-accent-dark); }
.plan-badge.endurance { background: rgba(37, 99, 235, 0.1); color: var(--state-info); }
.plan-badge.flexibility { background: var(--state-ai-light); color: var(--state-ai); }
.plan-badge.general { background: var(--color-surface); color: var(--color-text-tertiary); }
.plan-title {
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.4;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}
.plan-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 10px;
}
.plan-summary {
  font-size: 13px;
  color: var(--color-text-tertiary);
  margin: 0 0 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.plan-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--color-text-tertiary);
}
</style>
