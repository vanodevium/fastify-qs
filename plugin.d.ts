import type { FastifyPluginCallback } from 'fastify'
import type { IParseOptions } from 'qs'

export interface QsPluginOptions extends IParseOptions {
  disabled?: boolean
}

declare const qsPlugin: FastifyPluginCallback<QsPluginOptions>
export default qsPlugin
