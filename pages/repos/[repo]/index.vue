<template>

  <Head>
    <Title>{{ repo?.name }} 仓库</Title>
  </Head>
  <div class="space-y-4">
    <Breadcrumb :model="[
      { label: '镜像列表', icon: 'pi pi-home', route: '/' },
      { label: route.params.repo.toString(), icon: 'pi pi-box', route: '/repos/' + route.params.repo.toString() }
    ]">
      <template #item="{ item, props }">
        <BreadcrumbTemplate :item="item" :props="props" />
      </template>
    </Breadcrumb>
    <ProgressSpinner v-if="repoLoadingStatus === 'pending'" class="w-full pt-14" />
    <div v-else-if="repoLoadingStatus === 'success' && repo" class="space-y-4">
      <Panel>
        <template #header>
          <div class="w-full">
            <RepoHeader :repo="repo" />
          </div>
        </template>
        <RepoDescription :repo="repo" />
      </Panel>
      <!-- <n-input v-model:value="keyword" :placeholder="`搜索 ${repo.name} 仓库中的包...`" size="large">
        <template #prefix>
          <n-icon>
            <icon name="i-mdi:search" />
          </n-icon>
        </template>
      </n-input> -->
      <ProgressSpinner v-if="packagesLoadingStatus === 'pending'" class="w-full pt-14" />
      <div v-else-if="packagesLoadingStatus === 'success' && packages" class="flex flex-col space-y-4">
        <PackageItem v-for="pkg in packages?.items" :pkg="pkg.latest" :repoId="repo.apiId" :repoUrl="repo.repoUrl" />
        <div class="flex justify-end">
          <Paginator v-model:first="first" v-model:rows="count" :totalRecords="packages.totalCount"
            :rowsPerPageOptions="[10, 20, 30]" />
        </div>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script setup lang="ts">
const { page, count, first } = usePageResult()

const route = useRoute()
const router = useRouter()

// const keyword = ref(route.query.keyword as string | undefined | null ?? '')

const { data: repo, status: repoLoadingStatus } = await useFetchRepo(route.params.repo as string, { lazy: true })
const { data: packages, status: packagesLoadingStatus } = await useFetchRepoPackages(route.params.repo as string, { lazy: true, query: { page, count } })

// const lowerKeyword = computed(() => keyword.value.toLowerCase())
// const filterPackages = computed(() => {
//   return packages.value?.filter(pkg => pkg.latest.name.toLowerCase().includes(lowerKeyword.value) || pkg.latest.displayName.toLowerCase().includes(lowerKeyword.value) || pkg.latest.description?.toLowerCase().includes(lowerKeyword.value))
// })

// watch(keyword, () => {
//   if (keyword.value === '') {
//     router.replace({ query: {} })
//   } else {
//     router.replace({ query: { keyword: keyword.value } })
//   }
// })
</script>