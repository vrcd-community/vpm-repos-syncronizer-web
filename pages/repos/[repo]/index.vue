<template>

  <Head>
    <Title>{{ repo?.name }} 仓库</Title>
  </Head>
  <div class="space-y-4">
    <n-breadcrumb>
      <n-breadcrumb-item clickable>
        <NuxtLink to="/">
          <Icon name="i-mdi:home" />
          镜像列表
        </NuxtLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item clickable>
        <NuxtLink :to="'/repos/' + route.params.repo">
          <Icon name="i-mdi:package" />
          {{ route.params.repo }}
        </NuxtLink>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <n-spin v-if="repoLoading" class="w-full pt-14">
      <template #description>
        神奇仓库在哪里？
      </template>
    </n-spin>
    <div v-else-if="repo" class="space-y-4">
      <n-card>
        <repo-header :repo="repo" />
        <n-divider />
        <repo-description :repo="repo" />
      </n-card>
      <n-input v-model:value="keyword" :placeholder="`搜索 ${repo.name} 仓库中的包...`" size="large">
        <template #prefix>
          <n-icon>
            <icon name="i-mdi:search" />
          </n-icon>
        </template>
      </n-input>
      <n-spin v-if="packagesLoading" class="w-full pt-14">
        <template #description>
          神奇仓库的包都在哪里？
        </template>
      </n-spin>
      <div v-else class="flex flex-col space-y-4">
        <n-list hoverable clickable>
          <n-list-item v-for="pkg in filterPackages">
            <package-item :pkg="pkg" :repoId="repo.apiId" :repoUrl="repo.repoUrl" />
          </n-list-item>
        </n-list>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const keyword = ref(route.query.keyword as string | undefined | null ?? '')

const { data: repo, pending: repoLoading } = await useFetchRepo(route.params.repo as string, { lazy: true })
const { data: packages, pending: packagesLoading } = await useFetchRepoPackages(route.params.repo as string, { lazy: true })

const lowerKeyword = computed(() => keyword.value.toLowerCase())
const filterPackages = computed(() => {
  return packages.value?.filter(pkg => pkg.latest.name.toLowerCase().includes(lowerKeyword.value) || pkg.latest.displayName.toLowerCase().includes(lowerKeyword.value) || pkg.latest.description?.toLowerCase().includes(lowerKeyword.value))
})

watch(keyword, () => {
  if (keyword.value === '') {
    router.replace({ query: {} })
  } else {
    router.replace({ query: { keyword: keyword.value } })
  }
})
</script>