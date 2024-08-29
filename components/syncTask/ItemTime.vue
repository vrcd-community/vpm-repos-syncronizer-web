<script setup lang="ts">
const props = defineProps<{
  startTime: string
  endTime?: string
}>()

const startTimeDate = computed(() => new Date(props.startTime))
const endTimeDate = computed(() => props.endTime ? new Date(props.endTime) : undefined)
</script>

<template>
  <div class="flex flex-col">
    <n-text class="text-xs" depth="2">
      <Icon name="mdi:calendar-clock" />
      同步开始于 <nuxt-time :datetime="startTimeDate" dateStyle="full" time-style="long" />
    </n-text>
    <n-text v-if="endTime" class="text-xs" depth="2">
      <Icon name="mdi:calendar-check" />
      同步结束于 <nuxt-time :datetime="endTimeDate" dateStyle="full" time-style="long" />
    </n-text>
  </div>
</template>