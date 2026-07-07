<template>
  <div class="ns-card">
    <div class="ns-img" />
    <div class="ns-body">
      <div class="ns-line ns-line--title" />
      <div class="ns-line" />
      <div class="ns-line ns-line--short" />
      <div class="ns-meta">
        <div class="ns-dot" />
        <div class="ns-dot" />
        <div class="ns-dot" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ns-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
}

.ns-img {
  width: 100%;
  height: 200px;
  background: var(--color-surface);
  animation: nsPulse 1.5s ease-in-out infinite;
}

.ns-body {
  padding: var(--space-4);
}

.ns-line {
  height: 14px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  margin-bottom: 10px;
  animation: nsPulse 1.5s ease-in-out infinite;
}

.ns-line--title {
  width: 80%;
  height: 18px;
  margin-bottom: 12px;
}

.ns-line--short {
  width: 60%;
}

.ns-meta {
  display: flex;
  gap: 12px;
  margin-top: 14px;
}

.ns-dot {
  width: 48px;
  height: 10px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  animation: nsPulse 1.5s ease-in-out infinite;
}

@keyframes nsPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
