<template>
  <div class="error-container">
    <div class="error-content">
      <h1>500</h1>
      <h2>服务器内部错误</h2>
      <p>服务器遇到了内部错误，请稍后再试</p>
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
  color: #ff4d4f;
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