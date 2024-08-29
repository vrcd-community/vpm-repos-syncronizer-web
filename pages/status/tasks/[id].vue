<script setup lang="ts">
definePageMeta({
  layout: 'sync-status'
})

const route = useRoute()

const { data: task } = await useFetchSyncTask(Number(route.params.id))
const { data: log } = await useFetchSyncTaskLog(Number(route.params.id), { lazy: true })
const { data: repo } = await useFetchRepo(task.value?.repoId ?? '', { lazy: true })

const lines = computed(() => {
  return log.value?.split('\n')
    .map(line => {
      const regexResult = /\[\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d (.+?)] \[(.+?)\].+/.exec(line)

      const level = regexResult?.at(1)

      return {
        level,
        levelColor: level === 'INF' ? 'current' : level === 'WRN' ? 'amber' : (level === 'ERR' || level === 'FTL') ? 'red' : 'gray',
        text: line
      }
    })
})
</script>

<template>

  <Head>
    <Title>所有同步任务</Title>
  </Head>
  <div v-if="task" class="mb-4">
    <div class="flex items-baseline space-x-2">
      <SyncTaskStatusIcon :status="task.status" />
      <n-h1>{{ task.repoId }}</n-h1>
      <n-text class="text-xl" depth="3">#{{ task.id }}</n-text>
    </div>
    <div v-if="repo">
      <n-descriptions :column="2">
        <n-descriptions-item label="上游地址">
          <text-copy :text="repo.upstreamUrl" tooltip="复制上游地址">复制上游地址</text-copy>
        </n-descriptions-item>
        <n-descriptions-item label="镜像地址">
          <text-copy :text="repo.repoUrl" tooltip="复制镜像地址">复制镜像地址</text-copy>
        </n-descriptions-item>
        <n-descriptions-item label="同步开始时间">
          <nuxt-time :datetime="task.startTime" dateStyle="full" time-style="long" />
        </n-descriptions-item>
        <n-descriptions-item label="同步结束时间">
          <nuxt-time :datetime="task.endTime" dateStyle="full" time-style="long" />
        </n-descriptions-item>
      </n-descriptions>
    </div>
    <n-h2>任务日志</n-h2>
    <div class="dark:border-gray-700 border rounded-md">
      <div class="flex flex-row items-start space-x-2 p-1 hover:bg-black/5 dark:hover:bg-white/10"
        v-for="(line, index) in lines">
        <div class="flex flex-col w-12 items-end">
          <span class="text-gray-400 text-xs font-mono">{{ index }}</span>
        </div>
        <!-- text-red-500 text-amber-500 text-yellow-500 -->
        <code class="m-0 text-xs flex-1" :class="['text-' + line.levelColor + '-500']">{{ line.text }}</code>
      </div>
    </div>
  </div>
</template>