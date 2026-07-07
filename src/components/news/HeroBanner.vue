<template>
  <div class="hb-banner">
    <div class="hb-track" :style="trackStyle">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        :class="['hb-slide', { active: idx === current }]"
      >
        <div class="hb-slide-bg" :style="{ backgroundImage: `url(${item.image})` }" />
        <div class="hb-slide-overlay" />
        <div class="hb-slide-content">
          <div class="hb-slide-top">
            <span class="hb-slide-cat" :style="{ background: getCategoryColor(item.category) }">
              {{ categoryLabel(item.category) }}
            </span>
            <span class="hb-slide-views">
              <Eye :size="13" />
              {{ formatViews(item.views) }} 浏览
            </span>
          </div>
          <h2 class="hb-slide-title">{{ item.title }}</h2>
          <p class="hb-slide-summary">{{ item.summary }}</p>
          <div class="hb-slide-meta">
            <span><User :size="12" /> {{ item.author }}</span>
            <span><Calendar :size="12" /> {{ formatDate(item.publishDate) }}</span>
          </div>
          <button class="hb-slide-btn" @click="goToDetail(item.id)">
            <span>阅读全文</span>
            <ArrowRight :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="hb-indicators" v-if="items.length > 1">
      <button
        v-for="(_, idx) in items"
        :key="idx"
        :class="['hb-dot', { active: idx === current }]"
        @click="goTo(idx)"
      >
        <span class="hb-dot-fill" :style="{ width: idx === current ? '100%' : '0%' }"></span>
      </button>
    </div>

    <!-- Arrows -->
    <button v-if="items.length > 1" class="hb-arrow hb-arrow--left" @click="prev">
      <ChevronLeft :size="18" />
    </button>
    <button v-if="items.length > 1" class="hb-arrow hb-arrow--right" @click="next">
      <ChevronRight :size="18" />
    </button>

    <!-- Decorative -->
    <div class="hb-deco hb-deco--1"></div>
    <div class="hb-deco hb-deco--2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { CATEGORY_MAP, CATEGORY_COLORS } from '@/utils/constants'
import type { NewsCardData } from '@/types/news'
import { Eye, User, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'

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

function getCategoryColor(cat: string) {
  return (CATEGORY_COLORS as Record<string, string>)[cat] || '#1890ff'
}

function formatViews(v: number) {
  if (v >= 10000) return (v / 10000).toFixed(1) + 'w'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return String(v)
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 10)
  return d.toISOString().slice(0, 10)
}

function goTo(idx: number) {
  current.value = (idx + props.items.length) % props.items.length
  restartAuto()
}

function prev() { goTo(current.value - 1) }
function next() { goTo(current.value + 1) }

function goToDetail(id: number) {
  router.push(`/news/detail/${id}`)
}

function startAuto() {
  stopAuto()
  if (props.items.length > 1) {
    timer = setInterval(() => {
      current.value = (current.value + 1) % props.items.length
    }, 6000)
  }
}

function stopAuto() {
  if (timer) { clearInterval(timer); timer = null }
}

function restartAuto() {
  stopAuto()
  startAuto()
}

onMounted(startAuto)
onUnmounted(stopAuto)
</script>

<style scoped>
.hb-banner {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  background: #0a1f14;
}

.hb-track {
  display: flex;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
}

.hb-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.hb-slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.45) saturate(1.1);
  transition: filter 0.5s;
}

.hb-slide-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%),
    linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 60%);
}

/* Decorative orbs */
.hb-deco {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 1;
}
.hb-deco--1 { width: 300px; height: 300px; background: var(--color-primary); top: -80px; right: 10%; }
.hb-deco--2 { width: 200px; height: 200px; background: var(--color-accent); bottom: -40px; left: 20%; }

.hb-slide-content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  padding: var(--space-8) var(--space-8) var(--space-10) 60px;
  color: #fff;
}

/* Top badges */
.hb-slide-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: var(--space-4);
}
.hb-slide-cat {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-md);
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.hb-slide-views {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Title */
.hb-slide-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 800;
  line-height: var(--leading-tight);
  margin-bottom: var(--space-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);
}

/* Summary */
.hb-slide-summary {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.75);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--space-4);
}

/* Meta */
.hb-slide-meta {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: rgba(255,255,255,0.6);
  margin-bottom: var(--space-5);
}
.hb-slide-meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* CTA Button */
.hb-slide-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 26px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: #fff;
  border: none;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: var(--font-body);
  box-shadow: 0 4px 16px rgba(27,107,58,0.4);
}
.hb-slide-btn:hover {
  background: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(27,107,58,0.5);
}
.hb-slide-btn:hover svg {
  transform: translateX(3px);
  transition: transform 0.2s;
}

/* Indicators */
.hb-indicators {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 5;
}
.hb-dot {
  width: 28px;
  height: 4px;
  border-radius: 2px;
  border: none;
  background: rgba(255,255,255,0.25);
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
  overflow: hidden;
  position: relative;
}
.hb-dot.active {
  background: rgba(255,255,255,0.3);
  width: 40px;
}
.hb-dot-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #fff;
  border-radius: 2px;
  transition: width 0.4s ease;
}

/* Arrows */
.hb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.1);
  color: #fff;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
}
.hb-arrow:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-50%) scale(1.05);
}
.hb-arrow--left { left: 20px; }
.hb-arrow--right { right: 20px; }

@media (max-width: 768px) {
  .hb-banner { height: 340px; }
  .hb-slide-title { font-size: var(--text-xl); }
  .hb-slide-content { padding: var(--space-4) var(--space-4) var(--space-8) var(--space-4); }
  .hb-arrow { width: 36px; height: 36px; }
  .hb-arrow--left { left: 10px; }
  .hb-arrow--right { right: 10px; }
}

@media (max-width: 480px) {
  .hb-banner { height: 280px; }
  .hb-slide-title { font-size: var(--text-lg); }
  .hb-slide-summary { display: none; }
  .hb-slide-meta { display: none; }
}
</style>
