<template>
  <Head>
    <Title>镜像列表</Title>
  </Head>
  <div class="space-y-4">
    <UCard class="max-w-none">
      <h2 class="text-2xl font-bold mb-2">初来乍到？</h2>
      <p>请阅读我们的<NuxtLink class="text-primary hover:underline" to="/docs">文档</NuxtLink>来了解如何使用这个镜像站。
      </p>
    </UCard>
    <UCard>
      <h2 class="text-2xl font-bold mb-4">镜像列表</h2>
      <UProgress animation="carousel" v-if="loading" />
      <UVerticalNavigation v-if="!loading" :links="links" :ui="{ label: 'truncate relative text-xl font-semibold' }">
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

              <UTooltip text="添加到 VCC" :popper="{ placement: 'top' }" class="sm:inline hidden">
                <!-- 不要移除这个 ClientOnly，否则会出现一些匪夷所思的问题 -->
                <ClientOnly>
                  <UButton @click.stop :to="'vcc://vpm/addRepo?url=' + link.repoUrl" class="h-5 m-0" size="2xs"
                    variant="outline" icon="i-heroicons-plus" />
                </ClientOnly>
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

const { data: repos, pending: loading } = await useFetchRepos({ lazy: true })

const links = repos.value?.map(item => {
  return {
    label: item.apiId,
    badge: getStatusText(item.syncStatus.status, new Date(item.syncStatus.syncEnded).toLocaleString(), new Date(item.syncStatus.syncStarted).toLocaleString()),
    upstream: item.upstreamUrl,
    syncEnded: new Date(item.syncStatus.syncEnded).toLocaleString(),
    syncStarted: new Date(item.syncStatus.syncStarted).toLocaleString(),
    id: item.apiId,
    to: `/repos/${item.apiId}`,
    repoUrl: item.repoUrl
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