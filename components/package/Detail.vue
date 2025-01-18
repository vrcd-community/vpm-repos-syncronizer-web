<script setup lang="ts">
import type { BrowserPackage } from '~/types/browser';

const props = defineProps<{
  package: BrowserPackage
  selectedVersion: string
}>()

const tabModel = defineModel<string>('tab', { default: 'description', required: true })

const selectedPackageVersion = computed(() => {
  return props.package.versions.find(v => v.version === props.selectedVersion) || props.package.latest
})
</script>

<template>
  <div class="flex">
    <div class="flex-1">
      <Tabs v-model:value="tabModel">
        <TabList>
          <Tab value="description">描述</Tab>
          <Tab value="dependencies">依赖</Tab>
          <Tab value="samples" v-if="selectedPackageVersion.samples && selectedPackageVersion.samples.length != 0">包中的示例
          </Tab>
          <Tab value="json">API 响应的原始 package.json</Tab>
          <Tab value="versions">所有版本</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="description">
            <p class="whitespace-pre-wrap">{{ selectedPackageVersion.description }}</p>
          </TabPanel>
          <TabPanel value="dependencies">
            <div class="space-y-4">
              <PackageDependenceList type="UPM" :dependencies="selectedPackageVersion.dependencies" />
              <PackageDependenceList type="VPM" :dependencies="selectedPackageVersion.vpmDependencies" />
              <PackageDependenceList type="Git" :dependencies="selectedPackageVersion.gitDependencies" />
            </div>
          </TabPanel>
          <TabPanel value="samples">
            <ul class="space-y-4">
              <li v-for="sample in selectedPackageVersion.samples">
                <h3 class="text-xl font-semibold">{{ sample.displayName }}</h3>
                <p class="text-slate-400 font-mono text-sm">{{ sample.path }}</p>
                <p>{{ sample.description }}</p>
              </li>
            </ul>
          </TabPanel>
          <TabPanel value="json">
            <Message severity="warn" size="small" icon="pi pi-exclamation-circle" class="mb-4">
              <h3 class="font-semibold">该 package.json 并不是包原始 package.json 数据</h3>
              <p>请注意，这里显示的 package.json 信息是由 API 返回的，并不是原始 package.json 数据。这意味着某些字段可能会被修改或删除。</p>
            </Message>
            <code class="whitespace-pre-wrap">{{ JSON.stringify(selectedPackageVersion, null, 2) }}</code>
          </TabPanel>
          <TabPanel value="versions">
            <NuxtLink v-for="version in package.versions" :key="version.version"
              class="flex gap-2 py-2 items-center text-primary" :to="version.name + '@' + version.version">
              <i v-if="version.version === selectedVersion" class="pi pi-check text-xs" />
              <span>{{ version.version }}</span>
              <div class="*:text-xs *:font-medium *:whitespace-nowrap flex items-center space-x-2">
                <Tag v-if="version.version === package.latest.version" severity="success" value="最新版本"
                  icon="pi pi-star" />
                <Tag v-if="version.license" severity="info">
                  <IconLicense class="size-4" />
                  {{ version.license }} 许可证
                </Tag>
                <Tag v-if="version.unity" severity="contrast">
                  <IconUnity class="size-4" />
                  最低支持 Unity {{ version.unity }}
                </Tag>
              </div>
            </NuxtLink>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <Divider layout="vertical" />
    <div class="w-64 space-y-4">
      <di v-if="typeof selectedPackageVersion.changelogUrl === 'string'">
        <h2 class="text-xl font-semibold mb-1">当前版本更新日志</h2>
        <div class="flex items-center gap-1">
          <IconEarth class="size-4" />
          <a class="flex-1 text-primary underline text-ellipsis overflow-hidden"
            :href="selectedPackageVersion.changelogUrl" target="_blank">{{
              selectedPackageVersion.changelogUrl }}</a>
        </div>
      </di>
      <div v-if="selectedPackageVersion.author">
        <h2 class="text-xl font-semibold mb-1">关于开发者</h2>
        <p>由 {{ selectedPackageVersion.author.name }} 制作</p>
        <ul>
          <li v-if="selectedPackageVersion.author.email" class="flex items-center gap-1">
            <IconEmail class="size-4" />
            <a class="flex-1 text-primary underline text-ellipsis overflow-hidden"
              :href="'mailto:' + selectedPackageVersion.author.email">{{
                selectedPackageVersion.author.email }}</a>
          </li>
          <li v-if="selectedPackageVersion.author.url" class="flex items-center gap-1">
            <IconEarth class="size-4" />
            <a class="flex-1 text-primary underline text-ellipsis overflow-hidden"
              :href="selectedPackageVersion.author.url" target="_blank">{{
                selectedPackageVersion.author.url }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>