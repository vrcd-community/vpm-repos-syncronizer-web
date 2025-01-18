<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center space-x-2">
      <h2 class="font-semibold">{{ repo.apiId }}</h2>
      <StatusTag :status="repo.syncStatus.status" :ended-time="repo.syncStatus.syncEnded"
        :started-time="repo.syncStatus.syncStarted" />
    </div>
    <div class="flex items-center">
      <span>由 {{ repo.author }} 提供</span>
      <Divider class="mx-2" layout="vertical" />
      <TextCopy :text="repo.upstreamId" tooltip="复制仓库 ID" />
    </div>
  </div>
</template>