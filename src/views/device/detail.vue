<template>
  <div class="device-detail">
    <van-nav-bar
      :title="deviceName"
      left-arrow
      @click-left="onBack"
    />

    <van-cell-group inset title="基本信息">
      <van-cell title="设备ID" :value="deviceId" />
      <van-cell title="设备类型" :value="deviceInfo.type" />
      <van-cell title="安装位置" :value="deviceInfo.location" />
      <van-cell title="设备状态">
        <template #value>
          <van-tag :type="getStatusType(deviceInfo.status)">
            {{ getStatusText(deviceInfo.status) }}
          </van-tag>
        </template>
      </van-cell>
      <van-cell title="最后更新" :value="deviceInfo.lastUpdate" />
    </van-cell-group>

    <van-cell-group inset title="实时数据">
      <!-- 这里可以根据设备类型显示不同的数据 -->
      <template v-if="deviceInfo.type === '温湿度传感器'">
        <van-cell title="温度" value="25.6℃" />
        <van-cell title="湿度" value="65%" />
      </template>
      <template v-else-if="deviceInfo.type === '空气质量检测器'">
        <van-cell title="PM2.5" value="35μg/m³" />
        <van-cell title="CO2" value="800ppm" />
      </template>
    </van-cell-group>

    <van-cell-group inset title="操作">
      <van-cell title="远程控制" is-link @click="showControl" />
      <van-cell title="历史数据" is-link @click="showHistory" />
      <van-cell title="设备设置" is-link @click="showSettings" />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const deviceId = route.params.id as string
const deviceName = route.query.name as string

const deviceInfo = ref({
  type: '温湿度传感器',
  location: '一号车间',
  status: 'online',
  lastUpdate: '2024-03-20 15:30'
})

const getStatusType = (status: string) => {
  const types = {
    online: 'success',
    offline: 'default',
    alarm: 'danger'
  }
  return types[status as keyof typeof types]
}

const getStatusText = (status: string) => {
  const texts = {
    online: '在线',
    offline: '离线',
    alarm: '报警'
  }
  return texts[status as keyof typeof texts]
}

const showControl = () => {
  // 实现远程控制逻辑
}

const showHistory = () => {
  // 实现历史数据查看逻辑
}

const showSettings = () => {
  // 实现设备设置逻辑
}

const onBack = () => {
  router.back()
}

onMounted(() => {
  // 加载设备详情数据
  console.log('加载设备详情', deviceId)
})
</script>

<style scoped>
.device-detail {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
}

:deep(.van-cell-group) {
  margin: 12px 16px;
}
</style> 