<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <div class="flex">
    <RepoHeaderTitle :repo="repo" class="flex-1" />
    <RepoHeaderAction :repo-api-id="repo.apiId" :repo-url="repo.repoUrl" />
  </div>
</template>