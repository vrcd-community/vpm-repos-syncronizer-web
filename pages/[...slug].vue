<template>
  <div class="flex space-x-4">
    <UCard class="w-2/5 sticky top-0 self-start">
      <h2 class="text-2xl font-bold">文档列表</h2>
      <hr class="my-2" />
      <div class="space-y-1 w-full flex flex-col">
        <NuxtLink class="w-full px-2 py-1 rounded-md dark:hover:bg-sky-950 hover:bg-cyan-300"
          :class="$route.path === '/docs/' ? 'dark:bg-cyan-900 bg-cyan-600 text-white' : ''" to="/docs/">文档首页</NuxtLink>
        <ContentList path="/docs/" v-slot="{ list }">
          <NuxtLink v-for="article in list" :key="article._path"
            :class="$route.path === article._path ? 'dark:bg-cyan-900 bg-cyan-600 text-white' : ''"
            class="w-full px-2 py-1 rounded-md dark:hover:bg-sky-950 hover:bg-cyan-300" :to="article._path">
            {{
              article.title }}
          </NuxtLink>
        </ContentList>
      </div>
    </UCard>
    <UCard class="w-full">
      <ContentDoc class="prose dark:prose-invert max-w-none" />
    </UCard>
  </div>
</template>