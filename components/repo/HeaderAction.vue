<script setup lang="ts">
defineProps<{
  repoApiId: string,
  repoUrl: string,
  showBrowserButton?: boolean
}>()

const { copy } = useClipboard()
</script>

<template>
  <div class="flex flex-col xl:flex-row xl:items-center gap-2 xl:gap-2">
    <n-tooltip>
      <template #trigger>
        <n-button secondary class="w-full xl:w-auto" @click.stop="copy(`https://vpm.vrczh.org/vpm/${repoApiId}`)">
          <template #icon>
            <n-icon>
              <icon name="i-mdi:content-copy" />
            </n-icon>
          </template>
          <n-text>复制镜像仓库地址</n-text>
        </n-button>
      </template>
      <code>{{ repoUrl }}</code>
    </n-tooltip>
    <n-button secondary type="primary" tag="a" class="w-full xl:w-auto" :href="'vcc://vpm/addRepo?url=' + repoUrl" @click.stop>
      <template #icon>
        <n-icon>
          <icon name="i-mdi:plus" />
        </n-icon>
      </template>
      添加到 VCC
    </n-button>
    <div class="hidden xl:block">
      <n-divider vertical />
    </div>
    <NuxtLink v-if="showBrowserButton" :to="'/repos/' + repoApiId" class="w-full xl:w-auto" @click.stop>
      <n-button tag="div" secondary type="info" class="w-full">
        <template #icon>
          <n-icon>
            <icon name="i-mdi:arrow-right" />
          </n-icon>
        </template>
        在仓库浏览器中查看
      </n-button>
    </NuxtLink>
  </div>
</template>