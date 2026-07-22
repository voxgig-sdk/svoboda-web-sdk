# SvobodaWeb SDK utility: make_context

from core.context import SvobodaWebContext


def make_context_util(ctxmap, basectx):
    return SvobodaWebContext(ctxmap, basectx)
