<script setup lang="ts">
import type { SyncTaskStatus } from '~/types/status';

const props = defineProps<{
  status: SyncTaskStatus
}>()

const syncTaskIcon = computed(() => {
  switch (props.status) {
    case 0:
      return 'mdi:sync'
    case 1:
      return 'mdi:checkbox-marked-circle'
    case 2:
      return 'mdi:close-circle'
    case 3:
      return 'mdi:alert-circle'
    case 4:
      return 'mdi:clock-time-four-outline'
    default:
      return 'mdi:help-circle'
  }
})

const syncTaskDescription = computed(() => {
  switch (props.status) {
    case 0:
      return '正在同步'
    case 1:
      return '同步成功'
    case 2:
      return '同步错误'
    case 3:
      return '同步中断'
    case 4:
      return '等待开始'
    default:
      return '状态未知'
  }
})

const syncTaskColor = computed(() => {
  switch (props.status) {
    case 0:
      return 'text-current'
    case 1:
      return 'text-green-500'
    case 2:
      return 'text-red-500'
    case 3:
      return 'text-amber-400'
    case 4:
      return 'text-gray-400'
    default:
      return 'text-gray-400'
  }
})
</script>

<template>
  <div class="flex flex-col items-center space-y-1">
    <!-- text-green-500 text-red-500 text-gray-400 text-amber-400 text-current -->
    <Icon :name="syncTaskIcon" class="size-6" :class="syncTaskColor" />
    <span>{{ syncTaskDescription }}</span>
  </div>
</template>