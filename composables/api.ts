import type { UseFetchOptions } from "#app"
import type { BrowserPackage, BrowserRepo } from "@/types/browser"
import type { SyncTask } from "~/types/status"
import { hash } from "ohash"

export const useFetchRepos = (options: UseFetchOptions<BrowserRepo[]> = {}) =>
  useFetchApi<BrowserRepo[]>("/repos", options)
export const useFetchStatus = (options: UseFetchOptions<SyncTask[]> = {}) =>
  useFetchApi<SyncTask[]>("/status/sync", options)
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
