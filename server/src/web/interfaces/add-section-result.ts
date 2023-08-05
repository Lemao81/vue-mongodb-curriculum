import { CurriculumDocument } from '../../db/schemas/curriculum-schema'

export interface AddSectionResult {
  notFound?: boolean
  error?: string
  curriculum?: CurriculumDocument
}
