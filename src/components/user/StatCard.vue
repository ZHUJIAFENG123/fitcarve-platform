<template>
  <div class="sc-card" :class="{ 'sc-card--clickable': clickable }" @click="$emit('click')">
    <div class="sc-icon" :style="{ background: iconBg, color: iconColor }">
      <component :is="icon" :size="20" />
    </div>
    <div class="sc-content">
      <span class="sc-value">{{ value }}</span>
      <span class="sc-label">{{ label }}</span>
    </div>
    <div v-if="trend !== undefined" class="sc-trend" :class="trend > 0 ? 'sc-trend--up' : 'sc-trend--down'">
      {{ trend > 0 ? '+' : '' }}{{ trend }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  value: string | number
  label: string
  iconBg?: string
  iconColor?: string
  trend?: number
  clickable?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.sc-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: all 0.2s;
}

.sc-card--clickable {
  cursor: pointer;
}

.sc-card--clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.sc-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sc-content {
  flex: 1;
  min-width: 0;
}

.sc-value {
  display: block;
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  line-height: 1.2;
}

.sc-label {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

.sc-trend {
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.sc-trend--up {
  background: rgba(34,197,94,0.1);
  color: #22C55E;
}

.sc-trend--down {
  background: rgba(239,68,68,0.1);
  color: #EF4444;
}
</style>
