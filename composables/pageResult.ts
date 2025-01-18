export function usePageResult(defaultPage = 0, defaultCount = 10) {
  const router = useRouter();
  const route = useRoute();

  const pageRef = ref(Number(route.query.page) || defaultPage);
  const countRef = ref(Number(route.query.count) || defaultCount);

  const page = computed({
    get: () => pageRef.value,
    set: (value: number) => {
      pageRef.value = value;
      updateRoute();
    }
  });

  const pagePlus = computed({
    get: () => page.value + 1,
    set: (value: number) => {
      page.value = value - 1;
    }
  });

  const first = computed({
    get: () => page.value * count.value,
    set: (value: number) => {
      page.value = Math.floor(value / count.value);
    }
  });

  const count = computed({
    get: () => countRef.value,
    set: (value: number) => {
      countRef.value = value;
      updateRoute();
    }
  });

  function updateRoute() {
    const query = { ...route.query, page: page.value.toString(), count: count.value.toString() };
    router.push({ query });
  }

  watch(() => route.query, (newQuery) => {
    const newPage = Number(newQuery.page) || defaultPage;
    const newCount = Number(newQuery.count) || defaultCount;

    if (page.value !== newPage) {
      pageRef.value = newPage;
    }

    if (count.value !== newCount) {
      countRef.value = newCount;
    }
  });

  return { page, pagePlus, count, first };
}