import { UserModel, UserDocument } from '../../db/schemas/user-schema'
import { LoginResult } from '../interfaces/login-result'
import { createSha256Hash } from '../helpers'
import * as jwt from 'jsonwebtoken'
import { ENV_JWT_SECRET } from '../../consts/env-variable-consts'

class AuthService {
  async login(username: string, password: string): Promise<LoginResult> {
    const user: UserDocument = await UserModel.findOne({ username: username })
    if (!user) {
      return {
        isAuthorized: false
      }
    }

    const passwordHash = createSha256Hash(password)
    const isAuthorized = user.passwordHash === passwordHash
    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username
      },
      process.env[ENV_JWT_SECRET],
      { expiresIn: '1h' }
    )

    return {
      isAuthorized,
      accessToken
    }
  }
}

const authService = new AuthService()
export default authService
