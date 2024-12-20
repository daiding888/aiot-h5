<template>
    <div class="home-container">
      <!-- 顶部导航 -->
      <van-nav-bar
        title="物联网设备管理系统"
        fixed
        placeholder
      >
        <!-- 右侧退出按钮 -->
        <template #right>
          <van-icon 
            name="cross" 
            size="20" 
            @click="handleLogout"
          />
        </template>
      </van-nav-bar>
      
      <!-- 数据概览 -->
      <div class="overview">
        <van-grid :border="false" :column-num="2">
          <van-grid-item>
            <div class="stat-card">
              <div class="stat-value">{{ deviceStats.total }}</div>
              <div class="stat-label">设备总数</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="stat-card warning">
              <div class="stat-value">{{ deviceStats.alarm }}</div>
              <div class="stat-label">报警设备</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="stat-card online">
              <div class="stat-value">{{ deviceStats.online }}</div>
              <div class="stat-label">在线设备</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="stat-card offline">
              <div class="stat-value">{{ deviceStats.offline }}</div>
              <div class="stat-label">离线设备</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
  
      <!-- 功能导航 -->
      <div class="menu-section">
        <van-grid :border="false" :column-num="2" :gutter="10">
          <van-grid-item
            v-for="(item, index) in menuList"
            :key="index"
            :icon="item.icon"
            :text="item.name"
            @click="handleMenuClick(item)"
          />
        </van-grid>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { showDialog } from 'vant'
  
  const router = useRouter()
  
  // 设备统计数据
  const deviceStats = reactive({
    total: 256,
    alarm: 5,
    online: 180,
    offline: 76
  })
  
  // 功能菜单列表
  const menuList = [
    {
      name: '设备管理',
      icon: 'apps-o',
      path: '/device'
    },
    {
      name: '数据监控',
      icon: 'chart-trending-o',
      path: '/monitor'
    },
    {
      name: '远程控制',
      icon: 'setting-o',
      path: '/control'
    },
    {
      name: '系统管理',
      icon: 'manager-o',
      path: '/system'
    },
    {
      name: '个人中心',
      icon: 'user-o',
      path: '/profile'
    }
  ]
  
  // 菜单点击处理
  const handleMenuClick = (item: typeof menuList[0]) => {
    router.push(item.path)
  }
  
  // 退出登录
  const handleLogout = () => {
    showDialog({
      title: '提示',
      message: '确认退出登录？',
      showCancelButton: true
    }).then((action) => {
      if (action === 'confirm') {
        // 清除登录信息
        localStorage.removeItem('token')
        // 跳转到登录页
        router.replace('/login')
      }
    })
  }
  </script>
  
  <style scoped>
  .home-container {
    min-height: 100vh;
    background-color: #f7f8fa;
  }
  
  .overview {
    padding: 16px;
    margin-bottom: 20px;
  }
  
  .stat-card {
    padding: 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #1989fa, #0af);
    color: white;
    box-shadow: 0 2px 12px rgba(25, 137, 250, 0.1);
  }
  
  .stat-card.warning {
    background: linear-gradient(135deg, #ff976a, #ff4d4f);
    box-shadow: 0 2px 12px rgba(255, 77, 79, 0.1);
  }
  
  .stat-card.online {
    background: linear-gradient(135deg, #07c160, #10b981);
    box-shadow: 0 2px 12px rgba(7, 193, 96, 0.1);
  }
  
  .stat-card.offline {
    background: linear-gradient(135deg, #969799, #646566);
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.1);
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .stat-label {
    font-size: 14px;
    opacity: 0.9;
  }
  
  .menu-section {
    padding: 0 16px;
  }
  
  :deep(.van-grid-item__content) {
    padding: 16px 8px;
    background-color: white;
    border-radius: 12px;
  }
  
  :deep(.van-grid-item__icon) {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  :deep(.van-grid-item__text) {
    color: #323233;
    font-size: 14px;
  }
  
  :deep(.van-nav-bar__right) {
    padding-right: 16px;
  }
  
  :deep(.van-icon) {
    color: #323233;
  }
  </style>