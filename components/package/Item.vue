<template>
  <Card>
    <template #title>
      <div class="flex items-start">
        <PackageHeader
          class="flex-1"
          :pkg="pkg"
        />
        <div class="flex space-x-4">
          <Button
            v-tooltip.top="repoUrl"
            label="复制镜像仓库地址"
            icon="pi pi-copy"
            severity="secondary"
            size="small"
            @click.stop="copy(`https://vpm.vrczh.org/vpm/${repoId}`)"
          />
          <Button
            as="a"
            :href="'vcc://vpm/addRepo?url=' + repoUrl"
            label="添加到包管理器"
            icon="pi pi-plus"
            size="small"
            @click.stop
          />
          <Divider layout="vertical" />
          <Button
            as="router-link"
            :to="`/repos/${repoId}/${pkg.name}@latest`"
            severity="info"
            label="查看包"
            icon="pi pi-arrow-right"
            size="small"
            @click.stop
          />
        </div>
      </div>
    </template>
    <template #content>
      <p class="overflow-hidden text-ellipsis whitespace-nowrap">
        {{ pkg.description }}
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { BrowserPackageVersion } from '~/types/browser'

defineProps<{
  pkg: BrowserPackageVersion
  repoId: string
  repoUrl: string
  showRepo?: boolean
}>()

const { copy } = useClipboard()
</script>
