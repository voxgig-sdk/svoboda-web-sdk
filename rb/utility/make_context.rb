# SvobodaWeb SDK utility: make_context
require_relative '../core/context'
module SvobodaWebUtilities
  MakeContext = ->(ctxmap, basectx) {
    SvobodaWebContext.new(ctxmap, basectx)
  }
end
