import mongoose from 'mongoose'
import { COLLECTION_USERS } from '../consts/collections.const'

const userSchema = new mongoose.Schema({
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

const User = mongoose.model(COLLECTION_USERS, userSchema)

export default User
