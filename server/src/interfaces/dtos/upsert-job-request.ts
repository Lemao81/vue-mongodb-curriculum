export interface UpsertJobRequest {
  startDate?: Date
  endDate?: Date
  isCurrent?: boolean
  company?: string
  jobTitle?: string
  description?: string
}
