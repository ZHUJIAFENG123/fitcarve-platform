<template>
  <section v-if="exercises.length" class="related-exercises">
    <h3 class="section-title">
      <i class="icon-dumbbell"></i>
      关联动作
      <span class="count">{{ exercises.length }}</span>
    </h3>
    <div class="exercise-cards">
      <router-link
        v-for="ex in exercises"
        :key="ex.id"
        :to="`/fitness/exercises/${ex.id}`"
        class="exercise-card"
      >
        <img :src="ex.image_url || ex.gif_url || '/images/01.jpg'" :alt="ex.name" class="exercise-img" />
        <div class="exercise-info">
          <h4>{{ ex.name }}</h4>
          <div class="exercise-meta">
            <span class="muscle-tag">{{ ex.muscle_group }}</span>
            <span class="difficulty" :class="ex.difficulty">{{ difficultyLabel(ex.difficulty) }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { httpGet } from '@/utils/request'

const props = defineProps<{ ids: string }>()

interface Exercise {
  id: number
  name: string
  muscle_group: string
  difficulty: string
  image_url?: string
  gif_url?: string
}

const exercises = ref<Exercise[]>([])

function difficultyLabel(d: string) {
  return { beginner: '入门', intermediate: '进阶', advanced: '高级' }[d] || d
}

async function load() {
  if (!props.ids) { exercises.value = []; return }
  const idList = props.ids.split(',').map(s => s.trim()).filter(Boolean).map(Number).filter(Boolean)
  if (!idList.length) { exercises.value = []; return }
  try {
    const data = await httpGet<any[]>('/exercises/by-ids', { ids: idList.join(',') })
    exercises.value = (data || []).map((ex: Exercise) => ({
      ...ex,
      image_url: ex.image_url || `/images/${String(((ex.id - 1) % 44) + 1).padStart(2, '0')}.jpg`
    }))
  } catch {
    exercises.value = []
  }
}

watch(() => props.ids, load)
onMounted(load)
</script>

<style scoped>
.related-exercises {
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
.exercise-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.exercise-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  text-decoration: none;
  color: inherit;
  transition: transform .2s, box-shadow .2s;
}
.exercise-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}
.exercise-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}
.exercise-info {
  padding: 12px;
}
.exercise-info h4 {
  margin: 0 0 8px;
  font-size: 15px;
  color: var(--color-text-primary);
}
.exercise-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}
.muscle-tag {
  background: var(--color-primary-50);
  color: var(--color-primary);
  padding: 2px 8px;
  border-radius: var(--radius-md);
  font-size: 12px;
}
.difficulty {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: var(--radius-md);
}
.difficulty.beginner { background: var(--color-primary-50); color: var(--color-primary); }
.difficulty.intermediate { background: var(--color-accent-50); color: var(--color-accent-dark); }
.difficulty.advanced { background: rgba(220, 38, 38, 0.1); color: var(--state-error); }
</style>
