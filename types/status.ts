export interface SyncTask {
  id: number
  repoId: string
  status: 0 | 1 | 2 | 3
  startTime: string
  endTime?: string
}

export interface SyncStatus {
  syncStarted: string
  syncEnded?: string
  status: 0 | 1 | 2 | 3
  syncTaskId: number
  repoId: string
  repoUpstreamUrl: string
  message: string
}