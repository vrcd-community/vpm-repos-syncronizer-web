<script setup lang="ts">
definePageMeta({
  layout: 'sync-status'
})

const { data: tasks } = await useFetchSyncTasks({ lazy: true })
</script>

<template>

  <Head>
    <Title>所有同步任务</Title>
  </Head>
  <div class="mb-4">
    <n-h1>所有同步任务</n-h1>
    <n-text>在此查看所有同步任务</n-text>
  </div>
  <n-list hoverable clickable>
    <n-list-item v-for="task in tasks">
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
        <div class="flex flex-col">
          <n-text class="text-xs" depth="2">
            <Icon name="mdi:calendar-clock" />
            同步开始于 <nuxt-time :date="task.startTime" dateStyle="full" time-style="long" />
          </n-text>
          <n-text v-if="task.endTime" class="text-xs" depth="2">
            <Icon name="mdi:calendar-check" />
            同步结束于 <nuxt-time :date="task.endTime" dateStyle="full" time-style="long" />
          </n-text>
        </div>
      </div>
    </n-list-item>
  </n-list>
  <n-text>按理来说这里应该有一个分页，但是我懒得做了。</n-text>
</template>