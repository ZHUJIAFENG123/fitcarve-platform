<template>
  <nav v-if="headings.length > 0" class="toc">
    <h4 class="toc-title">目录</h4>
    <ul class="toc-list">
      <li
        v-for="(h, idx) in headings"
        :key="idx"
        :class="['toc-item', `toc-item--${h.level}`, { active: activeIdx === idx }]"
      >
        <a :href="`#${h.id}`" class="toc-link" @click.prevent="scrollTo(h.id)">
          {{ h.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Heading {
  id: string
  text: string
  level: number
}

const props = defineProps<{
  content: string
}>()

const headings = ref<Heading[]>([])
const activeIdx = ref(-1)

function parseHeadings() {
  // Parse h2/h3 from HTML content
  const div = document.createElement('div')
  div.innerHTML = props.content || ''
  const els = div.querySelectorAll('h2, h3')
  const result: Heading[] = []
  els.forEach((el, i) => {
    const id = `heading-${i}`
    el.id = id
    result.push({
      id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3
    })
  })
  headings.value = result
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Update URL hash without jump
    history.replaceState(null, '', `#${id}`)
  }
}

function updateActive() {
  const hs = headings.value
  if (hs.length === 0) return
  let current = -1
  const scrollTop = window.scrollY + 100
  for (let i = hs.length - 1; i >= 0; i--) {
    const el = document.getElementById(hs[i].id)
    if (el && el.offsetTop <= scrollTop) {
      current = i
      break
    }
  }
  activeIdx.value = current
}

onMounted(() => {
  // Small delay to let content render
  setTimeout(parseHeadings, 300)
  window.addEventListener('scroll', updateActive, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActive)
})
</script>

<style scoped>
.toc {
  padding: var(--space-4);
  border-left: 2px solid var(--color-border-light);
}
.toc-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  font-family: var(--font-display);
}
.toc-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.toc-item {
  padding: 2px 0;
}
.toc-item--3 {
  padding-left: var(--space-4);
}
.toc-link {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  text-decoration: none;
  line-height: var(--leading-snug);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  transition: all 0.15s;
  border-left: 2px solid transparent;
  margin-left: -10px;
}
.toc-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-50);
}
.toc-item.active .toc-link {
  color: var(--color-primary);
  font-weight: 600;
  border-left-color: var(--color-primary);
  background: var(--color-primary-50);
}
</style>
