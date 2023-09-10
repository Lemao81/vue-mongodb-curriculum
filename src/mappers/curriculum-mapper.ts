import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import type { Curriculum } from '@/models/curriculum'
import type { SkillDto } from '@/interfaces/dtos/skill-dto'
import type { Skill } from '@/models/skill'
import type { JobDto } from '@/interfaces/dtos/job-dto'
import type { Job } from '@/models/job'
import type { MonthYear } from '@/interfaces/month-year'
import type { EducationDto } from '@/interfaces/dtos/education-dto'
import type { Education } from '@/models/education'

export function mapToCurriculum(dto: CurriculumDto): Curriculum {
  return {
    skills: dto.skills?.map(mapToSkill) || [],
    jobs: dto.jobs?.map(mapToJob) || [],
    educations: dto.educations?.map(mapToEducation) || []
  }
}
function mapToSkill(dto: SkillDto): Skill {
  return {
    key: dto.key || '',
    label: dto.label || ''
  }
}

function mapToJob(dto: JobDto): Job {
  const startDate = parseDate(dto.startDate)
  const endDate = parseDate(dto.endDate)

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

function mapToEducation(dto: EducationDto): Education {
  const startDate = parseDate(dto.startDate)
  const endDate = parseDate(dto.endDate)

  return {
    id: dto._id || '',
    startDate,
    endDate,
    isCurrent: dto.isCurrent || false,
    institute: dto.institute || '',
    degree: dto.degree || '',
    grade: dto.grade
  }
}

function parseDate(dateString: string | undefined) {
  const dateParsed = dateString ? new Date(dateString) : undefined
  const monthYear: MonthYear | undefined = dateParsed
    ? {
        month: dateParsed.getMonth(),
        year: dateParsed.getFullYear()
      }
    : undefined

  return monthYear
}
