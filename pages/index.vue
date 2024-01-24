<template>
  <div class="space-y-4">
    <UCard class="max-w-none">
      <h2 class="text-2xl font-bold mb-2">初来乍到？</h2>
      <p>请阅读我们的<NuxtLink class="text-primary hover:underline" to="/docs">文档</NuxtLink>来了解如何使用这个镜像站。
      </p>
    </UCard>
    <UCard>
      <h2 class="text-2xl font-bold mb-4">镜像列表</h2>
      <UVerticalNavigation :links="links" :ui="{ label: 'truncate relative text-xl font-semibold' }">
        <template #default="{ link }">
          <div class="flex-1 flex items-center justify-between relative truncate">
            <div class="space-x-2 flex items-center">
              <span class="font-bold">{{ link.label }}</span>
              <code
                class="bg-slate-200 dark:bg-slate-950 px-2 py-0 rounded sm:inline-block hidden">https://vpm.vrczh.org/vpm/{{ link.id }}</code>
              <UTooltip text="复制仓库链接" :popper="{ placement: 'top' }" class="sm:inline hidden">
                <UButton @click.prevent="copy(`https://vpm.vrczh.org/vpm/${link.id}`)" class="h-5 m-0" size="2xs"
                  variant="outline" icon="i-heroicons-clipboard-document" />
              </UTooltip>
              <UTooltip text="这是仓库描述~" :popper="{ placement: 'top' }" class="md:inline-block hidden">
                <div class="flex items-center space-x-1">
                  <span>仓库描述</span>
                  <Icon name="i-heroicons-information-circle-solid" size="1.2rem" />
                </div>
              </UTooltip>
            </div>
            <div class="space-x-2 items-center lg:flex hidden">
              <code class="bg-slate-200 dark:bg-slate-950 px-2 py-0 rounded block">{{ link.upstream }}</code>
            </div>
          </div>
        </template>
      </UVerticalNavigation>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { VerticalNavigationLink } from '@nuxt/ui/dist/runtime/types/vertical-navigation';
import type { SyncStatus } from '@/types/status'

const { data: status } = await useFetch<SyncStatus[]>('https://vpm.vrczh.org/status/sync')

const links = status.value?.map(item => {
  return {
    label: item.id,
    badge: getStatusText(item.status, new Date(item.syncEnded).toLocaleString(), new Date(item.syncStarted).toLocaleString()),
    upstream: item.url,
    syncEnded: new Date(item.syncEnded).toLocaleString(),
    syncStarted: new Date(item.syncStarted).toLocaleString(),
    id: item.id,
    to: `/repos/${item.id}`
  } as VerticalNavigationLink
}) as VerticalNavigationLink[]

function getStatusText(input: number, endedTime: string, startedTime: string) {
  switch (input) {
    case 0:
      return `✅同步成功于 ${endedTime}`
    case 1:
      return `🔃正在同步，同步开始于 ${startedTime}`
    case 2:
      return `❌同步失败于 ${endedTime}`
    case 3:
      return '未同步'
    default:
      return '❔未知'
  }
}

function copy(input: string) {
  navigator.clipboard.writeText(input)
}
</script>