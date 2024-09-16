<script setup lang="ts">
definePageMeta({
  layout: 'sync-status'
})

const { page, count, pagePlus } = usePageResult()

const { data: tasks, status } = await useFetchSyncTasks({ lazy: true, query: { page, count } })
</script>

<template>

  <Head>
    <Title>所有同步任务</Title>
  </Head>
  <div class="mb-4">
    <n-h1>所有同步任务</n-h1>
    <n-text>在此查看所有同步任务</n-text>
  </div>
  <n-spin v-if="status === 'pending'" class="w-full pt-14">
    <template #description>
      正在获取同步任务
    </template>
  </n-spin>
  <div v-else-if="status === 'success' && tasks">
    <n-list hoverable clickable>
      <n-list-item v-for="task in tasks.items">
        <nuxt-link :to="`/status/tasks/${task.id}`">
          <div class="flex items-center space-x-4">
            <SyncTaskStatusIcon :status="task.status" />
            <div class="flex-1 flex flex-col">
              <div class="flex items-baseline space-x-1">
                <h2 class="text-xl font-semibold">{{ task.repoId }}</h2>
                <n-text class="text-md" depth="3">#{{ task.id }}</n-text>
              </div>
              <!-- <n-text class="mb-1 text-xs" depth="3">{{ task }}</n-text> -->
              <!-- <n-text class="text-xs" depth="2">{{ task.message ? task.message : '无状态消息' }}</n-text> -->
            </div>
            <SyncTaskItemTime :start-time="task.startTime" :end-time="task.endTime" />
          </div>
        </nuxt-link>
      </n-list-item>
    </n-list>
    <div class="flex justify-end mt-4">
      <n-pagination v-model:page="pagePlus" :page-count="Math.ceil(tasks.totalCount / count)" />
    </div>
  </div>
</template>