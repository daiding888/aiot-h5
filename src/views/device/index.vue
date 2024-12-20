<template>
  <div class="device-container">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="设备管理"
      left-arrow
      @click-left="onBack"
    />
    
    <!-- 搜索栏 -->
    <van-search
      v-model="searchKey"
      placeholder="请输入设备名称或ID"
      @search="onSearch"
    />

    <!-- 设备列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group inset v-for="device in deviceList" :key="device.id">
          <van-cell :title="device.name" :label="device.id">
            <template #right-icon>
              <van-tag :type="device.online ? 'success' : 'danger'">
                {{ device.online ? '在线' : '离线' }}
              </van-tag>
            </template>
          </van-cell>
          <van-cell title="设备状态" :value="device.status" />
          <van-cell title="最后更新" :value="device.lastUpdate" />
        </van-cell-group>
      </van-list>
    </van-pull-refresh>

    <!-- 添加设备按钮 -->
    <van-floating-button
      icon="plus"
      type="primary"
      @click="showAddDevice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 搜索相关
const searchKey = ref('')
const onSearch = () => {
  // 实现搜索逻辑
  loadDeviceList()
}

// 列表加载相关
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const deviceList = ref([
  {
    id: 'DEV001',
    name: '温湿度传感器',
    online: true,
    status: '正常',
    lastUpdate: '2024-03-20 15:30'
  },
  {
    id: 'DEV002',
    name: '空气质量检测器',
    online: false,
    status: '异常',
    lastUpdate: '2024-03-20 14:20'
  }
])

const loadDeviceList = () => {
  // 实现设备列表加载逻辑
}

const onLoad = () => {
  // 实现加载更多逻辑
  setTimeout(() => {
    finished.value = true
    loading.value = false
  }, 1000)
}

const onRefresh = () => {
  // 实现下拉刷新逻辑
  finished.value = false
  loadDeviceList()
  refreshing.value = false
}

// 返回上一页
const onBack = () => {
  router.back()
}

// 添加设备
const showAddDevice = () => {
  router.push('/device/add')
}
</script>

<style scoped>
.device-container {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 80px;
}

:deep(.van-cell-group--inset) {
  margin: 12px 16px;
}

:deep(.van-floating-button) {
  right: 20px;
  bottom: 20px;
}
</style> 