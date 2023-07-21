import * as Router from 'koa-router'
import { KoaContext } from '../types'
import { Next } from 'koa'
import { parseBody, respondWithBadRequest, respondWithUnauthorized } from '../helpers'
import { LoginRequest } from '../dtos/login-request'
import authService from '../services/auth-service'
import { HttpStatusCode } from 'axios'

export default function registerAuthEndpoints(router: Router) {
  router.post('/api/auth/login', login)
}

async function login(ctx: KoaContext, next: Next) {
  const loginRequest = parseBody<LoginRequest>(ctx)
  if (!loginRequest?.username || !loginRequest?.password) {
    await respondWithBadRequest(ctx, next, 'Request body NOK')

    return
  }

  const result = await authService.login(loginRequest.username, loginRequest.password)
  if (!result.isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  ctx.body = { accessToken: result.accessToken }
  ctx.status = HttpStatusCode.Ok

  await next()
}
