import { Schema, Types, Document } from 'mongoose'

export interface Job {
  _id?: Types.ObjectId
  startDate: Date
  endDate: Date | null
  isCurrent: boolean
  company: string
  jobTitle: string
  description: string
}

export interface JobDocument extends Job, Document<Types.ObjectId> {}

export const jobSchema = new Schema({
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
  company: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  description: {
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
