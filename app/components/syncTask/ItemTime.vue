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
    <p class="text-xs opacity-60">
      <i class="pi pi-calendar-plus text-xs" />
      同步开始于
      <NuxtTime
        :datetime="startTimeDate"
        date-style="full"
        time-style="long"
      />
    </p>
    <p
      v-if="endTimeDate"
      class="text-xs opacity-60"
    >
      <i class="pi pi-check-circle text-xs" />
      同步结束于
      <NuxtTime
        :datetime="endTimeDate"
        date-style="full"
        time-style="long"
      />
    </p>
  </div>
</template>
