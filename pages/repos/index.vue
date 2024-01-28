<template>
  <UInput v-model="keyword" icon="i-heroicons-magnifying-glass-20-solid" placeholder="在所有的仓库内搜索包..." size="xl" />
  <div v-if="keyword === ''" class="mt-4 space-y-2 flex flex-col">
    <h2 class="text-2xl font-semibold">仓库列表</h2>
    <UProgress animation="carousel" v-if="repoLoading" />
    <NuxtLink v-if="!repoLoading" v-for="repo in repos" :to="'/repos/' + repo.apiId">
      <RepoCard :repo="repo" is-link />
    </NuxtLink>
  </div>
  <div v-else class="mt-4 space-y-4 flex flex-col">
    <UProgress animation="carousel" v-if="packagesLoading" />
    <PackageCard v-if="!packagesLoading" v-for="pkg in packages" :pkg="pkg" :repoId="pkg.repoId" :repoUrl="pkg.repoUrl" />
  </div>
</template>

<script setup lang="ts">
const { data: repos, pending: repoLoading } = await useFetchRepos({ lazy: true })

const route = useRoute()
const router = useRouter()

const keyword = ref(route.query.keyword as string | undefined | null ?? '')
const actualKeyword = ref(keyword.value)

const { data: packages, pending: packagesLoading } = await useSearchPackages(actualKeyword, { lazy: true })

let lastTypeTime = Date.now()
let searchRateLimitLock = false

watch(keyword, () => {
  lastTypeTime = Date.now()

  if (keyword.value === '') {
    router.replace({ query: {} })
  } else {
    router.replace({ query: { keyword: keyword.value } })
  }

  if (!process.client) {
    return
  }

  console.log(searchRateLimitLock)
  if (!searchRateLimitLock) {
    tryInvokeSearch()
  }
})

async function tryInvokeSearch() {
  searchRateLimitLock = true
  const timeout = Date.now() - lastTypeTime

  console.log(timeout)
  if (timeout > 200) {
    actualKeyword.value = keyword.value
    searchRateLimitLock = false
  } else {
    setTimeout(tryInvokeSearch, 100)
  }
}
</script>