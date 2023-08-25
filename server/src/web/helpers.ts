import { KoaContext } from './types'
import { HttpStatusCode } from 'axios'
import { Next } from 'koa'
import { createHash } from 'crypto'
import { AuthorizationResult } from './interfaces/authorization-result'
import authService from './services/auth-service'
import { CurriculumDocument } from '../db/schemas/curriculum-schema'

export function parseBody<T>(ctx: KoaContext): T | null {
  const body = (<any>ctx.request).body
  if (body) {
    return body as T
  }

  return null
}

export function verifyAuthorization(ctx: KoaContext): AuthorizationResult {
  const token = extractAuthorizationToken(ctx)
  if (!token) {
    return { isAuthorized: false }
  }

  const payload = authService.validateAuthorizationToken(token)
  if (!payload) {
    return { isAuthorized: false }
  }

  return { isAuthorized: true, tokenPayload: payload }
}

export async function respondWithBadRequest(ctx: KoaContext, next: Next, message: string) {
  ctx.body = { error: message }
  ctx.status = HttpStatusCode.BadRequest

  await next()
}

export async function respondWithUnauthorized(ctx: KoaContext, next: Next) {
  ctx.body = { error: 'Unauthorized' }
  ctx.status = HttpStatusCode.Unauthorized

  await next()
}

export async function respondWithInternalServerError(ctx: KoaContext, next: Next, message?: string) {
  ctx.body = { error: message || 'Internal Server Error' }
  ctx.status = HttpStatusCode.InternalServerError

  await next()
}

export async function respondWithNotFound(ctx: KoaContext, next: Next) {
  ctx.body = { error: 'NotFound' }
  ctx.status = HttpStatusCode.NotFound

  await next()
}

export function createSha256Hash(input: string) {
  const hash = createHash('sha256')
  hash.update(input)

  return hash.digest('hex')
}

export function sortJobs(curriculum: CurriculumDocument) {
  curriculum.jobs.sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
}

function extractAuthorizationToken(ctx: KoaContext): string | null {
  if (!ctx.request.headers.authorization?.startsWith('Bearer ')) {
    return null
  }

  return ctx.request.headers.authorization.slice('Bearer '.length)
}
