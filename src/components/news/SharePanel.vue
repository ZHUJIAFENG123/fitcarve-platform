<template>
  <el-dialog
    :model-value="visible"
    title="分享到"
    width="420px"
    :close-on-click-modal="true"
    center
    @update:model-value="$emit('update:visible', $event)"
  >
    <div class="share-panel">
      <div class="share-item" @click="$emit('copy-link')">
        <div class="share-icon-wrapper" style="background: #1890ff">
          <el-icon :size="24"><Link /></el-icon>
        </div>
        <span>复制链接</span>
      </div>
      <div class="share-item">
        <div class="share-icon-wrapper" style="background: #07c160">
          <el-icon :size="24"><ChatDotSquare /></el-icon>
        </div>
        <span>微信</span>
      </div>
      <div class="share-item">
        <div class="share-icon-wrapper" style="background: #ff6b6b">
          <el-icon :size="24"><Notebook /></el-icon>
        </div>
        <span>微博</span>
      </div>
      <div class="share-item">
        <div class="share-icon-wrapper" style="background: #409eff">
          <el-icon :size="24"><Message /></el-icon>
        </div>
        <span>QQ</span>
      </div>
    </div>
    <div v-if="linkCopied" class="share-link">
      <el-input :model-value="shareUrl" readonly>
        <template #append>
          <el-button type="primary" @click="$emit('copy-link')">复制</el-button>
        </template>
      </el-input>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { Link, ChatDotSquare, Notebook, Message } from '@element-plus/icons-vue'

defineProps<{
  visible: boolean
  linkCopied: boolean
  shareUrl: string
}>()

defineEmits<{
  'update:visible': [value: boolean]
  'copy-link': []
}>()
</script>

<style scoped>
.share-panel {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px 0;
}

.share-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.share-item:hover {
  transform: translateY(-4px);
}

.share-item span {
  font-size: 13px;
  color: #666;
}

.share-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.share-link {
  margin-top: 20px;
  padding: 0 10px;
}
</style>
