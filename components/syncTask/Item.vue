<script setup lang="ts">
import type { SyncTask } from '~/types/status';

defineProps<{
  task: SyncTask
}>()
</script>

<template>
  <NuxtLink :to="`/status/tasks/${task.id}`" class="block">
    <Card>
      <template #content>
        <div class="flex items-center space-x-4">
          <SyncTaskStatusIcon :status="task.status" />
          <div class="flex-1 flex flex-col">
            <div class="flex items-baseline space-x-1">
              <h2 class="text-xl font-semibold">{{ task.repoId }}</h2>
              <span class="text-md opacity-40">#{{ task.id }}</span>
            </div>
            <!-- <n-text class="mb-1 text-xs" depth="3">{{ task }}</n-text> -->
            <!-- <n-text class="text-xs" depth="2">{{ task.message ? task.message : '无状态消息' }}</n-text> -->
          </div>
          <SyncTaskItemTime :start-time="task.startTime" :end-time="task.endTime" />
        </div>
      </template>
    </Card>
  </NuxtLink>
</template>