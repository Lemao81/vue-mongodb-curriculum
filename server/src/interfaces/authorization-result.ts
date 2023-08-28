import { AuthTokenPayload } from './auth-token-payload'

export interface AuthorizationResult {
  isAuthorized: boolean
  tokenPayload?: AuthTokenPayload
}
