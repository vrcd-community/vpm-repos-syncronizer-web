<template>
  <Head>
    <Title>同步状态</Title>
  </Head>
  <div class="mb-4">
    <h1 class="font-semibold text-3xl">
      同步状态
    </h1>
    <p>在此查看仓库镜像同步状态</p>
  </div>
  <ProgressSpinner
    v-if="loadingStatus === 'pending'"
    class="w-full pt-14"
  />
  <div
    v-else
    class="space-y-2"
  >
    <NuxtLink
      v-for="task in status"
      :key="task.syncTaskId"
      :to="'/status/tasks/' + task.syncTaskId"
      class="block"
    >
      <Card>
        <template #content>
          <div class="flex items-center space-x-4">
            <SyncTaskStatusIcon
              :status="task.status"
              show-description
            />
            <div class="flex-1 flex flex-col">
              <div class="flex items-baseline space-x-1">
                <h2 class="text-xl font-semibold">{{ task.repoId }}</h2>
                <span class="text-md opacity-50">#{{ task.syncTaskId }}</span>
              </div>
              <p class="mb-1 text-xs  opacity-50">{{ task.repoUpstreamUrl }}</p>
              <p class="text-xs opacity-60">{{ task.message ? task.message : '无状态消息' }}</p>
            </div>
            <SyncTaskItemTime
              :start-time="task.syncStarted"
              :end-time="task.syncEnded"
            />
          </div>
        </template>
      </Card>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'sync-status',
})

const { data: status, status: loadingStatus } = await useFetchStatus({ lazy: true })
</script>
