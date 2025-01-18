<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser';

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <AccordionPanel :key="repo.apiId" :value="repo.apiId">
    <AccordionHeader as="div" class="flex-row-reverse">
      <div class="flex w-full ml-4">
        <div class="flex-1">
          <RepoHeaderTitle :repo="repo" />
        </div>
        <RepoHeaderAction show-browser-button :repo-api-id="repo.apiId" :repo-url="repo.repoUrl" />
      </div>
    </AccordionHeader>
    <AccordionContent>
      <div class="mx-5">
        <RepoDescription :repo="repo" />
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>