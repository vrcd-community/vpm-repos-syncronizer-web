<script setup lang="ts">
import type { BrowserRepo } from '~/types/browser'

defineProps<{
  repo: BrowserRepo
}>()
</script>

<template>
  <AccordionPanel
    :key="repo.apiId"
    :value="repo.apiId"
  >
    <AccordionHeader
      as="div"
      class="flex-row-reverse"
    >
      <div class="flex flex-col gap-3 w-full ml-2 sm:ml-4 lg:flex-row lg:items-center">
        <div class="flex-1 min-w-0">
          <RepoHeaderTitle :repo="repo" />
        </div>
        <RepoHeaderAction
          show-browser-button
          :repo-api-id="repo.apiId"
          :repo-url="repo.repoUrl"
        />
      </div>
    </AccordionHeader>
    <AccordionContent>
      <div class="mx-1 sm:mx-5">
        <RepoDescription :repo="repo" />
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>
