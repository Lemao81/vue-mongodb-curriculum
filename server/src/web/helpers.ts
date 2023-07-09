import { KoaContext } from './types'
import { HttpStatusCode } from 'axios'
import { Next } from 'koa'

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
