<template>
  <div class="flex space-x-4">
    <div class="w-1/5 sticky top-0 self-start">
      <UVerticalNavigation :links="links" :ui="{ label: 'truncate relative text-xl font-semibold' }" />
    </div>
    <UCard class="w-full">
      <ContentDoc class="prose dark:prose-invert max-w-none" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { VerticalNavigationLink } from '@nuxt/ui/dist/runtime/types/vertical-navigation';

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent('docs')))

const links = computed(() => {
  if (navigation.value === null) {
    return []
  }

  const navLinks = [] as VerticalNavigationLink[]
  navigation.value.forEach(item => {
    navLinks.push({
      label: item.title,
      to: item._path
    })

    item.children?.forEach(item => {
      if (navLinks.findIndex(navLinkItem => navLinkItem.to === item._path) !== -1)
        return

      navLinks.push({
        label: item.title,
        to: item._path
      })
    })
  })

  return navLinks
})
</script>