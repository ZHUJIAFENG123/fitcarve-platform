<template>
  <section
    class="hero-section"
    :class="[`hero--${variant}`, { 'hero--compact': compact }]"
  >
    <!-- Background image layer -->
    <div
      v-if="backgroundImage"
      class="hero__bg-image"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    />
    <!-- Solid dark base -->
    <div class="hero__bg-base" />
    <!-- Dramatic overlay gradient -->
    <div class="hero__bg-overlay" />
    <!-- Subtle glow accent -->
    <div v-if="variant !== 'subtle'" class="hero__glow" />
    <!-- Subtle variant light bg -->
    <div v-if="variant === 'subtle'" class="hero__bg-subtle" />

    <div class="hero__inner">
      <div class="hero__content">
        <span v-if="icon" class="hero__icon">{{ icon }}</span>
        <h1 class="hero__title">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p v-if="subtitle || $slots.subtitle" class="hero__subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
        <div v-if="$slots.actions" class="hero__actions">
          <slot name="actions" />
        </div>
      </div>
      <div v-if="$slots.extra" class="hero__extra">
        <slot name="extra" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  variant: { type: String, default: 'primary', validator: v => ['primary', 'accent', 'ai', 'subtle'].includes(v) },
  icon: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  backgroundImage: { type: String, default: '' }
})
</script>

<style scoped>
/* ===== Base ===== */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  isolation: isolate;
  background-color: #0C1210;
}

/* --- Background layers --- */
.hero__bg-base {
  position: absolute;
  inset: 0;
  background-color: #0C1210;
  z-index: 0;
}

.hero__bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.55;
  z-index: 1;
}

.hero__bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(12,18,16,0.7) 0%, rgba(12,18,16,0.4) 40%, rgba(12,18,16,0.85) 100%);
  z-index: 2;
}

/* --- Glow accent (dark variants) --- */
.hero__glow {
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(80px);
  z-index: 3;
  pointer-events: none;
}

.hero--primary .hero__glow {
  background: radial-gradient(ellipse, var(--color-primary) 0%, transparent 70%);
}

.hero--accent .hero__glow {
  background: radial-gradient(ellipse, var(--color-accent) 0%, transparent 70%);
}

.hero--ai .hero__glow {
  background: radial-gradient(ellipse, var(--state-ai) 0%, transparent 70%);
}

/* --- Subtle variant (light) --- */
.hero__bg-subtle {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-bg) 100%);
  z-index: 0;
}

.hero--subtle {
  background-color: var(--color-bg);
}

.hero--subtle .hero__title {
  color: var(--color-text-primary);
}

.hero--subtle .hero__subtitle {
  color: var(--color-text-secondary);
}

.hero--subtle .hero__icon {
  color: var(--color-primary);
}

/* ===== Content layout ===== */
.hero__inner {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  max-width: var(--bp-xl);
  margin: 0 auto;
  padding: 120px var(--space-6) 80px;
  width: 100%;
}

.hero__content {
  flex: 1;
  min-width: 0;
}

/* --- Typography --- */
.hero__icon {
  display: inline-block;
  font-size: 3rem;
  margin-bottom: var(--space-4);
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 48px);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
}

.hero__subtitle {
  font-family: var(--font-body);
  font-size: clamp(14px, 1.5vw, 18px);
  color: rgba(255, 255, 255, 0.7);
  margin-top: var(--space-4);
  line-height: var(--leading-normal);
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.hero__actions {
  margin-top: var(--space-8);
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}

.hero__extra {
  flex-shrink: 0;
}

/* ===== Compact mode ===== */
.hero--compact {
  min-height: 320px;
}

.hero--compact .hero__inner {
  padding-top: 80px;
  padding-bottom: 48px;
}

.hero--compact .hero__title {
  font-size: clamp(20px, 3vw, 36px);
}

.hero--compact .hero__icon {
  font-size: 2.25rem;
  margin-bottom: var(--space-3);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .hero__inner {
    padding: var(--space-10) var(--space-4) var(--space-8);
    flex-direction: column;
    gap: var(--space-6);
  }

  .hero--compact .hero__inner {
    padding-top: var(--space-10);
    padding-bottom: var(--space-6);
  }

  .hero__title {
    font-size: clamp(20px, 5vw, 32px);
  }

  .hero__glow {
    width: 300px;
    height: 200px;
    filter: blur(60px);
  }
}
</style>
