export interface UpsertEducationRequest {
  startDate: Date | undefined
  endDate: Date | undefined
  isCurrent: boolean
  institute: string
  degree: string
  grade: number | undefined
}
