<template>
  <div class="progress-ring" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- 背景圆环 -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeWidth"
      />
      <!-- 进度圆环 -->
      <circle
        v-if="percentage > 0"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        :transform="`rotate(-90 ${center} ${center})`"
        class="progress-ring__circle"
      />
    </svg>
    <div class="progress-ring__content" v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  percentage: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
}>(), {
  size: 120,
  strokeWidth: 8,
  color: '#1B6B3A',
  trackColor: '#e5e5e0'
})

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => {
  const pct = Math.min(100, Math.max(0, props.percentage))
  return circumference.value * (1 - pct / 100)
})
</script>

<style scoped>
.progress-ring {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.6s ease;
}

.progress-ring__content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
