import { model, Schema, ObjectId, Document } from 'mongoose'
import { Skill, skillSchema } from './skill-schema'
import { CURRICULUM_MODEL_NAME } from '../../consts/model-name-consts'

export interface Curriculum {
  userId: ObjectId
  skills: Skill[]
  createdDate?: Date
  modifiedDate?: Date
}

export interface CurriculumDocument extends Curriculum, Document {}

export const curriculumSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  skills: {
    type: [skillSchema]
  },
  createdDate: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  modifiedDate: {
    type: Date,
    default: () => Date.now()
  }
})

export const CurriculumModel = model(CURRICULUM_MODEL_NAME, curriculumSchema)
