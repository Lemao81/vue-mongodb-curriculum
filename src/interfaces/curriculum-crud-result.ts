import type { Curriculum } from '@/models/curriculum'

export interface CurriculumCrudResult {
  error?: string
  curriculum?: Curriculum
}
