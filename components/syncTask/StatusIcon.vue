<script setup lang="ts">
import type { SyncTaskStatus } from '~/types/status'

const props = defineProps<{
  status: SyncTaskStatus
  showDescription?: boolean
}>()

const syncTaskIcon = computed(() => {
  switch (props.status) {
    case 0:
      return 'pi-refresh'
    case 1:
      return 'pi-check-circle'
    case 2:
      return 'pi-times-circle'
    case 3:
      return 'pi-exclamation-circle'
    case 4:
      return 'pi-clock'
    default:
      return 'pi-question-circle'
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
  <div class="flex flex-col items-center">
    <!-- text-green-500 text-red-500 text-gray-400 text-amber-400 text-current -->
    <i
      class="text-2xl pi"
      :class="[syncTaskColor, syncTaskIcon]"
    />
    <span v-if="showDescription">{{ syncTaskDescription }}</span>
  </div>
</template>
