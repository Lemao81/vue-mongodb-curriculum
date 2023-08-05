import { Document } from 'mongoose'

export interface AddCurriculumResult {
  error?: string
  curriculum?: Document
}
