import type { ValidationFunc } from '@/functions/validations'
import type { MonthYear } from '@/interfaces/month-year'

export interface JobFormComponentData {
  startDate: MonthYear | undefined
  endDate: MonthYear | undefined
  isCurrent: boolean
  company: string
  jobTitle: string
  description: string
  rules: { required: ValidationFunc }
}
