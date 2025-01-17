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

  return props.endedTime ?? 0
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
    case 4:
      return '等待开始'
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
      return `danger`
    case 3:
      return 'warn'
    case 4:
      return 'secondary'
    default:
      return 'warn'
  }
})
</script>

<template>
  <Tag size="small" :severity="badgeColor">
    {{ statusText }}
    <nuxt-time :datetime="time" dateStyle="full" time-style="long" />
  </Tag>
</template>