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

    <!-- 筛选区域 -->
    <van-dropdown-menu>
      <van-dropdown-item 
        v-model="filter.status" 
        :options="statusOptions"
        title="设备状态"
      />
      <van-dropdown-item 
        v-model="filter.type" 
        :options="typeOptions"
        title="设备类型"
      />
      <van-dropdown-item 
        v-model="filter.location" 
        :options="locationOptions"
        title="安装位置"
      />
    </van-dropdown-menu>

    <!-- 设备列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group inset v-for="device in deviceList" :key="device.id">
          <van-cell 
            :title="device.name" 
            :label="device.id"
            is-link
            @click="goToDetail(device)"
          >
            <template #right-icon>
              <van-tag :type="getStatusType(device.status)">
                {{ getStatusText(device.status) }}
              </van-tag>
            </template>
          </van-cell>
          <van-cell title="设备类型" :value="device.type" />
          <van-cell title="安装位置" :value="device.location" />
          <van-cell title="最后更新" :value="device.lastUpdate" />
        </van-cell-group>
      </van-list>
    </van-pull-refresh>

    <!-- 添加设备按钮 -->
    <van-fab
      icon="plus"
      type="primary"
      @click="showAddDevice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 搜索相关
const searchKey = ref('')

// 筛选相关
const filter = reactive({
  status: '',
  type: '',
  location: ''
})

// 状态选项
const statusOptions = [
  { text: '全部', value: '' },
  { text: '在线', value: 'online' },
  { text: '离线', value: 'offline' },
  { text: '报警', value: 'alarm' }
]

// 设备类型选项
const typeOptions = [
  { text: '全部', value: '' },
  { text: '温湿度传感器', value: 'temp' },
  { text: '空气质量检测器', value: 'air' },
  { text: '摄像头', value: 'camera' }
]

// 安装位置选项
const locationOptions = [
  { text: '全部', value: '' },
  { text: '一号车间', value: 'workshop1' },
  { text: '二号车间', value: 'workshop2' },
  { text: '办公区', value: 'office' }
]

// 列表加载相关
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const deviceList = ref([
  {
    id: 'DEV001',
    name: '温湿度传感器',
    type: '温湿度传感器',
    location: '一号车间',
    status: 'online',
    lastUpdate: '2024-03-20 15:30'
  },
  {
    id: 'DEV002',
    name: '空气质量检测器',
    type: '空气质量检测器',
    location: '二号车间',
    status: 'offline',
    lastUpdate: '2024-03-20 14:20'
  },
  {
    id: 'DEV003',
    name: '摄像头',
    type: '摄像头',
    location: '办公区',
    status: 'alarm',
    lastUpdate: '2024-03-20 16:10'
  }
])

// 获取状态类型
const getStatusType = (status: string) => {
  const types = {
    online: 'success',
    offline: 'default',
    alarm: 'danger'
  }
  return types[status as keyof typeof types]
}

// 获取状态文本
const getStatusText = (status: string) => {
  const texts = {
    online: '在线',
    offline: '离线',
    alarm: '报警'
  }
  return texts[status as keyof typeof texts]
}

// 搜索处理
const onSearch = () => {
  refreshing.value = true
  onRefresh()
}

const loadDeviceList = () => {
  // 实现设备列表加载逻辑，需要考虑筛选条件
  console.log('加载设备列表', {
    searchKey: searchKey.value,
    filter
  })
}

const onLoad = () => {
  setTimeout(() => {
    finished.value = true
    loading.value = false
  }, 1000)
}

const onRefresh = () => {
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

// 跳转设备详情
const goToDetail = (device: any) => {
  router.push({
    path: `/device/detail/${device.id}`,
    query: {
      name: device.name
    }
  })
}
</script>

<style scoped>
.device-container {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 80px;
}

:deep(.van-dropdown-menu) {
  position: sticky;
  top: 0;
  z-index: 10;
}

:deep(.van-cell-group--inset) {
  margin: 12px 16px;
}

:deep(.van-fab) {
  right: 20px;
  bottom: 20px;
}

:deep(.van-tag) {
  margin-left: 8px;
}
</style> 