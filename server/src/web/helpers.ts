import { KoaContext } from './types'
import { HttpStatusCode } from 'axios'
import { Next } from 'koa'
import { createHash } from 'crypto'

export function parseBody<T>(ctx: KoaContext): T | null {
  const body = (<any>ctx.request).body
  if (body) {
    return body as T
  }

  return null
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
