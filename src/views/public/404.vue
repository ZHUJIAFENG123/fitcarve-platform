<template>
  <div class="error-container">
    <div class="error-content">
      <h1>404</h1>
      <h2>页面不存在</h2>
      <p>您访问的页面不存在或已被删除</p>
      <el-button type="primary" @click="toHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.error-content {
  text-align: center;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.error-content h1 {
  font-size: 72px;
  color: #1890ff;
  margin-bottom: 20px;
}

.error-content h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.error-content p {
  margin-bottom: 30px;
  color: #666;
}
</style>