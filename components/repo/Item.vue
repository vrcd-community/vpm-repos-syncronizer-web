<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <client-only>
    <!-- 大屏幕显示 -->
    <n-collapse-item class="hidden xl:block">
      <template #header>
        <repo-header-title :repo="repo" />
      </template>
      <template #header-extra>
        <repo-header-action show-browser-button :repo-api-id="repo.apiId" :repo-url="repo.repoUrl" />
      </template>
      <div class="mx-5">
        <repo-description :repo="repo" />
      </div>
    </n-collapse-item>

    <!-- 小屏幕卡片显示 -->
    <div class="block xl:hidden">
      <div class="p-4 rounded-lg border mt-8 border-[#ffffff17] hover:border-[#ffffff30] transition-colors">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <repo-header-title :repo="repo" />
            <repo-header-action show-browser-button :repo-api-id="repo.apiId" :repo-url="repo.repoUrl" />
          </div>
          <repo-description :repo="repo" />
        </div>
      </div>
    </div>

    <template #fallback>
      <div class="flex pb-4 border-b-[1px] border-[#ffffff17]">
        <repo-header-title class="flex-1" :repo="repo" />
        <repo-header-action show-browser-button :repo-api-id="repo.apiId" :repo-url="repo.repoUrl" />
      </div>
    </template>
  </client-only>
</template>