<script setup lang="ts">
// https://github.com/nuxt-modules/mdc/blob/7fc7112b3a5cccab25c220ee955c27e6e71eba8b/src/runtime/components/prose/ProseImg.vue

import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})
</script>

<template>
  <div>
    <NuxtImg
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="m-0 mx-auto rounded-md"
    />
    <span class="block text-center text-xs my-2">{{ alt }}</span>
  </div>
</template>
