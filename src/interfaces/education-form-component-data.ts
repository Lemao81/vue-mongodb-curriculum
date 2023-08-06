import type { ValidationFunc } from '@/functions/validations'

export interface EducationFormComponentData {
  startDate: Date | undefined
  endDate: Date | undefined
  isCurrent: boolean
  institute: string
  degree: string
  grade: string
  rules: { required: ValidationFunc }
}
