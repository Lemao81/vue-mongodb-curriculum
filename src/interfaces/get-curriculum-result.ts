import type { Curriculum } from '@/models/curriculum'

export interface GetCurriculumResult {
  error?: string
  curriculum?: Curriculum
}
