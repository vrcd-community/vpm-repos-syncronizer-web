<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>(), {
  src: '',
  alt: '',
  width: undefined,
  height: undefined,
})

const refinedSrc = computed(() => {
  if (!props.src.startsWith('/') || props.src.startsWith('//')) return props.src
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${props.src}`
})
</script>

<template>
  <div>
    <img
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="m-0 mx-auto rounded-md"
    >
    <span class="block text-center text-xs my-2">{{ alt }}</span>
  </div>
</template>
