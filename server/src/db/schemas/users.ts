import { Document, Schema, model } from 'mongoose'
import { COLLECTION_USERS } from '../../consts/collections.const'

export interface User {
  username: string
  passwordHash: string
  createdDate?: Date
  modifiedDate?: Date
}

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
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

const UserModel = model(COLLECTION_USERS, userSchema)
export default UserModel
