export class Education {
  startDate: Date | null
  endDate: Date | null
  isCurrent: boolean
  institute: string
  degree: string
  grade: number

  constructor(startDate: Date | null, endDate: Date | null, isCurrent: boolean, institute: string, degree: string, grade: number) {
    this.startDate = startDate
    this.endDate = endDate
    this.isCurrent = isCurrent
    this.institute = institute || ''
    this.degree = degree || ''
    this.grade = grade
  }
}
