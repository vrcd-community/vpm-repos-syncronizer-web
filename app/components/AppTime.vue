<script setup lang="ts">
const props = withDefaults(defineProps<{
  datetime: string | number | Date
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle']
}>(), {
  dateStyle: 'medium',
  timeStyle: undefined,
})

const date = computed(() => new Date(props.datetime))
const formatted = computed(() => new Intl.DateTimeFormat('zh-CN', {
  dateStyle: props.dateStyle,
  timeStyle: props.timeStyle,
}).format(date.value))
</script>

<template>
  <time :datetime="date.toISOString()">{{ formatted }}</time>
</template>
