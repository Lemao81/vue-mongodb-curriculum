import * as Router from 'koa-router'
import { CURRICULUM_API_BASE_PATH } from '../../consts/base-path-consts'
import { KoaContext } from '../types'
import { Next } from 'koa'
import { parseBody, respondWithBadRequest, respondWithInternalServerError, respondWithNotFound, respondWithUnauthorized, verifyAuthorization } from '../helpers'
import { AddSkillRequest } from '../interfaces/dtos/add-skill-request'
import curriculumService from '../services/curriculum-service'
import { HttpStatusCode } from 'axios'
import { CurriculumResult } from '../interfaces/curriculum-result'
import { UpsertJobRequest } from '../interfaces/dtos/upsert-job-request'

export default function registerCurriculumEndpoints(router: Router) {
  router.get(`${CURRICULUM_API_BASE_PATH}`, getCurriculum)
  router.post(`${CURRICULUM_API_BASE_PATH}/skills`, addSkill)
  router.delete(`${CURRICULUM_API_BASE_PATH}/skills/:key`, removeSkill)
  router.post(`${CURRICULUM_API_BASE_PATH}/jobs`, addJob)
  router.put(`${CURRICULUM_API_BASE_PATH}/jobs/:id`, updateJob)
  router.delete(`${CURRICULUM_API_BASE_PATH}/jobs/:id`, removeJob)
}

async function getCurriculum(ctx: KoaContext, next: Next) {
  const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
  if (!isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  const result = await curriculumService.getCurriculum(tokenPayload.userId)
  await handleCurriculumResult(ctx, next, result)
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
  await handleCurriculumResult(ctx, next, result)
}

async function removeSkill(ctx: KoaContext, next: Next) {
  const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
  if (!isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  const key = ctx.params['key']
  if (!key) {
    await respondWithBadRequest(ctx, next, 'Key path param is missing')
  }

  const result = await curriculumService.removeSkill(tokenPayload.userId, key)
  await handleCurriculumResult(ctx, next, result)
}

async function addJob(ctx: KoaContext, next: Next) {
  const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
  if (!isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  const request = parseBody<UpsertJobRequest>(ctx)
  const error = validateUpsertJobRequest(request)
  if (error) {
    await respondWithBadRequest(ctx, next, error)

    return
  }

  const result = await curriculumService.addJob(tokenPayload.userId, request)
  await handleCurriculumResult(ctx, next, result)
}

async function updateJob(ctx: KoaContext, next: Next) {
  const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
  if (!isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  const jobId = ctx.params['id']
  if (!jobId) {
    await respondWithBadRequest(ctx, next, 'Id path param is missing')

    return
  }

  const request = parseBody<UpsertJobRequest>(ctx)
  const error = validateUpsertJobRequest(request)
  if (error) {
    await respondWithBadRequest(ctx, next, error)

    return
  }

  const result = await curriculumService.updateJob(tokenPayload.userId, jobId, request)
  await handleCurriculumResult(ctx, next, result)
}

async function removeJob(ctx: KoaContext, next: Next) {
  const { isAuthorized, tokenPayload } = verifyAuthorization(ctx)
  if (!isAuthorized) {
    await respondWithUnauthorized(ctx, next)

    return
  }

  const jobId = ctx.params['id']
  if (!jobId) {
    await respondWithBadRequest(ctx, next, 'Id path param is missing')

    return
  }

  const result = await curriculumService.removeJob(tokenPayload.userId, jobId)
  await handleCurriculumResult(ctx, next, result)
}

async function handleCurriculumResult(ctx: KoaContext, next: Next, result: CurriculumResult) {
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

function validateUpsertJobRequest(request: UpsertJobRequest): string {
  if (!request || !request.jobTitle || !request.company || !request.description || !request.startDate || (!request.isCurrent && !request.endDate)) {
    return 'Missing required fields'
  }

  if (request.isCurrent && request.endDate) {
    return 'End date given for current job'
  }
}
