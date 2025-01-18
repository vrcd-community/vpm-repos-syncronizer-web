export interface SyncTask {
  id: number
  repoId: string
  status: SyncTaskStatus
  startTime: string
  endTime?: string
}

export interface SyncStatus {
  syncStarted: string
  syncEnded?: string
  status: SyncTaskStatus
  syncTaskId: number
  repoId: string
  repoUpstreamUrl: string
  message: string
}

export type SyncTaskStatus = 0 | 1 | 2 | 3 | 4
