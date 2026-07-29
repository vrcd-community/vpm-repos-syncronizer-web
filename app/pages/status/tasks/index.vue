<script setup lang="ts">
const { page, count, first } = usePageResult()

const { data: tasks, status } = useFetchSyncTasks({ lazy: true, query: { page, count } })

useHead({ title: '所有同步任务' })
</script>

<template>
  <div class="mb-4">
    <h1 class="font-semibold text-3xl">
      所有同步任务
    </h1>
    <p>在此查看所有同步任务</p>
  </div>
  <ProgressSpinner
    v-if="status === 'pending'"
    class="w-full pt-14"
  />
  <div v-else-if="status === 'success' && tasks">
    <div class="space-y-2">
      <SyncTaskItem
        v-for="task in tasks.items"
        :key="task.id"
        :task="task"
      />
    </div>
    <div class="flex justify-end mt-4">
      <Paginator
        v-model:first="first"
        v-model:rows="count"
        :total-records="tasks.totalCount"
        :rows-per-page-options="[10, 20, 30]"
      />
    </div>
  </div>
</template>
