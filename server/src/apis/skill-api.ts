import * as Router from 'koa-router'
import { KoaContext } from '../types'
import { Next } from 'koa'
import skillService from '../services/skill-service'
import { respondWithInternalServerError } from '../helpers'
import { HttpStatusCode } from 'axios'
import { SKILL_API_BASE_PATH } from '../consts/base-path-consts'

export default function registerSkillEndpoints(router: Router) {
  router.get(SKILL_API_BASE_PATH, getSkills)
}

async function getSkills(ctx: KoaContext, next: Next) {
  const result = await skillService.getSkills(ctx.query['startsWith'] as string)
  if (result.error) {
    await respondWithInternalServerError(ctx, next)

    return
  }

  ctx.body = result.data
  ctx.status = HttpStatusCode.Ok

  await next()
}
