import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
const cors = require("@koa/cors")

import * as json from 'koa-json'
import registerUserEndpoints from './apis/user-api'

export default async function startWebServer() {
  const app = new Koa()
  const router = new KoaRouter()

  router.get('/health', async (ctx, next) => {
    ctx.body = { text: "i'm good" }

    await next()
  })

  registerUserEndpoints(router)

  app.use(cors())
  app.use(json())
  app.use(bodyParser())
  app.use(router.routes()).use(router.allowedMethods())

  app.listen(3000, () => console.log('Koa server listening on port 3000..'))
}
