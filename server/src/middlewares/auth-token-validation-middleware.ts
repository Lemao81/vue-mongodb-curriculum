import * as Koa from 'koa'
import { KoaContext } from '../types'
import { Next } from 'koa'
import { verifyAuthorization } from '../helpers'
import { HttpStatusCode } from 'axios'
import { IdentityUser } from '../interfaces/identity-user'

export function validateAuthToken(): Koa.Middleware {
  return async (ctx: KoaContext, next: Next) => {
    if (ctx.url === '/api/auth/login' || (ctx.url === '/api/users' && ctx.method === 'POST')) {
      await next()

      return
    }

    const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
    if (!isAuthorized) {
      ctx.body = { error: 'Unauthorized' }
      ctx.status = HttpStatusCode.Unauthorized

      return
    }

    const identityUser: IdentityUser = {
      id: tokenPayload.userId,
      name: tokenPayload.username
    }
    ctx.app.context.identityUser = identityUser

    await next()
  }
}
