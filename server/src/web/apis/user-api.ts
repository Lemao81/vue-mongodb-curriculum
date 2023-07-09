import * as Router from 'koa-router'
import { Next } from 'koa'
import { KoaContext } from '../types'
import userService from '../services/user-service'
import { CreateUserRequest } from '../dtos/create-user-request'
import { HttpStatusCode } from 'axios'
import { parseBody, respondWithBadRequest } from '../helpers'

const baseUrl = '/api/users'

async function createUser(ctx: KoaContext, next: Next) {
  const userRequest = parseBody<CreateUserRequest>(ctx)
  if (!userRequest?.username || !userRequest?.password) {
    await respondWithBadRequest(ctx, next, 'Request body NOK')

    return
  }

  const userOrError = await userService.createUser(userRequest.username, userRequest.password)
  if (userOrError.error) {
    await respondWithBadRequest(ctx, next, userOrError.error)

    return
  }

  ctx.body = { url: `${baseUrl}/${userOrError.id}` }
  ctx.status = HttpStatusCode.Created

  await next()
}

export default function registerUserEndpoints(router: Router) {
  router.post('/api/users', createUser)
}
