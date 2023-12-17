<template>
    <div class="flex my-3">
        <ClientOnly>
            <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
                aria-label="Theme" @click="isDark = !isDark" />

            <template #fallback>
                <div class="w-8 h-8" />
            </template>
        </ClientOnly>
        <UButton to="https://github.com/vrcd-community/VPMReposSynchronizer" target="_blank" icon="i-mdi-github"
            color="gray" variant="ghost" aria-label="Github" />
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