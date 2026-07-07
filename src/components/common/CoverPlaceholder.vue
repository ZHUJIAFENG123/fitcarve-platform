<template>
  <div class="cover-placeholder" :class="[`cover--${variant}`]">
    <svg class="cover__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <slot>
        <path v-if="type === 'training'" d="M14 8h4v6h12V8h4v6h6v4h-6v16h6v4h-6v6h-4v-6H18v6h-4v-6H8v-4h6V18H8v-4h6V8z" fill="currentColor" opacity="0.5"/>
        <path v-else-if="type === 'diet'" d="M12 6c0 8-2 12-2 18a12 12 0 0024 0c0-6-2-10-2-18H12zm4 4h16v2H16v-2zm-2 16a8 8 0 0016 0H14z" fill="currentColor" opacity="0.5"/>
        <path v-else d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm-2-22h4v12h-4V18zm0-6h4v4h-4v-4z" fill="currentColor" opacity="0.5"/>
      </slot>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'default', validator: v => ['training', 'diet', 'default'].includes(v) },
  variant: { type: String, default: 'primary', validator: v => ['primary', 'accent', 'ai', 'subtle'].includes(v) }
})
</script>

<style scoped>
.cover-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 120px;
  border-radius: var(--radius-md);
}

.cover__icon {
  width: 48px;
  height: 48px;
  opacity: 0.6;
}

.cover--primary {
  background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100));
  color: var(--color-primary);
}
.cover--accent {
  background: linear-gradient(135deg, var(--color-accent-50), var(--color-accent-100));
  color: var(--color-accent);
}
.cover--ai {
  background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(124,58,237,0.15));
  color: var(--state-ai);
}
.cover--subtle {
  background: var(--color-surface);
  color: var(--color-text-tertiary);
}
</style>
