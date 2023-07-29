export class Job {
  startDate: Date | null
  endDate: Date | null
  isCurrent: boolean
  company: string
  jobTitle: string
  description: string

  constructor(startDate: Date | null, endDate: Date | null, isCurrent: boolean, company: string, jobTitle: string, description: string) {
    this.startDate = startDate
    this.endDate = endDate
    this.isCurrent = isCurrent
    this.company = company || ''
    this.jobTitle = jobTitle || ''
    this.description = description || ''
  }
}
