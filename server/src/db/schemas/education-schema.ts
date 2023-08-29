import { Schema, Types, Document } from 'mongoose'

export interface Education {
  _id?: Types.ObjectId
  startDate: Date
  endDate: Date | null
  isCurrent: boolean
  institute: string
  degree: string
  grade: number
}

export interface EducationDocument extends Education, Document<Types.ObjectId> {}

export const educationSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  isCurrent: {
    type: Boolean,
    required: true
  },
  institute: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  grade: {
    type: Number
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
