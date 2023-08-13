export class Job {
  id?: string | undefined
  startDate: Date | undefined
  endDate: Date | undefined
  isCurrent: boolean
  company: string
  jobTitle: string
  description: string

  constructor(startDate: Date | undefined, endDate: Date | undefined, isCurrent: boolean, company: string, jobTitle: string, description: string) {
    this.startDate = startDate
    this.endDate = endDate
    this.isCurrent = isCurrent
    this.company = company || ''
    this.jobTitle = jobTitle || ''
    this.description = description || ''
  }
}
