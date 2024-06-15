<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <n-collapse-item>
    <template #header>
      <repo-header-title :repo="repo" />
    </template>
    <template #header-extra>
      <repo-header-action show-browser-button :repo-api-id="repo.apiId" :repo-url="repo.repoUrl" />
    </template>
    <div class="mx-5">
      <repo-description :repo="repo" />
    </div>
  </n-collapse-item>
</template>