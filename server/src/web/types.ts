import { ExtendableContext } from 'koa'
import { IRouterParamContext } from 'koa-router'

export type KoaContext = ExtendableContext & { state: any } & {} & IRouterParamContext & { body: any; response: { body: any } }

export type CreateResultOrError = { id?: string; error?: string }
