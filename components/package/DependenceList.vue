<script setup lang="ts">
defineProps<{
  dependencies?: Record<string, string>,
  type: string
}>()
</script>

<template>
  <div class="space-x-3" v-if="dependencies && Object.keys(dependencies).length !== 0">
    <h2 class="text-2xl font-bold mb-3">{{ type }} 依赖</h2>
    <ol>
      <li class="list-disc ml-[1em]" v-for="dependence in Object.keys(dependencies)">
        {{ dependence }}@{{ dependencies[dependence] }}
      </li>
    </ol>
  </div>
</template>