<script setup lang="ts">
const props = defineProps<{
  tooltip: string,
  text: string
}>()

function copy() {
  navigator.clipboard.writeText(props.text)
}
</script>

<template>
  <div class="space-x-1 flex items-center">
    <code class="text-sm">{{ text }}</code>
    <n-tooltip>
      <template #trigger>
        <n-button secondary circle size="tiny" @click.stop="() => copy()">
          <n-icon>
            <icon name="i-mdi:content-copy" />
          </n-icon>
        </n-button>
      </template>
      {{ tooltip }}
    </n-tooltip>
  </div>
</template>