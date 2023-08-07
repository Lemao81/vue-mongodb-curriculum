import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import type { Curriculum } from '@/models/curriculum'
import type { SkillDto } from '@/interfaces/dtos/skill-dto'
import type { Skill } from '@/models/skill'

export function mapToCurriculum(dto: CurriculumDto): Curriculum {
  return {
    skills: dto.skills?.map(mapToSkill) || []
  }
}

function mapToSkill(dto: SkillDto): Skill {
  return {
    key: dto.key || '',
    label: dto.label || ''
  }
}
