<template>
  <UCard>
    <template #header>
      <div class="flex">
        <div class="flex-1">
          <div class="flex space-x-2 items-center">
            <h4 class="text-2xl font-bold">{{ version.displayName }}</h4>
            <UBadge color="teal" variant="subtle">{{ version.version }}</UBadge>
            <UBadge v-if="version.license !== null" variant="subtle">{{ version.license }}</UBadge>
            <UBadge v-if="version.unity !== null" variant="subtle" color="gray">
              <div class="space-x-0.5 flex items-center">
                <Icon name="i-mdi-unity" />
                <span>{{ version.unity }}</span>
              </div>
            </UBadge>
            <UBadge v-if="version.license !== null" variant="subtle" color="orange">
              <div class="space-x-0.5 flex items-center">
                <Icon name="i-mdi-license" />
                <span>{{ version.license }}</span>
              </div>
            </UBadge>
          </div>
          <div class="mb-1 flex items-center space-x-2 text-sm text-slate-400">
            <span v-if="version.author !== null">由 {{ version.author?.name }} 制作</span>
            <span v-if="version.author !== null">·</span>
            <span class="font-mono">{{ version.name }}</span>
          </div>
        </div>
        <div class="flex items-center">
          <UButton @click.stop :to="'vcc://vpm/addRepo?url=' + repoUrl">添加到 VCC</UButton>
        </div>
      </div>
    </template>
    <div class="space-y-3">
      <h2 class="text-2xl font-bold">描述</h2>
      <p>{{ version.description }}</p>
      <div class="space-x-3" v-if="version.author && (version.author.email || version.author.url)">
        <h2 class="text-2xl font-bold mb-3">开发者联系方式</h2>
        <ul>
          <li class="list-disc ml-[1em]" v-if="version.author.email">Email:
            <NuxtLink class="text-primary" :href="'mailto:' + version.author.email">
              {{ version.author.email }}
            </NuxtLink>
          </li>
          <li class="list-disc ml-[1em]" v-if="version.author.url">开发者网站:
            <NuxtLink class="text-primary" :href="(version.author.url as string)" target="_blank">
              {{ version.author.url }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="space-x-3" v-if="showUpmDependencies">
        <h2 class="text-2xl font-bold mb-3">UPM 依赖</h2>
        <ol>
          <li class="list-disc ml-[1em]" v-for="dependence in Object.keys(version.dependencies)">
            {{ dependence }}@{{ version.dependencies[dependence] }}
          </li>
        </ol>
      </div>
      <div class="space-x-3" v-if="showVpmDependencies">
        <h2 class="text-2xl font-bold mb-3">VPM 依赖</h2>
        <ol>
          <li class="list-disc ml-[1em]" v-for="dependence in Object.keys(version.vpmDependencies)">
            {{ dependence }}@{{ version.vpmDependencies[dependence] }}
          </li>
        </ol>
      </div>
      <div class="space-x-3" v-if="showGitDependencies">
        <h2 class="text-2xl font-bold mb-3">Git 依赖</h2>
        <ol>
          <li class="list-disc ml-[1em]" v-for="dependence in Object.keys(version.gitDependencies)">
            {{ dependence }}@{{ version.gitDependencies[dependence] }}
          </li>
        </ol>
      </div>
      <div class="space-x-3" v-if="version.samples">
        <h2 class="text-2xl font-bold mb-3" v-if="version.samples.length !== 0">包中的示例</h2>
        <div class="space-y-2 !mx-0" v-if="version.samples.length !== 0">
          <UCard class="!mx-0" v-for="sample in version.samples">
            <h3 class="text-xl font-semibold">{{ sample.displayName }}</h3>
            <p class="text-slate-400 font-mono text-sm">{{ sample.path }}</p>
            <p>{{ sample.description }}</p>
          </UCard>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { BrowserPackageVersion, BrowserRepo } from '~/types/browser';

const props = defineProps<{
  version: BrowserPackageVersion,
  repoUrl: string
}>()

const showUpmDependencies = computed(() => Object.keys(props.version.dependencies as object).length !== 0)
const showVpmDependencies = computed(() => Object.keys(props.version.vpmDependencies as object).length !== 0)
const showGitDependencies = computed(() => Object.keys(props.version.gitDependencies as object).length !== 0)
</script>