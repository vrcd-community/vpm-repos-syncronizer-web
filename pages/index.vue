<template>

  <Head>
    <Title>镜像列表</Title>
  </Head>
  <div class="space-y-4">
    <n-card>
      <n-h1>初来乍到？</n-h1>
      <n-text>
        请阅读我们的<nuxt-link class="text-primary hover:underline" to="/docs">文档</nuxt-link>来了解如何使用这个镜像站。
      </n-text>
    </n-card>
    <n-h1>镜像列表</n-h1>
    <n-spin v-if="loading" class="w-full pt-14">
      <template #description>
        神奇镜像在哪里？
      </template>
    </n-spin>
    <div v-else class="space-y-4">
      <n-input placeholder="搜索仓库">
        <template #prefix>
          <n-icon>
            <icon name="i-mdi:search" />
          </n-icon>
        </template>
      </n-input>
      <n-collapse accordion>
        <n-collapse-item v-for="repo in links">
          <template #header>
            <div class="flex flex-col">
              <div class="space-x-2">
                <n-text class="font-semibold">{{ repo.apiId }}</n-text>
                <status-tag :status="repo.status" :ended-time="repo.syncEnded" :started-time="repo.syncStarted" />
              </div>
              <div class="flex items-center">
                <n-text>由 {{ repo.author }} 提供</n-text>
                <n-divider vertical />
                <text-copy :text="repo.repoId" tooltip="复制仓库 ID" />
              </div>
            </div>
          </template>
          <template #header-extra>
            <div class="space-x-2 flex items-center">
              <n-tooltip>
                <template #trigger>
                  <n-button secondary @click.stop="copy(`https://vpm.vrczh.org/vpm/${repo.apiId}`)">
                    <template #icon>
                      <n-icon>
                        <icon name="i-mdi:content-copy" />
                      </n-icon>
                    </template>
                    <n-text>复制镜像仓库地址</n-text>
                  </n-button>
                </template>
                <code>{{ repo.repoUrl }}</code>
              </n-tooltip>
              <n-button secondary type="primary" tag="a" :href="'vcc://vpm/addRepo?url=' + repo.repoUrl" @click.stop>
                <template #icon>
                  <n-icon>
                    <icon name="i-mdi:plus" />
                  </n-icon>
                </template>
                添加到 VCC
              </n-button>
              <n-divider vertical />
              <NuxtLink :to="repo.to" @click.stop>
                <n-button tag="div" secondary type="info">
                  <template #icon>
                    <n-icon>
                      <icon name="i-mdi:arrow-right" />
                    </n-icon>
                  </template>
                  在仓库浏览器中查看
                </n-button>
              </NuxtLink>
            </div>
          </template>
          <n-descriptions :column="2" class="mx-5">
            <n-descriptions-item label="上游地址">
              <text-copy :text="repo.upstream" tooltip="复制上游地址">复制上游地址</text-copy>
            </n-descriptions-item>
            <n-descriptions-item label="镜像地址">
              <text-copy :text="repo.repoUrl" tooltip="复制镜像地址">复制镜像地址</text-copy>
            </n-descriptions-item>
            <n-descriptions-item label="同步开始时间">
              <nuxt-time :datetime="repo.syncStarted" dateStyle="full" time-style="long" />
            </n-descriptions-item>
            <n-descriptions-item label="同步结束时间">
              <nuxt-time :datetime="repo.syncEnded" dateStyle="full" time-style="long" />
            </n-descriptions-item>
            <n-descriptions-item>仓库描述~</n-descriptions-item>
          </n-descriptions>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: repos, pending: loading } = await useFetchRepos({ lazy: true })

const links = computed(() => {
  return repos.value?.map(item => {
    return {
      apiId: item.apiId,
      status: item.syncStatus.status,
      upstream: item.upstreamUrl,
      syncEnded: new Date(item.syncStatus.syncEnded),
      syncStarted: new Date(item.syncStatus.syncStarted),
      repoId: item.upstreamId,
      to: `/repos/${item.apiId}`,
      repoUrl: item.repoUrl,
      author: item.author
    }
  })
})

function copy(value: string) {
  navigator.clipboard.writeText(value)
}
</script>