import type { SkillDto } from '@/interfaces/dtos/skill-dto'
import type { JobDto } from '@/interfaces/dtos/job-dto'
import type { EducationDto } from '@/interfaces/dtos/education-dto'

export interface CurriculumDto {
  skills?: SkillDto[]
  jobs?: JobDto[]
  educations?: EducationDto[]
}
