<template>
  <UBreadcrumb :links="links" />
</template>

<script setup lang="ts">
const route = useRoute()

const links = [{
  label: '包列表',
  icon: 'i-heroicons-home',
  to: '/repos'
}, {
  label: route.params.repo,
  icon: 'i-heroicons-inbox-stack-solid',
  to: '/repos/' + route.params.repo
}, {
  label: route.params.package,
  icon: 'i-heroicons-archive-box-solid',
  to: '/repos/' + route.params.repo + '/' + route.params.package
}]
</script>