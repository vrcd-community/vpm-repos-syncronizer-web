<script setup lang="ts">
import type { BrowserPackage } from '~/types/browser';

const props = defineProps<{
  package: BrowserPackage
  selectedVersion: string
}>()

const selectedPackageVersion = computed(() => {
  return props.package.versions.find(v => v.version === props.selectedVersion) || props.package.latest
})
</script>

<template>
  <n-tabs type="line" class="mt-2">
    <n-tab-pane name="description" tab="描述">
      <n-text class="whitespace-pre-wrap">{{ selectedPackageVersion.description }}</n-text>
    </n-tab-pane>
    <n-tab-pane name="dependencies" tab="依赖">
      <div class="space-y-4">
        <package-dependence-list type="UPM" :dependencies="selectedPackageVersion.dependencies" />
        <package-dependence-list type="VPM" :dependencies="selectedPackageVersion.vpmDependencies" />
        <package-dependence-list type="Git" :dependencies="selectedPackageVersion.gitDependencies" />
      </div>
    </n-tab-pane>
    <n-tab-pane v-if="selectedPackageVersion.changelogUrl" name="changelog" tab="当前版本更新日志">
      <n-button text type="primary" tag="a" :href="selectedPackageVersion.changelogUrl" target="_blank">
        {{ selectedPackageVersion.changelogUrl }}
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="author" tab="关于开发者" v-if="selectedPackageVersion.author">
      <n-text>由 {{ selectedPackageVersion.author.name }} 制作</n-text>
      <ul>
        <li class="list-disc ml-[1em]" v-if="selectedPackageVersion.author.email">Email:
          <NuxtLink class="text-primary" :href="'mailto:' + selectedPackageVersion.author.email">
            {{ selectedPackageVersion.author.email }}
          </NuxtLink>
        </li>
        <li class="list-disc ml-[1em]" v-if="selectedPackageVersion.author.url">开发者网站:
          <NuxtLink class="text-primary" :href="(selectedPackageVersion.author.url as string)" target="_blank">
            {{ selectedPackageVersion.author.url }}
          </NuxtLink>
        </li>
      </ul>
    </n-tab-pane>
    <n-tab-pane v-if="selectedPackageVersion.samples && selectedPackageVersion.samples.length != 0" name="samples"
      tab="包中的示例">
      <n-list>
        <n-list-item v-for="sample in selectedPackageVersion.samples">
          <h3 class="text-xl font-semibold">{{ sample.displayName }}</h3>
          <p class="text-slate-400 font-mono text-sm">{{ sample.path }}</p>
          <p>{{ sample.description }}</p>
        </n-list-item>
      </n-list>
    </n-tab-pane>
    <n-tab-pane name="json" tab="API 响应的原始 package.json">
      <n-alert title="该 package.json 并不是包原始 package.json 数据" type="warning">
        请注意，这里显示的 package.json 信息是由 API 返回的，并不是原始 package.json 数据。这意味着某些字段可能会被修改或删除。
      </n-alert>
      <code class="whitespace-pre-wrap block mt-4">{{ JSON.stringify(selectedPackageVersion, null, 2) }}</code>
    </n-tab-pane>
    <n-tab-pane name="versions" tab="所有版本">
      <n-list hoverable clickable>
        <n-list-item v-for="version in package.versions">
          <NuxtLink :to="version.name + '@' + version.version">
            <div class=flex>
              <div class="flex space-x-2 items-center flex-1">
                <icon name="mdi:check" v-if="version.version === selectedPackageVersion.version" />
                <n-text>v{{ version.version }}</n-text>
                <n-tag v-if="version.version === package.latest.version" size="small" type="primary" :bordered="false">
                  <template #icon>
                    <icon name="i-mdi:star" />
                  </template>
                  最新版本
                </n-tag>
                <n-tag v-if="version.license" size="small" type="info" :bordered="false">
                  <template #icon>
                    <icon name="i-mdi:scale-balance" />
                    <!-- i-mdi:license -->
                  </template>
                  {{ version.license }} 许可证
                </n-tag>
                <n-tag v-if="version.unity" size="small" :bordered="false">
                  <template #icon>
                    <icon name="i-mdi:unity" />
                  </template>
                  最低支持 Unity {{ version.unity }}
                </n-tag>
              </div>
              <div v-if="selectedPackageVersion.changelogUrl">
                <n-button text type="primary" tag="a" :href="selectedPackageVersion.changelogUrl" target="_blank"
                  @click.stop>
                  查看更新日志
                </n-button>
              </div>
            </div>
          </NuxtLink>
        </n-list-item>
      </n-list>
    </n-tab-pane>
  </n-tabs>
</template>