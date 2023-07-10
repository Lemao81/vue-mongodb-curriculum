import { Document, Schema, model, Model } from 'mongoose'
import { COLLECTION_USERS } from '../../consts/collections.const'

export interface IUser extends Document {
  username: string
  passwordHash: string
  createdDate: Date
  modifiedDate: Date
}

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

const User = model(COLLECTION_USERS, userSchema)

export default User
