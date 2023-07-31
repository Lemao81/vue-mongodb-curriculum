import UserModel from '../../db/schemas/users'
import { CreateResult } from '../types'
import { createSha256Hash } from '../helpers'

class UserService {
  async createUser(username: string, password: string): Promise<CreateResult> {
    const existing = await UserModel.findOne({ username: username })
    if (existing) {
      return {
        error: 'Username exist already'
      }
    }

    const passwordHash = createSha256Hash(password)

    return await UserModel.create({
      username,
      passwordHash
    })
  }
}

const userService = new UserService()
export default userService
