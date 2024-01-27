import type { UseFetchOptions } from '#app'
import type { BrowserPackage, BrowserRepo } from "@/types/browser"
import type { SyncStatus } from '~/types/status'
import { hash } from 'ohash'

export const useFetchRepos = () => useFetchApi<BrowserRepo[]>('/browser/repos')
export const useFetchStatus = () => useFetchApi<SyncStatus[]>('/status/sync')
export const useFetchRepo = (repoId: string) => useFetchApi<BrowserRepo>('/browser/repos/' + repoId)
export const useFetchRepoPackages = (repoId: string) => useFetchApi<BrowserPackage[]>(`/browser/repos/${repoId}/packages`)
export const useFetchRepoPackage = (repoId: string, packageName: string) => useFetchApi<BrowserPackage>(`/browser/repos/${repoId}/packages/${packageName}`)
export const useSearchPackages = (keyword: string | globalThis.Ref) => useFetchApi<BrowserPackage[]>('/browser/packages/search', { query: { keyword: keyword } })

export function useFetchApi<T>(url: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  options.key = hash(['api-fetch', url, options])

  return useFetch(config.public.apiBaseUrl + url, options)
}
