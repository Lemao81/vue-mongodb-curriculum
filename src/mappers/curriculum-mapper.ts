import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import type { Curriculum } from '@/models/curriculum'
import type { SkillDto } from '@/interfaces/dtos/skill-dto'
import type { Skill } from '@/models/skill'
import type { JobDto } from '@/interfaces/dtos/job-dto'
import type { Job } from '@/models/job'
import type { MonthYear } from '@/interfaces/month-year'

export function mapToCurriculum(dto: CurriculumDto): Curriculum {
  return {
    skills: dto.skills?.map(mapToSkill) || [],
    jobs: dto.jobs?.map(mapToJob) || []
  }
}

function mapToSkill(dto: SkillDto): Skill {
  return {
    key: dto.key || '',
    label: dto.label || ''
  }
}

function mapToJob(dto: JobDto): Job {
  const startDateParsed = dto.startDate ? new Date(dto.startDate) : undefined
  const startDate: MonthYear | undefined = startDateParsed
    ? {
        month: startDateParsed.getMonth(),
        year: startDateParsed.getFullYear()
      }
    : undefined
  const endDateParsed = dto.endDate ? new Date(dto.endDate) : undefined
  const endDate: MonthYear | undefined = endDateParsed
    ? {
        month: endDateParsed.getMonth(),
        year: endDateParsed.getFullYear()
      }
    : undefined

  return {
    id: dto._id || '',
    startDate,
    endDate,
    isCurrent: dto.isCurrent || false,
    jobTitle: dto.jobTitle || '',
    company: dto.company || '',
    description: dto.description || ''
  }
}
