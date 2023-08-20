import type { MonthYear } from '@/interfaces/month-year'

export class Job {
  id?: string | undefined
  startDate: MonthYear | undefined
  endDate: MonthYear | undefined
  isCurrent: boolean
  company: string
  jobTitle: string
  description: string

  constructor(startDate: MonthYear | undefined, endDate: MonthYear | undefined, isCurrent: boolean, company: string, jobTitle: string, description: string) {
    this.startDate = startDate
    this.endDate = endDate
    this.isCurrent = isCurrent
    this.company = company || ''
    this.jobTitle = jobTitle || ''
    this.description = description || ''
  }
}
