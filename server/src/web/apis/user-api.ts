import * as Router from 'koa-router'
import { Next } from 'koa'
import { KoaContext } from '../types'
import userService from '../services/user-service'
import { CreateUserRequest } from '../dtos/create-user-request'
import { HttpStatusCode } from 'axios'
import { parseBody, respondWithBadRequest } from '../helpers'
import { USER_API_BASE_PATH } from '../../consts/base-path-consts'

export default function registerUserEndpoints(router: Router) {
  router.post(USER_API_BASE_PATH, createUser)
}

async function createUser(ctx: KoaContext, next: Next) {
  const createRequest = parseBody<CreateUserRequest>(ctx)
  if (!createRequest?.username || !createRequest?.password) {
    await respondWithBadRequest(ctx, next, 'Request body NOK')

    return
  }

  const result = await userService.createUser(createRequest.username, createRequest.password)
  if (result.error) {
    await respondWithBadRequest(ctx, next, result.error)

    return
  }

  ctx.body = { url: `${USER_API_BASE_PATH}/${result.id}` }
  ctx.status = HttpStatusCode.Created

  await next()
}
