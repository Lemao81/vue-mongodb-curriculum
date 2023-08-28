import { CurriculumDocument } from '../db/schemas/curriculum-schema'

export interface CurriculumResult {
  error?: string
  notFound?: boolean
  curriculum?: CurriculumDocument
}
