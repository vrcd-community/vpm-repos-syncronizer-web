<template>

  <Head>
    <Title>同步状态</Title>
  </Head>
  <div class="mb-4">
    <n-h1>同步状态</n-h1>
    <n-text>在此查看仓库镜像同步状态</n-text>
  </div>
  <n-list hoverable clickable>
    <n-list-item v-for="task in status">
      <div class="flex items-center space-x-2">
        <Icon :name="getSyncStatusIcon(task.status)" class="size-6" />
        <div class="flex-1 flex flex-col">
          <div class="flex items-baseline space-x-1">
            <h2 class="text-xl font-semibold">{{ task.repoId }}</h2>
            <n-text class="text-md" depth="3">#{{ task.syncTaskId }}</n-text>
          </div>
          <n-text class="mb-1 text-xs" depth="3">{{ task.repoUpstreamUrl }}</n-text>
          <n-text class="text-xs" depth="2">{{ task.message ? task.message : '无状态消息' }}</n-text>
        </div>
        <div class="flex flex-col">
          <n-text class="text-xs" depth="2">
            <Icon name="mdi:calendar-clock" />
            同步开始于 <nuxt-time :date="task.syncStarted" dateStyle="full" time-style="long" />
          </n-text>
          <n-text v-if="task.syncEnded" class="text-xs" depth="2">
            <Icon name="mdi:calendar-check" />
            同步结束于 <nuxt-time :date="task.syncEnded" dateStyle="full" time-style="long" />
          </n-text>
        </div>
      </div>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
const { data: status, pending: loading } = await useFetchStatus({ lazy: true })

function getSyncStatusIcon(status: 0 | 1 | 2 | 3) {
  switch (status) {
    case 0:
      return 'mdi:sync'
    case 1:
      return 'mdi:checkbox-marked-circle'
    case 2:
      return 'mdi:close-circle'
    case 3:
      return 'mdi:alert-circle'
  }
}
</script>