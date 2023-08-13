import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import type { Curriculum } from '@/models/curriculum'
import type { SkillDto } from '@/interfaces/dtos/skill-dto'
import type { Skill } from '@/models/skill'
import type { JobDto } from '@/interfaces/dtos/job-dto'
import type { Job } from '@/models/job'

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
  return {
    id: dto.id || '',
    startDate: dto.startDate,
    endDate: dto.endDate,
    isCurrent: dto.isCurrent || false,
    jobTitle: dto.jobTitle || '',
    company: dto.company || '',
    description: dto.description || ''
  }
}
