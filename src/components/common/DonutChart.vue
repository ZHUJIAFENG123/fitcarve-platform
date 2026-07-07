<template>
  <div class="donut-chart" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <circle
        v-for="(segment, idx) in segments"
        :key="idx"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="segment.color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="segment.dashArray"
        :stroke-dashoffset="segment.dashOffset"
        :transform="`rotate(-90 ${center} ${center})`"
        class="donut-chart__segment"
      />
    </svg>
    <div class="donut-chart__center" v-if="$slots.center">
      <slot name="center" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Segment {
  value: number
  color: string
  label?: string
}

const props = withDefaults(defineProps<{
  segments: Segment[]
  size?: number
  strokeWidth?: number
}>(), {
  size: 160,
  strokeWidth: 24
})

const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const total = computed(() => props.segments.reduce((sum, s) => sum + s.value, 0))

const processedSegments = computed(() => {
  if (total.value === 0) return []
  
  let offset = 0
  return props.segments.map(segment => {
    const percentage = segment.value / total.value
    const length = circumference.value * percentage
    const dashArray = `${length} ${circumference.value - length}`
    const dashOffset = -offset
    
    offset += length
    
    return {
      ...segment,
      dashArray,
      dashOffset,
      percentage
    }
  })
})

const segments = computed(() => processedSegments.value)
</script>

<style scoped>
.donut-chart {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.donut-chart__segment {
  transition: stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease;
}

.donut-chart__center {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
