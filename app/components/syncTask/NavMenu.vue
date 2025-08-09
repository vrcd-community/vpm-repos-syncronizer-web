<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

const { data: repos } = await useFetchVpmRepos({ lazy: true })

const items = computed(() => {
  const items: MenuItem[] = []
  for (const key in repos.value) {
    items.push({
      label: key,
      route: `/status/repos/${key}`,
      icon: 'pi pi-box',
    })
  }

  const navItems: MenuItem[] = [
    {
      label: '总览',
      route: '/status',
      icon: 'pi pi-home',
    },
    {
      label: '所有同步任务',
      route: '/status/tasks',
      icon: 'pi pi-list',
    },
    {
      label: '所有仓库',
      items,
    },
  ]

  return navItems
})
</script>

<template>
  <ScrollPanel class="sticky top-0 mx-5 max-h-[calc(100vh-100px)]">
    <Menu
      class="my-5"
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
            <i
              :class="item.icon"
              class="opacity-40"
            />
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
  </ScrollPanel>
</template>
