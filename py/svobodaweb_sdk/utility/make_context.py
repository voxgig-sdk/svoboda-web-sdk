# SvobodaWeb SDK utility: make_context

from svobodaweb_sdk.core.context import SvobodaWebContext


def make_context_util(ctxmap, basectx):
    return SvobodaWebContext(ctxmap, basectx)
