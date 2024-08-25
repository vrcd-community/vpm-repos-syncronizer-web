<script setup lang="ts">
import { Icon, NDivider, NuxtLink } from '#components';

const { data: repos, pending: loading } = await useFetchRepos({ lazy: true })

const route = useRoute()

const items = computed(() => {
  const navItems: {
    type?: 'divider',
    label?: string,
    route?: string,
    icon?: string
  }[] = [
      {
        label: '总览',
        route: '/status',
        icon: 'mdi:monitor-dashboard',
      },
      {
        label: '所有同步任务',
        route: '/status/tasks',
        icon: 'mdi:format-list-bulleted-type',
      },
      {
        type: 'divider',
      }
    ]

  repos.value?.forEach((repo) => {
    navItems.push({
      label: repo.apiId,
      route: `/status/repos/${repo.apiId}`,
      icon: 'mdi:package'
    })
  })

  return navItems
})

const menuOptions = computed(() => items.value?.map((item) => ({
  type: item.type,
  label: () => renderLabel(item.label ?? '', item.route ?? ''),
  key: item.route,
  icon: item.icon ? () => h(Icon, { name: item.icon }) : undefined
})))

function renderLabel(label: string, route: string) {
  return h(NuxtLink, { to: route }, { default: () => label })
}

const selected = computed(() => {
  const index = items.value?.findIndex((item) => item.route === route.path)
  if (index === -1) {
    return '/'
  }

  return items.value?.at(index)?.route
})
</script>

<template>
  <n-menu class="mt-8" :options="menuOptions" :value="selected" />
</template>
