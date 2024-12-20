<template>
  <div class="login-container">
    <div class="login-header">
      <img src="../assets/logo.svg" alt="logo" class="logo">
      <h2 class="title">物联网设备管理系统</h2>
    </div>

    <div class="login-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>

        <div class="submit-btn">
          <van-button 
            round 
            block 
            type="primary" 
            native-type="submit"
            :loading="loading"
          >
            登 录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    // 这里添加实际的登录逻辑
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟登录请求
    
    if (username.value === 'admin' && password.value === 'admin') {
      showToast({
        type: 'success',
        message: '登录成功',
        duration: 1000
      })
      setTimeout(() => {
        router.push('/home')
      }, 1000)
    } else {
      showToast({
        type: 'fail',
        message: '用户名或密码错误'
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-header {
  padding-top: 10vh;
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
}

.login-form {
  padding: 20px;
}

:deep(.van-cell-group--inset) {
  margin: 0;
  border-radius: 12px;
}

:deep(.van-field__label) {
  width: 60px;
}

.submit-btn {
  margin-top: 24px;
  padding: 0 12px;
}

:deep(.van-button--primary) {
  background: linear-gradient(to right, #4481eb, #04befe);
  border: none;
  height: 44px;
}
</style> 