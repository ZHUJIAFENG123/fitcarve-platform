<template>
  <div class="view-toggle">
    <button
      :class="['toggle-btn', { active: modelValue === 'grid' }]"
      @click="$emit('update:modelValue', 'grid')"
      title="网格视图"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </svg>
    </button>
    <button
      :class="['toggle-btn', { active: modelValue === 'list' }]"
      @click="$emit('update:modelValue', 'list')"
      title="列表视图"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1.5" width="14" height="3" rx="1" />
        <rect x="1" y="6.5" width="14" height="3" rx="1" />
        <rect x="1" y="11.5" width="14" height="3" rx="1" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: 'grid' | 'list'
}>()

defineEmits<{
  'update:modelValue': [value: 'grid' | 'list']
}>()
</script>

<style scoped>
.view-toggle {
  display: flex;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
}
.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 32px;
  background: var(--color-bg-card);
  border: none;
  cursor: pointer;
  color: var(--color-text-tertiary);
  transition: all 0.2s ease;
}
.toggle-btn:hover {
  background: var(--color-primary-50);
  color: var(--color-primary);
}
.toggle-btn.active {
  background: var(--color-primary);
  color: #fff;
}
.toggle-btn + .toggle-btn {
  border-left: 1px solid var(--color-border-light);
}
</style>
