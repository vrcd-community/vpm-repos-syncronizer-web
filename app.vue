<template>
  <PageHeader />
  <NuxtLayout class="text-color">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - VPM Repos Synchronizer - 一个 VPM 镜像站` : 'VPM Repos Synchronizer - 一个 VPM 镜像站',
  script: [
    { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "3168db74ae4a4271991b1639a4044784"}' }
  ],
  htmlAttrs: {
    lang: 'cmn-Hans-CN'
  },
  link: [
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
    { rel: "manifest", href: "/site.webmanifest" }
  ]
})

watch(() => route.fullPath, () => updateSeo())
updateSeo()

function updateSeo() {
  useSeoMeta({
    ogTitle: '%s - VPM Repos Synchronizer - 一个 VPM 镜像站',
    twitterTitle: '%s - VPM Repos Synchronizer - 一个 VPM 镜像站',
    description: '一个能够加速 VCC（VRChat Creator Companion）下载包的过程的 VPM 仓库源镜像。',
    ogDescription: '一个能够加速 VCC（VRChat Creator Companion）下载包的过程的 VPM 仓库源镜像。',
    twitterDescription: '一个能够加速 VCC（VRChat Creator Companion）下载包的过程的 VPM 仓库源镜像。',
    ogImage: '/icon.svg',
    twitterImage: '/icon.svg',
    twitterCard: 'summary',
    ogImageHeight: 300,
    ogImageWidth: 300,
    // @ts-expect-error
    ogImageType: 'image/svg+xml',
    ogLocale: 'zh_Hans',
    ogUrl: 'https://vcc.vrczh.org' + route.fullPath,
  })
}
</script>