<template>
  <Head>
    <Title>{{ repo?.name }} 仓库</Title>
  </Head>
  <div class="space-y-4">
    <UBreadcrumb :links="links" />
    <UProgress animation="carousel" v-if="repoLoading" />
    <div v-if="!repoLoading && repo" class="space-y-4">
      <RepoCard :repo="repo" />
      <UInput v-model="keyword" icon="i-heroicons-magnifying-glass-20-solid" :placeholder="`搜索 ${repo.name} 仓库中的包...`"
        size="xl" />
      <UProgress animation="carousel" v-if="packagesLoading" />
      <div v-if="!packagesLoading" class="flex flex-col space-y-4">
        <PackageCard v-for="pkg in filterPackages" :pkg="pkg" :repoId="repo.apiId" :repoUrl="repo.repoUrl" />
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbLink } from '@nuxt/ui/dist/runtime/types/breadcrumb';

const route = useRoute()
const router = useRouter()

const links = [{
  label: '包列表',
  icon: 'i-heroicons-home',
  to: '/repos'
}, {
  label: route.params.repo,
  icon: 'i-heroicons-inbox-stack-solid',
  to: '/repos/' + route.params.repo
}] as BreadcrumbLink[]

const keyword = ref(route.query.keyword as string | undefined | null ?? '')

const { data: repo, pending: repoLoading } = await useFetchRepo(route.params.repo as string, { lazy: true })
const { data: packages, pending: packagesLoading } = await useFetchRepoPackages(route.params.repo as string, { lazy: true })

const filterPackages = computed(() => {
  return packages.value?.filter(pkg => pkg.latest.name.includes(keyword.value) || pkg.latest.displayName.includes(keyword.value) || pkg.latest.description?.includes(keyword.value))
})

watch(keyword, () => {
  if (keyword.value === '') {
    router.replace({ query: {} })
  } else {
    router.replace({ query: { keyword: keyword.value } })
  }
})
</script>