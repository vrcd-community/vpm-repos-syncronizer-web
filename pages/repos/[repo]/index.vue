<template>
  <div class="space-y-4">
    <UBreadcrumb :links="links" />
    <div v-if="repo !== null" class="space-y-4">
      <RepoCard :repo="repo" />
      <UInput v-model="keyword" icon="i-heroicons-magnifying-glass-20-solid" :placeholder="`搜索 ${repo.name} 仓库中的包...`"
        size="xl" />
      <div class="flex flex-col space-y-4">
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

const { data: repo } = await useFetchRepo(route.params.repo as string)
const { data: packages } = await useFetchRepoPackages(route.params.repo as string)

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