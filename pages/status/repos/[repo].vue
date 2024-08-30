<script setup lang="ts">
definePageMeta({
  layout: 'sync-status'
})

const route = useRoute()

const { data: tasks } = await useFetchRepoSyncTasks(String(route.params.repo), 100, 0)
const { data: repo } = await useFetchRepo(String(route.params.repo), { lazy: true })
</script>

<template>

  <Head>
    <Title>{{ route.params.repo }} 的所有同步任务</Title>
  </Head>
  <div class="mb-4">
    <n-h1>{{ route.params.repo }} 的所有同步任务</n-h1>
    <n-text>在此查看 {{ route.params.repo }} 的所有同步任务</n-text>
  </div>
  <div class="mb-7">
    <RepoDescription v-if="repo" :repo="repo" />
  </div>
  <n-list hoverable clickable>
    <n-list-item v-for="task in tasks">
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
  <n-text>按理来说这里应该有一个分页，但是我懒得做了。</n-text>
</template>