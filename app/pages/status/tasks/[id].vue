<script setup lang="ts">
const route = useRoute()
const taskId = computed(() => Number(route.params.id))

const { data: task } = useFetchSyncTask(taskId)
const { data: log } = useFetchSyncTaskLog(taskId, { lazy: true })
const { data: repo } = useFetchRepo(() => task.value?.repoId ?? '', { lazy: true, immediate: false })

useHead({ title: computed(() => task.value ? `${task.value.repoId} #${task.value.id}` : '同步任务') })

const lines = computed(() => {
  return log.value?.split('\n')
    .map((line) => {
      const regexResult = /\[\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d (.+?)] \[(.+?)\].+/.exec(line)

      const level = regexResult?.at(1)

      return {
        level,
        levelColor: level === 'INF' ? 'current' : level === 'WRN' ? 'amber' : (level === 'ERR' || level === 'FTL') ? 'red' : 'gray',
        text: line,
      }
    })
})
</script>

<template>
  <div
    v-if="task"
    class="mb-4 space-y-3"
  >
    <div class="flex items-baseline space-x-2">
      <SyncTaskStatusIcon :status="task.status" />
      <h1 class="text-3xl">
        {{ task.repoId }}
      </h1>
      <span class="text-xl opacity-60">#{{ task.id }}</span>
    </div>
    <div
      v-if="repo"
      class="grid grid-cols-2 gap-4"
    >
      <div>
        <h3>上游地址</h3>
        <TextCopy
          :text="repo.upstreamUrl"
          tooltip="复制上游地址"
        >
          复制上游地址
        </TextCopy>
      </div>
      <div>
        <h3>镜像地址</h3>
        <TextCopy
          :text="repo.repoUrl"
          tooltip="复制镜像地址"
        >
          复制镜像地址
        </TextCopy>
      </div>
      <div>
        <h3>同步开始时间</h3>
        <AppTime
          :datetime="task.startTime"
          date-style="full"
          time-style="long"
        />
      </div>
      <div>
        <h3>同步结束时间</h3>
        <AppTime
          v-if="task.endTime"
          :datetime="task.endTime"
          date-style="full"
          time-style="long"
        />
        <p v-else>
          同步正在进行
        </p>
      </div>
    </div>
    <h2 class="font-semibold text-xl">
      任务日志
    </h2>
    <div class="dark:border-gray-700 border rounded-md text-color">
      <div
        v-for="(line, index) in lines"
        :key="index"
        class="flex flex-row items-start space-x-2 p-1 hover:bg-black/5 dark:hover:bg-white/10"
      >
        <div class="flex flex-col w-12 items-end">
          <span class="text-gray-400 text-xs font-mono">{{ index }}</span>
        </div>
        <!-- text-red-500 text-amber-500 text-yellow-500 -->
        <code
          class="m-0 text-xs flex-1"
          :class="['text-' + line.levelColor + '-500']"
        >{{ line.text }}</code>
      </div>
    </div>
  </div>
</template>
