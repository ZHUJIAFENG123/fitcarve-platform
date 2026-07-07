<template>
  <div v-if="exercises.length" class="exercise-cards">
    <div class="ec-header">
      <el-icon><TrophyBase /></el-icon>
      <span>相关动作教学</span>
    </div>
    <div class="ec-grid">
      <div v-for="ex in exercises" :key="ex.id" class="ec-item" @click="$router.push(`/fitness/exercise/${ex.id}`)">
        <div class="ec-image" v-if="ex.gif_url || ex.image_url">
          <img :src="ex.gif_url || ex.image_url" :alt="ex.name" loading="lazy" />
        </div>
        <div class="ec-info">
          <h4>{{ ex.name }}</h4>
          <div class="ec-tags">
            <el-tag size="small" type="info">{{ ex.muscle_group }}</el-tag>
            <el-tag size="small" :type="ex.difficulty === 'advanced' ? 'danger' : ex.difficulty === 'intermediate' ? 'warning' : 'success'">
              {{ difficultyMap[ex.difficulty] || ex.difficulty }}
            </el-tag>
          </div>
          <p class="ec-tip" v-if="ex.tips">{{ ex.tips?.slice(0, 60) }}{{ ex.tips?.length > 60 ? '...' : '' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  exercises: Array<{ id: number; name: string; muscle_group?: string; difficulty?: string; tips?: string; gif_url?: string; image_url?: string }>
}>()

const difficultyMap = { beginner: '初级', intermediate: '中级', advanced: '高级' }
</script>

<style scoped>
.exercise-cards { margin: 20px 0; padding: 20px; background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border-light); }
.ec-header { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 600; color: var(--color-primary); margin-bottom: 14px; font-family: var(--font-display); }
.ec-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.ec-item {
  display: flex; gap: 12px; padding: 12px;
  background: var(--color-bg-card); border-radius: var(--radius-lg); border: 1px solid var(--color-border-light);
  cursor: pointer; transition: all 0.2s;
}
.ec-item:hover { box-shadow: 0 2px 10px rgba(0,0,0,0.06); border-color: var(--color-primary); }
.ec-image { width: 72px; height: 72px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0; background: var(--color-surface); }
.ec-image img { width: 100%; height: 100%; object-fit: cover; }
.ec-info { flex: 1; min-width: 0; }
.ec-info h4 { margin: 0 0 6px; font-size: 14px; color: var(--color-text-primary); }
.ec-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 4px; }
.ec-tip { margin: 0; font-size: 12px; color: var(--color-text-tertiary); line-height: 1.4; }
</style>
