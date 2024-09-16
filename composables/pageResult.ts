export function usePageResult(defaultPage = 0, defaultCount = 10) {
  const router = useRouter()
  const route = useRoute()

  const pageRef = ref(Number(route.query.page) || defaultPage)
  const countRef = ref(Number(route.query.count) || defaultCount)

  const page = computed({
    get: () => pageRef.value,
    set: (value: number) => {
      router.replace({ query: { page: value } })
      pageRef.value = value
    }
  })

  const pagePlus = computed({
    get: () => page.value + 1,
    set: (value: number) => page.value = value - 1
  })

  const count = computed({
    get: () => countRef.value,
    set: (value: number) => {
      router.replace({ query: { count: value } })
      countRef.value = value
    }
  })

  return { page, pagePlus, count }
}