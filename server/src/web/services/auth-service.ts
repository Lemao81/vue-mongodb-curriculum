import User, { IUser } from '../../db/schemas/users'
import { LoginResult } from '../interfaces/login-result'
import { createSha256Hash } from '../helpers'
import * as jwt from 'jsonwebtoken'
import { ENV_JWT_SECRET } from '../../consts/env-variables.const'

class AuthService {
  async login(username: string, password: string): Promise<LoginResult> {
    const user: IUser = await User.findOne({ username: username })
    if (!user) {
      return {
        isAuthorized: false
      }
    }

    const passwordHash = createSha256Hash(password)
    const isAuthorized = user.passwordHash === passwordHash
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username
      },
      process.env[ENV_JWT_SECRET],
      { expiresIn: '1h' }
    )

    return {
      isAuthorized,
      token
    }
  }
}

const authService = new AuthService()
export default authService
