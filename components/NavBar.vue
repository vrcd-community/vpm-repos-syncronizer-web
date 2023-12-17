<template>
    <UTabs v-model:model-value="selected" :items="items" />
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const items = [{
    label: '开始',
    route: '/',
}, {
    label: 'FAQ',
    route: '/faq',
}, {
    label: '联系我们',
    route: '/contact',
}, {
    label: '包列表',
    route: '/packages'
}, {
    label: '服务器状态',
    route: '/status'
}]

const selected = computed({
    get() {
        const index = items.findIndex((item) => item.route === route.path)
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
</script>