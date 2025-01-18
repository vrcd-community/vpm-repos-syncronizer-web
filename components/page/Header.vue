<template>
  <div class="sticky top-0 z-50 flex p-4">
    <div class="flex-1"></div>
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <NuxtLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </NuxtLink>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <SplitButton outlined severity="secondary"
            @click="$colorMode.preference = $colorMode.value !== 'dark' ? 'dark' : 'light'" :model="colorModeItems">
            <i class="dark:!inline !hidden pi pi-moon" />
            <i class="dark:!hidden !inline pi pi-sun" />
          </SplitButton>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
const items = [{
  label: '镜像',
  icon: 'pi pi-home',
  route: '/'
}, {
  label: '文档',
  icon: 'pi pi-book',
  route: '/docs'
}, {
  label: '同步状态',
  icon: 'pi pi-refresh',
  route: '/status'
}, {
  label: '服务状态',
  icon: 'pi pi-cog',
  items: [
    {
      label: '对象存储状态',
      icon: 'pi pi-cloud',
      route: '/status/ros'
    },
    {
      label: 'API 状态',
      icon: 'pi pi-bolt',
      route: '/status/api'
    }
  ]
}]

const colorMode = useColorMode()

const colorModeItems = [
  {
    label: 'System',
    icon: 'pi pi-box',
    command: () => {
      colorMode.preference = 'system'
    }
  },
  {
    separator: true
  },
  {
    label: 'Dark',
    icon: 'pi pi-moon',
    command: () => {
      colorMode.preference = 'dark'
    }
  },
  {
    label: 'Light',
    icon: 'pi pi-sun',
    command: () => {
      colorMode.preference = 'light'
    }
  }
];

</script>