import type { UseFetchOptions } from "#app"
import type { BrowserPackage, BrowserRepo } from "@/types/browser"
import type { SyncStatus, SyncTask } from "~/types/status"
import { hash } from "ohash"

export const useFetchRepos = (options: UseFetchOptions<BrowserRepo[]> = {}) =>
  useFetchApi<BrowserRepo[]>("/repos", options)
export const useFetchStatus = (options: UseFetchOptions<SyncStatus[]> = {}) =>
  useFetchApi<SyncStatus[]>("/status/sync", options)
export const useFetchSyncTasks = (limit: number, offset: number, options: UseFetchOptions<SyncTask[]> = {}) =>
  useFetchApi<SyncTask[]>("/syncTasks?limit=" + limit + "&offset=" + offset, options)
export const useFetchRepoSyncTasks = (repo: string, limit: number, offset: number, options: UseFetchOptions<SyncTask[]> = {}) =>
  useFetchApi<SyncTask[]>("/syncTasks?limit=" + limit + "&offset=" + offset + "&repoId=" + repo, options)
export const useFetchSyncTask = (id: number, options: UseFetchOptions<SyncTask> = {}) =>
  useFetchApi<SyncTask>("/syncTasks/" + id, options)
export const useFetchSyncTaskLog = (id: number, options: UseFetchOptions<string> = {}) =>
  useFetchApi<string>("/syncTasks/" + id + "/logs", options)
export const useFetchRepo = (
  repoId: string,
  options: UseFetchOptions<BrowserRepo> = {}
) => useFetchApi<BrowserRepo>("/repos/" + repoId, options)
export const useFetchRepoPackages = (
  repoId: string,
  options: UseFetchOptions<BrowserPackage[]> = {}
) => useFetchApi<BrowserPackage[]>(`/repos/${repoId}/packages`, options)
export const useFetchRepoPackage = (
  repoId: string,
  packageName: string,
  options: UseFetchOptions<BrowserPackage> = {}
) =>
  useFetchApi<BrowserPackage>(
    `/repos/${repoId}/packages/${packageName}`,
    options
  )
export const useSearchPackages = (
  keyword: string | globalThis.Ref,
  options: UseFetchOptions<BrowserPackage[]> = {}
) =>
  useFetchApi<BrowserPackage[]>("/packages/search", {
    ...{ query: { keyword: keyword } },
    ...options,
  })

export function useFetchApi<T>(url: string, options: UseFetchOptions<T> = {}) {
  const headers = useRequestHeaders(["user-agent"])

  const config = useRuntimeConfig()

  options.key = hash(["api-fetch", url, options])

  return useFetch(config.public.apiBaseUrl + url, { headers, ...options })
}
