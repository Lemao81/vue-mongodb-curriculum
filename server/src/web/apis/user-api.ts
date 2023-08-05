import * as Router from 'koa-router'
import { Next } from 'koa'
import { KoaContext } from '../types'
import userService from '../services/user-service'
import { CreateUserRequest } from '../interfaces/dtos/create-user-request'
import { HttpStatusCode } from 'axios'
import { parseBody, respondWithBadRequest, respondWithInternalServerError } from '../helpers'
import { USER_API_BASE_PATH } from '../../consts/base-path-consts'
import curriculumService from '../services/curriculum-service'

export default function registerUserEndpoints(router: Router) {
  router.post(USER_API_BASE_PATH, createUser)
}

async function createUser(ctx: KoaContext, next: Next) {
  const request = parseBody<CreateUserRequest>(ctx)
  if (!request?.username || !request?.password) {
    await respondWithBadRequest(ctx, next, 'Request body NOK')

    return
  }

  const userResult = await userService.createUser(request.username, request.password)
  if (userResult.error) {
    await respondWithInternalServerError(ctx, next, userResult.error)

    return
  }

  const curriculumResult = await curriculumService.createCurriculum(userResult.id)
  if (curriculumResult.error) {
    await respondWithInternalServerError(ctx, next, curriculumResult.error)

    return
  }

  ctx.body = { url: `${USER_API_BASE_PATH}/${userResult.id}` }
  ctx.status = HttpStatusCode.Created

  await next()
}
