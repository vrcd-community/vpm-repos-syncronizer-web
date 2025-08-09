<script setup lang="ts">
const rule = useRobotsRule()
rule.value = 'noindex, nofollow'
</script>

<template>
  <div class="flex">
    <SyncTaskNavMenu />
    <div class="md:w-5/6 mx-auto py-8">
      <slot />
    </div>
  </div>
</template>
