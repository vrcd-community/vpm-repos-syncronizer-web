<template>
    <div class="flex items-center">
        <ClientOnly>
            <n-button @click="isDark = !isDark" quaternary class="h-12 text-xl">
                <icon :name="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'" />
            </n-button>
        </ClientOnly>
        <n-button tag="a" quaternary class="h-12 text-xl" href="https://github.com/vrcd-community/VPMReposSynchronizer"
            target="_blank">
            <icon name="mdi:github" />
        </n-button>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
</script>