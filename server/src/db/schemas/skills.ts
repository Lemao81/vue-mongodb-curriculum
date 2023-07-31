import { model, Schema } from 'mongoose'
import { COLLECTION_SKILLS } from '../../consts/collection-consts'

export interface Skill {
  key: string
  label: string
  createdDate?: Date
  modifiedDate?: Date
}

export interface SkillDocument extends Skill, Document {}

const skillSchema = new Schema({
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

const SkillModel = model(COLLECTION_SKILLS, skillSchema)
export default SkillModel
