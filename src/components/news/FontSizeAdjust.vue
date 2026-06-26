<template>
  <div class="font-adjust">
    <button
      :class="['fa-btn', { active: modelValue === 'small' }]"
      @click="set('small')"
      title="小号字体"
    >A⁻</button>
    <button
      :class="['fa-btn', { active: modelValue === 'normal' }]"
      @click="set('normal')"
      title="默认字体"
    >A</button>
    <button
      :class="['fa-btn', { active: modelValue === 'large' }]"
      @click="set('large')"
      title="大号字体"
    >A⁺</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

type FontSize = 'small' | 'normal' | 'large'

const props = defineProps<{
  modelValue: FontSize
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FontSize]
}>()

const FONT_SIZES: Record<FontSize, string> = {
  small: '15px',
  normal: '17px',
  large: '19px'
}

const LINE_HEIGHTS: Record<FontSize, string> = {
  small: '1.7',
  normal: '1.8',
  large: '1.9'
}

function set(size: FontSize) {
  emit('update:modelValue', size)
  localStorage.setItem('newsFontSize', size)
  applySize(size)
}

function applySize(size: FontSize) {
  document.documentElement.style.setProperty('--reading-font-size', FONT_SIZES[size])
  document.documentElement.style.setProperty('--reading-line-height', LINE_HEIGHTS[size])
}

onMounted(() => {
  const saved = (localStorage.getItem('newsFontSize') as FontSize) || props.modelValue
  if (saved !== props.modelValue) {
    emit('update:modelValue', saved)
  }
  applySize(saved)
})
</script>

<style scoped>
.font-adjust {
  display: flex;
  align-items: center;
  gap: 2px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.fa-btn {
  width: 32px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--color-bg-card);
  color: var(--color-text-tertiary);
  cursor: pointer;
  font-size: var(--text-xs);
  font-weight: 600;
  transition: all 0.15s;
  font-family: var(--font-body);
}
.fa-btn:hover {
  background: var(--color-primary-50);
  color: var(--color-primary);
}
.fa-btn.active {
  background: var(--color-primary);
  color: #fff;
}
.fa-btn + .fa-btn {
  border-left: 1px solid var(--color-border-light);
}
</style>
