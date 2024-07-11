<script setup lang="ts">
const { data: repos, pending: loading } = await useFetchRepos({ lazy: true })
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
      <n-spin v-if="loading" class="w-full pt-14">
        <template #description>
          神奇镜像在哪里？
        </template>
      </n-spin>
      <div v-else class="space-y-4">
        <n-collapse accordion>
          <repo-item v-for="repo in repos" :repo="repo" :key="repo.apiId" />
        </n-collapse>
      </div>
    </div>
  </div>
</template>