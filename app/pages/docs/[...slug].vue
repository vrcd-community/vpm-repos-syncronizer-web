<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { docs, getDoc } from '@/app/lib/docs'

const route = useRoute()
const router = useRouter()
const page = computed(() => getDoc(route.params.slug as string | string[] | undefined))
const items: MenuItem[] = docs.map(doc => ({
  label: doc.title,
  route: doc.path,
}))

useHead({ title: computed(() => page.value?.title || '文档') })
</script>

<template>
  <div class="flex flex-col gap-4 md:flex-row">
    <Select
      class="w-full md:hidden"
      :model-value="page?.path"
      :options="docs"
      option-label="title"
      option-value="path"
      @update:model-value="router.push($event)"
    />
    <Menu
      class="hidden w-64 shrink-0 sticky top-5 h-min md:block"
      :model="items"
    >
      <template #item="{ item, props }">
        <RouterLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </RouterLink>
      </template>
    </Menu>
    <Panel class="flex-1 min-w-0">
      <MarkdownContent
        v-if="page"
        :source="page.source"
        class="prose dark:prose-invert max-w-none"
      />
      <p v-else>
        Page Not Found
      </p>
    </Panel>
    <div class="hidden w-64 shrink-0 xl:block" />
  </div>
</template>
