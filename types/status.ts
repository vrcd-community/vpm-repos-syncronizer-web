export interface SyncTask {
  id: number
  repoId: string
  status: 0 | 1 | 2 | 3
  startTime: string
  endTime?: string
}