<template>
  <div class="flex space-x-4">
    <Menu
      class="w-72 sticky top-5 h-min"
      :model="items"
    >
      <template #item="{ item, props }">
        <NuxtLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </NuxtLink>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
    <Panel class="flex-1">
      <ContentDoc class="prose dark:prose-invert max-w-none" />
    </Panel>
    <div class="w-72">
      <!-- <n-affix listen-to=".n-scrollbar-container" :top="80">
        <div class="space-y-2 pt-12">
          <span class="font-semibold">本页目录</span>
          <n-anchor>
            <doc-anchor-link-item v-for="item in page?.body?.toc?.links" :link="item" />
          </n-anchor>
        </div>
      </n-affix> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, queryContent(route.path).findOne)
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent('docs')))

if (page.value !== null)
  useContentHead(page.value)

const items = computed(() => {
  if (navigation.value === null) {
    return []
  }

  const navLinks: MenuItem[] = []
  navigation.value.forEach((item) => {
    item.children?.forEach((item) => {
      if (navLinks.findIndex(navLinkItem => navLinkItem.to === item._path) !== -1)
        return

      navLinks.push({
        label: item.title,
        route: item._path,
      })
    })
  })

  return navLinks.reverse()
})
</script>
