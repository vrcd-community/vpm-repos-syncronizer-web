<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{ source: string }>()
const router = useRouter()
const root = useTemplateRef<HTMLElement>('root')
const html = computed(() => marked.parse(props.source) as string)

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, '-')
    .replace(/[^\p{Letter}\p{Number}\-_]/gu, '')
}

async function enhanceContent() {
  await nextTick()
  if (!root.value) return

  const used = new Map<string, number>()
  root.value.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const base = slugify(heading.textContent || '')
    const count = used.get(base) || 0
    used.set(base, count + 1)
    heading.id = count ? `${base}-${count}` : base
  })

  if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
}

function handleClick(event: MouseEvent) {
  const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a')
  if (!anchor || anchor.target || anchor.origin !== location.origin) return
  event.preventDefault()
  void router.push(`${anchor.pathname}${anchor.search}${anchor.hash}`)
}

onMounted(enhanceContent)
watch(html, enhanceContent)
</script>

<template>
  <div
    ref="root"
    @click="handleClick"
    v-html="html"
  />
</template>
