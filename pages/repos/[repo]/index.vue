<template>
  <div class="space-y-4">
    <UBreadcrumb :links="links" />
    <div v-if="repo !== null" class="space-y-4">
      <RepoCard :repo="repo" />
      <UInput v-model="keyword" icon="i-heroicons-magnifying-glass-20-solid" :placeholder="`搜索 ${repo.name} 仓库中的包...`"
        size="xl" />
      <div class="flex flex-col space-y-4">
        <NuxtLink v-for="pkg in filterPackages" :to="`/repos/${repo.apiId}/${pkg.latest.name}`">
          <UCard class="hover:bg-gray-200 hover:dark:bg-gray-800">
            <div class="flex">
              <div class="flex-1">
                <div class="flex space-x-2 items-center">
                  <h4 class="text-2xl font-bold">{{ pkg.latest.displayName }}</h4>
                  <UBadge color="teal" variant="subtle">{{ pkg.latest.version }}</UBadge>
                  <UBadge v-if="pkg.latest.license !== null" variant="subtle">{{ pkg.latest.license }}</UBadge>
                  <UBadge v-if="pkg.latest.unity !== null" variant="subtle" color="gray">
                    <div class="space-x-0.5 flex items-center">
                      <Icon name="i-mdi-unity" />
                      <span>{{ pkg.latest.unity }}</span>
                    </div>
                  </UBadge>
                  <UBadge v-if="pkg.latest.license !== null" variant="subtle" color="orange">
                    <div class="space-x-0.5 flex items-center">
                      <Icon name="i-mdi-license" />
                      <span>{{ pkg.latest.license }}</span>
                    </div>
                  </UBadge>
                </div>
                <div class="mb-1 flex items-center space-x-2 text-sm text-slate-400">
                  <span v-if="pkg.latest.author !== null">由 {{ pkg.latest.author?.name }} 制作</span>
                  <span v-if="pkg.latest.author !== null">·</span>
                  <span class="font-mono">{{ pkg.latest.name }}</span>
                </div>
                <p>{{ pkg.latest.description }}</p>
              </div>
              <div class="flex items-center">
                <UButton @click.stop :to="'vcc://vpm/addRepo?url=' + repo.repoUrl">添加到 VCC</UButton>
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BrowserPackages, BrowserRepo } from '~/types/browser';

const route = useRoute()

const links = [{
  label: '包列表',
  icon: 'i-heroicons-home',
  to: '/repos'
}, {
  label: route.params.repo,
  icon: 'i-heroicons-inbox-stack-solid',
  to: '/repos/' + route.params.repo
}]

const keyword = ref('')

const { data: repo } = await useFetch<BrowserRepo>('https://vpm.vrczh.org/browser/repos/' + route.params.repo)
const { data: packages } = await useFetch<BrowserPackages[]>(`https://vpm.vrczh.org/browser/repos/${route.params.repo}/packages`)

const filterPackages = computed(() => {
  return packages.value?.filter(pkg => pkg.latest.name.includes(keyword.value) || pkg.latest.displayName.includes(keyword.value) || pkg.latest.description?.includes(keyword.value))
})
</script>