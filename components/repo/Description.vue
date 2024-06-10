<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <n-descriptions :column="2">
    <n-descriptions-item label="上游地址">
      <text-copy :text="repo.upstreamUrl" tooltip="复制上游地址">复制上游地址</text-copy>
    </n-descriptions-item>
    <n-descriptions-item label="镜像地址">
      <text-copy :text="repo.repoUrl" tooltip="复制镜像地址">复制镜像地址</text-copy>
    </n-descriptions-item>
    <n-descriptions-item label="同步开始时间">
      <nuxt-time :datetime="repo.syncStatus.syncStarted" dateStyle="full" time-style="long" />
    </n-descriptions-item>
    <n-descriptions-item label="同步结束时间">
      <nuxt-time :datetime="repo.syncStatus.syncEnded" dateStyle="full" time-style="long" />
    </n-descriptions-item>
  </n-descriptions>
  <n-divider />
  <n-text>仓库描述~</n-text>
</template>