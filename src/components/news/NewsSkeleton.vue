<template>
  <div class="skeleton-card">
    <el-skeleton-item variant="image" class="skeleton-card__image" />
    <div class="skeleton-card__content">
      <el-skeleton-item variant="h3" class="skeleton-card__title" />
      <el-skeleton-item variant="text" class="skeleton-card__line" />
      <el-skeleton-item variant="text" class="skeleton-card__line skeleton-card__line--short" />
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.skeleton-card__image {
  width: 100%;
  height: 200px;
}

.skeleton-card__content {
  padding: 14px;
}

.skeleton-card__title {
  width: 80%;
  height: 20px;
  margin-bottom: 10px;
}

.skeleton-card__line {
  height: 14px;
  margin-bottom: 6px;
}

.skeleton-card__line--short {
  width: 60%;
}
</style>
