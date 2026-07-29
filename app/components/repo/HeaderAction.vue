<script setup lang="ts">
defineProps<{
  repoApiId: string
  repoUrl: string
  showBrowserButton?: boolean
}>()

const { copy } = useClipboard()
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <Button
        v-tooltip.top="repoUrl"
        label="复制镜像仓库地址"
        icon="pi pi-copy"
        severity="secondary"
        @click.stop="copy(`https://vpm.vrczh.org/vpm/${repoApiId}`)"
      />
      <Button
        as="a"
        :href="'vcc://vpm/addRepo?url=' + repoUrl"
        label="添加到包管理器"
        icon="pi pi-plus"
        @click.stop
      />
    </div>
    <div
      v-if="showBrowserButton"
      class="flex flex-col gap-2 sm:flex-row sm:items-center"
    >
      <Divider
        layout="vertical"
        class="hidden sm:flex"
      />
      <Button
        as="router-link"
        :to="'/repos/' + repoApiId"
        severity="info"
        label="在仓库浏览器中查看"
        icon="pi pi-arrow-right"
        @click.stop
      />
    </div>
  </div>
</template>
