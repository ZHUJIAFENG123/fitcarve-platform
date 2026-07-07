<template>
  <div class="mc-wrapper">
    <!-- Segment Control -->
    <div class="mc-toolbar">
      <div class="mc-segment">
        <button
          :class="['mc-seg-btn', { active: currentView === 'FRONT' }]"
          @click="switchView('FRONT')"
        >正面</button>
        <button
          :class="['mc-seg-btn', { active: currentView === 'BACK' }]"
          @click="switchView('BACK')"
        >背面</button>
      </div>
    </div>

    <!-- Muscle Chart Container -->
    <div ref="container" class="mc-container" />

    <!-- Hover Tooltip -->
    <div v-if="hoveredMuscle" class="mc-tooltip">
      <div class="mc-tooltip-card">
        <span class="mc-tooltip-name">{{ hoveredMuscle.name }}</span>
        <span v-if="hoveredMuscle.intensity" class="mc-tooltip-intensity">
          强度 {{ hoveredMuscle.intensity }}/10
        </span>
      </div>
    </div>

    <!-- Legend -->
    <div class="mc-legend">
      <span class="mc-legend-label">强度</span>
      <span class="mc-legend-bar" />
      <div class="mc-legend-scale">
        <span>低</span>
        <span>中</span>
        <span>高</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { BodyChart, ViewSide, type MuscleId } from 'body-muscles'
import { getMuscleLabel } from '@/utils/exercise-muscle-map'

interface MuscleState {
  intensity: number
  selected: boolean
}

const props = withDefaults(defineProps<{
  bodyState?: Record<string, MuscleState>
  initialView?: 'FRONT' | 'BACK'
  height?: string
}>(), {
  bodyState: () => ({}),
  initialView: 'FRONT',
  height: '400px'
})

const emit = defineEmits<{
  (e: 'muscleClick', id: string, name: string): void
  (e: 'muscleHover', id: string | null): void
}>()

const container = ref<HTMLElement | null>(null)
const currentView = ref<'FRONT' | 'BACK'>(props.initialView)
const hoveredMuscle = ref<{ name: string; intensity: number } | null>(null)

let chart: BodyChart | null = null

onMounted(() => {
  if (!container.value) return
  chart = new BodyChart(container.value, {
    view: currentView.value === 'BACK' ? ViewSide.BACK : ViewSide.FRONT,
    bodyState: props.bodyState,
    onMuscleClick: (id: MuscleId, name: string) => {
      emit('muscleClick', id, name)
    },
    onMuscleHover: (id: MuscleId | null) => {
      if (id) {
        const state = props.bodyState[id]
        hoveredMuscle.value = {
          name: formatMuscleName(id),
          intensity: state?.intensity || 0
        }
      } else {
        hoveredMuscle.value = null
      }
      emit('muscleHover', id)
    }
  })
})

watch(() => props.bodyState, (newState) => {
  chart?.update({ bodyState: newState })
}, { deep: true })

function switchView(view: 'FRONT' | 'BACK') {
  currentView.value = view
  chart?.update({ view: view === 'BACK' ? ViewSide.BACK : ViewSide.FRONT })
}

function formatMuscleName(id: string): string {
  return getMuscleLabel(id)
}

onUnmounted(() => {
  chart?.destroy()
  chart = null
})
</script>

<style scoped>
.mc-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* Segment Control */
.mc-toolbar {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}
.mc-segment {
  display: flex;
  background: var(--color-surface, #f0efeb);
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
}
.mc-seg-btn {
  padding: 6px 20px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-tertiary, #8a8a82);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.mc-seg-btn.active {
  background: var(--color-bg-card, #fff);
  color: var(--color-text-primary, #1a1a1a);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.mc-seg-btn:hover:not(.active) {
  color: var(--color-text-secondary, #5a5a55);
}

.mc-container {
  width: 100%;
  max-width: 360px;
  min-height: v-bind(height);
  display: flex;
  justify-content: center;
  align-items: center;
}

.mc-container :deep(svg) {
  max-width: 100%;
  height: auto;
}

/* Tooltip Card */
.mc-tooltip {
  pointer-events: none;
}
.mc-tooltip-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--color-bg-card, #fff);
  border: 1px solid var(--color-border-light, #edebe6);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.mc-tooltip-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary, #1a1a1a);
}
.mc-tooltip-intensity {
  font-size: 12px;
  color: var(--color-accent, #F97316);
  font-weight: 600;
  padding: 2px 8px;
  background: var(--color-accent-50, #FFF7ED);
  border-radius: 6px;
}

/* Legend */
.mc-legend {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-tertiary, #8a8a82);
}
.mc-legend-label {
  font-weight: 600;
}
.mc-legend-bar {
  width: 80px;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #94a3b8, #fbbf24, #f97316, #ef4444);
}
.mc-legend-scale {
  display: flex;
  gap: 12px;
  font-size: 10px;
}
</style>
