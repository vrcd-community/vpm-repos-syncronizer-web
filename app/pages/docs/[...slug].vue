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
      <ContentRenderer v-if="page" :value="page" class="prose dark:prose-invert max-w-none" />
      <p v-else>Page Not Found</p>
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

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})
const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('docs')
})

const items = computed(() => {
  if (!navigation.value || !navigation.value[0]?.children?.length) {
    return []
  }

  const navLinks: MenuItem[] = navigation.value[0].children.map((item) => {
    return {
      label: item.title,
      route: item.path,
    }
  })

  return navLinks.reverse()
})
</script>
