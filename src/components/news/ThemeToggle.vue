<template>
  <button class="theme-toggle" @click="toggle" :title="isDark ? '切换到浅色模式' : '切换到深色模式'">
    <span v-if="isDark" class="toggle-icon">☀️</span>
    <span v-else class="toggle-icon">🌙</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggle() {
  isDark.value = !isDark.value
  applyTheme()
}

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
  } else if (saved === 'light') {
    isDark.value = false
  } else {
    // Auto-detect system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})
</script>

<style scoped>
.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border-light);
  background: var(--color-bg-card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s;
}
.theme-toggle:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}
</style>
