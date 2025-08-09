<script setup lang="ts">
defineProps<{
  dependencies?: Record<string, string>
  type: string
}>()
</script>

<template>
  <div
    v-if="dependencies && Object.keys(dependencies).length !== 0"
    class="space-x-3"
  >
    <h2 class="text-2xl font-bold mb-3">
      {{ type }} 依赖
    </h2>
    <ol>
      <li
        v-for="dependence in Object.keys(dependencies)"
        :key="dependence"
        class="list-disc ml-[1em]"
      >
        {{ dependence }}@{{ dependencies[dependence] }}
      </li>
    </ol>
  </div>
</template>
