import type { Curriculum } from '@/models/curriculum'

export interface AddSkillResult {
  error?: string
  curriculum?: Curriculum
}
