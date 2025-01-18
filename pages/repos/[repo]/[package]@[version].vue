<template>
  <Head>
    <Title>{{ pkg?.latest.name }}@{{ selectedVersion }}</Title>
  </Head>
  <div class="space-y-4">
    <Breadcrumb
      :model="[
        { label: '镜像列表', icon: 'pi pi-home', route: '/' },
        { label: route.params.repo.toString(), icon: 'pi pi-box', route: '/repos/' + route.params.repo.toString() },
        { label: `${route.params.package.toString()}@${selectedVersion}`, icon: 'pi pi-box', route: '/repos/' + route.params.repo.toString() + '/' + route.params.package.toString() + '@' + selectedVersion },
      ]"
    >
      <template #item="{ item, props }">
        <BreadcrumbTemplate
          :item="item"
          :props="props"
        />
      </template>
    </Breadcrumb>
    <ProgressSpinner
      v-if="packageLoadingStatus === 'pending'"
      class="w-full pt-14"
    />
    <div
      v-else-if="pkg && selectedPackageVersion"
      class="space-y-4"
    >
      <Panel>
        <template #header>
          <div class="flex items-start w-full">
            <PackageHeader
              class="flex-1"
              :pkg="selectedPackageVersion"
            />
            <div class="flex space-x-2 items-center">
              <Button
                icon="pi pi-download"
                label="下载 Zip"
                severity="secondary"
                @click="downloadZip()"
              />
              <Divider layout="vertical" />
              <RepoHeaderAction
                :repo-api-id="pkg.repoId"
                :repo-url="pkg.repoUrl"
              />
            </div>
          </div>
        </template>
        <PackageDetail
          v-model:tab="currentTab"
          :package="pkg"
          :selected-version="selectedVersion"
        />
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const repoId = ref(route.params.repo as string)
const packageId = ref(route.params.package as string)
const selectedVersion = ref(route.params.version as string)

const { data: pkg, status: packageLoadingStatus } = await useFetchRepoPackage(repoId.value, packageId.value, { lazy: true })

const selectedPackageVersion = computed(() => {
  return route.params.version === 'latest' ? pkg.value?.latest : pkg.value?.versions.find(ver => ver.version === route.params.version)
})

useSeoMeta({
  description: selectedPackageVersion.value?.description,
  ogDescription: selectedPackageVersion.value?.description,
  twitterDescription: selectedPackageVersion.value?.description,
})

const currentTab = ref((route.query.tab?.toString() ?? 'description') || 'description')

watch(currentTab, (tab) => {
  if (route.params.tab === tab) return

  router.replace({
    query: {
      ...route.query,
      tab: tab !== 'description' ? tab : undefined,
    },
  })
})

function downloadZip() {
  if (!selectedPackageVersion.value?.url)
    return

  // @ts-expect-error I don't know why type check fail
  window.open(selectedPackageVersion.value.url, '_blank').focus()
}
</script>
