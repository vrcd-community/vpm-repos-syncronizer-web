import { hash } from 'ohash'
import type { UseFetchOptions } from '#app'
import type { BrowserPackage, BrowserRepo, PageResult } from '@/types/browser'
import type { SyncStatus, SyncTask } from '~/types/status'

export const useFetchRepos = (options: UseFetchOptions<PageResult<BrowserRepo>> = {}) =>
  useFetchApi<PageResult<BrowserRepo>>('/repos', options)
export const useFetchVpmRepos = (options: UseFetchOptions<Record<string, string>> = {}) =>
  useFetchApi<Record<string, string>>('/vpm/repos', options)
export const useFetchStatus = (options: UseFetchOptions<SyncStatus[]> = {}) =>
  useFetchApi<SyncStatus[]>('/status/sync', options)
export const useFetchSyncTasks = (options: UseFetchOptions<PageResult<SyncTask>> = {}) =>
  useFetchApi<PageResult<SyncTask>>('/syncTasks', options)
export const useFetchSyncTask = (id: number, options: UseFetchOptions<SyncTask> = {}) =>
  useFetchApi<SyncTask>('/syncTasks/' + id, options)
export const useFetchSyncTaskLog = (id: number, options: UseFetchOptions<string> = {}) =>
  useFetchApi<string>('/syncTasks/' + id + '/logs', options)
export const useFetchRepo = (
  repoId: string,
  options: UseFetchOptions<BrowserRepo> = {},
) => useFetchApi<BrowserRepo>('/repos/' + repoId, options)
export const useFetchRepoPackages = (
  repoId: string,
  options: UseFetchOptions<PageResult<BrowserPackage>> = {},
) => useFetchApi<PageResult<BrowserPackage>>(`/repos/${repoId}/packages`, options)
export const useFetchRepoPackage = (
  repoId: string,
  packageName: string,
  options: UseFetchOptions<BrowserPackage> = {},
) =>
  useFetchApi<BrowserPackage>(
    `/repos/${repoId}/packages/${packageName}`,
    options,
  )
export const useSearchPackages = (
  keyword: string | globalThis.Ref,
  options: UseFetchOptions<BrowserPackage[]> = {},
) =>
  useFetchApi<BrowserPackage[]>('/packages/search', {
    ...{ query: { keyword: keyword } },
    ...options,
  })

export function useFetchApi<T>(url: string, options: UseFetchOptions<T> = {}) {
  const headers = useRequestHeaders(['user-agent'])

  const config = useRuntimeConfig()

  options.key = hash(['api-fetch', url])

  return useFetch(config.public.apiBaseUrl + url, { headers, ...options })
}
