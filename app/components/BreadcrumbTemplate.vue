<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import type { BreadcrumbRouterBindProps } from 'primevue/breadcrumb'

defineProps<{
  item: MenuItem
  props: BreadcrumbRouterBindProps
}>()
</script>

<template>
  <NuxtLink
    v-if="item.route"
    v-slot="{ href, navigate }"
    :to="item.route"
    custom
  >
    <a
      :href="href"
      v-bind="props.action"
      @click="navigate"
    >
      <span :class="[item.icon, 'text-color']" />
      <span class="font-semibold">{{ item.label }}</span>
    </a>
  </NuxtLink>
  <a
    v-else
    :href="item.url"
    :target="item.target"
    v-bind="props.action"
  >
    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
  </a>
</template>
