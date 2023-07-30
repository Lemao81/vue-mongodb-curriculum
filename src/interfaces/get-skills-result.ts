import type { SkillDto } from '@/interfaces/dtos/skill-dto'

export interface GetSkillsResult {
  skills?: SkillDto[]
  error?: string
}
