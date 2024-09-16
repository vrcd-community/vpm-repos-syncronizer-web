<script setup lang="ts">
definePageMeta({
  layout: 'sync-status'
})

const { page, count, pagePlus } = usePageResult()

const route = useRoute()

const { data: tasks, status: syncTaskLoadingStatus } = await useFetchSyncTasks({ lazy: true, query: { page, count, repoId: route.params.repo } })
const { data: repo, status: repoLoadingStatus } = await useFetchRepo(String(route.params.repo), { lazy: true })
</script>

<template>

  <Head>
    <Title>{{ route.params.repo }} 的所有同步任务</Title>
  </Head>
  <div class="mb-4">
    <n-h1>{{ route.params.repo }} 的所有同步任务</n-h1>
    <n-text>在此查看 {{ route.params.repo }} 的所有同步任务</n-text>
  </div>
  <n-spin v-if="repoLoadingStatus === 'pending'" class="w-full pt-14">
    <template #description>
      正在获取仓库信息
    </template>
  </n-spin>
  <div v-else-if="repoLoadingStatus === 'success' && repo" class="mb-7">
    <RepoDescription v-if="repo" :repo="repo" />
  </div>
  <n-spin v-if="syncTaskLoadingStatus === 'pending'" class="w-full pt-14">
    <template #description>
      正在获取同步任务
    </template>
  </n-spin>
  <div v-else-if="syncTaskLoadingStatus === 'success' && tasks" class="space-y-4">
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
    <div class="flex justify-end">
      <n-pagination v-model:page="pagePlus" :page-count="Math.ceil(tasks.totalCount / count)" />
    </div>
  </div>
</template>