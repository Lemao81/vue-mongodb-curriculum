import { ExtendableContext } from 'koa'
import { IRouterParamContext } from 'koa-router'
import { Types } from 'mongoose'

export type KoaContext = ExtendableContext & { state: any } & {} & IRouterParamContext & { body: any; response: { body: any } }

export type CreateResult = { id?: Types.ObjectId; error?: string }

export type GetResult<T> = { data?: T; error?: string }

export type GetListResult<T> = { data?: T[]; error?: string }
