<template>
  <div class="nutrient-bar">
    <div class="nutrient-bar__labels">
      <span
        v-for="(item, idx) in computedItems"
        :key="idx"
        class="nutrient-bar__label-tag"
        :style="{ color: item.color }"
      >
        {{ item.label }} {{ item.value }}{{ item.unit }}
      </span>
    </div>
    <div class="nutrient-bar__track">
      <div
        v-for="(item, idx) in computedItems"
        :key="idx"
        class="nutrient-bar__segment"
        :style="{
          width: item.percentage + '%',
          backgroundColor: item.color
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface NutrientItem {
  value: number
  unit?: string
  color: string
  label?: string
}

const props = defineProps<{
  items: NutrientItem[]
}>()

const total = computed(() => props.items.reduce((sum, item) => sum + item.value, 0))

const computedItems = computed(() => {
  if (total.value === 0) return []
  return props.items.map(item => ({
    ...item,
    percentage: Math.max((item.value / total.value) * 100, 2) // min 2% for visibility
  }))
})
</script>

<style scoped>
.nutrient-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nutrient-bar__labels {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.nutrient-bar__label-tag {
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.nutrient-bar__track {
  display: flex;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--color-bg, #f5f5f0);
  gap: 2px;
}

.nutrient-bar__segment {
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  min-width: 4px;
}
</style>
