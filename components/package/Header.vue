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
      <div class="*:text-xs *:font-medium flex items-center space-x-2">
        <Tag severity="success" :value="`v${pkg.version}`" />
        <Tag v-if="pkg.license" severity="info">
          <IconLicense class="size-4" />
          {{ pkg.license }} 许可证
        </Tag>
        <Tag v-if="pkg.unity" severity="contrast">
          <IconUnity class="size-4" />
          最低支持 Unity {{ pkg.unity }}
        </Tag>
      </div>
    </div>
    <div class="flex items-center space-x-2 text-sm">
      <span class="text-zinc-500">
        由 {{ pkg.author?.name }} 制作
      </span>
      <Divider layout="vertical" />
      <TextCopy :text="pkg.name" tooltip="复制包 ID" />
    </div>
  </div>
</template>