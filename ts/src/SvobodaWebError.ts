
import { Context } from './Context'


class SvobodaWebError extends Error {

  isSvobodaWebError = true

  sdk = 'SvobodaWeb'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SvobodaWebError
}

