<template>
  <div id="app">
    <router-view />
    <AppFooter />
    <AiChatFab />
  </div>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AiChatFab from '@/components/ai/AiChatFab.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

/* ===== FitNews Brand Design System — 活力运动风 ===== */
:root {
  /* --- Brand Colors --- */
  --color-primary: #1B6B3A;
  --color-primary-light: #238B4D;
  --color-primary-dark: #145230;
  --color-primary-50: #E8F5EC;
  --color-primary-100: #C8E6D0;
  --color-primary-200: #A3D4B0;
  --color-primary-500: #1B6B3A;
  --color-primary-600: #145230;
  --color-primary-700: #0F3D24;

  /* --- Accent --- */
  --color-accent: #F97316;
  --color-accent-light: #FB923C;
  --color-accent-dark: #EA580C;
  --color-accent-50: #FFF7ED;
  --color-accent-100: #FFEDD5;

  /* --- Neutral Palette --- */
  --color-bg: #FAFAF8;
  --color-bg-warm: #F5F3EF;
  --color-bg-card: #FFFFFF;
  --color-surface: #F0EFEB;
  --color-border: #E5E3DD;
  --color-border-light: #EDEBE6;

  --color-text-primary: #1A1A1A;
  --color-text-secondary: #5A5A55;
  --color-text-tertiary: #8A8A82;
  --color-text-inverse: #FFFFFF;

  /* --- State Colors --- */
  --state-success: #16A34A;
  --state-warning: #D97706;
  --state-error: #DC2626;
  --state-info: #2563EB;

  /* --- Typography --- */
  --font-display: 'DM Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --font-body: 'DM Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  --leading-tight: 1.2;
  --leading-snug: 1.35;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  /* --- Spacing --- */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;

  /* --- Border Radius --- */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* --- Shadows --- */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.04);
  --shadow-lg: 0 4px 16px rgba(0,0,0,0.05);
  --shadow-xl: 0 8px 32px rgba(0,0,0,0.06);

  /* --- Element Plus overrides --- */
  --el-color-primary: var(--color-primary);
  --el-color-primary-light-3: var(--color-primary-light);
  --el-color-primary-light-5: #3DA068;
  --el-color-primary-light-7: #7BC89A;
  --el-color-primary-light-8: #A3D4B0;
  --el-color-primary-light-9: #C8E6D0;
  --el-color-primary-dark-2: var(--color-primary-dark);
  --el-font-family: var(--font-body);
  --el-border-radius-base: var(--radius-md);
  --el-border-radius-round: var(--radius-full);
  --el-bg-color: var(--color-bg);
  --el-bg-color-page: var(--color-bg);
  --el-text-color-primary: var(--color-text-primary);
  --el-text-color-regular: var(--color-text-secondary);
  --el-text-color-secondary: var(--color-text-tertiary);
  --el-border-color: var(--color-border);
  --el-border-color-light: var(--color-border-light);
  --el-fill-color-blank: var(--color-bg-card);
}

/* ===== Dark mode ===== */
html.dark {
  --color-bg: #0F1110;
  --color-bg-warm: #161816;
  --color-bg-card: #1C1E1C;
  --color-surface: #242624;
  --color-border: #2E302E;
  --color-border-light: #252725;
  --color-text-primary: #F0F0EC;
  --color-text-secondary: #A0A098;
  --color-text-tertiary: #6A6A62;
  --color-primary-50: #0F2A18;
  --color-primary-100: #163D22;
  --color-accent-50: #2A1A08;
  --color-accent-100: #3D2510;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.2);
  --shadow-lg: 0 4px 16px rgba(0,0,0,0.25);
  --shadow-xl: 0 8px 32px rgba(0,0,0,0.3);

  --el-bg-color: var(--color-bg);
  --el-bg-color-page: var(--color-bg);
  --el-text-color-primary: var(--color-text-primary);
  --el-text-color-regular: var(--color-text-secondary);
  --el-text-color-secondary: var(--color-text-tertiary);
  --el-border-color: var(--color-border);
  --el-border-color-light: var(--color-border-light);
  --el-fill-color-blank: var(--color-bg-card);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app > :first-child {
  flex: 1;
}

#app > .app-footer {
  margin-top: auto;
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: var(--radius-full); }
::-webkit-scrollbar-thumb:hover { background: var(--color-text-tertiary); }

/* ===== Element Plus fine-tune overrides ===== */
.el-button--primary {
  --el-button-bg-color: var(--color-primary);
  --el-button-border-color: var(--color-primary);
  --el-button-hover-bg-color: var(--color-primary-light);
  --el-button-hover-border-color: var(--color-primary-light);
  --el-button-active-bg-color: var(--color-primary-dark);
  --el-button-active-border-color: var(--color-primary-dark);
  font-weight: 500;
}

.el-button {
  font-weight: 500;
  transition: all 0.2s ease;
}

.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 2px rgba(27, 107, 58, 0.1) !important;
}

.el-tag {
  --el-tag-bg-color: var(--color-primary-50);
  --el-tag-border-color: var(--color-primary-100);
  --el-tag-text-color: var(--color-primary);
  font-weight: 500;
}

.el-pagination .el-pager li.is-active {
  background-color: var(--color-primary);
  color: #fff;
}

.el-select .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 2px rgba(27, 107, 58, 0.1) !important;
}

.el-select-dropdown__item.is-selected {
  color: var(--color-primary);
  font-weight: 600;
}

.el-card {
  --el-card-border-color: var(--color-border-light);
  --el-card-border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
}

/* ===== Print styles ===== */
@media print {
  body {
    background: #fff !important;
    color: #000 !important;
  }
  .navbar,
  .app-footer,
  .hero-banner,
  .filter-bar,
  .detail-sidebar,
  .trending-sidebar,
  .article-toolbar,
  .comment-section,
  .reading-progress,
  .el-pagination,
  .news-sidebar,
  nav,
  footer,
  button,
  .el-button {
    display: none !important;
  }
  .detail-layout {
    display: block !important;
    max-width: 100% !important;
    padding: 0 !important;
  }
  .detail-main {
    max-width: 100% !important;
  }
  .article-body {
    font-size: 12pt !important;
    line-height: 1.6 !important;
  }
  .article-body a::after {
    content: ' (' attr(href) ')';
    font-size: 0.8em;
    color: #666;
  }
  .article-cover img {
    max-height: 300px !important;
  }
}
</style>
