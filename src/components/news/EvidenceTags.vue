<template>
  <div v-if="tags.length" class="evidence-tags">
    <span
      v-for="tag in tags"
      :key="tag"
      class="evidence-tag"
      :class="tagClass(tag)"
    >
      <i :class="tagIcon(tag)"></i>
      {{ tagLabel(tag) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  raw?: string
}>()

// 循证标签候选值（后端存逗号分隔字符串）
const VALID_TAGS = ['acsm', 'nsca', 'issn', 'research', 'expert_review', 'community']

function tagClass(tag: string) {
  return {
    'acsm': 'tag-acsm',
    'nsca': 'tag-nsca',
    'issn': 'tag-issn',
    'research': 'tag-research',
    'expert_review': 'tag-expert',
    'community': 'tag-community'
  }[tag] || 'tag-default'
}

function tagIcon(tag: string) {
  return {
    'acsm': 'icon-certificate',
    'nsca': 'icon-certificate',
    'issn': 'icon-doc',
    'research': 'icon-flask',
    'expert_review': 'icon-user-check',
    'community': 'icon-users'
  }[tag] || 'icon-tag'
}

function tagLabel(tag: string) {
  return {
    'acsm': 'ACSM 认证',
    'nsca': 'NSCA 推荐',
    'issn': 'ISSN 引用',
    'research': '科研引用',
    'expert_review': '专家审核',
    'community': '社区验证'
  }[tag] || tag
}

const tags = computed(() => {
  if (!props.raw) return []
  return props.raw
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(t => VALID_TAGS.includes(t))
})
</script>

<style scoped>
.evidence-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}
.evidence-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.6;
}
.tag-acsm,
.tag-nsca,
.tag-issn {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}
.tag-research {
  background: #e3f2fd;
  color: #1565c0;
  border: 1px solid #90caf9;
}
.tag-expert {
  background: #f3e5f5;
  color: #7b1fa2;
  border: 1px solid #ce93d8;
}
.tag-community {
  background: #fff3e0;
  color: #e65100;
  border: 1px solid #ffcc80;
}
.tag-default {
  background: #f5f5f5;
  color: #616161;
  border: 1px solid #e0e0e0;
}
</style>
