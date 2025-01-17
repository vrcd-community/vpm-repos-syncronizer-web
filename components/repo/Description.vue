<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <h3>上游地址</h3>
      <TextCopy :text="repo.upstreamUrl" tooltip="复制上游地址">复制上游地址</TextCopy>
    </div>
    <div>
      <h3>镜像地址</h3>
      <TextCopy :text="repo.repoUrl" tooltip="复制镜像地址">复制镜像地址</TextCopy>
    </div>
    <div>
      <h3>同步开始时间</h3>
      <NuxtTime :datetime="repo.syncStatus.syncStarted" dateStyle="full" time-style="long" />
    </div>
    <div>
      <h3>同步结束时间</h3>
      <NuxtTime v-if="repo.syncStatus.syncEnded" :datetime="repo.syncStatus.syncEnded" dateStyle="full"
        time-style="long" />
      <p v-else>同步正在进行</p>
    </div>
  </div>
  <Divider />
  <p>{{ repo.description }}</p>
</template>