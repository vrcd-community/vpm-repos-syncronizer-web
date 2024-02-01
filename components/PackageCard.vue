<template>
  <NuxtLink :to="`/repos/${repoId}/${pkg.latest.name}@latest`">
    <UCard class="hover:bg-gray-200 hover:dark:bg-gray-800">
      <div class="flex">
        <div class="flex-1">
          <div class="flex space-x-2 items-center">
            <h4 class="text-2xl font-bold">{{ pkg.latest.displayName }}</h4>
            <UBadge color="teal" variant="subtle">{{ pkg.latest.version }}</UBadge>
            <UBadge class="hidden md:block" v-if="pkg.latest.license !== null" variant="subtle">{{ pkg.latest.license }}
            </UBadge>
            <UBadge class="hidden md:block" v-if="pkg.latest.unity !== null" variant="subtle" color="gray">
              <div class="space-x-0.5 flex items-center">
                <Icon name="i-mdi-unity" />
                <span>{{ pkg.latest.unity }}</span>
              </div>
            </UBadge>
            <UBadge class="hidden md:block" v-if="pkg.latest.license !== null" variant="subtle" color="orange">
              <div class="space-x-0.5 flex items-center">
                <Icon name="i-mdi-license" />
                <span>{{ pkg.latest.license }}</span>
              </div>
            </UBadge>
          </div>
          <div class="text-xs md:text-sm mb-1 flex items-center space-x-2 text-slate-400">
            <span v-if="pkg.latest.author !== null">由 {{ pkg.latest.author?.name }} 制作</span>
            <span v-if="pkg.latest.author !== null">·</span>
            <span class="font-mono">{{ pkg.latest.name }}</span>
          </div>
          <p class="max-h-10 overflow-clip whitespace-pre-wrap text-ellipsis">{{ pkg.latest.description }}</p>
        </div>
        <div class="flex items-center">
          <UButton @click.stop :to="'vcc://vpm/addRepo?url=' + repoUrl">添加到 VCC</UButton>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BrowserPackage } from '~/types/browser';

defineProps<{
  pkg: BrowserPackage,
  repoId: string,
  repoUrl: string,
  showRepo?: boolean
}>()
</script>