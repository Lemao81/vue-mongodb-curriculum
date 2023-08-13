import type { SkillDto } from '@/interfaces/dtos/skill-dto'
import type { JobDto } from '@/interfaces/dtos/job-dto'

export interface CurriculumDto {
  skills?: SkillDto[]
  jobs?: JobDto[]
}
