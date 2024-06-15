<template>

  <Head>
    <Title>{{ pkg?.latest.name }}@{{ selectedVersion }}</Title>
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
      <n-breadcrumb-item clickable>
        <NuxtLink :to="'/repos/' + route.params.repo + '/' + route.params.package + '@' + route.params.version">
          <Icon name="i-mdi:package-variant-closed" />
          {{ route.params.package }}@{{ route.params.version }}
        </NuxtLink>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <n-spin v-if="packageLoading" class="w-full pt-14">
      <template #description>
        神奇的包在哪里？
      </template>
    </n-spin>
    <div v-else-if="pkg && selectedPackageVersion" class="space-y-4">
      <n-card>
        <div class="flex items-center">
          <package-header class="flex-1" :pkg="selectedPackageVersion" />
          <div class="flex space-x-2 items-center">
            <n-button secondary tag="a" :href="selectedPackageVersion.url" target="_blank">
              <template #icon>
                <n-icon>
                  <icon name="i-mdi:download" />
                </n-icon>
              </template>
              下载 Zip
            </n-button>
            <n-divider vertical />
            <repo-header-action :repo-api-id="pkg.repoId" :repo-url="pkg.repoUrl" />
          </div>
        </div>
        <package-detail :package="pkg" :selected-version="selectedVersion" />
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: pkg, pending: packageLoading } = await useFetchRepoPackage(route.params.repo as string, route.params.package as string, { lazy: true })

const selectedPackageVersion = computed(() => {
  return route.params.version === 'latest' ? pkg.value?.latest : pkg.value?.versions.find(ver => ver.version === route.params.version)
})

const selectedVersion = ref(route.params.version as string)

useSeoMeta({
  description: selectedPackageVersion.value?.description,
  ogDescription: selectedPackageVersion.value?.description,
  twitterDescription: selectedPackageVersion.value?.description
})

watch(selectedVersion, ver => {
  router.push(`/repos/${pkg.value?.repoId}/${pkg.value?.latest.name}@${ver}`)
})
</script>