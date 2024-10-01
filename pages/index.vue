<script setup lang="ts">
const { page, count, pagePlus } = usePageResult()

const { data: repos, status } = await useFetchRepos({ lazy: true, query: { page, count } })

const repoPageItems = computed(() => {
  return repos.value?.items;
})
</script>

<template>

  <Head>
    <Title>镜像列表</Title>
  </Head>
  <div class="space-y-4">
    <search />
    <div v-if="!$route.query.keyword" class="space-y-4">
      <n-card>
        <n-h1>初来乍到？</n-h1>
        <n-text>
          请阅读我们的<nuxt-link class="text-primary hover:underline" to="/docs">文档</nuxt-link>来了解如何使用这个镜像站。
        </n-text>
      </n-card>
      <n-h1>镜像列表</n-h1>
      <n-spin v-if="status === 'pending'" class="w-full pt-14">
        <template #description>
          神奇镜像在哪里？
        </template>
      </n-spin>
      <div v-else-if="status === 'success' && repos" class="space-y-4">
        <client-only>
          <n-collapse accordion>
            <repo-item v-for="repo in repoPageItems" :repo="repo" :key="repo.apiId" />
          </n-collapse>
          <template #fallback>
            <repo-item v-for="repo in repoPageItems" :repo="repo" :key="repo.apiId" />
          </template>
        </client-only>
        <div class="flex justify-end">
          <n-pagination v-model:page="pagePlus" :page-count="Math.ceil(repos.totalCount / count)" />
        </div>
      </div>
    </div>
  </div>
</template>