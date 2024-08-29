<script setup lang="ts">
const props = defineProps<{
  status: number
  endedTime?: string
  startedTime: string
}>()

const time = computed(() => {
  if (props.status === 1) {
    return props.startedTime
  }

  return props.endedTime
})

const statusText = computed(() => {
  switch (props.status) {
    case 0:
      return `正在同步，同步开始于 `
    case 1:
      return `同步成功于 `
    case 2:
      return `同步失败于 `
    case 3:
      return '同步中断'
    default:
      return '未知'
  }
})

const badgeColor = computed(() => {
  switch (props.status) {
    case 0:
      return `info`
    case 1:
      return `success`
    case 2:
      return `error`
    case 3:
      return 'warning'
    default:
      return 'warning'
  }
})
</script>

<template>
  <n-tag size="small" :bordered="false" :type="badgeColor">
    {{ statusText }}
    <nuxt-time :datetime="time" dateStyle="full" time-style="long" />
  </n-tag>
</template>