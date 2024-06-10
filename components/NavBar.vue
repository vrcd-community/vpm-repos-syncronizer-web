<template>
  <div class="w-full">
    <n-tabs justify-content="space-evenly" type="line" v-model:value="selected">
      <n-tab :name="item.route" v-for="item in items">
        {{ item.label }}
      </n-tab>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const items = [{
  label: '镜像',
  route: '/',
}, {
  label: '文档',
  route: '/docs',
}, {
  label: '同步状态',
  route: '/status'
}]

const selected = computed({
  get() {
    const index = items.findIndex((item) => item.route === route.path || (item.route !== '/' && route.path.startsWith(item.route)))
    if (index === -1) {
      return '/'
    }

    return items[index].route
  },
  set(value) {
    router.push(value)
  }
})
</script>