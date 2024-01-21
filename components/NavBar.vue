<template>
  <div ref="container" class="w-full max-w-xl">
    <UTabs v-model:model-value="selected" :orientation="orientation" :items="items" />
  </div>
</template>

<script setup lang="ts">
const container = ref(null)
const { width } = useElementSize(container)

const route = useRoute()
const router = useRouter()

const items = [{
  label: '首页',
  route: '/',
}, {
  label: '文档',
  route: '/docs',
}, {
  label: '包列表',
  route: '/packages'
}, {
  label: '同步状态',
  route: '/status'
}]

const selected = computed({
  get() {
    const index = items.findIndex((item) => item.route === route.path || (item.route !== '/' && route.path.startsWith(item.route)))
    if (index === -1) {
      return 0
    }

    return index
  },
  set(value) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace(items[value].route)
  }
})

const orientation = computed(() => {
  return width.value < 450 ? 'vertical' : 'horizontal'
})
</script>