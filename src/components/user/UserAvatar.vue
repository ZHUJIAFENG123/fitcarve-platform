<template>
  <div class="ua-avatar" :class="{ 'ua-avatar--sm': size === 'sm', 'ua-avatar--lg': size === 'lg' }">
    <img v-if="avatarUrl" :src="avatarUrl" :alt="name || '用户'" class="ua-img" />
    <div v-else class="ua-placeholder" :style="{ background: placeholderColor }">
      {{ initials }}
    </div>
    <!-- Upload overlay -->
    <label v-if="uploadable" class="ua-upload-overlay">
      <input type="file" accept="image/*" @change="handleUpload" hidden />
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  avatarUrl?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  uploadable?: boolean
}>()

const emit = defineEmits<{
  upload: [file: File]
}>()

const initials = computed(() => {
  if (!props.name) return '?'
  const chars = props.name.trim().split('')
  if (chars.length >= 2) return chars[0] + chars[1]
  return chars[0].toUpperCase()
})

const placeholderColor = computed(() => {
  const colors = ['#1B6B3A', '#F97316', '#7C3AED', '#0EA5E9', '#EC4899']
  let hash = 0
  for (let i = 0; i < (props.name || '').length; i++) {
    hash = ((hash << 5) - hash) + (props.name || '').charCodeAt(i)
  }
  return colors[Math.abs(hash) % colors.length]
})

function handleUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请上传图片文件')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过5MB')
    return
  }
  emit('upload', file)
}
</script>

<style scoped>
.ua-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--color-border-light);
  transition: all 0.2s;
}

.ua-avatar--sm {
  width: 36px;
  height: 36px;
}

.ua-avatar--lg {
  width: 80px;
  height: 80px;
  border-width: 3px;
}

.ua-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ua-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  font-family: var(--font-display);
}

.ua-avatar--lg .ua-placeholder {
  font-size: 28px;
}

.ua-upload-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.ua-avatar:hover .ua-upload-overlay {
  opacity: 1;
}
</style>
