<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const keyword = ref(route.query.keyword as string | undefined | null ?? '')
const actualKeyword = ref(keyword.value)

const { data: packages, status, execute } = await useSearchPackages(actualKeyword, { lazy: true, immediate: false })

let lastTypeTime = Date.now()
let searchRateLimitLock = false

if (keyword.value) {
  await execute()
}

onMounted(() => {
  watch(keyword, () => {
    lastTypeTime = Date.now()

    if (keyword.value === '') {
      router.replace({ query: {} })
    } else {
      router.replace({ query: { keyword: keyword.value } })
    }

    if (!searchRateLimitLock) {
      tryInvokeSearch()
    }
  })
})

async function tryInvokeSearch() {
  searchRateLimitLock = true
  const timeout = Date.now() - lastTypeTime

  if (timeout > 200) {
    actualKeyword.value = keyword.value
    searchRateLimitLock = false
  } else {
    setTimeout(tryInvokeSearch, 100)
  }
}
</script>

<template>
  <IconField>
    <InputIcon class="pi pi-search" />
    <InputText v-model="keyword" class="w-full" placeholder="搜索仓库或包" />
  </IconField>

  <div v-if="keyword">
    <n-spin v-if="status !== 'success'" class="w-full pt-14">
      <template #description>
        神奇仓库的包都在哪里？
      </template>
    </n-spin>
    <n-list v-else-if="packages?.length !== 0" hoverable clickable>
      <n-list-item v-for="pkg in packages">
        <package-item :pkg="pkg.latest" :repoId="pkg.repoId" :repoUrl="pkg.repoUrl" />
      </n-list-item>
    </n-list>
    <n-empty v-else description="没有找到匹配的包" class="w-full pt-14" />
  </div>
</template>