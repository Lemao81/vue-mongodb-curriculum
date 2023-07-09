import * as crypto from 'crypto'
import User from '../../db/users'
import { CreateResultOrError } from '../types'

class UserService {
  async createUser(username: string, password: string): Promise<CreateResultOrError> {
    const existing = await User.findOne({ username: username })
    if (existing) {
      return {
        error: 'Username exist already'
      }
    }

    const hash = crypto.createHash('sha256')
    hash.update(password)
    const passwordHash = hash.digest('hex')

    return await User.create({
      username,
      passwordHash
    })
  }
}

const userService = new UserService()

export default userService
