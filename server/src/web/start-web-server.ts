import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

import * as json from 'koa-json'

export default async function startWebServer() {
  const app = new Koa()
  const router = new KoaRouter()

  router.get('/', async (ctx, next) => {
    ctx.body = { text: 'hello there' }

    await next()
  })

  app.use(json())
  app.use(router.routes()).use(router.allowedMethods())

  app.listen(3000, () => console.log('Koa server listening on port 3000..'))
}
