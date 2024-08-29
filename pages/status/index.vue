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
      <div class="flex items-center space-x-4">
        <SyncTaskStatusIcon :status="task.status" />
        <div class="flex-1 flex flex-col">
          <div class="flex items-baseline space-x-1">
            <h2 class="text-xl font-semibold">{{ task.repoId }}</h2>
            <n-text class="text-md" depth="3">#{{ task.syncTaskId }}</n-text>
          </div>
          <n-text class="mb-1 text-xs" depth="3">{{ task.repoUpstreamUrl }}</n-text>
          <n-text class="text-xs" depth="2">{{ task.message ? task.message : '无状态消息' }}</n-text>
        </div>
        <SyncTaskItemTime :start-time="task.syncStarted" :end-time="task.syncEnded" />
      </div>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'sync-status'
})

const { data: status, pending: loading } = await useFetchStatus({ lazy: true })
</script>