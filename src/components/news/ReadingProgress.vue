<template>
  <div class="reading-progress" :style="{ width: progress + '%' }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function update() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) {
    progress.value = 0
    return
  }
  progress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
})
</script>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  z-index: 100;
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}
</style>
