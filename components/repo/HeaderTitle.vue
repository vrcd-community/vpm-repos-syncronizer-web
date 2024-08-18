<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="space-x-2">
      <n-text class="font-semibold">{{ repo.apiId }}</n-text>
      <status-tag :status="repo.syncStatus.status" :ended-time="repo.syncStatus.endTime"
        :started-time="repo.syncStatus.startTime" />
    </div>
    <div class="flex items-center">
      <n-text>由 {{ repo.author }} 提供</n-text>
      <n-divider vertical />
      <text-copy :text="repo.upstreamId" tooltip="复制仓库 ID" />
    </div>
  </div>
</template>