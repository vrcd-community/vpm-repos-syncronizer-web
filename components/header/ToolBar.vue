<template>
  <div class="flex items-center">
    <n-popselect :options="colorModeOptions" v-model:value="$colorMode.preference">
      <n-button @click="isDark = !isDark" quaternary class="h-12 text-xl">
        <client-only>
          <icon :name="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'" />
        </client-only>
      </n-button>
    </n-popselect>
    <n-button tag="a" quaternary class="h-12 text-xl" href="https://github.com/vrcd-community/VPMReposSynchronizer"
      target="_blank">
      <icon name="mdi:github" />
    </n-button>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const colorModeOptions = [
  {
    label: '跟随系统',
    value: 'system'
  },
  {
    label: '浅色',
    value: 'light'
  },
  {
    label: '深色',
    value: 'dark'
  }
]

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>