<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <div class="flex">
    <repo-header-title :repo="repo" class="flex-1" />
    <repo-header-action :repo="repo" />
  </div>
</template>