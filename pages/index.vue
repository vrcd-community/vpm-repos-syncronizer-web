<script setup lang="ts">
const { page, count, first } = usePageResult()

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
    <Search />
    <div v-if="!$route.query.keyword" class="space-y-4">
      <Panel header="初来乍到？">
        <p>请阅读我们的<NuxtLink class="text-primary hover:underline" to="/docs">文档</NuxtLink>来了解如何使用这个镜像站。</p>
      </Panel>
      <h1 class="font-semibold text-2xl text-color">镜像列表</h1>
      <div v-if="status == 'pending'" class="flex items-center pt-14">
        <ProgressSpinner />
      </div>
      <div v-else-if="status === 'success' && repos" class="space-y-4">
        <Accordion lazy>
          <RepoItem v-for="repo in repoPageItems" :repo="repo" :key="repo.apiId" />
        </Accordion>
        <div class="flex justify-end">
          <Paginator v-model:first="first" v-model:rows="count" :totalRecords="repos.totalCount"
            :rowsPerPageOptions="[10, 20, 30]" />
        </div>
      </div>
    </div>
  </div>
</template>