import { model, Schema, Document, Types } from 'mongoose'
import { SKILL_MODEL_NAME } from '../../consts/model-name-consts'

export interface Skill {
  _id?: Types.ObjectId
  key: string
  label: string
  createdDate?: Date
  modifiedDate?: Date
}

export interface SkillDocument extends Skill, Document<Types.ObjectId> {}

export const skillSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
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

export const SkillModel = model(SKILL_MODEL_NAME, skillSchema)
