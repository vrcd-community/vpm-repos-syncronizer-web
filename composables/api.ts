import type { UseFetchOptions } from '#app'
import type { BrowserPackages, BrowserRepo } from "@/types/browser"
import type { SyncStatus } from '~/types/status'
import { hash } from 'ohash'

export const useFetchRepos = () => useFetchApi<BrowserRepo[]>('/browser/repos')
export const useFetchStatus = () => useFetchApi<SyncStatus[]>('/status/sync')
export const useFetchRepo = (repoId: string) => useFetchApi<BrowserRepo>('/browser/repos/' + repoId)
export const useFetchRepoPackages = (repoId: string) => useFetchApi<BrowserPackages[]>(`/browser/repos/${repoId}/packages`)

export function useFetchApi<T>(url: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  options.key = hash(['api-fetch', url, options])

  return useFetch(config.public.apiBaseUrl + url, options)
}
