<template>
  <div class="hero-banner">
    <div class="hero-track" :style="trackStyle">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        :class="['hero-slide', { active: idx === current }]"
      >
        <div class="slide-bg" :style="{ backgroundImage: `url(${item.image})` }" />
        <div class="slide-overlay" />
        <div class="slide-content">
          <span class="slide-category">{{ categoryLabel(item.category) }}</span>
          <h2 class="slide-title">{{ item.title }}</h2>
          <p class="slide-summary">{{ item.summary }}</p>
          <div class="slide-meta">
            <span>👤 {{ item.author }}</span>
            <span>👁 {{ formatViews(item.views) }} 浏览</span>
          </div>
          <button class="slide-btn" @click="goToDetail(item.id)">
            阅读全文 <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="hero-indicators" v-if="items.length > 1">
      <button
        v-for="(_, idx) in items"
        :key="idx"
        :class="['indicator', { active: idx === current }]"
        @click="goTo(idx)"
      />
    </div>

    <!-- Arrows -->
    <button v-if="items.length > 1" class="hero-arrow hero-arrow--left" @click="prev">
      ←
    </button>
    <button v-if="items.length > 1" class="hero-arrow hero-arrow--right" @click="next">
      →
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { CATEGORY_MAP } from '@/utils/constants'
import type { NewsCardData } from '@/types/news'

const props = defineProps<{
  items: NewsCardData[]
}>()

const router = useRouter()
const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const trackStyle = computed(() => ({
  transform: `translateX(-${current.value * 100}%)`
}))

function categoryLabel(cat: string) {
  return (CATEGORY_MAP as Record<string, string>)[cat] || cat
}

function formatViews(v: number) {
  if (v >= 10000) return (v / 10000).toFixed(1) + 'w'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return String(v)
}

function goTo(idx: number) {
  current.value = (idx + props.items.length) % props.items.length
}

function prev() {
  goTo(current.value - 1)
}

function next() {
  goTo(current.value + 1)
}

function goToDetail(id: number) {
  router.push(`/news/detail/${id}`)
}

function startAuto() {
  stopAuto()
  if (props.items.length > 1) {
    timer = setInterval(next, 5000)
  }
}

function stopAuto() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(startAuto)
onUnmounted(stopAuto)
</script>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: var(--color-primary-dark);
}
.hero-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.hero-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
}
.slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
}
.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%);
}
.slide-content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  padding: var(--space-8) var(--space-6);
  color: #fff;
}
.slide-category {
  display: inline-block;
  padding: 3px 12px;
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: 600;
  background: var(--color-primary);
  margin-bottom: var(--space-3);
}
.slide-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 800;
  line-height: var(--leading-tight);
  margin-bottom: var(--space-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.slide-summary {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.8);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--space-4);
}
.slide-meta {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: rgba(255,255,255,0.6);
  margin-bottom: var(--space-4);
}
.slide-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 10px 24px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: #fff;
  border: none;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-body);
}
.slide-btn:hover {
  background: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.btn-arrow {
  transition: transform 0.2s;
}
.slide-btn:hover .btn-arrow {
  transform: translateX(3px);
}

/* Indicators */
.hero-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
}
.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}
.indicator.active {
  background: #fff;
  border-color: #fff;
  transform: scale(1.2);
}

/* Arrows */
.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.15);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}
.hero-arrow:hover {
  background: rgba(255,255,255,0.3);
}
.hero-arrow--left { left: 16px; }
.hero-arrow--right { right: 16px; }

@media (max-width: 768px) {
  .hero-banner { height: 320px; }
  .slide-title { font-size: var(--text-xl); }
  .slide-content { padding: var(--space-4); }
  .hero-arrow { width: 36px; height: 36px; font-size: 1rem; }
}
</style>
