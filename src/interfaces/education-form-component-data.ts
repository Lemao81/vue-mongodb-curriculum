import type { ValidationFunc } from '@/functions/validations'
import type { MonthYear } from '@/interfaces/month-year'

export interface EducationFormComponentData {
  id: string | undefined
  startDate: MonthYear | undefined
  endDate: MonthYear | undefined
  isCurrent: boolean
  institute: string
  degree: string
  grade: string | undefined
  rules: { required: ValidationFunc }
}
