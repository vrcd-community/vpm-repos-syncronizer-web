<template>
  <n-menu :options="menuOptions" :value="selected" mode="horizontal" />
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';

const route = useRoute()

const items = [{
  label: '镜像',
  route: '/'
}, {
  label: '文档',
  route: '/docs'
},
{
  label: '对象存储状态',
  route: '/status/ros'
},
{
  label: 'API 状态',
  route: '/status/api'
}, {
  label: '同步状态',
  route: '/status'
}]

const menuOptions = computed(() => items.map((item) => ({
  label: () => renderLabel(item.label, item.route),
  key: item.route
})))

function renderLabel(label: string, route: string) {
  return h(NuxtLink, { to: route }, { default: () => label })
}

const selected = computed(() => {
  const index = items.findIndex((item) => item.route === route.path || (item.route !== '/' && route.path.startsWith(item.route)))
  if (index === -1) {
    return '/'
  }

  return items[index].route
})
</script>