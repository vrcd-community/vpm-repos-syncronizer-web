<template>
  <div class="flex px-8 py-2 items-center">
    <div class="flex items-center space-x-2">
      <nuxt-link to="/">
        <n-button quaternary class="p-0 h-12">
          <img class="h-12" src="/icon.svg" />
        </n-button>
      </nuxt-link>
    </div>
    <div class="flex-1"></div>
    <div class="flex items-center">
      <header-nav-bar />
    </div>
    <n-divider vertical />
    <header-tool-bar />
  </div>
</template>