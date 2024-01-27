<template>
  <UInput v-model="keyword" icon="i-heroicons-magnifying-glass-20-solid" placeholder="在所有的仓库内搜索包..." size="xl" />
  <div v-if="keyword === ''" class="mt-4 space-y-2 flex flex-col">
    <h2 class="text-2xl font-semibold">仓库列表</h2>
    <NuxtLink v-for="repo in repos" :to="'/repos/' + repo.apiId">
      <RepoCard :repo="repo" is-link />
    </NuxtLink>
  </div>
  <div v-else class="mt-4 space-y-2 flex flex-col">
    {{ keyword }}
  </div>
</template>

<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

const { data: repos } = await useFetch<BrowserRepo[]>('https://vpm.vrczh.org/browser/repos')

const keyword = ref('')
</script>