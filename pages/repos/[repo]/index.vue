<template>
  <UBreadcrumb :links="links" />
  {{ $route.params.repo }}
</template>

<script setup lang="ts">
const route = useRoute()

const links = [{
  label: '包列表',
  icon: 'i-heroicons-home',
  to: '/repos'
}, {
  label: route.params.repo,
  icon: 'i-heroicons-inbox-stack-solid'
}]
</script>