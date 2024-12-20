<template>
  <div class="welcome-container" @click="handleStart">
    <van-row justify="center" class="welcome-content">
      <van-col span="24">
        <img src="../assets/logo.svg" alt="logo" class="logo">
        <h1 class="title">物联网设备管理系统</h1>
        <p class="subtitle">智能管理，便捷监控</p>
      </van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleStart = () => {
  router.push('/login')
}
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  cursor: pointer;
  user-select: none;
}

.welcome-content {
  padding-top: 30vh;
  text-align: center;
}

.logo {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  animation: rotate 20s linear infinite;
}

.title {
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 12px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin-bottom: 40px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 