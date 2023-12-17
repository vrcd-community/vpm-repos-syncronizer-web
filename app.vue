<template>
  <UContainer class="pt-24">
    <header class="flex flex-col items-center text-center">
      <img class="max-h-48" src="/assets/images/icon.svg" width="100%" />
      <h1 class="text-xl font-bold">VPM Repos Synchronizer</h1>
      <P class="text-sm">一个 VCC 仓库镜像站</P>
      <nav class="flex flex-col items-center">
        <ToolBar />
        <NavBar />
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
  </UContainer>
</template>

<style>
@import url("/assets/css/main.css");
</style>