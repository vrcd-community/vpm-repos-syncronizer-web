<script setup lang="ts">
definePageMeta({
  layout: 'sync-status',
})

const { page, count, first } = usePageResult()

const route = useRoute()

const { data: tasks, status: syncTaskLoadingStatus } = await useFetchSyncTasks({ lazy: true, query: { page, count, repoId: route.params.repo } })
const { data: repo, status: repoLoadingStatus } = await useFetchRepo(String(route.params.repo), { lazy: true })
</script>

<template>
  <Head>
    <Title>{{ route.params.repo }} 的所有同步任务</Title>
  </Head>
  <div class="mb-4">
    <h1 class="font-semibold text-3xl">
      {{ route.params.repo }} 的所有同步任务
    </h1>
    <p>在此查看 {{ route.params.repo }} 的所有同步任务</p>
  </div>
  <ProgressSpinner
    v-if="repoLoadingStatus === 'pending'"
    class="w-full pt-14"
  />
  <div
    v-else-if="repoLoadingStatus === 'success' && repo"
    class="mb-7"
  >
    <RepoDescription
      v-if="repo"
      :repo="repo"
    />
  </div>
  <ProgressSpinner
    v-if="syncTaskLoadingStatus === 'pending'"
    class="w-full pt-14"
  />
  <div
    v-else-if="syncTaskLoadingStatus === 'success' && tasks"
    class="space-y-4"
  >
    <div class="space-y-2">
      <SyncTaskItem
        v-for="task in tasks.items"
        :key="task.id"
        :task="task"
      />
    </div>
    <div class="flex justify-end">
      <Paginator
        v-model:first="first"
        v-model:rows="count"
        :total-records="tasks.totalCount"
        :rows-per-page-options="[10, 20, 30]"
      />
    </div>
  </div>
</template>
