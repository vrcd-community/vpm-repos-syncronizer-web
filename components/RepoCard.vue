<template>
  <UCard :class="isLink ? 'hover:bg-gray-200 hover:dark:bg-gray-800' : ''">
    <div class="flex space-x-4">
      <div class="flex">
        <Icon name="i-mdi-package" class="h-full w-14" />
      </div>
      <div class="flex-1 space-y-1">
        <div class="flex space-x-2 items-center">
          <h3 class="text-xl font-semibold">{{ repo.name }}</h3>
          <UBadge variant="subtle">{{ repo.apiId }}</UBadge>
          <UBadge variant="subtle">{{ repo.upstreamId }}</UBadge>
          <UBadge :color="getBadgeColorByStatus(repo.syncStatus.status)">{{
            getStatusText(repo.syncStatus.status, repo.syncStatus.syncEnded,
              repo.syncStatus.syncStarted) }}</UBadge>
        </div>
        <p class="text-sm text-slate-400">由 {{ repo.author }} 提供</p>
        <div>
          <div class="flex items-center space-x-1">
            <span class="text-xs text-slate-400">镜像 URL</span>
            <code
              class="bg-slate-200 dark:bg-slate-950 px-2 py-0 rounded sm:inline-block hidden">{{ repo.repoUrl }}</code>
            <UButton @click.prevent="copy(repo.repoUrl)" class="h-5 m-0" size="2xs" variant="outline"
              icon="i-heroicons-clipboard-document" />
          </div>
          <div class="flex items-center space-x-1">
            <span class="text-xs text-slate-400">上游 URL</span>
            <code
              class="bg-slate-200 dark:bg-slate-950 px-2 py-0 rounded sm:inline-block hidden">{{ repo.upstreamUrl }}</code>
            <UButton @click.prevent="copy(repo.upstreamUrl)" class="h-5 m-0" size="2xs" variant="outline"
              icon="i-heroicons-clipboard-document" />
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <UButton @click.stop :to="`vcc://vpm/addRepo?url=${repo.repoUrl}`">添加到 VCC</UButton>
      </div>
      <div class="flex" v-if="isLink">
        <Icon name="i-mdi-arrow-right" class="h-full w-10" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo,
  isLink?: boolean
}>()

function getStatusText(input: number, endedTime: string, startedTime: string) {
  const endedTimeString = new Date(endedTime).toLocaleString()
  const startedTimeString = new Date(startedTime).toLocaleString()

  switch (input) {
    case 0:
      return `同步成功于 ${endedTimeString}`
    case 1:
      return `正在同步，同步开始于 ${startedTimeString}`
    case 2:
      return `同步失败于 ${endedTimeString}`
    case 3:
      return '未同步'
    default:
      return '❔未知'
  }
}

function getBadgeColorByStatus(status: number) {
  switch (status) {
    case 0:
      return 'green'
    case 1:
      return `amber`
    case 2:
      return `red`
    case 3:
      return 'gray'
    default:
      return 'gray'
  }
}

function copy(input: string) {
  navigator.clipboard.writeText(input)
}
</script>