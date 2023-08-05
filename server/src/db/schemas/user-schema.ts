import { Document, Schema, model } from 'mongoose'
import { USER_MODEL_NAME } from '../../consts/model-name-consts'

export interface User {
  username: string
  passwordHash: string
  createdDate?: Date
  modifiedDate?: Date
}

export interface UserDocument extends User, Document {}

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 2
  },
  passwordHash: {
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

export const UserModel = model(USER_MODEL_NAME, userSchema)
