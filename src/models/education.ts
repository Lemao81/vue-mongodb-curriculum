export class Education {
  startDate: Date | undefined
  endDate: Date | undefined
  isCurrent: boolean
  institute: string
  degree: string
  grade: number

  constructor(startDate: Date | undefined, endDate: Date | undefined, isCurrent: boolean, institute: string, degree: string, grade: number) {
    this.startDate = startDate
    this.endDate = endDate
    this.isCurrent = isCurrent
    this.institute = institute || ''
    this.degree = degree || ''
    this.grade = grade
  }
}
