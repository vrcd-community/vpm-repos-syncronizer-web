<template>
  <div class="flex space-x-8 mt-8">
    <div class="w-72 sticky top-8 self-start">
      <n-menu :options="options" :value="selected" />
    </div>
    <n-card class="flex-1">
      <content-doc class="prose dark:prose-invert max-w-none" />
    </n-card>
    <div class="w-72 sticky self-start top-8 space-y-2">
      <span class="font-semibold">本页目录</span>
      <div>
        <n-anchor>
          <doc-anchor-link-item v-for="item in page?.body?.toc?.links" :link="item" />
        </n-anchor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router';

definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, queryContent(route.path).findOne)
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent('docs')))

// @ts-expect-error
useContentHead(page)

const options = computed(() => {
  if (navigation.value === null) {
    return []
  }

  const navLinks: MenuOption[] = []
  navigation.value.forEach(item => {
    // navLinks.push({
    //   label: item.title,
    //   key: item._path
    // })

    item.children?.forEach(item => {
      if (navLinks.findIndex(navLinkItem => navLinkItem.to === item._path) !== -1)
        return

      navLinks.push({
        label: () => renderLabel(item.title, item._path),
        key: item._path
      })
    })
  })

  return navLinks.reverse()
})

const selected = computed(() => {
  return options.value.find(option => option.key === route.path)?.key
})

function renderLabel(title: string, route: string) {
  return h(RouterLink, { to: route }, title)
}
</script>