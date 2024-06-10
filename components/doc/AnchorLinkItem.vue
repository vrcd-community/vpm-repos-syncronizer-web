<script setup lang="ts">
import type { TocLink } from '@nuxt/content/types';

const props = defineProps<{
  link: TocLink
}>()
</script>

<template>
  <n-anchor-link :href="'#' + link.id" :title="link.text">
    <anchor-link-item v-for="child in link.children" :link="child" />
  </n-anchor-link>
</template>