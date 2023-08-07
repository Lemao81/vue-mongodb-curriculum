import * as Router from 'koa-router'
import { CURRICULUM_API_BASE_PATH } from '../../consts/base-path-consts'
import { KoaContext } from '../types'
import { Next } from 'koa'
import { parseBody, respondWithBadRequest, respondWithInternalServerError, respondWithNotFound, respondWithUnauthorized, verifyAuthorization } from '../helpers'
import { AddSkillRequest } from '../interfaces/dtos/add-skill-request'
import curriculumService from '../services/curriculum-service'
import { HttpStatusCode } from 'axios'

export default function registerCurriculumEndpoints(router: Router) {
  router.get(`${CURRICULUM_API_BASE_PATH}`, getCurriculum)
  router.post(`${CURRICULUM_API_BASE_PATH}/skills`, addSkill)
}

async function getCurriculum(ctx: KoaContext, next: Next) {
  const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
  if (!isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  const result = await curriculumService.getCurriculum(tokenPayload.userId)
  if (result.error) {
    await respondWithInternalServerError(ctx, next, result.error)

    return
  }

  if (result.notFound) {
    await respondWithNotFound(ctx, next)

    return
  }

  ctx.body = result.curriculum
  ctx.status = HttpStatusCode.Ok

  await next()
}

async function addSkill(ctx: KoaContext, next: Next) {
  const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
  if (!isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  const request = parseBody<AddSkillRequest>(ctx)
  if (!request?.key) {
    await respondWithBadRequest(ctx, next, 'Request body NOK')

    return
  }

  const result = await curriculumService.addSkill(tokenPayload.userId, request.key)
  if (result.error) {
    await respondWithInternalServerError(ctx, next, result.error)

    return
  }

  if (result.notFound) {
    await respondWithNotFound(ctx, next)

    return
  }

  ctx.body = result.curriculum
  ctx.status = HttpStatusCode.Ok

  await next()
}
