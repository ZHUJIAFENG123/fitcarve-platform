<template>
  <div class="filter-bar" :class="{ 'filter-bar--sticky': sticky }">
    <div class="filter-bar__inner">
      <div v-for="(group, gi) in groups" :key="gi" class="filter-group">
        <span class="filter-group__label">{{ group.label }}</span>
        <div class="filter-group__items">
          <button
            v-for="item in group.items"
            :key="item.value"
            class="filter-chip"
            :class="{ 'filter-chip--active': isActive(group.key, item.value) }"
            @click="toggle(group.key, item.value)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
      <div v-if="$slots.extra" class="filter-bar__extra">
        <slot name="extra" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  groups: {
    type: Array,
    default: () => []
    // Each group: { key: string, label: string, items: [{ label: string, value: string|number }] }
  },
  sticky: { type: Boolean, default: true },
  modelValue: { type: Object, default: () => ({}) }
  // modelValue: { categoryKey: selectedValue, ... }
})

const emit = defineEmits(['update:modelValue'])

function isActive(key, value) {
  return props.modelValue[key] === value
}

function toggle(key, value) {
  const next = { ...props.modelValue }
  if (next[key] === value) {
    delete next[key]
  } else {
    next[key] = value
  }
  emit('update:modelValue', next)
}
</script>

<style scoped>
.filter-bar {
  background: rgba(250, 250, 248, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-4) 0;
}

.filter-bar--sticky {
  position: sticky;
  top: 60px;
  z-index: 20;
}

.filter-bar__inner {
  max-width: var(--bp-xl);
  margin: 0 auto;
  padding: 0 var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.filter-group__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
  min-width: 48px;
}

.filter-group__items {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.filter-chip {
  padding: 6px 14px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
.filter-chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-primary-50);
  transform: translateY(-1px);
}
.filter-chip--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(27, 107, 58, 0.25);
}
.filter-chip--active:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
  color: #fff;
  transform: translateY(-1px);
}

.filter-bar__extra {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

@media (max-width: 768px) {
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  .filter-group__items {
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .filter-group__items::-webkit-scrollbar { display: none; }
}
</style>
