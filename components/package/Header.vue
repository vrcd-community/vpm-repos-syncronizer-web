<script setup lang="ts">
import type { BrowserPackageVersion } from '~/types/browser';

defineProps<{
  pkg: BrowserPackageVersion
}>()
</script>

<template>
  <div>
    <div class="flex items-center space-x-2">
      <span class="font-semibold text-lg">{{ pkg.displayName }}</span>
      <n-tag size="small" type="success" :bordered="false">v{{ pkg.version }}</n-tag>
      <n-tag v-if="pkg.license" size="small" type="info" :bordered="false">
        <template #icon>
          <icon name="i-mdi:scale-balance" />
          <!-- i-mdi:license -->
        </template>
        {{ pkg.license }} 许可证
      </n-tag>
      <n-tag v-if="pkg.unity" size="small" :bordered="false">
        <template #icon>
          <icon name="i-mdi:unity" />
        </template>
        最低支持 Unity {{ pkg.unity }}
      </n-tag>
    </div>
    <div class="flex items-center space-x-2 text-sm">
      <n-text depth="3">
        由 {{ pkg.author?.name }} 制作
      </n-text>
      <n-divider vertical />
      <text-copy :text="pkg.name" tooltip="复制包 ID" />
    </div>
  </div>
</template>