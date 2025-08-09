<script setup lang="ts">
const props = defineProps<{
  tooltip: string
  text: string
}>()

function copy() {
  navigator.clipboard.writeText(props.text)
}
</script>

<template>
  <div class="flex items-center space-x-1">
    <code>{{ text }}</code>
    <Button
      v-tooltip.top="tooltip"
      icon="text-xs pi pi-copy"
      severity="secondary"
      class="!size-4"
      :aria-label="tooltip"
      rounded
      @click.stop="copy"
    />
  </div>
</template>
