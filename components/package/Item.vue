<template>
  <NuxtLink :to="`/repos/${repoId}/${pkg.name}@latest`">
    <n-thing>
      <template #header>
        <package-header :pkg="pkg" />
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
      <n-text>{{ pkg.description }}</n-text>
    </n-thing>
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
</script>