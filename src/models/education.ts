import type { MonthYear } from '@/interfaces/month-year'

export class Education {
  id?: string | undefined
  startDate: MonthYear | undefined
  endDate: MonthYear | undefined
  isCurrent: boolean
  institute: string
  degree: string
  grade: number | undefined

  constructor(
    id: string | undefined,
    startDate: MonthYear | undefined,
    endDate: MonthYear | undefined,
    isCurrent: boolean,
    institute: string,
    degree: string,
    grade: number | undefined
  ) {
    this.id = id
    this.startDate = startDate
    this.endDate = endDate
    this.isCurrent = isCurrent
    this.institute = institute || ''
    this.degree = degree || ''
    this.grade = grade
  }
}
