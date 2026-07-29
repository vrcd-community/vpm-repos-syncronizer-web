<script setup lang="ts">
import DefaultLayout from './layouts/default.vue'
import DocsLayout from './layouts/docs.vue'
import EmptyLayout from './layouts/empty.vue'
import SyncStatusLayout from './layouts/syncStatus.vue'

const route = useRoute()
const layouts = {
  default: DefaultLayout,
  docs: DocsLayout,
  empty: EmptyLayout,
  'sync-status': SyncStatusLayout,
}

const layout = computed(() => {
  const name = String(route.meta.layout || 'default') as keyof typeof layouts
  return layouts[name] || DefaultLayout
})

useHead({
  titleTemplate: title => title
    ? `${title} - VPM Repos Synchronizer - 一个 VPM 镜像站`
    : 'VPM Repos Synchronizer - 一个 VPM 镜像站',
  meta: [
    {
      name: 'robots',
      content: computed(() => String(route.meta.robots || 'index, follow')),
    },
  ],
})

useSeoMeta({
  description: '一个能够加速 VCC（VRChat Creator Companion）下载包过程的 VPM 仓库源镜像。',
  ogDescription: '一个能够加速 VCC（VRChat Creator Companion）下载包过程的 VPM 仓库源镜像。',
  twitterDescription: '一个能够加速 VCC（VRChat Creator Companion）下载包过程的 VPM 仓库源镜像。',
  ogImage: '/icon.svg',
  twitterImage: '/icon.svg',
  twitterCard: 'summary',
  ogImageHeight: 300,
  ogImageWidth: 300,
  ogLocale: 'zh_Hans',
  ogUrl: computed(() => `https://vcc.vrczh.org${route.fullPath}`),
})
</script>

<template>
  <PageHeader />
  <component
    :is="layout"
    class="text-color"
  >
    <RouterView v-slot="{ Component }">
      <component
        :is="Component"
        :key="route.path"
      />
    </RouterView>
  </component>
</template>
