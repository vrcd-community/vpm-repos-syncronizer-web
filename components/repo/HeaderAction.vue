<script setup lang="ts">
defineProps<{
  repoApiId: string,
  repoUrl: string,
  showBrowserButton?: boolean
}>()

const { copy } = useClipboard()
</script>

<template>
  <div class="space-x-2 flex items-center">
    <n-tooltip>
      <template #trigger>
        <n-button secondary @click.stop="copy(`https://vpm.vrczh.org/vpm/${repoApiId}`)">
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
    <n-button secondary type="primary" tag="a" :href="'vcc://vpm/addRepo?url=' + repoUrl" @click.stop>
      <template #icon>
        <n-icon>
          <icon name="i-mdi:plus" />
        </n-icon>
      </template>
      添加到 VCC
    </n-button>
    <n-divider v-if="showBrowserButton" vertical />
    <NuxtLink v-if="showBrowserButton" :to="'/repos/' + repoApiId" @click.stop>
      <n-button tag="div" secondary type="info">
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