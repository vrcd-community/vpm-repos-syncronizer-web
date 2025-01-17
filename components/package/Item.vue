<template>
  <NuxtLink :to="`/repos/${repoId}/${pkg.name}@latest`">
    <Card>
      <template #title>
        <div class="flex">
          <PackageHeader class="flex-1" :pkg="pkg" />
          <div class="flex space-x-4 *:h-min">
            <Button v-tooltip.top="repoUrl" label="复制镜像仓库地址" @click.stop="copy(`https://vpm.vrczh.org/vpm/${repoId}`)"
              icon="pi pi-copy" severity="secondary" size="small" />
            <Button as="a" :href="'vcc://vpm/addRepo?url=' + repoUrl" label="添加到包管理器" @click.stop icon="pi pi-plus"
              size="small" />
          </div>
        </div>
      </template>
      <template #content>
        <p>{{ pkg.description }}</p>
      </template>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BrowserPackageVersion } from '~/types/browser';

defineProps<{
  pkg: BrowserPackageVersion,
  repoId: string,
  repoUrl: string,
  showRepo?: boolean
}>()

const { copy } = useClipboard()
</script>