<template>
  <div class="author-card">
    <div class="author-avatar">{{ avatarLetter }}</div>
    <div class="author-info">
      <h4 class="author-name">{{ author }}</h4>
      <p class="author-bio">{{ bio }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  author: string
  bio?: string
}>()

const avatarLetter = computed(() => (props.author || '?').charAt(0).toUpperCase())

const defaultBios: Record<string, string> = {
  '李教练': 'NSCA 认证体能训练专家，10 年健身指导经验，专注力量训练与运动表现提升。',
  '营养师小王': '注册营养师，运动营养学硕士，擅长健身人群的营养方案设计与体重管理。',
  '张医生': '运动医学主治医师，运动康复专家，专注运动损伤的保守治疗与康复训练。',
  '陈教练': 'ACE 认证教练，HIIT 与功能性训练专家，帮助超过 500 名学员达成减脂目标。',
  '刘博士': '运动人体科学博士，运动补剂研究方向，发表多篇 SCI 论文。',
  '赵教练': '瑜伽与拉伸认证导师，10 年教学经验，擅长柔韧性与体态矫正训练。',
  '编辑组': '菜头健身 编辑团队，致力于传播科学、循证的健身知识。',
  '王教练': 'IFBB 职业认证教练，健美备赛指导专家，专注肌肉控制与训练技巧。'
}

const bio = computed(() => props.bio || defaultBios[props.author] || '菜头健身 认证创作者')
</script>

<style scoped>
.author-card {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-bg-warm);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  align-items: center;
}
.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--text-lg);
  font-family: var(--font-display);
  flex-shrink: 0;
}
.author-info {
  min-width: 0;
}
.author-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
  font-family: var(--font-display);
}
.author-bio {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
}
</style>
