import type { Author, Sample } from './packages'
import type { SyncStatus } from './status'

export interface PageResult<T> {
  items: T[]
  totalCount: number
}

export interface BrowserRepo {
  name: string
  author: string
  upstreamUrl: string
  upstreamId: string
  repoUrl: string
  apiId: string
  description?: string
  syncTaskCron?: string
  syncStatus: SyncStatus
}

export interface BrowserPackage {
  latest: BrowserPackageVersion
  versions: BrowserPackageVersion[]
  repoId: string
  repoUrl: string
}

export interface BrowserPackageVersion {
  name: string
  displayName: string
  version: string
  unity: null | string
  unityRelease: null | string
  description: string | null
  localPath: null | string
  author: Author | null
  zipSHA256: string | null
  legacyPackages: Record<string, string>
  legacyFolders: Record<string, string>
  legacyFiles: Record<string, string>
  changelogUrl: null | string
  dependencies: Record<string, string>
  gitDependencies: Record<string, string>
  vpmDependencies: Record<string, string>
  hideInEditor: boolean | null
  keywords: string[]
  license: null | string
  samples: Sample[]
  headers: Record<string, string>
  url: string
}
