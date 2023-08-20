export interface AddJobRequest {
  startDate: Date | undefined,
  endDate: Date | undefined,
  isCurrent: boolean
  company: string
  jobTitle: string
  description: string
}
