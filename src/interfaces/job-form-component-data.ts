import type { ValidationFunc } from '@/functions/validations'

export interface JobFormComponentData {
  startDate: Date | undefined
  endDate: Date | undefined
  isCurrent: boolean
  company: string
  jobTitle: string
  description: string
  rules: { required: ValidationFunc }
}
