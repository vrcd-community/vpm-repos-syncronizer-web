<script setup lang="ts">
const { page, count, first } = usePageResult()

const { data: repos, status } = useFetchRepos({ lazy: true, query: { page, count } })

useHead({ title: '镜像列表' })

const repoPageItems = computed(() => {
  return repos.value?.items
})
</script>

<template>
  <div class="space-y-4">
    <AppSearch />
    <div
      v-if="!$route.query.keyword"
      class="space-y-4"
    >
      <Panel header="初来乍到？">
        <p>
          请阅读我们的<RouterLink
            class="text-primary hover:underline"
            to="/docs"
          >
            文档
          </RouterLink>来了解如何使用这个镜像站。
        </p>
      </Panel>
      <h1 class="font-semibold text-2xl text-color">
        镜像列表
      </h1>
      <div
        v-if="status == 'pending'"
        class="flex items-center pt-14"
      >
        <ProgressSpinner />
      </div>
      <div
        v-else-if="status === 'success' && repos"
        class="space-y-4"
      >
        <Accordion lazy>
          <RepoItem
            v-for="repo in repoPageItems"
            :key="repo.apiId"
            :repo="repo"
          />
        </Accordion>
        <div class="flex justify-end">
          <Paginator
            v-model:first="first"
            v-model:rows="count"
            :total-records="repos.totalCount"
            :rows-per-page-options="[10, 20, 30]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
