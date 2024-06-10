<template>
  <NuxtLink :to="`/repos/${repoId}/${pkg.latest.name}@latest`">
    <n-thing>
      <template #header>
        <div class="flex items-center space-x-2">
          <span class="font-semibold">{{ pkg.latest.displayName }}</span>
          <n-tag size="small" type="success" :bordered="false">v{{ pkg.latest.version }}</n-tag>
          <n-tag v-if="pkg.latest.license" size="small" type="info" :bordered="false">
            <template #icon>
              <icon name="i-mdi:scale-balance" />
              <!-- i-mdi:license -->
            </template>
            {{ pkg.latest.license }} 许可证
          </n-tag>
          <n-tag v-if="pkg.latest.unity" size="small" :bordered="false">
            <template #icon>
              <icon name="i-mdi:unity" />
            </template>
            最低支持 Unity {{ pkg.latest.unity }}
          </n-tag>
        </div>
      </template>
      <template #description>
        <div class="flex items-center space-x-2">
          <n-text depth="3">
            由 {{ pkg.latest.author?.name }} 制作
          </n-text>
          <n-divider vertical />
          <text-copy :text="pkg.latest.name" tooltip="复制包 ID" />
        </div>
      </template>
      <template #header-extra>
        <n-button secondary type="primary" tag="a" :href="'vcc://vpm/addRepo?url=' + repoUrl" @click.stop>
          <template #icon>
            <n-icon>
              <icon name="i-mdi:plus" />
            </n-icon>
          </template>
          添加到 VCC
        </n-button>
      </template>
      <n-text>{{ pkg.latest.description }}</n-text>
    </n-thing>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BrowserPackage } from '~/types/browser';

defineProps<{
  pkg: BrowserPackage,
  repoId: string,
  repoUrl: string,
  showRepo?: boolean
}>()
</script>