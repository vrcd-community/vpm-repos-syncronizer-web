<template>
  <Head>
    <Title>{{ pkg?.latest.name }}@{{ selectedVersion }}</Title>
  </Head>
  <div class="space-y-4">
    <UBreadcrumb :links="links" />
    <UProgress animation="carousel" v-if="packageLoading" />
    <div v-if="!packageLoading && pkg && selectedPackageVersion !== undefined" class="space-y-4">
      <USelectMenu :options="versionOptions" v-model="selectedVersion" />
      <PackageVersionCard :version="selectedPackageVersion" :repo-url="pkg.repoUrl" />
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
}, {
  label: `${route.params.package}@${route.params.version}`,
  icon: 'i-heroicons-archive-box-solid',
  to: '/repos/' + route.params.repo + '/' + route.params.package
}] as BreadcrumbLink[]

const { data: pkg, pending: packageLoading } = await useFetchRepoPackage(route.params.repo as string, route.params.package as string, { lazy: true })

const selectedPackageVersion = computed(() => {
  return route.params.version === 'latest' ? pkg.value?.latest : pkg.value?.versions.find(ver => ver.version === route.params.version)
})

const versionOptions = computed(() => ['latest'].concat(pkg.value?.versions.map(ver => ver.version) as string[]))
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