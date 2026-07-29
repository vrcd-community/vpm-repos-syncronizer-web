export type ColorModePreference = 'system' | 'dark' | 'light'

const preference = ref<ColorModePreference>('system')
const systemDark = ref(false)
let initialized = false

const colorMode = reactive({
  preference,
  value: computed<'dark' | 'light'>(() => {
    if (preference.value === 'system') return systemDark.value ? 'dark' : 'light'
    return preference.value
  }),
})

export function useColorMode() {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const saved = localStorage.getItem('color-mode') as ColorModePreference | null
    systemDark.value = media.matches
    if (saved === 'system' || saved === 'dark' || saved === 'light') preference.value = saved

    media.addEventListener('change', event => systemDark.value = event.matches)
    watch(
      () => [colorMode.preference, colorMode.value] as const,
      ([selected, resolved]) => {
        localStorage.setItem('color-mode', selected)
        document.documentElement.classList.toggle('dark-mode', resolved === 'dark')
        document.documentElement.style.colorScheme = resolved
      },
      { immediate: true },
    )
  }

  return colorMode
}
