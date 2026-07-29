import type { MaybeRefOrGetter, Ref } from 'vue'
import type { BrowserPackage, BrowserRepo, PageResult } from '@/types/browser'
import type { SyncStatus, SyncTask } from '@/types/status'

type FetchStatus = 'idle' | 'pending' | 'success' | 'error'

export interface ApiFetchOptions {
  query?: Record<string, MaybeRefOrGetter<unknown>>
  immediate?: boolean
  lazy?: boolean
}

export interface ApiFetchResult<T> {
  data: Ref<T | null>
  status: Ref<FetchStatus>
  error: Ref<Error | null>
  execute: () => Promise<T | null>
  refresh: () => Promise<T | null>
}

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'https://vpm.vrczh.org').replace(/\/$/, '')

export const useFetchRepos = (options: ApiFetchOptions = {}) =>
  useFetchApi<PageResult<BrowserRepo>>('/repos', options)
export const useFetchVpmRepos = (options: ApiFetchOptions = {}) =>
  useFetchApi<Record<string, string>>('/vpm/repos', options)
export const useFetchStatus = (options: ApiFetchOptions = {}) =>
  useFetchApi<SyncStatus[]>('/status/sync', options)
export const useFetchSyncTasks = (options: ApiFetchOptions = {}) =>
  useFetchApi<PageResult<SyncTask>>('/syncTasks', options)
export const useFetchSyncTask = (id: MaybeRefOrGetter<number>, options: ApiFetchOptions = {}) =>
  useFetchApi<SyncTask>(() => `/syncTasks/${toValue(id)}`, options)
export const useFetchSyncTaskLog = (id: MaybeRefOrGetter<number>, options: ApiFetchOptions = {}) =>
  useFetchApi<string>(() => `/syncTasks/${toValue(id)}/logs`, options)
export const useFetchRepo = (repoId: MaybeRefOrGetter<string>, options: ApiFetchOptions = {}) =>
  useFetchApi<BrowserRepo>(() => `/repos/${toValue(repoId)}`, options)
export const useFetchRepoPackages = (repoId: MaybeRefOrGetter<string>, options: ApiFetchOptions = {}) =>
  useFetchApi<PageResult<BrowserPackage>>(() => `/repos/${toValue(repoId)}/packages`, options)
export const useFetchRepoPackage = (
  repoId: MaybeRefOrGetter<string>,
  packageName: MaybeRefOrGetter<string>,
  options: ApiFetchOptions = {},
) => useFetchApi<BrowserPackage>(
  () => `/repos/${toValue(repoId)}/packages/${toValue(packageName)}`,
  options,
)
export const useSearchPackages = (
  keyword: MaybeRefOrGetter<string>,
  options: ApiFetchOptions = {},
) => useFetchApi<BrowserPackage[]>('/packages/search', {
  ...options,
  query: { keyword },
})

export function useFetchApi<T>(
  path: MaybeRefOrGetter<string>,
  options: ApiFetchOptions = {},
): ApiFetchResult<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const status = ref<FetchStatus>('idle')
  const error = ref<Error | null>(null)
  let controller: AbortController | undefined

  const requestKey = computed(() => {
    const query = Object.entries(options.query || {}).map(([key, value]) => [key, toValue(value)])
    return JSON.stringify([toValue(path), query])
  })

  async function execute() {
    const currentPath = toValue(path)
    if (!currentPath || currentPath.endsWith('/undefined') || currentPath.endsWith('/null') || currentPath.endsWith('/repos/')) {
      return null
    }

    controller?.abort()
    controller = new AbortController()
    status.value = 'pending'
    error.value = null

    const url = new URL(`${apiBaseUrl}${currentPath}`)
    for (const [key, value] of Object.entries(options.query || {})) {
      const resolved = toValue(value)
      if (resolved !== undefined && resolved !== null && resolved !== '') {
        url.searchParams.set(key, String(resolved))
      }
    }

    try {
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error(`API request failed: ${response.status} ${response.statusText}`)

      const contentType = response.headers.get('content-type') || ''
      data.value = (contentType.includes('application/json')
        ? await response.json()
        : await response.text()) as T
      status.value = 'success'
      return data.value
    }
    catch (reason) {
      if (reason instanceof DOMException && reason.name === 'AbortError') return null
      error.value = reason instanceof Error ? reason : new Error(String(reason))
      status.value = 'error'
      console.error(error.value)
      return null
    }
  }

  watch(requestKey, execute)
  if (options.immediate !== false) void execute()

  return { data, status, error, execute, refresh: execute }
}
