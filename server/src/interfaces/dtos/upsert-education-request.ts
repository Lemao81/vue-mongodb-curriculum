export interface UpsertEducationRequest {
  startDate?: Date
  endDate?: Date
  isCurrent?: boolean
  institute?: string
  degree?: string
  grade?: number
}
