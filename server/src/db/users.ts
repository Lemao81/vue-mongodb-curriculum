import mongoose from 'mongoose'
import { COLLECTION_USERS } from '../consts/collections.const'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minLength: 2
  },
  passwordHash: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  }
})

const User = mongoose.model(COLLECTION_USERS, userSchema)

export default User
