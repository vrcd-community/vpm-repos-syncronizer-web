<template>
  <Title>VPM Repos Synchronizer</Title>
  <UContainer class="pt-12">
    <header class="flex flex-col text-center">
      <img class="max-h-48" src="/assets/images/icon.svg" width="100%" />
      <h1 class="text-xl font-bold">VPM Repos Synchronizer</h1>
      <p class="text-sm">一个 VCC 仓库镜像站</p>
      <nav class="flex flex-col items-center">
        <ToolBar />
        <NavBar />
      </nav>
    </header>
    <main class="my-10 mx-auto">
      <NuxtPage />
    </main>
  </UContainer>
</template>

<style>
@import url("/assets/css/main.css");
</style>

<script setup lang="ts">
useHead({
  title: 'VPM Repos Synchronizer',
  script: [
    { defer: true, src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "3168db74ae4a4271991b1639a4044784"}' }
  ]
})
</script>