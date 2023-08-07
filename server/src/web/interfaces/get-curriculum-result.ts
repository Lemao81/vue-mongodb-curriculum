import { CurriculumDocument } from '../../db/schemas/curriculum-schema'

export interface GetCurriculumResult {
  error?: string
  notFound?: boolean
  curriculum?: CurriculumDocument
}
