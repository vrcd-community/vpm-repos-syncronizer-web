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
    }
    else {
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
  }
  else {
    setTimeout(tryInvokeSearch, 100)
  }
}
</script>

<template>
  <IconField>
    <InputIcon class="pi pi-search" />
    <InputText
      v-model="keyword"
      class="w-full"
      placeholder="搜索仓库或包"
    />
  </IconField>

  <div v-if="keyword">
    <ProgressSpinner
      v-if="status === 'pending'"
      class="w-full pt-14"
    />
    <div
      v-else-if="packages?.length !== 0"
      class="space-y-2"
    >
      <PackageItem
        v-for="pkg in packages"
        :key="pkg.latest.name"
        :pkg="pkg.latest"
        :repo-id="pkg.repoId"
        :repo-url="pkg.repoUrl"
      />
    </div>
    <p
      v-else
      class="pt-12 w-full text-center"
    >
      没有找到匹配的包
    </p>
  </div>
</template>
