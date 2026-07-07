<template>
  <div v-if="videoUrl" class="video-card">
    <div class="video-label">
      <el-icon><VideoCameraFilled /></el-icon>
      <span>视频讲解</span>
    </div>
    <div class="video-wrapper">
      <iframe
        v-if="isEmbeddable"
        :src="embedUrl"
        frameborder="0"
        allowfullscreen
        class="video-iframe"
      />
      <video v-else :src="videoUrl" controls class="video-player" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ videoUrl: string }>()

const isEmbeddable = computed(() => {
  const url = props.videoUrl || ''
  return url.includes('bilibili.com') || url.includes('youtube.com') || url.includes('v.qq.com')
})

const embedUrl = computed(() => {
  const url = props.videoUrl || ''

  // B站
  const biliMatch = url.match(/bilibili\.com\/video\/(BV\w+)/)
  if (biliMatch) return `//player.bilibili.com/player.html?bvid=${biliMatch[1]}&page=1`

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (ytMatch) return `//www.youtube.com/embed/${ytMatch[1]}`

  // 腾讯视频
  const txMatch = url.match(/v\.qq\.com\/x\/page\/(\w+)\.html/)
  if (txMatch) return `//v.qq.com/txp/iframe/player.html?vid=${txMatch[1]}`

  return url
})
</script>

<style scoped>
.video-card {
  margin: 16px 0; padding: 16px;
  background: #f9fafb; border-radius: 12px; border: 1px solid #eee;
}
.video-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 15px; font-weight: 600; color: #1B6B3A; margin-bottom: 12px;
}
.video-wrapper {
  position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;
}
.video-iframe, .video-player {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;
}
</style>
